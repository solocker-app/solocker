import { configureStore } from "@reduxjs/toolkit";

import { raydiumLpInfoReducer } from "./slices/raydiumLpInfo";
import { streamflowReducer } from "./slices/streamflow";

export const store = configureStore({
  reducer: {
    raydiumLpInfo: raydiumLpInfoReducer,
    streamFlow: streamflowReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
