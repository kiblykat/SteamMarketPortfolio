import express from "express";
import {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
  getAveragePrices,
} from "../controllers/transactionController";

const transactionRouter = express.Router();

// Endpoint: /transactions
transactionRouter.post("/create", createTransaction);
transactionRouter.get("/average-prices", getAveragePrices); // Route to get the average price of a steamItem for a user
transactionRouter.get("/:uid", getAllTransactions);
transactionRouter.put("/update", updateTransaction);
transactionRouter.delete("/delete", deleteTransaction);

export default transactionRouter;
