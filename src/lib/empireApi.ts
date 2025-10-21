import { CSGOEmpire } from "csgoempire-api";
import axios from "axios";

const EMPIRE_API_KEY = process.env.EMPIRE_API_KEY;
if (!EMPIRE_API_KEY) throw new Error("Empire key not found");

export const empire = new CSGOEmpire(EMPIRE_API_KEY);

export const empireApi = axios.create({
  baseURL: "https://csgoempire.com/api/v2",
  headers: {
    Authorization: `Bearer ${EMPIRE_API_KEY}`,
    "Content-Type": "application/json",
    "User-Agent": "API Bot",
  },
});
