import { IWeb3ChainType } from '../type';
import btc from './btc';
import solana from './solana';
import ton from './ton';
import sui from './sui';
declare const tomoEVMChains: IWeb3ChainType[];
declare const tomoChains: IWeb3ChainType[];
export { tomoEVMChains, tomoChains, btc, solana, ton, sui };
