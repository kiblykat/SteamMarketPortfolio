import { useContext, useEffect, useMemo, useState } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Portfolio from "../components/Portfolio";
import InfoPopup from "../components/InfoPopup";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import transactionAPI from "../api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PLData {
  timestamp: string;
  PLs: number;
  realizedPL: number;
}
const Home = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [PLData, setPLData] = useState<PLData[]>([]);
  const globalContext = useContext(GlobalContext);
  const { setActiveTab, portfolio, currentSteamPrices } = globalContext;

  useEffect(() => {
    setActiveTab("Home");
  }, [setActiveTab]);

  useEffect(() => {
    const fetchPL = async () => {
      const response = await transactionAPI.get(
        `/portfolio-history/get-consolidated/${import.meta.env.VITE_UID}`
      );
      const data = response.data;
      setPLData(data);
    };
    fetchPL();
  }, []);

  const chartData = useMemo(
    () => ({
      labels: PLData.map((data) => data.timestamp),
      datasets: [
        {
          label: "Realized P&L",
          data: PLData.map((data) => data.realizedPL),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Unrealized P&L",
          data: PLData.map((data) => data.PLs),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    }),
    [PLData]
  );

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
              <div className="card-title">Profit/Loss Graph</div>
              <hr></hr>
              <Line data={chartData} />
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
