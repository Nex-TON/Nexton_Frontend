import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface IBotPerformanceSummary {
  pnlRate: number;
  pnlWinRate: number;
  subscribedCount: number;
  apy: number;
  tvl: number;
}

export function useBotPerformanceSummary() {
  const swrKey = `/data/botPerformanceSummary`;

  return useSWR<IBotPerformanceSummary>(swrKey, nextonFetcher);
}
