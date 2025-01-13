import { BTCNetworkType } from '../api/type';
export declare const getBalanceFromNode: (address: string | undefined, rpc: string) => Promise<any>;
declare const useBTCBalance: (netWorkType?: BTCNetworkType) => import("@tanstack/query-core/build/legacy/hydration-mKPlgzt9").av<{
    value: any;
    address: string;
    type: import("../config/btc").IBtcAddressType;
}[], Error>;
export default useBTCBalance;
