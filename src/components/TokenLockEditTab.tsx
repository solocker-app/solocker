import Link from "next/link";

import { MdLock, MdSearch } from "react-icons/md";

import Search from "./widgets/Search";

import TokenLockCancel from "./TokenLockCancel";
import { TokenLockEditMenuAction } from "./TokenLockEditItemMenu";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import NetworkLockInfo from "./NetworkLockInfo";

export default function TokenLockEditTab() {
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
          {search ? (
            <>
              <NetworkLockInfo seed={search} />
            </>
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
        <p className="text-lg">Search for a lock contract</p>
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
