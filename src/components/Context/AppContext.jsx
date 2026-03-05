import { createContext, useContext, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const isMobileDisplay = useMediaQuery(450);

  const [activeSelection, setActiveSelection] = useState({
    programKey: "mineral-fertilizer-calculator",
    clientKey: null,
  });

  const value = {
    activeSelection,
    setActiveSelection,
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
