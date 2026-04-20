import { useState } from 'react';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';

import Form from '../../modules/Corn/Form/Form';
import {
  getPredictionTemperature,
  type IChartData,
} from '../../modules/Corn/functions/getPredictionTemperature';
import { getTodayDate } from '../../modules/Corn/functions/getTodayDate';
import LineChart from '../../modules/Corn/LineChart/LineChart';
import Map from '../../modules/Corn/Map/Map';
import type { ICornFormSchema } from '../../modules/Corn/types/Corn.types';
import ss from './CornSilageHarvestCalculator.module.scss';
import Panel from '../../modules/Corn/Panel/Panel';

const CornSilageHarvestCalculator = () => {
  const [chartData, setChartData] = useState<IChartData[] | null>(null);

  const { handleSubmit, control, formState, setValue } = useForm<ICornFormSchema>({
    defaultValues: {
      longitude: '49.118024',
      latitude: '55.795214',
      baseTemperature: '10',
      sowingDate: getTodayDate(),
    },
  });

  const customOnSubmit: SubmitHandler<ICornFormSchema> = async (data) => {
    setChartData(await getPredictionTemperature(data, Number(data.baseTemperature)));
  };

  const [longitude, latitude] = useWatch({
    control,
    name: ['longitude', 'latitude'],
  });

  const handleLocationChange = (lat: number, lon: number) => {
    setValue('latitude', String(lat));
    setValue('longitude', String(lon));
  };

  return (
    <section className={ss.page}>
      <div className="container">
        <div className={ss.workspace}>
          <div className={ss.hero}>
            <Panel
              eyebrow="Настройка расчёта"
              title="Параметры прогноза по кукурузе"
              description="Заполни координаты, дату посева и базовую температуру. Карта и форма связаны между собой, поэтому можно работать любым удобным способом."
            >
              <Form
                onSubmit={handleSubmit(customOnSubmit)}
                control={control}
                formState={formState}
              />
            </Panel>
            <Panel
              eyebrow="Карта поля"
              title="Выбери точку на карте"
              description="Кликни по карте или перетащи маркер, чтобы сразу обновить координаты в форме."
            >
              <Map
                longitude={Number(longitude)}
                latitude={Number(latitude)}
                onLocationChange={handleLocationChange}
              />
            </Panel>
          </div>
        </div>
        {chartData ? (
          <Panel
            eyebrow="Результат прогноза"
            title="График накопления температур"
            description="Динамика среднесуточной температуры и накопления сумма эффективных температур."
          >
            <LineChart chartData={chartData} />
          </Panel>
        ) : null}
      </div>
    </section>
  );
};

export default CornSilageHarvestCalculator;
