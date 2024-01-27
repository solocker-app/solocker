import { configureStore } from '@reduxjs/toolkit';

import { tokenLockReducer } from "./tokenLockSlice";

export const store = configureStore({
  reducer: {
    tokenLock: tokenLockReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
