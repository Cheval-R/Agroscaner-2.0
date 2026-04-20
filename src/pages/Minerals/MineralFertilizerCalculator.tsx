import { type Dispatch, type SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';

import ClientForm from '../../modules/Minerals/components/ClientForm/ClientForm';
import ManualForm from '../../modules/Minerals/components/ManualForm/ManualForm';
import Result from '../../modules/Minerals/components/Result/Result';
import { NutrientConfig } from '../../modules/Minerals/data/fertilizersData';
import { Calculator } from '../../modules/Minerals/hooks/fertilizerCalculator';
import type {
  IClientFormSchema,
  IManualFormSchema,
} from '../../modules/Minerals/types/formSchemes';
import type {
  INutrientResultCard,
  IResults,
  ITotalPriceResultCard,
  TResultCard,
} from '../../modules/Minerals/types/minerals.types';

const createInitialResultCards = (): TResultCard[] => {
  const nutrientCards: INutrientResultCard[] = NutrientConfig.map((nutrient) => {
    return {
      label: nutrient.label,
      key: nutrient.key,
      results: {
        physWeightPerGa: {
          label: 'ФВ кг/га',
          value: '0',
        },
        physWeightPerField: {
          label: 'ФВ т./поле',
          value: '0',
        },
        pricePerGa: {
          label: '₽/га',
          value: '0',
        },
        pricePerField: {
          label: '₽/поле',
          value: '0',
        },
      },
    };
  });

  const totalCard: ITotalPriceResultCard = {
    label: 'Итого',
    key: 'total',
    results: {
      pricePerGa: {
        label: '₽/га',
        value: '0',
      },
      pricePerField: {
        label: '₽/поле',
        value: '0',
      },
    },
  };
  return [...nutrientCards, totalCard];
};

const setNutrientResults = (
  physWeightPerGa: number,
  physWeightPerField: number,
  pricePerGa: number,
  pricePerField: number,
) => {
  return {
    physWeightPerGa: {
      label: 'ФВ кг/га',
      value: `${physWeightPerGa}`,
    },
    physWeightPerField: {
      label: 'ФВ т./поле',
      value: `${physWeightPerField}`,
    },
    pricePerGa: {
      label: '₽/га',
      value: new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(pricePerGa),
    },
    pricePerField: {
      label: '₽/поле',
      value: new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(pricePerField),
    },
  };
};

const setFieldResults = (pricePerGa: number, pricePerField: number) => {
  return {
    pricePerGa: {
      label: '₽/га',
      value: new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(pricePerGa),
    },
    pricePerField: {
      label: '₽/поле',
      value: new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(pricePerField),
    },
  };
};

const changeResultCardHandler = (
  result: IResults,
  setResultCards: Dispatch<SetStateAction<TResultCard[]>>,
) => {
  setResultCards((prev) => {
    return prev.map((card) => {
      if (card.key === 'total') {
        return {
          ...card,
          results: setFieldResults(result.field.pricePerGa, result.field.pricePerField),
        };
      } else {
        return {
          ...card,
          results: setNutrientResults(
            result[card.key].physWeightPerGa,
            result[card.key].physWeightPerField,
            result[card.key].pricePerGa,
            result[card.key].pricePerField,
          ),
        };
      }
    });
  });
};

const MineralFertilizerCalculator = () => {
  const params = useParams();

  const [resultCards, setResultCards] = useState(createInitialResultCards);

  const calculate = (data: IManualFormSchema | IClientFormSchema) => {
    const calculator = new Calculator(data, params.clientKey ? params.clientKey : '');
    const calculateResult: IResults = calculator.calculate();
    changeResultCardHandler(calculateResult, setResultCards);
  };

  return (
    <>
      {params.clientKey ? (
        // TODO: Сравнить вычисления с оригинальным калькулятором
        <ClientForm calculate={calculate} />
      ) : (
        <ManualForm calculate={calculate} />
      )}
      <Result results={resultCards} />
    </>
  );
};

export default MineralFertilizerCalculator;
