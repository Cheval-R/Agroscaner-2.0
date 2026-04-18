import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import Form from '../../modules/Corn/Form/Form';
import LineChart from '../../modules/Corn/LineChart/LineChart';
import Map from '../../modules/Corn/Map/Map';
import type { ICornFormSchema } from '../../modules/Corn/types/Corn.types';
import { getTodayDate } from '../../modules/Corn/functions/getTodayDate';
import {
  getPredictionTemperature,
  type TForecastTemperature,
} from '../../modules/Corn/functions/getPredictionTemperature';

const CornSilageHarvestCalculator = () => {
  const [chartData, setChartData] = useState<TForecastTemperature | null>(null);

  const { handleSubmit, control, formState, setValue, getValues } = useForm<ICornFormSchema>({
    defaultValues: {
      longitude: '49.118024',
      latitude: '55.795214',
      baseTemperature: '10',
      sowingDate: getTodayDate(),
    },
  });
  const customOnSubmit: SubmitHandler<ICornFormSchema> = async (data) => {
    setChartData(await getPredictionTemperature(data, Number(data.baseTemperature)));
    console.log('chartData', chartData);
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
            longitude: Number(getValues('longitude')),
            latitude: Number(getValues('latitude')),
          }}
          onCoordinatesChange={(coordinates: { latitude: string; longitude: string }) => {
            setValue('latitude', coordinates.latitude, {
              shouldValidate: true,
            });
            setValue('longitude', coordinates.longitude, {
              shouldValidate: true,
            });
          }}
        />
        {chartData && (
          <LineChart
            data={chartData}
            baseTemp={Number(getValues('baseTemperature'))}
          />
        )}
      </div>
    </section>
  );
};

export default CornSilageHarvestCalculator;
