import { Address } from '@ton/core';
interface Tag<T extends string, RealType> {
    __tag__: T;
    __realType__: RealType;
}
export declare type OpaqueType<T extends string, U> = U & Tag<T, U>;
export declare function OpaqueType<T extends Tag<any, any>>(): (value: T extends Tag<any, infer U> ? U : never) => T;
export declare type HexString = OpaqueType<'HexString', string>;
export declare const HexString: (value: string) => OpaqueType<"HexString", string>;
export declare type AddressString = OpaqueType<'AddressString', string>;
export declare const AddressString: (value: string) => OpaqueType<"AddressString", string>;
export declare type BigIntString = OpaqueType<'BigIntString', string>;
export declare const BigIntString: (value: string) => OpaqueType<"BigIntString", string>;
export declare type IntNumber = OpaqueType<'IntNumber', number>;
export declare function IntNumber(num: number): IntNumber;
export declare type RegExpString = OpaqueType<'RegExpString', string>;
export declare const RegExpString: (value: string) => OpaqueType<"RegExpString", string>;
export declare type Callback<T> = (err: Error | null, result: T | null) => void;
export declare const PROVIDER_ALLIANCE: {
    EVM: string;
    SOL: string;
    TON: string;
};
export declare type Account = {
    address: string;
    chainId?: string | number;
    chainKey?: string;
    alliance: string;
    chainName?: string;
    chainSymbol?: string;
    name?: string;
    symbol?: string;
    publicKey?: string;
};
export declare type SwitchEthereumChainParams = {
    chainId: number;
};
export declare type initOptions = {
    bridge?: string;
    chainId?: number;
    connect?: string;
    connect_direct_link?: string;
    eventTimeout?: number;
    injected?: boolean;
    metaData: MetaData;
};
export interface MetaData {
    hostname?: string;
    icon: string;
    name: string;
    url?: string;
    direct_link?: string;
    description?: string;
}
export interface TomoOptions {
    bridge?: string;
    connect?: string;
    connect_direct_link?: string;
    metaData: MetaData;
    injected: boolean;
}
export interface TonTxParams {
    valid_until?: number | bigint;
    validUntil?: number | bigint;
    network?: string;
    from?: string;
    messages: {
        address: string;
        amount: string;
        stateInit?: string;
        payload?: string;
    }[];
}
export declare enum TonTxBodyType {
    JETTON_PAYLOAD_JSON_LEGACY = "JETTON_PAYLOAD_JSON_LEGACY",
    STANDARD = "STANDARD"
}
export interface TonTransferBodyLegacy {
    from: string;
    to: string | Address;
    value: string | bigint | number;
    memo?: string;
    contractAddress?: string;
    precision?: string;
    forwardAmount?: string;
    type?: TonTxBodyType.JETTON_PAYLOAD_JSON_LEGACY;
    chainId?: number;
    publicKey?: string;
}
export interface TonTxRequestStandard {
    type: TonTxBodyType.STANDARD;
    jettonInfo: {
        recipientAddress: string;
        amount: string;
        jettonMinterAddress: string;
    };
    body: TonTxParams;
    chainId: number;
    publicKey: string;
}
export declare type TonTxRequest = TonTransferBodyLegacy | Partial<TonTxRequestStandard>;
declare type SendTransactionResponse = SendTransactionResponseSuccess | SendTransactionResponseError;
interface SendTransactionResponseSuccess {
    result: string;
    id: string;
}
interface SendTransactionResponseError {
    error: {
        code: number;
        message: string;
    };
    id: string;
}
export interface TonProvider {
    connected: boolean;
    account: {
        address: string;
        publicKey: string;
    };
    sendTransaction: (param: TonTxParams) => SendTransactionResponse;
    disconnect: any;
    getBalance: any;
}
export declare type IWeb3Type = 'EVM' | 'SOL' | 'BTC' | 'SUI' | 'ALL' | 'TON';
export interface OutputDef {
    config: {
        accounts: Record<string, Account>;
    };
    hash: string;
    salt: string;
    signature: string;
    id: string;
    method: string;
    params: any[];
    result: any;
    options: {
        account: Account;
        metaData: {
            hostname: string;
            icon: string;
            name: string;
            url: string;
        };
    };
}
export declare type SupportedProvider = 'EVM' | 'TON' | 'Solana' | 'SUI';
export declare type ConnectType = 'OKX' | 'TOMO' | 'TON' | 'BITGET' | 'UXUY';
export declare enum TomoProviderEventName {
    TOMO_EVM_PROVIDER_DISCONNECTED = "TOMO_EVM_PROVIDER_DISCONNECTED",
    TOMO_EVM_PROVIDER_CONNECTED = "TOMO_EVM_PROVIDER_DISCONNECTED"
}
export {};
