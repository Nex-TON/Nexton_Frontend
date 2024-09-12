import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface IEarningsbyAddress {
  address: string;
  totalRewards: number;
}

export function useEarningsbyAddress(address: string) {
  const swrKey = address ? `/data/getEarningsbyAddress/${address}` : null;

  return useSWR<IEarningsbyAddress>(swrKey, nextonFetcher);
}
