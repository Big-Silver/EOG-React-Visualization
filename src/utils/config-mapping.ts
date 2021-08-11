import { invert, mapKeys } from 'lodash';

const configToeogKeyMap: Record<string, string> = {
  measurements: 'measurements',
};

const eogKeyToConfigMap = invert(configToeogKeyMap);

export const getEogConfigKey = (key: string) => configToeogKeyMap[key];

export const getConfigKey = (eogKey: string) => eogKeyToConfigMap[eogKey];

export const eogToConfigObject = (data: Record<string, any>) => {
  const result = mapKeys(data, (_: any, k: string) => getConfigKey(k));
  delete result.undefined;

  return result;
};

export const configToEogObject = (data: Record<string, any>) => {
  const result = mapKeys(data, (_: any, k: string) => getEogConfigKey(k));
  delete result.undefined;

  return result;
};
