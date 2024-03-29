import { LpInfo } from "@/lib/api/models/raydium.model";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

type LpTokenLockCreateSelectTokenItemProps = {
  lpInfo: LpInfo;
  selected: boolean;
  onSelect: () => void;
};

export default function LpTokenLockCreateSelectTokenItem({
  lpInfo,
  selected,
  onSelect,
}: LpTokenLockCreateSelectTokenItemProps) {
  const {
    lpTokenMetadata,
    baseTokenMetadata,
    quoteTokenMetadata,
    addedLpAmount,
  } = lpInfo;

  return (
    <div
      className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-black/40"
      onClick={() => onSelect()}
    >
      <div className="flex-1 flex space-x-2 items-center">
        <OverlapCoinIcon
          icons={[
            getCoinProps(baseTokenMetadata),
            getCoinProps(quoteTokenMetadata),
          ]}
        />
        <div className="flex flex-col">
          <p className="text-base font-medium truncate">
            {lpTokenMetadata.name.substring(0, 16)}
          </p>
          <p className="text-sm text-highlight">{lpTokenMetadata.symbol}</p>
        </div>
      </div>
      <div className="text-sm text-nowrap">
        {addedLpAmount.toFixed(4)} {lpTokenMetadata.symbol}
      </div>
    </div>
  );
}
