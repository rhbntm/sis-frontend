import api from "./api";

export const getWeather = async (city = "Manila") => {
  const res = await api.get(`/weather/${city}`);
  return res.data;
};
