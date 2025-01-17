import { Config } from '@wagmi/core';
import { BTCNetworkAddressType, BTCNetworkType } from '../api/type';
import { IChainId, ITransactionToken, ITransactionType } from '../state/type';
import { MFAType } from './useMFAVerify';
import { TonSigningTransactionType } from '../config/ton';
export declare const useReadyBtcTransaction: (params: {
    network: BTCNetworkType;
    addressType: BTCNetworkAddressType | undefined;
    toAddress: string | undefined;
    amount: string;
}, options?: {
    onError?: (error: any) => void;
}) => import("@tanstack/query-core/build/legacy/hydration-mKPlgzt9").av<any, Error>;
declare const useSendTransaction: (options?: {
    onError?: (error: any) => void;
}) => {
    sendEVMTransaction: (params: {
        chainId: IChainId | undefined;
        fromAddress: string | undefined;
        toAddress: string | undefined;
        value: bigint | undefined;
        rpc?: string;
        config: Config;
        data?: string | undefined;
        tokenValue?: bigint | undefined;
        token?: ITransactionToken | undefined;
        toToken?: ITransactionToken | undefined;
        mfaType?: MFAType | undefined;
        password?: string | undefined;
        historyType?: ITransactionType['historyType'];
    }) => Promise<any>;
    sendSolTransaction: (params: {
        fromAddress: string | undefined;
        toAddress: string | undefined;
        value: bigint | undefined;
        contract?: string;
        token?: ITransactionToken | undefined;
        toToken?: ITransactionToken | undefined;
        data?: any | undefined;
        mfaType?: MFAType | undefined;
        password?: string | undefined;
        historyType?: ITransactionType['historyType'];
    }) => Promise<any>;
    sendTonTransaction: (params: TonSigningTransactionType & {
        mfaType?: MFAType | undefined;
        password?: string | undefined;
        token?: ITransactionToken;
        historyType?: ITransactionType['historyType'];
    }) => Promise<any>;
    sendBtcTransaction: (params: {
        network: BTCNetworkType;
        addressType: BTCNetworkAddressType;
        value: string;
        toAddress: string | undefined;
        token?: ITransactionToken | undefined;
        toToken?: ITransactionToken | undefined;
        mfaType?: MFAType | undefined;
        password?: string | undefined;
        historyType?: ITransactionType['historyType'];
    }) => Promise<any>;
};
export default useSendTransaction;
