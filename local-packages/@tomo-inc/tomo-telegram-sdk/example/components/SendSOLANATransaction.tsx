import * as React from 'react';
import { useState } from 'react';
import useSendTransaction from '../../src/hooks/useSendTransaction';
import useTomoUserInfo from '../../src/hooks/useTomoUserInfo';
import { parseUnits, zeroAddress } from 'viem';
import { useLoading } from './useLoading';
import { mockSolEvmChainId, solDecimals } from '../../src/config/sol';

const SendSOLANATransaction = () => {
  const [inputCount, setInputCount] = useState<string>();
  const [toAddress, setToAddress] = useState<string>();
  const { solAddress } = useTomoUserInfo();
  const { sendSolTransaction } = useSendTransaction();
  const [sendLoading, sendLoadingFn] = useLoading();

  const handleSendToken = () => {
    sendLoadingFn(async () => {
      const res = await sendSolTransaction({
        fromAddress: solAddress,
        toAddress: toAddress,
        value: parseUnits(inputCount || '0', solDecimals),
        // contract?: string;  // SOL SPL Token Address
        token: {
          chainId: mockSolEvmChainId,
          image: 'sol-icon.svg',
          name: 'solana',
          symbol: 'SOL',
          decimals: solDecimals,
          address: zeroAddress,
        },
      });
    });
  };

  return (
    <div>
      <div>
        <h2>SendSOLANATransaction</h2>
        <div>
          <p>fromAddress: {solAddress}</p>
          {/* <p>balance: {balance.data?.formatted}</p> */}
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
          <button disabled={sendLoading} onClick={handleSendToken}>
            {sendLoading ? 'Sending...' : 'Send SOLANA Token'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendSOLANATransaction;
