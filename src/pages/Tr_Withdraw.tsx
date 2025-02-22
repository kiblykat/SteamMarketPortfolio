import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";

const Tr_Withdraw = () => {
  const [amount, setAmount] = useState<string>("");
  const { balance, setBalance, transactions, setTransactions } =
    useContext(GlobalContext);

  const handleWithdraw = (): void => {
    //check if the input matches a valid number format
    const isValidFormat = /^\d*\.?\d{0,2}$/.test(amount);

    if (!isValidFormat) {
      toast.error("Please enter a valid amount");
      return;
    }

    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (withdrawAmount > balance) {
      toast.error("Insufficient funds");
      return;
    }

    const newBalance = balance - withdrawAmount;
    setBalance(newBalance);
    setTransactions([
      ...transactions,
      {
        date: new Date(),
        amount: -withdrawAmount,
        balance: newBalance,
      },
    ]);

    toast.success(
      `$${withdrawAmount.toFixed(2)} has been withdrawn from your account`
    );
    navigate("/trade"); // navigate back to trade page after successful deposit
  };

  const navigate = useNavigate();
  return (
    <div className="bg-stone-100 h-full">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col bg-white shadow-lg m-8 rounded-lg border-l-8 border-solid border-gray-300">
          <div className="flex flex-row justify-between">
            <i
              data-testid="back-button"
              onClick={() => navigate("/trade")}
              className="m-3 p-3 fa-solid fa-arrow-left text-xl rounded-full hover:bg-gray-100 hover:cursor-pointer"
            ></i>
            <img src="/steam.png" className="rounded-full w-8 h-8 m-4" />
          </div>
          <div className="flex flex-col justify-center items-center md:mx-20">
            <div className="flex flex-row items-center justify-center m-5 mb-2">
              <p className="text-center text-2xl font-bold">Withdraw Amount</p>
              <i className="text-3xl text-gray-800 fa-solid fa-circle-arrow-left p-2"></i>
            </div>
            <div className="flex flex-row items-center justify-center m-8">
              <p className="text-center font-bold mx-2">$</p>
              <input
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="py-10 input border border-gray-300 rounded-xl text-4xl w-48"
              />
              <p className="text-center font-bold mx-2">SGD</p>
            </div>
            <button
              data-testid="withdraw-button"
              onClick={() => handleWithdraw()}
              className="btn rounded-full w-52 mb-16 bg-gray-900 text-white"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tr_Withdraw;
