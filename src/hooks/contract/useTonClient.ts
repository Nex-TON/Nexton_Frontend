import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";

const network =
  (import.meta.env.VITE_TON_NETWORK as "mainnet" | "testnet") || "testnet";

export function useTonClient(): TonClient | undefined {
  return useAsyncInitialize(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint({ network }),
      })
  );
}
