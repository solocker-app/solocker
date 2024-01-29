import { configureStore } from "@reduxjs/toolkit";

import { tokenLockReducer } from "./slices/tokenLock";
import { digitalAssetReducer } from "./slices/digitalAsset";
import { raydiumLpAssetReducer } from "./slices/raydiumLpAsset";
import { streamflowReducer } from "./slices/streamflow";

export const store = configureStore({
  reducer: {
    tokenLock: tokenLockReducer,
    digitalAsset: digitalAssetReducer,
    raydiumAsset: raydiumLpAssetReducer,
    streamFlow: streamflowReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
