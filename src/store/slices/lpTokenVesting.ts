import BN from "bn.js";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import Api from "@/lib/api";
import { LpTokenVesting } from "@/lib/api/models/tokenVesting.model";

import { LoadingState } from "../types";

export const getLpTokenVestingByOwner = createAsyncThunk(
  "lpTokenVest/getTokenVestingByOwner",
  (address: string) =>
    Api.instance.tokenVesting.getLpTokenVestingByOwner(address),
);

export const lpTokenVestingAdapter = createEntityAdapter<LpTokenVesting>({
  selectId: (model) => model.contractInfo.seed,
  sortComparer: (a, b) =>
    new BN(b.contractInfo.createdAt, "hex").toNumber() -
    new BN(a.contractInfo.createdAt, "hex").toNumber(),
});

export const lpTokenVestingSlice = createSlice({
  name: "tokenVesting",
  initialState: lpTokenVestingAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {
    updateOne: lpTokenVestingAdapter.updateOne,
    addOne: lpTokenVestingAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getLpTokenVestingByOwner.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getLpTokenVestingByOwner.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getLpTokenVestingByOwner.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        lpTokenVestingAdapter.setMany(state, payload.data);
      });
  },
});

export const lpTokenVestingReducer = lpTokenVestingSlice.reducer;
export const lpTokenVestingActions = lpTokenVestingSlice.actions;
export const lpTokenVestingSelectors = lpTokenVestingAdapter.getSelectors();
