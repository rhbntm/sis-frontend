import api from "./api";

export const getQuote = async () => {
  const res = await api.get("/quotes");
  return res.data;
};
