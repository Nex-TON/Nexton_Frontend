import { Transaction } from '@mysten/sui/transactions';
import { initOptions } from '../../types/types';
import BasicProvider from '../BasicProvider';
import PrioviderUtils from '../ProviderUtils';
interface SuiSignTransactionBlockInput {
    transactionBlock: Transaction;
    chain: string;
    txBytes?: Uint8Array;
    txSerialize?: Uint8Array;
    options?: {
        showEffects: boolean;
    };
}
export default class SuiProvider extends BasicProvider {
    isConnected: boolean;
    utils: PrioviderUtils;
    account: {
        address: string;
    };
    chainId: number;
    constructor(options: initOptions);
    private _initialize;
    connectWallet(params?: {
        email: string;
    }): Promise<import("../../types/types").Account>;
    disconnectWallet(): Promise<boolean>;
    getAccount(): {
        address: string;
    };
    getAddress(): string;
    sendTransaction(p: {
        bytes: Uint8Array;
        signature: string;
    }): Promise<import("@mysten/sui/dist/cjs/client").SuiTransactionBlockResponse>;
    signMessage(message: string): Promise<any>;
    signPersonalMessage(message: string): Promise<any>;
    signTransaction(params: SuiSignTransactionBlockInput): Promise<any>;
    signAndExecuteTransaction(params: SuiSignTransactionBlockInput): Promise<import("@mysten/sui/dist/cjs/client").SuiTransactionBlockResponse>;
    disconnect(): Promise<void>;
}
export {};
