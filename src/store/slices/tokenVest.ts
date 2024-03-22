import { BaseRepository } from "@/lib";
import { LpLockedToken } from "@/lib/firebase/lockToken";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingState } from "../types";

type Params = {
  repository: BaseRepository;
  address: string;
};

export const getLpLockedTokens = createAsyncThunk(
  "tokenVest/getLpLockedTokens",
  ({ repository, address }: Params) =>
    repository.firebase.lockToken.getLpTokens(address),
);

export const tokenVestAdapter = createEntityAdapter<LpLockedToken>({
  selectId: (model) => model.id,
});

export const tokenVestSlice = createSlice({
  name: "tokenVest",
  initialState: tokenVestAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLpLockedTokens.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getLpLockedTokens.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getLpLockedTokens.fulfilled, (state, { payload }) => {
        tokenVestAdapter.setMany(state, payload);
      });
  },
});

export const tokenVestReducer = tokenVestSlice.reducer;
export const tokenVestActions = tokenVestSlice.actions;
export const tokenVestSelectors = tokenVestAdapter.getSelectors();