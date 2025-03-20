import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface IBotPerformanceChartData {
  createdAt: string;
  pnlRate: number;
}

interface IBotPerformanceChart {
  strategy:string;
  strategyDetails:any;
  timeframe: number;
  dailyPnlRate: number;
  apy:number;
  tvl:number;
  pnlWinRate:number;
  data: IBotPerformanceChartData[];
}

export function useBotPerformanceChart(timeframe: number,strategy:string) {
  const swrKey = `/data/botPerformanceChart${timeframe ? `?timeframe=${timeframe}` : ""}&strategy=${strategy}`;

  return useSWR<IBotPerformanceChart>(swrKey, nextonFetcher);
}
