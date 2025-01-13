import { IWeb3ChainType } from '../providers/web3Provider/type';
export declare type ISwapTokenType = {
    chainId?: string;
    marketCap?: number;
    address?: string;
    chain: string;
    createdTime: string;
    decimals: number;
    displayName: string;
    id: number;
    imageUrl: string;
    isNative: boolean;
    isTomoji: boolean;
    name: string;
    priceChangeH24: number;
    priceUsd: string;
    supportRango: boolean;
    symbol: string;
    updatedTime: string;
    volumeH24: string;
};
declare const useSwapTokens: ({ chain, content, }: {
    chain: IWeb3ChainType | undefined;
    content: string | undefined;
}) => {
    tokens: ISwapTokenType[];
    loading: boolean;
};
export default useSwapTokens;
