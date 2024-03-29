import BN from "bn.js";
import moment from "moment";

import Image from "next/image";

import { MdLockOutline } from "react-icons/md";

import { getTotalLockedAmount } from "@/lib/utils";
import type { LpTokenVesting } from "@/lib/api/models/tokenVesting.model";

import LockStatus from "./LockStatus";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

type LpTokenLockListItemProps = {
  lpLockedToken: LpTokenVesting;
  onClick: () => void;
};

export default function LpTokenLockEditItem({
  onClick,
  lpLockedToken: { lpInfo, contractInfo },
}: LpTokenLockListItemProps) {
  return (
    <tr
      className="cursor-pointer"
      onClick={onClick}
    >
      <td>
        <div className="flex items-center">
          <Image
            src="/assets/coins/ray.png"
            alt="raydium"
            className="w-6 h-6 rounded-full"
            width={24}
            height={24}
          />
          <p className="invisible">xxxxx</p>
        </div>
      </td>
      <td>
        <div className="flex items-center space-x-2">
          <OverlapCoinIcon
            icons={[
              getCoinProps(lpInfo.baseTokenMetadata),
              getCoinProps(lpInfo.quoteTokenMetadata),
            ]}
          />
          <p className="text-xs">{lpInfo.lpTokenMetadata.symbol}</p>
        </div>
      </td>
      <td>
        <div className="flex space-x-2 items-center">
          <MdLockOutline />
          <p className="flex items-center space-x-1">
            <span>
              {getTotalLockedAmount(
                contractInfo.schedules,
                lpInfo.lpTokenDecimal,
              ).toNumber()}
            </span>
            <span className="text-highlight">
              {lpInfo.lpTokenMetadata.symbol}
            </span>
          </p>
        </div>
      </td>
      <td className="truncate">
        {moment(contractInfo.createdAt).startOf("day").fromNow()}
      </td>
      <td className="truncate">
        {moment
          .unix(contractInfo.schedules[0].releaseTime)
          .format("MMMM Do YYYY, h:mm")}
      </td>
      <td>
        <LockStatus
          status={
            contractInfo.schedules.every((schedule) => schedule.isReleased)
              ? "withdrawn"
              : "pending"
          }
        />
      </td>
    </tr>
  );
}
