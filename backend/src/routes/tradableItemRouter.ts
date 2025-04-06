import express from "express";
import {
  findArrayTradableItemByName,
  findSingleTradableItemByName,
  createTradableItem,
} from "../controllers/tradableItemController";

const tradableItemRouter = express.Router();

// endpoint: /tradableItems
tradableItemRouter.get("/:itemName", findArrayTradableItemByName);
tradableItemRouter.get("/single/:itemName", findSingleTradableItemByName);
tradableItemRouter.post("/create", createTradableItem);

export default tradableItemRouter;
