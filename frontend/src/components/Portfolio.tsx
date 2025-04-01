import { useEffect, useState } from "react";
import transactionAPI from "../api/api";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<[string, number, number][]>([]);
  const [currentSteamPrices, setCurrentSteamPrices] = useState<
    Record<string, number>
  >({});
  useEffect(() => {
    async function generatePortfolio() {
      try {
        const portfolioRes = await transactionAPI.get<
          Array<[string, number, number]>
        >("transactions/generate-portfolio?uid=kiblykat");
        setPortfolio(portfolioRes.data);
        const distinctNames: string[] = [
          ...new Set(
            portfolioRes.data.map((item: [string, number, number]) => item[0])
          ),
        ];
        const currentSteamPricesRes = await transactionAPI.get(
          `steamPrices/currentSteamPrices?items=${JSON.stringify(
            distinctNames
          )}`
        );
        setCurrentSteamPrices(currentSteamPricesRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    generatePortfolio();
  }, []);
  return (
    <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-4 mx-12 md:ml-12 md:mr-4 mt-12 border border-gray-300">
      <div className="card-body">
        <div className="card-title">Current Portfolio</div>
        <hr></hr>
        <div className="overflow-y-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Item</th>
                <th>Position</th>
                <th>Avg Price</th>
                <th>Curr Price</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, index) => (
                <tr key={index}>
                  {/* {itemName} */}
                  <td>{item[0]}</td>
                  {/* {Position} */}
                  <td>{item[1]}</td>
                  {/* {Avg Price} */}
                  <td>{item[2].toFixed(2)}</td>
                  {/* {Curr Price} */}
                  <td>
                    {currentSteamPrices[item[0]]
                      ? currentSteamPrices[item[0]]
                      : "N/A"}
                  </td>
                  {/* {P&L} */}
                  <td
                    className={
                      currentSteamPrices[item[0]] * item[1] -
                        item[2] * item[1] >
                      0
                        ? "text-success"
                        : "text-error"
                    }
                  >
                    {currentSteamPrices[item[0]] !== 0
                      ? (
                          currentSteamPrices[item[0]] * item[1] -
                          item[2] * item[1]
                        ).toFixed(2)
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
