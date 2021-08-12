import { configureStore } from '@reduxjs/toolkit';

import { metricsReducer } from './metrics';

const store = configureStore({
  reducer: {
    metrics: metricsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
