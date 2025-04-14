import express from "express";

import { createNewPortfolioHistory } from "../controllers/pastProfitController";

const portfolioHistoryRouter = express.Router();

// endpoint: /portfolio-history
portfolioHistoryRouter.post("/create", createNewPortfolioHistory); // Endpoint to create a new past profit record

export default portfolioHistoryRouter;
