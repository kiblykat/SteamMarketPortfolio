import express from "express";
import { getFractureCasePrice } from "../controllers/steamPricesController";

const steamPriceRouter = express.Router();

steamPriceRouter.get("/fractureCase", getFractureCasePrice);

export default steamPriceRouter;
