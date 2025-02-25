import express from "express";
import { getCasePrices } from "../controllers/steamPricesController";

const steamPriceRouter = express.Router();

steamPriceRouter.get("/casePrices", getCasePrices);

export default steamPriceRouter;
