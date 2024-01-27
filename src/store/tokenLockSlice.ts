import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

import StreamFlow from  "@/lib/streamflow";

type LoadingState = "idle" | "pending" | "error" | "success";
type TokenLock = Awaited<ReturnType<StreamFlow["getLockedTokens"]>>[number];

export const getLockedTokens = createAsyncThunk(
  "tokenLock/getLockedTokens", 
  (streamflow: StreamFlow) => streamflow.getLockedTokens()
);

export const tokenLockAdapter = createEntityAdapter<TokenLock>({
  selectId: ([id]) => id,
});

export const tokenLockSlice = createSlice({
  name: "tokenLock",
  initialState: tokenLockAdapter.getInitialState({
    loadingState: "idle" as LoadingState,
  }),
  reducers: {},
  extraReducers(builder){
    builder.addCase(getLockedTokens.pending, (state) => {
      state.loadingState = "pending";
    })
    .addCase(getLockedTokens.rejected, (state) => {
      state.loadingState = "error";
    })
    .addCase(getLockedTokens.fulfilled, (state, data) => {
      state.loadingState = "success";
      tokenLockAdapter.setAll(state, data);
    })
  }
});

export const tokenLockReducer = tokenLockSlice.reducer;
export const tokenLockSelector = tokenLockAdapter.getSelector();