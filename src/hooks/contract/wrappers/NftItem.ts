import {
  Address,
  beginCell,
  Builder,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Dictionary,
  Sender,
  SendMode,
  serializeTuple,
} from "@ton/core";
import { TupleBuilder } from "@ton/core";
import { sha256_sync } from "@ton/crypto";
export type NftItemConfig = {};

export function toSha256(s: string): bigint {
  return BigInt("0x" + sha256_sync(s).toString("hex"));
}

export function nftItemConfigToCell(config: NftItemConfig): Cell {
  return beginCell().endCell();
}

export class NftItem implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell },
  ) {}

  static createFromAddress(address: Address) {
    return new NftItem(address);
  }

  private static byteArrayToBigInt(byteArray) {
    return byteArray.reduce((acc, byte) => (acc << 8n) | BigInt(byte), 0n);
  }

  private static getNftCodeAndCollectionAddress(id) {
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

  static idxToAddress(id) {
    const { nftCodeCell, collectionAddress } = this.getNftCodeAndCollectionAddress(id);

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
      .storeUint(this.byteArrayToBigInt(stateInitCell.hash(256)), 256)
      .endCell();

    const address = addressCell.beginParse().loadAddress();
    return address;
  }

  static createFromConfig(config: NftItemConfig, code: Cell, workchain = 0) {
    const data = nftItemConfigToCell(config);
    const init = { code, data };
    return new NftItem(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async getRawContentCell(provider: ContractProvider, via: Sender) {
    let builder = new TupleBuilder();
    let source = (await provider.get("get_nft_data", builder.build())).stack;
    return source;
  }

  async getGetNFTData(provider: ContractProvider, via: Sender) {
    let builder = new TupleBuilder();
    let source = (await provider.get("get_nft_data", builder.build())).stack;
    console.log(source.readNumber());
    console.log(source.readNumber());
    console.log("collection address: ", source.readAddress().toString());
    console.log("owner address: ", source.readAddress().toString());

    const content = source.readCell();
    const contentParsing = content.beginParse();
    contentParsing.loadUint(8);
    const dict = contentParsing.loadDict(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell());

    console.log("Principal : " + this.parseDictItem(dict.get(toSha256("principal"))!, "coins"));
    console.log("Lock Period : " + this.parseDictItem(dict.get(toSha256("lockPeriod"))!, "uint256"));
    console.log("Lock End : " + this.parseDictItem(dict.get(toSha256("lockEnd"))!, "uint256"));
    console.log("Asset : " + this.parseDictItem(dict.get(toSha256("asset"))!, "string"));
  }

  private parseDictItem(dictValue: Cell, type: string) {
    const parser = dictValue.beginParse();
    parser.loadUint(8);
    if (type === "coins") {
      return parser.loadCoins();
    } else if (type === "uint256") {
      return parser.loadUint(256);
    } else if (type === "string") {
      return parser.loadStringTail();
    }
  }

  async sendTransferWithData(
    provider: ContractProvider,
    via: Sender,
    params: {
      value: bigint;
      queryId: bigint;
      newOwnerAddress: Address;
      responseDestination: Address;
      forwardAmount: bigint;
      forwardPayload: Builder;
    },
  ) {
    await provider.internal(via, {
      value: params.value,
      body: beginCell()
        .storeUint(0x10241a2b, 32) //operation code
        .storeUint(params.queryId ?? 0, 64)
        .storeAddress(params.newOwnerAddress)
        .storeAddress(params.responseDestination)
        .storeInt(BigInt(0), 1) //custom payload
        .storeCoins(params.forwardAmount)
        .storeUint(12, 8)
        .endCell(),
    });
  }

  async sendTransfer(
    provider: ContractProvider,
    via: Sender,
    params: {
      value: bigint;
      queryId: bigint;
      newOwner: Address;
      responseAddress: Address;
      forwardAmount: bigint;
      forwardPayload: Builder;
    },
  ) {
    await provider.internal(via, {
      value: params.value,
      body: beginCell()
        .storeUint(0x5fcc3d14, 32) //operation code
        .storeUint(params.queryId ?? 0, 64)
        .storeAddress(params.newOwner)
        .storeAddress(params.responseAddress)
        .storeInt(BigInt(0), 1) //custom payload
        .storeCoins(params.forwardAmount)
        .storeUint(123, 8)
        .endCell(),
    });
  }

  static storeTransferWithData(params: {
    value: bigint;
      queryId: bigint;
      newOwnerAddress: Address;
      responseDestination: Address;
      forwardAmount: bigint;
      forwardPayload: Builder;
  }){
    return beginCell()
    .storeUint(0x10241a2b, 32) //operation code
    .storeUint(params.queryId ?? 0, 64)
    .storeAddress(params.newOwnerAddress)
    .storeAddress(params.responseDestination)
    .storeInt(BigInt(0), 1) //custom payload
    .storeCoins(params.forwardAmount)
    .storeUint(12, 8)
    .endCell()
  }

  static storeTransfer(params: {
    value: bigint;
    queryId: bigint;
    newOwner: Address;
    responseAddress: Address;
    forwardAmount: bigint;
    forwardPayload: Builder;
  }){
    return beginCell()
        .storeUint(0x5fcc3d14, 32) //operation code
        .storeUint(params.queryId ?? 0, 64)
        .storeAddress(params.newOwner)
        .storeAddress(params.responseAddress)
        .storeInt(BigInt(0), 1) //custom payload
        .storeCoins(params.forwardAmount)
        .storeUint(123, 8)
        .endCell()
  }
}
