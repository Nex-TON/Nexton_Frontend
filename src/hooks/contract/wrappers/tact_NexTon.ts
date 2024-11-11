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
  DictionaryValue
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
}

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
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
      },
      parse: (src) => {
          return loadStateInit(src.loadRef().beginParse());
      }
  }
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Slice;
}

export function storeContext(src: Context) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounced);
      b_0.storeAddress(src.sender);
      b_0.storeInt(src.value, 257);
      b_0.storeRef(src.raw.asCell());
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef().asSlice();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw.asCell());
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeContext(src)).endCell());
      },
      parse: (src) => {
          return loadContext(src.loadRef().beginParse());
      }
  }
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounce);
      b_0.storeAddress(src.to);
      b_0.storeInt(src.value, 257);
      b_0.storeInt(src.mode, 257);
      if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
      if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
      if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
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
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
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
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
      },
      parse: (src) => {
          return loadSendParameters(src.loadRef().beginParse());
      }
  }
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
}

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2490013878, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
      },
      parse: (src) => {
          return loadDeploy(src.loadRef().beginParse());
      }
  }
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2952335191, 32);
      b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
      },
      parse: (src) => {
          return loadDeployOk(src.loadRef().beginParse());
      }
  }
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
}

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
  if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
      },
      parse: (src) => {
          return loadFactoryDeploy(src.loadRef().beginParse());
      }
  }
}

export type ChangeOwner = {
  $$type: 'ChangeOwner';
  queryId: bigint;
  newOwner: Address;
}

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
  if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
      },
      parse: (src) => {
          return loadChangeOwner(src.loadRef().beginParse());
      }
  }
}

export type ChangeOwnerOk = {
  $$type: 'ChangeOwnerOk';
  queryId: bigint;
  newOwner: Address;
}

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
  if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
      },
      parse: (src) => {
          return loadChangeOwnerOk(src.loadRef().beginParse());
      }
  }
}

export type Stop = {
  $$type: 'Stop';
}

export function storeStop(src: Stop) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4227166658, 32);
  };
}

export function loadStop(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4227166658) { throw Error('Invalid prefix'); }
  return { $$type: 'Stop' as const };
}

function loadTupleStop(source: TupleReader) {
  return { $$type: 'Stop' as const };
}

function storeTupleStop(source: Stop) {
  let builder = new TupleBuilder();
  return builder.build();
}

function dictValueParserStop(): DictionaryValue<Stop> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeStop(src)).endCell());
      },
      parse: (src) => {
          return loadStop(src.loadRef().beginParse());
      }
  }
}

export type Resume = {
  $$type: 'Resume';
}

export function storeResume(src: Resume) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(345296265, 32);
  };
}

export function loadResume(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 345296265) { throw Error('Invalid prefix'); }
  return { $$type: 'Resume' as const };
}

function loadTupleResume(source: TupleReader) {
  return { $$type: 'Resume' as const };
}

function storeTupleResume(source: Resume) {
  let builder = new TupleBuilder();
  return builder.build();
}

function dictValueParserResume(): DictionaryValue<Resume> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeResume(src)).endCell());
      },
      parse: (src) => {
          return loadResume(src.loadRef().beginParse());
      }
  }
}

export type ClaimNotification = {
  $$type: 'ClaimNotification';
  query_id: bigint;
  payload: UserClaimPayload;
}

export function storeClaimNotification(src: ClaimNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1957844131, 32);
      b_0.storeInt(src.query_id, 257);
      let b_1 = new Builder();
      b_1.store(storeUserClaimPayload(src.payload));
      b_0.storeRef(b_1.endCell());
  };
}

export function loadClaimNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1957844131) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _payload = loadUserClaimPayload(sc_1);
  return { $$type: 'ClaimNotification' as const, query_id: _query_id, payload: _payload };
}

function loadTupleClaimNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  const _payload = loadTupleUserClaimPayload(source.readTuple());
  return { $$type: 'ClaimNotification' as const, query_id: _query_id, payload: _payload };
}

function storeTupleClaimNotification(source: ClaimNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeTuple(storeTupleUserClaimPayload(source.payload));
  return builder.build();
}

function dictValueParserClaimNotification(): DictionaryValue<ClaimNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeClaimNotification(src)).endCell());
      },
      parse: (src) => {
          return loadClaimNotification(src.loadRef().beginParse());
      }
  }
}

export type UpdateAddress = {
  $$type: 'UpdateAddress';
  addressType: string;
  newAddress: Address;
}

export function storeUpdateAddress(src: UpdateAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3948647956, 32);
      b_0.storeStringRefTail(src.addressType);
      b_0.storeAddress(src.newAddress);
  };
}

