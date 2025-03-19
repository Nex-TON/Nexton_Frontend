import {
  useWebApp,
  useShowPopup,
  useInitData,
  useThemeParams,
} from '@vkruglikov/react-telegram-web-app';
// import create from 'zustand';
import {
  _ as _asyncToGenerator,
  a as _regeneratorRuntime,
  s as successCode,
  b as setPaymentPasswd,
  c as changePaymentPasswd,
  v as validatePaymentPasswd,
  d as checkPaymentPasswd,
  p as passkeyKey,
  g as getDeviceId,
  m as mfaAuthVerificationApi,
  e as pkValidateApi,
  f as pkSignApi,
  h as mockSolEvmChainId,
  i as mockBtcEvmChainId,
  j as mockTonChainId,
  k as getConfigChainsAll,
  u as useLocalStore,
  l as pkCheckApi,
  n as pkCreateApi,
  o as pkRegApi,
  q as _extends$9,
  r as btcAddressTypeMaps,
  t as getConnection,
  w as tonDecimals,
  x as getTonBalance,
  y as solDecimals,
  z as getSolBalance,
  A as btcDecimals,
  B as getSystemTokens,
  C as v1AllAssetApi,
  D as v1AddAssetApi,
  E as signEvmTransactionApi,
  F as solSignRawTransaction,
  G as getSendSplToken,
  H as sendSolTx,
  T as ToSerializeTransaction,
  I as btcSignPsbtAndPush,
  J as sendTx,
  K as sendTransaction,
  L as tonSignMessage,
  M as createSigningTransaction,
  N as getSwapAllTokensV3,
  O as getSwapAllTokensSearch,
  P as checkLoginByCodeApi,
  Q as useProxyLocalStorage,
  R as getOkxLanguage,
  S as ProxyLocalStorage,
  U as EthereumProvider,
  V as TomoProviderEventName,
  W as CONNECT_MAP,
  X as isPcBrowser,
  Y as isIOS,
  Z as getDisplayName,
  $ as getDisplayDescription,
  a0 as ChainIdWithConnectsMap,
  a1 as api,
  a2 as getTelegramUserInfoApi,
  a3 as apiList,
  a4 as loginApi,
  a5 as sendBindEmailCodeApi,
  a6 as verifyBindEmailCodeApi,
  a7 as buildSwapTxApi,
  a8 as getTransactionsByInMessageHash,
  a9 as _objectWithoutPropertiesLoose,
} from './EthereumProvider-0d47aac9.js';
export {
  ad as AddressString,
  ae as BigIntString,
  W as CONNECT_MAP,
  ac as HexString,
  af as IntNumber,
  ab as OpaqueType,
  ah as PROVIDER_ALLIANCE,
  ag as RegExpString,
  V as TomoProviderEventName,
  ai as TonTxBodyType,
  a1 as api,
  aa as mockEvmChainIds,
  E as signEvmTransactionApi,
  u as useLocalStore,
} from './EthereumProvider-0d47aac9.js';
import axios from 'axios';
import 'zustand/middleware';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import 'tonweb';
import { formatUnits, parseUnits } from 'viem';
import { Address } from '@ton/core';
import * as wagmiChains from 'wagmi/chains';
import {
  useQuery,
  keepPreviousData,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import React__default, {
  useMemo,
  useState,
  useEffect,
  useRef,
  createElement,
  useContext,
  useCallback,
  createContext,
  Fragment,
} from 'react';
import {
  getBalance,
  getPublicClient,
  prepareTransactionRequest,
  getGasPrice,
} from '@wagmi/core';
import { createConfig, http, WagmiProvider } from 'wagmi';
import {
  b3,
  linea,
  scroll,
  avalanche,
  blast,
  polygon,
  base,
  optimism,
  arbitrum,
  bsc,
  mainnet,
} from 'viem/chains';
import ReactDOM from 'react-dom';
import 'qs';
import 'uuid';
import {
  OKXConnectError,
  OKX_CONNECT_ERROR_CODES,
} from '@okxconnect/core/src/protocol/error/okx-connect.error';
import { RequestMethods } from '@bitget-wallet/omni-connect';
import 'eventemitter3';
import 'buffer';
import WalletTgSdk from './tomoWalletTgSdkV2.esm.js';
export { default as TomoWalletTgSdkV2 } from './tomoWalletTgSdkV2.esm.js';
import '@mysten/sui/client';
import '@mysten/sui/utils';
import { QRCodeSVG } from 'qrcode.react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useAtomValue, atom } from 'jotai';
import { createHash } from 'crypto';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

var useStore = /*#__PURE__*/ create(function (set) {
  return {
    bioAvailable: false,
    bioInited: false,
    bioAccessGranted: false,
    paymentPwdExists: -1,
    userLocking: true,
    setBioAvailable: function setBioAvailable(bioAvailable) {
      return set({
        bioAvailable: bioAvailable,
      });
    },
    setBioInited: function setBioInited(bioInited) {
      return set({
        bioInited: bioInited,
      });
    },
    setBioAccessGranted: function setBioAccessGranted(bioAccessGranted) {
      return set({
        bioAccessGranted: bioAccessGranted,
      });
    },
    setPaymentPwdExists: function setPaymentPwdExists(paymentPwdExists) {
      return set({
        paymentPwdExists: paymentPwdExists,
      });
    },
  };
});

function useBiometricManager() {
  var _useStore = useStore(),
    bioAvailable = _useStore.bioAvailable,
    bioInited = _useStore.bioInited,
    bioAccessGranted = _useStore.bioAccessGranted,
    setBioAccessGranted = _useStore.setBioAccessGranted;
  var WebApp = useWebApp();
  var biometryManager = WebApp == null ? void 0 : WebApp.BiometricManager;
  // TODO
  // useEffect(() => {
  //   const bioInterval = setInterval(() => {
  //     if (bioInited != biometryManager?.isInited) {
  //       setBioInited(biometryManager?.isInited || false);
  //     }
  //     if (bioAvailable != biometryManager?.isBiometricAvailable) {
  //       setBioAvailable(biometryManager?.isBiometricAvailable || false);
  //     }
  //     if (bioAccessGranted != biometryManager?.isAccessGranted) {
  //       setBioAccessGranted(biometryManager?.isAccessGranted || false);
  //     }
  //   }, 200);
  //   if (!biometryManager?.isInited) {
  //     biometryManager?.init(function() {
  //       setBioInited(biometryManager?.isInited || false);
  //     });
  //   }
  //   return () => {
  //     clearInterval(bioInterval);
  //   };
  // }, []);
  var requestAccess = function requestAccess(_ref) {
    var _ref$reason = _ref.reason,
      reason =
        _ref$reason === void 0
          ? 'We will use biometry to protect your account'
          : _ref$reason,
      callback = _ref.callback;
    if (!(biometryManager != null && biometryManager.isAccessGranted)) {
      biometryManager == null ||
        biometryManager.requestAccess(
          {
            reason: reason,
          },
          function (success) {
            setBioAccessGranted(success);
            callback(success);
          }
        );
      return;
    }
    callback(true);
  };
  var authenticate = function authenticate(_ref2) {
    var _ref2$reason = _ref2.reason,
      reason =
        _ref2$reason === void 0
          ? 'We need to authenticate you to continue'
          : _ref2$reason,
      _callback = _ref2.callback,
      failCallback = _ref2.failCallback;
    if (!bioAvailable) {
      failCallback && failCallback(new Error('Biometry is not available'));
      return;
    }
    if (!bioInited) {
      failCallback && failCallback(new Error('Biometry is not inited'));
      return;
    }
    if (bioAccessGranted) {
      biometryManager == null ||
        biometryManager.authenticate(
          {
            reason: reason,
          },
          _callback
        );
      return;
    }
    requestAccess({
      callback: function callback(success) {
        if (!success) {
          failCallback &&
            failCallback(new Error('You must allow biometry to continue'));
          return;
        }
        biometryManager == null ||
          biometryManager.authenticate(
            {
              reason: reason,
            },
            _callback
          );
      },
    });
  };
  return {
    biometryManager: biometryManager,
    requestAccess: requestAccess,
    authenticate: authenticate,
    bioAvailable: bioAvailable,
    bioInited: bioInited,
    bioAccessGranted: bioAccessGranted,
  };
}

function usePaymentPasswd() {
  var _useStore = useStore(),
    setPaymentPwdExists = _useStore.setPaymentPwdExists,
    paymentPwdExists = _useStore.paymentPwdExists;
  var setPasswd = /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(passwd) {
        var res;
        return _regeneratorRuntime().wrap(
          function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return setPaymentPasswd({
                    passwd: passwd,
                  });
                case 3:
                  res = _context.sent;
                  if (!(res.code === successCode)) {
                    _context.next = 6;
                    break;
                  }
                  return _context.abrupt('return', true);
                case 6:
                  _context.next = 11;
                  break;
                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](0);
                  console.error('setPasswd', _context.t0);
                case 11:
                  return _context.abrupt('return', false);
                case 12:
                case 'end':
                  return _context.stop();
              }
          },
          _callee,
          null,
          [[0, 8]]
        );
      })
    );
    return function setPasswd(_x) {
      return _ref.apply(this, arguments);
    };
  })();
  var changePasswd = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee2(old_passwd, new_passwd) {
          var _yield$changePaymentP, code;
          return _regeneratorRuntime().wrap(
            function _callee2$(_context2) {
              while (1)
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return changePaymentPasswd({
                      old_passwd: old_passwd,
                      new_passwd: new_passwd,
                    });
                  case 3:
                    _yield$changePaymentP = _context2.sent;
                    code = _yield$changePaymentP.code;
                    if (!(code === successCode)) {
                      _context2.next = 8;
                      break;
                    }
                    return _context2.abrupt('return', true);
                  case 8:
                    return _context2.abrupt('return', false);
                  case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2['catch'](0);
                    console.error('changePasswd', _context2.t0);
                    return _context2.abrupt('return', false);
                  case 15:
                  case 'end':
                    return _context2.stop();
                }
            },
            _callee2,
            null,
            [[0, 11]]
          );
        }
      )
    );
    return function changePasswd(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  })();
  var validatePasswd = /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(passwd) {
        var _yield$validatePaymen, code;
        return _regeneratorRuntime().wrap(
          function _callee3$(_context3) {
            while (1)
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return validatePaymentPasswd({
                    passwd: passwd,
                  });
                case 3:
                  _yield$validatePaymen = _context3.sent;
                  code = _yield$validatePaymen.code;
                  if (!(code === successCode)) {
                    _context3.next = 7;
                    break;
                  }
                  return _context3.abrupt('return', true);
                case 7:
                  return _context3.abrupt('return', false);
                case 10:
                  _context3.prev = 10;
                  _context3.t0 = _context3['catch'](0);
                  console.error('validatePasswd', _context3.t0);
                  return _context3.abrupt('return', false);
                case 14:
                case 'end':
                  return _context3.stop();
              }
          },
          _callee3,
          null,
          [[0, 10]]
        );
      })
    );
    return function validatePasswd(_x4) {
      return _ref3.apply(this, arguments);
    };
  })();
  var checkPasswd = /*#__PURE__*/ (function () {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4() {
        var _yield$checkPaymentPa, code, data;
        return _regeneratorRuntime().wrap(
          function _callee4$(_context4) {
            while (1)
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return checkPaymentPasswd();
                case 3:
                  _yield$checkPaymentPa = _context4.sent;
                  code = _yield$checkPaymentPa.code;
                  data = _yield$checkPaymentPa.data;
                  if (!(code === successCode)) {
                    _context4.next = 8;
                    break;
                  }
                  return _context4.abrupt(
                    'return',
                    setPaymentPwdExists(data != null && data.is_exists ? 1 : 0)
                  );
                case 8:
                  return _context4.abrupt('return', setPaymentPwdExists(-1));
                case 11:
                  _context4.prev = 11;
                  _context4.t0 = _context4['catch'](0);
                  console.error('checkpasswd', _context4.t0);
                  return _context4.abrupt('return', setPaymentPwdExists(-1));
                case 15:
                case 'end':
                  return _context4.stop();
              }
          },
          _callee4,
          null,
          [[0, 11]]
        );
      })
    );
    return function checkPasswd() {
      return _ref4.apply(this, arguments);
    };
  })();
  return {
    setPasswd: setPasswd,
    changePasswd: changePasswd,
    validatePasswd: validatePasswd,
    checkPasswd: checkPasswd,
    paymentPwdExists: paymentPwdExists,
  };
}

var setPassKey = function setPassKey(key) {
  try {
    localStorage.setItem(passkeyKey, key);
  } catch (e) {
    // do something
  }
};
function generateRandomString(length) {
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
function hashWithWebCrypto(_x) {
  return _hashWithWebCrypto.apply(this, arguments);
}
function _hashWithWebCrypto() {
  _hashWithWebCrypto = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(message) {
      var msgBuffer, hashBuffer, hashArray, hashHex;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1)
          switch ((_context.prev = _context.next)) {
            case 0:
              msgBuffer = new TextEncoder().encode(message);
              _context.next = 3;
              return crypto.subtle.digest('SHA-256', msgBuffer);
            case 3:
              hashBuffer = _context.sent;
              hashArray = Array.from(new Uint8Array(hashBuffer));
              hashHex = hashArray
                .map(function (b) {
                  return b.toString(16).padStart(2, '0');
                })
                .join('');
              return _context.abrupt('return', hashHex);
            case 7:
            case 'end':
              return _context.stop();
          }
      }, _callee);
    })
  );
  return _hashWithWebCrypto.apply(this, arguments);
}
function sleep(_x2) {
  return _sleep.apply(this, arguments);
}
function _sleep() {
  _sleep = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(ms) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1)
          switch ((_context2.prev = _context2.next)) {
            case 0:
              return _context2.abrupt(
                'return',
                new Promise(function (resolve) {
                  return setTimeout(resolve, ms);
                })
              );
            case 1:
            case 'end':
              return _context2.stop();
          }
      }, _callee2);
    })
  );
  return _sleep.apply(this, arguments);
}
function cn() {
  for (
    var _len = arguments.length, inputs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    inputs[_key] = arguments[_key];
  }
  return twMerge(clsx(inputs));
}
function validEmail(str) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]+$/.test(str);
}

var useMFAVerify = function useMFAVerify() {
  var biometricManager = useBiometricManager();
  var deviceId = getDeviceId();
  var _usePaymentPasswd = usePaymentPasswd();
  var signMessage = /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee(params, device_no, type) {
          var message, signRes, valRes;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  message = JSON.stringify(params.data);
                  _context.next = 4;
                  return pkSignApi({
                    message: message,
                    device_no: device_no,
                  });
                case 4:
                  signRes = _context.sent;
                  if (signRes) {
                    _context.next = 7;
                    break;
                  }
                  throw new Error('sign key api failed');
                case 7:
                  if (!(signRes.code != successCode)) {
                    _context.next = 9;
                    break;
                  }
                  throw new Error(signRes.message);
                case 9:
                  _context.next = 11;
                  return pkValidateApi({
                    device_no: device_no,
                    message: message,
                    sig: signRes.data.signature,
                  });
                case 11:
                  valRes = _context.sent;
                  if (valRes) {
                    _context.next = 14;
                    break;
                  }
                  throw new Error('validate passkey api failed');
                case 14:
                  if (!(valRes.code != successCode)) {
                    _context.next = 16;
                    break;
                  }
                  throw new Error(valRes.message);
                case 16:
                  return _context.abrupt('return', {
                    signature: signRes.data.signature,
                    mfa: valRes.data.key,
                  });
                case 17:
                case 'end':
                  return _context.stop();
              }
          }, _callee);
        }
      )
    );
    return function signMessage(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })();
  var getMFAParams = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee5(
          params,
          type,
          // 'biometric' or 'password'
          password,
          reason
          // callback: (params: { signature: string; mfa: string }) => void
        ) {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1)
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  if (type === void 0) {
                    type = 'biometric';
                  }
                  if (reason === void 0) {
                    reason =
                      'We need your biometric to verify your transaction';
                  }
                  return _context5.abrupt(
                    'return',
                    new Promise(
                      /*#__PURE__*/ (function () {
                        var _ref3 = _asyncToGenerator(
                          /*#__PURE__*/ _regeneratorRuntime().mark(
                            function _callee4(resolve, reject) {
                              return _regeneratorRuntime().wrap(
                                function _callee4$(_context4) {
                                  while (1)
                                    switch ((_context4.prev = _context4.next)) {
                                      case 0:
                                        if (!(type == 'password')) {
                                          _context4.next = 4;
                                          break;
                                        }
                                        _context4.next = 3;
                                        return _asyncToGenerator(
                                          /*#__PURE__*/ _regeneratorRuntime().mark(
                                            function _callee2() {
                                              var tokenRes;
                                              return _regeneratorRuntime().wrap(
                                                function _callee2$(_context2) {
                                                  while (1)
                                                    switch (
                                                      (_context2.prev =
                                                        _context2.next)
                                                    ) {
                                                      case 0:
                                                        _context2.t0 =
                                                          mfaAuthVerificationApi;
                                                        _context2.next = 3;
                                                        return hashWithWebCrypto(
                                                          password
                                                        );
                                                      case 3:
                                                        _context2.t1 =
                                                          _context2.sent;
                                                        _context2.t2 = {
                                                          mfaType: 2,
                                                          tradePassword:
                                                            _context2.t1,
                                                        };
                                                        _context2.next = 7;
                                                        return (0,
                                                        _context2.t0)(
                                                          _context2.t2
                                                        );
                                                      case 7:
                                                        tokenRes =
                                                          _context2.sent;
                                                        if (tokenRes) {
                                                          resolve({
                                                            mfa: tokenRes.result,
                                                            signature: '',
                                                          });
                                                        }
                                                        reject(
                                                          new Error(
                                                            'Password verify failed'
                                                          )
                                                        );
                                                      case 10:
                                                      case 'end':
                                                        return _context2.stop();
                                                    }
                                                },
                                                _callee2
                                              );
                                            }
                                          )
                                        )();
                                      case 3:
                                        return _context4.abrupt('return');
                                      case 4:
                                        //check api verify
                                        try {
                                          // const res = await signMessage(params, deviceId);
                                          // resolve(res);
                                          // return;
                                          if (
                                            !deviceId &&
                                            !biometricManager.biometryManager
                                              .isBiometricTokenSaved
                                          ) {
                                            reject(
                                              new Error('Device id not found')
                                            );
                                          }
                                          biometricManager.authenticate({
                                            reason: reason,
                                            callback: (function () {
                                              var _callback = _asyncToGenerator(
                                                /*#__PURE__*/ _regeneratorRuntime().mark(
                                                  function _callee3(
                                                    success,
                                                    token
                                                  ) {
                                                    var res;
                                                    return _regeneratorRuntime().wrap(
                                                      function _callee3$(
                                                        _context3
                                                      ) {
                                                        while (1)
                                                          switch (
                                                            (_context3.prev =
                                                              _context3.next)
                                                          ) {
                                                            case 0:
                                                              if (!success) {
                                                                reject(
                                                                  new Error(
                                                                    'Biometric verify failed'
                                                                  )
                                                                );
                                                              }
                                                              _context3.next = 3;
                                                              return signMessage(
                                                                params,
                                                                token ||
                                                                  deviceId
                                                              );
                                                            case 3:
                                                              res =
                                                                _context3.sent;
                                                              resolve(res);
                                                            case 5:
                                                            case 'end':
                                                              return _context3.stop();
                                                          }
                                                      },
                                                      _callee3
                                                    );
                                                  }
                                                )
                                              );
                                              function callback(_x10, _x11) {
                                                return _callback.apply(
                                                  this,
                                                  arguments
                                                );
                                              }
                                              return callback;
                                            })(),
                                            failCallback: function failCallback(
                                              error
                                            ) {
                                              reject(error);
                                            },
                                          });
                                        } catch (error) {
                                          reject(error);
                                        }
                                      case 5:
                                      case 'end':
                                        return _context4.stop();
                                    }
                                },
                                _callee4
                              );
                            }
                          )
                        );
                        return function (_x8, _x9) {
                          return _ref3.apply(this, arguments);
                        };
                      })()
                    )
                  );
                case 3:
                case 'end':
                  return _context5.stop();
              }
          }, _callee5);
        }
      )
    );
    return function getMFAParams(_x4, _x5, _x6, _x7) {
      return _ref2.apply(this, arguments);
    };
  })();
  return {
    getMFAParams: getMFAParams,
  };
};

var chain = undefined;
var networkType = 'main';
var chainInfo = {
  chain: chain,
  type: 'BTC',
  name: 'Bitcoin',
  icon: undefined,
  networkType: networkType,
};

var chain$1 = undefined;
var networkType$1 = 'main';
var chainInfo$1 = {
  chain: chain$1,
  type: 'SOL',
  name: 'Solana',
  icon: undefined,
  networkType: networkType$1,
};

var chain$2 = undefined;
var networkType$2 = 'main';
var chainInfo$2 = {
  chain: chain$2,
  type: 'TON',
  name: 'Toncoin',
  icon: undefined,
  networkType: networkType$2,
};

var networkType$3 = 'main';
var chainInfo$3 = {
  chain: {
    id: 784,
    name: 'SUI',
    nativeCurrency: {
      decimals: 9,
      name: 'SUI',
      symbol: 'SUI',
    },
  },
  id: 784,
  type: 'SUI',
  name: 'SUI',
  icon: undefined,
  networkType: networkType$3,
};

var tomoEVMChains = /*#__PURE__*/ Object.values(wagmiChains).map(
  function (item) {
    var chain = {
      chain: item,
      type: 'EVM',
      name: item.name,
      networkType: undefined,
      icon: undefined,
    };
    return chain;
  }
);
var tomoChains = /*#__PURE__*/ [
  chainInfo,
  chainInfo$1,
  chainInfo$2,
  chainInfo$3,
].concat(tomoEVMChains);

var Web3Type;
(function (Web3Type) {
  Web3Type['EVM'] = 'EVM';
  Web3Type['SOL'] = 'SOL';
  Web3Type['BTC'] = 'BTC';
  Web3Type['SUI'] = 'SUI';
  Web3Type['TON'] = 'TON';
  Web3Type['ALL'] = 'ALL';
})(Web3Type || (Web3Type = {}));

var getChainId = function getChainId(chain) {
  var _chain$chain, _chain$chain3;
  if (
    chain != null &&
    (_chain$chain = chain.chain) != null &&
    _chain$chain.id
  ) {
    var _chain$chain2;
    return chain == null || (_chain$chain2 = chain.chain) == null
      ? void 0
      : _chain$chain2.id;
  }
  if ((chain == null ? void 0 : chain.type) === Web3Type.SOL) {
    return mockSolEvmChainId;
  }
  if ((chain == null ? void 0 : chain.type) === Web3Type.BTC) {
    return mockBtcEvmChainId;
  }
  if ((chain == null ? void 0 : chain.type) === Web3Type.TON) {
    return mockTonChainId;
  }
  return chain == null || (_chain$chain3 = chain.chain) == null
    ? void 0
    : _chain$chain3.id;
};

