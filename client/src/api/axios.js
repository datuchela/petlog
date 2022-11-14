import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5050"
  : "https://petlog.up.railway.app";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
