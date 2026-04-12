type TResultValue = { label: string; value: string };

export interface INutrientResult {
  physWeightPerGa: TResultValue;
  pricePerGa: TResultValue;
  physWeightPerField: TResultValue;
  pricePerField: TResultValue;
}

export interface IFieldResult {
  pricePerGa: TResultValue;
  pricePerField: TResultValue;
}

export interface INutrientResultCard {
  key: "nitrogen" | "potassium" | "phosphorus";
  label: string;
  results: INutrientResult;
}
export interface ITotalPriceResultCard {
  key: "total";
  label: string;
  results: IFieldResult;
}
export type TResultCard = INutrientResultCard | ITotalPriceResultCard;

export interface IManualFormSchema {
  nitrogen: {
    soilValue: number;
    fertilizer: string;
    price: number;
  };
  phosphorus: {
    soilValue: number;
    fertilizer: string;
    price: number;
  };
  potassium: {
    soilValue: number;
    fertilizer: string;
    price: number;
  };
  field: {
    area: number;
    crop: string;
    harvest: number;
  };
}

export interface IClientFormSchema {
  field: {
    name: string;
    area: number;
    crop: string;
    harvest: number;
  };

  nitrogen: {
    fertilizer: string;
    price: number;
  };
  phosphorus: {
    fertilizer: string;
    price: number;
  };
  potassium: {
    fertilizer: string;
    price: number;
  };
}

export interface IResults {
  nitrogen: IFertilizerResult;
  potassium: IFertilizerResult;
  phosphorus: IFertilizerResult;
  field: {
    pricePerGa: number;
    pricePerField: number;
  };
}

interface IFertilizerResult {
  physWeightPerGa: number;
  physWeightPerField: number;
  pricePerGa: number;
  pricePerField: number;
}
