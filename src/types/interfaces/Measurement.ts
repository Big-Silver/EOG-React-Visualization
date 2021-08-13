export interface Measurement {
  metric: string;
  at: number;
  value: number;
  unit: string;
}

export interface MetricMeasurement {
  metric: string;
  measurements: Measurement[];
}
