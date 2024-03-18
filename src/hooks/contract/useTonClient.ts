import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";

export function useTonClient(): TonClient | undefined {
  return useAsyncInitialize(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint({ network: "testnet" }),
      })
  );
}
