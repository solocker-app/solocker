"use client";
import { IoLockClosed, IoAdd } from "react-icons/io5";

type TokenLockEmptyStateProps = {
  onCreateLockToken: () => void;
};

export default function TokenLockEmptyState({
  onCreateLockToken,
}: TokenLockEmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col space-y-4 items-center justify-center">
      <div className="w-14 h-14 flex items-center justify-center bg-container rounded-xl">
        <IoLockClosed className="text-2xl text-highlight" />
      </div>
      <div className="text-center px-8">
        <h1 className="text-xl font-bold">No Token Locks</h1>
        <p className="text-highlight text-start">
          Lock tokens into audited smart contracts that unlock to the recipient
          after the lock time expires.
        </p>
      </div>
      <button
        className="btn btn-primary flex space-x-2 items-center"
        onClick={onCreateLockToken}
      >
        <IoAdd />
        <span>Lock Token</span>
      </button>
    </div>
  );
}
