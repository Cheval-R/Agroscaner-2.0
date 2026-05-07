import { createContext, type ReactNode, useContext } from 'react';

import { useMediaQuery } from '../../shared/hooks/useMediaQuery.ts';

interface AppContextValue {
  isMobileDisplay: boolean;
}
const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isMobileDisplay = useMediaQuery(450);

  const value = {
    isMobileDisplay,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useProgramContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (ctx === null) {
    throw new Error('useProgramContext must be used inside AppProvider');
  }
  return ctx;
};

export default AppContext;
