import { configureStore } from "@reduxjs/toolkit";

import { raydiumLpInfoReducer } from "./slices/raydiumLpInfo";
import { streamflowReducer } from "./slices/streamflow";
import { tokenVestingReducer } from "./slices/tokenVesting";

export const store = configureStore({
  reducer: {
    tokenVesting: tokenVestingReducer,
    raydiumLpInfo: raydiumLpInfoReducer,
    streamFlow: streamflowReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
