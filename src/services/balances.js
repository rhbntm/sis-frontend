import api from "./api";

export const getBalanceByStudent = async (studentId) => {
  const res = await api.get(`/balances/student/${studentId}`);
  return res.data;
};
