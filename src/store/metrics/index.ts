import { createSlice } from '@reduxjs/toolkit';
import { assignActionCreator } from '../../utils/redux';
import { Metrics, RealtimeMetric } from '../../types/interfaces/Metrics';
import { Measurement } from '../../types/interfaces/Measurement';

export interface MetricsState {
  metrics: Metrics[];
  selectedMetrics: Metrics[];
  realtimeMetrics: RealtimeMetric[];
  measurements: Measurement[];
}

const initialState: MetricsState = {
  metrics: [],
  selectedMetrics: [],
  realtimeMetrics: [],
  measurements: [],
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetrics: assignActionCreator<Metrics[]>('metrics'),
    setSelectedMetrics: assignActionCreator<Metrics[]>('selectedMetrics'),
    setRealtimeMetrics: assignActionCreator<RealtimeMetric[]>('realtimeMetrics'),
    setMeasurement: assignActionCreator<Measurement[]>('measurement'),
  },
});

export const metricsActions = metricsSlice.actions;

export const metricsReducer = metricsSlice.reducer;
