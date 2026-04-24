import { useEffect, useRef, useState } from 'react';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { getPredictionTemperature, type IChartData } from '../../modules/Corn/functions/getPredictionTemperature';
import { getTodayDate } from '../../modules/Corn/functions/getTodayDate';
import LineChart from '../../modules/Corn/LineChart/LineChart';
import Map from '../../modules/Corn/Map/Map';
import type { ICornFormSchema } from '../../modules/Corn/types/Corn.types';
import ss from './CornSilageHarvestCalculator.module.scss';
import Panel from '../../modules/Corn/Panel/Panel';
import Form from '../../modules/Corn/Form/Form';

const CornSilageHarvestCalculator = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [chartData, setChartData] = useState<IChartData[] | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if ((chartData || isError) && chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [chartData, isError]);

  const { handleSubmit, control, register, formState, setValue } = useForm<ICornFormSchema>({
    defaultValues: {
      longitude: '49.118024',
      latitude: '55.795214',
      baseTemperature: '10',
      sowingDate: getTodayDate(),
    },
  });

  const customOnSubmit: SubmitHandler<ICornFormSchema> = async (data) => {
    setIsError(false);
    setIsCalculated(true);
    try {
      const chartData = await getPredictionTemperature(data, Number(data.baseTemperature));
      setChartData(chartData);
    } catch (error) {
      console.error('Ошибка при расчёте:', error);
      setIsError(true);
    } finally {
      setIsCalculated(false); // ✅ Скрываем лоадер в любом случае
    }
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
    <section className={ss.cornCalculator}>
      <div className="container">
        <div className={ss.workspace}>
          <div className={ss.hero}>
            <Panel
              eyebrow="Настройка расчёта"
              title="Параметры прогноза по кукурузе"
              description="Заполните координаты, дату посева и базовую температуру. Карта и форма связаны между собой, поэтому можно работать любым удобным способом."
            >
              <Form
                formState={formState}
                register={register}
                onSubmit={handleSubmit(customOnSubmit)}
                isCalculated={isCalculated}
              />
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
            ref={chartRef}
            eyebrow="Результат прогноза"
            title="График накопления температур"
            description="Динамика среднесуточной температуры и накопления сумма эффективных температур."
          >
            <LineChart chartData={chartData} />
          </Panel>
        ) : isError ? (
          <Panel
            ref={chartRef}
            description="Не удалось выполнить расчёт, попробуйте позже"
            eyebrow="Ошибка"
            title="Ошибка расчёта"
            isError={true}
          />
        ) : null}
      </div>
    </section>
  );
};

export default CornSilageHarvestCalculator;
