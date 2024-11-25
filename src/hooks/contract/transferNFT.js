import { Address, Cell, beginCell, toNano } from "@ton/core";

import { NftItem } from "./wrappers/NftItem";
import { contractAddress, TupleBuilder } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import useTonConnect from "./useTonConnect";
import { useEffect, useState } from "react";

function transferNft(id) {
  const client = useTonClient();
  const { sender, address } = useTonConnect();
  const [nftAddress, setNftAddress] = useState(null);

  useEffect(() => {
    const address = idxToAddress(id, client);
    setNftAddress(address);
  }, [id, client]);

  return {
    sendMessage: async (data, value) => {
      if (nftAddress) {
        const nftItem = client.open(NftItem.createFromAddress(nftAddress));
        await nftItem.sendTransfer(sender, {
          queryId: data.queryId,
          value: value,
          newOwner: data.newOwner,
          responseAddress: data.responseAddress,
          forwardAmount: data.fwdAmount,
        });
      } else {
        throw new Error("NftAddress not set");
      }
    },
  };
}

function byteArrayToBigInt(byteArray) {
  return byteArray.reduce((acc, byte) => (acc << 8n) | BigInt(byte), 0n);
}

function getNftCodeAndCollectionAddress(id) {
  const isVersion1 = id < 100;

  const nftItemCode1 =
    "te6ccgECEAEAApEAART/APSkE/S88sgLAQIBYgIDAgLOBAUAC6Efn+AEYwIBIAYHAgEgDg8C0wyIccAkl8D4NDTAwFxs" +
    "JJfA+D6QPpAMfoAMXHXIfoAMfoAMHOptADwAgWzjhZbbCI0UjLHBfLhkwH6QPpA1DAQNPAD4AfTH9M/ghBfzD0UUjC64" +
    "wIwMjQ0NTWCEC/LJqK64wJfBIQX8vCAICQARPpEMHC68uFNgAlYyEEgQN0YTUCRRRscF8uGRAfpAIfAB+kDSADH6ACDX" +
    "ScIA8uK8UzbHBeMPCgsAcnCCEIt3FzUFyMv/UATPFhAkgEBwgBjIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIB" +
    "yQH7AAHYMDEyOCPQ0wcBwADy44T0BDAgbsD/8tOFgvC8qEI1sNqCYjYFGv7Lge86YFX4cikcjxKoo6OKo/zkVAGDB/QP" +
    "b6Hy44bQ0wcBwADy44jT/zD4I7vy44cmyMs/UAXPFlIwzIIQBjbGFiMGQTNwDAHsggr68IAcoSGUUxSgod4i1wsBwwAg" +
    "kgWhkTXiIML/8uGSIY4+ghAFE42RyFAKzxZQDM8WcSRKFFRHsHCAGMjLBVAHzxZQBfoCFctqEssfyz8ibrOUWM8XAZEy" +
    "4gHJAfsAEFiUECs4W+IBlBAnNFvjDRA0QTDwAw0AWHCAGMjLBVAHzxZQBfoCFctqEssfyz8ibrOUWM8XAZEy4gHJAfsA" +
    "EDQQI/ADAGon8AGCENUydtsQOEUFbXFwgBjIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AABBO1E0NM/+" +
    "kAg10nCAJx/AfpA+kDUMBA1EDTgMHBZbW1tgACUBMjLP1ADzxYBzxYBzxbMye1Ug";

  const nftItemCode2 =
    "te6cckECEgEAA0kAART/APSkE/S88sgLAQIBYgIRAgLNAxACASAEDwIBIAUOA98MiHHAJJfA+DQ0wMBcbCSXwPg+kD6QD" +
    "H6ADFx1yH6ADH6ADBzqbQA8AMFs44WW2wiNFIyxwXy4ZMB+kD6QNQwEDTwBOAH0x/TP4IQX8w9FFIwuuMCghAvyyaiUjC" +
    "64wKCEBAkGisTuuMCXwqEF/LwgBgoLAlYyEEgQN0YTUCRRRscF8uGRAfpAIfAB+kDSADH6ACDXScIA8uK8UzbHBeMPBwk" +
    "B2DAxMjgj0NMHAcAA8uOE9AQwIG7A//LThYLwvKhCNbDagmI2BRr+y4HvOmBV+HIpHI8SqKOjiqP85FQBgwf0D2+h8uOG" +
    "0NMHAcAA8uOI0/8w+CO78uOHJsjLP1AFzxZSMMyCEAY2xhYjBkEzcAgAWHCAGMjLBVAHzxZQBfoCFctqEssfyz8ibrOUW" +
    "M8XAZEy4gHJAfsAEDQQI/AEAeyCCvrwgByhIZRTFKCh3iLXCwHDACCSBaGRNeIgwv/y4ZIhjj6CEAUTjZHIUArPFlAMzx" +
    "ZxJEoUVEewcIAYyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wAQWJQQKzhb4gGUECc0W+MNEDRBMPAEDQC" +
    "AE18DMzM0NHCCEIt3FzUEyMv/WM8WRDASgEBwgBjIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AAKwEEgQ" +
    "N0YTUCRRRscF8uGRAfpAIfAB+kDSADH6ANdJwgDy4ryCCvrwgBuhKpRTo6Ch3iHXCwHDACCSBKGRNOIgwv/y4ZIqkjc54" +
    "w0BlBAnNFvjDRA0QTDwBAwNAJgpyMs/KM8WKc8WyYIQBRONkchQCs8WzFJwzHEkUUcQThA7ULJwgBjIywVQB88WUAX6Ah" +
    "XLahLLH8s/Im6zlFjPFwGRMuIByQH7ABBYAGon8AGCENUydtsQOEUFbXFwgBjIywVQB88WUAX6AhXLahLLH8s/Im6zlFj" +
    "PFwGRMuIByQH7AAARPpEMHC68uFNgAEFe1E0NM/+kAg10nCAJx/AfpA+kDUMBA1EDTgMHBZbW1tgAJdAmRln6gB54sA54" +
    "sA54tmZPaqQAC6Efn+AGY8rWI/k=";

  return {
    nftCodeCell: Cell.fromBase64(isVersion1 ? nftItemCode1 : nftItemCode2),
    collectionAddress: Address.parse(import.meta.env[isVersion1 ? "VITE_NFT_V1" : "VITE_NFT_V2"]),
  };
}

function idxToAddress(id) {
  const { nftCodeCell, collectionAddress } = getNftCodeAndCollectionAddress(id);

  const data = beginCell().storeUint(id, 64).storeAddress(collectionAddress).endCell();

  const stateInitCell = beginCell()
    .storeUint(0, 2)
    .storeUint(1, 1)
    .storeRef(nftCodeCell)
    .storeUint(1, 1)
    .storeRef(data)
    .storeUint(0, 1)
    .endCell();

  const addressCell = beginCell()
    .storeUint(4, 3)
    .storeInt(0, 8)
    .storeUint(byteArrayToBigInt(stateInitCell.hash(256)), 256)
    .endCell();

  const address = addressCell.beginParse().loadAddress();
  return address;
}

export { transferNft };
