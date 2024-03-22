import * as Sentry from "@sentry/nextjs";

import { useEffect } from "react";

import { useWallet } from "@solana/wallet-adapter-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getLiquidityPoolInfos,
  raydiumLpInfoSelector,
} from "@/store/slices/raydiumLpInfo";
import { streamflowSelector } from "@/store/slices/streamflow";

export function useInitializeTokenLock() {
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();

  const streamflow = useAppSelector((state) => state.streamFlow);
  const raydiumLpInfo = useAppSelector((state) => state.raydiumLpInfo);

  const lpInfos = raydiumLpInfoSelector.selectAll(raydiumLpInfo);
  const lockedTokens = streamflowSelector.selectAll(streamflow);

  useEffect(() => {
    if (raydiumLpInfo.loadingState === "idle")
      dispatch(getLiquidityPoolInfos(publicKey.toBase58()))
        .unwrap()
        .catch(Sentry.captureException);
  }, [raydiumLpInfo.loadingState, dispatch]);

  return {
    lockedTokens,
    lpInfos,
    raydiumLpInfoLoadingState: raydiumLpInfo.loadingState,
  };
}