var useChainConfig = function useChainConfig() {
  return useQuery({
    queryKey: ['getConfigChainsAll'],
    queryFn: getConfigChainsAll,
  });
};

var useChains = function useChains() {
  var _useChainConfig = useChainConfig(),
    data = _useChainConfig.data;
  var chainIds = tomoChains
    .map(function (chain) {
      return getChainId(chain);
    })
    .filter(function (item) {
      return typeof item === 'number';
    });
  var swapChainIds = [
    // 0,
    1, 501, 56, 42161, 8453, 81457, 43114, 137, 534352, 10, 59144, 8333,
  ];
  var getChain = function getChain(chainId) {
    if (chainId === mockSolEvmChainId) {
      return chainInfo$1;
    }
    if (chainId === mockBtcEvmChainId) {
      return chainInfo;
    }
    if (chainId === mockTonChainId) {
      return chainInfo$2;
    }
    return tomoEVMChains.find(function (tomoChain) {
      return tomoChain.chain.id === chainId;
    });
  };
  var getChainIdByName = function getChainIdByName(value) {
    if (data && value) {
      for (
        var _i = 0, _Object$entries = Object.entries(data.chain_id_name);
        _i < _Object$entries.length;
        _i++
      ) {
        var _Object$entries$_i = _Object$entries[_i],
          key = _Object$entries$_i[0],
          val = _Object$entries$_i[1];
        if (val === value) {
          return Number(key == '607' ? '1100' : key);
        }
      }
    }
    return undefined;
  };
  var getChainNameById = function getChainNameById(chainId) {
    if (data && chainId) {
      return data.chain_id_name[chainId];
    }
    return undefined;
  };
  return {
    evmChains: tomoEVMChains,
    getChainId: getChainId,
    getChain: getChain,
    chains: tomoChains,
    chainIds: chainIds,
    swapChainIds: swapChainIds,
    getChainIdByName: getChainIdByName,
    getChainNameById: getChainNameById,
  };
};

function useTomoUserInfo() {
  var _useLocalStore = useLocalStore(),
    user = _useLocalStore.user,
    setUser = _useLocalStore.setUser,
    deviceId = _useLocalStore.deviceId,
    setDeviceId = _useLocalStore.setDeviceId;
  var _useBiometricManager = useBiometricManager(),
    biometryManager = _useBiometricManager.biometryManager;
  var evmAddress = user == null ? void 0 : user.v2Address;
  var solAddress = user == null ? void 0 : user.solanaAddress;
  var tonAddress = user == null ? void 0 : user.tonAddress;
  var tonPublicKey = user == null ? void 0 : user.tonPublicKey;
  var btcAddress = {
    bitcoinP2PkhAddress: user == null ? void 0 : user.bitcoinP2pkhAddress,
    bitcoinP2ShAddress: user == null ? void 0 : user.bitcoinP2shAddress,
    bitcoinP2TrAddress: user == null ? void 0 : user.bitcoinP2trAddress,
    bitcoinP2WpkhAddress: user == null ? void 0 : user.bitcoinP2wpkhAddress,
  };
  var getAddressByChain = function getAddressByChain(_ref) {
    var chain = _ref.chain,
      options = _ref.options;
    switch (chain == null ? void 0 : chain.type) {
      case Web3Type.EVM:
        return evmAddress;
      case Web3Type.SOL:
        return solAddress;
      case Web3Type.BTC:
        if ((options == null ? void 0 : options.btcType) == 'sh') {
          return btcAddress.bitcoinP2ShAddress;
        }
        if ((options == null ? void 0 : options.btcType) == 'tr') {
          return btcAddress.bitcoinP2TrAddress;
        }
        if ((options == null ? void 0 : options.btcType) == 'wpkh') {
          return btcAddress.bitcoinP2WpkhAddress;
        }
        return btcAddress.bitcoinP2PkhAddress;
      default:
        return undefined;
    }
  };
  return {
    getAddressByChain: getAddressByChain,
    userInfo: user,
    setUserInfo: setUser,
    deviceId: deviceId,
    evmAddress: evmAddress,
    solAddress: solAddress,
    tonAddress: tonAddress,
    tonPublicKey: tonPublicKey,
    btcAddress: btcAddress,
    generateDeviceId: (function () {
      var _generateDeviceId = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
          var generate, id, v2PkRegRes, pubkey, v2PkCreateRes, checkRes;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  if (!deviceId) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt('return', deviceId);
                case 2:
                  generate = function generate() {
                    var secureRandom = function secureRandom() {
                      var array = new Uint8Array(1);
                      window.crypto.getRandomValues(array);
                      return array[0] / 256;
                    };
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                      /[xy]/g,
                      function (c) {
                        var r = (secureRandom() * 16) | 0,
                          v = c === 'x' ? r : (r & 0x3) | 0x8;
                        return v.toString(16);
                      }
                    );
                  };
                  id = generate();
                  console.log('generate deviceId', id);
                  //generate pubkey
                  _context.next = 7;
                  return pkRegApi(id);
                case 7:
                  v2PkRegRes = _context.sent;
                  if (!(v2PkRegRes.code != successCode)) {
                    _context.next = 10;
                    break;
                  }
                  throw new Error('Failed to generate pubkey');
                case 10:
                  pubkey = v2PkRegRes.data.pubkey; //create pubkey
                  _context.next = 13;
                  return pkCreateApi({
                    device_no: id,
                    pubkey: pubkey,
                  });
                case 13:
                  v2PkCreateRes = _context.sent;
                  if (!(v2PkCreateRes.code != successCode)) {
                    _context.next = 16;
                    break;
                  }
                  throw new Error('Failed to create pubkey');
                case 16:
                  _context.next = 18;
                  return pkCheckApi(id);
                case 18:
                  checkRes = _context.sent;
                  if (!(checkRes.code != successCode)) {
                    _context.next = 21;
                    break;
                  }
                  throw new Error('Failed to check pubkey');
                case 21:
                  if (checkRes.data.is_exists) {
                    _context.next = 23;
                    break;
                  }
                  throw new Error('Pubkey is not existed');
                case 23:
                  try {
                    biometryManager.updateBiometricToken(id);
                  } catch (err) {
                    setDeviceId(id);
                    console.error(err);
                  }
                  return _context.abrupt('return', id);
                case 25:
                case 'end':
                  return _context.stop();
              }
          }, _callee);
        })
      );
      function generateDeviceId() {
        return _generateDeviceId.apply(this, arguments);
      }
      return generateDeviceId;
    })(),
  };
}

var useConfig = function useConfig() {
  var _useChains = useChains(),
    evmChains = _useChains.evmChains;
  var _evmChains = evmChains
    .map(function (chain) {
      return chain.chain;
    })
    .map(function (m) {
      if (m.id == 1) {
        return _extends$9({}, m, {
          rpcUrls: {
            default: {
              http: ['https://rpc.ankr.com/eth'],
            },
          },
        });
      }
      return m;
    });
  // @ts-ignore
  var wagmiConfig = createConfig({
    chains: _evmChains.map(function (item) {
      return item;
    }),
    transports: Object.fromEntries(
      _evmChains
        .map(function (chain) {
          return chain == null ? void 0 : chain.id;
        })
        .map(function (key) {
          return [key, http()];
        })
    ),
  });
  return {
    config: wagmiConfig,
  };
};

var getBalanceFromNode = /*#__PURE__*/ (function () {
  var _ref = /*#__PURE__*/ _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(address, rpc) {
      var res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1)
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return axios.get(rpc + '/api/address/' + address + '/utxo', {
                maxRedirects: 1,
              });
            case 2:
              res = _context.sent;
              return _context.abrupt('return', res.data);
            case 4:
            case 'end':
              return _context.stop();
          }
      }, _callee);
    })
  );
  return function getBalanceFromNode(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
var useBTCBalance = function useBTCBalance(netWorkType) {
  if (netWorkType === void 0) {
    netWorkType = 'MAINNET';
  }
  var _useTomoUserInfo = useTomoUserInfo(),
    btcAddress = _useTomoUserInfo.btcAddress;
  var getByAddressBalance = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(address) {
        var rpc, btcRes;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1)
            switch ((_context2.prev = _context2.next)) {
              case 0:
                rpc =
                  netWorkType === 'MAINNET'
                    ? 'https://btc-rpc.lorenzo-protocol.xyz'
                    : 'https://btc-rpc-signet.lorenzo-protocol.xyz/signet';
                if (address) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt('return', 0);
              case 3:
                _context2.next = 5;
                return getBalanceFromNode(address, rpc);
              case 5:
                btcRes = _context2.sent;
                if (!(btcRes && btcRes.length > 0)) {
                  _context2.next = 8;
                  break;
                }
                return _context2.abrupt('return', btcRes[0].value);
              case 8:
                return _context2.abrupt('return', 0);
              case 9:
              case 'end':
                return _context2.stop();
            }
        }, _callee2);
      })
    );
    return function getByAddressBalance(_x3) {
      return _ref2.apply(this, arguments);
    };
  })();
  return useQuery({
    queryKey: ['BTCBalances', btcAddress],
    queryFn: (function () {
      var _queryFn = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4() {
          var data;
          return _regeneratorRuntime().wrap(
            function _callee4$(_context4) {
              while (1)
                switch ((_context4.prev = _context4.next)) {
                  case 0:
                    _context4.prev = 0;
                    _context4.next = 3;
                    return Promise.all(
                      btcAddressTypeMaps.map(
                        /*#__PURE__*/ (function () {
                          var _ref3 = _asyncToGenerator(
                            /*#__PURE__*/ _regeneratorRuntime().mark(
                              function _callee3(typeKey) {
                                var address, value;
                                return _regeneratorRuntime().wrap(
                                  function _callee3$(_context3) {
                                    while (1)
                                      switch (
                                        (_context3.prev = _context3.next)
                                      ) {
                                        case 0:
                                          // @ts-ignore
                                          address =
                                            btcAddress[typeKey + 'Address'];
                                          _context3.next = 3;
                                          return getByAddressBalance(address);
                                        case 3:
                                          value = _context3.sent;
                                          return _context3.abrupt('return', {
                                            value: value,
                                            address: address,
                                            type: typeKey,
                                          });
                                        case 5:
                                        case 'end':
                                          return _context3.stop();
                                      }
                                  },
                                  _callee3
                                );
                              }
                            )
                          );
                          return function (_x4) {
                            return _ref3.apply(this, arguments);
                          };
                        })()
                      )
                    );
                  case 3:
                    data = _context4.sent;
                    return _context4.abrupt('return', data);
                  case 7:
                    _context4.prev = 7;
                    _context4.t0 = _context4['catch'](0);
                    console.warn(_context4.t0);
                  case 10:
                    return _context4.abrupt('return', null);
                  case 11:
                  case 'end':
                    return _context4.stop();
                }
            },
            _callee4,
            null,
            [[0, 7]]
          );
        })
      );
      function queryFn() {
        return _queryFn.apply(this, arguments);
      }
      return queryFn;
    })(),
  });
};

var useSolBalance = function useSolBalance(options) {
  var _useTomoUserInfo = useTomoUserInfo(),
    solAddress = _useTomoUserInfo.solAddress;
  return useQuery({
    queryKey: ['SolBalance', solAddress],
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    retry: 5,
    queryFn: (function () {
      var _queryFn = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
          var connection, PublicKey, publicKey, balance;
          return _regeneratorRuntime().wrap(
            function _callee$(_context) {
              while (1)
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.prev = 0;
                    if (!solAddress) {
                      _context.next = 12;
                      break;
                    }
                    connection = getConnection();
                    _context.next = 5;
                    return import('@solana/web3.js');
                  case 5:
                    PublicKey = _context.sent.PublicKey;
                    publicKey = new PublicKey(solAddress);
                    _context.next = 9;
                    return connection.getBalance(publicKey);
                  case 9:
                    balance = _context.sent;
                    if (!balance) {
                      _context.next = 12;
                      break;
                    }
                    return _context.abrupt('return', BigInt(balance));
                  case 12:
                    _context.next = 18;
                    break;
                  case 14:
                    _context.prev = 14;
                    _context.t0 = _context['catch'](0);
                    console.warn(_context.t0);
                    (options == null ? void 0 : options.onError) &&
                      options.onError(_context.t0);
                  case 18:
                    return _context.abrupt('return', null);
                  case 19:
                  case 'end':
                    return _context.stop();
                }
            },
            _callee,
            null,
            [[0, 14]]
          );
        })
      );
      function queryFn() {
        return _queryFn.apply(this, arguments);
      }
      return queryFn;
    })(),
  });
};

/**
 * Fetches balance information using the specified chain ID, token, and network type.
 *
 * @param {number | undefined} chainId - The ID of the blockchain. If `chainId` is 0, `netWorkType` is a required parameter.
 * @param {string} [token] - The identifier of the token.
 * @param {BTCNetworkType} [netWorkType] - The network type, which can be "MAINNET", "TESTNET", or "SIGNET".
 * @param options
 */
var useBalance = function useBalance(_ref, options) {
  var chainId = _ref.chainId,
    token = _ref.token,
    netWorkType = _ref.netWorkType,
    decimal = _ref.decimal;
  var _useChains = useChains(),
    chains = _useChains.chains;
  var _useTomoUserInfo = useTomoUserInfo(),
    solAddress = _useTomoUserInfo.solAddress,
    evmAddress = _useTomoUserInfo.evmAddress,
    tonAddress = _useTomoUserInfo.tonAddress;
  var btcBalanceQuery = useBTCBalance(netWorkType);
  var solBalanceQuery = useSolBalance();
  var _useConfig = useConfig(),
    config = _useConfig.config;
  var chain = useMemo(
    function () {
      if (chainId === mockBtcEvmChainId) {
        return chains.find(function (item) {
          return item.type === Web3Type.BTC;
        });
      }
      if (chainId === mockSolEvmChainId) {
        return chains.find(function (item) {
          return item.type === Web3Type.SOL;
        });
      }
      if (chainId === mockTonChainId) {
        return chains.find(function (item) {
          return item.type === Web3Type.TON;
        });
      }
      return chains.find(function (item) {
        var _item$chain;
        return (
          ((_item$chain = item.chain) == null ? void 0 : _item$chain.id) ===
          chainId
        );
      });
    },
    [chainId, chains]
  );
  var balance = useQuery({
    queryKey: ['useAllChainBalance', chainId, token, chain],
    queryFn: (function () {
      var _queryFn = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
          var _btcBalanceQuery$data,
            _btcBalanceQuery$data2,
            value,
            _balance,
            balanceSolSPLToken,
            decimals,
            _value,
            _balance2,
            amount,
            _value2,
            _balance3,
            _balance4;
          return _regeneratorRuntime().wrap(
            function _callee$(_context) {
              while (1)
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.prev = 0;
                    if (
                      !((chain == null ? void 0 : chain.type) === Web3Type.BTC)
                    ) {
                      _context.next = 7;
                      break;
                    }
                    value =
                      (_btcBalanceQuery$data =
                        (_btcBalanceQuery$data2 = btcBalanceQuery.data) == null
                          ? void 0
                          : _btcBalanceQuery$data2.reduce(function (acc, item) {
                              return acc + item.value;
                            }, 0)) != null
                        ? _btcBalanceQuery$data
                        : 0;
                    _balance = {
                      decimals: btcDecimals,
                      formatted: formatUnits(BigInt(value), btcDecimals),
                      symbol: 'BTC',
                      value: BigInt(value),
                    };
                    return _context.abrupt('return', _balance);
                  case 7:
                    if (
                      !((chain == null ? void 0 : chain.type) === Web3Type.SOL)
                    ) {
                      _context.next = 23;
                      break;
                    }
                    if (!token) {
                      _context.next = 18;
                      break;
                    }
                    _context.next = 11;
                    return getSolBalance({
                      address: solAddress,
                      token: token,
                    });
                  case 11:
                    balanceSolSPLToken = _context.sent;
                    decimals = balanceSolSPLToken
                      ? balanceSolSPLToken.decimals
                      : undefined;
                    _value = balanceSolSPLToken
                      ? balanceSolSPLToken.amount
                      : BigInt(0);
                    _balance2 = {
                      decimals: decimals,
                      formatted: decimals ? formatUnits(_value, decimals) : '0',
                      symbol: balanceSolSPLToken.token,
                      value: _value,
                    };
                    return _context.abrupt('return', _balance2);
                  case 18:
                    amount = solBalanceQuery.data;
                    _value2 = amount ? amount : BigInt(0);
                    return _context.abrupt('return', {
                      decimals: solDecimals,
                      formatted: formatUnits(_value2, solDecimals),
                      symbol: 'SOL',
                      value: _value2,
                    });
                  case 21:
                    _context.next = 35;
                    break;
                  case 23:
                    if (
                      !((chain == null ? void 0 : chain.type) === Web3Type.EVM)
                    ) {
                      _context.next = 30;
                      break;
                    }
                    _context.next = 26;
                    return getBalance(config, {
                      address: evmAddress,
                      chainId: chainId,
                      token: token,
                    });
                  case 26:
                    _balance3 = _context.sent;
                    return _context.abrupt('return', _balance3);
                  case 30:
                    if (
                      !((chain == null ? void 0 : chain.type) === Web3Type.TON)
                    ) {
                      _context.next = 35;
                      break;
                    }
                    _context.next = 33;
                    return getTonBalance({
                      tonAddress: tonAddress,
                      tokenContractAddress: token,
                      tokenPrecision: decimal,
                    });
                  case 33:
                    _balance4 = _context.sent;
                    return _context.abrupt('return', {
                      decimals: token ? decimal : tonDecimals,
                      formatted: _balance4.formatted,
                      symbol: token ? '' : 'TON',
                      value: _balance4.balance,
                    });
                  case 35:
                    return _context.abrupt('return', undefined);
                  case 38:
                    _context.prev = 38;
                    _context.t0 = _context['catch'](0);
                    (options == null ? void 0 : options.onError) &&
                      options.onError(_context.t0);
                    throw _context.t0;
                  case 42:
                  case 'end':
                    return _context.stop();
                }
            },
            _callee,
            null,
            [[0, 38]]
          );
        })
      );
      function queryFn() {
        return _queryFn.apply(this, arguments);
      }
      return queryFn;
    })(),
  });
  return balance;
};

var useTransactions = function useTransactions() {
  var _useLocalStore = useLocalStore(),
    transactions = _useLocalStore.transactions,
    setTransactions = _useLocalStore.setTransactions;
  var setTransactionsByCalc = function setTransactionsByCalc(_ref) {
    var _extends2;
    var transaction = _ref.transaction;
    var chainId = transaction.chainId;
    var items = transactions[chainId];
    var hisotrys = [transaction].concat(items ? items : []);
    setTransactions(
      _extends$9(
        {},
        transactions,
        ((_extends2 = {}),
        (_extends2[chainId] = hisotrys.splice(0, 5)),
        _extends2)
      )
    );
  };
  return {
    transactions: transactions,
    setTransactions: setTransactionsByCalc,
  };
};

var useUserTokens = function useUserTokens(tokenSize, options) {
  if (tokenSize === void 0) {
    tokenSize = 250;
  }
  var _useTomoUserInfo = useTomoUserInfo(),
    evmAddress = _useTomoUserInfo.evmAddress,
    solAddress = _useTomoUserInfo.solAddress;
  var systemTokensQuery = useQuery({
    queryKey: ['TokenTypes', evmAddress, solAddress],
    queryFn: (function () {
      var _queryFn = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(
            function _callee$(_context) {
              while (1)
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return getSystemTokens({
                      evm_address: evmAddress,
                      solana_address: solAddress,
                    });
                  case 3:
                    return _context.abrupt('return', _context.sent);
                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context['catch'](0);
                    if (
                      typeof (options == null ? void 0 : options.onError) ===
                      'function'
                    ) {
                      options.onError(_context.t0);
                    }
                    throw _context.t0;
                  case 10:
                  case 'end':
                    return _context.stop();
                }
            },
            _callee,
            null,
            [[0, 6]]
          );
        })
      );
      function queryFn() {
        return _queryFn.apply(this, arguments);
      }
      return queryFn;
    })(),
  });
  var userCustomTokensQuery = useQuery({
    queryKey: ['userCustomTokens', evmAddress, solAddress],
    queryFn: (function () {
      var _queryFn2 = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(
            function _callee2$(_context2) {
              while (1)
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return v1AllAssetApi({
                      page: 1,
                      pageSize: tokenSize,
                    });
                  case 3:
                    return _context2.abrupt('return', _context2.sent);
                  case 6:
                    _context2.prev = 6;
                    _context2.t0 = _context2['catch'](0);
                    if (
                      typeof (options == null ? void 0 : options.onError) ===
                      'function'
                    ) {
                      options.onError(_context2.t0);
                    }
                    throw _context2.t0;
                  case 10:
                  case 'end':
                    return _context2.stop();
                }
            },
            _callee2,
            null,
            [[0, 6]]
          );
        })
      );
      function queryFn() {
        return _queryFn2.apply(this, arguments);
      }
      return queryFn;
    })(),
  });
  var setCustomToken = /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(params) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1)
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.next = 2;
                return v1AddAssetApi(params);
              case 2:
                return _context3.abrupt('return', _context3.sent);
              case 3:
              case 'end':
                return _context3.stop();
            }
        }, _callee3);
      })
    );
    return function setCustomToken(_x) {
      return _ref.apply(this, arguments);
    };
  })();
  var tokens = useMemo(
    function () {
      if (!systemTokensQuery.isLoading && !userCustomTokensQuery.isLoading) {
        var systemToken =
          systemTokensQuery == null ? void 0 : systemTokensQuery.data;
        var userToken =
          userCustomTokensQuery == null ? void 0 : userCustomTokensQuery.data;
        var filterTokens = (userToken || []).filter(function (token) {
          return !systemToken.find(function (item) {
            return (
              token.token.toLocaleUpperCase() ===
                item.contract.toLocaleUpperCase() &&
              item.chain_id === token.chain_id
            );
          });
        });
        return [].concat(
          systemToken || [],
          (filterTokens || []).map(function (token) {
            var customToken = {
              balance: '0',
              chain_id: token.chain_id,
              contract: token.token,
              decimals: token.decimals,
              image: token.image,
              is_native: !token.token,
              mercuryo_support: '',
              name: token.name,
              price: 0,
              ramp_support: '',
              symbol: token.symbol,
            };
            return customToken;
          })
        );
      }
      return [];
    },
    [systemTokensQuery, userCustomTokensQuery]
  );
  return {
    tokens: tokens,
    setCustomToken: setCustomToken,
    refetch: function refetch() {
      systemTokensQuery.refetch();
      userCustomTokensQuery.refetch();
    },
  };
};

