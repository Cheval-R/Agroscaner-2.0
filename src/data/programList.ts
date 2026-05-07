import type { ProgramKey } from '../app/types/global.types';

export interface IProgram {
  key: ProgramKey;
  label: string;
}

export const PROGRAM_LIST: IProgram[] = [
  {
    label: 'Расчёт минеральных удобрений',
    key: 'mineral-fertilizer-calculator',
  },
  {
    label: 'Расчёт сроков уборки кукурузы',
    key: 'corn-silage-harvest-calculator',
  },
  { label: 'Расчёт азотной подкормки', key: 'nitrogen-feeding-calculator' },
];
