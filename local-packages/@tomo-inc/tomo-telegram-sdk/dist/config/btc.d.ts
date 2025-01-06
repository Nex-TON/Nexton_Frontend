import { BTCNetworkAddressType, BTCNetworkType } from '../api/type';
export declare type IBtcAddressType = 'bitcoinP2Wpkh' | 'bitcoinP2Sh' | 'bitcoinP2Tr' | 'bitcoinP2Pkh';
export declare const btcAddressTypeMaps: IBtcAddressType[];
export declare const mockBtcEvmChainId = 0;
export declare const btcDecimals = 8;
export declare const signMessage: (params: {
    addressType: string;
    message: string;
}) => Promise<any>;
export declare const sendTx: ({ network, addressType, toAddress, amount, }: {
    network: BTCNetworkType;
    addressType: BTCNetworkAddressType | undefined;
    toAddress: string;
    amount: string;
}) => Promise<any>;
export declare const getSignTxInfoByHex: ({ network, psbtHex, }: {
    network: string;
    psbtHex: string;
}) => Promise<any>;
export declare const sendPsbtTx: ({ networkType, addressType, psbtHex, }: {
    networkType: BTCNetworkType;
    addressType: BTCNetworkAddressType;
    psbtHex: string;
}) => Promise<any>;
export declare const signPsbt: ({ networkType, addressType, psbtHex, }: {
    networkType: BTCNetworkType;
    addressType: BTCNetworkAddressType;
    psbtHex: string;
}) => Promise<any>;
export declare const getBTCSendHash: (psbtHex: string) => Promise<string>;
