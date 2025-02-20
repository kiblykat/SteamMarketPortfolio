import { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/utils";

const Statement = () => {
  const navigate = useNavigate();
  const { setActiveTab, transactions } = useContext(GlobalContext);

  useEffect(() => {
    setActiveTab("Statement");
  }, [navigate, setActiveTab]);

  return (
    <>
      <div className="bg-stone-100 h-full">
        <div className="flex flex-row justify-center">
          <div className="bg-white overflow-y-auto w-full h-screen m-8 rounded-xl shadow-lg border-solid border-l-8 border-blue-300">
            <div className="flex flex-row justify-between">
              <i
                data-testid="back-button"
                onClick={() => navigate("/home")}
                className="m-3 p-3 fa-solid fa-arrow-left text-xl rounded-full hover:bg-gray-100 hover:cursor-pointer"
              ></i>
              <h1 className="flex flex-row justify-center items-center text-xl font-semibold text-center ">
                Past Statements
              </h1>

              <img src="/gic3.png" className="rounded-full w-8 h-8 m-4" />
            </div>
            <div className="mb-4 flex flex-col justify-center items-center"></div>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-sm">Date</th>
                  <th className="text-sm">Amount</th>
                  <th className="text-sm">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{formatDate(transaction.date)}</td>
                    <td
                      className={
                        transaction.price > 0 ? "text-success" : "text-error"
                      }
                    >
                      {transaction.price > 0 ? "+" : "-"}$
                      {Math.abs(transaction.price).toFixed(2)}
                    </td>
                    <td>${transaction.balance.toFixed(2)}</td>
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