var useSendTransaction = function useSendTransaction(options) {
  var _useTransactions = useTransactions(),
    setTransactions = _useTransactions.setTransactions;
  var _useMFAVerify = useMFAVerify(),
    getMFAParams = _useMFAVerify.getMFAParams;
  var connect = getConnection();
  var _useChains = useChains(),
    getChain = _useChains.getChain;
  var _useUserTokens = useUserTokens(),
    setCustomToken = _useUserTokens.setCustomToken;
  var sendEVMTransaction = /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(params) {
        var data,
          chainId,
          chain,
          gasPrice,
          res,
          _res$value,
          _res$maxFeePerGas,
          _res$maxPriorityFeePe,
          mfaParams,
          mfaRes,
          _chain$chain,
          mfa,
          rpc,
          signRes,
          publicClient,
          result,
          _params$tokenValue,
          _params$tokenValue2,
          historySave;
        return _regeneratorRuntime().wrap(
          function _callee2$(_context2) {
            while (1)
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.prev = 0;
                  console.log('sendEVMTransaction', params);
                  data = params.data || '0x';
                  chainId = params.chainId;
                  chain = getChain(chainId);
                  _context2.next = 7;
                  return getGasPrice(params.config, {
                    chainId: chainId,
                  });
                case 7:
                  gasPrice = _context2.sent;
                  _context2.next = 10;
                  return prepareTransactionRequest(params.config, {
                    chainId: chainId,
                    account: params.fromAddress,
                    to: params.toAddress,
                    value: params.value || BigInt(0),
                    data: data,
                  });
                case 10:
                  res = _context2.sent;
                  if (!res) {
                    _context2.next = 43;
                    break;
                  }
                  mfaParams = {
                    gas: (res.gas * BigInt(2)).toString(),
                    gasPrice: '0x' + gasPrice.toString(16),
                    value:
                      '0x' +
                      ((_res$value = res.value) == null
                        ? void 0
                        : _res$value.toString(16)),
                    // from: res.from,
                    to: res.to,
                    nonce: res.nonce,
                    data: data,
                    maxFeePerGas:
                      (_res$maxFeePerGas = res.maxFeePerGas) == null
                        ? void 0
                        : _res$maxFeePerGas.toString(),
                    maxPriorityFeePerGas:
                      (_res$maxPriorityFeePe = res.maxPriorityFeePerGas) == null
                        ? void 0
                        : _res$maxPriorityFeePe.toString(),
                  };
                  if (chainId) {
                    _context2.next = 15;
                    break;
                  }
                  return _context2.abrupt('return');
                case 15:
                  _context2.next = 17;
                  return getMFAParams(
                    {
                      data: mfaParams,
                      chainid: chainId,
                    },
                    params.mfaType,
                    params.password
                  );
                case 17:
                  mfaRes = _context2.sent;
                  if (!mfaRes) {
                    _context2.next = 41;
                    break;
                  }
                  mfa = mfaRes.mfa;
                  if (mfa) {
                    _context2.next = 22;
                    break;
                  }
                  return _context2.abrupt('return');
                case 22:
                  setPassKey(mfa);
                  rpc =
                    params.rpc ||
                    (chain == null ||
                    (_chain$chain = chain.chain) == null ||
                    (_chain$chain = _chain$chain.rpcUrls) == null ||
                    (_chain$chain = _chain$chain['default']) == null
                      ? void 0
                      : _chain$chain.http[0]);
                  if (rpc) {
                    _context2.next = 26;
                    break;
                  }
                  return _context2.abrupt('return');
                case 26:
                  _context2.next = 28;
                  return signEvmTransactionApi(mfa, {
                    transaction: mfaParams,
                    chainId: chainId,
                    rpc: rpc,
                  });
                case 28:
                  signRes = _context2.sent;
                  publicClient = getPublicClient(params.config); // @ts-ignore
                  _context2.next = 32;
                  return publicClient.sendRawTransaction({
                    serializedTransaction: signRes.result,
                  });
                case 32:
                  result = _context2.sent;
                  if (!result) {
                    _context2.next = 41;
                    break;
                  }
                  historySave = {
                    fromAddress: params == null ? void 0 : params.fromAddress,
                    toAddress: params == null ? void 0 : params.toAddress,
                    fromAmount:
                      params == null ||
                      (_params$tokenValue = params.tokenValue) == null
                        ? void 0
                        : _params$tokenValue.toString(),
                    toAmount:
                      (params == null ||
                      (_params$tokenValue2 = params.tokenValue) == null
                        ? void 0
                        : _params$tokenValue2.toString()) || '0',
                    fromSwapTokens: params.token,
                    toSwapTokens: params.toToken
                      ? params.toToken
                      : params.token,
                    nonce: res.nonce,
                    time: new Date().getTime(),
                    hash: result,
                    historyType: params.historyType
                      ? params.historyType
                      : 'Send',
                    chainId: chainId,
                  };
                  if (!(params.historyType === 'Swap')) {
                    _context2.next = 39;
                    break;
                  }
                  if (!params.toToken) {
                    _context2.next = 39;
                    break;
                  }
                  _context2.next = 39;
                  return setCustomToken(
                    _extends$9({}, params.toToken, {
                      token: params.toToken.address,
                      chain_id: params.toToken.chainId,
                    })
                  );
                case 39:
                  setTransactions({
                    transaction: historySave,
                  });
                  return _context2.abrupt('return', result);
                case 41:
                  _context2.next = 44;
                  break;
                case 43:
                  console.error('prepareTransactionRequest');
                case 44:
                  _context2.next = 52;
                  break;
                case 46:
                  _context2.prev = 46;
                  _context2.t0 = _context2['catch'](0);
                  console.warn({
                    error: _context2.t0,
                  });
                  if (_context2.t0.name === 'EstimateGasExecutionError') {
                    console.error(_context2.t0.details);
                  } else {
                    console.error(
                      _context2.t0.details ? _context2.t0.details : _context2.t0
                    );
                  }
                  (options == null ? void 0 : options.onError) &&
                    (options == null ? void 0 : options.onError(_context2.t0));
                  throw _context2.t0;
                case 52:
                case 'end':
                  return _context2.stop();
              }
          },
          _callee2,
          null,
          [[0, 46]]
        );
      })
    );
    return function sendEVMTransaction(_x) {
      return _ref.apply(this, arguments);
    };
  })();
  var sendSolTransaction = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(params) {
        var txStr, mfaRes, _txStr, signRes, _sendTransaction, hash;
        return _regeneratorRuntime().wrap(
          function _callee4$(_context4) {
            while (1)
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.prev = 0;
                  if (
                    !(typeof params.value !== undefined && params.fromAddress)
                  ) {
                    _context4.next = 31;
                    break;
                  }
                  if (!params.data) {
                    _context4.next = 8;
                    break;
                  }
                  _context4.next = 5;
                  return ToSerializeTransaction(params.data);
                case 5:
                  txStr = _context4.sent;
                  _context4.next = 17;
                  break;
                case 8:
                  if (params.contract) {
                    _context4.next = 14;
                    break;
                  }
                  _context4.next = 11;
                  return sendSolTx(
                    params.fromAddress,
                    // my Address
                    params.toAddress,
                    // toAddress
                    params.value || BigInt(0),
                    //value
                    // signData.txMeta.mintAddress // contract Address
                    params.contract
                  );
                case 11:
                  txStr = _context4.sent;
                  _context4.next = 17;
                  break;
                case 14:
                  _context4.next = 16;
                  return getSendSplToken(
                    params.contract,
                    params.fromAddress,
                    params.toAddress,
                    params.value
                  );
                case 16:
                  txStr = _context4.sent;
                case 17:
                  _context4.next = 19;
                  return getMFAParams(
                    {
                      data: txStr,
                      chainid: mockSolEvmChainId,
                    },
                    params.mfaType,
                    params.password
                  );
                case 19:
                  mfaRes = _context4.sent;
                  if (!mfaRes.mfa) {
                    _context4.next = 31;
                    break;
                  }
                  setPassKey(mfaRes.mfa);
                  _context4.next = 24;
                  return solSignRawTransaction({
                    rawTransaction: (_txStr = txStr) != null ? _txStr : '',
                  });
                case 24:
                  signRes = _context4.sent;
                  _sendTransaction = /*#__PURE__*/ (function () {
                    var _ref3 = _asyncToGenerator(
                      /*#__PURE__*/ _regeneratorRuntime().mark(
                        function _callee3() {
                          var hash,
                            i,
                            _params$value,
                            _params$value2,
                            historySave;
                          return _regeneratorRuntime().wrap(
                            function _callee3$(_context3) {
                              while (1)
                                switch ((_context3.prev = _context3.next)) {
                                  case 0:
                                    _context3.prev = 0;
                                    i = 0;
                                  case 2:
                                    if (!(i < 30)) {
                                      _context3.next = 15;
                                      break;
                                    }
                                    if (!signRes) {
                                      _context3.next = 12;
                                      break;
                                    }
                                    _context3.next = 6;
                                    return connect.sendRawTransaction(
                                      Buffer.from(signRes.result, 'hex')
                                    );
                                  case 6:
                                    hash = _context3.sent;
                                    _context3.next = 9;
                                    return sleep(1000);
                                  case 9:
                                    _context3.next = 11;
                                    return connect.getSignatureStatus(hash);
                                  case 11:
                                  case 12:
                                    i++;
                                    _context3.next = 2;
                                    break;
                                  case 15:
                                    _context3.next = 29;
                                    break;
                                  case 17:
                                    _context3.prev = 17;
                                    _context3.t0 = _context3['catch'](0);
                                    if (hash) {
                                      _context3.next = 21;
                                      break;
                                    }
                                    return _context3.abrupt('return');
                                  case 21:
                                    historySave = {
                                      fromAddress:
                                        params == null
                                          ? void 0
                                          : params.fromAddress,
                                      toAddress:
                                        params == null
                                          ? void 0
                                          : params.toAddress,
                                      fromAmount:
                                        params == null ||
                                        (_params$value = params.value) == null
                                          ? void 0
                                          : _params$value.toString(),
                                      toAmount:
                                        (params == null ||
                                        (_params$value2 = params.value) == null
                                          ? void 0
                                          : _params$value2.toString()) || '0',
                                      fromSwapTokens: params.token,
                                      toSwapTokens: params.token,
                                      nonce: new Date().getTime(),
                                      time: new Date().getTime(),
                                      hash: hash,
                                      historyType: params.historyType
                                        ? params.historyType
                                        : 'Send',
                                      chainId: mockSolEvmChainId,
                                    };
                                    if (!(params.historyType === 'Swap')) {
                                      _context3.next = 26;
                                      break;
                                    }
                                    if (!params.toToken) {
                                      _context3.next = 26;
                                      break;
                                    }
                                    _context3.next = 26;
                                    return setCustomToken(
                                      _extends$9({}, params.toToken, {
                                        token: params.toToken.address,
                                        chain_id: params.toToken.chainId,
                                      })
                                    );
                                  case 26:
                                    setTransactions({
                                      transaction: historySave,
                                    });
                                    if (!hash) {
                                      _context3.next = 29;
                                      break;
                                    }
                                    throw {
                                      success: true,
                                      error: _context3.t0,
                                      hash: hash,
                                    };
                                  case 29:
                                  case 'end':
                                    return _context3.stop();
                                }
                            },
                            _callee3,
                            null,
                            [[0, 17]]
                          );
                        }
                      )
                    );
                    return function _sendTransaction() {
                      return _ref3.apply(this, arguments);
                    };
                  })();
                  _context4.next = 28;
                  return _sendTransaction();
                case 28:
                  hash = _context4.sent;
                  console.log({
                    hash: hash,
                  });
                  return _context4.abrupt('return', hash);
                case 31:
                  _context4.next = 43;
                  break;
                case 33:
                  _context4.prev = 33;
                  _context4.t0 = _context4['catch'](0);
                  if (!_context4.t0.success) {
                    _context4.next = 40;
                    break;
                  }
                  console.log({
                    key: 'success!',
                    hash: _context4.t0.hash,
                  });
                  return _context4.abrupt('return', _context4.t0.hash);
                case 40:
                  console.error({
                    error: _context4.t0,
                  });
                case 41:
                  (options == null ? void 0 : options.onError) &&
                    (options == null ? void 0 : options.onError(_context4.t0));
                  throw _context4.t0;
                case 43:
                case 'end':
                  return _context4.stop();
              }
          },
          _callee4,
          null,
          [[0, 33]]
        );
      })
    );
    return function sendSolTransaction(_x2) {
      return _ref2.apply(this, arguments);
    };
  })();
  var sendBtcTransaction = /*#__PURE__*/ (function () {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee5(params) {
        var amount, txStr, mfaRes, res, hash, historySave;
        return _regeneratorRuntime().wrap(
          function _callee5$(_context5) {
            while (1)
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  _context5.prev = 0;
                  amount = parseUnits(params.value, btcDecimals).toString();
                  _context5.next = 4;
                  return sendTx({
                    network: params.network,
                    addressType: params.addressType,
                    toAddress: params.toAddress,
                    amount: amount,
                  });
                case 4:
                  txStr = _context5.sent;
                  _context5.next = 7;
                  return getMFAParams(
                    {
                      data: txStr,
                      chainid: mockSolEvmChainId,
                    },
                    params.mfaType,
                    params.password
                  );
                case 7:
                  mfaRes = _context5.sent;
                  if (!mfaRes) {
                    _context5.next = 22;
                    break;
                  }
                  setPassKey(mfaRes.mfa);
                  _context5.next = 12;
                  return btcSignPsbtAndPush({
                    networkType: params.network,
                    addressType: params.addressType,
                    psbtHex: txStr.result.psbtHex,
                    autoFinalized: true,
                  });
                case 12:
                  res = _context5.sent;
                  if (!(res && res.result)) {
                    _context5.next = 22;
                    break;
                  }
                  // if (tranRes.code !== 0) {
                  //   throw new Error(tranRes.message)
                  // }
                  hash = res.result;
                  historySave = {
                    fromAddress: params.network,
                    toAddress: params.addressType,
                    fromAmount: amount,
                    toAmount: amount,
                    fromSwapTokens: params.token,
                    toSwapTokens: params.token,
                    nonce: new Date().getTime(),
                    time: new Date().getTime(),
                    hash: hash,
                    historyType: params.historyType
                      ? params.historyType
                      : 'Send',
                    chainId: mockBtcEvmChainId,
                  };
                  if (!(params.historyType === 'Swap')) {
                    _context5.next = 20;
                    break;
                  }
                  if (!params.toToken) {
                    _context5.next = 20;
                    break;
                  }
                  _context5.next = 20;
                  return setCustomToken(
                    _extends$9({}, params.toToken, {
                      token: params.toToken.address,
                      chain_id: params.toToken.chainId,
                    })
                  );
                case 20:
                  setTransactions({
                    transaction: historySave,
                  });
                  return _context5.abrupt('return', hash);
                case 22:
                  _context5.next = 28;
                  break;
                case 24:
                  _context5.prev = 24;
                  _context5.t0 = _context5['catch'](0);
                  (options == null ? void 0 : options.onError) &&
                    (options == null ? void 0 : options.onError(_context5.t0));
                  throw _context5.t0;
                case 28:
                case 'end':
                  return _context5.stop();
              }
          },
          _callee5,
          null,
          [[0, 24]]
        );
      })
    );
    return function sendBtcTransaction(_x3) {
      return _ref4.apply(this, arguments);
    };
  })();
  var sendTonTransaction = /*#__PURE__*/ (function () {
    var _ref5 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee6(params) {
        var singingMessage,
          mfaRes,
          mfa,
          mfaParams,
          _yield$tonSignMessage,
          signedTransaction,
          code,
          message,
          tranRes,
          amount,
          historySave;
        return _regeneratorRuntime().wrap(
          function _callee6$(_context6) {
            while (1)
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return createSigningTransaction(params);
                case 3:
                  singingMessage = _context6.sent;
                  if (
                    singingMessage != null &&
                    singingMessage.signingMessageBoc
                  ) {
                    _context6.next = 6;
                    break;
                  }
                  return _context6.abrupt('return');
                case 6:
                  _context6.next = 8;
                  return getMFAParams(
                    {
                      data: singingMessage,
                      chainid: mockTonChainId,
                    },
                    params.mfaType,
                    params.password
                  );
                case 8:
                  mfaRes = _context6.sent;
                  mfa = mfaRes.mfa; // console.log('mfa', mfa);
                  if (mfa) {
                    _context6.next = 12;
                    break;
                  }
                  return _context6.abrupt('return');
                case 12:
                  setPassKey(mfa);
                  mfaParams = {
                    signingMessageBoc: singingMessage.signingMessageBoc,
                    stateInitBoc:
                      (singingMessage == null
                        ? void 0
                        : singingMessage.stateInitBoc) || '',
                  };
                  _context6.next = 16;
                  return tonSignMessage(mfa, mfaParams);
                case 16:
                  _yield$tonSignMessage = _context6.sent;
                  signedTransaction = _yield$tonSignMessage.result;
                  code = _yield$tonSignMessage.code;
                  message = _yield$tonSignMessage.message;
                  if (!(code != 10000)) {
                    _context6.next = 22;
                    break;
                  }
                  return _context6.abrupt('return', message);
                case 22:
                  _context6.next = 24;
                  return sendTransaction(signedTransaction, params.fromAddress);
                case 24:
                  tranRes = _context6.sent;
                  // const tranRes = {'@type': 'ok', '@extra': '1724056253.9801953:10:0.38478557394306645', 'msgHash': ''};
                  amount =
                    '' + Number(params == null ? void 0 : params.value) * 1e9;
                  if (!(tranRes && tranRes['@type'] == 'ok')) {
                    _context6.next = 30;
                    break;
                  }
                  historySave = {
                    fromAddress: params.fromAddress,
                    toAddress: params.toAddress,
                    fromAmount: amount,
                    toAmount: amount,
                    fromSwapTokens: params.token,
                    toSwapTokens: params.token,
                    nonce: tranRes.lt || new Date().getTime(),
                    time: new Date().getTime(),
                    hash: (tranRes == null ? void 0 : tranRes.msgHash) || '',
                    historyType: params.historyType
                      ? params.historyType
                      : 'Send',
                    chainId: mockTonChainId,
                  };
                  setTransactions({
                    transaction: historySave,
                  });
                  return _context6.abrupt(
                    'return',
                    (tranRes == null ? void 0 : tranRes.msgHash) || ''
                  );
                case 30:
                  _context6.next = 38;
                  break;
                case 32:
                  _context6.prev = 32;
                  _context6.t0 = _context6['catch'](0);
                  console.warn({
                    error: _context6.t0,
                  });
                  if (_context6.t0.name === 'EstimateGasExecutionError') {
                    console.error(_context6.t0.details);
                  } else {
                    console.error(
                      _context6.t0.details ? _context6.t0.details : _context6.t0
                    );
                  }
                  (options == null ? void 0 : options.onError) &&
                    (options == null ? void 0 : options.onError(_context6.t0));
                  throw _context6.t0;
                case 38:
                case 'end':
                  return _context6.stop();
              }
          },
          _callee6,
          null,
          [[0, 32]]
        );
      })
    );
    return function sendTonTransaction(_x4) {
      return _ref5.apply(this, arguments);
    };
  })();
  return {
    sendEVMTransaction: sendEVMTransaction,
    sendSolTransaction: sendSolTransaction,
    sendTonTransaction: sendTonTransaction,
    sendBtcTransaction: sendBtcTransaction,
  };
};

var useSwapAllTokens = function useSwapAllTokens(_ref, options) {
  var chain = _ref.chain;
  return useQuery({
    queryKey: ['getSwapAllTokens', chain],
    placeholderData: keepPreviousData,
    queryFn: (function () {
      var _queryFn = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(
            function _callee$(_context) {
              while (1)
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return getSwapAllTokensV3({
                      chain: chain,
                    });
                  case 3:
                    return _context.abrupt('return', _context.sent);
                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context['catch'](0);
                    if (
                      typeof (options == null ? void 0 : options.onError) ===
                      'function'
                    ) {
                      options.onError(_context.t0);
                    }
                    throw _context.t0;
                  case 10:
                  case 'end':
                    return _context.stop();
                }
            },
            _callee,
            null,
            [[0, 6]]
          );
        })
      );
      function queryFn() {
        return _queryFn.apply(this, arguments);
      }
      return queryFn;
    })(),
  });
};
var useSwapAllTokensSearch = function useSwapAllTokensSearch(_ref2, options) {
  var chain = _ref2.chain,
    content = _ref2.content,
    config = _ref2.config;
  return useQuery({
    queryKey: ['getSwapAllTokensV2Search', chain, content, config],
    queryFn: (function () {
      var _queryFn2 = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(
            function _callee2$(_context2) {
              while (1)
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return getSwapAllTokensSearch(
                      {
                        content: content,
                        chain: chain,
                      },
                      config
                    );
                  case 3:
                    return _context2.abrupt('return', _context2.sent);
                  case 6:
                    _context2.prev = 6;
                    _context2.t0 = _context2['catch'](0);
                    if (
                      typeof (options == null ? void 0 : options.onError) ===
                      'function'
                    ) {
                      options.onError(_context2.t0);
                    }
                    throw _context2.t0;
                  case 10:
                  case 'end':
                    return _context2.stop();
                }
            },
            _callee2,
            null,
            [[0, 6]]
          );
        })
      );
      function queryFn() {
        return _queryFn2.apply(this, arguments);
      }
      return queryFn;
    })(),
  });
};

var findSwapChainName = function findSwapChainName(chainId) {
  switch (chainId) {
    case mainnet.id:
      return 'ETH';
    case bsc.id:
      return 'BSC';
    case arbitrum.id:
      return 'ARBITRUM';
    case optimism.id:
      return 'OPTIMISM';
    case base == null ? void 0 : base.id:
      return 'BASE';
    case polygon.id:
      return 'POLYGON_POS';
    case blast.id:
      return 'BLAST';
    case avalanche.id:
      return 'AVAX';
    case scroll.id:
      return 'SCROLL';
    case linea.id:
      return 'LINEA';
    case b3.id:
      return 'B3';
    case mockBtcEvmChainId:
      return 'BITCOIN';
    case mockSolEvmChainId:
      return 'SOLANA';
    default:
      return '';
  }
};
var filterSwapChainId = function filterSwapChainId(chain) {
  var _chain$chain;
  switch (chain == null ? void 0 : chain.type) {
    case 'EVM':
      return findSwapChainName(
        (_chain$chain = chain.chain) == null ? void 0 : _chain$chain.id
      );
    case 'SOL':
      return 'SOLANA';
    case Web3Type.BTC:
      return 'BITCOIN';
    default:
      return undefined;
  }
};

//@ts-nocheck
var Provider = function Provider(_ref) {
  var children = _ref.children;
  var _useConfig = useConfig(),
    config = _useConfig.config;
  return React__default.createElement(
    WagmiProvider,
    {
      config: config,
    },
    children
  );
};

//@ts-nocheck
var queryClient = /*#__PURE__*/ new QueryClient();
function BaseQueryClientProvider(_ref) {
  var children = _ref.children;
  return React__default.createElement(
    QueryClientProvider,
    {
      client: queryClient,
    },
    children
  );
}

//@ts-nocheck
var Proviers = function Proviers(_ref) {
  var children = _ref.children;
  return React__default.createElement(
    BaseQueryClientProvider,
    null,
    React__default.createElement(Provider, null, children)
  );
};

