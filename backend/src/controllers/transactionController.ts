import { Request, Response } from "express";
import { transactionModel } from "../models/Transaction";

// Create Transaction
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid, steamItem, price, quantity } = req.body;

    if (!uid || !steamItem || !price || !quantity) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newTransaction = new transactionModel({
      uid,
      steamItem,
      price,
      quantity,
    });
    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

// Get Transactions
export const getAllTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid } = req.params;
    if (!uid) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const transactions = await transactionModel.find({ uid });

    if (transactions.length === 0) {
      res.status(404).json({ message: "No transactions found" });
      return;
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Update Transaction
export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { transactionId, price, quantity } = req.body;

    if (!transactionId) {
      res.status(400).json({ message: "Transaction ID is required" });
      return;
    }

    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      transactionId,
      { price, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
};

// Delete Transaction
export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { transactionId } = req.body;

    if (!transactionId) {
      res.status(400).json({ message: "Transaction ID is required" });
      return;
    }

    const deletedTransaction = await transactionModel.findByIdAndDelete(
      transactionId
    );

    if (!deletedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

// Get Average Price of steamItem for a user
export const getAveragePrices = async (req: Request, res: Response) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      res.status(400).json({ message: "Missing uid" });
      return;
    }

    const result = await transactionModel.aggregate([
      {
        $match: {
          uid: String(uid), // Only match transactions for the specified user
        },
      },
      {
        $group: {
          _id: "$steamItem", // Group by steamItem
          averagePrice: { $avg: "$price" }, // Calculate the average price for each steamItem
        },
      },
      {
        $project: {
          _id: 0, // Remove the _id field from the response
          steamItem: "$_id", // Rename _id to steamItem
          averagePrice: 1, // Include the averagePrice field
        },
      },
    ]);

    if (result.length === 0) {
      res.status(404).json({ message: "No transactions found for this user" });
      return;
    }

    // Format the result as an object where keys are steamItem names
    const averagePrices = result.reduce((acc: Record<string, number>, item) => {
      acc[item.steamItem] = item.averagePrice;
      return acc;
    }, {});

    res.status(200).json(averagePrices);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
