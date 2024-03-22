import BN from "bn.js";
import moment from "moment";
import { ContractInfo } from "@bonfida/token-vesting";

import LockInfo from "./LockInfo";
import { LpInfo } from "@/lib/api/models/raydium.model";
import OverlapCoinIcon, { getCoinProps } from "../widgets/OverlapCoinIcon";

type LockInfoListProps = {
  seed?: string;
  lpInfo: LpInfo;
  contractInfo: ContractInfo;
};

export default function LockInfoList({
  contractInfo,
  seed,
  lpInfo,
}: LockInfoListProps) {
  // @ts-ignore
  const totalLockedAmount =
    // @ts-ignore
    contractInfo.schedules
      .reduceRight((a, b) =>
        //@ts-ignore
        a.amount.add(b.amount),
      )
      // @ts-ignore
      .amount.div(new BN(10).pow(new BN(9)));

  const releaseTime = new Date(
    // @ts-ignore
    new BN(contractInfo.schedules[0].releaseTime).toNumber(),
  );

  return (
    <div className="flex flex-col space-y-4">
      {seed && (
        <LockInfo title="Lock Seed">
          <small>{seed}</small>
        </LockInfo>
      )}
      <LockInfo title="Total Locked Amount">
        <>
          <div className="flex-1 flex space-x-1">
            <span>{totalLockedAmount.toNumber()}</span>
            <span className="text-black/50">
              {lpInfo.lpTokenMetadata.symbol}
            </span>
          </div>
          <OverlapCoinIcon
            icons={[
              getCoinProps(lpInfo.baseTokenMetadata),
              getCoinProps(lpInfo.quoteTokenMetadata),
            ]}
          />
        </>
      </LockInfo>
      <LockInfo title="Unlock time">
        <span>{moment(releaseTime).fromNow()}</span>
      </LockInfo>
    </div>
  );
}
