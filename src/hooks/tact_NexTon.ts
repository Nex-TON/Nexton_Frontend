import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "ton-core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
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
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
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
    let b_0 = builder;
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
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
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
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
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
  let builder = new TupleBuilder();
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
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
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
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
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
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
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
    let b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
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
    let b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
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
    let b_0 = builder;
    b_0.storeUint(3554937751, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeUint(src.lockPeriod, 256);
    b_0.storeUint(src.leverage, 32);
  };
}

export function loadUserDeposit(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3554937751) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _lockPeriod = sc_0.loadUintBig(256);
  let _leverage = sc_0.loadUintBig(32);
  return {
    $$type: "UserDeposit" as const,
    queryId: _queryId,
    lockPeriod: _lockPeriod,
    leverage: _leverage,
  };
}

function loadTupleUserDeposit(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _lockPeriod = source.readBigNumber();
  let _leverage = source.readBigNumber();
  return {
    $$type: "UserDeposit" as const,
    queryId: _queryId,
    lockPeriod: _lockPeriod,
    leverage: _leverage,
  };
}

function storeTupleUserDeposit(source: UserDeposit) {
  let builder = new TupleBuilder();
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

export type ChangeAddr = {
  $$type: "ChangeAddr";
  queryId: bigint;
  address: Address;
  entity: string;
};

export function storeChangeAddr(src: ChangeAddr) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(406989457, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.address);
    b_0.storeStringRefTail(src.entity);
  };
}

export function loadChangeAddr(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 406989457) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _address = sc_0.loadAddress();
  let _entity = sc_0.loadStringRefTail();
  return {
    $$type: "ChangeAddr" as const,
    queryId: _queryId,
    address: _address,
    entity: _entity,
  };
}

function loadTupleChangeAddr(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _address = source.readAddress();
  let _entity = source.readString();
  return {
    $$type: "ChangeAddr" as const,
    queryId: _queryId,
    address: _address,
    entity: _entity,
  };
}

function storeTupleChangeAddr(source: ChangeAddr) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.address);
  builder.writeString(source.entity);
  return builder.build();
}

function dictValueParserChangeAddr(): DictionaryValue<ChangeAddr> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeAddr(src)).endCell());
    },
    parse: (src) => {
      return loadChangeAddr(src.loadRef().beginParse());
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
    let b_0 = builder;
    b_0.storeUint(1, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeUint(src.itemIndex, 64);
    b_0.storeCoins(src.amount);
    b_0.storeRef(src.NFTMessage);
  };
}

export function loadMintNFT(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _itemIndex = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _NFTMessage = sc_0.loadRef();
  return {
    $$type: "MintNFT" as const,
    queryId: _queryId,
    itemIndex: _itemIndex,
    amount: _amount,
    NFTMessage: _NFTMessage,
  };
}

function loadTupleMintNFT(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _itemIndex = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _NFTMessage = source.readCell();
  return {
    $$type: "MintNFT" as const,
    queryId: _queryId,
    itemIndex: _itemIndex,
    amount: _amount,
    NFTMessage: _NFTMessage,
  };
}

function storeTupleMintNFT(source: MintNFT) {
  let builder = new TupleBuilder();
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

export type NFTContent = {
  $$type: "NFTContent";
  principal: bigint;
  leverageRatio: bigint;
  lockPeriod: bigint;
  lockEnd: bigint;
};

export function storeNFTContent(src: NFTContent) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeCoins(src.principal);
    b_0.storeUint(src.leverageRatio, 32);
    b_0.storeUint(src.lockPeriod, 256);
    b_0.storeUint(src.lockEnd, 256);
  };
}

export function loadNFTContent(slice: Slice) {
  let sc_0 = slice;
  let _principal = sc_0.loadCoins();
  let _leverageRatio = sc_0.loadUintBig(32);
  let _lockPeriod = sc_0.loadUintBig(256);
  let _lockEnd = sc_0.loadUintBig(256);
  return {
    $$type: "NFTContent" as const,
    principal: _principal,
    leverageRatio: _leverageRatio,
    lockPeriod: _lockPeriod,
    lockEnd: _lockEnd,
  };
}

function loadTupleNFTContent(source: TupleReader) {
  let _principal = source.readBigNumber();
  let _leverageRatio = source.readBigNumber();
  let _lockPeriod = source.readBigNumber();
  let _lockEnd = source.readBigNumber();
  return {
    $$type: "NFTContent" as const,
    principal: _principal,
    leverageRatio: _leverageRatio,
    lockPeriod: _lockPeriod,
    lockEnd: _lockEnd,
  };
}

