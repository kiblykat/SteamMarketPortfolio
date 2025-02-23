import express from "express";
import {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController";

const transactionRouter = express.Router();

// Endpoint: /transactions
transactionRouter.post("/create", createTransaction);
transactionRouter.get("/:uid", getAllTransactions);
transactionRouter.put("/update", updateTransaction);
transactionRouter.delete("/delete", deleteTransaction);

export default transactionRouter;
