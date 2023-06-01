import React from 'react';
import { array } from 'prop-types';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);

const DonutStatsMultiple = ({ colors, data }) => {
  const labels = ['Elves', 'Dwarves', 'Humans', 'Orcs'];

  const datasets = [
    {
      label: '% of Supporters',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    },
  ];

  labels.forEach((label, index) => {
    datasets[0].data.push(data[index]);
    datasets[0].backgroundColor.push(colors[index]);
    datasets[0].borderColor.push(colors[index]);
  });

  const donutData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    cutout: 70,
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

DonutStatsMultiple.propTypes = {
  colors: array,
  data: array,
};

DonutStatsMultiple.defaultProps = {
  colors: [],
  data: [],
};

export default DonutStatsMultiple;
