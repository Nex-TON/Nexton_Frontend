import BasicProvider from "../BasicProvider";
export default class BitcoinProvider extends BasicProvider {
    utils: any;
    constructor(options?: any);
    connectWallet(): Promise<any>;
    sendTransaction(): void;
    signMessage(): void;
    signTransaction(): void;
}
