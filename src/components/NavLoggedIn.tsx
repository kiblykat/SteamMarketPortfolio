import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import { Tabs } from "../types/globalContextTypes";

const NavLoggedIn = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    activeTab,
    setActiveTab,
    isMenuOpen,
    setIsMenuOpen,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleMenuOpen(bool: boolean) {
    setIsMenuOpen(bool);
  }

  function handleTabChange(tab: Tabs) {
    setActiveTab(tab);
    if (tab !== "Landing") {
      navigate(`/${tab.toLowerCase()}`);
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <div className="flex flex-row justify-center items-center h-full">
        <div className="w-full md:w-8/12 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            {/* Mobile Screen Burger */}
            <button
              onClick={() => handleMenuOpen(!isMenuOpen)}
              className={`md:hidden text-white hover:bg-white/20 p-4 w-14 m-2 rounded-full ${
                !isLoggedIn ? "hidden" : null
              }`}
            >
              {!isMenuOpen ? (
                <i className="fa-solid fa-bars"></i>
              ) : (
                <i className="fa-solid fa-xmark"></i>
              )}
            </button>
            {/* End Mobile Screen Burger */}
            {/* Right Tabs */}
            <img
              onClick={() => handleTabChange("Landing")}
              src="gic3.png"
              className="min-w-16 w-16 rounded-full cursor-pointer"
            ></img>
            <button
              onClick={() => handleTabChange("Home")}
              className={`font-semibold text-white border border-blue-900 hover:border-white/20 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300 text-xl p-2 px-4 mx-2 hidden md:block ${
                activeTab == "Home" ? "bg-white/20 p-3" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleTabChange("Transfer")}
              className={`font-semibold text-white border border-blue-900 hover:border-white/20 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300 text-xl p-2 px-4 mx-2 hidden md:block ${
                activeTab == "Transfer" ? "bg-white/20 p-3" : ""
              }`}
            >
              Transfer
            </button>
            <button
              onClick={() => handleTabChange("Statement")}
              className={`font-semibold text-white border border-blue-900 hover:border-white/20 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300 text-xl p-2 px-4 mx-2 hidden md:block ${
                activeTab == "Statement" ? "bg-white/20 p-3" : ""
              }`}
            >
              Statement
            </button>
          </div>
          {/* End Left Tabs */}
          {/* Right Tabs */}
          <div className="flex flex-col sm:flex-row justify-center items-center ">
            <div className="">
              <i
                className="text-gray-300 fa-solid fa-gear fa-lg text-3xl px-2 mx-2 text-opacity-70 hover:text-opacity-100 hover:cursor-pointer hover:text-white-400 hidden sm:block hover:animate-spin-cw"
                onMouseLeave={(e) =>
                  (e.target as HTMLElement).classList.add("animate-spin-ccw")
                }
              ></i>
            </div>
            <p
              onClick={() => setIsLoggedIn(false)}
              className="text-center font-semibold text-gray-300 text-l min-w-24 px-2 hover:cursor-pointer text-opacity-70 hover:text-opacity-100"
            >
              LOG OUT
            </p>
          </div>
          {/* End Right Tabs */}
        </div>
      </div>
    </>
  );
};

export default NavLoggedIn;
