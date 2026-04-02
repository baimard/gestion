(self["webpackChunkgestion"] = self["webpackChunkgestion"] || []).push([[399],{

/***/ 144:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(3908)
const parse = (version, options, throwErrors = false) => {
  if (version instanceof SemVer) {
    return version
  }
  try {
    return new SemVer(version, options)
  } catch (er) {
    if (!throwErrors) {
      return null
    }
    throw er
  }
}

module.exports = parse


/***/ }),

/***/ 251:
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 432:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ScopedStorage {
  constructor(scope, wrapped, persistent) {
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "wrapped", void 0);
    this.scope = "".concat(persistent ? ScopedStorage.GLOBAL_SCOPE_PERSISTENT : ScopedStorage.GLOBAL_SCOPE_VOLATILE, "_").concat(btoa(scope), "_");
    this.wrapped = wrapped;
  }
  scopeKey(key) {
    return "".concat(this.scope).concat(key);
  }
  setItem(key, value) {
    this.wrapped.setItem(this.scopeKey(key), value);
  }
  getItem(key) {
    return this.wrapped.getItem(this.scopeKey(key));
  }
  removeItem(key) {
    this.wrapped.removeItem(this.scopeKey(key));
  }
  clear() {
    Object.keys(this.wrapped).filter(key => key.startsWith(this.scope)).map(this.wrapped.removeItem.bind(this.wrapped));
  }
}
exports["default"] = ScopedStorage;
_defineProperty(ScopedStorage, "GLOBAL_SCOPE_VOLATILE", 'nextcloud_vol');
_defineProperty(ScopedStorage, "GLOBAL_SCOPE_PERSISTENT", 'nextcloud_per');
//# sourceMappingURL=scopedstorage.js.map

/***/ }),

/***/ 1123:
/***/ ((module) => {

"use strict";


const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers,
}


/***/ }),

/***/ 1338:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B1: () => (/* binding */ subscribe),
/* harmony export */   Ic: () => (/* binding */ emit),
/* harmony export */   al: () => (/* binding */ unsubscribe)
/* harmony export */ });
/* unused harmony exports ProxyBus, SimpleBus */
/* harmony import */ var semver_functions_valid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6953);
/* harmony import */ var semver_functions_major_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2938);


class ProxyBus {
  bus;
  constructor(bus2) {
    if (typeof bus2.getVersion !== "function" || !semver_functions_valid_js__WEBPACK_IMPORTED_MODULE_0__(bus2.getVersion())) {
      console.warn("Proxying an event bus with an unknown or invalid version");
    } else if (semver_functions_major_js__WEBPACK_IMPORTED_MODULE_1__(bus2.getVersion()) !== semver_functions_major_js__WEBPACK_IMPORTED_MODULE_1__(this.getVersion())) {
      console.warn(
        "Proxying an event bus of version " + bus2.getVersion() + " with " + this.getVersion()
      );
    }
    this.bus = bus2;
  }
  getVersion() {
    return "3.3.2";
  }
  subscribe(name, handler) {
    this.bus.subscribe(name, handler);
  }
  unsubscribe(name, handler) {
    this.bus.unsubscribe(name, handler);
  }
  emit(name, ...event) {
    this.bus.emit(name, ...event);
  }
}
class SimpleBus {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.2";
  }
  subscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).concat(
        handler
      )
    );
  }
  unsubscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).filter((h) => h !== handler)
    );
  }
  emit(name, ...event) {
    const handlers = this.handlers.get(name) || [];
    handlers.forEach((h) => {
      try {
        ;
        h(event[0]);
      } catch (e) {
        console.error("could not invoke event listener", e);
      }
    });
  }
}
let bus = null;
function getBus() {
  if (bus !== null) {
    return bus;
  }
  if (typeof window === "undefined") {
    return new Proxy({}, {
      get: () => {
        return () => console.error(
          "Window not available, EventBus can not be established!"
        );
      }
    });
  }
  if (window.OC?._eventBus && typeof window._nc_event_bus === "undefined") {
    console.warn(
      "found old event bus instance at OC._eventBus. Update your version!"
    );
    window._nc_event_bus = window.OC._eventBus;
  }
  if (typeof window?._nc_event_bus !== "undefined") {
    bus = new ProxyBus(window._nc_event_bus);
  } else {
    bus = window._nc_event_bus = new SimpleBus();
  }
  return bus;
}
function subscribe(name, handler) {
  getBus().subscribe(name, handler);
}
function unsubscribe(name, handler) {
  getBus().unsubscribe(name, handler);
}
function emit(name, ...event) {
  getBus().emit(name, ...event);
}



/***/ }),

/***/ 1777:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HW: () => (/* binding */ getCurrentUser),
/* harmony export */   L$: () => (/* binding */ setGuestNickname),
/* harmony export */   "do": () => (/* binding */ getRequestToken),
/* harmony export */   zo: () => (/* binding */ onRequestTokenUpdate)
/* harmony export */ });
/* unused harmony exports getCSPNonce, getGuestNickname, getGuestUser */
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1338);
/* harmony import */ var _nextcloud_browser_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9097);


let token;
const observers = [];
function getRequestToken() {
  if (token === void 0) {
    token = document.head.dataset.requesttoken ?? null;
  }
  return token;
}
function onRequestTokenUpdate(observer) {
  observers.push(observer);
}
(0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_0__/* .subscribe */ .B1)("csrf-token-update", (e) => {
  token = e.token;
  observers.forEach((observer) => {
    try {
      observer(token);
    } catch (e2) {
      console.error("Error updating CSRF token observer", e2);
    }
  });
});
function getCSPNonce() {
  const meta = document?.querySelector('meta[name="csp-nonce"]');
  if (!meta) {
    const token2 = getRequestToken();
    return token2 ? btoa(token2) : void 0;
  }
  return meta.nonce;
}
const browserStorage = (0,_nextcloud_browser_storage__WEBPACK_IMPORTED_MODULE_1__/* .getBuilder */ .c0)("public").persist().build();
class GuestUser {
  _displayName;
  uid;
  isAdmin;
  constructor() {
    if (!browserStorage.getItem("guestUid")) {
      browserStorage.setItem("guestUid", self.crypto.randomUUID());
    }
    this._displayName = browserStorage.getItem("guestNickname") || "";
    this.uid = browserStorage.getItem("guestUid") || self.crypto.randomUUID();
    this.isAdmin = false;
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_0__/* .subscribe */ .B1)("user:info:changed", (guest) => {
      this._displayName = guest.displayName;
      browserStorage.setItem("guestNickname", guest.displayName || "");
    });
  }
  get displayName() {
    return this._displayName;
  }
  set displayName(displayName) {
    this._displayName = displayName;
    browserStorage.setItem("guestNickname", displayName);
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_0__/* .emit */ .Ic)("user:info:changed", this);
  }
}
let currentUser$1;
function getGuestUser() {
  if (!currentUser$1) {
    currentUser$1 = new GuestUser();
  }
  return currentUser$1;
}
function getGuestNickname() {
  return getGuestUser()?.displayName || null;
}
function setGuestNickname(nickname) {
  if (!nickname || nickname.trim().length === 0) {
    throw new Error("Nickname cannot be empty");
  }
  getGuestUser().displayName = nickname;
}
let currentUser;
const getAttribute = (el, attribute) => {
  if (el) {
    return el.getAttribute(attribute);
  }
  return null;
};
function getCurrentUser() {
  if (currentUser !== void 0) {
    return currentUser;
  }
  const head = document?.getElementsByTagName("head")[0];
  if (!head) {
    return null;
  }
  const uid = getAttribute(head, "data-user");
  if (uid === null) {
    currentUser = null;
    return currentUser;
  }
  currentUser = {
    uid,
    displayName: getAttribute(head, "data-user-displayname"),
    isAdmin: !!window._oc_isadmin
  };
  return currentUser;
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 2182:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* reexport safe */ _chunks_NcTextField_o_8gWurX_mjs__WEBPACK_IMPORTED_MODULE_0__.N)
/* harmony export */ });
/* harmony import */ var _chunks_NcTextField_o_8gWurX_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8028);


//# sourceMappingURL=NcTextField.mjs.map


/***/ }),

/***/ 2680:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ getSharingToken),
/* harmony export */   f: () => (/* binding */ isPublicShare)
/* harmony export */ });
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2981);

/*!
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
function isPublicShare() {
  return (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__/* .loadState */ .C)("files_sharing", "isPublic", null) ?? document.querySelector('input#isPublic[type="hidden"][name="isPublic"][value="1"]') !== null;
}
function getSharingToken() {
  return (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__/* .loadState */ .C)("files_sharing", "sharingToken", null) ?? document.querySelector('input#sharingToken[type="hidden"]')?.value ?? null;
}

//# sourceMappingURL=public.mjs.map


/***/ }),

/***/ 2938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(3908)
const major = (a, loose) => new SemVer(a, loose).major
module.exports = major


/***/ }),

/***/ 2970:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  pt: () => (/* reexport */ FileType),
  di: () => (/* binding */ InvalidFilenameError),
  nF: () => (/* binding */ InvalidFilenameErrorReason),
  H4: () => (/* reexport */ getClient),
  VL: () => (/* reexport */ getDefaultPropfind),
  R3: () => (/* reexport */ getRecentSearch),
  Al: () => (/* reexport */ resultToNode),
  lJ: () => (/* reexport */ defaultRootPath),
  v7: () => (/* binding */ formatFileSize),
  Q$: () => (/* reexport */ getFavoriteNodes),
  ur: () => (/* binding */ sortNodes),
  KT: () => (/* binding */ validateFilename)
});

// UNUSED EXPORTS: Column, DefaultType, File, FileAction, FileListAction, FileListFilter, FilesSortingMode, Folder, Header, Navigation, NewMenuEntryCategory, Node, NodeStatus, Permission, View, addNewFileMenuEntry, davGetFavoritesReport, davGetRemoteURL, davGetRootPath, davParsePermissions, davRemoteURL, defaultDavNamespaces, defaultDavProperties, getDavNameSpaces, getDavProperties, getFileActions, getFileListActions, getFileListFilters, getFileListHeaders, getNavigation, getNewFileMenuEntries, getUniqueName, isFilenameValid, orderBy, parseFileSize, registerDavProperty, registerFileAction, registerFileListAction, registerFileListFilter, registerFileListHeaders, removeNewFileMenuEntry, unregisterFileListFilter

