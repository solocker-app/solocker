import { configureStore } from "@reduxjs/toolkit";

import { lpTokenVestingReducer } from "./slices/lpTokenVesting";
import { digitalAssetReducer } from "./slices/digitalAsset";
import { raydiumLpInfoReducer } from "./slices/raydiumLpInfo";
import { tokenVestingReducer } from "./slices/tokenVesting";

export const store = configureStore({
  reducer: {
    tokenVesting: tokenVestingReducer,
    lpTokenVesting: lpTokenVestingReducer,
    digitalAsset: digitalAssetReducer,
    raydiumLpInfo: raydiumLpInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
