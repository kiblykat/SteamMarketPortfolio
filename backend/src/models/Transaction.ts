import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  steamItem: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const transactionModel = mongoose.model(
  "Transaction",
  transactionSchema
);
