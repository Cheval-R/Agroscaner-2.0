import { useForm, type SubmitHandler } from "react-hook-form";
import Map from "../../modules/Corn/Map/Map";

import type { ICornFormSchema } from "../../modules/Corn/types/Corn.types";
import Form from "../../modules/Corn/Form/Form";
import { useState } from "react";
import {
  usePredictionTemperature,
  type TForecastTemperature,
} from "../../modules/Corn/hook/usePredictionTemperature";
import LineChart from "../../modules/Corn/LineChart/LineChart";

export function getTodayDate() {
  return new Date().toLocaleDateString("ru-RU");
}

const CornSilageHarvestCalculator = () => {
  const [chartData, setChartData] = useState<TForecastTemperature | null>(null);
  // const chartDataset =
  const { handleSubmit, control, formState, setValue, getValues } =
    useForm<ICornFormSchema>({
      defaultValues: {
        longitude: "49.118024",
        latitude: "55.795214",
        baseTemperature: "10",
        sowingDate: getTodayDate(),
      },
    });
  const customOnSubmit: SubmitHandler<ICornFormSchema> = async (data) => {
    setChartData(
      await usePredictionTemperature(data, Number(data.baseTemperature)),
    );
    console.log("chartData", chartData);
  };
  return (
    <section>
      <div className="container">
        <Form
          handleSubmit={handleSubmit(customOnSubmit)}
          control={control}
          formState={formState}
        />
        <Map
          coordinates={{
            longitude: Number(getValues("longitude")),
            latitude: Number(getValues("latitude")),
          }}
          onCoordinatesChange={(coordinates: {
            latitude: string;
            longitude: string;
          }) => {
            setValue("latitude", coordinates.latitude, {
              shouldValidate: true,
            });
            setValue("longitude", coordinates.longitude, {
              shouldValidate: true,
            });
          }}
        />
        {chartData && (
          <LineChart
            data={chartData}
            baseTemp={Number(getValues("baseTemperature"))}
          />
        )}
      </div>
    </section>
  );
};

export default CornSilageHarvestCalculator;
