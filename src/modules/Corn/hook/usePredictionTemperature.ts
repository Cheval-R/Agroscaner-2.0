import type { ICornFormSchema } from "../types/Corn.types";

interface IMeanTemperature {
  meanTemp: number[];
  days: string[];
}

export type TForecastTemperature = { date: string; meanTemp: number }[];

type TDate = [day: string, month: string, year: string];

interface IHistoricalTemperatureData {
  [year: string]: IMeanTemperature;
}

export async function usePredictionTemperature(
  data: ICornFormSchema,
  baseTemp: number,
): Promise<TForecastTemperature> {
  const { startMonth, startDay } = getStartDatePrediction(data.sowingDate);

  let actualTemperature: TForecastTemperature = sowingDateHasPassed(
    data.sowingDate,
  )
    ? await fetchTemperatureFromSowingToToday(data)
    : [];

  const historicalData = await fetchHistoricalData(
    startMonth,
    startDay,
    data.latitude,
    data.longitude,
  );

  const predictedTemperature = forecastTemperature(historicalData);
  // !Доделать
  // const result:TForecastTemperature = [...actualTemperature, ...predictedTemperature]

  // ? Возможно сделать сразу фильтр по значения что ниже базовой температуры, но нужно чтобы они вырезались только по краям, а не посреди года

  return [...actualTemperature, ...predictedTemperature];
}

const getStartDatePrediction = (
  sowingDate: string,
): { startMonth: string; startDay: string } => {
  let startMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  let startDay = String(new Date().getDate() + 1).padStart(2, "0");

  if (!sowingDateHasPassed(sowingDate)) {
    const sowingDateArray = sowingDate.split(".");
    startMonth = sowingDateArray[1];
    startDay = sowingDateArray[0];
  }
  return { startMonth, startDay };
};

const convertDateToApiFormat = (date: string): string => {
  const dateArray: TDate = date.split(".") as TDate;
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
};

async function fetchHistoricalData(
  startMonth: string,
  startDay: string,
  latitude: string,
  longitude: string,
): Promise<IHistoricalTemperatureData> {
  const endYear = new Date().getFullYear() - 1;

  const results: { [year: string]: IMeanTemperature } = {};

  for (let year = 2000; year <= endYear; year++) {
    const startDate = `${year}-${startMonth}-${startDay}`;
    const endDate = `${year}-12-31`;

    const apiURL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean`;

    results[year] = await fetchHistoricalDataByYear(apiURL);
  }

  return results;
}

async function fetchHistoricalDataByYear(
  url: string,
): Promise<IMeanTemperature> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}`);
      }
      return response.json();
    })
    .then((weatherData) => {
      if (!weatherData.daily?.time || !weatherData.daily?.temperature_2m_mean) {
        throw new Error("Invalid data structure");
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

function forecastTemperature(
  data: IHistoricalTemperatureData,
): TForecastTemperature {
  let yearsLabels: number[] = Object.keys(data).map(Number);

  yearsLabels = yearsLabels.filter((year) => {
    const entry = data[year];
    return entry.days?.length > 0 && entry.meanTemp?.length > 0;
  });

  if (yearsLabels.length === 0) return [];

  const currentYear = Math.max(...yearsLabels);
  const { days } = data[currentYear];
  const length = days.length;

  let result: TForecastTemperature = [];

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

    if (numerator / denominator <= 0) continue;

    const newDate = new Date(days[i]);
    newDate.setFullYear(newDate.getFullYear() + 1);

    result.push({
      date: newDate.toLocaleDateString(),
      meanTemp: numerator / denominator,
    });
  }

  return result;
}

const sowingDateHasPassed = (date: string): boolean => {
  const sowingDate = new Date(convertDateToApiFormat(date));
  const todayDate = new Date();
  console.log("sowing", date);

  console.log("today", todayDate.getTime());
  console.log("nottoday", sowingDate.getTime());

  return todayDate.getTime() > sowingDate.getTime();
};

async function fetchTemperatureFromSowingToToday(
  data: ICornFormSchema,
): Promise<TForecastTemperature> {
  const startDate = convertDateToApiFormat(data.sowingDate);
  const endDate = new Date().toISOString().split("T")[0];
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
