import axios from "axios";

// let BASE_URL = "https://leetspace-api.vercel.app";
const BASE_URL = "http://localhost:5000";
const transactionAPI = axios.create({ baseURL: BASE_URL });

export default transactionAPI;
