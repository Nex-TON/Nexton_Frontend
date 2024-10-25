import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

export interface IUnstakedListData {
  nftId: string | number;
  availableIn: string;
  unstakedAt: Date | null;
  unstakedAmount: number;
}

export function useUnstakedList(telegramId: string) {
  const swrKey = `/data/unstakingList/${telegramId}`;

  return useSWR<IUnstakedListData[]>(swrKey, nextonFetcher);
}