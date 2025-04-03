import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { marketItems } from "../types/globalContextTypes";
import transactionAPI from "../api/api";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";

const Tr_Buy = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { setActiveTab } = globalContext;

  useEffect(() => {
    setActiveTab("Trade");
  }, [navigate, setActiveTab]);
  const [steamItem, setSteamItem] = useState<string>("");
  const [strPrice, setStrPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <div className="flex flex-col bg-white shadow-lg md:m-8 rounded-lg border-l-8 border-solid border-gray-300">
          <div className="flex flex-row justify-between">
            <i
              data-testid="back-button"
              onClick={() => navigate("/home")}
              className="m-3 p-3 fa-solid fa-arrow-left text-xl rounded-full hover:bg-gray-100 hover:cursor-pointer"
            ></i>
            <img src="/steam.png" className="rounded-full w-8 h-8 m-4" />
          </div>
          <div className="flex flex-col justify-center items-center md:mx-20">
            <div className="flex flex-row items-center justify-center m-5 mb-2">
              <p className="text-center text-2xl font-bold">Buy Steam Items</p>
              <i className="text-3xl text-gray-800 fa-solid fa-circle-arrow-right p-2"></i>
            </div>
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
