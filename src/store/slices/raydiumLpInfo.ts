import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import Api from "@/lib/api";
import { LpInfo } from "@/lib/api/models/raydium.model";

import { LoadingState } from "../types";

export const raydiumLpInfoAdapter = createEntityAdapter<LpInfo>();

export const getLiquidityPoolInfos = createAsyncThunk(
  "raydium/getLiquidityPoolInfos",
  (wallet: string) => Api.instance.raydium.fetchLpInfos(wallet)
);

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
