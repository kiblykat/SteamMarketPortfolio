import mongoose from "mongoose";

const PortfolioHistorySchema = new mongoose.Schema({
  uid: { type: String, required: true }, // User ID
  itemName: { type: String, required: true },
  position: { type: Number, required: true },
  avgPrice: { type: Number, required: true },
  realizedPL: { type: Number, required: true },
  PL: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, index: true },
});

export const PortfolioHistory = mongoose.model(
  "portfolio_history",
  PortfolioHistorySchema
);
