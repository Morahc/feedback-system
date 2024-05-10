import axios from "axios";
import { loginInput } from "./pages/Login";
import { registerInput } from "./pages/Register";
import { reviewInput } from "./pages/Reviews";

// const { VITE_APP_BASE_URL } = import.meta.env;

const API = axios.create({
  baseURL: "http://localhost:1337/api/v1",
});

API.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

export const login = (formData: loginInput) => API.post("/auth/login", formData);

export const register = (formData: registerInput) => API.post("/auth/register", formData);

export const getReviews = () => API.get("/review");

export const createReview = (formData: reviewInput) => API.post("/review", formData);
