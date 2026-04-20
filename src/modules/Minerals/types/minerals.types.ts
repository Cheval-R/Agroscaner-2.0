interface TResultValue {
  label: string;
  value: string;
}

export interface INutrientResult {
  physWeightPerGa: TResultValue;
  pricePerGa: TResultValue;
  physWeightPerField: TResultValue;
  pricePerField: TResultValue;
}

interface IFieldResult {
  pricePerGa: TResultValue;
  pricePerField: TResultValue;
}

export interface INutrientResultCard {
  key: 'nitrogen' | 'potassium' | 'phosphorus';
  label: string;
  results: INutrientResult;
}
export interface ITotalPriceResultCard {
  key: 'total';
  label: string;
  results: IFieldResult;
}
export type TResultCard = INutrientResultCard | ITotalPriceResultCard;

export interface IResults {
  nitrogen: IFertilizerResult;
  potassium: IFertilizerResult;
  phosphorus: IFertilizerResult;
  field: ITotalResult;
}

export interface IFertilizerResult {
  physWeightPerGa: number;
  physWeightPerField: number;
  pricePerGa: number;
  pricePerField: number;
}
export interface ITotalResult {
  pricePerGa: number;
  pricePerField: number;
}

export interface IFertilizerResultItem {
  key: 'physWeightPerField' | 'physWeightPerGa' | 'pricePerField' | 'pricePerGa';
  label: string;
  value: string;
}
export interface ITotalResultItem {
  key: 'pricePerField' | 'pricePerGa';
  label: string;
  value: string;
}

export type TResultItem = IFertilizerResultItem | ITotalResultItem;
