import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface IBotPerformanceChartData {
  createdAt: string;
  pnlRate: number;
}

interface IBotPerformanceChart {
  timeframe: number;
  data: IBotPerformanceChartData[];
}

export function useBotPerformanceChart(userId: number, timeframe: number = 1) {
  const swrKey = userId ? `/data/user/${userId}/botPerformanceChart${timeframe && `?timeframe=${timeframe}`}` : null;

  return useSWR<IBotPerformanceChart>(swrKey, nextonFetcher);
}
