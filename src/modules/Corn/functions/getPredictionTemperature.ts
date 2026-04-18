import type { ICornFormSchema } from '../types/Corn.types';

const START_DATE_TO_GET_HISTORICAL_DATE = 2010;

const MAX_YEARS_PER_REQUEST = 5;

interface IMeanTemperature {
  meanTemp: number[];
  days: string[];
}

export type TForecastTemperature = { date: string; meanTemp: number }[];

type TDate = [day: string, month: string, year: string];

type IHistoricalTemperatureData = Record<string, IMeanTemperature>;

// ? TODO: Добавить кэширование данных. Если на пример пользователь ввел 10 мая потом 16 мая, то не нужно запрашивать еще раз данные, проще взять с кэша и пересчитать

// ? TODO 2: Можно сделать график завязаный на выбранной дате, то есть, пользователь запрашивает первый раз и если он меняется то меняется начало графика, при этом запрос на сервер не делаем, но если выбрали более раннюю дату то ничего не поделать нужно делать новый запрос.

// ? TODO 2.2: Либо выбранную дату сделать чисто UI моментом, а на самом деле запрашивать данные с марта либо начала года, чтобы везде можно было проверить, даже где зимой + 🤩

// ? TODO 3 ПОправить обработку ошибок фетчей, сделать какую-то выпадашку чтобы понимать ошибку,

export async function getPredictionTemperature(
  data: ICornFormSchema,
  baseTemp: number,
): Promise<TForecastTemperature> {
  const { startMonth, startDay } = getStartDatePrediction(data.sowingDate);

  const actualTemperature: TForecastTemperature = sowingDateHasPassed(data.sowingDate)
    ? await fetchTemperatureFromSowingToToday(data)
    : [];

  const historicalData = await fetchHistoricalData(
    startMonth,
    startDay,
    data.latitude,
    data.longitude,
  );

  const predictedTemperature = forecastTemperature(historicalData);

  const filteredPredictedTemperature = filterPredictedTemperatureByBaseTemp(
    [...actualTemperature, ...predictedTemperature],
    baseTemp,
  );

  return filteredPredictedTemperature;
}

function filterPredictedTemperatureByBaseTemp(
  predictedTemperature: TForecastTemperature,
  baseTemp: number,
): TForecastTemperature {
  const startIndex = predictedTemperature.findIndex((elem) => Math.round(elem.meanTemp) > baseTemp);
  const endIndex = predictedTemperature.findLastIndex(
    (elem) => Math.round(elem.meanTemp) > baseTemp,
  );

  return predictedTemperature.slice(startIndex, endIndex);
}

function getStartDatePrediction(sowingDate: string): { startMonth: string; startDay: string } {
  let startMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  let startDay = String(new Date().getDate() + 1).padStart(2, '0');

  if (!sowingDateHasPassed(sowingDate)) {
    const sowingDateArray = sowingDate.split('.');
    startMonth = sowingDateArray[1];
    startDay = sowingDateArray[0];
  }
  return { startMonth, startDay };
}

const convertDateToApiFormat = (date: string): string => {
  const dateArray: TDate = date.split('.') as TDate;
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
};

async function fetchHistoricalData(
  startMonth: string,
  startDay: string,
  latitude: string,
  longitude: string,
): Promise<IHistoricalTemperatureData> {
  const endYear = new Date().getFullYear() - 1;

  const results: Record<string, IMeanTemperature> = {};

  for (let year = START_DATE_TO_GET_HISTORICAL_DATE; year <= endYear; ) {
    const startDate = `${year}-${startMonth}-${startDay}`;
    const endDate = `${year}-12-31`;

    const apiURL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean`;

    // ? TODO Описать групповые запросы на сервер по MAX_YEARS_PER_REQUEST
    results[year] = await fetchHistoricalDataByYear(apiURL);
  }

  return results;
}

async function fetchHistoricalDataByYear(url: string): Promise<IMeanTemperature> {
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
      console.error(error);
      return { days: [], meanTemp: [] };
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

async function fetchTemperatureFromSowingToToday(
  data: ICornFormSchema,
): Promise<TForecastTemperature> {
  const startDate = convertDateToApiFormat(data.sowingDate);
  const endDate = new Date().toISOString().split('T')[0];
  const apiURL = `https://archive-api.open-meteo.com/v1/archive?latitude=${data.latitude}&longitude=${data.longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean`;

  return fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((weather) => {
      const meanTemp = weather.daily.temperature_2m_mean;
      const daysArray = weather.daily.time;

      const result: TForecastTemperature = [];

      for (let i = 0; i < meanTemp.length; i++) {
        const newDate = new Date(daysArray[i]);
        newDate.setFullYear(newDate.getFullYear());
        result.push({
          date: newDate.toLocaleDateString(),
          meanTemp: meanTemp[i],
        });
      }
      return result;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}
