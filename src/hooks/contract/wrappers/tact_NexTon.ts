import {
  ABIGetter,
  ABIReceiver,
  ABIType,
  Address,
  beginCell,
  Builder,
  Cell,
  ComputeError,
  Contract,
  ContractABI,
  contractAddress,
  ContractProvider,
  Dictionary,
  DictionaryValue,
  Sender,
  Slice,
  TupleBuilder,
  TupleItem,
  TupleReader,
} from "@ton/core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  const sc_0 = slice;
  const _code = sc_0.loadRef();
  const _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  const _code = source.readCell();
  const _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  const builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  const sc_0 = slice;
  const _bounced = sc_0.loadBit();
  const _sender = sc_0.loadAddress();
  const _value = sc_0.loadIntBig(257);
  const _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  const _bounced = source.readBoolean();
  const _sender = source.readAddress();
  const _value = source.readBigNumber();
  const _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  const builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  const sc_0 = slice;
  const _bounce = sc_0.loadBit();
  const _to = sc_0.loadAddress();
  const _value = sc_0.loadIntBig(257);
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  const _bounce = source.readBoolean();
  const _to = source.readAddress();
  const _value = source.readBigNumber();
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _code = source.readCellOpt();
  const _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  const builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: "ChangeOwner";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: "ChangeOwnerOk";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

export type UserDeposit = {
  $$type: "UserDeposit";
  queryId: bigint;
  lockPeriod: bigint;
  leverage: bigint;
};

export function storeUserDeposit(src: UserDeposit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(3554937751, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeUint(src.lockPeriod, 256);
    b_0.storeUint(src.leverage, 32);
  };
}

export function loadUserDeposit(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 3554937751) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _lockPeriod = sc_0.loadUintBig(256);
  const _leverage = sc_0.loadUintBig(32);
  return {
    $$type: "UserDeposit" as const,
    queryId: _queryId,
    lockPeriod: _lockPeriod,
    leverage: _leverage,
  };
}

function loadTupleUserDeposit(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _lockPeriod = source.readBigNumber();
  const _leverage = source.readBigNumber();
  return {
    $$type: "UserDeposit" as const,
    queryId: _queryId,
    lockPeriod: _lockPeriod,
    leverage: _leverage,
  };
}

function storeTupleUserDeposit(source: UserDeposit) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.lockPeriod);
  builder.writeNumber(source.leverage);
  return builder.build();
}

function dictValueParserUserDeposit(): DictionaryValue<UserDeposit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUserDeposit(src)).endCell());
    },
    parse: (src) => {
      return loadUserDeposit(src.loadRef().beginParse());
    },
  };
}

export type MintNFT = {
  $$type: "MintNFT";
  queryId: bigint;
  itemIndex: bigint;
  amount: bigint;
  NFTMessage: Cell;
};

export function storeMintNFT(src: MintNFT) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeUint(src.itemIndex, 64);
    b_0.storeCoins(src.amount);
    b_0.storeRef(src.NFTMessage);
  };
}

export function loadMintNFT(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _itemIndex = sc_0.loadUintBig(64);
  const _amount = sc_0.loadCoins();
  const _NFTMessage = sc_0.loadRef();
  return {
    $$type: "MintNFT" as const,
    queryId: _queryId,
    itemIndex: _itemIndex,
    amount: _amount,
    NFTMessage: _NFTMessage,
  };
}

function loadTupleMintNFT(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _itemIndex = source.readBigNumber();
  const _amount = source.readBigNumber();
  const _NFTMessage = source.readCell();
  return {
    $$type: "MintNFT" as const,
    queryId: _queryId,
    itemIndex: _itemIndex,
    amount: _amount,
    NFTMessage: _NFTMessage,
  };
}

function storeTupleMintNFT(source: MintNFT) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.itemIndex);
  builder.writeNumber(source.amount);
  builder.writeCell(source.NFTMessage);
  return builder.build();
}

function dictValueParserMintNFT(): DictionaryValue<MintNFT> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeMintNFT(src)).endCell());
    },
    parse: (src) => {
      return loadMintNFT(src.loadRef().beginParse());
    },
  };
}

export type StakingReward = {
  $$type: "StakingReward";
  principal: bigint;
  rewards: bigint;
};

export function storeStakingReward(src: StakingReward) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(910020686, 32);
    b_0.storeCoins(src.principal);
    b_0.storeCoins(src.rewards);
  };
}

export function loadStakingReward(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 910020686) {
    throw Error("Invalid prefix");
  }
  const _principal = sc_0.loadCoins();
  const _rewards = sc_0.loadCoins();
  return {
    $$type: "StakingReward" as const,
    principal: _principal,
    rewards: _rewards,
  };
}

function loadTupleStakingReward(source: TupleReader) {
  const _principal = source.readBigNumber();
  const _rewards = source.readBigNumber();
  return {
    $$type: "StakingReward" as const,
    principal: _principal,
    rewards: _rewards,
  };
}

function storeTupleStakingReward(source: StakingReward) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.principal);
  builder.writeNumber(source.rewards);
  return builder.build();
}

function dictValueParserStakingReward(): DictionaryValue<StakingReward> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStakingReward(src)).endCell());
    },
    parse: (src) => {
      return loadStakingReward(src.loadRef().beginParse());
    },
  };
}

