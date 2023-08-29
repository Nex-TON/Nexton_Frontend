import { client } from "./axios";

export const getTelegramId = async (address: string) => {
  try {
    const { data } = await client.get(
      `/auth/getTelegramId?address=kQA60YxzQF2ISrdyzTRMw6K7DQ6vsWASKiKxAzJUwzNwSHFs`
    );
    return data;
  } catch (e) {
    console.error(e);
  }
};
