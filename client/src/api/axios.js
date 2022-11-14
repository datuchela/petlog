import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5050"
  : "https://192.168.1.16:5050";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
