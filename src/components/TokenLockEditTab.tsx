import Link from "next/link";

import { MdSearch } from "react-icons/md";

import Search from "./widgets/Search";

import { useState } from "react";

import { useAppSelector } from "@/store/hooks";
import type { TokenVesting } from "@/lib/api/models/tokenVesting.model";

import Loading from "./widgets/Loading";
import ErrorWidget from "./widgets/ErrorWidget";
import TokenLockEditItem from "./TokenLockEditItem";
import TokenUnlockDialog from "./TokenUnlockDialog";

type TokenLockEditTabProps = {
  lockedTokens: TokenVesting[];
};

export default function LpTokenLockEditTab({
  lockedTokens,
}: TokenLockEditTabProps) {
  const { loadingState } = useAppSelector((state) => state.tokenVesting);

  const [search, setSearch] = useState<string | null>(null);
  const [lockedToken, setLockedToken] = useState<TokenVesting | null>(null);

  return (
    <>
      <div className="flex-1 max-h-xl self-center flex flex-col space-y-8 bg-dark/50 rounded-xl lt-md:min-w-full lt-md:max-w-full md:w-full">
        <header className="flex flex-col space-y-4 border-b-1 border-b-white/10 p-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-bold">Withdraw</h1>
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
            lockedTokens.length > 0 ? (
              <table>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Locked Amount</th>
                  <th>Created At</th>
                  <th>Unlock Time</th>
                  <th>Status</th>
                </tr>
                {lockedTokens.map((lockedToken, index) => (
                  <TokenLockEditItem
                    key={index}
                    lockedToken={lockedToken}
                    onClick={() => setLockedToken(lockedToken)}
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
      {lockedToken && (
        <TokenUnlockDialog
          seed={lockedToken.contractInfo.seed}
          onClose={() => setLockedToken(null)}
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
        <p className="text-lg">No token lock found</p>
        <Link
          href="?tab=new"
          className="btn btn-dark"
        >
          Create Lock Contract
        </Link>
      </div>
    </div>
  );
}
