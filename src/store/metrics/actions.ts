import { metricsActions, MetricsState } from '.';
import { AppDispatch } from '..';
import { Metrics } from '../../types/interfaces/Metrics';
import { Measurement } from '../../types/interfaces/Measurement';
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

const updateMeasurement = (value: Measurement[]) => async (dispatch: AppDispatch) => {
  dispatch(metricsActions.setMeasurement(value));
  sendSettingsCommand({
    measurements: value,
  });
};

const combinedActions = {
  ...metricsActions,
  updateMetrics,
  updateMeasurement,
};

export default combinedActions;
