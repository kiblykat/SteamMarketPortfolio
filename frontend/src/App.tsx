import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Statement from "./pages/Statement";
import Sidebar from "./components/Sidebar";
import Tr_Buy from "./pages/Tr_Buy";
import Navbar from "./components/Navbar";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/trade" element={<Tr_Buy />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
