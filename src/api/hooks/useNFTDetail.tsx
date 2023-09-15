import useSWR from "swr";
import { nextonFetcher } from "../axios";
import { stakeInfo } from "../../types/Nft";

export const useNFTDetail = (nftId: number) => {
  const { data } = useSWR<stakeInfo>(
    `/data/getStakeInfoByNftId?nftId=${nftId}`,
    nextonFetcher,
    {
      errorRetryInterval: 3,
    }
  );

  return {
    nftDetail: data?.stakeInfos,
  };
};
