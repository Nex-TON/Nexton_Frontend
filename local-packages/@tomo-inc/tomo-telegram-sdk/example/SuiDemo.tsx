import React, { useState, useEffect, useMemo } from 'react';
import './v2.css';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import { getSuiClient } from '../src/config/sui';
import { MIST_PER_SUI } from '@mysten/sui/dist/cjs/utils';

export const getSendSuiCoinTx = async ({
  fromAddress,
  toAddress,
  amount,
  coinType,
}: {
  fromAddress: string;
  toAddress: string;
  amount: string;
  coinType?: string;
}): Promise<{ transaction: string; bytes: Uint8Array } | null> => {
  const suiClient = getSuiClient();
  const txb = new Transaction();
  
  txb.transferObjects(
    [coinWithBalance({ balance: Number(amount), type: coinType || undefined })],
    toAddress
  );
  
  try {
    txb.setSender(fromAddress);
    const transaction = (await txb.toJSON({ client: suiClient })).toString();
    const bytes = await txb.build({ client: suiClient });
    console.log('bytes', transaction, bytes);
    return { transaction, bytes };
  } catch (e) {
    console.warn(e);
    return null;
  }
};

const tg_tomo_sui = window.tomo_sui;

const usdtToken =
  '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN';

export default function Index() {
  const [connect, setConnect] = useState(false);
  const [addr, setAddr] = useState('');
  const [toAddr1, setToAddr1] = useState('');
  const [toValue1, setToValue1] = useState('0.1');
  const [signRes, setSignRes] = useState('');
  const [signMsg, setSignMsg] = useState('hello tomo');
  const [signMsgRes, setSignMsgRes] = useState('');

  const [contractAddr, setContractAddr] = useState(usdtToken);
  const [toAddr2, setToAddr2] = useState('');
  const [toValue2, setToValue2] = useState('0.1');
  const [signRes2, setSignRes2] = useState('');

  const [sendTxHash, setSendTxHash] = useState('');
  const [sendTokenTxHash, setSendTokenTxHash] = useState('');

  useEffect(() => {
    walletAddressReq();
  }, []);

  const canSend = useMemo(() => {
    return !!addr && !!toAddr1 && !!toValue1;
  }, [addr, toAddr1, toValue1]);

  const walletAddressReq = async () => {
    const address = tg_tomo_sui.getAddress();
    setAddr(address);
    setConnect(!!address);
  };

  const connectWallet = async () => {
    if (connect) {
      await tg_tomo_sui.disconnect();
      setAddr('');
      setConnect(false);
      return;
    }
    const res = await tg_tomo_sui.connectWallet();
    setAddr(res.address);
    setConnect(tg_tomo_sui.isConnected);
  };

  const getTX4Step1 = async () => {
    if (!addr || !toAddr1 || !toValue1) return;
    const res = await getSendSuiCoinTx({
      fromAddress: addr,
      toAddress: toAddr1,
      amount: +toValue1 * Number(MIST_PER_SUI) + '',
    });
    const { transaction, bytes } = res || {};
    const input = {
      transactionBlock: transaction,
      chain: 'sui:mainnet',
      txBytes: bytes,
      options: {
        showEffects: true,
      },
    };
    console.log('transaction', transaction, bytes);
    return input;
  };

  const getTX4Step3 = async () => {
    const res = await getSendSuiCoinTx({
      fromAddress: addr,
      toAddress: toAddr2,
      amount: +toValue2 * 10 ** 6 + '',
      coinType: contractAddr,
    });
    const { transaction, bytes } = res || {};
    const input = {
      transactionBlock: transaction,
      chain: 'sui:mainnet',
      txBytes: bytes,
      options: {
        showEffects: true,
      },
    };
    console.log('transaction token', transaction, bytes);
    return input;
  };

  const signTx = async () => {
    if (!canSend) return;
    const input = await getTX4Step1();
    if (!input?.txBytes) return;
    const response = await tg_tomo_sui.signTransaction(input);
    setSignRes(response);
  };

  const signAndSendTx = async () => {
    if (!canSend) return;
    const input = await getTX4Step1();
    if (!input?.txBytes) return;
    const res = await tg_tomo_sui.signAndExecuteTransaction(input);
    setSendTxHash(JSON.stringify(res));
  };

  const signMessage = async () => {
    if (signMsg && addr) {
      const response = await tg_tomo_sui.signMessage(signMsg);
      console.log('Multi Chain Tomo Wallet Sign result:', response.result);
      setSignMsgRes(response);
    }
  };

  const canSendStep3 = useMemo(() => {
    return !!addr && !!toAddr2 && !!toValue2;
  }, [addr, toAddr2, toValue2]);

  const signTokenTx = async () => {
    if (!canSendStep3) return;
    const input = await getTX4Step3();
    if (!input?.txBytes) return;
    const response = await tg_tomo_sui.signTransaction(input);
    setSignRes2(JSON.stringify(response));
  };

  const signAndSendTokenTx = async () => {
    if (!canSendStep3) return;
    const input = await getTX4Step3();
    if (!input?.txBytes) return;
    const res = await tg_tomo_sui.signAndExecuteTransaction(input);
    setSendTokenTxHash(JSON.stringify(res));
    console.log('Multi Chain Tomo Wallet sign eth tx success', res?.result);
  };

  return (
    <div className="root">
      <section className="title">
        <img src="https://d18zhf0uo21qy3.cloudfront.net/assets/login-tomo-logo.png" />
        <div className="con">
          <h1>SUI Demo For Tomo TG Wallet</h1>
        </div>
      </section>
      <div className="step1">
        <h2>
          {addr ? 'My Tomo Wallet SUI Address' : 'Connect To Tomo Wallet'}
        </h2>
        <span className="addr">{addr ?? ''}</span>
        <div className="btn1" onClick={connectWallet}>
          {addr ? 'Disconnect' : 'Connect'}
        </div>
      </div>
      <div className="step1">
        <h2>1. Sign SUI Transaction</h2>
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
          <>
            {sendTxHash ? (
              <>
                <p style={{ marginTop: 5 }}>
                  <b>send Result:</b>
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
          style={{ opacity: canSend ? 1 : 0.4 }}
          onClick={signTx}
        >
          Sign Tx
        </div>
        <div
          style={{ opacity: canSend ? 1 : 0.4 }}
          className="btn1"
          onClick={signAndSendTx}
        >
          Sign and Send Tx
        </div>
      </div>

      <div className="step1" style={{ paddingBottom: 15 }}>
        <h2>2. Sign message by private key</h2>
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
        <h2>3. Sign SUI Token Transaction</h2>
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
          <>
            {sendTokenTxHash ? (
              <>
                <p style={{ marginTop: 5 }}>
                  <b>sendRes Result:</b>
                </p>
                <div className="addrCon">
                  <span>{sendTokenTxHash ?? ''}</span>
                </div>
              </>
            ) : null}
          </>
        </div>
        <div
          className="btn1"
          style={{ opacity: canSendStep3 ? 1 : 0.4 }}
          onClick={signTokenTx}
        >
          Sign Token Tx
        </div>
        <div
          style={{ opacity: canSendStep3 ? 1 : 0.4 }}
          className="btn1"
          onClick={signAndSendTokenTx}
        >
          Sign and Send Token Tx
        </div>
      </div>
    </div>
  );
}
