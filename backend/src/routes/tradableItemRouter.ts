import express from "express";
import { findTradableItemByName } from "../controllers/tradableItemController";

const TradableItemRouter = express.Router();

TradableItemRouter.get("/:item", findTradableItemByName);
