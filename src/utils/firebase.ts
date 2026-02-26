import { db } from "../lib/firebase.js";

export const getChatHistory = async (chatId: number) => {
  const docRef = db.collection("conversations").doc(chatId.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return [];
  }

  const messages = doc.data()?.messages || [];

  return messages.slice(-10);
};

export const saveChatHistory = async (chatId: number, messages: any[]) => {
  const docRef = db.collection("conversations").doc(chatId.toString());

  await docRef.set(
    {
      messages: messages,
    },
    {
      merge: true,
    },
  );
};
