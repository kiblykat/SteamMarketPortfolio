import { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Portfolio from "../components/Portfolio";
import transactionAPI from "../api/api";

const Home = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { setActiveTab } = globalContext;
  const [portfolio, setPortfolio] = useState<
    {
      itemName: string;
      position: number;
      avgPrice: number;
      realizedPL: number;
      PL: number;
    }[]
  >([]);

  const [currentSteamPrices, setCurrentSteamPrices] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    setActiveTab("Home");
    async function generatePortfolio() {
      try {
        const portfolioRes = await transactionAPI.get<
          Array<{
            itemName: string;
            position: number;
            avgPrice: number;
            realizedPL: number;
          }>
        >("transactions/generate-portfolio?uid=kiblykat");

        const distinctNames: string[] = [
          ...new Set(portfolioRes.data.map((item) => item.itemName)),
        ];

        const currentSteamPricesRes = await transactionAPI.get(
          `steamPrices/currentSteamPrices?items=${JSON.stringify(
            distinctNames
          )}`
        );
        setCurrentSteamPrices(currentSteamPricesRes.data);
        const steamPricesData = currentSteamPricesRes.data; // use steamPricesData to avoid asynchronous setState which causes issues

        const portfolioResWithPL = portfolioRes.data.map((item) => {
          return {
            ...item,
            PL:
              item.position * steamPricesData[item.itemName] -
              item.position * item.avgPrice +
              item.realizedPL,
          };
        });

        setPortfolio(portfolioResWithPL);
      } catch (err) {
        console.error(err);
      }
    }
    generatePortfolio();
  }, [setActiveTab]);

  return (
    <>
      <div className="bg-stone-100 h-screen">
        <div className="grid grid-cols-4">
          <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-2 mx-12 md:ml-12 md:mr-4 mt-12 border border-gray-300">
            <div className="card-body">
              <div className="card-title">Steam Profit</div>
              <hr></hr>
              <h1 className=" text-6xl font-semibold">To be determined</h1>
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
    </>
  );
};

export default Home;
