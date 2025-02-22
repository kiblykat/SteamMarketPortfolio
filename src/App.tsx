import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Statement from "./pages/Statement";
import Trade from "./pages/Trade";
import Sidebar from "./components/Sidebar";
import Tr_Deposit from "./pages/Tr_Deposit";
import Tr_Withdraw from "./pages/Tr_Withdraw";
import Navbar from "./components/Navbar";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/trade/deposit" element={<Tr_Deposit />} />
        <Route path="/trade/withdraw" element={<Tr_Withdraw />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
