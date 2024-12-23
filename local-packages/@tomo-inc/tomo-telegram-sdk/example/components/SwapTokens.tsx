import * as React from 'react';
import {
  useBalance,
  useBuildSwapTx,
  useChains,
  useConfig,
  useSendTransaction,
  useSwapTokens,
} from '../../src';
import { mockBtcEvmChainId } from '../../src/config/btc';
import { useMemo, useState } from 'react';
import { ISwapTokenType } from '../../src/hooks/useSwapTokens';
import { useTomoUserInfo } from '../../src';
import {
  Chain,
  Client,
  EIP1193RequestFn,
  erc20Abi,
  formatUnits,
  Hex,
  parseUnits,
  zeroAddress,
} from 'viem';
import { mockSolEvmChainId, solDecimals } from '../../src/config/sol';
import { useReadContract } from 'wagmi';
import { useLoading } from './useLoading';
import { queryOptions } from '@tanstack/react-query';

const SwapTokens = () => {
  const { chains, swapChainIds, getChain, getChainId } = useChains();
  const swapChains = swapChainIds.map(id => {
    return getChain(id);
  });
  const [fromChain, setFromChain] = React.useState(swapChains[0]);
  const [toChain, setToChain] = React.useState(swapChains[0]);
  const [fromContext, setFromContext] = React.useState('');
  const [toContext, setToContext] = React.useState('');
  const [inputCount, setInputCount] = React.useState<string>();
  const [slippage, setSlippage] = React.useState<string>('10');
  const { getAddressByChain } = useTomoUserInfo();
  const { config } = useConfig();

  const [fromToken, setFromToken] = useState<ISwapTokenType>();

  const [loading, loadingFn] = useLoading();
  const [approveLoading, setApproveLoading] = useState(false);

  const { sendEVMTransaction, sendSolTransaction } = useSendTransaction();

  const { tokens: fromTokens, loading: fromTokensLoading } = useSwapTokens({
    chain: fromChain,
    content: fromContext,
  });

  const [toToken, setToToken] = useState<ISwapTokenType>();

  const { tokens: toTokens, loading: toTokensLoading } = useSwapTokens({
    chain: toChain,
    content: toContext,
  });

  const balanceNative = useBalance({
    chainId: getChainId(fromChain),
  });

  const balance = useBalance({
    chainId: getChainId(fromChain),
    token: fromToken?.address,
  });

  const fromAddress =
    getAddressByChain({
      chain: fromChain,
      options: {
        btcType: 'tr',
      },
    }) || zeroAddress;

  const toAddress =
    getAddressByChain({
      chain: toChain,
      options: {
        btcType: 'tr',
      },
    }) || zeroAddress;

  React.useEffect(() => {
    if (!fromToken && fromTokens.length > 0) {
      setFromToken(fromTokens[0]);
    }
    if (!toToken && toTokens.length > 0) {
      setToToken(toTokens[0]);
    }
  }, [fromToken, fromTokens, toToken, toTokens]);

  React.useEffect(() => {
    if (fromChain) {
      if (fromChain.type === 'EVM') {
        const find = fromTokens.find(token => {
          return (
            token.chain === fromToken?.chain &&
            (token?.address ?? '') === (fromToken?.address ?? '')
          );
        });
        if (!find) {
          fromTokens.length > 0 && setFromToken(fromTokens[0]);
        }
      }
    }
  }, [fromChain, fromTokens, fromToken]);

  React.useEffect(() => {
    if (toChain) {
      if (toChain.type === 'EVM') {
        const find = toTokens.find(token => {
          return (
            token.chain === toToken?.chain &&
            (token?.address ?? '') === (toToken?.address ?? '')
          );
        });
        if (!find) {
          toTokens.length > 0 && setToToken(toTokens[0]);
        }
      }
    }
  }, [toChain, toTokens, toToken]);

  const inputAmount = parseUnits(inputCount ?? '0', fromToken?.decimals || 18);

  const swapParams = {
    fromChainid: getChainId(fromChain) as number,
    toChainid: getChainId(toChain) as number,
    fromAddress: fromToken?.address as string,
    toAddress: toToken?.address as string,
    amount: inputAmount.toString(),
    slippage: Number(slippage ?? 0),
    fromWalletAddress: fromAddress,
    toWalletAddress: toAddress,
  };

  const swapQuery = useBuildSwapTx(swapParams, {
    refetchInterval: approveLoading,
  });

  const data = useMemo(() => {
    if (swapQuery.data) {
      return swapQuery.data;
    }
  }, [swapQuery]);

  const canSwap =
    !!data &&
    Number(inputCount) < Number(balance.data?.formatted) &&
    Number(balanceNative.data?.formatted) > 0 &&
    !!toToken &&
    !!fromToken;

  const needCheckAllowance = !!data?.transaction.approve_spender;

  const allowance = useReadContract({
    chainId: getChainId(fromChain),
    abi: erc20Abi,
    address: data?.transaction.approve_to as Hex,
    functionName: 'allowance',
    args: [fromAddress as Hex, data?.transaction.approve_spender as Hex],
    query: {
      refetchInterval: approveLoading ? 2000 : false,
    },
  });

  const needApprove = data?.transaction.approve_spender
    ? allowance?.data !== undefined
      ? parseUnits(inputCount || '0', fromToken?.decimals || 18) >
        allowance?.data
      : undefined
    : !!data?.transaction.approve_data && !!data?.transaction.approve_to;

  const onSwap = () => {
    loadingFn(async () => {
      try {
        if (!data) {
          return;
        }

        const to = data.transaction.to ?? toAddress;
        const value = data.transaction.value;
        const fromChainId = getChainId(fromChain);
        const toChainId = getChainId(toChain);
        const contractData = data.transaction.data;

        switch (fromChain?.type) {
          case 'EVM':
            const res = await sendEVMTransaction({
              chainId: fromChainId,
              fromAddress: fromAddress,
              toAddress: to,
              value: BigInt(value),
              config,
              tokenValue: parseUnits(inputCount || '0', 18),
              token: {
                chainId: Number(fromChainId),
                image: fromToken?.imageUrl || '',
                name: fromToken?.name || '',
                symbol: fromToken?.symbol || '',
                decimals: fromToken?.decimals || 18,
                address: (fromToken?.address || zeroAddress) as Hex,
              },
              toToken: {
                chainId: Number(toChainId),
                image: toToken?.imageUrl || '',
                name: toToken?.name || '',
                symbol: toToken?.symbol || '',
                decimals: toToken?.decimals || 18,
                address: (toToken?.address || zeroAddress) as Hex,
              },
              data: contractData,
              historyType: 'Swap',
            });
            console.log({
              res,
            });
            break;
          case 'SOL':
            const solRes = await sendSolTransaction({
              fromAddress: fromAddress,
              toAddress: toAddress,
              value: parseUnits(inputCount || '0', fromToken?.decimals || 18),
              data: JSON.parse(data.origin_data),
              token: {
                chainId: mockSolEvmChainId,
                image: fromToken?.imageUrl || '',
                name: fromToken?.name || '',
                symbol: fromToken?.symbol || '',
                decimals: fromToken?.decimals || 18,
                address: (fromToken?.address || zeroAddress) as Hex,
              },
              toToken: {
                chainId: Number(toChainId),
                image: toToken?.imageUrl || '',
                name: toToken?.name || '',
                symbol: toToken?.symbol || '',
                decimals: toToken?.decimals || 18,
                address: (toToken?.address || zeroAddress) as Hex,
              },
              historyType: 'Swap',
            });
            console.log({
              solRes,
            });
            break;
          default:
            break;
        }
      } catch (error) {
        console.warn({
          error,
        });
      }
    });
  };
  const onSwapPassword = () => {
    const password = prompt('Please enter your password');
    if (!password) return;
    loadingFn(async () => {
      try {
        if (!data) {
          return;
        }

        const to = data.transaction.to ?? toAddress;
        const value = data.transaction.value;
        const fromChainId = getChainId(fromChain);
        const toChainId = getChainId(toChain);
        const contractData = data.transaction.data;

        switch (fromChain?.type) {
          case 'EVM':
            const res = await sendEVMTransaction({
              mfaType: 'password',
              password,
              chainId: fromChainId,
              fromAddress: fromAddress,
              toAddress: to,
              value: BigInt(value),
              config,
              tokenValue: parseUnits(inputCount || '0', 18),
              token: {
                chainId: Number(fromChainId),
                image: fromToken?.imageUrl || '',
                name: fromToken?.name || '',
                symbol: fromToken?.symbol || '',
                decimals: fromToken?.decimals || 18,
                address: (fromToken?.address || zeroAddress) as Hex,
              },
              toToken: {
                chainId: Number(toChainId),
                image: toToken?.imageUrl || '',
                name: toToken?.name || '',
                symbol: toToken?.symbol || '',
                decimals: toToken?.decimals || 18,
                address: (toToken?.address || zeroAddress) as Hex,
              },
              data: contractData,
              historyType: 'Swap',
            });
            console.log({
              res,
            });
            break;
          case 'SOL':
            const solRes = await sendSolTransaction({
              mfaType: 'password',
              password,
              fromAddress: fromAddress,
              toAddress: toAddress,
              value: parseUnits(inputCount || '0', fromToken?.decimals || 18),
              data: JSON.parse(data.origin_data),
              token: {
                chainId: mockSolEvmChainId,
                image: fromToken?.imageUrl || '',
                name: fromToken?.name || '',
                symbol: fromToken?.symbol || '',
                decimals: fromToken?.decimals || 18,
                address: (fromToken?.address || zeroAddress) as Hex,
              },
              toToken: {
                chainId: Number(toChainId),
                image: toToken?.imageUrl || '',
                name: toToken?.name || '',
                symbol: toToken?.symbol || '',
                decimals: toToken?.decimals || 18,
                address: (toToken?.address || zeroAddress) as Hex,
              },
              historyType: 'Swap',
            });

            break;
          default:
            break;
        }
      } catch (error) {
        console.warn({
          error,
        });
      }
    });
  };

  React.useEffect(() => {
    if (approveLoading && !needApprove) {
      setApproveLoading(false);
    }
  }, [approveLoading, needApprove]);

  const onApprove = () => {
    try {
      loadingFn(async () => {
        if (!data) {
          return;
        }
        setApproveLoading(true);
        const toAddress = data.transaction.approve_to;
        const value = data.transaction.value;
        const fromChainId = getChainId(fromChain);
        const contractData = data.transaction.approve_data;

        switch (fromChain?.type) {
          case 'EVM':
            const res = await sendEVMTransaction({
              chainId: fromChainId,
              fromAddress: fromAddress,
              toAddress: toAddress,
              value: BigInt(value),
              config,
              tokenValue: BigInt(value),
              token: {
                chainId: Number(fromChainId),
                image: fromToken?.imageUrl || '',
                name: fromToken?.name || '',
                symbol: fromToken?.symbol || '',
                decimals: fromToken?.decimals || 18,
                address: (fromToken?.address || zeroAddress) as Hex,
              },
              data: contractData,
              historyType: 'Approve',
            });
            console.log({
              res,
            });
            break;
          default:
            break;
        }
      });
    } catch (error) {
      setApproveLoading(false);
    }
  };
  const onApprovePassword = () => {
    try {
      const password = prompt('Please enter your password');
      if (!password) return;
      loadingFn(async () => {
        if (!data) {
          return;
        }
        setApproveLoading(true);
        const toAddress = data.transaction.approve_to;
        const value = data.transaction.value;
        const fromChainId = getChainId(fromChain);
        const contractData = data.transaction.approve_data;

        switch (fromChain?.type) {
          case 'EVM':
            const res = await sendEVMTransaction({
              mfaType: 'password',
              password,
              chainId: fromChainId,
              fromAddress: fromAddress,
              toAddress: toAddress,
              value: BigInt(value),
              config,
              tokenValue: BigInt(value),
              token: {
                chainId: Number(fromChainId),
                image: fromToken?.imageUrl || '',
                name: fromToken?.name || '',
                symbol: fromToken?.symbol || '',
                decimals: fromToken?.decimals || 18,
                address: (fromToken?.address || zeroAddress) as Hex,
              },
              data: contractData,
              historyType: 'Approve',
            });
            console.log({
              res,
            });
            break;
          default:
            break;
        }
      });
    } catch (error) {
      setApproveLoading(false);
    }
  };
  return (
    <div>
      <h2>SwapTokens</h2>
      <h3>fromInfo</h3>
      <p>
        fromChain:
        <select
          name={fromChain?.name}
          onChange={e => {
            const chain = swapChains.find(
              chain => chain?.name === e.target.value
            );
            chain && setFromChain(chain);
          }}
        >
          {swapChains.map(chain => {
            return (
              <option key={chain?.name} value={chain?.name}>
                {chain?.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        From Wallet Address:
        {getAddressByChain({
          chain: fromChain,
        })}
      </p>
      <p>
        fromSearch:
        <input
          type="text"
          value={fromContext}
          onChange={e => {
            setFromContext(e.target.value);
          }}
        />
      </p>
      <p>
        tokens:
        <select
          name={'tokens'}
          onChange={e => {
            const [chain, address] = e.target.value.split(',');
            const token = toTokens.find(token => {
              return (
                token.chain === chain &&
                (token?.address?.toLocaleUpperCase() || '') ===
                  address.toLocaleUpperCase()
              );
            });

            token && setFromToken(token);
          }}
        >
          {fromTokens?.map(token => {
            return (
              <option
                key={token.id + token.chain + token.address}
                value={[token.chain, token.address ?? '']}
              >
                {token?.symbol}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        native token balance: {balanceNative.data?.formatted}{' '}
        {balanceNative.data?.symbol}
      </p>
      <p>
        select token balance: {balance.data?.formatted} {balance.data?.symbol}
      </p>
      <p>
        fromTokenInput:
        <input
          type="text"
          value={inputCount}
          onChange={e => {
            setInputCount(e.target.value);
          }}
        />{' '}
        {fromToken?.symbol}
      </p>
      <p>
        slippage:
        <input
          type="text"
          value={slippage}
          onChange={e => {
            setSlippage(e.target.value);
          }}
        />
        <span>value: {Number(slippage) / 10} %</span>
      </p>
      <h3>toInfo</h3>
      <p>
        toChain:
        <select
          name={toChain?.name}
          onChange={e => {
            const chain = swapChains.find(
              chain => chain?.name === e.target.value
            );

            chain && setToChain(chain);
          }}
        >
          {swapChains.map(chain => {
            return (
              <option key={chain?.name} value={chain?.name}>
                {chain?.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>To Wallet Address:{getAddressByChain({ chain: toChain })}</p>
      <p>
        toSearch:
        <input
          type="text"
          value={toContext}
          onChange={e => {
            setToContext(e.target.value);
          }}
        />
      </p>
      <p>
        tokens:
        <select
          name={'tokens'}
          onChange={e => {
            const [chain, address] = e.target.value.split(',');
            const token = toTokens.find(token => {
              return (
                token.chain === chain &&
                (token?.address?.toLocaleUpperCase() || '') ===
                  address.toLocaleUpperCase()
              );
            });

            token && setToToken(token);
          }}
        >
          {toTokens?.map(token => {
            return (
              <option
                key={token.id + token.chain + token.address}
                value={[token.chain, token.address ?? '']}
              >
                {token?.symbol}
              </option>
            );
          })}
        </select>
      </p>
      <hr />
      <p>
        outputAmount:{' '}
        {formatUnits(
          BigInt(data?.min_receive_amount ?? '0'),
          toToken?.decimals ?? 18
        )}{' '}
        {toToken?.symbol}
      </p>
      <p>
        {needApprove ? (
          <>
            <button disabled={loading || approveLoading} onClick={onApprove}>
              approve biometry
            </button>
            <button
              disabled={loading || approveLoading}
              onClick={onApprovePassword}
            >
              approve password
            </button>
          </>
        ) : (
          <>
            <button disabled={!canSwap || loading} onClick={onSwap}>
              swap biometry
            </button>
            <button disabled={!canSwap || loading} onClick={onSwapPassword}>
              swap password
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default SwapTokens;
