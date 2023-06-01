import React from 'react';
import { array } from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const LineStats = ({ data }) => {
  // eslint-disable-next-line no-unused-vars
  let labelIndexes = [];

  data.forEach((element) => {
    labelIndexes.push(data.indexOf(element) + 1);
  });

  const radarData = {
    labels: labelIndexes,
    datasets: [
      {
        data: data,
        borderColor: 'rgba(165, 68, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          title: () => null,
        },
        bodyFont: {
          size: 20,
          weight: 600,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        reverse: true,
        ticks: {
          reverse: true,
          color: 'white',
          font: {
            size: 14,
            weight: 600,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)',
          // display: false,
        },
        border: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 14,
            weight: 600,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)',
          // display: false,
        },
        border: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
  };

  return <Line data={radarData} options={options} />;
};

LineStats.propTypes = {
  data: array,
};

LineStats.defaultProps = {
  data: [],
};

export default LineStats;
