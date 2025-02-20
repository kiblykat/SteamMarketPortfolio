import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Statement from "./pages/Statement";
import Transfer from "./pages/Transfer";
import Landing from "./pages/Landing";
import Sidebar from "./components/Sidebar";
import Tr_Deposit from "./pages/Tr_Deposit";
import Tr_Withdraw from "./pages/Tr_Withdraw";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transfer/deposit" element={<Tr_Deposit />} />
        <Route path="/transfer/withdraw" element={<Tr_Withdraw />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
