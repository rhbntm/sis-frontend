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

export async function getDepartments() {
  const res = await fetch("http://localhost/student_information_system/public/api/departments");
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
}

// 🧩 Attendance API Endpoints
export const getAttendance = async () => {
  const res = await axios.get(`${API_BASE}/attendance`);
  return res.data;
};

export const addAttendance = async (data) => {
  const res = await axios.post(`${API_BASE}/attendance`, data);
  return res.data;
};

export const deleteAttendance = async (id) => {
  const res = await axios.delete(`${API_BASE}/attendance/${id}`);
  return res.data;
};

// 🧩 Sections API
export const getSections = async () => {
  const res = await axios.get(`${API_BASE}/sections`);
  return res.data;
};
