import { initOptions, TonTxParams } from '../../types/types';
import BasicProvider from '../BasicProvider';
import ProviderUtils from '../ProviderUtils';
export declare class TonProvider extends BasicProvider {
    utils: ProviderUtils;
    account: {
        address: string;
        publicKey?: string;
        tonProof?: any;
    };
    chainId: number;
    isConnected: boolean;
    constructor(options: initOptions);
    private _initialize;
    connect(params?: {
        tonProof?: string;
        domain?: string;
        chainId?: number;
        email?: string;
        workChain?: number;
        network?: string;
    }): Promise<any>;
    get connected(): boolean;
    restoreConnection(): Promise<string>;
    getAddress(): string;
    getBalance(address?: string): Promise<{
        balance: any;
        formatted: number;
    } | {
        balance: string;
        formatted: string;
    }>;
    private signTransaction;
    private signTx;
    sendTransaction(params: TonTxParams): Promise<any>;
    sendTx(params: TonTxParams): Promise<any>;
    private checkValue;
    /**
     * @deprecated no longer maintained in the future
     */
    private parsePayloadAsJSON;
    private parsePayloadAsStandard;
    disconnect(): Promise<void>;
}
