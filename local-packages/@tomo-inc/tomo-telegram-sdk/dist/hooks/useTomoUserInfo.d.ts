import { IWeb3ChainType } from '../providers/web3Provider/type';
export default function useTomoUserInfo(): {
    getAddressByChain: ({ chain, options, }: {
        chain: IWeb3ChainType | undefined;
        options?: {
            btcType: 'pkh' | 'sh' | 'tr' | 'wpkh';
        };
    }) => any;
    userInfo: any;
    setUserInfo: any;
    deviceId: any;
    evmAddress: any;
    solAddress: any;
    tonAddress: any;
    tonPublicKey: any;
    btcAddress: {
        bitcoinP2PkhAddress: any;
        bitcoinP2ShAddress: any;
        bitcoinP2TrAddress: any;
        bitcoinP2WpkhAddress: any;
    };
    generateDeviceId: () => Promise<any>;
};
