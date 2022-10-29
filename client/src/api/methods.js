import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5050"
  : "http://192.168.1.16:5050";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const getUser = async () => {
  const response = await axiosPrivate.get("/api/users");
  return response.data;
};

export const getPets = async () => {
  const response = await axiosPrivate.get("/api/pets");
  return response.data;
};

export const deletePet = async (id) => {
  const response = await axiosPrivate.delete(`/api/pets/${id}`);
  console.log(response.data);
  return response.data;
};
