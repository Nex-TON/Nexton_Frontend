import { useCallback, useState } from "react";
import { Address } from "@ton/core";
import { toUserFriendlyAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

import { useTonClient } from "./useTonClient";

export default function useTonConnect() {
  const client = useTonClient();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<number>();

  const getAddress = useCallback(() => {
    const addr = wallet?.account?.address;
    if (addr) {
      setAddress(toUserFriendlyAddress(addr, true));
    }
  }, [wallet?.account?.address]);

  const getBalance = useCallback(async () => {
    if (client && wallet?.account?.address) {
      try {
        const addr = Address.parse(wallet.account.address);
        const newBalance = await client.getBalance(addr);
        const formattedBalance = Number(newBalance) / 10 ** 9;
        setBalance(formattedBalance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        if (error.code === "ERR_BAD_RESPONSE") {
          // Retry the fetch
          setTimeout(async () => await getBalance(), 2000);
        }
        // TODO: Optionally handle the error by updating the UI or re-trying the fetch
      }
    }
  }, [client, wallet?.account?.address]);

  const refreshTonData = useCallback(async () => {
    getAddress();
    await getBalance();
  }, [getAddress, getBalance]);

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
    balance,
    address,
    refreshTonData,
  };
}