// EXTERNAL MODULE: ./node_modules/path/path.js
var path = __webpack_require__(3627);
;// ./node_modules/@nextcloud/paths/dist/index.mjs
function encodePath(path) {
  if (!path) {
    return path;
  }
  return path.split("/").map(encodeURIComponent).join("/");
}
function dist_basename(path) {
  return path.replace(/\\/g, "/").replace(/.*\//, "");
}
function dirname(path) {
  return path.replace(/\\/g, "/").replace(/\/[^\/]*$/, "");
}
function joinPaths(...args) {
  if (arguments.length < 1) {
    return "";
  }
  const nonEmptyArgs = args.filter((arg) => arg.length > 0);
  if (nonEmptyArgs.length < 1) {
    return "";
  }
  const lastArg = nonEmptyArgs[nonEmptyArgs.length - 1];
  const leadingSlash = nonEmptyArgs[0].charAt(0) === "/";
  const trailingSlash = lastArg.charAt(lastArg.length - 1) === "/";
  const sections = nonEmptyArgs.reduce((acc, section) => acc.concat(section.split("/")), []);
  let first = !leadingSlash;
  const path = sections.reduce((acc, section) => {
    if (section === "") {
      return acc;
    }
    if (first) {
      first = false;
      return acc + section;
    }
    return acc + "/" + section;
  }, "");
  if (trailingSlash) {
    return path + "/";
  }
  return path;
}
function isSamePath(path1, path2) {
  const pathSections1 = (path1 || "").split("/").filter((p) => p !== ".");
  const pathSections2 = (path2 || "").split("/").filter((p) => p !== ".");
  path1 = joinPaths.apply(void 0, pathSections1);
  path2 = joinPaths.apply(void 0, pathSections2);
  return path1 === path2;
}


// EXTERNAL MODULE: ./node_modules/@nextcloud/logger/dist/index.mjs
var dist = __webpack_require__(5947);
// EXTERNAL MODULE: ./node_modules/@nextcloud/auth/dist/index.mjs
var auth_dist = __webpack_require__(1777);
// EXTERNAL MODULE: ./node_modules/@nextcloud/router/dist/index.mjs
var router_dist = __webpack_require__(3814);
// EXTERNAL MODULE: ./node_modules/cancelable-promise/umd/CancelablePromise.js
var CancelablePromise = __webpack_require__(6117);
;// ./node_modules/webdav/dist/web/index.js
/*! For license information please see index.js.LICENSE.txt */
var t={2:t=>{function e(t,e,o){t instanceof RegExp&&(t=n(t,o)),e instanceof RegExp&&(e=n(e,o));var i=r(t,e,o);return i&&{start:i[0],end:i[1],pre:o.slice(0,i[0]),body:o.slice(i[0]+t.length,i[1]),post:o.slice(i[1]+e.length)}}function n(t,e){var n=e.match(t);return n?n[0]:null}function r(t,e,n){var r,o,i,s,a,u=n.indexOf(t),c=n.indexOf(e,u+1),l=u;if(u>=0&&c>0){for(r=[],i=n.length;l>=0&&!a;)l==u?(r.push(l),u=n.indexOf(t,l+1)):1==r.length?a=[r.pop(),c]:((o=r.pop())<i&&(i=o,s=c),c=n.indexOf(e,l+1)),l=u<c&&u>=0?u:c;r.length&&(a=[i,s])}return a}t.exports=e,e.range=r},101:function(t,e,n){var r;t=n.nmd(t),function(o){var i=(t&&t.exports,"object"==typeof global&&global);i.global!==i&&i.window;var s=function(t){this.message=t};(s.prototype=new Error).name="InvalidCharacterError";var a=function(t){throw new s(t)},u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=/[\t\n\f\r ]/g,l={encode:function(t){t=String(t),/[^\0-\xFF]/.test(t)&&a("The string to be encoded contains characters outside of the Latin1 range.");for(var e,n,r,o,i=t.length%3,s="",c=-1,l=t.length-i;++c<l;)e=t.charCodeAt(c)<<16,n=t.charCodeAt(++c)<<8,r=t.charCodeAt(++c),s+=u.charAt((o=e+n+r)>>18&63)+u.charAt(o>>12&63)+u.charAt(o>>6&63)+u.charAt(63&o);return 2==i?(e=t.charCodeAt(c)<<8,n=t.charCodeAt(++c),s+=u.charAt((o=e+n)>>10)+u.charAt(o>>4&63)+u.charAt(o<<2&63)+"="):1==i&&(o=t.charCodeAt(c),s+=u.charAt(o>>2)+u.charAt(o<<4&63)+"=="),s},decode:function(t){var e=(t=String(t).replace(c,"")).length;e%4==0&&(e=(t=t.replace(/==?$/,"")).length),(e%4==1||/[^+a-zA-Z0-9/]/.test(t))&&a("Invalid character: the string to be decoded is not correctly encoded.");for(var n,r,o=0,i="",s=-1;++s<e;)r=u.indexOf(t.charAt(s)),n=o%4?64*n+r:r,o++%4&&(i+=String.fromCharCode(255&n>>(-2*o&6)));return i},version:"1.0.0"};void 0===(r=function(){return l}.call(e,n,e,t))||(t.exports=r)}()},172:(t,e)=>{e.d=function(t){if(!t)return 0;for(var e=(t=t.toString()).length,n=t.length;n--;){var r=t.charCodeAt(n);56320<=r&&r<=57343&&n--,127<r&&r<=2047?e++:2047<r&&r<=65535&&(e+=2)}return e}},526:t=>{var e={utf8:{stringToBytes:function(t){return e.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(e.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e},bytesToString:function(t){for(var e=[],n=0;n<t.length;n++)e.push(String.fromCharCode(t[n]));return e.join("")}}};t.exports=e},298:t=>{var e,n;e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&n.rotl(t,8)|4278255360&n.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=n.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],n=0,r=0;n<t.length;n++,r+=8)e[r>>>5]|=t[n]<<24-r%32;return e},wordsToBytes:function(t){for(var e=[],n=0;n<32*t.length;n+=8)e.push(t[n>>>5]>>>24-n%32&255);return e},bytesToHex:function(t){for(var e=[],n=0;n<t.length;n++)e.push((t[n]>>>4).toString(16)),e.push((15&t[n]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],n=0;n<t.length;n+=2)e.push(parseInt(t.substr(n,2),16));return e},bytesToBase64:function(t){for(var n=[],r=0;r<t.length;r+=3)for(var o=t[r]<<16|t[r+1]<<8|t[r+2],i=0;i<4;i++)8*r+6*i<=8*t.length?n.push(e.charAt(o>>>6*(3-i)&63)):n.push("=");return n.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],r=0,o=0;r<t.length;o=++r%4)0!=o&&n.push((e.indexOf(t.charAt(r-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(t.charAt(r))>>>6-2*o);return n}},t.exports=n},635:(t,e,n)=>{const r=n(31),o=n(338),i=n(221);t.exports={XMLParser:o,XMLValidator:r,XMLBuilder:i}},118:t=>{t.exports=function(t){return"function"==typeof t?t:Array.isArray(t)?e=>{for(const n of t){if("string"==typeof n&&e===n)return!0;if(n instanceof RegExp&&n.test(e))return!0}}:()=>!1}},705:(t,e)=>{const n=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",r="["+n+"]["+n+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",o=new RegExp("^"+r+"$");e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(t,e,n){if(e){const r=Object.keys(e),o=r.length;for(let i=0;i<o;i++)t[r[i]]="strict"===n?[e[r[i]]]:e[r[i]]}},e.getValue=function(t){return e.isExist(t)?t:""},e.isName=function(t){return!(null==o.exec(t))},e.getAllMatches=function(t,e){const n=[];let r=e.exec(t);for(;r;){const o=[];o.startIndex=e.lastIndex-r[0].length;const i=r.length;for(let t=0;t<i;t++)o.push(r[t]);n.push(o),r=e.exec(t)}return n},e.nameRegexp=r},31:(t,e,n)=>{const r=n(705),o={allowBooleanAttributes:!1,unpairedTags:[]};function i(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function s(t,e){const n=e;for(;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{const r=t.substr(n,e-n);if(e>5&&"xml"===r)return d("InvalidXml","XML declaration allowed only at the start of the document.",m(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function a(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let n=1;for(e+=8;e<t.length;e++)if("<"===t[e])n++;else if(">"===t[e]&&(n--,0===n))break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}e.validate=function(t,e){e=Object.assign({},o,e);const n=[];let u=!1,c=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(let o=0;o<t.length;o++)if("<"===t[o]&&"?"===t[o+1]){if(o+=2,o=s(t,o),o.err)return o}else{if("<"!==t[o]){if(i(t[o]))continue;return d("InvalidChar","char '"+t[o]+"' is not expected.",m(t,o))}{let g=o;if(o++,"!"===t[o]){o=a(t,o);continue}{let y=!1;"/"===t[o]&&(y=!0,o++);let v="";for(;o<t.length&&">"!==t[o]&&" "!==t[o]&&"\t"!==t[o]&&"\n"!==t[o]&&"\r"!==t[o];o++)v+=t[o];if(v=v.trim(),"/"===v[v.length-1]&&(v=v.substring(0,v.length-1),o--),h=v,!r.isName(h)){let e;return e=0===v.trim().length?"Invalid space after '<'.":"Tag '"+v+"' is an invalid name.",d("InvalidTag",e,m(t,o))}const b=l(t,o);if(!1===b)return d("InvalidAttr","Attributes for '"+v+"' have open quote.",m(t,o));let w=b.value;if(o=b.index,"/"===w[w.length-1]){const n=o-w.length;w=w.substring(0,w.length-1);const r=p(w,e);if(!0!==r)return d(r.err.code,r.err.msg,m(t,n+r.err.line));u=!0}else if(y){if(!b.tagClosed)return d("InvalidTag","Closing tag '"+v+"' doesn't have proper closing.",m(t,o));if(w.trim().length>0)return d("InvalidTag","Closing tag '"+v+"' can't have attributes or invalid starting.",m(t,g));if(0===n.length)return d("InvalidTag","Closing tag '"+v+"' has not been opened.",m(t,g));{const e=n.pop();if(v!==e.tagName){let n=m(t,e.tagStartPos);return d("InvalidTag","Expected closing tag '"+e.tagName+"' (opened in line "+n.line+", col "+n.col+") instead of closing tag '"+v+"'.",m(t,g))}0==n.length&&(c=!0)}}else{const r=p(w,e);if(!0!==r)return d(r.err.code,r.err.msg,m(t,o-w.length+r.err.line));if(!0===c)return d("InvalidXml","Multiple possible root nodes found.",m(t,o));-1!==e.unpairedTags.indexOf(v)||n.push({tagName:v,tagStartPos:g}),u=!0}for(o++;o<t.length;o++)if("<"===t[o]){if("!"===t[o+1]){o++,o=a(t,o);continue}if("?"!==t[o+1])break;if(o=s(t,++o),o.err)return o}else if("&"===t[o]){const e=f(t,o);if(-1==e)return d("InvalidChar","char '&' is not expected.",m(t,o));o=e}else if(!0===c&&!i(t[o]))return d("InvalidXml","Extra text at the end",m(t,o));"<"===t[o]&&o--}}}var h;return u?1==n.length?d("InvalidTag","Unclosed tag '"+n[0].tagName+"'.",m(t,n[0].tagStartPos)):!(n.length>0)||d("InvalidXml","Invalid '"+JSON.stringify(n.map((t=>t.tagName)),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):d("InvalidXml","Start tag expected.",1)};const u='"',c="'";function l(t,e){let n="",r="",o=!1;for(;e<t.length;e++){if(t[e]===u||t[e]===c)""===r?r=t[e]:r!==t[e]||(r="");else if(">"===t[e]&&""===r){o=!0;break}n+=t[e]}return""===r&&{value:n,index:e,tagClosed:o}}const h=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function p(t,e){const n=r.getAllMatches(t,h),o={};for(let t=0;t<n.length;t++){if(0===n[t][1].length)return d("InvalidAttr","Attribute '"+n[t][2]+"' has no space in starting.",y(n[t]));if(void 0!==n[t][3]&&void 0===n[t][4])return d("InvalidAttr","Attribute '"+n[t][2]+"' is without value.",y(n[t]));if(void 0===n[t][3]&&!e.allowBooleanAttributes)return d("InvalidAttr","boolean attribute '"+n[t][2]+"' is not allowed.",y(n[t]));const r=n[t][2];if(!g(r))return d("InvalidAttr","Attribute '"+r+"' is an invalid name.",y(n[t]));if(o.hasOwnProperty(r))return d("InvalidAttr","Attribute '"+r+"' is repeated.",y(n[t]));o[r]=1}return!0}function f(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let n=/\d/;for("x"===t[e]&&(e++,n=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(n))break}return-1}(t,++e);let n=0;for(;e<t.length;e++,n++)if(!(t[e].match(/\w/)&&n<20)){if(";"===t[e])break;return-1}return e}function d(t,e,n){return{err:{code:t,msg:e,line:n.line||n,col:n.col}}}function g(t){return r.isName(t)}function m(t,e){const n=t.substring(0,e).split(/\r?\n/);return{line:n.length,col:n[n.length-1].length+1}}function y(t){return t.startIndex+t[1].length}},221:(t,e,n)=>{const r=n(87),o=n(118),i={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function s(t){this.options=Object.assign({},i,t),!0===this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.ignoreAttributesFn=o(this.options.ignoreAttributes),this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=c),this.processTextOrObjNode=a,this.options.format?(this.indentate=u,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function a(t,e,n,r){const o=this.j2x(t,n+1,r.concat(e));return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextValNode(t[this.options.textNodeName],e,o.attrStr,n):this.buildObjectNode(o.val,e,o.attrStr,n)}function u(t){return this.options.indentBy.repeat(t)}function c(t){return!(!t.startsWith(this.options.attributeNamePrefix)||t===this.options.textNodeName)&&t.substr(this.attrPrefixLen)}s.prototype.build=function(t){return this.options.preserveOrder?r(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0,[]).val)},s.prototype.j2x=function(t,e,n){let r="",o="";const i=n.join(".");for(let s in t)if(Object.prototype.hasOwnProperty.call(t,s))if(void 0===t[s])this.isAttribute(s)&&(o+="");else if(null===t[s])this.isAttribute(s)?o+="":"?"===s[0]?o+=this.indentate(e)+"<"+s+"?"+this.tagEndChar:o+=this.indentate(e)+"<"+s+"/"+this.tagEndChar;else if(t[s]instanceof Date)o+=this.buildTextValNode(t[s],s,"",e);else if("object"!=typeof t[s]){const n=this.isAttribute(s);if(n&&!this.ignoreAttributesFn(n,i))r+=this.buildAttrPairStr(n,""+t[s]);else if(!n)if(s===this.options.textNodeName){let e=this.options.tagValueProcessor(s,""+t[s]);o+=this.replaceEntitiesValue(e)}else o+=this.buildTextValNode(t[s],s,"",e)}else if(Array.isArray(t[s])){const r=t[s].length;let i="",a="";for(let u=0;u<r;u++){const r=t[s][u];if(void 0===r);else if(null===r)"?"===s[0]?o+=this.indentate(e)+"<"+s+"?"+this.tagEndChar:o+=this.indentate(e)+"<"+s+"/"+this.tagEndChar;else if("object"==typeof r)if(this.options.oneListGroup){const t=this.j2x(r,e+1,n.concat(s));i+=t.val,this.options.attributesGroupName&&r.hasOwnProperty(this.options.attributesGroupName)&&(a+=t.attrStr)}else i+=this.processTextOrObjNode(r,s,e,n);else if(this.options.oneListGroup){let t=this.options.tagValueProcessor(s,r);t=this.replaceEntitiesValue(t),i+=t}else i+=this.buildTextValNode(r,s,"",e)}this.options.oneListGroup&&(i=this.buildObjectNode(i,s,a,e)),o+=i}else if(this.options.attributesGroupName&&s===this.options.attributesGroupName){const e=Object.keys(t[s]),n=e.length;for(let o=0;o<n;o++)r+=this.buildAttrPairStr(e[o],""+t[s][e[o]])}else o+=this.processTextOrObjNode(t[s],s,e,n);return{attrStr:r,val:o}},s.prototype.buildAttrPairStr=function(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'},s.prototype.buildObjectNode=function(t,e,n,r){if(""===t)return"?"===e[0]?this.indentate(r)+"<"+e+n+"?"+this.tagEndChar:this.indentate(r)+"<"+e+n+this.closeTag(e)+this.tagEndChar;{let o="</"+e+this.tagEndChar,i="";return"?"===e[0]&&(i="?",o=""),!n&&""!==n||-1!==t.indexOf("<")?!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===i.length?this.indentate(r)+`\x3c!--${t}--\x3e`+this.newLine:this.indentate(r)+"<"+e+n+i+this.tagEndChar+t+this.indentate(r)+o:this.indentate(r)+"<"+e+n+i+">"+t+o}},s.prototype.closeTag=function(t){let e="";return-1!==this.options.unpairedTags.indexOf(t)?this.options.suppressUnpairedNode||(e="/"):e=this.options.suppressEmptyNode?"/":`></${t}`,e},s.prototype.buildTextValNode=function(t,e,n,r){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(r)+`<![CDATA[${t}]]>`+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(r)+`\x3c!--${t}--\x3e`+this.newLine;if("?"===e[0])return this.indentate(r)+"<"+e+n+"?"+this.tagEndChar;{let o=this.options.tagValueProcessor(e,t);return o=this.replaceEntitiesValue(o),""===o?this.indentate(r)+"<"+e+n+this.closeTag(e)+this.tagEndChar:this.indentate(r)+"<"+e+n+">"+o+"</"+e+this.tagEndChar}},s.prototype.replaceEntitiesValue=function(t){if(t&&t.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){const n=this.options.entities[e];t=t.replace(n.regex,n.val)}return t},t.exports=s},87:t=>{function e(t,s,a,u){let c="",l=!1;for(let h=0;h<t.length;h++){const p=t[h],f=n(p);if(void 0===f)continue;let d="";if(d=0===a.length?f:`${a}.${f}`,f===s.textNodeName){let t=p[f];o(d,s)||(t=s.tagValueProcessor(f,t),t=i(t,s)),l&&(c+=u),c+=t,l=!1;continue}if(f===s.cdataPropName){l&&(c+=u),c+=`<![CDATA[${p[f][0][s.textNodeName]}]]>`,l=!1;continue}if(f===s.commentPropName){c+=u+`\x3c!--${p[f][0][s.textNodeName]}--\x3e`,l=!0;continue}if("?"===f[0]){const t=r(p[":@"],s),e="?xml"===f?"":u;let n=p[f][0][s.textNodeName];n=0!==n.length?" "+n:"",c+=e+`<${f}${n}${t}?>`,l=!0;continue}let g=u;""!==g&&(g+=s.indentBy);const m=u+`<${f}${r(p[":@"],s)}`,y=e(p[f],s,d,g);-1!==s.unpairedTags.indexOf(f)?s.suppressUnpairedNode?c+=m+">":c+=m+"/>":y&&0!==y.length||!s.suppressEmptyNode?y&&y.endsWith(">")?c+=m+`>${y}${u}</${f}>`:(c+=m+">",y&&""!==u&&(y.includes("/>")||y.includes("</"))?c+=u+s.indentBy+y+u:c+=y,c+=`</${f}>`):c+=m+"/>",l=!0}return c}function n(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const r=e[n];if(t.hasOwnProperty(r)&&":@"!==r)return r}}function r(t,e){let n="";if(t&&!e.ignoreAttributes)for(let r in t){if(!t.hasOwnProperty(r))continue;let o=e.attributeValueProcessor(r,t[r]);o=i(o,e),!0===o&&e.suppressBooleanAttributes?n+=` ${r.substr(e.attributeNamePrefix.length)}`:n+=` ${r.substr(e.attributeNamePrefix.length)}="${o}"`}return n}function o(t,e){let n=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(let r in e.stopNodes)if(e.stopNodes[r]===t||e.stopNodes[r]==="*."+n)return!0;return!1}function i(t,e){if(t&&t.length>0&&e.processEntities)for(let n=0;n<e.entities.length;n++){const r=e.entities[n];t=t.replace(r.regex,r.val)}return t}t.exports=function(t,n){let r="";return n.format&&n.indentBy.length>0&&(r="\n"),e(t,n,"",r)}},193:(t,e,n)=>{const r=n(705);function o(t,e){let n="";for(;e<t.length&&"'"!==t[e]&&'"'!==t[e];e++)n+=t[e];if(n=n.trim(),-1!==n.indexOf(" "))throw new Error("External entites are not supported");const r=t[e++];let o="";for(;e<t.length&&t[e]!==r;e++)o+=t[e];return[n,o,e]}function i(t,e){return"!"===t[e+1]&&"-"===t[e+2]&&"-"===t[e+3]}function s(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7]}function a(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8]}function u(t,e){return"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8]}function c(t,e){return"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9]}function l(t){if(r.isName(t))return t;throw new Error(`Invalid entity name ${t}`)}t.exports=function(t,e){const n={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");{e+=9;let r=1,h=!1,p=!1,f="";for(;e<t.length;e++)if("<"!==t[e]||p)if(">"===t[e]){if(p?"-"===t[e-1]&&"-"===t[e-2]&&(p=!1,r--):r--,0===r)break}else"["===t[e]?h=!0:f+=t[e];else{if(h&&s(t,e)){let r,i;e+=7,[r,i,e]=o(t,e+1),-1===i.indexOf("&")&&(n[l(r)]={regx:RegExp(`&${r};`,"g"),val:i})}else if(h&&a(t,e))e+=8;else if(h&&u(t,e))e+=8;else if(h&&c(t,e))e+=9;else{if(!i)throw new Error("Invalid DOCTYPE");p=!0}r++,f=""}if(0!==r)throw new Error("Unclosed DOCTYPE")}return{entities:n,i:e}}},63:(t,e)=>{const n={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(t,e,n){return t}};e.buildOptions=function(t){return Object.assign({},n,t)},e.defaultOptions=n},299:(t,e,n)=>{const r=n(705),o=n(365),i=n(193),s=n(494),a=n(118);function u(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const r=e[n];this.lastEntities[r]={regex:new RegExp("&"+r+";","g"),val:t[r]}}}function c(t,e,n,r,o,i,s){if(void 0!==t&&(this.options.trimValues&&!r&&(t=t.trim()),t.length>0)){s||(t=this.replaceEntitiesValue(t));const r=this.options.tagValueProcessor(e,t,n,o,i);return null==r?t:typeof r!=typeof t||r!==t?r:this.options.trimValues||t.trim()===t?x(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function l(t){if(this.options.removeNSPrefix){const e=t.split(":"),n="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=n+e[1])}return t}const h=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function p(t,e,n){if(!0!==this.options.ignoreAttributes&&"string"==typeof t){const n=r.getAllMatches(t,h),o=n.length,i={};for(let t=0;t<o;t++){const r=this.resolveNameSpace(n[t][1]);if(this.ignoreAttributesFn(r,e))continue;let o=n[t][4],s=this.options.attributeNamePrefix+r;if(r.length)if(this.options.transformAttributeName&&(s=this.options.transformAttributeName(s)),"__proto__"===s&&(s="#__proto__"),void 0!==o){this.options.trimValues&&(o=o.trim()),o=this.replaceEntitiesValue(o);const t=this.options.attributeValueProcessor(r,o,e);i[s]=null==t?o:typeof t!=typeof o||t!==o?t:x(o,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(i[s]=!0)}if(!Object.keys(i).length)return;if(this.options.attributesGroupName){const t={};return t[this.options.attributesGroupName]=i,t}return i}}const f=function(t){t=t.replace(/\r\n?/g,"\n");const e=new o("!xml");let n=e,r="",s="";for(let a=0;a<t.length;a++)if("<"===t[a])if("/"===t[a+1]){const e=v(t,">",a,"Closing Tag is not closed.");let o=t.substring(a+2,e).trim();if(this.options.removeNSPrefix){const t=o.indexOf(":");-1!==t&&(o=o.substr(t+1))}this.options.transformTagName&&(o=this.options.transformTagName(o)),n&&(r=this.saveTextToParentTag(r,n,s));const i=s.substring(s.lastIndexOf(".")+1);if(o&&-1!==this.options.unpairedTags.indexOf(o))throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);let u=0;i&&-1!==this.options.unpairedTags.indexOf(i)?(u=s.lastIndexOf(".",s.lastIndexOf(".")-1),this.tagsNodeStack.pop()):u=s.lastIndexOf("."),s=s.substring(0,u),n=this.tagsNodeStack.pop(),r="",a=e}else if("?"===t[a+1]){let e=b(t,a,!1,"?>");if(!e)throw new Error("Pi Tag is not closed.");if(r=this.saveTextToParentTag(r,n,s),this.options.ignoreDeclaration&&"?xml"===e.tagName||this.options.ignorePiTags);else{const t=new o(e.tagName);t.add(this.options.textNodeName,""),e.tagName!==e.tagExp&&e.attrExpPresent&&(t[":@"]=this.buildAttributesMap(e.tagExp,s,e.tagName)),this.addChild(n,t,s)}a=e.closeIndex+1}else if("!--"===t.substr(a+1,3)){const e=v(t,"--\x3e",a+4,"Comment is not closed.");if(this.options.commentPropName){const o=t.substring(a+4,e-2);r=this.saveTextToParentTag(r,n,s),n.add(this.options.commentPropName,[{[this.options.textNodeName]:o}])}a=e}else if("!D"===t.substr(a+1,2)){const e=i(t,a);this.docTypeEntities=e.entities,a=e.i}else if("!["===t.substr(a+1,2)){const e=v(t,"]]>",a,"CDATA is not closed.")-2,o=t.substring(a+9,e);r=this.saveTextToParentTag(r,n,s);let i=this.parseTextData(o,n.tagname,s,!0,!1,!0,!0);null==i&&(i=""),this.options.cdataPropName?n.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]):n.add(this.options.textNodeName,i),a=e+2}else{let i=b(t,a,this.options.removeNSPrefix),u=i.tagName;const c=i.rawTagName;let l=i.tagExp,h=i.attrExpPresent,p=i.closeIndex;this.options.transformTagName&&(u=this.options.transformTagName(u)),n&&r&&"!xml"!==n.tagname&&(r=this.saveTextToParentTag(r,n,s,!1));const f=n;if(f&&-1!==this.options.unpairedTags.indexOf(f.tagname)&&(n=this.tagsNodeStack.pop(),s=s.substring(0,s.lastIndexOf("."))),u!==e.tagname&&(s+=s?"."+u:u),this.isItStopNode(this.options.stopNodes,s,u)){let e="";if(l.length>0&&l.lastIndexOf("/")===l.length-1)"/"===u[u.length-1]?(u=u.substr(0,u.length-1),s=s.substr(0,s.length-1),l=u):l=l.substr(0,l.length-1),a=i.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(u))a=i.closeIndex;else{const n=this.readStopNodeData(t,c,p+1);if(!n)throw new Error(`Unexpected end of ${c}`);a=n.i,e=n.tagContent}const r=new o(u);u!==l&&h&&(r[":@"]=this.buildAttributesMap(l,s,u)),e&&(e=this.parseTextData(e,u,s,!0,h,!0,!0)),s=s.substr(0,s.lastIndexOf(".")),r.add(this.options.textNodeName,e),this.addChild(n,r,s)}else{if(l.length>0&&l.lastIndexOf("/")===l.length-1){"/"===u[u.length-1]?(u=u.substr(0,u.length-1),s=s.substr(0,s.length-1),l=u):l=l.substr(0,l.length-1),this.options.transformTagName&&(u=this.options.transformTagName(u));const t=new o(u);u!==l&&h&&(t[":@"]=this.buildAttributesMap(l,s,u)),this.addChild(n,t,s),s=s.substr(0,s.lastIndexOf("."))}else{const t=new o(u);this.tagsNodeStack.push(n),u!==l&&h&&(t[":@"]=this.buildAttributesMap(l,s,u)),this.addChild(n,t,s),n=t}r="",a=p}}else r+=t[a];return e.child};function d(t,e,n){const r=this.options.updateTag(e.tagname,n,e[":@"]);!1===r||("string"==typeof r?(e.tagname=r,t.addChild(e)):t.addChild(e))}const g=function(t){if(this.options.processEntities){for(let e in this.docTypeEntities){const n=this.docTypeEntities[e];t=t.replace(n.regx,n.val)}for(let e in this.lastEntities){const n=this.lastEntities[e];t=t.replace(n.regex,n.val)}if(this.options.htmlEntities)for(let e in this.htmlEntities){const n=this.htmlEntities[e];t=t.replace(n.regex,n.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function m(t,e,n,r){return t&&(void 0===r&&(r=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,n,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,r))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function y(t,e,n){const r="*."+n;for(const n in t){const o=t[n];if(r===o||e===o)return!0}return!1}function v(t,e,n,r){const o=t.indexOf(e,n);if(-1===o)throw new Error(r);return o+e.length-1}function b(t,e,n){const r=function(t,e){let n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:">",o="";for(let i=e;i<t.length;i++){let e=t[i];if(n)e===n&&(n="");else if('"'===e||"'"===e)n=e;else if(e===r[0]){if(!r[1])return{data:o,index:i};if(t[i+1]===r[1])return{data:o,index:i}}else"\t"===e&&(e=" ");o+=e}}(t,e+1,arguments.length>3&&void 0!==arguments[3]?arguments[3]:">");if(!r)return;let o=r.data;const i=r.index,s=o.search(/\s/);let a=o,u=!0;-1!==s&&(a=o.substring(0,s),o=o.substring(s+1).trimStart());const c=a;if(n){const t=a.indexOf(":");-1!==t&&(a=a.substr(t+1),u=a!==r.data.substr(t+1))}return{tagName:a,tagExp:o,closeIndex:i,attrExpPresent:u,rawTagName:c}}function w(t,e,n){const r=n;let o=1;for(;n<t.length;n++)if("<"===t[n])if("/"===t[n+1]){const i=v(t,">",n,`${e} is not closed`);if(t.substring(n+2,i).trim()===e&&(o--,0===o))return{tagContent:t.substring(r,n),i};n=i}else if("?"===t[n+1])n=v(t,"?>",n+1,"StopNode is not closed.");else if("!--"===t.substr(n+1,3))n=v(t,"--\x3e",n+3,"StopNode is not closed.");else if("!["===t.substr(n+1,2))n=v(t,"]]>",n,"StopNode is not closed.")-2;else{const r=b(t,n,">");r&&((r&&r.tagName)===e&&"/"!==r.tagExp[r.tagExp.length-1]&&o++,n=r.closeIndex)}}function x(t,e,n){if(e&&"string"==typeof t){const e=t.trim();return"true"===e||"false"!==e&&s(t,n)}return r.isExist(t)?t:""}t.exports=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"},num_dec:{regex:/&#([0-9]{1,7});/g,val:(t,e)=>String.fromCharCode(Number.parseInt(e,10))},num_hex:{regex:/&#x([0-9a-fA-F]{1,6});/g,val:(t,e)=>String.fromCharCode(Number.parseInt(e,16))}},this.addExternalEntities=u,this.parseXml=f,this.parseTextData=c,this.resolveNameSpace=l,this.buildAttributesMap=p,this.isItStopNode=y,this.replaceEntitiesValue=g,this.readStopNodeData=w,this.saveTextToParentTag=m,this.addChild=d,this.ignoreAttributesFn=a(this.options.ignoreAttributes)}}},338:(t,e,n)=>{const{buildOptions:r}=n(63),o=n(299),{prettify:i}=n(728),s=n(31);t.exports=class{constructor(t){this.externalEntities={},this.options=r(t)}parse(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});const n=s.validate(t,e);if(!0!==n)throw Error(`${n.err.msg}:${n.err.line}:${n.err.col}`)}const n=new o(this.options);n.addExternalEntities(this.externalEntities);const r=n.parseXml(t);return this.options.preserveOrder||void 0===r?r:i(r,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}}},728:(t,e)=>{function n(t,e,s){let a;const u={};for(let c=0;c<t.length;c++){const l=t[c],h=r(l);let p="";if(p=void 0===s?h:s+"."+h,h===e.textNodeName)void 0===a?a=l[h]:a+=""+l[h];else{if(void 0===h)continue;if(l[h]){let t=n(l[h],e,p);const r=i(t,e);l[":@"]?o(t,l[":@"],p,e):1!==Object.keys(t).length||void 0===t[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(t).length&&(e.alwaysCreateTextNode?t[e.textNodeName]="":t=""):t=t[e.textNodeName],void 0!==u[h]&&u.hasOwnProperty(h)?(Array.isArray(u[h])||(u[h]=[u[h]]),u[h].push(t)):e.isArray(h,p,r)?u[h]=[t]:u[h]=t}}}return"string"==typeof a?a.length>0&&(u[e.textNodeName]=a):void 0!==a&&(u[e.textNodeName]=a),u}function r(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const n=e[t];if(":@"!==n)return n}}function o(t,e,n,r){if(e){const o=Object.keys(e),i=o.length;for(let s=0;s<i;s++){const i=o[s];r.isArray(i,n+"."+i,!0,!0)?t[i]=[e[i]]:t[i]=e[i]}}}function i(t,e){const{textNodeName:n}=e,r=Object.keys(t).length;return 0===r||!(1!==r||!t[n]&&"boolean"!=typeof t[n]&&0!==t[n])}e.prettify=function(t,e){return n(t,e)}},365:t=>{t.exports=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){"__proto__"===t&&(t="#__proto__"),this.child.push({[t]:e})}addChild(t){"__proto__"===t.tagname&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}}},135:t=>{function e(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}t.exports=function(t){return null!=t&&(e(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&e(t.slice(0,0))}(t)||!!t._isBuffer)}},542:(t,e,n)=>{!function(){var e=n(298),r=n(526).utf8,o=n(135),i=n(526).bin,s=function(t,n){t.constructor==String?t=n&&"binary"===n.encoding?i.stringToBytes(t):r.stringToBytes(t):o(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||t.constructor===Uint8Array||(t=t.toString());for(var a=e.bytesToWords(t),u=8*t.length,c=1732584193,l=-271733879,h=-1732584194,p=271733878,f=0;f<a.length;f++)a[f]=16711935&(a[f]<<8|a[f]>>>24)|4278255360&(a[f]<<24|a[f]>>>8);a[u>>>5]|=128<<u%32,a[14+(u+64>>>9<<4)]=u;var d=s._ff,g=s._gg,m=s._hh,y=s._ii;for(f=0;f<a.length;f+=16){var v=c,b=l,w=h,x=p;c=d(c,l,h,p,a[f+0],7,-680876936),p=d(p,c,l,h,a[f+1],12,-389564586),h=d(h,p,c,l,a[f+2],17,606105819),l=d(l,h,p,c,a[f+3],22,-1044525330),c=d(c,l,h,p,a[f+4],7,-176418897),p=d(p,c,l,h,a[f+5],12,1200080426),h=d(h,p,c,l,a[f+6],17,-1473231341),l=d(l,h,p,c,a[f+7],22,-45705983),c=d(c,l,h,p,a[f+8],7,1770035416),p=d(p,c,l,h,a[f+9],12,-1958414417),h=d(h,p,c,l,a[f+10],17,-42063),l=d(l,h,p,c,a[f+11],22,-1990404162),c=d(c,l,h,p,a[f+12],7,1804603682),p=d(p,c,l,h,a[f+13],12,-40341101),h=d(h,p,c,l,a[f+14],17,-1502002290),c=g(c,l=d(l,h,p,c,a[f+15],22,1236535329),h,p,a[f+1],5,-165796510),p=g(p,c,l,h,a[f+6],9,-1069501632),h=g(h,p,c,l,a[f+11],14,643717713),l=g(l,h,p,c,a[f+0],20,-373897302),c=g(c,l,h,p,a[f+5],5,-701558691),p=g(p,c,l,h,a[f+10],9,38016083),h=g(h,p,c,l,a[f+15],14,-660478335),l=g(l,h,p,c,a[f+4],20,-405537848),c=g(c,l,h,p,a[f+9],5,568446438),p=g(p,c,l,h,a[f+14],9,-1019803690),h=g(h,p,c,l,a[f+3],14,-187363961),l=g(l,h,p,c,a[f+8],20,1163531501),c=g(c,l,h,p,a[f+13],5,-1444681467),p=g(p,c,l,h,a[f+2],9,-51403784),h=g(h,p,c,l,a[f+7],14,1735328473),c=m(c,l=g(l,h,p,c,a[f+12],20,-1926607734),h,p,a[f+5],4,-378558),p=m(p,c,l,h,a[f+8],11,-2022574463),h=m(h,p,c,l,a[f+11],16,1839030562),l=m(l,h,p,c,a[f+14],23,-35309556),c=m(c,l,h,p,a[f+1],4,-1530992060),p=m(p,c,l,h,a[f+4],11,1272893353),h=m(h,p,c,l,a[f+7],16,-155497632),l=m(l,h,p,c,a[f+10],23,-1094730640),c=m(c,l,h,p,a[f+13],4,681279174),p=m(p,c,l,h,a[f+0],11,-358537222),h=m(h,p,c,l,a[f+3],16,-722521979),l=m(l,h,p,c,a[f+6],23,76029189),c=m(c,l,h,p,a[f+9],4,-640364487),p=m(p,c,l,h,a[f+12],11,-421815835),h=m(h,p,c,l,a[f+15],16,530742520),c=y(c,l=m(l,h,p,c,a[f+2],23,-995338651),h,p,a[f+0],6,-198630844),p=y(p,c,l,h,a[f+7],10,1126891415),h=y(h,p,c,l,a[f+14],15,-1416354905),l=y(l,h,p,c,a[f+5],21,-57434055),c=y(c,l,h,p,a[f+12],6,1700485571),p=y(p,c,l,h,a[f+3],10,-1894986606),h=y(h,p,c,l,a[f+10],15,-1051523),l=y(l,h,p,c,a[f+1],21,-2054922799),c=y(c,l,h,p,a[f+8],6,1873313359),p=y(p,c,l,h,a[f+15],10,-30611744),h=y(h,p,c,l,a[f+6],15,-1560198380),l=y(l,h,p,c,a[f+13],21,1309151649),c=y(c,l,h,p,a[f+4],6,-145523070),p=y(p,c,l,h,a[f+11],10,-1120210379),h=y(h,p,c,l,a[f+2],15,718787259),l=y(l,h,p,c,a[f+9],21,-343485551),c=c+v>>>0,l=l+b>>>0,h=h+w>>>0,p=p+x>>>0}return e.endian([c,l,h,p])};s._ff=function(t,e,n,r,o,i,s){var a=t+(e&n|~e&r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},s._gg=function(t,e,n,r,o,i,s){var a=t+(e&r|n&~r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},s._hh=function(t,e,n,r,o,i,s){var a=t+(e^n^r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},s._ii=function(t,e,n,r,o,i,s){var a=t+(n^(e|~r))+(o>>>0)+s;return(a<<i|a>>>32-i)+e},s._blocksize=16,s._digestsize=16,t.exports=function(t,n){if(null==t)throw new Error("Illegal argument "+t);var r=e.wordsToBytes(s(t,n));return n&&n.asBytes?r:n&&n.asString?i.bytesToString(r):e.bytesToHex(r)}}()},285:(t,e,n)=>{var r=n(2);t.exports=function(t){return t?("{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2)),m(function(t){return t.split("\\\\").join(o).split("\\{").join(i).split("\\}").join(s).split("\\,").join(a).split("\\.").join(u)}(t),!0).map(l)):[]};var o="\0SLASH"+Math.random()+"\0",i="\0OPEN"+Math.random()+"\0",s="\0CLOSE"+Math.random()+"\0",a="\0COMMA"+Math.random()+"\0",u="\0PERIOD"+Math.random()+"\0";function c(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function l(t){return t.split(o).join("\\").split(i).join("{").split(s).join("}").split(a).join(",").split(u).join(".")}function h(t){if(!t)return[""];var e=[],n=r("{","}",t);if(!n)return t.split(",");var o=n.pre,i=n.body,s=n.post,a=o.split(",");a[a.length-1]+="{"+i+"}";var u=h(s);return s.length&&(a[a.length-1]+=u.shift(),a.push.apply(a,u)),e.push.apply(e,a),e}function p(t){return"{"+t+"}"}function f(t){return/^-?0\d/.test(t)}function d(t,e){return t<=e}function g(t,e){return t>=e}function m(t,e){var n=[],o=r("{","}",t);if(!o)return[t];var i=o.pre,a=o.post.length?m(o.post,!1):[""];if(/\$$/.test(o.pre))for(var u=0;u<a.length;u++){var l=i+"{"+o.body+"}"+a[u];n.push(l)}else{var y,v,b=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(o.body),w=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(o.body),x=b||w,N=o.body.indexOf(",")>=0;if(!x&&!N)return o.post.match(/,.*\}/)?m(t=o.pre+"{"+o.body+s+o.post):[t];if(x)y=o.body.split(/\.\./);else if(1===(y=h(o.body)).length&&1===(y=m(y[0],!1).map(p)).length)return a.map((function(t){return o.pre+y[0]+t}));if(x){var A=c(y[0]),P=c(y[1]),O=Math.max(y[0].length,y[1].length),E=3==y.length?Math.abs(c(y[2])):1,T=d;P<A&&(E*=-1,T=g);var j=y.some(f);v=[];for(var S=A;T(S,P);S+=E){var $;if(w)"\\"===($=String.fromCharCode(S))&&($="");else if($=String(S),j){var C=O-$.length;if(C>0){var I=new Array(C+1).join("0");$=S<0?"-"+I+$.slice(1):I+$}}v.push($)}}else{v=[];for(var k=0;k<y.length;k++)v.push.apply(v,m(y[k],!1))}for(k=0;k<v.length;k++)for(u=0;u<a.length;u++)l=i+v[k]+a[u],(!e||x||l)&&n.push(l)}return n}},829:t=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function n(t){var e="function"==typeof Map?new Map:void 0;return n=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,s)}function s(){return r(t,arguments,i(this).constructor)}return s.prototype=Object.create(t.prototype,{constructor:{value:s,enumerable:!1,writable:!0,configurable:!0}}),o(s,t)},n(t)}function r(t,e,n){return r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i},r.apply(null,arguments)}function o(t,e){return o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}function i(t){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},i(t)}var s=function(t){function n(t){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),(r=function(t,n){return!n||"object"!==e(n)&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}(this,i(n).call(this,t))).name="ObjectPrototypeMutationError",r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(n,t),n}(n(Error));function a(t,n){for(var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=n.split("."),i=o.length,s=function(e){var n=o[e];if(!t)return{v:void 0};if("+"===n){if(Array.isArray(t))return{v:t.map((function(n,i){var s=o.slice(e+1);return s.length>0?a(n,s.join("."),r):r(t,i,o,e)}))};var i=o.slice(0,e).join(".");throw new Error("Object at wildcard (".concat(i,") is not an array"))}t=r(t,n,o,e)},u=0;u<i;u++){var c=s(u);if("object"===e(c))return c.v}return t}function u(t,e){return t.length===e+1}t.exports={set:function(t,n,r){if("object"!=e(t)||null===t)return t;if(void 0===n)return t;if("number"==typeof n)return t[n]=r,t[n];try{return a(t,n,(function(t,e,n,o){if(t===Reflect.getPrototypeOf({}))throw new s("Attempting to mutate Object.prototype");if(!t[e]){var i=Number.isInteger(Number(n[o+1])),a="+"===n[o+1];t[e]=i||a?[]:{}}return u(n,o)&&(t[e]=r),t[e]}))}catch(e){if(e instanceof s)throw e;return t}},get:function(t,n){if("object"!=e(t)||null===t)return t;if(void 0===n)return t;if("number"==typeof n)return t[n];try{return a(t,n,(function(t,e){return t[e]}))}catch(e){return t}},has:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("object"!=e(t)||null===t)return!1;if(void 0===n)return!1;if("number"==typeof n)return n in t;try{var o=!1;return a(t,n,(function(t,e,n,i){if(!u(n,i))return t&&t[e];o=r.own?t.hasOwnProperty(e):e in t})),o}catch(t){return!1}},hasOwn:function(t,e,n){return this.has(t,e,n||{own:!0})},isIn:function(t,n,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if("object"!=e(t)||null===t)return!1;if(void 0===n)return!1;try{var i=!1,s=!1;return a(t,n,(function(t,n,o,a){return i=i||t===r||!!t&&t[n]===r,s=u(o,a)&&"object"===e(t)&&n in t,t&&t[n]})),o.validPath?i&&s:i}catch(t){return!1}},ObjectPrototypeMutationError:s}},47:(t,e,n)=>{var r=n(410),o=function(t){return"string"==typeof t};function i(t,e){for(var n=[],r=0;r<t.length;r++){var o=t[r];o&&"."!==o&&(".."===o?n.length&&".."!==n[n.length-1]?n.pop():e&&n.push(".."):n.push(o))}return n}var s=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,a={};function u(t){return s.exec(t).slice(1)}a.resolve=function(){for(var t="",e=!1,n=arguments.length-1;n>=-1&&!e;n--){var r=n>=0?arguments[n]:process.cwd();if(!o(r))throw new TypeError("Arguments to path.resolve must be strings");r&&(t=r+"/"+t,e="/"===r.charAt(0))}return(e?"/":"")+(t=i(t.split("/"),!e).join("/"))||"."},a.normalize=function(t){var e=a.isAbsolute(t),n="/"===t.substr(-1);return(t=i(t.split("/"),!e).join("/"))||e||(t="."),t&&n&&(t+="/"),(e?"/":"")+t},a.isAbsolute=function(t){return"/"===t.charAt(0)},a.join=function(){for(var t="",e=0;e<arguments.length;e++){var n=arguments[e];if(!o(n))throw new TypeError("Arguments to path.join must be strings");n&&(t+=t?"/"+n:n)}return a.normalize(t)},a.relative=function(t,e){function n(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n+1)}t=a.resolve(t).substr(1),e=a.resolve(e).substr(1);for(var r=n(t.split("/")),o=n(e.split("/")),i=Math.min(r.length,o.length),s=i,u=0;u<i;u++)if(r[u]!==o[u]){s=u;break}var c=[];for(u=s;u<r.length;u++)c.push("..");return(c=c.concat(o.slice(s))).join("/")},a._makeLong=function(t){return t},a.dirname=function(t){var e=u(t),n=e[0],r=e[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},a.basename=function(t,e){var n=u(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},a.extname=function(t){return u(t)[3]},a.format=function(t){if(!r.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof t);var e=t.root||"";if(!o(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof t.root);return(t.dir?t.dir+a.sep:"")+(t.base||"")},a.parse=function(t){if(!o(t))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof t);var e=u(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return e[1]=e[1]||"",e[2]=e[2]||"",e[3]=e[3]||"",{root:e[0],dir:e[0]+e[1].slice(0,e[1].length-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},a.sep="/",a.delimiter=":",t.exports=a},647:(t,e)=>{var n=Object.prototype.hasOwnProperty;function r(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(t){return null}}function o(t){try{return encodeURIComponent(t)}catch(t){return null}}e.stringify=function(t,e){e=e||"";var r,i,s=[];for(i in"string"!=typeof e&&(e="?"),t)if(n.call(t,i)){if((r=t[i])||null!=r&&!isNaN(r)||(r=""),i=o(i),r=o(r),null===i||null===r)continue;s.push(i+"="+r)}return s.length?e+s.join("&"):""},e.parse=function(t){for(var e,n=/([^=?#&]+)=?([^&]*)/g,o={};e=n.exec(t);){var i=r(e[1]),s=r(e[2]);null===i||null===s||i in o||(o[i]=s)}return o}},670:t=>{t.exports=function(t,e){if(e=e.split(":")[0],!(t=+t))return!1;switch(e){case"http":case"ws":return 80!==t;case"https":case"wss":return 443!==t;case"ftp":return 21!==t;case"gopher":return 70!==t;case"file":return!1}return 0!==t}},494:t=>{const e=/^[-+]?0x[a-fA-F0-9]+$/,n=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const r={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};t.exports=function(t){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(o=Object.assign({},r,o),!t||"string"!=typeof t)return t;let i=t.trim();if(void 0!==o.skipLike&&o.skipLike.test(i))return t;if(o.hex&&e.test(i))return Number.parseInt(i,16);{const e=n.exec(i);if(e){const n=e[1],r=e[2];let a=(s=e[3])&&-1!==s.indexOf(".")?("."===(s=s.replace(/0+$/,""))?s="0":"."===s[0]?s="0"+s:"."===s[s.length-1]&&(s=s.substr(0,s.length-1)),s):s;const u=e[4]||e[6];if(!o.leadingZeros&&r.length>0&&n&&"."!==i[2])return t;if(!o.leadingZeros&&r.length>0&&!n&&"."!==i[1])return t;{const e=Number(i),s=""+e;return-1!==s.search(/[eE]/)||u?o.eNotation?e:t:-1!==i.indexOf(".")?"0"===s&&""===a||s===a||n&&s==="-"+a?e:t:r?a===s||n+a===s?e:t:i===s||i===n+s?e:t}}return t}// removed by dead control flow
{ var s; }}},737:(t,e,n)=>{var r=n(670),o=n(647),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,s=/[\n\r\t]/g,a=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,u=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function h(t){return(t||"").toString().replace(i,"")}var p=[["#","hash"],["?","query"],function(t,e){return g(e.protocol)?t.replace(/\\/g,"/"):t},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],f={hash:1,query:1};function d(t){var e,n=("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}).location||{},r={},o=typeof(t=t||n);if("blob:"===t.protocol)r=new y(unescape(t.pathname),{});else if("string"===o)for(e in r=new y(t,{}),f)delete r[e];else if("object"===o){for(e in t)e in f||(r[e]=t[e]);void 0===r.slashes&&(r.slashes=a.test(t.href))}return r}function g(t){return"file:"===t||"ftp:"===t||"http:"===t||"https:"===t||"ws:"===t||"wss:"===t}function m(t,e){t=(t=h(t)).replace(s,""),e=e||{};var n,r=c.exec(t),o=r[1]?r[1].toLowerCase():"",i=!!r[2],a=!!r[3],u=0;return i?a?(n=r[2]+r[3]+r[4],u=r[2].length+r[3].length):(n=r[2]+r[4],u=r[2].length):a?(n=r[3]+r[4],u=r[3].length):n=r[4],"file:"===o?u>=2&&(n=n.slice(2)):g(o)?n=r[4]:o?i&&(n=n.slice(2)):u>=2&&g(e.protocol)&&(n=r[4]),{protocol:o,slashes:i||g(o),slashesCount:u,rest:n}}function y(t,e,n){if(t=(t=h(t)).replace(s,""),!(this instanceof y))return new y(t,e,n);var i,a,u,c,f,v,b=p.slice(),w=typeof e,x=this,N=0;for("object"!==w&&"string"!==w&&(n=e,e=null),n&&"function"!=typeof n&&(n=o.parse),i=!(a=m(t||"",e=d(e))).protocol&&!a.slashes,x.slashes=a.slashes||i&&e.slashes,x.protocol=a.protocol||e.protocol||"",t=a.rest,("file:"===a.protocol&&(2!==a.slashesCount||l.test(t))||!a.slashes&&(a.protocol||a.slashesCount<2||!g(x.protocol)))&&(b[3]=[/(.*)/,"pathname"]);N<b.length;N++)"function"!=typeof(c=b[N])?(u=c[0],v=c[1],u!=u?x[v]=t:"string"==typeof u?~(f="@"===u?t.lastIndexOf(u):t.indexOf(u))&&("number"==typeof c[2]?(x[v]=t.slice(0,f),t=t.slice(f+c[2])):(x[v]=t.slice(f),t=t.slice(0,f))):(f=u.exec(t))&&(x[v]=f[1],t=t.slice(0,f.index)),x[v]=x[v]||i&&c[3]&&e[v]||"",c[4]&&(x[v]=x[v].toLowerCase())):t=c(t,x);n&&(x.query=n(x.query)),i&&e.slashes&&"/"!==x.pathname.charAt(0)&&(""!==x.pathname||""!==e.pathname)&&(x.pathname=function(t,e){if(""===t)return e;for(var n=(e||"/").split("/").slice(0,-1).concat(t.split("/")),r=n.length,o=n[r-1],i=!1,s=0;r--;)"."===n[r]?n.splice(r,1):".."===n[r]?(n.splice(r,1),s++):s&&(0===r&&(i=!0),n.splice(r,1),s--);return i&&n.unshift(""),"."!==o&&".."!==o||n.push(""),n.join("/")}(x.pathname,e.pathname)),"/"!==x.pathname.charAt(0)&&g(x.protocol)&&(x.pathname="/"+x.pathname),r(x.port,x.protocol)||(x.host=x.hostname,x.port=""),x.username=x.password="",x.auth&&(~(f=x.auth.indexOf(":"))?(x.username=x.auth.slice(0,f),x.username=encodeURIComponent(decodeURIComponent(x.username)),x.password=x.auth.slice(f+1),x.password=encodeURIComponent(decodeURIComponent(x.password))):x.username=encodeURIComponent(decodeURIComponent(x.auth)),x.auth=x.password?x.username+":"+x.password:x.username),x.origin="file:"!==x.protocol&&g(x.protocol)&&x.host?x.protocol+"//"+x.host:"null",x.href=x.toString()}y.prototype={set:function(t,e,n){var i=this;switch(t){case"query":"string"==typeof e&&e.length&&(e=(n||o.parse)(e)),i[t]=e;break;case"port":i[t]=e,r(e,i.protocol)?e&&(i.host=i.hostname+":"+e):(i.host=i.hostname,i[t]="");break;case"hostname":i[t]=e,i.port&&(e+=":"+i.port),i.host=e;break;case"host":i[t]=e,u.test(e)?(e=e.split(":"),i.port=e.pop(),i.hostname=e.join(":")):(i.hostname=e,i.port="");break;case"protocol":i.protocol=e.toLowerCase(),i.slashes=!n;break;case"pathname":case"hash":if(e){var s="pathname"===t?"/":"#";i[t]=e.charAt(0)!==s?s+e:e}else i[t]=e;break;case"username":case"password":i[t]=encodeURIComponent(e);break;case"auth":var a=e.indexOf(":");~a?(i.username=e.slice(0,a),i.username=encodeURIComponent(decodeURIComponent(i.username)),i.password=e.slice(a+1),i.password=encodeURIComponent(decodeURIComponent(i.password))):i.username=encodeURIComponent(decodeURIComponent(e))}for(var c=0;c<p.length;c++){var l=p[c];l[4]&&(i[l[1]]=i[l[1]].toLowerCase())}return i.auth=i.password?i.username+":"+i.password:i.username,i.origin="file:"!==i.protocol&&g(i.protocol)&&i.host?i.protocol+"//"+i.host:"null",i.href=i.toString(),i},toString:function(t){t&&"function"==typeof t||(t=o.stringify);var e,n=this,r=n.host,i=n.protocol;i&&":"!==i.charAt(i.length-1)&&(i+=":");var s=i+(n.protocol&&n.slashes||g(n.protocol)?"//":"");return n.username?(s+=n.username,n.password&&(s+=":"+n.password),s+="@"):n.password?(s+=":"+n.password,s+="@"):"file:"!==n.protocol&&g(n.protocol)&&!r&&"/"!==n.pathname&&(s+="@"),(":"===r[r.length-1]||u.test(n.hostname)&&!n.port)&&(r+=":"),s+=r+n.pathname,(e="object"==typeof n.query?t(n.query):n.query)&&(s+="?"!==e.charAt(0)?"?"+e:e),n.hash&&(s+=n.hash),s}},y.extractProtocol=m,y.location=d,y.trimLeft=h,y.qs=o,t.exports=y},410:()=>{},388:()=>{},805:()=>{},345:()=>{},800:()=>{}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t);var r={};n.d(r,{hT:()=>C,O4:()=>I,Kd:()=>S,YK:()=>$,UU:()=>en,Gu:()=>F,ky:()=>oe,h4:()=>ne,ch:()=>re,hq:()=>Xt,i5:()=>ie});var o=n(737),i=n.n(o);function s(t){if(!a(t))throw new Error("Parameter was not an error")}function a(t){return!!t&&"object"==typeof t&&"[object Error]"===(e=t,Object.prototype.toString.call(e))||t instanceof Error;// removed by dead control flow
{ var e; }}class u extends Error{constructor(t,e){const n=[...arguments],{options:r,shortMessage:o}=function(t){let e,n="";if(0===t.length)e={};else if(a(t[0]))e={cause:t[0]},n=t.slice(1).join(" ")||"";else if(t[0]&&"object"==typeof t[0])e=Object.assign({},t[0]),n=t.slice(1).join(" ")||"";else{if("string"!=typeof t[0])throw new Error("Invalid arguments passed to Layerr");e={},n=n=t.join(" ")||""}return{options:e,shortMessage:n}}(n);let i=o;if(r.cause&&(i=`${i}: ${r.cause.message}`),super(i),this.message=i,r.name&&"string"==typeof r.name?this.name=r.name:this.name="Layerr",r.cause&&Object.defineProperty(this,"_cause",{value:r.cause}),Object.defineProperty(this,"_info",{value:{}}),r.info&&"object"==typeof r.info&&Object.assign(this._info,r.info),Error.captureStackTrace){const t=r.constructorOpt||this.constructor;Error.captureStackTrace(this,t)}}static cause(t){return s(t),t._cause&&a(t._cause)?t._cause:null}static fullStack(t){s(t);const e=u.cause(t);return e?`${t.stack}\ncaused by: ${u.fullStack(e)}`:t.stack??""}static info(t){s(t);const e={},n=u.cause(t);return n&&Object.assign(e,u.info(n)),t._info&&Object.assign(e,t._info),e}toString(){let t=this.name||this.constructor.name||this.constructor.prototype.name;return this.message&&(t=`${t}: ${this.message}`),t}}var c=n(47),l=n.n(c);const h="__PATH_SEPARATOR_POSIX__",p="__PATH_SEPARATOR_WINDOWS__";function f(t){try{const e=t.replace(/\//g,h).replace(/\\\\/g,p);return encodeURIComponent(e).split(p).join("\\\\").split(h).join("/")}catch(t){throw new u(t,"Failed encoding path")}}function d(t){return t.startsWith("/")?t:"/"+t}function g(t){let e=t;return"/"!==e[0]&&(e="/"+e),/^.+\/$/.test(e)&&(e=e.substr(0,e.length-1)),e}function m(t){let e=new(i())(t).pathname;return e.length<=0&&(e="/"),g(e)}function y(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(){return function(t){var e=[];if(0===t.length)return"";if("string"!=typeof t[0])throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var n=t.shift();t[0]=n+t[0]}t[0].match(/^file:\/\/\//)?t[0]=t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0]=t[0].replace(/^([^/:]+):\/*/,"$1://");for(var r=0;r<t.length;r++){var o=t[r];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(r>0&&(o=o.replace(/^[\/]+/,"")),o=r<t.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),e.push(o))}var i=e.join("/"),s=(i=i.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return s.shift()+(s.length>0?"?":"")+s.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}(e.reduce(((t,e,n)=>((0===n||"/"!==e||"/"===e&&"/"!==t[t.length-1])&&t.push(e),t)),[]))}var v=n(542),b=n.n(v);const w="abcdef0123456789";function x(t,e){const n=t.url.replace("//",""),r=-1==n.indexOf("/")?"/":n.slice(n.indexOf("/")),o=t.method?t.method.toUpperCase():"GET",i=!!/(^|,)\s*auth\s*($|,)/.test(e.qop)&&"auth",s=`00000000${e.nc}`.slice(-8),a=function(t,e,n,r,o,i,s){const a=s||b()(`${e}:${n}:${r}`);return t&&"md5-sess"===t.toLowerCase()?b()(`${a}:${o}:${i}`):a}(e.algorithm,e.username,e.realm,e.password,e.nonce,e.cnonce,e.ha1),u=b()(`${o}:${r}`),c=i?b()(`${a}:${e.nonce}:${s}:${e.cnonce}:${i}:${u}`):b()(`${a}:${e.nonce}:${u}`),l={username:e.username,realm:e.realm,nonce:e.nonce,uri:r,qop:i,response:c,nc:s,cnonce:e.cnonce,algorithm:e.algorithm,opaque:e.opaque},h=[];for(const t in l)l[t]&&("qop"===t||"nc"===t||"algorithm"===t?h.push(`${t}=${l[t]}`):h.push(`${t}="${l[t]}"`));return`Digest ${h.join(", ")}`}function N(t){return"digest"===(t.headers&&t.headers.get("www-authenticate")||"").split(/\s/)[0].toLowerCase()}var A=n(101),P=n.n(A);function O(t){return P().decode(t)}function E(t,e){var n;return`Basic ${n=`${t}:${e}`,P().encode(n)}`}const T="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:"undefined"!=typeof window?window:globalThis,j=T.fetch.bind(T),S=(T.Headers,T.Request),$=T.Response;let C=function(t){return t.Auto="auto",t.Digest="digest",t.None="none",t.Password="password",t.Token="token",t}({}),I=function(t){return t.DataTypeNoLength="data-type-no-length",t.InvalidAuthType="invalid-auth-type",t.InvalidOutputFormat="invalid-output-format",t.LinkUnsupportedAuthType="link-unsupported-auth",t.InvalidUpdateRange="invalid-update-range",t.NotSupported="not-supported",t}({});function k(t,e,n,r,o){switch(t.authType){case C.Auto:e&&n&&(t.headers.Authorization=E(e,n));break;case C.Digest:t.digest=function(t,e,n){return{username:t,password:e,ha1:n,nc:0,algorithm:"md5",hasDigestAuth:!1}}(e,n,o);break;case C.None:break;case C.Password:t.headers.Authorization=E(e,n);break;case C.Token:t.headers.Authorization=`${(i=r).token_type} ${i.access_token}`;break;default:throw new u({info:{code:I.InvalidAuthType}},`Invalid auth type: ${t.authType}`)}var i}n(345),n(800);const R="@@HOTPATCHER",L=()=>{};function _(t){return{original:t,methods:[t],final:!1}}class M{constructor(){this._configuration={registry:{},getEmptyAction:"null"},this.__type__=R}get configuration(){return this._configuration}get getEmptyAction(){return this.configuration.getEmptyAction}set getEmptyAction(t){this.configuration.getEmptyAction=t}control(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t||t.__type__!==R)throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");return Object.keys(t.configuration.registry).forEach((n=>{this.configuration.registry.hasOwnProperty(n)?e&&(this.configuration.registry[n]=Object.assign({},t.configuration.registry[n])):this.configuration.registry[n]=Object.assign({},t.configuration.registry[n])})),t._configuration=this.configuration,this}execute(t){const e=this.get(t)||L;for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return e(...r)}get(t){const e=this.configuration.registry[t];if(!e)switch(this.getEmptyAction){case"null":return null;case"throw":throw new Error(`Failed handling method request: No method provided for override: ${t}`);default:throw new Error(`Failed handling request which resulted in an empty method: Invalid empty-action specified: ${this.getEmptyAction}`)}return function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];if(0===e.length)throw new Error("Failed creating sequence: No functions provided");return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];let o=n;const i=this;for(;e.length>0;)o=[e.shift().apply(i,o)];return o[0]}}(...e.methods)}isPatched(t){return!!this.configuration.registry[t]}patch(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{chain:r=!1}=n;if(this.configuration.registry[t]&&this.configuration.registry[t].final)throw new Error(`Failed patching '${t}': Method marked as being final`);if("function"!=typeof e)throw new Error(`Failed patching '${t}': Provided method is not a function`);if(r)this.configuration.registry[t]?this.configuration.registry[t].methods.push(e):this.configuration.registry[t]=_(e);else if(this.isPatched(t)){const{original:n}=this.configuration.registry[t];this.configuration.registry[t]=Object.assign(_(e),{original:n})}else this.configuration.registry[t]=_(e);return this}patchInline(t,e){this.isPatched(t)||this.patch(t,e);for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return this.execute(t,...r)}plugin(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.forEach((e=>{this.patch(t,e,{chain:!0})})),this}restore(t){if(!this.isPatched(t))throw new Error(`Failed restoring method: No method present for key: ${t}`);if("function"!=typeof this.configuration.registry[t].original)throw new Error(`Failed restoring method: Original method not found or of invalid type for key: ${t}`);return this.configuration.registry[t].methods=[this.configuration.registry[t].original],this}setFinal(t){if(!this.configuration.registry.hasOwnProperty(t))throw new Error(`Failed marking '${t}' as final: No method found for key`);return this.configuration.registry[t].final=!0,this}}let U=null;function F(){return U||(U=new M),U}function D(t){return function(t){if("object"!=typeof t||null===t||"[object Object]"!=Object.prototype.toString.call(t))return!1;if(null===Object.getPrototypeOf(t))return!0;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}(t)?Object.assign({},t):Object.setPrototypeOf(Object.assign({},t),Object.getPrototypeOf(t))}function B(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];let r=null,o=[...e];for(;o.length>0;){const t=o.shift();r=r?V(r,t):D(t)}return r}function V(t,e){const n=D(t);return Object.keys(e).forEach((t=>{n.hasOwnProperty(t)?Array.isArray(e[t])?n[t]=Array.isArray(n[t])?[...n[t],...e[t]]:[...e[t]]:"object"==typeof e[t]&&e[t]?n[t]="object"==typeof n[t]&&n[t]?V(n[t],e[t]):D(e[t]):n[t]=e[t]:n[t]=e[t]})),n}function W(t){const e={};for(const n of t.keys())e[n]=t.get(n);return e}function z(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];if(0===e.length)return{};const r={};return e.reduce(((t,e)=>(Object.keys(e).forEach((n=>{const o=n.toLowerCase();r.hasOwnProperty(o)?t[r[o]]=e[n]:(r[o]=n,t[n]=e[n])})),t)),{})}n(805);const G="function"==typeof ArrayBuffer,{toString:q}=Object.prototype;function H(t){return G&&(t instanceof ArrayBuffer||"[object ArrayBuffer]"===q.call(t))}function X(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function Z(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}function Y(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const K=Z((function(t){const e=t._digest;return delete t._digest,e.hasDigestAuth&&(t=B(t,{headers:{Authorization:x(t,e)}})),Y(et(t),(function(n){let r=!1;return o=function(t){return r?t:n},(i=function(){if(401==n.status)return e.hasDigestAuth=function(t,e){if(!N(t))return!1;const n=/([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;for(;;){const r=t.headers&&t.headers.get("www-authenticate")||"",o=n.exec(r);if(!o)break;e[o[1]]=o[2]||o[3]}return e.nc+=1,e.cnonce=function(){let t="";for(let e=0;e<32;++e)t=`${t}${w[Math.floor(16*Math.random())]}`;return t}(),!0}(n,e),function(){if(e.hasDigestAuth)return Y(et(t=B(t,{headers:{Authorization:x(t,e)}})),(function(t){return 401==t.status?e.hasDigestAuth=!1:e.nc++,r=!0,t}))}();e.nc++}())&&i.then?i.then(o):o(i);// removed by dead control flow
{ var o, i; }}))})),J=Z((function(t,e){return Y(et(t),(function(n){return n.ok?(e.authType=C.Password,n):401==n.status&&N(n)?(e.authType=C.Digest,k(e,e.username,e.password,void 0,void 0),t._digest=e.digest,K(t)):n}))})),Q=Z((function(t,e){return e.authType===C.Auto?J(t,e):t._digest?K(t):et(t)}));function tt(t,e,n){const r=D(t);return r.headers=z(e.headers,r.headers||{},n.headers||{}),void 0!==n.data&&(r.data=n.data),n.signal&&(r.signal=n.signal),e.httpAgent&&(r.httpAgent=e.httpAgent),e.httpsAgent&&(r.httpsAgent=e.httpsAgent),e.digest&&(r._digest=e.digest),"boolean"==typeof e.withCredentials&&(r.withCredentials=e.withCredentials),r}function et(t){const e=F();return e.patchInline("request",(t=>e.patchInline("fetch",j,t.url,function(t){let e={};const n={method:t.method};if(t.headers&&(e=z(e,t.headers)),void 0!==t.data){const[r,o]=function(t){if("string"==typeof t)return[t,{}];if(X(t))return[t,{}];if(H(t))return[t,{}];if(t&&"object"==typeof t)return[JSON.stringify(t),{"content-type":"application/json"}];throw new Error("Unable to convert request body: Unexpected body type: "+typeof t)}(t.data);n.body=r,e=z(e,o)}return t.signal&&(n.signal=t.signal),t.withCredentials&&(n.credentials="include"),n.headers=e,n}(t))),t)}var nt=n(285);const rt=t=>{if("string"!=typeof t)throw new TypeError("invalid pattern");if(t.length>65536)throw new TypeError("pattern is too long")},ot={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",!0],"[:alpha:]":["\\p{L}\\p{Nl}",!0],"[:ascii:]":["\\x00-\\x7f",!1],"[:blank:]":["\\p{Zs}\\t",!0],"[:cntrl:]":["\\p{Cc}",!0],"[:digit:]":["\\p{Nd}",!0],"[:graph:]":["\\p{Z}\\p{C}",!0,!0],"[:lower:]":["\\p{Ll}",!0],"[:print:]":["\\p{C}",!0],"[:punct:]":["\\p{P}",!0],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",!0],"[:upper:]":["\\p{Lu}",!0],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",!0],"[:xdigit:]":["A-Fa-f0-9",!1]},it=t=>t.replace(/[[\]\\-]/g,"\\$&"),st=t=>t.join(""),at=(t,e)=>{const n=e;if("["!==t.charAt(n))throw new Error("not in a brace expression");const r=[],o=[];let i=n+1,s=!1,a=!1,u=!1,c=!1,l=n,h="";t:for(;i<t.length;){const e=t.charAt(i);if("!"!==e&&"^"!==e||i!==n+1){if("]"===e&&s&&!u){l=i+1;break}if(s=!0,"\\"!==e||u){if("["===e&&!u)for(const[e,[s,u,c]]of Object.entries(ot))if(t.startsWith(e,i)){if(h)return["$.",!1,t.length-n,!0];i+=e.length,c?o.push(s):r.push(s),a=a||u;continue t}u=!1,h?(e>h?r.push(it(h)+"-"+it(e)):e===h&&r.push(it(e)),h="",i++):t.startsWith("-]",i+1)?(r.push(it(e+"-")),i+=2):t.startsWith("-",i+1)?(h=e,i+=2):(r.push(it(e)),i++)}else u=!0,i++}else c=!0,i++}if(l<i)return["",!1,0,!1];if(!r.length&&!o.length)return["$.",!1,t.length-n,!0];if(0===o.length&&1===r.length&&/^\\?.$/.test(r[0])&&!c){return[(p=2===r[0].length?r[0].slice(-1):r[0],p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")),!1,l-n,!1]}var p;const f="["+(c?"^":"")+st(r)+"]",d="["+(c?"":"^")+st(o)+"]";return[r.length&&o.length?"("+f+"|"+d+")":r.length?f:d,a,l-n,!0]},ut=function(t){let{windowsPathsNoEscape:e=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e?t.replace(/\[([^\/\\])\]/g,"$1"):t.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1")},ct=new Set(["!","?","+","*","@"]),lt=t=>ct.has(t),ht="(?!\\.)",pt=new Set(["[","."]),ft=new Set(["..","."]),dt=new Set("().*{}+?[]^$\\!"),gt="[^/]",mt=gt+"*?",yt=gt+"+?";class vt{type;#t;#e;#n=!1;#r=[];#o;#i;#s;#a=!1;#u;#c;#l=!1;constructor(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.type=t,t&&(this.#e=!0),this.#o=e,this.#t=this.#o?this.#o.#t:this,this.#u=this.#t===this?n:this.#t.#u,this.#s=this.#t===this?[]:this.#t.#s,"!"!==t||this.#t.#a||this.#s.push(this),this.#i=this.#o?this.#o.#r.length:0}get hasMagic(){if(void 0!==this.#e)return this.#e;for(const t of this.#r)if("string"!=typeof t&&(t.type||t.hasMagic))return this.#e=!0;return this.#e}toString(){return void 0!==this.#c?this.#c:this.type?this.#c=this.type+"("+this.#r.map((t=>String(t))).join("|")+")":this.#c=this.#r.map((t=>String(t))).join("")}#h(){if(this!==this.#t)throw new Error("should only call on root");if(this.#a)return this;let t;for(this.toString(),this.#a=!0;t=this.#s.pop();){if("!"!==t.type)continue;let e=t,n=e.#o;for(;n;){for(let r=e.#i+1;!n.type&&r<n.#r.length;r++)for(const e of t.#r){if("string"==typeof e)throw new Error("string part in extglob AST??");e.copyIn(n.#r[r])}e=n,n=e.#o}}return this}push(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];for(const t of e)if(""!==t){if("string"!=typeof t&&!(t instanceof vt&&t.#o===this))throw new Error("invalid part: "+t);this.#r.push(t)}}toJSON(){const t=null===this.type?this.#r.slice().map((t=>"string"==typeof t?t:t.toJSON())):[this.type,...this.#r.map((t=>t.toJSON()))];return this.isStart()&&!this.type&&t.unshift([]),this.isEnd()&&(this===this.#t||this.#t.#a&&"!"===this.#o?.type)&&t.push({}),t}isStart(){if(this.#t===this)return!0;if(!this.#o?.isStart())return!1;if(0===this.#i)return!0;const t=this.#o;for(let e=0;e<this.#i;e++){const n=t.#r[e];if(!(n instanceof vt&&"!"===n.type))return!1}return!0}isEnd(){if(this.#t===this)return!0;if("!"===this.#o?.type)return!0;if(!this.#o?.isEnd())return!1;if(!this.type)return this.#o?.isEnd();const t=this.#o?this.#o.#r.length:0;return this.#i===t-1}copyIn(t){"string"==typeof t?this.push(t):this.push(t.clone(this))}clone(t){const e=new vt(this.type,t);for(const t of this.#r)e.copyIn(t);return e}static#p(t,e,n,r){let o=!1,i=!1,s=-1,a=!1;if(null===e.type){let u=n,c="";for(;u<t.length;){const n=t.charAt(u++);if(o||"\\"===n)o=!o,c+=n;else if(i)u===s+1?"^"!==n&&"!"!==n||(a=!0):"]"!==n||u===s+2&&a||(i=!1),c+=n;else if("["!==n)if(r.noext||!lt(n)||"("!==t.charAt(u))c+=n;else{e.push(c),c="";const o=new vt(n,e);u=vt.#p(t,o,u,r),e.push(o)}else i=!0,s=u,a=!1,c+=n}return e.push(c),u}let u=n+1,c=new vt(null,e);const l=[];let h="";for(;u<t.length;){const n=t.charAt(u++);if(o||"\\"===n)o=!o,h+=n;else if(i)u===s+1?"^"!==n&&"!"!==n||(a=!0):"]"!==n||u===s+2&&a||(i=!1),h+=n;else if("["!==n)if(lt(n)&&"("===t.charAt(u)){c.push(h),h="";const e=new vt(n,c);c.push(e),u=vt.#p(t,e,u,r)}else if("|"!==n){if(")"===n)return""===h&&0===e.#r.length&&(e.#l=!0),c.push(h),h="",e.push(...l,c),u;h+=n}else c.push(h),h="",l.push(c),c=new vt(null,e);else i=!0,s=u,a=!1,h+=n}return e.type=null,e.#e=void 0,e.#r=[t.substring(n-1)],u}static fromGlob(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=new vt(null,void 0,e);return vt.#p(t,n,0,e),n}toMMPattern(){if(this!==this.#t)return this.#t.toMMPattern();const t=this.toString(),[e,n,r,o]=this.toRegExpSource();if(!(r||this.#e||this.#u.nocase&&!this.#u.nocaseMagicOnly&&t.toUpperCase()!==t.toLowerCase()))return n;const i=(this.#u.nocase?"i":"")+(o?"u":"");return Object.assign(new RegExp(`^${e}$`,i),{_src:e,_glob:t})}get options(){return this.#u}toRegExpSource(t){const e=t??!!this.#u.dot;if(this.#t===this&&this.#h(),!this.type){const n=this.isStart()&&this.isEnd(),r=this.#r.map((e=>{const[r,o,i,s]="string"==typeof e?vt.#f(e,this.#e,n):e.toRegExpSource(t);return this.#e=this.#e||i,this.#n=this.#n||s,r})).join("");let o="";if(this.isStart()&&"string"==typeof this.#r[0]&&(1!==this.#r.length||!ft.has(this.#r[0]))){const n=pt,i=e&&n.has(r.charAt(0))||r.startsWith("\\.")&&n.has(r.charAt(2))||r.startsWith("\\.\\.")&&n.has(r.charAt(4)),s=!e&&!t&&n.has(r.charAt(0));o=i?"(?!(?:^|/)\\.\\.?(?:$|/))":s?ht:""}let i="";return this.isEnd()&&this.#t.#a&&"!"===this.#o?.type&&(i="(?:$|\\/)"),[o+r+i,ut(r),this.#e=!!this.#e,this.#n]}const n="*"===this.type||"+"===this.type,r="!"===this.type?"(?:(?!(?:":"(?:";let o=this.#d(e);if(this.isStart()&&this.isEnd()&&!o&&"!"!==this.type){const t=this.toString();return this.#r=[t],this.type=null,this.#e=void 0,[t,ut(this.toString()),!1,!1]}let i=!n||t||e?"":this.#d(!0);i===o&&(i=""),i&&(o=`(?:${o})(?:${i})*?`);let s="";return s="!"===this.type&&this.#l?(this.isStart()&&!e?ht:"")+yt:r+o+("!"===this.type?"))"+(!this.isStart()||e||t?"":ht)+mt+")":"@"===this.type?")":"?"===this.type?")?":"+"===this.type&&i?")":"*"===this.type&&i?")?":`)${this.type}`),[s,ut(o),this.#e=!!this.#e,this.#n]}#d(t){return this.#r.map((e=>{if("string"==typeof e)throw new Error("string type in extglob ast??");const[n,r,o,i]=e.toRegExpSource(t);return this.#n=this.#n||i,n})).filter((t=>!(this.isStart()&&this.isEnd()&&!t))).join("|")}static#f(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=!1,o="",i=!1;for(let s=0;s<t.length;s++){const a=t.charAt(s);if(r)r=!1,o+=(dt.has(a)?"\\":"")+a;else if("\\"!==a){if("["===a){const[n,r,a,u]=at(t,s);if(a){o+=n,i=i||r,s+=a-1,e=e||u;continue}}"*"!==a?"?"!==a?o+=a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):(o+=gt,e=!0):(o+=n&&"*"===t?yt:mt,e=!0)}else s===t.length-1?o+="\\\\":r=!0}return[o,ut(t),!!e,i]}}const bt=function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return rt(e),!(!n.nocomment&&"#"===e.charAt(0))&&new Gt(e,n).match(t)},wt=/^\*+([^+@!?\*\[\(]*)$/,xt=t=>e=>!e.startsWith(".")&&e.endsWith(t),Nt=t=>e=>e.endsWith(t),At=t=>(t=t.toLowerCase(),e=>!e.startsWith(".")&&e.toLowerCase().endsWith(t)),Pt=t=>(t=t.toLowerCase(),e=>e.toLowerCase().endsWith(t)),Ot=/^\*+\.\*+$/,Et=t=>!t.startsWith(".")&&t.includes("."),Tt=t=>"."!==t&&".."!==t&&t.includes("."),jt=/^\.\*+$/,St=t=>"."!==t&&".."!==t&&t.startsWith("."),$t=/^\*+$/,Ct=t=>0!==t.length&&!t.startsWith("."),It=t=>0!==t.length&&"."!==t&&".."!==t,kt=/^\?+([^+@!?\*\[\(]*)?$/,Rt=t=>{let[e,n=""]=t;const r=Ut([e]);return n?(n=n.toLowerCase(),t=>r(t)&&t.toLowerCase().endsWith(n)):r},Lt=t=>{let[e,n=""]=t;const r=Ft([e]);return n?(n=n.toLowerCase(),t=>r(t)&&t.toLowerCase().endsWith(n)):r},_t=t=>{let[e,n=""]=t;const r=Ft([e]);return n?t=>r(t)&&t.endsWith(n):r},Mt=t=>{let[e,n=""]=t;const r=Ut([e]);return n?t=>r(t)&&t.endsWith(n):r},Ut=t=>{let[e]=t;const n=e.length;return t=>t.length===n&&!t.startsWith(".")},Ft=t=>{let[e]=t;const n=e.length;return t=>t.length===n&&"."!==t&&".."!==t},Dt="object"==typeof process&&process?"object"==typeof process.env&&process.env&&process.env.__MINIMATCH_TESTING_PLATFORM__||"browser":"posix";bt.sep="win32"===Dt?"\\":"/";const Bt=Symbol("globstar **");bt.GLOBSTAR=Bt,bt.filter=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n=>bt(n,t,e)};const Vt=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.assign({},t,e)};bt.defaults=t=>{if(!t||"object"!=typeof t||!Object.keys(t).length)return bt;const e=bt;return Object.assign((function(n,r){return e(n,r,Vt(t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}))}),{Minimatch:class extends e.Minimatch{constructor(e){super(e,Vt(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}))}static defaults(n){return e.defaults(Vt(t,n)).Minimatch}},AST:class extends e.AST{constructor(e,n){super(e,n,Vt(t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}))}static fromGlob(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.AST.fromGlob(n,Vt(t,r))}},unescape:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.unescape(n,Vt(t,r))},escape:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.escape(n,Vt(t,r))},filter:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter(n,Vt(t,r))},defaults:n=>e.defaults(Vt(t,n)),makeRe:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.makeRe(n,Vt(t,r))},braceExpand:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.braceExpand(n,Vt(t,r))},match:function(n,r){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.match(n,r,Vt(t,o))},sep:e.sep,GLOBSTAR:Bt})};const Wt=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return rt(t),e.nobrace||!/\{(?:(?!\{).)*\}/.test(t)?[t]:nt(t)};bt.braceExpand=Wt,bt.makeRe=function(t){return new Gt(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).makeRe()},bt.match=function(t,e){const n=new Gt(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{});return t=t.filter((t=>n.match(t))),n.options.nonull&&!t.length&&t.push(e),t};const zt=/[?*]|[+@!]\(.*?\)|\[|\]/;class Gt{options;set;pattern;windowsPathsNoEscape;nonegate;negate;comment;empty;preserveMultipleSlashes;partial;globSet;globParts;nocase;isWindows;platform;windowsNoMagicRoot;regexp;constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};rt(t),e=e||{},this.options=e,this.pattern=t,this.platform=e.platform||Dt,this.isWindows="win32"===this.platform,this.windowsPathsNoEscape=!!e.windowsPathsNoEscape||!1===e.allowWindowsEscape,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!e.preserveMultipleSlashes,this.regexp=null,this.negate=!1,this.nonegate=!!e.nonegate,this.comment=!1,this.empty=!1,this.partial=!!e.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=void 0!==e.windowsNoMagicRoot?e.windowsNoMagicRoot:!(!this.isWindows||!this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make()}hasMagic(){if(this.options.magicalBraces&&this.set.length>1)return!0;for(const t of this.set)for(const e of t)if("string"!=typeof e)return!0;return!1}debug(){}make(){const t=this.pattern,e=this.options;if(!e.nocomment&&"#"===t.charAt(0))return void(this.comment=!0);if(!t)return void(this.empty=!0);this.parseNegate(),this.globSet=[...new Set(this.braceExpand())],e.debug&&(this.debug=function(){return console.error(...arguments)}),this.debug(this.pattern,this.globSet);const n=this.globSet.map((t=>this.slashSplit(t)));this.globParts=this.preprocess(n),this.debug(this.pattern,this.globParts);let r=this.globParts.map(((t,e,n)=>{if(this.isWindows&&this.windowsNoMagicRoot){const e=!(""!==t[0]||""!==t[1]||"?"!==t[2]&&zt.test(t[2])||zt.test(t[3])),n=/^[a-z]:/i.test(t[0]);if(e)return[...t.slice(0,4),...t.slice(4).map((t=>this.parse(t)))];if(n)return[t[0],...t.slice(1).map((t=>this.parse(t)))]}return t.map((t=>this.parse(t)))}));if(this.debug(this.pattern,r),this.set=r.filter((t=>-1===t.indexOf(!1))),this.isWindows)for(let t=0;t<this.set.length;t++){const e=this.set[t];""===e[0]&&""===e[1]&&"?"===this.globParts[t][2]&&"string"==typeof e[3]&&/^[a-z]:$/i.test(e[3])&&(e[2]="?")}this.debug(this.pattern,this.set)}preprocess(t){if(this.options.noglobstar)for(let e=0;e<t.length;e++)for(let n=0;n<t[e].length;n++)"**"===t[e][n]&&(t[e][n]="*");const{optimizationLevel:e=1}=this.options;return e>=2?(t=this.firstPhasePreProcess(t),t=this.secondPhasePreProcess(t)):t=e>=1?this.levelOneOptimize(t):this.adjascentGlobstarOptimize(t),t}adjascentGlobstarOptimize(t){return t.map((t=>{let e=-1;for(;-1!==(e=t.indexOf("**",e+1));){let n=e;for(;"**"===t[n+1];)n++;n!==e&&t.splice(e,n-e)}return t}))}levelOneOptimize(t){return t.map((t=>0===(t=t.reduce(((t,e)=>{const n=t[t.length-1];return"**"===e&&"**"===n?t:".."===e&&n&&".."!==n&&"."!==n&&"**"!==n?(t.pop(),t):(t.push(e),t)}),[])).length?[""]:t))}levelTwoFileOptimize(t){Array.isArray(t)||(t=this.slashSplit(t));let e=!1;do{if(e=!1,!this.preserveMultipleSlashes){for(let n=1;n<t.length-1;n++){const r=t[n];1===n&&""===r&&""===t[0]||"."!==r&&""!==r||(e=!0,t.splice(n,1),n--)}"."!==t[0]||2!==t.length||"."!==t[1]&&""!==t[1]||(e=!0,t.pop())}let n=0;for(;-1!==(n=t.indexOf("..",n+1));){const r=t[n-1];r&&"."!==r&&".."!==r&&"**"!==r&&(e=!0,t.splice(n-1,2),n-=2)}}while(e);return 0===t.length?[""]:t}firstPhasePreProcess(t){let e=!1;do{e=!1;for(let n of t){let r=-1;for(;-1!==(r=n.indexOf("**",r+1));){let o=r;for(;"**"===n[o+1];)o++;o>r&&n.splice(r+1,o-r);let i=n[r+1];const s=n[r+2],a=n[r+3];if(".."!==i)continue;if(!s||"."===s||".."===s||!a||"."===a||".."===a)continue;e=!0,n.splice(r,1);const u=n.slice(0);u[r]="**",t.push(u),r--}if(!this.preserveMultipleSlashes){for(let t=1;t<n.length-1;t++){const r=n[t];1===t&&""===r&&""===n[0]||"."!==r&&""!==r||(e=!0,n.splice(t,1),t--)}"."!==n[0]||2!==n.length||"."!==n[1]&&""!==n[1]||(e=!0,n.pop())}let o=0;for(;-1!==(o=n.indexOf("..",o+1));){const t=n[o-1];if(t&&"."!==t&&".."!==t&&"**"!==t){e=!0;const t=1===o&&"**"===n[o+1]?["."]:[];n.splice(o-1,2,...t),0===n.length&&n.push(""),o-=2}}}}while(e);return t}secondPhasePreProcess(t){for(let e=0;e<t.length-1;e++)for(let n=e+1;n<t.length;n++){const r=this.partsMatch(t[e],t[n],!this.preserveMultipleSlashes);if(r){t[e]=[],t[n]=r;break}}return t.filter((t=>t.length))}partsMatch(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=0,o=0,i=[],s="";for(;r<t.length&&o<e.length;)if(t[r]===e[o])i.push("b"===s?e[o]:t[r]),r++,o++;else if(n&&"**"===t[r]&&e[o]===t[r+1])i.push(t[r]),r++;else if(n&&"**"===e[o]&&t[r]===e[o+1])i.push(e[o]),o++;else if("*"!==t[r]||!e[o]||!this.options.dot&&e[o].startsWith(".")||"**"===e[o]){if("*"!==e[o]||!t[r]||!this.options.dot&&t[r].startsWith(".")||"**"===t[r])return!1;if("a"===s)return!1;s="b",i.push(e[o]),r++,o++}else{if("b"===s)return!1;s="a",i.push(t[r]),r++,o++}return t.length===e.length&&i}parseNegate(){if(this.nonegate)return;const t=this.pattern;let e=!1,n=0;for(let r=0;r<t.length&&"!"===t.charAt(r);r++)e=!e,n++;n&&(this.pattern=t.slice(n)),this.negate=e}matchOne(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=this.options;if(this.isWindows){const n="string"==typeof t[0]&&/^[a-z]:$/i.test(t[0]),r=!n&&""===t[0]&&""===t[1]&&"?"===t[2]&&/^[a-z]:$/i.test(t[3]),o="string"==typeof e[0]&&/^[a-z]:$/i.test(e[0]),i=r?3:n?0:void 0,s=!o&&""===e[0]&&""===e[1]&&"?"===e[2]&&"string"==typeof e[3]&&/^[a-z]:$/i.test(e[3])?3:o?0:void 0;if("number"==typeof i&&"number"==typeof s){const[n,r]=[t[i],e[s]];n.toLowerCase()===r.toLowerCase()&&(e[s]=n,s>i?e=e.slice(s):i>s&&(t=t.slice(i)))}}const{optimizationLevel:o=1}=this.options;o>=2&&(t=this.levelTwoFileOptimize(t)),this.debug("matchOne",this,{file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var i=0,s=0,a=t.length,u=e.length;i<a&&s<u;i++,s++){this.debug("matchOne loop");var c=e[s],l=t[i];if(this.debug(e,c,l),!1===c)return!1;if(c===Bt){this.debug("GLOBSTAR",[e,c,l]);var h=i,p=s+1;if(p===u){for(this.debug("** at the end");i<a;i++)if("."===t[i]||".."===t[i]||!r.dot&&"."===t[i].charAt(0))return!1;return!0}for(;h<a;){var f=t[h];if(this.debug("\nglobstar while",t,h,e,p,f),this.matchOne(t.slice(h),e.slice(p),n))return this.debug("globstar found match!",h,a,f),!0;if("."===f||".."===f||!r.dot&&"."===f.charAt(0)){this.debug("dot detected!",t,h,e,p);break}this.debug("globstar swallow a segment, and continue"),h++}return!(!n||(this.debug("\n>>> no match, partial?",t,h,e,p),h!==a))}let o;if("string"==typeof c?(o=l===c,this.debug("string match",c,l,o)):(o=c.test(l),this.debug("pattern match",c,l,o)),!o)return!1}if(i===a&&s===u)return!0;if(i===a)return n;if(s===u)return i===a-1&&""===t[i];throw new Error("wtf?")}braceExpand(){return Wt(this.pattern,this.options)}parse(t){rt(t);const e=this.options;if("**"===t)return Bt;if(""===t)return"";let n,r=null;(n=t.match($t))?r=e.dot?It:Ct:(n=t.match(wt))?r=(e.nocase?e.dot?Pt:At:e.dot?Nt:xt)(n[1]):(n=t.match(kt))?r=(e.nocase?e.dot?Lt:Rt:e.dot?_t:Mt)(n):(n=t.match(Ot))?r=e.dot?Tt:Et:(n=t.match(jt))&&(r=St);const o=vt.fromGlob(t,this.options).toMMPattern();return r&&"object"==typeof o&&Reflect.defineProperty(o,"test",{value:r}),o}makeRe(){if(this.regexp||!1===this.regexp)return this.regexp;const t=this.set;if(!t.length)return this.regexp=!1,this.regexp;const e=this.options,n=e.noglobstar?"[^/]*?":e.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",r=new Set(e.nocase?["i"]:[]);let o=t.map((t=>{const e=t.map((t=>{if(t instanceof RegExp)for(const e of t.flags.split(""))r.add(e);return"string"==typeof t?t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):t===Bt?Bt:t._src}));return e.forEach(((t,r)=>{const o=e[r+1],i=e[r-1];t===Bt&&i!==Bt&&(void 0===i?void 0!==o&&o!==Bt?e[r+1]="(?:\\/|"+n+"\\/)?"+o:e[r]=n:void 0===o?e[r-1]=i+"(?:\\/|"+n+")?":o!==Bt&&(e[r-1]=i+"(?:\\/|\\/"+n+"\\/)"+o,e[r+1]=Bt))})),e.filter((t=>t!==Bt)).join("/")})).join("|");const[i,s]=t.length>1?["(?:",")"]:["",""];o="^"+i+o+s+"$",this.negate&&(o="^(?!"+o+").+$");try{this.regexp=new RegExp(o,[...r].join(""))}catch(t){this.regexp=!1}return this.regexp}slashSplit(t){return this.preserveMultipleSlashes?t.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(t)?["",...t.split(/\/+/)]:t.split(/\/+/)}match(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.partial;if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;const n=this.options;this.isWindows&&(t=t.split("\\").join("/"));const r=this.slashSplit(t);this.debug(this.pattern,"split",r);const o=this.set;this.debug(this.pattern,"set",o);let i=r[r.length-1];if(!i)for(let t=r.length-2;!i&&t>=0;t--)i=r[t];for(let t=0;t<o.length;t++){const s=o[t];let a=r;if(n.matchBase&&1===s.length&&(a=[i]),this.matchOne(a,s,e))return!!n.flipNegate||!this.negate}return!n.flipNegate&&this.negate}static defaults(t){return bt.defaults(t).Minimatch}}function qt(t){const e=new Error(`${arguments.length>1&&void 0!==arguments[1]?arguments[1]:""}Invalid response: ${t.status} ${t.statusText}`);return e.status=t.status,e.response=t,e}function Ht(t,e){const{status:n}=e;if(401===n&&t.digest)return e;if(n>=400)throw qt(e);return e}function Xt(t,e){return arguments.length>2&&void 0!==arguments[2]&&arguments[2]?{data:e,headers:t.headers?W(t.headers):{},status:t.status,statusText:t.statusText}:e}bt.AST=vt,bt.Minimatch=Gt,bt.escape=function(t){let{windowsPathsNoEscape:e=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e?t.replace(/[?*()[\]]/g,"[$&]"):t.replace(/[?*()[\]\\]/g,"\\$&")},bt.unescape=ut;const Zt=(Yt=function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=tt({url:y(t.remoteURL,f(e)),method:"COPY",headers:{Destination:y(t.remoteURL,f(n)),Overwrite:!1===r.overwrite?"F":"T",Depth:r.shallow?"0":"infinity"}},t,r);return s=function(e){Ht(t,e)},(i=Q(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;// removed by dead control flow
{ var i, s; }},function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];try{return Promise.resolve(Yt.apply(this,t))}catch(t){return Promise.reject(t)}});var Yt,Kt=n(635),Jt=n(829),Qt=n.n(Jt),te=function(t){return t.Array="array",t.Object="object",t.Original="original",t}(te||{});function ee(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:te.Original;const r=Qt().get(t,e);return"array"===n&&!1===Array.isArray(r)?[r]:"object"===n&&Array.isArray(r)?r[0]:r}function ne(t){return new Promise((e=>{e(function(t){const{multistatus:e}=t;if(""===e)return{multistatus:{response:[]}};if(!e)throw new Error("Invalid response: No root multistatus found");const n={multistatus:Array.isArray(e)?e[0]:e};return Qt().set(n,"multistatus.response",ee(n,"multistatus.response",te.Array)),Qt().set(n,"multistatus.response",Qt().get(n,"multistatus.response").map((t=>function(t){const e=Object.assign({},t);return e.status?Qt().set(e,"status",ee(e,"status",te.Object)):(Qt().set(e,"propstat",ee(e,"propstat",te.Object)),Qt().set(e,"propstat.prop",ee(e,"propstat.prop",te.Object))),e}(t)))),n}(new Kt.XMLParser({allowBooleanAttributes:!0,attributeNamePrefix:"",textNodeName:"text",ignoreAttributes:!1,removeNSPrefix:!0,numberParseOptions:{hex:!0,leadingZeros:!1},attributeValueProcessor:(t,e,n)=>"true"===e||"false"===e?"true"===e:e,tagValueProcessor(t,e,n){if(!n.endsWith("propstat.prop.displayname"))return e}}).parse(t)))}))}function re(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const{getlastmodified:r=null,getcontentlength:o="0",resourcetype:i=null,getcontenttype:s=null,getetag:a=null}=t,u=i&&"object"==typeof i&&void 0!==i.collection?"directory":"file",c={filename:e,basename:l().basename(e),lastmod:r,size:parseInt(o,10),type:u,etag:"string"==typeof a?a.replace(/"/g,""):null};return"file"===u&&(c.mime=s&&"string"==typeof s?s.split(";")[0]:""),n&&(void 0!==t.displayname&&(t.displayname=String(t.displayname)),c.props=t),c}function oe(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=null;try{t.multistatus.response[0].propstat&&(r=t.multistatus.response[0])}catch(t){}if(!r)throw new Error("Failed getting item stat: bad response");const{propstat:{prop:o,status:i}}=r,[s,a,u]=i.split(" ",3),c=parseInt(a,10);if(c>=400){const t=new Error(`Invalid response: ${c} ${u}`);throw t.status=c,t}return re(o,g(e),n)}function ie(t){switch(String(t)){case"-3":return"unlimited";case"-2":case"-1":return"unknown";default:return parseInt(String(t),10)}}function se(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const ae=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{details:r=!1}=n,o=tt({url:y(t.remoteURL,f(e)),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,n);return se(Q(o,t),(function(n){return Ht(t,n),se(n.text(),(function(t){return se(ne(t),(function(t){const o=oe(t,e,r);return Xt(n,o,r)}))}))}))}));function ue(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const ce=le((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=function(t){if(!t||"/"===t)return[];let e=t;const n=[];do{n.push(e),e=l().dirname(e)}while(e&&"/"!==e);return n}(g(e));r.sort(((t,e)=>t.length>e.length?1:e.length>t.length?-1:0));let o=!1;return function(t,e,n){if("function"==typeof t[fe]){var r,o,i,s=t[fe]();function l(t){try{for(;!(r=s.next()).done;)if((t=e(r.value))&&t.then){if(!me(t))return void t.then(l,i||(i=de.bind(null,o=new ge,2)));t=t.v}o?de(o,1,t):o=t}catch(t){de(o||(o=new ge),2,t)}}if(l(),s.return){var a=function(t){try{r.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,(function(t){throw a(t)}));a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,e,n){var r,o,i=-1;return function s(a){try{for(;++i<t.length&&(!n||!n());)if((a=e(i))&&a.then){if(!me(a))return void a.then(s,o||(o=de.bind(null,r=new ge,2)));a=a.v}r?de(r,1,a):r=a}catch(t){de(r||(r=new ge),2,t)}}(),r}(u,(function(t){return e(u[t])}),n)}(r,(function(r){return i=function(){return function(n,o){try{var i=ue(ae(t,r),(function(t){if("directory"!==t.type)throw new Error(`Path includes a file: ${e}`)}))}catch(t){return o(t)}return i&&i.then?i.then(void 0,o):i}(0,(function(e){const i=e;return function(){if(404===i.status)return o=!0,pe(ye(t,r,{...n,recursive:!1}));throw e}()}))},(s=function(){if(o)return pe(ye(t,r,{...n,recursive:!1}))}())&&s.then?s.then(i):i();// removed by dead control flow
{ var i, s; }}),(function(){return!1}))}));function le(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}function he(){}function pe(t,e){if(!e)return t&&t.then?t.then(he):Promise.resolve()}const fe="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function de(t,e,n){if(!t.s){if(n instanceof ge){if(!n.s)return void(n.o=de.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(de.bind(null,t,e),de.bind(null,t,2));t.s=e,t.v=n;const r=t.o;r&&r(t)}}const ge=function(){function t(){}return t.prototype.then=function(e,n){const r=new t,o=this.s;if(o){const t=1&o?e:n;if(t){try{de(r,1,t(this.v))}catch(t){de(r,2,t)}return r}return this}return this.o=function(t){try{const o=t.v;1&t.s?de(r,1,e?e(o):o):n?de(r,1,n(o)):de(r,2,o)}catch(t){de(r,2,t)}},r},t}();function me(t){return t instanceof ge&&1&t.s}const ye=le((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!0===n.recursive)return ce(t,e,n);const r=tt({url:y(t.remoteURL,(o=f(e),o.endsWith("/")?o:o+"/")),method:"MKCOL"},t,n);var o;return ue(Q(r,t),(function(e){Ht(t,e)}))}));var ve=n(388),be=n.n(ve);const we=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r={};if("object"==typeof n.range&&"number"==typeof n.range.start){let t=`bytes=${n.range.start}-`;"number"==typeof n.range.end&&(t=`${t}${n.range.end}`),r.Range=t}const o=tt({url:y(t.remoteURL,f(e)),method:"GET",headers:r},t,n);return s=function(e){if(Ht(t,e),r.Range&&206!==e.status){const t=new Error(`Invalid response code for partial request: ${e.status}`);throw t.status=e.status,t}return n.callback&&setTimeout((()=>{n.callback(e)}),0),e.body},(i=Q(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;// removed by dead control flow
{ var i, s; }})),xe=()=>{},Ne=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){n.url||(n.url=y(t.remoteURL,f(e)));const r=tt(n,t,{});return i=function(e){return Ht(t,e),e},(o=Q(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;// removed by dead control flow
{ var o, i; }})),Ae=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e)),method:"DELETE"},t,n);return i=function(e){Ht(t,e)},(o=Q(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;// removed by dead control flow
{ var o, i; }})),Pe=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(r,o){try{var i=(s=ae(t,e,n),a=function(){return!0},u?a?a(s):s:(s&&s.then||(s=Promise.resolve(s)),a?s.then(a):s))}catch(t){return o(t)}var s,a,u;return i&&i.then?i.then(void 0,o):i}(0,(function(t){if(404===t.status)return!1;throw t}))}));function Oe(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Ee=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e),"/"),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:n.deep?"infinity":"1"}},t,n);return Oe(Q(r,t),(function(r){return Ht(t,r),Oe(r.text(),(function(o){if(!o)throw new Error("Failed parsing directory contents: Empty response");return Oe(ne(o),(function(o){const i=d(e);let s=function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const i=l().join(e,"/"),{multistatus:{response:s}}=t,a=s.map((t=>{const e=function(t){try{return t.replace(/^https?:\/\/[^\/]+/,"")}catch(t){throw new u(t,"Failed normalising HREF")}}(t.href),{propstat:{prop:n}}=t;return re(n,"/"===i?decodeURIComponent(g(e)):g(l().relative(decodeURIComponent(i),decodeURIComponent(e))),r)}));return o?a:a.filter((t=>t.basename&&("file"===t.type||t.filename!==n.replace(/\/$/,""))))}(o,d(t.remoteBasePath||t.remotePath),i,n.details,n.includeSelf);return n.glob&&(s=function(t,e){return t.filter((t=>bt(t.filename,e,{matchBase:!0})))}(s,n.glob)),Xt(r,s,n.details)}))}))}))}));function Te(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const je=Te((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e)),method:"GET",headers:{Accept:"text/plain"},transformResponse:[Ie]},t,n);return Se(Q(r,t),(function(e){return Ht(t,e),Se(e.text(),(function(t){return Xt(e,t,n.details)}))}))}));function Se(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const $e=Te((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e)),method:"GET"},t,n);return Se(Q(r,t),(function(e){let r;return Ht(t,e),function(t,e){var n=t();return n&&n.then?n.then(e):e()}((function(){return Se(e.arrayBuffer(),(function(t){r=t}))}),(function(){return Xt(e,r,n.details)}))}))})),Ce=Te((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{format:r="binary"}=n;if("binary"!==r&&"text"!==r)throw new u({info:{code:I.InvalidOutputFormat}},`Invalid output format: ${r}`);return"text"===r?je(t,e,n):$e(t,e,n)})),Ie=t=>t;function ke(t){return new Kt.XMLBuilder({attributeNamePrefix:"@_",format:!0,ignoreAttributes:!1,suppressEmptyNode:!0}).build(Re({lockinfo:{"@_xmlns:d":"DAV:",lockscope:{exclusive:{}},locktype:{write:{}},owner:{href:t}}},"d"))}function Re(t,e){const n={...t};for(const t in n)n.hasOwnProperty(t)&&(n[t]&&"object"==typeof n[t]&&-1===t.indexOf(":")?(n[`${e}:${t}`]=Re(n[t],e),delete n[t]):!1===/^@_/.test(t)&&(n[`${e}:${t}`]=n[t],delete n[t]));return n}function Le(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function _e(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const Me=_e((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=tt({url:y(t.remoteURL,f(e)),method:"UNLOCK",headers:{"Lock-Token":n}},t,r);return Le(Q(o,t),(function(e){if(Ht(t,e),204!==e.status&&200!==e.status)throw qt(e)}))})),Ue=_e((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{refreshToken:r,timeout:o=Fe}=n,i={Accept:"text/plain,application/xml",Timeout:o};r&&(i.If=r);const s=tt({url:y(t.remoteURL,f(e)),method:"LOCK",headers:i,data:ke(t.contactHref)},t,n);return Le(Q(s,t),(function(e){return Ht(t,e),Le(e.text(),(function(t){const n=(i=t,new Kt.XMLParser({removeNSPrefix:!0,parseAttributeValue:!0,parseTagValue:!0}).parse(i)),r=Qt().get(n,"prop.lockdiscovery.activelock.locktoken.href"),o=Qt().get(n,"prop.lockdiscovery.activelock.timeout");var i;if(!r)throw qt(e,"No lock token received: ");return{token:r,serverTimeout:o}}))}))})),Fe="Infinite, Second-4100000000";function De(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Be=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=e.path||"/",r=tt({url:y(t.remoteURL,n),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,e);return De(Q(r,t),(function(n){return Ht(t,n),De(n.text(),(function(t){return De(ne(t),(function(t){const r=function(t){try{const[e]=t.multistatus.response,{propstat:{prop:{"quota-used-bytes":n,"quota-available-bytes":r}}}=e;return void 0!==n&&void 0!==r?{used:parseInt(String(n),10),available:ie(r)}:null}catch(t){}return null}(t);return Xt(n,r,e.details)}))}))}))}));function Ve(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const We=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{details:r=!1}=n,o=tt({url:y(t.remoteURL,f(e)),method:"SEARCH",headers:{Accept:"text/plain,application/xml","Content-Type":t.headers["Content-Type"]||"application/xml; charset=utf-8"}},t,n);return Ve(Q(o,t),(function(n){return Ht(t,n),Ve(n.text(),(function(t){return Ve(ne(t),(function(t){const o=function(t,e,n){const r={truncated:!1,results:[]};return r.truncated=t.multistatus.response.some((t=>"507"===(t.status||t.propstat?.status).split(" ",3)?.[1]&&t.href.replace(/\/$/,"").endsWith(f(e).replace(/\/$/,"")))),t.multistatus.response.forEach((t=>{if(void 0===t.propstat)return;const e=t.href.split("/").map(decodeURIComponent).join("/");r.results.push(re(t.propstat.prop,e,n))})),r}(t,e,r);return Xt(n,o,r)}))}))}))})),ze=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=tt({url:y(t.remoteURL,f(e)),method:"MOVE",headers:{Destination:y(t.remoteURL,f(n)),Overwrite:!1===r.overwrite?"F":"T"}},t,r);return s=function(e){Ht(t,e)},(i=Q(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;// removed by dead control flow
{ var i, s; }}));var Ge=n(172);const qe=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const{contentLength:o=!0,overwrite:i=!0}=r,s={"Content-Type":"application/octet-stream"};!1===o||(s["Content-Length"]="number"==typeof o?`${o}`:`${function(t){if(H(t))return t.byteLength;if(X(t))return t.length;if("string"==typeof t)return(0,Ge.d)(t);throw new u({info:{code:I.DataTypeNoLength}},"Cannot calculate data length: Invalid type")}(n)}`),i||(s["If-None-Match"]="*");const a=tt({url:y(t.remoteURL,f(e)),method:"PUT",headers:s,data:n},t,r);return l=function(e){try{Ht(t,e)}catch(t){const e=t;if(412!==e.status||i)throw e;return!1}return!0},(c=Q(a,t))&&c.then||(c=Promise.resolve(c)),l?c.then(l):c;// removed by dead control flow
{ var c, l; }})),He=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e)),method:"OPTIONS"},t,n);return i=function(e){try{Ht(t,e)}catch(t){throw t}return{compliance:(e.headers.get("DAV")??"").split(",").map((t=>t.trim())),server:e.headers.get("Server")??""}},(o=Q(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;// removed by dead control flow
{ var o, i; }}));function Xe(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Ze=Je((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};if(n>r||n<0)throw new u({info:{code:I.InvalidUpdateRange}},`Invalid update range ${n} for partial update`);const s={"Content-Type":"application/octet-stream","Content-Length":""+(r-n+1),"Content-Range":`bytes ${n}-${r}/*`},a=tt({url:y(t.remoteURL,f(e)),method:"PUT",headers:s,data:o},t,i);return Xe(Q(a,t),(function(e){Ht(t,e)}))}));function Ye(t,e){var n=t();return n&&n.then?n.then(e):e(n)}const Ke=Je((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};if(n>r||n<0)throw new u({info:{code:I.InvalidUpdateRange}},`Invalid update range ${n} for partial update`);const s={"Content-Type":"application/x-sabredav-partialupdate","Content-Length":""+(r-n+1),"X-Update-Range":`bytes=${n}-${r}`},a=tt({url:y(t.remoteURL,f(e)),method:"PATCH",headers:s,data:o},t,i);return Xe(Q(a,t),(function(e){Ht(t,e)}))}));function Je(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const Qe=Je((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};return Xe(He(t,e,i),(function(s){let a=!1;return Ye((function(){if(s.compliance.includes("sabredav-partialupdate"))return Xe(Ke(t,e,n,r,o,i),(function(t){return a=!0,t}))}),(function(c){let l=!1;return a?c:Ye((function(){if(s.server.includes("Apache")&&s.compliance.includes("<http://apache.org/dav/propset/fs/1>"))return Xe(Ze(t,e,n,r,o,i),(function(t){return l=!0,t}))}),(function(t){if(l)return t;throw new u({info:{code:I.NotSupported}},"Not supported")}))}))}))})),tn="https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";function en(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{authType:n=null,remoteBasePath:r,contactHref:o=tn,ha1:i,headers:s={},httpAgent:a,httpsAgent:c,password:l,token:h,username:p,withCredentials:d}=e;let g=n;g||(g=p||l?C.Password:C.None);const v={authType:g,remoteBasePath:r,contactHref:o,ha1:i,headers:Object.assign({},s),httpAgent:a,httpsAgent:c,password:l,remotePath:m(t),remoteURL:t,token:h,username:p,withCredentials:d};return k(v,p,l,h,i),{copyFile:(t,e,n)=>Zt(v,t,e,n),createDirectory:(t,e)=>ye(v,t,e),createReadStream:(t,e)=>function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=new(0,be().PassThrough);return we(t,e,n).then((t=>{t.pipe(r)})).catch((t=>{r.emit("error",t)})),r}(v,t,e),createWriteStream:(t,e,n)=>function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:xe;const o=new(0,be().PassThrough),i={};!1===n.overwrite&&(i["If-None-Match"]="*");const s=tt({url:y(t.remoteURL,f(e)),method:"PUT",headers:i,data:o,maxRedirects:0},t,n);return Q(s,t).then((e=>Ht(t,e))).then((t=>{setTimeout((()=>{r(t)}),0)})).catch((t=>{o.emit("error",t)})),o}(v,t,e,n),customRequest:(t,e)=>Ne(v,t,e),deleteFile:(t,e)=>Ae(v,t,e),exists:(t,e)=>Pe(v,t,e),getDirectoryContents:(t,e)=>Ee(v,t,e),getFileContents:(t,e)=>Ce(v,t,e),getFileDownloadLink:t=>function(t,e){let n=y(t.remoteURL,f(e));const r=/^https:/i.test(n)?"https":"http";switch(t.authType){case C.None:break;case C.Password:{const e=O(t.headers.Authorization.replace(/^Basic /i,"").trim());n=n.replace(/^https?:\/\//,`${r}://${e}@`);break}default:throw new u({info:{code:I.LinkUnsupportedAuthType}},`Unsupported auth type for file link: ${t.authType}`)}return n}(v,t),getFileUploadLink:t=>function(t,e){let n=`${y(t.remoteURL,f(e))}?Content-Type=application/octet-stream`;const r=/^https:/i.test(n)?"https":"http";switch(t.authType){case C.None:break;case C.Password:{const e=O(t.headers.Authorization.replace(/^Basic /i,"").trim());n=n.replace(/^https?:\/\//,`${r}://${e}@`);break}default:throw new u({info:{code:I.LinkUnsupportedAuthType}},`Unsupported auth type for file link: ${t.authType}`)}return n}(v,t),getHeaders:()=>Object.assign({},v.headers),getQuota:t=>Be(v,t),lock:(t,e)=>Ue(v,t,e),moveFile:(t,e,n)=>ze(v,t,e,n),putFileContents:(t,e,n)=>qe(v,t,e,n),partialUpdateFileContents:(t,e,n,r,o)=>Qe(v,t,e,n,r,o),getDAVCompliance:t=>He(v,t),search:(t,e)=>We(v,t,e),setHeaders:t=>{v.headers=Object.assign({},t)},stat:(t,e)=>ae(v,t,e),unlock:(t,e,n)=>Me(v,t,e,n)}}var nn=r.hT,rn=r.O4,on=r.Kd,sn=r.YK,an=r.UU,un=r.Gu,cn=r.ky,ln=r.h4,hn=r.ch,pn=r.hq,fn=r.i5;
// EXTERNAL MODULE: ./node_modules/@nextcloud/sharing/dist/public.mjs
var dist_public = __webpack_require__(2680);
;// ./node_modules/@nextcloud/files/dist/chunks/dav-DY_3WIBa.mjs








const dav_DY_3WIBa_logger = (0,dist/* getLoggerBuilder */.YK)().setApp("@nextcloud/files").detectUser().build();
var Permission = /* @__PURE__ */ ((Permission2) => {
  Permission2[Permission2["NONE"] = 0] = "NONE";
  Permission2[Permission2["CREATE"] = 4] = "CREATE";
  Permission2[Permission2["READ"] = 1] = "READ";
  Permission2[Permission2["UPDATE"] = 2] = "UPDATE";
  Permission2[Permission2["DELETE"] = 8] = "DELETE";
  Permission2[Permission2["SHARE"] = 16] = "SHARE";
  Permission2[Permission2["ALL"] = 31] = "ALL";
  return Permission2;
})(Permission || {});
var FileType = /* @__PURE__ */ ((FileType2) => {
  FileType2["Folder"] = "folder";
  FileType2["File"] = "file";
  return FileType2;
})(FileType || {});
const isDavResource = function(source, davService) {
  return source.match(davService) !== null;
};
const validateData = (data, davService) => {
  if (data.id && typeof data.id !== "number") {
    throw new Error("Invalid id type of value");
  }
  if (!data.source) {
    throw new Error("Missing mandatory source");
  }
  try {
    new URL(data.source);
  } catch (e) {
    throw new Error("Invalid source format, source must be a valid URL");
  }
  if (!data.source.startsWith("http")) {
    throw new Error("Invalid source format, only http(s) is supported");
  }
  if (data.displayname && typeof data.displayname !== "string") {
    throw new Error("Invalid displayname type");
  }
  if (data.mtime && !(data.mtime instanceof Date)) {
    throw new Error("Invalid mtime type");
  }
  if (data.crtime && !(data.crtime instanceof Date)) {
    throw new Error("Invalid crtime type");
  }
  if (!data.mime || typeof data.mime !== "string" || !data.mime.match(/^[-\w.]+\/[-+\w.]+$/gi)) {
    throw new Error("Missing or invalid mandatory mime");
  }
  if ("size" in data && typeof data.size !== "number" && data.size !== void 0) {
    throw new Error("Invalid size type");
  }
  if ("permissions" in data && data.permissions !== void 0 && !(typeof data.permissions === "number" && data.permissions >= Permission.NONE && data.permissions <= Permission.ALL)) {
    throw new Error("Invalid permissions");
  }
  if (data.owner && data.owner !== null && typeof data.owner !== "string") {
    throw new Error("Invalid owner type");
  }
  if (data.attributes && typeof data.attributes !== "object") {
    throw new Error("Invalid attributes type");
  }
  if (data.root && typeof data.root !== "string") {
    throw new Error("Invalid root type");
  }
  if (data.root && !data.root.startsWith("/")) {
    throw new Error("Root must start with a leading slash");
  }
  if (data.root && !data.source.includes(data.root)) {
    throw new Error("Root must be part of the source");
  }
  if (data.root && isDavResource(data.source, davService)) {
    const service = data.source.match(davService)[0];
    if (!data.source.includes((0,path.join)(service, data.root))) {
      throw new Error("The root must be relative to the service. e.g /files/emma");
    }
  }
  if (data.status && !Object.values(NodeStatus).includes(data.status)) {
    throw new Error("Status must be a valid NodeStatus");
  }
};
var NodeStatus = /* @__PURE__ */ ((NodeStatus2) => {
  NodeStatus2["NEW"] = "new";
  NodeStatus2["FAILED"] = "failed";
  NodeStatus2["LOADING"] = "loading";
  NodeStatus2["LOCKED"] = "locked";
  return NodeStatus2;
})(NodeStatus || {});
class Node {
  _data;
  _attributes;
  _knownDavService = /(remote|public)\.php\/(web)?dav/i;
  readonlyAttributes = Object.entries(Object.getOwnPropertyDescriptors(Node.prototype)).filter((e) => typeof e[1].get === "function" && e[0] !== "__proto__").map((e) => e[0]);
  handler = {
    set: (target, prop, value) => {
      if (this.readonlyAttributes.includes(prop)) {
        return false;
      }
      return Reflect.set(target, prop, value);
    },
    deleteProperty: (target, prop) => {
      if (this.readonlyAttributes.includes(prop)) {
        return false;
      }
      return Reflect.deleteProperty(target, prop);
    },
    // TODO: This is deprecated and only needed for files v3
    get: (target, prop, receiver) => {
      if (this.readonlyAttributes.includes(prop)) {
        dav_DY_3WIBa_logger.warn(`Accessing "Node.attributes.${prop}" is deprecated, access it directly on the Node instance.`);
        return Reflect.get(this, prop);
      }
      return Reflect.get(target, prop, receiver);
    }
  };
  constructor(data, davService) {
    if (!data.mime) {
      data.mime = "application/octet-stream";
    }
    validateData(data, davService || this._knownDavService);
    this._data = {
      // TODO: Remove with next major release, this is just for compatibility
      displayname: data.attributes?.displayname,
      ...data,
      attributes: {}
    };
    this._attributes = new Proxy(this._data.attributes, this.handler);
    this.update(data.attributes ?? {});
    if (davService) {
      this._knownDavService = davService;
    }
  }
  /**
   * Get the source url to this object
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get source() {
    return this._data.source.replace(/\/$/i, "");
  }
  /**
   * Get the encoded source url to this object for requests purposes
   */
  get encodedSource() {
    const { origin } = new URL(this.source);
    return origin + encodePath(this.source.slice(origin.length));
  }
  /**
   * Get this object name
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get basename() {
    return (0,path.basename)(this.source);
  }
  /**
   * The nodes displayname
   * By default the display name and the `basename` are identical,
   * but it is possible to have a different name. This happens
   * on the files app for example for shared folders.
   */
  get displayname() {
    return this._data.displayname || this.basename;
  }
  /**
   * Set the displayname
   */
  set displayname(displayname) {
    validateData({ ...this._data, displayname }, this._knownDavService);
    this._data.displayname = displayname;
  }
  /**
   * Get this object's extension
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get extension() {
    return (0,path.extname)(this.source);
  }
  /**
   * Get the directory path leading to this object
   * Will use the relative path to root if available
   *
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get dirname() {
    if (this.root) {
      let source = this.source;
      if (this.isDavResource) {
        source = source.split(this._knownDavService).pop();
      }
      const firstMatch = source.indexOf(this.root);
      const root = this.root.replace(/\/$/, "");
      return (0,path.dirname)(source.slice(firstMatch + root.length) || "/");
    }
    const url = new URL(this.source);
    return (0,path.dirname)(url.pathname);
  }
  /**
   * Get the file mime
   */
  get mime() {
    return this._data.mime || "application/octet-stream";
  }
  /**
   * Set the file mime
   * Removing the mime type will set it to `application/octet-stream`
   */
  set mime(mime) {
    mime ??= "application/octet-stream";
    validateData({ ...this._data, mime }, this._knownDavService);
    this._data.mime = mime;
  }
  /**
   * Get the file modification time
   */
  get mtime() {
    return this._data.mtime;
  }
  /**
   * Set the file modification time
   */
  set mtime(mtime) {
    validateData({ ...this._data, mtime }, this._knownDavService);
    this._data.mtime = mtime;
  }
  /**
   * Get the file creation time
   * There is no setter as the creation time is not meant to be changed
   */
  get crtime() {
    return this._data.crtime;
  }
  /**
   * Get the file size
   */
  get size() {
    return this._data.size;
  }
  /**
   * Set the file size
   */
  set size(size) {
    validateData({ ...this._data, size }, this._knownDavService);
    this.updateMtime();
    this._data.size = size;
  }
  /**
   * Get the file attribute
   * This contains all additional attributes not provided by the Node class
   */
  get attributes() {
    return this._attributes;
  }
  /**
   * Get the file permissions
   */
  get permissions() {
    if (this.owner === null && !this.isDavResource) {
      return Permission.READ;
    }
    return this._data.permissions !== void 0 ? this._data.permissions : Permission.NONE;
  }
  /**
   * Set the file permissions
   */
  set permissions(permissions) {
    validateData({ ...this._data, permissions }, this._knownDavService);
    this.updateMtime();
    this._data.permissions = permissions;
  }
  /**
   * Get the file owner
   * There is no setter as the owner is not meant to be changed
   */
  get owner() {
    if (!this.isDavResource) {
      return null;
    }
    return this._data.owner;
  }
  /**
   * Is this a dav-related resource ?
   */
  get isDavResource() {
    return isDavResource(this.source, this._knownDavService);
  }
  /**
   * @deprecated use `isDavResource` instead - will be removed in next major version.
   */
  get isDavRessource() {
    return this.isDavResource;
  }
  /**
   * Get the dav root of this object
   * There is no setter as the root is not meant to be changed
   */
  get root() {
    if (this._data.root) {
      return this._data.root.replace(/^(.+)\/$/, "$1");
    }
    if (this.isDavResource) {
      const root = (0,path.dirname)(this.source);
      return root.split(this._knownDavService).pop() || null;
    }
    return null;
  }
  /**
   * Get the absolute path of this object relative to the root
   */
  get path() {
    if (this.root) {
      let source = this.source;
      if (this.isDavResource) {
        source = source.split(this._knownDavService).pop();
      }
      const firstMatch = source.indexOf(this.root);
      const root = this.root.replace(/\/$/, "");
      return source.slice(firstMatch + root.length) || "/";
    }
    return (this.dirname + "/" + this.basename).replace(/\/\//g, "/");
  }
  /**
   * Get the node id if defined.
   * There is no setter as the fileid is not meant to be changed
   */
  get fileid() {
    return this._data?.id;
  }
  /**
   * Get the node status.
   */
  get status() {
    return this._data?.status;
  }
  /**
   * Set the node status.
   */
  set status(status) {
    validateData({ ...this._data, status }, this._knownDavService);
    this._data.status = status;
  }
  /**
   * Get the node data
   */
  get data() {
    return structuredClone(this._data);
  }
  /**
   * Move the node to a new destination
   *
   * @param {string} destination the new source.
   * e.g. https://cloud.domain.com/remote.php/dav/files/emma/Photos/picture.jpg
   */
  move(destination) {
    validateData({ ...this._data, source: destination }, this._knownDavService);
    const oldBasename = this.basename;
    this._data.source = destination;
    if (this.displayname === oldBasename && this.basename !== oldBasename) {
      this.displayname = this.basename;
    }
  }
  /**
   * Rename the node
   * This aliases the move method for easier usage
   *
   * @param basename The new name of the node
   */
  rename(basename2) {
    if (basename2.includes("/")) {
      throw new Error("Invalid basename");
    }
    this.move((0,path.dirname)(this.source) + "/" + basename2);
  }
  /**
   * Update the mtime if exists
   */
  updateMtime() {
    if (this._data.mtime) {
      this._data.mtime = /* @__PURE__ */ new Date();
    }
  }
  /**
   * Update the attributes of the node
   * Warning, updating attributes will NOT automatically update the mtime.
   *
   * @param attributes The new attributes to update on the Node attributes
   */
  update(attributes) {
    for (const [name, value] of Object.entries(attributes)) {
      try {
        if (value === void 0) {
          delete this.attributes[name];
        } else {
          this.attributes[name] = value;
        }
      } catch (e) {
        if (e instanceof TypeError) {
          continue;
        }
        throw e;
      }
    }
  }
}
class File extends Node {
  get type() {
    return FileType.File;
  }
  /**
   * Returns a clone of the file
   */
  clone() {
    return new File(this.data);
  }
}
class Folder extends Node {
  constructor(data) {
    super({
      ...data,
      mime: "httpd/unix-directory"
    });
  }
  get type() {
    return FileType.Folder;
  }
  get extension() {
    return null;
  }
  get mime() {
    return "httpd/unix-directory";
  }
  /**
   * Returns a clone of the folder
   */
  clone() {
    return new Folder(this.data);
  }
}
const parsePermissions = function(permString = "") {
  let permissions = Permission.NONE;
  if (!permString) {
    return permissions;
  }
  if (permString.includes("C") || permString.includes("K")) {
    permissions |= Permission.CREATE;
  }
  if (permString.includes("G")) {
    permissions |= Permission.READ;
  }
  if (permString.includes("W") || permString.includes("N") || permString.includes("V")) {
    permissions |= Permission.UPDATE;
  }
  if (permString.includes("D")) {
    permissions |= Permission.DELETE;
  }
  if (permString.includes("R")) {
    permissions |= Permission.SHARE;
  }
  return permissions;
};
const defaultDavProperties = [
  "d:getcontentlength",
  "d:getcontenttype",
  "d:getetag",
  "d:getlastmodified",
  "d:creationdate",
  "d:displayname",
  "d:quota-available-bytes",
  "d:resourcetype",
  "nc:has-preview",
  "nc:is-encrypted",
  "nc:mount-type",
  "oc:comments-unread",
  "oc:favorite",
  "oc:fileid",
  "oc:owner-display-name",
  "oc:owner-id",
  "oc:permissions",
  "oc:size"
];
const defaultDavNamespaces = {
  d: "DAV:",
  nc: "http://nextcloud.org/ns",
  oc: "http://owncloud.org/ns",
  ocs: "http://open-collaboration-services.org/ns"
};
const registerDavProperty = function(prop, namespace = { nc: "http://nextcloud.org/ns" }) {
  if (typeof window._nc_dav_properties === "undefined") {
    window._nc_dav_properties = [...defaultDavProperties];
    window._nc_dav_namespaces = { ...defaultDavNamespaces };
  }
  const namespaces = { ...window._nc_dav_namespaces, ...namespace };
  if (window._nc_dav_properties.find((search) => search === prop)) {
    dav_DY_3WIBa_logger.warn(`${prop} already registered`, { prop });
    return false;
  }
  if (prop.startsWith("<") || prop.split(":").length !== 2) {
    dav_DY_3WIBa_logger.error(`${prop} is not valid. See example: 'oc:fileid'`, { prop });
    return false;
  }
  const ns = prop.split(":")[0];
  if (!namespaces[ns]) {
    dav_DY_3WIBa_logger.error(`${prop} namespace unknown`, { prop, namespaces });
    return false;
  }
  window._nc_dav_properties.push(prop);
  window._nc_dav_namespaces = namespaces;
  return true;
};
const getDavProperties = function() {
  if (typeof window._nc_dav_properties === "undefined") {
    window._nc_dav_properties = [...defaultDavProperties];
  }
  return window._nc_dav_properties.map((prop) => `<${prop} />`).join(" ");
};
const getDavNameSpaces = function() {
  if (typeof window._nc_dav_namespaces === "undefined") {
    window._nc_dav_namespaces = { ...defaultDavNamespaces };
  }
  return Object.keys(window._nc_dav_namespaces).map((ns) => `xmlns:${ns}="${window._nc_dav_namespaces?.[ns]}"`).join(" ");
};
const getDefaultPropfind = function() {
  return `<?xml version="1.0"?>
		<d:propfind ${getDavNameSpaces()}>
			<d:prop>
				${getDavProperties()}
			</d:prop>
		</d:propfind>`;
};
const getFavoritesReport = function() {
  return `<?xml version="1.0"?>
		<oc:filter-files ${getDavNameSpaces()}>
			<d:prop>
				${getDavProperties()}
			</d:prop>
			<oc:filter-rules>
				<oc:favorite>1</oc:favorite>
			</oc:filter-rules>
		</oc:filter-files>`;
};
const getRecentSearch = function(lastModified) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<d:searchrequest ${getDavNameSpaces()}
	xmlns:ns="https://github.com/icewind1991/SearchDAV/ns">
	<d:basicsearch>
		<d:select>
			<d:prop>
				${getDavProperties()}
			</d:prop>
		</d:select>
		<d:from>
			<d:scope>
				<d:href>/files/${(0,auth_dist/* getCurrentUser */.HW)()?.uid}/</d:href>
				<d:depth>infinity</d:depth>
			</d:scope>
		</d:from>
		<d:where>
			<d:and>
				<d:or>
					<d:not>
						<d:eq>
							<d:prop>
								<d:getcontenttype/>
							</d:prop>
							<d:literal>httpd/unix-directory</d:literal>
						</d:eq>
					</d:not>
					<d:eq>
						<d:prop>
							<oc:size/>
						</d:prop>
						<d:literal>0</d:literal>
					</d:eq>
				</d:or>
				<d:gt>
					<d:prop>
						<d:getlastmodified/>
					</d:prop>
					<d:literal>${lastModified}</d:literal>
				</d:gt>
			</d:and>
		</d:where>
		<d:orderby>
			<d:order>
				<d:prop>
					<d:getlastmodified/>
				</d:prop>
				<d:descending/>
			</d:order>
		</d:orderby>
		<d:limit>
			<d:nresults>100</d:nresults>
			<ns:firstresult>0</ns:firstresult>
		</d:limit>
	</d:basicsearch>
</d:searchrequest>`;
};
function getRootPath() {
  if ((0,dist_public/* isPublicShare */.f)()) {
    return `/files/${(0,dist_public/* getSharingToken */.G)()}`;
  }
  return `/files/${(0,auth_dist/* getCurrentUser */.HW)()?.uid}`;
}
const defaultRootPath = getRootPath();
function getRemoteURL() {
  const url = (0,router_dist/* generateRemoteUrl */.dC)("dav");
  if ((0,dist_public/* isPublicShare */.f)()) {
    return url.replace("remote.php", "public.php");
  }
  return url;
}
const defaultRemoteURL = getRemoteURL();
const getClient = function(remoteURL = defaultRemoteURL, headers = {}) {
  const client = an(remoteURL, { headers });
  function setHeaders(token) {
    client.setHeaders({
      ...headers,
      // Add this so the server knows it is an request from the browser
      "X-Requested-With": "XMLHttpRequest",
      // Inject user auth
      requesttoken: token ?? ""
    });
  }
  (0,auth_dist/* onRequestTokenUpdate */.zo)(setHeaders);
  setHeaders((0,auth_dist/* getRequestToken */["do"])());
  const patcher = un();
  patcher.patch("fetch", (url, options) => {
    const headers2 = options.headers;
    if (headers2?.method) {
      options.method = headers2.method;
      delete headers2.method;
    }
    return fetch(url, options);
  });
  return client;
};
const getFavoriteNodes = (davClient, path = "/", davRoot = defaultRootPath) => {
  const controller = new AbortController();
  return new CancelablePromise.CancelablePromise(async (resolve, reject, onCancel) => {
    onCancel(() => controller.abort());
    try {
      const contentsResponse = await davClient.getDirectoryContents(`${davRoot}${path}`, {
        signal: controller.signal,
        details: true,
        data: getFavoritesReport(),
        headers: {
          // see getClient for patched webdav client
          method: "REPORT"
        },
        includeSelf: true
      });
      const nodes = contentsResponse.data.filter((node) => node.filename !== path).map((result) => resultToNode(result, davRoot));
      resolve(nodes);
    } catch (error) {
      reject(error);
    }
  });
};
const resultToNode = function(node, filesRoot = defaultRootPath, remoteURL = defaultRemoteURL) {
  let userId = (0,auth_dist/* getCurrentUser */.HW)()?.uid;
  if ((0,dist_public/* isPublicShare */.f)()) {
    userId = userId ?? "anonymous";
  } else if (!userId) {
    throw new Error("No user id found");
  }
  const props = node.props;
  const permissions = parsePermissions(props?.permissions);
  const owner = String(props?.["owner-id"] || userId);
  const id = props.fileid || 0;
  const mtime = new Date(Date.parse(node.lastmod));
  const crtime = new Date(Date.parse(props.creationdate));
  const nodeData = {
    id,
    source: `${remoteURL}${node.filename}`,
    mtime: !isNaN(mtime.getTime()) && mtime.getTime() !== 0 ? mtime : void 0,
    crtime: !isNaN(crtime.getTime()) && crtime.getTime() !== 0 ? crtime : void 0,
    mime: node.mime || "application/octet-stream",
    // Manually cast to work around for https://github.com/perry-mitchell/webdav-client/pull/380
    displayname: props.displayname !== void 0 ? String(props.displayname) : void 0,
    size: props?.size || Number.parseInt(props.getcontentlength || "0"),
    // The fileid is set to -1 for failed requests
    status: id < 0 ? NodeStatus.FAILED : void 0,
    permissions,
    owner,
    root: filesRoot,
    attributes: {
      ...node,
      ...props,
      hasPreview: props?.["has-preview"]
    }
  };
  delete nodeData.attributes?.props;
  return node.type === "file" ? new File(nodeData) : new Folder(nodeData);
};

//# sourceMappingURL=dav-DY_3WIBa.mjs.map

// EXTERNAL MODULE: ./node_modules/@nextcloud/capabilities/dist/index.mjs
var capabilities_dist = __webpack_require__(7485);
// EXTERNAL MODULE: ./node_modules/@nextcloud/l10n/dist/index.mjs
var l10n_dist = __webpack_require__(3334);
;// ./node_modules/typescript-event-target/dist/index.mjs
var dist_e=class extends EventTarget{dispatchTypedEvent(s,t){return super.dispatchEvent(t)}};

// EXTERNAL MODULE: ./node_modules/string_decoder/lib/string_decoder.js
var string_decoder = __webpack_require__(3141);
;// ./node_modules/@nextcloud/files/dist/index.mjs







var NewMenuEntryCategory = /* @__PURE__ */ ((NewMenuEntryCategory2) => {
  NewMenuEntryCategory2[NewMenuEntryCategory2["UploadFromDevice"] = 0] = "UploadFromDevice";
  NewMenuEntryCategory2[NewMenuEntryCategory2["CreateNew"] = 1] = "CreateNew";
  NewMenuEntryCategory2[NewMenuEntryCategory2["Other"] = 2] = "Other";
  return NewMenuEntryCategory2;
})(NewMenuEntryCategory || {});
class NewFileMenu {
  _entries = [];
  registerEntry(entry) {
    this.validateEntry(entry);
    entry.category = entry.category ?? 1;
    this._entries.push(entry);
  }
  unregisterEntry(entry) {
    const entryIndex = typeof entry === "string" ? this.getEntryIndex(entry) : this.getEntryIndex(entry.id);
    if (entryIndex === -1) {
      logger.warn("Entry not found, nothing removed", { entry, entries: this.getEntries() });
      return;
    }
    this._entries.splice(entryIndex, 1);
  }
  /**
   * Get the list of registered entries
   *
   * @param {Folder} context the creation context. Usually the current folder
   */
  getEntries(context) {
    if (context) {
      return this._entries.filter((entry) => typeof entry.enabled === "function" ? entry.enabled(context) : true);
    }
    return this._entries;
  }
  getEntryIndex(id) {
    return this._entries.findIndex((entry) => entry.id === id);
  }
  validateEntry(entry) {
    if (!entry.id || !entry.displayName || !(entry.iconSvgInline || entry.iconClass) || !entry.handler) {
      throw new Error("Invalid entry");
    }
    if (typeof entry.id !== "string" || typeof entry.displayName !== "string") {
      throw new Error("Invalid id or displayName property");
    }
    if (entry.iconClass && typeof entry.iconClass !== "string" || entry.iconSvgInline && typeof entry.iconSvgInline !== "string") {
      throw new Error("Invalid icon provided");
    }
    if (entry.enabled !== void 0 && typeof entry.enabled !== "function") {
      throw new Error("Invalid enabled property");
    }
    if (typeof entry.handler !== "function") {
      throw new Error("Invalid handler property");
    }
    if ("order" in entry && typeof entry.order !== "number") {
      throw new Error("Invalid order property");
    }
    if (this.getEntryIndex(entry.id) !== -1) {
      throw new Error("Duplicate entry");
    }
  }
}
const getNewFileMenu = function() {
  if (typeof window._nc_newfilemenu === "undefined") {
    window._nc_newfilemenu = new NewFileMenu();
    logger.debug("NewFileMenu initialized");
  }
  return window._nc_newfilemenu;
};
var DefaultType = /* @__PURE__ */ ((DefaultType2) => {
  DefaultType2["DEFAULT"] = "default";
  DefaultType2["HIDDEN"] = "hidden";
  return DefaultType2;
})(DefaultType || {});
class FileAction {
  _action;
  constructor(action) {
    this.validateAction(action);
    this._action = action;
  }
  get id() {
    return this._action.id;
  }
  get displayName() {
    return this._action.displayName;
  }
  get title() {
    return this._action.title;
  }
  get iconSvgInline() {
    return this._action.iconSvgInline;
  }
  get enabled() {
    return this._action.enabled;
  }
  get exec() {
    return this._action.exec;
  }
  get execBatch() {
    return this._action.execBatch;
  }
  get order() {
    return this._action.order;
  }
  get parent() {
    return this._action.parent;
  }
  get default() {
    return this._action.default;
  }
  get destructive() {
    return this._action.destructive;
  }
  get inline() {
    return this._action.inline;
  }
  get renderInline() {
    return this._action.renderInline;
  }
  validateAction(action) {
    if (!action.id || typeof action.id !== "string") {
      throw new Error("Invalid id");
    }
    if (!action.displayName || typeof action.displayName !== "function") {
      throw new Error("Invalid displayName function");
    }
    if ("title" in action && typeof action.title !== "function") {
      throw new Error("Invalid title function");
    }
    if (!action.iconSvgInline || typeof action.iconSvgInline !== "function") {
      throw new Error("Invalid iconSvgInline function");
    }
    if (!action.exec || typeof action.exec !== "function") {
      throw new Error("Invalid exec function");
    }
    if ("enabled" in action && typeof action.enabled !== "function") {
      throw new Error("Invalid enabled function");
    }
    if ("execBatch" in action && typeof action.execBatch !== "function") {
      throw new Error("Invalid execBatch function");
    }
    if ("order" in action && typeof action.order !== "number") {
      throw new Error("Invalid order");
    }
    if (action.destructive !== void 0 && typeof action.destructive !== "boolean") {
      throw new Error("Invalid destructive flag");
    }
    if ("parent" in action && typeof action.parent !== "string") {
      throw new Error("Invalid parent");
    }
    if (action.default && !Object.values(DefaultType).includes(action.default)) {
      throw new Error("Invalid default");
    }
    if ("inline" in action && typeof action.inline !== "function") {
      throw new Error("Invalid inline function");
    }
    if ("renderInline" in action && typeof action.renderInline !== "function") {
      throw new Error("Invalid renderInline function");
    }
  }
}
const registerFileAction = function(action) {
  if (typeof window._nc_fileactions === "undefined") {
    window._nc_fileactions = [];
    logger.debug("FileActions initialized");
  }
  if (window._nc_fileactions.find((search) => search.id === action.id)) {
    logger.error(`FileAction ${action.id} already registered`, { action });
    return;
  }
  window._nc_fileactions.push(action);
};
const getFileActions = function() {
  if (typeof window._nc_fileactions === "undefined") {
    window._nc_fileactions = [];
    logger.debug("FileActions initialized");
  }
  return window._nc_fileactions;
};
class FileListAction {
  _action;
  constructor(action) {
    this.validateAction(action);
    this._action = action;
  }
  get id() {
    return this._action.id;
  }
  get displayName() {
    return this._action.displayName;
  }
  get iconSvgInline() {
    return this._action.iconSvgInline;
  }
  get order() {
    return this._action.order;
  }
  get enabled() {
    return this._action.enabled;
  }
  get exec() {
    return this._action.exec;
  }
  validateAction(action) {
    if (!action.id || typeof action.id !== "string") {
      throw new Error("Invalid id");
    }
    if (!action.displayName || typeof action.displayName !== "function") {
      throw new Error("Invalid displayName function");
    }
    if ("iconSvgInline" in action && typeof action.iconSvgInline !== "function") {
      throw new Error("Invalid iconSvgInline function");
    }
    if ("order" in action && typeof action.order !== "number") {
      throw new Error("Invalid order");
    }
    if ("enabled" in action && typeof action.enabled !== "function") {
      throw new Error("Invalid enabled function");
    }
    if (!action.exec || typeof action.exec !== "function") {
      throw new Error("Invalid exec function");
    }
  }
}
const registerFileListAction = (action) => {
  if (typeof window._nc_filelistactions === "undefined") {
    window._nc_filelistactions = [];
  }
  if (window._nc_filelistactions.find((listAction) => listAction.id === action.id)) {
    logger.error(`FileListAction with id "${action.id}" is already registered`, { action });
    return;
  }
  window._nc_filelistactions.push(action);
};
const getFileListActions = () => {
  if (typeof window._nc_filelistactions === "undefined") {
    window._nc_filelistactions = [];
  }
  return window._nc_filelistactions;
};
class Header {
  _header;
  constructor(header) {
    this.validateHeader(header);
    this._header = header;
  }
  get id() {
    return this._header.id;
  }
  get order() {
    return this._header.order;
  }
  get enabled() {
    return this._header.enabled;
  }
  get render() {
    return this._header.render;
  }
  get updated() {
    return this._header.updated;
  }
  validateHeader(header) {
    if (!header.id || !header.render || !header.updated) {
      throw new Error("Invalid header: id, render and updated are required");
    }
    if (typeof header.id !== "string") {
      throw new Error("Invalid id property");
    }
    if (header.enabled !== void 0 && typeof header.enabled !== "function") {
      throw new Error("Invalid enabled property");
    }
    if (header.render && typeof header.render !== "function") {
      throw new Error("Invalid render property");
    }
    if (header.updated && typeof header.updated !== "function") {
      throw new Error("Invalid updated property");
    }
  }
}
const registerFileListHeaders = function(header) {
  if (typeof window._nc_filelistheader === "undefined") {
    window._nc_filelistheader = [];
    logger.debug("FileListHeaders initialized");
  }
  if (window._nc_filelistheader.find((search) => search.id === header.id)) {
    logger.error(`Header ${header.id} already registered`, { header });
    return;
  }
  window._nc_filelistheader.push(header);
};
const getFileListHeaders = function() {
  if (typeof window._nc_filelistheader === "undefined") {
    window._nc_filelistheader = [];
    logger.debug("FileListHeaders initialized");
  }
  return window._nc_filelistheader;
};
var InvalidFilenameErrorReason = /* @__PURE__ */ ((InvalidFilenameErrorReason2) => {
  InvalidFilenameErrorReason2["ReservedName"] = "reserved name";
  InvalidFilenameErrorReason2["Character"] = "character";
  InvalidFilenameErrorReason2["Extension"] = "extension";
  return InvalidFilenameErrorReason2;
})(InvalidFilenameErrorReason || {});
class InvalidFilenameError extends Error {
  constructor(options) {
    super(`Invalid ${options.reason} '${options.segment}' in filename '${options.filename}'`, { cause: options });
  }
  /**
   * The filename that was validated
   */
  get filename() {
    return this.cause.filename;
  }
  /**
   * Reason why the validation failed
   */
  get reason() {
    return this.cause.reason;
  }
  /**
   * Part of the filename that caused this error
   */
  get segment() {
    return this.cause.segment;
  }
}
function validateFilename(filename) {
  const capabilities = (0,capabilities_dist/* getCapabilities */.F)().files;
  const forbiddenCharacters = capabilities.forbidden_filename_characters ?? window._oc_config?.forbidden_filenames_characters ?? ["/", "\\"];
  for (const character of forbiddenCharacters) {
    if (filename.includes(character)) {
      throw new InvalidFilenameError({ segment: character, reason: "character", filename });
    }
  }
  filename = filename.toLocaleLowerCase();
  const forbiddenFilenames = capabilities.forbidden_filenames ?? [".htaccess"];
  if (forbiddenFilenames.includes(filename)) {
    throw new InvalidFilenameError({
      filename,
      segment: filename,
      reason: "reserved name"
      /* ReservedName */
    });
  }
  const endOfBasename = filename.indexOf(".", 1);
  const basename2 = filename.substring(0, endOfBasename === -1 ? void 0 : endOfBasename);
  const forbiddenFilenameBasenames = capabilities.forbidden_filename_basenames ?? [];
  if (forbiddenFilenameBasenames.includes(basename2)) {
    throw new InvalidFilenameError({
      filename,
      segment: basename2,
      reason: "reserved name"
      /* ReservedName */
    });
  }
  const forbiddenFilenameExtensions = capabilities.forbidden_filename_extensions ?? [".part", ".filepart"];
  for (const extension of forbiddenFilenameExtensions) {
    if (filename.length > extension.length && filename.endsWith(extension)) {
      throw new InvalidFilenameError({ segment: extension, reason: "extension", filename });
    }
  }
}
function isFilenameValid(filename) {
  try {
    validateFilename(filename);
    return true;
  } catch (error) {
    if (error instanceof InvalidFilenameError) {
      return false;
    }
    throw error;
  }
}
function getUniqueName(name, otherNames, options) {
  const opts = {
    suffix: (n2) => `(${n2})`,
    ignoreFileExtension: false,
    ...options
  };
  let newName = name;
  let i2 = 1;
  while (otherNames.includes(newName)) {
    const ext = opts.ignoreFileExtension ? "" : extname(name);
    const base = basename(name, ext);
    newName = `${base} ${opts.suffix(i2++)}${ext}`;
  }
  return newName;
}
const humanList = ["B", "KB", "MB", "GB", "TB", "PB"];
const humanListBinary = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
function formatFileSize(size, skipSmallSizes = false, binaryPrefixes = false, base1000 = false) {
  binaryPrefixes = binaryPrefixes && !base1000;
  if (typeof size === "string") {
    size = Number(size);
  }
  let order = size > 0 ? Math.floor(Math.log(size) / Math.log(base1000 ? 1e3 : 1024)) : 0;
  order = Math.min((binaryPrefixes ? humanListBinary.length : humanList.length) - 1, order);
  const readableFormat = binaryPrefixes ? humanListBinary[order] : humanList[order];
  let relativeSize = (size / Math.pow(base1000 ? 1e3 : 1024, order)).toFixed(1);
  if (skipSmallSizes === true && order === 0) {
    return (relativeSize !== "0.0" ? "< 1 " : "0 ") + (binaryPrefixes ? humanListBinary[1] : humanList[1]);
  }
  if (order < 2) {
    relativeSize = parseFloat(relativeSize).toFixed(0);
  } else {
    relativeSize = parseFloat(relativeSize).toLocaleString((0,l10n_dist/* getCanonicalLocale */.lO)());
  }
  return relativeSize + " " + readableFormat;
}
function parseFileSize(value, forceBinary = false) {
  try {
    value = `${value}`.toLocaleLowerCase().replaceAll(/\s+/g, "").replaceAll(",", ".");
  } catch (e2) {
    return null;
  }
  const match = value.match(/^([0-9]*(\.[0-9]*)?)([kmgtp]?)(i?)b?$/);
  if (match === null || match[1] === "." || match[1] === "") {
    return null;
  }
  const bytesArray = {
    "": 0,
    k: 1,
    m: 2,
    g: 3,
    t: 4,
    p: 5,
    e: 6
  };
  const decimalString = `${match[1]}`;
  const base = match[4] === "i" || forceBinary ? 1024 : 1e3;
  return Math.round(Number.parseFloat(decimalString) * base ** bytesArray[match[3]]);
}
function stringify(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}
function orderBy(collection, identifiers2, orders) {
  identifiers2 = identifiers2 ?? [(value) => value];
  orders = orders ?? [];
  const sorting = identifiers2.map((_, index) => (orders[index] ?? "asc") === "asc" ? 1 : -1);
  const collator = Intl.Collator(
    [(0,l10n_dist/* getLanguage */.Z0)(), (0,l10n_dist/* getCanonicalLocale */.lO)()],
    {
      // handle 10 as ten and not as one-zero
      numeric: true,
      usage: "sort"
    }
  );
  return [...collection].sort((a2, b2) => {
    for (const [index, identifier] of identifiers2.entries()) {
      const value = collator.compare(stringify(identifier(a2)), stringify(identifier(b2)));
      if (value !== 0) {
        return value * sorting[index];
      }
    }
    return 0;
  });
}
var FilesSortingMode = /* @__PURE__ */ ((FilesSortingMode2) => {
  FilesSortingMode2["Name"] = "basename";
  FilesSortingMode2["Modified"] = "mtime";
  FilesSortingMode2["Size"] = "size";
  return FilesSortingMode2;
})(FilesSortingMode || {});
function sortNodes(nodes, options = {}) {
  const sortingOptions = {
    // Default to sort by name
    sortingMode: "basename",
    // Default to sort ascending
    sortingOrder: "asc",
    ...options
  };
  const basename2 = (name) => name.lastIndexOf(".") > 0 ? name.slice(0, name.lastIndexOf(".")) : name;
  const identifiers2 = [
    // 1: Sort favorites first if enabled
    ...sortingOptions.sortFavoritesFirst ? [(v) => v.attributes?.favorite !== 1] : [],
    // 2: Sort folders first if sorting by name
    ...sortingOptions.sortFoldersFirst ? [(v) => v.type !== "folder"] : [],
    // 3: Use sorting mode if NOT basename (to be able to use display name too)
    ...sortingOptions.sortingMode !== "basename" ? [(v) => v[sortingOptions.sortingMode]] : [],
    // 4: Use display name if available, fallback to name
    (v) => basename2(v.displayname || v.attributes?.displayname || v.basename || ""),
    // 5: Finally, use basename if all previous sorting methods failed
    (v) => v.basename
  ];
  const orders = [
    // (for 1): always sort favorites before normal files
    ...sortingOptions.sortFavoritesFirst ? ["asc"] : [],
    // (for 2): always sort folders before files
    ...sortingOptions.sortFoldersFirst ? ["asc"] : [],
    // (for 3): Reverse if sorting by mtime as mtime higher means edited more recent -> lower
    ...sortingOptions.sortingMode === "mtime" ? [sortingOptions.sortingOrder === "asc" ? "desc" : "asc"] : [],
    // (also for 3 so make sure not to conflict with 2 and 3)
    ...sortingOptions.sortingMode !== "mtime" && sortingOptions.sortingMode !== "basename" ? [sortingOptions.sortingOrder] : [],
    // for 4: use configured sorting direction
    sortingOptions.sortingOrder,
    // for 5: use configured sorting direction
    sortingOptions.sortingOrder
  ];
  return orderBy(nodes, identifiers2, orders);
}
class Navigation extends (/* unused pure expression or super */ null && (TypedEventTarget)) {
  _views = [];
  _currentView = null;
  /**
   * Register a new view on the navigation
   * @param view The view to register
   * @throws `Error` is thrown if a view with the same id is already registered
   */
  register(view) {
    if (this._views.find((search) => search.id === view.id)) {
      throw new Error(`View id ${view.id} is already registered`);
    }
    this._views.push(view);
    this.dispatchTypedEvent("update", new CustomEvent("update"));
  }
  /**
   * Remove a registered view
   * @param id The id of the view to remove
   */
  remove(id) {
    const index = this._views.findIndex((view) => view.id === id);
    if (index !== -1) {
      this._views.splice(index, 1);
      this.dispatchTypedEvent("update", new CustomEvent("update"));
    }
  }
  /**
   * Set the currently active view
   * @fires UpdateActiveViewEvent
   * @param view New active view
   */
  setActive(view) {
    this._currentView = view;
    const event = new CustomEvent("updateActive", { detail: view });
    this.dispatchTypedEvent("updateActive", event);
  }
  /**
   * The currently active files view
   */
  get active() {
    return this._currentView;
  }
  /**
   * All registered views
   */
  get views() {
    return this._views;
  }
}
const getNavigation = function() {
  if (typeof window._nc_navigation === "undefined") {
    window._nc_navigation = new Navigation();
    logger.debug("Navigation service initialized");
  }
  return window._nc_navigation;
};
class Column {
  _column;
  constructor(column) {
    isValidColumn(column);
    this._column = column;
  }
  get id() {
    return this._column.id;
  }
  get title() {
    return this._column.title;
  }
  get render() {
    return this._column.render;
  }
  get sort() {
    return this._column.sort;
  }
  get summary() {
    return this._column.summary;
  }
}
const isValidColumn = function(column) {
  if (!column.id || typeof column.id !== "string") {
    throw new Error("A column id is required");
  }
  if (!column.title || typeof column.title !== "string") {
    throw new Error("A column title is required");
  }
  if (!column.render || typeof column.render !== "function") {
    throw new Error("A render function is required");
  }
  if (column.sort && typeof column.sort !== "function") {
    throw new Error("Column sortFunction must be a function");
  }
  if (column.summary && typeof column.summary !== "function") {
    throw new Error("Column summary must be a function");
  }
  return true;
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var sax$1 = {};
var hasRequiredSax;
function requireSax() {
  if (hasRequiredSax) return sax$1;
  hasRequiredSax = 1;
  (function(exports) {
    (function(sax2) {
      sax2.parser = function(strict, opt) {
        return new SAXParser(strict, opt);
      };
      sax2.SAXParser = SAXParser;
      sax2.SAXStream = SAXStream;
      sax2.createStream = createStream;
      sax2.MAX_BUFFER_LENGTH = 64 * 1024;
      var buffers = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      sax2.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
          return new SAXParser(strict, opt);
        }
        var parser = this;
        clearBuffers(parser);
        parser.q = parser.c = "";
        parser.bufferCheckPosition = sax2.MAX_BUFFER_LENGTH;
        parser.opt = opt || {};
        parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
        parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
        parser.tags = [];
        parser.closed = parser.closedRoot = parser.sawRoot = false;
        parser.tag = parser.error = null;
        parser.strict = !!strict;
        parser.noscript = !!(strict || parser.opt.noscript);
        parser.state = S.BEGIN;
        parser.strictEntities = parser.opt.strictEntities;
        parser.ENTITIES = parser.strictEntities ? Object.create(sax2.XML_ENTITIES) : Object.create(sax2.ENTITIES);
        parser.attribList = [];
        if (parser.opt.xmlns) {
          parser.ns = Object.create(rootNS);
        }
        if (parser.opt.unquotedAttributeValues === void 0) {
          parser.opt.unquotedAttributeValues = !strict;
        }
        parser.trackPosition = parser.opt.position !== false;
        if (parser.trackPosition) {
          parser.position = parser.line = parser.column = 0;
        }
        emit2(parser, "onready");
      }
      if (!Object.create) {
        Object.create = function(o) {
          function F2() {
          }
          F2.prototype = o;
          var newf = new F2();
          return newf;
        };
      }
      if (!Object.keys) {
        Object.keys = function(o) {
          var a2 = [];
          for (var i2 in o) if (o.hasOwnProperty(i2)) a2.push(i2);
          return a2;
        };
      }
      function checkBufferLength(parser) {
        var maxAllowed = Math.max(sax2.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;
        for (var i2 = 0, l2 = buffers.length; i2 < l2; i2++) {
          var len = parser[buffers[i2]].length;
          if (len > maxAllowed) {
            switch (buffers[i2]) {
              case "textNode":
                closeText(parser);
                break;
              case "cdata":
                emitNode(parser, "oncdata", parser.cdata);
                parser.cdata = "";
                break;
              case "script":
                emitNode(parser, "onscript", parser.script);
                parser.script = "";
                break;
              default:
                error(parser, "Max buffer length exceeded: " + buffers[i2]);
            }
          }
          maxActual = Math.max(maxActual, len);
        }
        var m2 = sax2.MAX_BUFFER_LENGTH - maxActual;
        parser.bufferCheckPosition = m2 + parser.position;
      }
      function clearBuffers(parser) {
        for (var i2 = 0, l2 = buffers.length; i2 < l2; i2++) {
          parser[buffers[i2]] = "";
        }
      }
      function flushBuffers(parser) {
        closeText(parser);
        if (parser.cdata !== "") {
          emitNode(parser, "oncdata", parser.cdata);
          parser.cdata = "";
        }
        if (parser.script !== "") {
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
      }
      SAXParser.prototype = {
        end: function() {
          end(this);
        },
        write,
        resume: function() {
          this.error = null;
          return this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          flushBuffers(this);
        }
      };
      var Stream;
      try {
        Stream = require("stream").Stream;
      } catch (ex) {
        Stream = function() {
        };
      }
      if (!Stream) Stream = function() {
      };
      var streamWraps = sax2.EVENTS.filter(function(ev) {
        return ev !== "error" && ev !== "end";
      });
      function createStream(strict, opt) {
        return new SAXStream(strict, opt);
      }
      function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
          return new SAXStream(strict, opt);
        }
        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me = this;
        this._parser.onend = function() {
          me.emit("end");
        };
        this._parser.onerror = function(er) {
          me.emit("error", er);
          me._parser.error = null;
        };
        this._decoder = null;
        streamWraps.forEach(function(ev) {
          Object.defineProperty(me, "on" + ev, {
            get: function() {
              return me._parser["on" + ev];
            },
            set: function(h2) {
              if (!h2) {
                me.removeAllListeners(ev);
                me._parser["on" + ev] = h2;
                return h2;
              }
              me.on(ev, h2);
            },
            enumerable: true,
            configurable: false
          });
        });
      }
      SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
          value: SAXStream
        }
      });
      SAXStream.prototype.write = function(data) {
        if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
          if (!this._decoder) {
            var SD = string_decoder/* StringDecoder */.I;
            this._decoder = new SD("utf8");
          }
          data = this._decoder.write(data);
        }
        this._parser.write(data.toString());
        this.emit("data", data);
        return true;
      };
      SAXStream.prototype.end = function(chunk) {
        if (chunk && chunk.length) {
          this.write(chunk);
        }
        this._parser.end();
        return true;
      };
      SAXStream.prototype.on = function(ev, handler) {
        var me = this;
        if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
          me._parser["on" + ev] = function() {
            var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
            args.splice(0, 0, ev);
            me.emit.apply(me, args);
          };
        }
        return Stream.prototype.on.call(me, ev, handler);
      };
      var CDATA = "[CDATA[";
      var DOCTYPE = "DOCTYPE";
      var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
      var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
      var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
      var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function isWhitespace(c2) {
        return c2 === " " || c2 === "\n" || c2 === "\r" || c2 === "	";
      }
      function isQuote(c2) {
        return c2 === '"' || c2 === "'";
      }
      function isAttribEnd(c2) {
        return c2 === ">" || isWhitespace(c2);
      }
      function isMatch(regex, c2) {
        return regex.test(c2);
      }
      function notMatch(regex, c2) {
        return !isMatch(regex, c2);
      }
      var S = 0;
      sax2.STATE = {
        BEGIN: S++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: S++,
        // leading whitespace
        TEXT: S++,
        // general stuff
        TEXT_ENTITY: S++,
        // &amp and such.
        OPEN_WAKA: S++,
        // <
        SGML_DECL: S++,
        // <!BLARG
        SGML_DECL_QUOTED: S++,
        // <!BLARG foo "bar
        DOCTYPE: S++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: S++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: S++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: S++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: S++,
        // <!-
        COMMENT: S++,
        // <!--
        COMMENT_ENDING: S++,
        // <!-- blah -
        COMMENT_ENDED: S++,
        // <!-- blah --
        CDATA: S++,
        // <![CDATA[ something
        CDATA_ENDING: S++,
        // ]
        CDATA_ENDING_2: S++,
        // ]]
        PROC_INST: S++,
        // <?hi
        PROC_INST_BODY: S++,
        // <?hi there
        PROC_INST_ENDING: S++,
        // <?hi "there" ?
        OPEN_TAG: S++,
        // <strong
        OPEN_TAG_SLASH: S++,
        // <strong /
        ATTRIB: S++,
        // <a
        ATTRIB_NAME: S++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: S++,
        // <a foo _
        ATTRIB_VALUE: S++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: S++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: S++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: S++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: S++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: S++,
        // <foo bar=&quot
        CLOSE_TAG: S++,
        // </a
        CLOSE_TAG_SAW_WHITE: S++,
        // </a   >
        SCRIPT: S++,
        // <script> ...
        SCRIPT_ENDING: S++
        // <script> ... <
      };
      sax2.XML_ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'"
      };
      sax2.ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'",
        "AElig": 198,
        "Aacute": 193,
        "Acirc": 194,
        "Agrave": 192,
        "Aring": 197,
        "Atilde": 195,
        "Auml": 196,
        "Ccedil": 199,
        "ETH": 208,
        "Eacute": 201,
        "Ecirc": 202,
        "Egrave": 200,
        "Euml": 203,
        "Iacute": 205,
        "Icirc": 206,
        "Igrave": 204,
        "Iuml": 207,
        "Ntilde": 209,
        "Oacute": 211,
        "Ocirc": 212,
        "Ograve": 210,
        "Oslash": 216,
        "Otilde": 213,
        "Ouml": 214,
        "THORN": 222,
        "Uacute": 218,
        "Ucirc": 219,
        "Ugrave": 217,
        "Uuml": 220,
        "Yacute": 221,
        "aacute": 225,
        "acirc": 226,
        "aelig": 230,
        "agrave": 224,
        "aring": 229,
        "atilde": 227,
        "auml": 228,
        "ccedil": 231,
        "eacute": 233,
        "ecirc": 234,
        "egrave": 232,
        "eth": 240,
        "euml": 235,
        "iacute": 237,
        "icirc": 238,
        "igrave": 236,
        "iuml": 239,
        "ntilde": 241,
        "oacute": 243,
        "ocirc": 244,
        "ograve": 242,
        "oslash": 248,
        "otilde": 245,
        "ouml": 246,
        "szlig": 223,
        "thorn": 254,
        "uacute": 250,
        "ucirc": 251,
        "ugrave": 249,
        "uuml": 252,
        "yacute": 253,
        "yuml": 255,
        "copy": 169,
        "reg": 174,
        "nbsp": 160,
        "iexcl": 161,
        "cent": 162,
        "pound": 163,
        "curren": 164,
        "yen": 165,
        "brvbar": 166,
        "sect": 167,
        "uml": 168,
        "ordf": 170,
        "laquo": 171,
        "not": 172,
        "shy": 173,
        "macr": 175,
        "deg": 176,
        "plusmn": 177,
        "sup1": 185,
        "sup2": 178,
        "sup3": 179,
        "acute": 180,
        "micro": 181,
        "para": 182,
        "middot": 183,
        "cedil": 184,
        "ordm": 186,
        "raquo": 187,
        "frac14": 188,
        "frac12": 189,
        "frac34": 190,
        "iquest": 191,
        "times": 215,
        "divide": 247,
        "OElig": 338,
        "oelig": 339,
        "Scaron": 352,
        "scaron": 353,
        "Yuml": 376,
        "fnof": 402,
        "circ": 710,
        "tilde": 732,
        "Alpha": 913,
        "Beta": 914,
        "Gamma": 915,
        "Delta": 916,
        "Epsilon": 917,
        "Zeta": 918,
        "Eta": 919,
        "Theta": 920,
        "Iota": 921,
        "Kappa": 922,
        "Lambda": 923,
        "Mu": 924,
        "Nu": 925,
        "Xi": 926,
        "Omicron": 927,
        "Pi": 928,
        "Rho": 929,
        "Sigma": 931,
        "Tau": 932,
        "Upsilon": 933,
        "Phi": 934,
        "Chi": 935,
        "Psi": 936,
        "Omega": 937,
        "alpha": 945,
        "beta": 946,
        "gamma": 947,
        "delta": 948,
        "epsilon": 949,
        "zeta": 950,
        "eta": 951,
        "theta": 952,
        "iota": 953,
        "kappa": 954,
        "lambda": 955,
        "mu": 956,
        "nu": 957,
        "xi": 958,
        "omicron": 959,
        "pi": 960,
        "rho": 961,
        "sigmaf": 962,
        "sigma": 963,
        "tau": 964,
        "upsilon": 965,
        "phi": 966,
        "chi": 967,
        "psi": 968,
        "omega": 969,
        "thetasym": 977,
        "upsih": 978,
        "piv": 982,
        "ensp": 8194,
        "emsp": 8195,
        "thinsp": 8201,
        "zwnj": 8204,
        "zwj": 8205,
        "lrm": 8206,
        "rlm": 8207,
        "ndash": 8211,
        "mdash": 8212,
        "lsquo": 8216,
        "rsquo": 8217,
        "sbquo": 8218,
        "ldquo": 8220,
        "rdquo": 8221,
        "bdquo": 8222,
        "dagger": 8224,
        "Dagger": 8225,
        "bull": 8226,
        "hellip": 8230,
        "permil": 8240,
        "prime": 8242,
        "Prime": 8243,
        "lsaquo": 8249,
        "rsaquo": 8250,
        "oline": 8254,
        "frasl": 8260,
        "euro": 8364,
        "image": 8465,
        "weierp": 8472,
        "real": 8476,
        "trade": 8482,
        "alefsym": 8501,
        "larr": 8592,
        "uarr": 8593,
        "rarr": 8594,
        "darr": 8595,
        "harr": 8596,
        "crarr": 8629,
        "lArr": 8656,
        "uArr": 8657,
        "rArr": 8658,
        "dArr": 8659,
        "hArr": 8660,
        "forall": 8704,
        "part": 8706,
        "exist": 8707,
        "empty": 8709,
        "nabla": 8711,
        "isin": 8712,
        "notin": 8713,
        "ni": 8715,
        "prod": 8719,
        "sum": 8721,
        "minus": 8722,
        "lowast": 8727,
        "radic": 8730,
        "prop": 8733,
        "infin": 8734,
        "ang": 8736,
        "and": 8743,
        "or": 8744,
        "cap": 8745,
        "cup": 8746,
        "int": 8747,
        "there4": 8756,
        "sim": 8764,
        "cong": 8773,
        "asymp": 8776,
        "ne": 8800,
        "equiv": 8801,
        "le": 8804,
        "ge": 8805,
        "sub": 8834,
        "sup": 8835,
        "nsub": 8836,
        "sube": 8838,
        "supe": 8839,
        "oplus": 8853,
        "otimes": 8855,
        "perp": 8869,
        "sdot": 8901,
        "lceil": 8968,
        "rceil": 8969,
        "lfloor": 8970,
        "rfloor": 8971,
        "lang": 9001,
        "rang": 9002,
        "loz": 9674,
        "spades": 9824,
        "clubs": 9827,
        "hearts": 9829,
        "diams": 9830
      };
      Object.keys(sax2.ENTITIES).forEach(function(key) {
        var e2 = sax2.ENTITIES[key];
        var s3 = typeof e2 === "number" ? String.fromCharCode(e2) : e2;
        sax2.ENTITIES[key] = s3;
      });
      for (var s2 in sax2.STATE) {
        sax2.STATE[sax2.STATE[s2]] = s2;
      }
      S = sax2.STATE;
      function emit2(parser, event, data) {
        parser[event] && parser[event](data);
      }
      function emitNode(parser, nodeType, data) {
        if (parser.textNode) closeText(parser);
        emit2(parser, nodeType, data);
      }
      function closeText(parser) {
        parser.textNode = textopts(parser.opt, parser.textNode);
        if (parser.textNode) emit2(parser, "ontext", parser.textNode);
        parser.textNode = "";
      }
      function textopts(opt, text) {
        if (opt.trim) text = text.trim();
        if (opt.normalize) text = text.replace(/\s+/g, " ");
        return text;
      }
      function error(parser, er) {
        closeText(parser);
        if (parser.trackPosition) {
          er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
        }
        er = new Error(er);
        parser.error = er;
        emit2(parser, "onerror", er);
        return parser;
      }
      function end(parser) {
        if (parser.sawRoot && !parser.closedRoot) strictFail(parser, "Unclosed root tag");
        if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
          error(parser, "Unexpected end");
        }
        closeText(parser);
        parser.c = "";
        parser.closed = true;
        emit2(parser, "onend");
        SAXParser.call(parser, parser.strict, parser.opt);
        return parser;
      }
      function strictFail(parser, message) {
        if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
          throw new Error("bad call to strictFail");
        }
        if (parser.strict) {
          error(parser, message);
        }
      }
      function newTag(parser) {
        if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
        var parent = parser.tags[parser.tags.length - 1] || parser;
        var tag = parser.tag = { name: parser.tagName, attributes: {} };
        if (parser.opt.xmlns) {
          tag.ns = parent.ns;
        }
        parser.attribList.length = 0;
        emitNode(parser, "onopentagstart", tag);
      }
      function qname(name, attribute) {
        var i2 = name.indexOf(":");
        var qualName = i2 < 0 ? ["", name] : name.split(":");
        var prefix = qualName[0];
        var local = qualName[1];
        if (attribute && name === "xmlns") {
          prefix = "xmlns";
          local = "";
        }
        return { prefix, local };
      }
      function attrib(parser) {
        if (!parser.strict) {
          parser.attribName = parser.attribName[parser.looseCase]();
        }
        if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
          parser.attribName = parser.attribValue = "";
          return;
        }
        if (parser.opt.xmlns) {
          var qn = qname(parser.attribName, true);
          var prefix = qn.prefix;
          var local = qn.local;
          if (prefix === "xmlns") {
            if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
              strictFail(
                parser,
                "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue
              );
            } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
              strictFail(
                parser,
                "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue
              );
            } else {
              var tag = parser.tag;
              var parent = parser.tags[parser.tags.length - 1] || parser;
              if (tag.ns === parent.ns) {
                tag.ns = Object.create(parent.ns);
              }
              tag.ns[local] = parser.attribValue;
            }
          }
          parser.attribList.push([parser.attribName, parser.attribValue]);
        } else {
          parser.tag.attributes[parser.attribName] = parser.attribValue;
          emitNode(parser, "onattribute", {
            name: parser.attribName,
            value: parser.attribValue
          });
        }
        parser.attribName = parser.attribValue = "";
      }
      function openTag(parser, selfClosing) {
        if (parser.opt.xmlns) {
          var tag = parser.tag;
          var qn = qname(parser.tagName);
          tag.prefix = qn.prefix;
          tag.local = qn.local;
          tag.uri = tag.ns[qn.prefix] || "";
          if (tag.prefix && !tag.uri) {
            strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
            tag.uri = qn.prefix;
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (tag.ns && parent.ns !== tag.ns) {
            Object.keys(tag.ns).forEach(function(p2) {
              emitNode(parser, "onopennamespace", {
                prefix: p2,
                uri: tag.ns[p2]
              });
            });
          }
          for (var i2 = 0, l2 = parser.attribList.length; i2 < l2; i2++) {
            var nv = parser.attribList[i2];
            var name = nv[0];
            var value = nv[1];
            var qualName = qname(name, true);
            var prefix = qualName.prefix;
            var local = qualName.local;
            var uri = prefix === "" ? "" : tag.ns[prefix] || "";
            var a2 = {
              name,
              value,
              prefix,
              local,
              uri
            };
            if (prefix && prefix !== "xmlns" && !uri) {
              strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
              a2.uri = prefix;
            }
            parser.tag.attributes[name] = a2;
            emitNode(parser, "onattribute", a2);
          }
          parser.attribList.length = 0;
        }
        parser.tag.isSelfClosing = !!selfClosing;
        parser.sawRoot = true;
        parser.tags.push(parser.tag);
        emitNode(parser, "onopentag", parser.tag);
        if (!selfClosing) {
          if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
            parser.state = S.SCRIPT;
          } else {
            parser.state = S.TEXT;
          }
          parser.tag = null;
          parser.tagName = "";
        }
        parser.attribName = parser.attribValue = "";
        parser.attribList.length = 0;
      }
      function closeTag(parser) {
        if (!parser.tagName) {
          strictFail(parser, "Weird empty close tag.");
          parser.textNode += "</>";
          parser.state = S.TEXT;
          return;
        }
        if (parser.script) {
          if (parser.tagName !== "script") {
            parser.script += "</" + parser.tagName + ">";
            parser.tagName = "";
            parser.state = S.SCRIPT;
            return;
          }
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
        var t2 = parser.tags.length;
        var tagName = parser.tagName;
        if (!parser.strict) {
          tagName = tagName[parser.looseCase]();
        }
        var closeTo = tagName;
        while (t2--) {
          var close = parser.tags[t2];
          if (close.name !== closeTo) {
            strictFail(parser, "Unexpected close tag");
          } else {
            break;
          }
        }
        if (t2 < 0) {
          strictFail(parser, "Unmatched closing tag: " + parser.tagName);
          parser.textNode += "</" + parser.tagName + ">";
          parser.state = S.TEXT;
          return;
        }
        parser.tagName = tagName;
        var s3 = parser.tags.length;
        while (s3-- > t2) {
          var tag = parser.tag = parser.tags.pop();
          parser.tagName = parser.tag.name;
          emitNode(parser, "onclosetag", parser.tagName);
          var x = {};
          for (var i2 in tag.ns) {
            x[i2] = tag.ns[i2];
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (parser.opt.xmlns && tag.ns !== parent.ns) {
            Object.keys(tag.ns).forEach(function(p2) {
              var n2 = tag.ns[p2];
              emitNode(parser, "onclosenamespace", { prefix: p2, uri: n2 });
            });
          }
        }
        if (t2 === 0) parser.closedRoot = true;
        parser.tagName = parser.attribValue = parser.attribName = "";
        parser.attribList.length = 0;
        parser.state = S.TEXT;
      }
      function parseEntity(parser) {
        var entity = parser.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = "";
        if (parser.ENTITIES[entity]) {
          return parser.ENTITIES[entity];
        }
        if (parser.ENTITIES[entityLC]) {
          return parser.ENTITIES[entityLC];
        }
        entity = entityLC;
        if (entity.charAt(0) === "#") {
          if (entity.charAt(1) === "x") {
            entity = entity.slice(2);
            num = parseInt(entity, 16);
            numStr = num.toString(16);
          } else {
            entity = entity.slice(1);
            num = parseInt(entity, 10);
            numStr = num.toString(10);
          }
        }
        entity = entity.replace(/^0+/, "");
        if (isNaN(num) || numStr.toLowerCase() !== entity) {
          strictFail(parser, "Invalid character entity");
          return "&" + parser.entity + ";";
        }
        return String.fromCodePoint(num);
      }
      function beginWhiteSpace(parser, c2) {
        if (c2 === "<") {
          parser.state = S.OPEN_WAKA;
          parser.startTagPosition = parser.position;
        } else if (!isWhitespace(c2)) {
          strictFail(parser, "Non-whitespace before first tag.");
          parser.textNode = c2;
          parser.state = S.TEXT;
        }
      }
      function charAt(chunk, i2) {
        var result = "";
        if (i2 < chunk.length) {
          result = chunk.charAt(i2);
        }
        return result;
      }
      function write(chunk) {
        var parser = this;
        if (this.error) {
          throw this.error;
        }
        if (parser.closed) {
          return error(
            parser,
            "Cannot write after close. Assign an onready handler."
          );
        }
        if (chunk === null) {
          return end(parser);
        }
        if (typeof chunk === "object") {
          chunk = chunk.toString();
        }
        var i2 = 0;
        var c2 = "";
        while (true) {
          c2 = charAt(chunk, i2++);
          parser.c = c2;
          if (!c2) {
            break;
          }
          if (parser.trackPosition) {
            parser.position++;
            if (c2 === "\n") {
              parser.line++;
              parser.column = 0;
            } else {
              parser.column++;
            }
          }
          switch (parser.state) {
            case S.BEGIN:
              parser.state = S.BEGIN_WHITESPACE;
              if (c2 === "\uFEFF") {
                continue;
              }
              beginWhiteSpace(parser, c2);
              continue;
            case S.BEGIN_WHITESPACE:
              beginWhiteSpace(parser, c2);
              continue;
            case S.TEXT:
              if (parser.sawRoot && !parser.closedRoot) {
                var starti = i2 - 1;
                while (c2 && c2 !== "<" && c2 !== "&") {
                  c2 = charAt(chunk, i2++);
                  if (c2 && parser.trackPosition) {
                    parser.position++;
                    if (c2 === "\n") {
                      parser.line++;
                      parser.column = 0;
                    } else {
                      parser.column++;
                    }
                  }
                }
                parser.textNode += chunk.substring(starti, i2 - 1);
              }
              if (c2 === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                parser.state = S.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else {
                if (!isWhitespace(c2) && (!parser.sawRoot || parser.closedRoot)) {
                  strictFail(parser, "Text data outside of root node.");
                }
                if (c2 === "&") {
                  parser.state = S.TEXT_ENTITY;
                } else {
                  parser.textNode += c2;
                }
              }
              continue;
            case S.SCRIPT:
              if (c2 === "<") {
                parser.state = S.SCRIPT_ENDING;
              } else {
                parser.script += c2;
              }
              continue;
            case S.SCRIPT_ENDING:
              if (c2 === "/") {
                parser.state = S.CLOSE_TAG;
              } else {
                parser.script += "<" + c2;
                parser.state = S.SCRIPT;
              }
              continue;
            case S.OPEN_WAKA:
              if (c2 === "!") {
                parser.state = S.SGML_DECL;
                parser.sgmlDecl = "";
              } else if (isWhitespace(c2)) ;
              else if (isMatch(nameStart, c2)) {
                parser.state = S.OPEN_TAG;
                parser.tagName = c2;
              } else if (c2 === "/") {
                parser.state = S.CLOSE_TAG;
                parser.tagName = "";
              } else if (c2 === "?") {
                parser.state = S.PROC_INST;
                parser.procInstName = parser.procInstBody = "";
              } else {
                strictFail(parser, "Unencoded <");
                if (parser.startTagPosition + 1 < parser.position) {
                  var pad = parser.position - parser.startTagPosition;
                  c2 = new Array(pad).join(" ") + c2;
                }
                parser.textNode += "<" + c2;
                parser.state = S.TEXT;
              }
              continue;
            case S.SGML_DECL:
              if (parser.sgmlDecl + c2 === "--") {
                parser.state = S.COMMENT;
                parser.comment = "";
                parser.sgmlDecl = "";
                continue;
              }
              if (parser.doctype && parser.doctype !== true && parser.sgmlDecl) {
                parser.state = S.DOCTYPE_DTD;
                parser.doctype += "<!" + parser.sgmlDecl + c2;
                parser.sgmlDecl = "";
              } else if ((parser.sgmlDecl + c2).toUpperCase() === CDATA) {
                emitNode(parser, "onopencdata");
                parser.state = S.CDATA;
                parser.sgmlDecl = "";
                parser.cdata = "";
              } else if ((parser.sgmlDecl + c2).toUpperCase() === DOCTYPE) {
                parser.state = S.DOCTYPE;
                if (parser.doctype || parser.sawRoot) {
                  strictFail(
                    parser,
                    "Inappropriately located doctype declaration"
                  );
                }
                parser.doctype = "";
                parser.sgmlDecl = "";
              } else if (c2 === ">") {
                emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                parser.sgmlDecl = "";
                parser.state = S.TEXT;
              } else if (isQuote(c2)) {
                parser.state = S.SGML_DECL_QUOTED;
                parser.sgmlDecl += c2;
              } else {
                parser.sgmlDecl += c2;
              }
              continue;
            case S.SGML_DECL_QUOTED:
              if (c2 === parser.q) {
                parser.state = S.SGML_DECL;
                parser.q = "";
              }
              parser.sgmlDecl += c2;
              continue;
            case S.DOCTYPE:
              if (c2 === ">") {
                parser.state = S.TEXT;
                emitNode(parser, "ondoctype", parser.doctype);
                parser.doctype = true;
              } else {
                parser.doctype += c2;
                if (c2 === "[") {
                  parser.state = S.DOCTYPE_DTD;
                } else if (isQuote(c2)) {
                  parser.state = S.DOCTYPE_QUOTED;
                  parser.q = c2;
                }
              }
              continue;
            case S.DOCTYPE_QUOTED:
              parser.doctype += c2;
              if (c2 === parser.q) {
                parser.q = "";
                parser.state = S.DOCTYPE;
              }
              continue;
            case S.DOCTYPE_DTD:
              if (c2 === "]") {
                parser.doctype += c2;
                parser.state = S.DOCTYPE;
              } else if (c2 === "<") {
                parser.state = S.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else if (isQuote(c2)) {
                parser.doctype += c2;
                parser.state = S.DOCTYPE_DTD_QUOTED;
                parser.q = c2;
              } else {
                parser.doctype += c2;
              }
              continue;
            case S.DOCTYPE_DTD_QUOTED:
              parser.doctype += c2;
              if (c2 === parser.q) {
                parser.state = S.DOCTYPE_DTD;
                parser.q = "";
              }
              continue;
            case S.COMMENT:
              if (c2 === "-") {
                parser.state = S.COMMENT_ENDING;
              } else {
                parser.comment += c2;
              }
              continue;
            case S.COMMENT_ENDING:
              if (c2 === "-") {
                parser.state = S.COMMENT_ENDED;
                parser.comment = textopts(parser.opt, parser.comment);
                if (parser.comment) {
                  emitNode(parser, "oncomment", parser.comment);
                }
                parser.comment = "";
              } else {
                parser.comment += "-" + c2;
                parser.state = S.COMMENT;
              }
              continue;
            case S.COMMENT_ENDED:
              if (c2 !== ">") {
                strictFail(parser, "Malformed comment");
                parser.comment += "--" + c2;
                parser.state = S.COMMENT;
              } else if (parser.doctype && parser.doctype !== true) {
                parser.state = S.DOCTYPE_DTD;
              } else {
                parser.state = S.TEXT;
              }
              continue;
            case S.CDATA:
              if (c2 === "]") {
                parser.state = S.CDATA_ENDING;
              } else {
                parser.cdata += c2;
              }
              continue;
            case S.CDATA_ENDING:
              if (c2 === "]") {
                parser.state = S.CDATA_ENDING_2;
              } else {
                parser.cdata += "]" + c2;
                parser.state = S.CDATA;
              }
              continue;
            case S.CDATA_ENDING_2:
              if (c2 === ">") {
                if (parser.cdata) {
                  emitNode(parser, "oncdata", parser.cdata);
                }
                emitNode(parser, "onclosecdata");
                parser.cdata = "";
                parser.state = S.TEXT;
              } else if (c2 === "]") {
                parser.cdata += "]";
              } else {
                parser.cdata += "]]" + c2;
                parser.state = S.CDATA;
              }
              continue;
            case S.PROC_INST:
              if (c2 === "?") {
                parser.state = S.PROC_INST_ENDING;
              } else if (isWhitespace(c2)) {
                parser.state = S.PROC_INST_BODY;
              } else {
                parser.procInstName += c2;
              }
              continue;
            case S.PROC_INST_BODY:
              if (!parser.procInstBody && isWhitespace(c2)) {
                continue;
              } else if (c2 === "?") {
                parser.state = S.PROC_INST_ENDING;
              } else {
                parser.procInstBody += c2;
              }
              continue;
            case S.PROC_INST_ENDING:
              if (c2 === ">") {
                emitNode(parser, "onprocessinginstruction", {
                  name: parser.procInstName,
                  body: parser.procInstBody
                });
                parser.procInstName = parser.procInstBody = "";
                parser.state = S.TEXT;
              } else {
                parser.procInstBody += "?" + c2;
                parser.state = S.PROC_INST_BODY;
              }
              continue;
            case S.OPEN_TAG:
              if (isMatch(nameBody, c2)) {
                parser.tagName += c2;
              } else {
                newTag(parser);
                if (c2 === ">") {
                  openTag(parser);
                } else if (c2 === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else {
                  if (!isWhitespace(c2)) {
                    strictFail(parser, "Invalid character in tag name");
                  }
                  parser.state = S.ATTRIB;
                }
              }
              continue;
            case S.OPEN_TAG_SLASH:
              if (c2 === ">") {
                openTag(parser, true);
                closeTag(parser);
              } else {
                strictFail(parser, "Forward-slash in opening tag not followed by >");
                parser.state = S.ATTRIB;
              }
              continue;
            case S.ATTRIB:
              if (isWhitespace(c2)) {
                continue;
              } else if (c2 === ">") {
                openTag(parser);
              } else if (c2 === "/") {
                parser.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c2)) {
                parser.attribName = c2;
                parser.attribValue = "";
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME:
              if (c2 === "=") {
                parser.state = S.ATTRIB_VALUE;
              } else if (c2 === ">") {
                strictFail(parser, "Attribute without value");
                parser.attribValue = parser.attribName;
                attrib(parser);
                openTag(parser);
              } else if (isWhitespace(c2)) {
                parser.state = S.ATTRIB_NAME_SAW_WHITE;
              } else if (isMatch(nameBody, c2)) {
                parser.attribName += c2;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME_SAW_WHITE:
              if (c2 === "=") {
                parser.state = S.ATTRIB_VALUE;
              } else if (isWhitespace(c2)) {
                continue;
              } else {
                strictFail(parser, "Attribute without value");
                parser.tag.attributes[parser.attribName] = "";
                parser.attribValue = "";
                emitNode(parser, "onattribute", {
                  name: parser.attribName,
                  value: ""
                });
                parser.attribName = "";
                if (c2 === ">") {
                  openTag(parser);
                } else if (isMatch(nameStart, c2)) {
                  parser.attribName = c2;
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                  parser.state = S.ATTRIB;
                }
              }
              continue;
            case S.ATTRIB_VALUE:
              if (isWhitespace(c2)) {
                continue;
              } else if (isQuote(c2)) {
                parser.q = c2;
                parser.state = S.ATTRIB_VALUE_QUOTED;
              } else {
                if (!parser.opt.unquotedAttributeValues) {
                  error(parser, "Unquoted attribute value");
                }
                parser.state = S.ATTRIB_VALUE_UNQUOTED;
                parser.attribValue = c2;
              }
              continue;
            case S.ATTRIB_VALUE_QUOTED:
              if (c2 !== parser.q) {
                if (c2 === "&") {
                  parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                } else {
                  parser.attribValue += c2;
                }
                continue;
              }
              attrib(parser);
              parser.q = "";
              parser.state = S.ATTRIB_VALUE_CLOSED;
              continue;
            case S.ATTRIB_VALUE_CLOSED:
              if (isWhitespace(c2)) {
                parser.state = S.ATTRIB;
              } else if (c2 === ">") {
                openTag(parser);
              } else if (c2 === "/") {
                parser.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c2)) {
                strictFail(parser, "No whitespace between attributes");
                parser.attribName = c2;
                parser.attribValue = "";
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_VALUE_UNQUOTED:
              if (!isAttribEnd(c2)) {
                if (c2 === "&") {
                  parser.state = S.ATTRIB_VALUE_ENTITY_U;
                } else {
                  parser.attribValue += c2;
                }
                continue;
              }
              attrib(parser);
              if (c2 === ">") {
                openTag(parser);
              } else {
                parser.state = S.ATTRIB;
              }
              continue;
            case S.CLOSE_TAG:
              if (!parser.tagName) {
                if (isWhitespace(c2)) {
                  continue;
                } else if (notMatch(nameStart, c2)) {
                  if (parser.script) {
                    parser.script += "</" + c2;
                    parser.state = S.SCRIPT;
                  } else {
                    strictFail(parser, "Invalid tagname in closing tag.");
                  }
                } else {
                  parser.tagName = c2;
                }
              } else if (c2 === ">") {
                closeTag(parser);
              } else if (isMatch(nameBody, c2)) {
                parser.tagName += c2;
              } else if (parser.script) {
                parser.script += "</" + parser.tagName;
                parser.tagName = "";
                parser.state = S.SCRIPT;
              } else {
                if (!isWhitespace(c2)) {
                  strictFail(parser, "Invalid tagname in closing tag");
                }
                parser.state = S.CLOSE_TAG_SAW_WHITE;
              }
              continue;
            case S.CLOSE_TAG_SAW_WHITE:
              if (isWhitespace(c2)) {
                continue;
              }
              if (c2 === ">") {
                closeTag(parser);
              } else {
                strictFail(parser, "Invalid characters in closing tag");
              }
              continue;
            case S.TEXT_ENTITY:
            case S.ATTRIB_VALUE_ENTITY_Q:
            case S.ATTRIB_VALUE_ENTITY_U:
              var returnState;
              var buffer;
              switch (parser.state) {
                case S.TEXT_ENTITY:
                  returnState = S.TEXT;
                  buffer = "textNode";
                  break;
                case S.ATTRIB_VALUE_ENTITY_Q:
                  returnState = S.ATTRIB_VALUE_QUOTED;
                  buffer = "attribValue";
                  break;
                case S.ATTRIB_VALUE_ENTITY_U:
                  returnState = S.ATTRIB_VALUE_UNQUOTED;
                  buffer = "attribValue";
                  break;
              }
              if (c2 === ";") {
                var parsedEntity = parseEntity(parser);
                if (parser.opt.unparsedEntities && !Object.values(sax2.XML_ENTITIES).includes(parsedEntity)) {
                  parser.entity = "";
                  parser.state = returnState;
                  parser.write(parsedEntity);
                } else {
                  parser[buffer] += parsedEntity;
                  parser.entity = "";
                  parser.state = returnState;
                }
              } else if (isMatch(parser.entity.length ? entityBody : entityStart, c2)) {
                parser.entity += c2;
              } else {
                strictFail(parser, "Invalid character in entity name");
                parser[buffer] += "&" + parser.entity + c2;
                parser.entity = "";
                parser.state = returnState;
              }
              continue;
            default: {
              throw new Error(parser, "Unknown state: " + parser.state);
            }
          }
        }
        if (parser.position >= parser.bufferCheckPosition) {
          checkBufferLength(parser);
        }
        return parser;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      if (!String.fromCodePoint) {
        (function() {
          var stringFromCharCode = String.fromCharCode;
          var floor = Math.floor;
          var fromCodePoint = function() {
            var MAX_SIZE = 16384;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
              return "";
            }
            var result = "";
            while (++index < length) {
              var codePoint = Number(arguments[index]);
              if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 1114111 || // not a valid Unicode code point
              floor(codePoint) !== codePoint) {
                throw RangeError("Invalid code point: " + codePoint);
              }
              if (codePoint <= 65535) {
                codeUnits.push(codePoint);
              } else {
                codePoint -= 65536;
                highSurrogate = (codePoint >> 10) + 55296;
                lowSurrogate = codePoint % 1024 + 56320;
                codeUnits.push(highSurrogate, lowSurrogate);
              }
              if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
              }
            }
            return result;
          };
          if (Object.defineProperty) {
            Object.defineProperty(String, "fromCodePoint", {
              value: fromCodePoint,
              configurable: true,
              writable: true
            });
          } else {
            String.fromCodePoint = fromCodePoint;
          }
        })();
      }
    })(exports);
  })(sax$1);
  return sax$1;
}
var saxExports = requireSax();
const sax = /* @__PURE__ */ (/* unused pure expression or super */ null && (getDefaultExportFromCjs(saxExports)));
const namespaceMapping = {
  "http://www.w3.org/2000/svg": {
    ext: "svg",
    mime: "image/svg+xml"
  },
  "http://www.w3.org/1999/xhtml": {
    ext: "xhtml",
    mime: "application/xhtml+xml"
  },
  "http://www.opengis.net/kml/2.2": {
    ext: "kml",
    mime: "application/vnd.google-earth.kml+xml"
  },
  "http://www.opengis.net/gml": {
    ext: "gml",
    mime: "application/gml+xml"
  }
};
const rootNameMapping = {
  rss: {
    ext: "rss",
    mime: "application/rss+xml"
  },
  "score-partwise": {
    ext: "musicxml",
    mime: "application/vnd.recordare.musicxml+xml"
  },
  svg: {
    ext: "svg",
    mime: "image/svg+xml"
  }
};
class XmlTextDetector {
  constructor(options) {
    this.options = options ?? {};
    this.firstTag = true;
    this.onEnd = false;
    this.parser = sax.parser(true, { xmlns: true });
    this.nesting = 0;
    this.parser.onerror = (e2) => {
      if (e2.message.startsWith("Invalid character entity")) {
        return;
      }
      this.fileType = void 0;
      this.onEnd = true;
    };
    this.parser.onopentag = (node) => {
      ++this.nesting;
      if (!this.firstTag || this.onEnd) {
        return;
      }
      this.firstTag = false;
      if (node.uri) {
        this.fileType = namespaceMapping[node.uri];
      } else if (node.name) {
        this.fileType = rootNameMapping[node.name.toLowerCase()];
      }
      if (this.fileType && !this.options.fullScan) {
        this.onEnd = true;
      }
    };
    this.parser.onclosetag = () => {
      --this.nesting;
    };
  }
  write(text) {
    this.parser.write(text);
  }
  close() {
    this.parser.close();
    this.onEnd = true;
  }
  isValid() {
    return this.nesting === 0;
  }
}
function isSvg(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  string = string.trim();
  if (string.length === 0) {
    return false;
  }
  const xmlTextDetector = new XmlTextDetector();
  xmlTextDetector.write(string);
  return xmlTextDetector.isValid() && xmlTextDetector.fileType?.ext === "svg";
}
class View {
  _view;
  constructor(view) {
    isValidView(view);
    this._view = view;
  }
  get id() {
    return this._view.id;
  }
  get name() {
    return this._view.name;
  }
  get caption() {
    return this._view.caption;
  }
  get emptyTitle() {
    return this._view.emptyTitle;
  }
  get emptyCaption() {
    return this._view.emptyCaption;
  }
  get getContents() {
    return this._view.getContents;
  }
  get hidden() {
    return this._view.hidden;
  }
  get icon() {
    return this._view.icon;
  }
  set icon(icon) {
    this._view.icon = icon;
  }
  get order() {
    return this._view.order;
  }
  set order(order) {
    this._view.order = order;
  }
  get params() {
    return this._view.params;
  }
  set params(params) {
    this._view.params = params;
  }
  get columns() {
    return this._view.columns;
  }
  get emptyView() {
    return this._view.emptyView;
  }
  get parent() {
    return this._view.parent;
  }
  get sticky() {
    return this._view.sticky;
  }
  get expanded() {
    return this._view.expanded;
  }
  set expanded(expanded) {
    this._view.expanded = expanded;
  }
  get defaultSortKey() {
    return this._view.defaultSortKey;
  }
  get loadChildViews() {
    return this._view.loadChildViews;
  }
}
const isValidView = function(view) {
  if (!view.id || typeof view.id !== "string") {
    throw new Error("View id is required and must be a string");
  }
  if (!view.name || typeof view.name !== "string") {
    throw new Error("View name is required and must be a string");
  }
  if ("caption" in view && typeof view.caption !== "string") {
    throw new Error("View caption must be a string");
  }
  if (!view.getContents || typeof view.getContents !== "function") {
    throw new Error("View getContents is required and must be a function");
  }
  if ("hidden" in view && typeof view.hidden !== "boolean") {
    throw new Error("View hidden must be a boolean");
  }
  if (!view.icon || typeof view.icon !== "string" || !isSvg(view.icon)) {
    throw new Error("View icon is required and must be a valid svg string");
  }
  if ("order" in view && typeof view.order !== "number") {
    throw new Error("View order must be a number");
  }
  if (view.columns) {
    view.columns.forEach((column) => {
      if (!(column instanceof Column)) {
        throw new Error("View columns must be an array of Column. Invalid column found");
      }
    });
  }
  if (view.emptyView && typeof view.emptyView !== "function") {
    throw new Error("View emptyView must be a function");
  }
  if (view.parent && typeof view.parent !== "string") {
    throw new Error("View parent must be a string");
  }
  if ("sticky" in view && typeof view.sticky !== "boolean") {
    throw new Error("View sticky must be a boolean");
  }
  if ("expanded" in view && typeof view.expanded !== "boolean") {
    throw new Error("View expanded must be a boolean");
  }
  if (view.defaultSortKey && typeof view.defaultSortKey !== "string") {
    throw new Error("View defaultSortKey must be a string");
  }
  if (view.loadChildViews && typeof view.loadChildViews !== "function") {
    throw new Error("View loadChildViews must be a function");
  }
  return true;
};
var debug_1;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug_1;
  hasRequiredDebug = 1;
  const debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  debug_1 = debug;
  return debug_1;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const SEMVER_SPEC_VERSION = "2.0.0";
  const MAX_LENGTH = 256;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991;
  const MAX_SAFE_COMPONENT_LENGTH = 16;
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
  const RELEASE_TYPES = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  constants = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  return constants;
}
var dist_re = { exports: {} };
var hasRequiredRe;
function requireRe() {
  if (hasRequiredRe) return dist_re.exports;
  hasRequiredRe = 1;
  (function(module, exports) {
    const {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = requireConstants();
    const debug = requireDebug();
    exports = module.exports = {};
    const re2 = exports.re = [];
    const safeRe = exports.safeRe = [];
    const src = exports.src = [];
    const t2 = exports.t = {};
    let R = 0;
    const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    const safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    const makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t2[name] = index;
      src[index] = value;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
    createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
    createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t2.COERCE], true);
    createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(dist_re, dist_re.exports);
  return dist_re.exports;
}
var parseOptions_1;
var hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const looseOption = Object.freeze({ loose: true });
  const emptyOpts = Object.freeze({});
  const parseOptions = (options) => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== "object") {
      return looseOption;
    }
    return options;
  };
  parseOptions_1 = parseOptions;
  return parseOptions_1;
}
var identifiers;
var hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers = (a2, b2) => {
    const anum = numeric.test(a2);
    const bnum = numeric.test(b2);
    if (anum && bnum) {
      a2 = +a2;
      b2 = +b2;
    }
    return a2 === b2 ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b2 ? -1 : 1;
  };
  const rcompareIdentifiers = (a2, b2) => compareIdentifiers(b2, a2);
  identifiers = {
    compareIdentifiers,
    rcompareIdentifiers
  };
  return identifiers;
}
var semver;
var hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver;
  hasRequiredSemver = 1;
  const debug = requireDebug();
  const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
  const { safeRe: re2, t: t2 } = requireRe();
  const parseOptions = requireParseOptions();
  const { compareIdentifiers } = requireIdentifiers();
  class SemVer {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH} characters`
        );
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m2 = version.trim().match(options.loose ? re2[t2.LOOSE] : re2[t2.FULL]);
      if (!m2) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;
      this.major = +m2[1];
      this.minor = +m2[2];
      this.patch = +m2[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m2[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m2[4].split(".").map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m2[5] ? m2[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i2 = 0;
      do {
        const a2 = this.prerelease[i2];
        const b2 = other.prerelease[i2];
        debug("prerelease compare", i2, a2, b2);
        if (a2 === void 0 && b2 === void 0) {
          return 0;
        } else if (b2 === void 0) {
          return 1;
        } else if (a2 === void 0) {
          return -1;
        } else if (a2 === b2) {
          continue;
        } else {
          return compareIdentifiers(a2, b2);
        }
      } while (++i2);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      let i2 = 0;
      do {
        const a2 = this.build[i2];
        const b2 = other.build[i2];
        debug("build compare", i2, a2, b2);
        if (a2 === void 0 && b2 === void 0) {
          return 0;
        } else if (b2 === void 0) {
          return 1;
        } else if (a2 === void 0) {
          return -1;
        } else if (a2 === b2) {
          continue;
        } else {
          return compareIdentifiers(a2, b2);
        }
      } while (++i2);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier, identifierBase);
          this.inc("pre", identifier, identifierBase);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier, identifierBase);
          }
          this.inc("pre", identifier, identifierBase);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const base = Number(identifierBase) ? 1 : 0;
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) {
                throw new Error("invalid increment argument: identifier already exists");
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join(".")}`;
      }
      return this;
    }
  }
  semver = SemVer;
  return semver;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const SemVer = requireSemver();
  const parse = (version, options, throwErrors = false) => {
    if (version instanceof SemVer) {
      return version;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      if (!throwErrors) {
        return null;
      }
      throw er;
    }
  };
  parse_1 = parse;
  return parse_1;
}
var valid_1;
var hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid_1;
  hasRequiredValid = 1;
  const parse = requireParse();
  const valid2 = (version, options) => {
    const v = parse(version, options);
    return v ? v.version : null;
  };
  valid_1 = valid2;
  return valid_1;
}
var validExports = requireValid();
const valid = /* @__PURE__ */ (/* unused pure expression or super */ null && (getDefaultExportFromCjs(validExports)));
var major_1;
var hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const SemVer = requireSemver();
  const major2 = (a2, loose) => new SemVer(a2, loose).major;
  major_1 = major2;
  return major_1;
}
var majorExports = requireMajor();
const major = /* @__PURE__ */ (/* unused pure expression or super */ null && (getDefaultExportFromCjs(majorExports)));
class ProxyBus {
  bus;
  constructor(bus2) {
    if (typeof bus2.getVersion !== "function" || !valid(bus2.getVersion())) {
      console.warn("Proxying an event bus with an unknown or invalid version");
    } else if (major(bus2.getVersion()) !== major(this.getVersion())) {
      console.warn(
        "Proxying an event bus of version " + bus2.getVersion() + " with " + this.getVersion()
      );
    }
    this.bus = bus2;
  }
  getVersion() {
    return "3.3.2";
  }
  subscribe(name, handler) {
    this.bus.subscribe(name, handler);
  }
  unsubscribe(name, handler) {
    this.bus.unsubscribe(name, handler);
  }
  emit(name, ...event) {
    this.bus.emit(name, ...event);
  }
}
class SimpleBus {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.2";
  }
  subscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).concat(
        handler
      )
    );
  }
  unsubscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).filter((h2) => h2 !== handler)
    );
  }
  emit(name, ...event) {
    const handlers = this.handlers.get(name) || [];
    handlers.forEach((h2) => {
      try {
        ;
        h2(event[0]);
      } catch (e2) {
        console.error("could not invoke event listener", e2);
      }
    });
  }
}
let bus = null;
function getBus() {
  if (bus !== null) {
    return bus;
  }
  if (typeof window === "undefined") {
    return new Proxy({}, {
      get: () => {
        return () => console.error(
          "Window not available, EventBus can not be established!"
        );
      }
    });
  }
  if (window.OC?._eventBus && typeof window._nc_event_bus === "undefined") {
    console.warn(
      "found old event bus instance at OC._eventBus. Update your version!"
    );
    window._nc_event_bus = window.OC._eventBus;
  }
  if (typeof window?._nc_event_bus !== "undefined") {
    bus = new ProxyBus(window._nc_event_bus);
  } else {
    bus = window._nc_event_bus = new SimpleBus();
  }
  return bus;
}
function emit(name, ...event) {
  getBus().emit(name, ...event);
}
/*!
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
class FileListFilter extends dist_e {
  id;
  order;
  constructor(id, order = 100) {
    super();
    this.id = id;
    this.order = order;
  }
  filter(nodes) {
    throw new Error("Not implemented");
  }
  updateChips(chips) {
    this.dispatchTypedEvent("update:chips", new CustomEvent("update:chips", { detail: chips }));
  }
  filterUpdated() {
    this.dispatchTypedEvent("update:filter", new CustomEvent("update:filter"));
  }
}
function registerFileListFilter(filter) {
  if (!window._nc_filelist_filters) {
    window._nc_filelist_filters = /* @__PURE__ */ new Map();
  }
  if (window._nc_filelist_filters.has(filter.id)) {
    throw new Error(`File list filter "${filter.id}" already registered`);
  }
  window._nc_filelist_filters.set(filter.id, filter);
  emit("files:filter:added", filter);
}
function unregisterFileListFilter(filterId) {
  if (window._nc_filelist_filters && window._nc_filelist_filters.has(filterId)) {
    window._nc_filelist_filters.delete(filterId);
    emit("files:filter:removed", filterId);
  }
}
function getFileListFilters() {
  if (!window._nc_filelist_filters) {
    return [];
  }
  return [...window._nc_filelist_filters.values()];
}
const addNewFileMenuEntry = function(entry) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.registerEntry(entry);
};
const removeNewFileMenuEntry = function(entry) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.unregisterEntry(entry);
};
const getNewFileMenuEntries = function(context) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.getEntries(context).sort((a2, b2) => {
    if (a2.order !== void 0 && b2.order !== void 0 && a2.order !== b2.order) {
      return a2.order - b2.order;
    }
    return a2.displayName.localeCompare(b2.displayName, void 0, { numeric: true, sensitivity: "base" });
  });
};

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 2981:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ loadState)
/* harmony export */ });
function loadState(app, key, fallback) {
  const elem = document.querySelector(`#initial-state-${app}-${key}`);
  if (elem === null) {
    if (fallback !== void 0) {
      return fallback;
    }
    throw new Error(`Could not find initial state ${key} of ${app}`);
  }
  try {
    return JSON.parse(atob(elem.value));
  } catch (e) {
    throw new Error(`Could not parse initial state ${key} of ${app}`);
  }
}



/***/ }),

