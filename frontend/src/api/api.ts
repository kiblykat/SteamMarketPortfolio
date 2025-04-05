import axios from "axios";

const BASE_URL = "https://steam-market-portfolio-backend.vercel.app/";
// const BASE_URL = "http://localhost:5000";
const transactionAPI = axios.create({ baseURL: BASE_URL });

export default transactionAPI;
