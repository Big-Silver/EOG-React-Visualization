import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { assign } from 'lodash';
import { assignActionCreator } from '../../utils/redux';
import { Metrics } from '../../types/interfaces/Metrics';
import { Measurement } from '../../types/interfaces/Measurement';

export interface ConfigState {
  metrics: Metrics[];
  measurements: Measurement[];
}

const initialState: ConfigState = {
  metrics: [],
  measurements: [],
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Partial<ConfigState>>) => {
      assign(state, action.payload);
    },
    setMetics: assignActionCreator<Metrics[]>('metrics'),
    setMeasurement: assignActionCreator<Measurement[]>('measurement'),
  },
});

export const configActions = configSlice.actions;

export const configReducer = configSlice.reducer;
