import { client } from "./axios";

interface postRepayInfoProps {
  nftId:number,
  address:string,
}

export const postRepayInfo = async (repayInfo: postRepayInfoProps) => {
  try {
    const data = await client.post("/data/repaying", repayInfo);
    return data.status;
  } catch (e) {
    console.error(e);
  }
};