export function loadUpdateAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3948647956) { throw Error('Invalid prefix'); }
  let _addressType = sc_0.loadStringRefTail();
  let _newAddress = sc_0.loadAddress();
  return { $$type: 'UpdateAddress' as const, addressType: _addressType, newAddress: _newAddress };
}

function loadTupleUpdateAddress(source: TupleReader) {
  let _addressType = source.readString();
  let _newAddress = source.readAddress();
  return { $$type: 'UpdateAddress' as const, addressType: _addressType, newAddress: _newAddress };
}

function storeTupleUpdateAddress(source: UpdateAddress) {
  let builder = new TupleBuilder();
  builder.writeString(source.addressType);
  builder.writeAddress(source.newAddress);
  return builder.build();
}

function dictValueParserUpdateAddress(): DictionaryValue<UpdateAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUpdateAddress(src)).endCell());
      },
      parse: (src) => {
          return loadUpdateAddress(src.loadRef().beginParse());
      }
  }
}

export type UpdateJettonAddress = {
  $$type: 'UpdateJettonAddress';
  master_address: Address;
}

export function storeUpdateJettonAddress(src: UpdateJettonAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3729030174, 32);
      b_0.storeAddress(src.master_address);
  };
}

export function loadUpdateJettonAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3729030174) { throw Error('Invalid prefix'); }
  let _master_address = sc_0.loadAddress();
  return { $$type: 'UpdateJettonAddress' as const, master_address: _master_address };
}

function loadTupleUpdateJettonAddress(source: TupleReader) {
  let _master_address = source.readAddress();
  return { $$type: 'UpdateJettonAddress' as const, master_address: _master_address };
}

function storeTupleUpdateJettonAddress(source: UpdateJettonAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.master_address);
  return builder.build();
}

function dictValueParserUpdateJettonAddress(): DictionaryValue<UpdateJettonAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUpdateJettonAddress(src)).endCell());
      },
      parse: (src) => {
          return loadUpdateJettonAddress(src.loadRef().beginParse());
      }
  }
}

export type UpdateNftAddress = {
  $$type: 'UpdateNftAddress';
  collection_address: Address;
}

export function storeUpdateNftAddress(src: UpdateNftAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2444677909, 32);
      b_0.storeAddress(src.collection_address);
  };
}

export function loadUpdateNftAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2444677909) { throw Error('Invalid prefix'); }
  let _collection_address = sc_0.loadAddress();
  return { $$type: 'UpdateNftAddress' as const, collection_address: _collection_address };
}

function loadTupleUpdateNftAddress(source: TupleReader) {
  let _collection_address = source.readAddress();
  return { $$type: 'UpdateNftAddress' as const, collection_address: _collection_address };
}

function storeTupleUpdateNftAddress(source: UpdateNftAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.collection_address);
  return builder.build();
}

function dictValueParserUpdateNftAddress(): DictionaryValue<UpdateNftAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUpdateNftAddress(src)).endCell());
      },
      parse: (src) => {
          return loadUpdateNftAddress(src.loadRef().beginParse());
      }
  }
}

export type UserClaimPayload = {
  $$type: 'UserClaimPayload';
  itemIndex: bigint;
  principal: bigint;
  lockPeriod: bigint;
  lockEnd: bigint;
  owner: Address;
  content: Cell;
}

export function storeUserClaimPayload(src: UserClaimPayload) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4036021532, 32);
      b_0.storeInt(src.itemIndex, 257);
      b_0.storeInt(src.principal, 257);
      b_0.storeInt(src.lockPeriod, 257);
      let b_1 = new Builder();
      b_1.storeInt(src.lockEnd, 257);
      b_1.storeAddress(src.owner);
      b_1.storeRef(src.content);
      b_0.storeRef(b_1.endCell());
  };
}

export function loadUserClaimPayload(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4036021532) { throw Error('Invalid prefix'); }
  let _itemIndex = sc_0.loadIntBig(257);
  let _principal = sc_0.loadIntBig(257);
  let _lockPeriod = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _lockEnd = sc_1.loadIntBig(257);
  let _owner = sc_1.loadAddress();
  let _content = sc_1.loadRef();
  return { $$type: 'UserClaimPayload' as const, itemIndex: _itemIndex, principal: _principal, lockPeriod: _lockPeriod, lockEnd: _lockEnd, owner: _owner, content: _content };
}

function loadTupleUserClaimPayload(source: TupleReader) {
  let _itemIndex = source.readBigNumber();
  let _principal = source.readBigNumber();
  let _lockPeriod = source.readBigNumber();
  let _lockEnd = source.readBigNumber();
  let _owner = source.readAddress();
  let _content = source.readCell();
  return { $$type: 'UserClaimPayload' as const, itemIndex: _itemIndex, principal: _principal, lockPeriod: _lockPeriod, lockEnd: _lockEnd, owner: _owner, content: _content };
}

