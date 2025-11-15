import api from "./api";

export const getPayments = async () => {
  const res = await api.get("/payments");
  return res.data;
};

export const addPayment = async (data) => {
  const res = await api.post("/payments", data);
  return res.data;
};

export const deletePayment = async (id) => {
  const res = await api.delete(`/payments/${id}`);
  return res.data;
};
