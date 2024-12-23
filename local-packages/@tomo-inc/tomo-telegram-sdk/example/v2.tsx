import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react';
import { EthereumProvider } from '../dist/tomoEvmProvider.esm';
import './v2.css';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { BASE_URL_DEV } from './baseUrlDev';

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const CHAINS = [
  // {
  //   chainId: 1,
  //   name: "ETH"
  // },
  // {
  //   chainId: 56,
  //   name: "BNB"
  // },
  // {
  //   chainId: 8453,
  //   name: "BASE_ETH"
  // },
  // {
  //   chainId: 81457,
  //   name: "BLAST_ETH",
  // },
  // {
  //   chainId: 43_114,
  //   name: "AVAX",
  // },
  // {
  //   chainId: 534_352,
  //   name: "SCROLL_ETH"
  // },
  {
    chainId: 10,
    name: 'OP_ETH',
  },
  // {
  //   chainId: 59_144,
  //   name: "LINEA_ETH"
  // },
  // {
  //   chainId: 42_161,
  //   name: "ARB_ETH"
  // },
  // {
  //   chainId: 137,
  //   name: "MATIC"
  // },
  // {
  //   chainId: 8333,
  //   name: "B3_ETH"
  // },
  {
    chainId: 11155111,
    name: 'SEPOLIA_ETH',
  },
  {
    chainId: 11155420,
    name: 'OP_SEPOLIA',
  },
  {
    chainId: 324,
    name: 'zksync',
  },
  {
    chainId: 2648,
    name: 'AILayer Testnet',
  },
  {
    chainId: 2649,
    name: 'AILayer Mainnet',
  },
  {
    chainId: 200901,
    name: 'Bitlayer Mainnet',
  },
  {
    chainId: 200810,
    name: 'Bitlayer Testnet',
  },
  {
    chainId: 4200,
    name: 'Merlin Mainnet',
  },
  {
    chainId: 686868,
    name: 'Merlin Testnet',
  },
  {
    chainId: 480,
    name: 'World Chain',
  },
  {
    chainId: 5545,
    name: 'DuckChain Mainnet',
  },
];

function hexToEthAndWei(hexAmount) {
  const weiAmount = BigInt(hexAmount);

  // const ethAmount = weiAmount / BigInt(10 ** 18);
  const ethDecimal = Number(weiAmount) / 1e18;
  const weiString = weiAmount.toString();

  return {
    eth: parseFloat(ethDecimal.toFixed(18)) + '',
    wei: weiString,
  };
}

