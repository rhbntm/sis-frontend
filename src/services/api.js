import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost/student_information_system/public/api/",
});
