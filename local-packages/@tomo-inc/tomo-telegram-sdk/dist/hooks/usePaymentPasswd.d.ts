export default function usePaymentPasswd(): {
    setPasswd: (passwd: string) => Promise<boolean>;
    changePasswd: (old_passwd: string, new_passwd: string) => Promise<boolean>;
    validatePasswd: (passwd: string) => Promise<boolean>;
    checkPasswd: () => Promise<any>;
    paymentPwdExists: any;
};
