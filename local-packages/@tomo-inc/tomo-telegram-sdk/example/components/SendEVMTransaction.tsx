import * as React from 'react';
import { useState } from 'react';
import useSendTransaction from '../../src/hooks/useSendTransaction';
import { useBalance, useConfig } from 'wagmi';
import { mainnet } from 'viem/chains';
import useTomoUserInfo from '../../src/hooks/useTomoUserInfo';
import { parseUnits, zeroAddress } from 'viem';
import { useLoading } from './useLoading';

const SendEVMTransaction = () => {
  const [inputCount, setInputCount] = useState<string>();
  const [toAddress, setToAddress] = useState<string>();
  const config = useConfig();
  const { evmAddress } = useTomoUserInfo();
  const { sendEVMTransaction } = useSendTransaction();

  const [sendEVMBiometryLoading, sendEVMLoadingBiometryFn] = useLoading();
  const [sendEVMPasswordLoading, sendEVMLoadingPasswordFn] = useLoading();

  // const balance = useBalance({
  //   chainId: sepolia.id,
  // });

  const handleSendEVMBiometry = () => {
    sendEVMLoadingBiometryFn(async () => {
      const res = await sendEVMTransaction({
        chainId: mainnet.id,
        fromAddress: evmAddress,
        toAddress: toAddress,
        value: parseUnits(inputCount || '0', 18),
        // rpc: sepolia.rpcUrls.default.http[0],
        config,
        tokenValue: parseUnits(inputCount || '0', 18),
        token: {
          chainId: mainnet.id,
          image: 'https://etherscan.io/images/main/empty-token.png',
          name: 'Ether',
          symbol: 'ETH',
          decimals: mainnet.nativeCurrency.decimals,
          address: zeroAddress,
        },
      });
    });
  };

  const handleSendEVMPassword = () => {
    const password = prompt('Please enter your password');
    if (!password) return;
    sendEVMLoadingPasswordFn(async () => {
      const res = await sendEVMTransaction({
        chainId: mainnet.id,
        fromAddress: evmAddress,
        toAddress: toAddress,
        value: parseUnits(inputCount || '0', 18),
        // rpc: sepolia.rpcUrls.default.http[0],
        config,
        tokenValue: parseUnits(inputCount || '0', 18),
        token: {
          chainId: mainnet.id,
          image: 'https://etherscan.io/images/main/empty-token.png',
          name: 'Ether',
          symbol: 'ETH',
          decimals: mainnet.nativeCurrency.decimals,
          address: zeroAddress,
        },

        mfaType: 'password',
        password: password,
      });
    });
  };
  return (
    <div>
      <div>
        <h2>SendEVMTransaction</h2>
        <div>
          <p>fromAddress: {evmAddress}</p>
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
          <button
            disabled={sendEVMBiometryLoading}
            onClick={handleSendEVMBiometry}
          >
            {sendEVMBiometryLoading ? 'Sending...' : 'Send EVM Token Biometry'}
          </button>
          <button
            disabled={sendEVMPasswordLoading}
            onClick={handleSendEVMPassword}
          >
            {sendEVMPasswordLoading ? 'Sending...' : 'Send EVM Token Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendEVMTransaction;
