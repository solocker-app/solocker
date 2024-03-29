import moment from "moment";
import Image from "next/image";

import LockInfo from "./LockInfo";

import { getTotalLockedAmount } from "@/lib/utils";
import { TokenVesting } from "@/lib/api/models/tokenVesting.model";
import { DigitalAssetWithJsonMetadata } from "@/lib/api/metaplex";
import { BN } from "bn.js";

type LockInfoListProps = {
  seed?: string;
  digitalAsset: DigitalAssetWithJsonMetadata;
  contractInfo: TokenVesting["contractInfo"];
};

export default function LockInfoList({
  contractInfo,
  seed,
  digitalAsset,
}: LockInfoListProps) {
  const totalLockedAmount = getTotalLockedAmount(
    contractInfo.schedules,
    digitalAsset.token.tokenAmount.decimals,
    "hex",
  );

  const schedule = contractInfo.schedules[0];
  const releaseTime =  new BN(schedule.releaseTime, "hex").toNumber();

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
            <span>{totalLockedAmount.toNumber()}</span>
            <span className="text-black/50">{digitalAsset.symbol}</span>
          </div>
          <Image
            className="rounded-full"
            src={digitalAsset.jsonMetadata.image}
            alt={digitalAsset.name}
            width={32}
            height={32}
          />
        </>
      </LockInfo>
      <LockInfo title="Created At">
        <span>{moment(contractInfo.createdAt).format("MMMM Do YYYY")}</span>
      </LockInfo>
      <LockInfo title="Unlock time">
        <span>{moment.unix(releaseTime).format("MMMM Do YYYY, h:mm:ss")}</span>
      </LockInfo>
    </div>
  );
}
