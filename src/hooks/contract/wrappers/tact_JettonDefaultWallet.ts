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
  } from "@ton/core";
  import { b } from "vitest/dist/suite-IbNSsUWN.js";
  
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
  
  function loadGetterTupleStateInit(source: TupleReader) {
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
      serialize: (src, builder) => {
        builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
      },
      parse: src => {
        return loadStateInit(src.loadRef().beginParse());
      },
    };
  }
  
  export type StdAddress = {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
  };
  
  export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.workchain, 8);
      b_0.storeUint(src.address, 256);
    };
  }
  
  export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: "StdAddress" as const, workchain: _workchain, address: _address };
  }
  
  function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: "StdAddress" as const, workchain: _workchain, address: _address };
  }
  
  function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: "StdAddress" as const, workchain: _workchain, address: _address };
  }
  
  function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
  }
  
  function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
      serialize: (src, builder) => {
        builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
      },
      parse: src => {
        return loadStdAddress(src.loadRef().beginParse());
      },
    };
  }
  
  export type VarAddress = {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
  };
  
  export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.workchain, 32);
      b_0.storeRef(src.address.asCell());
    };
  }
  
  export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: "VarAddress" as const, workchain: _workchain, address: _address };
  }
  
  function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: "VarAddress" as const, workchain: _workchain, address: _address };
  }
  
  function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: "VarAddress" as const, workchain: _workchain, address: _address };
  }
  
  function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
  }
  
  function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
      serialize: (src, builder) => {
        builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
      },
      parse: src => {
        return loadVarAddress(src.loadRef().beginParse());
      },
    };
  }
  
  export type Context = {
    $$type: "Context";
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
  };
  
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
    return { $$type: "Context" as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
  }
  
  function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: "Context" as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
  }
  
  function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: "Context" as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
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
  
  function loadGetterTupleSendParameters(source: TupleReader) {
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
      serialize: (src, builder) => {
        builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
      },
      parse: src => {
        return loadSendParameters(src.loadRef().beginParse());
      },
    };
  }
  
  export type JettonDefaultWallet$Data = {
    $$type: "JettonDefaultWallet$Data";
    balance: bigint;
    owner: Address;
    master: Address;
  };
  
  export function storeJettonDefaultWallet$Data(src: JettonDefaultWallet$Data) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeCoins(src.balance);
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.master);
    };
  }
  
  export function loadJettonDefaultWallet$Data(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    return { $$type: "JettonDefaultWallet$Data" as const, balance: _balance, owner: _owner, master: _master };
  }
  
  function loadTupleJettonDefaultWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    return { $$type: "JettonDefaultWallet$Data" as const, balance: _balance, owner: _owner, master: _master };
  }
  
  function loadGetterTupleJettonDefaultWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    return { $$type: "JettonDefaultWallet$Data" as const, balance: _balance, owner: _owner, master: _master };
  }
  
  function storeTupleJettonDefaultWallet$Data(source: JettonDefaultWallet$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    return builder.build();
  }
  
  function dictValueParserJettonDefaultWallet$Data(): DictionaryValue<JettonDefaultWallet$Data> {
    return {
      serialize: (src, builder) => {
        builder.storeRef(beginCell().store(storeJettonDefaultWallet$Data(src)).endCell());
      },
      parse: src => {
        return loadJettonDefaultWallet$Data(src.loadRef().beginParse());
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
    return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner };
  }
  
  function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner };
  }
  
  function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner };
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
    return { $$type: "ChangeOwnerOk" as const, queryId: _queryId, newOwner: _newOwner };
  }
  
  function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: "ChangeOwnerOk" as const, queryId: _queryId, newOwner: _newOwner };
  }
  
  function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: "ChangeOwnerOk" as const, queryId: _queryId, newOwner: _newOwner };
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
      parse: src => {
        return loadChangeOwnerOk(src.loadRef().beginParse());
      },
    };
  }
  
  export type JettonData = {
    $$type: "JettonData";
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
  };
  
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
    return {
      $$type: "JettonData" as const,
      total_supply: _total_supply,
      mintable: _mintable,
      owner: _owner,
      content: _content,
      wallet_code: _wallet_code,
    };
  }
  
  function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return {
      $$type: "JettonData" as const,
      total_supply: _total_supply,
      mintable: _mintable,
      owner: _owner,
      content: _content,
      wallet_code: _wallet_code,
    };
  }
  
  function loadGetterTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return {
      $$type: "JettonData" as const,
      total_supply: _total_supply,
      mintable: _mintable,
      owner: _owner,
      content: _content,
      wallet_code: _wallet_code,
    };
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
      parse: src => {
        return loadJettonData(src.loadRef().beginParse());
      },
    };
  }
  
  export type JettonWalletData = {
    $$type: "JettonWalletData";
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
  };
  
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
    return { $$type: "JettonWalletData" as const, balance: _balance, owner: _owner, master: _master, code: _code };
  }
  
  function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: "JettonWalletData" as const, balance: _balance, owner: _owner, master: _master, code: _code };
  }
  
  function loadGetterTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: "JettonWalletData" as const, balance: _balance, owner: _owner, master: _master, code: _code };
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
      parse: src => {
        return loadJettonWalletData(src.loadRef().beginParse());
      },
    };
  }
  
  export type MintFromLending = {
    $$type: "MintFromLending";
    amount: bigint;
    receiver: Address;
  };
  
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
    if (sc_0.loadUint(32) !== 26388776) {
      throw Error("Invalid prefix");
    }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: "MintFromLending" as const, amount: _amount, receiver: _receiver };
  }
  
  function loadTupleMintFromLending(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: "MintFromLending" as const, amount: _amount, receiver: _receiver };
  }
  
  function loadGetterTupleMintFromLending(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: "MintFromLending" as const, amount: _amount, receiver: _receiver };
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
      parse: src => {
        return loadMintFromLending(src.loadRef().beginParse());
      },
    };
  }
  
  export type Mint = {
    $$type: "Mint";
    amount: bigint;
    receiver: Address;
  };
  
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
    if (sc_0.loadUint(32) !== 4235234258) {
      throw Error("Invalid prefix");
    }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: "Mint" as const, amount: _amount, receiver: _receiver };
  }
  
  function loadTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: "Mint" as const, amount: _amount, receiver: _receiver };
  }
  
  function loadGetterTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: "Mint" as const, amount: _amount, receiver: _receiver };
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
      parse: src => {
        return loadMint(src.loadRef().beginParse());
      },
    };
  }
  
  export type TokenTransfer = {
    $$type: "TokenTransfer";
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
  };
  
  export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(260734629, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.sender);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) {
        b_0.storeBit(true).storeRef(src.custom_payload);
      } else {
        b_0.storeBit(false);
      }
      b_0.storeCoins(src.forward_ton_amount);
      b_0.storeBuilder(src.forward_payload.asBuilder());
    };
  }
  
  export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
      throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return {
      $$type: "TokenTransfer" as const,
      query_id: _query_id,
      amount: _amount,
      sender: _sender,
      response_destination: _response_destination,
      custom_payload: _custom_payload,
      forward_ton_amount: _forward_ton_amount,
      forward_payload: _forward_payload,
    };
  }
  
  function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return {
      $$type: "TokenTransfer" as const,
      query_id: _query_id,
      amount: _amount,
      sender: _sender,
      response_destination: _response_destination,
      custom_payload: _custom_payload,
      forward_ton_amount: _forward_ton_amount,
      forward_payload: _forward_payload,
    };
  }
  
  function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return {
      $$type: "TokenTransfer" as const,
      query_id: _query_id,
      amount: _amount,
      sender: _sender,
      response_destination: _response_destination,
      custom_payload: _custom_payload,
      forward_ton_amount: _forward_ton_amount,
      forward_payload: _forward_payload,
    };
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
      parse: src => {
        return loadTokenTransfer(src.loadRef().beginParse());
      },
    };
  }
  
  export type TokenTransferInternal = {
    $$type: "TokenTransferInternal";
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
  };
  
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
    if (sc_0.loadUint(32) !== 395134233) {
      throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return {
      $$type: "TokenTransferInternal" as const,
      query_id: _query_id,
      amount: _amount,
      from: _from,
      response_destination: _response_destination,
      forward_ton_amount: _forward_ton_amount,
      forward_payload: _forward_payload,
    };
  }
  
  function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return {
      $$type: "TokenTransferInternal" as const,
      query_id: _query_id,
      amount: _amount,
      from: _from,
      response_destination: _response_destination,
      forward_ton_amount: _forward_ton_amount,
      forward_payload: _forward_payload,
    };
  }
  
  function loadGetterTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return {
      $$type: "TokenTransferInternal" as const,
      query_id: _query_id,
      amount: _amount,
      from: _from,
      response_destination: _response_destination,
      forward_ton_amount: _forward_ton_amount,
      forward_payload: _forward_payload,
    };
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
      parse: src => {
        return loadTokenTransferInternal(src.loadRef().beginParse());
      },
    };
  }
  
  export type TokenNotification = {
    $$type: "TokenNotification";
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
  };
  
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
    if (sc_0.loadUint(32) !== 1935855772) {
      throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return {
      $$type: "TokenNotification" as const,
      query_id: _query_id,
      amount: _amount,
      from: _from,
      forward_payload: _forward_payload,
    };
  }
  
  function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return {
      $$type: "TokenNotification" as const,
      query_id: _query_id,
      amount: _amount,
      from: _from,
      forward_payload: _forward_payload,
    };
  }
  
  function loadGetterTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return {
      $$type: "TokenNotification" as const,
      query_id: _query_id,
      amount: _amount,
      from: _from,
      forward_payload: _forward_payload,
    };
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
      parse: src => {
        return loadTokenNotification(src.loadRef().beginParse());
      },
    };
  }
  
  export type TokenBurn = {
    $$type: "TokenBurn";
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
  };
  
  export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1499400124, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) {
        b_0.storeBit(true).storeRef(src.custom_payload);
      } else {
        b_0.storeBit(false);
      }
    };
  }
  
  export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) {
      throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return {
      $$type: "TokenBurn" as const,
      query_id: _query_id,
      amount: _amount,
      response_destination: _response_destination,
      custom_payload: _custom_payload,
    };
  }
  
  function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return {
      $$type: "TokenBurn" as const,
      query_id: _query_id,
      amount: _amount,
      response_destination: _response_destination,
      custom_payload: _custom_payload,
    };
  }
  
  function loadGetterTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return {
      $$type: "TokenBurn" as const,
      query_id: _query_id,
      amount: _amount,
      response_destination: _response_destination,
      custom_payload: _custom_payload,
    };
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
      parse: src => {
        return loadTokenBurn(src.loadRef().beginParse());
      },
    };
  }
  
  export type TokenBurnNotification = {
    $$type: "TokenBurnNotification";
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
  };
  
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
    if (sc_0.loadUint(32) !== 2078119902) {
      throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return {
      $$type: "TokenBurnNotification" as const,
      query_id: _query_id,
      amount: _amount,
      sender: _sender,
      response_destination: _response_destination,
    };
  }
  
  function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return {
      $$type: "TokenBurnNotification" as const,
      query_id: _query_id,
      amount: _amount,
      sender: _sender,
      response_destination: _response_destination,
    };
  }
  
  function loadGetterTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return {
      $$type: "TokenBurnNotification" as const,
      query_id: _query_id,
      amount: _amount,
      sender: _sender,
      response_destination: _response_destination,
    };
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
      parse: src => {
        return loadTokenBurnNotification(src.loadRef().beginParse());
      },
    };
  }
  
  export type TokenExcesses = {
    $$type: "TokenExcesses";
    query_id: bigint;
  };
  
  export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3576854235, 32);
      b_0.storeUint(src.query_id, 64);
    };
  }
  
  export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
      throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: "TokenExcesses" as const, query_id: _query_id };
  }
  
  function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: "TokenExcesses" as const, query_id: _query_id };
  }
  
  function loadGetterTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: "TokenExcesses" as const, query_id: _query_id };
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
      parse: src => {
        return loadTokenExcesses(src.loadRef().beginParse());
      },
    };
  }
  
  export type TokenUpdateContent = {
    $$type: "TokenUpdateContent";
    content: Cell;
  };
  
  export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2937889386, 32);
      b_0.storeRef(src.content);
    };
  }
  
  export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) {
      throw Error("Invalid prefix");
    }
    let _content = sc_0.loadRef();
    return { $$type: "TokenUpdateContent" as const, content: _content };
  }
  
  function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: "TokenUpdateContent" as const, content: _content };
  }
  
  function loadGetterTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: "TokenUpdateContent" as const, content: _content };
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
      parse: src => {
        return loadTokenUpdateContent(src.loadRef().beginParse());
      },
    };
  }
  
  export type ProvideWalletAddress = {
    $$type: "ProvideWalletAddress";
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
  };
  
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
    if (sc_0.loadUint(32) !== 745978227) {
      throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return {
      $$type: "ProvideWalletAddress" as const,
      query_id: _query_id,
      owner_address: _owner_address,
      include_address: _include_address,
    };
  }
  
  function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return {
      $$type: "ProvideWalletAddress" as const,
      query_id: _query_id,
      owner_address: _owner_address,
      include_address: _include_address,
    };
  }
  
  function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return {
      $$type: "ProvideWalletAddress" as const,
      query_id: _query_id,
      owner_address: _owner_address,
      include_address: _include_address,
    };
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
      parse: src => {
        return loadProvideWalletAddress(src.loadRef().beginParse());
      },
    };
  }
  
  export type TakeWalletAddress = {
    $$type: "TakeWalletAddress";
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
  };
  
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
    if (sc_0.loadUint(32) !== 3513996288) {
      throw Error("Invalid prefix");
    }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0;
    return {
      $$type: "TakeWalletAddress" as const,
      query_id: _query_id,
      wallet_address: _wallet_address,
      owner_address: _owner_address,
    };
  }
  
  function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return {
      $$type: "TakeWalletAddress" as const,
      query_id: _query_id,
      wallet_address: _wallet_address,
      owner_address: _owner_address,
    };
  }
  
  function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return {
      $$type: "TakeWalletAddress" as const,
      query_id: _query_id,
      wallet_address: _wallet_address,
      owner_address: _owner_address,
    };
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
      parse: src => {
        return loadTakeWalletAddress(src.loadRef().beginParse());
      },
    };
  }
  
  export type SetLendingAddress = {
    $$type: "SetLendingAddress";
    new_address: Address;
  };
  
  export function storeSetLendingAddress(src: SetLendingAddress) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(907093053, 32);
      b_0.storeAddress(src.new_address);
    };
  }
  
  export function loadSetLendingAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 907093053) {
      throw Error("Invalid prefix");
    }
    let _new_address = sc_0.loadAddress();
    return { $$type: "SetLendingAddress" as const, new_address: _new_address };
  }
  
  function loadTupleSetLendingAddress(source: TupleReader) {
    let _new_address = source.readAddress();
    return { $$type: "SetLendingAddress" as const, new_address: _new_address };
  }
  
  function loadGetterTupleSetLendingAddress(source: TupleReader) {
    let _new_address = source.readAddress();
    return { $$type: "SetLendingAddress" as const, new_address: _new_address };
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
      parse: src => {
        return loadSetLendingAddress(src.loadRef().beginParse());
      },
    };
  }
  
  export type NxtonMaster$Data = {
    $$type: "NxtonMaster$Data";
    total_supply: bigint;
    owner: Address;
    content: Cell;
    mintable: boolean;
    lending: Address;
    max_supply: bigint;
  };
  
  export function storeNxtonMaster$Data(src: NxtonMaster$Data) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeCoins(src.total_supply);
      b_0.storeAddress(src.owner);
      b_0.storeRef(src.content);
      b_0.storeBit(src.mintable);
      b_0.storeAddress(src.lending);
      b_0.storeCoins(src.max_supply);
    };
  }
  
  export function loadNxtonMaster$Data(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _mintable = sc_0.loadBit();
    let _lending = sc_0.loadAddress();
    let _max_supply = sc_0.loadCoins();
    return {
      $$type: "NxtonMaster$Data" as const,
      total_supply: _total_supply,
      owner: _owner,
      content: _content,
      mintable: _mintable,
      lending: _lending,
      max_supply: _max_supply,
    };
  }
  
  function loadTupleNxtonMaster$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _mintable = source.readBoolean();
    let _lending = source.readAddress();
    let _max_supply = source.readBigNumber();
    return {
      $$type: "NxtonMaster$Data" as const,
      total_supply: _total_supply,
      owner: _owner,
      content: _content,
      mintable: _mintable,
      lending: _lending,
      max_supply: _max_supply,
    };
  }
  
  function loadGetterTupleNxtonMaster$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _mintable = source.readBoolean();
    let _lending = source.readAddress();
    let _max_supply = source.readBigNumber();
    return {
      $$type: "NxtonMaster$Data" as const,
      total_supply: _total_supply,
      owner: _owner,
      content: _content,
      mintable: _mintable,
      lending: _lending,
      max_supply: _max_supply,
    };
  }
  
  function storeTupleNxtonMaster$Data(source: NxtonMaster$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.lending);
    builder.writeNumber(source.max_supply);
    return builder.build();
  }
  
  function dictValueParserNxtonMaster$Data(): DictionaryValue<NxtonMaster$Data> {
    return {
      serialize: (src, builder) => {
        builder.storeRef(beginCell().store(storeNxtonMaster$Data(src)).endCell());
      },
      parse: src => {
        return loadNxtonMaster$Data(src.loadRef().beginParse());
      },
    };
  }
  
  type JettonDefaultWallet_init_args = {
    $$type: "JettonDefaultWallet_init_args";
    owner: Address;
    master: Address;
  };
  
  function initJettonDefaultWallet_init_args(src: JettonDefaultWallet_init_args) {
    return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.master);
    };
  }
  
  async function JettonDefaultWallet_init(owner: Address, master: Address) {
    const __code = Cell.fromBase64(
      "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",
    );
    const __system = Cell.fromBase64(
      "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",
    );
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initJettonDefaultWallet_init_args({ $$type: "JettonDefaultWallet_init_args", owner, master })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
  }
  
  export function initAddress(owner: Address, master: Address) {
    const __code = Cell.fromBase64(
      "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",
    );
    const __system = Cell.fromBase64(
      "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",
    );
  
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    builder.storeAddress(owner);
    builder.storeAddress(master);
    const __data = builder.endCell();
  
    return contractAddress(0, { code: __code, data: __data });
  }
  
  const JettonDefaultWallet_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
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
    3688: { message: `Not mintable` },
    3734: { message: `Not Owner` },
    4429: { message: `Invalid sender` },
    12241: { message: `Max supply exceeded` },
    14534: { message: `Not owner` },
    16059: { message: `Invalid value` },
    18668: { message: `Can't Mint Anymore` },
    22078: { message: `Not Lending Contract` },
    23951: { message: `Insufficient gas` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    62972: { message: `Invalid balance` },
  };
  
  const JettonDefaultWallet_types: ABIType[] = [
    {
      name: "StateInit",
      header: null,
      fields: [
        { name: "code", type: { kind: "simple", type: "cell", optional: false } },
        { name: "data", type: { kind: "simple", type: "cell", optional: false } },
      ],
    },
    {
      name: "StdAddress",
      header: null,
      fields: [
        { name: "workchain", type: { kind: "simple", type: "int", optional: false, format: 8 } },
        { name: "address", type: { kind: "simple", type: "uint", optional: false, format: 256 } },
      ],
    },
    {
      name: "VarAddress",
      header: null,
      fields: [
        { name: "workchain", type: { kind: "simple", type: "int", optional: false, format: 32 } },
        { name: "address", type: { kind: "simple", type: "slice", optional: false } },
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
      name: "JettonDefaultWallet$Data",
      header: null,
      fields: [
        { name: "balance", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "owner", type: { kind: "simple", type: "address", optional: false } },
        { name: "master", type: { kind: "simple", type: "address", optional: false } },
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
      name: "JettonData",
      header: null,
      fields: [
        { name: "total_supply", type: { kind: "simple", type: "int", optional: false, format: 257 } },
        { name: "mintable", type: { kind: "simple", type: "bool", optional: false } },
        { name: "owner", type: { kind: "simple", type: "address", optional: false } },
        { name: "content", type: { kind: "simple", type: "cell", optional: false } },
        { name: "wallet_code", type: { kind: "simple", type: "cell", optional: false } },
      ],
    },
    {
      name: "JettonWalletData",
      header: null,
      fields: [
        { name: "balance", type: { kind: "simple", type: "int", optional: false, format: 257 } },
        { name: "owner", type: { kind: "simple", type: "address", optional: false } },
        { name: "master", type: { kind: "simple", type: "address", optional: false } },
        { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      ],
    },
    {
      name: "MintFromLending",
      header: 26388776,
      fields: [
        { name: "amount", type: { kind: "simple", type: "int", optional: false, format: 257 } },
        { name: "receiver", type: { kind: "simple", type: "address", optional: false } },
      ],
    },
    {
      name: "Mint",
      header: 4235234258,
      fields: [
        { name: "amount", type: { kind: "simple", type: "int", optional: false, format: 257 } },
        { name: "receiver", type: { kind: "simple", type: "address", optional: false } },
      ],
    },
    {
      name: "TokenTransfer",
      header: 260734629,
      fields: [
        { name: "query_id", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
        { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "sender", type: { kind: "simple", type: "address", optional: false } },
        { name: "response_destination", type: { kind: "simple", type: "address", optional: true } },
        { name: "custom_payload", type: { kind: "simple", type: "cell", optional: true } },
        { name: "forward_ton_amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "forward_payload", type: { kind: "simple", type: "slice", optional: false, format: "remainder" } },
      ],
    },
    {
      name: "TokenTransferInternal",
      header: 395134233,
      fields: [
        { name: "query_id", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
        { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "from", type: { kind: "simple", type: "address", optional: false } },
        { name: "response_destination", type: { kind: "simple", type: "address", optional: true } },
        { name: "forward_ton_amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "forward_payload", type: { kind: "simple", type: "slice", optional: false, format: "remainder" } },
      ],
    },
    {
      name: "TokenNotification",
      header: 1935855772,
      fields: [
        { name: "query_id", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
        { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "from", type: { kind: "simple", type: "address", optional: false } },
        { name: "forward_payload", type: { kind: "simple", type: "slice", optional: false, format: "remainder" } },
      ],
    },
    {
      name: "TokenBurn",
      header: 1499400124,
      fields: [
        { name: "query_id", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
        { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "response_destination", type: { kind: "simple", type: "address", optional: true } },
        { name: "custom_payload", type: { kind: "simple", type: "cell", optional: true } },
      ],
    },
    {
      name: "TokenBurnNotification",
      header: 2078119902,
      fields: [
        { name: "query_id", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
        { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "sender", type: { kind: "simple", type: "address", optional: false } },
        { name: "response_destination", type: { kind: "simple", type: "address", optional: true } },
      ],
    },
    {
      name: "TokenExcesses",
      header: 3576854235,
      fields: [{ name: "query_id", type: { kind: "simple", type: "uint", optional: false, format: 64 } }],
    },
    {
      name: "TokenUpdateContent",
      header: 2937889386,
      fields: [{ name: "content", type: { kind: "simple", type: "cell", optional: false } }],
    },
    {
      name: "ProvideWalletAddress",
      header: 745978227,
      fields: [
        { name: "query_id", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
        { name: "owner_address", type: { kind: "simple", type: "address", optional: false } },
        { name: "include_address", type: { kind: "simple", type: "bool", optional: false } },
      ],
    },
    {
      name: "TakeWalletAddress",
      header: 3513996288,
      fields: [
        { name: "query_id", type: { kind: "simple", type: "uint", optional: false, format: 64 } },
        { name: "wallet_address", type: { kind: "simple", type: "address", optional: false } },
        { name: "owner_address", type: { kind: "simple", type: "slice", optional: false, format: "remainder" } },
      ],
    },
    {
      name: "SetLendingAddress",
      header: 907093053,
      fields: [{ name: "new_address", type: { kind: "simple", type: "address", optional: false } }],
    },
    {
      name: "NxtonMaster$Data",
      header: null,
      fields: [
        { name: "total_supply", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
        { name: "owner", type: { kind: "simple", type: "address", optional: false } },
        { name: "content", type: { kind: "simple", type: "cell", optional: false } },
        { name: "mintable", type: { kind: "simple", type: "bool", optional: false } },
        { name: "lending", type: { kind: "simple", type: "address", optional: false } },
        { name: "max_supply", type: { kind: "simple", type: "uint", optional: false, format: "coins" } },
      ],
    },
  ];
  
  const JettonDefaultWallet_getters: ABIGetter[] = [
    { name: "get_wallet_data", arguments: [], returnType: { kind: "simple", type: "JettonWalletData", optional: false } },
  ];
  
  export const JettonDefaultWallet_getterMapping: { [key: string]: string } = {
    get_wallet_data: "getGetWalletData",
  };
  
  const JettonDefaultWallet_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "typed", type: "TokenTransfer" } },
    { receiver: "internal", message: { kind: "typed", type: "TokenTransferInternal" } },
    { receiver: "internal", message: { kind: "typed", type: "TokenBurn" } },
  ];
  
  export class JettonDefaultWallet implements Contract {
    static async init(owner: Address, master: Address) {
      return await JettonDefaultWallet_init(owner, master);
    }
  
    static async fromInit(owner: Address, master: Address) {
      const init = await JettonDefaultWallet_init(owner, master);
      const address = contractAddress(0, init);
      return new JettonDefaultWallet(address, init);
    }
  
    static fromAddress(address: Address) {
      return new JettonDefaultWallet(address);
    }
  
    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
      types: JettonDefaultWallet_types,
      getters: JettonDefaultWallet_getters,
      receivers: JettonDefaultWallet_receivers,
      errors: JettonDefaultWallet_errors,
    };
  
    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
      this.address = address;
      this.init = init;
    }
  
    async send(
      provider: ContractProvider,
      via: Sender,
      args: { value: bigint; bounce?: boolean | null | undefined },
      message: TokenTransfer | TokenTransferInternal | TokenBurn,
    ) {
      let body: Cell | null = null;
      if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "TokenTransfer") {
        body = beginCell().store(storeTokenTransfer(message)).endCell();
      }
      if (
        message &&
        typeof message === "object" &&
        !(message instanceof Slice) &&
        message.$$type === "TokenTransferInternal"
      ) {
        body = beginCell().store(storeTokenTransferInternal(message)).endCell();
      }
      if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "TokenBurn") {
        body = beginCell().store(storeTokenBurn(message)).endCell();
      }
      if (body === null) {
        throw new Error("Invalid message type");
      }
  
      await provider.internal(via, { ...args, body: body });
    }
  
    async getGetWalletData(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get("get_wallet_data", builder.build())).stack;
      const result = loadGetterTupleJettonWalletData(source);
      return result;
    }
  }