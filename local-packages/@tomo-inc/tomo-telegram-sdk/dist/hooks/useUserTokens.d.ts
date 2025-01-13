import { CustomTokenParams, TokenType } from '../api/type';
declare const useUserTokens: (tokenSize?: number, options?: {
    onError?: (error: any) => void;
}) => {
    tokens: TokenType[];
    setCustomToken: (params: CustomTokenParams) => Promise<any>;
    refetch: () => void;
};
export default useUserTokens;
