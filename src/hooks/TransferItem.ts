import { Address, Cell, toNano } from "ton-core";
import { FakeItem } from "./tact_FakeItem";
import { randomAddress } from "@ton-community/test-utils";
import useTonConnect from "./useTonConnect";
import { useTonClient } from "./useTonClient";

const itemAddress: Address = Address.parse(
  "EQCp-JgP3iOcz1a6-sG6zjfji_1xUm-eefsDgDJDmXt9j8v7"
);

export async function TransferItem() {
  const { sender } = useTonConnect();
  const client = useTonClient();
  const itemInit = FakeItem.fromAddress(itemAddress);

  const item = client.open(itemInit);
  const tx = await item.send(
    sender,
    {
      value: toNano("0.08"),
    },
    {
      $$type: "Transfer",
      newOwner: randomAddress(),
    }
  );

  return tx;
}
