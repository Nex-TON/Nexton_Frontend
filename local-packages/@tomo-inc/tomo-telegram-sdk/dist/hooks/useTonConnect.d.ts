import { ConnectResult } from '../TomoContext';
interface Option {
    connectSuccess?: () => void;
    connectError?: () => void;
    setProviders: (providers: Record<string, any>) => void;
    setConnectResult?: (result: ConnectResult) => void;
}
declare const useTonConnect: (option: Option) => {
    connect: (connectParams?: {
        tonProof?: string;
    }) => Promise<string>;
    disconnect: () => Promise<void>;
    connected: boolean;
};
export default useTonConnect;
