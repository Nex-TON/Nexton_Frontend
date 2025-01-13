interface Option {
    connectSuccess?: () => void;
    connectError?: () => void;
    metaData?: OkxConnectMeta;
    chain?: string;
    theme?: 'dark' | 'light';
}
interface OkxConnectMeta {
    name: string;
    icon: string;
}
declare const useOkxEVMConnect: (option?: Option) => {
    okxUniversalProvider: any;
    connect: () => Promise<any>;
    request: any;
    disconnect: () => void;
    connected: boolean;
};
export default useOkxEVMConnect;
