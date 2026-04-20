import React from 'react';
import { type Control, Controller, type FormState, type UseFormRegister } from 'react-hook-form';

import Bubble, { BubbleInput } from '../../../../../shared/UI/Bubble/Bubble';
import Select from '../../../../../shared/UI/Select/Select';
import { Crops } from '../../../data/cropData';
import type { IManualFormSchema } from '../../../types/formSchemes';
import ss from './ManualCard.module.scss';

interface Props {
  title: string;
  register: UseFormRegister<IManualFormSchema>;
  control: Control<IManualFormSchema>;
  formState: FormState<IManualFormSchema>;
}

const ManualFieldCard: React.FC<Props> = ({ title, register, control, formState }) => {
  return (
    <Bubble
      legend={title}
      className={ss.card}
    >
      <BubbleInput
        legend="Площадь, га"
        inputType="number"
        {...register('field.area', {
          required: 'Обязательное поле',
          min: { value: 0, message: 'Положительное число' },
          pattern: { value: /^\d+(\.\d{1,3})?$/, message: 'Только число' },
        })}
        errorMessage={formState.errors?.field?.area?.message}
      />
      <Controller
        control={control}
        name={'field.crop'}
        rules={{ required: 'Обязательное поле' }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return (
            <Select
              optionsList={Crops}
              activeKey={value}
              legend="Удобрение"
              selectOption={(optionKey: string) => {
                onChange(optionKey);
              }}
              errorMessage={error?.message}
              onBlur={onBlur}
            />
          );
        }}
      />
      <BubbleInput
        legend="План. урожай"
        inputType="number"
        {...register('field.harvest', {
          required: 'Обязательное поле',
          min: { value: 0, message: 'Положительное число' },
          pattern: { value: /^\d+(\.\d{1,3})?$/, message: 'Только число' },
        })}
        errorMessage={formState.errors?.field?.harvest?.message}
      />
    </Bubble>
  );
};

export default ManualFieldCard;
