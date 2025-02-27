import { useCallback } from "react";
import useSWRMutation from "swr/mutation";

import { client } from "@/api/axios";

interface GenerateReferral {
  userId: number;
  address: string;
  username?: string;
  returnCode?: boolean;
}

export function useManageReferral() {
  type GenerateReferralArgs = { arg: GenerateReferral };

  const generateReferralIdFetcher = useCallback((url: string, { arg: data }: GenerateReferralArgs) => {
    return client.post<{ code: string }>(url, data);
  }, []);

  return useSWRMutation("/api/referral/manage", generateReferralIdFetcher, {
    throwOnError: true,
  });
}
