import express from "express";
import { getCurrentSteamPrices } from "../controllers/steamPricesController";

const steamPriceRouter = express.Router();

steamPriceRouter.get("/currentSteamPrices", getCurrentSteamPrices);

export default steamPriceRouter;
