import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";
import { ReferralStatus } from "@/types/referral/referral";

export function useReferralStatus(userId: number) {
  const swrKey = userId ? `api/referral/status?userId=${userId}` : null;

  return useSWR<ReferralStatus>(swrKey, nextonFetcher);
}