function storeTupleUserClaimPayload(source: UserClaimPayload) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.itemIndex);
  builder.writeNumber(source.principal);
  builder.writeNumber(source.lockPeriod);
  builder.writeNumber(source.lockEnd);
  builder.writeAddress(source.owner);
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserUserClaimPayload(): DictionaryValue<UserClaimPayload> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeUserClaimPayload(src)).endCell());
      },
      parse: (src) => {
          return loadUserClaimPayload(src.loadRef().beginParse());
      }
  }
}

export type TonDeposit = {
  $$type: 'TonDeposit';
  query_id: bigint;
  amount: bigint;
}

export function storeTonDeposit(src: TonDeposit) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1495628558, 32);
      b_0.storeInt(src.query_id, 257);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadTonDeposit(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1495628558) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadIntBig(257);
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'TonDeposit' as const, query_id: _query_id, amount: _amount };
}

function loadTupleTonDeposit(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  return { $$type: 'TonDeposit' as const, query_id: _query_id, amount: _amount };
}

function storeTupleTonDeposit(source: TonDeposit) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserTonDeposit(): DictionaryValue<TonDeposit> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTonDeposit(src)).endCell());
      },
      parse: (src) => {
          return loadTonDeposit(src.loadRef().beginParse());
      }
  }
}

export type SetLockPeriod = {
  $$type: 'SetLockPeriod';
  lockPeriod: bigint;
}

export function storeSetLockPeriod(src: SetLockPeriod) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1524785834, 32);
      b_0.storeInt(src.lockPeriod, 257);
  };
}

export function loadSetLockPeriod(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1524785834) { throw Error('Invalid prefix'); }
  let _lockPeriod = sc_0.loadIntBig(257);
  return { $$type: 'SetLockPeriod' as const, lockPeriod: _lockPeriod };
}

function loadTupleSetLockPeriod(source: TupleReader) {
  let _lockPeriod = source.readBigNumber();
  return { $$type: 'SetLockPeriod' as const, lockPeriod: _lockPeriod };
}

function storeTupleSetLockPeriod(source: SetLockPeriod) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.lockPeriod);
  return builder.build();
}

function dictValueParserSetLockPeriod(): DictionaryValue<SetLockPeriod> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetLockPeriod(src)).endCell());
      },
      parse: (src) => {
          return loadSetLockPeriod(src.loadRef().beginParse());
      }
  }
}

export type SetApr = {
  $$type: 'SetApr';
  apr: bigint;
}

export function storeSetApr(src: SetApr) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(911466692, 32);
      b_0.storeInt(src.apr, 257);
  };
}

export function loadSetApr(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 911466692) { throw Error('Invalid prefix'); }
  let _apr = sc_0.loadIntBig(257);
  return { $$type: 'SetApr' as const, apr: _apr };
}

function loadTupleSetApr(source: TupleReader) {
  let _apr = source.readBigNumber();
  return { $$type: 'SetApr' as const, apr: _apr };
}

function storeTupleSetApr(source: SetApr) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.apr);
  return builder.build();
}

function dictValueParserSetApr(): DictionaryValue<SetApr> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetApr(src)).endCell());
      },
      parse: (src) => {
          return loadSetApr(src.loadRef().beginParse());
      }
  }
}

export type MintNFT = {
  $$type: 'MintNFT';
  query_id: bigint;
  itemIndex: bigint;
  amount: bigint;
  NFTMessage: Cell;
}

export function storeMintNFT(src: MintNFT) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1, 32);
      b_0.storeInt(src.query_id, 257);
      b_0.storeInt(src.itemIndex, 257);
      b_0.storeInt(src.amount, 257);
      b_0.storeRef(src.NFTMessage);
  };
}

export function loadMintNFT(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadIntBig(257);
  let _itemIndex = sc_0.loadIntBig(257);
  let _amount = sc_0.loadIntBig(257);
  let _NFTMessage = sc_0.loadRef();
  return { $$type: 'MintNFT' as const, query_id: _query_id, itemIndex: _itemIndex, amount: _amount, NFTMessage: _NFTMessage };
}

function loadTupleMintNFT(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _itemIndex = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _NFTMessage = source.readCell();
  return { $$type: 'MintNFT' as const, query_id: _query_id, itemIndex: _itemIndex, amount: _amount, NFTMessage: _NFTMessage };
}

function storeTupleMintNFT(source: MintNFT) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.itemIndex);
  builder.writeNumber(source.amount);
  builder.writeCell(source.NFTMessage);
  return builder.build();
}

function dictValueParserMintNFT(): DictionaryValue<MintNFT> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeMintNFT(src)).endCell());
      },
      parse: (src) => {
          return loadMintNFT(src.loadRef().beginParse());
      }
  }
}

