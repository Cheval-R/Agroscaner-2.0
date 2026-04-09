import React from "react";
import {
  type UseFormRegister,
  type Control,
  type FormState,
  type UseFormSetValue,
  Controller,
} from "react-hook-form";

import type { IClientFormSchema } from "../ClientForm.types";
import { BubbleInput } from "../../../../../shared/UI/Bubble/Bubble";
import Select from "../../../../../shared/UI/Select/Select";
import { Fertilizers } from "../../../data/data";

import ss from "../ClientForm.module.scss";

interface Props {
  register: UseFormRegister<IClientFormSchema>;
  control: Control<IClientFormSchema>;
  formState: FormState<IClientFormSchema>;
  setValue: UseFormSetValue<IClientFormSchema>;
  fertilizerName: "nitrogen" | "phosphorus" | "potassium";
}

const fertilizerMeta = {
  nitrogen: {
    title: "Азот",
    nameLegend: "Удобрение",
    priceLegend: "Цена, ₽/т",
  },
  phosphorus: {
    title: "Фосфор",
    nameLegend: "Удобрение",
    priceLegend: "Цена, ₽/т",
  },
  potassium: {
    title: "Калий",
    nameLegend: "Удобрение",
    priceLegend: "Цена, ₽/т",
  },
} as const;

const FertilizerRow: React.FC<Props> = ({
  register,
  control,
  formState,
  setValue,
  fertilizerName,
}) => {
  const labels = fertilizerMeta[fertilizerName];
  const rowInputsNames = {
    name: `${fertilizerName}.name`,
    price: `${fertilizerName}.price`,
  } as const;
  return (
    <div className={ss.fertilizerSection}>
      <span className={ss.rowTitle}>{labels.title}</span>
      <div className={ss.cardRow}>
        <Controller
          name={`${fertilizerName}.fertilizer`}
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => {
            return (
              <Select
                {...field}
                optionsList={Fertilizers}
                activeKey={field.value}
                errorMessage={
                  formState.errors?.[fertilizerName]?.fertilizer?.message
                }
                legend={labels.nameLegend}
                selectOption={(optionKey) => {
                  field.onChange(optionKey);
                  const fertilizerPrice = Fertilizers.find(
                    (fertilizer) => fertilizer.key === optionKey,
                  );
                  setValue(
                    `${fertilizerName}.price`,
                    fertilizerPrice ? fertilizerPrice.price : 0,
                  );
                }}
              />
            );
          }}
        />
        <BubbleInput
          legend={labels.priceLegend}
          {...register(rowInputsNames.price, { required: "Обязательное поле" })}
          errorMessage={formState.errors?.[fertilizerName]?.price?.message}
        />
      </div>
    </div>
  );
};

export default FertilizerRow;
