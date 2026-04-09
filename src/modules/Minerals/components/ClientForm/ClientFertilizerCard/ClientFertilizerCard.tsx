import React from "react";
import Bubble from "../../../../../shared/UI/Bubble/Bubble";
import type {
  UseFormRegister,
  Control,
  FormState,
  UseFormSetValue,
} from "react-hook-form";
import FertilizerRow from "./FertilizerRow";

import type { IClientFormSchema } from "../../../types/minerals.types";

import ss from "../ClientForm.module.scss";

interface Props {
  register: UseFormRegister<IClientFormSchema>;
  control: Control<IClientFormSchema>;
  formState: FormState<IClientFormSchema>;
  setValue: UseFormSetValue<IClientFormSchema>;
}

const ClientFertilizerCard: React.FC<Props> = (props) => {
  return (
    <Bubble
      legend="Удобрения"
      legendSize="title"
      className={`${ss.card} ${ss.fertilizerCard}`}
    >
      <FertilizerRow
        {...props}
        fertilizerName="nitrogen"
      />

      <FertilizerRow
        {...props}
        fertilizerName="phosphorus"
      />

      <FertilizerRow
        {...props}
        fertilizerName="potassium"
      />
    </Bubble>
  );
};

export default ClientFertilizerCard;
