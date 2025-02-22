import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Statement from "./pages/Statement";
import Trade from "./pages/Trade";
import Sidebar from "./components/Sidebar";
import Tr_Buy from "./pages/Tr_Buy";
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
        <Route path="/trade/buy" element={<Tr_Buy />} />
        <Route path="/trade/withdraw" element={<Tr_Withdraw />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
