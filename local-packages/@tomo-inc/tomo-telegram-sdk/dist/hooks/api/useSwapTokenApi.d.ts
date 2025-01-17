export declare const useSwapAllTokens: ({ chain }: {
    chain: string;
}, options?: {
    onError?: (error: any) => void;
}) => import("@tanstack/query-core/build/legacy/hydration-mKPlgzt9").av<{
    result: any[];
}, Error>;
export declare const useSwapAllTokensSearch: ({ chain, content, config, }: {
    chain?: string;
    content: string;
    config: {
        url: string;
        tmaid: string;
        tmakey: string;
    };
}, options?: {
    onError?: (error: any) => void;
}) => import("@tanstack/query-core/build/legacy/hydration-mKPlgzt9").av<any, Error>;
