import { MetaData } from '..';
interface Option {
    metaData?: MetaData;
    chain?: string;
    theme?: 'dark' | 'light';
}
declare function useUxuyEVMConnect(option?: Option): {
    connect: () => Promise<void>;
};
export default useUxuyEVMConnect;
