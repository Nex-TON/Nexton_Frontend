import { Transaction } from '@solana/web3.js';
import { initOptions } from '../../types/types';
import BasicProvider from '../BasicProvider';
import PrioviderUtils from '../ProviderUtils';
interface SolTransferParam {
    from: string;
    to: string;
    value: string;
    contract?: string;
}
export default class SolanaProvider extends BasicProvider {
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
    sendTransaction(tx: string): Promise<any>;
    getBalance(address?: string): Promise<{
        amount: bigint;
        format: any;
        decimals: any;
        token: string;
        balance?: undefined;
        formatted?: undefined;
    } | {
        balance: string;
        formatted: string;
    }>;
    signMessage(message: string): Promise<any>;
    getAddress(): string;
    signTransaction(tx: Transaction | SolTransferParam): Promise<any>;
    transfer(params: SolTransferParam): Promise<any>;
    transferToken(params: SolTransferParam): Promise<any>;
    disconnect(): Promise<void>;
}
export {};
