import * as React from 'react';
import { useState } from 'react';
import useSendTransaction from '../../src/hooks/useSendTransaction';
import useTomoUserInfo from '../../src/hooks/useTomoUserInfo';
import { parseUnits, zeroAddress } from 'viem';
import { useLoading } from './useLoading';
import { mockTonChainId, tonDecimals } from '../../src/config/ton';
import useBalance from '../../src/hooks/useBalance';
import useTonTransactions from '../../src/hooks/useTonTransactions';
import TonWeb from 'tonweb';

const SendTONTransaction = () => {
  const [inputCount, setInputCount] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [msgHash, setMsgHash] = useState<string>('');
  const [txhash, setTxhash] = useState<string>('');
  const { tonAddress, tonPublicKey } = useTomoUserInfo();
  const { sendTonTransaction } = useSendTransaction();
  const { queryHash } = useTonTransactions();

  const [sendTONLoading, sendTONLoadingFn] = useLoading();

  const balance = useBalance({
    chainId: mockTonChainId
  });

  const handleSendTONToken = () => {
    // const buffer = TonWeb.utils.base64ToBytes('te6cckEBAgEAhgABaw+KfqWXDcIDid9F5DmJaAgA7zuZAqJxsqAciTilI8/iTnGEeq62piAAHtRKd6wOcJwQLBuBAwEAlSWThWGADIcuhJdhIY/G9oqIUPwWMzgmabsumBSobWk11V4L7cBHLh/BADrQUlob5CopCCoy2VR6qpx6Ku18Ww2Kw37uzAUOHGKs0NM2J1c=')
    // const memo = TonWeb.boc.Cell.oneFromBoc(buffer)
    const memo = `${Date.now()}`

    sendTONLoadingFn(async () => {
      const res = await sendTonTransaction({
        fromAddress: `${tonAddress}`,
        publicKey: `${tonPublicKey}`,
        value: parseUnits(inputCount || '0', tonDecimals),
        toAddress: toAddress,
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
        // password: '1234'
      });
    });
  };

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
          <p>balance: {balance.data?.formatted}</p>
          
          <p>
            toAddress:
            <input
              value={toAddress}
              type="text"
              onChange={e => setToAddress(e.target.value)}
            />
          </p>
          <p>
            value:
            <input
              value={inputCount}
              type="text"
              onChange={e => setInputCount(e.target.value)}
            />
          </p>
          
          <button disabled={sendTONLoading} onClick={handleSendTONToken}>
            {sendTONLoading ? 'Sending...' : 'Send TON Token'}
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
