import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";

const Tr_Buy = () => {
  const [steamItem, setSteamItem] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const { balance, setBalance, transactions, setTransactions } =
    useContext(GlobalContext);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || !isNaN(Number(newValue))) {
      setQuantity(newValue === "" ? "" : Number(newValue));
    }
  };

  const handleBuy = (): void => {
    //check if the input matches a valid number format
    const isValidFormat = /^\d*\.?\d{0,2}$/.test(price);

    if (!isValidFormat) {
      toast.error("Please enter a valid price");
      return;
    }

    const depositAmount = parseFloat(price);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const newBalance = balance + depositAmount;
    setBalance(newBalance);
    setTransactions([
      ...transactions,
      {
        date: new Date(),
        price: depositAmount,
        balance: newBalance,
      },
    ]);

    toast.success(
      `You have bought ${quantity} of ${steamItem} for ${price} each`
    );
    navigate("/trade"); // navigate back to trade page after successful buy
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
              <p className="text-center text-2xl font-bold">Buy Steam Items</p>
              <i className="text-3xl text-gray-800 fa-solid fa-circle-arrow-right p-2"></i>
            </div>
            <div className="flex flex-row items-center justify-center m-8">
              <input
                placeholder="Item"
                value={steamItem}
                onChange={(e) => setSteamItem(e.target.value)}
                className="py-10 input border border-gray-300 rounded-xl text-xl w-48"
              />
              <input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="py-10 input border border-gray-300 rounded-xl text-xl w-48"
              />
              <input
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => handleQuantityChange(e)}
                className="py-10 input border border-gray-300 rounded-xl text-xl w-48"
              />
            </div>
            <button
              data-testid="buy-button"
              onClick={() => handleBuy()}
              className="btn rounded-full w-52 mb-16 bg-gray-900 text-white"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tr_Buy;
