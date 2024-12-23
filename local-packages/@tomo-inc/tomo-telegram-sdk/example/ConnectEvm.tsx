//@ts-ignore
import React, { useState, useEffect, useContext } from 'react';
import { CONNECT_MAP, TomoProvider, useTomo } from '../dist';
import './v2.css';
import { EthereumProvider } from '../dist';
import { SupportedProvidersContext } from '.';
import BigNumber from 'bignumber.js';
import { useThemeParams } from '@vkruglikov/react-telegram-web-app';
import { BASE_URL_DEV } from './baseUrlDev';
import { url } from 'inspector';

function stringToHex(str: string) {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16);
  }
  return '0x' + hex;
}

function Index({ setChains }: { setChains: any }) {
  const [supportedChains, setSupportedChains] = useState('1,56,324');
  const [chainIdInvalid, setChainIdInvalid] = useState(false);
  const [addr, setAddr] = useState('');
  const [requestAccountsRs, setRequestAccountsRs] = useState('');
  const [ethAccountsRs, setEthAccountsRs] = useState('');
  const [chainIdInput, setChainIdInput] = useState('1');
  const [ethChainId, setEthChainId] = useState('');
  const [switchChainRs, setSwitchChainRs] = useState('');
  const [personalSignInput, setPersonalSignInput] = useState('');
  const [personalSignResult, setPersonalSignResult] = useState('');
  const [toAddr, setToAddr] = useState('');
  const [sendValue, setSendValue] = useState('');
  const [sendChainId, setSendChainId] = useState('');
  const [sendTxResult, setSendTxResult] = useState('');

  const { openConnectModal, providers } = useTomo();

  // on chain ids change
  useEffect(() => {
    try {
      const ids = supportedChains
        .split(',')
        .map(i => i.trim())
        .filter(i => !!i);
      const valid = ids.every(id => !isNaN(+id));
      if (valid) {
        setChainIdInvalid(false);
        setChains(ids);
      } else setChainIdInvalid(true);
    } catch (e) {
      setChainIdInvalid(true);
    }
  }, [supportedChains]);

  const walletAddressReq = async (eth: EthereumProvider) => {
    const [address] = await eth.request({
      method: 'eth_accounts',
    });
    console.log('Multi Chain Tomo Wallet accounts:', address);
    setAddr(address || '');
  };
  useEffect(() => {
    const ethereum = providers.ethereum;
    console.log('ethereum', ethereum, ethereum?.isConnected);
    if (ethereum?.isConnected) {
      walletAddressReq(ethereum);
    } else {
      setAddr('');
    }
  }, [providers.ethereum]);

  // clear after disconnect
  useEffect(() => {
    if (!providers.ethereum) {
      setAddr('');
      setRequestAccountsRs('');
      setEthChainId('');
      setSwitchChainRs('');
    }
  }, [providers.ethereum]);

  const connectWallet = async () => {
    openConnectModal();
  };

  const disconnect = async () => {
    await providers.ethereum?.disconnect?.();
    console.log('disconnect', providers.ethereum?.isConnected);
    setAddr('');
    return;
  };

  // const { setProviderTypes } = useContext(SupportedProvidersContext);

  // useEffect(() => {
  //   setProviderTypes(['EVM']);
  //   console.log(`setProviderTypes(['EVM'])`);
  // }, []);

  return (
    <div className="root">
      <section className="title">
        <img src="https://d18zhf0uo21qy3.cloudfront.net/assets/login-tomo-logo.png" />
        <div className="con">
          <h1>Demo For TG SDK Connect</h1>
        </div>
      </section>
      <div className="step1">
        <div className="addrCon">
          {addr ? (
            <>
              <h2>My Tomo Wallet Address</h2>
              <span className="addr">{addr ?? ''}</span>
              <div className="btn1" onClick={disconnect}>
                Disconnect
              </div>
              <div className="btn1" onClick={() => openConnectModal()}>
                Open Modal While connected
              </div>
            </>
          ) : (
            <>
              <h2>Connect To Tomo Wallet</h2>
              <h3
                style={{
                  color: chainIdInvalid ? 'red' : 'black',
                }}
              >
                please enter supported chainIds, separate by comma
              </h3>
              <input
                type="text"
                placeholder="chainId"
                className="addrInput"
                value={supportedChains}
                onChange={e => {
                  setSupportedChains(e.target.value);
                }}
              />
              <div className="btn1" onClick={connectWallet}>
                Connect
              </div>
            </>
          )}
        </div>
      </div>
      <div className="step1">
        <div className="addrCon">
          {requestAccountsRs}
          <button
            className="btn1"
            style={{ opacity: addr ? 1 : 0.4 }}
            onClick={() => {
              providers.ethereum
                ?.request({
                  method: 'eth_requestAccounts',
                })
                .then(rs => {
                  setRequestAccountsRs(rs);
                });
            }}
            disabled={!providers.ethereum}
          >
            eth_requestAccounts
          </button>
        </div>
      </div>
      <div className="step1">
        <div className="addrCon">
          {ethAccountsRs}
          <button
            className="btn1"
            style={{ opacity: addr ? 1 : 0.4 }}
            onClick={() => {
              providers.ethereum
                ?.request({
                  method: 'eth_accounts',
                })
                .then(rs => {
                  setEthAccountsRs(rs);
                });
            }}
            disabled={!providers.ethereum}
          >
            eth_accounts
          </button>
        </div>
      </div>
      <div className="step1">
        <div className="addrCon">
          {ethChainId}
          <button
            className="btn1"
            style={{ opacity: addr ? 1 : 0.4 }}
            onClick={() => {
              providers.ethereum
                ?.request({
                  method: 'eth_chainId',
                })
                .then(rs => {
                  setEthChainId(rs);
                });
            }}
            disabled={!providers.ethereum}
          >
            eth_chainId
          </button>
        </div>
      </div>
      <div className="step1">
        <div className="addrCon">
          <h2>ChainId</h2>
          <input
            type="text"
            placeholder="0x...."
            className="addrInput"
            value={chainIdInput}
            onChange={e => {
              setChainIdInput(e.target.value);
            }}
          />
          <button
            className="btn1"
            style={{ opacity: addr ? 1 : 0.4 }}
            onClick={() => {
              providers.ethereum
                ?.request({
                  method: 'wallet_switchEthereumChain',
                  params: [
                    {
                      chainId: '0x' + (+chainIdInput).toString(16),
                    },
                  ],
                })
                .then(rs => {
                  setSwitchChainRs(JSON.stringify({ rs }));
                })
                .catch(error => {
                  setSwitchChainRs(error.message);
                });
            }}
            disabled={!providers.ethereum}
          >
            wallet_switchEthereumChain
          </button>
          {switchChainRs}
        </div>
      </div>
      <div className="step1">
        <div className="addrCon">
          <h2>personal_sign</h2>
          <textarea
            placeholder="message"
            // className="addrInput"
            value={personalSignInput}
            onChange={e => {
              setPersonalSignInput(e.target.value);
            }}
          />
          <button
            className="btn1"
            style={{ opacity: addr ? 1 : 0.4 }}
            onClick={() => {
              providers.ethereum
                ?.request({
                  method: 'personal_sign',
                  params: [stringToHex(personalSignInput), addr],
                })
                .then(rs => {
                  setPersonalSignResult(JSON.stringify(rs));
                });
            }}
            disabled={!providers.ethereum}
          >
            personal_sign
          </button>
          {personalSignResult}
        </div>
      </div>
      <div className="step1">
        <div className="addrCon">
          <h2>eth_sendTransaction</h2>
          <p>
            <b>To Address:</b>
          </p>
          <input
            type="text"
            placeholder="0x...."
            className="addrInput"
            value={toAddr}
            onChange={async e => {
              setToAddr(e.target.value);
            }}
          />

          <p style={{ marginTop: 5 }}>
            <b>Value:</b>
          </p>
          <input
            type="text"
            className="addrInput"
            value={sendValue}
            onChange={async e => {
              const val = e.target.value;
              setSendValue(val);
            }}
          />
          <p style={{ marginTop: 5 }}>
            <b>Chain Id:</b>
          </p>
          <input
            className="addrInput"
            placeholder="will use the chainId from eth_chainId if leave blank"
            value={sendChainId}
            onChange={e => setSendChainId(e.target.value)}
          />
        </div>
        <div className="addrCon">
          <button
            className="btn1"
            style={{ opacity: addr ? 1 : 0.4 }}
            onClick={() => {
              const val = new BigNumber(sendValue)
                .multipliedBy(10 ** 18)
                .toString(16);
              const param = {
                method: 'eth_sendTransaction',
                params: [
                  {
                    from: addr,
                    to: toAddr,
                    value: '0x' + val,
                    ...(sendChainId && { chainId: sendChainId }),
                    // gas: '0x76c0',
                    // gasPrice: '0x9184e72a000',
                    // nonce: '0x9184e72a000',
                  },
                ],
              };
              providers.ethereum?.request(param).then(rs => {
                setSendTxResult(JSON.stringify(rs));
              });
            }}
            disabled={!providers.ethereum}
          >
            eth_sendTransaction
          </button>
          {sendTxResult}
        </div>
      </div>
    </div>
  );
}

export default function Wrapper() {
  const [ColorScheme] = useThemeParams();
  const [chains, setChains] = useState<number[]>([]);
  return (
    <TomoProvider
      theme={ColorScheme}
      supportedProviders={['EVM']}
      supportedConnects={[
        CONNECT_MAP.TOMO_MINI_APP,
        CONNECT_MAP.OKX_CONNECT,
        CONNECT_MAP.BITGET_WALLET,
        CONNECT_MAP.UXUY_WALLET,
      ]}
      manifestUrl={'https://d8o5s6z018yzr.cloudfront.net/manifestUrl.json'}
      tomoOptions={{
        ...BASE_URL_DEV,
        metaData: {
          icon:
            'https://d18zhf0uo21qy3.cloudfront.net/assets/login-tomo-logo.png',
          name: 'testing',
          url: location.origin + '/testing',
        },
      }}
      useEvmChains={chains}
    >
      <Index setChains={setChains} />
    </TomoProvider>
  );
}
