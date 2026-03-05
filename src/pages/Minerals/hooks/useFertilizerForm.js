import { useState } from "react";
import { Fertilizers } from "../data/data";

const useFertilizerForm = () => {
  const [fertilizerFrom, setFertilizerFrom] = useState({
    nitrogen: { soilValue: "", fertilizerKey: "", price: "" },
    phosphorus: { soilValue: "", fertilizerKey: "", price: "" },
    potassium: { soilValue: "", fertilizerKey: "", price: "" },
  });

  const [selectSearch, setSelectSearch] = useState({
    nitrogenQuery: "",
    phosphorusQuery: "",
    potassiumQuery: "",
  });

  const onParamChange = (value, nutrientKey, param) => {
    setFertilizerFrom((prev) => ({
      ...prev,
      [nutrientKey]: {
        ...prev[nutrientKey],
        [param]: value,
      },
    }));
  };

  const onSearchQueryChange = (nutrientKey, value) => {
    setSelectSearch((prev) => ({
      ...prev,
      [`${nutrientKey}Query`]: value,
    }));
  };

  const onOptionSelect = (nutrientKey, fertilizerKey) => {
    const fertilizerData = Fertilizers.find(
      (item) => item.key === fertilizerKey,
    );
    setFertilizerFrom((prev) => ({
      ...prev,
      [nutrientKey]: {
        ...prev[nutrientKey],
        fertilizerKey,
        price: fertilizerData?.price,
      },
    }));
    setSelectSearch((prev) => ({
      ...prev,
      [`${nutrientKey}Query`]: fertilizerData?.label,
    }));
  };

  return {
    fertilizerFrom,
    selectSearch,
    onParamChange,
    onSearchQueryChange,
    onOptionSelect,
  };
};

export default useFertilizerForm;
