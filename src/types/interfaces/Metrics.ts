import { Measurement } from './Measurement';

export interface Metrics {
  label: string;
  value: string;
}

export interface RealtimeMetric {
  metric: string;
  measurement: Measurement
}