function storeTupleNFTContent(source: NFTContent) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.principal);
  builder.writeNumber(source.leverageRatio);
  builder.writeNumber(source.lockPeriod);
  builder.writeNumber(source.lockEnd);
  return builder.build();
}

function dictValueParserNFTContent(): DictionaryValue<NFTContent> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeNFTContent(src)).endCell());
    },
    parse: (src) => {
      return loadNFTContent(src.loadRef().beginParse());
    },
  };
}

export type mintJettons = {
  $$type: "mintJettons";
  queryId: bigint;
  amount: bigint;
  receiverAddress: Address;
};

export function storemintJettons(src: mintJettons) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.receiverAddress);
  };
}

export function loadmintJettons(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _receiverAddress = sc_0.loadAddress();
  return {
    $$type: "mintJettons" as const,
    queryId: _queryId,
    amount: _amount,
    receiverAddress: _receiverAddress,
  };
}

function loadTuplemintJettons(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _receiverAddress = source.readAddress();
  return {
    $$type: "mintJettons" as const,
    queryId: _queryId,
    amount: _amount,
    receiverAddress: _receiverAddress,
  };
}

function storeTuplemintJettons(source: mintJettons) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.receiverAddress);
  return builder.build();
}

function dictValueParsermintJettons(): DictionaryValue<mintJettons> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storemintJettons(src)).endCell());
    },
    parse: (src) => {
      return loadmintJettons(src.loadRef().beginParse());
    },
  };
}

export type LPProvider = {
  $$type: "LPProvider";
  principal: bigint;
  rewards: bigint;
  lastStakePrincipal: bigint;
};

export function storeLPProvider(src: LPProvider) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeCoins(src.principal);
    b_0.storeCoins(src.rewards);
    b_0.storeCoins(src.lastStakePrincipal);
  };
}

export function loadLPProvider(slice: Slice) {
  let sc_0 = slice;
  let _principal = sc_0.loadCoins();
  let _rewards = sc_0.loadCoins();
  let _lastStakePrincipal = sc_0.loadCoins();
  return {
    $$type: "LPProvider" as const,
    principal: _principal,
    rewards: _rewards,
    lastStakePrincipal: _lastStakePrincipal,
  };
}

function loadTupleLPProvider(source: TupleReader) {
  let _principal = source.readBigNumber();
  let _rewards = source.readBigNumber();
  let _lastStakePrincipal = source.readBigNumber();
  return {
    $$type: "LPProvider" as const,
    principal: _principal,
    rewards: _rewards,
    lastStakePrincipal: _lastStakePrincipal,
  };
}

function storeTupleLPProvider(source: LPProvider) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.principal);
  builder.writeNumber(source.rewards);
  builder.writeNumber(source.lastStakePrincipal);
  return builder.build();
}

function dictValueParserLPProvider(): DictionaryValue<LPProvider> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeLPProvider(src)).endCell());
    },
    parse: (src) => {
      return loadLPProvider(src.loadRef().beginParse());
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
    let b_0 = builder;
    b_0.storeUint(910020686, 32);
    b_0.storeCoins(src.principal);
    b_0.storeCoins(src.rewards);
  };
}

export function loadStakingReward(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 910020686) {
    throw Error("Invalid prefix");
  }
  let _principal = sc_0.loadCoins();
  let _rewards = sc_0.loadCoins();
  return {
    $$type: "StakingReward" as const,
    principal: _principal,
    rewards: _rewards,
  };
}

function loadTupleStakingReward(source: TupleReader) {
  let _principal = source.readBigNumber();
  let _rewards = source.readBigNumber();
  return {
    $$type: "StakingReward" as const,
    principal: _principal,
    rewards: _rewards,
  };
}

