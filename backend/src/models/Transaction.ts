import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  itemName: { type: String, required: true }, // Group items by name
  price: { type: Number, required: true }, // Purchase or sale price per unit
  type: { type: String, enum: ["BUY", "SELL"], required: true }, // Tracks if it’s a buy or sell action
  quantity: { type: Number, required: true },
  date: { type: Date, required: true, default:Date.now },
});

export const Transaction = mongoose.model(
  "Transaction",
  TransactionSchema
);
