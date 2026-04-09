import React from "react";
import Bubble, { BubbleInput } from "../../../../../shared/UI/Bubble/Bubble";
import {
  type UseFormRegister,
  type Control,
  type FormState,
  type UseFormSetValue,
  Controller,
} from "react-hook-form";

import Select from "../../../../../shared/UI/Select/Select";
import { Crops } from "../../../data/data";
import type { IClient } from "../../../data/types";

import type { IClientFormSchema } from "../../../types/minerals.types";

import ss from "../ClientForm.module.scss";

interface Props {
  register: UseFormRegister<IClientFormSchema>;
  control: Control<IClientFormSchema>;
  formState: FormState<IClientFormSchema>;
  setValue: UseFormSetValue<IClientFormSchema>;
  clientData: IClient;
}

const ClientFieldCard: React.FC<Props> = ({
  register,
  control,
  formState,
  setValue,
  clientData,
}) => {
  const fieldList = clientData.fieldsList.map((field) => ({
    key: field.label,
    label: field.label,
    area: field.area,
  }));
  return (
    <Bubble
      className={`${ss.card} ${ss.fieldCard}`}
      legend="Параметры поля"
      legendSize="title"
    >
      <Controller
        control={control}
        name="field.name"
        rules={{ required: "Обязательное поле" }}
        render={({ field }) => {
          return (
            <Select
              {...field}
              optionsList={fieldList}
              activeKey={field.value}
              legend="№ поля"
              errorMessage={formState.errors.field?.name?.message}
              selectOption={(optionKey) => {
                field.onChange(optionKey);
                const area = fieldList.find(
                  (field) => field.key === optionKey,
                )?.area;
                setValue("field.area", area !== undefined ? area : 0);
              }}
            />
          );
        }}
      />
      <BubbleInput
        {...register("field.area", {
          required: "Обязательное поле",
        })}
        legend="Площадь поля"
        errorMessage={formState.errors?.field?.area?.message}
      />
      <Controller
        control={control}
        name={"field.crop"}
        rules={{ required: "Обязательное поле" }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Select
              optionsList={Crops}
              activeKey={value}
              legend="Культура"
              onBlur={onBlur}
              selectOption={(optionKey) => onChange(optionKey)}
              errorMessage={formState.errors?.field?.crop?.message}
            />
          );
        }}
      />
      <BubbleInput
        {...register("field.harvest", { required: "Обязательное поле" })}
        legend="Урожай"
        errorMessage={formState.errors?.field?.harvest?.message}
      />
    </Bubble>
  );
};

export default ClientFieldCard;
