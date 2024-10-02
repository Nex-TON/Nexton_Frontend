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
    parse: src => {
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
  return { $$type: "Context" as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
  const _bounced = source.readBoolean();
  const _sender = source.readAddress();
  const _value = source.readBigNumber();
  const _raw = source.readCell();
  return { $$type: "Context" as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
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
    parse: src => {
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
    parse: src => {
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
    parse: src => {
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
    parse: src => {
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
  return { $$type: "FactoryDeploy" as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _cashback = source.readAddress();
  return { $$type: "FactoryDeploy" as const, queryId: _queryId, cashback: _cashback };
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
    parse: src => {
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
  return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _newOwner = source.readAddress();
  return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner };
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
    parse: src => {
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
  return { $$type: "ChangeOwnerOk" as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _newOwner = source.readAddress();
  return { $$type: "ChangeOwnerOk" as const, queryId: _queryId, newOwner: _newOwner };
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
    parse: src => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

export type UserDeposit = {
  $$type: "UserDeposit";
  queryId: bigint;
};

export function storeUserDeposit(src: UserDeposit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1135344222, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadUserDeposit(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1832664797) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "UserDeposit" as const, queryId: _queryId };
}

function loadTupleUserDeposit(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "UserDeposit" as const, queryId: _queryId };
}

function storeTupleUserDeposit(source: UserDeposit) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserUserDeposit(): DictionaryValue<UserDeposit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUserDeposit(src)).endCell());
    },
    parse: src => {
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
    parse: src => {
      return loadMintNFT(src.loadRef().beginParse());
    },
  };
}

export type ItemTransferPayload = {
  $$type: "ItemTransferPayload";
  owner: Address;
  body: Cell;
};

export function storeItemTransferPayload(src: ItemTransferPayload) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.body);
  };
}

export function loadItemTransferPayload(slice: Slice) {
  const sc_0 = slice;
  const _owner = sc_0.loadAddress();
  const _body = sc_0.loadRef();
  return { $$type: "ItemTransferPayload" as const, owner: _owner, body: _body };
}

function loadTupleItemTransferPayload(source: TupleReader) {
  const _owner = source.readAddress();
  const _body = source.readCell();
  return { $$type: "ItemTransferPayload" as const, owner: _owner, body: _body };
}

function storeTupleItemTransferPayload(source: ItemTransferPayload) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.owner);
  builder.writeSlice(source.body);
  return builder.build();
}

function dictValueParserItemTransferPayload(): DictionaryValue<ItemTransferPayload> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeItemTransferPayload(src)).endCell());
    },
    parse: src => {
      return loadItemTransferPayload(src.loadRef().beginParse());
    },
  };
}

export type ItemTransfer = {
  $$type: "ItemTransfer";
  queryId: bigint;
  payload: ItemTransferPayload;
};

export function storeItemTransfer(src: ItemTransfer) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(85167505, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.store(storeItemTransferPayload(src.payload));
  };
}

export function loadItemTransfer(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 85167505) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _payload = loadItemTransferPayload(sc_0);
  return { $$type: "ItemTransfer" as const, queryId: _queryId, payload: _payload };
}

function loadTupleItemTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _payload = loadTupleItemTransferPayload(source.readTuple());
  return { $$type: "ItemTransfer" as const, queryId: _queryId, payload: _payload };
}

function storeTupleItemTransfer(source: ItemTransfer) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeTuple(storeTupleItemTransferPayload(source.payload));
  return builder.build();
}

function dictValueParserItemTransfer(): DictionaryValue<ItemTransfer> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeItemTransfer(src)).endCell());
    },
    parse: src => {
      return loadItemTransfer(src.loadRef().beginParse());
    },
  };
}

export type ItemClaimPayload = {
  $$type: "ItemClaimPayload";
  itemIndex: bigint;
  owner: Address;
  content: Cell;
};

export function storeItemClaimPayload(src: ItemClaimPayload) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(src.itemIndex, 64);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.content);
  };
}

