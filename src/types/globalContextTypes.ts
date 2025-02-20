export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: "Landing" | "Home" | "Transfer" | "Statement") => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (bool: boolean) => void;
  balance: number;
  setBalance: (balance: number) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

export const initialGlobalState: GlobalContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
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

export type Tabs = "Landing" | "Home" | "Transfer" | "Statement";
