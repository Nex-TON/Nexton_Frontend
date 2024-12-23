import * as React from 'react';
import { TokenType, useOnRamp, useUserTokens } from '../../src';

const OnRamp = () => {
  const { tokens } = useUserTokens();

  const [token, setToken] = React.useState<TokenType>();
  const [rampType, setRampType] = React.useState<'ramp' | 'mercuryo'>('ramp');
  const [type, setType] = React.useState<'buy' | 'sell'>('buy');

  const { onContinue, title } = useOnRamp({
    type: type,
    token: token,
    rampType: rampType,
  });

  React.useEffect(() => {
    if (!token && tokens.length > 0) {
      setToken(tokens[0]);
    }
  }, [tokens, token]);

  React.useEffect(() => {
    if (type === 'sell') {
      setRampType('mercuryo');
    }
  }, [type]);

  return (
    <div>
      <h2>OnRamp</h2>
      <p>
        buy or sell:
        <select
          value={type}
          onChange={e => {
            setType(e.target.value as any);
          }}
        >
          <option value={'buy'}>buy</option>
          <option value={'sell'}>sell</option>
        </select>
      </p>
      <p>
        rampType:
        <select
          value={rampType}
          onChange={e => {
            setRampType(e.target.value as any);
          }}
        >
          {type === 'buy' && <option value={'ramp'}>ramp</option>}
          <option value={'mercuryo'}>mercuryo</option>
        </select>
      </p>
      <p>
        token:{' '}
        <select
          onChange={e => {
            const [chainId, contract] = e.target.value.split(',');

            const find = tokens.find(token => {
              return (
                token.chain_id === Number(chainId) &&
                token.contract === contract
              );
            });

            setToken(find);
          }}
        >
          {tokens.map((token, index) => {
            return (
              <option
                key={index + token.chain_id + token.contract}
                value={[token.chain_id.toString(), token.contract]}
              >
                {token.chain_id}-{token.symbol.toLocaleUpperCase()}
              </option>
            );
          })}
        </select>
      </p>
      <p>onRampTitle: {title}</p>
      <p>
        <button disabled={!token} onClick={onContinue}>
          continue
        </button>
      </p>
    </div>
  );
};

export default OnRamp;
