import { UnstakingProps } from "../types/staking";
import { client } from "./axios";

export const postClaim = async (claimInfo: UnstakingProps) => {
  try {
    console.log(claimInfo);
    const response = await client.post(`/data/claim`, claimInfo);
    return response.status;
  } catch (e) {
    console.error(e);
  }
};
