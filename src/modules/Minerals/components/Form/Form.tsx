import { FormConfig } from "../../data/data";
import ss from "./Form.module.scss";
import { BubbleButton } from "../../../../shared/UI/Bubble/Bubble";
import FormCard from "../FormCard/FormCard";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface IFormSchema {
  nitrogen: {
    soilValue: string;
    fertilizer: string;
    price: string;
  };
  phosphorus: {
    soilValue: string;
    fertilizer: string;
    price: string;
  };
  potassium: {
    soilValue: string;
    fertilizer: string;
    price: string;
  };
  field: {
    area: string;
    crop: string;
    harvest: string;
  };
}

const Form = () => {
  const { register, handleSubmit, control, formState, setValue, reset } =
    useForm<IFormSchema>();
  const onSubmit: SubmitHandler<IFormSchema> = (data) => console.log(data);

  return (
    <section className={`${ss.form} container`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={ss.wrapper}>
          {FormConfig.map((card) => {
            return (
              <FormCard
                card={card}
                key={card.key}
                register={register}
                control={control}
                formState={formState}
                setValue={setValue}
              />
            );
          })}
        </div>
        <BubbleButton type="submit">Рассчитать</BubbleButton>
        <BubbleButton
          type="button"
          onClick={() => {
            reset();
          }}
        >
          reset
        </BubbleButton>
      </form>
    </section>
  );
};

export default Form;
