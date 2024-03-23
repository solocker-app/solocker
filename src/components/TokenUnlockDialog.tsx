import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

import { useRepository } from "@/composables";
import { LpLockedToken } from "@/lib/firebase/lockToken";

import LockInfoList from "./abstract/LockInfoList";

type TokenUnlockDialogProps = {
  lpTokenLock: LpLockedToken;
  onClose: () => void;
};

export default function TokenUnlockDialog({
  onClose,
  lpTokenLock: { lpInfo, contractInfo },
}: TokenUnlockDialogProps) {
  const { repository } = useRepository();
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center">
      <div className="w-sm h-lg flex flex-col space-y-8 bg-white text-black p-4 rounded-md">
        <header className="flex space-x-2 items-center">
          <h1 className="flex-1 text-xl font-extrabold">Unlock Token</h1>
          <button onClick={onClose}>
            <MdClose />
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
            disabled={contractInfo.unlocked}
            onClick={() => {
              setLoading(true);
              toast
                .promise(
                  repository.tokenVesting.unlockToken(
                    contractInfo.seed,
                    new PublicKey(contractInfo.mintAddress),
                  ),
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
              <span>Unlock</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
