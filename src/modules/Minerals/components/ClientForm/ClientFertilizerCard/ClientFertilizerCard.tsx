import React from 'react';
import type { Control, FormState, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import Bubble from '../../../../../shared/UI/Bubble/Bubble';
import type { IClientFormSchema } from '../../../types/minerals.types';
import ss from '../ClientForm.module.scss';
import FertilizerRow from './FertilizerRow';
import { NutrientConfig } from '../../../data/fertilizersData';

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
      {NutrientConfig.map((nutrient) => {
        return (
          <FertilizerRow
            key={nutrient.key}
            {...props}
            fertilizerKey={nutrient.key}
            fertilizerLabel={nutrient.label}
          />
        );
      })}
    </Bubble>
  );
};

export default ClientFertilizerCard;