export default function Index() {
  const [connect, setConnect] = useState(false);
  const [addr, setAddr] = useState('');
  const [toAddr1, setToAddr1] = useState('');
  const [toValue1, setToValue1] = useState('0.1');
  const [signMsgRes2, setSignMsgRes2] = useState('');
  const [chainId, setChainId] = useState(1);
  const [signRes, setSignRes] = useState('');
  const [signMsg, setSignMsg] = useState('hello tomo');
  const [signMsgRes, setSignMsgRes] = useState('');
  const [addFlag, setFlag] = useState(0);

  const [contractAddr, setContractAddr] = useState('');
  const [toAddr2, setToAddr2] = useState('');
  const [toValue2, setToValue2] = useState('0.1');
  const [signRes2, setSignRes2] = useState('');
  // const { openConnectModal, connected } = useTomo();
  const [balance, setBalance] = useState('');
  const ethereum = window.ethereum;

  useEffect(() => {
    new EthereumProvider({
      ...BASE_URL_DEV,
      injected: true,
      overrideRpcUrl: {
        // 80084: 'https://bartioXXX.rpc.berachain.com'
      },
    });
  }, [])

  useEffect(() => {
    walletAddressReq();
  }, []);

  const switchChain = async chainId => {
    setChainId(chainId);
  };
  const chainName = chainId => {
    const temp = {};
    CHAINS.forEach(i => {
      temp[i.chainId] = i.name;
    });
    return temp[chainId];
  };
  const getChainName = useMemo(() => {
    return chainName(chainId);
  }, [chainId]);

  const walletAddressReq = async () => {
    const ethereum = window.ethereum;
    const accounts = await ethereum.request({
      method: 'eth_accounts',
      params: [],
    });
    const isConnected = accounts[0];
    setAddr(accounts[0]);
    console.log(
      'Multi Chain Tomo Wallet accounts:',
      accounts,
      'isConnected',
      !!isConnected
    );
    setConnect(!!isConnected);
  };

  const connectWallet = async () => {
    const ethereum = window.ethereum;
    if (addr) {
      ethereum?.disconnect && ethereum?.disconnect();
      setAddr('');
      return;
    }
    await ethereum.request({
      method: 'eth_requestAccounts',
      params: [],
    });
    await walletAddressReq();
  };

  const signETHTx = async (send?: boolean) => {
    // const exampleToAddr = '0x.................'
    if (!addr || !toAddr1 || !toValue1) return;
    const val = Number(toValue1) * 10 ** 18;
    const response = await ethereum.request({
      method:  send ? 'eth_sendTransaction': 'eth_signTransaction',
      params: [
        {
          from: addr,
          to: toAddr1,
          value: '0x' + val.toString(16),
          chainId: chainId,
          gas: '0x76c0',
          gasPrice: '0x9184e72a000',
          nonce: '0x9184e72a000',
        },
      ],
    });

    console.log(
      'Multi Chain Tomo Wallet sign eth tx success',
      response,
      response.result
    );
    setSignRes(response.result || response);
  };

  const getTxData = (to, value) => {
    const iface = new ethers.utils.Interface(abi);
    const data = iface.encodeFunctionData('transfer', [to, value]);
    console.log('data', data);
    return data;
  };

  const signETHDataTx = async (send?: boolean) => {
    if (!addr || !toAddr2 || !toValue2) return;
    const val = Number(toValue2) * 10 ** 18;
    const hexData = getTxData(toAddr2, val.toString());
    const response = await ethereum.request({
      method: send ? 'eth_sendTransaction' : 'eth_signTransaction',
      params: [
        {
          from: addr,
          to: contractAddr,
          value: 0,
          chainId: chainId,
          data: hexData,
        },
      ],
    });
    console.log('Multi Chain Tomo Wallet sign eth tx success', response.result);
    setSignRes(response.result);
  };

  const addSeed = async () => {
    if (!addr) return;
    const response = await ethereum.request({
      method: 'wallet_addSeed',
      params: [],
    });
    console.log('Multi Chain Tomo Wallet add seed statue:', response.result);
    setFlag(response.result ? 1 : 2);
    walletAddressReq();
  };

  const signMessage = async () => {
    /*
    // check if msg hex
    const flag = ethers.isHexString(signMsgRes)
    */
    const response = await ethereum.request({
      method: 'personal_sign',
      params: [signMsg, addr],
    });
    setSignMsgRes(response.result);
    console.log('Multi Chain Tomo Wallet Sign result:', response.result);
  };

  const sendSignedTxExample = async (rpc, serializedTx) => {
    //signed tx hash
    const provider = new Web3.providers.HttpProvider(rpc);
    const web3 = new Web3(provider);
    try {
      const res = await web3.eth.sendSignedTransaction(serializedTx);
      console.log('result:', res);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    (window as any).sendSignedTxExample = sendSignedTxExample;
  }, []);

  const getBalance = async () => {
    // eth_getBalance
    const res = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [addr, 'latest'],
    });
    console.log('eth_getBalance>>>>>', res, hexToEthAndWei(res));
    setBalance(hexToEthAndWei(res).eth);
  };

  return (
    <div className="root">
      <section className="title">
        <img src="https://d18zhf0uo21qy3.cloudfront.net/assets/login-tomo-logo.png" />
        <div className="con">
          <h1>Demo For Tomo TG Wallet </h1>
        </div>
      </section>
      {/* <div className="btn1" onClick={openConnectModal}>
        Open Connect Modal
      </div> */}
      <div className="step1">
        {addr ? (
          <>
            <h2>My Tomo Wallet Address</h2>
            <span className="addr">{addr ?? ''}</span>
            <div className="btn1" onClick={connectWallet}>
              {addr ? 'Disconnect' : 'Connect'}
            </div>
          </>
        ) : (
          <>
            <h2>Connect To Tomo Wallet</h2>
            <div className="btn1" onClick={connectWallet}>
              {addr ? 'Disconnect' : 'Connect'}
            </div>
          </>
        )}
      </div>
      <div
        className="btn1"
        // style={{ opacity: balanceAddr ? 1 : 0.4 }}
        onClick={getBalance}
      >
        Get Balance
      </div>
      <>
        {balance ? (
          <>
            <p className="addrCon">
              <b>Result: {balance} ETH</b>
            </p>
          </>
        ) : null}
      </>
      <div className="step1">
        <h2>1. Sign {getChainName} Transaction</h2>
        <span className="titleTip">Please input data</span>
        <div className="addrCon">
          <p>
            <b>To Address:</b>
          </p>
          <input
            type="text"
            placeholder="0x...."
            className="addrInput"
            value={toAddr1}
            onChange={async e => {
              const v = e.target.value;
              setToAddr1(v);
              setSignRes('');
            }}
          />

          <p style={{ marginTop: 5 }}>
            <b>Value:</b>
          </p>
          <input
            type="text"
            className="addrInput"
            value={toValue1}
            onChange={async e => {
              const v = e.target.value;
              setToValue1(v);
              setSignRes('');
            }}
          />
          <p style={{ marginTop: 5 }}>
            <b>Chain Id:</b>
          </p>
          {/* <select
            value={chainId}
            onChange={e => {
              switchChain(e.target.value);
              setSignRes('');
            }}
          >
            {CHAINS.map(chain => (
              <option key={chain.chainId} value={chain.chainId}>
                {chain.name}
              </option>
            ))}
          </select> */}
          <input
            className="addrInput"
            value={chainId}
            onChange={e => setChainId(+e.target.value)}
          />
          <>
            {signRes ? (
              <>
                <p style={{ marginTop: 5 }}>
                  <b>Sign Result:</b>
                </p>
                <div className="addrCon">
                  <span>{signRes ?? ''}</span>
                </div>
              </>
            ) : null}
          </>
        </div>
        <div
          className="btn1"
          style={{ opacity: addr ? 1 : 0.4 }}
          onClick={() => signETHTx(false)}
        >
          Sign Tx
        </div>
        <div
          className="btn1"
          style={{ opacity: addr ? 1 : 0.4 }}
          onClick={() => signETHTx(true)}
        >
          Send Tx
        </div>
      </div>
      <div className="step1" style={{ paddingBottom: 15 }}>
        <h2>2. Add Your Wallet Seed</h2>
        <span className="titleTip">
          Click{' '}
          <span
            className="innerBtn"
            style={{ opacity: addr ? 1 : 0.4 }}
            onClick={addSeed}
          >
            Add
          </span>{' '}
          button to insert a seed
        </span>
        {addFlag !== 0 ? (
          <span className="titleTip" style={{ display: 'block' }}>
            {addFlag === 1 ? (
              <span style={{ color: 'green' }}>Tip: add seed success</span>
            ) : (
              <span style={{ color: 'red' }}>Tip add seed fail</span>
            )}
          </span>
        ) : null}
      </div>

      <div className="step1" style={{ paddingBottom: 15 }}>
        <h2>3. Sign message by private key</h2>
        <span className="titleTip">Click button below to sign your msg</span>
        <textarea
          value={signMsg}
          onChange={e => {
            setSignMsg(e.target.value.trim());
            setSignMsgRes('');
          }}
        ></textarea>
        <>
          {signMsgRes ? (
            <>
              <p className="sinResTitle">
                <b>Sign Msg Result:</b>
              </p>
              <div className="addrCon">
                <span>{signMsgRes ?? ''}</span>
              </div>
            </>
          ) : null}
        </>
        <div
          className="btn1"
          style={{ opacity: addr && signMsg ? 1 : 0.4 }}
          onClick={signMessage}
        >
          Sign Msg
        </div>
      </div>

      <div className="step1">
        <h2>4. Sign {getChainName} Token Transaction</h2>
        <span className="titleTip">Please input data</span>
        <div className="addrCon">
          <p>
            <b>Contract Address:</b>
          </p>
          <input
            type="text"
            placeholder="0x...."
            className="addrInput"
            value={contractAddr}
            onChange={async e => {
              const v = e.target.value;
              setContractAddr(v);
              setSignRes2('');
            }}
          />

          <p>
            <b>To Address:</b>
          </p>
          <input
            type="text"
            placeholder="0x...."
            className="addrInput"
            value={toAddr2}
            onChange={async e => {
              const v = e.target.value;
              setToAddr2(v);
              setSignRes2('');
            }}
          />

          <p style={{ marginTop: 5 }}>
            <b>Amount:</b>
          </p>
          <input
            type="text"
            className="addrInput"
            value={toValue2}
            onChange={async e => {
              const v = e.target.value;
              setToValue2(v);
              setSignRes2('');
            }}
          />
          <p style={{ marginTop: 5 }}>
            <b>To Chain:</b>
          </p>
          <select
            value={chainId}
            onChange={e => {
              switchChain(e.target.value);
              setSignRes2('');
            }}
          >
            {CHAINS.map(chain => (
              <option key={chain.chainId} value={chain.chainId}>
                {chain.name}
              </option>
            ))}
          </select>
          <>
            {signRes2 ? (
              <>
                <p style={{ marginTop: 5 }}>
                  <b>Sign Result:</b>
                </p>
                <div className="addrCon">
                  <span>{signRes2 ?? ''}</span>
                </div>
              </>
            ) : null}
          </>
        </div>
        <div
          className="btn1"
          style={{ opacity: addr ? 1 : 0.4 }}
          onClick={() => signETHDataTx(false)}
        >
          Sign Token Tx
        </div>
        <div
          className="btn1"
          style={{ opacity: addr ? 1 : 0.4 }}
          onClick={() => signETHDataTx(true)}
        >
          Send Token Tx
        </div>
      </div>
    </div>
  );
}
