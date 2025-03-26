import { client } from "./axios";

interface postExchangeAmountProps{
    telegramId:string,
    address:string,
    amount:string,
}

export const postExchangeAmount = async (exchangeInfo:postExchangeAmountProps) => {
  try {
    const response = await client.post(`/data/postExchangedToken`, exchangeInfo);
    return response.status;
  } catch (e) {
    console.error(e);
  }
};
