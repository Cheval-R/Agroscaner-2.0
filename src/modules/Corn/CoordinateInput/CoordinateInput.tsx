import React from 'react';
import { type FormState, type UseFormRegister } from 'react-hook-form';

import type { ICornFormSchema } from '../types/Corn.types';

// Широта: -90.000000 до 90.000000 (до 6 знаков)
const LATITUDE_PATTERN = /^-?([0-8]?[0-9](\.\d{1,6})?|90(\.0{1,6})?)$/;

// Долгота: -180.000000 до 180.000000
const LONGITUDE_PATTERN = /^-?((1?[0-7]?|[0-9])?[0-9](\.\d{1,6})?|180(\.0{1,6})?)$/;

interface Props {
  register: UseFormRegister<ICornFormSchema>;
  coordinateType: 'latitude' | 'longitude';
  formState: FormState<ICornFormSchema>;
  ss: CSSModuleClasses;
}

const CoordinateInput: React.FC<Props> = ({ register, coordinateType, formState, ss }) => {
  return (
    <label className={ss.inputWrapper}>
      <span>{coordinateType === 'latitude' ? 'Широта' : 'Долгота'}</span>
      <input
        type="number"
        step={0.000001}
        {...register(coordinateType, {
          required: { value: true, message: 'Обязательное' },
        })}
      />
      {formState.errors.latitude?.message ? (
        <span className={ss.errorMessage}>{formState.errors[coordinateType]?.message}</span>
      ) : null}
    </label>
  );
};

export default CoordinateInput;
