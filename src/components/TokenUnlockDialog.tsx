import * as Sentry from "@sentry/nextjs";

import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

import { PublicKey } from "@solana/web3.js";

import { useRepository } from "@/composables";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  tokenVestingActions,
  tokenVestingSelectors,
} from "@/store/slices/tokenVesting";

import LockInfoList from "./abstract/LockInfoList";
import TokenLockInfoDialog from "./TokenLockInfoDialog";

type TokenUnlockDialogProps = {
  seed: string;
  onClose: () => void;
};

export default function TokenUnlockDialog({
  onClose,
  seed,
}: TokenUnlockDialogProps) {
  const dispatch = useAppDispatch();
  const { repository } = useRepository();

  const tokenVesting = useAppSelector((state) => state.tokenVesting);
  const { mintMetadata, contractInfo } = tokenVestingSelectors.selectById(
    tokenVesting,
    seed,
  );

  const [loading, setLoading] = useState(false);
  const [unlockTx, setUnlockTx] = useState<string | null>(null);

  const onUnlock = async function () {
    const unlockTx = await repository.tokenVesting.unlockToken(
      seed,
      new PublicKey(contractInfo.mintAddress),
    );

    setUnlockTx(unlockTx);

    dispatch(
      tokenVestingActions.updateOne({
        id: seed,
        changes: {
          contractInfo: {
            ...contractInfo,
            schedules: contractInfo.schedules.map((schedule) => {
              return Object.assign(schedule, { isReleased: true });
            }),
          },
        },
      }),
    );
  };

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center overflow-y-scroll">
        <div className="w-sm flex flex-col space-y-4 bg-white text-black p-4 rounded-md">
          <header className="flex space-x-2 items-center">
            <h1 className="flex-1 text-xl font-extrabold">Unlock Token</h1>
            <button onClick={onClose}>
              <MdClose className="text-xl" />
            </button>
          </header>
          <div className="flex-1 flex flex-col">
            <LockInfoList
              digitalAsset={mintMetadata}
              contractInfo={contractInfo}
            />
          </div>
          <div className="flex flex-col">
            <button
              disabled={contractInfo.schedules.every(
                (schedule) => schedule.isReleased,
              )}
              className="btn btn-primary disabled:opacity-50"
              onClick={() => {
                setLoading(true);
                toast
                  .promise(
                    onUnlock().catch((error) => {
                      Sentry.captureException(error);
                      return Promise.reject(error);
                    }),
                    {
                      success: "Token unlocked successfully",
                      error: "Token unlock failed, Try again!",
                      pending: "Token unlocking...",
                    },
                  )
                  .finally(() => setLoading(false));
              }}
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Unlock</span>
              )}
            </button>
          </div>
        </div>
      </div>
      {unlockTx && (
        <TokenLockInfoDialog
          tx={unlockTx}
          digitalAsset={mintMetadata}
          contractInfo={contractInfo}
          onClose={() => setUnlockTx(null)}
        />
      )}
    </>,
    document.body,
  );
}