/***/ 3141:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = (__webpack_require__(5003).Buffer);
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.I = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ 3908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const debug = __webpack_require__(7272)
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(6874)
const { safeRe: re, t } = __webpack_require__(9718)

const parseOptions = __webpack_require__(8587)
const { compareIdentifiers } = __webpack_require__(1123)
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
        version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('build compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier, identifierBase) {
    if (release.startsWith('pre')) {
      if (!identifier && identifierBase === false) {
        throw new Error('invalid increment argument: identifier is empty')
      }
      // Avoid an invalid semver results
      if (identifier) {
        const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE])
        if (!match || match[1] !== identifier) {
          throw new Error(`invalid identifier: ${identifier}`)
        }
      }
    }

    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier, identifierBase)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier, identifierBase)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier, identifierBase)
        this.inc('pre', identifier, identifierBase)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier, identifierBase)
        }
        this.inc('pre', identifier, identifierBase)
        break
      case 'release':
        if (this.prerelease.length === 0) {
          throw new Error(`version ${this.raw} is not a prerelease`)
        }
        this.prerelease.length = 0
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre': {
        const base = Number(identifierBase) ? 1 : 0

        if (this.prerelease.length === 0) {
          this.prerelease = [base]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            if (identifier === this.prerelease.join('.') && identifierBase === false) {
              throw new Error('invalid increment argument: identifier already exists')
            }
            this.prerelease.push(base)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          let prerelease = [identifier, base]
          if (identifierBase === false) {
            prerelease = [identifier]
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease
            }
          } else {
            this.prerelease = prerelease
          }
        }
        break
      }
      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.raw = this.format()
    if (this.build.length) {
      this.raw += `+${this.build.join('.')}`
    }
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ 5003:
/***/ ((module, exports, __webpack_require__) => {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(8287)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 5947:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   YK: () => (/* binding */ getLoggerBuilder)
/* harmony export */ });
/* unused harmony exports LogLevel, getLogger */
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1777);

