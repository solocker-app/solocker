import { BN } from "bn.js";

import moment from "moment";
import Image from "next/image";

import LockInfo from "./LockInfo";

import { TokenVesting } from "@/lib/api/models/tokenVesting.model";
import { DigitalAssetWithJsonMetadata } from "@/lib/api/metaplex";

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
  const totalLockedAmount =
    new BN(contractInfo.totalAmount, "hex").toNumber() /
    Math.pow(10, digitalAsset.token.tokenAmount.decimals);

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
        <span>{moment.unix(createdAt).format("MMMM Do YYYY")}</span>
      </LockInfo>
      <LockInfo title="Unlock time">
        <span>{moment.unix(releaseTime).format("MMMM Do YYYY, h:mm:ss")}</span>
      </LockInfo>
    </div>
  );
}
