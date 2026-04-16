import type { TForecastTemperature } from "./usePredictionTemperature";

export const useSumEffectiveTemperature = (
  temperature: TForecastTemperature,
  baseTemp: number,
): number[] => {
  let tempSum = 0;
  let sumEffectiveTemperature: number[] = [];

  for (let i = 0; i < temperature.length; i++) {
    if (temperature[i].meanTemp > baseTemp) {
      tempSum += temperature[i].meanTemp - baseTemp;
    }
    sumEffectiveTemperature[i] = tempSum;
  }

  console.log("temperature", temperature);
  console.log("sumEffectiveTemperature", sumEffectiveTemperature);

  return sumEffectiveTemperature;
};
