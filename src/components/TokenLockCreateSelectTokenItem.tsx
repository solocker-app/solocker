import Image from "next/image";
import humanNumber from "human-number";

import { DigitalAssetWithJsonMetadata } from "@/lib/api/metaplex";

type TokenLockCreateSelectTokenItemProps = {
  digitalAsset: DigitalAssetWithJsonMetadata;
  selected: boolean;
  onSelect: () => void;
};

export default function TokenLockCreateSelectTokenItem({
  digitalAsset,
  onSelect,
}: TokenLockCreateSelectTokenItemProps) {
  return (
    <div
      className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-black/40"
      onClick={onSelect}
    >
      <div className="flex-1 flex space-x-2 items-center">
        <Image
          src={digitalAsset.jsonMetadata.image}
          alt={digitalAsset.name}
          width={32}
          height={32}
        />
        <div className="flex flex-col">
          <p className="text-base font-medium truncate">{digitalAsset.name}</p>
          <p className="text-sm text-highlight">{digitalAsset.symbol}</p>
        </div>
      </div>
      <div className="flex space-x-2 text-sm text-nowrap">
        {humanNumber(Number(digitalAsset.token.tokenAmount.uiAmount), (n) =>
          Number(n).toFixed(2),
        )}{" "}
        {digitalAsset.symbol}
      </div>
    </div>
  );
}
