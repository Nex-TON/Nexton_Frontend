export default function useBuildSwapTx(params: {
    fromChainid: number;
    toChainid: number;
    fromAddress: string;
    toAddress: string;
    amount: string;
    slippage: number;
    fromWalletAddress: string;
    toWalletAddress: string;
}, options?: {
    refetchInterval?: boolean;
    onError?: (error: any) => void;
}): import("@tanstack/query-core/build/legacy/hydration-mKPlgzt9").av<import("../../api/type").SwapResult, Error>;
