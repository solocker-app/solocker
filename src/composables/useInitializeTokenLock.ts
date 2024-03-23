import * as Sentry from "@sentry/nextjs";

import { useEffect } from "react";

import { useWallet } from "@solana/wallet-adapter-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getLiquidityPoolInfos,
  raydiumLpInfoSelector,
} from "@/store/slices/raydiumLpInfo";
import {
  getTokenVestingByOwner,
  tokenVestingSelectors,
} from "@/store/slices/tokenVesting";
import { useRepository } from "./useRepository";

export function useInitializeTokenLock() {
  const { publicKey } = useWallet();
  const { repository } = useRepository();
  const dispatch = useAppDispatch();

  const tokenVesting = useAppSelector((state) => state.tokenVesting);
  const raydiumLpInfo = useAppSelector((state) => state.raydiumLpInfo);

  const lpInfos = raydiumLpInfoSelector.selectAll(raydiumLpInfo);
  const lockedTokens = tokenVestingSelectors.selectAll(tokenVesting);

  useEffect(() => {
    if (raydiumLpInfo.loadingState === "idle")
      dispatch(getLiquidityPoolInfos(publicKey.toBase58()))
        .unwrap()
        .catch(Sentry.captureException);
  }, [raydiumLpInfo.loadingState, dispatch]);

  useEffect(() => {
    if (tokenVesting.loadingState === "idle")
      dispatch(getTokenVestingByOwner(publicKey.toBase58()))
        .unwrap()
        .catch(Sentry.captureException);
  }, [tokenVesting.loadingState, dispatch]);

  return {
    lockedTokens,
    lpInfos,
    tokenVestLoadingstate: tokenVesting.loadingState,
    raydiumLpInfoLoadingState: raydiumLpInfo.loadingState,
  };
}
