import api from "./api"; // import the axios instance

// GET /teacher/classes/:teacherId
export const getTeacherClasses = async (teacherId) => {
  const res = await api.get(`/teacher/classes/${teacherId}`);
  return res.data;
};

// GET /class/students/:sectionId
export const getClassStudents = async (sectionId) => {
  const res = await api.get(`/class/students/${sectionId}`);
  return res.data;
};

// POST /teacher/attendance
export const submitAttendance = async (data) => {
  const res = await api.post(`/teacher/attendance`, data);
  return res.data;
};

// POST /teacher/grades
export const submitGrades = async (data) => {
  const res = await api.post(`/teacher/grades`, data);
  return res.data;
};

export default {
  getTeacherClasses,
  getClassStudents,
  submitAttendance,
  submitGrades,
};
