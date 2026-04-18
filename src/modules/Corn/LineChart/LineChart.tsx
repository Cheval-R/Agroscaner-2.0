import type { ChartDataset } from 'chart.js';
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

import type { TForecastTemperature } from '../functions/getPredictionTemperature';
import { getSumEffectiveTemperature } from '../functions/getSumEffectiveTemperature';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface Props {
  data: TForecastTemperature;
  baseTemp: number;
}

function createPolygonDataset(sumEffectiveTemperature: number[]): ChartDataset<'line'> | undefined {
  const startIndex = sumEffectiveTemperature.findIndex((temperature) => temperature >= 850);
  let endIndex = sumEffectiveTemperature.findIndex((temperature) => temperature >= 950);

  if (startIndex === -1) return;
  if (endIndex === -1) endIndex = sumEffectiveTemperature.length - 1;

  const polygonData = Array(sumEffectiveTemperature.length).fill(null);

  for (let i = startIndex; i != endIndex; i++) {
    polygonData[i] = sumEffectiveTemperature[i];
  }

  const polygonDataset: ChartDataset<'line'> = {
    label: 'Оптимальный период (850–950)',
    data: polygonData,
    fill: 'origin',
    backgroundColor: 'rgba(75, 192, 192, 0.6)',
    borderColor: 'transparent',
    pointRadius: 0,
    tension: 0.1,
    yAxisID: 'y1',
    borderWidth: 0,
  };

  return polygonDataset;
}

const LineChart: React.FC<Props> = ({ data, baseTemp }) => {
  const sumEffectiveTemperature = getSumEffectiveTemperature(data, baseTemp);

  const datasets: ChartDataset<'line'>[] = [
    {
      label: 'Средняя температура дня',
      data: [...data.map((elem) => elem.meanTemp)],
      borderColor: 'rgb(252, 194, 59)',
      borderDash: [5, 1],
      backgroundColor: 'rgba(252, 194, 59, 0.5)',
      tension: 0.1,
      yAxisID: 'y',
    },
    {
      label: 'Сумма эффективных температур',
      data: [...sumEffectiveTemperature],
      borderColor: 'rgb(41, 139, 55)',
      borderDash: [5, 1],
      backgroundColor: 'rgba(41, 139, 55, 0.5)',
      tension: 0.1,
      yAxisID: 'y1',
    },
  ];
  const optimalPolygonDataset = createPolygonDataset(sumEffectiveTemperature);
  if (optimalPolygonDataset) {
    datasets.push(optimalPolygonDataset);
  }
  const labels: string[] = data.map((elem) => elem.date);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
      tooltip: {
        filter: (tooltipItem: any) => {
          const datasetLabel = tooltipItem.dataset.label;
          return datasetLabel !== 'Оптимальный период (850–950)';
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <>
      <Line
        key="mean-temp-chart"
        data={{
          labels,
          datasets,
        }}
        options={options}
      />
    </>
  );
};

export default LineChart;