var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["Debug"] = 0] = "Debug";
  LogLevel2[LogLevel2["Info"] = 1] = "Info";
  LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
  LogLevel2[LogLevel2["Fatal"] = 4] = "Fatal";
  return LogLevel2;
})(LogLevel || {});
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ConsoleLogger {
  constructor(context) {
    __publicField$1(this, "context");
    this.context = context || {};
  }
  formatMessage(message, level, context) {
    let msg = "[" + LogLevel[level].toUpperCase() + "] ";
    if (context && context.app) {
      msg += context.app + ": ";
    }
    if (typeof message === "string")
      return msg + message;
    msg += "Unexpected ".concat(message.name);
    if (message.message)
      msg += ' "'.concat(message.message, '"');
    if (level === LogLevel.Debug && message.stack)
      msg += "\n\nStack trace:\n".concat(message.stack);
    return msg;
  }
  log(level, message, context) {
    var _a, _b;
    if (typeof ((_a = this.context) == null ? void 0 : _a.level) === "number" && level < ((_b = this.context) == null ? void 0 : _b.level)) {
      return;
    }
    if (typeof message === "object" && (context == null ? void 0 : context.error) === void 0) {
      context.error = message;
    }
    switch (level) {
      case LogLevel.Debug:
        console.debug(this.formatMessage(message, LogLevel.Debug, context), context);
        break;
      case LogLevel.Info:
        console.info(this.formatMessage(message, LogLevel.Info, context), context);
        break;
      case LogLevel.Warn:
        console.warn(this.formatMessage(message, LogLevel.Warn, context), context);
        break;
      case LogLevel.Error:
        console.error(this.formatMessage(message, LogLevel.Error, context), context);
        break;
      case LogLevel.Fatal:
      default:
        console.error(this.formatMessage(message, LogLevel.Fatal, context), context);
        break;
    }
  }
  debug(message, context) {
    this.log(LogLevel.Debug, message, Object.assign({}, this.context, context));
  }
  info(message, context) {
    this.log(LogLevel.Info, message, Object.assign({}, this.context, context));
  }
  warn(message, context) {
    this.log(LogLevel.Warn, message, Object.assign({}, this.context, context));
  }
  error(message, context) {
    this.log(LogLevel.Error, message, Object.assign({}, this.context, context));
  }
  fatal(message, context) {
    this.log(LogLevel.Fatal, message, Object.assign({}, this.context, context));
  }
}
function buildConsoleLogger(context) {
  return new ConsoleLogger(context);
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LoggerBuilder {
  constructor(factory) {
    __publicField(this, "context");
    __publicField(this, "factory");
    this.context = {};
    this.factory = factory;
  }
  /**
   * Set the app name within the logging context
   *
   * @param appId App name
   */
  setApp(appId) {
    this.context.app = appId;
    return this;
  }
  /**
   * Set the logging level within the logging context
   *
   * @param level Logging level
   */
  setLogLevel(level) {
    this.context.level = level;
    return this;
  }
  /* eslint-disable jsdoc/no-undefined-types */
  /**
   * Set the user id within the logging context
   * @param uid User ID
   * @see {@link detectUser}
   */
  /* eslint-enable jsdoc/no-undefined-types */
  setUid(uid) {
    this.context.uid = uid;
    return this;
  }
  /**
   * Detect the currently logged in user and set the user id within the logging context
   */
  detectUser() {
    const user = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__/* .getCurrentUser */ .HW)();
    if (user !== null) {
      this.context.uid = user.uid;
    }
    return this;
  }
  /**
   * Detect and use logging level configured in nextcloud config
   */
  detectLogLevel() {
    const self = this;
    const onLoaded = () => {
      var _a, _b;
      if (document.readyState === "complete" || document.readyState === "interactive") {
        self.context.level = (_b = (_a = window._oc_config) == null ? void 0 : _a.loglevel) != null ? _b : LogLevel.Warn;
        if (window._oc_debug) {
          self.context.level = LogLevel.Debug;
        }
        document.removeEventListener("readystatechange", onLoaded);
      } else {
        document.addEventListener("readystatechange", onLoaded);
      }
    };
    onLoaded();
    return this;
  }
  /** Build a logger using the logging context and factory */
  build() {
    if (this.context.level === void 0) {
      this.detectLogLevel();
    }
    return this.factory(this.context);
  }
}
function getLoggerBuilder() {
  return new LoggerBuilder(buildConsoleLogger);
}
function getLogger() {
  return getLoggerBuilder().build();
}



