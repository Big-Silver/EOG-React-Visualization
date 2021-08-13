import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';

interface ChartProps {
  data?: any;
}

const useStyles = makeStyles(() => ({
  root: {
    maxHeight: 'calc(100vh - 250px)',
  },
}));

const MultiChart: React.FC<ChartProps> = ({ data }) => {
  const classes = useStyles();

  const units = React.useMemo(
    () => {
      const uVals: string[] = [];
      for (let i = 0; i < data.length; i += 1) {
        if (!uVals.includes(data[i].measurements[0].unit)) {
          uVals.push(data[i].measurements[0].unit);
        }
      }
      return uVals;
    },
    [JSON.stringify(data)],
  );

  const items = React.useMemo(
    () => {
      const labels = data[0].measurements.map((m: any) => {
        const time = new Date(m.at);
        return `${time.getHours()} : ${time.getMinutes()}`;
      });
      const datasets = data.map((d: any, idx: number) => {
        const label = d.metric;
        const values = d.measurements.map((m: any) => m.value);

        return {
          label,
          data: values,
          fill: false,
          yAxisID: `y-axis-${d.measurements[0].unit}`,
          backgroundColor: `rgb(${255 / idx}, ${255 % idx}, ${255 / idx})`,
          borderColor: `rgba(${255 / idx}, ${255 / idx}, ${255 / idx}, 0.2)`,
        };
      });

      return {
        labels,
        datasets,
      };
    },
    [JSON.stringify(data)],
  );

  const options = React.useMemo(
    () => {
      const yAxes = units.map((unit) => ({
        type: 'linear',
        display: true,
        position: 'left',
        id: `y-axis-${unit}`,
        ticks: {
          beginAtZero: true,
        },
      }));
      return {
        scales: {
          yAxes,
        },
      };
    },
    [JSON.stringify(data)],
  );

  return (
    <Line className={classes.root} data={items} options={options} />
  );
};

export default MultiChart;
