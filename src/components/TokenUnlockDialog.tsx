import * as Sentry from "@sentry/nextjs";

import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

import { useRepository } from "@/composables";
import { TokenVesting } from "@/lib/api/models/tokenVesting.model";

import { useAppDispatch } from "@/store/hooks";
import { tokenVestingActions } from "@/store/slices/tokenVesting";

import LockInfoList from "./abstract/LockInfoList";

type TokenUnlockDialogProps = {
  lpTokenLock: TokenVesting;
  onClose: () => void;
};

export default function TokenUnlockDialog({
  onClose,
  lpTokenLock: { seed, lpInfo, contractInfo },
}: TokenUnlockDialogProps) {
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();
  const { repository } = useRepository();

  const [loading, setLoading] = useState(false);

  const onUnlock = async function () {
    const tx = await repository.tokenVesting.unlockToken(
      seed,
      new PublicKey(contractInfo.mintAddress),
    );

    dispatch(
      tokenVestingActions.updateOne({
        id: seed,
        changes: {
          contractInfo: {
            ...contractInfo,
            unlocked: true,
          },
        },
      }),
    );

    await repository.firebase.lockToken.updateTransaction(
      publicKey.toBase58(),
      contractInfo.id,
      {
        unlockTx: tx,
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
            className="btn btn-primary disabled:opacity-50"
            disabled={!contractInfo.unlocked}
            onClick={() => {
              if (contractInfo.unlocked)
                return window.open(`https://solscan.io/tx/${contractInfo.unlockTx}`);

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
