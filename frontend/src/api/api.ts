import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
// const BASE_URL = "http://localhost:5000";
const transactionAPI = axios.create({ baseURL: BASE_URL });

export default transactionAPI;