function useCheckLoginByCode(code) {
  var _useState = useState(code),
    _code = _useState[0],
    setCode = _useState[1];
  useEffect(
    function () {
      if (_code != code) {
        setCode(code);
      }
    },
    [code]
  );
  var _useState2 = useState(),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = useState(false),
    isLoading = _useState3[0],
    setIsLoading = _useState3[1];
  var timerRef = useRef();
  var _checkLogin = /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
        var res;
        return _regeneratorRuntime().wrap(
          function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  console.log('useCheckLoginByCode', {
                    isLoading: isLoading,
                    code: _code,
                  });
                  if (!isLoading) {
                    _context.next = 3;
                    break;
                  }
                  return _context.abrupt('return');
                case 3:
                  if (!_code) {
                    _context.next = 19;
                    break;
                  }
                  setIsLoading(true);
                  _context.prev = 5;
                  _context.next = 8;
                  return checkLoginByCodeApi(_code)['finally'](function () {
                    return setIsLoading(false);
                  });
                case 8:
                  res = _context.sent;
                  setData(JSON.parse(atob(res.result)));
                  if (timerRef.current) {
                    //@ts-ignore
                    clearTimeout(timerRef.current);
                  }
                  _context.next = 19;
                  break;
                case 13:
                  _context.prev = 13;
                  _context.t0 = _context['catch'](5);
                  console.error('checkLogin error', _context.t0);
                  setData(null);
                  if (timerRef.current) {
                    //@ts-ignore
                    clearTimeout(timerRef.current);
                  }
                  timerRef.current = setTimeout(function () {
                    _checkLogin();
                  }, 3000);
                case 19:
                case 'end':
                  return _context.stop();
              }
          },
          _callee,
          null,
          [[5, 13]]
        );
      })
    );
    return function checkLogin() {
      return _ref.apply(this, arguments);
    };
  })();
  useEffect(
    function () {
      _checkLogin();
      return function () {
        if (timerRef.current) {
          //@ts-ignore
          clearTimeout(timerRef.current);
        }
      };
    },
    [_code]
  );
  return {
    data: data,
    isLoading: isLoading,
  };
}

var _rect, _rect2, _path;
function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends.apply(null, arguments)
  );
}
var SvgOkxWallet = function SvgOkxWallet(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 49,
        height: 48,
        fill: 'none',
      },
      props
    ),
    _rect ||
      (_rect = /*#__PURE__*/ createElement('rect', {
        width: 48,
        height: 48,
        x: 0.667,
        fill: '#131618',
        rx: 7.2,
      })),
    _rect2 ||
      (_rect2 = /*#__PURE__*/ createElement('rect', {
        width: 47.5,
        height: 47.5,
        x: 0.917,
        y: 0.25,
        stroke: '#fff',
        strokeOpacity: 0.04,
        strokeWidth: 0.5,
        rx: 6.95,
      })),
    _path ||
      (_path = /*#__PURE__*/ createElement('path', {
        fill: '#fff',
        d: 'M20.133 12H13.2a.533.533 0 0 0-.533.533v6.934c0 .294.239.533.533.533h6.933a.533.533 0 0 0 .534-.533v-6.934a.533.533 0 0 0-.534-.533M28.137 20h-6.933a.533.533 0 0 0-.533.534v6.933c0 .295.239.533.533.533h6.933a.533.533 0 0 0 .534-.533v-6.933a.533.533 0 0 0-.534-.534M29.2 12h6.933c.295 0 .534.239.534.533v6.934a.533.533 0 0 1-.534.533H29.2a.533.533 0 0 1-.533-.533v-6.934c0-.294.239-.533.533-.533M20.133 28H13.2a.533.533 0 0 0-.533.533v6.934c0 .294.239.533.533.533h6.933a.533.533 0 0 0 .534-.533v-6.934a.533.533 0 0 0-.534-.533M29.2 28h6.933c.295 0 .534.239.534.533v6.934a.533.533 0 0 1-.534.533H29.2a.533.533 0 0 1-.533-.533v-6.934c0-.294.239-.533.533-.533',
      }))
  );
};

var _rect$1, _defs;
function _extends$1() {
  return (
    (_extends$1 = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends$1.apply(null, arguments)
  );
}
var SvgTon2 = function SvgTon2(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends$1(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        xmlnsXlink: 'http://www.w3.org/1999/xlink',
        width: 20,
        height: 20,
        fill: 'none',
      },
      props
    ),
    _rect$1 ||
      (_rect$1 = /*#__PURE__*/ createElement('rect', {
        width: 19,
        height: 19,
        x: 0.5,
        y: 0.5,
        fill: 'url(#ton_2_svg__a)',
        stroke: '#EBEBF4',
        rx: 3.5,
      })),
    _defs ||
      (_defs = /*#__PURE__*/ createElement(
        'defs',
        null,
        /*#__PURE__*/ createElement(
          'pattern',
          {
            id: 'ton_2_svg__a',
            width: 1,
            height: 1,
            patternContentUnits: 'objectBoundingBox',
          },
          /*#__PURE__*/ createElement('use', {
            xlinkHref: '#ton_2_svg__b',
            transform: 'scale(.00347)',
          })
        ),
        /*#__PURE__*/ createElement('image', {
          xlinkHref:
            'data:image/png;base64,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QJHoU0JhVLOiiq672NvCXfV9jp5GPvFAQBHpQ0LO99yol6utUc190dfoaeQTFwQUmc4kpAf0FKkf1ZzRdZwn3gf10HU1ehr5xAcBJUDbEvJKFjNdV7mMNn4NN8naHj2NfNIAASVCWxJyk+tW+RMvlVwSTqK3NXoa+aQDAkqIQyX0qcm17wOkjvbPo6e/v69C3do+IJ+0QECJsY+E3OTyGJqzwqdBDejAOEH9g0S76+hp5JMeCChBdpGQC0lHuqZSGdXcF7uOnkY+aYKAEqWJhNRBVJ0rOeslkgeJ3OPI77XR08gnXRBQwmyTkBPNuu5Ck6te/+HQ0P6/NHoa+aQNAkqcdQmFUc26ntrski4Bd9Wvj55GPumDgDIgSGh0HD7p25yruTScnPaAxV/dHlV/jXyyAAFlwr//cKKk63F1gnteZOpc0PGy+vs/8wakDgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGggIACIBgICgGj8DhBI+/6on01LAAAAAElFTkSuQmCC',
          id: 'ton_2_svg__b',
          width: 288,
          height: 288,
        })
      ))
  );
};

var _rect$2, _defs$1;
function _extends$2() {
  return (
    (_extends$2 = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends$2.apply(null, arguments)
  );
}
var SvgTonkeeper = function SvgTonkeeper(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends$2(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        xmlnsXlink: 'http://www.w3.org/1999/xlink',
        width: 20,
        height: 20,
        fill: 'none',
      },
      props
    ),
    _rect$2 ||
      (_rect$2 = /*#__PURE__*/ createElement('rect', {
        width: 20,
        height: 20,
        fill: 'url(#tonkeeper_svg__a)',
        rx: 4,
      })),
    _defs$1 ||
      (_defs$1 = /*#__PURE__*/ createElement(
        'defs',
        null,
        /*#__PURE__*/ createElement(
          'pattern',
          {
            id: 'tonkeeper_svg__a',
            width: 1,
            height: 1,
            patternContentUnits: 'objectBoundingBox',
          },
          /*#__PURE__*/ createElement('use', {
            xlinkHref: '#tonkeeper_svg__b',
            transform: 'scale(.00347)',
          })
        ),
        /*#__PURE__*/ createElement('image', {
          xlinkHref:
            'data:image/png;base64,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',
          id: 'tonkeeper_svg__b',
          width: 288,
          height: 288,
        })
      ))
  );
};

var _rect$3, _defs$2;
function _extends$3() {
  return (
    (_extends$3 = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends$3.apply(null, arguments)
  );
}
var SvgTon3 = function SvgTon3(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends$3(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        xmlnsXlink: 'http://www.w3.org/1999/xlink',
        width: 20,
        height: 20,
        fill: 'none',
      },
      props
    ),
    _rect$3 ||
      (_rect$3 = /*#__PURE__*/ createElement('rect', {
        width: 20,
        height: 20,
        fill: 'url(#ton_3_svg__a)',
        rx: 4,
      })),
    _defs$2 ||
      (_defs$2 = /*#__PURE__*/ createElement(
        'defs',
        null,
        /*#__PURE__*/ createElement(
          'pattern',
          {
            id: 'ton_3_svg__a',
            width: 1,
            height: 1,
            patternContentUnits: 'objectBoundingBox',
          },
          /*#__PURE__*/ createElement('use', {
            xlinkHref: '#ton_3_svg__b',
            transform: 'scale(.00556)',
          })
        ),
        /*#__PURE__*/ createElement('image', {
          xlinkHref:
            'data:image/png;base64,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',
          id: 'ton_3_svg__b',
          width: 180,
          height: 180,
        })
      ))
  );
};

var _rect$4, _defs$3;
function _extends$4() {
  return (
    (_extends$4 = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends$4.apply(null, arguments)
  );
}
var SvgTon4 = function SvgTon4(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends$4(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        xmlnsXlink: 'http://www.w3.org/1999/xlink',
        width: 20,
        height: 20,
        fill: 'none',
      },
      props
    ),
    _rect$4 ||
      (_rect$4 = /*#__PURE__*/ createElement('rect', {
        width: 20,
        height: 20,
        fill: 'url(#ton_4_svg__a)',
        rx: 4,
      })),
    _defs$3 ||
      (_defs$3 = /*#__PURE__*/ createElement(
        'defs',
        null,
        /*#__PURE__*/ createElement(
          'pattern',
          {
            id: 'ton_4_svg__a',
            width: 1,
            height: 1,
            patternContentUnits: 'objectBoundingBox',
          },
          /*#__PURE__*/ createElement('use', {
            xlinkHref: '#ton_4_svg__b',
            transform: 'scale(.00347)',
          })
        ),
        /*#__PURE__*/ createElement('image', {
          xlinkHref:
            'data:image/png;base64,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',
          id: 'ton_4_svg__b',
          width: 288,
          height: 288,
        })
      ))
  );
};

var _path$1, _path2, _path3, _path4, _path5, _g, _defs$4;
function _extends$5() {
  return (
    (_extends$5 = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends$5.apply(null, arguments)
  );
}
var SvgTomo = function SvgTomo(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends$5(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 57,
        height: 56,
        fill: 'none',
      },
      props
    ),
    _path$1 ||
      (_path$1 = /*#__PURE__*/ createElement('path', {
        fill: 'url(#tomo_svg__a)',
        d: 'M5.886 38.42c-1.773-6.29-.081-12.856 3.05-18.554 1.098-1.997 2.174-3.497 3.52-5.314a50 50 0 0 1 4.153-4.956c.91-.945 1.804-1.915 2.792-2.773.832-.724 2.473-2.323 3.666-1.64.795.459.964 1.447.872 2.276-.097.893-.617 2.016.27 2.575.681.432 1.767-.046 2.33-.625 1.351-1.386 8.694-8.41 10.238-4.971.216.48.054 1.05-.17 1.526-.511 1.093-1.194 2.622.043 3.528.949.7 2.018.084 2.95-.287 1.64-.653 3.36-1.289 5.118-1.45.9-.083 2.22-.099 2.609.97.519 1.412-.612 2.493-1.445 3.429-.465.522-1.266 1.162-1.35 2.091-.138 1.483 2.04 1.801 3.123 2.005q.953.136 1.883.403c.926.265 2.201.876 2.223 2.041.02 1.263-1.367 1.91-2.123 2.479 0 0-3.841 2.047-3.941 4.358-.072 1.65 1.29 2.644 2.612 3.44.81.491 1.752.695 2.554 1.211.512.329 1.029.948.965 1.614-.066.715-.833 1.276-1.395 1.569-.639.334-1.366.403-2.047.625-.806.244-1.588.57-2.335.972-.717.391-1.514.913-1.865 1.714-.417.95-.282 1.57.12 2.501.4.932 1.418 1.769 1.722 2.773.58 1.906-1.306 2.757-2.753 3.088a70 70 0 0 0-7.162 2.1c-2.684.929-5.336 2.288-8.21 2.702-2.16.32-4.345.405-6.522.254-4.168-.307-8.413-1.652-11.505-4.705a15.8 15.8 0 0 1-3.99-6.968',
      })),
    _path2 ||
      (_path2 = /*#__PURE__*/ createElement('path', {
        fill: '#fff',
        d: 'M7.816 33.408c.237-1.833 1.306-3.735 3.214-3.933 2.895-.296 4.737 1.779 6.674 2.53 1.881.727 2.966.806 4.962.507 3.26-.488 8.822-2.265 9.487 2.546.458 3.301-.214 6.088-2.788 8.5-2.992 2.804-7.61 3.48-12.705 2.235-2.255-.55-4.507-1.946-6.174-3.63-2.267-2.281-3.11-5.413-2.67-8.755',
      })),
    _path3 ||
      (_path3 = /*#__PURE__*/ createElement('path', {
        fill: '#221F20',
        d: 'M12.624 38.087c.795 0 1.44-.906 1.44-2.023s-.645-2.023-1.44-2.023c-.796 0-1.442.906-1.442 2.023s.646 2.023 1.442 2.023M22.78 40.021c.95 0 1.722-1.084 1.722-2.42 0-1.337-.771-2.42-1.723-2.42-.951 0-1.723 1.083-1.723 2.42s.772 2.42 1.723 2.42M14.912 40.459c.55 0 .996-.478.996-1.067 0-.59-.446-1.067-.996-1.067s-.995.478-.995 1.067c0 .59.445 1.067.995 1.067M16.655 42.113a3.1 3.1 0 0 1-1.173-.228.38.38 0 0 1-.187-.206.4.4 0 0 1 0-.285.38.38 0 0 1 .189-.206.35.35 0 0 1 .272-.013c.08.035 1.908.769 2.883-1.125a.37.37 0 0 1 .217-.17.35.35 0 0 1 .27.033.38.38 0 0 1 .173.217.4.4 0 0 1-.016.283c-.68 1.321-1.738 1.7-2.628 1.7',
      })),
    _path4 ||
      (_path4 = /*#__PURE__*/ createElement('path', {
        fill: '#627EEA',
        stroke: '#fff',
        strokeWidth: 1.4,
        d: 'M54.4 44.1c0 5.412-4.387 9.8-9.8 9.8-5.412 0-9.8-4.388-9.8-9.8s4.388-9.8 9.8-9.8 9.8 4.387 9.8 9.8Z',
      })),
    _path5 ||
      (_path5 = /*#__PURE__*/ createElement('path', {
        fill: '#fff',
        d: 'M44.666 37.274v5.046l4.265 1.906zM44.666 37.274 40.4 44.226l4.266-1.906zM44.666 47.496v3.429l4.267-5.904zM44.666 50.925v-3.43L40.4 45.022zM44.666 46.702l4.265-2.476-4.265-1.905zM40.4 44.226l4.266 2.476v-4.38z',
      })),
    _g ||
      (_g = /*#__PURE__*/ createElement(
        'g',
        {
          clipPath: 'url(#tomo_svg__b)',
        },
        /*#__PURE__*/ createElement('path', {
          fill: 'url(#tomo_svg__c)',
          stroke: '#fff',
          strokeWidth: 1.167,
          d: 'M54.75 43.167c0 5.477-4.44 9.917-9.917 9.917s-9.916-4.44-9.916-9.917 4.44-9.917 9.916-9.917c5.477 0 9.917 4.44 9.917 9.917Z',
        }),
        /*#__PURE__*/ createElement('path', {
          fill: '#fff',
          fillRule: 'evenodd',
          d: 'M39.086 43.056a500 500 0 0 1 6.124-2.637c2.916-1.213 3.521-1.424 3.916-1.43.087-.002.281.02.407.121a.44.44 0 0 1 .15.285c.014.081.031.268.017.413-.158 1.66-.842 5.69-1.19 7.55-.147.786-.436 1.05-.717 1.076-.61.056-1.073-.403-1.663-.79-.925-.606-1.447-.983-2.344-1.575-1.036-.683-.364-1.058.227-1.672.154-.16 2.84-2.604 2.893-2.826.006-.027.012-.13-.05-.185-.06-.055-.151-.036-.217-.021q-.139.03-4.428 2.927-.63.432-1.14.42c-.374-.008-1.095-.211-1.631-.386-.658-.213-1.18-.326-1.135-.69q.036-.283.781-.58',
          clipRule: 'evenodd',
        })
      )),
    _defs$4 ||
      (_defs$4 = /*#__PURE__*/ createElement(
        'defs',
        null,
        /*#__PURE__*/ createElement(
          'radialGradient',
          {
            id: 'tomo_svg__a',
            cx: 0,
            cy: 0,
            r: 1,
            gradientTransform: 'matrix(29.0758 0 0 30.3932 28.502 26.842)',
            gradientUnits: 'userSpaceOnUse',
          },
          /*#__PURE__*/ createElement('stop', {
            offset: 0.47,
            stopColor: '#F21F7F',
          }),
          /*#__PURE__*/ createElement('stop', {
            offset: 0.6,
            stopColor: '#EB3F9F',
          }),
          /*#__PURE__*/ createElement('stop', {
            offset: 0.73,
            stopColor: '#E558B9',
          }),
          /*#__PURE__*/ createElement('stop', {
            offset: 0.85,
            stopColor: '#E168C9',
          }),
          /*#__PURE__*/ createElement('stop', {
            offset: 0.94,
            stopColor: '#E06DCE',
          })
        ),
        /*#__PURE__*/ createElement(
          'linearGradient',
          {
            id: 'tomo_svg__c',
            x1: 44.833,
            x2: 44.833,
            y1: 32.667,
            y2: 53.511,
            gradientUnits: 'userSpaceOnUse',
          },
          /*#__PURE__*/ createElement('stop', {
            stopColor: '#2AABEE',
          }),
          /*#__PURE__*/ createElement('stop', {
            offset: 1,
            stopColor: '#229ED9',
          })
        ),
        /*#__PURE__*/ createElement(
          'clipPath',
          {
            id: 'tomo_svg__b',
          },
          /*#__PURE__*/ createElement('path', {
            fill: '#fff',
            d: 'M34.333 32.667h21v21h-21z',
          })
        )
      ))
  );
};

var _path$2;
function _extends$6() {
  return (
    (_extends$6 = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends$6.apply(null, arguments)
  );
}
var SvgArrowRight = function SvgArrowRight(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends$6(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 20,
        height: 20,
        fill: 'none',
      },
      props
    ),
    _path$2 ||
      (_path$2 = /*#__PURE__*/ createElement('path', {
        fill: '#C1C0D8',
        fillRule: 'evenodd',
        d: 'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16m-4-7.61h6.085L9.403 13.07l.707.707L14 9.89 10.11 6l-.707.707 2.682 2.682H6z',
        clipRule: 'evenodd',
      }))
  );
};

var _rect$5, _g$1, _defs$5;
function _extends$7() {
  return (
    (_extends$7 = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends$7.apply(null, arguments)
  );
}
var SvgIconTg = function SvgIconTg(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends$7(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 22,
        height: 22,
        fill: 'none',
      },
      props
    ),
    _rect$5 ||
      (_rect$5 = /*#__PURE__*/ createElement('rect', {
        width: 22,
        height: 22,
        fill: '#fff',
        rx: 4,
      })),
    _g$1 ||
      (_g$1 = /*#__PURE__*/ createElement(
        'g',
        {
          clipPath: 'url(#icon_tg_svg__a)',
        },
        /*#__PURE__*/ createElement('path', {
          fill: 'url(#icon_tg_svg__b)',
          d: 'M11 20a9 9 0 1 0 0-18 9 9 0 0 0 0 18',
        }),
        /*#__PURE__*/ createElement('path', {
          fill: '#fff',
          fillRule: 'evenodd',
          d: 'M6.074 10.905a428 428 0 0 1 5.248-2.26c2.5-1.04 3.02-1.221 3.358-1.227a.6.6 0 0 1 .348.105.38.38 0 0 1 .128.243c.012.07.027.23.015.355-.135 1.423-.721 4.876-1.02 6.47-.125.675-.374.9-.614.923-.523.048-.92-.345-1.426-.677-.792-.52-1.24-.843-2.008-1.35-.889-.585-.313-.907.193-1.433.133-.138 2.436-2.232 2.48-2.422.006-.024.011-.112-.042-.16-.052-.046-.13-.03-.186-.017q-.12.027-3.796 2.509-.54.37-.976.36c-.322-.006-.94-.181-1.4-.33-.563-.184-1.01-.28-.972-.592q.03-.243.67-.497',
          clipRule: 'evenodd',
        })
      )),
    _defs$5 ||
      (_defs$5 = /*#__PURE__*/ createElement(
        'defs',
        null,
        /*#__PURE__*/ createElement(
          'linearGradient',
          {
            id: 'icon_tg_svg__b',
            x1: 11,
            x2: 11,
            y1: 2,
            y2: 19.866,
            gradientUnits: 'userSpaceOnUse',
          },
          /*#__PURE__*/ createElement('stop', {
            stopColor: '#2AABEE',
          }),
          /*#__PURE__*/ createElement('stop', {
            offset: 1,
            stopColor: '#229ED9',
          })
        ),
        /*#__PURE__*/ createElement(
          'clipPath',
          {
            id: 'icon_tg_svg__a',
          },
          /*#__PURE__*/ createElement('path', {
            fill: '#fff',
            d: 'M2 2h18v18H2z',
          })
        )
      ))
  );
};

var _g$2;
function _extends$8() {
  return (
    (_extends$8 = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends$8.apply(null, arguments)
  );
}
var SvgUxuy = function SvgUxuy(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    _extends$8(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 48,
        height: 48,
        fill: 'none',
      },
      props
    ),
    _g$2 ||
      (_g$2 = /*#__PURE__*/ createElement(
        'g',
        {
          fill: '#fff',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
        /*#__PURE__*/ createElement('path', {
          d: 'M10.554 17.473v2.765a4 4 0 0 0-.007.226v12.901a3.52 3.52 0 0 0 3.519 3.52h19.889a3.52 3.52 0 0 0 3.518-3.52v-2.932h-3.178a3.802 3.802 0 0 1 0-7.604h3.178v-2.365a3.52 3.52 0 0 0-3.518-3.519h-.058l-.773-3.26a2.905 2.905 0 0 0-3.168-2.215l-15.631 1.854a4.265 4.265 0 0 0-3.747 3.871zm19.585-4.46-15.63 1.855a2.71 2.71 0 0 0-2.382 2.46l-.018.21a3.5 3.5 0 0 1 1.957-.593h18.233l-.688-2.902a1.35 1.35 0 0 0-1.472-1.03M23.652 27.05l5.396-6.247a.248.248 0 0 0-.187-.41h-3.19a.25.25 0 0 0-.188.086l-3.743 4.339zm-5.462 6.42c.072 0 .14-.03.187-.085l4.86-5.659a.25.25 0 0 0 .052-.223l.003-.003.008.006.004-.02-.016.015a.25.25 0 0 0-.05-.098l-4.86-5.659a.25.25 0 0 0-.188-.086h-3.177a.248.248 0 0 0-.187.41l4.582 5.335q.039.046.052.1-.015.06.001.12a.25.25 0 0 1-.053.103l-4.582 5.336a.248.248 0 0 0 .187.409zm6.365 0a.25.25 0 0 1-.189-.086l-2.66-3.104 1.926-2.24 4.304 5.021c.138.161.023.41-.189.41z',
        }),
        /*#__PURE__*/ createElement('path', {
          d: 'M37.978 24.375h-3.58a2.336 2.336 0 0 0 0 4.671h3.58a.844.844 0 0 0 .844-.844V25.22a.844.844 0 0 0-.844-.844m-3.519 3.507a1.214 1.214 0 1 0 0-2.429 1.214 1.214 0 0 0 0 2.429',
        })
      ))
  );
};

