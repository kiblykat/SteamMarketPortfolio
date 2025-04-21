//This file retrieves the current prices of CS:GO cases from the Steam Community Market, less the 15% fee charged by Steam.
import axios from "axios";

export const fetchCurrentSteamPrices = async (
  itemNames: string[]
): Promise<Record<string, number | string>> => {
  const hash: Record<string, string> = {
    "Snakebite Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176240926",
    "Fracture Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176185874",
    "Prisma Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176042493",
    "Clutch Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=175966708",
    "Danger Zone Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176024744",
    "Shadow Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=67060949",
    "Prisma 2 Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176118270",
    "CS20 Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176091756",
    "Horizon Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=175999886",
    "Recoil Case":
      "https://steamcommunity.com/market/itemordershistogram?country=SG&language=english&currency=13&item_nameid=176321160",
  };
  const priceResults: Record<string, number | string> = {};

  for (const itemName of itemNames) {
    if (!hash[itemName]) {
      priceResults[itemName] = 0;
      continue;
    }

    try {
      console.log("Retrieving price for:", itemName);
      const response = await axios.get(hash[itemName]);
      const data = response.data;
      const price =
        String((parseInt(data.lowest_sell_order) / 115).toFixed(2)) || "N/A"; // quicksell calculation takes into account 15% fees by steam (DOTA2, CS:GO, TF2)
      priceResults[itemName] = price;
    } catch (error) {
      priceResults[itemName] = "Error fetching price";
      console.log(
        `Error fetching price for ${itemName}:`,
        (error as Error).message
      );
    }
  }

  return priceResults;
};
