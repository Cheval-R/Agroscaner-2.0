import React from "react";
import { type Control,Controller } from "react-hook-form";

import { BubbleInput } from "../../../shared/UI/Bubble/Bubble";
import type { ICornFormSchema } from "../types/Corn.types";

// Широта: -90.000000 до 90.000000 (до 6 знаков)
const LATITUDE_PATTERN = /^-?([0-8]?[0-9](\.\d{1,6})?|90(\.0{1,6})?)$/;

// Долгота: -180.000000 до 180.000000
const LONGITUDE_PATTERN = /^-?((1?[0-7]?|[0-9])?[0-9](\.\d{1,6})?|180(\.0{1,6})?)$/;

interface Props {
  control: Control<ICornFormSchema>;
  coordinateType: "latitude" | "longitude";
}

const CoordinateInput: React.FC<Props> = ({ control, coordinateType }) => {
  return (
    <Controller
      name={coordinateType}
      control={control}
      rules={{
        pattern: {
          value: coordinateType === "latitude" ? LATITUDE_PATTERN : LONGITUDE_PATTERN,
          message: `Введите корректную ${coordinateType === "latitude" ? "широту" : "долготу"}`,
        },
        required: { value: true, message: "Обязательное поле" },
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <BubbleInput
            legend={`${coordinateType === "latitude" ? "Широта" : "Долгота"}`}
            {...field}
            errorMessage={error?.message}
          />
        );
      }}
    />
  );
};

export default CoordinateInput;
