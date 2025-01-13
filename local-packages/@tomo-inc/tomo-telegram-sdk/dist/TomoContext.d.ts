import React, { ReactNode } from 'react';
import { UserType } from './types/types';
import { InitDataUnsafe } from '@vkruglikov/react-telegram-web-app/lib/useInitData';
import { CONNECT_MAP } from './index';
import * as apiList from './api';
import { TonProvider, TomoOptions, SupportedProvider } from './v2/types/types';
import { EthereumProvider } from './v2/provider/EthereumProvider/EthereumProvider';
import SolanaProvider from './v2/provider/SolanaProvider/SolanaProvider';
import SuiProvider from './v2/provider/SuiProvider/SuiProvider';
declare type EnvType = 'dev' | 'test' | 'main';
declare type LoginType = 'tomo' | 'telegram';
export declare type TomoContextType = {
    env: EnvType;
    tmaid: string;
    tmakey: string;
    endpoints: [string];
    onLogin: (loginType?: LoginType, open?: boolean) => Promise<any>;
    userInfo: UserType | null;
    onLogout: () => void;
    telegramData: InitDataUnsafe;
    tMAuthLink: string;
    onSendEmailCode: (params: {
        email: string;
    }) => Promise<any>;
    onVerifyEmailCode: (params: {
        email: string;
        code: string;
        tradePassword: string;
    }) => Promise<any>;
    onUpdateUserInfo: () => Promise<any>;
    apiList: typeof apiList;
    openConnectModal: (options?: ConnectOptions) => void;
    closeConnectModal: () => void;
    connected: boolean;
    providers: {
        tomo_ton?: TonProvider;
        ethereum?: EthereumProvider;
        tomo_sol?: SolanaProvider;
        tomo_sui?: SuiProvider;
    };
    setProviders: React.Dispatch<React.SetStateAction<{}>>;
    error?: string;
    connectResult?: ConnectResult;
    supportedProviders: SupportedProvider[];
    isEvmConnected: boolean;
    useEvmChains: number[];
};
export declare type ConnectResult = {
    connected?: boolean;
    result: {
        tonProof: Record<string, any>;
    };
};
export declare type ConnectOptions = {
    tonProof?: string;
    workChain?: number;
};
export declare const defaultEndpoints: {
    [key in EnvType]: [string];
};
export declare const defaultTMAuthLink = "https://t.me/tomowalletbot/tomoauthapp";
export declare const TomoContext: React.Context<TomoContextType>;
export interface TomoProviderProps {
    children: ReactNode;
    tmaid?: string;
    tmakey?: string;
    env?: EnvType;
    customEndpoints?: [string];
    customTMAuthLink?: string;
    theme?: 'dark' | 'light';
    supportedProviders?: ('EVM' | 'TON' | 'Solana' | 'SUI')[];
    supportedConnects?: CONNECT_MAP[];
    manifestUrl?: string;
    tomoOptions?: TomoOptions;
    useEvmChains?: number[];
    overrideTomoRpcUrls?: Record<number, string>;
}
export declare const TomoProvider: React.FC<TomoProviderProps>;
export declare const useTomo: () => TomoContextType;
export {};
