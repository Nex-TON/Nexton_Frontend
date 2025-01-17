export declare type MFAType = 'biometric' | 'password';
export declare const useMFAVerify: () => {
    getMFAParams: (params: {
        data: any;
        chainid: number;
    }, type?: MFAType, password?: string, reason?: string) => Promise<{
        mfa: any;
        signature: any;
    }>;
};