export type TonOwnerWithdraw = {
  $$type: 'TonOwnerWithdraw';
  query_id: bigint;
  amount: bigint;
}

export function storeTonOwnerWithdraw(src: TonOwnerWithdraw) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3183304671, 32);
      b_0.storeInt(src.query_id, 257);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadTonOwnerWithdraw(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3183304671) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadIntBig(257);
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'TonOwnerWithdraw' as const, query_id: _query_id, amount: _amount };
}

function loadTupleTonOwnerWithdraw(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  return { $$type: 'TonOwnerWithdraw' as const, query_id: _query_id, amount: _amount };
}

function storeTupleTonOwnerWithdraw(source: TonOwnerWithdraw) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserTonOwnerWithdraw(): DictionaryValue<TonOwnerWithdraw> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTonOwnerWithdraw(src)).endCell());
      },
      parse: (src) => {
          return loadTonOwnerWithdraw(src.loadRef().beginParse());
      }
  }
}

export type JettonOwnerWithdraw = {
  $$type: 'JettonOwnerWithdraw';
  query_id: bigint;
  amount: bigint;
}

export function storeJettonOwnerWithdraw(src: JettonOwnerWithdraw) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1477822007, 32);
      b_0.storeInt(src.query_id, 257);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadJettonOwnerWithdraw(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1477822007) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadIntBig(257);
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'JettonOwnerWithdraw' as const, query_id: _query_id, amount: _amount };
}

function loadTupleJettonOwnerWithdraw(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  return { $$type: 'JettonOwnerWithdraw' as const, query_id: _query_id, amount: _amount };
}

function storeTupleJettonOwnerWithdraw(source: JettonOwnerWithdraw) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserJettonOwnerWithdraw(): DictionaryValue<JettonOwnerWithdraw> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonOwnerWithdraw(src)).endCell());
      },
      parse: (src) => {
          return loadJettonOwnerWithdraw(src.loadRef().beginParse());
      }
  }
}

export type TonUnstakeNotification = {
  $$type: 'TonUnstakeNotification';
  amount: bigint;
}

export function storeTonUnstakeNotification(src: TonUnstakeNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(103743304, 32);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadTonUnstakeNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 103743304) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'TonUnstakeNotification' as const, amount: _amount };
}

function loadTupleTonUnstakeNotification(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'TonUnstakeNotification' as const, amount: _amount };
}

function storeTupleTonUnstakeNotification(source: TonUnstakeNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserTonUnstakeNotification(): DictionaryValue<TonUnstakeNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTonUnstakeNotification(src)).endCell());
      },
      parse: (src) => {
          return loadTonUnstakeNotification(src.loadRef().beginParse());
      }
  }
}

export type NxtonUnstakeNotification = {
  $$type: 'NxtonUnstakeNotification';
  amount: bigint;
}

export function storeNxtonUnstakeNotification(src: NxtonUnstakeNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2411009689, 32);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadNxtonUnstakeNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2411009689) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'NxtonUnstakeNotification' as const, amount: _amount };
}

function loadTupleNxtonUnstakeNotification(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'NxtonUnstakeNotification' as const, amount: _amount };
}

function storeTupleNxtonUnstakeNotification(source: NxtonUnstakeNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserNxtonUnstakeNotification(): DictionaryValue<NxtonUnstakeNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeNxtonUnstakeNotification(src)).endCell());
      },
      parse: (src) => {
          return loadNxtonUnstakeNotification(src.loadRef().beginParse());
      }
  }
}

export type JettonData = {
  $$type: 'JettonData';
  total_supply: bigint;
  mintable: boolean;
  owner: Address;
  content: Cell;
  wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.total_supply, 257);
      b_0.storeBit(src.mintable);
      b_0.storeAddress(src.owner);
      b_0.storeRef(src.content);
      b_0.storeRef(src.wallet_code);
  };
}

export function loadJettonData(slice: Slice) {
  let sc_0 = slice;
  let _total_supply = sc_0.loadIntBig(257);
  let _mintable = sc_0.loadBit();
  let _owner = sc_0.loadAddress();
  let _content = sc_0.loadRef();
  let _wallet_code = sc_0.loadRef();
  return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
  let _total_supply = source.readBigNumber();
  let _mintable = source.readBoolean();
  let _owner = source.readAddress();
  let _content = source.readCell();
  let _wallet_code = source.readCell();
  return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.total_supply);
  builder.writeBoolean(source.mintable);
  builder.writeAddress(source.owner);
  builder.writeCell(source.content);
  builder.writeCell(source.wallet_code);
  return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
      },
      parse: (src) => {
          return loadJettonData(src.loadRef().beginParse());
      }
  }
}

