import { Address, Cell, toNano } from "ton-core";
import useTonConnect from "./useTonConnect";
import { useTonClient } from "./useTonClient";
import { NexTon } from "./tact_NexTon";

const nextonAddress: Address = Address.parse(
  "EQCp-JgP3iOcz1a6-sG6zjfji_1xUm-eefsDgDJDmXt9j8v7"
);

export async function UserWithdraw() {
  const { sender } = useTonConnect();
  const client = useTonClient();
  const nextonInit = await NexTon.fromAddress(nextonAddress);

  const item = client.open(nextonInit);
  const tx = await item.send(
    sender,
    {
      value: toNano("0.05"),
    },
    {
      $$type: "UserClaimWithdraw",
      itemIndex: 0n,
    }
  );

  return tx;
}
