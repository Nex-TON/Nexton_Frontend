import { useCallback } from "react";
import useSWRMutation from "swr/mutation";

import { client } from "@/api/axios";
import { IUserInfo } from "@/pages/Referral/Referral";

export function useGenerateReferralId() {
  type GenerateReferralIdArgs = { arg: IUserInfo };

  const generateReferralIdFetcher = useCallback((url: string, { arg: data }: GenerateReferralIdArgs) => {
    return client.post<{ code: string }>(url, data);
  }, []);

  return useSWRMutation("/api/referral/generate", generateReferralIdFetcher, {
    throwOnError: true,
  });
}
