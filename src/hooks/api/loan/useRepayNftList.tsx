import useSWR from "swr";
import { borrowNftInfo } from "@/types/ReapyNftList";
import { nextonFetcher } from "@/api/axios";

export const useRepayNftList = (address: string | null | undefined) => {
  const shouldFetch = address ? `/data/lendingList?address=${address}` : null;

  const { data, isLoading, error } = useSWR<borrowNftInfo[]>(shouldFetch, nextonFetcher, {
    errorRetryCount: 3,
  });

  return {
    borrowList: data ?? [], // 데이터가 없을 경우 빈 배열 반환
    isLoading: shouldFetch ? isLoading : false, // fetch가 없을 경우 로딩 상태 false
    isError: shouldFetch ? Boolean(error) : false, // fetch가 없을 경우 에러 false
  };
};
