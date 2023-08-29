import { client } from "./axios";

interface postStakingInfoProps {
  id: number;
  address: string;
  amount: string;
  lockPeriod: string;
}

export const postStakingInfo = async (stakingInfo: postStakingInfoProps) => {
  try {
    const { data } = await client.post("/data/addStakeInfo", { stakingInfo });
    console.log(data.data);
  } catch (e) {
    console.error(e);
  }
};
