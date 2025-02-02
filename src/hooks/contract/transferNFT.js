import { NftItem } from "./wrappers/NftItem";
import { useEffect, useState } from "react";
import { useWalletData } from "@/context/WalletConnectionProvider";

function transferNft(id) {
  const { sender } = useWalletData();
  const nftAddress = NftItem.idxToAddress(id);

  return {
    sendWithData: async (data, value) => {
      try {
        if (nftAddress) {
          const payload = NftItem.storeTransferWithData({
            queryId: data.queryId,
            value: value,
            newOwnerAddress: data.newOwner,
            responseDestination: data.responseAddress,
            forwardAmount: data.fwdAmount,
          });

          await sender.send({
            to: nftAddress,
            value: data.value,
            body: payload,
          });
        } else {
          throw new Error("NftAddress not set");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Error while sending nft");
      }
    },
    sendMessage: async (data, value) => {
      try {
        if (nftAddress) {
          const payload = NftItem.storeTransfer({
            queryId: data.queryId,
            value: value,
            newOwner: data.newOwner,
            responseAddress: data.responseAddress,
            forwardAmount: data.fwdAmount,
          });
          await sender.send({
            to: nftAddress,
            value: data.value,
            body: payload,
          });
        } else {
          throw new Error("NftAddress not set");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Error while sending nft");
      }
    },
  };
}

export { transferNft };
