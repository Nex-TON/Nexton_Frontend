import { useState } from "react";
import { toNano, Address, beginCell } from "@ton/core";

import * as Contract from "./transferNFT";

export default async function lend(id: number, contract, responseAddress: Address) {
  const destination = id >= 100 ? import.meta.env.VITE_LEND_CONTRACT : import.meta.env.VITE_LEND_CONTRACT_OG;

  if (id >= 100) {
    await contract.sendWithData(
      {
        value: toNano("0.102"),
        queryId: BigInt(Date.now()),
        newOwner: Address.parse(destination),
        responseAddress: responseAddress,
        fwdAmount: toNano("0.052"),
      },
      toNano("0.102"),
    );
  } else {
    await contract.sendMessage(
      {
        value: toNano("0.102"),
        queryId: BigInt(Date.now()),
        newOwner: Address.parse(destination),
        responseAddress: responseAddress,
        fwdAmount: toNano("0.052"),
        fwdPayload: beginCell().storeUint(id, 64),
      },
      toNano("0.102"),
    );
  }
}
