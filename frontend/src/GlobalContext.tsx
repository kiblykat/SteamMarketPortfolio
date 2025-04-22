import { createContext, useEffect, useState } from "react";
import transactionAPI from "./api/api";
import {
  GlobalContextType,
  initialGlobalState,
  portfolioItem,
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
  const [portfolio, setPortfolio] = useState<portfolioItem[]>(() => {
    const storedPortfolio = localStorage.getItem("portfolio");
    return storedPortfolio ? JSON.parse(storedPortfolio) : [];
  });

  async function generatePortfolio() {
    try {
      const portfolioRes = await transactionAPI.get<Array<portfolioItem>>(
        "transactions/generate-portfolio?uid=kiblykat"
      );

      const portfolioResData = portfolioRes.data;

      portfolioResData.sort(
        (a, b) => a.itemName.localeCompare(b.itemName) // Sort by itemName
      );

      localStorage.setItem("portfolio", JSON.stringify(portfolioResData)); // Update localStorage

      setPortfolio(portfolioResData); //add PL data to portfolio state
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    generatePortfolio();

    const interval = setInterval(() => {
      generatePortfolio(); // Fetch fresh data every 30 seconds
    }, 30000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const context = {
    activeTab,
    setActiveTab,
    isMenuOpen,
    setIsMenuOpen,
    balance,
    setBalance,
    transactions,
    setTransactions,
    portfolio,
    setPortfolio,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
