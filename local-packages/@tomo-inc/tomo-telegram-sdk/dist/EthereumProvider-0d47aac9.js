import { create } from 'zustand';
import axios from 'axios';
import { devtools, persist } from 'zustand/middleware';
import TonWeb from 'tonweb';
import { formatUnits } from 'viem';
import { SendMode } from '@ton/core';
import { useState, useEffect } from 'react';
import qs from 'qs';
import 'uuid';
import EventEmitter from 'eventemitter3';
import { Buffer as Buffer$1 } from 'buffer';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return _wrapNativeSuper = function (t) {
    if (null === t || !_isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return _construct(t, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(Wrapper, t);
  }, _wrapNativeSuper(t);
}

var passkeyKey = 'tomo_passkey';

var persistedState = /*#__PURE__*/persist(function (set) {
  return {
    deviceId: undefined,
    setDeviceId: function setDeviceId(deviceId) {
      return set({
        deviceId: deviceId
      });
    },
    user: undefined,
    setUser: function setUser(user) {
      return set({
        user: user
      });
    },
    transactions: {},
    setTransactions: function setTransactions(transactions) {
      return set({
        transactions: transactions
      });
    }
  };
}, {
  name: 'tomo-local'
});
var useLocalStore = /*#__PURE__*/create(/*#__PURE__*/devtools(persistedState));
var localStore = useLocalStore;

var getUserToken = function getUserToken() {
  try {
    var store = localStore.getState();
    var user = store == null ? void 0 : store.user;
    if (user) {
      var _user$token;
      return (_user$token = user == null ? void 0 : user.token) != null ? _user$token : '';
    } else {
      return '';
    }
  } catch (e) {
    return '';
  }
};
var getDeviceId = function getDeviceId() {
  try {
    var store = localStore.getState();
    var deviceId = store == null ? void 0 : store.deviceId;
    if (deviceId) {
      return deviceId;
    } else {
      return '';
    }
  } catch (e) {
    return '';
  }
};

var successCode = 8000;
var api = {
  index: undefined,
  bot: undefined,
  tomo: undefined,
  auth: undefined,
  pk: undefined,
  sun: undefined,
  init: function init(endpoints, tmaid, tmakey) {
    var endPoints = {
      bot: endpoints[0] + 'moon/',
      auth: endpoints[0] + 'wind/',
      pk: endpoints[0] + 'rain/',
      sun: endpoints[0] + 'sun/',
      tomo: endpoints[0] + 'sky/api/'
    };
    this.bot = axios.create({
      baseURL: endPoints.bot
    });
    this.auth = axios.create({
      baseURL: endPoints.auth
    });
    this.pk = axios.create({
      baseURL: endPoints.pk
    });
    this.sun = axios.create({
      baseURL: endPoints.sun
    });
    this.tomo = axios.create({
      baseURL: endPoints.tomo
    });
    [this.index, this.tomo, this.auth, this.bot, this.pk, this.sun].forEach(function (apiItem) {
      if (!apiItem) return;
      apiItem.interceptors.request.use(function (config) {
        // if (config.baseURL != endpoints[0] + 'bot-server/') {
        Object.defineProperty(config.headers, 'X-TOMO-TMA-USERID', {
          value: tmaid,
          writable: true,
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(config.headers, 'X-TOMO-TMA-KEY', {
          value: tmakey,
          writable: true,
          enumerable: true,
          configurable: true
        });
        // }
        var passKey = getPassKey();
        if (passKey && config.baseURL === endPoints.pk) {
          config.headers.mfa = passKey;
        }
        if (passKey && config.baseURL === endPoints.tomo && config.url != 'token/swapList') {
          config.headers.mfa = passKey;
        }
        var token = getUserToken();
        if (token && config.url != 'token/swapList') {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      }, function (error) {
        var _error$response;
        console.log('null', error);
        if ((error == null || (_error$response = error.response) == null ? void 0 : _error$response.status) === 401) {
          return Promise.reject(error);
        }
        return null;
      });
    });
  }
};
var GatewayError = /*#__PURE__*/function (_Error) {
  function GatewayError(message, code) {
    var _this;
    if (code === void 0) {
      code = 0;
    }
    _this = _Error.call(this, message) || this;
    _this.name = _this.constructor.name;
    _this.code = code;
    return _this;
  }
  _inheritsLoose(GatewayError, _Error);
  return GatewayError;
}(/*#__PURE__*/_wrapNativeSuper(Error));
var pkCallback = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(callback) {
    var res, _err$response, _err$response2, _err$response3;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return callback();
        case 3:
          res = _context.sent;
          if (!(!res || !res.data)) {
            _context.next = 6;
            break;
          }
          throw new GatewayError('Failed to get data', 500);
        case 6:
          return _context.abrupt("return", res.data);
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          if (!(_context.t0 != null && (_err$response = _context.t0.response) != null && (_err$response = _err$response.data) != null && _err$response.message)) {
            _context.next = 14;
            break;
          }
          throw new GatewayError(_context.t0 == null || (_err$response2 = _context.t0.response) == null || (_err$response2 = _err$response2.data) == null ? void 0 : _err$response2.message, _context.t0 == null || (_err$response3 = _context.t0.response) == null || (_err$response3 = _err$response3.data) == null ? void 0 : _err$response3.code);
        case 14:
          throw _context.t0;
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function pkCallback(_x) {
    return _ref.apply(this, arguments);
  };
}();
var authCallback = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(callback) {
    var res, _err$response4, _err$response5, _err$response6;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return callback();
        case 3:
          res = _context2.sent;
          if (!(!res || !res.data)) {
            _context2.next = 6;
            break;
          }
          throw new GatewayError('Failed to get data', 500);
        case 6:
          return _context2.abrupt("return", res.data);
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          if (!(_context2.t0 != null && (_err$response4 = _context2.t0.response) != null && (_err$response4 = _err$response4.data) != null && _err$response4.message)) {
            _context2.next = 14;
            break;
          }
          throw new GatewayError(_context2.t0 == null || (_err$response5 = _context2.t0.response) == null || (_err$response5 = _err$response5.data) == null ? void 0 : _err$response5.message, _context2.t0 == null || (_err$response6 = _context2.t0.response) == null || (_err$response6 = _err$response6.data) == null ? void 0 : _err$response6.code);
        case 14:
          throw _context2.t0;
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function authCallback(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var sunCallback = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(callback) {
    var res, _err$response7, _err$response8, _err$response9;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return callback();
        case 3:
          res = _context3.sent;
          if (!(!res || !res.data)) {
            _context3.next = 6;
            break;
          }
          throw new GatewayError('Failed to get data', 500);
        case 6:
          return _context3.abrupt("return", res.data);
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          if (!(_context3.t0 != null && (_err$response7 = _context3.t0.response) != null && (_err$response7 = _err$response7.data) != null && _err$response7.message)) {
            _context3.next = 14;
            break;
          }
          throw new GatewayError(_context3.t0 == null || (_err$response8 = _context3.t0.response) == null || (_err$response8 = _err$response8.data) == null ? void 0 : _err$response8.message, _context3.t0 == null || (_err$response9 = _context3.t0.response) == null || (_err$response9 = _err$response9.data) == null ? void 0 : _err$response9.code);
        case 14:
          throw _context3.t0;
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function sunCallback(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var tomoCallback = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(callback) {
    var res;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return callback();
        case 2:
          res = _context4.sent;
          if (!(res.code != 10000)) {
            _context4.next = 5;
            break;
          }
          throw new GatewayError(res.message, res.code);
        case 5:
          return _context4.abrupt("return", res);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function tomoCallback(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var getPassKey = function getPassKey() {
  try {
    var token = localStorage.getItem(passkeyKey);
    return token != null ? token : '';
  } catch (e) {
    return null;
  }
};
var loginApi = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(initData) {
    var _api$bot, res;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (_api$bot = api.bot) == null ? void 0 : _api$bot.get("login?" + initData);
        case 3:
          res = _context5.sent;
          return _context5.abrupt("return", res == null ? void 0 : res.data);
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          if (!(_context5.t0.response.status == 401)) {
            _context5.next = 12;
            break;
          }
          throw new GatewayError(_context5.t0.response.data, 401);
        case 12:
          throw _context5.t0;
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function loginApi(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var checkLoginByCodeApi = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(session_code) {
    var _api$bot2, res;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (_api$bot2 = api.bot) == null ? void 0 : _api$bot2.get("session/token", {
            headers: {
              'session-code': session_code
            }
          });
        case 3:
          res = _context6.sent;
          return _context6.abrupt("return", res == null ? void 0 : res.data);
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          if (!(_context6.t0.response.status == 401)) {
            _context6.next = 12;
            break;
          }
          throw new GatewayError('Not logged in', 401);
        case 12:
          throw _context6.t0;
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function checkLoginByCodeApi(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var pkRegApi = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(device_no) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return pkCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            var _api$pk;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return (_api$pk = api.pk) == null ? void 0 : _api$pk.post('v2/reg/' + device_no, {});
                case 2:
                  return _context7.abrupt("return", _context7.sent);
                case 3:
                case "end":
                  return _context7.stop();
              }
            }, _callee7);
          })));
        case 2:
          return _context8.abrupt("return", _context8.sent);
        case 3:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function pkRegApi(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var pkCreateApi = /*#__PURE__*/function () {
  var _ref9 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
            var _api$auth;
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return (_api$auth = api.auth) == null ? void 0 : _api$auth.post('v2/passkey/create/', data);
                case 2:
                  return _context9.abrupt("return", _context9.sent);
                case 3:
                case "end":
                  return _context9.stop();
              }
            }, _callee9);
          })));
        case 2:
          return _context10.abrupt("return", _context10.sent);
        case 3:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function pkCreateApi(_x8) {
    return _ref9.apply(this, arguments);
  };
}();
var pkCheckApi = /*#__PURE__*/function () {
  var _ref11 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(device_no) {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
            var _api$auth2;
            return _regeneratorRuntime().wrap(function _callee11$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.next = 2;
                  return (_api$auth2 = api.auth) == null ? void 0 : _api$auth2.get('v2/passkey/check/' + device_no);
                case 2:
                  return _context11.abrupt("return", _context11.sent);
                case 3:
                case "end":
                  return _context11.stop();
              }
            }, _callee11);
          })));
        case 2:
          return _context12.abrupt("return", _context12.sent);
        case 3:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function pkCheckApi(_x9) {
    return _ref11.apply(this, arguments);
  };
}();
var pkSignApi = /*#__PURE__*/function () {
  var _ref13 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data, headers) {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          if (headers === void 0) {
            headers = {};
          }
          _context14.next = 3;
          return pkCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
            var _api$pk2;
            return _regeneratorRuntime().wrap(function _callee13$(_context13) {
              while (1) switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 2;
                  return (_api$pk2 = api.pk) == null ? void 0 : _api$pk2.post('v2/sign', data, {
                    headers: headers
                  });
                case 2:
                  return _context13.abrupt("return", _context13.sent);
                case 3:
                case "end":
                  return _context13.stop();
              }
            }, _callee13);
          })));
        case 3:
          return _context14.abrupt("return", _context14.sent);
        case 4:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function pkSignApi(_x10, _x11) {
    return _ref13.apply(this, arguments);
  };
}();
var pkValidateApi = /*#__PURE__*/function () {
  var _ref15 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(data, headers) {
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          if (headers === void 0) {
            headers = {};
          }
          _context16.next = 3;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
            var _api$auth3;
            return _regeneratorRuntime().wrap(function _callee15$(_context15) {
              while (1) switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.next = 2;
                  return (_api$auth3 = api.auth) == null ? void 0 : _api$auth3.post('v2/passkey/validate/', data, {
                    headers: headers
                  });
                case 2:
                  return _context15.abrupt("return", _context15.sent);
                case 3:
                case "end":
                  return _context15.stop();
              }
            }, _callee15);
          })));
        case 3:
          return _context16.abrupt("return", _context16.sent);
        case 4:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function pkValidateApi(_x12, _x13) {
    return _ref15.apply(this, arguments);
  };
}();
var btcSignPsbtAndPush = /*#__PURE__*/function () {
  var _ref17 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(params) {
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
            var _api$tomo;
            var _yield$api$tomo$post, data;
            return _regeneratorRuntime().wrap(function _callee17$(_context17) {
              while (1) switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.next = 2;
                  return (_api$tomo = api.tomo) == null ? void 0 : _api$tomo.post("socialLogin/projectWallet/bitcoin/signPsbtAndPush", params);
                case 2:
                  _yield$api$tomo$post = _context17.sent;
                  data = _yield$api$tomo$post.data;
                  return _context17.abrupt("return", data);
                case 5:
                case "end":
                  return _context17.stop();
              }
            }, _callee17);
          })));
        case 2:
          return _context18.abrupt("return", _context18.sent);
        case 3:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function btcSignPsbtAndPush(_x14) {
    return _ref17.apply(this, arguments);
  };
}();
var sendEvmTransactionApi = /*#__PURE__*/function () {
  var _ref19 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(mfa, data) {
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
            var _api$tomo2;
            var token, res;
            return _regeneratorRuntime().wrap(function _callee19$(_context19) {
              while (1) switch (_context19.prev = _context19.next) {
                case 0:
                  token = getUserToken();
                  _context19.next = 3;
                  return (_api$tomo2 = api.tomo) == null ? void 0 : _api$tomo2.post('socialLogin/projectWallet/ethereum/sendTransaction', data, {
                    headers: {
                      Authorization: "Bearer " + token,
                      MFA: mfa
                    }
                  });
                case 3:
                  res = _context19.sent;
                  return _context19.abrupt("return", res.data);
                case 5:
                case "end":
                  return _context19.stop();
              }
            }, _callee19);
          })));
        case 2:
          return _context20.abrupt("return", _context20.sent);
        case 3:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return function sendEvmTransactionApi(_x15, _x16) {
    return _ref19.apply(this, arguments);
  };
}();
var signEvmTransactionApi = /*#__PURE__*/function () {
  var _ref21 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(mfa, data) {
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
            var _api$tomo3;
            var token, res;
            return _regeneratorRuntime().wrap(function _callee21$(_context21) {
              while (1) switch (_context21.prev = _context21.next) {
                case 0:
                  token = getUserToken();
                  _context21.next = 3;
                  return (_api$tomo3 = api.tomo) == null ? void 0 : _api$tomo3.post('socialLogin/projectWallet/ethereum/signTransaction', data, {
                    headers: {
                      Authorization: "Bearer " + token,
                      MFA: mfa
                    }
                  });
                case 3:
                  res = _context21.sent;
                  return _context21.abrupt("return", res.data);
                case 5:
                case "end":
                  return _context21.stop();
              }
            }, _callee21);
          })));
        case 2:
          return _context22.abrupt("return", _context22.sent);
        case 3:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return function signEvmTransactionApi(_x17, _x18) {
    return _ref21.apply(this, arguments);
  };
}();
var tonSignMessage = /*#__PURE__*/function () {
  var _ref23 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(mfa, data) {
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
            var _api$tomo4;
            var token, res;
            return _regeneratorRuntime().wrap(function _callee23$(_context23) {
              while (1) switch (_context23.prev = _context23.next) {
                case 0:
                  token = getUserToken();
                  _context23.next = 3;
                  return (_api$tomo4 = api.tomo) == null ? void 0 : _api$tomo4.post('/socialLogin/projectWallet/ton/signTransaction', data, {
                    headers: {
                      Authorization: "Bearer " + token,
                      MFA: mfa
                    }
                  });
                case 3:
                  res = _context23.sent;
                  return _context23.abrupt("return", res.data);
                case 5:
                case "end":
                  return _context23.stop();
              }
            }, _callee23);
          })));
        case 2:
          return _context24.abrupt("return", _context24.sent);
        case 3:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  }));
  return function tonSignMessage(_x19, _x20) {
    return _ref23.apply(this, arguments);
  };
}();
var solSignRawTransaction = /*#__PURE__*/function () {
  var _ref25 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(params) {
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
            var _api$tomo5;
            var _yield$api$tomo$post2, data;
            return _regeneratorRuntime().wrap(function _callee25$(_context25) {
              while (1) switch (_context25.prev = _context25.next) {
                case 0:
                  _context25.next = 2;
                  return (_api$tomo5 = api.tomo) == null ? void 0 : _api$tomo5.post("socialLogin/projectWallet/solana/signRawTransaction", params);
                case 2:
                  _yield$api$tomo$post2 = _context25.sent;
                  data = _yield$api$tomo$post2.data;
                  return _context25.abrupt("return", data);
                case 5:
                case "end":
                  return _context25.stop();
              }
            }, _callee25);
          })));
        case 2:
          return _context26.abrupt("return", _context26.sent);
        case 3:
        case "end":
          return _context26.stop();
      }
    }, _callee26);
  }));
  return function solSignRawTransaction(_x21) {
    return _ref25.apply(this, arguments);
  };
}();
// send BTC
var btcCreateSendBtcPsbt = /*#__PURE__*/function () {
  var _ref27 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(params) {
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
            var _api$tomo6;
            var _yield$api$tomo$post3, data;
            return _regeneratorRuntime().wrap(function _callee27$(_context27) {
              while (1) switch (_context27.prev = _context27.next) {
                case 0:
                  _context27.next = 2;
                  return (_api$tomo6 = api.tomo) == null ? void 0 : _api$tomo6.post("socialLogin/projectWallet/bitcoin/createSendBitcoinPsbt", params);
                case 2:
                  _yield$api$tomo$post3 = _context27.sent;
                  data = _yield$api$tomo$post3.data;
                  return _context27.abrupt("return", data);
                case 5:
                case "end":
                  return _context27.stop();
              }
            }, _callee27);
          })));
        case 2:
          return _context28.abrupt("return", _context28.sent);
        case 3:
        case "end":
          return _context28.stop();
      }
    }, _callee28);
  }));
  return function btcCreateSendBtcPsbt(_x22) {
    return _ref27.apply(this, arguments);
  };
}();
var btcSignMessage = /*#__PURE__*/function () {
  var _ref29 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(params) {
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29() {
            var _api$tomo7;
            var _yield$api$tomo$post4, data;
            return _regeneratorRuntime().wrap(function _callee29$(_context29) {
              while (1) switch (_context29.prev = _context29.next) {
                case 0:
                  _context29.next = 2;
                  return (_api$tomo7 = api.tomo) == null ? void 0 : _api$tomo7.post("socialLogin/projectWallet/bitcoin/signMessage", params);
                case 2:
                  _yield$api$tomo$post4 = _context29.sent;
                  data = _yield$api$tomo$post4.data;
                  return _context29.abrupt("return", data);
                case 5:
                case "end":
                  return _context29.stop();
              }
            }, _callee29);
          })));
        case 2:
          return _context30.abrupt("return", _context30.sent);
        case 3:
        case "end":
          return _context30.stop();
      }
    }, _callee30);
  }));
  return function btcSignMessage(_x23) {
    return _ref29.apply(this, arguments);
  };
}();
var btcSignPsbt = /*#__PURE__*/function () {
  var _ref31 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32(params) {
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31() {
            var _api$tomo8;
            var _yield$api$tomo$post5, data;
            return _regeneratorRuntime().wrap(function _callee31$(_context31) {
              while (1) switch (_context31.prev = _context31.next) {
                case 0:
                  _context31.next = 2;
                  return (_api$tomo8 = api.tomo) == null ? void 0 : _api$tomo8.post("socialLogin/projectWallet/bitcoin/signPsbt", params);
                case 2:
                  _yield$api$tomo$post5 = _context31.sent;
                  data = _yield$api$tomo$post5.data;
                  return _context31.abrupt("return", data);
                case 5:
                case "end":
                  return _context31.stop();
              }
            }, _callee31);
          })));
        case 2:
          return _context32.abrupt("return", _context32.sent);
        case 3:
        case "end":
          return _context32.stop();
      }
    }, _callee32);
  }));
  return function btcSignPsbt(_x24) {
    return _ref31.apply(this, arguments);
  };
}();
var decodeInfoByHex = /*#__PURE__*/function () {
  var _ref33 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34(params) {
    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33() {
            var _api$tomo9;
            var _yield$api$tomo$post6, data;
            return _regeneratorRuntime().wrap(function _callee33$(_context33) {
              while (1) switch (_context33.prev = _context33.next) {
                case 0:
                  _context33.next = 2;
                  return (_api$tomo9 = api.tomo) == null ? void 0 : _api$tomo9.post("socialLogin/projectWallet/bitcoin/decode", params);
                case 2:
                  _yield$api$tomo$post6 = _context33.sent;
                  data = _yield$api$tomo$post6.data;
                  return _context33.abrupt("return", data);
                case 5:
                case "end":
                  return _context33.stop();
              }
            }, _callee33);
          })));
        case 2:
          return _context34.abrupt("return", _context34.sent);
        case 3:
        case "end":
          return _context34.stop();
      }
    }, _callee34);
  }));
  return function decodeInfoByHex(_x25) {
    return _ref33.apply(this, arguments);
  };
}();
var v2PkRegApi = /*#__PURE__*/function () {
  var _ref35 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee36(device_no) {
    return _regeneratorRuntime().wrap(function _callee36$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          _context36.next = 2;
          return pkCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35() {
            var _api$pk3;
            return _regeneratorRuntime().wrap(function _callee35$(_context35) {
              while (1) switch (_context35.prev = _context35.next) {
                case 0:
                  _context35.next = 2;
                  return (_api$pk3 = api.pk) == null ? void 0 : _api$pk3.post('v2/reg/' + device_no, {});
                case 2:
                  return _context35.abrupt("return", _context35.sent);
                case 3:
                case "end":
                  return _context35.stop();
              }
            }, _callee35);
          })));
        case 2:
          return _context36.abrupt("return", _context36.sent);
        case 3:
        case "end":
          return _context36.stop();
      }
    }, _callee36);
  }));
  return function v2PkRegApi(_x26) {
    return _ref35.apply(this, arguments);
  };
}();
var v2PkSignApi = /*#__PURE__*/function () {
  var _ref37 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee38(data) {
    return _regeneratorRuntime().wrap(function _callee38$(_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          _context38.next = 2;
          return pkCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee37() {
            var _api$pk4;
            return _regeneratorRuntime().wrap(function _callee37$(_context37) {
              while (1) switch (_context37.prev = _context37.next) {
                case 0:
                  _context37.next = 2;
                  return (_api$pk4 = api.pk) == null ? void 0 : _api$pk4.post('v2/sign', data);
                case 2:
                  return _context37.abrupt("return", _context37.sent);
                case 3:
                case "end":
                  return _context37.stop();
              }
            }, _callee37);
          })));
        case 2:
          return _context38.abrupt("return", _context38.sent);
        case 3:
        case "end":
          return _context38.stop();
      }
    }, _callee38);
  }));
  return function v2PkSignApi(_x27) {
    return _ref37.apply(this, arguments);
  };
}();
var v2PkValidateApi = /*#__PURE__*/function () {
  var _ref39 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee40(data) {
    return _regeneratorRuntime().wrap(function _callee40$(_context40) {
      while (1) switch (_context40.prev = _context40.next) {
        case 0:
          _context40.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee39() {
            var _api$auth4;
            return _regeneratorRuntime().wrap(function _callee39$(_context39) {
              while (1) switch (_context39.prev = _context39.next) {
                case 0:
                  _context39.next = 2;
                  return (_api$auth4 = api.auth) == null ? void 0 : _api$auth4.post('v2/passkey/validate/', data);
                case 2:
                  return _context39.abrupt("return", _context39.sent);
                case 3:
                case "end":
                  return _context39.stop();
              }
            }, _callee39);
          })));
        case 2:
          return _context40.abrupt("return", _context40.sent);
        case 3:
        case "end":
          return _context40.stop();
      }
    }, _callee40);
  }));
  return function v2PkValidateApi(_x28) {
    return _ref39.apply(this, arguments);
  };
}();
var v2PkCreateApi = /*#__PURE__*/function () {
  var _ref41 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee42(data) {
    return _regeneratorRuntime().wrap(function _callee42$(_context42) {
      while (1) switch (_context42.prev = _context42.next) {
        case 0:
          _context42.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee41() {
            var _api$auth5;
            return _regeneratorRuntime().wrap(function _callee41$(_context41) {
              while (1) switch (_context41.prev = _context41.next) {
                case 0:
                  _context41.next = 2;
                  return (_api$auth5 = api.auth) == null ? void 0 : _api$auth5.post('v2/passkey/create/', data);
                case 2:
                  return _context41.abrupt("return", _context41.sent);
                case 3:
                case "end":
                  return _context41.stop();
              }
            }, _callee41);
          })));
        case 2:
          return _context42.abrupt("return", _context42.sent);
        case 3:
        case "end":
          return _context42.stop();
      }
    }, _callee42);
  }));
  return function v2PkCreateApi(_x29) {
    return _ref41.apply(this, arguments);
  };
}();
var v2PkCheckApi = /*#__PURE__*/function () {
  var _ref43 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee44(device_no) {
    return _regeneratorRuntime().wrap(function _callee44$(_context44) {
      while (1) switch (_context44.prev = _context44.next) {
        case 0:
          _context44.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee43() {
            var _api$auth6;
            return _regeneratorRuntime().wrap(function _callee43$(_context43) {
              while (1) switch (_context43.prev = _context43.next) {
                case 0:
                  _context43.next = 2;
                  return (_api$auth6 = api.auth) == null ? void 0 : _api$auth6.get('v2/passkey/check/' + device_no);
                case 2:
                  return _context43.abrupt("return", _context43.sent);
                case 3:
                case "end":
                  return _context43.stop();
              }
            }, _callee43);
          })));
        case 2:
          return _context44.abrupt("return", _context44.sent);
        case 3:
        case "end":
          return _context44.stop();
      }
    }, _callee44);
  }));
  return function v2PkCheckApi(_x30) {
    return _ref43.apply(this, arguments);
  };
}();
var checkPaymentPasswd = /*#__PURE__*/function () {
  var _ref45 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee46() {
    return _regeneratorRuntime().wrap(function _callee46$(_context46) {
      while (1) switch (_context46.prev = _context46.next) {
        case 0:
          _context46.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee45() {
            var _api$auth7;
            return _regeneratorRuntime().wrap(function _callee45$(_context45) {
              while (1) switch (_context45.prev = _context45.next) {
                case 0:
                  _context45.next = 2;
                  return (_api$auth7 = api.auth) == null ? void 0 : _api$auth7.get('v1/payment/passwd/check', {});
                case 2:
                  return _context45.abrupt("return", _context45.sent);
                case 3:
                case "end":
                  return _context45.stop();
              }
            }, _callee45);
          })));
        case 2:
          return _context46.abrupt("return", _context46.sent);
        case 3:
        case "end":
          return _context46.stop();
      }
    }, _callee46);
  }));
  return function checkPaymentPasswd() {
    return _ref45.apply(this, arguments);
  };
}();
var setPaymentPasswd = /*#__PURE__*/function () {
  var _ref47 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee48(data) {
    return _regeneratorRuntime().wrap(function _callee48$(_context48) {
      while (1) switch (_context48.prev = _context48.next) {
        case 0:
          _context48.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee47() {
            var _api$auth8;
            return _regeneratorRuntime().wrap(function _callee47$(_context47) {
              while (1) switch (_context47.prev = _context47.next) {
                case 0:
                  _context47.next = 2;
                  return (_api$auth8 = api.auth) == null ? void 0 : _api$auth8.post('v1/payment/passwd/set', data);
                case 2:
                  return _context47.abrupt("return", _context47.sent);
                case 3:
                case "end":
                  return _context47.stop();
              }
            }, _callee47);
          })));
        case 2:
          return _context48.abrupt("return", _context48.sent);
        case 3:
        case "end":
          return _context48.stop();
      }
    }, _callee48);
  }));
  return function setPaymentPasswd(_x31) {
    return _ref47.apply(this, arguments);
  };
}();
var changePaymentPasswd = /*#__PURE__*/function () {
  var _ref49 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee50(data) {
    return _regeneratorRuntime().wrap(function _callee50$(_context50) {
      while (1) switch (_context50.prev = _context50.next) {
        case 0:
          _context50.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee49() {
            var _api$auth9;
            return _regeneratorRuntime().wrap(function _callee49$(_context49) {
              while (1) switch (_context49.prev = _context49.next) {
                case 0:
                  _context49.next = 2;
                  return (_api$auth9 = api.auth) == null ? void 0 : _api$auth9.post('v1/payment/passwd/change', data);
                case 2:
                  return _context49.abrupt("return", _context49.sent);
                case 3:
                case "end":
                  return _context49.stop();
              }
            }, _callee49);
          })));
        case 2:
          return _context50.abrupt("return", _context50.sent);
        case 3:
        case "end":
          return _context50.stop();
      }
    }, _callee50);
  }));
  return function changePaymentPasswd(_x32) {
    return _ref49.apply(this, arguments);
  };
}();
var validatePaymentPasswd = /*#__PURE__*/function () {
  var _ref51 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee52(data) {
    return _regeneratorRuntime().wrap(function _callee52$(_context52) {
      while (1) switch (_context52.prev = _context52.next) {
        case 0:
          _context52.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee51() {
            var _api$auth10;
            return _regeneratorRuntime().wrap(function _callee51$(_context51) {
              while (1) switch (_context51.prev = _context51.next) {
                case 0:
                  _context51.next = 2;
                  return (_api$auth10 = api.auth) == null ? void 0 : _api$auth10.post('v1/payment/passwd/validate', data);
                case 2:
                  return _context51.abrupt("return", _context51.sent);
                case 3:
                case "end":
                  return _context51.stop();
              }
            }, _callee51);
          })));
        case 2:
          return _context52.abrupt("return", _context52.sent);
        case 3:
        case "end":
          return _context52.stop();
      }
    }, _callee52);
  }));
  return function validatePaymentPasswd(_x33) {
    return _ref51.apply(this, arguments);
  };
}();
var bindEmailCodeVerify = /*#__PURE__*/function () {
  var _ref53 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee54(params) {
    return _regeneratorRuntime().wrap(function _callee54$(_context54) {
      while (1) switch (_context54.prev = _context54.next) {
        case 0:
          _context54.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee53() {
            var _api$tomo10;
            var _yield$api$tomo$post7, data;
            return _regeneratorRuntime().wrap(function _callee53$(_context53) {
              while (1) switch (_context53.prev = _context53.next) {
                case 0:
                  _context53.next = 2;
                  return (_api$tomo10 = api.tomo) == null ? void 0 : _api$tomo10.post("socialLogin/projectUser/bindEmailCodeVerify", params);
                case 2:
                  _yield$api$tomo$post7 = _context53.sent;
                  data = _yield$api$tomo$post7.data;
                  return _context53.abrupt("return", data);
                case 5:
                case "end":
                  return _context53.stop();
              }
            }, _callee53);
          })));
        case 2:
          return _context54.abrupt("return", _context54.sent);
        case 3:
        case "end":
          return _context54.stop();
      }
    }, _callee54);
  }));
  return function bindEmailCodeVerify(_x34) {
    return _ref53.apply(this, arguments);
  };
}();
var bindEmailCodeSend = /*#__PURE__*/function () {
  var _ref55 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee56(email) {
    return _regeneratorRuntime().wrap(function _callee56$(_context56) {
      while (1) switch (_context56.prev = _context56.next) {
        case 0:
          _context56.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee55() {
            var _api$tomo11;
            var _yield$api$tomo$get, data;
            return _regeneratorRuntime().wrap(function _callee55$(_context55) {
              while (1) switch (_context55.prev = _context55.next) {
                case 0:
                  _context55.next = 2;
                  return (_api$tomo11 = api.tomo) == null ? void 0 : _api$tomo11.get("socialLogin/projectUser/bindEmailCode?email=" + email);
                case 2:
                  _yield$api$tomo$get = _context55.sent;
                  data = _yield$api$tomo$get.data;
                  return _context55.abrupt("return", data);
                case 5:
                case "end":
                  return _context55.stop();
              }
            }, _callee55);
          })));
        case 2:
          return _context56.abrupt("return", _context56.sent);
        case 3:
        case "end":
          return _context56.stop();
      }
    }, _callee56);
  }));
  return function bindEmailCodeSend(_x35) {
    return _ref55.apply(this, arguments);
  };
}();
var getSwapAllTokens = /*#__PURE__*/function () {
  var _ref57 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee58() {
    return _regeneratorRuntime().wrap(function _callee58$(_context58) {
      while (1) switch (_context58.prev = _context58.next) {
        case 0:
          _context58.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee57() {
            var _api$tomo12;
            var ret;
            return _regeneratorRuntime().wrap(function _callee57$(_context57) {
              while (1) switch (_context57.prev = _context57.next) {
                case 0:
                  _context57.next = 2;
                  return (_api$tomo12 = api.tomo) == null ? void 0 : _api$tomo12.get("socialLogin/teleGram/wallet/tokens", {});
                case 2:
                  ret = _context57.sent;
                  return _context57.abrupt("return", ret.data);
                case 4:
                case "end":
                  return _context57.stop();
              }
            }, _callee57);
          })));
        case 2:
          return _context58.abrupt("return", _context58.sent);
        case 3:
        case "end":
          return _context58.stop();
      }
    }, _callee58);
  }));
  return function getSwapAllTokens() {
    return _ref57.apply(this, arguments);
  };
}();
var getSwapAllTokensSearch = /*#__PURE__*/function () {
  var _ref59 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee59(queryParameters, config) {
    var ret;
    return _regeneratorRuntime().wrap(function _callee59$(_context59) {
      while (1) switch (_context59.prev = _context59.next) {
        case 0:
          _context59.next = 2;
          return axios.get(config.url + "wallet/tokens/search", {
            params: queryParameters,
            headers: {
              'X-TOMO-TMA-USERID': config.tmaid,
              'X-TOMO-TMA-KEY': config.tmakey
            }
          });
        case 2:
          ret = _context59.sent;
          return _context59.abrupt("return", ret.data);
        case 4:
        case "end":
          return _context59.stop();
      }
    }, _callee59);
  }));
  return function getSwapAllTokensSearch(_x36, _x37) {
    return _ref59.apply(this, arguments);
  };
}();
var buildSwapTxApi = /*#__PURE__*/function () {
  var _ref60 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee61(params) {
    var res;
    return _regeneratorRuntime().wrap(function _callee61$(_context61) {
      while (1) switch (_context61.prev = _context61.next) {
        case 0:
          _context61.next = 2;
          return sunCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee60() {
            var _api$sun;
            return _regeneratorRuntime().wrap(function _callee60$(_context60) {
              while (1) switch (_context60.prev = _context60.next) {
                case 0:
                  _context60.next = 2;
                  return (_api$sun = api.sun) == null ? void 0 : _api$sun.get("v1/buildTx", {
                    params: params
                  });
                case 2:
                  return _context60.abrupt("return", _context60.sent);
                case 3:
                case "end":
                  return _context60.stop();
              }
            }, _callee60);
          })));
        case 2:
          res = _context61.sent;
          return _context61.abrupt("return", res.data);
        case 4:
        case "end":
          return _context61.stop();
      }
    }, _callee61);
  }));
  return function buildSwapTxApi(_x38) {
    return _ref60.apply(this, arguments);
  };
}();
var getSystemTokens = /*#__PURE__*/function () {
  var _ref62 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee63(params) {
    var res;
    return _regeneratorRuntime().wrap(function _callee63$(_context63) {
      while (1) switch (_context63.prev = _context63.next) {
        case 0:
          _context63.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee62() {
            var _api$auth11;
            return _regeneratorRuntime().wrap(function _callee62$(_context62) {
              while (1) switch (_context62.prev = _context62.next) {
                case 0:
                  _context62.next = 2;
                  return (_api$auth11 = api.auth) == null ? void 0 : _api$auth11.get("v1/token/balance", {
                    params: params
                  });
                case 2:
                  return _context62.abrupt("return", _context62.sent);
                case 3:
                case "end":
                  return _context62.stop();
              }
            }, _callee62);
          })));
        case 2:
          res = _context63.sent;
          return _context63.abrupt("return", res.data);
        case 4:
        case "end":
          return _context63.stop();
      }
    }, _callee63);
  }));
  return function getSystemTokens(_x39) {
    return _ref62.apply(this, arguments);
  };
}();
var v1AddAssetApi = /*#__PURE__*/function () {
  var _ref64 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee65(data) {
    return _regeneratorRuntime().wrap(function _callee65$(_context65) {
      while (1) switch (_context65.prev = _context65.next) {
        case 0:
          _context65.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee64() {
            var _api$auth12;
            return _regeneratorRuntime().wrap(function _callee64$(_context64) {
              while (1) switch (_context64.prev = _context64.next) {
                case 0:
                  _context64.next = 2;
                  return (_api$auth12 = api.auth) == null ? void 0 : _api$auth12.post('v1/asset/add', data);
                case 2:
                  return _context64.abrupt("return", _context64.sent);
                case 3:
                case "end":
                  return _context64.stop();
              }
            }, _callee64);
          })));
        case 2:
          return _context65.abrupt("return", _context65.sent);
        case 3:
        case "end":
          return _context65.stop();
      }
    }, _callee65);
  }));
  return function v1AddAssetApi(_x40) {
    return _ref64.apply(this, arguments);
  };
}();
var v1AllAssetApi = /*#__PURE__*/function () {
  var _ref66 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee67(params) {
    var res;
    return _regeneratorRuntime().wrap(function _callee67$(_context67) {
      while (1) switch (_context67.prev = _context67.next) {
        case 0:
          _context67.next = 2;
          return authCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee66() {
            var _api$auth13;
            return _regeneratorRuntime().wrap(function _callee66$(_context66) {
              while (1) switch (_context66.prev = _context66.next) {
                case 0:
                  _context66.next = 2;
                  return (_api$auth13 = api.auth) == null ? void 0 : _api$auth13.get('v1/asset/all', {
                    params: params
                  });
                case 2:
                  return _context66.abrupt("return", _context66.sent);
                case 3:
                case "end":
                  return _context66.stop();
              }
            }, _callee66);
          })));
        case 2:
          res = _context67.sent;
          return _context67.abrupt("return", res.data);
        case 4:
        case "end":
          return _context67.stop();
      }
    }, _callee67);
  }));
  return function v1AllAssetApi(_x41) {
    return _ref66.apply(this, arguments);
  };
}();
var mfaAuthVerificationApi = /*#__PURE__*/function () {
  var _ref68 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee69(data) {
    return _regeneratorRuntime().wrap(function _callee69$(_context69) {
      while (1) switch (_context69.prev = _context69.next) {
        case 0:
          _context69.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee68() {
            var _api$tomo13;
            var res;
            return _regeneratorRuntime().wrap(function _callee68$(_context68) {
              while (1) switch (_context68.prev = _context68.next) {
                case 0:
                  _context68.next = 2;
                  return (_api$tomo13 = api.tomo) == null ? void 0 : _api$tomo13.post('socialLogin/mfa/auth/verification', data);
                case 2:
                  res = _context68.sent;
                  return _context68.abrupt("return", res.data);
                case 4:
                case "end":
                  return _context68.stop();
              }
            }, _callee68);
          })));
        case 2:
          return _context69.abrupt("return", _context69.sent);
        case 3:
        case "end":
          return _context69.stop();
      }
    }, _callee69);
  }));
  return function mfaAuthVerificationApi(_x42) {
    return _ref68.apply(this, arguments);
  };
}();
var getSwapAllTokensV3 = /*#__PURE__*/function () {
  var _ref70 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee71(params) {
    return _regeneratorRuntime().wrap(function _callee71$(_context71) {
      while (1) switch (_context71.prev = _context71.next) {
        case 0:
          _context71.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee70() {
            var _api$tomo14;
            var token, ret;
            return _regeneratorRuntime().wrap(function _callee70$(_context70) {
              while (1) switch (_context70.prev = _context70.next) {
                case 0:
                  token = getUserToken();
                  _context70.next = 3;
                  return (_api$tomo14 = api.tomo) == null ? void 0 : _api$tomo14.get("token/swapList", {
                    params: params
                  });
                case 3:
                  ret = _context70.sent;
                  return _context70.abrupt("return", ret.data);
                case 5:
                case "end":
                  return _context70.stop();
              }
            }, _callee70);
          })));
        case 2:
          return _context71.abrupt("return", _context71.sent);
        case 3:
        case "end":
          return _context71.stop();
      }
    }, _callee71);
  }));
  return function getSwapAllTokensV3(_x43) {
    return _ref70.apply(this, arguments);
  };
}();
var sendBindEmailCodeApi = /*#__PURE__*/function () {
  var _ref72 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee73(params) {
    return _regeneratorRuntime().wrap(function _callee73$(_context73) {
      while (1) switch (_context73.prev = _context73.next) {
        case 0:
          _context73.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee72() {
            var _api$tomo15;
            var ret;
            return _regeneratorRuntime().wrap(function _callee72$(_context72) {
              while (1) switch (_context72.prev = _context72.next) {
                case 0:
                  _context72.next = 2;
                  return (_api$tomo15 = api.tomo) == null ? void 0 : _api$tomo15.get("socialLogin/teleGram/bindEmailCode", {
                    params: params
                  });
                case 2:
                  ret = _context72.sent;
                  return _context72.abrupt("return", ret.data);
                case 4:
                case "end":
                  return _context72.stop();
              }
            }, _callee72);
          })));
        case 2:
          return _context73.abrupt("return", _context73.sent);
        case 3:
        case "end":
          return _context73.stop();
      }
    }, _callee73);
  }));
  return function sendBindEmailCodeApi(_x44) {
    return _ref72.apply(this, arguments);
  };
}();
var verifyBindEmailCodeApi = /*#__PURE__*/function () {
  var _ref74 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee75(data) {
    return _regeneratorRuntime().wrap(function _callee75$(_context75) {
      while (1) switch (_context75.prev = _context75.next) {
        case 0:
          _context75.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee74() {
            var _api$tomo16;
            var res;
            return _regeneratorRuntime().wrap(function _callee74$(_context74) {
              while (1) switch (_context74.prev = _context74.next) {
                case 0:
                  _context74.next = 2;
                  return (_api$tomo16 = api.tomo) == null ? void 0 : _api$tomo16.post('socialLogin/teleGram/bindEmailCodeVerify', data);
                case 2:
                  res = _context74.sent;
                  return _context74.abrupt("return", res.data);
                case 4:
                case "end":
                  return _context74.stop();
              }
            }, _callee74);
          })));
        case 2:
          return _context75.abrupt("return", _context75.sent);
        case 3:
        case "end":
          return _context75.stop();
      }
    }, _callee75);
  }));
  return function verifyBindEmailCodeApi(_x45) {
    return _ref74.apply(this, arguments);
  };
}();
var getTelegramUserInfoApi = /*#__PURE__*/function () {
  var _ref76 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee77() {
    return _regeneratorRuntime().wrap(function _callee77$(_context77) {
      while (1) switch (_context77.prev = _context77.next) {
        case 0:
          _context77.next = 2;
          return tomoCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee76() {
            var _api$tomo17;
            var res;
            return _regeneratorRuntime().wrap(function _callee76$(_context76) {
              while (1) switch (_context76.prev = _context76.next) {
                case 0:
                  _context76.next = 2;
                  return (_api$tomo17 = api.tomo) == null ? void 0 : _api$tomo17.get("socialLogin/teleGram/userInfo");
                case 2:
                  res = _context76.sent;
                  return _context76.abrupt("return", res.data);
                case 4:
                case "end":
                  return _context76.stop();
              }
            }, _callee76);
          })));
        case 2:
          return _context77.abrupt("return", _context77.sent);
        case 3:
        case "end":
          return _context77.stop();
      }
    }, _callee77);
  }));
  return function getTelegramUserInfoApi() {
    return _ref76.apply(this, arguments);
  };
}();
var getConfigChainsAll = /*#__PURE__*/function () {
  var _ref78 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee78() {
    var _yield$axios$get, data;
    return _regeneratorRuntime().wrap(function _callee78$(_context78) {
      while (1) switch (_context78.prev = _context78.next) {
        case 0:
          _context78.next = 2;
          return axios.get("https://common-service.mobus.workers.dev/chain/all");
        case 2:
          _yield$axios$get = _context78.sent;
          data = _yield$axios$get.data;
          return _context78.abrupt("return", data.result);
        case 5:
        case "end":
          return _context78.stop();
      }
    }, _callee78);
  }));
  return function getConfigChainsAll() {
    return _ref78.apply(this, arguments);
  };
}();

