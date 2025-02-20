import { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { setActiveTab } = globalContext;

  useEffect(() => {
    setActiveTab("Transfer");
  }, [navigate, setActiveTab]);

  return (
    <>
      <div className="bg-stone-100 h-full w-screen">
        <div className="flex flex-row justify-center w-screen h-screen">
          <div className="bg-white pt-8 rounded-lg shadow-md">
            <div className="flex flex-col mb-4 justify-center items-center">
              <h1 className="text-xl font-semibold ">Transfer Money</h1>
            </div>
            <div className="px-10 rounded-full">
              <p className="font-bold block text-sm text-gray-700 mb-3">
                Deposit
              </p>
              <div
                onClick={() => navigate("/transfer/deposit")}
                className="flex flex-row justify-left border border-solid shadow-md rounded-xl p-5 m-5 hover:cursor-pointer"
              >
                <i className="text-3xl text-gray-800 fa-solid fa-arrow-right p-7"></i>
                <div>
                  <p className="font-bold mt-3">Deposit money</p>
                  <div className="text-xs">
                    Deposit funds into your bank account
                  </div>
                </div>
              </div>
              <p className="font-bold block text-sm text-gray-700 mb-3">
                Withdraw
              </p>
              <div
                onClick={() => navigate("/transfer/withdraw")}
                className="flex flex-row justify-left border border-solid shadow-md rounded-xl p-5 m-5 hover:cursor-pointer"
              >
                <i className="text-3xl text-gray-800 fa-solid fa-arrow-left p-7"></i>
                <div>
                  <p className="font-bold mt-3">Withdraw money</p>
                  <div className="text-xs">
                    Withdraw funds out of your bank account
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transfer;
