import { createContext, useContext, useState } from "react";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";
import MineralFertilizerCalculator from "../../pages/Minerals/MineralFertilizerCalculator";
import CornSilageHarvestCalculator from "../../pages/Corn/CornSilageHarvestCalculator";
import NitrogenFeedingCalculator from "../../pages/Nitrogen/NitrogenFeedingCalculator";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const screens = {
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

  const [activeSelection, setActiveSelection] = useState({
    programKey: "mineral-fertilizer-calculator",
    clientKey: null,
  });

  const value = {
    activeSelection,
    setActiveSelection,
    isMobileDisplay,
    screens,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useProgramContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useProgramContext must be used inside ProgramProvider");
  }
  return ctx;
};

export default AppContext;
