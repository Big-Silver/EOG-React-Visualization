import { gql } from '@apollo/client';

export const GET_METRICS = gql`
  query GetMetrics {
    getMetrics
  }
`;

export const METRICS_SUBSCRIPTION = gql`
  subscription OnMetricsAdded {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export const GET_MULTI_MEASUREMENTS = gql`
  query GetMultipleMeasurements($input: [MeasurementQuery!]!) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        value
        at
        unit
      }
    }
  }
`;
