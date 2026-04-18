import { type SubmitHandler, useForm } from 'react-hook-form';

import { BubbleButton } from '../../../../shared/UI/Bubble/Bubble';
import type { IManualFormSchema } from '../../types/minerals.types';
import ManualFertilizerCard from './ManualCards/ManualFertilizerCard';
import ManualFieldCard from './ManualCards/ManualFieldCard';
import ss from './ManualForm.module.scss';
import { NutrientConfig } from '../../data/fertilizersData';

const ManualForm = ({ calculate }: { calculate: (data: IManualFormSchema) => void }) => {
  const { register, handleSubmit, control, formState, setValue, reset } =
    useForm<IManualFormSchema>({
      defaultValues: {
        nitrogen: {
          soilValue: 123,
          price: 20.655,
          fertilizer: 'ammiachnaya-selitra',
        },
        potassium: { soilValue: 123, price: 23, fertilizer: 'kaliy-hloristyy' },
        phosphorus: {
          soilValue: 123,
          price: 52,
          fertilizer: 'ammofos-52',
        },
        field: { area: 123, harvest: 123, crop: 'pshenitsa-yarovaya' },
      },
    });
  const customOnSubmit: SubmitHandler<IManualFormSchema> = (data) => {
    calculate(data);
  };

  return (
    <section className={`${ss.form} section`}>
      <div className="container">
        <form onSubmit={handleSubmit(customOnSubmit)}>
          <div className={ss.wrapper}>
            {NutrientConfig.map((nutrient) => {
              return (
                <ManualFertilizerCard
                  key={nutrient.key}
                  title={nutrient.label}
                  fertilizerKey={nutrient.key}
                  fertilizerList={nutrient.fertilizerList}
                  register={register}
                  control={control}
                  formState={formState}
                  setValue={setValue}
                />
              );
            })}
            <ManualFieldCard
              title="Поле"
              register={register}
              control={control}
              formState={formState}
            />
          </div>
          <BubbleButton type="submit">Рассчитать</BubbleButton>
          <BubbleButton
            type="button"
            onClick={() => {
              reset();
            }}
          >
            reset
          </BubbleButton>
        </form>
      </div>
    </section>
  );
};

export default ManualForm;
