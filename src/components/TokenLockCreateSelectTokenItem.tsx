import { LpInfo } from "@/lib/api/models/raydium.model";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

type TokenLockCreateSelectTokenItemProps = {
  lpInfo: LpInfo;
  selected: boolean;
  onSelect: (value: LpInfo) => void;
};

export default function TokenLockCreateSelectTokenItem({
  lpInfo,
  selected,
}: TokenLockCreateSelectTokenItemProps) {
  const { lpTokenMetadata, baseTokenMetadata, quoteTokenMetadata, addedLpAmount } = lpInfo;
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 flex space-x-2 items-center">
        <OverlapCoinIcon icons={[
          getCoinProps(baseTokenMetadata), 
          getCoinProps(quoteTokenMetadata)
        ]} />
        <div className="flex flex-col">
          <p className="text-base font-medium truncate">{lpTokenMetadata.name}</p>
          <p className="text-sm text-highlight">{lpTokenMetadata.symbol}</p>
        </div>
      </div>
      <div className="text-sm text-nowrap">{addedLpAmount} {lpTokenMetadata.symbol}</div>
    </div>
  );
}
