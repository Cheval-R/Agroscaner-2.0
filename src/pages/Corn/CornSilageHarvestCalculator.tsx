import { useForm, type SubmitHandler } from "react-hook-form";
import Map from "../../modules/Corn/Map/Map";

import type { ICornFormSchema } from "../../modules/Corn/types/Corn.types";
import Form from "../../modules/Corn/Form/Form";

const CornSilageHarvestCalculator = () => {
  const { handleSubmit, control, formState, setValue, getValues } = useForm<ICornFormSchema>({
    defaultValues: { longitude: "49.118024", latitude: "55.795214", baseTemperature: "5" },
  });

  return (
    <section>
      <div className="container">
        <Form
          handleSubmit={handleSubmit}
          control={control}
          formState={formState}
        />
        <Map
          coordinates={{ longitude: Number(getValues("longitude")), latitude: Number(getValues("latitude")) }}
          setValue={setValue}
        />
      </div>
    </section>
  );
};

export default CornSilageHarvestCalculator;
