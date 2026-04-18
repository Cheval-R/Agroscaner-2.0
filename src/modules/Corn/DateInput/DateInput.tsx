import 'air-datepicker/air-datepicker.css';
import './DateInput.scss';

import AirDatepicker from 'air-datepicker';
import React, { useEffect, useRef } from 'react';
import type { FormState } from 'react-hook-form';

import { BubbleInput } from '../../../shared/UI/Bubble/Bubble';
import type { ICornFormSchema } from '../types/Corn.types';
import { getTodayDate } from '../functions/getTodayDate';

interface Props {
  formState: FormState<ICornFormSchema>;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  onChange: (value: string | string[]) => void;
  value: string;
}

const DateInput: React.FC<Props> = ({ formState, onBlur, onChange, value }) => {
  const datePickerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!datePickerRef.current) return;
    const datePicker = new AirDatepicker(datePickerRef.current, {
      onSelect: ({ formattedDate }) => {
        onChange(formattedDate);
      },
    });
    return () => datePicker.destroy();
  }, []);

  return (
    <BubbleInput
      errorMessage={formState.errors.sowingDate?.message}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      value={value ?? getTodayDate()}
      ref={datePickerRef}
      id="datepicker"
    />
  );
};

export default DateInput;
