import client from "./axios";

export const updateUser = async () => {
  try {
    const response = await client.post(
      `/bot${import.meta.env.VITE_BOT_TOKEN}/getUpdates`
    );
    return response?.data?.result;
  } catch (e) {
    console.error(e);
  }
};
