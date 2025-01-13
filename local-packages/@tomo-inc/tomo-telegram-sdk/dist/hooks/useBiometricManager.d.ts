export default function useBiometricManager(): {
    biometryManager: any;
    requestAccess: ({ reason, callback, }: {
        reason?: string;
        callback: (success: boolean) => void;
    }) => void;
    authenticate: ({ reason, callback, failCallback, }: {
        reason?: string;
        callback: (success: boolean, token: string) => void;
        failCallback?: (error: Error) => void;
    }) => void;
    bioAvailable: any;
    bioInited: any;
    bioAccessGranted: any;
};
