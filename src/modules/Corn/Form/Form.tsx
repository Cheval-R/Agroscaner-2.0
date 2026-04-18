import type { BaseSyntheticEvent } from 'react';
import React from 'react';
import type { Control, FormState } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import Bubble, { BubbleButton, BubbleInput } from '../../../shared/UI/Bubble/Bubble';
import CoordinateInput from '../CoordinateInput/CoordinateInput';
import DateInput from '../DateInput/DateInput';
import type { ICornFormSchema } from '../types/Corn.types';
import ss from './Form.module.scss';

interface Props {
  handleSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<ICornFormSchema>;
  formState: FormState<ICornFormSchema>;
}
const currentYear = new Date().getFullYear();
const yearStr = String(currentYear);

const currentYearDatePattern = new RegExp(
  `^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.(${yearStr})$`,
);

const Form: React.FC<Props> = ({ handleSubmit, control, formState }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Bubble
          legend="Расположение полей"
          legendSize="title"
          bubbleSize="lg"
          className={ss.group}
        >
          <CoordinateInput
            control={control}
            coordinateType="longitude"
          />
          <CoordinateInput
            control={control}
            coordinateType="latitude"
          />
        </Bubble>
        <Bubble
          legend="Дополнительные опции"
          legendSize="title"
          bubbleSize="lg"
          className={ss.group}
        >
          <Controller
            name="sowingDate"
            control={control}
            rules={{
              required: { value: true, message: 'Обязательное поле' },
              pattern: {
                value: currentYearDatePattern,
                message: 'Формат дд.мм.гггг',
              },
            }}
            render={({ field }) => {
              return (
                <DateInput
                  {...field}
                  formState={formState}
                />
              );
            }}
          />
          <Controller
            name="baseTemperature"
            control={control}
            rules={{
              max: { value: 10, message: 'Максимально 10°C' },
              min: { value: 0, message: 'Минимально 0°C' },
              required: { value: true, message: 'Обязательное поле' },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <BubbleInput
                  legend="Базовая температура"
                  {...field}
                  errorMessage={error?.message}
                />
              );
            }}
          />
        </Bubble>
        <BubbleButton type="submit">Calculate</BubbleButton>
      </form>
    </>
  );
};

export default Form;
