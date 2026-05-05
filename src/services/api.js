import axios from "axios";

export const API_BASE = "http://student-information-system.test/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});

export default api;
