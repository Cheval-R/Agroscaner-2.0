import Form from "../../modules/Minerals/components/Form/Form";
import Result from "../../modules/Minerals/components/Result/Result.jsx";
import useCalculatorInput from "../../modules/Minerals/hooks/useCalculatorInput.js";

const MineralFertilizerCalculator = () => {
  const { formState, onInputChange, onSelectInput, onSelectOption } =
    useCalculatorInput();
  return (
    <>
      <Form
        formData={formState}
        onInputChange={onInputChange}
        onSelectInput={onSelectInput}
        onSelectOption={onSelectOption}
      />
      <Result area={formState.form.field.area} />
    </>
  );
};

export default MineralFertilizerCalculator;
