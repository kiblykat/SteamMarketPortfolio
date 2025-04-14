import { PortfolioHistory } from "../models/PortfolioHistory";
import { Request, Response } from "express";
import fetchPortfolio from "../services/fetchPortfolio";
interface PortfolioWithUID {
  itemName: string;
  position: number;
  avgPrice: number;
  realizedPL: number;
  PL: number;
  uid: string; // Add uid property
  timestamp: Date;
}

export const createNewPortfolioHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const uid = process.env.UID as string; // Assuming UID is set in the environment variables
    const portfolioWithPL = await fetchPortfolio(uid);
    const timestamp = new Date(); // Get the current timestamp
    const portfolioWithTimestamp = (
      portfolioWithPL[1] as PortfolioWithUID[]
    ).map((item) => ({
      ...item, // Spread the existing properties
      uid, // Add uid to each portfolio item
      timestamp, // Set the current timestamp (ensure all dates within this request are the same)
    }));
    await PortfolioHistory.insertMany(portfolioWithTimestamp);
    res.status(201).json(portfolioWithTimestamp);
  } catch (err) {
    console.error("Error creating past profit:", err);
    res.status(500).json({ error: "Server error occurred." });
  }
};
