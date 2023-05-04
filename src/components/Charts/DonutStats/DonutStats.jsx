import React /*, { useEffect, useState }*/ from 'react';
import { number as numberPropType, bool } from 'prop-types';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);

const DonutStats = ({ attempts, successful, isSmall }) => {
  const donutData = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: '# of Votes',
        data: attempts === 0 ? [0, 1] : [attempts - successful, successful],
        backgroundColor: isSmall
          ? ['rgba(255, 255, 255, 1)', 'rgba(23, 128, 65, 1)']
          : ['rgba(255, 255, 255, 1)', 'rgba(130, 53, 227, 1)'],
        borderColor: isSmall
          ? ['rgba(255, 255, 255, 1)', 'rgba(23, 128, 65, 1)']
          : ['rgba(255, 255, 255, 1))', 'rgba(130, 53, 227, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    cutout: isSmall ? 10 : 50,
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  return <Doughnut data={donutData} options={options} />;
};

DonutStats.propTypes = {
  attempts: numberPropType,
  successful: numberPropType,
  isSmall: bool,
};

DonutStats.defaultProps = {
  attempts: 0,
  successful: 0,
  isSmall: false,
};

export default DonutStats;
