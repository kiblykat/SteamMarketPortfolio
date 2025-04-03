import { useNavigate } from "react-router-dom";

interface PortfolioProps {
  portfolio: {
    itemName: string;
    position: number;
    avgPrice: number;
    PL: number;
    realizedPL: number;
  }[];
  currentSteamPrices: Record<string, number>;
}

const Portfolio: React.FC<PortfolioProps> = ({
  portfolio,
  currentSteamPrices,
}) => {
  const navigate = useNavigate();
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
                <th>Position | Mkt</th>
                <th>Curr | Avg Price</th>
                <th>P&L</th>
                <th>Realized P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, index) => (
                <tr
                  className="hover:cursor-pointer hover:bg-gray-100"
                  key={index}
                  onClick={() =>
                    navigate(`/trade/${item.itemName.split(" ").join("%20")}`)
                  }
                >
                  <td>{item.itemName}</td>
                  <td>
                    <div>
                      <div className="font-semibold">{item.position}</div>
                      <div>
                        {(
                          item.position * currentSteamPrices[item.itemName] || 0
                        ).toFixed(2)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold">
                      {currentSteamPrices[item.itemName]
                        ? currentSteamPrices[item.itemName]
                        : "N/A"}
                    </div>
                    <div>{item.avgPrice.toFixed(2)}</div>
                  </td>

                  {/* {P&L : unrealized + realized} */}
                  <td
                    className={
                      item.PL > 0 ? "text-success font-semibold" : "text-error"
                    }
                  >
                    {item.PL.toFixed(2)}
                  </td>
                  <td
                    className={
                      item.realizedPL > 0
                        ? "text-success font-semibold"
                        : item.realizedPL == 0
                        ? ""
                        : "text-error"
                    }
                  >
                    {item.realizedPL.toFixed(2)}
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
