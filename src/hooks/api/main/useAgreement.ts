import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

export const useAgreement = (userId: string) => {
  const { data, isLoading } = useSWR(`/auth/getAgreement?userId=${userId}`, nextonFetcher, {
    errorRetryInterval: 3,
  });

  return {
    data,
    isLoading,
  };
};
