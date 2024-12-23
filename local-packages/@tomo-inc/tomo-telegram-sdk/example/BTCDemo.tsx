import React, { useState } from 'react';
import { TomoWalletTgSdkV2 } from '../src';
import './v2.css';
import { btcAddressTypeMaps } from '../src/config/btc';

// new TomoWalletTgSdkV2({ injected: true });
const bitcoin = window.tg_tomo_btc;

export default function Index() {
  const [addr, setAddr] = useState('');
  const [contractAddr, setContractAddr] = useState('');
  const [toAddr2, setToAddr2] = useState('');
  const [toValue2, setToValue2] = useState('0.1');
  const [signRes2, setSignRes2] = useState('');

  const connectWallet = async () => {
    if (addr) {
      bitcoin?.disconnect && bitcoin?.disconnect();
      setAddr('');
      return;
    }
    const res = await bitcoin.connectWallet();
    return res;

    // await walletAddressReq();
  };

  const signMessage = async () => {
    const res = await bitcoin.signMessage({
      method: 'btc_signMessage',
      params: [
        {
          addressType: btcAddressTypeMaps[2],
          message: 'btc sign message',
        },
      ],
    });
    return res;
  };

  const sendTx = async () => {
    const res = await bitcoin.request({
      method: 'btc_sendTx',
      params: [
        {
          network: 'SIGNET',
          addressType: btcAddressTypeMaps[2],
          toAddress: toAddr2,
          amount: toValue2,
        },
      ],
    });
    console.log('sendTx res', res);
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
        <>
          <h2>Connect To Tomo Wallet</h2>
          <div className="btn1" onClick={connectWallet}>
            {!bitcoin.isConnected ? 'Disconnect' : 'Connect'}
          </div>
        </>
      </div>
      <div className="step1">
        <h2>4. Sign BTC Token Transaction</h2>
        <span className="titleTip">Please input data</span>
        <div className="addrCon">
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
        </div>
        <div className="btn1" style={{ opacity: 1 }} onClick={sendTx}>
          Sign Token Tx
        </div>
      </div>
    </div>
  );
}
