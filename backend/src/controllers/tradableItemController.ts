import { TradableItem } from "../models/TradableItem";
import { Request, Response } from "express";

// Function to escape special characters in a string for use in a regular expression
const escapeRegex = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const findTradableItemByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemName } = req.params;
    const startMatchQuery = `^ ${escapeRegex(itemName)}`; //include space in regex query since leetcode_db has space before every start of question

    // Use a case-insensitive regex to find partial matches in the 'Question' field
    const startMatches = await TradableItem.find({
      Question: { $regex: startMatchQuery, $options: "im" },
    }).limit(5);

    const partialMatches = await TradableItem.aggregate([
      {
        $match: {
          Question: { $regex: escapeRegex(itemName), $options: "im" },
          _id: { $nin: startMatches.map((match) => match._id) },
        },
      },
    ]).limit(5);

    const combinedResponse = [...startMatches, ...partialMatches].slice(0, 5);

    res.status(200).json(combinedResponse);
  } catch (err) {
    // Log the error for debugging
    console.error("Error fetching matching questions:", err);
    res.status(500).json({ error: "Server error occurred." });
  }
};

export const createTradableItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemName, imageUrl, releaseDate } = req.body;

    if (!itemName) {
      res.status(400).json({ message: "Item name is required" });
      return;
    }

    const newItem = new TradableItem({
      itemName,
      imageUrl,
      releaseDate,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating tradable item:", error);
    res.status(500).json({ message: "Error creating tradable item", error });
  }
};
