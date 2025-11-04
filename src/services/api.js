import axios from "axios";

const API_BASE = "http://localhost/student_information_system/public/api";

export const getStudents = async () => {
  const res = await axios.get(`${API_BASE}/students`);
  return res.data;
};

// 🆕 Courses API endpoints
export const getCourses = async () => {
  const res = await axios.get(`${API_BASE}/courses`);
  return res.data;
};

export const addCourse = async (data) => {
  const res = await axios.post(`${API_BASE}/courses`, data);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await axios.delete(`${API_BASE}/courses/${id}`);
  return res.data;
};
