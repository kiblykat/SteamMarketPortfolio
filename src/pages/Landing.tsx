import { useContext } from "react";
import { SlideInText } from "../components/SlideInText";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { setIsLoggedIn, setActiveTab } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleLogIn() {
    setIsLoggedIn(true);
    setActiveTab("Home");
    navigate("/home");
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <SlideInText>
            <p className="font-bold mb-5 text-lg">GIC Banking</p>
          </SlideInText>
          <SlideInText>
            <h1 className="text-6xl font-bold text-navy-900">Fast, secure</h1>
          </SlideInText>
          <SlideInText delay={200}>
            <h1 className="text-6xl font-bold text-navy-900">and trusted.</h1>
          </SlideInText>
          <SlideInText delay={400}>
            <button
              onClick={() => handleLogIn()}
              className="mt-8 bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Get Started
            </button>
          </SlideInText>
        </div>
      </div>
    </>
  );
};

export default Landing;
