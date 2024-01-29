import { useState, useEffect, useContext } from "react";

import Image from "next/image";
import { MdLockOutline } from "react-icons/md";

import StreamFlow from "@/lib/streamflow";
import { Repository } from "@/providers/Repository";
import { LiquidityPoolInfo } from "@/lib/raydium";

import LockStatus from "./widgets/LockStatus";
import OverlapIcon from "./widgets/OverlapIcon";
import TokenLockItemMenu from "./TokenLockItemMenu";

type TokenLockListItemProps = {
  lockedToken: Awaited<ReturnType<StreamFlow["getLockedTokens"]>>[number];
};

export default function TokenLockListItem({
  lockedToken: [address, stream],
}: TokenLockListItemProps) {
  const { repository } = useContext(Repository);
  const [lpInfo, setLpInfo] = useState<LiquidityPoolInfo>(undefined);

  useEffect(() => {
    repository.raydium
      .getLiquidityPoolInfo(stream.mint)
      .then(setLpInfo)
      .catch(console.log);
  }, []);

  return (
    lpInfo && (
      <tr>
        <td>
          <div className="flex items-center">
            <Image
              src="/assets/coins/ray.png"
              alt="raydium"
              className="w-6 h-6 rounded-full"
              width={24}
              height={24}
            />
            <p className="invisible">hm</p>
          </div>
        </td>
        <td>
          <div className="flex items-center">
            {/* <OverlapIcon
              images={[
                {
                  src: lpInfo.baseMetadata.network.image,
                  alt: lpInfo.baseMetadata.name,
                },
                {
                  src: lpInfo.quoteMetadata.network.image,
                  alt: lpInfo.quoteMetadata.name,
                },
              ]}
            /> */}
          </div>
        </td>
        <td>
          <div className="flex space-x-2 items-center">
            <MdLockOutline />
            <p className="flex items-center space-x-1">
              <span>{stream.depositedAmount.toString()}</span>
              <span className="text-highlight">
                {/* {lpInfo.baseMetadata.symbol} */}
              </span>
            </p>
          </div>
        </td>
        <td>{stream.cliff}</td>
        <td>
          <LockStatus
            status={
              stream.closed
                ? "closed"
                : stream.lastWithdrawnAt > 0
                ? "withdraw"
                : "pending"
            }
          />
        </td>
        <td>
          <TokenLockItemMenu stream={stream} />
        </td>
      </tr>
    )
  );
}
