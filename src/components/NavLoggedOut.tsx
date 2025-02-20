import { useContext } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const NavLoggedOut = () => {
  const globalContext = useContext(GlobalContext);
  const { setIsLoggedIn, setActiveTab } = globalContext;
  const navigate = useNavigate();

  function handleLogIn(): void {
    setIsLoggedIn(true);
    setActiveTab("Home");
    navigate("/home");
  }

  return (
    <>
      <div className="flex flex-row justify-center items-center h-full">
        <div className="w-8/12 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <img
              onClick={() => navigate("/")}
              src="gic3.png"
              className="min-w-16 w-16 rounded-full cursor-pointer"
            ></img>
            <button className="hidden font-semibold text-white border border-blue-900 hover:border-white hover:border-white/20 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 text-xl p-2 px-4 mx-2">
              Home
            </button>
            <button className="hidden font-semibold text-white border border-blue-900 hover:border-white hover:border-white/20 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 text-xl p-2 px-4 mx-2">
              Transfer
            </button>
            <button className="hidden font-semibold text-white border border-blue-900 hover:border-white hover:border-white/20 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 text-xl p-2 px-4 mx-2">
              Statement
            </button>
          </div>
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
              onClick={() => handleLogIn()}
              className="text-center font-semibold text-gray-300 text-l min-w-24 px-2 hover:cursor-pointer text-opacity-100 hover:text-opacity-100 border-2 py-4 transition-all hover:bg-white/20 rounded-full border-gray-300 hover:border-white"
            >
              LOG IN
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavLoggedOut;
