import React, { useEffect, useState } from 'react';
import { array } from 'prop-types';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import styles from './RadarStats.module.scss';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const RadarStats = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      const labelArray = [];
      const dataArray = [];
      data.forEach((element) => {
        labelArray.push(
          element.attribute.charAt(0).toUpperCase() + element.attribute.slice(1)
        );
        dataArray.push(element.value);
      });
      setLabels(labelArray);
      setChartData(dataArray);
    }
  }, [data]);

  const radarData = {
    labels: labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: 'rgba(165, 68, 255, 0.2)',
        borderColor: 'rgba(165, 68, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        left: 15,
        right: 15,
        top: 15,
        bottom: 15,
      },
    },
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
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.25)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.25)',
        },
        min: 0,
        ticks: {
          display: false,
        },
        pointLabels: {
          color: 'white',
          font: {
            size: 14,
            weight: 600,
          },
        },
      },
    },
  };

  return (
    <div className={styles.attributesVisualizer}>
      <Radar data={radarData} options={options} />
    </div>
  );
};

RadarStats.propTypes = {
  data: array.isRequired,
};

// RadarStats.defaultProps = {
//   data: [],
// };

export default RadarStats;