export type JettonWalletData = {
  $$type: 'JettonWalletData';
  balance: bigint;
  owner: Address;
  master: Address;
  code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.balance, 257);
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.master);
      b_0.storeRef(src.code);
  };
}

export function loadJettonWalletData(slice: Slice) {
  let sc_0 = slice;
  let _balance = sc_0.loadIntBig(257);
  let _owner = sc_0.loadAddress();
  let _master = sc_0.loadAddress();
  let _code = sc_0.loadRef();
  return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
  let _balance = source.readBigNumber();
  let _owner = source.readAddress();
  let _master = source.readAddress();
  let _code = source.readCell();
  return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.balance);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.master);
  builder.writeCell(source.code);
  return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
      },
      parse: (src) => {
          return loadJettonWalletData(src.loadRef().beginParse());
      }
  }
}

export type MintFromLending = {
  $$type: 'MintFromLending';
  amount: bigint;
  receiver: Address;
}

export function storeMintFromLending(src: MintFromLending) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(26388776, 32);
      b_0.storeInt(src.amount, 257);
      b_0.storeAddress(src.receiver);
  };
}

export function loadMintFromLending(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 26388776) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  let _receiver = sc_0.loadAddress();
  return { $$type: 'MintFromLending' as const, amount: _amount, receiver: _receiver };
}

function loadTupleMintFromLending(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _receiver = source.readAddress();
  return { $$type: 'MintFromLending' as const, amount: _amount, receiver: _receiver };
}

function storeTupleMintFromLending(source: MintFromLending) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeAddress(source.receiver);
  return builder.build();
}

function dictValueParserMintFromLending(): DictionaryValue<MintFromLending> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeMintFromLending(src)).endCell());
      },
      parse: (src) => {
          return loadMintFromLending(src.loadRef().beginParse());
      }
  }
}

export type Mint = {
  $$type: 'Mint';
  amount: bigint;
  receiver: Address;
}

export function storeMint(src: Mint) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4235234258, 32);
      b_0.storeInt(src.amount, 257);
      b_0.storeAddress(src.receiver);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4235234258) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  let _receiver = sc_0.loadAddress();
  return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _receiver = source.readAddress();
  return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeAddress(source.receiver);
  return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeMint(src)).endCell());
      },
      parse: (src) => {
          return loadMint(src.loadRef().beginParse());
      }
  }
}

export type TokenTransfer = {
  $$type: 'TokenTransfer';
  query_id: bigint;
  amount: bigint;
  sender: Address;
  response_destination: Address | null;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Slice;
}

export function storeTokenTransfer(src: TokenTransfer) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(260734629, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.sender);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _response_destination = sc_0.loadMaybeAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0;
  return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _response_destination = source.readAddressOpt();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell().asSlice();
  return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload.asCell());
  return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransfer(src.loadRef().beginParse());
      }
  }
}

export type TokenTransferInternal = {
  $$type: 'TokenTransferInternal';
  query_id: bigint;
  amount: bigint;
  from: Address;
  response_destination: Address | null;
  forward_ton_amount: bigint;
  forward_payload: Slice;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(395134233, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.from);
      b_0.storeAddress(src.response_destination);
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransferInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _response_destination = sc_0.loadMaybeAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0;
  return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _response_destination = source.readAddressOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell().asSlice();
  return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeAddress(source.response_destination);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload.asCell());
  return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
      },
      parse: (src) => {
          return loadTokenTransferInternal(src.loadRef().beginParse());
      }
  }
}

export type TokenNotification = {
  $$type: 'TokenNotification';
  query_id: bigint;
  amount: bigint;
  from: Address;
  forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1935855772, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.from);
      b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _forward_payload = sc_0;
  return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _forward_payload = source.readCell().asSlice();
  return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeSlice(source.forward_payload.asCell());
  return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
      },
      parse: (src) => {
          return loadTokenNotification(src.loadRef().beginParse());
      }
  }
}

export type TokenBurn = {
  $$type: 'TokenBurn';
  query_id: bigint;
  amount: bigint;
  response_destination: Address | null;
  custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1499400124, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
  };
}

export function loadTokenBurn(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _response_destination = sc_0.loadMaybeAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _response_destination = source.readAddressOpt();
  let _custom_payload = source.readCellOpt();
  return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
      },
      parse: (src) => {
          return loadTokenBurn(src.loadRef().beginParse());
      }
  }
}

export type TokenBurnNotification = {
  $$type: 'TokenBurnNotification';
  query_id: bigint;
  amount: bigint;
  sender: Address;
  response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2078119902, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.sender);
      b_0.storeAddress(src.response_destination);
  };
}

