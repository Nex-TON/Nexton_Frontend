import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

export interface IUnstakingDetailData {
  nftId: number;
  principal: number;
  rewards: number;
  unstakingPeriod: number;
  unstakableDate: string;
  unstakeState:number;
  tokenSort:string;
}

export function useUnstakingDetail(nftId: number | string) {
  const swrKey = `/data/unstakingDetail/${nftId}`;

  return useSWR<IUnstakingDetailData>(swrKey, nextonFetcher);
}