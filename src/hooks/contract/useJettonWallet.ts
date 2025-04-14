import { useCallback, useEffect, useState } from "react";

import { useTonClient } from "./useTonClient";
import { JettonDefaultWallet } from "./wrappers/tact_JettonDefaultWallet";
import { Address, OpenedContract, TupleBuilder, fromNano, toNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import useTonConnect from "./useTonConnect";

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
          amount: data.amount,
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
          amount: toNano(data.amount),
          response_destination: Address.parse(data.response_destination),
          custom_payload: null,
        },
      );
    },
  };
}

export { useJettonWallet };

function mapTokenMasterAddress(token) {
  switch (token) {
    case "nxTON":
      return Address.parse(import.meta.env.VITE_NXTON_MASTER);
    case "oldNxTON":
      if (import.meta.env.VITE_TON_NETWORK == "mainnet")
        return Address.parse("EQCdEj1dEh76-Qacc38ZRH2eGtqyp-50fO3_0wBKF8HKT9zh");
      else if (import.meta.env.VITE_TON_NETWORK == "testnet")
        return Address.parse("kQAUupHzEYK1B9yvg9qhaGFJqF-EcAgW58HjDs438pSex9Gu");
    case "USDT":
      if (import.meta.env.VITE_TON_NETWORK == "mainnet")
        return Address.parse("EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs");
      else if (import.meta.env.VITE_TON_NETWORK == "testnet")
        return Address.parse("kQBe4gtSQMxM5RpMYLr4ydNY72F8JkY-icZXG1NJcsju8XM7");
  }
  return null;
}

function amountToString(token: string, amount: bigint) {
  switch (token) {
    case "nxTON":
    case "TON":
      return fromNano(amount);
    case "USDT":
      const divisor = 1000000n;
      const integerPart = amount / divisor;
      const fractionalPart = amount % divisor;
      return integerPart.toString() + "." + fractionalPart.toString().padStart(6, "0");
  }
}
