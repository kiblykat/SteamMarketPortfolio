import mongoose from "mongoose";

const TradableItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, unique: true }, // Group items by name
  imageUrl: { type: String }, // Url of item's image
  releaseDate: { type: Date }, // Release date of the item
});

export const TradableItem = mongoose.model("tradable_item", TradableItemSchema);
