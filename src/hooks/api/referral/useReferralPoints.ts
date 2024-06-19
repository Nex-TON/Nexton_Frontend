import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

interface ReferralPoints {
  loyaltyPoints: number;
  referralPoints: number;
}

export function useReferralPoints(userId: number) {
  const swrKey = userId ? `api/referral/points?userId=${userId}` : null;

  return useSWR<ReferralPoints>(swrKey, nextonFetcher);
}
