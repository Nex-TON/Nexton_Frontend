import { useEffect, useState, useCallback } from "react";
import { Address, beginCell } from "@ton/core";

import { initAddress, JettonDefaultWallet } from "@/hooks/contract/wrappers/tact_JettonDefaultWallet";
import { NftItem } from "./wrappers/NftItem";
import { useTonClient } from "./useTonClient";
import useTonConnect from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";

function repay(id) {
  const { sender, address } = useTonConnect();
  const [nftAddress, setNftAddress] = useState(null);
  const [nxtonWallet, setNxtonWallet] = useState(null);

  useEffect(() => {
    const nftAddress = NftItem.idxToAddress(id);
    console.log("nftAddress set: \n", nftAddress.toString());
    if (nftAddress) setNftAddress(nftAddress);
  }, [id]);

  useEffect(() => {
    const initNxtonWallet = async () => {
      if (address) {
        const nxtonWalletAddress = await initAddress(
          Address.parse(address),
          Address.parse(import.meta.env.VITE_LEND_CONTRACT),
        );
        console.log("nxtonWalletAddress set: \n", nxtonWalletAddress.toString());
        if (nxtonWalletAddress) setNxtonWallet(nxtonWalletAddress);
      }
    };

    initNxtonWallet();
  }, [address]);

  return {
    nftAddress: nftAddress,

    sendMessage: async param => {
      const nxtonWalletAddress = await initAddress(
        Address.parse(address),
        Address.parse(import.meta.env.VITE_LEND_CONTRACT),
      );
      const nxtonWallet = client.open(JettonDefaultWallet.fromAddress(nxtonWalletAddress));
      const data = {
        $$type: "TokenTransfer",
        queryId: BigInt(Date.now()),
        amount: param.amount,
        destination: Address.parse(import.meta.env.VITE_LEND_CONTRACT),
        response_destination: Address.parse(address),
        custom_payload: null,
        forward_ton_amount: param.forward_ton_amount,
        forward_payload: beginCell().storeAddress(nftAddress).asSlice(),
      };
      await nxtonWallet.send(sender, { value: param.value }, data);
    },
  };
}

export { repay };
