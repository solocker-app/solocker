import BN from "bn.js";
import moment from "moment";
import { ContractInfo } from "@bonfida/token-vesting";

import LockInfo from "./LockInfo";
import OverlapCoinIcon, { getCoinProps } from "../widgets/OverlapCoinIcon";

import { getTotalLockedAmount } from "@/lib/utils";
import { LockedToken } from "@/lib/firebase/lockToken";
import { LpInfo } from "@/lib/api/models/raydium.model";

type LockInfoListProps = {
  seed?: string;
  lpInfo: LpInfo;
  contractInfo: ContractInfo | LockedToken;
};

export default function LockInfoList({
  contractInfo,
  seed,
  lpInfo,
}: LockInfoListProps) {
  const totalLockedAmount = getTotalLockedAmount(
    contractInfo.schedules,
    lpInfo.lpTokenDecimal,
  );
  const releaseTime = new Date(
    // @ts-ignore
    new BN(contractInfo.schedules[0].releaseTime).toNumber(),
  );

  return (
    <div className="flex flex-col space-y-4">
      <LockInfo title="Number of recipients">
        <span>1</span>
        <span>Recipient</span>
      </LockInfo>
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
