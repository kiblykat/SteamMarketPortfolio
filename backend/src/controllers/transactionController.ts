import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";

// Create Transaction
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid, steamItem, price, type, quantity, date } = req.body;

    if (!uid || !steamItem || !price || !quantity) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newTransaction = new Transaction({
      uid,
      itemName: steamItem,
      price,
      type,
      quantity,
      date: new Date(date) || new Date(), // Use provided date or current date
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

    const transactions = await Transaction.find({ uid }).sort({ date: -1 });

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

    const updatedTransaction = await Transaction.findByIdAndUpdate(
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

    const deletedTransaction = await Transaction.findByIdAndDelete(
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

    const result = await Transaction.aggregate([
      {
        $match: {
          uid: String(uid), // Only match transactions for the specified user
        },
      },
      {
        $group: {
          _id: "$steamItem", // Group by steamItem
          totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } }, // Sum of price * quantity
          totalQuantity: { $sum: "$quantity" }, // Sum of quantities
        },
      },
      {
        $project: {
          _id: 0, // Remove the _id field from the response
          steamItem: "$_id", // Rename _id to steamItem
          averagePrice: { $divide: ["$totalPrice", "$totalQuantity"] }, // Calculate average price
          totalQuantity: 1, // Include total quantity
        },
      },
    ]);

    if (result.length === 0) {
      res.status(404).json({ message: "No transactions found for this user" });
      return;
    }

    // Format the result as an object where keys are steamItem names
    const averagePrices = result.reduce(
      (
        acc: Record<string, { averagePrice: number; totalQuantity: number }>,
        item
      ) => {
        acc[item.steamItem] = {
          averagePrice: item.averagePrice,
          totalQuantity: item.totalQuantity,
        };
        return acc;
      },
      {}
    );

    res.status(200).json(averagePrices);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Generate Portfolio returns
// [[itemName, position, avgPrice], ...]
export const generatePortfolio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid } = req.query;

    if (!uid) {
      res.status(400).json({ message: "Missing uid" });
      return;
    }

    const result = await Transaction.aggregate([
      {
        $match: {
          uid: String(uid),
        },
      },
      {
        $group: {
          _id: "$itemName",
          totalBuyPrice: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "BUY"] },
                then: { $multiply: ["$price", "$quantity"] },
                else: 0,
              },
            },
          },
          totalBuyQuantity: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "BUY"] },
                then: "$quantity",
                else: 0,
              },
            },
          },
          totalSellQuantity: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "SELL"] },
                then: "$quantity",
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          itemName: "$_id",
          netQuantity: {
            $subtract: ["$totalBuyQuantity", "$totalSellQuantity"],
          },
          totalBuyPrice: 1,
          totalBuyQuantity: 1,
        },
      },
      {
        $match: {
          netQuantity: { $gt: 0 }, // Only keep items with a positive position
        },
      },
      {
        $project: {
          itemName: 1,
          netQuantity: 1,
          averagePrice: { $divide: ["$totalBuyPrice", "$totalBuyQuantity"] },
        },
      },
    ]);

    if (result.length === 0) {
      res.status(404).json({ message: "No transactions found for this user" });
      return;
    }

    const portfolio = result.map((item) => [
      item.itemName,
      item.netQuantity,
      item.averagePrice,
    ]);

    res.status(200).json(portfolio);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
