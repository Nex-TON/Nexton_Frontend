import * as React from 'react';
import { useState } from 'react';
import useSendTransaction, {
  useReadyBtcTransaction,
} from '../../src/hooks/useSendTransaction';
import useTomoUserInfo from '../../src/hooks/useTomoUserInfo';
import { zeroAddress } from 'viem';
import { useLoading } from './useLoading';
import { BTCNetworkAddressType, BTCNetworkType } from '../../src/api/type';
import { btcDecimals, mockBtcEvmChainId } from '../../src/config/btc';

const SendBTCTransaction = () => {
  const [inputCount, setInputCount] = useState<string>();
  const [toAddress, setToAddress] = useState<string>();
  const { btcAddress } = useTomoUserInfo();
  const { sendBtcTransaction } = useSendTransaction();

  const [sendLoading, sendLoadingFn] = useLoading();

  const network: BTCNetworkType = 'SIGNET';
  const addressType: BTCNetworkAddressType = 'P2SH';
  const value = inputCount || '0';

  const handleSendToken = () => {
    sendLoadingFn(async () => {
      const res = await sendBtcTransaction({
        network,
        addressType,
        value: value,
        token: {
          chainId: mockBtcEvmChainId,
          image: 'btc-icon.svg',
          name: 'BITCOIN',
          symbol: 'BTC',
          decimals: btcDecimals,
          address: zeroAddress,
        },
        toAddress,
      });
    });
  };

  return (
    <div>
      <div>
        <h2>SendBTCTransaction</h2>
        <div>
          <p>fromAddress: {btcAddress.bitcoinP2ShAddress}</p>
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
            {sendLoading ? 'Sending...' : 'Send BTC Token'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendBTCTransaction;
