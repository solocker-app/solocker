"use client";
import * as Sentry from "@sentry/nextjs";
import { TransactionExpiredBlockheightExceededError } from "@solana/web3.js";

import moment from "moment";
import humanNumber from "human-number";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

import {
  join,
  lpSolanaTokenFee,
  lpTokenFeePercentatge,
  solanaTokenFee,
} from "@/lib/utils";
import { Config } from "@/lib/models/config.model";

import OverlapCoinIcon, { getCoinProps } from "./widgets/OverlapCoinIcon";
import RetryTransactionDialog, {
  RetryTransactionRef,
} from "./RetryTransactionDialog";

type LpTokenLockReviewDialogProps = {
  tokenLock: Config;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateLockContract: (config: Config) => Promise<void>;
};

export default function LpTokenLockReviewDialog({
  tokenLock,
  visible,
  setVisible,
  onCreateLockContract,
}: LpTokenLockReviewDialogProps) {
  const [loading, setLoading] = useState(false);
  const transactionRetryDialogRef = useRef<RetryTransactionRef>(null);

  const sendTransaction = async function () {
    setLoading(true);

    return toast.promise(
      onCreateLockContract(tokenLock)
        .catch((e) => {
          Sentry.captureException(e);
          if (e instanceof TransactionExpiredBlockheightExceededError)
            transactionRetryDialogRef.current.toggle(true);

          throw e;
        })
        .finally(() => setLoading(false)),
      {
        pending: "Creating lock contract",
        error: "An unexpected error occur. Try again!",
        success: "Liquidity token has been locked successfully",
      },
    );
  };

  return (
    <>
      <div
        className={join(
          "fixed inset-0 flex flex-col justify-center items-center bg-black/50 transition transition-200",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className={join(
            "w-7/8 bg-white text-black rounded-xl  md:w-sm",
            visible
              ? "animate-fade-in animate-duration-150"
              : "animate-fade-out animate-duration-150",
          )}
        >
          <header className="flex items-center space-x-2 p-4">
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold">Review Contract</h1>
            </div>
            <button
              className="p-2"
              onClick={() => setVisible(false)}
            >
              <MdClose className="text-xl" />
            </button>
          </header>
          <div className="flex flex-col space-y-4 p-4 overflow-y-scroll">
            <div className="bg-black/20 p-4 rounded-md">
              <p className="text-sm">Number of recipients</p>
              <div className="flex space-x-1 text-xl">
                <h1>1 Recipient</h1>
              </div>
            </div>
            <div className="bg-black/20 p-4 rounded-md">
              <p className="text-sm">Release Time</p>
              <div className="flex space-x-1 text-xl">
                <h1>{moment.unix(tokenLock.period).fromNow()}</h1>
              </div>
            </div>
            <div className="bg-black/20 p-4 rounded-md">
              <p className="text-sm">Total Locked Amount</p>
              <div className="flex items-center space-x-2">
                <OverlapCoinIcon
                  icons={[
                    getCoinProps(tokenLock.token.baseTokenMetadata),
                    getCoinProps(tokenLock.token.quoteTokenMetadata),
                  ]}
                />
                <div className="flex space-x-1 text-xl">
                  <h1>{humanNumber(tokenLock.amount)}</h1>
                  <span className="text-black/50">
                    {tokenLock.token.lpTokenMetadata.symbol}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-black/20 p-4 rounded-md">
              <p className="text-sm">Solocker Fees</p>
              <div className="flex items-center space-x-2">
                <img
                  src="/assets/coins/solana.png"
                  className="w-8 h-8 rounded-full"
                  width={24}
                  height={24}
                />
                <div className="flex">
                  {lpSolanaTokenFee && (
                    <div className="flex items-center text-xl">
                      <h1>{lpSolanaTokenFee}</h1>
                      <span className="text-black/50">SOL</span>
                    </div>
                  )}
                  {lpTokenFeePercentatge && (
                    <div className="flex items-center space-x-1 text-xl">
                      <h1>+</h1>
                      <span className="text-black/50">
                        {lpTokenFeePercentatge * 100}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <button
              className="self-end w-1/2  btn btn-primary"
              disabled={loading}
              onClick={sendTransaction}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  <span>Lock</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <RetryTransactionDialog
        ref={transactionRetryDialogRef}
        title="Transaction Failed"
        subtitle="Transaction expired! Block height exceeded."
        onRetry={sendTransaction}
      />
    </>
  );
}
