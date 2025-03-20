import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

export function useBotPerformanceSummary() {
  const swrKey = `/data/botPerformanceSummary`;

  return useSWR(swrKey, nextonFetcher);
}
