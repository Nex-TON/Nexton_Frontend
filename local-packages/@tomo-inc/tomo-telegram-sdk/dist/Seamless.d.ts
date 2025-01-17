import * as React from 'react';
import { TomoProviderProps } from './TomoContext';
import { TonProvider } from './v2/types/types';
import { EthereumProvider } from './v2/provider/EthereumProvider/EthereumProvider';
declare type OnConnectType = 'TON' | 'SOL' | 'EVM';
declare type OnConnect = (param: {
    type: OnConnectType;
    provider: TonProvider | EthereumProvider;
}) => any;
export declare type initTomoModalParams = Omit<TomoProviderProps, 'children'> & {
    onConnect?: OnConnect;
};
export declare function Seamless({ onConnect, resolve, ...restProps }: initTomoModalParams & {
    resolve: (value: unknown) => void;
}): React.JSX.Element;
export declare function Dummy({ onConnect, onMounted, }: {
    onConnect: OnConnect;
    onMounted: (value: unknown) => void;
}): React.JSX.Element;
export declare function initTomoModal({ onConnect, ...restProps }: initTomoModalParams): Promise<unknown>;
export {};
