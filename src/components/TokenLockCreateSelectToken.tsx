import Image from "next/image";
import { MdSearch } from "react-icons/md";

import { useAppSelector } from "@/store/hooks";
import type { DigitalAssetWithJsonMetadata } from "@/lib/api/metaplex";

import Search from "./widgets/Search";
import Loading from "./widgets/Loading";
import ErrorWidget from "./widgets/ErrorWidget";
import TokenLockCreateSelectTokenItem from "./TokenLockCreateSelectTokenItem";

type TokenLockCreateSelectProps = {
  value?: DigitalAssetWithJsonMetadata;
  digitalAssets: DigitalAssetWithJsonMetadata[];
  onSelect: (value: DigitalAssetWithJsonMetadata) => void;
};

export default function TokenLockCreateSelectToken({
  digitalAssets,
  value,
  onSelect,
}: TokenLockCreateSelectProps) {
  const { loadingState } = useAppSelector((state) => state.digitalAsset);

  return (
    <section className="min-h-lg max-h-xl flex flex-col space-y-2 md:min-h-xl">
      <header className="flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/coins/solana.png"
            alt="Solana"
            className="w-10 h-10 rounded-full"
            width={32}
            height={32}
          />
          <p className="text-lg font-bold">Solana Token Locker</p>
        </div>
        <Search onChange={() => {}} />
      </header>
      <div className="flex-1 flex flex-col divide-y-1 divide-black overflow-y-scroll">
        {loadingState === "success" ? (
          digitalAssets.length > 0 ? (
            digitalAssets.map((digitalAsset, index) => (
              <TokenLockCreateSelectTokenItem
                key={index}
                digitalAsset={digitalAsset}
                selected={value && digitalAsset.publicKey === value.publicKey}
                onSelect={() => onSelect(digitalAsset)}
              />
            ))
          ) : (
            <EmptyToken />
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

function EmptyToken() {
  return (
    <div className="m-auto flex flex-col space-y-2 text-center px-2">
      <div className="self-center flex flex-col bg-white text-black w-8 h-8 rounded-full">
        <MdSearch className="m-auto text-lg" />
      </div>
      <div>
        <h1 className="text-lg font-bold">No Token Found</h1>
        <p className="text-highlight">
          Do you have any spl token? Try searching instead.
        </p>
      </div>
    </div>
  );
}
