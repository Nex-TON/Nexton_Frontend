import { useState, useCallback } from "react";
import { Address, beginCell } from "@ton/core";

import { NftItem } from "./wrappers/NftItem";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useJettonWallet } from "./useJettonWallet";

function repay(id) {
  const [nftAddress, setNftAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const jettonWallet = useJettonWallet("nxTON");

  const refreshNftAddress = useCallback(async () => {
    const nftAddress = NftItem.idxToAddress(id);
    if (nftAddress) setNftAddress(nftAddress);
  }, [id]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      await jettonWallet.refreshData();
      await refreshNftAddress();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [refreshNftAddress, jettonWallet.refreshData]);

  return {
    nftAddress,
    refresh,
    isLoading,
    sendMessage: async param => {
      if (nftAddress && jettonWallet) {
        const lendContractAddress = Address.parse(import.meta.env.VITE_LEND_CONTRACT);
        await jettonWallet.tokenTransfer(lendContractAddress, {
          amount: param.amount,
          fwdAmount: param.forward_ton_amount,
          value: param.value,
          fwdPayload: beginCell().storeAddress(nftAddress).asSlice(),
        });
      } else {
        throw new Error("Addresses not set");
      }
    },
  };
}

export { repay };
