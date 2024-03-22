import { useEffect, useState } from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { Types } from "@streamflow/stream";

import {
  getLiquidityPoolInfo,
  raydiumLpInfoAction,
  raydiumLpInfoSelector,
} from "@/store/slices/raydiumLpInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useLpLockInfo(mint?: string, includeWallet = true) {
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Error | null>(null);
  const state = useAppSelector((state) => state.raydiumLpInfo);

  const lpInfo = raydiumLpInfoSelector.selectById(state, mint);

  const fetchData = async () => {
    const data = await getLiquidityPoolInfo(state, {
      mint: mint,
      wallet: includeWallet ? publicKey.toBase58() : null,
    });

    dispatch(raydiumLpInfoAction.setOne(data));
  };

  useEffect(() => {
    if (mint) fetchData().catch(setError);
  }, [mint, state, dispatch, publicKey]);

  return {
    lpInfo,
    error,
  };
}
