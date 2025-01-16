export declare const SolMainAddress = "11111111111111111111111111111111";
export declare const mockSolEvmChainId = 501;
export declare const solDecimals = 9;
export declare const solTokenName = "SOL";
export declare const solEndpoint = "https://rpc.ankr.com/solana/ac79e83cf02a544dbb9b3f4c5d5478b2510b921e7d5739ded8791a932e8de0a6";
export declare const solScanUrl = "https://solscan.io/tx/";
export declare function getConnection(): any;
export declare function getSolFees(): Promise<{
    totalFee: string;
}>;
export declare function sendSolTx(fromAddress: string, toAddress: string, amount: bigint, // bigint number
mintAddress?: string): Promise<string>;
export declare const getSolTokenDetail: (mintAddress: string) => Promise<{
    symbol: any;
    decimals: any;
}>;
export declare function getSolTokenAccount(client: any, mint: any, owner: any): Promise<any>;
export declare const getSolBalance: ({ address, token, }: {
    address: string | undefined;
    token: string | undefined;
}) => Promise<{
    amount: bigint;
    format: any;
    decimals: any;
    token: string;
    balance?: undefined;
    formatted?: undefined;
} | {
    balance: string;
    formatted: string;
    amount?: undefined;
    format?: undefined;
    decimals?: undefined;
    token?: undefined;
}>;
export declare const ToSerializeTransaction: (data: any) => Promise<string>;
export declare function getSendSplToken(mint: string | undefined, from: string | undefined, to: string | undefined, amount: bigint | undefined): Promise<string>;
export declare function sendTransaction(rawTransaction: string): Promise<any>;
