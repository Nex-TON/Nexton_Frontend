import { SuiClient, SuiTransactionBlockResponse } from '@mysten/sui/client';
export declare const SUI_TOKEN_ADDRESS = "0x2::sui::SUI";
export declare const suiScanUrl = "https://suiscan.xyz/mainnet/tx/";
export declare const mockSuiEvmChainId = 784;
export declare function getSuiClient(): SuiClient;
export declare const sendSuiTx: ({ bytes, signature, }: {
    bytes: Uint8Array;
    signature: string;
}) => Promise<SuiTransactionBlockResponse>;
export interface GetSuiSendGasType {
    fromAddress: string;
    toAddress: string;
    amount: string;
    coinType?: string;
}
