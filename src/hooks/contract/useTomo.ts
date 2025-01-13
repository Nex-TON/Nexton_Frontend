import { TomoWalletTgSdkV2, TonTxParams, useTomo } from "@tomo-inc/tomo-telegram-sdk";
import { useCallback, useEffect, useState } from "react";
import { loadTonDeposit, storeTonDeposit } from "./wrappers/tact_NexTon";
import { Address, Cell, beginCell, toNano } from "@ton/core";

export type TransactionParam = {
  to: Address;
  value: bigint;
  body: Cell;
  bounce?: boolean;
  init?: boolean;
};

export default function useTomoWallet() {
  const tomo = useTomo();
  const tgTomoSdk = new TomoWalletTgSdkV2();
  const [tomoTon, setTomoTon] = useState(
    import.meta.env.VITE_TON_NETWORK === "mainnet" ? tomo.providers.tomo_ton : tgTomoSdk.tomo_ton,
  );
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
      send: async (param: TransactionParam) => {
        try {
          const txParam: TonTxParams = {
            from: address,
            network: "TON",
            messages: [
              {
                address: param.to.toString(),
                amount: param.value.toString(),
                payload: param.body.toBoc().toString("base64"),
              },
            ],
          };
          await tomoTon.sendTransaction(txParam);
        } catch (error) {
          throw new Error("Tomo Tx Error");
        }
      },
    },
    refreshTonData,
    setTomoTon,
    openConnectModal: tomo.openConnectModal,
  };
}
