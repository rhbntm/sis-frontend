import api from "./api";

export const getGrades = async () => {
  const res = await api.get("/grades");
  return res.data;
};

export const addGrade = async (data) => {
  const res = await api.post("/grades", data);
  return res.data;
};

export const updateGrade = async (id, data) => {
  const res = await api.put(`/grades/${id}`, data);
  return res.data;
};

export const deleteGrade = async (id) => {
  const res = await api.delete(`/grades/${id}`);
  return res.data;
};

export const getGPA = async (studentId) => {
  const res = await api.get(`/gpa/${studentId}`);
  return res.data;
};
