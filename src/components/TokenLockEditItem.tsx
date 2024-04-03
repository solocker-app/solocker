import BN from "bn.js";
import { safeBN, unsafeBnToNumber } from "@solocker/safe-bn";

import moment from "moment";

import Image from "next/image";
import { MdLockOutline } from "react-icons/md";

import type { TokenVesting } from "@/lib/api/models/tokenVesting.model";

import LockStatus from "./LockStatus";
import { canWithdraw } from "@/lib/utils";

type TokenLockListItemProps = {
  onClick: () => void;
  lockedToken: TokenVesting;
};

export default function TokenLockEditItem({
  onClick,
  lockedToken: { mintMetadata: metadata, contractInfo },
}: TokenLockListItemProps) {
  return (
    <tr
      className="cursor-pointer"
      onClick={onClick}
    >
      <td>
        <div className="flex items-center space-x-2">
          <Image
            className="rounded-full"
            src={metadata.jsonMetadata.image}
            alt={metadata.name}
            width={24}
            height={24}
          />
          <p className="text-sm">{metadata.symbol}</p>
        </div>
      </td>
      <td>
        <div className="flex space-x-1 items-center justify-center">
          <MdLockOutline />
          <p className="flex items-center space-x-1">
            <span>
              {unsafeBnToNumber(
                safeBN(contractInfo.totalAmount).div(
                  new BN(10).pow(new BN(metadata.token.tokenAmount.decimals)),
                ),
              )}
            </span>
            <span className="text-highlight">{metadata.symbol}</span>
          </p>
        </div>
      </td>
      <td className="truncate">
        {moment
          .unix(new BN(contractInfo.createdAt, "hex").toNumber())
          .fromNow()}
      </td>
      <td className="truncate">
        {moment
          .unix(new BN(contractInfo.schedules[0].releaseTime, "hex").toNumber())
          .format("MMMM Do YYYY, h:mm a")}
      </td>
      <td>
        <LockStatus
          status={
            contractInfo.schedules.every((schedule) => schedule.isReleased)
              ? "withdrawn"
              : canWithdraw(contractInfo.schedules)
                ? "ready"
                : "pending"
          }
        />
      </td>
    </tr>
  );
}
