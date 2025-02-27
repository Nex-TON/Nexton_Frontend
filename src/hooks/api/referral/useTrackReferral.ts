import { useCallback } from "react";
import useSWRMutation from "swr/mutation";

import { client } from "@/api/axios";

interface ITrackReferral {
  newUserId: number;
  newUserAddress: string;
  referralLink: string;
  username?: string;
}

interface ITrackReferralResponse {
  message: string;
  success: boolean;
  referrerId: string;
  username: string;
}

export function useTrackReferral() {
  type TrackReferralArgs = { arg: ITrackReferral };

  const trackReferralFetcher = useCallback((url: string, { arg: data }: TrackReferralArgs) => {
    return client.post<ITrackReferralResponse>(url, data);
  }, []);

  return useSWRMutation("/api/referral/track", trackReferralFetcher, {
    throwOnError: true,
  });
}
