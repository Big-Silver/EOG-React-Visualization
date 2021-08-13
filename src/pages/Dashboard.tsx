import React, { useState, useEffect } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ClipLoader from 'react-spinners/ClipLoader';
import MultiSelect from '../components/MultiSelect';
import MeasureCard from '../components/MeasureCard';
import MultiChart from '../components/MultiChart';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Actions from '../store/actions';
import { getMetrics } from '../store/selectors';
import { GET_METRICS, METRICS_SUBSCRIPTION, GET_MULTI_MEASUREMENTS } from '../graphql/queries';
import { camelize } from '../utils/index';
import { Metrics, RealtimeMetric } from '../types/interfaces/Metrics';
import { MetricMeasurement } from '../types/interfaces/Measurement';

interface MainProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 75px)',
    flexGrow: 1,
  },
  multiSelect: {
    width: '50%',
  },
  chart: {
    height: 'calc(100vh - 200px)',
  },
  loading: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Dashboard: React.FC<MainProps> = () => {
  const classes = useStyles();
  const [metrics, setMetrics] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [mulMeticMeasurements, setMulMeticMeasurements] = useState([]);
  const [multiVariables, setMultiVariables] = useState([]);

  const dispatch = useAppDispatch();
  const mData = useAppSelector(getMetrics);
  const [getList, gData] = useLazyQuery(GET_METRICS);
  const [getMultiMeasurements, multiData] = useLazyQuery(GET_MULTI_MEASUREMENTS, {
    variables: {
      input: multiVariables,
    },
  });
  const subData = useSubscription(METRICS_SUBSCRIPTION);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (gData.data && !gData.loading && !gData.error && gData.called) {
      const mValues = gData.data.getMetrics;
      const values = mValues.map((m: string) => ({
        label: camelize(m),
        value: m,
      }));
      dispatch(Actions.setMetrics(values));
    }
  }, [gData.data, gData.loading, gData.called, gData.error]);

  useEffect(() => {
    if (!subData.loading && !subData.error) {
      const { realtimeMetrics } = mData;
      const rData = JSON.parse(JSON.stringify(realtimeMetrics));
      const multiMetrics = mulMeticMeasurements;
      let flag = false;
      for (let i = 0; i < rData.length; i += 1) {
        multiMetrics.map((m: MetricMeasurement) => {
          const measurements = JSON.parse(JSON.stringify(m.measurements));
          if (rData[i].metric === m.metric) {
            const tempMeasurement = JSON.parse(JSON.stringify(rData[i].measurement));
            measurements.push(tempMeasurement);
            measurements.shift();
          }
          return {
            metrics: m.metric,
            measurements,
          };
        });
        if (rData[i].metric === subData.data.newMeasurement.metric) {
          rData[i].measurement = subData.data.newMeasurement;
          flag = true;
        }
      }
      if (!flag) {
        rData.push({
          metric: subData.data.newMeasurement.metric,
          measurement: subData.data.newMeasurement,
        });
      }
      dispatch(Actions.setRealtimeMetrics(rData));
    }
  }, [subData.loading, subData.error, subData.data]);

  useEffect(() => {
    if (multiData.data && !multiData.loading && !multiData.error && multiData.called) {
      dispatch(Actions.setMetricMeasurements(multiData.data.getMultipleMeasurements));
    }
  }, [multiData.data, multiData.loading, multiData.called, multiData.error]);

  useEffect(() => {
    setMetrics(JSON.parse(JSON.stringify(mData.metrics)));
    if (mData.metrics.length) {
      const mVariables = mData.metrics.map((m: Metrics) => ({
        metricName: m.value,
        after: Date.now() - (30 * 60 * 1000),
        before: Date.now(),
      }));

      setMultiVariables(JSON.parse(JSON.stringify(mVariables)));
      getMultiMeasurements();
    }
  }, [mData.metrics]);

  useEffect(() => {
    setMulMeticMeasurements(JSON.parse(JSON.stringify(mData.metricMeasurements)));
  }, [mData.metricMeasurements]);

  useEffect(() => {
    const selectedList = mData.selectedMetrics.map((m: Metrics) => m.value);
    const selectedRealList = mData.realtimeMetrics.filter(
      (m: RealtimeMetric) => selectedList.includes(m.metric),
    );
    setSelectedMetrics(JSON.parse(JSON.stringify(selectedRealList)));
  }, [mData.realtimeMetrics]);

  const realChartData = React.useMemo(() => mulMeticMeasurements.filter((m: MetricMeasurement) => {
    const tempSelectedM: MetricMeasurement[] = selectedMetrics;
    for (let i = 0; i < tempSelectedM.length; i += 1) {
      if (tempSelectedM[i].metric === m.metric) return true;
    }
    return false;
  }), [selectedMetrics, mulMeticMeasurements]);

  if (gData.called && gData.loading) {
    return (
      <div className={classes.loading}>
        <ClipLoader color="#36d7b7" size={150} />
      </div>
    );
  }

  if (gData.error || multiData.error) {
    toast('Something went wrong!', { type: 'error' });
  }

  if (subData.error) {
    toast('Websoket was disconnected!, trying now.', { type: 'warning' });
  }

  const changeMultiSelect = (e: Metrics[]) => {
    dispatch(Actions.setSelectedMetrics(e));
  };

  return (
    <Container className={classes.root} maxWidth="xl">
      <div className={classes.multiSelect}>
        <MultiSelect data={metrics} onChange={changeMultiSelect} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {selectedMetrics.map((m: RealtimeMetric) => (
              <Grid key={m.metric} item>
                <MeasureCard data={m.measurement} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.chart}>
        { realChartData.length ? <MultiChart data={realChartData} /> : null }
      </div>
    </Container>
  );
};
export default Dashboard;
