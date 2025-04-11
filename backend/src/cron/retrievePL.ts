// import transactionAPI from "../api/api";

import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../../config/db";
import axios from "axios";

const fillPLData = async () => {
  try {
    connectDB();
    disconnectDB();
  } catch (error) {
    console.error("Error fetching PL data:", error);
  }
};

export default fillPLData;
