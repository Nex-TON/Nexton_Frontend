export declare const messages: {
    errors: {
        disconnected: () => string;
        permanentlyDisconnected: () => string;
        sendSiteMetadata: () => string;
        unsupportedSync: (method: string) => string;
        invalidDuplexStream: () => string;
        invalidNetworkParams: () => string;
        invalidRequestArgs: () => string;
        invalidRequestMethod: () => string;
        invalidRequestParams: () => string;
        invalidLoggerObject: () => string;
        invalidLoggerMethod: (method: string) => string;
        invalidChains: (chainId: string) => string;
        timeOut: (method: string) => string;
    };
    info: {
        connected: (chainId: string) => string;
    };
    warnings: {
        chainIdDeprecation: string;
        networkVersionDeprecation: string;
        selectedAddressDeprecation: string;
        enableDeprecation: string;
        sendDeprecation: string;
        events: {
            close: string;
            data: string;
            networkChanged: string;
            notification: string;
        };
        rpc: {
            ethDecryptDeprecation: string;
            ethGetEncryptionPublicKeyDeprecation: string;
            walletWatchAssetNFTExperimental: string;
        };
        experimentalMethods: string;
    };
};
export declare const errorCodes: {
    rpc: {
        timeoutRequest: number;
        invalidInput: number;
        resourceNotFound: number;
        resourceUnavailable: number;
        transactionRejected: number;
        methodNotSupported: number;
        limitExceeded: number;
        parse: number;
        invalidRequest: number;
        methodNotFound: number;
        invalidParams: number;
        internal: number;
    };
    provider: {
        unsupportedChain: number;
        userRejectedRequest: number;
        unauthorized: number;
        unsupportedMethod: number;
        disconnected: number;
        chainDisconnected: number;
    };
};
export declare const errorValues: {
    '-32700': {
        standard: string;
        message: string;
    };
    '-32600': {
        standard: string;
        message: string;
    };
    '-32601': {
        standard: string;
        message: string;
    };
    '-32602': {
        standard: string;
        message: string;
    };
    '-32603': {
        standard: string;
        message: string;
    };
    '-32000': {
        standard: string;
        message: string;
    };
    '-32001': {
        standard: string;
        message: string;
    };
    '-32002': {
        standard: string;
        message: string;
    };
    '-32003': {
        standard: string;
        message: string;
    };
    '-32004': {
        standard: string;
        message: string;
    };
    '-32005': {
        standard: string;
        message: string;
    };
    4001: {
        standard: string;
        message: string;
    };
    4100: {
        standard: string;
        message: string;
    };
    4200: {
        standard: string;
        message: string;
    };
    4900: {
        standard: string;
        message: string;
    };
    4901: {
        standard: string;
        message: string;
    };
};
export declare const FALLBACK_MESSAGE = "Unspecified error message. This is a bug, please report it.";
export declare const rpcErrors: {
    invalidRequest: ({ code, message, data }: {
        code?: number | string;
        message?: string;
        data?: any;
    }) => {
        code: string;
        message: string;
        data: any;
    };
    methodNotSupported: ({ code, message, data }: {
        code?: number;
        message?: string;
        data?: any;
    }) => {
        code: number;
        message: string | (() => string);
        data: any;
    };
};
export declare type ErrorValueKey = keyof typeof errorValues;