function storeTupleStakingReward(source: StakingReward) {
  let builder = new TupleBuilder();
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

export type UserStakeInfo = {
  $$type: "UserStakeInfo";
  staker: Address;
  leverageRatio: bigint;
  protocolFee: bigint;
  principal: bigint;
  lockPeriod: bigint;
  lockEnd: bigint;
  isLent: boolean;
};

export function storeUserStakeInfo(src: UserStakeInfo) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.staker);
    b_0.storeUint(src.leverageRatio, 32);
    b_0.storeCoins(src.protocolFee);
    b_0.storeCoins(src.principal);
    b_0.storeUint(src.lockPeriod, 256);
    let b_1 = new Builder();
    b_1.storeUint(src.lockEnd, 256);
    b_1.storeBit(src.isLent);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadUserStakeInfo(slice: Slice) {
  let sc_0 = slice;
  let _staker = sc_0.loadAddress();
  let _leverageRatio = sc_0.loadUintBig(32);
  let _protocolFee = sc_0.loadCoins();
  let _principal = sc_0.loadCoins();
  let _lockPeriod = sc_0.loadUintBig(256);
  let sc_1 = sc_0.loadRef().beginParse();
  let _lockEnd = sc_1.loadUintBig(256);
  let _isLent = sc_1.loadBit();
  return {
    $$type: "UserStakeInfo" as const,
    staker: _staker,
    leverageRatio: _leverageRatio,
    protocolFee: _protocolFee,
    principal: _principal,
    lockPeriod: _lockPeriod,
    lockEnd: _lockEnd,
    isLent: _isLent,
  };
}

function loadTupleUserStakeInfo(source: TupleReader) {
  let _staker = source.readAddress();
  let _leverageRatio = source.readBigNumber();
  let _protocolFee = source.readBigNumber();
  let _principal = source.readBigNumber();
  let _lockPeriod = source.readBigNumber();
  let _lockEnd = source.readBigNumber();
  let _isLent = source.readBoolean();
  return {
    $$type: "UserStakeInfo" as const,
    staker: _staker,
    leverageRatio: _leverageRatio,
    protocolFee: _protocolFee,
    principal: _principal,
    lockPeriod: _lockPeriod,
    lockEnd: _lockEnd,
    isLent: _isLent,
  };
}

function storeTupleUserStakeInfo(source: UserStakeInfo) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.staker);
  builder.writeNumber(source.leverageRatio);
  builder.writeNumber(source.protocolFee);
  builder.writeNumber(source.principal);
  builder.writeNumber(source.lockPeriod);
  builder.writeNumber(source.lockEnd);
  builder.writeBoolean(source.isLent);
  return builder.build();
}

function dictValueParserUserStakeInfo(): DictionaryValue<UserStakeInfo> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUserStakeInfo(src)).endCell());
    },
    parse: (src) => {
      return loadUserStakeInfo(src.loadRef().beginParse());
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
    let b_0 = builder;
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
  let builder = beginCell();
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
  5990: { message: `Too small deposit amount` },
  10656: { message: `Too big leverage, should be less than 5` },
  40368: { message: `Contract stopped` },
  53296: { message: `Contract not stopped` },
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
    name: "ChangeAddr",
    header: 406989457,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "entity",
        type: { kind: "simple", type: "string", optional: false },
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
    name: "NFTContent",
    header: null,
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
        name: "leverageRatio",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
      {
        name: "lockPeriod",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "lockEnd",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "mintJettons",
    header: 1,
    fields: [
      {
        name: "queryId",
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
        name: "receiverAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "LPProvider",
    header: null,
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
      {
        name: "lastStakePrincipal",
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
    name: "UserStakeInfo",
    header: null,
    fields: [
      {
        name: "staker",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "leverageRatio",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
      {
        name: "protocolFee",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
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
        name: "lockPeriod",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "lockEnd",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "isLent",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
];

const NexTon_getters: ABIGetter[] = [
  {
    name: "nftContract",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "stakingPool",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
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
  {
    name: "stopped",
    arguments: [],
    returnType: { kind: "simple", type: "bool", optional: false },
  },
];

const NexTon_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "empty" } },
  { receiver: "internal", message: { kind: "typed", type: "UserDeposit" } },
  {
    receiver: "internal",
    message: { kind: "text", text: "Liquidity Provider Deposit" },
  },
  { receiver: "internal", message: { kind: "typed", type: "ChangeAddr" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  { receiver: "internal", message: { kind: "typed", type: "ChangeOwner" } },
  { receiver: "internal", message: { kind: "text", text: "Resume" } },
  { receiver: "internal", message: { kind: "text", text: "Stop" } },
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
    message:
      | null
      | UserDeposit
      | "Liquidity Provider Deposit"
      | ChangeAddr
      | Deploy
      | ChangeOwner
      | "Resume"
      | "Stop"
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
    if (message === "Liquidity Provider Deposit") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ChangeAddr"
    ) {
      body = beginCell().store(storeChangeAddr(message)).endCell();
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
    if (message === "Resume") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === "Stop") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getNftContract(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("nftContract", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getStakingPool(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("stakingPool", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getBalance(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("balance", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getNftCounter(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("nftCounter", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("owner", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getStopped(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("stopped", builder.build())).stack;
    let result = source.readBoolean();
    return result;
  }
}
