import * as React from 'react';
import { useState } from 'react';
import useSendTransaction from '../../src/hooks/useSendTransaction';
import useTomoUserInfo from '../../src/hooks/useTomoUserInfo';
import { parseUnits, zeroAddress } from 'viem';
import { useLoading } from './useLoading';
import { mockTonChainId, tonDecimals } from '../../src/config/ton';
import useBalance from '../../src/hooks/useBalance';
import useTonTransactions from '../../src/hooks/useTonTransactions';
// import TonWeb from 'tonweb';

const SendTONTransaction = () => {
  const [inputCount2, setInputCount2] = useState<string>('');
  const [toAddress2, setToAddress2] = useState<string>('');
  const [msgHash, setMsgHash] = useState<string>('');
  const [txhash, setTxhash] = useState<string>('');
  const { tonAddress, tonPublicKey } = useTomoUserInfo();
  const { sendTonTransaction } = useSendTransaction();
  const { queryHash } = useTonTransactions();

  const [sendTONLoading, sendTONLoadingFn] = useLoading();
  const [tokenContract, setTokenContract] = useState<string>('EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT')
  const [tokenDecimal, setTokenDecimal] = useState<string>('9')

  
  const balanceJetton = useBalance({
    chainId: mockTonChainId,
    token: tokenContract,
    decimal: tokenDecimal ? Number(tokenDecimal) : undefined
  });


  const handleJettonToken = () => {
    sendTONLoadingFn(async () => {
      const memo = ``
      const res = await sendTonTransaction({
        fromAddress: `${tonAddress}`,
        publicKey: `${tonPublicKey}`,
        value: parseUnits(inputCount2 || '0', tonDecimals),
        toAddress: toAddress2,
        memo: memo,
        token: {
          chainId: mockTonChainId,
          image:
            'https://assets.coingecko.com/coins/images/17980/standard/ton_symbol.png',
          name: 'Toncoin',
          symbol: 'TON',
          decimals: 9,
          address: zeroAddress,
        },
        // mfaType: 'password',
        // password: '1234',
        tokenContractAddress: tokenContract,
        tokenPrecision: tokenDecimal ? Number(tokenDecimal) : undefined
      });
    });
  }

  const handleQueryTransaction = async () => {
    const txhashRes = await queryHash(`${tonAddress}`, msgHash);
    setTxhash(txhashRes);
  };

  return (
    <div>
      <div>
        <h2>SendTONTransaction</h2>
        <div>
          <p>fromAddress: {tonAddress}</p>
          <p>jetton balance: {balanceJetton.data?.formatted}</p>
          <p>jetton contract address:
            {tokenContract}
          </p>
          <p>jetton contract decimal:
            {tokenDecimal}
          </p>

          <p>
            toAddress:
            <input
              value={toAddress2}
              type="text"
              onChange={e => setToAddress2(e.target.value)}
            />
          </p>
          <p>
            value:
            <input
              value={inputCount2}
              type="text"
              onChange={e => setInputCount2(e.target.value)}
            />
          </p>

          {/* sendTONLoadingFn */}
          <button disabled={sendTONLoading} onClick={handleJettonToken}>
            {sendTONLoading ? 'Sending...' : 'Send Jetton Token'}
          </button>
        </div>
        <h3>getTransactionsByInMessageHash</h3>
        <div>
          <p>
            msgHash:
            <input
              value={msgHash}
              type="text"
              onChange={e => setMsgHash(e.target.value)}
            />
          </p>
          <p>
            tx hash: <span>{txhash}</span>
          </p>
          <button disabled={sendTONLoading} onClick={handleQueryTransaction}>
            {sendTONLoading ? 'Query...' : 'Query transactions'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendTONTransaction;