var THEME;
(function (THEME) {
  THEME['DARK'] = 'DARK';
  THEME['LIGHT'] = 'LIGHT';
})(THEME || (THEME = {}));
var OKX_UI_CONNECTION_AND_TRANSACTION_EVENT;
(function (OKX_UI_CONNECTION_AND_TRANSACTION_EVENT) {
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT['OKX_UI_CONNECTION_STARTED'] =
    'okx-connect-ui-connection-started';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT['OKX_UI_CONNECTION_COMPLETED'] =
    'okx-connect-ui-connection-completed';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT['OKX_UI_CONNECTION_ERROR'] =
    'okx-connect-ui-connection-error';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT[
    'OKX_UI_CONNECTION_RESTORING_STARTED'
  ] = 'okx-connect-ui-connection-restoring-started';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT[
    'OKX_UI_CONNECTION_RESTORING_COMPLETED'
  ] = 'okx-connect-ui-connection-restoring-completed';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT['OKX_UI_CONNECTION_RESTORING_ERROR'] =
    'okx-connect-ui-connection-restoring-error';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT['OKX_UI_DISCONNECTION'] =
    'okx-connect-ui-disconnection';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT[
    'OKX_UI_TRANSACTION_SENT_FOR_SIGNATURE'
  ] = 'okx-connect-ui-transaction-sent-for-signature';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT['OKX_UI_TRANSACTION_SIGNED'] =
    'okx-connect-ui-transaction-signed';
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT['OKX_UI_TRANSACTION_SIGNING_FAILED'] =
    'okx-connect-ui-transaction-signing-failed';
})(
  OKX_UI_CONNECTION_AND_TRANSACTION_EVENT ||
    (OKX_UI_CONNECTION_AND_TRANSACTION_EVENT = {})
);

var okxTonConnect;
var useOkxTonConnect = function useOkxTonConnect(option) {
  var _okxConnectRef$curren3, _okxConnectRef$curren5;
  var _ref = option || {},
    connectSuccess = _ref.connectSuccess,
    connectError = _ref.connectError,
    _ref$metaData = _ref.metaData,
    metaData =
      _ref$metaData === void 0
        ? {
            name: 'dapp',
            icon: ' ',
          }
        : _ref$metaData,
    setProviders = _ref.setProviders,
    chain = _ref.chain,
    theme = _ref.theme,
    setConnectResult = _ref.setConnectResult;
  var okxConnectRef = useRef(null);
  var _useState = useState(false),
    connected = _useState[0],
    setConnected = _useState[1];
  var showPopup = useShowPopup();
  var _useInitData = useInitData(),
    initDataUnsafe = _useInitData[0];
  var storage = useProxyLocalStorage();
  var initialProvider = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
        var _initDataUnsafe$user;
        var language, OKXTonConnectUI;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                language = getOkxLanguage(
                  initDataUnsafe == null ||
                    (_initDataUnsafe$user = initDataUnsafe.user) == null
                    ? void 0
                    : _initDataUnsafe$user.language_code
                );
                if (!(chain === 'TON')) {
                  _context.next = 12;
                  break;
                }
                if (!okxTonConnect) {
                  _context.next = 6;
                  break;
                }
                okxConnectRef.current = okxTonConnect;
                _context.next = 12;
                break;
              case 6:
                _context.next = 8;
                return import('@okxconnect/ui');
              case 8:
                OKXTonConnectUI = _context.sent.OKXTonConnectUI;
                okxTonConnect = new OKXTonConnectUI({
                  dappMetaData: metaData,
                  actionsConfiguration: {
                    modals: 'all',
                    returnStrategy: 'tg://resolve',
                  },
                  uiPreferences: {
                    theme: theme === 'dark' ? THEME.DARK : THEME.LIGHT,
                  },
                  language: language,
                  restoreConnection: true,
                });
                okxConnectRef.current = okxTonConnect;
                listenStatusChange();
              case 12:
                return _context.abrupt('return', okxTonConnect.current);
              case 13:
              case 'end':
                return _context.stop();
            }
        }, _callee);
      })
    );
    return function initialProvider() {
      return _ref2.apply(this, arguments);
    };
  })();
  var handleConnected = /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3() {
        var okxTonConnect, account;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1)
            switch ((_context3.prev = _context3.next)) {
              case 0:
                setConnected(true);
                _context3.next = 3;
                return initialProvider();
              case 3:
                okxTonConnect = okxConnectRef.current;
                account = okxTonConnect.account;
                storage.set(
                  'accounts',
                  _extends$9({}, storage.get('accounts') || {}, {
                    ton: account,
                  })
                );
                connectSuccess && connectSuccess();
                storage.set('connect_type', 'OKX');
                Object.defineProperty(okxTonConnect, 'getBalance', {
                  value: (function () {
                    var _value = _asyncToGenerator(
                      /*#__PURE__*/ _regeneratorRuntime().mark(
                        function _callee2() {
                          return _regeneratorRuntime().wrap(function _callee2$(
                            _context2
                          ) {
                            while (1)
                              switch ((_context2.prev = _context2.next)) {
                                case 0:
                                  return _context2.abrupt(
                                    'return',
                                    getTonBalance({
                                      tonAddress: account.address,
                                    })
                                  );
                                case 1:
                                case 'end':
                                  return _context2.stop();
                              }
                          }, _callee2);
                        }
                      )
                    );
                    function value() {
                      return _value.apply(this, arguments);
                    }
                    return value;
                  })(),
                  writable: true,
                  enumerable: true,
                  configurable: false,
                });
                window.tomo_ton = okxTonConnect;
                setProviders(function (pre) {
                  return _extends$9({}, pre, {
                    tomo_ton: window.tomo_ton,
                  });
                });
              case 11:
              case 'end':
                return _context3.stop();
            }
        }, _callee3);
      })
    );
    return function handleConnected() {
      return _ref3.apply(this, arguments);
    };
  })();
  var handleDisconnected = function handleDisconnected() {
    setConnected(false);
    setProviders(function (pre) {
      return _extends$9({}, pre, {
        tomo_ton: null,
      });
    });
    storage.set(
      'accounts',
      _extends$9({}, storage.get('accounts') || {}, {
        ton: undefined,
      })
    );
    window.tomo_ton = null;
    storage.set('connect_type', '');
  };
  var connectType = storage.get('connect_type');
  useEffect(
    function () {
      var _okxConnectRef$curren, _okxConnectRef$curren2;
      if (
        chain === 'TON' &&
        (_okxConnectRef$curren = okxConnectRef.current) != null &&
        _okxConnectRef$curren.connected
      ) {
        handleConnected();
      } else if (
        chain === 'TON' &&
        connectType === 'OKX' &&
        !(
          (_okxConnectRef$curren2 = okxConnectRef.current) != null &&
          _okxConnectRef$curren2.connected
        )
      ) {
        handleDisconnected();
      }
    },
    [
      chain,
      (_okxConnectRef$curren3 = okxConnectRef.current) == null
        ? void 0
        : _okxConnectRef$curren3.connected,
    ]
  );
  useEffect(
    function () {
      var _okxConnectRef$curren4;
      setConnected(
        (_okxConnectRef$curren4 = okxConnectRef.current) == null
          ? void 0
          : _okxConnectRef$curren4.connected
      );
    },
    [
      (_okxConnectRef$curren5 = okxConnectRef.current) == null
        ? void 0
        : _okxConnectRef$curren5.connected,
    ]
  );
  var listenStatusChange = function listenStatusChange() {
    var okxTonConnect = okxConnectRef.current;
    var unsubscribe = okxTonConnect.onStatusChange(
      function (walletInfo) {
        var _walletInfo$connectIt;
        if (!walletInfo) {
          setConnected(false);
          setProviders(function (pre) {
            return _extends$9({}, pre, {
              tomo_ton: null,
            });
          });
          storage.set(
            'accounts',
            _extends$9({}, storage.get('accounts') || {}, {
              ton: undefined,
            })
          );
        } else if (
          walletInfo != null &&
          (_walletInfo$connectIt = walletInfo.connectItems) != null &&
          _walletInfo$connectIt.tonProof &&
          'proof' in
            (walletInfo == null ? void 0 : walletInfo.connectItems.tonProof)
        ) {
          setConnectResult({
            result: {
              tonProof: walletInfo.connectItems.tonProof,
            },
          });
        }
      },
      function (err) {
        if (err.code === OKX_CONNECT_ERROR_CODES.USER_REJECTS_ERROR) {
          console.log('user reject connect', err);
        } else {
          console.log('Connection status err:', err);
        }
      }
    );
    if (chain !== 'TON') unsubscribe();
  };
  /** add okx ton connect event listener */
  useEffect(function () {
    function onSuccess(event) {
      if (event instanceof CustomEvent) {
        handleConnected();
      }
    }
    function onError(event) {
      if (event instanceof CustomEvent) {
        connectError && connectError();
        setConnected(false);
        storage.set('connect_type', '');
        showPopup({
          message: 'Failed to connect',
        });
      }
    }
    window.addEventListener(
      OKX_UI_CONNECTION_AND_TRANSACTION_EVENT.OKX_UI_CONNECTION_COMPLETED,
      onSuccess
    );
    window.addEventListener(
      OKX_UI_CONNECTION_AND_TRANSACTION_EVENT.OKX_UI_CONNECTION_ERROR,
      onError
    );
    return function () {
      window.removeEventListener(
        OKX_UI_CONNECTION_AND_TRANSACTION_EVENT.OKX_UI_CONNECTION_COMPLETED,
        onSuccess
      );
      window.removeEventListener(
        OKX_UI_CONNECTION_AND_TRANSACTION_EVENT.OKX_UI_CONNECTION_ERROR,
        onError
      );
    };
  }, []);
  /** connect wallet */
  var connect = /*#__PURE__*/ (function () {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee4(connectOption) {
          var okxTonConnect;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1)
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return initialProvider();
                case 2:
                  okxTonConnect = okxConnectRef.current;
                  if (okxTonConnect != null && okxTonConnect.connected) {
                    okxTonConnect == null || okxTonConnect.disconnect();
                  }
                  (connectOption == null ? void 0 : connectOption.tonProof) &&
                    okxTonConnect.setConnectRequestParameters({
                      state: 'ready',
                      value: {
                        tonProof: connectOption.tonProof,
                      },
                    });
                  okxTonConnect.openModal();
                  return _context4.abrupt('return', true);
                case 7:
                case 'end':
                  return _context4.stop();
              }
          }, _callee4);
        }
      )
    );
    return function connect(_x) {
      return _ref4.apply(this, arguments);
    };
  })();
  var disconnect = /*#__PURE__*/ (function () {
    var _ref5 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee5() {
        var okxTonConnect;
        return _regeneratorRuntime().wrap(
          function _callee5$(_context5) {
            while (1)
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  okxTonConnect = okxConnectRef.current;
                  _context5.prev = 1;
                  setConnected(false);
                  setProviders(function (pre) {
                    return _extends$9({}, pre, {
                      tomo_ton: null,
                    });
                  });
                  storage.set(
                    'accounts',
                    _extends$9({}, storage.get('accounts') || {}, {
                      ton: undefined,
                    })
                  );
                  window.tomo_ton = null;
                  okxTonConnect.disconnect();
                  _context5.next = 22;
                  break;
                case 9:
                  _context5.prev = 9;
                  _context5.t0 = _context5['catch'](1);
                  if (!(_context5.t0 instanceof OKXConnectError)) {
                    _context5.next = 21;
                    break;
                  }
                  _context5.t1 = _context5.t0.code;
                  _context5.next =
                    _context5.t1 === OKX_CONNECT_ERROR_CODES.NOT_CONNECTED_ERROR
                      ? 15
                      : 17;
                  break;
                case 15:
                  alert('Not connected');
                  return _context5.abrupt('break', 19);
                case 17:
                  alert('Unknown error happened');
                  return _context5.abrupt('break', 19);
                case 19:
                  _context5.next = 22;
                  break;
                case 21:
                  alert('Unknown error happened');
                case 22:
                case 'end':
                  return _context5.stop();
              }
          },
          _callee5,
          null,
          [[1, 9]]
        );
      })
    );
    return function disconnect() {
      return _ref5.apply(this, arguments);
    };
  })();
  var sendTransaction = /*#__PURE__*/ (function () {
    var _ref6 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee6(transactionRequest) {
          var okxTonConnect, oTransactionRequest, result;
          return _regeneratorRuntime().wrap(
            function _callee6$(_context6) {
              while (1)
                switch ((_context6.prev = _context6.next)) {
                  case 0:
                    _context6.next = 2;
                    return initialProvider();
                  case 2:
                    okxTonConnect = okxConnectRef.current; // useage param
                    oTransactionRequest = transactionRequest || {
                      messages: [
                        {
                          // address: "0:cd60b11355dbc5ded0d14e245fef1ba3014154ef077959e8102e10656d6ea02c", // destination address
                          address:
                            '0:94f90fe21c344f76f28f75a20a15746e004149723711639691516dc7d00025e8',
                          amount: '20000000',
                        },
                      ],
                      validUntil: Date.now() / 1000 + 360,
                    };
                    _context6.prev = 4;
                    _context6.next = 7;
                    return okxTonConnect.sendTransaction(oTransactionRequest);
                  case 7:
                    result = _context6.sent;
                    return _context6.abrupt('return', result);
                  case 11:
                    _context6.prev = 11;
                    _context6.t0 = _context6['catch'](4);
                    if (!(_context6.t0 instanceof OKXConnectError)) {
                      _context6.next = 25;
                      break;
                    }
                    _context6.t1 = _context6.t0.code;
                    _context6.next =
                      _context6.t1 ===
                      OKX_CONNECT_ERROR_CODES.USER_REJECTS_ERROR
                        ? 17
                        : _context6.t1 ===
                            OKX_CONNECT_ERROR_CODES.NOT_CONNECTED_ERROR
                          ? 19
                          : 21;
                    break;
                  case 17:
                    alert('You rejected the transaction.');
                    return _context6.abrupt('break', 23);
                  case 19:
                    alert('Not connected');
                    return _context6.abrupt('break', 23);
                  case 21:
                    alert('Unknown error happened');
                    return _context6.abrupt('break', 23);
                  case 23:
                    _context6.next = 26;
                    break;
                  case 25:
                    alert('Unknown error happened');
                  case 26:
                  case 'end':
                    return _context6.stop();
                }
            },
            _callee6,
            null,
            [[4, 11]]
          );
        }
      )
    );
    return function sendTransaction(_x2) {
      return _ref6.apply(this, arguments);
    };
  })();
  return {
    okxConnect: okxConnectRef.current,
    connect: connect,
    disconnect: disconnect,
    connected: connected,
    sendTransaction: sendTransaction,
  };
};

var okxUniversalUI;
function proxifyOkxProvider(okxProvider) {
  var handler = {
    get: function get(target, property, receiver) {
      switch (property) {
        case 'isConnected': {
          return target.connected();
        }
        default:
          return Reflect.get(target, property, receiver);
      }
    },
  };
  return new Proxy(okxProvider, handler);
}
var useOkxEVMConnect = function useOkxEVMConnect(option) {
  var _ref = option || {},
    _ref$metaData = _ref.metaData,
    metaData =
      _ref$metaData === void 0
        ? {
            name: 'dapp',
            icon: ' ',
          }
        : _ref$metaData,
    theme = _ref.theme;
  var _useState = useState(null),
    okxUniversalProvider = _useState[0],
    setOkxUniversalProvider = _useState[1];
  var _useState2 = useState(false),
    connected = _useState2[0],
    setConnected = _useState2[1]; // this turns out to be crucial for update
  // const [account, setAccount] = useState(''); // this does NOT seems to be important right now
  var _useInitData = useInitData(),
    initDataUnsafe = _useInitData[0];
  var _useContext = useContext(TomoContext),
    setProviders = _useContext.setProviders,
    _useContext$supported = _useContext.supportedProviders,
    chain = _useContext$supported[0],
    useEvmChains = _useContext.useEvmChains;
  var storage = useProxyLocalStorage();
  var connectType = storage.get('connect_type');
  /** init okxUniversalProvider */
  var getOkxProvider = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
        var _initDataUnsafe$user, _okxUniversalUI;
        var language, OKXUniversalConnectUI, okxUniversalUIOriginal;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                if (!(chain !== 'EVM')) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt('return', null);
              case 2:
                language = getOkxLanguage(
                  initDataUnsafe == null ||
                    (_initDataUnsafe$user = initDataUnsafe.user) == null
                    ? void 0
                    : _initDataUnsafe$user.language_code
                );
                if (okxUniversalUI) {
                  _context.next = 11;
                  break;
                }
                _context.next = 6;
                return import('@okxconnect/ui');
              case 6:
                OKXUniversalConnectUI = _context.sent.OKXUniversalConnectUI;
                _context.next = 9;
                return OKXUniversalConnectUI.init({
                  dappMetaData: metaData,
                  actionsConfiguration: {
                    returnStrategy: 'tg://resolve',
                    modals: 'all',
                    tmaReturnUrl: 'back',
                  },
                  language: language,
                  uiPreferences: {
                    theme: theme === 'dark' ? THEME.DARK : THEME.LIGHT,
                  },
                });
              case 9:
                okxUniversalUIOriginal = _context.sent;
                okxUniversalUI = proxifyOkxProvider(okxUniversalUIOriginal);
              // okxUniversalUI = (okxUniversalUIOriginal)
              case 11:
                setOkxUniversalProvider(okxUniversalUI);
                if (
                  (_okxUniversalUI = okxUniversalUI) != null &&
                  _okxUniversalUI.connected != null &&
                  _okxUniversalUI.connected()
                )
                  setConnected(true);
                return _context.abrupt('return', okxUniversalUI);
              case 14:
              case 'end':
                return _context.stop();
            }
        }, _callee);
      })
    );
    return function getOkxProvider() {
      return _ref2.apply(this, arguments);
    };
  })();
  var handleConnectSuccess = function handleConnectSuccess(session, provider) {
    var _session$namespaces;
    var accountWithChainId =
      (session == null ||
      (_session$namespaces = session.namespaces) == null ||
      (_session$namespaces = _session$namespaces.eip155) == null ||
      (_session$namespaces = _session$namespaces.accounts) == null
        ? void 0
        : _session$namespaces[0]) || '';
    if (accountWithChainId) {
      var _session$namespaces2, _accountWithChainId$s;
      var chainId =
        session == null ||
        (_session$namespaces2 = session.namespaces) == null ||
        (_session$namespaces2 = _session$namespaces2.eip155) == null ||
        (_session$namespaces2 = _session$namespaces2.chains) == null
          ? void 0
          : _session$namespaces2[0];
      var account =
        (_accountWithChainId$s = accountWithChainId.split(chainId + ':')) ==
        null
          ? void 0
          : _accountWithChainId$s[1];
      window.ethereum = provider;
      setConnected(true);
      return account;
    }
    return '';
  };
  // auto reconnect
  useEffect(
    function () {
      if (chain === 'EVM' && connectType === 'OKX') {
        getOkxProvider().then(function (provider) {
          window.ethereum = provider;
        });
      }
    },
    [connectType, chain]
  );
  var disconnectEffect = useCallback(
    function (input) {
      console.log('disconnecting', input);
      setConnected(false);
      storage.set('connect_type', '');
      window.ethereum = null;
    },
    [storage]
  );
  // listen to disconnect event
  useEffect(
    function () {
      if (okxUniversalProvider) {
        okxUniversalProvider.on('session_delete', disconnectEffect);
        return function () {
          okxUniversalProvider.removeListener(
            'session_delete',
            disconnectEffect
          );
        };
      }
    },
    [disconnectEffect, okxUniversalProvider]
  );
  /** connect wallet */
  var connect = /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
        var provider, session;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1)
            switch ((_context2.prev = _context2.next)) {
              case 0:
                provider = okxUniversalProvider;
                if (provider) {
                  _context2.next = 5;
                  break;
                }
                _context2.next = 4;
                return getOkxProvider();
              case 4:
                provider = _context2.sent;
              case 5:
                if (!provider.isConnected) {
                  _context2.next = 12;
                  break;
                }
                console.log({
                  message: 'Already connected',
                });
                storage.set('connect_type', 'OKX');
                setConnected(true);
                _context2.next = 11;
                return okxUniversalProvider.request({
                  method: 'eth_requestAccounts',
                });
              case 11:
                return _context2.abrupt('return', _context2.sent);
              case 12:
                _context2.next = 14;
                return provider.openModal({
                  namespaces: {
                    eip155: {
                      chains: useEvmChains.map(function (id) {
                        return 'eip155:' + id;
                      }),
                      // chains: ['eip155:1', 'eip155:56'],
                      rpcMap: {
                        1: 'https://rpc.ankr.com/eth',
                      },
                      defaultChain: '1',
                    },
                  },
                });
              case 14:
                session = _context2.sent;
                if (!session) {
                  _context2.next = 18;
                  break;
                }
                storage.set('connect_type', 'OKX');
                return _context2.abrupt(
                  'return',
                  handleConnectSuccess(session, provider)
                );
              case 18:
                return _context2.abrupt('return', '');
              case 19:
              case 'end':
                return _context2.stop();
            }
        }, _callee2);
      })
    );
    return function connect() {
      return _ref3.apply(this, arguments);
    };
  })();
  var disconnect = useCallback(
    function () {
      okxUniversalProvider == null ||
        okxUniversalProvider.disconnect == null ||
        okxUniversalProvider.disconnect();
    },
    [okxUniversalProvider]
  );
  // watch okx provider status
  useEffect(
    function () {
      if (okxUniversalProvider != null && okxUniversalProvider.isConnected)
        setProviders(function (pre) {
          return _extends$9({}, pre, {
            ethereum: okxUniversalProvider,
          });
        });
      else {
        setProviders(function (pre) {
          return _extends$9({}, pre, {
            ethereum: null,
          });
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      okxUniversalProvider,
      okxUniversalProvider == null ? void 0 : okxUniversalProvider.isConnected,
    ]
  );
  return {
    okxUniversalProvider: okxUniversalProvider,
    connect: connect,
    request:
      okxUniversalProvider == null ? void 0 : okxUniversalProvider.request,
    disconnect: disconnect,
    connected: connected,
  };
};

var bitgetProvider;
function proxifyBitgetProvider(bitgetProvider) {
  var handler = {
    get: function get(target, property, receiver) {
      switch (property) {
        case 'isConnected': {
          return target.walletInfo.connected;
        }
        default:
          return Reflect.get(target, property, receiver);
      }
    },
  };
  return new Proxy(bitgetProvider, handler);
}
function getBitGetProvider(_x) {
  return _getBitGetProvider.apply(this, arguments);
}
function _getBitGetProvider() {
  _getBitGetProvider = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(_ref) {
      var metaData,
        onConnect,
        onDisconnect,
        useEvmChains,
        bitGetConnector,
        subscription;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1)
          switch ((_context4.prev = _context4.next)) {
            case 0:
              (metaData = _ref.metaData),
                (onConnect = _ref.onConnect),
                (onDisconnect = _ref.onDisconnect),
                (useEvmChains = _ref.useEvmChains);
              if (!bitgetProvider) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt('return', bitgetProvider);
            case 3:
              _context4.next = 5;
              return import('@bitget-wallet/omni-connect');
            case 5:
              _context4.t0 = _context4.sent.OmniConnect;
              _context4.t1 = {
                // const bitGetConnector = new OmniConnect({
                metadata: {
                  name: metaData.name,
                  iconUrl: metaData.icon,
                  url: metaData.url || location.origin,
                  privacyPolicyUrl: '',
                  termsOfUseUrl: '',
                },
                namespace: {
                  eip155: {
                    chains: useEvmChains.map(function (id) {
                      return String(id);
                    }),
                  },
                },
              };
              bitGetConnector = new _context4.t0(_context4.t1);
              subscription = bitGetConnector.provider.onStatusChange(
                function (walletInfo) {
                  console.log('onStatusChange', walletInfo);
                  var event = walletInfo.event;
                  switch (event) {
                    case RequestMethods.Connect:
                      return onConnect == null ? void 0 : onConnect();
                    case RequestMethods.Disconnect:
                      return onDisconnect == null ? void 0 : onDisconnect();
                  }
                },
                function (err) {
                  var code = err.code,
                    message = err.message;
                  console.error(
                    'error stream: code: ' + code + ', message: ' + message
                  );
                }
              );
              bitgetProvider = proxifyBitgetProvider(bitGetConnector.provider);
              return _context4.abrupt('return', bitgetProvider);
            case 11:
            case 'end':
              return _context4.stop();
          }
      }, _callee4);
    })
  );
  return _getBitGetProvider.apply(this, arguments);
}
function useBitget(option) {
  var _useContext = useContext(TomoContext),
    setProviders = _useContext.setProviders,
    useEvmChains = _useContext.useEvmChains,
    supportedProviders = _useContext.supportedProviders;
  var supportedProvider = supportedProviders[0];
  var storage = useProxyLocalStorage();
  function connectEffect(provider) {
    setProviders(function (pre) {
      return _extends$9({}, pre, {
        ethereum: provider,
      });
    });
    var storage = new ProxyLocalStorage();
    var type = 'BITGET';
    storage.set('connect_type', type);
  }
  function disconnectEffect() {
    setProviders(function (pre) {
      return _extends$9({}, pre, {
        ethereum: null,
      });
    });
    var storage = new ProxyLocalStorage();
    storage.set('connect_type', '');
  }
  var initializeProvider = useCallback(
    /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
        var provider;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return getBitGetProvider({
                  metaData: option.metaData,
                  onConnect: function onConnect() {
                    connectEffect(provider);
                  },
                  onDisconnect: function onDisconnect() {
                    disconnectEffect();
                  },
                  useEvmChains: useEvmChains,
                });
              case 2:
                provider = _context.sent;
                return _context.abrupt('return', provider);
              case 4:
              case 'end':
                return _context.stop();
            }
        }, _callee);
      })
    ),
    [option.metaData, useEvmChains]
  );
  // reconnection check
  useEffect(
    function () {
      var connectType = storage.get('connect_type');
      if (connectType === 'BITGET' && supportedProvider === 'EVM') {
        // try reconnect
        initializeProvider().then(
          /*#__PURE__*/ (function () {
            var _ref3 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee2(provider) {
                  return _regeneratorRuntime().wrap(function _callee2$(
                    _context2
                  ) {
                    while (1)
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          _context2.next = 2;
                          return provider.restoreConnection();
                        case 2:
                          setProviders(function (pre) {
                            return _extends$9({}, pre, {
                              ethereum: provider,
                            });
                          });
                        case 3:
                        case 'end':
                          return _context2.stop();
                      }
                  }, _callee2);
                }
              )
            );
            return function (_x2) {
              return _ref3.apply(this, arguments);
            };
          })()
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [supportedProvider, storage]
  );
  var connect = useCallback(
    /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3() {
        var provider,
          tappsLaunchParams,
          _yield$provider$conne,
          account,
          chainId;
        return _regeneratorRuntime().wrap(
          function _callee3$(_context3) {
            while (1)
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.next = 2;
                  return initializeProvider();
                case 2:
                  provider = _context3.sent;
                  /** manually set telegram-apps/launch-params */
                  tappsLaunchParams =
                    sessionStorage.getItem('tapps/launchParams');
                  sessionStorage.setItem(
                    'telegram-apps/launch-params',
                    tappsLaunchParams
                  );
                  _context3.prev = 5;
                  _context3.next = 8;
                  return provider.connect();
                case 8:
                  _yield$provider$conne = _context3.sent;
                  account = _yield$provider$conne.account;
                  chainId = _yield$provider$conne.chainId;
                  console.log('result', account, chainId);
                  _context3.next = 18;
                  break;
                case 14:
                  _context3.prev = 14;
                  _context3.t0 = _context3['catch'](5);
                  console.log('error', _context3.t0);
                  throw _context3.t0;
                case 18:
                case 'end':
                  return _context3.stop();
              }
          },
          _callee3,
          null,
          [[5, 14]]
        );
      })
    ),
    [initializeProvider]
  );
  return {
    connect: connect,
  };
}

