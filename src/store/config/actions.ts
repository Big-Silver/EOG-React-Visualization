import { configActions, ConfigState } from '.';
import { AppDispatch } from '..';
import { Metrics } from '../../types/interfaces/Metrics';
import { Measurement } from '../../types/interfaces/Measurement';
import { configToEogObject } from '../../utils/config-mapping';

const sendSettingsCommand = (config: Partial<ConfigState>) => ({
  method: 'set_plugin_setting',
  params: configToEogObject(config),
});

const updateMetrics = (value: Metrics[]) => async (dispatch: AppDispatch) => {
  dispatch(configActions.setMetics(value));
  sendSettingsCommand({
    metrics: value,
  });
};

const updateMeasurement = (value: Measurement[]) => async (dispatch: AppDispatch) => {
  dispatch(configActions.setMeasurement(value));
  sendSettingsCommand({
    measurements: value,
  });
};

const combinedActions = {
  ...configActions,
  updateMetrics,
  updateMeasurement,
};

export default combinedActions;
