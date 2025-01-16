import React from 'react';
import { CONNECT_MAP } from '../util/const';
import { ConnectOptions, ConnectResult } from '../TomoContext';
import { TomoOptions } from '../v2/types/types';
interface IProps {
    defaultSelect?: string;
    closeModal: () => void;
    show: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    manifestUrl?: string;
    setConnected: (connect: boolean) => void;
    chain: string;
    setProviders: (providers: Record<string, any>) => void;
    supportedConnects: CONNECT_MAP[];
    tomoOptions?: TomoOptions;
    theme?: 'dark' | 'light';
    connectOptions?: ConnectOptions;
    setConnectResult?: (result: ConnectResult) => void;
}
declare const ConnectMain: ({ closeModal, show, setConnected, chain, manifestUrl, supportedConnects, tomoOptions, theme, connectOptions, setIsLoading, setConnectResult, }: IProps) => React.JSX.Element;
export default ConnectMain;
