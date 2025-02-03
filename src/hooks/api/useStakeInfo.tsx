import useSWR from "swr";
import { nextonFetcher } from "@/api/axios";
import { nftInfo } from "@/types/Nft";

export const useStakeInfo = (address: string | null | undefined) => {
  const shouldFetch = address ? `/data/getAllStakeInfoByAddress?address=${address}` : null;

  const { data, isLoading, error } = useSWR<nftInfo[]>(shouldFetch, nextonFetcher, {
    errorRetryCount: 3,
  });

  return {
    nftList: data ?? [], // 데이터가 없을 경우 빈 배열 반환
    isLoading: shouldFetch ? isLoading : false, // fetch가 없을 경우 로딩 상태도 false
    isError: shouldFetch ? Boolean(error) : false, // fetch가 없을 경우 에러도 false
  };
};
