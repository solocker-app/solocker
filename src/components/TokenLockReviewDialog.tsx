"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdClose, MdLock } from "react-icons/md";

import { join } from "@/lib/utils";

import EmptyIcon from "./widgets/EmptyIcon";
import { TokenLock } from "./CreateTokenLockDialog";

type TokenLockReviewDialogProps = {
  tokenLock: TokenLock;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateLockContract: () => Promise<void>;
};

export default function TokenLockReviewDialog({
  tokenLock,
  visible,
  setVisible,
  onCreateLockContract,
}: TokenLockReviewDialogProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={join(
        "fixed inset-0 flex flex-col justify-center items-center bg-black/50 transition transition-200",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={join(
          "w-xs bg-slate-950 border border-container rounded-xl  md:w-sm",
          visible
            ? "animate-fade-in animate-duration-150"
            : "animate-fade-out animate-duration-150"
        )}
      >
        <header className="flex items-center space-x-2 p-4">
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold">Review Contract</h1>
          </div>
          <button
            className="p-2"
            onClick={() => setVisible(false)}
          >
            <MdClose className="text-xl" />
          </button>
        </header>
        <div className="flex flex-col space-y-4 p-4 overflow-y-scroll">
          <div className="bg-container/70 p-4 rounded-md">
            <p className="text-sm">Number of recipients</p>
            <div className="flex space-x-1 text-xl">
              <h1>{tokenLock.recipients.length}</h1>
              <span className="text-highlight">Recipient</span>
            </div>
          </div>
          <div className="bg-container/70 p-4 rounded-md">
            <p className="text-sm">Total Locked Amount</p>
            <div className="flex items-center space-x-2">
              {tokenLock.configuration.token.metadata.network ? (
                <img
                  src={tokenLock.configuration.token.metadata.network.image}
                  className="w-8 h-8 rounded-full"
                  width={24}
                  height={24}
                />
              ) : (
                <EmptyIcon />
              )}
              <div className="flex space-x-1 text-xl">
                <h1>
                  {tokenLock.recipients.reduce((a, b) => a + b.amount, 0)}
                </h1>
                <span className="text-highlight">
                  {tokenLock.configuration.token.metadata.symbol}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-container/70 p-4 rounded-md">
            <p className="text-sm">Solocker Fees</p>
            <div className="flex items-center space-x-2">
              <img
                src="/assets/coins/solana.png"
                className="w-8 h-8 rounded-full"
                width={24}
                height={24}
              />
              <div className="flex">
                <div className="flex items-center text-xl">
                  <h1>2</h1>
                  <span className="text-highlight">SOL</span>
                </div>
                <div className="flex items-center space-x-1 text-xl">
                  <h1>+</h1>
                  <span className="text-highlight">1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4">
          <button
            className="self-end w-1/2 flex items-center justify-center space-x-2 btn btn-primary !rounded-md"
            disabled={loading}
            onClick={async () => {
              setLoading(true);

              return toast.promise(
                await onCreateLockContract().finally(() => setLoading(false)),
                {
                  pending: "Creating lock contract",
                  success: "Liquidity token has been locked successfully",
                  error: "An unexpected error occur. Try again!",
                }
              );
            }}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent animate-spin rounded-full" />
            ) : (
              <>
              <MdLock className="text-lg" />
              <span>Lock</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
