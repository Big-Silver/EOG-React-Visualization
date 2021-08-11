import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MultiSelect from '../components/MultiSelect';
import MeasureCard from '../components/MeasureCard';
import MultiChart from '../components/MultiChart';
import { useAppDispatch } from '../store/hooks';
import Actions from '../store/actions';

interface MainProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 75px)',
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

  useEffect(() => {
    dispatch(Actions.getMetrics());
  }, []);

  return (
    <Container className={classes.root} maxWidth="xl">
      <div className={classes.multiSelect}>
        <MultiSelect />
      </div>
      <MeasureCard />
      <div className={classes.chart}>
        <MultiChart />
      </div>
    </Container>
  );
};
export default Dashboard;
