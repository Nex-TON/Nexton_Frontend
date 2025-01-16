import { Account, IWeb3Type } from '../types/types';
export declare const loginDefineProperties: (request: any, response: any, chain?: IWeb3Type, isTonProof?: boolean) => {
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
};
export declare const signDefineProperties: (request: any, response: any, source: any, chain?: IWeb3Type) => {
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
};
export declare const formatAccount: (chain: IWeb3Type, res: any, chainId: any) => Record<string, Account>;
