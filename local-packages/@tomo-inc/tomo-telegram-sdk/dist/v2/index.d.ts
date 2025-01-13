import Eventemitter3 from 'eventemitter3';
import { EthereumProvider } from './provider/EthereumProvider/EthereumProvider';
import SolanaProvider from './provider/SolanaProvider/SolanaProvider';
import { TonProvider } from './provider/TonProvider/TonProvider';
import SuiProvider from './provider/SuiProvider/SuiProvider';
import { TomoOptions } from './types/types';
declare class WalletTgSdk extends Eventemitter3 {
    version: string;
    ethereum: EthereumProvider;
    solana: SolanaProvider;
    tomo_ton: TonProvider;
    tomo_sui: SuiProvider;
    connectUrl: string;
    bridgeUrl: string;
    connect_direct_link: string;
    injected: boolean;
    metaData: any;
    getAppInfo: () => {
        id: string;
        version: string;
        name: string;
        homepage: string;
        logo: string;
        description: string;
        downloadLinks: {
            android: string;
            googlePlay: string;
            ios: string;
            appleStore: string;
            testflight: string;
            telegram: string;
            browserExtension: {
                chrome: string;
                edge: string;
            };
        };
        deepLinks: {
            scheme: string;
            universallink: string;
            direct_link: string;
        };
    };
    constructor(options?: TomoOptions);
    _initialize(): void;
}
export default WalletTgSdk;
