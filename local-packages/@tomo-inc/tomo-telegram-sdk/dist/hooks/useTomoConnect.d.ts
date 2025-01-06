import { ConnectResult } from '../TomoContext';
import { TomoOptions } from '../v2/types/types';
declare type TomoConnectOptions = {
    tonProof?: string;
    email?: string;
    workChain?: number;
};
interface Iprops {
    chain: string;
    options: TomoOptions;
    setProviders: (providers: Record<string, any>) => void;
    setConnectResult?: (result: ConnectResult) => void;
}
declare const useTomoConnect: ({ chain, options, setConnectResult }: Iprops) => {
    connect: (connectOptions?: TomoConnectOptions) => Promise<any>;
    connected: boolean;
};
export default useTomoConnect;
