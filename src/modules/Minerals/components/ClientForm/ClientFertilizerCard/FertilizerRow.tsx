import React from 'react';
import {
  type Control,
  Controller,
  type FormState,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

import { BubbleInput } from '../../../../../shared/UI/Bubble/Bubble';
import Select from '../../../../../shared/UI/Select/Select';
import { Fertilizers } from '../../../data/fertilizersData';
import type { IClientFormSchema } from '../../../types/formSchemes';
import type { NPK, NPKLabel } from '../../../types/types';
import ss from '../ClientForm.module.scss';

interface Props {
  register: UseFormRegister<IClientFormSchema>;
  control: Control<IClientFormSchema>;
  formState: FormState<IClientFormSchema>;
  setValue: UseFormSetValue<IClientFormSchema>;
  fertilizerKey: NPK;
  fertilizerLabel: NPKLabel;
}

const FertilizerRow: React.FC<Props> = ({
  register,
  control,
  formState,
  setValue,
  fertilizerKey,
  fertilizerLabel,
}) => {
  const rowInputsNames = {
    name: `${fertilizerKey}.name`,
    price: `${fertilizerKey}.price`,
  } as const;
  return (
    <div className={ss.fertilizerSection}>
      <span className={ss.rowTitle}>{fertilizerLabel}</span>
      <div className={ss.cardRow}>
        <Controller
          name={`${fertilizerKey}.fertilizer`}
          control={control}
          rules={{ required: 'Обязательное поле' }}
          render={({ field, fieldState: { error } }) => {
            return (
              <Select
                {...field}
                optionsList={Fertilizers}
                activeKey={field.value}
                errorMessage={error?.message}
                legend={fertilizerLabel}
                selectOption={(optionKey) => {
                  field.onChange(optionKey);
                  const fertilizerPrice = Fertilizers.find(
                    (fertilizer) => fertilizer.key === optionKey,
                  );
                  setValue(
                    `${fertilizerKey}.price`,
                    fertilizerPrice ? String(fertilizerPrice.price) : '0',
                  );
                }}
              />
            );
          }}
        />
        <BubbleInput
          legend="Цена, ₽/т"
          {...register(rowInputsNames.price, {
            required: 'Обязательное поле',
            min: { value: 0, message: 'Больше 0' },
            pattern: { value: /^\d+(\.\d{1,3})?$/, message: 'Только число' },
          })}
          errorMessage={formState.errors?.[fertilizerKey]?.price?.message}
        />
      </div>
    </div>
  );
};

export default FertilizerRow;
