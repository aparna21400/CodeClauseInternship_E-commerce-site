// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Har request me token bhejne ke liye interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ⬇️ YAHAN tera code aayega

export const getProfile = async () => {
  try {
    const res = await API.get("/auth/profile");
    return res.data;
  } catch (err) {
    console.error("Profile fetch failed:", err);
    throw err;
  }
};

export const addToCartApi = async (productId, size, quantity = 1) => {
  try {
    const res = await API.post("/cart/add", {
      productId,
      size,
      quantity,
    });
    return res.data;
  } catch (err) {
    console.error("Add to cart failed:", err);
    throw err;
  }
};
