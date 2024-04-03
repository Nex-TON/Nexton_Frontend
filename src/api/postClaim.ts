import { UnstakingProps } from "../types/staking";

import { client } from "./axios";

export const postClaim = async (claimInfo: UnstakingProps) => {
  try {
    const response = await client.post(`/data/claim`, claimInfo);
    return response.status;
  } catch (e) {
    console.error(e);
  }
};
