import { useEffect, useState } from "react";
import transactionAPI from "../api/api";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<
    [string, number, number, number][]
  >([]);
  useEffect(() => {
    async function generatePortfolio() {
      try {
        const portfolioRes = await transactionAPI.get(
          "transactions/generate-portfolio?uid=kiblykat"
        );
        setPortfolio(portfolioRes.data);
        return portfolioRes;
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
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2].toFixed(2)}</td>
                  <td>placeholder</td>
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
