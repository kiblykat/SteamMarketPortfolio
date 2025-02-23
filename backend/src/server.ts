import { connectDB } from "./config/db";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