export function loadItemClaimPayload(slice: Slice) {
  const sc_0 = slice;
  const _itemIndex = sc_0.loadUintBig(64);
  const _owner = sc_0.loadAddress();
  const _content = sc_0.loadRef();
  return { $$type: "ItemClaimPayload" as const, itemIndex: _itemIndex, owner: _owner, content: _content };
}

function loadTupleItemClaimPayload(source: TupleReader) {
  const _itemIndex = source.readBigNumber();
  const _owner = source.readAddress();
  const _content = source.readCell();
  return { $$type: "ItemClaimPayload" as const, itemIndex: _itemIndex, owner: _owner, content: _content };
}

function storeTupleItemClaimPayload(source: ItemClaimPayload) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.itemIndex);
  builder.writeAddress(source.owner);
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserItemClaimPayload(): DictionaryValue<ItemClaimPayload> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeItemClaimPayload(src)).endCell());
    },
    parse: src => {
      return loadItemClaimPayload(src.loadRef().beginParse());
    },
  };
}

export type UserClaim = {
  $$type: "UserClaim";
  queryId: bigint;
  payload: ItemClaimPayload;
};

export function storeUserClaim(src: UserClaim) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(104252950, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.store(storeItemClaimPayload(src.payload));
  };
}

export function loadUserClaim(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 104252950) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _payload = loadItemClaimPayload(sc_0);
  return { $$type: "UserClaim" as const, queryId: _queryId, payload: _payload };
}

function loadTupleUserClaim(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _payload = loadTupleItemClaimPayload(source.readTuple());
  return { $$type: "UserClaim" as const, queryId: _queryId, payload: _payload };
}

function storeTupleUserClaim(source: UserClaim) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeTuple(storeTupleItemClaimPayload(source.payload));
  return builder.build();
}

function dictValueParserUserClaim(): DictionaryValue<UserClaim> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUserClaim(src)).endCell());
    },
    parse: src => {
      return loadUserClaim(src.loadRef().beginParse());
    },
  };
}

export type OwnerWithdraw = {
  $$type: "OwnerWithdraw";
  queryId: bigint;
  amount: bigint;
};

export function storeOwnerWithdraw(src: OwnerWithdraw) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(899458696, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
  };
}

export function loadOwnerWithdraw(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 899458696) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _amount = sc_0.loadCoins();
  return { $$type: "OwnerWithdraw" as const, queryId: _queryId, amount: _amount };
}

function loadTupleOwnerWithdraw(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _amount = source.readBigNumber();
  return { $$type: "OwnerWithdraw" as const, queryId: _queryId, amount: _amount };
}

function storeTupleOwnerWithdraw(source: OwnerWithdraw) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserOwnerWithdraw(): DictionaryValue<OwnerWithdraw> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeOwnerWithdraw(src)).endCell());
    },
    parse: src => {
      return loadOwnerWithdraw(src.loadRef().beginParse());
    },
  };
}

export type SetLockPeriod = {
  $$type: "SetLockPeriod";
  queryId: bigint;
  lockPeriod: bigint;
};

export function storeSetLockPeriod(src: SetLockPeriod) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(3849380333, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeUint(src.lockPeriod, 256);
  };
}

export function loadSetLockPeriod(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 3849380333) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _lockPeriod = sc_0.loadUintBig(256);
  return { $$type: "SetLockPeriod" as const, queryId: _queryId, lockPeriod: _lockPeriod };
}

function loadTupleSetLockPeriod(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _lockPeriod = source.readBigNumber();
  return { $$type: "SetLockPeriod" as const, queryId: _queryId, lockPeriod: _lockPeriod };
}

function storeTupleSetLockPeriod(source: SetLockPeriod) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.lockPeriod);
  return builder.build();
}

function dictValueParserSetLockPeriod(): DictionaryValue<SetLockPeriod> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSetLockPeriod(src)).endCell());
    },
    parse: src => {
      return loadSetLockPeriod(src.loadRef().beginParse());
    },
  };
}

