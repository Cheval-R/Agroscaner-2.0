import { createContext, useContext, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const isMobileDisplay = useMediaQuery(450);

  const [activeSelection, setActiveSelection] = useState({
    program: {
      key: "mineral-fertilizer-calculator",
      label: "Расчёт минеральных удобрений",
    },
    client: { key: null, label: null },
  });

  const changeActiveProgram = (programKey, programLabel) => {
    setActiveSelection({
      client: { key: null, label: null },
      program: { key: programKey, label: programLabel },
    });
  };

  const changeActiveClient = (
    activeClientProgramKey,
    activeClientProgramLabel,
    activeClientKey,
    activeClientLabel,
  ) => {
    setActiveSelection({
      program: {
        key: activeClientProgramKey,
        label: activeClientProgramLabel,
      },
      client: {
        key: activeClientKey,
        label: activeClientLabel,
      },
    });
  };

  const value = {
    activeSelection,
    changeActiveClient,
    changeActiveProgram,
    isMobileDisplay,
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
