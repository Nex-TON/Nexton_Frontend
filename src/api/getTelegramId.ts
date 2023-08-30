import { client } from "./axios";

export const getTelegramId = async (address: string) => {
  try {
    const { data } = await client.get(`/auth/getTelegramId?address=${address}`);
    return data.identification;
  } catch (e) {
    console.error(e);
  }
};
