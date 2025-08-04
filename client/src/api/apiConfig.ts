import axios from "axios";

const options = {
  baseURL: import.meta.env.VITE_API_URL || "/api",
};

export const API = axios.create(options);
