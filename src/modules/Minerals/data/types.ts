import type { Identifiers } from "../../../app/types/global.types";

export interface ICrop {
  label: string;
  key: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}
export interface IFertilizerCard extends Identifiers {
  key: "nitrogen" | "phosphorus" | "potassium";
  inputs: TInputFertilizer[];
}
export interface IFieldCard extends Identifiers {
  key: "field";
  inputs: TInputField[];
}

type TFormCard = IFertilizerCard | IFieldCard;

export type TForm = TFormCard[];

interface IBasicInput extends Identifiers {
  id: string;
  required: boolean;
}

interface ITextInput extends IBasicInput {
  type: "input";
  inputType: React.InputHTMLAttributes<HTMLInputElement>["type"];
}

interface ISelect extends IBasicInput {
  type: "select";
  source: "Fertilizers" | "Crops";
}

interface ITextInputFertilizer extends ITextInput {
  key: "soilValue" | "price";
}
interface ITextInputField extends ITextInput {
  key: "area" | "harvest";
}
interface ISelectFertilizer extends ISelect {
  key: "fertilizer";
  source: "Fertilizers";
}
interface ISelectField extends ISelect {
  key: "crop";
  source: "Crops";
}

type TInputField = ITextInputField | ISelectField;
type TInputFertilizer = ITextInputFertilizer | ISelectFertilizer;

export interface IField {
  label: string;
  area: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}
export interface IClient extends Identifiers {
  fieldsList: IField[];
}
