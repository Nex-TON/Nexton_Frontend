import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';
import './v2.css';
import SolanaProvider from '../src/v2/provider/SolanaProvider/SolanaProvider';
import {
  ComputeBudgetProgram,
  PublicKey,
  Transaction,
  SystemProgram,
} from '@solana/web3.js';
import { getConnection } from '../src/config/sol';
import { BASE_URL_DEV } from './baseUrlDev';
import WalletTgSdk from '../dist/tomoWalletTgSdkV2.esm';

new WalletTgSdk({ injected: true, ...BASE_URL_DEV });
const tg_tomo_sol = window.tomo_sol as SolanaProvider;
const CHAINS = [
  {
    chainId: 501,
    name: 'SOL',
  },
];

const usdtToken = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';

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

  const [contractAddr, setContractAddr] = useState(usdtToken);
  const [toAddr2, setToAddr2] = useState('');
  const [toValue2, setToValue2] = useState('0.1');
  const [signRes2, setSignRes2] = useState('');

  const [balance, setBalance] = useState('');
  const [balanceAddr, setBalanceAddr] = useState('');
  const [sendTxHash, setSendTxHash] = useState('');

  const [signTxToAddr, setSignTxToAddr] = useState('');
  const [signTxAmount, setSignTxAmount] = useState(0);
  const [signTxSignRes, setSignTxSignRes] = useState('');
  const [signTxHash, setSignTxHash] = useState('');

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
    const address = tg_tomo_sol.getAddress();
    setAddr(address);
    setBalanceAddr(address);
    setConnect(!!address);
  };

  const connectWallet = async () => {
    if (connect) {
      await tg_tomo_sol.disconnect();
      setAddr('');
      setConnect(false);
      return;
    }
    const res = await tg_tomo_sol.connectWallet();
    setAddr(res.address);
    setConnect(tg_tomo_sol.isConnected);
  };

  const signTx = async () => {
    if (!addr || !toAddr1 || !toValue1) return;
    const val = toValue1;
    const response = await tg_tomo_sol.signTransaction({
      from: addr,
      to: toAddr1,
      value: val,
    });
    console.log(
      'Multi Chain Tomo Wallet sign solana tx success',
      response.result
    );
    setSignRes(response);
    // await tg_tomo_sol.sendTransaction(response)
  };

  const constructTx = async () => {
    const fromPubkey = new PublicKey(addr);
    const toPubkey = new PublicKey(signTxToAddr);
    const tx = new Transaction();
    const connection = getConnection();
    tx.feePayer = fromPubkey;
    tx.recentBlockhash = (await connection.getLatestBlockhash('max')).blockhash;
    tx.add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: BigInt(+signTxAmount * 10 ** 9),
      })
    );

    const simulationResponse = await connection.simulateTransaction(tx);

    const fees = await tx.getEstimatedFee(connection);

    const unitsConsumed = simulationResponse.value.unitsConsumed;

    if (!unitsConsumed) {
      throw new Error(
        'Failed to estimate gas. Please ensure you have enough funds in your wallet.'
      );
    }

    const transactionSize = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    }).byteLength;
    const priorityFeeRecommendation = (unitsConsumed / transactionSize).toFixed(
      0
    );

    console.log(`Estimated SOL transfer cost: ${fees} lamports`);

    const computeUnitIx = ComputeBudgetProgram.setComputeUnitLimit({
      units: unitsConsumed * 4,
    });

    const computeBudgetIx = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: unitsConsumed * 2,
    });

    console.log({ unitsConsumed, priorityFeeRecommendation });

    tx.add(computeUnitIx);
    tx.add(computeBudgetIx);

    console.log({
      key: 'wrapped-tx',
      tx,
    });

    const response = await tg_tomo_sol.signTransaction(tx);

    setSignTxSignRes(response);
  };



  const signDataTx = async () => {
    if (!addr || !toAddr2 || !toValue2) return;
    const val = Number(toValue2);
    // const hexData = getTxData(toAddr2, val.toString());
    const response = await tg_tomo_sol.signTransaction({
      from: addr,
      to: toAddr2,
      value: val.toString(),
      // token: contractAddr,
      contract: contractAddr,
    });
    console.log('Multi Chain Tomo Wallet sign eth tx success', response.result);
    setSignRes2(response);
  };

  const addSeed = async () => {};

  const signMessage = async () => {
    const response = await tg_tomo_sol.signMessage(signMsg);
    console.log('Multi Chain Tomo Wallet Sign result:', response.result);
    setSignMsgRes(response);
  };

  const sendSignedTxExample = async () => {};

  const getBalance = async () => {
    const res = await tg_tomo_sol.getBalance(balanceAddr);
    console.log('getBalance res>>:', res);
    setBalance(res.formatted);
  };

  const sendTx = async () => {
    const res = await tg_tomo_sol.sendTransaction(signRes);
    setSendTxHash(res);
  };

  return (
    <div className="root">
      <section className="title">
        <img src="https://d18zhf0uo21qy3.cloudfront.net/assets/login-tomo-logo.png" />
        <div className="con">
          <h1>Demo For Tomo TG Wallet </h1>
        </div>
      </section>
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

      <div className="step1" style={{ paddingBottom: 15 }}>
        <h2>Get Balance By Address</h2>
        <span className="titleTip">Click button below to get your balance</span>
        <div className="addrCon">
          <p>
            <b>Address: </b>
          </p>
          <input
            type="text"
            placeholder="0x...."
            className="addrInput"
            value={balanceAddr}
            onChange={async e => {
              const v = e.target.value;
              setBalanceAddr(v);
            }}
          />
        </div>
        <>
          {balance ? (
            <>
              <p className="addrCon">
                <b>Result: {balance} SOL</b>
              </p>
            </>
          ) : null}
        </>
        <div
          className="btn1"
          style={{ opacity: balanceAddr ? 1 : 0.4 }}
          onClick={getBalance}
        >
          Get Balance
        </div>
      </div>

      <div className="step1">
        <h2>1. Sign Transaction </h2>
        <span className="titleTip">Please input data</span>
        <div className="addrCon">
          <p>
            <b>To Address:</b>
          </p>
          <input
            type="text"
            placeholder="0x...."
            className="addrInput"
            value={signTxToAddr}
            onChange={async e => {
              const v = e.target.value;
              setSignTxToAddr(v);
              setSignRes('');
            }}
          />

          <p style={{ marginTop: 5 }}>
            <b>Value:</b>
          </p>
          <input
            type="text"
            className="addrInput"
            value={signTxAmount}
            onChange={async e => {
              const v = e.target.value;
              setSignTxAmount(v);
              setSignRes('');
            }}
          />
          <p style={{ marginTop: 5 }}>
            <b>To Chain:</b>
          </p>
          <select
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
          </select>
          <>
            {signTxSignRes ? (
              <>
                <p style={{ marginTop: 5 }}>
                  <b>Sign Result:</b>
                </p>
                <div className="addrCon">
                  <span>{signTxSignRes ?? ''}</span>
                </div>
                <div
                  className="btn1"
                  onClick={async () => {
                    const res = await tg_tomo_sol.sendTransaction(
                      signTxSignRes
                    );
                    console.log({ res });
                    setSignTxHash(res);
                  }}
                >
                  Send Tx
                </div>
              </>
            ) : null}
          </>
          <>
            {signTxHash ? (
              <>
                <p style={{ marginTop: 5 }}>
                  <b>Send Result:</b>
                </p>
                <div className="addrCon">
                  <span>{signTxHash ?? ''}</span>
                </div>
              </>
            ) : null}
          </>
        </div>
        <div
          className="btn1"
          style={{ opacity: addr ? 1 : 0.4 }}
          onClick={constructTx}
        >
          construct Tx
        </div>
      </div>
      <div className="step1">
        <h2>1. Transfer </h2>
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
            <b>To Chain:</b>
          </p>
          <select
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
          </select>
          <>
            {signRes ? (
              <>
                <p style={{ marginTop: 5 }}>
                  <b>Sign Result:</b>
                </p>
                <div className="addrCon">
                  <span>{signRes ?? ''}</span>
                </div>
                <div className="btn1" onClick={sendTx}>
                  Send Tx
                </div>
              </>
            ) : null}
          </>
          <>
            {sendTxHash ? (
              <>
                <p style={{ marginTop: 5 }}>
                  <b>Send Result:</b>
                </p>
                <div className="addrCon">
                  <span>{sendTxHash ?? ''}</span>
                </div>
              </>
            ) : null}
          </>
        </div>
        <div
          className="btn1"
          style={{ opacity: addr ? 1 : 0.4 }}
          onClick={signTx}
        >
          Sign Tx
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
          onClick={signDataTx}
        >
          Sign Token Tx
        </div>
      </div>
    </div>
  );
}
