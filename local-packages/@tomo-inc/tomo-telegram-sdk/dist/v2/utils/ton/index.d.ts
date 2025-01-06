export declare function parsingTonTxPayload(payloadHex: string): {
    operationCode: number;
    queryId: bigint;
    amount: bigint;
    destination: import("@ton/core").Address;
};
export declare function getJettonMinterAddress(userAddress: any): Promise<any>;
