import express from "express";

import { createNewProfit } from "../controllers/pastProfitController";

const pastProfitRouter = express.Router();

// endpoint: /pastProfits
pastProfitRouter.post("/create", createNewProfit); // Endpoint to create a new past profit record

export default pastProfitRouter;
