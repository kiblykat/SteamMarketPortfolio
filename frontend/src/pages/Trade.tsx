import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { marketItems } from "../types/globalContextTypes";
import transactionAPI from "../api/api";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";

const Trade = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { setActiveTab, portfolio } = globalContext;

  useEffect(() => {
    setActiveTab("Trade");
  }, [navigate, setActiveTab]);
  const [steamItem, setSteamItem] = useState<string>("");
  const [strPrice, setStrPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [buyState, setBuyState] = useState<boolean>(true); // true for buy, false for sell

  const handleSteamItem = (item: string): void => {
    const itemCamelCase = item
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(" ", "");
    setSteamItem(itemCamelCase); //pass item as camelCased string for easy query on backend
    setIsOpen(false);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || !isNaN(Number(newValue))) {
      setQuantity(newValue === "" ? "" : Number(newValue));
    }
  };

  const handleBuy = async (): Promise<void> => {
    const type = "BUY";
    //check if the input matches a valid number format
    const isValidPriceFormat = /^\d*\.?\d{0,2}$/.test(strPrice);

    if (!isValidPriceFormat) {
      toast.error("Please enter a valid price");
      return;
    }

    const price = parseFloat(strPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    await transactionAPI.post("transactions/create", {
      uid: "kiblykat",
      steamItem,
      price,
      type,
      quantity,
    });

    toast.success(
      `You have bought ${quantity} ${steamItem}s for $${price} each`
    );
    // navigate("/trade"); // navigate back to trade page after successful buy
  };

  return (
    <div className="bg-stone-100 h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center bg-white shadow-lg md:m-8 rounded-lg border-l-8 border-solid border-gray-300">
          <div className="flex flex-row justify-between w-full">
            <i
              data-testid="back-button"
              onClick={() => navigate("/home")}
              className="m-3 p-3 fa-solid fa-arrow-left text-xl rounded-full hover:bg-gray-100 hover:cursor-pointer"
            ></i>
            <div className="flex flex-row items-center justify-center m-5 mb-2">
              <p className="text-center text-2xl font-bold">Market Trade</p>
              <i className="text-3xl text-gray-800 fa-solid fa-circle-arrow-right p-2"></i>
            </div>
            <img src="/steam.png" className="rounded-full w-8 h-8 m-4" />
          </div>
          <hr className=" border-gray-200 w-full my-4 mx-4 px-4" />
          <div className="flex flex-row justify-between items-center w-full px-8 rounded-t-lg">
            <p>&lt; Item Name &gt;</p>
          </div>
          <hr className=" border-gray-200 w-full my-4 mx-4 px-4" />
          <div className="flex flex-row justify-between items-center w-full px-8">
            <div>Action</div>
            <div className="w-1/3">
              <button
                className={
                  buyState
                    ? "btn rounded-l-xl w-1/2 bg-green-500 hover:bg-green-500"
                    : "btn rounded-l-xl w-1/2"
                }
                onClick={() => setBuyState(true)}
              >
                Buy
              </button>
              <button
                className={
                  buyState
                    ? "btn rounded-r-xl w-1/2"
                    : "btn rounded-r-xl w-1/2 bg-red-500 hover:bg-red-500"
                }
                onClick={() => setBuyState(false)}
              >
                Sell
              </button>
            </div>
          </div>
          <hr className=" border-gray-200 w-full my-4 mx-4 px-4" />
          <div className="flex flex-row justify-between items-center w-full px-8">
            <div>Current Position</div>
            <div>
              {
                portfolio.find((item) => item.itemName == "Fracture Case")
                  ?.position
              }
            </div>
          </div>
          <hr className=" border-gray-200 w-full my-4 mx-4 px-4" />
          <div className="flex flex-col justify-center items-center md:mx-20">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="flex flex-row items-center justify-center m-2">
                {/* Dropdown */}
                <div className="dropdown text-center">
                  <button
                    className="btn btn-secondary text-white w-40 rounded-lg text-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {steamItem || "Select Item"}
                  </button>
                  {isOpen && (
                    <ul className="dropdown-content menu shadow bg-base-100 rounded-box md:w-48">
                      {marketItems.map((item) => (
                        <li key={item}>
                          <button onClick={() => handleSteamItem(item)}>
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="m-2">
                <input
                  placeholder="Price"
                  value={strPrice}
                  onChange={(e) => setStrPrice(e.target.value)}
                  className="py-10 input border border-gray-300 rounded-xl text-xl md:w-48"
                />
              </div>
              <div className="m-2">
                <input
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e)}
                  className="py-10 input border border-gray-300 rounded-xl text-xl md:w-48"
                />
              </div>
            </div>
            {buyState ? (
              <button
                data-testid="buy-button"
                onClick={() => handleBuy()}
                className="btn rounded-full w-52 mb-16 bg-green-600 text-white"
              >
                Buy
              </button>
            ) : (
              <button
                data-testid="buy-button"
                onClick={() => handleBuy()}
                className="btn rounded-full w-52 mb-16 bg-red-600 text-white"
              >
                Sell
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
