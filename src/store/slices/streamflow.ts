import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import type StreamFlow from "@/lib/streamflow";
import { LoadingState } from "../types";

type LockedToken = Awaited<ReturnType<StreamFlow["getLockedTokens"]>>[number];
export const streamflowAdapter = createEntityAdapter<LockedToken>({
  selectId: (model) => model.address,
});

export const getLockedTokens = createAsyncThunk(
  "streamflow/getLockedTokens",
  (lockedTokens: Promise<LockedToken[]>) => lockedTokens,
);

export const streamflowSlice = createSlice({
  name: "streamflow",
  initialState: streamflowAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {
    addOne: streamflowAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase(getLockedTokens.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getLockedTokens.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        streamflowAdapter.setAll(state as any, payload);
      })
      .addCase(getLockedTokens.rejected, (state) => {
        state.loadingState = "failed";
      });
  },
});

export const streamflowReducer = streamflowSlice.reducer;
export const streamflowSelector = streamflowAdapter.getSelectors();
export const streamflowAction = streamflowSlice.actions;
