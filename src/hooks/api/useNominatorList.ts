import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

export type AvailableToken="USDT"|"TON"|"nxTON"|"bmTON"

export interface INominatorList {
  id: number;
  name: string;
  apy: number;
  profitShare: number;
  tvl: number;
  type: "pool" | "bot"|"vault";
  disabled?: boolean;
  availableToken:string[];
}

export const useNominatorList = (telegramId: string) => {
  const swrKey = telegramId ? `/data/botInvestmentInfo/${telegramId}` : null;

  return useSWR<INominatorList[]>(swrKey, nextonFetcher);
};
