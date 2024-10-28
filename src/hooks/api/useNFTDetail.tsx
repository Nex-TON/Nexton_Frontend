import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";
import { nftInfo } from "@/types/Nft";

export const useNFTDetail = (nftId: number) => {
  const { data, isLoading } = useSWR<nftInfo>(`/data/getStakeInfoByNftId?nftId=${nftId}`, nextonFetcher, {
    errorRetryInterval: 3,
  });

  return {
    nftDetail: data,
    isLoading,
  };
};
