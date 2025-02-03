import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";
import { nftInfo } from "@/types/Nft";

export const useStakeInfo = (address: string | null | undefined) => {
  if (!address) {
    return {
      nftList: [],
      isLoading: false,
      isError: false,
    };
  }

  const { data, isLoading, error } = useSWR<nftInfo[]>(
    `/data/getAllStakeInfoByAddress?address=${address}`,
    nextonFetcher,
    {
      errorRetryCount: 3,
    },
  );

  return {
    nftList: data,
    isLoading,
    isError: Boolean(error),
  };
};
