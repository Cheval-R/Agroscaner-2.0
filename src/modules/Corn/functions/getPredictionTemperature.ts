import type { ICornFormSchema } from '../types/Corn.types';
import { getSumEffectiveTemperature } from './getSumEffectiveTemperature';
import pLimit from 'p-limit';

const START_DATE_TO_GET_HISTORICAL_DATE = 2010;

const MAX_YEARS_PER_REQUEST = 5;

interface IMeanTemperature {
  meanTemp: number[];
  days: string[];
}

export type TForecastTemperature = { date: string; meanTemp: number }[];

type TDate = [day: string, month: string, year: string];

type IHistoricalTemperatureData = Record<string, IMeanTemperature>;

interface IWeather {
  daily: {
    temperature_2m_mean: number[];
    time: string[];
  };
}

// ? TODO: Добавить кэширование данных. Если на пример пользователь ввел 10 мая потом 16 мая, то не нужно запрашивать еще раз данные, проще взять с кэша и пересчитать

// ? TODO 2: Можно сделать график завязаный на выбранной дате, то есть, пользователь запрашивает первый раз и если он меняется то меняется начало графика, при этом запрос на сервер не делаем, но если выбрали более раннюю дату то ничего не поделать нужно делать новый запрос.

// ? TODO 2.2: Либо выбранную дату сделать чисто UI моментом, а на самом деле запрашивать данные с марта либо начала года, чтобы везде можно было проверить, даже где зимой + 🤩

// ? TODO 3 ПОправить обработку ошибок фетчей, сделать какую-то выпадашку чтобы понимать ошибку,

export interface IChartData {
  date: string;
  meanTemp: number;
  sumEffectiveTemperature: number;
}

export async function getPredictionTemperature(data: ICornFormSchema, baseTemp: number): Promise<IChartData[]> {
  const { startMonth, startDay } = getStartDatePrediction(data.sowingDate);

  try {
    const actualTemperature: TForecastTemperature = await fetchTemperatureFromSowingToToday(data);

    const historicalData = await fetchHistoricalData(startMonth, startDay, data.latitude, data.longitude);

    const predictedTemperature = forecastTemperature(historicalData);

    const filteredPredictedTemperature = filterPredictedTemperatureByBaseTemp(
      [...actualTemperature, ...predictedTemperature],
      baseTemp,
    );

    const sumEffectiveTemperature = getSumEffectiveTemperature(filteredPredictedTemperature, baseTemp);

    const resultData: IChartData[] = filteredPredictedTemperature.map((e, i) => {
      return { ...e, sumEffectiveTemperature: sumEffectiveTemperature[i] };
    });

    return resultData;
  } catch (error) {
    throw error;
  } finally {
  }
}

async function fetchTemperatureFromSowingToToday(data: ICornFormSchema): Promise<TForecastTemperature> {
  if (!sowingDateHasPassed(data.sowingDate)) return [];

  // const startDate = convertDateToApiFormat(data.sowingDate);

  const endDate = new Date().toISOString().split('T')[0];
  const apiURL = `https://archive-api.open-meteo.com/v1/archive?latitude=${data.latitude}&longitude=${data.longitude}&start_date=${data.sowingDate}&end_date=${endDate}&daily=temperature_2m_mean`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Некорректные координаты или дата');
      }
      throw new Error(`Ошибка запроса погоды: ${response.status}`);
    }

    const weather: IWeather = await response.json();

    if (!weather.daily?.temperature_2m_mean || !weather.daily.time) {
      throw new Error('Некорректные данные от сервера');
    }

    const result: TForecastTemperature = [];

    for (let i = 0; i < weather.daily.temperature_2m_mean.length; i++) {
      const newDate = new Date(weather.daily.time[i]);
      newDate.setFullYear(newDate.getFullYear());
      result.push({
        date: newDate.toLocaleDateString(),
        meanTemp: weather.daily.temperature_2m_mean[i],
      });
    }
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[Получение температуры с даты сева до сегодняшнего дня]: ${error}`);

      throw error;
    }
    throw `[Получение температуры с даты сева до сегодняшнего дня]: Неизвестная ошибка`;
  }
}

async function fetchHistoricalData(
  startMonth: string,
  startDay: string,
  latitude: string,
  longitude: string,
): Promise<IHistoricalTemperatureData> {
  const endYear = new Date().getFullYear() - 1;
  const limit = pLimit(MAX_YEARS_PER_REQUEST);
  let promises: Promise<IMeanTemperature>[] = [];

  for (let year = START_DATE_TO_GET_HISTORICAL_DATE; year <= endYear; year++) {
    const startDate = `${year}-${startMonth}-${startDay}`;
    const endDate = `${year}-12-31`;

    const apiURL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean`;

    promises.push(limit(() => fetchHistoricalDataByYear(apiURL, year)));
  }
  const settledResults = await Promise.allSettled(promises);
  const results: Record<string, IMeanTemperature> = {};
  const fulfilledResults = settledResults.filter((r) => r.status === 'fulfilled');

  if (fulfilledResults.length < 3) {
    throw new Error('Слишком мало данных для прогноза');
  }

  settledResults.forEach((result) => {
    if (result.status === 'rejected') return;

    const data = result.value;

    if (!data.days.length || !data.meanTemp.length) {
      console.warn(`Нет данных дней за год`);
      return;
    }
    const year = new Date(data.days[0]).getFullYear();
    results[year] = data;
  });
  return results;
}

