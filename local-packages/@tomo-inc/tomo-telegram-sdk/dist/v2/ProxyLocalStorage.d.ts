export default class ProxyLocalStorage {
    Telegram: any;
    prefix: string;
    userId: string;
    constructor();
    get(key: any, withTgUserId?: boolean): any;
    set(key: any, value: any, withTgUserId?: boolean): any;
}
export declare function useProxyLocalStorage(): ProxyLocalStorage;
