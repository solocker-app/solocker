import { LpInfo } from "@/lib/api/models/raydium.model";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

type TokenLockCreateSelectTokenItemProps = {
  lpInfo: LpInfo;
  selected: boolean;
  onSelect: React.Dispatch<React.SetStateAction<LpInfo>>;
};

export default function TokenLockCreateSelectTokenItem({
  lpInfo,
  selected,
}: TokenLockCreateSelectTokenItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 flex space-x-2 items-center">
        <OverlapCoinIcon icons={[getCoinProps(null), getCoinProps(null)]} />
        <div className="flex flex-col">
          <p className="text-base font-medium truncate">Raydium Lp Token</p>
          <p className="text-sm text-highlight">RAY/SOL</p>
        </div>
      </div>
      <div className="text-sm text-nowrap">0.01 RAY/SOL</div>
    </div>
  );
}
