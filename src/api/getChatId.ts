import axios from "axios";

export const chatUserId = async () => {
  try {
    const response = await axios.get("https://3.68.16.192:443/chatId");
    return response?.data?.chatId;
  } catch (e) {
    console.error(e);
  }
};
