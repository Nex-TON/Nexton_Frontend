import { Address, OpenedContract, TupleBuilder, beginCell, toNano } from "@ton/core";

import { NftItem } from "./wrappers/NftItem";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import useTonConnect from "./useTonConnect";
import { TonClient } from "@ton/ton";

function transferNft(id: number) {
  const client: TonClient = useTonClient();
  const { sender, address } = useTonConnect();

  let nftItem: OpenedContract<NftItem> = useAsyncInitialize(async () => {
    if (!client) return;
    const nftItemAddress = await idToAddress(id, client);
    console.log(nftItemAddress.toString());
    const contract = new NftItem(nftItemAddress);
    return client.open(contract);
  }, [client]);

  return {
    sendMessage: async (
      data: {
        queryId: bigint;
        value: bigint;
        newOwner: Address;
        responseAddress: Address;
        fwdAmount: bigint;
      },
      value: bigint,
    ) => {
      if (nftItem) {
        return await nftItem.sendTransfer(sender, {
          queryId: data.queryId,
          value: value,
          newOwnerAddress: data.newOwner,
          responseDestination: data.responseAddress,
          forwardAmount: data.fwdAmount,
          forwardPayload: beginCell().storeUint(12, 8),
        });
      } else {
        return () => {};
      }
    },
  };
}

async function idToAddress(id: number, client: TonClient) {
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
