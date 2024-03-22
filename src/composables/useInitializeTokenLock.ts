import * as Sentry from "@sentry/nextjs";

import { useEffect } from "react";

import { useWallet } from "@solana/wallet-adapter-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getLiquidityPoolInfos,
  raydiumLpInfoSelector,
} from "@/store/slices/raydiumLpInfo";
import {
  getLpLockedTokens,
  tokenVestSelectors,
} from "@/store/slices/tokenVest";
import { useRepository } from "./useRepository";

export function useInitializeTokenLock() {
  const { publicKey } = useWallet();
  const { repository } = useRepository();
  const dispatch = useAppDispatch();

  const tokenVest = useAppSelector((state) => state.tokenVest);
  const raydiumLpInfo = useAppSelector((state) => state.raydiumLpInfo);

  const lpInfos = raydiumLpInfoSelector.selectAll(raydiumLpInfo);
  const lockedTokens = tokenVestSelectors.selectAll(tokenVest);

  useEffect(() => {
    if (raydiumLpInfo.loadingState === "idle")
      dispatch(getLiquidityPoolInfos(publicKey.toBase58()))
        .unwrap()
        .catch(Sentry.captureException);
  }, [raydiumLpInfo.loadingState, dispatch]);

  useEffect(() => {
    if (tokenVest.loadingState === "idle")
      dispatch(
        getLpLockedTokens({
          repository,
          address: publicKey.toBase58(),
        }),
      )     
        .unwrap()
        .catch(Sentry.captureException);
  }, [tokenVest.loadingState, dispatch]);

  return {
    lockedTokens,
    lpInfos,
    tokenVestLoadingstate: tokenVest.loadingState,
    raydiumLpInfoLoadingState: raydiumLpInfo.loadingState,
  };
}
