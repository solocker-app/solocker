import Link from "next/link";

import { MdSearch } from "react-icons/md";

import Search from "./widgets/Search";

import { useState } from "react";
import { LpLockedToken } from "@/lib/firebase/lockToken";
import TokenLockEditItem from "./TokenLockEditItem";

type TokenLockEditTabProps = {
  lpLockedTokens: LpLockedToken[];
};

export default function TokenLockEditTab({
  lpLockedTokens,
}: TokenLockEditTabProps) {
  const [search, setSearch] = useState<string | null>();

  return (
    <>
      <div className="self-center flex flex-col space-y-8 bg-dark/50 rounded-xl lt-md:min-w-full lt-md:max-w-full md:w-full">
        <header className="flex flex-col space-y-4 border-b-1 border-b-white/40 p-4">
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
        <div className="max-h-lg min-h-sm flex flex-col overflow-y-scroll p-4">
          {lpLockedTokens.length > 0 ? (
            <table>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Locked Amount</th>
                <th>Created At</th>
                <th>Period</th>
                <th>Status</th>
              </tr>
              {lpLockedTokens.map((token) => (
                <TokenLockEditItem
                  lpLockedToken={token}
                  onClick={() => {}}
                />
              ))}
            </table>
          ) : (
            <TokenLockNotFound />
          )}
        </div>
      </div>
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
