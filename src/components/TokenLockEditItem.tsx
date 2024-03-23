import BN from "bn.js";
import moment from "moment";

import Image from "next/image";

import { MdLockOutline } from "react-icons/md";

import { getTotalLockedAmount } from "@/lib/utils";
import { TokenVesting } from "@/lib/api/models/tokenVesting.model";

import LockStatus from "./LockStatus";
import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";

type TokenLockListItemProps = {
  lpLockedToken: TokenVesting;
  onClick: () => void;
};

export default function TokenLockEditItem({
  onClick,
  lpLockedToken: { lpInfo, contractInfo },
}: TokenLockListItemProps) {
  return (
    <tr onClick={onClick}>
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
                new BN(lpInfo.lpTokenDecimal),
              ).toNumber()}
            </span>
            <span className="text-highlight">
              {lpInfo.lpTokenMetadata.symbol}
            </span>
          </p>
        </div>
      </td>
      <td className="truncate">
        {moment(contractInfo.createdAt).fromNow()}
      </td>
      <td className="truncate">
        {moment.unix(contractInfo.schedules[0].period).fromNow()}
      </td>
      <td>
        <LockStatus status={contractInfo.unlocked ? "withdrawn" : "pending"} />
      </td>
    </tr>
  );
}
