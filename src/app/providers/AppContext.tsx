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
import type { IManualFormSchema } from "../../modules/Minerals/types/minerals.types.ts";
import type { IClientFormSchema } from "../../modules/Minerals/components/ClientForm/ClientForm.types.ts";
import {
  Crops,
  Fertilizers,
  IClientFormConfig,
} from "../../modules/Minerals/data/data.ts";

interface ActiveSelection {
  programKey: ProgramKey;
  clientKey: ClientKey;
}

type ClientKey = string | null;

type ScreenConfig = {
  component: ReactNode;
  label: string;
};

type Screens = Record<ProgramKey, ScreenConfig>;

interface AppContextValue {
  activeSelection: ActiveSelection;
  setActiveSelection: Dispatch<SetStateAction<ActiveSelection>>;
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

  const [activeSelection, setActiveSelection] = useState<ActiveSelection>({
    programKey: "mineral-fertilizer-calculator",
    clientKey: null, // 'nur'
  });

  const value = {
    activeSelection,
    setActiveSelection,
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
