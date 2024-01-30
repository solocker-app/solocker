import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import Api from "@/lib/api";
import { LpInfo } from "@/lib/api/models/raydium.model";

import { LoadingState } from "../types";
import { useAppDispatch } from "../hooks";

export const raydiumLpInfoAdapter = createEntityAdapter<LpInfo>({
  selectId: (info) => info.lpTokenMetadata.mint,
});

export const getLiquidityPoolInfos = createAsyncThunk(
  "raydium/getLiquidityPoolInfos",
  (wallet: string) => Api.instance.raydium.fetchLpInfos(wallet),
);

export const getLiquidityPoolInfo = async (
  state,
  dispatch: ReturnType<typeof useAppDispatch>,
  payload: { mint: string; wallet },
) => {
  if (state.entities[payload.mint]) return;

  const { data } = await Api.instance.raydium.fetchLpInfo(
    payload.wallet,
    payload.mint,
  );

  dispatch(raydiumLpInfoAdapter.setOne(state, data));
};

export const raydiumLpAssetSlice = createSlice({
  name: "raydriumLpInfo",
  initialState: raydiumLpInfoAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLiquidityPoolInfos.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getLiquidityPoolInfos.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        raydiumLpInfoAdapter.setAll(state, payload.data);
      })
      .addCase(getLiquidityPoolInfos.rejected, (state) => {
        state.loadingState = "failed";
      });
  },
});

export const raydiumLpInfoReducer = raydiumLpAssetSlice.reducer;
export const raydiumLpInfoSelector = raydiumLpInfoAdapter.getSelectors();
