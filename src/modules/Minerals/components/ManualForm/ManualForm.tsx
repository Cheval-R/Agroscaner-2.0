import { useForm, type SubmitHandler } from "react-hook-form";

import { BubbleButton } from "../../../../shared/UI/Bubble/Bubble";
import ManualFieldCard from "./ManualCards/ManualFieldCard";
import ManualFertilizerCard from "./ManualCards/ManualFertilizerCard";

import type { IManualFormSchema } from "../../types/minerals.types";

import ss from "./ManualForm.module.scss";

const ManualForm = ({
  calculate,
}: {
  calculate: (data: IManualFormSchema) => void;
}) => {
  const { register, handleSubmit, control, formState, setValue, reset } =
    useForm<IManualFormSchema>({
      defaultValues: {
        nitrogen: {
          soilValue: 123,
          price: 20.655,
          fertilizer: "ammiachnaya-selitra",
        },
        potassium: { soilValue: 123, price: 23, fertilizer: "kaliy-hloristyy" },
        phosphorus: {
          soilValue: 123,
          price: 52,
          fertilizer: "ammofos-52",
        },
        field: { area: 123, harvest: 123, crop: "pshenitsa-yarovaya" },
      },
    });
  const onSubmit: SubmitHandler<IManualFormSchema> = (data) => calculate(data);

  return (
    <section className={`${ss.form} section`}>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={ss.wrapper}>
            <ManualFertilizerCard
              title="Азот"
              cardKey="nitrogen"
              register={register}
              control={control}
              formState={formState}
              setValue={setValue}
            />
            <ManualFertilizerCard
              title="Фосфор"
              cardKey="phosphorus"
              register={register}
              control={control}
              formState={formState}
              setValue={setValue}
            />
            <ManualFertilizerCard
              title="Калий"
              cardKey="potassium"
              register={register}
              control={control}
              formState={formState}
              setValue={setValue}
            />
            <ManualFieldCard
              title="Поле"
              register={register}
              control={control}
              formState={formState}
            />
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
      </div>
    </section>
  );
};

export default ManualForm;
