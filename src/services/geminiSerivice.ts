import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constant/constant.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

export const geminiService = async (content: string): Promise<string> => {
  if (!ai) {
    console.error("GEMINI_API_KEY missing");
    return "GEMINI_API_KEY missing";
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
    contents: content,
  });

  return String(response.text) || "error";
};
