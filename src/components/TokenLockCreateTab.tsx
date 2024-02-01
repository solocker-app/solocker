import Image from "next/image";
import { MdSearch } from "react-icons/md";

import TokenLockTokenList from "./TokenLockTokenList";

export default function TokenLockerCreateTab() {
  return (
    <div className="flex flex-col space-y-8 bg-dark/50 p-4 rounded-xl">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/coins/solana.png"
            alt="Solana"
            className="w-12 h-12 rounded-full"
            width={32}
            height={32}
          />
          <p className="text-xl font-bold">Solana Lp Locker</p>
        </div>
        <div className="flex space-x-2 items-center bg-black px-2 rounded-md focus-within:ring-1 focus-within:ring-green-500 focus-within:text-green-500">
          <input
            className="flex-1 p-2 bg-transparent outline-none"
            placeholder="Search by token name and mint address"
          />
          <MdSearch className="text-xl" />
        </div>
      </div>
      <TokenLockTokenList />
    </div>
  );
}
