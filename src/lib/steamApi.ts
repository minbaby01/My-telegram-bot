import axios from "axios";

export const steamApi = axios.create({
  baseURL: "https://steamcommunity.com/market",
});
