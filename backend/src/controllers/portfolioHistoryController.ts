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
}

export const createNewPortfolioHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const uid = process.env.UID as string; // Assuming UID is set in the environment variables
    const portfolioWithPL = await fetchPortfolio(uid);
    (portfolioWithPL[1] as PortfolioWithUID[]).map((item) => {
      item.uid = uid; // Add uid to each portfolio item
    });
    await PortfolioHistory.insertMany(portfolioWithPL[1]);
    res.status(201).json(portfolioWithPL[1]);
  } catch (err) {
    console.error("Error creating past profit:", err);
    res.status(500).json({ error: "Server error occurred." });
  }
};
