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

  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [portfolio, setPortfolio] = useState<
    {
      itemName: string;
      position: number;
      avgPrice: number;
      realizedPL: number;
      PL: number;
    }[]
  >([]);

  const [currentSteamPrices, setCurrentSteamPrices] = useState<
    Record<string, number>
  >({});
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
    portfolio,
    setPortfolio,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
