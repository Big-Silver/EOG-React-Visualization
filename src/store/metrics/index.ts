import { createSlice } from '@reduxjs/toolkit';
import { assignActionCreator } from '../../utils/redux';
import { Metrics, RealtimeMetric } from '../../types/interfaces/Metrics';
import { MetricMeasurement } from '../../types/interfaces/Measurement';

export interface MetricsState {
  metrics: Metrics[];
  selectedMetrics: Metrics[];
  realtimeMetrics: RealtimeMetric[];
  metricMeasurements: MetricMeasurement[];
}

const initialState: MetricsState = {
  metrics: [],
  selectedMetrics: [],
  realtimeMetrics: [],
  metricMeasurements: [],
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetrics: assignActionCreator<Metrics[]>('metrics'),
    setSelectedMetrics: assignActionCreator<Metrics[]>('selectedMetrics'),
    setRealtimeMetrics: assignActionCreator<RealtimeMetric[]>('realtimeMetrics'),
    setMetricMeasurements: assignActionCreator<MetricMeasurement[]>('metricMeasurements'),
  },
});

export const metricsActions = metricsSlice.actions;

export const metricsReducer = metricsSlice.reducer;
