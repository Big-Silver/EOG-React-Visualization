import { invert, mapKeys } from 'lodash';

const metricsToeogKeyMap: Record<string, string> = {
  measurements: 'measurements',
};

const eogKeyToMetricsMap = invert(metricsToeogKeyMap);

export const getEogMetricsKey = (key: string) => metricsToeogKeyMap[key];

export const getMetricsKey = (eogKey: string) => eogKeyToMetricsMap[eogKey];

export const eogToMetricsObject = (data: Record<string, any>) => {
  const result = mapKeys(data, (_: any, k: string) => getMetricsKey(k));
  delete result.undefined;

  return result;
};

export const metricsToEogObject = (data: Record<string, any>) => {
  const result = mapKeys(data, (_: any, k: string) => getEogMetricsKey(k));
  delete result.undefined;

  return result;
};
