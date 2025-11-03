import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost/student_information_system/public/api/",
});

// Example: Fetch students
export const getStudents = async () => {
  const response = await API.get("students");
  return response.data;
};
