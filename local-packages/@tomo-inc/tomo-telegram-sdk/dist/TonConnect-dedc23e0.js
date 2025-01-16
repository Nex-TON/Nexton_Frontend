'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('zustand');
var tomoEvmProvider = require('./EthereumProvider-225fd49a.js');
require('axios');
require('zustand/middleware');
require('tonweb');
require('viem');
require('@ton/core');
var React = require('react');
var React__default = _interopDefault(React);
require('qs');
require('uuid');
require('eventemitter3');
require('buffer');
require('@tonconnect/ui');
var index = require('./index-9bc5e99b.js');

var useTonConnect = function useTonConnect(option) {
  var _tonConnectUI$account2;
  var _ref = option || {},
    connectSuccess = _ref.connectSuccess,
    setProviders = _ref.setProviders,
    setConnectResult = _ref.setConnectResult;
  var _useTonConnectUI = index.useTonConnectUI(),
    tonConnectUI = _useTonConnectUI[0];
  var _useTonConnectModal = index.useTonConnectModal(),
    open = _useTonConnectModal.open;
  var storage = tomoEvmProvider.useProxyLocalStorage();
  var connect = /*#__PURE__*/function () {
    var _ref2 = tomoEvmProvider._asyncToGenerator(/*#__PURE__*/tomoEvmProvider._regeneratorRuntime().mark(function _callee(connectParams) {
      return tomoEvmProvider._regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (connectParams != null && connectParams.tonProof) {
              tonConnectUI.setConnectRequestParameters({
                state: 'ready',
                value: {
                  tonProof: connectParams.tonProof
                }
              });
            }
            open();
            return _context.abrupt("return", 'connect');
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function connect(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var connectType = storage.get('connect_type');
  React.useEffect(function () {
    if (connectType === 'TON' && !tonConnectUI.connected) {
      disconnect();
    }
  }, [tonConnectUI.connected, connectType]);
  var disconnect = /*#__PURE__*/function () {
    var _ref3 = tomoEvmProvider._asyncToGenerator(/*#__PURE__*/tomoEvmProvider._regeneratorRuntime().mark(function _callee2() {
      return tomoEvmProvider._regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            setProviders(function (pre) {
              return tomoEvmProvider._extends({}, pre, {
                tomo_ton: null
              });
            });
            storage.set('accounts', tomoEvmProvider._extends({}, storage.get('accounts') || {}, {
              ton: undefined
            }));
            window.tomo_ton = null;
            storage.set('connect_type', '');
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function disconnect() {
      return _ref3.apply(this, arguments);
    };
  }();
  React.useEffect(function () {
    var _tonConnectUI$account;
    if (tonConnectUI.connected && (_tonConnectUI$account = tonConnectUI.account) != null && _tonConnectUI$account.address) {
      // is connected
      connectSuccess && connectSuccess();
      var account = tonConnectUI.account;
      storage.set('accounts', tomoEvmProvider._extends({}, storage.get('accounts') || {}, {
        ton: account
      }));
      storage.set('connect_type', 'TON');
      Object.defineProperty(tonConnectUI, 'getBalance', {
        value: function () {
          var _value = tomoEvmProvider._asyncToGenerator(/*#__PURE__*/tomoEvmProvider._regeneratorRuntime().mark(function _callee3() {
            return tomoEvmProvider._regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", tomoEvmProvider.getTonBalance({
                    tonAddress: account.address
                  }));
                case 1:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          function value() {
            return _value.apply(this, arguments);
          }
          return value;
        }(),
        writable: true,
        enumerable: true,
        configurable: false
      });
      window.tomo_ton = tonConnectUI;
      setProviders && setProviders(function (pre) {
        return tomoEvmProvider._extends({}, pre || {}, {
          tomo_ton: tonConnectUI
        });
      });
    }
  }, [tonConnectUI.connected, (_tonConnectUI$account2 = tonConnectUI.account) == null ? void 0 : _tonConnectUI$account2.address]);
  React.useEffect(function () {
    var unsub = tonConnectUI.onStatusChange(function (wallet) {
      var _wallet$connectItems;
      if (wallet != null && (_wallet$connectItems = wallet.connectItems) != null && _wallet$connectItems.tonProof && "proof" in wallet.connectItems.tonProof) {
        setConnectResult({
          result: {
            tonProof: wallet.connectItems.tonProof
          }
        });
      }
    });
    return function () {
      unsub();
    };
  }, [tonConnectUI]);
  return {
    connect: connect,
    disconnect: disconnect,
    connected: (tonConnectUI == null ? void 0 : tonConnectUI.connected) || false
  };
};

var TonConnect = function TonConnect(_ref) {
  var closeModal = _ref.closeModal,
    setProviders = _ref.setProviders,
    setConnectResult = _ref.setConnectResult,
    updateTonConnect = _ref.updateTonConnect;
  var _useTonConnect = useTonConnect({
      connectSuccess: closeModal,
      setProviders: setProviders,
      setConnectResult: setConnectResult
    }),
    connect = _useTonConnect.connect,
    connected = _useTonConnect.connected;
  React.useEffect(function () {
    updateTonConnect({
      connect: connect,
      connected: connected
    });
  }, [connect, connected]);
  // lazy load and connect immediately
  React.useEffect(function () {
    connect();
  }, []);
  return React__default.createElement(React__default.Fragment, null);
};

exports.default = TonConnect;
//# sourceMappingURL=TonConnect-dedc23e0.js.map
