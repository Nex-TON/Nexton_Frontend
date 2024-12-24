import { useTomo } from "@tomo-inc/tomo-telegram-sdk";
import { useCallback, useEffect, useState } from "react";

export default function useTomoWallet() {
  const tomo = useTomo();
  const tomoTon = tomo.providers.tomo_ton;

  const [balance, setBalance] = useState<number>(0);
  const [address, setAddress] = useState("");

  const refresh = useCallback(async () => {
    console.log("Refresing Tomo");
    setAddress(tomoTon.getBalance());
    setBalance(await tomoTon.getBalance());
  }, [tomoTon]);

  useEffect(() => {
    if (tomoTon && tomoTon.account) {
      setAddress(tomoTon.account.address);
      setBalance(tomoTon.getBalance());
    }
  }, [tomo]);

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
    openConnectModal: tomo.openConnectModal,
  };
}
