import { useEffect, useState } from "react";
import transactionAPI from "../api/api";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<
    { itemName: string; position: number; avgPrice: number }[]
  >([]);
  const [currentSteamPrices, setCurrentSteamPrices] = useState<
    Record<string, number>
  >({});
  useEffect(() => {
    async function generatePortfolio() {
      try {
        const portfolioRes = await transactionAPI.get<
          Array<{ itemName: string; position: number; avgPrice: number }>
        >("transactions/generate-portfolio?uid=kiblykat");
        setPortfolio(portfolioRes.data);
        const distinctNames: string[] = [
          ...new Set(
            portfolioRes.data.map(
              (item: {
                itemName: string;
                position: number;
                avgPrice: number;
              }) => item.itemName
            )
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
                  <td>{item.itemName}</td>
                  <td>{item.position}</td>
                  <td>{item.avgPrice.toFixed(2)}</td>
                  {/* {Curr Price} */}
                  <td>
                    {currentSteamPrices[item.itemName]
                      ? currentSteamPrices[item.itemName]
                      : "N/A"}
                  </td>
                  {/* {P&L} */}
                  <td
                    className={
                      currentSteamPrices[item.itemName] * item.position -
                        item.avgPrice * item.position >
                      0
                        ? "text-success"
                        : "text-error"
                    }
                  >
                    {currentSteamPrices[item.itemName] !== 0
                      ? (
                          currentSteamPrices[item.itemName] * item.position -
                          item.avgPrice * item.position
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
