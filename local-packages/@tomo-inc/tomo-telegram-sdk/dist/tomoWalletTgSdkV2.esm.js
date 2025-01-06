import 'zustand';
import { aj as _inheritsLoose, ak as ProviderUtils, q as _extends, al as BASE_URL, _ as _asyncToGenerator, a as _regeneratorRuntime, h as mockSolEvmChainId, am as sendTransaction, z as getSolBalance, j as mockTonChainId, ai as TonTxBodyType, an as _createClass, ao as mockTonTestnetChainId, x as getTonBalance, K as sendTransaction$1, U as EthereumProvider, ap as AppInfo } from './EthereumProvider-0d47aac9.js';
import 'axios';
import 'zustand/middleware';
import TonWeb from 'tonweb';
import 'viem';
import { Cell, fromNano } from '@ton/core';
import 'react';
import 'qs';
import 'uuid';
import EventEmitter from 'eventemitter3';
import 'buffer';
import { SuiClient } from '@mysten/sui/client';
import '@mysten/sui/utils';

var BasicProvider = /*#__PURE__*/function (_EventEmitter) {
  function BasicProvider(options) {
    var _this;
    _this = _EventEmitter.call(this) || this;
    _this.utils = new ProviderUtils(_extends({}, BASE_URL, options));
    _this.isConnected = false;
    return _this;
  }
  _inheritsLoose(BasicProvider, _EventEmitter);
  var _proto = BasicProvider.prototype;
  _proto.connect = /*#__PURE__*/function () {
    var _connect = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(method, params) {
      var _this$utils$getMethod, chainType, operation, account, res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _this$utils$getMethod = this.utils.getMethodInfo(method), chainType = _this$utils$getMethod[0], operation = _this$utils$getMethod[1];
            if (!(this.utils._accounts && this.utils._accounts[chainType])) {
              _context.next = 6;
              break;
            }
            account = this.utils._accounts[chainType];
            this.utils._account = account;
            this.isConnected = true;
            return _context.abrupt("return", account);
          case 6:
            _context.next = 8;
            return this.utils.request({
              method: method,
              params: params ? [params] : []
            });
          case 8:
            res = _context.sent;
            this.isConnected = true;
            return _context.abrupt("return", res);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function connect(_x, _x2) {
      return _connect.apply(this, arguments);
    }
    return connect;
  }();
  _proto.disconnect = /*#__PURE__*/function () {
    var _disconnect = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(method) {
      var _this$utils$getMethod2, chainType, operation;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _this$utils$getMethod2 = this.utils.getMethodInfo(method), chainType = _this$utils$getMethod2[0], operation = _this$utils$getMethod2[1];
            this.utils._account = null;
            this.utils.removeAccount(chainType);
            this.emit('accountsChanged', []);
            this.emit('disconnect', '');
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function disconnect(_x3) {
      return _disconnect.apply(this, arguments);
    }
    return disconnect;
  }();
  return BasicProvider;
}(EventEmitter);

var SolanaProvider = /*#__PURE__*/function (_BasicProvider) {
  function SolanaProvider(options) {
    var _this;
    _this = _BasicProvider.call(this, options) || this;
    _this.isConnected = false;
    _this.chainId = mockSolEvmChainId;
    _this.isConnected = false;
    _this._initialize();
    return _this;
  }
  _inheritsLoose(SolanaProvider, _BasicProvider);
  var _proto = SolanaProvider.prototype;
  _proto._initialize = function _initialize() {
    var _this$utils$storage$g;
    var account = (_this$utils$storage$g = this.utils.storage.get("accounts")) == null ? void 0 : _this$utils$storage$g.sol;
    if (account) {
      this.account = account;
      this.isConnected = true;
    }
  };
  _proto.connectWallet = /*#__PURE__*/function () {
    var _connectWallet = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
      var res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _BasicProvider.prototype.connect.call(this, 'sol_connectWallet', params);
          case 2:
            res = _context.sent;
            this.isConnected = true;
            this.account = res;
            return _context.abrupt("return", res);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function connectWallet(_x) {
      return _connectWallet.apply(this, arguments);
    }
    return connectWallet;
  }();
  _proto.disconnectWallet = /*#__PURE__*/function () {
    var _disconnectWallet = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.disconnect();
          case 2:
            this.isConnected = false;
            return _context2.abrupt("return", true);
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function disconnectWallet() {
      return _disconnectWallet.apply(this, arguments);
    }
    return disconnectWallet;
  }();
  _proto.sendTransaction = /*#__PURE__*/function () {
    var _sendTransaction = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(tx) {
      var res;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return sendTransaction(tx);
          case 2:
            res = _context3.sent;
            return _context3.abrupt("return", res);
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function sendTransaction$1(_x2) {
      return _sendTransaction.apply(this, arguments);
    }
    return sendTransaction$1;
  }();
  _proto.getBalance = /*#__PURE__*/function () {
    var _getBalance = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(address) {
      var _this$account;
      var res;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!address && !((_this$account = this.account) != null && _this$account.address))) {
              _context4.next = 2;
              break;
            }
            return _context4.abrupt("return", {
              balance: '0',
              formatted: '0'
            });
          case 2:
            _context4.next = 4;
            return getSolBalance({
              address: address || this.account.address,
              token: ''
            });
          case 4:
            res = _context4.sent;
            return _context4.abrupt("return", res);
          case 6:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function getBalance(_x3) {
      return _getBalance.apply(this, arguments);
    }
    return getBalance;
  }();
  _proto.signMessage = /*#__PURE__*/function () {
    var _signMessage = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(message) {
      var res;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return this.utils.request({
              method: 'sol_signMessage',
              params: [message, this.getAddress()]
            });
          case 2:
            res = _context5.sent;
            return _context5.abrupt("return", res.result);
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function signMessage(_x4) {
      return _signMessage.apply(this, arguments);
    }
    return signMessage;
  }();
  _proto.getAddress = function getAddress() {
    var _this$account2;
    return ((_this$account2 = this.account) == null ? void 0 : _this$account2.address) || '';
  };
  _proto.signTransaction = /*#__PURE__*/function () {
    var _signTransaction = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(tx) {
      var txHex, res;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (!(typeof (tx == null ? void 0 : tx.serialize) != 'function')) {
              _context6.next = 3;
              break;
            }
            console.error("warning: signTransaction using plain js object will be deprecated\nsignTransaction will only accept a Transaction Instance in the future\nfor simple transfer ops, please use 'transfer' method");
            return _context6.abrupt("return", this.transfer(tx));
          case 3:
            txHex = tx.serialize({
              requireAllSignatures: false,
              verifySignatures: false
            }).toString('hex');
            _context6.next = 6;
            return this.utils.request({
              method: 'sol_signTx',
              params: [{
                chainId: this.chainId,
                txHex: txHex
              }]
            });
          case 6:
            res = _context6.sent;
            return _context6.abrupt("return", res.result);
          case 8:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this);
    }));
    function signTransaction(_x5) {
      return _signTransaction.apply(this, arguments);
    }
    return signTransaction;
  }();
  _proto.transfer = /*#__PURE__*/function () {
    var _transfer = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(params) {
      var param, res;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            param = {
              method: 'sol_signTransaction',
              params: [_extends({}, params, {
                chainId: this.chainId
              })]
            };
            _context7.next = 3;
            return this.utils.request(param);
          case 3:
            res = _context7.sent;
            return _context7.abrupt("return", res.result);
          case 5:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this);
    }));
    function transfer(_x6) {
      return _transfer.apply(this, arguments);
    }
    return transfer;
  }();
  _proto.transferToken = /*#__PURE__*/function () {
    var _transferToken = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(params) {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", this.transfer(params));
          case 1:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this);
    }));
    function transferToken(_x7) {
      return _transferToken.apply(this, arguments);
    }
    return transferToken;
  }() // TODO:
  // async signTransactions(params: any[]) {
  //   const res = await this.utils.request({
  //     method: 'sol_signTransaction',
  //     params: params,
  //   });
  //   return res.result;
  // }
  ;
  _proto.disconnect =
  /*#__PURE__*/
  function () {
    var _disconnect = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            this.account = null;
            _BasicProvider.prototype.disconnect.call(this, 'sol_disconnect');
          case 2:
          case "end":
            return _context9.stop();
        }
      }, _callee9, this);
    }));
    function disconnect() {
      return _disconnect.apply(this, arguments);
    }
    return disconnect;
  }();
  return SolanaProvider;
}(BasicProvider);