var apiList = {
  __proto__: null,
  successCode: successCode,
  api: api,
  GatewayError: GatewayError,
  pkCallback: pkCallback,
  authCallback: authCallback,
  sunCallback: sunCallback,
  tomoCallback: tomoCallback,
  getPassKey: getPassKey,
  loginApi: loginApi,
  checkLoginByCodeApi: checkLoginByCodeApi,
  pkRegApi: pkRegApi,
  pkCreateApi: pkCreateApi,
  pkCheckApi: pkCheckApi,
  pkSignApi: pkSignApi,
  pkValidateApi: pkValidateApi,
  btcSignPsbtAndPush: btcSignPsbtAndPush,
  sendEvmTransactionApi: sendEvmTransactionApi,
  signEvmTransactionApi: signEvmTransactionApi,
  tonSignMessage: tonSignMessage,
  solSignRawTransaction: solSignRawTransaction,
  btcCreateSendBtcPsbt: btcCreateSendBtcPsbt,
  btcSignMessage: btcSignMessage,
  btcSignPsbt: btcSignPsbt,
  decodeInfoByHex: decodeInfoByHex,
  v2PkRegApi: v2PkRegApi,
  v2PkSignApi: v2PkSignApi,
  v2PkValidateApi: v2PkValidateApi,
  v2PkCreateApi: v2PkCreateApi,
  v2PkCheckApi: v2PkCheckApi,
  checkPaymentPasswd: checkPaymentPasswd,
  setPaymentPasswd: setPaymentPasswd,
  changePaymentPasswd: changePaymentPasswd,
  validatePaymentPasswd: validatePaymentPasswd,
  bindEmailCodeVerify: bindEmailCodeVerify,
  bindEmailCodeSend: bindEmailCodeSend,
  getSwapAllTokens: getSwapAllTokens,
  getSwapAllTokensSearch: getSwapAllTokensSearch,
  buildSwapTxApi: buildSwapTxApi,
  getSystemTokens: getSystemTokens,
  v1AddAssetApi: v1AddAssetApi,
  v1AllAssetApi: v1AllAssetApi,
  mfaAuthVerificationApi: mfaAuthVerificationApi,
  getSwapAllTokensV3: getSwapAllTokensV3,
  sendBindEmailCodeApi: sendBindEmailCodeApi,
  verifyBindEmailCodeApi: verifyBindEmailCodeApi,
  getTelegramUserInfoApi: getTelegramUserInfoApi,
  getConfigChainsAll: getConfigChainsAll
};

