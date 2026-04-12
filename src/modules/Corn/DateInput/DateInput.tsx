import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "./DateInput.scss";
import React, { useEffect, useRef } from "react";
import { BubbleInput } from "../../../shared/UI/Bubble/Bubble";
import type { FormState } from "react-hook-form";
import type { ICornFormSchema } from "../types/Corn.types";

interface Props {
  formState: FormState<ICornFormSchema>;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  onChange: React.FocusEventHandler<HTMLInputElement>;
}

const DateInput: React.FC<Props> = ({ formState, onBlur, onChange }) => {
  const datePickerRef = useRef(null);
  useEffect(() => {
    if (datePickerRef === null) return;

    const datePicker = new AirDatepicker("#datepicker");
    console.log(formState);
  }, []);

  return (
    <BubbleInput
      errorMessage={""}
      onBlur={onBlur}
      onChange={onChange}
      ref={datePickerRef}
      id="datepicker"
    />
    // <input
    //   id="datepicker"
    //   // onFocus={() => datePicker.show()}
    // ></input>
  );
};

export default DateInput;
