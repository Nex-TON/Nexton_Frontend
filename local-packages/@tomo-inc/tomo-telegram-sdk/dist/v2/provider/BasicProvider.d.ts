import EventEmitter from 'eventemitter3';
import { Account, initOptions } from '../types/types';
import ProviderUtils from './ProviderUtils';
export default class BasicProvider extends EventEmitter {
    isConnected: boolean;
    utils: ProviderUtils;
    constructor(options?: initOptions);
    connect(method: string, params?: {
        tonProof?: string;
        email?: string;
        domain?: string;
        chainId?: number;
    }): Promise<Account>;
    disconnect(method: string): Promise<void>;
}
