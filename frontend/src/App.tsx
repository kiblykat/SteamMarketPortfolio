import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Statement from "./pages/Statement";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Trade from "./pages/Trade";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/trade/:itemUrlName" element={<Trade />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
