import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import transactionAPI from "../api/api";
import { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../GlobalContext";

const Trade = () => {
  const navigate = useNavigate();
  const { itemUrlName } = useParams() as { itemUrlName: string };
  const globalContext = useContext(GlobalContext);
  const { setActiveTab, portfolio, currentSteamPrices } = globalContext;
  const [strPrice, setStrPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [buyState, setBuyState] = useState<boolean>(true); // true for buy, false for sell
  const [itemName, setItemName] = useState<string>("");
  const [itemImageUrl, setItemImageUrl] = useState<string>("");
  const [results, setResults] = useState<
    { imageUrl: string; itemName: string; releaseDate: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (itemName.trim().length > 0) {
        fetchItems(itemName);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // debounce input by 300ms

    return () => clearTimeout(delayDebounceFn); //return function runs when useEffect runs again (based on dependency array)
  }, [itemName]);

  const fetchItems = async (searchText: string) => {
    try {
      const res = await transactionAPI.get(`/tradableItems/${searchText}`);
      setResults(res.data); // assuming backend returns string[]
      setIsOpen(true);
    } catch (error) {
      console.error("Fetch error:", error);
      setResults([]);
    }
  };

  useEffect(() => {
    setActiveTab("Trade");
    inputRef.current?.focus(); // focus on the input field when the component mounts
  }, [navigate, setActiveTab]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || !isNaN(Number(newValue))) {
      setQuantity(newValue === "" ? "" : Number(newValue));
    }
  };
  const handleSelect = (item: string, imageUrl: string) => {
    navigate(`/trade/${item}`);
    setItemName(item);
    setItemImageUrl(imageUrl);
    setIsOpen(false);
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
    if (isNaN(price) || price < 0) {
      toast.error("Please enter a valid price");
      return;
    }

    await transactionAPI.post("transactions/create", {
      uid: "kiblykat",
      steamItem: itemUrlName,
      price,
      type,
      quantity,
    });

    toast.success(
      `You have bought ${quantity} ${itemUrlName}s for $${price} each`
    );
    // navigate("/trade"); // navigate back to trade page after successful buy
  };

  const handleSell = async (): Promise<void> => {
    const type = "SELL";
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
      steamItem: itemUrlName,
      price,
      type,
      quantity,
    });

    toast.success(
      `You have sold ${quantity} ${itemUrlName}s for $${price} each`
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
            {itemUrlName ? (
              <div
                onClick={() => navigate("/trade")}
                className="flex flex-row justify-between items-center  hover:cursor-pointer"
              >
                <p className="text-xl font-semibold ">{itemUrlName}</p>
                <img src={itemImageUrl} className="rounded-full w-1/4 m-4" />
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <input
                  ref={inputRef}
                  placeholder="Type item name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="py-10 input border border-gray-300 rounded-xl text-xl w-full"
                />
                {isOpen && results.length > 0 && (
                  <ul className="z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {results.map((item) => (
                      <li
                        key={item.itemName}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleSelect(item.itemName, item.imageUrl)
                        }
                      >
                        {item.itemName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
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
            <div className="font-semibold text-xl">
              {portfolio.find((item) => item.itemName == itemUrlName)?.position}
            </div>
          </div>
          <hr className=" border-gray-200 w-full my-4 mx-4 px-4" />
          <div className="flex flex-row justify-between items-center w-full px-8">
            <div>Avg. Price</div>
            <div className="font-semibold text-xl">
              {portfolio
                .find((item) => item.itemName == itemUrlName)
                ?.avgPrice.toFixed(2)}
            </div>
          </div>
          <hr className=" border-gray-200 w-full my-4 mx-4 px-4" />
          <div className="flex flex-row justify-between items-center w-full px-8">
            <div>Curr. Steam Price</div>
            <div className="font-semibold text-xl">
              {currentSteamPrices[itemUrlName]}
            </div>
          </div>
          <hr className=" border-gray-200 w-full my-4 mx-4 px-4" />
          <div className="flex flex-col items-center w-1/2 md:mx-20">
            <div className="flex flex-col md:flex-row justify-between">
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
                data-testid="sell-button"
                onClick={() => handleSell()}
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
