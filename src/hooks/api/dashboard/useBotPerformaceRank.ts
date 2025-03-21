import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

export function useBotPerformanceRank(rank: string) {
  const swrKey = `/data/botPerformanceRank?sort=${rank}`;

  return useSWR(swrKey, nextonFetcher);
}
