import { AddressType } from 'tonweb';
import { Cell } from 'tonweb/dist/types/boc/cell';
export declare type TonSigningTransactionType = {
    fromAddress: string;
    publicKey: string;
    value: bigint;
    toAddress: string;
    memo: string | Uint8Array | Cell;
    tokenContractAddress?: string;
    tokenPrecision?: number;
};
export declare const mockTonChainId = 1100;
export declare const mockTonTestnetChainId = 1101;
export declare const tonDecimals = 9;
export declare const tonRpc: string;
export declare const hashHttp: string;
export declare const getTonBalance: ({ tonAddress, tokenContractAddress, tokenPrecision, chainId, }: {
    tonAddress: string;
    tokenContractAddress?: AddressType;
    tokenPrecision?: number;
    chainId?: number;
}) => Promise<{
    balance: any;
    formatted: number;
} | {
    balance: string;
    formatted: string;
}>;
/**
 * build transfer signing message
 * @param transactionInfo  {publicKey: "be91c0...",value: 300000,toAddress: "EQC4d8D4...",memo: "1111"}
 * @returns
 */
export declare function createSigningTransaction(transactionInfo: TonSigningTransactionType): Promise<{
    signingMessageBoc: any;
    stateInitBoc: any;
}>;
export declare function sendTransaction(signedTransaction: string, walletAddress?: string, chainId?: number): Promise<any>;
export declare function sendMessageFee(address: string, signedTransaction: string): Promise<any>;
export declare function getTransactionsByInMessageHash(msg_hash: string): Promise<any>;
export declare const tonRpcApiKey: string;
