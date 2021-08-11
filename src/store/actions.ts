import configActions from './config/actions';
import { AppDispatch } from '.';

const getMetrics = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(configActions.setMetics([{ name: 'test', value: 'test' }]));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

const combinedActions = {
  ...configActions,
  getMetrics,
};

export default combinedActions;