export function loadTokenBurnNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _response_destination = sc_0.loadMaybeAddress();
  return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _response_destination = source.readAddressOpt();
  return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeAddress(source.response_destination);
  return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
      },
      parse: (src) => {
          return loadTokenBurnNotification(src.loadRef().beginParse());
      }
  }
}

export type TokenExcesses = {
  $$type: 'TokenExcesses';
  query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3576854235, 32);
      b_0.storeUint(src.query_id, 64);
  };
}

export function loadTokenExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
      },
      parse: (src) => {
          return loadTokenExcesses(src.loadRef().beginParse());
      }
  }
}

export type TokenUpdateContent = {
  $$type: 'TokenUpdateContent';
  content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2937889386, 32);
      b_0.storeRef(src.content);
  };
}

export function loadTokenUpdateContent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
  let _content = sc_0.loadRef();
  return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
  let _content = source.readCell();
  return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
  let builder = new TupleBuilder();
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
      },
      parse: (src) => {
          return loadTokenUpdateContent(src.loadRef().beginParse());
      }
  }
}

export type ProvideWalletAddress = {
  $$type: 'ProvideWalletAddress';
  query_id: bigint;
  owner_address: Address;
  include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(745978227, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeAddress(src.owner_address);
      b_0.storeBit(src.include_address);
  };
}

export function loadProvideWalletAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _owner_address = sc_0.loadAddress();
  let _include_address = sc_0.loadBit();
  return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _owner_address = source.readAddress();
  let _include_address = source.readBoolean();
  return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.owner_address);
  builder.writeBoolean(source.include_address);
  return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
      },
      parse: (src) => {
          return loadProvideWalletAddress(src.loadRef().beginParse());
      }
  }
}

export type TakeWalletAddress = {
  $$type: 'TakeWalletAddress';
  query_id: bigint;
  wallet_address: Address;
  owner_address: Slice;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3513996288, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeAddress(src.wallet_address);
      b_0.storeBuilder(src.owner_address.asBuilder());
  };
}

export function loadTakeWalletAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _wallet_address = sc_0.loadAddress();
  let _owner_address = sc_0;
  return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _wallet_address = source.readAddress();
  let _owner_address = source.readCell().asSlice();
  return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.wallet_address);
  builder.writeSlice(source.owner_address.asCell());
  return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
      },
      parse: (src) => {
          return loadTakeWalletAddress(src.loadRef().beginParse());
      }
  }
}

export type SetLendingAddress = {
  $$type: 'SetLendingAddress';
  new_address: Address;
}

export function storeSetLendingAddress(src: SetLendingAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(907093053, 32);
      b_0.storeAddress(src.new_address);
  };
}

export function loadSetLendingAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 907093053) { throw Error('Invalid prefix'); }
  let _new_address = sc_0.loadAddress();
  return { $$type: 'SetLendingAddress' as const, new_address: _new_address };
}

function loadTupleSetLendingAddress(source: TupleReader) {
  let _new_address = source.readAddress();
  return { $$type: 'SetLendingAddress' as const, new_address: _new_address };
}

function storeTupleSetLendingAddress(source: SetLendingAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.new_address);
  return builder.build();
}

function dictValueParserSetLendingAddress(): DictionaryValue<SetLendingAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetLendingAddress(src)).endCell());
      },
      parse: (src) => {
          return loadSetLendingAddress(src.loadRef().beginParse());
      }
  }
}

export type DictLoadRes = {
  $$type: 'DictLoadRes';
  slice: Slice;
  dict: Cell;
}

export function storeDictLoadRes(src: DictLoadRes) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.slice.asCell());
      b_0.storeRef(src.dict);
  };
}

export function loadDictLoadRes(slice: Slice) {
  let sc_0 = slice;
  let _slice = sc_0.loadRef().asSlice();
  let _dict = sc_0.loadRef();
  return { $$type: 'DictLoadRes' as const, slice: _slice, dict: _dict };
}

function loadTupleDictLoadRes(source: TupleReader) {
  let _slice = source.readCell().asSlice();
  let _dict = source.readCell();
  return { $$type: 'DictLoadRes' as const, slice: _slice, dict: _dict };
}

function storeTupleDictLoadRes(source: DictLoadRes) {
  let builder = new TupleBuilder();
  builder.writeSlice(source.slice.asCell());
  builder.writeCell(source.dict);
  return builder.build();
}

function dictValueParserDictLoadRes(): DictionaryValue<DictLoadRes> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDictLoadRes(src)).endCell());
      },
      parse: (src) => {
          return loadDictLoadRes(src.loadRef().beginParse());
      }
  }
}

export type DictGetRes = {
  $$type: 'DictGetRes';
  cell: Cell;
  success: bigint;
}

export function storeDictGetRes(src: DictGetRes) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.cell);
      b_0.storeInt(src.success, 257);
  };
}

