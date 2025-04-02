import { Address, toNano } from "@ton/core";

import { NexTon } from "./wrappers/tact_NexTon";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import useTonConnect from "./useTonConnect";

function depositTon() {
  const contractAddress = `${import.meta.env.VITE_CONTRACT_ADDRESS}`;
  const client = useTonClient();
  const { sender, address } = useTonConnect();

  let nextonContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NexTon(Address.parse(contractAddress));

    return client.open(contract);
  }, [client]);

  return {
    address: nextonContract?.address.toString(),
    sendMessage: async (data, value) => {
      if (nextonContract) {
        return await nextonContract.send(sender, { value: toNano(value) }, data);
      } else {
        return () => {};
      }
    },
    sendValue: async value => {
      if (nextonContract) {
        return await sender.send({
          to: contractAddress,
          value: toNano(value),
        });
      } else {
        return () => {};
      }
    },
    strategyDeposit: async (data, value) => {
      const strategy_handler = mapStrategyHandler(data.strategy);
      console.log(strategy_handler);
      if (nextonContract && strategy_handler) {
        return await nextonContract.send(
          sender,
          { value: value },
          {
            $$type: "StrategyTonDeposit",
            query_id: BigInt(Date.now()),
            amount: data.amount,
            strategy_handler: strategy_handler,
          },
        );
      } else {
        return () => {};
      }
    },
  };
}

function mapStrategyHandler(handler) {
  if (import.meta.env.VITE_TON_NETWORK === "mainnet")
    if (handler === "Bemo Pool") return Address.parse("EQDH13TaSeQVHHf9YOeG4y3A0VrkYn8y24WESaJIui3BujDc");
  if (import.meta.env.VITE_TON_NETWORK === "testnet")
    if (handler === "Bemo Pool") return Address.parse("kQDyV2q5-epazG6SffES6v9QPlNzeFC19uy71TPjXwXd0bLg");
}

export { depositTon };
