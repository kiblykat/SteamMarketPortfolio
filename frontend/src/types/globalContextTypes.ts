export interface GlobalContextType {
  activeTab: string;
  setActiveTab: (tab: "Landing" | "Home" | "Trade" | "Statement") => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (bool: boolean) => void;
  balance: number;
  setBalance: (balance: number) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
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
};

export interface SlideInTextProps {
  children: React.ReactNode;
  delay?: number;
}

export interface Transaction {
  date: Date;
  price: number;
  balance: number;
}

export type Tabs = "Landing" | "Home" | "Trade" | "Statement";

export const marketItems = ["Fracture Case", "Prisma Case", "Clutch Case"];