var btcAddressTypeMaps = ['bitcoinP2Wpkh', 'bitcoinP2Sh', 'bitcoinP2Tr', 'bitcoinP2Pkh'];
var mockBtcEvmChainId = 0;
var btcDecimals = 8;
var sendTx = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
    var network, addressType, toAddress, amount, params, txInfo;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          network = _ref2.network, addressType = _ref2.addressType, toAddress = _ref2.toAddress, amount = _ref2.amount;
          params = {
            networkType: network,
            addressType: addressType,
            toAddress: toAddress,
            amount: amount
          };
          _context2.next = 4;
          return btcCreateSendBtcPsbt(params);
        case 4:
          txInfo = _context2.sent;
          return _context2.abrupt("return", txInfo);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function sendTx(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var connection;
var mockSolEvmChainId = 501;
var solDecimals = 9;
var solEndpoint = 'https://rpc.ankr.com/solana/ac79e83cf02a544dbb9b3f4c5d5478b2510b921e7d5739ded8791a932e8de0a6';
function getConnection() {
  if (connection) {
    return connection;
  }
  _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var solanaWeb3;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return import('@solana/web3.js');
        case 2:
          solanaWeb3 = _context.sent;
          // connection = new Connection(solEndpoint, 'recent')
          connection = new solanaWeb3.Connection(solEndpoint, 'finalized');
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }))();
  return connection;
}
function sendSolTx(_x, _x2, _x3, _x4) {
  return _sendSolTx.apply(this, arguments);
}
function _sendSolTx() {
  _sendSolTx = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(fromAddress, toAddress, amount,
  // bigint number
  mintAddress) {
    var solanaWeb3, tx, PublicKey, fromPublicKey, toPublicKey, tokenPublicKey, solanaSpl, txHex;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          getConnection();
          _context7.next = 4;
          return import('@solana/web3.js');
        case 4:
          solanaWeb3 = _context7.sent;
          tx = new solanaWeb3.Transaction();
          PublicKey = solanaWeb3.PublicKey;
          fromPublicKey = new PublicKey(fromAddress);
          toPublicKey = new PublicKey(toAddress);
          if (!tx.feePayer) {
            tx.feePayer = fromPublicKey;
          }
          if (!mintAddress) {
            _context7.next = 21;
            break;
          }
          tokenPublicKey = new PublicKey(mintAddress);
          _context7.next = 14;
          return connection.getRecentBlockhash('max');
        case 14:
          tx.recentBlockhash = _context7.sent.blockhash;
          _context7.next = 17;
          return import('@solana/spl-token');
        case 17:
          solanaSpl = _context7.sent;
          tx.add(solanaSpl.createTransferInstruction(tokenPublicKey, toPublicKey, fromPublicKey, amount));
          _context7.next = 25;
          break;
        case 21:
          _context7.next = 23;
          return connection.getRecentBlockhash('max');
        case 23:
          tx.recentBlockhash = _context7.sent.blockhash;
          tx.add(solanaWeb3.SystemProgram.transfer({
            fromPubkey: fromPublicKey,
            toPubkey: toPublicKey,
            lamports: amount
          }));
        case 25:
          txHex = tx.serialize({
            requireAllSignatures: false,
            verifySignatures: false
          }).toString('hex');
          return _context7.abrupt("return", txHex);
        case 29:
          _context7.prev = 29;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", null);
        case 32:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 29]]);
  }));
  return _sendSolTx.apply(this, arguments);
}
function getTokenAmount(_x6, _x7, _x8) {
  return _getTokenAmount.apply(this, arguments);
}
function _getTokenAmount() {
  _getTokenAmount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(client, mint, owner) {
    var solanaSpl, tokenAccount, info;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return import('@solana/spl-token');
        case 2:
          solanaSpl = _context8.sent;
          _context8.next = 5;
          return solanaSpl.getAssociatedTokenAddress(mint, owner);
        case 5:
          tokenAccount = _context8.sent;
          _context8.next = 8;
          return client.getAccountInfo(tokenAccount);
        case 8:
          info = _context8.sent;
          if (!(info == null)) {
            _context8.next = 13;
            break;
          }
          return _context8.abrupt("return", null);
        case 13:
          _context8.next = 15;
          return client.getTokenAccountBalance(tokenAccount);
        case 15:
          return _context8.abrupt("return", _context8.sent);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _getTokenAmount.apply(this, arguments);
}
var getSolBalance = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref3) {
    var address, token, PublicKey, _connection, owner, mint, tokenAccount, _connection2, publicKey, balance, solBalance;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          address = _ref3.address, token = _ref3.token;
          if (!address) {
            _context3.next = 28;
            break;
          }
          _context3.next = 4;
          return import('@solana/web3.js');
        case 4:
          PublicKey = _context3.sent.PublicKey;
          if (!token) {
            _context3.next = 19;
            break;
          }
          _connection = getConnection();
          owner = new PublicKey(address);
          mint = new PublicKey(token);
          _context3.next = 11;
          return getTokenAmount(_connection, mint, owner);
        case 11:
          tokenAccount = _context3.sent;
          if (!(tokenAccount == null)) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", {
            amount: BigInt(0),
            token: token,
            format: '0',
            decimals: undefined
          });
        case 16:
          return _context3.abrupt("return", {
            amount: BigInt(tokenAccount.value.amount),
            format: tokenAccount.value.uiAmountString,
            decimals: tokenAccount.value.decimals,
            token: token
          });
        case 17:
          _context3.next = 28;
          break;
        case 19:
          _connection2 = getConnection();
          publicKey = new PublicKey(address);
          _context3.next = 23;
          return _connection2.getBalance(publicKey);
        case 23:
          balance = _context3.sent;
          if (balance) {
            _context3.next = 26;
            break;
          }
          return _context3.abrupt("return", {
            balance: '0',
            formatted: '0'
          });
        case 26:
          solBalance = {
            balance: '' + balance,
            formatted: '' + balance / Math.pow(10, 9)
          };
          return _context3.abrupt("return", solBalance);
        case 28:
          return _context3.abrupt("return", undefined);
        case 29:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getSolBalance(_x12) {
    return _ref4.apply(this, arguments);
  };
}();
function getInstructions(data) {
  var instruction;
  _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var solanaWeb3, PublicKey, j;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return import('@solana/web3.js');
        case 2:
          solanaWeb3 = _context4.sent;
          PublicKey = solanaWeb3.PublicKey;
          instruction = new solanaWeb3.TransactionInstruction({
            programId: new PublicKey(data.programId),
            data: Buffer.from(data.data),
            keys: []
          });
          for (j = 0; j < data.keys.length; j++) {
            instruction.keys.push({
              pubkey: new PublicKey(data.keys[j].pubkey),
              isSigner: data.keys[j].isSigner,
              isWritable: data.keys[j].isWritable
            });
          }
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }))();
  return instruction;
}
// @ts-ignore
var ToSerializeTransaction = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
    var SolanaWeb3, PublicKey, txMsg, i, tx, _tx;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return import('@solana/web3.js');
        case 2:
          SolanaWeb3 = _context5.sent;
          PublicKey = SolanaWeb3.PublicKey;
          txMsg = new SolanaWeb3.TransactionMessage({
            recentBlockhash: data.tx.recentBlockhash,
            payerKey: new PublicKey(data.tx.from),
            instructions: []
          });
          for (i = 0; i < data.tx.instructions.length; i++) {
            txMsg.instructions.push(getInstructions(data.tx.instructions[i]));
          }
          if (!(data.tx && data.tx.txType == 'LEGACY')) {
            _context5.next = 12;
            break;
          }
          tx = SolanaWeb3.Transaction.populate(txMsg.compileToLegacyMessage());
          data.tx.signatures.forEach(function (signature) {
            tx.addSignature(new PublicKey(signature.publicKey), Buffer.from(signature.signature));
          });
          // tx.message.recentBlockhash = recentBlockhash
          return _context5.abrupt("return", Buffer.from(tx.serialize({
            requireAllSignatures: false
          })).toString('hex'));
        case 12:
          if (!(data.tx && data.tx.txType == 'VERSIONED')) {
            _context5.next = 15;
            break;
          }
          _tx = SolanaWeb3.VersionedTransaction.deserialize(data.tx.serializedMessage); // const tx = new VersionedTransaction(data.tx.serializedMessage)
          // data.tx.signatures.forEach(signature => {
          //     tx.addSignature(new PublicKey(signature.publicKey), Buffer.from(signature.signature))
          // });
          // tx.feePayer = new PublicKey(data.tx.from)
          return _context5.abrupt("return", Buffer.from(_tx.serialize()).toString('hex'));
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function ToSerializeTransaction(_x13) {
    return _ref6.apply(this, arguments);
  };
}();
function getSendSplToken(_x14, _x15, _x16, _x17) {
  return _getSendSplToken.apply(this, arguments);
}
function _getSendSplToken() {
  _getSendSplToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(mint, from, to, amount) {
    var connection, SolanaWeb3, PublicKey, solanaSpl, mintPublicKey, fromPublicKey, toPublicKey, fromATA, fromInfo, fromTokenAccount, transaction, toATA, toInfo, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, versionedTransaction;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          connection = getConnection();
          _context10.next = 3;
          return import('@solana/web3.js');
        case 3:
          SolanaWeb3 = _context10.sent;
          PublicKey = SolanaWeb3.PublicKey;
          _context10.next = 7;
          return import('@solana/spl-token');
        case 7:
          solanaSpl = _context10.sent;
          mintPublicKey = mint && new PublicKey(mint);
          fromPublicKey = from && new PublicKey(from);
          toPublicKey = to && new PublicKey(to);
          if (!(mintPublicKey && fromPublicKey && toPublicKey && amount)) {
            _context10.next = 45;
            break;
          }
          _context10.next = 14;
          return solanaSpl.getAssociatedTokenAddress(mintPublicKey, fromPublicKey);
        case 14:
          fromATA = _context10.sent;
          _context10.next = 17;
          return connection.getAccountInfo(fromATA);
        case 17:
          fromInfo = _context10.sent;
          if (!(fromInfo == null)) {
            _context10.next = 21;
            break;
          }
          console.warn('from not token accmount');
          return _context10.abrupt("return", null);
        case 21:
          _context10.next = 23;
          return connection.getTokenAccountBalance(fromATA);
        case 23:
          fromTokenAccount = _context10.sent;
          if (!(fromTokenAccount.value.amount < amount)) {
            _context10.next = 26;
            break;
          }
          return _context10.abrupt("return", null);
        case 26:
          _context10.t0 = SolanaWeb3.TransactionMessage;
          _context10.t1 = fromPublicKey;
          _context10.next = 30;
          return connection.getLatestBlockhash();
        case 30:
          _context10.t2 = _context10.sent.blockhash;
          _context10.t3 = [];
          _context10.t4 = {
            payerKey: _context10.t1,
            recentBlockhash: _context10.t2,
            instructions: _context10.t3
          };
          transaction = new _context10.t0(_context10.t4);
          _context10.next = 36;
          return solanaSpl.getAssociatedTokenAddress(mintPublicKey, toPublicKey);
        case 36:
          toATA = _context10.sent;
          _context10.next = 39;
          return connection.getAccountInfo(toATA);
        case 39:
          toInfo = _context10.sent;
          TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
          if (toInfo == null) {
            ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
            transaction.instructions.push(solanaSpl.createAssociatedTokenAccountInstruction(fromPublicKey, toATA, toPublicKey, mintPublicKey, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID));
          }
          transaction.instructions.push(solanaSpl.createTransferCheckedInstruction(fromATA, mintPublicKey, toATA, fromPublicKey, amount, fromTokenAccount.value.decimals, [], TOKEN_PROGRAM_ID));
          versionedTransaction = new SolanaWeb3.VersionedTransaction(transaction.compileToV0Message()); // return base58.encode(versionedTransaction.serialize())
          return _context10.abrupt("return", Buffer.from(versionedTransaction.serialize()).toString('hex'));
        case 45:
          return _context10.abrupt("return", undefined);
        case 46:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _getSendSplToken.apply(this, arguments);
}
function sendTransaction(_x18) {
  return _sendTransaction.apply(this, arguments);
}
function _sendTransaction() {
  _sendTransaction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(rawTransaction) {
    var result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          getConnection();
          _context11.next = 3;
          return connection.sendRawTransaction(Buffer.from(rawTransaction, 'hex'));
        case 3:
          result = _context11.sent;
          return _context11.abrupt("return", result);
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _sendTransaction.apply(this, arguments);
}

var mockTonChainId = 1100;
var mockTonTestnetChainId = 1101;
var tonDecimals = 9;
var apiKey = '1b312c91c3b691255130350a49ac5a0742454725f910756aff94dfe44858388e';
var tonRpc = 'https://toncenter.com/api/v2/jsonRPC';
var hashHttp = 'https://toncenter.com/api/index/v1';
function getTonWebProvider() {
  return _getTonWebProvider.apply(this, arguments);
}
function _getTonWebProvider() {
  _getTonWebProvider = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new TonWeb(new TonWeb.HttpProvider(tonRpc, {
            apiKey: apiKey
          })));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getTonWebProvider.apply(this, arguments);
}
var apiKeyTest = '227f87a614319d10e4c20f0f485cd101eca12989bf59da0e33b3c3da8ad534b2';
var tonRpcTest = 'https://testnet.toncenter.com/api/v2/jsonRPC';
function getTonTestWebProvider() {
  return _getTonTestWebProvider.apply(this, arguments);
}
function _getTonTestWebProvider() {
  _getTonTestWebProvider = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new TonWeb(new TonWeb.HttpProvider(tonRpcTest, {
            apiKey: apiKeyTest
          })));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getTonTestWebProvider.apply(this, arguments);
}
var getTonBalance = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var tonAddress, tokenContractAddress, tokenPrecision, chainId, tonWeb, wallet, address, jettonMinter, jettonWalletAddress, jettonWallet, _balance, balance;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          tonAddress = _ref.tonAddress, tokenContractAddress = _ref.tokenContractAddress, tokenPrecision = _ref.tokenPrecision, chainId = _ref.chainId;
          if (!(chainId === mockTonTestnetChainId)) {
            _context.next = 7;
            break;
          }
          _context.next = 4;
          return getTonTestWebProvider();
        case 4:
          _context.t0 = _context.sent;
          _context.next = 10;
          break;
        case 7:
          _context.next = 9;
          return getTonWebProvider();
        case 9:
          _context.t0 = _context.sent;
        case 10:
          tonWeb = _context.t0;
          wallet = tonWeb.wallet.create({
            address: tonAddress
          }); // if your know only address at this moment
          // const wallet = tonWeb.wallet.create({publicKey: TonWeb.utils.hexToBytes(publicKey)});
          _context.next = 14;
          return wallet.getAddress();
        case 14:
          address = _context.sent;
          if (!tokenContractAddress) {
            _context.next = 25;
            break;
          }
          // @ts-ignore
          jettonMinter = new TonWeb.token.jetton.JettonMinter(tonWeb.provider, {
            address: tokenContractAddress
          });
          _context.next = 19;
          return jettonMinter.getJettonWalletAddress(address);
        case 19:
          jettonWalletAddress = _context.sent;
          // console.log('My jetton wallet for ' + name + ' is ' + jettonWalletAddress.toString(true, true, true));
          jettonWallet = new TonWeb.token.jetton.JettonWallet(tonWeb.provider, {
            address: jettonWalletAddress
          });
          _context.next = 23;
          return jettonWallet.getData();
        case 23:
          _balance = _context.sent.balance;
          return _context.abrupt("return", {
            balance: _balance,
            formatted: Number(_balance.toString()) / Math.pow(10, tokenPrecision)
          });
        case 25:
          _context.next = 27;
          return tonWeb.getBalance(address);
        case 27:
          balance = _context.sent;
          return _context.abrupt("return", {
            balance: balance,
            formatted: TonWeb.utils.fromNano(balance)
          });
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getTonBalance(_x) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * build transfer signing message
 * @param transactionInfo  {publicKey: "be91c0...",value: 300000,toAddress: "EQC4d8D4...",memo: "1111"}
 * @returns
 */
