export declare const tgUtils: {
    decodeTelegramUrlParameters: (encodedParameters: any, isObject?: boolean) => any;
    stringify: (obj: any) => string;
    encodeTelegramUrlParameters: (parameters: any, isObject?: boolean) => any;
    opendeepLink: (paramsStr: any, { domain, appname, }: {
        domain?: string;
        appname?: string;
    }) => void;
    getDeepLink: ({ tMeUrl, params, mode, }: {
        tMeUrl: string;
        params?: any;
        mode?: string;
        compact: any;
    }) => string;
};
export declare function getUUid(): string;
export declare function isMobileDevice(): boolean;
export declare const isIOS: () => boolean;
export declare function isTelegramInAppBrowser(): boolean;
export declare function isPcBrowser(): boolean;
export declare function getOkxLanguage(lang?: string): string;
export declare function getDisplayName(name: string): string;
export declare function getDisplayDescription(name: string): string;
declare const _default: {};
export default _default;
