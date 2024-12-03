import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

export interface IUnstakedListData {
  nftId: string | number;
  unstakedAt: Date | null;
  unstakedAmount: number;
  unstakeState:number;
  tokenSort:string;
}

export function useUnstakedList(address: string) {
  const swrKey = `/data/unstakingList/${address}`;

  return useSWR<IUnstakedListData[]>(swrKey, nextonFetcher);
}