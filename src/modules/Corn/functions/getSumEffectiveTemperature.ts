import type { TForecastTemperature } from './getPredictionTemperature';

export const getSumEffectiveTemperature = (
  temperature: TForecastTemperature,
  baseTemp: number,
): number[] => {
  let tempSum = 0;
  const sumEffectiveTemperature: number[] = [];

  for (let i = 0; i < temperature.length; i++) {
    const roundedMeanTemp = Math.round(temperature[i].meanTemp);
    if (roundedMeanTemp > baseTemp) {
      tempSum += roundedMeanTemp - baseTemp;
    }
    sumEffectiveTemperature[i] = Math.round(tempSum);
  }

  console.log(sumEffectiveTemperature);

  return sumEffectiveTemperature;
};
