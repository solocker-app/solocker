import { configureStore } from "@reduxjs/toolkit";

import { raydiumLpInfoReducer } from "./slices/raydiumLpInfo";
import { tokenVestingReducer } from "./slices/tokenVesting";

export const store = configureStore({
  reducer: {
    tokenVesting: tokenVestingReducer,
    raydiumLpInfo: raydiumLpInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
