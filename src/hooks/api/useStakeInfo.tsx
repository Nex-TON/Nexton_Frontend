import useSWR from "swr";
import { stakeInfo } from "../../types/Nft";
import { nextonFetcher } from "../../api/axios";

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
