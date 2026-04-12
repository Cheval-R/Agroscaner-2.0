import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery.ts";
import MineralFertilizerCalculator from "../../pages/Minerals/MineralFertilizerCalculator";
import CornSilageHarvestCalculator from "../../pages/Corn/CornSilageHarvestCalculator";
import NitrogenFeedingCalculator from "../../pages/Nitrogen/NitrogenFeedingCalculator";
import type { ProgramKey } from "../types/global.types.ts";

type ClientKey = string | null;

type ScreenConfig = {
  component: ReactNode;
  label: string;
};

type Screens = Record<ProgramKey, ScreenConfig>;

interface AppContextValue {
  isMobileDisplay: boolean;
  screens: Screens;
}
const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const screens: Screens = {
    "mineral-fertilizer-calculator": {
      component: <MineralFertilizerCalculator />,
      label: "Калькулятор доз минеральных удобрений",
    },
    "corn-silage-harvest-calculator": {
      component: <CornSilageHarvestCalculator />,
      label: "Расчёт сроков скашивания кукурузы на силос",
    },
    "nitrogen-feeding-calculator": {
      component: <NitrogenFeedingCalculator />,
      label: "Калькулятор доз азотной подкормки",
    },
  };

  const isMobileDisplay = useMediaQuery(450);

  const value = {
    isMobileDisplay,
    screens,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useProgramContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (ctx === null) {
    throw new Error("useProgramContext must be used inside AppProvider");
  }
  return ctx;
};

export default AppContext;
