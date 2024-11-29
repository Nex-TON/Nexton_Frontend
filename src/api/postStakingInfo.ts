import { client } from "./axios";

interface postStakingInfoProps {
  telegramId: number;
  leverage: number;
  address: string;
  amount: string;
  lockPeriod: string;
  nominator: string;
  tokenSort:string;
}

export const postStakingInfo = async (stakingInfo: postStakingInfoProps) => {
  try {
    const data = await client.post("/data/addStakeInfo", stakingInfo);
    return data.status;
  } catch (e) {
    console.error(e);
  }
};
