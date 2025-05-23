import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoPopup from "./InfoPopup";
import { portfolioItem } from "../types/globalContextTypes";

interface PortfolioProps {
  portfolio: portfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const handleOverlay = () => {
    setPopupVisible(true);
  };
  const navigate = useNavigate();
  return (
    <>
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
                  <th className="flex flex-row items-center gap-2">
                    <span>Curr | Avg Price</span>
                    <i
                      className="text-lg fa-solid fa-circle-question hover:text-blue-500 hover:cursor-pointer"
                      onClick={() => handleOverlay()}
                    />
                  </th>
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
                          {(item.position * item.currPrice || 0).toFixed(2)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-semibold">
                        {item.currPrice.toFixed(2)}
                      </div>
                      <div>{item.avgPrice.toFixed(2)}</div>
                    </td>

                    {/* {P&L : unrealized + realized} */}
                    <td
                      className={
                        item.PL > 0
                          ? "text-success font-semibold"
                          : "text-error"
                      }
                    >
                      {item.PL?.toFixed(2)}
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
      {popupVisible && (
        <InfoPopup
          setPopupVisible={setPopupVisible}
          text="Curr. Price is Steam Market's lowest_sell_order/1.15 to simulate market revenue at quicksell price less 15% market fees. Avg. Price is the average price of your position."
        />
      )}
    </>
  );
};

export default Portfolio;
