import express from "express";
import {
  findTradableItemByName,
  createTradableItem,
} from "../controllers/tradableItemController";

const tradableItemRouter = express.Router();

// endpoint: /tradableItems
tradableItemRouter.get("/:itemName", findTradableItemByName);
tradableItemRouter.post("/create", createTradableItem);

export default tradableItemRouter;
