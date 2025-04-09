import { PastProfit } from "../models/PastProfit";
import { Request, Response } from "express";

export const createNewProfit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid, itemName, profit } = req.body;

    // Validate input data
    if (!uid || !itemName || profit === undefined) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Create a new PastProfit document
    const newProfit = new PastProfit({
      uid,
      itemName,
      profit,
    });

    // Save the document to the database
    await newProfit.save();

    res.status(201).json(newProfit);
  } catch (err) {
    console.error("Error creating past profit:", err);
    res.status(500).json({ error: "Server error occurred." });
  }
};