function createSigningTransaction(_x2) {
  return _createSigningTransaction.apply(this, arguments);
}
// {'@type': 'ok', '@extra': '1724056253.9801953:10:0.38478557394306645', 'msgHash': ''};
function _createSigningTransaction() {
  _createSigningTransaction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(transactionInfo) {
    var amount, tonWeb, WalletClass, wallet, seqno, stateInit, deploy, signingMessage, stateInitBoc, sendmode, jettonMinter, walletAddress, jettonWalletAddress, jettonWallet, comment, tokenAmount, convertedAmount, transferBody, externalMessage, cellBase64, cellBase641, toAddress, info, _externalMessage, _cellBase, _cellBase2;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          amount = formatUnits(transactionInfo.value, tonDecimals);
          _context4.next = 3;
          return getTonWebProvider();
        case 3:
          tonWeb = _context4.sent;
          WalletClass = tonWeb.wallet.all['v4R2']; //
          wallet = new WalletClass(tonWeb.provider, {
            publicKey: tonWeb.utils.hexToBytes(transactionInfo.publicKey),
            wc: 0
          }); //
          _context4.next = 8;
          return wallet.methods.seqno().call();
        case 8:
          _context4.t0 = _context4.sent;
          if (_context4.t0) {
            _context4.next = 11;
            break;
          }
          _context4.t0 = 0;
        case 11:
          seqno = _context4.t0;
          stateInit = null;
          if (!(seqno == 0)) {
            _context4.next = 18;
            break;
          }
          _context4.next = 16;
          return wallet.createStateInit();
        case 16:
          deploy = _context4.sent;
          stateInit = deploy.stateInit;
        case 18:
          sendmode = SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS; // 3
          if (!(transactionInfo.tokenContractAddress && transactionInfo.tokenContractAddress.trim().length > 0 && transactionInfo.tokenPrecision)) {
            _context4.next = 49;
            break;
          }
          jettonMinter = new TonWeb.token.jetton.JettonMinter(tonWeb.provider,
          // @ts-ignore
          {
            address: transactionInfo.tokenContractAddress
          }); //
          _context4.next = 23;
          return wallet.getAddress();
        case 23:
          walletAddress = _context4.sent;
          _context4.next = 26;
          return jettonMinter.getJettonWalletAddress(walletAddress);
        case 26:
          jettonWalletAddress = _context4.sent;
          //
          jettonWallet = new TonWeb.token.jetton.JettonWallet(tonWeb.provider, {
            address: jettonWalletAddress.toString(true, true, false)
          });
          if (typeof transactionInfo.memo === 'string') {
            comment = new Uint8Array([].concat(new TextEncoder().encode(transactionInfo.memo || '0')));
          } else {
            comment = transactionInfo.memo;
          }
          //
          tokenAmount = Number(amount) * Math.pow(10, transactionInfo.tokenPrecision);
          convertedAmount = TonWeb.utils.toNano((tokenAmount / Math.pow(10, 9)).toString()); //
          _context4.next = 33;
          return jettonWallet.createTransferBody({
            queryId: seqno,
            // @ts-ignore
            jettonAmount: convertedAmount,
            toAddress: new TonWeb.utils.Address(transactionInfo.toAddress),
            forwardPayload: comment,
            forwardAmount: TonWeb.utils.toNano('0.0001'),
            responseAddress: walletAddress
          });
        case 33:
          transferBody = _context4.sent;
          _context4.next = 36;
          return wallet.createTransferMessage(new Uint8Array(),
          //
          jettonWalletAddress.toString(true, true, false), TonWeb.utils.toNano('0.05'),
          //
          seqno, transferBody, sendmode,
          //3, // sendmode
          true,
          //
          stateInit);
        case 36:
          externalMessage = _context4.sent;
          _context4.next = 39;
          return externalMessage.signingMessage.toBoc(false);
        case 39:
          cellBase64 = _context4.sent;
          if (!stateInit) {
            _context4.next = 45;
            break;
          }
          _context4.next = 43;
          return stateInit.toBoc(false);
        case 43:
          cellBase641 = _context4.sent;
          stateInitBoc = tonWeb.utils.bytesToHex(cellBase641);
        case 45:
          signingMessage = tonWeb.utils.bytesToHex(cellBase64);
          return _context4.abrupt("return", {
            signingMessageBoc: signingMessage,
            stateInitBoc: stateInitBoc
          });
        case 49:
          toAddress = new TonWeb.utils.Address(transactionInfo.toAddress).toString(true, true, true);
          _context4.next = 52;
          return tonWeb.provider.getAddressInfo(transactionInfo.toAddress);
        case 52:
          info = _context4.sent;
          if (info.state !== 'active') {
            toAddress = new TonWeb.utils.Address(transactionInfo.toAddress).toString(true, true, false); // convert to non-bounce
          }
          // const buffer = tonWeb.utils.base64ToBytes(transactionInfo.memo)
          // const comment = tonWeb.boc.Cell.oneFromBoc(buffer)
          _context4.next = 56;
          return wallet.createTransferMessage(new Uint8Array(), toAddress, TonWeb.utils.toNano(amount), seqno, transactionInfo.memo,
          //
          sendmode,
          //3,
          true, stateInit);
        case 56:
          _externalMessage = _context4.sent;
          _context4.next = 59;
          return _externalMessage.signingMessage.toBoc(false);
        case 59:
          _cellBase = _context4.sent;
          signingMessage = tonWeb.utils.bytesToHex(_cellBase);
          // const hash = await externalMessage.signingMessage.hash();
          if (!stateInit) {
            _context4.next = 66;
            break;
          }
          _context4.next = 64;
          return stateInit.toBoc(false);
        case 64:
          _cellBase2 = _context4.sent;
          stateInitBoc = tonWeb.utils.bytesToHex(_cellBase2);
        case 66:
          return _context4.abrupt("return", {
            signingMessageBoc: signingMessage,
            stateInitBoc: stateInitBoc
          });
        case 67:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _createSigningTransaction.apply(this, arguments);
}
function sendTransaction$1(_x3, _x4, _x5) {
  return _sendTransaction$1.apply(this, arguments);
}
// {@extra: "1723608477.1462789:0:0.6971379973574183", @type: "query.fees", destination_fees: [], source_fees: {@type: "fees",fwd_fee: 0,gas_fee: 0,in_fwd_fee: 1006800,storage_fee:618}}
function _sendTransaction$1() {
  _sendTransaction$1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(signedTransaction, walletAddress, chainId) {
    var tonWeb, cell, msgHash, lt, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!(chainId == mockTonTestnetChainId)) {
            _context5.next = 6;
            break;
          }
          _context5.next = 3;
          return getTonTestWebProvider();
        case 3:
          _context5.t0 = _context5.sent;
          _context5.next = 9;
          break;
        case 6:
          _context5.next = 8;
          return getTonWebProvider();
        case 8:
          _context5.t0 = _context5.sent;
        case 9:
          tonWeb = _context5.t0;
          cell = tonWeb.boc.Cell.fromBoc(tonWeb.utils.base64ToBytes(signedTransaction))[0];
          _context5.t1 = tonWeb.utils;
          _context5.next = 14;
          return cell.hash();
        case 14:
          _context5.t2 = _context5.sent;
          msgHash = _context5.t1.bytesToBase64.call(_context5.t1, _context5.t2);
          lt = ''; // if(walletAddress){
          //   const addressInfo = await tonWeb.provider.getAddressInfo(walletAddress);
          //   lt = addressInfo.last_transaction_id.lt || ''
          // }
          _context5.next = 19;
          return tonWeb.provider.sendBoc(signedTransaction);
        case 19:
          result = _context5.sent;
          return _context5.abrupt("return", _extends({}, result, {
            msgHash: msgHash,
            lt: lt
          }));
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _sendTransaction$1.apply(this, arguments);
}
function getTransactionsByInMessageHash(_x8) {
  return _getTransactionsByInMessageHash.apply(this, arguments);
}
function _getTransactionsByInMessageHash() {
  _getTransactionsByInMessageHash = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(msg_hash) {
    var transRes;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return axios.get(hashHttp + "/getTransactionsByInMessageHash?msg_hash=" + encodeURIComponent(msg_hash) + "&include_msg_body=false&include_block=false", {
            headers: {
              'X-API-Key': apiKey
            }
          });
        case 2:
          transRes = _context7.sent;
          return _context7.abrupt("return", (transRes == null ? void 0 : transRes.data) || []);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _getTransactionsByInMessageHash.apply(this, arguments);
}

var ProxyLocalStorage = /*#__PURE__*/function () {
  function ProxyLocalStorage() {
    this.prefix = 'tomo-tg-wallet-sdk-';
    this.userId = '';
    if (typeof window != 'undefined') {
      var _initDataUnsafe$user;
      this.Telegram = window.Telegram;
      if (!this.Telegram) {
        throw "[TOMO] please include https://telegram.org/js/telegram-web-app.js in your project";
      }
      var initDataUnsafe = this.Telegram.WebApp.initDataUnsafe || {
        user: {
          id: ''
        }
      };
      var userId = (initDataUnsafe == null || (_initDataUnsafe$user = initDataUnsafe.user) == null ? void 0 : _initDataUnsafe$user.id) || '';
      this.userId = userId;
    }
  }
  var _proto = ProxyLocalStorage.prototype;
  _proto.get = function get(key, withTgUserId) {
    if (withTgUserId === void 0) {
      withTgUserId = true;
    }
    if (typeof window === 'undefined') return null;
    var oKey = withTgUserId ? "" + this.prefix + key + "_" + this.userId : "" + this.prefix + key;
    try {
      var value = localStorage.getItem(oKey);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  _proto.set = function set(key, value, withTgUserId) {
    if (withTgUserId === void 0) {
      withTgUserId = true;
    }
    if (typeof window === 'undefined') return null;
    var oKey = withTgUserId ? "" + this.prefix + key + "_" + this.userId : "" + this.prefix + key;
    try {
      localStorage.setItem(oKey, JSON.stringify(value));
      return value;
    } catch (error) {
      return null;
    }
  };
  return ProxyLocalStorage;
}();
function useProxyLocalStorage() {
  var _useState = useState({
      get: function get() {
        console.warn('local storage proxy not created yet');
        return '';
      },
      set: function set() {
        console.warn('local storage proxy not created yet');
        return '';
      }
    }),
    storage = _useState[0],
    setStorage = _useState[1];
  useEffect(function () {
    setStorage(new ProxyLocalStorage());
  }, []);
  return storage;
}

var AppInfo = {
  id: 'tomo',
  version: '1.1.4',
  name: 'Tomo Wallet',
  homepage: 'https://tomo.inc',
  logo: '',
  description: 'Multi-Chain Wallet based on Telegram, by tomo team 🧑‍🤝‍🧑',
  downloadLinks: {
    android: '',
    googlePlay: '',
    ios: '',
    appleStore: '',
    testflight: '',
    telegram: '',
    browserExtension: {
      chrome: '',
      edge: ''
    }
  },
  deepLinks: {
    scheme: 'tomo://',
    universallink: 'https://',
    direct_link: 'https://t.me/tomowalletbot/tomo_wallet'
  }
};
// Prod
var BASE_URL = {
  bridge: 'https://bridge.anyconn.org/v1/sub',
  connect: 'https://tg.tomo.inc/bot-server/sdk/signature',
  connect_direct_link: 'https://t.me/tomowalletbot/tomo_wallet'
};
var LOCALES = ['en_US', 'ru_RU', 'zh_CN', 'zh', 'ar_AE', 'cs_CZ', 'de_DE', 'es_ES', 'es_LAT', 'fr_FR', 'id_ID', 'it_IT', 'nl_NL', 'pl_PL', 'pt_BR', 'pt_PT', 'ro_RO', 'tr_TR', 'uk_UA', 'vi_VN'];

var mockEvmChainIds = {
  SOL: mockSolEvmChainId,
  BTC: mockBtcEvmChainId,
  TON: mockTonChainId
};
var CONNECT_MAP;
(function (CONNECT_MAP) {
  CONNECT_MAP["TOMO_MINI_APP"] = "Tomo Mini App";
  CONNECT_MAP["OKX_CONNECT"] = "OKX Connect";
  CONNECT_MAP["TON_CONNECT"] = "TON Connect";
  CONNECT_MAP["BITGET_WALLET"] = "Bitget Wallet";
  CONNECT_MAP["UXUY_WALLET"] = "UXUY";
})(CONNECT_MAP || (CONNECT_MAP = {}));
var ChainIdWithConnectsMap = {
  SOL: [CONNECT_MAP.TOMO_MINI_APP],
  BTC: [],
  TON: [CONNECT_MAP.TOMO_MINI_APP, CONNECT_MAP.OKX_CONNECT, CONNECT_MAP.TON_CONNECT],
  EVM: [CONNECT_MAP.TOMO_MINI_APP, CONNECT_MAP.OKX_CONNECT, CONNECT_MAP.BITGET_WALLET, CONNECT_MAP.UXUY_WALLET]
};

var tgUtils = {
  decodeTelegramUrlParameters: function decodeTelegramUrlParameters(encodedParameters, isObject) {
    if (isObject === void 0) {
      isObject = true;
    }
    var decodedParams = encodedParameters.replaceAll('--', '%').replaceAll('__', '=').replaceAll('-', '&').replaceAll('%5F', '_').replaceAll('%2D', '-').replaceAll('%2E', '.');
    if (isObject) return qs.parse(decodedParams);
    return decodedParams;
  },
  stringify: function stringify(obj) {
    var params = new URLSearchParams();
    function buildParams(prefix, value) {
      if (Array.isArray(value)) {
        value.forEach(function (v, i) {
          if (/\[\]$/.test(prefix)) {
            params.append(prefix, v);
          } else {
            buildParams(prefix + "[" + (typeof v === 'object' ? i : '') + "]", v);
          }
        });
      } else if (typeof value === 'object') {
        for (var key in value) {
          buildParams(prefix + "[" + key + "]", value[key]);
        }
      } else {
        params.append(prefix, value);
      }
    }
    for (var key in obj) {
      buildParams(key, obj[key]);
    }
    return params.toString();
  },
  encodeTelegramUrlParameters: function encodeTelegramUrlParameters(parameters, isObject) {
    if (isObject === void 0) {
      isObject = true;
    }
    if (isObject) {
      parameters = tgUtils.stringify(parameters);
      //  parameters = qs.stringify(parameters)
    }
    return parameters.replaceAll('.', '%2E').replaceAll('-', '%2D').replaceAll('_', '%5F').replaceAll('&', '-').replaceAll('=', '__').replaceAll('%', '--');
  },
  opendeepLink: function opendeepLink(paramsStr, _ref) {
    var _ref$domain = _ref.domain,
      domain = _ref$domain === void 0 ? 'tomowalletbot' : _ref$domain,
      _ref$appname = _ref.appname,
      appname = _ref$appname === void 0 ? 'app' : _ref$appname;
    var protoUrl = "tg://resolve?domain=" + domain + "&mode=compact&appname=" + appname + "&startapp=" + paramsStr;
    {
      var iframeContEl = document.getElementById('tgme_frame_cont') || document.body;
      var iframeEl = document.createElement('iframe');
      iframeContEl.appendChild(iframeEl);
      var pageHidden = false;
      window.addEventListener('visibilitychange', function () {
        pageHidden = document.hidden || document.webkitHidden || document.mozHidden || document.msHidden;
      }, false);
      window.addEventListener('pagehide', function () {
        pageHidden = true;
      }, false);
      window.addEventListener('blur', function () {
        pageHidden = true;
      }, false);
      if (iframeEl !== null) {
        iframeEl.src = protoUrl;
      }
       setTimeout(function () {
        if (!pageHidden) {
          window.location = protoUrl;
        }
      }, 2000);
    }
  },
  getDeepLink: function getDeepLink(_ref2) {
    var tMeUrl = _ref2.tMeUrl,
      params = _ref2.params,
      _ref2$mode = _ref2.mode,
      mode = _ref2$mode === void 0 ? 'compact' : _ref2$mode;
    var _tMeUrl$match = tMeUrl.match(/t\.me\/([^\/]+)\/([^\/]+)/),
      domain = _tMeUrl$match[1],
      appname = _tMeUrl$match[2];
    var paramsStr = params ? this.encodeTelegramUrlParameters(params) : '';
    var deepLink = "tg://resolve?domain=" + domain + "&mode=" + mode + "&appname=" + appname;
    return paramsStr ? deepLink + ("&startapp=" + paramsStr) : deepLink;
  }
};
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
var isIOS = function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};
function isTelegramInAppBrowser() {
  return /Telegram/i.test(navigator.userAgent);
}
function isPcBrowser() {
  return !isMobileDevice() && !isTelegramInAppBrowser();
}
function getOkxLanguage(lang) {
  if (lang === void 0) {
    lang = 'en_US';
  }
  return LOCALES.includes(lang) ? lang : 'en_US';
}
function getDisplayName(name) {
  var _nameMap;
  var nameMap = (_nameMap = {
    'Tomo Mini App': 'Tomo Wallet',
    'OKX Connect': 'OKX Wallet',
    'TON Connect': 'TON Wallets',
    'EVM Connect': 'EVM Wallets'
  }, _nameMap[CONNECT_MAP.BITGET_WALLET] = 'Bitget Wallet', _nameMap[CONNECT_MAP.UXUY_WALLET] = 'UXUY Wallet', _nameMap);
  return nameMap[name] || name;
}
function getDisplayDescription(name) {
  var _nameMap2;
  var nameMap = (_nameMap2 = {
    'Tomo Mini App': 'Multichain',
    'OKX Connect': 'TG & App',
    'TON Connect': '',
    'EVM Connect': ''
  }, _nameMap2[CONNECT_MAP.BITGET_WALLET] = 'mini app', _nameMap2[CONNECT_MAP.UXUY_WALLET] = 'mini app', _nameMap2);
  return nameMap[name] || '';
}

function getSyncSiteMetadata(metaData) {
  var hostname = window.location.hostname;
  try {
    var _URL;
    hostname = ((_URL = new URL((metaData == null ? void 0 : metaData.url) || "")) == null ? void 0 : _URL.hostname) || hostname;
  } catch (error) {
    console.warn("new URL(" + (metaData == null ? void 0 : metaData.url) + ") error");
  }
  return {
    url: (metaData == null ? void 0 : metaData.url) || "",
    hostname: hostname,
    name: (metaData == null ? void 0 : metaData.name) || 'DApp',
    icon: (metaData == null ? void 0 : metaData.icon) || getSyncSiteIcon(window),
    direct_link: metaData == null ? void 0 : metaData.direct_link,
    description: metaData == null ? void 0 : metaData.description
  };
}
function getSyncSiteIcon(windowObject) {
  var document = windowObject.document;
  var icons = document.querySelectorAll('head > link[rel~="icon"]');
  for (var _i = 0, _Array$from = Array.from(icons); _i < _Array$from.length; _i++) {
    var icon = _Array$from[_i];
    if (icon) {
      return icon.href;
    }
  }
  return null;
}

// Copyright (c) 2018-2022 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
function OpaqueType() {
  return function (value) {
    return value;
  };
}
var HexString = /*#__PURE__*/OpaqueType();
var AddressString = /*#__PURE__*/OpaqueType();
var BigIntString = /*#__PURE__*/OpaqueType();
function IntNumber(num) {
  return Math.floor(num);
}
var RegExpString = /*#__PURE__*/OpaqueType();
var PROVIDER_ALLIANCE = {
  EVM: 'evm',
  SOL: 'sol',
  TON: 'ton'
};
var TonTxBodyType;
(function (TonTxBodyType) {
  TonTxBodyType["JETTON_PAYLOAD_JSON_LEGACY"] = "JETTON_PAYLOAD_JSON_LEGACY";
  TonTxBodyType["STANDARD"] = "STANDARD";
})(TonTxBodyType || (TonTxBodyType = {}));
var TomoProviderEventName;
(function (TomoProviderEventName) {
  TomoProviderEventName["TOMO_EVM_PROVIDER_DISCONNECTED"] = "TOMO_EVM_PROVIDER_DISCONNECTED";
  TomoProviderEventName["TOMO_EVM_PROVIDER_CONNECTED"] = "TOMO_EVM_PROVIDER_DISCONNECTED";
})(TomoProviderEventName || (TomoProviderEventName = {}));

var messages = {
  errors: {
    disconnected: function disconnected() {
      return 'ToMoWallet: Disconnected from chain. Attempting to connect.';
    },
    permanentlyDisconnected: function permanentlyDisconnected() {
      return 'ToMoWallet: Disconnected from ToMoWallet background. Page reload required.';
    },
    sendSiteMetadata: function sendSiteMetadata() {
      return "ToMoWallet: Failed to send site metadata. This is an internal error, please report this bug.";
    },
    unsupportedSync: function unsupportedSync(method) {
      return "ToMoWallet: The ToMoWallet Ethereum provider does not support synchronous methods like " + method + " without a callback parameter.";
    },
    invalidDuplexStream: function invalidDuplexStream() {
      return 'Must provide a Node.js-style duplex stream.';
    },
    invalidNetworkParams: function invalidNetworkParams() {
      return 'ToMoWallet: Received invalid network parameters. Please report this bug.';
    },
    invalidRequestArgs: function invalidRequestArgs() {
      return "Expected a single, non-array, object argument.";
    },
    invalidRequestMethod: function invalidRequestMethod() {
      return "'args.method' must be a non-empty string.";
    },
    invalidRequestParams: function invalidRequestParams() {
      return "'args.params' must be an object or array if provided.";
    },
    invalidLoggerObject: function invalidLoggerObject() {
      return "'args.logger' must be an object if provided.";
    },
    invalidLoggerMethod: function invalidLoggerMethod(method) {
      return "'args.logger' must include required method '" + method + "'.";
    },
    invalidChains: function invalidChains(chainId) {
      return "'ToMoWallet: not supported chain with ID '" + chainId + "'. try connect wallet to supported chain.";
    },
    timeOut: function timeOut(method) {
      return "'ToMoWallet: Timed out while waiting for response from '" + method + "'.";
    }
  },
  info: {
    connected: function connected(chainId) {
      return "ToMoWallet: Connected to chain with ID \"" + chainId + "\".";
    }
  },
  warnings: {
    // deprecated properties
    chainIdDeprecation: "ToMoWallet: 'ethereum.chainId' is deprecated and may be removed in the future. Please use the 'eth_chainId' RPC method instead.",
    networkVersionDeprecation: "ToMoWallet: 'ethereum.networkVersion' is deprecated and may be removed in the future. Please use the 'net_version' RPC method instead.",
    selectedAddressDeprecation: "ToMoWallet: 'ethereum.selectedAddress' is deprecated and may be removed in the future. Please use the 'eth_accounts' RPC method instead.",
    // deprecated methods
    enableDeprecation: "ToMoWallet: 'ethereum.enable()' is deprecated and may be removed in the future. Please use the 'eth_requestAccounts' RPC method instead.",
    sendDeprecation: "ToMoWallet: 'ethereum.send(...)' is deprecated and may be removed in the future. Please use 'ethereum.sendAsync(...)' or 'ethereum.request(...)' instead.",
    // deprecated events
    events: {
      close: "ToMoWallet: The event 'close' is deprecated and may be removed in the future. Please use 'disconnect' instead.",
      data: "ToMoWallet: The event 'data' is deprecated and will be removed in the future. Use 'message' instead.",
      networkChanged: "ToMoWallet: The event 'networkChanged' is deprecated and may be removed in the future. Use 'chainChanged' instead.",
      notification: "ToMoWallet: The event 'notification' is deprecated and may be removed in the future. Use 'message' instead."
    },
    rpc: {
      ethDecryptDeprecation: "ToMoWallet: The RPC method 'eth_decrypt' is deprecated and may be removed in the future.",
      ethGetEncryptionPublicKeyDeprecation: "ToMoWallet: The RPC method 'eth_getEncryptionPublicKey' is deprecated and may be removed in the future.",
      walletWatchAssetNFTExperimental: "ToMoWallet: The RPC method 'wallet_watchAsset' is experimental for ERC721/ERC1155 assets and may change in the future."
    },
    // misc
    experimentalMethods: "ToMoWallet: 'ethereum._ToMoWallet' exposes non-standard, experimental methods. They may be removed or changed without warning."
  }
};
var errorCodes = {
  rpc: {
    timeoutRequest: -30008,
    invalidInput: -32000,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603
  },
  provider: {
    unsupportedChain: 4002,
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901
  }
};
/* eslint-disable @typescript-eslint/naming-convention */
var errorValues = {
  '-32700': {
    standard: 'JSON RPC 2.0',
    message: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.'
  },
  '-32600': {
    standard: 'JSON RPC 2.0',
    message: 'The JSON sent is not a valid Request object.'
  },
  '-32601': {
    standard: 'JSON RPC 2.0',
    message: 'The method does not exist / is not available.'
  },
  '-32602': {
    standard: 'JSON RPC 2.0',
    message: 'Invalid method parameter(s).'
  },
  '-32603': {
    standard: 'JSON RPC 2.0',
    message: 'Internal JSON-RPC error.'
  },
  '-32000': {
    standard: 'EIP-1474',
    message: 'Invalid input.'
  },
  '-32001': {
    standard: 'EIP-1474',
    message: 'Resource not found.'
  },
  '-32002': {
    standard: 'EIP-1474',
    message: 'Resource unavailable.'
  },
  '-32003': {
    standard: 'EIP-1474',
    message: 'Transaction rejected.'
  },
  '-32004': {
    standard: 'EIP-1474',
    message: 'Method not supported.'
  },
  '-32005': {
    standard: 'EIP-1474',
    message: 'Request limit exceeded.'
  },
  '4001': {
    standard: 'EIP-1193',
    message: 'User rejected the request.'
  },
  '4100': {
    standard: 'EIP-1193',
    message: 'The requested account and/or method has not been authorized by the user.'
  },
  '4200': {
    standard: 'EIP-1193',
    message: 'The requested method is not supported by this Ethereum provider.'
  },
  '4900': {
    standard: 'EIP-1193',
    message: 'The provider is disconnected from all chains.'
  },
  '4901': {
    standard: 'EIP-1193',
    message: 'The provider is disconnected from the specified chain.'
  }
};
var FALLBACK_MESSAGE = 'Unspecified error message. This is a bug, please report it.';
var rpcErrors = {
  // timeoutRequest: function ({ code, message, data }: { code?: number | string, message?: string, data?: any }) {
  //   code = (code || errorCodes.rpc.invalidRequest).toString()
  //   return {
  //     code: errorCodes.rpc.invalidRequest,
  //     message: message || errorValues[code as ErrorValueKey].message || FALLBACK_MESSAGE,
  //     data
  //   }
  // },
  invalidRequest: function invalidRequest(_ref) {
    var code = _ref.code,
      message = _ref.message,
      data = _ref.data;
    code = (code || errorCodes.rpc.invalidRequest).toString();
    return {
      code: code,
      message: message || errorValues[code].message || FALLBACK_MESSAGE,
      data: data
    };
  },
  methodNotSupported: function methodNotSupported(_ref2) {
    var data = _ref2.data;
    return {
      code: errorCodes.rpc.invalidRequest,
      message: FALLBACK_MESSAGE ,
      data: data
    };
  }
};

var outputDef = {
  config: {
    accounts: {
      eth: {
        address: '',
        alliance: 'evm',
        name: '',
        chainId: undefined,
        symbol: ''
      }
    }
  },
  hash: '',
  salt: '',
  signature: '',
  id: '',
  method: '',
  params: [],
  result: [],
  options: {
    account: {
      address: '',
      alliance: 'evm',
      name: '',
      chainId: undefined,
      symbol: '',
      chainKey: '',
      chainName: '',
      chainSymbol: ''
    },
    metaData: {
      hostname: '',
      icon: '',
      name: '',
      url: ''
    }
  }
};
var loginDefineProperties = function loginDefineProperties(request, response, chain, isTonProof) {
  if (chain === void 0) {
    chain = 'EVM';
  }
  if (isTonProof === void 0) {
    isTonProof = false;
  }
  var output = _extends({}, outputDef); //keep deep link
  output.hash = request.hash;
  output.salt = request.salt;
  output.signature = request.signature;
  output.id = request.id;
  output.method = request.method;
  output.params = request.params;
  if (response.code === 10000) {
    var _response$result$defa2;
    if (chain === 'EVM') {
      var _response$result$defa;
      output.config.accounts = {
        eth: {
          address: (_response$result$defa = response.result.defaultEthereumAddress) != null ? _response$result$defa : response.result.v2Address,
          alliance: 'evm',
          name: 'ethereum',
          chainId: 1,
          symbol: 'ETH'
        }
      };
    } else {
      var _request$params;
      var res = isTonProof ? response.result.user : response.result;
      output.config.accounts = formatAccount(chain, res, (_request$params = request.params) == null || (_request$params = _request$params[0]) == null ? void 0 : _request$params.chainId);
    }
    output.result = chain === 'EVM' ? [(_response$result$defa2 = response.result.defaultEthereumAddress) != null ? _response$result$defa2 : response.result.v2Address] : output.config.accounts[chain.toLowerCase()];
    if (isTonProof) {
      output.result.tonProof = response.result.tonProof;
      output.result.stateInit = response.result.stateInit;
    }
  } else {
    throw new Error(JSON.stringify(response));
  }
  output.options.account = output.config.accounts[chain === 'EVM' ? 'eth' : chain.toLowerCase()];
  return output;
};
var signDefineProperties = function signDefineProperties(request, response, source, chain) {
  if (chain === void 0) {
    chain = 'EVM';
  }
  var output = _extends({}, outputDef);
  if (chain === 'EVM') {
    output.config.accounts = {
      eth: source
    };
  } else {
    var _output$config$accoun;
    output.config.accounts = (_output$config$accoun = {}, _output$config$accoun[chain.toLowerCase()] = source, _output$config$accoun);
  }
  output.hash = request.hash;
  output.salt = request.salt;
  output.signature = request.signature;
  output.id = request.id;
  output.method = request.method;
  output.params = request.params;
  output.result = response != null ? response : {
    code: -1,
    message: 'Network error',
    result: undefined
  };
  output.options.account = output.config.accounts[chain === 'EVM' ? 'eth' : chain.toLowerCase()];
  return output;
};
var formatAccount = function formatAccount(chain, res, chainId) {
  var _res$defaultEthereumA;
  switch (chain) {
    case 'BTC':
      return {
        btc: {
          address: res.defaultBtcAddress,
          alliance: 'btc',
          name: 'bitcoin',
          chainId: chainId || 0,
          symbol: 'BTC'
        }
      };
    case 'SOL':
      return {
        sol: {
          address: res.solanaAddress,
          alliance: 'sol',
          name: 'solana',
          chainId: chainId || 501,
          symbol: 'SOL'
        }
      };
    case 'TON':
      return {
        ton: {
          // TODO: testnet address need to be changed
          address: chainId === 1101 ? res.tonAddressTest : res.tonAddress,
          publicKey: res.tonPublicKey,
          alliance: 'ton',
          name: 'ton',
          chainId: chainId || 1100,
          symbol: 'TON'
        }
      };
    case 'SUI':
      return {
        sui: {
          address: res.suiAddress,
          alliance: 'sui',
          name: 'sui',
          chainId: chainId || 784,
          symbol: 'SUI'
        }
      };
    default:
      return {
        eth: {
          address: (_res$defaultEthereumA = res.defaultEthereumAddress) != null ? _res$defaultEthereumA : res.v2Address,
          alliance: 'evm',
          name: 'ethereum',
          chainId: 1,
          symbol: 'ETH'
        }
      };
  }
};

function transfer16(val) {
  if (val === void 0) {
    val = 0;
  }
  val = isNaN(Number(val)) ? 1 : Number(val);
  return '0x' + val.toString(16);
}
/** for clear walletPromise when timeout or promise finally */
var walletPromiseTimeoutClear = /*#__PURE__*/function () {
  var walletPromiseMap = /*#__PURE__*/new Map();
  return function (id, fn, timeout) {
    if (timeout === void 0) {
      timeout = 1000;
    }
    if (walletPromiseMap.has(id)) return walletPromiseMap.get(id);
    var promise = fn();
    walletPromiseMap.set(id, promise);
    setTimeout(function () {
      walletPromiseMap["delete"](id);
    }, timeout);
    return promise["finally"](function () {
      walletPromiseMap["delete"](id);
    });
  };
}();
var defaultAccount = {
  address: '',
  chainId: '0x1',
  chainKey: 'ethereum',
  alliance: PROVIDER_ALLIANCE.EVM,
  chainName: 'Ethereum netWork',
  chainSymbol: 'ETH'
};
var ProviderUtils = /*#__PURE__*/function (_EventEmitter) {
  function ProviderUtils(options) {
    var _this;
    _this = _EventEmitter.call(this) || this;
    _this._isRetryCount = 0;
    _this.eventTimeout = (options == null ? void 0 : options.eventTimeout) || 10 * 60 * 1000;
    _this.metaData = options == null ? void 0 : options.metaData;
    _this.storage = new ProxyLocalStorage();
    _this.connectUrl = options.connect;
    _this.bridgeUrl = options.bridge;
    _this.connect_direct_link = options.connect_direct_link;
    return _this;
  }
  _inheritsLoose(ProviderUtils, _EventEmitter);
  var _proto = ProviderUtils.prototype;
  _proto.request = /*#__PURE__*/function () {
    var _request = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload) {
      var _this2 = this;
      var _ref, method, _ref$params, params, requestKey;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _ref = payload || {}, method = _ref.method, _ref$params = _ref.params, params = _ref$params === void 0 ? [] : _ref$params;
            if (!(!payload || typeof payload !== 'object' || Array.isArray(payload))) {
              _context.next = 3;
              break;
            }
            throw rpcErrors.invalidRequest({
              message: messages.errors.invalidRequestArgs(),
              data: params
            });
          case 3:
            if (!(typeof method !== 'string' || method.length === 0)) {
              _context.next = 5;
              break;
            }
            throw rpcErrors.invalidRequest({
              message: messages.errors.invalidRequestMethod(),
              data: payload
            });
          case 5:
            requestKey = method + "-" + JSON.stringify(params || []);
            return _context.abrupt("return", walletPromiseTimeoutClear(requestKey, function () {
              return _this2.connectSse(method, params);
            }));
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function request(_x) {
      return _request.apply(this, arguments);
    }
    return request;
  }() /** get sse token / add salt */;
  _proto.getSseToken =
  /*#__PURE__*/
  function () {
    var _getSseToken = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(method, params, options) {
      var account, now, id, salt, payload, publish_params, response, _response$data, hash, signature;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            account = this._account;
            now = new Date().getTime();
            this._lastTime = now;
            options = _extends({
              account: account,
              metaData: getSyncSiteMetadata(this.metaData)
            }, options, {
              timeStamp: now
            });
            id = new Date().getTime() + Math.floor(Math.random() * 1000).toString();
            salt = "salt-" + Date.now() + "-" + id;
            salt = Buffer.from(salt, 'utf-8').toString('base64').replace('==', '').replace('=', '');
            payload = {
              id: id,
              method: method,
              params: params,
              options: options
            }; // push参数
            publish_params = {
              id: payload.id,
              data: payload,
              version: '1.0',
              salt: salt
            };
            _context2.next = 11;
            return axios.post(this.connectUrl, {
              payload_base64: Buffer.from(JSON.stringify(publish_params), 'utf-8').toString('base64')
            }, {
              headers: {
                'X-Salt': salt
              }
            });
          case 11:
            response = _context2.sent;
            _response$data = response.data, hash = _response$data.hash, signature = _response$data.signature;
            return _context2.abrupt("return", {
              hash: hash,
              signature: signature,
              salt: salt
            });
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function getSseToken(_x2, _x3, _x4) {
      return _getSseToken.apply(this, arguments);
    }
    return getSseToken;
  }() /** connect sse */;
  _proto.connectSse =
  /*#__PURE__*/
  function () {
    var _connectSse = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(method, params, options) {
      var _yield$this$getSseTok, salt, hash, signature, direct_params, id, request;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.getSseToken(method, params, options);
          case 2:
            _yield$this$getSseTok = _context3.sent;
            salt = _yield$this$getSseTok.salt;
            hash = _yield$this$getSseTok.hash;
            signature = _yield$this$getSseTok.signature;
            // deepLink param
            direct_params = {
              method: method,
              params: [salt, hash, signature]
            };
            id = new Date().getTime() + Math.floor(Math.random() * 1000).toString();
            request = {
              id: id,
              method: method,
              params: params,
              options: options,
              hash: hash,
              signature: signature,
              salt: salt
            };
            return _context3.abrupt("return", this.createEventSource(hash, signature, salt, direct_params, request));
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function connectSse(_x5, _x6, _x7) {
      return _connectSse.apply(this, arguments);
    }
    return connectSse;
  }() /** create EventSource */;
  _proto.createEventSource = function createEventSource(hash, signature, salt, direct_params, request) {
    var _this3 = this;
    var eventSource = new EventSource(this.bridgeUrl + "?appid=" + hash + "&signature=" + signature + "&salt=" + salt);
    return new Promise(function (resolve, reject) {
      var timer = _this3.eventTimeout > 0 ? setTimeout(function () {
        var _errorCodes$rpc;
        reject(rpcErrors.invalidRequest({
          code: errorCodes == null || (_errorCodes$rpc = errorCodes.rpc) == null ? void 0 : _errorCodes$rpc.timeoutRequest,
          message: messages.errors.timeOut(request.method),
          data: request
        }));
        eventSource.close();
      }, _this3.eventTimeout || 60000) : null;
      eventSource.addEventListener('message', function (event) {
        if ((event == null ? void 0 : event.data) === 'hi' || (event == null ? void 0 : event.data) === 'close') return;
        if (!(event != null && event.data)) {
          _this3._isRetryCount += 1;
          eventSource.close();
          clearTimeout(timer);
          if (_this3._isRetryCount > 4) {
            _this3._isRetryCount = 0;
            throw new Error('Tomo Wallet Request error');
          }
          // retry, max 4 times
          return _this3.createEventSource(hash, signature, salt, direct_params, request);
        }
        var _request$method$split = request.method.split('_'),
          chain = _request$method$split[0],
          operation = _request$method$split[1];
        try {
          var _data, _data2;
          var decodedString = atob(event == null ? void 0 : event.data);
          var data = JSON.parse(decodedString);
          var source = _this3.storage.get('account');
          if (operation.includes('connect')) {
            var _request$params$, _extends2;
            var isTonProof = (_request$params$ = request.params[0]) == null ? void 0 : _request$params$.tonProof;
            data = loginDefineProperties(request, data, chain.toUpperCase(), isTonProof);
            _this3.storage.set('account', data.options.account);
            // add useId in storage key
            _this3.storage.set("accounts", _extends({}, _this3.storage.get("accounts") || {}, (_extends2 = {}, _extends2[chain.toLowerCase()] = data.options.account, _extends2)));
          } else {
            data = signDefineProperties(request, data, source, chain);
          }
          if (((_data = data) == null ? void 0 : _data.id) == request.id || salt == ((_data2 = data) == null ? void 0 : _data2.salt)) {
            eventSource == null || eventSource.close();
            clearTimeout(timer);
            if (data.reConnect || !data.error) {
              ProxyResponse.call(_this3, data);
            }
            _this3._isRetryCount = 0;
            data.error ? reject(data.error) : resolve(_extends({}, data.result));
            return;
          } else {
            return console.log('Tomo wallet data error');
          }
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
      _this3.openAuthBot(direct_params);
    });
  }
  /** open auth bot */;
  _proto.openAuthBot = function openAuthBot(direct_params) {
    var base64Content = {
      method: direct_params.method,
      params: direct_params.params
    };
    var base64ContentStr = JSON.stringify(base64Content);
    var utf8Array = new TextEncoder().encode(base64ContentStr);
    var base64Encoded = btoa(String.fromCharCode.apply(String, utf8Array));
    if (!this._isRetryCount) {
      var _Telegram$WebApp;
      var Telegram = window.Telegram;
      // check is tg web app sdk available
      if (!Telegram) {
        throw "[TOMO] please include https://telegram.org/js/telegram-web-app.js in your project";
      }
      var url = this.connect_direct_link + "?startapp=" + base64Encoded + "&mode=compact";
      Telegram.WebApp.initData && (Telegram == null || (_Telegram$WebApp = Telegram.WebApp) == null || _Telegram$WebApp.openTelegramLink == null ? void 0 : _Telegram$WebApp.openTelegramLink(url));
      if (!Telegram.WebApp.initData) {
        var match = this.connect_direct_link.match(/t\.me\/([^\/]+)\/([^\/]+)/);
        if (match[1] && match[2]) {
          !Telegram.WebApp.initData && tgUtils.opendeepLink(base64Encoded, {
            domain: match[1],
            appname: match[2]
          });
        } else {
          !Telegram.WebApp.initData && tgUtils.opendeepLink(base64Encoded, {});
        }
      }
    }
  }
  /** get tomo bot app infp */;
  _proto.getAppInfo = function getAppInfo() {
    return _extends({}, AppInfo);
  };
  _proto.removeAccount = function removeAccount(chainType) {
    var _extends3;
    this._accounts = _extends({}, this._accounts, (_extends3 = {}, _extends3[chainType] = null, _extends3));
  };
  _proto.getMethodInfo = function getMethodInfo(methodString) {
    return methodString.split('_') || [];
  };
  return _createClass(ProviderUtils, [{
    key: "_lastTime",
    get: function get() {
      return isNaN(Number(this.storage.get('lastTime') || 0)) ? 0 : Number(this.storage.get('lastTime') || 0);
    },
    set: function set(value) {
      this.storage.set('lastTime', value);
    }
  }, {
    key: "_account",
    get: function get() {
      return this.storage.get('account') || defaultAccount;
    },
    set: function set(account) {
      var _account, _account4;
      var oldAccount = _extends({}, this._account || defaultAccount);
      if (!account) {
        account = _extends({}, oldAccount, {
          address: ''
        });
      }
      this.storage.set('account', account);
      if (transfer16(oldAccount == null ? void 0 : oldAccount.chainId) != transfer16((_account = account) == null ? void 0 : _account.chainId)) {
        var _account2, _account3;
        this.emit('chainChanged', this == null ? void 0 : this.chainId, (_account2 = account) == null ? void 0 : _account2.alliance, account);
        this.emit('networkChanged', parseInt(this == null ? void 0 : this.chainId), (_account3 = account) == null ? void 0 : _account3.alliance);
      }
      if ((oldAccount == null ? void 0 : oldAccount.address) != ((_account4 = account) == null ? void 0 : _account4.address)) {
        var _account5, _account6;
        this.emit('accountsChanged', (_account5 = account) != null && _account5.address ? [(_account6 = account) == null ? void 0 : _account6.address] : []);
      }
    }
  }, {
    key: "_accounts",
    get: function get() {
      return this.storage.get("accounts") || {
        ethereum: defaultAccount
      };
    },
    set: function set(accounts) {
      this.storage.set("accounts", accounts);
    }
  }, {
    key: "chainId",
    get: function get() {
      var _this$_account, _this$_account2;
      return (_this$_account = this._account) != null && _this$_account.chainId ? transfer16((_this$_account2 = this._account) == null ? void 0 : _this$_account2.chainId) : null;
    }
  }]);
}(EventEmitter);
function ProxyResponse(reponsePayload) {
  var _ref2 = reponsePayload || {},
    config = _ref2.config;
  if (config) {
    // console.log('ProxyResponse', reponsePayload);
    var accounts = config == null ? void 0 : config.accounts;
    accounts && (this._accounts = _extends({}, this._accounts || {}, accounts));
    return reponsePayload;
  }
}

function _sanitizeData(data) {
  var TYPED_MESSAGE_SCHEMA = {
    type: 'object',
    properties: {
      types: {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              type: {
                type: 'string'
              }
            },
            required: ['name', 'type']
          }
        }
      },
      primaryType: {
        type: 'string'
      },
      domain: {
        type: 'object'
      },
      message: {
        type: 'object'
      }
    },
    required: ['types', 'primaryType', 'domain', 'message']
  };
  var sanitizedData = {};
  for (var key in TYPED_MESSAGE_SCHEMA.properties) {
    if (data[key]) {
      sanitizedData[key] = data[key];
    }
  }
  if ('types' in sanitizedData) {
    sanitizedData.types = Object.assign({
      EIP712Domain: []
    }, sanitizedData.types);
  }
  return sanitizedData;
}
// eip712 过滤签名消息
function vaildatorEIP712(EIP712Data) {
  try {
    EIP712Data = typeof EIP712Data == 'string' ? JSON.parse(EIP712Data) : EIP712Data;
  } catch (error) {
    console.log('EIP712Data is not a valid JSON string');
  }
  try {
    // 保留标准结构
    EIP712Data = _sanitizeData(EIP712Data);
    // 生成真实签名数据
    var extractedData = {};
    var realRequestFields = EIP712Data.types[EIP712Data.primaryType];
    realRequestFields.map(function (_ref) {
      var name = _ref.name;
      extractedData[name] = EIP712Data.message[name];
    });
    EIP712Data.message = extractedData;
    return EIP712Data;
  } catch (err) {
    console.error("parseEIP712 error");
  }
  return EIP712Data;
}
function resemblesEvmAddress(string) {
  if (string === void 0) {
    string = '';
  }
  // hex prefix 2 + 20 bytes
  return string.length === 2 + 20 * 2;
}

var AbstractAdapter = /*#__PURE__*/function (_EventEmitter) {
  function AbstractAdapter(_ref) {
    var _this;
    var protocol = _ref.protocol;
    _this = _EventEmitter.call(this) || this;
    _this.protocol = protocol;
    _this._initializeChannelMessage();
    return _this;
  }
  _inheritsLoose(AbstractAdapter, _EventEmitter);
  var _proto = AbstractAdapter.prototype;
  _proto._initializeChannelMessage = function _initializeChannelMessage() {};
  return AbstractAdapter;
}(EventEmitter);

function transfer16$1(val) {
  if (val === void 0) {
    val = 0;
  }
  val = isNaN(Number(val)) ? 1 : Number(val);
  return '0x' + val.toString(16);
}
var defaultAccount$1 = {
  address: '',
  chainId: '0x1',
  chainKey: 'ethereum',
  alliance: PROVIDER_ALLIANCE.EVM,
  chainName: 'Ethereum netWork',
  chainSymbol: 'ETH'
};
function getChainList() {
  return _getChainList.apply(this, arguments);
}
function _getChainList() {
  _getChainList = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return axios.get('https://d13t1x9bdoguib.cloudfront.net/static/chainList.json');
        case 2:
          return _context8.abrupt("return", _context8.sent);
        case 3:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _getChainList.apply(this, arguments);
}
var HttpProvider = /*#__PURE__*/function () {
  function HttpProvider(options) {
    this.options = options;
    this.rpcMap = new Map();
    this.peddingMap = new Map();
    (options == null ? void 0 : options.chainId) && this.setUrl(options.url, options.chainId);
  }
  var _proto = HttpProvider.prototype;
  _proto.setUrl = function setUrl(url, chainId) {
    this.rpcMap.set(parseInt(chainId), url);
  };
  _proto.getUrl = function getUrl(chainId) {
    return this.rpcMap.get(parseInt(chainId));
  };
  _proto.send = /*#__PURE__*/function () {
    var _send = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload, options) {
      var method, params, id, rpcUrl, requestParams, response, _response$data, error;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            method = payload.method, params = payload.params, id = payload.id;
            rpcUrl = options.rpcUrl || this.getUrl(options.chainId); // const { chainId } = options
            // const url = this.rpcMap.get(chainId)
            requestParams = {
              jsonrpc: '2.0',
              method: method,
              params: params,
              id: id || new Date().getTime()
            };
            _context.next = 5;
            return axios.post(rpcUrl, requestParams);
          case 5:
            response = _context.sent;
            // return response.data
            _response$data = response.data, error = _response$data.error;
            if (!error) {
              _context.next = 9;
              break;
            }
            throw error;
          case 9:
            return _context.abrupt("return", response.data.result);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function send(_x, _x2) {
      return _send.apply(this, arguments);
    }
    return send;
  }();
  _proto.sendBatch = /*#__PURE__*/function () {
    var _sendBatch = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(payloads, options) {
      var results, _iterator, _step, payload, result;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (options === void 0) {
              options = {};
            }
            results = [];
            _iterator = _createForOfIteratorHelperLoose(payloads);
          case 3:
            if ((_step = _iterator()).done) {
              _context2.next = 11;
              break;
            }
            payload = _step.value;
            _context2.next = 7;
            return this.send(payload, options);
          case 7:
            result = _context2.sent;
            results.push(result);
          case 9:
            _context2.next = 3;
            break;
          case 11:
            return _context2.abrupt("return", results);
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function sendBatch(_x3, _x4) {
      return _sendBatch.apply(this, arguments);
    }
    return sendBatch;
  }();
  return HttpProvider;
}();
var ProxyLocalStorage$1 = /*#__PURE__*/function () {
  function ProxyLocalStorage() {
    this.prefix = 'tomo-tg-wallet-';
  }
  var _proto2 = ProxyLocalStorage.prototype;
  _proto2.get = function get(key) {
    try {
      var value = localStorage.getItem("" + this.prefix + key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  _proto2.set = function set(key, value) {
    try {
      localStorage.setItem("" + this.prefix + key, JSON.stringify(value));
      return value;
    } catch (error) {
      return null;
    }
  };
  return ProxyLocalStorage;
}();
function ProxyResponse$1(responsePayload) {
  var _config$params, _this$_account;
  var _ref = responsePayload || {},
    method = _ref.method,
    config = _ref.config;
  var requestParams = (config == null || (_config$params = config.params) == null ? void 0 : _config$params[0]) || {};
  if (config) {
    var accounts = config == null ? void 0 : config.accounts;
    accounts && (this._accounts = accounts);
    switch (method) {
      case 'wallet_switchEthereumChain':
      case 'wallet_addEthereumChain':
        var isExist = Object.values(this._accounts || {}).find(function (account) {
          return transfer16$1(account.chainId) === transfer16$1(requestParams.chainId);
        });
        if (isExist) {
          this._account = _extends({}, isExist);
        } else {
          responsePayload.error = {
            code: -32602,
            message: "tomo wallet does not support  " + (requestParams == null ? void 0 : requestParams.chainId)
          };
        }
        break;
      case 'eth_requestAccounts':
        this._account = this._accounts[(_this$_account = this._account) == null ? void 0 : _this$_account.chainKey] || Object.values(this._accounts)[0];
        break;
    }
    return responsePayload;
  }
}
var walletPromiseTimeoutClear$1 = /*#__PURE__*/function () {
  var walletPromiseMap = /*#__PURE__*/new Map();
  return function (id, fn, timeout) {
    if (timeout === void 0) {
      timeout = 1000;
    }
    if (walletPromiseMap.has(id)) return walletPromiseMap.has(id);
    var promise = fn();
    walletPromiseMap.set(id, promise);
    setTimeout(function () {
      walletPromiseMap["delete"](id);
    }, timeout);
    return promise["finally"](function () {
      walletPromiseMap["delete"](id);
    });
  };
}();
var isReConnect = function isReConnect(lastTime, timeout) {
  if (timeout === void 0) {
    timeout = 1000 * 60 * 15;
  }
  var now = new Date().getTime();
  return now - lastTime > timeout;
};
var EthereumProvider = /*#__PURE__*/function (_AbstractProvider) {
  function EthereumProvider(options) {
    var _window;
    var _this;
    _this = _AbstractProvider.call(this, {
      protocol: PROVIDER_ALLIANCE.EVM
    }) || this;
    _this.autoRefreshOnNetworkChange = true;
    _this._isMetaMask = true;
    _this.isMetaMask = true;
    _this._isConnected = false;
    _this.isTomoWallet = true;
    _this._isRetryCount = 0;
    _this.chainList = [];
    _this.overrideRpcUrl = {};
    if (options.overrideRpcUrl) _this.overrideRpcUrl = options.overrideRpcUrl;
    _this.utils = new ProviderUtils(_extends({}, BASE_URL, options));
    _this.version = _this.getAppInfo().version;
    _this.connectUrl = options.connect || BASE_URL.connect;
    _this.bridgeUrl = options.bridge || BASE_URL.bridge;
    _this.connect_direct_link = options.connect_direct_link || BASE_URL.connect_direct_link;
    _this.eventTimeout = (options == null ? void 0 : options.eventTimeout) || 10 * 60 * 1000;
    _this.metaData = options.metaData;
    _this.storage = new ProxyLocalStorage$1();
    _this.httpProvider = new HttpProvider({
      chainId: '0x1',
      url: 'https://rpc.ankr.com/eth'
    });
    _this._initialize();
    getChainList().then(function (response) {
      return _this.chainList = response.data;
    })["catch"](function () {
      // todo what if cannot fetch chain list
    });
    if (typeof window !== 'undefined' && !((_window = window) != null && _window.ethereum) && options.injected) {
      window.ethereum = _this;
      console.log('injected in evm provider');
      dispatchEvent(new Event('ethereum#initialized'));
    }
    return _this;
  }
  // _accounts: {
  //     [key: string]: Account
  // }
  // _account: Account | null
  _inheritsLoose(EthereumProvider, _AbstractProvider);
  var _proto3 = EthereumProvider.prototype;
  _proto3.checkIsChainSupported = function checkIsChainSupported(chainId) {
    var chainIdNum = Number(chainId);
    return !!this.chainList.find(function (c) {
      return c.id === chainIdNum;
    });
  };
  _proto3._initialize = function _initialize() {
    this.emit('connect', {
      chainId: this == null ? void 0 : this.chainId
    });
    this.emit('_initialized');
  };
  _proto3._walletSwitchChain = /*#__PURE__*/function () {
    var _walletSwitchChain2 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(payload) {
      var params, requestParams, isExist;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            params = payload.params;
            requestParams = params[0];
            isExist = Object.values(this._accounts || {}).find(function (account) {
              return transfer16$1(account.chainId) === transfer16$1(requestParams.chainId);
            });
            if (isExist) {
              _context3.next = 9;
              break;
            }
            _context3.next = 6;
            return this.request({
              method: 'eth_requestAccounts'
            });
          case 6:
            isExist = Object.values(this._accounts || {}).find(function (account) {
              return transfer16$1(account.chainId) === transfer16$1(requestParams.chainId);
            });
            if (isExist) {
              _context3.next = 9;
              break;
            }
            throw rpcErrors.invalidRequest({
              code: errorCodes.provider.unsupportedChain,
              message: messages.errors.invalidChains(requestParams == null ? void 0 : requestParams.chainId.toString()),
              data: params
            });
          case 9:
            this._account = isExist;
            return _context3.abrupt("return", null);
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function _walletSwitchChain(_x5) {
      return _walletSwitchChain2.apply(this, arguments);
    }
    return _walletSwitchChain;
  }();
  _proto3.getAppInfo = function getAppInfo() {
    return _extends({}, AppInfo);
  };
  _proto3.enable = /*#__PURE__*/function () {
    var _enable = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", this.request({
              method: 'eth_requestAccounts'
            }));
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function enable() {
      return _enable.apply(this, arguments);
    }
    return enable;
  }();
  _proto3.getRpcUrl = function getRpcUrl() {
    var _this2 = this;
    var rpcUrl = this.chainList.find(function (c) {
      return c.id === Number(_this2.chainId);
    }).rpcUrl;
    if (this.overrideRpcUrl[+this.chainId]) rpcUrl = this.overrideRpcUrl[+this.chainId];
    return rpcUrl;
  };
  _proto3.request = /*#__PURE__*/function () {
    var _request2 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(payload) {
      var _this$_account2,
        _this3 = this,
        _this$_account3;
      var _ref2, method, _ref2$params, params, requestKey, isRreConnected, chainId, param, chainIdResolved, signRes, rpc, signedTx, signPersonalMessageV4, rpcUrl;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _ref2 = payload || {}, method = _ref2.method, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
            if (!(!payload || typeof payload !== 'object' || Array.isArray(payload))) {
              _context5.next = 3;
              break;
            }
            throw rpcErrors.invalidRequest({
              message: messages.errors.invalidRequestArgs(),
              data: params
            });
          case 3:
            if (!(typeof method !== 'string' || method.length === 0)) {
              _context5.next = 5;
              break;
            }
            throw rpcErrors.invalidRequest({
              message: messages.errors.invalidRequestMethod(),
              data: payload
            });
          case 5:
            _context5.prev = 5;
            requestKey = method + "-" + JSON.stringify(params || []);
            _context5.t0 = method;
            _context5.next = _context5.t0 === 'wallet_requestPermissions' ? 10 : _context5.t0 === 'eth_requestAccounts' ? 11 : _context5.t0 === 'eth_accounts' ? 15 : _context5.t0 === 'eth_chainId' ? 16 : _context5.t0 === 'wallet_switchEthereumChain' ? 17 : _context5.t0 === 'wallet_addEthereumChain' ? 17 : _context5.t0 === 'wallet_watchAsset' ? 23 : _context5.t0 === 'metamask_watchAsset' ? 23 : _context5.t0 === 'personal_sign' ? 24 : _context5.t0 === 'eth_signETHTransaction' ? 24 : _context5.t0 === 'eth_signErc20Transaction' ? 24 : _context5.t0 === 'eth_signTypedData' ? 24 : _context5.t0 === 'eth_signTransaction' ? 24 : _context5.t0 === 'eth_sendTransaction' ? 28 : _context5.t0 === 'eth_signTypedData_v3' ? 37 : _context5.t0 === 'eth_signTypedData_v4' ? 37 : 44;
            break;
          case 10:
            throw 'wallet_requestPermissions not supported';
          case 11:
            isRreConnected = isReConnect(this._lastTime, this.eventTimeout);
            if (!(this != null && (_this$_account2 = this._account) != null && _this$_account2.address && !isRreConnected)) {
              _context5.next = 14;
              break;
            }
            return _context5.abrupt("return", [this._account.address]);
          case 14:
            return _context5.abrupt("return", walletPromiseTimeoutClear$1(requestKey, function () {
              return _this3._request(method, params);
            }));
          case 15:
            return _context5.abrupt("return", [(_this$_account3 = this._account) == null ? void 0 : _this$_account3.address]);
          case 16:
            return _context5.abrupt("return", this.chainId);
          case 17:
            if (this.connected) {
              _context5.next = 20;
              break;
            }
            _context5.next = 20;
            return this.request({
              method: 'eth_requestAccounts'
            });
          case 20:
            chainId = params[0].chainId; // const isChainSupported = this.checkIsChainSupported(chainId);
            this.utils.storage.set('evm_chainId', chainId);
            // if (!isChainSupported)
            //  `chain ${chainId} is not supported`;
            return _context5.abrupt("return", null);
          case 23:
            return _context5.abrupt("return", walletPromiseTimeoutClear$1(requestKey, function () {
              return _this3._request(method, params);
            }));
          case 24:
            if (this.connected) {
              _context5.next = 27;
              break;
            }
            _context5.next = 27;
            return this.request({
              method: 'eth_requestAccounts'
            });
          case 27:
            return _context5.abrupt("return", walletPromiseTimeoutClear$1(requestKey, function () {
              return _this3._request(method, params);
            }));
          case 28:
            param = params[0];
            chainIdResolved = param.chainId;
            if (!chainIdResolved) chainIdResolved = this.chainId;
            _context5.next = 33;
            return this.request({
              method: 'eth_signTransaction',
              params: [_extends({}, param, {
                chainId: chainIdResolved
              })]
            });
          case 33:
            signRes = _context5.sent;
            rpc = this.getRpcUrl();
            signedTx = signRes.result;
            return _context5.abrupt("return", this.httpProvider.send({
              method: 'eth_sendRawTransaction',
              params: [signedTx]
            }, {
              chainId: chainIdResolved,
              chainKey: this.chainKey,
              rpcUrl: rpc
            }));
          case 37:
            if (this.connected) {
              _context5.next = 40;
              break;
            }
            _context5.next = 40;
            return this.request({
              method: 'eth_requestAccounts'
            });
          case 40:
            signPersonalMessageV4 = payload.params[0];
            if (resemblesEvmAddress(payload.params[0]) && !resemblesEvmAddress(payload.params[1])) {
              signPersonalMessageV4 = payload.params[1];
            }
            params[0] = vaildatorEIP712(signPersonalMessageV4);
            return _context5.abrupt("return", walletPromiseTimeoutClear$1(requestKey, function () {
              return _this3._request(method, params);
            }));
          case 44:
            rpcUrl = this.getRpcUrl();
            return _context5.abrupt("return", this.httpProvider.send(payload, {
              chainId: this.chainId,
              chainKey: this.chainKey,
              rpcUrl: rpcUrl
            }));
          case 46:
            _context5.next = 52;
            break;
          case 48:
            _context5.prev = 48;
            _context5.t1 = _context5["catch"](5);
            console.log(_context5.t1);
            return _context5.abrupt("return", Promise.reject(typeof _context5.t1 == 'object' ? _context5.t1 : {
              code: -32603,
              message: _context5.t1
            }));
          case 52:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this, [[5, 48]]);
    }));
    function request(_x6) {
      return _request2.apply(this, arguments);
    }
    return request;
  }();
  _proto3._createEventSource = /*#__PURE__*/function () {
    var _createEventSource2 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(hash, signature, salt, direct_params, request) {
      var _this4 = this;
      var eventSource;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            eventSource = new EventSource(this.bridgeUrl + "?appid=" + hash + "&signature=" + signature + "&salt=" + salt);
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              var timer = _this4.eventTimeout > 0 ? setTimeout(function () {
                var _errorCodes$rpc;
                reject(rpcErrors.invalidRequest({
                  code: errorCodes == null || (_errorCodes$rpc = errorCodes.rpc) == null ? void 0 : _errorCodes$rpc.timeoutRequest,
                  message: messages.errors.timeOut(direct_params.method),
                  data: direct_params.params
                }));
                eventSource.close();
              }, _this4.eventTimeout || 60000) : null;
              // @ts-ignore
              eventSource.addEventListener('message', function (event) {
                // @ts-ignore
                if ((event == null ? void 0 : event.data) === 'hi' || (event == null ? void 0 : event.data) === 'close') return;
                if (!(event != null && event.data)) {
                  _this4._isRetryCount += 1;
                  eventSource.close();
                  clearTimeout(timer);
                  if (_this4._isRetryCount > 4) {
                    _this4._isRetryCount = 0;
                    throw new Error('Tomo Wallet Request error');
                  }
                  return _this4._createEventSource(hash, signature, salt, direct_params, request);
                }
                try {
                  var _data, _data2;
                  var decodedString = atob(event == null ? void 0 : event.data);
                  var data = JSON.parse(decodedString);
                  if (request.method === 'eth_requestAccounts' || request.method === 'wallet_requestPermissions') {
                    data = loginDefineProperties(request, data);
                  } else if (request.method === 'eth_signETHTransaction' || request.method === 'eth_signTransaction') {
                    var source = _this4._account;
                    data = signDefineProperties(request, data, source);
                  } else if (request.method === 'personal_sign') {
                    var _source = _this4._account;
                    console.log('personal_sign data', data);
                    data = signDefineProperties(request, data.result, _source);
                  } else if (request.method === 'eth_signErc20Transaction') {
                    var _source2 = _this4._account;
                    data = signDefineProperties(request, data, _source2);
                  }
                  // not supposes to support
                  // else if (request.method === 'wallet_addSeed') {
                  // const source = this._account;
                  // data = signDefineProperties(request, data, source);
                  // const acc_ = this._accounts
                  // if (data.result.code === 10000) {
                  //   acc_.eth.account = data.result.result.wallet_address;
                  //   acc_.eth.address = data.result.result.wallet_address;
                  // this._accounts = acc_;
                  // this._account =  acc_.eth;
                  // }
                  // }
                  if (((_data = data) == null ? void 0 : _data.id) == request.id || salt == ((_data2 = data) == null ? void 0 : _data2.salt)) {
                    eventSource == null || eventSource.close();
                    clearTimeout(timer);
                    if (data.reConnect || !data.error) {
                      ProxyResponse$1.call(_this4, data);
                    }
                    _this4._isRetryCount = 0;
                    data.error ? reject(data.error) : resolve(data.result);
                  } else {
                    console.log('Tomo wallet data error');
                  }
                } catch (error) {
                  console.log(error);
                }
              });
              _this4.utils.openAuthBot(direct_params);
            }));
          case 2:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this);
    }));
    function _createEventSource(_x7, _x8, _x9, _x10, _x11) {
      return _createEventSource2.apply(this, arguments);
    }
    return _createEventSource;
  }();
  _proto3._request = /*#__PURE__*/function () {
    var _request3 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(method, params, options) {
      var account, now, id, salt, payload, publish_params, response, _response$data2, hash, signature, direct_params, request;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            account = this._account;
            now = new Date().getTime();
            this._lastTime = now;
            options = _extends({
              account: account,
              metaData: getSyncSiteMetadata(this.metaData)
            }, options, {
              timeStamp: now
            });
            id = new Date().getTime() + Math.floor(Math.random() * 1000).toString();
            salt = "salt-" + Date.now() + "-" + id;
            salt = Buffer$1.from(salt, 'utf-8').toString('base64').replace('==', '').replace('=', '');
            payload = {
              id: id,
              method: method,
              params: params,
              options: options
            }; // push参数
            publish_params = {
              id: payload.id,
              data: payload,
              version: '1.0',
              salt: salt
            };
            _context7.next = 11;
            return axios.post(this.connectUrl, {
              payload_base64: Buffer$1.from(JSON.stringify(publish_params), 'utf-8').toString('base64')
            }, {
              headers: {
                'X-Salt': salt
              }
            });
          case 11:
            response = _context7.sent;
            _response$data2 = response.data, hash = _response$data2.hash, signature = _response$data2.signature; //深度链参数
            direct_params = {
              method: method,
              params: [salt, hash, signature]
            };
            request = _extends({}, payload, {
              hash: hash,
              signature: signature,
              salt: salt
            });
            return _context7.abrupt("return", this._createEventSource(hash, signature, salt, direct_params, request));
          case 16:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this);
    }));
    function _request(_x12, _x13, _x14) {
      return _request3.apply(this, arguments);
    }
    return _request;
  }();
  _proto3.disconnect = function disconnect() {
    this._account = null;
    this.emit('accountsChanged', []);
    this.emit(TomoProviderEventName.TOMO_EVM_PROVIDER_DISCONNECTED, '');
    // this.emit('close', "");
  };
  return _createClass(EthereumProvider, [{
    key: "_lastTime",
    get: function get() {
      return isNaN(Number(this.storage.get('lastTime') || 0)) ? 0 : Number(this.storage.get('lastTime') || 0);
    },
    set: function set(value) {
      this.storage.set('lastTime', value);
    }
  }, {
    key: "_account",
    get: function get() {
      return this.storage.get('evm_account') || defaultAccount$1;
    },
    set: function set(account) {
      var _account, _account4;
      var oldAccount = _extends({}, this._account || defaultAccount$1);
      if (!account) {
        account = _extends({}, oldAccount, {
          address: ''
        });
      }
      this.storage.set('evm_account', account);
      if (transfer16$1(oldAccount == null ? void 0 : oldAccount.chainId) != transfer16$1((_account = account) == null ? void 0 : _account.chainId)) {
        var _account2, _account3;
        this.emit('chainChanged', this == null ? void 0 : this.chainId, (_account2 = account) == null ? void 0 : _account2.alliance, account);
        this.emit('networkChanged', parseInt(this == null ? void 0 : this.chainId), (_account3 = account) == null ? void 0 : _account3.alliance);
      }
      if ((oldAccount == null ? void 0 : oldAccount.address) != ((_account4 = account) == null ? void 0 : _account4.address)) {
        var _account5, _account6;
        this.emit('accountsChanged', (_account5 = account) != null && _account5.address ? [(_account6 = account) == null ? void 0 : _account6.address] : []);
      }
    }
  }, {
    key: "_accounts",
    get: function get() {
      return this.storage.get('evm_accounts') || {
        ethereum: defaultAccount$1
      };
    },
    set: function set(accounts) {
      this.storage.set('evm_accounts', accounts);
    }
  }, {
    key: "networkVersion",
    get: function get() {
      return parseInt(this.chainId);
    }
  }, {
    key: "chainId",
    get: function get() {
      var chainId = this.utils.storage.get('evm_chainId');
      return transfer16$1(chainId);
    }
  }, {
    key: "chainKey",
    get: function get() {
      var _this$_account4;
      return ((_this$_account4 = this._account) == null ? void 0 : _this$_account4.chainKey) || (defaultAccount$1 == null ? void 0 : defaultAccount$1.chainKey);
    }
  }, {
    key: "connected",
    get: function get() {
      var _this$_account5;
      return (_this$_account5 = this._account) != null && _this$_account5.address ? true : false;
    }
  }, {
    key: "selectedAddress",
    get: function get() {
      var _this$_account6;
      return ((_this$_account6 = this._account) == null ? void 0 : _this$_account6.address) || '';
    }
  }, {
    key: "isConnected",
    get: function get() {
      return this.connected;
    }
  }]);
}(AbstractAdapter);

