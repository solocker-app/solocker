import { BaseRepository } from "@/lib";
import { LpLockedToken } from "@/lib/firebase/lockToken";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingState } from "../types";
import Api from "@/lib/api";
import { TokenVesting } from "@/lib/api/models/tokenVesting.model";

export const getTokenVestingByOwner = createAsyncThunk(
  "tokenVest/getTokenVestingByOwner",
  (address: string) =>
    Api.instance.tokenVesting.getTokenVestingByOwner(address),
);

export const tokenVestingAdapter = createEntityAdapter<TokenVesting>({
  selectId: (model) => model.seed,
});

export const tokenVestingSlice = createSlice({
  name: "tokenVesting",
  initialState: tokenVestingAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {
    updateOne: tokenVestingAdapter.updateOne,
    addOne: tokenVestingAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getTokenVestingByOwner.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getTokenVestingByOwner.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getTokenVestingByOwner.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        tokenVestingAdapter.setMany(state, payload.data);
      });
  },
});

export const tokenVestingReducer = tokenVestingSlice.reducer;
export const tokenVestingActions = tokenVestingSlice.actions;
export const tokenVestingSelectors = tokenVestingAdapter.getSelectors();
