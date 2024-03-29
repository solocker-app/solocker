import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { DigitalAssetWithJsonMetadata } from "@/lib/api/metaplex";

import type { LoadingState } from "../types";
import Api from "@/lib/api";

export const getDigitalAssetsByOwner = createAsyncThunk(
  "digitalAsset/getDigitalAssetsByOwner",
  async (wallet: string) => {
    const { data } = await Api.instance.metaplex.getDigitalAssetsByUser(wallet);
    return data;
  },
);

export const digitalAssetAdapter =
  createEntityAdapter<DigitalAssetWithJsonMetadata>({
    selectId: (model) => model.publicKey,
  });

export const digitalAssetSlice = createSlice({
  name: "digitalAsset",
  initialState: digitalAssetAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDigitalAssetsByOwner.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getDigitalAssetsByOwner.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getDigitalAssetsByOwner.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        digitalAssetAdapter.setMany(state, payload);
      });
  },
});

export const digitalAssetReducer = digitalAssetSlice.reducer;
export const digitalAssetActions = digitalAssetSlice.actions;
export const digitalAssetSelectors = digitalAssetAdapter.getSelectors();
