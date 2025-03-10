import { createContext, useState } from "react";
import {
  GlobalContextType,
  initialGlobalState,
  Transaction,
} from "./types/globalContextTypes";
import { ReactNode } from "react";

const GlobalContext = createContext<GlobalContextType>(initialGlobalState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "Landing" | "Home" | "Trade" | "Statement"
  >("Landing");

  const [currentSteamPrices, setCurrentSteamPrices] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const context = {
    activeTab,
    setActiveTab,
    isMenuOpen,
    setIsMenuOpen,
    balance,
    setBalance,
    transactions,
    setTransactions,
    currentSteamPrices,
    setCurrentSteamPrices,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
