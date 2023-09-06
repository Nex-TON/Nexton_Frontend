import { client } from "./axios";

interface postStakingInfoProps {
  id: number;
  leverage: number;
  address: string;
  amount: string;
  lockPeriod: string;
  nominator: string;
}

export const postStakingInfo = async (stakingInfo: postStakingInfoProps) => {
  try {
    const data = await client.post("/data/addStakeInfo", stakingInfo);
    return data.status;
  } catch (e) {
    console.error(e);
  }
};
