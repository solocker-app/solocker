import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

export default function TokenLockTokenList() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <div className="flex-1 flex space-x-2 items-center">
          <OverlapCoinIcon icons={[getCoinProps(null), getCoinProps(null)]} />
          <div className="flex flex-col">
            <p className="text-base font-medium">Raydium Lp Token</p>
            <p className="text-highlight">RAY/SOL</p>
          </div>
        </div>
        <div className="text-sm">0.001 RAY/SOL</div>
      </div>
    </div>
  );
}
