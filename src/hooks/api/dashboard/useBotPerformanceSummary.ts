import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface IBotPerformanceSummary {
  pnlRate: number;
  pnlWinRate: number;
  subscribedCount: number;
}

export function useBotPerformanceSummary(userId: number) {
  const swrKey = userId ? `/data/user/${userId}/botPerformanceSummary` : null;

  return useSWR<IBotPerformanceSummary>(swrKey, nextonFetcher);
}
