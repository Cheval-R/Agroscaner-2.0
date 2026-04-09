import React from "react";

import Bubble, { BubbleButton } from "../../../../shared/UI/Bubble/Bubble";
import { Clients } from "../../data/data";
import FallbackUI from "../../../../app/layouts/FallbackUI/FallbackUI";
import ClientFieldCard from "./ClientFieldCard/ClientFieldCard";
import ClientFertilizerCard from "./ClientFertilizerCard/ClientFertilizerCard";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useProgramContext } from "../../../../app/providers/AppContext";

import type { IClientFormSchema } from "../../types/minerals.types";

import ss from "./ClientForm.module.scss";

interface Props {
  calculate: (data: IClientFormSchema) => void;
}

const ClientForm: React.FC<Props> = ({ calculate }) => {
  const { register, handleSubmit, control, formState, setValue } =
    useForm<IClientFormSchema>({
      defaultValues: {
        field: {
          area: 100,
          crop: "pshenitsa-yarovaya",
          harvest: 100,
          name: "2",
        },
        nitrogen: {
          price: 20.655,
          fertilizer: "ammiachnaya-selitra",
        },
        potassium: { price: 23, fertilizer: "kaliy-hloristyy" },
        phosphorus: {
          price: 52,
          fertilizer: "ammofos-52",
        },
      },
    });
  const onSubmit: SubmitHandler<IClientFormSchema> = (data) => {
    console.log(data);
    calculate(data);
  };
  const { activeSelection, setActiveSelection } = useProgramContext();

  const client = Clients.find(
    (client) => client.key === activeSelection.clientKey,
  );
  if (!client) {
    setActiveSelection((prev) => ({ ...prev, clientKey: null }));
    return <FallbackUI errorMessage="Клиент не найден" />;
  }

  return (
    <section className="section">
      <div className="container">
        <Bubble className={ss.title}>{client.label}</Bubble>
        <form
          className={ss.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ClientFieldCard
            control={control}
            formState={formState}
            register={register}
            setValue={setValue}
            clientData={client}
          />
          <ClientFertilizerCard
            control={control}
            formState={formState}
            register={register}
            setValue={setValue}
          />
          <BubbleButton
            type="submit"
            className={ss.expandFullWidth}
          >
            Рассчитать
          </BubbleButton>
        </form>
      </div>
    </section>
  );
};

export default ClientForm;
