"use client";
import { toast } from "react-toastify";
import { IoLockClosed, IoAdd } from "react-icons/io5";
import { useWallet } from "@solana/wallet-adapter-react";

type TokenLockEmptyStateProps = {
  onCreateLockToken: () => void;
};

export default function TokenLockEmptyState({
  onCreateLockToken,
}: TokenLockEmptyStateProps) {
  const { connected } = useWallet();
  const createLockToken = () => {
    if (connected) onCreateLockToken();
    else toast.error("Wallet not connected. Please connect wallet");
  };

  return (
    <div className="flex-1 flex flex-col space-y-4 items-center justify-center">
      <div className="w-14 h-14 flex items-center justify-center bg-container rounded-xl">
        <IoLockClosed className="text-2xl text-highlight" />
      </div>
      <div className="text-center px-8">
        <h1 className="text-xl font-bold">No Liquidity Pool Locked</h1>
        <p className="text-highlight text-start">
          Lock liquidity into audited smart contracts that unlock to the
          recipient after the lock time expires.
        </p>
      </div>
      <button
        className="btn btn-primary flex space-x-2 items-center"
        onClick={createLockToken}
      >
        <IoAdd />
        <span>Lock Liquidity</span>
      </button>
    </div>
  );
}
