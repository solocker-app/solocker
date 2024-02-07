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
  selectId: (info) => info.lpTokenMetadata.mint.toString(),
});

export const getLiquidityPoolInfos = createAsyncThunk(
  "raydium/getLiquidityPoolInfos",
  (wallet: string) => Api.instance.raydium.fetchLpInfos(wallet),
);

export const getLiquidityPoolInfo = async (
  state,
  payload: { mint: string; wallet?: string },
) => {
  if (state.entities[payload.mint]) return state.entities[payload.mint];

  const { data } = await Api.instance.raydium.fetchLpInfo(
    payload.mint,
    payload.wallet,
  );

  return data;
};

export const raydiumLpAssetSlice = createSlice({
  name: "raydiumLpInfo",
  initialState: raydiumLpInfoAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {
    setOne: raydiumLpInfoAdapter.setOne
  },
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

export const raydiumLpInfoAction = raydiumLpAssetSlice.actions;
export const raydiumLpInfoReducer = raydiumLpAssetSlice.reducer;
export const raydiumLpInfoSelector = raydiumLpInfoAdapter.getSelectors();
