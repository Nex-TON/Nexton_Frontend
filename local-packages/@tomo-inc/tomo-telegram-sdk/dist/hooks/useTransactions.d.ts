import { ITransactionType } from '../state/type';
declare const useTransactions: () => {
    transactions: any;
    setTransactions: ({ transaction, }: {
        transaction: ITransactionType;
    }) => void;
};
export default useTransactions;
