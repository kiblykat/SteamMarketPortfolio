import express from "express";

import {
  createNewPortfolioHistory,
  getSingleItemPortfolioHistory,
  getConsolidatedPortfolioHistory,
} from "../controllers/portfolioHistoryController";

const portfolioHistoryRouter = express.Router();

// endpoint: /portfolio-history
portfolioHistoryRouter.post("/create", createNewPortfolioHistory); // Endpoint to create a new past profit record
portfolioHistoryRouter.get("/get-single/:uid", getSingleItemPortfolioHistory); // Endpoint to get single item portfolio history
portfolioHistoryRouter.get(
  "/get-consolidated/:uid",
  getConsolidatedPortfolioHistory
); // Endpoint to get consolidated portfolio history

export default portfolioHistoryRouter;
