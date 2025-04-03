import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Statement from "./pages/Statement";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Trade from "./pages/Trade";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
