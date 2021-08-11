import { PayloadAction } from '@reduxjs/toolkit';

export const assignActionCreator = <T>(key: string) => (state: any, action: PayloadAction<T>) => {
  state[key] = action.payload;
};
