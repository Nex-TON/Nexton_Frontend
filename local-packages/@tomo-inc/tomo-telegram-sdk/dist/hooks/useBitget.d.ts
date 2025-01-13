import { MetaData } from '..';
interface Option {
    metaData?: MetaData;
    chain?: string;
    theme?: 'dark' | 'light';
}
declare function useBitget(option?: Option): {
    connect: () => Promise<void>;
};
export default useBitget;
