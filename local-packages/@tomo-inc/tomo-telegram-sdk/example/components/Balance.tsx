import * as React from 'react';
import useBalance from '../../src/hooks/useBalance';
import { sepolia } from 'viem/chains';

const Balance = () => {
  const balance = useBalance({ chainId: sepolia.id });
  return (
    <div>
      <h2>Balance</h2>
      <p>chain: {sepolia.name}</p>
      <p>
        balance: {balance.data?.formatted} {balance.data?.symbol}
      </p>
    </div>
  );
};

export default Balance;
