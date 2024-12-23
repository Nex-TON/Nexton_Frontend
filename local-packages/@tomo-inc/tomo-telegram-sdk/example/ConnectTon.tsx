/* eslint-disable @typescript-eslint/camelcase */
// @ts-ignore
import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  PropsWithChildren,
} from 'react';
import { CONNECT_MAP, TomoProvider, useTomo } from '../dist';
import './v2.css';
import { TonClient } from '@ton/ton';
import { beginCell, toNano, Address } from '@ton/core';
import { TonProvider } from '../dist';
import { BASE_URL_DEV } from './baseUrlDev';
import { useThemeParams } from '@vkruglikov/react-telegram-web-app';

function Index() {
  const [addr, setAddr] = useState('');
  const [toAddr1, setToAddr1] = useState('');
  const [toValue1, setToValue1] = useState('0.1');
  const [sendRes, setSendRes] = useState('');
  const [tonProof, setTonProof] = useState('');

  const [contractAddr, setContractAddr] = useState(
    'EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT'
    // 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'
  );
  const [toAddr2, setToAddr2] = useState('');
  const [toValue2, setToValue2] = useState('0.1');
  const [sendRes2, setSendRes2] = useState('');
  const [tomo_ton, setTomo_ton] = useState<TonProvider>();
  const [userTokenAddress, setUserTokenAddress] = useState('');

  const [balance, setBalance] = useState('');
  const [balanceAddr, setBalanceAddr] = useState('');

  const { openConnectModal, providers, connectResult } = useTomo();

  useEffect(() => {
    const tomo_ton = providers.tomo_ton;
    tomo_ton && setTomo_ton(tomo_ton);
    if (tomo_ton?.connected && tomo_ton?.account) {
      walletAddressReq(tomo_ton);
    } else {
      setAddr('');
      setBalanceAddr('');
    }
  }, [
    providers.tomo_ton,
    providers.tomo_ton?.connected,
    providers.tomo_ton?.account,
  ]);

  useEffect(() => {
    setTonProof(JSON.stringify(connectResult?.result?.proof));
  }, [connectResult]);

  useEffect(() => {
    if (addr && contractAddr) {
      initUserTokenAddress();
    }
    async function initUserTokenAddress() {
      const tokenAddr = await getUserTokenWalletAddress(addr, contractAddr);
      setUserTokenAddress(tokenAddr?.toString());
    }
  }, [addr, contractAddr]);

  const walletAddressReq = async tomo_ton => {
    const address = tomo_ton?.account?.address;
    setAddr(address);
    setBalanceAddr(address);
  };

  const connectWallet = async () => {
    if (addr) {
      tomo_ton?.disconnect && tomo_ton?.disconnect();
      setAddr('');
      setBalanceAddr('');
      return;
    }
    openConnectModal();
  };

  const connectWalletWithTonProof = async () => {
    if (addr) {
      await tomo_ton?.disconnect();
      setAddr('');
      setBalanceAddr('');
      return;
    }
    // the tonProof mast be a hex string
    openConnectModal({
      tonProof: Buffer.from('1234', 'utf8').toString('hex'),
    });
  };

  // UQCp3k_JcqLVbC0vMdiXCuDqPUWOlSXwrtI3aAZ1F3Ze9V8t
  const sendTonTransaction = async () => {
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
    const res = await (tomo_ton as any).sendTransaction(txParams);
    setSendRes(JSON.stringify(res));
  };

  const canSend = useMemo(() => toAddr1 && toValue1 && addr, [
    toAddr1,
    toValue1,
    addr,
  ]);

  async function getUserTokenWalletAddress(userAddress, jettonMasterAddress) {
    const client = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    });
    const userAddressCell = beginCell()
      .storeAddress(Address.parse(userAddress))
      .endCell();
    const response = await client.runMethod(
      Address.parse(jettonMasterAddress),
      'get_wallet_address',
      [{ type: 'slice', cell: userAddressCell as any }]
    );
    return response.stack.readAddress();
  }

  const createJettonPayload = () => {
    const destinationAddress = Address.parse(toAddr2);

    const body = beginCell()
      .storeUint(0xf8a7ea5, 32) // jetton 转账操作码
      .storeUint(0, 64) // query_id:uint64
      .storeCoins(toNano(toValue2)) // amount:(VarUInteger 16) -  转账的 Jetton 金额（小数位 = 6 - jUSDT, 9 - 默认）
      .storeAddress(destinationAddress) // destination:MsgAddress
      .storeAddress(destinationAddress) // response_destination:MsgAddress
      .storeMaybeRef(null)
      .storeCoins(toNano('0.000001'))
      .storeMaybeRef(null)
      .endCell();

    return body.toBoc().toString('base64');
  };

  const sendTonDataTx = async () => {
    const payload = createJettonPayload();
    const txParams = {
      messages: [
        {
          address: userTokenAddress,
          amount: 0.1 * 10 ** 9,
          payload,
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    };
    const res = await tomo_ton?.sendTransaction(txParams as any);
    setSendRes2(JSON.stringify(res));
  };

  const sendTonDataTxForTomo = async () => {
    const txParams = {
      messages: [
        {
          address: toAddr2, // [legacy] this will be the recipient address
          amount: toValue2, // [legacy] this would be the amount of jetton to transfer
          payload: JSON.stringify({
            contractAddr,
            precision: 9,
            forwardAmount: toNano('0.0001').toString(),
            memo: '',
          }),
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    };
    const res = await tomo_ton?.sendTransaction(txParams);
    setSendRes2(JSON.stringify(res));
  };

  const getBalance = async () => {
    if (!balanceAddr) return;
    const res = await tomo_ton?.getBalance(balanceAddr);
    setBalance(res.formatted);
  };

  return (
    <div className="root">
      <section className="title">
        <img src="https://d18zhf0uo21qy3.cloudfront.net/assets/login-tomo-logo.png" />
        <div className="con">
          <h1>Demo For TG SDK Connect</h1>
        </div>
      </section>
      <div className="step1">
        {addr ? (
          <>
            <h2>My Tomo Wallet Address</h2>
            <span className="addr">{addr ?? ''}</span>
            <div className="btn1" onClick={connectWallet}>
              Disconnect
            </div>
            <div className="btn1" onClick={() => openConnectModal()}>
              Open Modal While connected
            </div>
            <>
              {!!tonProof ? (
                <>
                  <p style={{ marginTop: 5 }}>
                    <b>tonProof Result: </b>
                  </p>
                  <div className="addrCon">
                    <span>{tonProof ?? ''}</span>
                  </div>
                </>
              ) : null}
            </>
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
        <h2>1. Send Ton Transaction</h2>
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
          TOMO Send Tx
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
        <h2>2. Send Ton Token Transaction</h2>
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
        </div>
        <div className="btn1" style={{ opacity: 1 }} onClick={sendTonDataTx}>
          Send Token Tx
        </div>
        <div
          className="btn1"
          style={{ opacity: 1, height: 60 }}
          onClick={sendTonDataTxForTomo}
        >
          TOMO Send Token Tx Legacy
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

export default function Wrapper() {
  const [ColorScheme] = useThemeParams();

  return (
    <TomoProvider
      theme={ColorScheme}
      supportedProviders={['TON']}
      supportedConnects={[
        CONNECT_MAP.TOMO_MINI_APP,
        CONNECT_MAP.OKX_CONNECT,
        CONNECT_MAP.TON_CONNECT,
      ]}
      manifestUrl={'https://d8o5s6z018yzr.cloudfront.net/manifestUrl.json'}
      tomoOptions={{
        ...BASE_URL_DEV,
      }}
    >
      <Index />
    </TomoProvider>
  );
}
