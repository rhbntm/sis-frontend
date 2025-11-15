import api from "./api";

export const getAttendance = async () => {
  const res = await api.get("/attendance");
  return res.data;
};

export const addAttendance = async (data) => {
  const res = await api.post("/attendance", data);
  return res.data;
};

export const deleteAttendance = async (id) => {
  const res = await api.delete(`/attendance/${id}`);
  return res.data;
};
