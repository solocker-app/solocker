import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import type Raydium from "@/lib/raydium";
import { LoadingState } from "../types";

type LiquidityPoolInfo = Awaited<
  ReturnType<Raydium["getLiquidityPoolInfos"]>
>[number];
export const raydiumLpAssetAdapter = createEntityAdapter<LiquidityPoolInfo>();

export const getDigitalAssets = createAsyncThunk(
  "raydium/getLiquidityPoolInfos",
  (infos: Promise<LiquidityPoolInfo[]>) => infos
);

export const raydiumLpAssetSlice = createSlice({
  name: "raydriumLpAssets",
  initialState: raydiumLpAssetAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDigitalAssets.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getDigitalAssets.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        raydiumLpAssetAdapter.setAll(state as any, payload);
      })
      .addCase(getDigitalAssets.rejected, (state) => {
        state.loadingState = "failed";
      });
  },
});

export const raydiumLpAssetReducer = raydiumLpAssetSlice.reducer;
export const raydiumLpAssetSelector = raydiumLpAssetAdapter.getSelectors();
