import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";
import { ReferralStatus } from "@/types/referral/referral";

export function useReferralStatus(userId: number, address: string) {
  const swrKey = userId && address ? `api/referral/status?userId=${userId}&address=${address}` : null;

  return useSWR<ReferralStatus>(swrKey, nextonFetcher);
}