/***/ }),

/***/ 6117:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{ var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.CancelablePromise = void 0;
  _exports.cancelable = cancelable;
  _exports.default = void 0;
  _exports.isCancelablePromise = isCancelablePromise;

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

  function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

  function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

  var toStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : '@@toStringTag';

  var _internals = /*#__PURE__*/new WeakMap();

  var _promise = /*#__PURE__*/new WeakMap();

  var CancelablePromiseInternal = /*#__PURE__*/function () {
    function CancelablePromiseInternal(_ref) {
      var _ref$executor = _ref.executor,
          executor = _ref$executor === void 0 ? function () {} : _ref$executor,
          _ref$internals = _ref.internals,
          internals = _ref$internals === void 0 ? defaultInternals() : _ref$internals,
          _ref$promise = _ref.promise,
          promise = _ref$promise === void 0 ? new Promise(function (resolve, reject) {
        return executor(resolve, reject, function (onCancel) {
          internals.onCancelList.push(onCancel);
        });
      }) : _ref$promise;

      _classCallCheck(this, CancelablePromiseInternal);

      _classPrivateFieldInitSpec(this, _internals, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _promise, {
        writable: true,
        value: void 0
      });

      _defineProperty(this, toStringTag, 'CancelablePromise');

      this.cancel = this.cancel.bind(this);

      _classPrivateFieldSet(this, _internals, internals);

      _classPrivateFieldSet(this, _promise, promise || new Promise(function (resolve, reject) {
        return executor(resolve, reject, function (onCancel) {
          internals.onCancelList.push(onCancel);
        });
      }));
    }

    _createClass(CancelablePromiseInternal, [{
      key: "then",
      value: function then(onfulfilled, onrejected) {
        return makeCancelable(_classPrivateFieldGet(this, _promise).then(createCallback(onfulfilled, _classPrivateFieldGet(this, _internals)), createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "catch",
      value: function _catch(onrejected) {
        return makeCancelable(_classPrivateFieldGet(this, _promise).catch(createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "finally",
      value: function _finally(onfinally, runWhenCanceled) {
        var _this = this;

        if (runWhenCanceled) {
          _classPrivateFieldGet(this, _internals).onCancelList.push(onfinally);
        }

        return makeCancelable(_classPrivateFieldGet(this, _promise).finally(createCallback(function () {
          if (onfinally) {
            if (runWhenCanceled) {
              _classPrivateFieldGet(_this, _internals).onCancelList = _classPrivateFieldGet(_this, _internals).onCancelList.filter(function (callback) {
                return callback !== onfinally;
              });
            }

            return onfinally();
          }
        }, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "cancel",
      value: function cancel() {
        _classPrivateFieldGet(this, _internals).isCanceled = true;

        var callbacks = _classPrivateFieldGet(this, _internals).onCancelList;

        _classPrivateFieldGet(this, _internals).onCancelList = [];

        var _iterator = _createForOfIteratorHelper(callbacks),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var callback = _step.value;

            if (typeof callback === 'function') {
              try {
                callback();
              } catch (err) {
                console.error(err);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "isCanceled",
      value: function isCanceled() {
        return _classPrivateFieldGet(this, _internals).isCanceled === true;
      }
    }]);

    return CancelablePromiseInternal;
  }();

  var CancelablePromise = /*#__PURE__*/function (_CancelablePromiseInt) {
    _inherits(CancelablePromise, _CancelablePromiseInt);

    var _super = _createSuper(CancelablePromise);

    function CancelablePromise(executor) {
      _classCallCheck(this, CancelablePromise);

      return _super.call(this, {
        executor: executor
      });
    }

    return _createClass(CancelablePromise);
  }(CancelablePromiseInternal);

  _exports.CancelablePromise = CancelablePromise;

  _defineProperty(CancelablePromise, "all", function all(iterable) {
    return makeAllCancelable(iterable, Promise.all(iterable));
  });

  _defineProperty(CancelablePromise, "allSettled", function allSettled(iterable) {
    return makeAllCancelable(iterable, Promise.allSettled(iterable));
  });

  _defineProperty(CancelablePromise, "any", function any(iterable) {
    return makeAllCancelable(iterable, Promise.any(iterable));
  });

  _defineProperty(CancelablePromise, "race", function race(iterable) {
    return makeAllCancelable(iterable, Promise.race(iterable));
  });

  _defineProperty(CancelablePromise, "resolve", function resolve(value) {
    return cancelable(Promise.resolve(value));
  });

  _defineProperty(CancelablePromise, "reject", function reject(reason) {
    return cancelable(Promise.reject(reason));
  });

  _defineProperty(CancelablePromise, "isCancelable", isCancelablePromise);

  var _default = CancelablePromise;
  _exports.default = _default;

  function cancelable(promise) {
    return makeCancelable(promise, defaultInternals());
  }

  function isCancelablePromise(promise) {
    return promise instanceof CancelablePromise || promise instanceof CancelablePromiseInternal;
  }

  function createCallback(onResult, internals) {
    if (onResult) {
      return function (arg) {
        if (!internals.isCanceled) {
          var result = onResult(arg);

          if (isCancelablePromise(result)) {
            internals.onCancelList.push(result.cancel);
          }

          return result;
        }

        return arg;
      };
    }
  }

  function makeCancelable(promise, internals) {
    return new CancelablePromiseInternal({
      internals: internals,
      promise: promise
    });
  }

  function makeAllCancelable(iterable, promise) {
    var internals = defaultInternals();
    internals.onCancelList.push(function () {
      var _iterator2 = _createForOfIteratorHelper(iterable),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var resolvable = _step2.value;

          if (isCancelablePromise(resolvable)) {
            resolvable.cancel();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
    return new CancelablePromiseInternal({
      internals: internals,
      promise: promise
    });
  }

  function defaultInternals() {
    return {
      isCanceled: false,
      onCancelList: []
    };
  }
});
//# sourceMappingURL=CancelablePromise.js.map

/***/ }),

/***/ 6382:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  N: () => (/* binding */ NcInputField)
});

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(5072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(7659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(5056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(1113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[2]!./node_modules/sass-loader/dist/cjs.js!./node_modules/@nextcloud/vue/dist/assets/NcInputField-GxJ-rf2p.css
var NcInputField_GxJ_rf2p = __webpack_require__(7128);
;// ./node_modules/@nextcloud/vue/dist/assets/NcInputField-GxJ-rf2p.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(NcInputField_GxJ_rf2p/* default */.A, options);




       /* harmony default export */ const assets_NcInputField_GxJ_rf2p = (NcInputField_GxJ_rf2p/* default */.A && NcInputField_GxJ_rf2p/* default */.A.locals ? NcInputField_GxJ_rf2p/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/Components/NcButton.mjs + 1 modules
var NcButton = __webpack_require__(1512);
// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/chunks/GenRandomId-CMooMQt0.mjs
var GenRandomId_CMooMQt0 = __webpack_require__(6241);
// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/chunks/_plugin-vue2_normalizer-DU4iP6Vu.mjs
var _plugin_vue2_normalizer_DU4iP6Vu = __webpack_require__(1431);
;// ./node_modules/@nextcloud/vue/dist/chunks/AlertCircleOutline-DBxbepLy.mjs

const _sfc_main = {
  name: "AlertCircleOutlineIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon alert-circle-outline-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ (0,_plugin_vue2_normalizer_DU4iP6Vu.n)(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null
);
const AlertCircle = __component__.exports;

//# sourceMappingURL=AlertCircleOutline-DBxbepLy.mjs.map

;// ./node_modules/@nextcloud/vue/dist/chunks/Check-BkThHPH7.mjs

const Check_BkThHPH7_sfc_main = {
  name: "CheckIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
var Check_BkThHPH7_sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon check-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var Check_BkThHPH7_sfc_staticRenderFns = [];
var Check_BkThHPH7_component_ = /* @__PURE__ */ (0,_plugin_vue2_normalizer_DU4iP6Vu.n)(
  Check_BkThHPH7_sfc_main,
  Check_BkThHPH7_sfc_render,
  Check_BkThHPH7_sfc_staticRenderFns,
  false,
  null,
  null
);
const Check = Check_BkThHPH7_component_.exports;

//# sourceMappingURL=Check-BkThHPH7.mjs.map

// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/chunks/useModelMigration-EhAWvqDD.mjs
var useModelMigration_EhAWvqDD = __webpack_require__(9841);
;// ./node_modules/@nextcloud/vue/dist/chunks/NcInputField-DTtUueUZ.mjs







const NcInputField_DTtUueUZ_sfc_main = {
  name: "NcInputField",
  components: {
    NcButton: NcButton/* default */.A,
    AlertCircle: AlertCircle,
    Check: Check
  },
  inheritAttrs: false,
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    /**
     * Removed in v9 - use `modelValue` (`v-model`) instead
     * @deprecated
     */
    value: {
      type: [String, Number],
      default: void 0
    },
    /**
     * The value of the input field
     * If type is 'number' and a number is passed as value than the type of `update:modelValue` will also be 'number'
     */
    modelValue: {
      type: [String, Number],
      default: void 0
    },
    /**
     * The type of the input element
     */
    type: {
      type: String,
      default: "text",
      validator: (value) => [
        "text",
        "password",
        "email",
        "tel",
        "url",
        "search",
        "number"
      ].includes(value)
    },
    /**
     * The input label, always provide one for accessibility purposes.
     * This will also be used as a placeholder unless the placeholder
     * prop is populated with a different string.
     *
     * Note: If the background color is not `--color-main-background` consider using an external label instead (see `labelOutside`).
     */
    label: {
      type: String,
      default: void 0
    },
    /**
     * Pass in true if you want to use an external label. This is useful
     * if you need a label that looks different from the one provided by
     * this component
     */
    labelOutside: {
      type: Boolean,
      default: false
    },
    /**
     * The placeholder of the input. This defaults as the string that's
     * passed into the label prop. In order to remove the placeholder,
     * pass in an empty string.
     */
    placeholder: {
      type: String,
      default: void 0
    },
    /**
     * Controls whether to display the trailing button.
     */
    showTrailingButton: {
      type: Boolean,
      default: false
    },
    /**
     * Label of the trailing button
     *
     * Required when showTrailingButton is set
     */
    trailingButtonLabel: {
      type: String,
      default: ""
    },
    /**
     * Toggles the success state of the component. Adds a checkmark icon.
     * this cannot be used together with canClear.
     */
    success: {
      type: Boolean,
      default: false
    },
    /**
     * Toggles the error state of the component. Adds an error icon.
     * this cannot be used together with canClear.
     */
    error: {
      type: Boolean,
      default: false
    },
    /**
     * Additional helper text message
     *
     * This will be displayed beneath the input field. In case the field is
     * also marked as having an error, the text will be displayed in red.
     */
    helperText: {
      type: String,
      default: ""
    },
    /**
     * Disable the input field
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Specifies whether the input should have a pill form.
     * By default, input has rounded corners.
     */
    pill: {
      type: Boolean,
      default: false
    },
    /**
     * Class to add to the input field.
     * Necessary to use NcInputField in the NcActionInput component.
     */
    inputClass: {
      type: [Object, String],
      default: ""
    }
  },
  emits: [
    /**
     * Removed in v9 - use `update:modelValue` (`v-model`) instead
     * @deprecated
     */
    "update:value",
    "update:modelValue",
    /** Same as update:modelValue for Vue 2 compatibility */
    "update:model-value",
    "trailing-button-click"
  ],
  setup() {
    const model = (0,useModelMigration_EhAWvqDD.u)("value", "update:value", true);
    return {
      model
    };
  },
  computed: {
    computedId() {
      return this.$attrs.id && this.$attrs.id !== "" ? this.$attrs.id : this.inputName;
    },
    inputName() {
      return "input" + (0,GenRandomId_CMooMQt0.G)();
    },
    hasTrailingIcon() {
      return this.success;
    },
    hasPlaceholder() {
      return this.placeholder !== "" && this.placeholder !== void 0;
    },
    computedPlaceholder() {
      return this.hasPlaceholder ? this.placeholder : this.label;
    },
    isValidLabel() {
      const isValidLabel = this.label || this.labelOutside;
      if (!isValidLabel) {
        console.warn("You need to add a label to the NcInputField component. Either use the prop label or use an external one, as per the example in the documentation.");
      }
      return isValidLabel;
    },
    ariaDescribedby() {
      const ariaDescribedby = [];
      if (this.helperText.length > 0) {
        ariaDescribedby.push(`${this.inputName}-helper-text`);
      }
      if (this.$attrs["aria-describedby"]) {
        ariaDescribedby.push(this.$attrs["aria-describedby"]);
      }
      return ariaDescribedby.join(" ") || null;
    }
  },
  methods: {
    /**
     * Focus the input element
     *
     * @public
     */
    focus() {
      this.$refs.input.focus();
    },
    /**
     * Select all the text in the input
     *
     * @public
     */
    select() {
      this.$refs.input.select();
    },
    handleInput(event) {
      const newValue = this.type === "number" && typeof this.model === "number" ? parseFloat(event.target.value, 10) : event.target.value;
      this.model = newValue;
    },
    handleTrailingButtonClick(event) {
      this.$emit("trailing-button-click", event);
    }
  }
};
var NcInputField_DTtUueUZ_sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "input-field", class: {
    "input-field--disabled": _vm.disabled,
    "input-field--label-outside": _vm.labelOutside || !_vm.isValidLabel,
    "input-field--leading-icon": !!_vm.$scopedSlots.icon || !!_vm.$scopedSlots.default || !!_vm.$slots.default,
    "input-field--trailing-icon": _vm.showTrailingButton || _vm.hasTrailingIcon,
    "input-field--pill": _vm.pill
  } }, [_c("div", { staticClass: "input-field__main-wrapper" }, [_c("input", _vm._g(_vm._b({ ref: "input", staticClass: "input-field__input", class: [
    _vm.inputClass,
    {
      "input-field__input--success": _vm.success,
      "input-field__input--error": _vm.error
    }
  ], attrs: { "id": _vm.computedId, "type": _vm.type, "disabled": _vm.disabled, "placeholder": _vm.computedPlaceholder, "aria-describedby": _vm.ariaDescribedby, "aria-live": "polite" }, domProps: { "value": _vm.model?.toString() }, on: { "input": _vm.handleInput } }, "input", _vm.$attrs, false), _vm.$listeners)), !_vm.labelOutside && _vm.isValidLabel ? _c("label", { staticClass: "input-field__label", attrs: { "for": _vm.computedId } }, [_vm._v(" " + _vm._s(_vm.label) + " ")]) : _vm._e(), _c("div", { directives: [{ name: "show", rawName: "v-show", value: !!_vm.$scopedSlots.icon || !!_vm.$scopedSlots.default || !!_vm.$slots.default, expression: "!!$scopedSlots.icon || !!$scopedSlots.default || !!$slots.default" }], staticClass: "input-field__icon input-field__icon--leading" }, [_vm._t("icon", function() {
    return [_vm._t("default")];
  })], 2), _vm.showTrailingButton ? _c("NcButton", { staticClass: "input-field__trailing-button", attrs: { "aria-label": _vm.trailingButtonLabel, "disabled": _vm.disabled, "variant": "tertiary-no-background" }, on: { "click": _vm.handleTrailingButtonClick }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_vm._t("trailing-button-icon")];
  }, proxy: true }], null, true) }) : _vm.success || _vm.error ? _c("div", { staticClass: "input-field__icon input-field__icon--trailing" }, [_vm.success ? _c("Check", { staticStyle: { "color": "var(--color-success-text)" }, attrs: { "size": 20 } }) : _vm.error ? _c("AlertCircle", { staticStyle: { "color": "var(--color-error-text)" }, attrs: { "size": 20 } }) : _vm._e()], 1) : _vm._e()], 1), _vm.helperText.length > 0 ? _c("p", { staticClass: "input-field__helper-text-message", class: {
    "input-field__helper-text-message--error": _vm.error,
    "input-field__helper-text-message--success": _vm.success
  }, attrs: { "id": `${_vm.inputName}-helper-text` } }, [_vm.success ? _c("Check", { staticClass: "input-field__helper-text-message__icon", attrs: { "size": 18 } }) : _vm.error ? _c("AlertCircle", { staticClass: "input-field__helper-text-message__icon", attrs: { "size": 18 } }) : _vm._e(), _vm._v(" " + _vm._s(_vm.helperText) + " ")], 1) : _vm._e()]);
};
var NcInputField_DTtUueUZ_sfc_staticRenderFns = [];
var NcInputField_DTtUueUZ_component_ = /* @__PURE__ */ (0,_plugin_vue2_normalizer_DU4iP6Vu.n)(
  NcInputField_DTtUueUZ_sfc_main,
  NcInputField_DTtUueUZ_sfc_render,
  NcInputField_DTtUueUZ_sfc_staticRenderFns,
  false,
  null,
  "8f3abf17"
);
const NcInputField = NcInputField_DTtUueUZ_component_.exports;

//# sourceMappingURL=NcInputField-DTtUueUZ.mjs.map


/***/ }),

/***/ 6874:
/***/ ((module) => {

"use strict";


// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6

const RELEASE_TYPES = [
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
]

module.exports = {
  MAX_LENGTH,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 0b001,
  FLAG_LOOSE: 0b010,
}


/***/ }),

/***/ 6953:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const parse = __webpack_require__(144)
const valid = (version, options) => {
  const v = parse(version, options)
  return v ? v.version : null
}
module.exports = valid


/***/ }),

/***/ 7128:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1601);
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.material-design-icon[data-v-8f3abf17]{display:flex;align-self:center;justify-self:center;align-items:center;justify-content:center}.input-field[data-v-8f3abf17]{--input-border-radius: var(--border-radius-element, var(--border-radius-large));--input-padding-start: var(--border-radius-large);--input-padding-end: var(--border-radius-large);position:relative;width:100%;margin-block-start:6px}.input-field--disabled[data-v-8f3abf17]{opacity:.4;filter:saturate(0.4)}.input-field--label-outside[data-v-8f3abf17]{margin-block-start:0}.input-field--leading-icon[data-v-8f3abf17]{--input-padding-start: calc(var(--default-clickable-area) - var(--default-grid-baseline))}.input-field--trailing-icon[data-v-8f3abf17]{--input-padding-end: calc(var(--default-clickable-area) - var(--default-grid-baseline))}.input-field--pill[data-v-8f3abf17]{--input-border-radius: var(--border-radius-pill)}.input-field__main-wrapper[data-v-8f3abf17]{height:var(--default-clickable-area);position:relative}.input-field__input[data-v-8f3abf17]{--input-border-width-offset: calc(var(--border-width-input-focused, 2px) - var(--border-width-input, 2px));background-color:var(--color-main-background);color:var(--color-main-text);border:var(--border-width-input, 2px) solid var(--color-border-maxcontrast);border-radius:var(--input-border-radius);cursor:pointer;-webkit-appearance:textfield !important;-moz-appearance:textfield !important;appearance:textfield !important;font-size:var(--default-font-size);text-overflow:ellipsis;height:calc(var(--default-clickable-area) - 2*var(--input-border-width-offset)) !important;width:100%;padding-inline:calc(var(--input-padding-start) + var(--input-border-width-offset)) calc(var(--input-padding-end) + var(--input-border-width-offset));padding-block:var(--input-border-width-offset)}.input-field__input[data-v-8f3abf17]::placeholder{color:var(--color-text-maxcontrast)}.input-field__input[data-v-8f3abf17]:active:not([disabled]),.input-field__input[data-v-8f3abf17]:hover:not([disabled]),.input-field__input[data-v-8f3abf17]:focus:not([disabled]){border-color:var(--color-main-text);border-width:var(--border-width-input-focused, 2px);box-shadow:0 0 0 2px var(--color-main-background) !important;--input-border-width-offset: 0px}.input-field__input:focus+.input-field__label[data-v-8f3abf17],.input-field__input:hover:not(:placeholder-shown)+.input-field__label[data-v-8f3abf17]{color:var(--color-main-text)}.input-field__input[data-v-8f3abf17]:focus{cursor:text}.input-field__input[data-v-8f3abf17]:disabled{cursor:default}.input-field__input[data-v-8f3abf17]:focus-visible{box-shadow:unset !important}.input-field__input--success[data-v-8f3abf17]{border-color:var(--color-success) !important}.input-field__input--success[data-v-8f3abf17]:focus-visible{box-shadow:rgb(248, 250, 252) 0px 0px 0px 2px,var(--color-primary-element) 0px 0px 0px 4px,rgba(0, 0, 0, 0.05) 0px 1px 2px 0px}.input-field__input--error[data-v-8f3abf17],.input-field__input[data-v-8f3abf17]:user-invalid{border-color:var(--color-error) !important}.input-field__input--error[data-v-8f3abf17]:focus-visible,.input-field__input[data-v-8f3abf17]:user-invalid:focus-visible{box-shadow:rgb(248, 250, 252) 0px 0px 0px 2px,var(--color-primary-element) 0px 0px 0px 4px,rgba(0, 0, 0, 0.05) 0px 1px 2px 0px}.input-field:not(.input-field--label-outside) .input-field__input[data-v-8f3abf17]:not(:focus)::placeholder{opacity:0}.input-field__label[data-v-8f3abf17]{--input-label-font-size: var(--default-font-size);position:absolute;margin-inline:var(--input-padding-start) var(--input-padding-end);max-width:fit-content;font-size:var(--input-label-font-size);inset-block-start:calc((var(--default-clickable-area) - 1lh)/2);inset-inline:var(--border-width-input-focused, 2px);color:var(--color-text-maxcontrast);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none;transition:height var(--animation-quick),inset-block-start var(--animation-quick),font-size var(--animation-quick),color var(--animation-quick),background-color var(--animation-quick) var(--animation-slow)}.input-field__input:focus+.input-field__label[data-v-8f3abf17],.input-field__input:not(:placeholder-shown)+.input-field__label[data-v-8f3abf17]{--input-label-font-size: 13px;line-height:1.5;inset-block-start:calc(-1.5*var(--input-label-font-size)/2);font-weight:500;border-radius:var(--default-grid-baseline) var(--default-grid-baseline) 0 0;background-color:var(--color-main-background);padding-inline:var(--default-grid-baseline);margin-inline:calc(var(--input-padding-start) - var(--default-grid-baseline)) calc(var(--input-padding-end) - var(--default-grid-baseline));transition:height var(--animation-quick),inset-block-start var(--animation-quick),font-size var(--animation-quick),color var(--animation-quick)}.input-field__icon[data-v-8f3abf17]{position:absolute;height:var(--default-clickable-area);width:var(--default-clickable-area);display:flex;align-items:center;justify-content:center;opacity:.7;inset-block-end:0}.input-field__icon--leading[data-v-8f3abf17]{inset-inline-start:0px}.input-field__icon--trailing[data-v-8f3abf17]{inset-inline-end:0px}.input-field__trailing-button[data-v-8f3abf17]{--button-size: calc(var(--default-clickable-area) - 2 * var(--border-width-input-focused, 2px)) !important;--button-radius: calc(var(--input-border-radius) - var(--border-width-input-focused, 2px))}.input-field__trailing-button.button-vue[data-v-8f3abf17]{position:absolute;top:var(--border-width-input-focused, 2px);inset-inline-end:var(--border-width-input-focused, 2px)}.input-field__trailing-button.button-vue[data-v-8f3abf17]:focus-visible{box-shadow:none !important}.input-field__helper-text-message[data-v-8f3abf17]{padding-block:4px;padding-inline:var(--border-radius-large);display:flex;align-items:center;color:var(--color-text-maxcontrast)}.input-field__helper-text-message__icon[data-v-8f3abf17]{margin-inline-end:8px}.input-field__helper-text-message--error[data-v-8f3abf17]{color:var(--color-error-text)}.input-field__helper-text-message--success[data-v-8f3abf17]{color:var(--color-success-text)}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7272:
/***/ ((module) => {

"use strict";


const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ 7485:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ e)
/* harmony export */ });
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2981);

function e() {
  try {
    return (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__/* .loadState */ .C)("core", "capabilities");
  } catch {
    return console.debug("Could not find capabilities initial state fall back to _oc_capabilities"), "_oc_capabilities" in window ? window._oc_capabilities : {};
  }
}



/***/ }),

