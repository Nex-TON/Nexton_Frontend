import { Address, TupleBuilder, toNano } from "@ton/core";

import { NftItem } from "./wrappers/NftItem";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import useTonConnect from "./useTonConnect";

function transferNft(id) {
  const client = useTonClient();
  const { sender, address } = useTonConnect();

  let nftItem = useAsyncInitialize(async () => {
    if (!client) return;
    const nftItemAddress = await idToAddress(id, client);
    console.log(nftItemAddress.toString());
    const contract = new NftItem(nftItemAddress);
    return client.open(contract);
  }, [client]);

  return {
    sendMessage: async (data, value) => {
      if (nftItem) {
        return await nftItem.sendTransfer(sender, {
          queryId: data.queryId,
          value: value,
          newOwner: data.newOwner,
          responseAddress: data.responseAddress,
          fwdAmount: data.fwdAmount,
        });
      } else {
        return () => {};
      }
    },
  };
}

async function idToAddress(id, client) {
  let nftCollectionAddress = null;
  if (id < 100) {
    nftCollectionAddress = Address.parse(import.meta.env.VITE_NFT_V1);
  } else {
    nftCollectionAddress = Address.parse(import.meta.env.VITE_NFT_V2);
  }

  const param = new TupleBuilder();
  param.writeNumber(id);
  const result = (await client.runMethod(nftCollectionAddress, "get_nft_address_by_index", param.build())).stack;
  return result.readAddress();
}

export { transferNft };