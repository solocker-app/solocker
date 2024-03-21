import { useEffect } from "react";

import { useWallet } from "@solana/wallet-adapter-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getLiquidityPoolInfos,
  raydiumLpInfoSelector,
} from "@/store/slices/raydiumLpInfo";
import { streamflowSelector, getLockedTokens } from "@/store/slices/streamflow";

import { useRepository } from "./useRepository";

export function useInitializeTokenLock() {
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();
  const { repository } = useRepository();

  const streamflow = useAppSelector((state) => state.streamFlow);
  const raydiumLpInfo = useAppSelector((state) => state.raydiumLpInfo);

  const lpInfos = raydiumLpInfoSelector.selectAll(raydiumLpInfo);
  const lockedTokens = streamflowSelector.selectAll(streamflow);

  useEffect(() => {
    if (raydiumLpInfo.loadingState === "idle")
      dispatch(getLiquidityPoolInfos(publicKey.toBase58()))
        .unwrap()
        .catch(console.log);
  }, [raydiumLpInfo.loadingState, dispatch]);

  useEffect(() => {
    if (streamflow.loadingState === "idle")
      dispatch(
        getLockedTokens(
          repository.streamflow.getLockedTokens(publicKey.toBase58()),
        ),
      )
        .unwrap()
        .catch(console.log);
  }, [streamflow.loadingState, dispatch]);

  return {
    lockedTokens,
    lpInfos,
    streamflowLoadingState: streamflow.loadingState,
    raydiumLpInfoLoadingState: raydiumLpInfo.loadingState,
  };
}
