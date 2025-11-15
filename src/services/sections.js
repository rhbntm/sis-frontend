import api from "./api";

export const getSections = async () => {
  const res = await api.get("/sections");
  return res.data;
};
