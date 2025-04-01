import axios from "axios";
import { Request, Response } from "express";

export const getCurrentSteamPrices = async (
  req: Request,
  res: Response
): Promise<void> => {
  const hash: Record<string, string> = {
    "Snakebite Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Snakebite%20Case",
    "Fracture Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Fracture%20Case",
    "Prisma Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Prisma%202%20Case",
    "Clutch Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Clutch%20Case",
    "Danger Zone Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Danger%20Zone%20Case",
    "Mann Co. Supply Crate Key":
      "https://steamcommunity.com/market/priceoverview/?appid=440&country=SG&currency=13&market_hash_name=Mann%20Co.%20Supply%20Crate%20Key",
    "Shadow Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Shadow%20Case",
    "Prisma 2 Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Prisma%202%20Case",
    "CS20 Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=CS20%20Case",
    "Horizon Case":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=Horizon%20Case",
    ":yellowarrow":
      "https://steamcommunity.com/market/priceoverview/?appid=730&country=SG&currency=13&market_hash_name=%3Ayellowarrow%3A",
  };

  try {
    const queryParams = req.query.items as string; // Expecting a JSON string array
    const itemNames: string[] = JSON.parse(queryParams);

    if (!Array.isArray(itemNames) || itemNames.length === 0) {
      res.status(400).json({ message: "Invalid item list" });
      return;
    }

    const priceResults: Record<string, number | string> = {};

    for (const itemName of itemNames) {
      if (!hash[itemName]) {
        priceResults[itemName] = 0;
        continue;
      }

      try {
        const response = await axios.get(hash[itemName]);
        const data = response.data;
        const priceString = data.median_price || "N/A";
        const price =
          priceString !== "N/A"
            ? parseFloat(priceString.replace(/[^0-9.-]+/g, ""))
            : 0;
        priceResults[itemName] = price;
      } catch (error) {
        priceResults[itemName] = "Error fetching price";
      }
    }

    res.status(200).json(priceResults);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Server error" });
  }
};
