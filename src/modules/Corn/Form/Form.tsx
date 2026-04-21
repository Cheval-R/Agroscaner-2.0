import React, { type BaseSyntheticEvent } from 'react';
import ss from './Form.module.scss';
import type { FormState, UseFormRegister } from 'react-hook-form';
import type { ICornFormSchema } from '../types/Corn.types';
import CoordinateInput from '../CoordinateInput/CoordinateInput';
interface Props {
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  formState: FormState<ICornFormSchema>;
  register: UseFormRegister<ICornFormSchema>;
  isCalculated: boolean;
}

const Form: React.FC<Props> = ({ onSubmit, formState, register, isCalculated }) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className={ss.meta}
      >
        <div className={ss.formWrapper}>
          <CoordinateInput
            formState={formState}
            register={register}
            coordinateType="latitude"
            ss={ss}
          />
          <CoordinateInput
            formState={formState}
            register={register}
            coordinateType="longitude"
            ss={ss}
          />
          <label className={ss.inputWrapper}>
            <span>Дата сева</span>
            <input
              type="date"
              onFocus={(e) => e.target.showPicker()}
              {...register('sowingDate', {
                required: { value: true, message: 'Обязательное' },
              })}
            />
            {formState.errors.sowingDate?.message ? (
              <span className={ss.errorMessage}>{formState.errors.sowingDate?.message}</span>
            ) : null}
          </label>
          <label className={`${ss.inputWrapper} ${ss.baseTempInput}`}>
            <span>Базовая температура</span>
            <input
              type="number"
              {...register('baseTemperature', {
                required: { value: true, message: 'Обязательное' },
                max: { value: 50, message: 'Максимум 50°C' },
                min: { value: 0, message: 'Минимум 0°C' },
              })}
              defaultValue={10}
            />
            {formState.errors.baseTemperature?.message ? (
              <span className={ss.errorMessage}>{formState.errors.baseTemperature?.message}</span>
            ) : null}
          </label>
        </div>
        <button className={`${ss.submit} ${isCalculated ? ss.loading : ''}`}>
          {isCalculated ? 'Загрузка...' : 'Рассчитать'}
        </button>
      </form>
    </>
  );
};

export default Form;
