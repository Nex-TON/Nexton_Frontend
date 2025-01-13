import { BTCNetworkType } from '../api/type';
/**
 * Fetches balance information using the specified chain ID, token, and network type.
 *
 * @param {number | undefined} chainId - The ID of the blockchain. If `chainId` is 0, `netWorkType` is a required parameter.
 * @param {string} [token] - The identifier of the token.
 * @param {BTCNetworkType} [netWorkType] - The network type, which can be "MAINNET", "TESTNET", or "SIGNET".
 * @param options
 */
declare const useBalance: ({ chainId, token, netWorkType, decimal, }: {
    chainId: number | undefined;
    token?: string;
    netWorkType?: BTCNetworkType;
    decimal?: number;
}, options?: {
    onError?: (error: any) => void;
}) => import("@tanstack/query-core/build/legacy/hydration-mKPlgzt9").av<{
    decimals: number;
    formatted: string | number;
    symbol: string;
    value: any;
}, Error>;
export default useBalance;
