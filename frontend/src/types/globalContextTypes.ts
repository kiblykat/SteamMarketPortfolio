export interface GlobalContextType {
  activeTab: string;
  setActiveTab: (tab: "Landing" | "Home" | "Trade" | "Statement") => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (bool: boolean) => void;
  balance: number;
  setBalance: (balance: number) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  portfolio: portfolioItem[];
  setPortfolio: (portfolio: portfolioItem[]) => void;
  currentSteamPrices: { [key: string]: number };
  setCurrentSteamPrices: (currentSteamPrices: {
    [key: string]: number;
  }) => void;
}

export const initialGlobalState: GlobalContextType = {
  activeTab: "Landing",
  setActiveTab: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  balance: 0,
  setBalance: () => {},
  transactions: [],
  setTransactions: () => {},
  portfolio: [],
  setPortfolio: () => {},
  currentSteamPrices: {},
  setCurrentSteamPrices: () => {},
};

export interface portfolioItem {
  itemName: string;
  position: number;
  avgPrice: number;
  realizedPL: number;
  PL: number;
}

export interface Transaction {
  itemName: string;
  price: number;
  type: string; // "BUY" or "SELL"
  balance: number;
  quantity: number;
  date: string;
}

export type Tabs = "Landing" | "Home" | "Trade" | "Statement";

export const marketItems = ["Fracture Case", "Prisma Case", "Clutch Case"];
