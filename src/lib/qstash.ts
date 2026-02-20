import { Client } from "@upstash/qstash";

const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
if (!QSTASH_TOKEN) {
  throw new Error("QSTASH_TOKEN not found");
}

export const qstash = new Client({
  baseUrl: process.env.QSTASH_URL,
  token: QSTASH_TOKEN,
});
