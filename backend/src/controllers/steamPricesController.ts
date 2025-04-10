import { Request, Response } from "express";
import { fetchCurrentSteamPrices } from "../services/fetchCurrentSteamPrices";

// This function calls the fetchCurrentSteamPrices service to get the current prices of CS:GO cases from SCM.
export const getCurrentSteamPrices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const queryParams = req.query.items as string; // Expecting a JSON string array
    const itemNames: string[] = JSON.parse(queryParams);

    if (!Array.isArray(itemNames) || itemNames.length === 0) {
      res.status(400).json({ message: "Invalid item list" });
      return;
    }

    const priceResults = await fetchCurrentSteamPrices(itemNames);
    res.status(200).json(priceResults);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Server error" });
  }
};