/***/ 7526:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 8028:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  N: () => (/* binding */ NcTextField)
});

// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/chunks/NcInputField-DTtUueUZ.mjs + 3 modules
var NcInputField_DTtUueUZ = __webpack_require__(6382);
// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/chunks/Close-BtLPUSdO.mjs
var Close_BtLPUSdO = __webpack_require__(9916);
// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/chunks/_plugin-vue2_normalizer-DU4iP6Vu.mjs
var _plugin_vue2_normalizer_DU4iP6Vu = __webpack_require__(1431);
;// ./node_modules/@nextcloud/vue/dist/chunks/ArrowRight-CY2b9hgN.mjs

const _sfc_main = {
  name: "ArrowRightIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon arrow-right-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ (0,_plugin_vue2_normalizer_DU4iP6Vu.n)(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null
);
const ArrowRight = __component__.exports;

//# sourceMappingURL=ArrowRight-CY2b9hgN.mjs.map

// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/chunks/_l10n-DQgzdF9S.mjs
var _l10n_DQgzdF9S = __webpack_require__(3653);
// EXTERNAL MODULE: ./node_modules/@nextcloud/vue/dist/chunks/useModelMigration-EhAWvqDD.mjs
var useModelMigration_EhAWvqDD = __webpack_require__(9841);
;// ./node_modules/@nextcloud/vue/dist/chunks/NcTextField-o_8gWurX.mjs






