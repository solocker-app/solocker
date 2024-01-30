import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import Metaplex from "@/lib/metaplex";
import { LoadingState } from "../types";

export const digitalAssetAdapter =
  createEntityAdapter<
    Awaited<
      ReturnType<Metaplex["fetchAllDigitalAssetWithTokenByOwner"]>
    >[number]
  >();

export const getDigitalAssets = createAsyncThunk(
  "digitalAssets/getDigitalAssets",
  (fetch: Metaplex["fetchAllDigitalAssetWithTokenByOwner"]) => fetch(),
);

export const digitalAssetSlice = createSlice({
  name: "digitalAssets",
  initialState: digitalAssetAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDigitalAssets.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getDigitalAssets.fulfilled, (state, data) => {
        state.loadingState = "success";
        digitalAssetAdapter.setAll(state, data);
      })
      .addCase(getDigitalAssets.rejected, (state) => {
        state.loadingState = "failed";
      });
  },
});

export const digitalAssetReducer = digitalAssetSlice.reducer;
export const digitalAssetSelector = digitalAssetAdapter.getSelectors();