function hexToBase64(hex) {
  // Convert hex to bytes
  var bytes = Buffer.from(hex, 'hex');
  // Encode bytes to Base64
  return bytes.toString('base64');
}

function parsingTonTxPayload(payloadHex) {
  var cell = Cell.fromBase64(hexToBase64(payloadHex));
  var slice = cell.beginParse();
  var operationCode = slice.loadUint(32);
  var queryId = slice.loadUintBig(64);
  var amount = slice.loadCoins();
  var destination = slice.loadAddress();
  return {
    operationCode: operationCode,
    queryId: queryId,
    amount: amount,
    destination: destination
  };
}

function checkIsJettonWallet(_x) {
  return _checkIsJettonWallet.apply(this, arguments);
}
function _checkIsJettonWallet() {
  _checkIsJettonWallet = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(jettonWalletAddress) {
    var tonweb, jettonWallet, data, jettonMinterAddress;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          tonweb = new TonWeb(new TonWeb.HttpProvider());
          jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
            address: jettonWalletAddress
          });
          _context.prev = 2;
          _context.next = 5;
          return jettonWallet.getData();
        case 5:
          data = _context.sent;
          jettonMinterAddress = data.jettonMinterAddress.toString(true, true, true);
          console.log('Jetton Minter Address:', jettonMinterAddress);
          console.log('This address is a valid Jetton Wallet address.');
          return _context.abrupt("return", jettonMinterAddress);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);
          console.log(jettonWalletAddress + " doesn't seems to be a jetton");
          return _context.abrupt("return", false);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 12]]);
  }));
  return _checkIsJettonWallet.apply(this, arguments);
}

