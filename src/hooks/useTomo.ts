import { useTomo } from "@tomo-inc/tomo-telegram-sdk";
import { useCallback, useEffect, useState } from "react";

export default function useTomoWallet() {
  const tomo = useTomo();
  const tomoTon = tomo.providers.tomo_ton;

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<number>();
  const [connected, setConnected] = useState(false);

  const getAddress = useCallback(() => {
    if (tomoTon && tomoTon.account) {
      const addr = tomoTon.account?.address;
      if (addr) {
        setAddress(addr);
      }
    }
  }, [tomoTon]);

  const getBalance = useCallback(async () => {
    if (tomoTon && tomoTon.account?.address) {
      try {
        const balanceData = await tomoTon.getBalance();
        const formattedBalance = Number(balanceData.formatted);
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
  }, [tomoTon]);

  const refreshTonData = useCallback(async () => {
    getAddress();
    await getBalance();
  }, [getAddress, getBalance]);

  useEffect(() => {
    getAddress();
    if (tomoTon && tomoTon.account) setConnected(tomoTon.account?.address ? true : false);
  }, [tomoTon, getAddress]);

  return {
    address,
    connected: connected,
    balance: balance,
    sender: {
      send: async param => {
        tomoTon.sendTransaction(param.payload);
      },
    },
    refreshTonData,
    openConnectModal: tomo.openConnectModal,
  };
}