var useTomoConnect = function useTomoConnect(_ref) {
  var chain = _ref.chain,
    options = _ref.options,
    setConnectResult = _ref.setConnectResult;
  var _useState = useState(false),
    connected = _useState[0],
    setConnected = _useState[1];
  var _useContext = useContext(TomoContext),
    setProviders = _useContext.setProviders,
    providers = _useContext.providers,
    useEvmChains = _useContext.useEvmChains;
  var storage = useProxyLocalStorage();
  var defaultChain = +useEvmChains[0] || 1;
  // const [evmAccounts, setEvmAccounts] = useState([]); // not in use right now
  var connect = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee(connectOptions) {
          var providers,
            _ref3,
            email,
            tonProof,
            workChain,
            res,
            _res,
            _connectParams$workCh,
            _providers$tomo_ton,
            _window$tomo_ton,
            _window$tomo_ton2,
            connectParams;
          return _regeneratorRuntime().wrap(
            function _callee$(_context) {
              while (1)
                switch ((_context.prev = _context.next)) {
                  case 0:
                    // still initialize all
                    providers = new WalletTgSdk(
                      _extends$9(
                        {
                          injected: true,
                        },
                        options
                      )
                    );
                    (_ref3 = connectOptions || {}),
                      (email = _ref3.email),
                      (tonProof = _ref3.tonProof),
                      (workChain = _ref3.workChain);
                    _context.prev = 2;
                    if (!(chain === 'EVM')) {
                      _context.next = 10;
                      break;
                    }
                    _context.next = 6;
                    return providers.ethereum.request({
                      method: 'eth_requestAccounts',
                      params: email
                        ? [
                            {
                              email: email,
                            },
                          ]
                        : [],
                    });
                  case 6:
                    res = _context.sent;
                    if ((_res = res) != null && _res[0]) {
                      setProviders(function (pre) {
                        return _extends$9({}, pre, {
                          ethereum: providers.ethereum,
                        });
                      });
                      providers.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [
                          {
                            chainId: '0x' + defaultChain.toString(16),
                          },
                        ],
                      });
                    }
                    _context.next = 34;
                    break;
                  case 10:
                    if (!(chain === 'TON')) {
                      _context.next = 23;
                      break;
                    }
                    connectParams = {};
                    if (tonProof) connectParams.tonProof = tonProof;
                    if (email) connectParams.email = email;
                    if (workChain)
                      connectParams.workChain =
                        (_connectParams$workCh = connectParams.workChain) !=
                        null
                          ? _connectParams$workCh
                          : 0;
                    _context.next = 17;
                    return (_providers$tomo_ton = providers.tomo_ton) == null
                      ? void 0
                      : _providers$tomo_ton.connect(connectParams);
                  case 17:
                    res = _context.sent;
                    // window.tomo_ton.connected = ((_window$tomo_ton = window.tomo_ton) == null ? void 0 : _window$tomo_ton.connected) || ((_window$tomo_ton2 = window.tomo_ton) == null ? void 0 : _window$tomo_ton2.isConnected);
                    res.address &&
                      setProviders(function (pre) {
                        return _extends$9({}, pre, {
                          tomo_ton: providers.tomo_ton,
                        });
                      });
                    res.tonProof &&
                      setConnectResult({
                        result: res.tonProof,
                      });
                    _context.next = 34;
                    break;
                  case 23:
                    if (!(chain === 'SOL')) {
                      _context.next = 30;
                      break;
                    }
                    _context.next = 26;
                    return providers.solana.connectWallet(
                      email
                        ? {
                            email: email,
                          }
                        : undefined
                    );
                  case 26:
                    res = _context.sent;
                    res.address &&
                      setProviders(function (pre) {
                        return _extends$9({}, pre, {
                          tomo_sol: providers.solana,
                        });
                      });
                    _context.next = 34;
                    break;
                  case 30:
                    if (!(chain === 'SUI')) {
                      _context.next = 34;
                      break;
                    }
                    _context.next = 33;
                    return window.tomo_sui.connectWallet(
                      email
                        ? {
                            email: email,
                          }
                        : undefined
                    );
                  case 33:
                    res = _context.sent;
                  case 34:
                    // tomo connect success ?
                    if ((chain === 'EVM' && res[0]) || res.address) {
                      setConnected(true);
                      storage.set('connect_type', 'TOMO');
                    }
                    return _context.abrupt('return', res);
                  case 38:
                    _context.prev = 38;
                    _context.t0 = _context['catch'](2);
                    console.log('connect error', _context.t0);
                  case 41:
                  case 'end':
                    return _context.stop();
                }
            },
            _callee,
            null,
            [[2, 38]]
          );
        }
      )
    );
    return function connect(_x) {
      return _ref2.apply(this, arguments);
    };
  })();
  // TODO  add to other providers
  var disconnectEffect = function disconnectEffect() {
    storage.set('connect_type', '');
  };
  /* reconnection check */
  useEffect(
    function () {
      var storage = new ProxyLocalStorage();
      var connectType = storage.get('connect_type');
      if (connectType === 'TOMO') {
        // reconnect
        if (chain === 'EVM' && !providers.ethereum) {
          console.log('injecting reconnecting tomo evm');
          var evmProvider = new EthereumProvider(
            _extends$9(
              {
                injected: true,
              },
              options
            )
          );
          setProviders(function (pre) {
            return _extends$9({}, pre, {
              ethereum: evmProvider,
            });
          });
        }
        if (chain === 'TON' && !providers.tomo_ton) {
          // todo
          var _providers = new WalletTgSdk(
            _extends$9(
              {
                injected: true,
              },
              options
            )
          );
          setProviders(function (pre) {
            return _extends$9({}, pre, {
              tomo_ton: _providers.tomo_ton,
            });
          });
        }
        // sol reconnection
        if (chain === 'SOL' && !providers.tomo_sol) {
          var _providers2 = new WalletTgSdk(
            _extends$9(
              {
                injected: true,
              },
              options
            )
          );
          setProviders(function (pre) {
            return _extends$9({}, pre, {
              tomo_sol: _providers2.solana,
            });
          });
        }
        // sui reconnection
        if (chain === 'SUI' && !providers.tomo_sui) {
          var _providers3 = new WalletTgSdk(
            _extends$9(
              {
                injected: true,
              },
              options
            )
          );
          setProviders(function (pre) {
            return _extends$9({}, pre, {
              tomo_sui: _providers3.tomo_sui,
            });
          });
        }
      }
    },
    [chain, providers]
  );
  // ethereum side effect
  useEffect(
    function () {
      var storage = new ProxyLocalStorage();
      var connectType = storage.get('connect_type');
      if (connectType === 'TOMO') {
        var _providers$ethereum;
        (_providers$ethereum = providers.ethereum) == null ||
          _providers$ethereum.on(
            TomoProviderEventName.TOMO_EVM_PROVIDER_DISCONNECTED,
            disconnectEffect
          );
        return function () {
          var _providers$ethereum2;
          (_providers$ethereum2 = providers.ethereum) == null ||
            _providers$ethereum2.removeAllListeners == null ||
            _providers$ethereum2.removeAllListeners();
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [providers.ethereum]
  );
  // watch providers to get evm connection
  // useEffect(() => {
  //   if (providers.ethereum) {
  //     if (providers.ethereum.isConnected) {
  //       const accounts = providers.ethereum.request({
  //         method: 'eth_requestAccounts',
  //         params: [],
  //       });
  //       setEvmAccounts(accounts as any);
  //     }
  //   }
  // }, [providers]);
  // const getCurrentAccount = useCallback(() => {
  //   // if (chain === 'EVM') {
  //   //   return storage.get('accounts')?.ethereum;
  //   // } else
  //   if (chain === 'TON') {
  //     return storage.get('accounts')?.ton;
  //   } else if (chain === 'SOL') {
  //     return storage.get('accounts')?.sol;
  //   } else if (chain === 'SUI') {
  //     return storage.get('accounts')?.sui;
  //   }
  // }, [chain, storage]);
  // const currentAccount = useMemo(() => getCurrentAccount(), [
  //   getCurrentAccount,
  // ]);
  return {
    connect: connect,
    connected: connected,
  };
};

var UXUYProvider;
function proxifyUxuyProvider(UXUYConnector) {
  var handler = {
    get: function get(target, property, receiver) {
      switch (property) {
        case 'isConnected': {
          return target.isConnected();
        }
        default:
          return Reflect.get(target, property, receiver);
      }
    },
  };
  return new Proxy(UXUYConnector, handler);
}
function getUXUYProvider(_x) {
  return _getUXUYProvider.apply(this, arguments);
}
function _getUXUYProvider() {
  _getUXUYProvider = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(_ref) {
      var metaData, onConnect, onDisconnect, useEvmChains, UXUYConnector;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1)
          switch ((_context4.prev = _context4.next)) {
            case 0:
              (metaData = _ref.metaData),
                (onConnect = _ref.onConnect),
                (onDisconnect = _ref.onDisconnect),
                (useEvmChains = _ref.useEvmChains);
              if (!UXUYProvider) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt('return', UXUYProvider);
            case 3:
              _context4.next = 5;
              return import('@uxuycom/web3-tg-sdk');
            case 5:
              _context4.t0 = _context4.sent.WalletTgSdk;
              _context4.t1 = {
                // injected: true,
                metaData: {
                  hostname: metaData.hostname || metaData.name,
                  name: metaData.name,
                  icon: metaData.icon,
                  url: metaData.url || location.origin,
                },
              };
              UXUYConnector = new _context4.t0(_context4.t1);
              UXUYConnector.ethereum.on('accountsChanged', function (accounts) {
                console.log('Active account:', accounts, accounts[0]);
                if (accounts != null && accounts[0]) {
                  onConnect == null || onConnect();
                } else {
                  onDisconnect == null || onDisconnect();
                }
              });
              UXUYProvider = proxifyUxuyProvider(UXUYConnector.ethereum);
              return _context4.abrupt('return', UXUYProvider);
            case 11:
            case 'end':
              return _context4.stop();
          }
      }, _callee4);
    })
  );
  return _getUXUYProvider.apply(this, arguments);
}
function useUxuyEVMConnect(option) {
  var _UXUYProvider;
  var _useContext = useContext(TomoContext),
    setProviders = _useContext.setProviders,
    useEvmChains = _useContext.useEvmChains,
    supportedProviders = _useContext.supportedProviders;
  var supportedProvider = supportedProviders[0];
  var storage = useProxyLocalStorage();
  var connectEffect = function connectEffect(provider) {
    setProviders(function (pre) {
      return _extends$9({}, pre, {
        ethereum: provider,
      });
    });
    var storage = new ProxyLocalStorage();
    var type = 'UXUY';
    storage.set('connect_type', type);
  };
  var disconnectEffect = function disconnectEffect() {
    setProviders(function (pre) {
      return _extends$9({}, pre, {
        ethereum: null,
      });
    });
    var storage = new ProxyLocalStorage();
    storage.set('connect_type', '');
  };
  var initializeProvider = useCallback(
    /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
        var provider;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return getUXUYProvider({
                  metaData: option.metaData,
                  onConnect: function onConnect() {
                    connectEffect(provider);
                  },
                  onDisconnect: function onDisconnect() {
                    disconnectEffect();
                  },
                  useEvmChains: useEvmChains,
                });
              case 2:
                provider = _context.sent;
                return _context.abrupt('return', provider);
              case 4:
              case 'end':
                return _context.stop();
            }
        }, _callee);
      })
    ),
    [option.metaData, useEvmChains]
  );
  var connected =
    (_UXUYProvider = UXUYProvider) == null ? void 0 : _UXUYProvider.isConnected;
  console.log('connected', connected);
  // reconnection check
  useEffect(
    function () {
      var connectType = storage.get('connect_type');
      if (connectType === 'UXUY' && supportedProvider === 'EVM') {
        // try reconnect
        initializeProvider().then(
          /*#__PURE__*/ (function () {
            var _ref3 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee2(provider) {
                  return _regeneratorRuntime().wrap(function _callee2$(
                    _context2
                  ) {
                    while (1)
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          // restore
                          provider.isConnected &&
                            setProviders(function (pre) {
                              return _extends$9({}, pre, {
                                ethereum: provider,
                              });
                            });
                        case 1:
                        case 'end':
                          return _context2.stop();
                      }
                  }, _callee2);
                }
              )
            );
            return function (_x2) {
              return _ref3.apply(this, arguments);
            };
          })()
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [supportedProvider, storage]
  );
  // useEffect(() => {
  //   if (!!UXUYProvider && connected) {
  //     connectEffect(UXUYProvider);
  //   } else if (!!UXUYProvider && !connected) {
  //     disconnectEffect();
  //   }
  // }, [connectEffect, disconnectEffect, connected]);
  var connect = useCallback(
    /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3() {
        var provider, accounts;
        return _regeneratorRuntime().wrap(
          function _callee3$(_context3) {
            while (1)
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.next = 2;
                  return initializeProvider();
                case 2:
                  provider = _context3.sent;
                  _context3.prev = 3;
                  _context3.next = 6;
                  return provider.request({
                    method: 'eth_requestAccounts',
                  });
                case 6:
                  accounts = _context3.sent;
                  console.log('result', accounts);
                  _context3.next = 14;
                  break;
                case 10:
                  _context3.prev = 10;
                  _context3.t0 = _context3['catch'](3);
                  console.log('error', _context3.t0);
                  throw _context3.t0;
                case 14:
                case 'end':
                  return _context3.stop();
              }
          },
          _callee3,
          null,
          [[3, 10]]
        );
      })
    ),
    [initializeProvider]
  );
  return {
    connect: connect,
  };
}

var _ICON_MAP;
function disconnectAll(_x) {
  return _disconnectAll.apply(this, arguments);
}
function _disconnectAll() {
  _disconnectAll = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee5(providers) {
      var _providers$tomo_ton, _providers$ethereum, _providers$tomo_sol;
      return _regeneratorRuntime().wrap(
        function _callee5$(_context5) {
          while (1)
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.prev = 0;
                (_providers$tomo_ton = providers.tomo_ton) == null ||
                  _providers$tomo_ton.disconnect == null ||
                  _providers$tomo_ton.disconnect();
                _context5.next = 4;
                return (_providers$ethereum = providers.ethereum) == null ||
                  _providers$ethereum.disconnect == null
                  ? void 0
                  : _providers$ethereum.disconnect();
              case 4:
                // do not disconnect for evm, it's async
                (_providers$tomo_sol = providers.tomo_sol) == null ||
                  _providers$tomo_sol.disconnect == null ||
                  _providers$tomo_sol.disconnect(); // todo
                _context5.next = 11;
                break;
              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5['catch'](0);
                console.error(_context5.t0);
                console.error('caught error disconnecting, skipping');
              case 11:
              case 'end':
                return _context5.stop();
            }
        },
        _callee5,
        null,
        [[0, 7]]
      );
    })
  );
  return _disconnectAll.apply(this, arguments);
}
var TON_ICON = function TON_ICON() {
  return React__default.createElement(
    'div',
    {
      className:
        'tm-flex tm-flex-col tm-bg-[#F5F5FA] dark:tm-bg-[#2e2e30] tm-rounded-lg tm-p-[3px] tm-gap-[3px]',
    },
    React__default.createElement(
      'div',
      {
        className: 'tm-flex tm-gap-[3px]',
      },
      React__default.createElement(SvgTonkeeper, null),
      React__default.createElement(SvgTon2, null)
    ),
    React__default.createElement(
      'div',
      {
        className: 'tm-flex tm-gap-[3px]',
      },
      React__default.createElement(SvgTon3, null),
      React__default.createElement(SvgTon4, null)
    )
  );
};
var ICON_MAP =
  ((_ICON_MAP = {}),
  (_ICON_MAP[CONNECT_MAP.OKX_CONNECT] = SvgOkxWallet),
  (_ICON_MAP[CONNECT_MAP.TON_CONNECT] = TON_ICON),
  (_ICON_MAP[CONNECT_MAP.TOMO_MINI_APP] = SvgTomo),
  (_ICON_MAP[CONNECT_MAP.BITGET_WALLET] = function () {
    return React__default.createElement('img', {
      style: {
        height: 48,
        width: 48,
        borderRadius: 8,
      },
      src: 'https://d13t1x9bdoguib.cloudfront.net/static/bitget-new.png',
    });
  }),
  (_ICON_MAP[CONNECT_MAP.UXUY_WALLET] = function () {
    return React__default.createElement(
      'div',
      {
        style: {
          height: 48,
          width: 48,
          borderRadius: 8,
          backgroundColor: '#FF7400',
        },
      },
      React__default.createElement(SvgUxuy, null)
    );
  }),
  _ICON_MAP);
