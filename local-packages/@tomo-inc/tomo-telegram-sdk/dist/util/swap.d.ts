import { IWeb3ChainType } from '../providers/web3Provider/type';
export declare const findSwapChainName: (chainId: number | undefined) => "ETH" | "BSC" | "ARBITRUM" | "OPTIMISM" | "BASE" | "POLYGON_POS" | "BLAST" | "AVAX" | "SCROLL" | "LINEA" | "B3" | "BITCOIN" | "SOLANA" | "";
export declare const filterSwapChainId: (chain: IWeb3ChainType | undefined) => "ETH" | "BSC" | "ARBITRUM" | "OPTIMISM" | "BASE" | "POLYGON_POS" | "BLAST" | "AVAX" | "SCROLL" | "LINEA" | "B3" | "BITCOIN" | "SOLANA" | "";
