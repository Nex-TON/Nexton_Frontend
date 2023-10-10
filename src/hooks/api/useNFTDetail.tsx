import useSWR from "swr";
import { stakeInfo } from "../../types/Nft";
import { nextonFetcher } from "../../api/axios";

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
