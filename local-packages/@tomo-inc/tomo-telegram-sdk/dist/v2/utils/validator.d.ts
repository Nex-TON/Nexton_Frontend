declare type EIP712Types = {
    [propsKey: string]: any;
};
export declare function vaildatorEIP712(EIP712Data: EIP712Types): EIP712Types;
export declare function resemblesEvmAddress(string?: string): boolean;
export {};
