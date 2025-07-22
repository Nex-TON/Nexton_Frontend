import { useCallback, useEffect, useState } from "react";

import { useTonClient } from "./useTonClient";
import { JettonDefaultWallet } from "./wrappers/tact_JettonDefaultWallet";
import { Address, OpenedContract, TupleBuilder, beginCell, fromNano, toNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import useTonConnect from "./useTonConnect";
import { mapTokenMasterAddress, stringToAmount, amountToString, mapStrategyFee, mapStrategyHandler } from "./utils";
import useSWR from "swr";

export default function useJettonWallet(token = "nxTON") {
  const client = useTonClient();
  const { sender, address } = useTonConnect();
  const [isInitialized, setIsInitialized] = useState(false);
  const name = token;

  const jettonWallet: OpenedContract<JettonDefaultWallet> = useAsyncInitialize(async () => {
    const masterAddress = mapTokenMasterAddress(token);
    if (address && client && masterAddress) {
      const tuple = new TupleBuilder();
      tuple.writeAddress(Address.parse(address));
      const walletAddress = (
        await client.runMethod(masterAddress, "get_wallet_address", tuple.build())
      ).stack.readAddress();
      const wallet = client.open(await JettonDefaultWallet.fromAddress(walletAddress));
      setIsInitialized(true); // Set wallet as initialized
      return wallet;
    }
  }, [client, address, token]);

  const getBalance = useCallback(async () => {
    if (jettonWallet && isInitialized) {
      const result = await jettonWallet.getGetWalletData();
      return result.balance;
    }
    return 0n;
  }, [jettonWallet, isInitialized]);

  const { data: balance } = useSWR(jettonWallet ? jettonWallet.address : null, getBalance, {
    errorRetryInterval: 1000,
    dedupingInterval: 5000,
    refreshInterval: 10000,
  });

  return {
    address: jettonWallet ? jettonWallet.address : null,
    ownerWallet: address,
    balance: balance ? amountToString(name, balance) : "0",
    tokenTransfer: async (to, data) => {
      await jettonWallet.send(
        sender,
        { value: data.value },
        {
          $$type: "TokenTransfer",
          query_id: BigInt(Date.now()),
          amount: stringToAmount(name, data.amount),
          sender: to,
          custom_payload: null,
          response_destination: Address.parse(address),
          forward_ton_amount: data.fwdAmount,
          forward_payload: data.fwdPayload,
        },
      );
    },
    tokenBurn: async data => {
      await jettonWallet.send(
        sender,
        { value: toNano(data.value) },
        {
          $$type: "TokenBurn",
          query_id: BigInt(Date.now()),
          amount: stringToAmount(name, data.amount),
          response_destination: Address.parse(data.response_destination),
          custom_payload: null,
        },
      );
    },
    strategyDeposit: async (amount: string, strategy: string) => {
      const fees = mapStrategyFee(strategy);
      await jettonWallet.send(
        sender,
        { value: fees.fee },
        {
          $$type: "TokenTransfer",
          query_id: BigInt(Date.now()),
          amount: stringToAmount(name, amount),
          sender: Address.parse(import.meta.env.VITE_CONTRACT_ADDRESS),
          custom_payload: null,
          response_destination: Address.parse(address),
          forward_ton_amount: fees.jettonFwd,
          forward_payload: beginCell()
            .storeBit(false)
            .storeBit(true)
            .storeAddress(mapStrategyHandler(strategy))
            .endCell()
            .asSlice(),
        },
      );
    },
  };
}

export { useJettonWallet };
