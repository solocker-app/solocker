import Image from "next/image";

import { LpInfo } from "@/lib/api/models/raydium.model";

import Search from "./widgets/Search";
import TokenLockCreateSelectTokenItem from "./TokenLockCreateSelectTokenItem";

type TokenLockCreateSelectProps = {
  lpInfos: LpInfo[];
  value?: LpInfo;
  onSelect: React.Dispatch<React.SetStateAction<LpInfo>>;
};

export default function TokenLockCreateSelectToken({
  lpInfos,
  value,
  onSelect,
}: TokenLockCreateSelectProps) {
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
      <div className="flex flex-col space-y-4">
        {lpInfos.map((lpInfo, index) => (
          <TokenLockCreateSelectTokenItem
            key={index}
            lpInfo={lpInfo}
            selected={
              value &&
              value.lpTokenMetadata.mint === lpInfo.lpTokenMetadata.mint
            }
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
