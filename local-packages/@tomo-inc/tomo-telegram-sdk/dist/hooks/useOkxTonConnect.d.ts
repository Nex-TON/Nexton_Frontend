import { ConnectResult } from '../TomoContext';
interface Option {
    connectSuccess?: () => void;
    connectError?: () => void;
    metaData?: OkxConnectMeta;
    setProviders: (providers: Record<string, any>) => void;
    chain?: string;
    theme?: 'dark' | 'light';
    setConnectResult?: (result: ConnectResult) => void;
}
interface OkxConnectMeta {
    name: string;
    icon: string;
}
declare const useOkxTonConnect: (option?: Option) => {
    okxConnect: any;
    connect: (connectOption?: {
        redirect?: string;
        tonProof?: string;
    }) => Promise<boolean>;
    disconnect: () => Promise<void>;
    connected: boolean;
    sendTransaction: (transactionRequest: any) => Promise<any>;
};
export default useOkxTonConnect;
