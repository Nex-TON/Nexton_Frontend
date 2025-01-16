import React from 'react';
import { CONNECT_MAP } from '../util/const';
import { ConnectOptions, ConnectResult } from '../TomoContext';
import { SupportedProvider, TomoOptions } from '../v2/types/types';
interface IProps {
    opened: boolean;
    onClose: (fn?: () => void) => void;
    title?: string;
    manifestUrl?: string;
    back?: boolean;
    close?: boolean;
    setConnected: (connect: boolean) => void;
    supportedProviders: SupportedProvider[];
    supportedConnects: CONNECT_MAP[];
    setProviders: (providers: Record<string, any>) => void;
    tomoOptions?: TomoOptions;
    theme?: 'dark' | 'light';
    connectOptions?: ConnectOptions;
    setConnectResult?: (result: ConnectResult) => void;
}
declare const TomoModal: ({ title, manifestUrl, opened, close, back, onClose, setConnected, supportedProviders, supportedConnects, setProviders, tomoOptions, theme, connectOptions, setConnectResult, }: IProps) => React.JSX.Element;
export default TomoModal;
