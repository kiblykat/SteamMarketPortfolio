import { useContext } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import { Tabs } from "../types/globalContextTypes";

const Sidebar = () => {
  const globalContext = useContext(GlobalContext);
  const { isMenuOpen, setIsMenuOpen, activeTab, setActiveTab } = globalContext;
  const navigate = useNavigate();

  function handleTabChange(tab: Tabs) {
    setActiveTab(tab);
    navigate(`/${tab.toLowerCase()}`);
    setIsMenuOpen(false);
  }
  return (
    <>
      <div
        className={`fixed top-24 left-0 h-screen w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col p-4 space-y-6">
          <div className="flex flex-col space-y-4">
            {(["Home", "Trade", "Statement"] as const).map((tab) => (
              <button
                onClick={() => handleTabChange(tab)}
                key={tab}
                className={`text-left font-semibold text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-colors duration-200 ${
                  activeTab === tab ? "bg-white/20" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
