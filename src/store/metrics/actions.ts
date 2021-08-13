import { metricsActions, MetricsState } from '.';
import { AppDispatch } from '..';
import { Metrics } from '../../types/interfaces/Metrics';
import { MetricMeasurement } from '../../types/interfaces/Measurement';
import { metricsToEogObject } from '../../utils/metrics-mapping';

const sendSettingsCommand = (metrics: Partial<MetricsState>) => ({
  method: 'set_plugin_setting',
  params: metricsToEogObject(metrics),
});

const updateMetrics = (value: Metrics[]) => async (dispatch: AppDispatch) => {
  dispatch(metricsActions.setMetrics(value));
  sendSettingsCommand({
    metrics: value,
  });
};

const updateMetricMeasurement = (value: MetricMeasurement[]) => async (dispatch: AppDispatch) => {
  dispatch(metricsActions.setMetricMeasurements(value));
  sendSettingsCommand({
    metricMeasurements: value,
  });
};

const combinedActions = {
  ...metricsActions,
  updateMetrics,
  updateMetricMeasurement,
};

export default combinedActions;
