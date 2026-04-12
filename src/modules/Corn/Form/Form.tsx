import React from "react";
import Bubble, { BubbleButton, BubbleInput } from "../../../shared/UI/Bubble/Bubble";

import type { ICornFormSchema } from "../types/Corn.types";
import {
  Controller,
  type Control,
  type FormState,
  type SubmitHandler,
  type UseFormHandleSubmit,
} from "react-hook-form";

import ss from "./Form.module.scss";
import CoordinateInput from "../CoordinateInput/CoordinateInput";
import DateInput from "../DateInput/DateInput";

const customOnSubmit: SubmitHandler<ICornFormSchema> = (data) => {
  console.log(data);
};

interface Props {
  handleSubmit: UseFormHandleSubmit<ICornFormSchema>;
  control: Control<ICornFormSchema>;
  formState: FormState<ICornFormSchema>;
}

const Form: React.FC<Props> = ({ handleSubmit, control, formState }) => {
  return (
    <>
      <form onSubmit={handleSubmit(customOnSubmit)}>
        <Bubble
          legend="Расположение полей"
          legendSize="title"
          bubbleSize="lg"
          className={ss.group}
        >
          <CoordinateInput
            control={control}
            coordinateType="longitude"
            formState={formState}
          />
          <CoordinateInput
            control={control}
            coordinateType="latitude"
            formState={formState}
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
              required: { value: true, message: "Обязательное поле" },
            }}
            render={({ field }) => {
              return (
                // <BubbleInput
                //   {...field}
                //   inputType="date"
                //   errorMessage={formState.errors.sowingDate?.message}
                // />
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
              max: { value: 10, message: "Максимально 10°C" },
              min: { value: 0, message: "Минимально 0°C" },
              required: { value: true, message: "Обязательное поле" },
            }}
            render={({ field }) => {
              return (
                <BubbleInput
                  legend="Базовая температура"
                  {...field}
                  errorMessage={formState.errors.baseTemperature?.message}
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