var ConnectMain = function ConnectMain(_ref) {
  var closeModal = _ref.closeModal,
    show = _ref.show,
    setConnected = _ref.setConnected,
    chain = _ref.chain,
    manifestUrl = _ref.manifestUrl,
    supportedConnects = _ref.supportedConnects,
    tomoOptions = _ref.tomoOptions,
    theme = _ref.theme,
    connectOptions = _ref.connectOptions,
    setIsLoading = _ref.setIsLoading,
    setConnectResult = _ref.setConnectResult;
  var _useState = useState(''),
    email = _useState[0],
    setEmail = _useState[1];
  var _useState2 = useState(false),
    isFocus = _useState2[0],
    setIsFocus = _useState2[1];
  var _useState3 = useState(''),
    emailError = _useState3[0],
    setEmailError = _useState3[1];
  var _useState4 = useState(true),
    showConnectors = _useState4[0],
    setShowConnectors = _useState4[1];
  var _useState5 = useState(false),
    isIOS$1 = _useState5[0],
    setIsIOS = _useState5[1];
  var _useContext = useContext(TomoContext),
    providers = _useContext.providers,
    setProviders = _useContext.setProviders;
  var _useOkxTonConnect = useOkxTonConnect({
      setProviders: setProviders,
      chain: chain,
      metaData: tomoOptions == null ? void 0 : tomoOptions.metaData,
      theme: theme,
      setConnectResult: setConnectResult,
      connectSuccess: closeModal,
    }),
    okxTonConnect = _useOkxTonConnect.connect,
    okxTonConnected = _useOkxTonConnect.connected;
  var _useOkxEVMConnect = useOkxEVMConnect({
      chain: chain,
      metaData: tomoOptions == null ? void 0 : tomoOptions.metaData,
      theme: theme,
    }),
    okxEVMConnect = _useOkxEVMConnect.connect,
    okxEVMConnected = _useOkxEVMConnect.connected;
  var _useBitget = useBitget({
      metaData: tomoOptions.metaData,
    }),
    connectBitget = _useBitget.connect;
  var _useUxuyEVMConnect = useUxuyEVMConnect({
      metaData: tomoOptions == null ? void 0 : tomoOptions.metaData,
    }),
    connectUxuy = _useUxuyEVMConnect.connect;
  var _useState6 = useState({
      connect: null,
      connected: false,
    }),
    tonConnect = _useState6[0],
    setTonConnect = _useState6[1];
  var _useTomoConnect = useTomoConnect({
      chain: chain,
      options: tomoOptions,
      setProviders: setProviders,
      setConnectResult: setConnectResult,
    }),
    tomConnect = _useTomoConnect.connect,
    tomoConnected = _useTomoConnect.connected;
  var connectOptionList = useMemo(
    function () {
      if (supportedConnects.length) {
        return Array.from(
          new Set([CONNECT_MAP.TOMO_MINI_APP].concat(supportedConnects))
        );
      }
      var connectedInHistory = window.localStorage.getItem(
        'connected_in_history'
      );
      var list = connectedInHistory
        ? ChainIdWithConnectsMap[chain] || []
        : [CONNECT_MAP.TOMO_MINI_APP];
      return list;
    },
    [chain, supportedConnects]
  );
  var connected = useMemo(
    function () {
      return (
        okxEVMConnected ||
        okxTonConnected ||
        tomoConnected ||
        (tonConnect == null ? void 0 : tonConnect.tonConnected)
      );
    },
    [
      okxTonConnected,
      okxEVMConnected,
      tomoConnected,
      tonConnect == null ? void 0 : tonConnect.tonConnected,
    ]
  );
  useEffect(
    function () {
      setConnected(connected);
      if (connected) {
        window.localStorage.setItem('connected_in_history', '1');
        closeModal();
        setEmail('');
      }
    },
    [connected]
  );
  var handleClickConnect = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(wallet) {
        var _yield$import, _yield$import2;
        var TonConnect, TonConnectUIProvider, div, res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return disconnectAll(providers);
              case 2:
                _context.t0 = wallet;
                _context.next =
                  _context.t0 === CONNECT_MAP.OKX_CONNECT
                    ? 5
                    : _context.t0 === CONNECT_MAP.TON_CONNECT
                      ? 10
                      : _context.t0 === CONNECT_MAP.TOMO_MINI_APP
                        ? 38
                        : _context.t0 === CONNECT_MAP.BITGET_WALLET
                          ? 43
                          : _context.t0 === CONNECT_MAP.UXUY_WALLET
                            ? 47
                            : 51;
                break;
              case 5:
                setIsLoading(true);
                _context.next = 8;
                return handleOkxConnect();
              case 8:
                setIsLoading(false);
                return _context.abrupt('break', 52);
              case 10:
                if (!(tonConnect != null && tonConnect.connect)) {
                  _context.next = 14;
                  break;
                }
                _context.next = 13;
                return tonConnect.connect(connectOptions);
              case 13:
                return _context.abrupt('return');
              case 14:
                // dynamically import TonConnect
                setIsLoading(true);
                _context.next = 17;
                return import('./TonConnect-41c89705.js');
              case 17:
                _context.t1 = _yield$import = _context.sent;
                if (!(_context.t1 == null)) {
                  _context.next = 22;
                  break;
                }
                _context.t2 = void 0;
                _context.next = 23;
                break;
              case 22:
                _context.t2 = _yield$import['default'];
              case 23:
                TonConnect = _context.t2;
                _context.next = 26;
                return import('./index-75026a6b.js');
              case 26:
                _context.t3 = _yield$import2 = _context.sent;
                if (!(_context.t3 == null)) {
                  _context.next = 31;
                  break;
                }
                _context.t4 = void 0;
                _context.next = 32;
                break;
              case 31:
                _context.t4 = _yield$import2.TonConnectUIProvider;
              case 32:
                TonConnectUIProvider = _context.t4;
                div = document.createElement('div');
                div.id = 'tomo-ton-connect';
                document.body.appendChild(div);
                ReactDOM.render(
                  React__default.createElement(
                    TonConnectUIProvider,
                    {
                      manifestUrl: manifestUrl || './manifestUrl.json',
                    },
                    React__default.createElement(TonConnect, {
                      closeModal: closeModal,
                      setProviders: setProviders,
                      setConnectResult: setConnectResult,
                      updateTonConnect: setTonConnect,
                    })
                  ),
                  div,
                  function () {
                    setTimeout(function () {
                      setIsLoading(false);
                    }, 1000);
                  }
                );
                return _context.abrupt('break', 52);
              case 38:
                _context.next = 40;
                return tomConnect(connectOptions);
              case 40:
                res = _context.sent;
                if (res) closeModal();
                return _context.abrupt('break', 52);
              case 43:
                _context.next = 45;
                return connectBitget();
              case 45:
                closeModal();
                return _context.abrupt('break', 52);
              case 47:
                _context.next = 49;
                return connectUxuy();
              case 49:
                closeModal();
                return _context.abrupt('break', 52);
              case 51:
                return _context.abrupt('break', 52);
              case 52:
              case 'end':
                return _context.stop();
            }
        }, _callee);
      })
    );
    return function handleClickConnect(_x2) {
      return _ref2.apply(this, arguments);
    };
  })();
  var handleOkxConnect = /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
        var res;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1)
            switch ((_context2.prev = _context2.next)) {
              case 0:
                if (!(chain === 'EVM')) {
                  _context2.next = 6;
                  break;
                }
                _context2.next = 3;
                return okxEVMConnect();
              case 3:
                res = _context2.sent;
                _context2.next = 10;
                break;
              case 6:
                if (!(chain === 'TON')) {
                  _context2.next = 10;
                  break;
                }
                _context2.next = 9;
                return okxTonConnect(connectOptions);
              case 9:
                res = _context2.sent;
              case 10:
                if (res) closeModal();
                return _context2.abrupt('return', res);
              case 12:
              case 'end':
                return _context2.stop();
            }
        }, _callee2);
      })
    );
    return function handleOkxConnect() {
      return _ref3.apply(this, arguments);
    };
  })();
  var handleConnectTg = /*#__PURE__*/ (function () {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3() {
        var res;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1)
            switch ((_context3.prev = _context3.next)) {
              case 0:
                if (email) {
                  _context3.next = 6;
                  break;
                }
                _context3.next = 3;
                return tomConnect(connectOptions);
              case 3:
                res = _context3.sent;
                _context3.next = 16;
                break;
              case 6:
                if (validEmail(email)) {
                  _context3.next = 12;
                  break;
                }
                _context3.next = 9;
                return tomConnect(connectOptions);
              case 9:
                _context3.t0 = _context3.sent;
                _context3.next = 15;
                break;
              case 12:
                _context3.next = 14;
                return tomConnect(
                  _extends$9({}, connectOptions, {
                    email: email,
                  })
                );
              case 14:
                _context3.t0 = _context3.sent;
              case 15:
                res = _context3.t0;
              case 16:
                if (res) closeModal();
              case 17:
              case 'end':
                return _context3.stop();
            }
        }, _callee3);
      })
    );
    return function handleConnectTg() {
      return _ref4.apply(this, arguments);
    };
  })();
  var handleEmailNextClick = function handleEmailNextClick() {
    if (!validEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      tomConnect(
        _extends$9({}, connectOptions, {
          email: email,
        })
      );
    }
  };
  useEffect(
    function () {
      // if is not focused or is pc, then show connectors
      setShowConnectors(!isFocus || isPcBrowser());
    },
    [isFocus]
  );
  useEffect(function () {
    // detect if is IOS
    setIsIOS(isIOS());
  }, []);
  return React__default.createElement(
    'div',
    {
      className: cn('tm-px-4 tm-mt-2 tm-mb-5 tm-select-none', {
        'tm-hidden': !show,
        'tm-h-[440px]': isFocus && isIOS$1,
      }),
    },
    React__default.createElement(
      'div',
      {
        className: cn(
          'tm-flex tm-items-center tm-justify-between tm-gap-2 tm-w-full tm-h-[48px] tm-border tm-rounded-[8px] tm-px-4 tm-py-[14px] dark:tm-bg-[#171717]',
          {
            'tm-border-[#EBEBF4] dark:tm-border-[#171717]': !isFocus,
          },
          {
            'tm-border-[#12122A] dark:tm-border-[#FFF]': isFocus,
          }
        ),
      },
      React__default.createElement('input', {
        type: 'text',
        placeholder: 'Enter your email',
        className:
          'tm-text-[14px] tm-border-none tm-outline-none tm-flex-1 tm-bg-transparent tm-text-[#12122A] dark:tm-text-white',
        value: email,
        onFocus: function onFocus(e) {
          return setIsFocus(true);
        },
        onBlur: function onBlur(e) {
          return setIsFocus(false);
        },
        onChange: (function () {
          var _onChange = _asyncToGenerator(
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(e) {
              var v;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1)
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      setEmailError('');
                      v = e.target.value;
                      setEmail(v);
                    case 3:
                    case 'end':
                      return _context4.stop();
                  }
              }, _callee4);
            })
          );
          function onChange(_x3) {
            return _onChange.apply(this, arguments);
          }
          return onChange;
        })(),
      }),
      React__default.createElement(
        'div',
        {
          className:
            'tm-cursor-pointer tm-flex tm-justify-center tm-items-center',
          onTouchEnd: handleEmailNextClick,
          onClick: handleEmailNextClick,
        },
        React__default.createElement(SvgArrowRight, null)
      )
    ),
    emailError &&
      React__default.createElement(
        'div',
        {
          className: 'tm-py-1 tm-text-[#EB4B6D] tm-text-[12px]',
        },
        emailError
      ),
    React__default.createElement(
      'div',
      {
        onTouchEnd: handleConnectTg,
        onClick: handleConnectTg,
        className:
          'tm-mt-[10px] tm-select-none tm-flex tm-w-full tm-gap-2 tm-justify-center tm-items-center tm-h-[52px] tm-cursor-pointer tm-rounded-[8px] tm-bg-[#00A9FB] hover:tm-opacity-50',
      },
      React__default.createElement(SvgIconTg, null),
      React__default.createElement(
        'span',
        {
          className:
            'tm-text-white tm-font-switzerMedium tm-text-[16px] tm-flex tm-gap-1',
        },
        'Continue with Telegram'
      )
    ),
    React__default.createElement(
      'div',
      {
        id: 'tomo-modal-connectors',
        className: cn({
          'tm-hidden': !showConnectors,
        }),
      },
      React__default.createElement(
        'div',
        {
          className:
            'tm-flex tm-items-center tm-justify-between tm-gap-3 tm-mt-4 tm-mb-3 tm-select-none',
        },
        React__default.createElement('span', {
          className:
            'tm-inline-block tm-flex-1 tm-h-[1px] tm-bg-[#EBEBF4] dark:tm-bg-[#444]',
        }),
        React__default.createElement(
          'span',
          {
            className: 'tm-text-[#8989AB] tm-text-[14px]',
          },
          'or connect a wallet'
        ),
        React__default.createElement('span', {
          className:
            'tm-inline-block tm-flex-1 tm-h-[1px] tm-bg-[#EBEBF4] dark:tm-bg-[#444]',
        })
      ),
      React__default.createElement(
        'div',
        {
          className:
            'tm-flex tm-items-center tm-justify-center tm-pb-4 tm-gap-2',
        },
        React__default.createElement(
          'span',
          {
            className: 'tm-flex',
          },
          connectOptionList.map(function (option) {
            var WalletIcon = ICON_MAP[option];
            var displayName = getDisplayName(option);
            var displayDesc = getDisplayDescription(option);
            return React__default.createElement(
              'div',
              {
                key: option,
                className: cn(
                  'tm-flex tm-flex-1 tm-flex-col tm-gap-1 tm-items-center tm-justify-start tm-px-3'
                ),
              },
              React__default.createElement(
                'div',
                {
                  onClick: function onClick() {
                    return handleClickConnect(option);
                  },
                  className:
                    'tm-flex tm-justify-start tm-items-center tm-flex-col tm-select-none',
                },
                React__default.createElement(
                  'div',
                  {
                    className:
                      'tm-w-[56px] tm-h-[56px] tm-flex tm-items-center tm-justify-center',
                  },
                  React__default.createElement(WalletIcon, null)
                ),
                React__default.createElement(
                  'span',
                  {
                    className:
                      'tm-text=[#12122A] tm-text-[12px] tm-font-switzerMedium tm-text-center tm-whitespace-nowrap',
                  },
                  displayName
                ),
                React__default.createElement(
                  'span',
                  {
                    className:
                      'tm-text-[#616184] tm-text-[10px] tm-font-switzerMedium tm-text-center tm-whitespace-nowrap',
                  },
                  displayDesc
                )
              )
            );
          })
        )
      )
    ),
    React__default.createElement('div', {
      id: 'tomo-modal-ios-placeholder',
      className: cn({
        // show if is IOS and connector is hidden
        'tm-hidden': !(isIOS$1 && !showConnectors),
      }),
      style: {
        height: 80,
      },
    })
  );
};

var isSafeAtom = /*#__PURE__*/ atom(false);
var isIPhone = function isIPhone() {
  var isIphoneCache = /iPhone/i.test(navigator.userAgent || navigator.vendor);
  return isIphoneCache;
};
// temporary fix for iPhone input focus issue
// https://github.com/TelegramMessenger/Telegram-iOS/issues/1410
function useIphoneFocusFix(keepScrolling) {
  var isSafe = useAtomValue(isSafeAtom);
  useEffect(
    function () {
      if (!isIPhone()) {
        return function () {};
      }
      if (isSafe) {
        document.documentElement.classList.add('global-focus-safe');
      } else {
        document.documentElement.classList.remove('global-focus-safe');
      }
      // console.log('temporary fix for iPhone input focus issue')
      var oldFocus = false;
      var fn = function fn() {
        var activeElement = document.activeElement;
        var isFocus =
          (activeElement == null ? void 0 : activeElement.nodeName) === 'INPUT';
        if (isFocus !== oldFocus) {
          oldFocus = isFocus;
          if (isFocus) {
            document.documentElement.classList.add('global-focus');
          } else {
            document.documentElement.classList.remove('global-focus');
          }
        }
        if (window.scrollY !== 0 && (!isSafe || !isFocus)) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
          });
        }
      };
      if (keepScrolling) {
        console.log('keep scrolling');
        var timeout = setInterval(fn, 100);
        return function () {
          console.log('stop scrolling');
          clearInterval(timeout);
        };
      } else return function () {};
    },
    [isSafe, keepScrolling]
  );
}

var LoadingRing = function LoadingRing() {
  return React__default.createElement(
    'div',
    {
      className: 'tm-flex tm-items-center tm-justify-center',
    },
    React__default.createElement('div', {
      className:
        'tm-animate-spin tm-rounded-full tm-h-4 tm-w-4 tm-border-[2px] tm-border-t-transparent tm-border-white',
    })
  );
};

/* eslint-disable @typescript-eslint/interface-name-prefix */
var OKX_QRCODE_TEXT = 'Please scan the QR code with your OKX APP.';
var TomoModal = function TomoModal(_ref) {
  var title = _ref.title,
    manifestUrl = _ref.manifestUrl,
    opened = _ref.opened,
    close = _ref.close,
    back = _ref.back,
    onClose = _ref.onClose,
    setConnected = _ref.setConnected,
    supportedProviders = _ref.supportedProviders,
    supportedConnects = _ref.supportedConnects,
    setProviders = _ref.setProviders,
    tomoOptions = _ref.tomoOptions,
    theme = _ref.theme,
    connectOptions = _ref.connectOptions,
    setConnectResult = _ref.setConnectResult;
  var _useState = useState(''),
    qrCode = _useState[0],
    setQrCode = _useState[1];
  var _useState2 = useState(false),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = useState(!!back),
    isShowBack = _useState3[0],
    setIsShowBack = _useState3[1];
  var _useState4 = useState(title),
    titleText = _useState4[0],
    setTitleText = _useState4[1];
  useEffect(
    function () {
      setIsShowBack(!!qrCode);
      setTitleText(qrCode ? 'OKX Connect' : title);
    },
    [qrCode]
  );
  var handleClikClose = function handleClikClose() {
    setQrCode('');
    onClose();
  };
  var handleBack = function handleBack() {
    setQrCode('');
  };
  useEffect(
    function () {
      var targetElement = document.querySelector('body');
      opened
        ? disableBodyScroll(targetElement)
        : enableBodyScroll(targetElement);
    },
    [opened]
  );
  // remove loading when modal is closed
  useEffect(
    function () {
      if (!opened) setIsLoading(false);
    },
    [opened]
  );
  useIphoneFocusFix(opened);
  return React__default.createElement(
    'div',
    {
      className: cn(
        'tomo-social tm-select-none tm-fixed tm-left-0 tm-top-0 tm-z-40 tm-flex tm-items-end tm-h-screen tm-w-screen tm-bg-tc1/30 tm-font-switzer tm-overflow-auto tm-text-primary dark:tm-text-primary-dark tm-box-border',
        {
          'tm-hidden': !opened,
        }
      ),
      onTouchEnd: handleClikClose,
    },
    React__default.createElement(
      'div',
      {
        id: 'tomo-modal-body',
        className:
          'tm-relative sm:tm-relative sm:tm-m-auto sm:tm-w-auto tm-bottom-0 tm-left-0 tm-w-full tm-overflow-hidden tm-rounded-t-2xl sm:tm-rounded-b-2xl animate__animated animate__fadeInUp animate__faster sm:tm-animate-none tm-bg-white dark:tm-bg-[#171717]',
        style: {
          filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.30))',
          animationDuration: '0.3s',
        },
        onTouchEnd: function onTouchEnd(e) {
          return e.stopPropagation();
        },
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
      },
      React__default.createElement(
        'div',
        {
          className:
            'tm-flex tm-items-center tm-py-4 tm-px-5 tm-justify-between',
        },
        isShowBack &&
          React__default.createElement(BackIcon, {
            onClick: handleBack,
            className: 'tm-cursor-pointer tm-text-tc1 dark:tm-text-tc1-dark',
          }),
        React__default.createElement(
          'span',
          {
            className: cn(
              'tm-flex-1 tm-text-[20px] tm-font-switzerBold tm-text-[#12122A] dark:tm-text-white',
              {
                'tm-text-center': isShowBack,
              }
            ),
          },
          titleText
        ),
        close &&
          React__default.createElement(
            'div',
            {
              className:
                'tm-w-[20px] tm-h-[20px] tm-flex tm-items-center tm-justify-center',
              onTouchEnd: handleClikClose,
              onClick: handleClikClose,
            },
            React__default.createElement(CloseIcon, {
              className:
                'tm-cursor-pointer tm-text-[#12122A] dark:tm-text-white',
            })
          )
      ),
      qrCode &&
        React__default.createElement(
          'div',
          {
            className:
              'tm-p-8 tm-flex tm-gap-6 tm-flex-col tm-items-center tm-justify-center',
          },
          React__default.createElement(
            'div',
            {
              className: 'tm-p-1 tm-pb-0 tm-bg-white',
            },
            React__default.createElement(QRCodeSVG, {
              value: qrCode,
            })
          ),
          React__default.createElement(
            'span',
            {
              className: 'tm-px-8 tm-text-center',
            },
            OKX_QRCODE_TEXT
          )
        ),
      React__default.createElement(ConnectMain, {
        setConnected: setConnected,
        show: !qrCode,
        setIsLoading: setIsLoading,
        closeModal: handleClikClose,
        chain: supportedProviders[0],
        supportedConnects: supportedConnects,
        setProviders: setProviders,
        manifestUrl: manifestUrl,
        tomoOptions: tomoOptions,
        theme: theme,
        connectOptions: connectOptions,
        setConnectResult: setConnectResult,
      }),
      isLoading &&
        React__default.createElement(
          'div',
          {
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            className:
              'tm-absolute tm-z-40 tm-top-0  tm-left-0 tm-right-0 tm-bottom-0 tm-flex tm-items-center tm-justify-center',
          },
          React__default.createElement(LoadingRing, null)
        )
    )
  );
};
function CloseIcon(props) {
  return React__default.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
    },
    React__default.createElement('path', {
      d: 'M9.99983 8.82208L14.1247 4.69727L15.3032 5.87577L11.1783 10.0006L15.3032 14.1253L14.1247 15.3038L9.99983 11.1791L5.87505 15.3038L4.69653 14.1253L8.82133 10.0006L4.69653 5.87577L5.87505 4.69727L9.99983 8.82208Z',
      fill: 'currentColor',
    })
  );
}
function BackIcon(props) {
  return React__default.createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        fill: 'none',
      },
      props
    ),
    React__default.createElement(
      'g',
      {
        id: 'chevron_left_b',
      },
      React__default.createElement('path', {
        id: 'chevron',
        d: 'M15.7071 2.79289C15.3166 2.40237 14.6834 2.40237 14.2929 2.79289L5.80762 11.2782C5.41709 11.6687 5.41709 12.3019 5.80762 12.6924L14.2929 21.1777C14.6834 21.5682 15.3166 21.5682 15.7071 21.1777C16.0976 20.7871 16.0976 20.154 15.7071 19.7635L7.92894 11.9853L15.7071 4.20711C16.0976 3.81658 16.0976 3.18342 15.7071 2.79289Z',
        fill: 'currentColor',
      })
    )
  );
}

