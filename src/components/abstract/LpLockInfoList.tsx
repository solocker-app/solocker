import BN from "bn.js";
import moment from "moment";

import LockInfo from "./LockInfo";
import OverlapCoinIcon, { getCoinProps } from "../widgets/OverlapCoinIcon";

import type { LpInfo } from "@/lib/api/models/raydium.model";
import type { LpTokenVesting } from "@/lib/api/models/tokenVesting.model";

type LockInfoListProps = {
  seed?: string;
  lpInfo: LpInfo;
  contractInfo: LpTokenVesting["contractInfo"];
};

export default function LockInfoList({
  contractInfo,
  seed,
  lpInfo,
}: LockInfoListProps) {
  const totalLockedAmount =
    new BN(contractInfo.totalAmount, "hex").toNumber() /
    Math.pow(10, lpInfo.lpTokenDecimal);

  const schedule = contractInfo.schedules[0];
  const createdAt = new BN(contractInfo.createdAt, "hex").toNumber();
  const releaseTime = new BN(schedule.releaseTime, "hex").toNumber();

  return (
    <div className="flex flex-col space-y-2">
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
            <span>{totalLockedAmount}</span>
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
      <LockInfo title="Created At">
        <span>{moment.unix(createdAt).format("MMMM Do YYYY")}</span>
      </LockInfo>
      <LockInfo title="Unlock time">
        <span>{moment.unix(releaseTime).format("MMMM Do YYYY, h:mm:ss")}</span>
      </LockInfo>
    </div>
  );
}
