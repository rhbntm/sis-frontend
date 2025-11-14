import axios from "axios";

const API_BASE = "http://localhost/student_information_system/public/api";

// ------------------ Students ------------------
export const getStudents = async () => {
  const res = await axios.get(`${API_BASE}/students`);
  return res.data;
};

// ------------------ Courses ------------------
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

// ------------------ Departments ------------------
export const getDepartments = async () => {
  const res = await axios.get(`${API_BASE}/departments`);
  return res.data;
};

// ------------------ Attendance ------------------
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

// ------------------ Sections ------------------
export const getSections = async () => {
  const res = await axios.get(`${API_BASE}/sections`);
  return res.data;
};

// ------------------ Grades ------------------
export const getGrades = async () => {
  const res = await axios.get(`${API_BASE}/grades`);
  return res.data;
};

export const addGrade = async (data) => {
  const res = await axios.post(`${API_BASE}/grades`, data);
  return res.data;
};

export const updateGrade = async (id, data) => {
  const res = await axios.put(`${API_BASE}/grades/${id}`, data);
  return res.data;
};

export const deleteGrade = async (id) => {
  const res = await axios.delete(`${API_BASE}/grades/${id}`);
  return res.data;
};

// ------------------ Payments ------------------
export const getPayments = async () => {
  const res = await axios.get(`${API_BASE}/payments`);
  return res.data;
};

export const addPayment = async (data) => {
  const res = await axios.post(`${API_BASE}/payments`, data);
  return res.data;
};

export const deletePayment = async (id) => {
  const res = await axios.delete(`${API_BASE}/payments/${id}`);
  return res.data;
};

// ------------------ Balances ------------------
export const getBalanceByStudent = async (studentId) => {
  const res = await axios.get(`${API_BASE}/balances/student/${studentId}`);
  return res.data;
};

// ------------------ QR Code ------------------
export const generateQR = async (text) => {
  const res = await axios.post(
    `${API_BASE}/qrcode`,
    { data: text },
    { responseType: "arraybuffer" }
  );

  const base64 = btoa(
    new Uint8Array(res.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  return `data:image/png;base64,${base64}`;
};


