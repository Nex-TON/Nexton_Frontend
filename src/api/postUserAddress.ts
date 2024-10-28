import { client } from "./axios";

interface postUserAddressProps {
  telegramId: number;
  address: string;
}

export const postUserAddress = async (stakingInfo: postUserAddressProps) => {
  try {
    const data = await client.post("/data/addUserAddress", stakingInfo);
    return data.status;
  } catch (e) {
    console.error(e);
  }
};
