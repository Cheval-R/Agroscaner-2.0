import Form from "../../modules/Minerals/components/Form/Form";
import useCalculatorInput from "../../modules/Minerals/hooks/useCalculatorInput.js";

const MineralFertilizerCalculator = () => {
  const { formState, onInputChange, onSelectInput, onSelectOption } =
    useCalculatorInput();
  return (
    <Form
      formData={formState}
      onInputChange={onInputChange}
      onSelectInput={onSelectInput}
      onSelectOption={onSelectOption}
    />
  );
};

export default MineralFertilizerCalculator;