function isValidHex(str) {
  return /^[0-9A-Fa-f]+$/.test(str);
}

function base64ToHex(base64) {
  // Decode the Base64 string to a binary string
  var binaryString = atob(base64);
  var hexString = '';
  // Convert each character in the binary string to hexadecimal
  for (var i = 0; i < binaryString.length; i++) {
    var hexChar = binaryString.charCodeAt(i).toString(16);
    // Ensure two-digit representation
    hexString += hexChar.length === 2 ? hexChar : '0' + hexChar;
  }
  return hexString.toUpperCase(); // Convert to uppercase for consistency
}

var TonProvider = /*#__PURE__*/function (_BasicProvider) {
  function TonProvider(options) {
    var _this;
    _this = _BasicProvider.call(this, options) || this;
    _this.chainId = mockTonChainId;
    _this.isConnected = false;
    _this._initialize();
    return _this;
  }
  _inheritsLoose(TonProvider, _BasicProvider);
  var _proto = TonProvider.prototype;
  _proto._initialize = function _initialize() {
    var _this$utils$storage$g;
    var account = (_this$utils$storage$g = this.utils.storage.get("accounts")) == null ? void 0 : _this$utils$storage$g.ton;
    if (account) {
      this.account = account;
      this.isConnected = true;
      this.chainId = account.chainId || mockTonChainId;
    }
  }
  // @ts-ignore this is still not elegant
  ;
  _proto.connect =
  /*#__PURE__*/
  function () {
    var _connect = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
      var _params$workChain, res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if ((params == null ? void 0 : params.network) === 'testnet') {
              this.chainId = mockTonTestnetChainId;
              params.chainId = mockTonTestnetChainId;
            }
            if (params != null && params.tonProof) {
              params.domain = params.domain || window.location.hostname;
              params.workChain = (_params$workChain = params.workChain) != null ? _params$workChain : 0;
              params.chainId = mockTonChainId;
            }
            _context.next = 4;
            return _BasicProvider.prototype.connect.call(this, 'ton_connectWallet', params);
          case 4:
            _context.t0 = _context.sent;
            if (_context.t0) {
              _context.next = 7;
              break;
            }
            _context.t0 = {
              address: ''
            };
          case 7:
            res = _context.t0;
            if (res.address) {
              this.account = res;
              this.isConnected = true;
            }
            return _context.abrupt("return", res);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function connect(_x) {
      return _connect.apply(this, arguments);
    }
    return connect;
  }();
  _proto.restoreConnection = /*#__PURE__*/function () {
    var _restoreConnection = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", this.getAddress());
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function restoreConnection() {
      return _restoreConnection.apply(this, arguments);
    }
    return restoreConnection;
  }();
  _proto.getAddress = function getAddress() {
    var _this$account;
    return ((_this$account = this.account) == null ? void 0 : _this$account.address) || '';
  };
  _proto.getBalance = /*#__PURE__*/function () {
    var _getBalance = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(address) {
      var _this$account2;
      var res;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!address && !((_this$account2 = this.account) != null && _this$account2.address))) {
              _context3.next = 2;
              break;
            }
            return _context3.abrupt("return", {
              balance: '0',
              formatted: '0'
            });
          case 2:
            _context3.next = 4;
            return getTonBalance({
              tonAddress: address || this.account.address,
              chainId: this.chainId
            });
          case 4:
            res = _context3.sent;
            return _context3.abrupt("return", res);
          case 6:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function getBalance(_x2) {
      return _getBalance.apply(this, arguments);
    }
    return getBalance;
  }();
  _proto.signTransaction = /*#__PURE__*/function () {
    var _signTransaction = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(txs) {
      var _this2 = this;
      var newTxs, res;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            newTxs = txs.map(function (v) {
              return _extends({
                chainId: _this2.chainId,
                publicKey: _this2.account.publicKey
              }, v);
            });
            _context4.next = 3;
            return this.utils.request({
              method: 'ton_signTransaction',
              params: [].concat(newTxs)
            });
          case 3:
            res = _context4.sent;
            return _context4.abrupt("return", res);
          case 5:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function signTransaction(_x3) {
      return _signTransaction.apply(this, arguments);
    }
    return signTransaction;
  }();
  _proto.signTx = /*#__PURE__*/function () {
    var _signTx = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(txs) {
      var _this3 = this;
      var newTxs, res;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            console.log('this.chainId', this.chainId);
            newTxs = txs.map(function (v) {
              return _extends({
                chainId: _this3.chainId,
                publicKey: _this3.account.publicKey
              }, v);
            });
            _context5.next = 4;
            return this.utils.request({
              method: 'ton_signTx',
              params: [].concat(newTxs)
            });
          case 4:
            res = _context5.sent;
            return _context5.abrupt("return", res);
          case 6:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function signTx(_x4) {
      return _signTx.apply(this, arguments);
    }
    return signTx;
  }();
  _proto.sendTransaction = /*#__PURE__*/function () {
    var _sendTransaction = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(params) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", this.sendTx(params));
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this);
    }));
    function sendTransaction(_x5) {
      return _sendTransaction.apply(this, arguments);
    }
    return sendTransaction;
  }();
  _proto.sendTx = /*#__PURE__*/function () {
    var _sendTx = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(params) {
      var messages, from, txParam, signRes, res;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            if (!params.from) params.from = this.getAddress();
            messages = params.messages, from = params.from;
            if (!(messages.length === 0)) {
              _context7.next = 4;
              break;
            }
            throw new Error('No messages');
          case 4:
            _context7.next = 6;
            return this.parsePayloadAsStandard(params);
          case 6:
            txParam = _context7.sent;
            this.checkValue(txParam);
            console.log({
              txParam: txParam
            });
            _context7.next = 11;
            return this.signTx([txParam]);
          case 11:
            signRes = _context7.sent;
            _context7.next = 14;
            return sendTransaction$1(signRes.result, '', this.chainId);
          case 14:
            res = _context7.sent;
            return _context7.abrupt("return", res);
          case 16:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this);
    }));
    function sendTx(_x6) {
      return _sendTx.apply(this, arguments);
    }
    return sendTx;
  }();
  _proto.checkValue = function checkValue(param) {
    try {
      fromNano(param.body.messages[0].amount);
    } catch (e) {
      throw new Error('amount must in the format of nanoTon');
    }
  }
  /**
   * @deprecated no longer maintained in the future
   */;
  _proto.parsePayloadAsJSON = function parsePayloadAsJSON(body, payload) {
    var payloadObj = JSON.parse(payload);
    var contractAddr = payloadObj.contractAddr,
      precision = payloadObj.precision,
      forwardAmount = payloadObj.forwardAmount,
      memo = payloadObj.memo;
    return _extends({}, body, {
      contractAddress: contractAddr,
      precision: precision,
      forwardAmount: forwardAmount,
      memo: memo,
      type: TonTxBodyType.JETTON_PAYLOAD_JSON_LEGACY
    });
  };
  _proto.parsePayloadAsStandard = /*#__PURE__*/function () {
    var _parsePayloadAsStandard = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(tonTx) {
      var _tonTx$messages, _tonTx$messages$, payload, toAddress, result, payloadHex, jettonMinterAddress, _parsingTonTxPayload, amount, destination;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _tonTx$messages = tonTx.messages, _tonTx$messages$ = _tonTx$messages[0], payload = _tonTx$messages$.payload, toAddress = _tonTx$messages$.address;
            result = {
              type: TonTxBodyType.STANDARD,
              body: tonTx
            };
            if (payload) {
              _context8.next = 4;
              break;
            }
            return _context8.abrupt("return", result);
          case 4:
            payloadHex = payload;
            if (!isValidHex(payloadHex)) {
              // auto convert base64 to hex
              payloadHex = base64ToHex(payloadHex);
              result.body.messages[0].payload = payloadHex;
            }
            _context8.next = 8;
            return checkIsJettonWallet(toAddress);
          case 8:
            jettonMinterAddress = _context8.sent;
            if (jettonMinterAddress) {
              _context8.next = 11;
              break;
            }
            return _context8.abrupt("return", result);
          case 11:
            try {
              _parsingTonTxPayload = parsingTonTxPayload(payloadHex), amount = _parsingTonTxPayload.amount, destination = _parsingTonTxPayload.destination;
              result.jettonInfo = {
                recipientAddress: destination.toString(),
                amount: amount.toString(),
                jettonMinterAddress: jettonMinterAddress
              };
            } catch (e) {
              console.log('parse payload failed, pass');
              // throw 'call contract other than jetton is not supported yet';
            }
            return _context8.abrupt("return", result);
          case 13:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function parsePayloadAsStandard(_x7) {
      return _parsePayloadAsStandard.apply(this, arguments);
    }
    return parsePayloadAsStandard;
  }();
  _proto.disconnect = /*#__PURE__*/function () {
    var _disconnect = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            this.account = null;
            _BasicProvider.prototype.disconnect.call(this, 'ton_disconnect');
          case 2:
          case "end":
            return _context9.stop();
        }
      }, _callee9, this);
    }));
    function disconnect() {
      return _disconnect.apply(this, arguments);
    }
    return disconnect;
  }();
  return _createClass(TonProvider, [{
    key: "connected",
    get: function get() {
      return this.isConnected;
    }
  }]);
}(BasicProvider);

