import {
  type Control,
  Controller,
  type FormState,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

import Bubble, { BubbleInput } from '../../../../../shared/UI/Bubble/Bubble';
import Select from '../../../../../shared/UI/Select/Select';
import type { IManualFormSchema } from '../../../types/minerals.types';
import ss from './ManualCard.module.scss';
import type { NPK } from '../../../types/types';
import type { Identifiers } from '../../../../../app/types/global.types';
import { Fertilizers } from '../../../data/fertilizersData';

interface Props {
  title: string;
  fertilizerKey: NPK;
  register: UseFormRegister<IManualFormSchema>;
  control: Control<IManualFormSchema>;
  formState: FormState<IManualFormSchema>;
  setValue: UseFormSetValue<IManualFormSchema>;
  fertilizerList: Identifiers[];
}

const ManualFertilizerCard = ({
  title,
  fertilizerKey,
  fertilizerList,
  register,
  control,
  formState,
  setValue,
}: Props) => {
  const getFertilizerPrice = (key: string): number | undefined => {
    return Fertilizers.find((fertilizer) => fertilizer.key === key)?.price;
  };
  return (
    <Bubble legend={title} className={ss.card}>
      <BubbleInput
        legend="В почве, мг/кг"
        inputType="number"
        {...register(`${fertilizerKey}.soilValue`, {
          required: 'Обязательное поле',
          min: { value: 0, message: 'Положительное число' },
          valueAsNumber: true,
        })}
        errorMessage={formState.errors?.[fertilizerKey]?.soilValue?.message}
      />
      <Controller
        control={control}
        name={`${fertilizerKey}.fertilizer` as const}
        rules={{ required: 'Обязательное поле' }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <Select
              optionsList={fertilizerList}
              activeKey={value}
              legend="Удобрение"
              selectOption={(optionKey: string) => {
                onChange(optionKey);
                const price = getFertilizerPrice(optionKey);
                if (price) {
                  setValue(`${fertilizerKey}.price`, price);
                }
              }}
              errorMessage={error?.message}
              onBlur={onBlur}
            />
          );
        }}
      />
      <BubbleInput
        legend="Стоимость"
        inputType="number"
        {...register(`${fertilizerKey}.price`, {
          required: 'Обязательное поле',
          min: { value: 0, message: 'Положительное число' },
          valueAsNumber: true,
        })}
        errorMessage={formState.errors?.[fertilizerKey]?.price?.message}
      />
    </Bubble>
  );
};

export default ManualFertilizerCard;
