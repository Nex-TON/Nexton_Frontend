import { useTomo } from "@tomo-inc/tomo-telegram-sdk";
import { useCallback, useEffect, useState } from "react";

export default function useTomoWallet() {
  const tomoTon = useTomo().providers.tomo_ton;

  const [balance, setBalance] = useState<number>(0);
  const [address, setAddress] = useState("");

  const refresh = useCallback(async () => {
    setAddress(tomoTon.getBalance());
    setBalance(await tomoTon.getBalance());
  }, [tomoTon]);

  return {
    address,
    connected: address ? true : false,
    balance,
    sender: {
      send: async param => {
        tomoTon.sendTransaction(param.payload);
      },
    },
    refresh,
  };
}
