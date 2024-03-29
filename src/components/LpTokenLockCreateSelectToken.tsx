import Image from "next/image";
import { MdSearch } from "react-icons/md";

import { LpInfo } from "@/lib/api/models/raydium.model";

import { useAppSelector } from "@/store/hooks";

import Search from "./widgets/Search";
import Loading from "./widgets/Loading";
import ErrorWidget from "./widgets/ErrorWidget";
import LpTokenLockCreateSelectTokenItem from "./LpTokenLockCreateSelectTokenItem";

type LpTokenLockCreateSelectProps = {
  lpInfos: LpInfo[];
  value?: LpInfo;
  onSelect: (value: LpInfo) => void;
};

export default function LpTokenLockCreateSelectToken({
  lpInfos,
  value,
  onSelect,
}: LpTokenLockCreateSelectProps) {
  const { loadingState } = useAppSelector((state) => state.raydiumLpInfo);

  return (
    <section className="flex-1 flex flex-col">
      <header className="flex flex-col space-y-4 p-4 border-b border-b-black">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/coins/solana.png"
            alt="Solana"
            className="w-10 h-10 rounded-full"
            width={32}
            height={32}
          />
          <p className="text-lg font-bold">Solana SPL Locker</p>
        </div>
        <Search onChange={() => {}} />
      </header>
      <div className="flex-1 flex flex-col divide-y-1 divide-black overflow-y-scroll">
        {loadingState === "success" ? (
          lpInfos.length > 0 ? (
            lpInfos.map((lpInfo, index) => (
              <LpTokenLockCreateSelectTokenItem
                key={index}
                lpInfo={lpInfo}
                selected={
                  value &&
                  value.lpTokenMetadata.mint === lpInfo.lpTokenMetadata.mint
                }
                onSelect={() => onSelect(lpInfo)}
              />
            ))
          ) : (
            <EmptyLiquidityToken />
          )
        ) : loadingState === "failed" ? (
          <ErrorWidget />
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}

function EmptyLiquidityToken() {
  return (
    <div className="m-auto flex flex-col space-y-2 text-center px-2">
      <div className="self-center flex flex-col bg-white text-black w-8 h-8 rounded-full">
        <MdSearch className="m-auto text-lg" />
      </div>
      <div>
        <h1 className="text-lg font-bold">No LP Token Found</h1>
        <p className="text-highlight">
          Add liquidity to your favorite project and check here.
        </p>
      </div>
    </div>
  );
}
