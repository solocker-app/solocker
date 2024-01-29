import { configureStore } from "@reduxjs/toolkit";

import { tokenLockReducer } from "./slices/tokenLock";
import { digitalAssetReducer } from "./slices/digitalAsset";
import { raydiumLpInfoReducer } from "./slices/raydiumLpInfo";
import { streamflowReducer } from "./slices/streamflow";

export const store = configureStore({
  reducer: {
    tokenLock: tokenLockReducer,
    digitalAsset: digitalAssetReducer,
    raydiumLpInfo: raydiumLpInfoReducer,
    streamFlow: streamflowReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
