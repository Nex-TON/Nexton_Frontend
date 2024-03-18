import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, toNano } from "@ton/core";
import useTonConnect from "./useTonConnect";
import { FakeItem } from "./wrappers/tact_FakeItem";

function useFakeItemContract() {
  const contractAddress = `${import.meta.env.VITE_FAKEITEM_CONTRACT_ADDRESS}`;
  const client = useTonClient();
  const { sender, address } = useTonConnect();

  let fakeContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new FakeItem(Address.parse(contractAddress));

    return client.open(contract);
  }, [client]);

  return {
    address: fakeContract?.address.toString(),
    sendMessage: async (data, value) => {
      if (fakeContract) {
        return await fakeContract.send(sender, { value: toNano(value) }, data);
      } else {
        return () => {};
      }
    },
    sendValue: async (value) => {
      if (fakeContract) {
        return await sender.send({
          to: contractAddress,
          value: toNano(value),
        });
      } else {
        return () => {};
      }
    },
  };
}

export { useFakeItemContract };
