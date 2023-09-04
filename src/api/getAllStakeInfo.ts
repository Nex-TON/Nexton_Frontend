import { client } from "./axios";

export const getAllStakeInfo = async (address: string) => {
  try {
    const { data } = await client.get(
      `/data/getAllStakeInfoByAddress?address=${address}`
    );
    return data.stakeInfos;
  } catch (e) {
    console.error(e);
  }
};
