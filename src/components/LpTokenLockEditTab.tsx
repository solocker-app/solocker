import Link from "next/link";

import { MdLock, MdSearch } from "react-icons/md";

import Search from "./widgets/Search";

import { useState } from "react";

import { useAppSelector } from "@/store/hooks";
import type { LpTokenVesting } from "@/lib/api/models/tokenVesting.model";

import Loading from "./widgets/Loading";
import ErrorWidget from "./widgets/ErrorWidget";
import LpTokenLockEditItem from "./LpTokenLockEditItem";
import TokenUnlockDialog from "./LpTokenUnlockDialog";

type TokenLockEditTabProps = {
  lpLockedTokens: LpTokenVesting[];
};

export default function LpTokenLockEditTab({
  lpLockedTokens,
}: TokenLockEditTabProps) {
  const { loadingState } = useAppSelector((state) => state.lpTokenVesting);

  const [search, setSearch] = useState<string | null>(null);
  const [lpLockedToken, setLpLockedToken] = useState<LpTokenVesting | null>(
    null,
  );

  return (
    <>
      <div className="flex-1 flex flex-col">
        <header className="flex flex-col space-y-4 border-b-1 border-b-black p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <MdLock className="text-2xl" />
              <h1 className="text-xl font-bold">Withdraw</h1>
            </div>
            <p className="text-highlight">
              Withdraw or cancel from lock contracts
            </p>
          </div>
          <Search
            placeholder="Search by seed or lock contract address"
            onChange={setSearch}
          />
        </header>
        <div className="flex-1 flex flex-col overflow-y-scroll p-4">
          {loadingState === "success" ? (
            lpLockedTokens.length > 0 ? (
              <table>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Locked Amount</th>
                  <th>Created At</th>
                  <th>Unlock Time</th>
                  <th>Status</th>
                </tr>
                {lpLockedTokens.map((lpLockedToken, index) => (
                  <LpTokenLockEditItem
                    key={index}
                    lpLockedToken={lpLockedToken}
                    onClick={() => setLpLockedToken(lpLockedToken)}
                  />
                ))}
              </table>
            ) : (
              <TokenLockNotFound />
            )
          ) : loadingState === "failed" ? (
            <ErrorWidget />
          ) : (
            <Loading />
          )}
        </div>
      </div>
      {lpLockedToken && (
        <TokenUnlockDialog
          seed={lpLockedToken.contractInfo.seed}
          onClose={() => setLpLockedToken(null)}
        />
      )}
    </>
  );
}

export function TokenLockNotFound() {
  return (
    <div className="self-center flex-1 flex flex-col space-y-4 items-center justify-center">
      <button className="bg-secondary p-2 rounded-full">
        <MdSearch className="text-2xl text-white" />
      </button>
      <div className="flex flex-col space-y-2">
        <p className="text-lg">No Lp token lock found</p>
        <Link
          href="/?tab=new"
          className="btn btn-dark"
        >
          Create Lock Contract
        </Link>
      </div>
    </div>
  );
}