var defaultEndpoints = {
  dev: ['https://apis.tomo.inc/'],
  test: ['https://apis.tomo.inc/'],
  main: ['https://apis.tomo.inc/'],
};
var defaultTMAuthLink = 'https://t.me/tomowalletbot/tomoauthapp';
var TomoContext = /*#__PURE__*/ createContext(undefined);
// function useMemoTomoContextValue(context: TomoContextType) {
//   const values = Object.values(context)
//   return useMemo(() => context, values)
// }
var TomoProvider = function TomoProvider(_ref) {
  var children = _ref.children,
    tmaid = _ref.tmaid,
    tmakey = _ref.tmakey,
    _ref$env = _ref.env,
    env = _ref$env === void 0 ? 'dev' : _ref$env,
    customEndpoints = _ref.customEndpoints,
    customTMAuthLink = _ref.customTMAuthLink,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme,
    _ref$supportedProvide = _ref.supportedProviders,
    supportedProviders =
      _ref$supportedProvide === void 0 ? ['EVM'] : _ref$supportedProvide,
    _ref$supportedConnect = _ref.supportedConnects,
    supportedConnects =
      _ref$supportedConnect === void 0 ? [] : _ref$supportedConnect,
    manifestUrl = _ref.manifestUrl,
    tomoOptions = _ref.tomoOptions,
    _ref$useEvmChains = _ref.useEvmChains,
    useEvmChains = _ref$useEvmChains === void 0 ? [1] : _ref$useEvmChains,
    overrideTomoRpcUrls = _ref.overrideTomoRpcUrls;
  var _useState = useState(''),
    code = _useState[0],
    setCode = _useState[1];
  var _useCheckLoginByCode = useCheckLoginByCode(code),
    data = _useCheckLoginByCode.data;
  var webApp = useWebApp();
  var _useStore = useStore(),
    setPaymentPwdExists = _useStore.setPaymentPwdExists;
  var _useBiometricManager = useBiometricManager(),
    biometryManager = _useBiometricManager.biometryManager;
  var _useState2 = useState(false),
    opened = _useState2[0],
    setOpened = _useState2[1];
  var _useState3 = useState({}),
    providers = _useState3[0],
    setProviders = _useState3[1];
  var _useState4 = useState(false),
    isEvmConnected = _useState4[0];
  var _useInitData = useInitData(),
    initDataUnsafe = _useInitData[0],
    initData = _useInitData[1];
  var _useTomoUserInfo = useTomoUserInfo(),
    setUserInfo = _useTomoUserInfo.setUserInfo,
    userInfo = _useTomoUserInfo.userInfo,
    deviceId = _useTomoUserInfo.deviceId,
    generateDeviceId = _useTomoUserInfo.generateDeviceId;
  var _useState5 = useState(false),
    connected = _useState5[0],
    setConnected = _useState5[1];
  var _useState6 = useState(),
    connectOptions = _useState6[0],
    setConnectOptions = _useState6[1];
  var _useState7 = useState(null),
    connectResult = _useState7[0],
    setConnectResult = _useState7[1];
  var endpoints = customEndpoints || defaultEndpoints[env];
  var tMAuthLink = customTMAuthLink || defaultTMAuthLink;
  useEffect(
    function () {
      api.init(endpoints, tmaid, tmakey);
    },
    [endpoints, tmaid, tmakey]
  );
  useEffect(
    function () {
      if (theme === 'dark') {
        document.documentElement.classList.add('tm-dark');
      } else {
        document.documentElement.classList.remove('tm-dark');
      }
    },
    [theme]
  );
  var onLogin = useCallback(
    /*#__PURE__*/ (function () {
      var _ref2 = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(type, open) {
          var c, res;
          return _regeneratorRuntime().wrap(
            function _callee$(_context) {
              while (1)
                switch ((_context.prev = _context.next)) {
                  case 0:
                    if (type === void 0) {
                      type = 'tomo';
                    }
                    if (open === void 0) {
                      open = true;
                    }
                    if (!(type == 'tomo')) {
                      _context.next = 8;
                      break;
                    }
                    c = generateRandomString(16);
                    console.log('code', c);
                    setCode(c);
                    if (open)
                      webApp == null ||
                        webApp.openTelegramLink(tMAuthLink + '?startapp=' + c);
                    return _context.abrupt(
                      'return',
                      tMAuthLink + '?startapp=' + c
                    );
                  case 8:
                    if (initData) {
                      _context.next = 10;
                      break;
                    }
                    throw new Error('Please open the telegram and try again');
                  case 10:
                    _context.next = 12;
                    return loginApi('' + initData);
                  case 12:
                    res = _context.sent;
                    setUserInfo(res);
                    if (
                      !(!deviceId && !biometryManager.isBiometricTokenSaved)
                    ) {
                      _context.next = 24;
                      break;
                    }
                    _context.prev = 15;
                    _context.next = 18;
                    return generateDeviceId();
                  case 18:
                    _context.next = 24;
                    break;
                  case 20:
                    _context.prev = 20;
                    _context.t0 = _context['catch'](15);
                    console.error('generateDeviceId', _context.t0);
                    // setUserInfo(null);
                    throw _context.t0;
                  case 24:
                    return _context.abrupt('return', res);
                  case 25:
                  case 'end':
                    return _context.stop();
                }
            },
            _callee,
            null,
            [[15, 20]]
          );
        })
      );
      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    })(),
    []
  );
  useEffect(
    function () {
      _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(
            function _callee2$(_context2) {
              while (1)
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    if (!(code && data)) {
                      _context2.next = 12;
                      break;
                    }
                    setUserInfo(data);
                    if (
                      !(!deviceId && !biometryManager.isBiometricTokenSaved)
                    ) {
                      _context2.next = 12;
                      break;
                    }
                    _context2.prev = 3;
                    _context2.next = 6;
                    return generateDeviceId();
                  case 6:
                    _context2.next = 12;
                    break;
                  case 8:
                    _context2.prev = 8;
                    _context2.t0 = _context2['catch'](3);
                    console.error('generateDeviceId', _context2.t0);
                    // setUserInfo(null);
                    throw _context2.t0;
                  case 12:
                  case 'end':
                    return _context2.stop();
                }
            },
            _callee2,
            null,
            [[3, 8]]
          );
        })
      )();
    },
    [data, code]
  );
  var onLogout = useCallback(function () {
    setUserInfo(null);
    setPaymentPwdExists(-1);
  }, []);
  var onSendEmailCode = useCallback(
    /*#__PURE__*/ (function () {
      var _ref4 = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(params) {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1)
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.next = 2;
                  return sendBindEmailCodeApi(params);
                case 2:
                  return _context3.abrupt('return', _context3.sent);
                case 3:
                case 'end':
                  return _context3.stop();
              }
          }, _callee3);
        })
      );
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    })(),
    []
  );
  var onVerifyEmailCode = useCallback(
    /*#__PURE__*/ (function () {
      var _ref5 = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(params) {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1)
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  if (!(params.tradePassword.length < 6)) {
                    _context4.next = 2;
                    break;
                  }
                  throw new Error(
                    'Trade password must be at least 6 characters'
                  );
                case 2:
                  _context4.next = 4;
                  return hashWithWebCrypto(params.tradePassword);
                case 4:
                  params.tradePassword = _context4.sent;
                  _context4.next = 7;
                  return verifyBindEmailCodeApi(params);
                case 7:
                  return _context4.abrupt('return', _context4.sent);
                case 8:
                case 'end':
                  return _context4.stop();
              }
          }, _callee4);
        })
      );
      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    })(),
    []
  );
  var onUpdateUserInfo = useCallback(
    /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee5() {
        var res;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1)
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.next = 2;
                return getTelegramUserInfoApi();
              case 2:
                res = _context5.sent;
                setUserInfo(_extends$9({}, userInfo, res.result));
                return _context5.abrupt('return', res.result);
              case 5:
              case 'end':
                return _context5.stop();
            }
        }, _callee5);
      })
    ),
    []
  );
  var openConnectModal = useCallback(function (options) {
    setConnectOptions(options);
    setOpened(true);
  }, []);
  var closeConnectModal = useCallback(function () {
    setOpened(false);
  }, []);
  // evm connection
  // useEffect(() => {
  //   if (providers.ethereum) {
  //     console.log({ ethereum: providers.ethereum });
  //     const isConnected = providers.ethereum.isConnected;
  //     console.log({ isConnected });
  //     setIsEvmConnected(isConnected);
  //     if (isConnected) {
  //       providers.ethereum.request({
  //         method: 'eth_requestAccounts',
  //         params: [],
  //       }).then((res) => {
  //         debugger
  //       });
  //     }
  //   }
  // }, [providers.ethereum]);
  var tomoProviderValue = useMemo(
    function () {
      return _extends$9(
        {
          tmaid: tmaid,
          tmakey: tmakey,
          env: env,
          endpoints: endpoints,
          userInfo: userInfo,
          onLogin: onLogin,
          onLogout: onLogout,
          telegramData: initDataUnsafe,
          tMAuthLink: tMAuthLink,
          onSendEmailCode: onSendEmailCode,
          onVerifyEmailCode: onVerifyEmailCode,
          onUpdateUserInfo: onUpdateUserInfo,
          apiList: apiList,
          openConnectModal: openConnectModal,
          closeConnectModal: closeConnectModal,
          connected: connected,
          providers: providers,
          setProviders: setProviders,
          connectResult: connectResult,
          supportedProviders: supportedProviders,
          isEvmConnected: isEvmConnected,
          useEvmChains: useEvmChains,
          overrideTomoRpcUrls: overrideTomoRpcUrls,
        },
        supportedProviders.includes('TON') && !manifestUrl
          ? {
              error: 'TON Connect need manifestUrl!',
            }
          : {}
      );
    },
    [
      tmaid,
      tmakey,
      env,
      endpoints,
      userInfo,
      onLogin,
      onLogout,
      initDataUnsafe,
      tMAuthLink,
      onSendEmailCode,
      onVerifyEmailCode,
      onUpdateUserInfo,
      openConnectModal,
      closeConnectModal,
      connected,
      providers,
      connectResult,
      supportedProviders,
      isEvmConnected,
      manifestUrl,
      useEvmChains,
      overrideTomoRpcUrls,
    ]
  );
  return React__default.createElement(
    Proviers,
    null,
    React__default.createElement(
      TomoContext.Provider,
      {
        value: tomoProviderValue,
      },
      children,
      React__default.createElement(TomoModal, {
        opened: opened,
        onClose: closeConnectModal,
        title: 'Log in or sign up',
        manifestUrl: manifestUrl || './manifestUrl.json',
        close: true,
        setConnected: setConnected,
        supportedProviders: supportedProviders,
        supportedConnects: supportedConnects,
        setProviders: setProviders,
        tomoOptions: tomoOptions,
        theme: theme,
        connectOptions: connectOptions,
        setConnectResult: setConnectResult,
      })
    )
  );
};
var useTomo = function useTomo() {
  var context = useContext(TomoContext);
  if (context === undefined) {
    throw new Error('useTomo must be used within a TomoProvider');
  }
  if (context.error) {
    console.log(context.error);
    throw new Error(context.error);
  }
  return context;
};

var useSwapTokens = function useSwapTokens(_ref) {
  var chain = _ref.chain,
    content = _ref.content;
  var tomo = useTomo();
  var _useChains = useChains(),
    getChainNameById = _useChains.getChainNameById,
    getChainId = _useChains.getChainId;
  var swapTokenQuery = useSwapAllTokens({
    chain: getChainNameById(getChainId(chain)),
  });
  var swapTokenSearchQuery = useSwapAllTokensSearch({
    content: content,
    chain: filterSwapChainId(chain),
    config: {
      url: (tomo == null ? void 0 : tomo.endpoints[0]) + 'sky/api/',
      tmaid: tomo.tmaid,
      tmakey: tomo.tmakey,
    },
  });
  var tokens = useMemo(
    function () {
      if (!!content && swapTokenSearchQuery.data) {
        var _swapTokenSearchQuery;
        var swapSearchTokens =
          swapTokenSearchQuery == null ||
          (_swapTokenSearchQuery = swapTokenSearchQuery.data) == null
            ? void 0
            : _swapTokenSearchQuery.result;
        return swapSearchTokens ? swapSearchTokens : [];
      }
      if (swapTokenQuery.data) {
        var _swapTokenQuery$data;
        var swapTokens =
          swapTokenQuery == null ||
          (_swapTokenQuery$data = swapTokenQuery.data) == null
            ? void 0
            : _swapTokenQuery$data.result;
        var filterTokens = swapTokens || [];
        return filterTokens ? filterTokens : [];
      }
      return [];
    },
    [swapTokenQuery.data, swapTokenSearchQuery.data]
  );
  return {
    tokens: tokens,
    loading: !!content
      ? swapTokenSearchQuery.isLoading
      : swapTokenQuery.isLoading,
  };
};

function useBuildSwapTx(params, options) {
  return useQuery({
    queryKey: ['getSwapAllTokensV2Search', JSON.stringify(params)],
    queryFn: (function () {
      var _queryFn = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(
            function _callee$(_context) {
              while (1)
                switch ((_context.prev = _context.next)) {
                  case 0:
                    console.log('params', params);
                    if (!(!params.amount || params.amount == '0')) {
                      _context.next = 3;
                      break;
                    }
                    return _context.abrupt('return', null);
                  case 3:
                    _context.prev = 3;
                    _context.next = 6;
                    return buildSwapTxApi(params);
                  case 6:
                    return _context.abrupt('return', _context.sent);
                  case 9:
                    _context.prev = 9;
                    _context.t0 = _context['catch'](3);
                    if (
                      typeof (options == null ? void 0 : options.onError) ===
                      'function'
                    ) {
                      options.onError(_context.t0);
                    }
                    throw _context.t0;
                  case 13:
                  case 'end':
                    return _context.stop();
                }
            },
            _callee,
            null,
            [[3, 9]]
          );
        })
      );
      function queryFn() {
        return _queryFn.apply(this, arguments);
      }
      return queryFn;
    })(),
    refetchInterval: options.refetchInterval ? 2000 : false,
  });
}

var useOTC = function useOTC() {
  var _useTomoUserInfo = useTomoUserInfo(),
    evmAddress = _useTomoUserInfo.evmAddress;
  var showRamp = function showRamp(token) {
    var symbol = token.ramp_support
      ? token.ramp_support
      : 'BSC_' + token.symbol;
    var hostApiKey = 'zv6q5pv56u6tebstsrbcnbtxeb7twpz84jdxncwx';
    var hostAppName = 'tomo';
    var hostLogoUrl = 'https://pub.tomo.inc/TomoLogo.png';
    var swapAsset = symbol;
    var RampModal = new RampInstantSDK({
      containerNode: document.getElementById('root'),
      hostApiKey: hostApiKey,
      hostAppName: hostAppName,
      hostLogoUrl: hostLogoUrl,
      userAddress: evmAddress,
      swapAsset: swapAsset,
      // defaultAsset: symbol,
      // enabledFlows: enabledFlows,
      variant: 'auto',
    });
    RampModal.on('*', function (event) {
      return console.log('RampModal event', event);
    });
    RampModal.show();
  };
  return {
    showRamp: showRamp,
  };
};

function useOnRamp(_ref) {
  var type = _ref.type,
    rampType = _ref.rampType,
    token = _ref.token;
  var webApp = useWebApp();
  var _useOTC = useOTC(),
    showRamp = _useOTC.showRamp;
  var chain_id = token == null ? void 0 : token.chain_id;
  var _useChains = useChains(),
    chains = _useChains.chains;
  var chain = chains.find(function (c) {
    var _c$chain;
    if (!chain_id) {
      if ((token == null ? void 0 : token.symbol) == Web3Type.BTC) {
        return (c == null ? void 0 : c.type) == Web3Type.BTC;
      }
    }
    if (chain_id == mockSolEvmChainId) {
      return (c == null ? void 0 : c.type) == Web3Type.SOL;
    }
    return ((_c$chain = c.chain) == null ? void 0 : _c$chain.id) == chain_id;
  });
  var _useTomoUserInfo = useTomoUserInfo(),
    userInfo = _useTomoUserInfo.userInfo;
  var user = userInfo;
  var onContinue = function onContinue() {
    if (!token) return;
    if (type == 'buy') {
      if (rampType == 'ramp') {
        showRamp(token);
      } else {
        var _chain$name;
        var address =
          (chain == null ? void 0 : chain.type) == 'SOL'
            ? user == null
              ? void 0
              : user.solanaAddress
            : (chain == null ? void 0 : chain.type) == Web3Type.BTC
              ? user == null
                ? void 0
                : user.bitcoinP2trAddress
              : user == null
                ? void 0
                : user.v2Address;
        //token?.contract || token?.address || ZeroAddress
        var data = address + '}';
        var bytes = Buffer.from(data, 'utf8');
        var signature = createHash('sha512').update(bytes).digest('hex');
        var chainName =
          token != null && token.ramp_support
            ? token == null
              ? void 0
              : token.ramp_support.split('_')[0]
            : chain == null || (_chain$name = chain.name) == null
              ? void 0
              : _chain$name.toLocaleUpperCase();
        var tokenName =
          token != null && token.ramp_support // ? token.ramp_support
            ? token == null
              ? void 0
              : token.ramp_support.split('_')[1]
            : token == null
              ? void 0
              : token.symbol.toLocaleUpperCase();
        // &Currencies=${tokenName}
        // &networks=${chainName}
        var link =
          'https://exchange.mercuryo.io/?widget_id=ebadd34c-c7ff-4c43-8097-b5f66b8b5f11&currency=' +
          tokenName +
          '&network=' +
          chainName +
          '&address=' +
          address +
          '&signature=' +
          signature +
          '&type=buy&fix_currency=true';
        if (window.location.protocol == 'http:') {
          window.location.href = link;
        } else {
          return webApp.openLink(link);
        }
      }
    } else {
      var _chain$name2;
      var _chainName =
        token != null && token.mercuryo_support
          ? token == null
            ? void 0
            : token.mercuryo_support.split('_')[0]
          : chain == null || (_chain$name2 = chain.name) == null
            ? void 0
            : _chain$name2.toLocaleUpperCase();
      var _tokenName = token.mercuryo_support
        ? token == null
          ? void 0
          : token.mercuryo_support.split('_')[1]
        : token == null
          ? void 0
          : token.symbol.toLocaleUpperCase();
      var _link =
        'https://exchange.mercuryo.io/' +
        ('?currency=' + _tokenName + '&networks=' + _chainName + '&type=sell');
      if (window.location.protocol == 'http:') {
        window.location.href = _link;
      } else {
        return webApp.openLink(_link);
      }
    }
  };
  //  token?.ramp_support?.length
  var renderTitle = (
    type === 'buy'
      ? (token == null ? void 0 : token.ramp_support) &&
        (token == null ? void 0 : token.ramp_support.length) > 0
      : (token == null ? void 0 : token.mercuryo_support) &&
        (token == null ? void 0 : token.mercuryo_support.length) > 0
  )
    ? token == null
      ? void 0
      : token.symbol.toLocaleUpperCase()
    : 'Asset';
  return {
    onContinue: onContinue,
    title: renderTitle,
  };
}

var useTonTransactions = function useTonTransactions() {
  var queryHash = /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee(address, msgHash) {
          var res, item;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2;
                  return getTransactionsByInMessageHash(msgHash);
                case 2:
                  res = _context.sent;
                  if (!(res && res.length)) {
                    _context.next = 6;
                    break;
                  }
                  item = res.find(function (item) {
                    var walletAddress = Address.parse(item.account).toString({
                      bounceable: false,
                    });
                    return (
                      walletAddress.toLocaleLowerCase() ===
                      address.toLocaleLowerCase()
                    );
                  });
                  return _context.abrupt('return', item.hash);
                case 6:
                  return _context.abrupt('return', '');
                case 7:
                case 'end':
                  return _context.stop();
              }
          }, _callee);
        }
      )
    );
    return function queryHash(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();
  return {
    queryHash: queryHash,
  };
};

var _excluded = ['onConnect', 'resolve'],
  _excluded2 = ['onConnect'];
function Seamless(_ref) {
  var onConnect = _ref.onConnect,
    resolve = _ref.resolve,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeParams = useThemeParams(),
    ColorScheme = _useThemeParams[0];
  return createElement(
    TomoProvider,
    Object.assign(
      {
        theme: ColorScheme,
      },
      restProps
    ),
    createElement(Dummy, {
      onConnect: onConnect,
      onMounted: resolve,
    })
  );
}
function Dummy(_ref2) {
  var _providers$tomo_ton, _providers$tomo_ton2;
  var onConnect = _ref2.onConnect,
    onMounted = _ref2.onMounted;
  var _useTomo = useTomo(),
    openConnectModal = _useTomo.openConnectModal,
    providers = _useTomo.providers,
    connectResult = _useTomo.connectResult;
  useEffect(
    function () {
      window.openTomoConnectModal = openConnectModal;
      onMounted(true);
    },
    [openConnectModal]
  );
  useEffect(
    function () {
      console.log('connectResult>>>>>>>:', connectResult);
    },
    [connectResult]
  );
  useEffect(
    function () {
      var tomo_ton = providers.tomo_ton;
      if (
        tomo_ton != null &&
        tomo_ton.connected &&
        tomo_ton != null &&
        tomo_ton.account
      ) {
        onConnect({
          type: 'TON',
          provider: providers.tomo_ton,
        });
      }
    },
    [
      providers.tomo_ton,
      (_providers$tomo_ton = providers.tomo_ton) == null
        ? void 0
        : _providers$tomo_ton.connected,
      (_providers$tomo_ton2 = providers.tomo_ton) == null
        ? void 0
        : _providers$tomo_ton2.account,
    ]
  );
  useEffect(
    function () {
      var ethereum = providers.ethereum;
      if (ethereum) {
        onConnect({
          type: 'EVM',
          provider: ethereum,
        });
      }
    },
    [providers.ethereum]
  );
  return createElement(Fragment, null);
}
function initTomoModal(_ref3) {
  var _ref3$onConnect = _ref3.onConnect,
    onConnect = _ref3$onConnect === void 0 ? function () {} : _ref3$onConnect,
    restProps = _objectWithoutPropertiesLoose(_ref3, _excluded2);
  var div = document.createElement('div');
  div.id = 'tomo-seamless-modal';
  document.body.appendChild(div);
  return new Promise(function (resolve) {
    ReactDOM.render(
      createElement(
        Seamless,
        Object.assign(
          {
            onConnect: onConnect,
            resolve: resolve,
          },
          restProps
        )
      ),
      div
    );
  });
}

export {
  Dummy,
  Seamless,
  TomoContext,
  TomoProvider,
  defaultEndpoints,
  defaultTMAuthLink,
  initTomoModal,
  useBalance,
  useBiometricManager,
  useBuildSwapTx,
  useChains,
  useConfig,
  useMFAVerify,
  useOnRamp,
  usePaymentPasswd,
  useSendTransaction,
  useStore,
  useSwapTokens,
  useTomo,
  useTomoUserInfo,
  useTonTransactions,
  useTransactions,
  useUserTokens,
};
//# sourceMappingURL=tomo-telegram-sdk.esm.js.map
