import Image from "next/image";

import Search from "./widgets/Search";
import TokenLockTokenList from "./TokenLockTokenList";

export default function TokenLockCreateSelectToken() {
  return (
    <section className="min-h-md flex flex-col space-y-8 md:min-h-sm">
      <header className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/coins/solana.png"
            alt="Solana"
            className="w-10 h-10 rounded-full"
            width={32}
            height={32}
          />
          <p className="text-lg font-bold">Solana Lp Locker</p>
        </div>
        <Search />
      </header>
      <TokenLockTokenList />
    </section>
  );
}