async function fetchHistoricalDataByYear(url: string, year: number): Promise<IMeanTemperature> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}`);
      }
      return response.json();
    })
    .then((weatherData) => {
      if (!weatherData.daily?.time || !weatherData.daily?.temperature_2m_mean) {
        throw new Error('Invalid data structure');
      }
      return {
        days: weatherData.daily.time,
        meanTemp: weatherData.daily.temperature_2m_mean,
      };
    })
    .catch((error) => {
      console.error(`Ошибка получения данных за ${year} год`);
      throw error;
    });
}

function forecastTemperature(data: IHistoricalTemperatureData): TForecastTemperature {
  let yearsLabels: number[] = Object.keys(data).map(Number);

  yearsLabels = yearsLabels.filter((year) => {
    const entry = data[year];
    return entry.days?.length > 0 && entry.meanTemp?.length > 0;
  });

  if (yearsLabels.length === 0) return [];

  const currentYear = Math.max(...yearsLabels);
  const { days } = data[currentYear];
  const length = days.length;

  const result: TForecastTemperature = [];

  for (let i = 0; i < length; i++) {
    let numerator = 0;
    let denominator = 0;

    for (let offset = -1; offset <= 1; offset++) {
      const idx = i + offset;
      if (idx < 0 || idx >= length) continue;

      const dayWeight = offset === 0 ? 1 : 0.5;

      yearsLabels.forEach((year) => {
        const entry = data[year];
        if (entry.meanTemp[idx] == null) return;

        const age = currentYear - year + 1;
        const yearWeight = Math.exp(-0.2 * age);

        const weight = yearWeight * dayWeight;

        numerator += entry.meanTemp[idx] * weight;
        denominator += weight;
      });
    }

    const newDate = new Date(days[i]);
    newDate.setFullYear(newDate.getFullYear() + 1);

    result.push({
      date: newDate.toLocaleDateString(),
      meanTemp: Math.round((numerator / denominator) * 10) / 10,
    });
  }

  return result;
}

const sowingDateHasPassed = (date: string): boolean => {
  const sowingDate = new Date(convertDateToApiFormat(date)).getTime();
  const todayDate = new Date().getTime();

  return todayDate > sowingDate;
};

const convertDateToApiFormat = (date: string): string => {
  const dateArray: TDate = date.split('.') as TDate;
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
};

function filterPredictedTemperatureByBaseTemp(
  predictedTemperature: TForecastTemperature,
  baseTemp: number,
): TForecastTemperature {
  const startIndex = predictedTemperature.findIndex((elem) => Math.round(elem.meanTemp) > baseTemp);
  const endIndex = predictedTemperature.findLastIndex((elem) => Math.round(elem.meanTemp) > baseTemp);
  if (startIndex === -1) return [];

  if (endIndex === -1) return predictedTemperature.slice(startIndex);

  return predictedTemperature.slice(startIndex, endIndex + 1);
}

function getStartDatePrediction(sowingDate: string): {
  startMonth: string;
  startDay: string;
} {
  let startMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  let startDay = String(new Date().getDate() + 1).padStart(2, '0');

  if (!sowingDateHasPassed(sowingDate)) {
    const sowingDateArray = sowingDate.split('.');
    startMonth = sowingDateArray[1];
    startDay = sowingDateArray[0];
  }
  return { startMonth, startDay };
}
