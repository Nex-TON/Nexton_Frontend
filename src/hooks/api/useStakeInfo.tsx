import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";
import { stakeInfo } from "@/types/Nft";

export const useStakeInfo = (address: string) => {
  const { data, isLoading } = useSWR<stakeInfo>(
    `/data/getAllStakeInfoByAddress?address=${address}`,
    nextonFetcher,
    {
      errorRetryCount: 3,
    }
  );

  return {
    nftList: data?.stakeInfos,
    isLoading,
  };
};
