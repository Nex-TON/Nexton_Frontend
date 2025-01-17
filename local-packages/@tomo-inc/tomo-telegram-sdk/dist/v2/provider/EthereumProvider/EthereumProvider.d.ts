import ProviderUtils from '../ProviderUtils';
import { Account, MetaData, SwitchEthereumChainParams, initOptions } from '../../types/types';
import AbstractProvider from '../AbstractProvider';
interface HttpProviderOptions {
    chainId: string;
    url: string;
}
interface RequestOptions {
    account: Account;
    metaData: initOptions['metaData'];
}
declare class HttpProvider {
    options: HttpProviderOptions;
    rpcMap: Map<number, string>;
    peddingMap: Map<number, any>;
    constructor(options?: HttpProviderOptions);
    setUrl(url: any, chainId: any): void;
    getUrl(chainId: any): string;
    send(payload: {
        method: string;
        params: any[];
        id?: number;
    }, options: {
        chainId: string;
        chainKey?: string;
        rpcUrl?: string;
        account?: Account;
    }): Promise<any>;
    sendBatch(payloads: any, options?: {}): Promise<any[]>;
}
declare class ProxyLocalStorage {
    prefix: string;
    constructor();
    get(key: any): any;
    set(key: any, value: any): any;
}
interface OverrideRpcUrl {
    [chainId: number]: string;
}
export declare class EthereumProvider extends AbstractProvider {
    version: string;
    connectUrl: string;
    bridgeUrl: string;
    connect_direct_link: string;
    httpProvider: HttpProvider;
    storage: ProxyLocalStorage;
    utils: ProviderUtils;
    eventTimeout: number;
    metaData: MetaData;
    autoRefreshOnNetworkChange: boolean;
    _isMetaMask: boolean;
    isMetaMask: boolean;
    _isConnected: boolean;
    isTomoWallet: boolean;
    private _isRetryCount;
    private chainList;
    private overrideRpcUrl;
    get _lastTime(): number;
    set _lastTime(value: number);
    get _account(): Account | null;
    set _account(account: Account | null);
    get _accounts(): {
        [key: string]: Account;
    };
    set _accounts(accounts: {
        [key: string]: Account;
    });
    get networkVersion(): number;
    get chainId(): string;
    get chainKey(): string;
    get connected(): boolean;
    get selectedAddress(): string;
    constructor(options: initOptions & {
        overrideRpcUrl?: OverrideRpcUrl;
    });
    checkIsChainSupported(chainId: string | number): boolean;
    _initialize(): void;
    _walletSwitchChain(payload: {
        method: string;
        params: Array<SwitchEthereumChainParams>;
    }): Promise<any>;
    getAppInfo(): {
        id: string;
        version: string;
        name: string;
        homepage: string;
        logo: string;
        description: string;
        downloadLinks: {
            android: string;
            googlePlay: string;
            ios: string;
            appleStore: string;
            testflight: string;
            telegram: string;
            browserExtension: {
                chrome: string;
                edge: string;
            };
        };
        deepLinks: {
            scheme: string;
            universallink: string;
            direct_link: string;
        };
    };
    enable(): Promise<any>;
    get isConnected(): boolean;
    getRpcUrl(): any;
    request(payload: {
        method: string;
        params?: any[];
    }): Promise<any>;
    _createEventSource(hash: any, signature: any, salt: string, direct_params: {
        method: string;
        params: any[];
    }, request: any): Promise<unknown>;
    _request(method: any, params: any, options?: RequestOptions): Promise<unknown>;
    disconnect(): void;
}
export {};