var suiEndPoint = 'https://fullnode.mainnet.sui.io:443';
var suiClient = /*#__PURE__*/new SuiClient({
  url: suiEndPoint
});
var sendSuiTx = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var bytes, signature, res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          bytes = _ref.bytes, signature = _ref.signature;
          _context.next = 3;
          return suiClient.executeTransactionBlock({
            transactionBlock: bytes,
            signature: signature
          });
        case 3:
          res = _context.sent;
          return _context.abrupt("return", res);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendSuiTx(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var SuiProvider = /*#__PURE__*/function (_BasicProvider) {
  function SuiProvider(options) {
    var _this;
    _this = _BasicProvider.call(this, options) || this;
    _this.isConnected = false;
    _this.chainId = 784;
    _this.isConnected = false;
    _this._initialize();
    return _this;
  }
  _inheritsLoose(SuiProvider, _BasicProvider);
  var _proto = SuiProvider.prototype;
  _proto._initialize = function _initialize() {
    var _this$utils$storage$g;
    var account = (_this$utils$storage$g = this.utils.storage.get("accounts")) == null ? void 0 : _this$utils$storage$g.sui;
    if (account) {
      this.account = account;
      this.isConnected = true;
    }
  }
  // change name to connect? like okx? 
  ;
  _proto.connectWallet =
  /*#__PURE__*/
  function () {
    var _connectWallet = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
      var res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _BasicProvider.prototype.connect.call(this, 'sui_connectWallet', params);
          case 2:
            res = _context.sent;
            this.isConnected = true;
            this.account = res;
            console.log('sui connect res', res);
            return _context.abrupt("return", res);
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function connectWallet(_x) {
      return _connectWallet.apply(this, arguments);
    }
    return connectWallet;
  }() // change name to disconnect? like okx?
  ;
  _proto.disconnectWallet =
  /*#__PURE__*/
  function () {
    var _disconnectWallet = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.disconnect();
          case 2:
            this.isConnected = false;
            return _context2.abrupt("return", true);
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function disconnectWallet() {
      return _disconnectWallet.apply(this, arguments);
    }
    return disconnectWallet;
  }();
  _proto.getAccount = function getAccount() {
    return this.account;
  }
  // remove?
  ;
  _proto.getAddress = function getAddress() {
    var _this$account;
    return ((_this$account = this.account) == null ? void 0 : _this$account.address) || '';
  };
  _proto.sendTransaction = /*#__PURE__*/function () {
    var _sendTransaction = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(p) {
      var res;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return sendSuiTx(p);
          case 2:
            res = _context3.sent;
            return _context3.abrupt("return", res);
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function sendTransaction(_x2) {
      return _sendTransaction.apply(this, arguments);
    }
    return sendTransaction;
  }() // message type align with okx?
  ;
  _proto.signMessage =
  /*#__PURE__*/
  function () {
    var _signMessage = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(message) {
      var res;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.utils.request({
              method: 'sui_signMessage',
              params: [message]
            });
          case 2:
            res = _context4.sent;
            return _context4.abrupt("return", res.result);
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function signMessage(_x3) {
      return _signMessage.apply(this, arguments);
    }
    return signMessage;
  }() // message type align with okx?
  ;
  _proto.signPersonalMessage =
  /*#__PURE__*/
  function () {
    var _signPersonalMessage = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(message) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", this.signMessage(message));
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function signPersonalMessage(_x4) {
      return _signPersonalMessage.apply(this, arguments);
    }
    return signPersonalMessage;
  }();
  _proto.signTransaction = /*#__PURE__*/function () {
    var _signTransaction = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(params) {
      var res;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return this.utils.request({
              method: 'sui_signTransaction',
              params: [_extends({}, params, {
                chainId: this.chainId
              })]
            });
          case 2:
            res = _context6.sent;
            return _context6.abrupt("return", res.result);
          case 4:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this);
    }));
    function signTransaction(_x5) {
      return _signTransaction.apply(this, arguments);
    }
    return signTransaction;
  }();
  _proto.signAndExecuteTransaction = /*#__PURE__*/function () {
    var _signAndExecuteTransaction = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(params) {
      var tx;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return this.signTransaction(params);
          case 2:
            tx = _context7.sent;
            return _context7.abrupt("return", this.sendTransaction({
              bytes: params.txBytes,
              signature: tx
            }));
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this);
    }));
    function signAndExecuteTransaction(_x6) {
      return _signAndExecuteTransaction.apply(this, arguments);
    }
    return signAndExecuteTransaction;
  }();
  _proto.disconnect = /*#__PURE__*/function () {
    var _disconnect = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            this.account = null;
            _BasicProvider.prototype.disconnect.call(this, 'sui_disconnect');
          case 2:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this);
    }));
    function disconnect() {
      return _disconnect.apply(this, arguments);
    }
    return disconnect;
  }();
  return SuiProvider;
}(BasicProvider);

