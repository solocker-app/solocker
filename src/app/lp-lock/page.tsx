"use client";
import BN from "bn.js";
import moment from "moment";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState, Suspense } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import {
  MdLock,
  MdCalendarMonth,
  MdArrowBack,
  MdOutlineDateRange,
} from "react-icons/md";

import { Types } from "@streamflow/stream";

import { useAppDispatch } from "@/store/hooks";

import { useLpLockInfo, useRepository } from "@/composables";
import LockStatus from "@/components/LockStatus";
import OverlapCoinIcon, {
  getCoinProps,
} from "@/components/widgets/OverlapCoinIcon";
import { LpInfo } from "@/lib/api/models/raydium.model";
import { truncate } from "@/lib/utils";

type LpLockComponentProps = {
  lpInfo: LpInfo;
  address: string;
  stream: Types.Stream;
};

function LpLockComponent({ lpInfo, stream, address }: LpLockComponentProps) {
  const router = useRouter();
  const {
    lpTokenMetadata,
    lpTokenDecimal,
    baseTokenMetadata,
    quoteTokenMetadata,
    totalLpAmount,
  } = lpInfo;

  const lockedPercentage =
    totalLpAmount > 0
      ? stream.depositedAmount
          .div(new BN(10).pow(new BN(lpTokenDecimal)))
          .div(new BN(totalLpAmount))
          .mul(new BN(100))
      : 0;

  return (
    <div className="flex-1  flex flex-col space-y-4 p-4 md:p-8 md:self-center">
      <header className="flex items-center space-x-4">
        <button
          className="p-2"
          onClick={() => router.back()}
        >
          <MdArrowBack className="text-xl" />
        </button>
        <div className="flex-1 flex flex-col">
          <h1 className="text-xl font-bold">Lp Lock</h1>
          <p className="text-sm uppercase text-highlight">
            {lpTokenMetadata.symbol}
          </p>
        </div>
        <div>
          <LockStatus
            status={
              stream.canceledAt > 0
                ? "cancel"
                : stream.closed || stream.end > 0
                  ? "withdraw"
                  : "pending"
            }
          />
        </div>
      </header>
      <div className="flex self-center items-center">
        <OverlapCoinIcon icons={[getCoinProps(baseTokenMetadata)]} />
        <div className="w-24 h-0.5 bg-dark md:w-24" />
        <div className="w-12 h-12">
          <CircularProgressbarWithChildren value={lockedPercentage}>
            <MdLock className="text-2xl" />
          </CircularProgressbarWithChildren>
        </div>
        <div className="w-24 h-0.5 bg-dark md:w-24" />
        <OverlapCoinIcon icons={[getCoinProps(quoteTokenMetadata)]} />
      </div>
      <div className="flex-1 flex flex-col space-y-4 md:min-w-lg md:self-center">
        <div className="card !px-2">
          <OverlapCoinIcon
            className="w-6 h-6"
            icons={[
              getCoinProps(baseTokenMetadata),
              getCoinProps(quoteTokenMetadata),
            ]}
          />
          <div>
            <h1 className="text-base font-medium">Total LP Amount</h1>
            <p className="text-sm text-highlight">
              {totalLpAmount} {lpTokenMetadata.symbol}
            </p>
          </div>
        </div>
        <div className="card">
          <MdLock className="text-xl" />
          <div>
            <h1 className="text-base font-medium">Locked Amount</h1>
            <p className="text-sm text-highlight">
              {stream.depositedAmount
                .div(new BN(10).pow(new BN(lpTokenDecimal)))
                .toNumber()}
              {lpTokenMetadata.symbol}
            </p>
          </div>
        </div>
        <div className="card">
          <MdCalendarMonth className="text-xl" />
          <div>
            <h1 className="text-base font-medium">Created Date</h1>
            <div className="flex space-x-2 items-center">
              <p className="text-sm">{moment.unix(stream.createdAt).toNow()}</p>
              <p className="text-xs text-highlight">
                {moment
                  .unix(stream.createdAt)
                  .format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <MdOutlineDateRange className="text-xl" />
          <div>
            <h1 className="text-base font-medium">Unlock Date</h1>
            <div className="flex space-x-2 items-center">
              <p className="text-sm">{moment.unix(stream.period).fromNow()}</p>
              <p className="text-xs text-highlight">
                {moment.unix(stream.period).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
          </div>
        </div>
        <div className="card overflow-x-hidden">
          <MdLock className="text-xl" />
          <div>
            <h1 className="text-base font-medium">Lock Owner</h1>
            <p className="text-sm text-highlight">{truncate(stream.sender)}</p>
          </div>
        </div>
      </div>
      <div className="self-center flex">
        <Link
          href={"https://solscan.io/account/" + address}
          target="_blank"
          className="btn btn-text"
        >
          SolScan
        </Link>
        <Link
          href={"https://solana.fm/address/" + address}
          target="_blank"
          className="btn btn-text"
        >
          SolanaFM
        </Link>
        <Link
          href={"https://raydium.io/"}
          target="_blank"
          className="btn btn-text"
        >
          Raydium
        </Link>
      </div>
    </div>
  );
}

export default function LpLockPage() {
  const router = useRouter();
  const search = useSearchParams();
  const { repository } = useRepository();
  console.log(repository);

  const [stream, setStream] = useState<Types.Stream>();
  const { lpInfo } = useLpLockInfo(stream, false);
  const address = search.get("address") as string | undefined;

  useEffect(() => {
    if (!address) router.push("/");
    console.log(repository);
    if (repository)
      repository.streamflow
        .getLockToken(address)
        .then(setStream)
        .catch(console.log);
  }, [search, repository]);

  return lpInfo && stream ? (
    <LpLockComponent
      lpInfo={lpInfo}
      stream={stream}
      address={address}
    />
  ) : (
    <div className="m-auto w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
  );
}
