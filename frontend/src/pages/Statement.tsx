import { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import transactionAPI from "../api/api";
import { Transaction } from "../types/globalContextTypes";

const Statement = () => {
  const navigate = useNavigate();
  const { setActiveTab, setCurrentSteamPrices } = useContext(GlobalContext);

  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  useEffect(() => {
    setActiveTab("Statement");
    const fetchTransactions = async () => {
      const response = await transactionAPI.get("/transactions/kiblykat");
      const data = response.data;
      console.log(data);
      setTransactionData(data);
      const casePricesResponse = await transactionAPI.get(
        "/steamPrices/currentSteamPrices"
      );
      setCurrentSteamPrices(casePricesResponse.data.fractureCase);
      console.log(casePricesResponse.data.fractureCase);
    };
    fetchTransactions();
  }, [navigate, setActiveTab, setCurrentSteamPrices]);

  return (
    <>
      <div className="bg-stone-100 h-full">
        <div className="flex flex-row justify-center">
          <div className="bg-white overflow-y-auto w-full h-screen m-8 rounded-xl shadow-lg border-solid border-l-8 border-gray-300">
            <div className="flex flex-row justify-between">
              <i
                data-testid="back-button"
                onClick={() => navigate("/home")}
                className="m-3 p-3 fa-solid fa-arrow-left text-xl rounded-full hover:bg-gray-100 hover:cursor-pointer"
              ></i>
              <h1 className="flex flex-row justify-center items-center text-xl font-semibold text-center ">
                Past Statements
              </h1>

              <img src="/steam.png" className="rounded-full w-8 h-8 m-4" />
            </div>
            <div className="mb-4 flex flex-col justify-center items-center"></div>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-sm">Date</th>
                  <th className="text-sm">Name</th>
                  <th className="text-sm">Price</th>
                  <th className="text-sm">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.date.replace(/T.*/, "")}</td>
                    <td>{transaction.itemName}</td>
                    <td
                      className={
                        transaction.price < 0 ? "text-success" : "text-error"
                      }
                    >
                      {transaction.price < 0 ? "+" : "-"}$
                      {Math.abs(transaction.price).toFixed(2)}
                    </td>
                    <td> {transaction.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statement;
