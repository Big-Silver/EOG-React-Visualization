import { configureStore } from '@reduxjs/toolkit';

import { configReducer } from './config';

const store = configureStore({
  reducer: {
    config: configReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
