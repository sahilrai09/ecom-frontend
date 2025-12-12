// src/axios.jsx
import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "";
let base = (envUrl || "").toString().trim();

// fallback for local dev
if (!base) base = "http://localhost:8080";

// normalize and ensure it ends with /api
base = base.replace(/\/+$/, "");
if (!base.endsWith("/api")) base = base + "/api";

const API = axios.create({
  baseURL: base,
  headers: { Accept: "application/json" },
});

export default API;
