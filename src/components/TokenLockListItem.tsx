import BN from "bn.js";
import moment from "moment";
import { useEffect } from "react";

import Image from "next/image";
import { MdLockOutline } from "react-icons/md";

import { useWallet } from "@solana/wallet-adapter-react";
import { Types } from "@streamflow/stream";

import StreamFlow from "@/lib/streamflow";

import LockStatus from "./widgets/LockStatus";
import OverlapIcon, { getCoinImageProps } from "./widgets/OverlapIcon";

import TokenLockItemMenu, { TokenLockMenuAction } from "./TokenLockItemMenu";
import {
  getLiquidityPoolInfo,
  raydiumLpInfoSelector,
} from "@/store/slices/raydiumLpInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LpInfo } from "@/lib/api/models/raydium.model";

type TokenLockListItemProps = {
  onAction: (
    type: TokenLockMenuAction,
    stream: [string, Types.Stream, LpInfo],
  ) => void;
  lockedToken: Awaited<ReturnType<StreamFlow["getLockedTokens"]>>[number];
};

export default function TokenLockListItem({
  lockedToken: [address, stream],
  onAction,
}: TokenLockListItemProps) {
  const { wallet } = useWallet();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.raydiumLpInfo);

  const lpInfo = raydiumLpInfoSelector.selectById(state, stream.mint);

  useEffect(() => {
    getLiquidityPoolInfo(state, dispatch, {
      wallet: wallet.adapter.publicKey.toBase58(),
      mint: stream.mint,
    });
  }, [state, dispatch, wallet]);

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
          <div className="flex items-center space-x-2">
            <OverlapIcon
              images={[
                getCoinImageProps(lpInfo.baseTokenMetadata),
                getCoinImageProps(lpInfo.quoteTokenMetadata),
              ]}
            />
            <p>{lpInfo.lpTokenMetadata.symbol}</p>
          </div>
        </td>
        <td>
          <div className="flex space-x-2 items-center">
            <MdLockOutline />
            <p className="flex items-center space-x-1">
              <span>
                {stream.depositedAmount
                  .div(new BN(10).pow(new BN(lpInfo.lpTokenDecimal)))
                  .toNumber()}
              </span>
              <span className="text-highlight">
                {lpInfo.lpTokenMetadata.symbol}
              </span>
            </p>
          </div>
        </td>
        <td>{moment(stream.period).fromNow()}</td>
        <td>
          <LockStatus
            status={
              stream.closed
                ? "closed"
                : stream.unlocked
                  ? "withdraw"
                  : "pending"
            }
          />
        </td>
        <td>
          <TokenLockItemMenu
            onAction={(type) => {
              onAction(type, [address, stream, lpInfo]);
            }}
          />
        </td>
      </tr>
    )
  );
}
