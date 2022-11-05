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
  console.log("getUser: ", response.data);
  return response.data;
};

export const getPet = async (petId) => {
  const response = await axiosPrivate.get(`/api/pets/${petId}`);
  console.log("getPet: ", response.data);
  return response.data;
};

export const getPets = async () => {
  const response = await axiosPrivate.get("/api/pets");
  console.log("getPets: ", response.data);
  return response.data;
};

export const deletePet = async (id) => {
  const response = await axiosPrivate.delete(`/api/pets/${id}`);
  console.log("deletePet: ", response.data);
  return response.data;
};
