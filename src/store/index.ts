import { configureStore } from "@reduxjs/toolkit";

import { raydiumLpInfoReducer } from "./slices/raydiumLpInfo";
import { streamflowReducer } from "./slices/streamflow";
import { tokenVestReducer } from "./slices/tokenVest";

export const store = configureStore({
  reducer: {
    tokenVest: tokenVestReducer,
    raydiumLpInfo: raydiumLpInfoReducer,
    streamFlow: streamflowReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