export type UserClaimWithdraw = {
  $$type: "UserClaimWithdraw";
  itemIndex: bigint;
};

export function storeUserClaimWithdraw(src: UserClaimWithdraw) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(85167505, 32);
    b_0.storeUint(src.itemIndex, 32);
  };
}

export function loadUserClaimWithdraw(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 85167505) {
    throw Error("Invalid prefix");
  }
  const _itemIndex = sc_0.loadUintBig(32);
  return { $$type: "UserClaimWithdraw" as const, itemIndex: _itemIndex };
}

function loadTupleUserClaimWithdraw(source: TupleReader) {
  const _itemIndex = source.readBigNumber();
  return { $$type: "UserClaimWithdraw" as const, itemIndex: _itemIndex };
}

function storeTupleUserClaimWithdraw(source: UserClaimWithdraw) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.itemIndex);
  return builder.build();
}

function dictValueParserUserClaimWithdraw(): DictionaryValue<UserClaimWithdraw> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUserClaimWithdraw(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUserClaimWithdraw(src.loadRef().beginParse());
    },
  };
}

export type BasicMetadata = {
  $$type: "BasicMetadata";
  name: string;
  description: string;
  image: string;
};

export function storeBasicMetadata(src: BasicMetadata) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeStringRefTail(src.name);
    b_0.storeStringRefTail(src.description);
    b_0.storeStringRefTail(src.image);
  };
}

export function loadBasicMetadata(slice: Slice) {
  const sc_0 = slice;
  const _name = sc_0.loadStringRefTail();
  const _description = sc_0.loadStringRefTail();
  const _image = sc_0.loadStringRefTail();
  return {
    $$type: "BasicMetadata" as const,
    name: _name,
    description: _description,
    image: _image,
  };
}

function loadTupleBasicMetadata(source: TupleReader) {
  const _name = source.readString();
  const _description = source.readString();
  const _image = source.readString();
  return {
    $$type: "BasicMetadata" as const,
    name: _name,
    description: _description,
    image: _image,
  };
}

function storeTupleBasicMetadata(source: BasicMetadata) {
  const builder = new TupleBuilder();
  builder.writeString(source.name);
  builder.writeString(source.description);
  builder.writeString(source.image);
  return builder.build();
}

function dictValueParserBasicMetadata(): DictionaryValue<BasicMetadata> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeBasicMetadata(src)).endCell());
    },
    parse: (src) => {
      return loadBasicMetadata(src.loadRef().beginParse());
    },
  };
}

type NexTon_init_args = {
  $$type: "NexTon_init_args";
  _liquidStaking: Address;
  _nft: Address;
};

function initNexTon_init_args(src: NexTon_init_args) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeAddress(src._liquidStaking);
    b_0.storeAddress(src._nft);
  };
}

async function NexTon_init(_liquidStaking: Address, _nft: Address) {
  const __code = Cell.fromBase64(
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
  );
  const builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initNexTon_init_args({ $$type: "NexTon_init_args", _liquidStaking, _nft })(
    builder
  );
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const NexTon_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  10656: { message: `Too big leverage, should be less than 5` },
  19861: { message: `Too small deposit amount, min deposit is 0.5 Ton` },
};

const NexTon_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "UserDeposit",
    header: 3554937751,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "lockPeriod",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "leverage",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
    ],
  },
  {
    name: "MintNFT",
    header: 1,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "itemIndex",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "NFTMessage",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "StakingReward",
    header: 910020686,
    fields: [
      {
        name: "principal",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "rewards",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
    ],
  },
  {
    name: "UserClaimWithdraw",
    header: 85167505,
    fields: [
      {
        name: "itemIndex",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
    ],
  },
  {
    name: "BasicMetadata",
    header: null,
    fields: [
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "description",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "image",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
];

const NexTon_getters: ABIGetter[] = [
  {
    name: "balance",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "nftCounter",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "owner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
];

const NexTon_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "empty" } },
  { receiver: "internal", message: { kind: "typed", type: "UserDeposit" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UserClaimWithdraw" },
  },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  { receiver: "internal", message: { kind: "typed", type: "ChangeOwner" } },
];

export class NexTon implements Contract {
  static async init(_liquidStaking: Address, _nft: Address) {
    return await NexTon_init(_liquidStaking, _nft);
  }

  static async fromInit(_liquidStaking: Address, _nft: Address) {
    const init = await NexTon_init(_liquidStaking, _nft);
    const address = contractAddress(0, init);
    return new NexTon(address, init);
  }

  static fromAddress(address: Address) {
    return new NexTon(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: NexTon_types,
    getters: NexTon_getters,
    receivers: NexTon_receivers,
    errors: NexTon_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: null | UserDeposit | UserClaimWithdraw | Deploy | ChangeOwner
  ) {
    let body: Cell | null = null;
    if (message === null) {
      body = new Cell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UserDeposit"
    ) {
      body = beginCell().store(storeUserDeposit(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UserClaimWithdraw"
    ) {
      body = beginCell().store(storeUserClaimWithdraw(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ChangeOwner"
    ) {
      body = beginCell().store(storeChangeOwner(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getBalance(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("balance", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getNftCounter(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("nftCounter", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("owner", builder.build())).stack;
    const result = source.readAddress();
    return result;
  }
}
