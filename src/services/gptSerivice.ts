import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constant/constant.js";
import { OpenRouter } from "@openrouter/sdk";
import { OpenResponsesEasyInputMessage } from "@openrouter/sdk/models";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const gemini = GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: GEMINI_API_KEY })
  : null;

export const geminiService = async (content: string): Promise<string> => {
  if (!gemini) {
    console.error("GEMINI_API_KEY missing");
    return "GEMINI_API_KEY missing";
  }

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash-lite",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
    contents: content,
  });

  return String(response.text) || "error";
};

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;
const openrouter = OPEN_ROUTER_API_KEY
  ? new OpenRouter({
      apiKey: OPEN_ROUTER_API_KEY,
    })
  : null;
const OPEN_ROUTER_MODEL = process.env.OPEN_ROUTER_MODEL;

export const openRouterService = async (
  input: OpenResponsesEasyInputMessage[],
): Promise<string> => {
  if (!openrouter) {
    return "OPEN_ROUTER_API_KEY missing";
  }

  const result = openrouter.callModel({
    model: OPEN_ROUTER_MODEL || "openrouter/free",
    instructions: SYSTEM_INSTRUCTION,
    text: {
      format: {
        type: "text",
      },
    },
    input: input,
  });
  const text = await result.getText();

  return String(text);
};
