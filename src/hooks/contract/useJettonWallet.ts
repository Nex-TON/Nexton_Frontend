import { useCallback, useEffect, useState } from "react";

import { useTonClient } from "./useTonClient";
import useTonConnect from "./useTonConnect";
import { JettonDefaultWallet } from "./wrappers/tact_JettonDefaultWallet";
import { Address, OpenedContract, fromNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";

export default function useJettonWallet(token = "NXTON") {
  const client = useTonClient();
  const { sender, address } = useTonConnect();
  const [balance, setBalance] = useState(BigInt(-1));

  const jettonWallet: OpenedContract<JettonDefaultWallet> = useAsyncInitialize(async () => {
    const masterAddress = mapTokenMasterAddress(token);
    if (address && client && masterAddress) {
      const jettonWallet = client.open(await JettonDefaultWallet.fromInit(Address.parse(address), masterAddress));
      return jettonWallet;
    }
  }, [client, address, token]);

  const getBalance = useCallback(async () => {
    if (jettonWallet) {
      try {
        const result = await jettonWallet.getGetWalletData();
        setBalance(result.balance);
      } catch (error) {
        console.log("Failed to fetch token balance", error);
        if (error.code === "ERR_BAD_RESPONSE") {
          // Retry the fetch
          setTimeout(async () => await getBalance(), 2000);
        }
      }
    }
  }, [client, jettonWallet]);

  const refreshData = useCallback(async () => {
    await getBalance();
  }, [jettonWallet, getBalance]);

  return {
    address: jettonWallet ? jettonWallet.address : null,
    ownerWallet: address,
    balance: fromNano(balance),
    refreshData,
    tokenTransfer: async (to, data) => {
      await jettonWallet.send(
        sender,
        { value: data.value },
        {
          $$type: "TokenTransfer",
          query_id: BigInt(Date.now()),
          amount: data.amount,
          sender: to,
          custom_payload: null,
          response_destination: Address.parse(address),
          forward_ton_amount: data.fwdAmount,
          forward_payload: data.fwdPayload,
        },
      );
    },
  };
}

export { useJettonWallet };

function mapTokenMasterAddress(token) {
  switch (token) {
    case "NXTON":
      return Address.parse(import.meta.env.VITE_NXTON_MASTER);
  }
  return null;
}
