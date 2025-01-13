import { Hex } from 'viem';
import { GetBalanceReturnType } from '@wagmi/core';
import * as wagmiChains from 'wagmi/chains';
export declare type ITransactionToken = {
    chainId: number;
    image: string;
    name: string;
    symbol: string;
    decimals: GetBalanceReturnType['decimals'];
    address?: Hex | undefined;
};
export declare type ITransactionType = {
    fromAddress: string | undefined;
    toAddress: string | undefined;
    fromAmount: string | undefined;
    toAmount: string;
    nonce: number;
    fromSwapTokens: ITransactionToken | undefined;
    toSwapTokens: ITransactionToken | undefined;
    time: number;
    hash: any;
    chainId?: IChainId | undefined;
    type?: 'OKX' | 'Rango';
    historyType: 'Swap' | 'Send' | 'Approve';
};
export declare type IChainType = typeof wagmiChains[keyof typeof wagmiChains];
export declare type IChainId = IChainType['id'] | 501 | 0 | 1100;