export function loadDictGetRes(slice: Slice) {
  let sc_0 = slice;
  let _cell = sc_0.loadRef();
  let _success = sc_0.loadIntBig(257);
  return { $$type: 'DictGetRes' as const, cell: _cell, success: _success };
}

function loadTupleDictGetRes(source: TupleReader) {
  let _cell = source.readCell();
  let _success = source.readBigNumber();
  return { $$type: 'DictGetRes' as const, cell: _cell, success: _success };
}

function storeTupleDictGetRes(source: DictGetRes) {
  let builder = new TupleBuilder();
  builder.writeCell(source.cell);
  builder.writeNumber(source.success);
  return builder.build();
}

function dictValueParserDictGetRes(): DictionaryValue<DictGetRes> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDictGetRes(src)).endCell());
      },
      parse: (src) => {
          return loadDictGetRes(src.loadRef().beginParse());
      }
  }
}

type NexTon_init_args = {
  $$type: 'NexTon_init_args';
  nftItemCode: Cell;
  _nft: Address;
  jettonWalletCode: Cell;
  _jetton: Address;
}

function initNexTon_init_args(src: NexTon_init_args) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.nftItemCode);
      b_0.storeAddress(src._nft);
      b_0.storeRef(src.jettonWalletCode);
      b_0.storeAddress(src._jetton);
  };
}

async function NexTon_init(nftItemCode: Cell, _nft: Address, jettonWalletCode: Cell, _jetton: Address) {
  const __code = Cell.fromBase64('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');
  const __system = Cell.fromBase64('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');
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initNexTon_init_args({ $$type: 'NexTon_init_args', nftItemCode, _nft, jettonWalletCode, _jetton })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const NexTon_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
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
  6823: { message: `Wrong Wallet Address sender` },
  10285: { message: `Wallet Address already set` },
  12255: { message: `Too small deposit amount, min deposit is 1 Ton` },
  15601: { message: `Not enough Ton to process withdraw` },
  20825: { message: `Invalid sender! Sent not from the nft item!` },
  21865: { message: `Claiming not existing NFT` },
  28548: { message: `Invalid transfer notification sender!` },
  40368: { message: `Contract stopped` },
  50377: { message: `Invalid TON amount` },
  53296: { message: `Contract not stopped` },
}

