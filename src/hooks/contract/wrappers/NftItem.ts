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
      newOwnerAddress: Address;
      responseDestination: Address;
      forwardAmount: bigint;
      forwardPayload: Builder;
    },
  ) {
    await provider.internal(via, {
      value: params.value,
      body: beginCell()
        .storeUint(0x5fcc3d14, 32) //operation code
        .storeUint(params.queryId ?? 0, 64)
        .storeAddress(params.newOwnerAddress)
        .storeAddress(params.responseDestination)
        .storeInt(BigInt(0), 1) //custom payload
        .storeCoins(params.forwardAmount)
        .storeUint(123, 8)
        .endCell(),
    });
  }
}
