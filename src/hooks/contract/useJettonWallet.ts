import { useCallback, useEffect, useState } from "react";

import { useTonClient } from "./useTonClient";
import { JettonDefaultWallet } from "./wrappers/tact_JettonDefaultWallet";
import { Address, OpenedContract, TupleBuilder, beginCell, fromNano, toNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import useTonConnect from "./useTonConnect";
import { mapTokenMasterAddress, stringToAmount, amountToString, mapStrategyFee, mapStrategyHandler } from "./utils";

export default function useJettonWallet(token = "nxTON") {
  const client = useTonClient();
  const { sender, address } = useTonConnect();
  const [balance, setBalance] = useState(BigInt(0));
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
      try {
        const result = await jettonWallet.getGetWalletData();
        setBalance(result.balance);
      } catch (error) {
        if (error.message === "Unable to execute get method. Got exit_code: -13") {
          setBalance(BigInt(0));
          console.log("Jetton Wallet Uninitialized");
          return;
        }
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

  useEffect(() => {
    if (isInitialized) {
      getBalance(); // Refresh balance once wallet is initialized
    }
  }, [isInitialized, getBalance]);

  return {
    address: jettonWallet ? jettonWallet.address : null,
    ownerWallet: address,
    balance: amountToString(name, balance),
    refreshData,
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
