import { Address, Cell, beginCell, toNano } from "@ton/core";

import { NftItem } from "./wrappers/NftItem";
import { contractAddress, TupleBuilder } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import useTonConnect from "./useTonConnect";
import { useEffect, useState } from "react";

function transferNft(id) {
  const { sender, address } = useTonConnect();
  const [nftAddress, setNftAddress] = useState(null);

  useEffect(() => {
    const address = NftItem.idxToAddress(id);
    if (address) setNftAddress(address);
  }, [id]);

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
      } catch {
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
      } catch {
        throw new Error("Error while sending nft");
      }
    },
  };
}

export { transferNft };
