import { client } from "./axios";

export const getNFTDetail = async (nftId: number) => {
  try {
    const { data } = await client.get(
      `/data/getStakeInfoByNftId?nftId=${nftId}`
    );
    return data.stakeInfos;
  } catch (e) {
    console.error(e);
  }
};
