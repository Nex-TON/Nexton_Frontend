declare const useTonBalance: (options?: {
    onError?: (error: any) => void;
}) => import("@tanstack/query-core/build/legacy/hydration-mKPlgzt9").av<{
    balance: any;
    formatted: number;
} | {
    balance: string;
    formatted: string;
}, Error>;
export default useTonBalance;
