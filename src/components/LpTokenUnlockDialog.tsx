import * as Sentry from "@sentry/nextjs";

import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

import { useRepository } from "@/composables";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  lpTokenVestingActions,
  lpTokenVestingSelectors,
} from "@/store/slices/lpTokenVesting";

import LockInfoList from "./abstract/LpLockInfoList";

type LpTokenUnlockDialogProps = {
  seed: string;
  onClose: () => void;
};

export default function LpTokenUnlockDialog({
  onClose,
  seed,
}: LpTokenUnlockDialogProps) {
  const { publicKey } = useWallet();
  const { repository } = useRepository();
  const dispatch = useAppDispatch();
  const tokenVesting = useAppSelector((state) => state.lpTokenVesting);
  const { lpInfo, contractInfo } = lpTokenVestingSelectors.selectById(
    tokenVesting,
    seed,
  );

  const [loading, setLoading] = useState(false);

  const onUnlock = async function () {
    const unlockTx = await repository.tokenVesting.unlockToken(
      seed,
      new PublicKey(contractInfo.mintAddress),
    );

    console.log(unlockTx)

    dispatch(
      lpTokenVestingActions.updateOne({
        id: seed,
        changes: {
          contractInfo: {
            ...contractInfo,
            unlockTx,
            unlocked: true,
          },
        },
      }),
    );

    await repository.firebase.lockToken.updateTransaction(
      publicKey.toBase58(),
      contractInfo.id,
      {
        unlockTx,
        unlocked: true,
      },
    );
  };

  return createPortal(
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
            lpInfo={lpInfo}
            contractInfo={contractInfo}
          />
        </div>
        <div className="flex flex-col">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (contractInfo.unlocked)
                return window.open(
                  `https://solscan.io/tx/${contractInfo.unlockTx}/`,
                );

              setLoading(true);
              toast
                .promise(
                  onUnlock().catch((error) => {
                    Sentry.captureException(error);
                    return Promise.reject(error);
                  }),
                  {
                    success: "Lp Token unlocked successfully",
                    error: "Lp Token unlock failed, Try again!",
                    pending: "Lp Token unlocking...",
                  },
                )
                .finally(() => setLoading(false));
            }}
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>
                {contractInfo.unlocked ? "View Transaction" : "Unlock"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
