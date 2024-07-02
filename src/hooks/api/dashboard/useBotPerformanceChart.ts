import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface IBotPerformanceChartData {
  createdAt: string;
  pnlRate: number;
}

interface IBotPerformanceChart {
  timeframe: number;
  dailyPnlRate: number;
  data: IBotPerformanceChartData[];
}

export function useBotPerformanceChart(timeframe: number) {
  const swrKey = `/data/botPerformanceChart${timeframe ? `?timeframe=${timeframe}` : ""}`;

  return useSWR<IBotPerformanceChart>(swrKey, nextonFetcher);
}
