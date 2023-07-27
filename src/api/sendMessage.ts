import { STAKING } from "../constants/TelegramMessage";
import client from "./axios";

export const sendMessageBot = async (chatID: number) => {
  try {
    await client.post(`/bot${import.meta.env.VITE_BOT_TOKEN}/sendMessage`, {
      chat_id: chatID,
      text: STAKING,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error(error);
  }
};
