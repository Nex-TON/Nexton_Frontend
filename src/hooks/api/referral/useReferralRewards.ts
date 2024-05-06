import useSWR from "swr";

import { nextonFetcher } from "@/api/axios";

export function useReferralRewards() {
  const swrKey = "/api/referral/rewards";

  return useSWR(swrKey, nextonFetcher);
}
