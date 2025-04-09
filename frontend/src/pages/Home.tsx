import { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Portfolio from "../components/Portfolio";
import InfoPopup from "../components/InfoPopup";

const Home = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const globalContext = useContext(GlobalContext);
  const { setActiveTab, portfolio, currentSteamPrices } = globalContext;

  useEffect(() => {
    setActiveTab("Home");
  }, [setActiveTab]);

  return (
    <>
      <div className="bg-stone-100 h-screen">
        <div className="grid grid-cols-4">
          <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-2 mx-12 md:ml-12 md:mr-4 mt-12 border border-gray-300">
            <div className="card-body">
              <div className="card-title">
                Steam Profit
                <span>
                  <i
                    className="text-lg fa-solid fa-circle-question hover:text-blue-500 hover:cursor-pointer"
                    onClick={() => setPopupVisible(true)}
                  />
                </span>
              </div>

              <hr></hr>
              <h1 className=" text-6xl font-semibold">
                ${portfolio.reduce((acc, curr) => acc + curr.PL, 0).toFixed(2)}
              </h1>
              <hr></hr>
              <p className="flex justify-end mt-2 text-2xl font-semibold">
                Deposit: $
                {portfolio
                  .reduce((acc, curr) => acc + curr.avgPrice * curr.position, 0)
                  .toFixed(2)}
              </p>
              <button
                onClick={() => navigate("/trade")}
                className="btn rounded-full w-52 mt-16 bg-gray-900 text-white"
              >
                New trade
              </button>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-2 mx-12 md:mr-12 md:ml-4 mt-4 md:mt-12 border border-gray-300">
            <div className="card-body">
              <div className="card-title">Recent Activity</div>
              <hr></hr>
              <div className="overflow-y-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalContext.transactions
                      .slice(0, 3)
                      .map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.date.replace(/T.*/, "")}</td>
                          <td
                            className={
                              transaction.price > 0
                                ? "text-success"
                                : "text-error"
                            }
                          >
                            {transaction.price > 0 ? "+" : "-"}$
                            {Math.abs(transaction.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Portfolio
            portfolio={portfolio}
            currentSteamPrices={currentSteamPrices}
          />
        </div>
      </div>
      {popupVisible && (
        <InfoPopup
          setPopupVisible={setPopupVisible}
          text="Steam Profit is calculated by taking the total_revenue - total_deposit. total_revenue = realized + unrealized P&L. Deposit refers to the total amount of money you have put into the account."
        />
      )}
    </>
  );
};

export default Home;
