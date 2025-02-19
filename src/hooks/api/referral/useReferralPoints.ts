import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface ReferralPoints {
  loyaltyPoints: number;
  referralPoints: number;
}

export function useReferralPoints(userId: number, address: string) {
  const swrKey = userId && address ? `api/referral/points?userId=${userId}&address=${address}` : null;

  return useSWR<ReferralPoints>(swrKey, nextonFetcher);
}