const NexTon_types: ABIType[] = [
  {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
  {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"Stop","header":4227166658,"fields":[]},
  {"name":"Resume","header":345296265,"fields":[]},
  {"name":"ClaimNotification","header":1957844131,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"payload","type":{"kind":"simple","type":"UserClaimPayload","optional":false}}]},
  {"name":"UpdateAddress","header":3948647956,"fields":[{"name":"addressType","type":{"kind":"simple","type":"string","optional":false}},{"name":"newAddress","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"UpdateJettonAddress","header":3729030174,"fields":[{"name":"master_address","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"UpdateNftAddress","header":2444677909,"fields":[{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"UserClaimPayload","header":4036021532,"fields":[{"name":"itemIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"principal","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lockPeriod","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lockEnd","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"TonDeposit","header":1495628558,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"SetLockPeriod","header":1524785834,"fields":[{"name":"lockPeriod","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"SetApr","header":911466692,"fields":[{"name":"apr","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"MintNFT","header":1,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"itemIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"NFTMessage","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"TonOwnerWithdraw","header":3183304671,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"JettonOwnerWithdraw","header":1477822007,"fields":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"TonUnstakeNotification","header":103743304,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"NxtonUnstakeNotification","header":2411009689,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"MintFromLending","header":26388776,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
  {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
  {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
  {"name":"SetLendingAddress","header":907093053,"fields":[{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"DictLoadRes","header":null,"fields":[{"name":"slice","type":{"kind":"simple","type":"slice","optional":false}},{"name":"dict","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"DictGetRes","header":null,"fields":[{"name":"cell","type":{"kind":"simple","type":"cell","optional":false}},{"name":"success","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const NexTon_getters: ABIGetter[] = [
  {"name":"nftAddressByIndex","arguments":[{"name":"itemIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"walletAddressByOwner","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"collectionAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"jettonAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"myJettonWallet","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"staked","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"tonStaked","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"nxtonStaked","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"nftCounter","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"lockPeriod","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"apr","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

export const NexTon_getterMapping: { [key: string]: string } = {
  'nftAddressByIndex': 'getNftAddressByIndex',
  'walletAddressByOwner': 'getWalletAddressByOwner',
  'collectionAddress': 'getCollectionAddress',
  'jettonAddress': 'getJettonAddress',
  'myJettonWallet': 'getMyJettonWallet',
  'staked': 'getStaked',
  'tonStaked': 'getTonStaked',
  'nxtonStaked': 'getNxtonStaked',
  'nftCounter': 'getNftCounter',
  'lockPeriod': 'getLockPeriod',
  'apr': 'getApr',
  'owner': 'getOwner',
  'stopped': 'getStopped',
}

const NexTon_receivers: ABIReceiver[] = [
  {"receiver":"internal","message":{"kind":"empty"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TonDeposit"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TakeWalletAddress"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
  {"receiver":"internal","message":{"kind":"typed","type":"ClaimNotification"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateJettonAddress"}},
  {"receiver":"internal","message":{"kind":"typed","type":"UpdateNftAddress"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TonOwnerWithdraw"}},
  {"receiver":"internal","message":{"kind":"typed","type":"JettonOwnerWithdraw"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetLockPeriod"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetApr"}},
  {"receiver":"internal","message":{"kind":"typed","type":"TonUnstakeNotification"}},
  {"receiver":"internal","message":{"kind":"typed","type":"NxtonUnstakeNotification"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
  {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
  {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
  {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
]

export class NexTon implements Contract {
  
  static async init(nftItemCode: Cell, _nft: Address, jettonWalletCode: Cell, _jetton: Address) {
      return await NexTon_init(nftItemCode, _nft, jettonWalletCode, _jetton);
  }
  
  static async fromInit(nftItemCode: Cell, _nft: Address, jettonWalletCode: Cell, _jetton: Address) {
      const init = await NexTon_init(nftItemCode, _nft, jettonWalletCode, _jetton);
      const address = contractAddress(0, init);
      return new NexTon(address, init);
  }
  
  static fromAddress(address: Address) {
      return new NexTon(address);
  }
  
  readonly address: Address; 
  readonly init?: { code: Cell, data: Cell };
  readonly abi: ContractABI = {
      types:  NexTon_types,
      getters: NexTon_getters,
      receivers: NexTon_receivers,
      errors: NexTon_errors,
  };
  
  private constructor(address: Address, init?: { code: Cell, data: Cell }) {
      this.address = address;
      this.init = init;
  }
  
  async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | TonDeposit | TakeWalletAddress | TokenNotification | ClaimNotification | UpdateJettonAddress | UpdateNftAddress | TonOwnerWithdraw | JettonOwnerWithdraw | SetLockPeriod | SetApr | TonUnstakeNotification | NxtonUnstakeNotification | Deploy | ChangeOwner | 'Resume' | 'Stop') {
      
      let body: Cell | null = null;
      if (message === null) {
          body = new Cell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TonDeposit') {
          body = beginCell().store(storeTonDeposit(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TakeWalletAddress') {
          body = beginCell().store(storeTakeWalletAddress(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
          body = beginCell().store(storeTokenNotification(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimNotification') {
          body = beginCell().store(storeClaimNotification(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateJettonAddress') {
          body = beginCell().store(storeUpdateJettonAddress(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateNftAddress') {
          body = beginCell().store(storeUpdateNftAddress(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TonOwnerWithdraw') {
          body = beginCell().store(storeTonOwnerWithdraw(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonOwnerWithdraw') {
          body = beginCell().store(storeJettonOwnerWithdraw(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetLockPeriod') {
          body = beginCell().store(storeSetLockPeriod(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetApr') {
          body = beginCell().store(storeSetApr(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TonUnstakeNotification') {
          body = beginCell().store(storeTonUnstakeNotification(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NxtonUnstakeNotification') {
          body = beginCell().store(storeNxtonUnstakeNotification(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
          body = beginCell().store(storeDeploy(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
          body = beginCell().store(storeChangeOwner(message)).endCell();
      }
      if (message === 'Resume') {
          body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
      }
      if (message === 'Stop') {
          body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
      }
      if (body === null) { throw new Error('Invalid message type'); }
      
      await provider.internal(via, { ...args, body: body });
      
  }
  
  async getNftAddressByIndex(provider: ContractProvider, itemIndex: bigint) {
      let builder = new TupleBuilder();
      builder.writeNumber(itemIndex);
      let source = (await provider.get('nftAddressByIndex', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getWalletAddressByOwner(provider: ContractProvider, owner: Address) {
      let builder = new TupleBuilder();
      builder.writeAddress(owner);
      let source = (await provider.get('walletAddressByOwner', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getCollectionAddress(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('collectionAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getJettonAddress(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('jettonAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getMyJettonWallet(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('myJettonWallet', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getStaked(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('staked', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getTonStaked(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('tonStaked', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getNxtonStaked(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('nxtonStaked', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getNftCounter(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('nftCounter', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getLockPeriod(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('lockPeriod', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getApr(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('apr', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getOwner(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('owner', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getStopped(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('stopped', builder.build())).stack;
      let result = source.readBoolean();
      return result;
  }
  
}