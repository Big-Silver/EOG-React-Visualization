import React, { useState, useEffect } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MultiSelect from '../components/MultiSelect';
import MeasureCard from '../components/MeasureCard';
import MultiChart from '../components/MultiChart';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Actions from '../store/actions';
import { getMetrics } from '../store/selectors';
import { GET_METRICS, METRICS_SUBSCRIPTION } from '../graphql/queries';
import { camelize } from '../utils/index';
import { Metrics } from '../types/interfaces/Metrics';

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
}));

const Dashboard: React.FC<MainProps> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mData = useAppSelector(getMetrics);
  const [getList, {
    data, called, loading, error,
  }] = useLazyQuery(GET_METRICS);
  const subData = useSubscription(METRICS_SUBSCRIPTION);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (data && !loading && !error && called) {
      const mValues = data.getMetrics;
      const values = mValues.map((m: string) => ({
        label: camelize(m),
        value: m,
      }));
      dispatch(Actions.setMetrics(values));
      setMetrics(values);
    }
  }, [data, loading, called, error]);

  useEffect(() => {
    if (!subData.loading && !subData.error) {
      // console.log(subData.data);
      // console.log(mData);
      const { realtimeMetrics } = mData;
      const rData = JSON.parse(JSON.stringify(realtimeMetrics));
      let flag = false;
      for (let i = 0; i < rData.length; i += 1) {
        console.log(i, rData);
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
  }, [subData.loading, subData.error, JSON.stringify(subData.data)]);

  if (called && loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
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
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <Grid key={value} item>
                <MeasureCard />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.chart}>
        <MultiChart />
      </div>
    </Container>
  );
};
export default Dashboard;
