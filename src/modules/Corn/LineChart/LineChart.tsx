import type { ChartDataset, ChartOptions, TooltipItem } from 'chart.js';
import { CategoryScale, Chart, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { forwardRef, useEffect, useRef, useState, type Ref } from 'react';
import { Line } from 'react-chartjs-2';

import type { IChartData } from '../functions/getPredictionTemperature';
import ss from './LineChart.module.scss';

const BASE_WIDTH = 1200; // условная "базовая" ширина
const MAX_POINTS = 160; // максимум точек при BASE_WIDTH
const MIN_POINTS = 8; // минимум точек при маленькой ширине

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface Props {
  chartData: IChartData[];
}

function getDiapasonSeasonForHarvesting(chartData: IChartData[]) {
  const optimalSeasonStartIndex = chartData.findIndex((elem) => elem.sumEffectiveTemperature >= 850);
  let optimalSeasonEndIndex = chartData.findIndex((elem) => elem.sumEffectiveTemperature >= 950);
  if (optimalSeasonEndIndex === -1) optimalSeasonEndIndex = chartData.length - 1;
  return { optimalSeasonStartIndex, optimalSeasonEndIndex };
}

function createOptimalSeasonDataset(chartData: IChartData[]): ChartDataset<'line'> | undefined {
  const { optimalSeasonStartIndex, optimalSeasonEndIndex } = getDiapasonSeasonForHarvesting(chartData);

  if (optimalSeasonStartIndex === -1) return;

  const polygonData = Array(chartData.length).fill(null);

  for (let i = optimalSeasonStartIndex; i != optimalSeasonEndIndex; i++) {
    polygonData[i] = chartData[i].sumEffectiveTemperature;
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

function createDataset(chartData: IChartData[], containerWidth: number): ChartDataset<'line'>[] {
  const targetPoints = Math.max(
    MIN_POINTS,
    Math.min(MAX_POINTS, Math.round((containerWidth / BASE_WIDTH) * MAX_POINTS)),
  );

  const step = Math.ceil(chartData.length / targetPoints);

  const pointRadius = chartData.map((_, index) => (index % step === 0 ? 3 : 0));

  const pointHoverRadius = chartData.map((_, index) => (index % step === 0 ? 8 : 0));
  return [
    {
      label: 'Средняя температура дня',
      data: [...chartData.map((elem) => elem.meanTemp)],
      borderColor: 'rgb(252, 194, 59)',
      borderDash: [5, 1],
      backgroundColor: 'rgba(252, 194, 59, 0.5)',
      tension: 0.1,
      yAxisID: 'y',
      pointRadius,
      pointHoverRadius,
    },
    {
      label: 'Сумма эффективных температур',
      data: [...chartData.map((elem) => elem.sumEffectiveTemperature)],
      borderColor: 'rgb(41, 139, 55)',
      borderDash: [5, 1],
      backgroundColor: 'rgba(41, 139, 55, 0.5)',
      tension: 0.1,
      yAxisID: 'y1',
      pointRadius,
      pointHoverRadius,
    },
  ];
}

const LineChart: React.FC<Props> = ({ chartData }) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const updateWidth = () => {
      setContainerWidth(canvasRef.current?.clientWidth || 0);
    };

    // Инициализация
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(canvasRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const datasets: ChartDataset<'line'>[] = createDataset(chartData, containerWidth);

  const optimalSeasonDataset = createOptimalSeasonDataset(chartData);

  if (optimalSeasonDataset) {
    datasets.push(optimalSeasonDataset);
  }

  const labels: string[] = chartData.map((elem) => elem.date);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          boxHeight: 10,
          padding: 18,
        },
      },
      tooltip: {
        filter: (tooltipItem: TooltipItem<'line'>) => {
          const datasetLabel = tooltipItem.dataset.label;
          return datasetLabel !== 'Оптимальный период (850–950)';
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: containerWidth > 600,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Температура, °C',
        },
      },
      y1: {
        type: 'linear' as const,
        display: containerWidth > 600,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Сумма температур',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className={ss.chart}>
      <div
        className={ss.canvas}
        ref={canvasRef}
      >
        <Line
          key="mean-temp-chart"
          data={{
            labels,
            datasets,
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default LineChart;
