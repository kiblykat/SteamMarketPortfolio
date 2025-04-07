import mongoose from "mongoose";

const PastProfitSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  itemName: { type: String, required: true }, // Group items by name
  profit: { type: Number, required: true }, // Profit or loss amount
  timestamp: { type: Date, required: true, default: Date.now }, // Timestamp of the PL calculation
});

export const PastProfit = mongoose.model("past_profit", PastProfitSchema);
