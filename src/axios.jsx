// src/axios.jsx  — temporary debug version (hardcoded)
import axios from "axios";

const base = "https://ecom-backend-1-cw2b.onrender.com/api";

const API = axios.create({
  baseURL: base,
  headers: { Accept: "application/json" }
});

export default API;
