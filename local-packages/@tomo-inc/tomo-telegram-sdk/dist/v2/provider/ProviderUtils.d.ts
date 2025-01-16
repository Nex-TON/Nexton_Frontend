import { Account, initOptions } from '../types/types';
import ProxyLocalStorage from '../ProxyLocalStorage';
import EventEmitter from 'eventemitter3';
interface RequestOptions {
    account: Account;
    metaData: initOptions['metaData'];
    timeStamp?: number;
}
export default class ProviderUtils extends EventEmitter {
    eventTimeout: number;
    storage: ProxyLocalStorage;
    metaData: initOptions['metaData'];
    connectUrl: string;
    bridgeUrl: string;
    connect_direct_link: string;
    private _isRetryCount;
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
    get chainId(): string;
    constructor(options?: initOptions);
    request(payload: {
        method: string;
        params: any[];
    }): Promise<Record<string, any>>;
    /** get sse token / add salt */
    getSseToken(method: any, params: any, options?: RequestOptions): Promise<{
        hash: any;
        signature: any;
        salt: string;
    }>;
    /** connect sse */
    connectSse(method: any, params: any, options?: RequestOptions): Promise<unknown>;
    /** create EventSource */
    createEventSource(hash: any, signature: any, salt: any, direct_params: any, request: any): Promise<unknown>;
    /** open auth bot */
    openAuthBot(direct_params: {
        method: string;
        params: any[];
    }): void;
    /** get tomo bot app infp */
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
    removeAccount(chainType: any): void;
    getMethodInfo(methodString: string): string[];
}
export {};
