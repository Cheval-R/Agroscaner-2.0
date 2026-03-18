import { useState } from "react";

const useCalculatorResult = () => {
  const resultConfig = [
    {
      key: "nitrogen",
      label: "Азот",
      dose: { kiloPerGa: "2222222222", tonnePerField: "3333333333333" },
    },
    {
      key: "phosphorus",
      label: "Фосфор",
      dose: { kiloPerGa: "44444444444", tonnePerField: "555555555555" },
    },
    {
      key: "potassium",
      label: "Калий",
      dose: { kiloPerGa: "666666666666", tonnePerField: "7777777777777" },
    },
  ];

  const [resultData, setResultData] = useState(resultConfig);

  return { resultData, setResultData };
};

export default useCalculatorResult;
