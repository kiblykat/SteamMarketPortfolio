import { connectDB } from "../config/db";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transactionRouter from "./routes/transactionRouter";
import steamPriceRouter from "./routes/steamPricesRouter";
import tradableItemRouter from "./routes/tradableItemRouter";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/transactions", transactionRouter);
app.use("/steamPrices", steamPriceRouter);
app.use("/tradableItems", tradableItemRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
