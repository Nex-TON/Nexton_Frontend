import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface IBotPerformanceSummary {
  pnlRate: number;
  pnlWinRate: number;
  subscribedCount: number;
  apy: number;
}

export function useBotPerformanceSummary() {
  const swrKey = `/data/botPerformanceSummary`;

  return useSWR<IBotPerformanceSummary>(swrKey, nextonFetcher);
}
