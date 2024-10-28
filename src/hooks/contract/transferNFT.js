import { Address, toNano } from "@ton/core";

import { NftItem } from "./wrappers/NftItem";
import { NexTon } from "./wrappers/tact_NexTon";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import useTonConnect from "./useTonConnect";

function transferNft(nftItemAddress) {
  const client = useTonClient();
  const { sender, address } = useTonConnect();

  let nftItem = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NftItem(Address.parse(nftItemAddress));
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

export { transferNft };