export type SetApr = {
  $$type: "SetApr";
  queryId: bigint;
  apr: bigint;
};

export function storeSetApr(src: SetApr) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(3180424823, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeUint(src.apr, 256);
  };
}

export function loadSetApr(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 3180424823) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _apr = sc_0.loadUintBig(256);
  return { $$type: "SetApr" as const, queryId: _queryId, apr: _apr };
}

function loadTupleSetApr(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _apr = source.readBigNumber();
  return { $$type: "SetApr" as const, queryId: _queryId, apr: _apr };
}

function storeTupleSetApr(source: SetApr) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.apr);
  return builder.build();
}

function dictValueParserSetApr(): DictionaryValue<SetApr> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSetApr(src)).endCell());
    },
    parse: src => {
      return loadSetApr(src.loadRef().beginParse());
    },
  };
}

export type Attribute = {
  $$type: "Attribute";
  trait_type: string;
  value: bigint;
};

export function storeAttribute(src: Attribute) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeStringRefTail(src.trait_type);
    b_0.storeInt(src.value, 257);
  };
}

export function loadAttribute(slice: Slice) {
  const sc_0 = slice;
  const _trait_type = sc_0.loadStringRefTail();
  const _value = sc_0.loadIntBig(257);
  return { $$type: "Attribute" as const, trait_type: _trait_type, value: _value };
}

function loadTupleAttribute(source: TupleReader) {
  const _trait_type = source.readString();
  const _value = source.readBigNumber();
  return { $$type: "Attribute" as const, trait_type: _trait_type, value: _value };
}

function storeTupleAttribute(source: Attribute) {
  const builder = new TupleBuilder();
  builder.writeString(source.trait_type);
  builder.writeNumber(source.value);
  return builder.build();
}

function dictValueParserAttribute(): DictionaryValue<Attribute> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAttribute(src)).endCell());
    },
    parse: src => {
      return loadAttribute(src.loadRef().beginParse());
    },
  };
}

export type DictLoadRes = {
  $$type: "DictLoadRes";
  slice: Cell;
  dict: Cell;
};

export function storeDictLoadRes(src: DictLoadRes) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeRef(src.slice);
    b_0.storeRef(src.dict);
  };
}

export function loadDictLoadRes(slice: Slice) {
  const sc_0 = slice;
  const _slice = sc_0.loadRef();
  const _dict = sc_0.loadRef();
  return { $$type: "DictLoadRes" as const, slice: _slice, dict: _dict };
}

function loadTupleDictLoadRes(source: TupleReader) {
  const _slice = source.readCell();
  const _dict = source.readCell();
  return { $$type: "DictLoadRes" as const, slice: _slice, dict: _dict };
}

function storeTupleDictLoadRes(source: DictLoadRes) {
  const builder = new TupleBuilder();
  builder.writeSlice(source.slice);
  builder.writeCell(source.dict);
  return builder.build();
}

function dictValueParserDictLoadRes(): DictionaryValue<DictLoadRes> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDictLoadRes(src)).endCell());
    },
    parse: src => {
      return loadDictLoadRes(src.loadRef().beginParse());
    },
  };
}

export type DictGetRes = {
  $$type: "DictGetRes";
  cell: Cell;
  success: bigint;
};

export function storeDictGetRes(src: DictGetRes) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeRef(src.cell);
    b_0.storeInt(src.success, 257);
  };
}

export function loadDictGetRes(slice: Slice) {
  const sc_0 = slice;
  const _cell = sc_0.loadRef();
  const _success = sc_0.loadIntBig(257);
  return { $$type: "DictGetRes" as const, cell: _cell, success: _success };
}

function loadTupleDictGetRes(source: TupleReader) {
  const _cell = source.readCell();
  const _success = source.readBigNumber();
  return { $$type: "DictGetRes" as const, cell: _cell, success: _success };
}

