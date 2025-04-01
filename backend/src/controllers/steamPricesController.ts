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
  };

  try {
    const queryParam = req.query.itemName as string; // Replace 'itemName' with the actual query parameter key
    if (hash[queryParam] === undefined) {
      res.status(400).json({ message: "Invalid item name" });
      return;
    }
    const response = await axios.get(hash[queryParam]);
    const data = response.data;
    const priceString = data.median_price;
    console.log(priceString);
    const price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
    res.status(200).json({ price });
  } catch (error) {
    console.error("Error fetching price:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};
