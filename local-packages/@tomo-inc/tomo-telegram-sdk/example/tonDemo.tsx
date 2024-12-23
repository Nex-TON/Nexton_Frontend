// @ts-ignore
import React, { useState, useEffect, useMemo } from 'react';
import './v2.css';
import { TonClient } from '@ton/ton';
import { beginCell, toNano, Address } from '@ton/core';
import { TonProvider } from '../src/v2/provider/TonProvider/TonProvider';
import TonWeb from 'tonweb';
import WalletTgSdk from '../dist/tomoWalletTgSdkV2.esm';
import { BASE_URL_DEV } from './baseUrlDev';


// todo inject ton provider
new WalletTgSdk({ injected: true, ...BASE_URL_DEV });
const tomo_ton = window.tomo_ton;

const CHAINS = [
  {
    chainId: 1100,
    name: 'TON',
  },
];

export default function Index() {
  const [connect, setConnect] = useState(false);
  const [addr, setAddr] = useState(
    'UQATmhtSeUA1hig3G7wMh3s1-IqKdJo4i_ve6Dfy6oIjAN8A'
  );
  const [toAddr1, setToAddr1] = useState('');
  const [toValue1, setToValue1] = useState('0.1');
  const [chainId, setChainId] = useState(1100);
  const [sendRes, setSendRes] = useState('');

  const [contractAddr, setContractAddr] = useState(
    'EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT'
    // 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'
  );
  const [toAddr2, setToAddr2] = useState('');
  const [toValue2, setToValue2] = useState('0.1');
  const [forwardAmount, setForwardAmount] = useState('');
  const [forwardPayload, setForwardPayload] = useState('');
  const [sendRes2, setSendRes2] = useState('');

  const [balance, setBalance] = useState('');
  const [balanceAddr, setBalanceAddr] = useState('');
  const [userTokenAddress, setUserTokenAddress] = useState('');
  const [isTest, setIsTest] = useState(false);

  useEffect(() => {
    walletAddressReq();
  }, []);

  useEffect(() => {
    if (addr && contractAddr) {
      initUserTokenAddress();
    }
    async function initUserTokenAddress() {
      try {
        const tokenAddr = await getUserTokenWalletAddress(addr, contractAddr);
        console.log('userTokenAddr', tokenAddr?.toString());
        setUserTokenAddress(tokenAddr?.toString());
      } catch (e) {
        setUserTokenAddress('');
        console.log('cannot get user jetton wallet address');
      }
    }
  }, [addr, contractAddr, isTest]);

  async function getUserTokenWalletAddress(userAddress, jettonMasterAddress) {
    const client = new TonClient({
      endpoint: isTest
        ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
        : 'https://toncenter.com/api/v2/jsonRPC',
    });
    const userAddressCell = beginCell()
      .storeAddress(Address.parse(userAddress))
      .endCell();
    const response = await client.runMethod(
      Address.parse(jettonMasterAddress),
      'get_wallet_address',
      // @ts-ignore
      [{ type: 'slice', cell: userAddressCell }]
    );
    return response.stack.readAddress();
  }

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
    console.log('tomo_ton isConnected', tomo_ton.isConnected);
    const address = await tomo_ton.restoreConnection();
    setAddr(address);
    setBalanceAddr(address);
    setConnect(!!address);
  };

  const connectWallet = async () => {
    if (addr) {
      await tomo_ton?.disconnect();
      setAddr('');
      setBalanceAddr('');
      return;
    }
    await tomo_ton.connect();
    walletAddressReq();
  };

  const connectToTestNet = async () => {
    if (addr) {
      await tomo_ton?.disconnect();
      setAddr('');
      setBalanceAddr('');
      return;
    }
    await tomo_ton.connect({ network: 'testnet' });
    walletAddressReq();
    setIsTest(true);
  };

  const connectWalletWithTonProof = async () => {
    if (addr) {
      await tomo_ton?.disconnect();
      setAddr('');
      setBalanceAddr('');
      return;
    }
    // the tonProof mast be a hex string
    const res = await tomo_ton.connect({
      tonProof: Buffer.from('1234', 'utf8').toString('hex'),
    });
    // at dapp backend check the tonProof res
    const { tonProof, stateInit } = res;
    walletAddressReq();
  };

  const sendTonTransaction = async () => {
    if (!canSend) return;
    const txParams = {
      messages: [
        {
          address: toAddr1,
          amount: toValue1,
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      from: addr,
    };
    const res = await (tomo_ton as TonProvider).sendTransaction(txParams);
    setSendRes(JSON.stringify(res));
  };
  const sendTonTx = async () => {
    if (!canSend) return;
    const txParams = {
      messages: [
        {
          address: toAddr1,
          amount: toNano(toValue1).toString(),
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      from: addr,
    };
    const res = await (tomo_ton as TonProvider).sendTx(txParams);
    setSendRes(JSON.stringify(res));
  };

  const createJettonTransferPayload = async (tokenAmount, recipientAddress) => {
    const tonWeb = new TonWeb(new TonWeb.HttpProvider());
    const jettonWallet = new TonWeb.token.jetton.JettonWallet(
      tonWeb.provider,
      {}
    );
    const transferBody = await jettonWallet.createTransferBody({
      queryId: 0,
      // @ts-ignore
      jettonAmount: tokenAmount,
      toAddress: new TonWeb.utils.Address(recipientAddress),
      // forwardPayload: comment,
      forwardAmount: TonWeb.utils.toNano('0.0001'),
      responseAddress: new TonWeb.utils.Address(recipientAddress),
    });
    const uint8 = await transferBody.toBoc();
    return Buffer.from(uint8).toString('hex');
  };

  const createPayloadByTonWebCell = async (tokenAmount, recipientAddress) => {
    const tonWeb = new TonWeb(new TonWeb.HttpProvider());
    const cell = new tonWeb.boc.Cell();

    cell.bits.writeUint(0xf8a7ea5, 32); // Operation code for transferring tokens
    cell.bits.writeUint(0, 64); // Query ID (can be any unique identifier)
    cell.bits.writeCoins(tokenAmount); // Amount of NOT tokens to send
    cell.bits.writeAddress(new TonWeb.utils.Address(recipientAddress)); // recipient address
    cell.bits.writeAddress(new TonWeb.utils.Address(recipientAddress)); // response address
    cell.bits.writeBit(false); // null custom_payload
    cell.bits.writeCoins(TonWeb.utils.toNano('0.0001')); // forwardAmount
    cell.bits.writeBit(false); // empty forward payload

    return Buffer.from(await cell.toBoc()).toString('hex');
  };

  const createPayloadByTonCoreCell = async (
    tokenAmount,
    recipientAddress: string
  ) => {
    const destinationAddress = Address.parse(recipientAddress);

    const body = beginCell()
      .storeUint(0xf8a7ea5, 32) // jetton 转账操作码
      .storeUint(0, 64) // query_id:uint64
      .storeCoins(tokenAmount) // amount:(VarUInteger 16) -  转账的 Jetton 金额（小数位 = 6 - jUSDT, 9 - 默认）
      .storeAddress(destinationAddress) // destination:MsgAddress
      .storeAddress(destinationAddress) // response_destination:MsgAddress
      .storeBit(false) // null custom_payload
      .storeCoins(toNano('0.000001'))
      .storeBit(false) // false for empty forward payload
      .endCell();

    return body.toBoc().toString('base64');
  };

  // send token tx
  const sendTonDataTxStandard = async (
    type:
      | 'jettonPayload'
      | 'payloadFromTonWebCell'
      | 'payloadFromTonCoreCell'
      | 'rawData'
  ) => {
    let payload: string;
    if (type === 'jettonPayload')
      payload = await createJettonTransferPayload(toNano(toValue2), toAddr2);
    else if (type === 'payloadFromTonWebCell')
      payload = await createPayloadByTonWebCell(toNano(toValue2), toAddr2);
    else payload = await createPayloadByTonCoreCell(toNano(toValue2), toAddr2);
    console.log('payload', payload);
    if (!userTokenAddress) console.error('user token address not ready');
    const txParams = {
      messages: [
        {
          address: userTokenAddress, // address of jetton
          amount: '0', // amount of ton
          payload: payload,
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      // type: TonTxBodyType.STANDARD,
    };
    const res = await (tomo_ton as TonProvider)?.sendTx(txParams);
    console.log('token signTransaction ==>', res);
    setSendRes2(JSON.stringify(res));
  };

  const sendTonDataTxJsonLegacy = async () => {
    const txParams = {
      messages: [
        {
          address: toAddr2, // [legacy] this will be the recipient address
          amount: toValue2, // [legacy] this would be the amount of jetton to transfer
          payload: JSON.stringify({
            contractAddr,
            precision: 9,
            forwardAmount: toNano(forwardAmount).toString(),
            memo: forwardPayload,
          }),
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    };
    const res = await tomo_ton?.sendTransaction(txParams);
    console.log('token signTransaction ==>', res);
    setSendRes2(JSON.stringify(res));
  };

  const getBalance = async () => {
    const res = await tomo_ton.getBalance(balanceAddr);
    setBalance(res.formatted);
  };

  const canSend = useMemo(() => toAddr1 && toValue1 && addr, [
    toAddr1,
    toValue1,
    addr,
  ]);

  const canSendToken = useMemo(() => toAddr2 && toValue2 && addr, [
    toAddr2,
    toValue2,
    addr,
  ]);
  return (
    <div className="root">
      <section className="title">
        <img src="https://d18zhf0uo21qy3.cloudfront.net/assets/login-tomo-logo.png" />
        <div className="con">
          <h1>Demo For TG SDK Ton</h1>
        </div>
      </section>
      <div className="step1">
        {addr ? (
          <>
            <h2>My Tomo Wallet Ton Address</h2>
            <span className="addr">{addr ?? ''}</span>
            <div className="btn1" onClick={connectWallet}>
              Disconnect
            </div>
          </>
        ) : (
          <>
            <h2>Connect To Tomo Wallet</h2>
            <div className="btn1" onClick={connectWallet}>
              Connect
            </div>
            <div className="btn1" onClick={connectWalletWithTonProof}>
              Connect with Ton Proof
            </div>
            <div className="btn1" onClick={connectToTestNet}>
              Connect Ton Testnet
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
                <b>Result: {balance} TON</b>
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
            }}
          />
          {/* <p style={{ marginTop: 5 }}>
            <b>To Chain:</b>
          </p>
          <select
            value={chainId}
            onChange={e => {
              switchChain(e.target.value);
            }}
          >
            {CHAINS.map(chain => (
              <option key={chain.chainId} value={chain.chainId}>
                {chain.name}
              </option>
            ))}
          </select> */}
        </div>
        <div
          className="btn1"
          style={{ opacity: canSend ? 1 : 0.4 }}
          onClick={sendTonTransaction}
        >
          Send Transaction
        </div>
        <div
          className="btn1"
          style={{ opacity: canSend ? 1 : 0.4 }}
          onClick={sendTonTx}
        >
          Send Tx
        </div>
        <>
          {sendRes ? (
            <>
              <p style={{ marginTop: 5 }}>
                <b>Send Result: </b>
              </p>
              <div className="addrCon">
                <span>{sendRes ?? ''}</span>
              </div>
            </>
          ) : null}
        </>
      </div>

      <div className="step1">
        <h2>2. Sign {getChainName} Token Transaction</h2>
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
            }}
          />
          <p style={{ marginTop: 5 }}>
            <b>forwardAmount:</b>
          </p>
          <input
            type="text"
            className="addrInput"
            value={forwardAmount}
            onChange={async e => {
              const v = e.target.value;
              setForwardAmount(v);
            }}
          />
          <p style={{ marginTop: 5 }}>
            <b>forwardPayload:</b>
          </p>
          <input
            type="text"
            className="addrInput"
            value={forwardPayload}
            onChange={async e => {
              const v = e.target.value;
              setForwardPayload(v);
            }}
          />
        </div>
        <div
          className="btn1"
          style={{ opacity: canSendToken ? 1 : 0.4, height: 60 }}
          onClick={() => sendTonDataTxStandard('jettonPayload')}
        >
          Send Token Tx
          <br />
          (standard - Jetton wallet)
        </div>
        <div
          className="btn1"
          style={{ opacity: canSendToken ? 1 : 0.4, height: 60 }}
          onClick={() => sendTonDataTxStandard('payloadFromTonWebCell')}
        >
          Send Token Tx
          <br />
          (hex - tonweb cell)
        </div>
        <div
          className="btn1"
          style={{ opacity: canSendToken ? 1 : 0.4, height: 60 }}
          onClick={() => sendTonDataTxStandard('payloadFromTonCoreCell')}
        >
          Send Token Tx
          <br />
          (base64 - toncore cell)
        </div>
        <div
          className="btn1"
          style={{ opacity: canSendToken ? 1 : 0.4, height: 60 }}
          onClick={() => sendTonDataTxStandard('rawData')}
        >
          Send Token Tx
          <br />
          (base64 - raw data)
        </div>
        <div
          className="btn1"
          style={{ opacity: canSendToken ? 1 : 0.4, height: 60 }}
          onClick={sendTonDataTxJsonLegacy}
        >
          Send Token Tx Legacy
          <br />
          (payload in json string)
        </div>
        <>
          {sendRes2 ? (
            <>
              <p style={{ marginTop: 5 }}>
                <b>Send Result: </b>
              </p>
              <div className="addrCon">
                <span>{sendRes2 ?? ''}</span>
              </div>
            </>
          ) : null}
        </>
      </div>
    </div>
  );
}
function getTonWebProvider() {
  throw new Error('Function not implemented.');
}
