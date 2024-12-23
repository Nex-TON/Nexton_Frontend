import * as React from 'react';
import useChains from '../../src/hooks/useChains';

const Chains = () => {
  const { evmChains, getChainId, getChain, chains, chainIds } = useChains();

  const curChainId = getChainId(
    chains.find(item => {
      return item.chain && !!item.chain.id;
    })
  );

  const curChain = curChainId && getChain(curChainId);

  return (
    <div>
      <h2>Chains</h2>
      <select name={chains[0].name}>
        {chains.map((chain, index) => {
          return (
            <option key={index + chain.name} value={chain.name}>
              {chain.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Chains;
