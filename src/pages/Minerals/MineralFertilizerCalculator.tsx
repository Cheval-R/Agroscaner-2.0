import { useState } from "react";
import ManualForm from "../../modules/Minerals/components/ManualForm/ManualForm";
import Result from "../../modules/Minerals/components/Result/Result";
import { FormConfig } from "../../modules/Minerals/data/data";
import type {
  IClientFormSchema,
  IManualFormSchema,
  INutrientResultCard,
  IResults,
  ITotalPriceResultCard,
  TResultCard,
} from "../../modules/Minerals/types/minerals.types";
import { useProgramContext } from "../../app/providers/AppContext";
import ClientForm from "../../modules/Minerals/components/ClientForm/ClientForm";
import { Calculator } from "../../modules/Minerals/hooks/useCalculate";

const MineralFertilizerCalculator = () => {
  const createInitialResults = () => {
    return {
      physWeightPerGa: {
        label: "ФВ кг/га",
        value: "0",
      },
      physWeightPerField: {
        label: "ФВ т./поле",
        value: "0",
      },
      pricePerGa: {
        label: "₽/га",
        value: "0",
      },
      pricePerField: {
        label: "₽/поле",
        value: "0",
      },
    };
  };

  const createInitialResultCards = (): TResultCard[] => {
    const nutrientCards: INutrientResultCard[] = FormConfig.filter(
      (card) => card.key !== "field",
    ).map((card) => ({
      label: card.label,
      key: card.key,
      results: createInitialResults(),
    }));

    const totalCard: ITotalPriceResultCard = {
      label: "Итого",
      key: "total",
      results: {
        pricePerGa: {
          label: "₽/га",
          value: "0",
        },
        pricePerField: {
          label: "₽/поле",
          value: "0",
        },
      },
    };
    return [...nutrientCards, totalCard];
  };

  const [resultCards, setResultCards] = useState(createInitialResultCards);

  const calculate = (data: IManualFormSchema | IClientFormSchema) => {
    activeSelection.clientKey === null
      ? (data.type = "manual")
      : (data.type = "client");
    console.log(data);

    const calculator = new Calculator(
      data,
      activeSelection.clientKey ? activeSelection.clientKey : "",
    );
    const calculateResult: IResults = calculator.calculate();
    changeResultCardHandler(calculateResult);
  };

  const createNewFertilizerResults = (
    physWeightPerGa: number,
    physWeightPerField: number,
    pricePerGa: number,
    pricePerField: number,
  ) => {
    return {
      physWeightPerGa: {
        label: "ФВ кг/га",
        value: `${physWeightPerGa}`,
      },
      physWeightPerField: {
        label: "ФВ т./поле",
        value: `${physWeightPerField}`,
      },
      pricePerGa: {
        label: "₽/га",
        value: new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
          currencyDisplay: "symbol",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(pricePerGa),
      },
      pricePerField: {
        label: "₽/поле",
        value: new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
          currencyDisplay: "symbol",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(pricePerField),
      },
    };
  };

  function createNewFieldResults(pricePerGa: number, pricePerField: number) {
    return {
      pricePerGa: {
        label: "₽/га",
        value: new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
          currencyDisplay: "symbol",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(pricePerGa),
      },
      pricePerField: {
        label: "₽/поле",
        value: new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
          currencyDisplay: "symbol",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(pricePerField),
      },
    };
  }

  function changeResultCardHandler(result: IResults) {
    setResultCards((prev) => {
      return prev.map((card) => {
        if (card.key === "total") {
          return {
            ...card,
            results: createNewFieldResults(
              result.field.pricePerGa,
              result.field.pricePerField,
            ),
          };
        } else {
          return {
            ...card,
            results: createNewFertilizerResults(
              result[card.key].physWeightPerGa,
              result[card.key].physWeightPerField,
              result[card.key].pricePerGa,
              result[card.key].pricePerField,
            ),
          };
        }
      });
    });
  }

  const { activeSelection } = useProgramContext();
  return (
    <>
      {activeSelection.clientKey === null ? (
        <ManualForm calculate={calculate} />
      ) : (
        <ClientForm calculate={calculate} />
      )}
      <Result results={resultCards} />
    </>
  );
};

export default MineralFertilizerCalculator;
