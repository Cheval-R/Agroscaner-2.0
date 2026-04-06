import {
  Controller,
  type Control,
  type FormState,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import Bubble, { BubbleInput } from "../../../../shared/UI/Bubble/Bubble";
import Select from "../../../../shared/UI/Select/Select";
import { OPTION_SOURCES, type TForm } from "../../data/data";
import ss from "./FromCard.module.scss";
import type { IFormSchema } from "../Form/Form";

interface Props {
  card: TForm[number];
  register: UseFormRegister<IFormSchema>;
  control: Control<IFormSchema>;
  formState: FormState<IFormSchema>;
  setValue: UseFormSetValue<IFormSchema>;
}

const FormCard = ({ card, register, control, formState, setValue }: Props) => {
  let content;
  if (card.key === "field") {
    content = card.inputs.map((input) => {
      const fieldName = `${card.key}.${input.key}` as const;
      if (input.type === "select") {
        return (
          <Controller
            key={input.key}
            control={control}
            name={fieldName}
            rules={{
              ...(input.required ? { required: "Обязательное поле" } : ""),
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <Select
                  optionsList={OPTION_SOURCES[input.source]}
                  activeKey={value}
                  legend={input.label}
                  selectOption={(optionKey: string) => {
                    onChange(optionKey);
                  }}
                  errorMessage={
                    formState.errors?.[card.key]?.[input.key]?.message
                  }
                  onBlur={onBlur}
                />
              );
            }}
          />
        );
      }
      if (input.type === "input") {
        return (
          <BubbleInput
            key={input.key}
            legend={input.label}
            inputType={input.inputType}
            {...register(fieldName, {
              ...(input.required ? { required: "Обязательное поле" } : ""),
              ...(input.inputType === "number"
                ? { min: { value: 0, message: "Положительное число" } }
                : {}),
            })}
            errorMessage={formState.errors?.[card.key]?.[input.key]?.message}
          />
        );
      }
    });
  } else {
    content = card.inputs.map((input) => {
      const fieldName = `${card.key}.${input.key}` as const;
      if (input.type === "select") {
        return (
          <Controller
            key={input.key}
            control={control}
            name={fieldName}
            rules={{
              ...(input.required ? { required: "Обязательное поле" } : ""),
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <Select
                  optionsList={OPTION_SOURCES[input.source]}
                  activeKey={value}
                  legend={input.label}
                  selectOption={(optionKey: string) => {
                    onChange(optionKey);
                    let fert = OPTION_SOURCES[input.source].find(
                      (fertilizer) => fertilizer.key === optionKey,
                    );
                    setValue(`${card.key}.price`, fert ? fert.price : "");
                  }}
                  errorMessage={
                    formState.errors?.[card.key]?.[input.key]?.message
                  }
                  onBlur={onBlur}
                />
              );
            }}
          />
        );
      }
      if (input.type === "input") {
        return (
          <BubbleInput
            key={input.key}
            legend={input.label}
            inputType={input.inputType}
            {...register(fieldName, {
              ...(input.required ? { required: "Обязательное поле" } : ""),
              ...(input.inputType === "number"
                ? { min: { value: 0, message: "Положительное число" } }
                : {}),
            })}
            errorMessage={formState.errors?.[card.key]?.[input.key]?.message}
          />
        );
      }
    });
  }

  return (
    <Bubble
      legend={card.label}
      className={ss.card}
    >
      {content}
    </Bubble>
  );
};

export default FormCard;
