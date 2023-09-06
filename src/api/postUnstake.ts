import { UnstakingProps } from "../types/staking";
import { client } from "./axios";

export const postUnstake = async (unstakeInfo: UnstakingProps) => {
  try {
    const response = await client.post(`/data/unstake`, unstakeInfo);
    return response.status;
  } catch (e) {
    console.error(e);
  }
};
