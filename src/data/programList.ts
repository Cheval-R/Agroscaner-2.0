import { Clients } from "../modules/Minerals/data/data";
import type { Identifiers, ProgramKey } from "./../app/types/global.types";

export interface IProgram {
  key: ProgramKey;
  label: string;
  innerList?: Identifiers[];
}

const PROGRAM_LIST: IProgram[] = [
  {
    label: "Расчёт минеральных удобрений",
    key: "mineral-fertilizer-calculator",

    innerList: Clients.map((client) => {
      return { key: client.key, label: client.label };
    }),
  },
  {
    label: "Расчёт сроков уборки кукурузы",
    key: "corn-silage-harvest-calculator",
  },
  { label: "Расчёт азотной подкормки", key: "nitrogen-feeding-calculator" },
];

export default PROGRAM_LIST;
