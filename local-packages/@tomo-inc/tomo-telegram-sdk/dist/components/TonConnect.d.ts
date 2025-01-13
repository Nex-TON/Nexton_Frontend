import React from 'react';
import { ConnectResult } from '../TomoContext';
/**
 * useTonConnect hook --> TonConnect component
 * just for lazy load
 */
interface IProps {
    closeModal: () => void;
    setProviders: (providers: Record<string, any>) => void;
    setConnectResult?: (result: ConnectResult) => void;
    updateTonConnect: (obj: {
        connect: (connectParams?: {
            tonProof?: string;
        }) => Promise<string>;
        connected: boolean;
    }) => void;
}
declare const TonConnect: ({ closeModal, setProviders, setConnectResult, updateTonConnect, }: IProps) => React.JSX.Element;
export default TonConnect;