const _sfc_main$1 = {
  name: "UndoVariantIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon undo-variant-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ (0,_plugin_vue2_normalizer_DU4iP6Vu.n)(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null
);
const Undo = __component__$1.exports;
(0,_l10n_DQgzdF9S.r)(_l10n_DQgzdF9S.f, _l10n_DQgzdF9S.e);
const NcInputFieldProps = new Set(Object.keys(NcInputField_DTtUueUZ.N.props));
const NcTextField_o_8gWurX_sfc_main = {
  name: "NcTextField",
  components: {
    NcInputField: NcInputField_DTtUueUZ.N,
    Close: Close_BtLPUSdO.C,
    ArrowRight: ArrowRight,
    Undo
  },
  // Allow forwarding all attributes
  inheritAttrs: false,
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    /**
     * Any [NcInputField](#/Components/NcFields?id=ncinputfield) props
     */
    // Not an actual prop but needed to show in vue-styleguidist docs
    // eslint-disable-next-line
    " ": {},
    // Reuse all the props from NcInputField for better typing and documentation
    ...NcInputField_DTtUueUZ.N.props,
    /**
     * The `aria-label` to set on the trailing button
     * If no explicit value is set it will default to the one matching the `trailingButtonIcon`:
     * @default 'Clear text'|'Save changes'|'Undo changes'
     */
    trailingButtonLabel: {
      type: String,
      default: ""
    },
    // Custom props
    /**
     * Specifies which material design icon should be used for the trailing
     * button.
     * @type {'close'|'arrowRight'|'undo'}
     */
    trailingButtonIcon: {
      type: String,
      default: "close",
      validator: (value) => [
        "close",
        "arrowRight",
        "undo"
      ].includes(value)
    }
  },
  emits: [
    /**
     * Removed in v9 - use `update:modelValue` (`v-model`) instead
     * @deprecated
     */
    "update:value",
    "update:modelValue",
    /** Same as update:modelValue for Vue 2 compatibility */
    "update:model-value"
  ],
  setup() {
    const model = (0,useModelMigration_EhAWvqDD.u)("value", "update:value");
    return {
      model
    };
  },
  computed: {
    propsAndAttrsToForward() {
      const predefinedLabels = {
        undo: (0,_l10n_DQgzdF9S.a)("Undo changes"),
        close: (0,_l10n_DQgzdF9S.a)("Clear text"),
        arrowRight: (0,_l10n_DQgzdF9S.a)("Save changes")
      };
      return {
        // Proxy all the HTML attributes
        ...this.$attrs,
        // Proxy original NcInputField's props
        ...Object.fromEntries(
          Object.entries(this.$props).filter(([key]) => NcInputFieldProps.has(key))
        ),
        // Adjust aria-label for predefined trailing buttons
        trailingButtonLabel: this.trailingButtonLabel || predefinedLabels[this.trailingButtonIcon]
      };
    }
  },
  methods: {
    /**
     * Focus the input element
     *
     * @public
     */
    focus() {
      this.$refs.inputField.focus();
    },
    /**
     * Select all the text in the input
     *
     * @public
     */
    select() {
      this.$refs.inputField.select();
    }
  }
};
var NcTextField_o_8gWurX_sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("NcInputField", _vm._g(_vm._b({ ref: "inputField", scopedSlots: _vm._u([!!_vm.$scopedSlots.icon || !!_vm.$slots.default || !!_vm.$scopedSlots.default ? { key: "icon", fn: function() {
    return [_vm._t("icon", function() {
      return [_vm._t("default")];
    })];
  }, proxy: true } : null, _vm.type !== "search" ? { key: "trailing-button-icon", fn: function() {
    return [_vm.trailingButtonIcon === "close" ? _c("Close", { attrs: { "size": 20 } }) : _vm.trailingButtonIcon === "arrowRight" ? _c("ArrowRight", { attrs: { "size": 20 } }) : _vm.trailingButtonIcon === "undo" ? _c("Undo", { attrs: { "size": 20 } }) : _vm._e()];
  }, proxy: true } : null], null, true) }, "NcInputField", _vm.propsAndAttrsToForward, false), _vm.$listeners));
};
var NcTextField_o_8gWurX_sfc_staticRenderFns = [];
var NcTextField_o_8gWurX_component_ = /* @__PURE__ */ (0,_plugin_vue2_normalizer_DU4iP6Vu.n)(
  NcTextField_o_8gWurX_sfc_main,
  NcTextField_o_8gWurX_sfc_render,
  NcTextField_o_8gWurX_sfc_staticRenderFns,
  false,
  null,
  null
);
const NcTextField = NcTextField_o_8gWurX_component_.exports;

