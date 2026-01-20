import axios from "axios";
import { getToken, logout } from "../utils/auth";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const login = (data) => API.post("/login", data);

export const fetchDashboard = () => {
  return API.get("/dashboard");
};

export const createCourier = (params) => {
  return API.post("/couriers", params);
}

export const fetchHistories = async () => {
  const res = await API.get("/histories");
  return res.data;
};

export default API;
