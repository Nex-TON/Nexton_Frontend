import { useCallback, useEffect, useState } from "react";
import { Address } from "@ton/core";
import useSWR from "swr";
import { useTonConnectUI, useTonWallet, useTonAddress } from "@tonconnect/ui-react";

import { useTonClient } from "./useTonClient";

export default function useTonConnect() {
  const client = useTonClient();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();

  const getBalance = useCallback(async () => {
    if (client && address) {
      try {
        const addr = Address.parse(address);
        const newBalance = await client.getBalance(addr);
        const formattedBalance = Number(newBalance) / 10 ** 9;
        return formattedBalance;
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        if (error.code === "ERR_BAD_RESPONSE") {
          // Retry the fetch
          setTimeout(async () => await getBalance(), 2000);
        }
        // TODO: Optionally handle the error by updating the UI or re-trying the fetch
      }
    }
    throw Error("getBalance parameter uninitialized");
  }, [client, address]);

  const { data: balance } = useSWR(address ? address : null, getBalance, {
    errorRetryInterval: 200,
    dedupingInterval: 5000,
    refreshInterval: 10000,
  });

  return {
    tonConnectUI,
    wallet,
    sender: {
      send: async (args: any) => {
        await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: wallet?.account.address ? true : false,
    pureAddress: wallet?.account.address,
    network: wallet?.account.chain,
    balance: balance,
    address: address,
  };
}
