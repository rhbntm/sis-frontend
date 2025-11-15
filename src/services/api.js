import axios from "axios";

export const API_BASE = "http://localhost/student_information_system/public/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});

export default api;
