import axios from "axios";

const empireKey = process.env.EMPIRE_API_KEY;
if (!empireKey) throw new Error("Empire key not found");

export const empireApi = axios.create({
  baseURL: "https://csgoempire.com/api/v2/trading",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "API Bot",
  },
});

empireApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${empireKey}`;
  return config;
});