var WalletTgSdk = /*#__PURE__*/function (_Eventemitter) {
  function WalletTgSdk(options) {
    var _this;
    _this = _Eventemitter.call(this) || this;
    _this.version = AppInfo.version;
    _this.getAppInfo = function () {
      return _extends({}, AppInfo);
    };
    var metaData = options == null ? void 0 : options.metaData;
    _this.connectUrl = (options == null ? void 0 : options.connect) || BASE_URL.connect;
    _this.bridgeUrl = (options == null ? void 0 : options.bridge) || BASE_URL.bridge;
    _this.connect_direct_link = (options == null ? void 0 : options.connect_direct_link) || BASE_URL.connect_direct_link;
    _this.injected = (options == null ? void 0 : options.injected) || false;
    _this.metaData = {
      icon: metaData == null ? void 0 : metaData.icon,
      name: metaData == null ? void 0 : metaData.name,
      url: metaData == null ? void 0 : metaData.url,
      direct_link: metaData == null ? void 0 : metaData.direct_link,
      description: metaData == null ? void 0 : metaData.description
    };
    _this._initialize();
    return _this;
  }
  _inheritsLoose(WalletTgSdk, _Eventemitter);
  var _proto = WalletTgSdk.prototype;
  _proto._initialize = function _initialize() {
    //initialize provider
    this.ethereum = new EthereumProvider({
      connect: this.connectUrl,
      bridge: this.bridgeUrl,
      connect_direct_link: this.connect_direct_link,
      metaData: this.metaData
    });
    this.solana = new SolanaProvider({
      connect: this.connectUrl,
      bridge: this.bridgeUrl,
      connect_direct_link: this.connect_direct_link,
      metaData: this.metaData
    });
    this.tomo_ton = new TonProvider({
      connect: this.connectUrl,
      bridge: this.bridgeUrl,
      connect_direct_link: this.connect_direct_link,
      metaData: this.metaData
    });
    this.tomo_sui = new SuiProvider({
      connect: this.connectUrl,
      bridge: this.bridgeUrl,
      connect_direct_link: this.connect_direct_link,
      metaData: this.metaData
    });
    // this.bitcoin = new BitcoinProvider({
    //   connect: this.connectUrl,
    //   bridge: this.bridgeUrl,
    //   connect_direct_link: this.connect_direct_link,
    //   metaData: this.metaData,
    // });
    if (this.injected) {
      if (!window.ethereum) {
        window.ethereum = this.ethereum;
        // window.tg_tomo_btc = this.bitcoin;
        dispatchEvent(new Event('ethereum#initialized'));
      }
      if (!window.tomo_sol) {
        window.tomo_sol = this.solana;
        dispatchEvent(new Event('tomo_sol#initialized'));
      }
      if (!window.tomo_ton) {
        window.tomo_ton = this.tomo_ton;
        dispatchEvent(new Event('tomo_ton#initialized'));
      }
      if (!window.tomo_sui) {
        window.tomo_sui = this.tomo_sui;
        dispatchEvent(new Event('tomo_sui#initialized'));
      }
    }
    this.emit('_initialized');
  };
  return WalletTgSdk;
}(EventEmitter);

export default WalletTgSdk;
//# sourceMappingURL=tomoWalletTgSdkV2.esm.js.map