export { getDisplayDescription as $, btcDecimals as A, getSystemTokens as B, v1AllAssetApi as C, v1AddAssetApi as D, signEvmTransactionApi as E, solSignRawTransaction as F, getSendSplToken as G, sendSolTx as H, btcSignPsbtAndPush as I, sendTx as J, sendTransaction$1 as K, tonSignMessage as L, createSigningTransaction as M, getSwapAllTokensV3 as N, getSwapAllTokensSearch as O, checkLoginByCodeApi as P, useProxyLocalStorage as Q, getOkxLanguage as R, ProxyLocalStorage as S, ToSerializeTransaction as T, EthereumProvider as U, TomoProviderEventName as V, CONNECT_MAP as W, isPcBrowser as X, isIOS as Y, getDisplayName as Z, _asyncToGenerator as _, _regeneratorRuntime as a, ChainIdWithConnectsMap as a0, api as a1, getTelegramUserInfoApi as a2, apiList as a3, loginApi as a4, sendBindEmailCodeApi as a5, verifyBindEmailCodeApi as a6, buildSwapTxApi as a7, getTransactionsByInMessageHash as a8, _objectWithoutPropertiesLoose as a9, mockEvmChainIds as aa, OpaqueType as ab, HexString as ac, AddressString as ad, BigIntString as ae, IntNumber as af, RegExpString as ag, PROVIDER_ALLIANCE as ah, TonTxBodyType as ai, _inheritsLoose as aj, ProviderUtils as ak, BASE_URL as al, sendTransaction as am, _createClass as an, mockTonTestnetChainId as ao, AppInfo as ap, setPaymentPasswd as b, changePaymentPasswd as c, checkPaymentPasswd as d, pkValidateApi as e, pkSignApi as f, getDeviceId as g, mockSolEvmChainId as h, mockBtcEvmChainId as i, mockTonChainId as j, getConfigChainsAll as k, pkCheckApi as l, mfaAuthVerificationApi as m, pkCreateApi as n, pkRegApi as o, passkeyKey as p, _extends as q, btcAddressTypeMaps as r, successCode as s, getConnection as t, useLocalStore as u, validatePaymentPasswd as v, tonDecimals as w, getTonBalance as x, solDecimals as y, getSolBalance as z };
//# sourceMappingURL=EthereumProvider-0d47aac9.js.map
