import {
  Controller,
  type Control,
  type FormState,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import type { IManualFormSchema } from "../../../types/minerals.types";

import Bubble, { BubbleInput } from "../../../../../shared/UI/Bubble/Bubble";
import Select from "../../../../../shared/UI/Select/Select";
import { Fertilizers } from "../../../data/data";

import ss from "./ManualCard.module.scss";

interface Props {
  title: string;
  cardKey: "nitrogen" | "phosphorus" | "potassium";
  register: UseFormRegister<IManualFormSchema>;
  control: Control<IManualFormSchema>;
  formState: FormState<IManualFormSchema>;
  setValue: UseFormSetValue<IManualFormSchema>;
}

const ManualFertilizerCard = ({
  title,
  cardKey,
  register,
  control,
  formState,
  setValue,
}: Props) => {
  return (
    <Bubble
      legend={title}
      className={ss.card}
    >
      <BubbleInput
        legend="В почве, мг/кг"
        inputType="number"
        {...register(`${cardKey}.soilValue`, {
          required: "Обязательное поле",
          min: { value: 0, message: "Положительное число" },
          valueAsNumber: true,
        })}
        errorMessage={formState.errors?.[cardKey]?.soilValue?.message}
      />
      <Controller
        control={control}
        name={`${cardKey}.fertilizer` as const}
        rules={{ required: "Обязательное поле" }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Select
              optionsList={Fertilizers}
              activeKey={value}
              legend="Удобрение"
              selectOption={(optionKey: string) => {
                onChange(optionKey);
                let fert = Fertilizers.find(
                  (fertilizer) => fertilizer.key === optionKey,
                );
                setValue(`${cardKey}.price`, fert ? fert.price : 0);
              }}
              errorMessage={formState.errors?.[cardKey]?.fertilizer?.message}
              onBlur={onBlur}
            />
          );
        }}
      />
      <BubbleInput
        legend="Стоимость"
        inputType="number"
        {...register(`${cardKey}.price`, {
          required: "Обязательное поле",
          min: { value: 0, message: "Положительное число" },
          valueAsNumber: true,
        })}
        errorMessage={formState.errors?.[cardKey]?.price?.message}
      />
    </Bubble>
  );
};

export default ManualFertilizerCard;
