import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import FallbackUI from '../../../../app/layouts/FallbackUI/FallbackUI';
import Bubble, { BubbleButton } from '../../../../shared/UI/Bubble/Bubble';
import { Clients } from '../../data/clientsData';
import type { IClientFormSchema } from '../../types/formSchemes';
import ClientFertilizerCard from './ClientFertilizerCard/ClientFertilizerCard';
import ClientFieldCard from './ClientFieldCard/ClientFieldCard';
import ss from './ClientForm.module.scss';

interface Props {
  calculate: (data: IClientFormSchema) => void;
}

const ClientForm: React.FC<Props> = ({ calculate }) => {
  const params = useParams();

  const { register, handleSubmit, control, formState, setValue } = useForm<IClientFormSchema>({
    defaultValues: {
      field: {
        area: '100',
        crop: 'pshenitsa-yarovaya',
        harvest: '100',
      },
      nitrogen: {
        price: '20.655',
        fertilizer: 'ammiachnaya-selitra',
      },
      potassium: { price: '23', fertilizer: 'kaliy-hloristyy' },
      phosphorus: {
        price: '52',
        fertilizer: 'ammofos-52',
      },
    },
  });
  const customOnSubmit: SubmitHandler<IClientFormSchema> = (data) => {
    console.log(data);
    calculate(data);
  };

  const client = Clients.find((client) => client.key === params.clientKey);
  if (!client) {
    return <FallbackUI errorMessage="Клиент не найден" />;
  }
  return (
    <section className="section">
      <div className="container">
        <Bubble className={ss.title}>{client.label}</Bubble>
        <form
          className={ss.form}
          onSubmit={handleSubmit(customOnSubmit)}
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
