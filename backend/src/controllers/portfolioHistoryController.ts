import { PortfolioHistory } from "../models/PortfolioHistory";
import { Request, Response } from "express";

export const createNewPortfolioHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid, itemName, position, avgPrice, realizedPL, PL } = req.body;

    // Validate input data
    if (
      !uid ||
      !itemName ||
      position === undefined ||
      avgPrice === undefined ||
      realizedPL === undefined ||
      PL === undefined
    ) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Create a new PastProfit document
    const newProfit = new PortfolioHistory({
      uid,
      itemName,
      position,
      avgPrice,
      realizedPL,
      PL,
    });

    // Save the document to the database
    await newProfit.save();

    res.status(201).json(newProfit);
  } catch (err) {
    console.error("Error creating past profit:", err);
    res.status(500).json({ error: "Server error occurred." });
  }
};
