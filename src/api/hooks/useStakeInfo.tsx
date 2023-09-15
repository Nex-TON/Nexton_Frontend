import useSWR from "swr";
import { nextonFetcher } from "../axios";
import { stakeInfo } from "../../types/Nft";

export const useStakeInfo = (address: string) => {
  const { data } = useSWR<stakeInfo>(
    `/data/getAllStakeInfoByAddress?address=${address}`,
    nextonFetcher,
    {
      errorRetryCount: 3,
    }
  );

  return {
    nftList: data?.stakeInfos,
  };
};
