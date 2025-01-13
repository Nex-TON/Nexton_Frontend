export declare type BTCNetworkType = 'MAINNET' | 'TESTNET' | 'SIGNET';
export declare type BTCNetworkAddressType = 'P2PKH' | 'P2WPKH' | 'P2TR' | 'P2SH';
export interface BtcCreateSendBtcPsbt {
    networkType: BTCNetworkType;
    addressType: BTCNetworkAddressType | undefined;
    toAddress: string;
    amount: string;
}
export interface BtcSignPsbt {
    networkType: BTCNetworkType;
    addressType: BTCNetworkAddressType;
    autoFinalized: boolean;
    psbtHex: string;
}
export interface SolSendTx {
    rawTransaction: string;
}
export interface TokenType {
    balance: string;
    chain_id: number;
    contract: string;
    decimals: number;
    image: string;
    is_native: boolean;
    mercuryo_support: string;
    name: string;
    price: number;
    ramp_support: string;
    symbol: string;
}
export interface SwapResult {
    dex_name: string;
    min_receive_amount: string;
    origin_data: string;
    receive_amount: string;
    source: 'okx' | 'rango';
    transaction: {
        approve_data: string;
        approve_to: string;
        approve_spender?: string;
        data: string;
        from: string;
        gas: string;
        gasPrice: string;
        maxFeePerGas: string;
        maxGasPrice: string;
        maxPriorityFeePerGas: string;
        priorityGasPrice: string;
        to: string;
        value: string;
    };
}
export interface CustomTokenParams {
    chain_id: number;
    decimals: number;
    image?: string;
    name?: string;
    symbol: string;
    token: string;
}
export declare type CustonTokenType = {
    ID: number;
    chain_id: number;
    created_at: number;
    decimals: number;
    image: string;
    name: string;
    symbol: string;
    token: string;
    uid: number;
};
