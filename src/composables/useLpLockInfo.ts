import { useEffect } from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { Types } from "@streamflow/stream";

import {
  getLiquidityPoolInfo,
  raydiumLpInfoAction,
  raydiumLpInfoSelector,
} from "@/store/slices/raydiumLpInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useLpLockInfo(stream?: Types.Stream, includeWallet = true) {
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.raydiumLpInfo);

  const lpInfo = raydiumLpInfoSelector.selectById(state, stream?.mint);

  const fetchData = async () => {
    const data = await getLiquidityPoolInfo(state, {
      mint: stream.mint,
      wallet: includeWallet ? publicKey.toBase58() : null,
    });

    dispatch(raydiumLpInfoAction.setOne(data));
  };

  useEffect(() => {
    if (stream) fetchData();
  }, [stream, state, dispatch, publicKey]);

  return {
    lpInfo,
  };
}
