declare const useTonTransactions: () => {
    queryHash: (address: string, msgHash: string) => Promise<any>;
};
export default useTonTransactions;