//# sourceMappingURL=NcTextField-o_8gWurX.mjs.map


/***/ }),

/***/ 8287:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(7526)
var ieee754 = __webpack_require__(251)
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()


/***/ }),

/***/ 8587:
/***/ ((module) => {

"use strict";


// parse out just the options we care about
const looseOption = Object.freeze({ loose: true })
const emptyOpts = Object.freeze({ })
const parseOptions = options => {
  if (!options) {
    return emptyOpts
  }

  if (typeof options !== 'object') {
    return looseOption
  }

  return options
}
module.exports = parseOptions


/***/ }),

/***/ 9097:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = clearAll;
__webpack_unused_export__ = clearNonPersistent;
exports.c0 = getBuilder;
var _storagebuilder = _interopRequireDefault(__webpack_require__(9457));
var _scopedstorage = _interopRequireDefault(__webpack_require__(432));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Get the storage builder for an app
 * @param appId App ID to scope storage
 */
function getBuilder(appId) {
  return new _storagebuilder.default(appId);
}

/**
 * Clear values from storage
 * @param storage The storage to clear
 * @param pred Callback to check if value should be cleared
 */
function clearStorage(storage, pred) {
  Object.keys(storage).filter(k => pred ? pred(k) : true).map(storage.removeItem.bind(storage));
}

/**
 * Clear all values from all storages
 */
function clearAll() {
  const storages = [window.sessionStorage, window.localStorage];
  storages.map(s => clearStorage(s));
}

/**
 * Clear ony non persistent values
 */
function clearNonPersistent() {
  const storages = [window.sessionStorage, window.localStorage];
  storages.map(s => clearStorage(s, k => !k.startsWith(_scopedstorage.default.GLOBAL_SCOPE_PERSISTENT)));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9457:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _scopedstorage = _interopRequireDefault(__webpack_require__(432));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class StorageBuilder {
  constructor(appId) {
    _defineProperty(this, "appId", void 0);
    _defineProperty(this, "persisted", false);
    _defineProperty(this, "clearedOnLogout", false);
    this.appId = appId;
  }
  persist() {
    let persist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.persisted = persist;
    return this;
  }
  clearOnLogout() {
    let clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.clearedOnLogout = clear;
    return this;
  }
  build() {
    return new _scopedstorage.default(this.appId, this.persisted ? window.localStorage : window.sessionStorage, !this.clearedOnLogout);
  }
}
exports["default"] = StorageBuilder;
//# sourceMappingURL=storagebuilder.js.map

/***/ }),

/***/ 9718:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


const {
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_LENGTH,
} = __webpack_require__(6874)
const debug = __webpack_require__(7272)
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const safeRe = exports.safeRe = []
const src = exports.src = []
const safeSrc = exports.safeSrc = []
const t = exports.t = {}
let R = 0

const LETTERDASHNUMBER = '[a-zA-Z0-9-]'

// Replace some greedy regex tokens to prevent regex dos issues. These regex are
// used internally via the safeRe object since all inputs in this library get
// normalized first to trim and collapse all extra whitespace. The original
// regexes are exported for userland consumption and lower level usage. A
// future breaking change could export the safer regex only with a note that
// all input should have extra whitespace removed.
const safeRegexReplacements = [
  ['\\s', 1],
  ['\\d', MAX_LENGTH],
  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
]

const makeSafeRegex = (value) => {
  for (const [token, max] of safeRegexReplacements) {
    value = value
      .split(`${token}*`).join(`${token}{0,${max}}`)
      .split(`${token}+`).join(`${token}{1,${max}}`)
  }
  return value
}

const createToken = (name, value, isGlobal) => {
  const safe = makeSafeRegex(value)
  const index = R++
  debug(name, index, value)
  t[name] = index
  src[index] = value
  safeSrc[index] = safe
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '\\d+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`)

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
// Non-numberic identifiers include numberic identifiers but can be longer.
// Therefore non-numberic identifiers must go first.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NONNUMERICIDENTIFIER]
}|${src[t.NUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NONNUMERICIDENTIFIER]
}|${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`)

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCEPLAIN', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`)
createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`)
createToken('COERCEFULL', src[t.COERCEPLAIN] +
              `(?:${src[t.PRERELEASE]})?` +
              `(?:${src[t.BUILD]})?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)
createToken('COERCERTLFULL', src[t.COERCEFULL], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$')


/***/ }),

/***/ 9841:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useModelMigration)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5471);

function useModelMigration(oldModelName, oldModelEvent, required = false) {
  const vm = (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .getCurrentInstance */ .nI)().proxy;
  if (required && vm.$props[oldModelName] === void 0 && vm.$props.modelValue === void 0) {
    vue__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.util.warn(`Missing required prop: "modelValue" or old "${oldModelName}"`);
  }
  const model = (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .computed */ .EW)({
    get() {
      if (vm.$props[oldModelName] !== void 0) {
        return vm.$props[oldModelName];
      }
      return vm.$props.modelValue;
    },
    set(value) {
      vm.$emit("update:modelValue", value);
      vm.$emit("update:model-value", value);
      vm.$emit(oldModelEvent, value);
    }
  });
  return model;
}

//# sourceMappingURL=useModelMigration-EhAWvqDD.mjs.map


/***/ })

}]);