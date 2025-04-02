import axios from "axios";
import { Request, Response } from "express";

export const getCurrentSteamPrices = async (
  req: Request,
  res: Response
): Promise<void> => {
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
  };

  try {
    const queryParams = req.query.items as string; // Expecting a JSON string array
    const itemNames: string[] = JSON.parse(queryParams);

    if (!Array.isArray(itemNames) || itemNames.length === 0) {
      res.status(400).json({ message: "Invalid item list" });
      return;
    }

    const priceResults: Record<string, number | string> = {};
    let count = 0;
    for (const itemName of itemNames) {
      if (!hash[itemName]) {
        priceResults[itemName] = 0;
        continue;
      }

      try {
        const response = await axios.get(hash[itemName]);
        const data = response.data;
        const price = parseInt(data.lowest_sell_order) / 100 || "N/A";
        priceResults[itemName] = price;
      } catch (error) {
        priceResults[itemName] = "Error fetching price";
        console.log(
          `Error fetching price for ${itemName}:`,
          (error as Error).message
        );
      }
    }

    res.status(200).json(priceResults);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Server error" });
  }
};