function storeTupleDictGetRes(source: DictGetRes) {
  const builder = new TupleBuilder();
  builder.writeCell(source.cell);
  builder.writeNumber(source.success);
  return builder.build();
}

function dictValueParserDictGetRes(): DictionaryValue<DictGetRes> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDictGetRes(src)).endCell());
    },
    parse: src => {
      return loadDictGetRes(src.loadRef().beginParse());
    },
  };
}

type NexTon_init_args = {
  $$type: "NexTon_init_args";
  nftItemCode: Cell;
  _nft: Address;
};

function initNexTon_init_args(src: NexTon_init_args) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeRef(src.nftItemCode);
    b_0.storeAddress(src._nft);
  };
}

async function NexTon_init(nftItemCode: Cell, _nft: Address) {
  const __code = Cell.fromBase64(
    "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",
  );
  const __system = Cell.fromBase64(
    "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",
  );
  const builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initNexTon_init_args({ $$type: "NexTon_init_args", nftItemCode, _nft })(builder);
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
  8562: { message: `Item already claimed` },
  12255: { message: `Too small deposit amount, min deposit is 1 Ton` },
  20825: { message: `Invalid sender! Sent not from the nft item!` },
  40368: { message: `Contract stopped` },
  41610: { message: `Claiming not exisitng NFT` },
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
      { name: "bounced", type: { kind: "simple", type: "bool", optional: false } },
      { name: "sender", type: { kind: "simple", type: "address", optional: false } },
      { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      { name: "bounce", type: { kind: "simple", type: "bool", optional: false } },
      { name: "to", type: { kind: "simple", type: "address", optional: false } },
      { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "mode", type: { kind: "simple", type: "int", optional: false, format: 257 } },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "cashback", type: { kind: "simple", type: "address", optional: false } },
    ],
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "newOwner", type: { kind: "simple", type: "address", optional: false } },
    ],
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "newOwner", type: { kind: "simple", type: "address", optional: false } },
    ],
  },
  {
    name: "UserDeposit",
    header: 1832664797,
    fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }],
  },
  {
    name: "MintNFT",
    header: 1,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "itemIndex", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
      { name: "NFTMessage", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "ItemTransferPayload",
    header: null,
    fields: [
      { name: "owner", type: { kind: "simple", type: "address", optional: false } },
      { name: "body", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "ItemTransfer",
    header: 85167505,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "payload", type: { kind: "simple", type: "ItemTransferPayload", optional: false } },
    ],
  },
  {
    name: "ItemClaimPayload",
    header: null,
    fields: [
      { name: "itemIndex", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "owner", type: { kind: "simple", type: "address", optional: false } },
      { name: "content", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "UserClaim",
    header: 104252950,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "payload", type: { kind: "simple", type: "ItemClaimPayload", optional: false } },
    ],
  },
  {
    name: "OwnerWithdraw",
    header: 899458696,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
    ],
  },
  {
    name: "SetLockPeriod",
    header: 3849380333,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "lockPeriod", type: { kind: "simple", type: "uint", optional: false, format: 256 } },
    ],
  },
  {
    name: "SetApr",
    header: 3180424823,
    fields: [
      { name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
      { name: "apr", type: { kind: "simple", type: "uint", optional: false, format: 256 } },
    ],
  },
  {
    name: "Attribute",
    header: null,
    fields: [
      { name: "trait_type", type: { kind: "simple", type: "string", optional: false } },
      { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } },
    ],
  },
  {
    name: "DictLoadRes",
    header: null,
    fields: [
      { name: "slice", type: { kind: "simple", type: "slice", optional: false } },
      { name: "dict", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "DictGetRes",
    header: null,
    fields: [
      { name: "cell", type: { kind: "simple", type: "cell", optional: false } },
      { name: "success", type: { kind: "simple", type: "int", optional: false, format: 257 } },
    ],
  },
];

const NexTon_getters: ABIGetter[] = [
  {
    name: "NftAddressByIndex",
    arguments: [{ name: "itemIndex", type: { kind: "simple", type: "int", optional: false, format: 257 } }],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  { name: "collectionAddress", arguments: [], returnType: { kind: "simple", type: "address", optional: false } },
  { name: "staked", arguments: [], returnType: { kind: "simple", type: "int", optional: false, format: 257 } },
  { name: "nftCounter", arguments: [], returnType: { kind: "simple", type: "int", optional: false, format: 257 } },
  {
    name: "itemClaimed",
    arguments: [{ name: "index", type: { kind: "simple", type: "int", optional: false, format: 257 } }],
    returnType: { kind: "simple", type: "bool", optional: true },
  },
  { name: "lockPeriod", arguments: [], returnType: { kind: "simple", type: "int", optional: false, format: 257 } },
  { name: "balance", arguments: [], returnType: { kind: "simple", type: "int", optional: false, format: 257 } },
  {
    name: "latestStakeBlock",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  { name: "owner", arguments: [], returnType: { kind: "simple", type: "address", optional: false } },
  { name: "stopped", arguments: [], returnType: { kind: "simple", type: "bool", optional: false } },
];

const NexTon_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "empty" } },
  { receiver: "internal", message: { kind: "typed", type: "UserDeposit" } },
  { receiver: "internal", message: { kind: "typed", type: "UserClaim" } },
  { receiver: "internal", message: { kind: "typed", type: "OwnerWithdraw" } },
  { receiver: "internal", message: { kind: "typed", type: "SetLockPeriod" } },
  { receiver: "internal", message: { kind: "typed", type: "SetApr" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  { receiver: "internal", message: { kind: "typed", type: "ChangeOwner" } },
  { receiver: "internal", message: { kind: "text", text: "Resume" } },
  { receiver: "internal", message: { kind: "text", text: "Stop" } },
];

export class NexTon implements Contract {
  static async init(nftItemCode: Cell, _nft: Address) {
    return await NexTon_init(nftItemCode, _nft);
  }

  static async fromInit(nftItemCode: Cell, _nft: Address) {
    const init = await NexTon_init(nftItemCode, _nft);
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
      | UserClaim
      | OwnerWithdraw
      | SetLockPeriod
      | SetApr
      | Deploy
      | ChangeOwner
      | "Resume"
      | "Stop",
  ) {
    let body: Cell | null = null;
    if (message === null) {
      body = new Cell();
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "UserDeposit") {
      body = beginCell().store(storeUserDeposit(message)).endCell();
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "UserClaim") {
      body = beginCell().store(storeUserClaim(message)).endCell();
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "OwnerWithdraw") {
      body = beginCell().store(storeOwnerWithdraw(message)).endCell();
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "SetLockPeriod") {
      body = beginCell().store(storeSetLockPeriod(message)).endCell();
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "SetApr") {
      body = beginCell().store(storeSetApr(message)).endCell();
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "Deploy") {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "ChangeOwner") {
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

  async getNftAddressByIndex(provider: ContractProvider, itemIndex: bigint) {
    const builder = new TupleBuilder();
    builder.writeNumber(itemIndex);
    const source = (await provider.get("NftAddressByIndex", builder.build())).stack;
    const result = source.readAddress();
    return result;
  }

  async getCollectionAddress(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("collectionAddress", builder.build())).stack;
    const result = source.readAddress();
    return result;
  }

  async getStaked(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("staked", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getNftCounter(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("nftCounter", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getItemClaimed(provider: ContractProvider, index: bigint) {
    const builder = new TupleBuilder();
    builder.writeNumber(index);
    const source = (await provider.get("itemClaimed", builder.build())).stack;
    const result = source.readBooleanOpt();
    return result;
  }

  async getLockPeriod(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("lockPeriod", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getBalance(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("balance", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getLatestStakeBlock(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("latestStakeBlock", builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("owner", builder.build())).stack;
    const result = source.readAddress();
    return result;
  }

  async getStopped(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("stopped", builder.build())).stack;
    const result = source.readBoolean();
    return result;
  }
}
