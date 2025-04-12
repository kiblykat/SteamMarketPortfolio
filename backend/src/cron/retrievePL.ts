// import transactionAPI from "../api/api";

import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../../config/db";
import axios from "axios";

export function GET(request: Request) {
  return new Response("Hello from Vercel!");
}
