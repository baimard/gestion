"use strict";
(self["webpackChunkgestion"] = self["webpackChunkgestion"] || []).push([[802],{

/***/ 65358:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.Ec = encodePath;
__webpack_unused_export__ = basename;
__webpack_unused_export__ = dirname;
__webpack_unused_export__ = joinPaths;
__webpack_unused_export__ = isSamePath;

__webpack_require__(50886);

__webpack_require__(64043);

__webpack_require__(9873);

__webpack_require__(57267);

__webpack_require__(38077);

__webpack_require__(278);

__webpack_require__(34338);

/**
 * URI-Encodes a file path but keep the path slashes.
 */
function encodePath(path) {
  if (!path) {
    return path;
  }

  return path.split('/').map(encodeURIComponent).join('/');
}
/**
 * Returns the base name of the given path.
 * For example for "/abc/somefile.txt" it will return "somefile.txt"
 */


function basename(path) {
  return path.replace(/\\/g, '/').replace(/.*\//, '');
}
/**
 * Returns the dir name of the given path.
 * For example for "/abc/somefile.txt" it will return "/abc"
 */


function dirname(path) {
  return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}
/**
 * Join path sections
 */


function joinPaths() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (arguments.length < 1) {
    return '';
  } // discard empty arguments


  var nonEmptyArgs = args.filter(function (arg) {
    return arg.length > 0;
  });

  if (nonEmptyArgs.length < 1) {
    return '';
  }

  var lastArg = nonEmptyArgs[nonEmptyArgs.length - 1];
  var leadingSlash = nonEmptyArgs[0].charAt(0) === '/';
  var trailingSlash = lastArg.charAt(lastArg.length - 1) === '/';
  var sections = nonEmptyArgs.reduce(function (acc, section) {
    return acc.concat(section.split('/'));
  }, []);
  var first = !leadingSlash;
  var path = sections.reduce(function (acc, section) {
    if (section === '') {
      return acc;
    }

    if (first) {
      first = false;
      return acc + section;
    }

    return acc + '/' + section;
  }, '');

  if (trailingSlash) {
    // add it back
    return path + '/';
  }

  return path;
}
/**
 * Returns whether the given paths are the same, without
 * leading, trailing or doubled slashes and also removing
 * the dot sections.
 */


function isSamePath(path1, path2) {
  var pathSections1 = (path1 || '').split('/').filter(function (p) {
    return p !== '.';
  });
  var pathSections2 = (path2 || '').split('/').filter(function (p) {
    return p !== '.';
  });
  path1 = joinPaths.apply(undefined, pathSections1);
  path2 = joinPaths.apply(undefined, pathSections2);
  return path1 === path2;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 29042:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(3689);
var wellKnownSymbol = __webpack_require__(44201);
var V8_VERSION = __webpack_require__(3615);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 76522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toPropertyKey = __webpack_require__(18360);
var definePropertyModule = __webpack_require__(72560);
var createPropertyDescriptor = __webpack_require__(75684);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 55565:
/***/ ((module) => {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 34338:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(79989);
var fails = __webpack_require__(3689);
var isArray = __webpack_require__(92297);
var isObject = __webpack_require__(48999);
var toObject = __webpack_require__(90690);
var lengthOfArrayLike = __webpack_require__(6310);
var doesNotExceedSafeInteger = __webpack_require__(55565);
var createProperty = __webpack_require__(76522);
var arraySpeciesCreate = __webpack_require__(27120);
var arrayMethodHasSpeciesSupport = __webpack_require__(29042);
var wellKnownSymbol = __webpack_require__(44201);
var V8_VERSION = __webpack_require__(3615);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 38077:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(79989);
var $filter = (__webpack_require__(2960).filter);
var arrayMethodHasSpeciesSupport = __webpack_require__(29042);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 50886:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(79989);
var $map = (__webpack_require__(2960).map);
var arrayMethodHasSpeciesSupport = __webpack_require__(29042);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 54802:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _i)
});

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(20144);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/DialogBase-2d1c3e06.mjs + 2 modules
var DialogBase_2d1c3e06 = __webpack_require__(34594);
// EXTERNAL MODULE: ./node_modules/@nextcloud/event-bus/node_modules/semver/functions/valid.js
var valid = __webpack_require__(77907);
// EXTERNAL MODULE: ./node_modules/@nextcloud/event-bus/node_modules/semver/functions/major.js
var major = __webpack_require__(92426);
;// CONCATENATED MODULE: ./node_modules/@nextcloud/event-bus/dist/index.mjs



class ProxyBus {
    bus;
    constructor(bus) {
        if (typeof bus.getVersion !== 'function' || !valid(bus.getVersion())) {
            console.warn('Proxying an event bus with an unknown or invalid version');
        }
        else if (major(bus.getVersion()) !== major(this.getVersion())) {
            console.warn('Proxying an event bus of version ' + bus.getVersion() + ' with ' + this.getVersion());
        }
        this.bus = bus;
    }
    getVersion() {
        return "3.1.0";
    }
    subscribe(name, handler) {
        this.bus.subscribe(name, handler);
    }
    unsubscribe(name, handler) {
        this.bus.unsubscribe(name, handler);
    }
    emit(name, event) {
        this.bus.emit(name, event);
    }
}

class SimpleBus {
    handlers = new Map();
    getVersion() {
        return "3.1.0";
    }
    subscribe(name, handler) {
        this.handlers.set(name, (this.handlers.get(name) || []).concat(handler));
    }
    unsubscribe(name, handler) {
        this.handlers.set(name, (this.handlers.get(name) || []).filter(h => h != handler));
    }
    emit(name, event) {
        (this.handlers.get(name) || []).forEach(h => {
            try {
                h(event);
            }
            catch (e) {
                console.error('could not invoke event listener', e);
            }
        });
    }
}

let bus = null;
function getBus() {
    if (bus !== null) {
        return bus;
    }
    if (typeof window === 'undefined') {
        // testing or SSR
        return new Proxy({}, {
            get: () => {
                return () => console.error('Window not available, EventBus can not be established!');
            }
        });
    }
    if (typeof window.OC !== 'undefined' && window.OC._eventBus && typeof window._nc_event_bus === 'undefined') {
        console.warn('found old event bus instance at OC._eventBus. Update your version!');
        window._nc_event_bus = window.OC._eventBus;
    }
    // Either use an existing event bus instance or create one
    if (typeof window?._nc_event_bus !== 'undefined') {
        bus = new ProxyBus(window._nc_event_bus);
    }
    else {
        bus = window._nc_event_bus = new SimpleBus();
    }
    return bus;
}
/**
 * Register an event listener
 *
 * @param name name of the event
 * @param handler callback invoked for every matching event emitted on the bus
 */
function subscribe(name, handler) {
    getBus().subscribe(name, handler);
}
/**
 * Unregister a previously registered event listener
 *
 * Note: doesn't work with anonymous functions (closures). Use method of an object or store listener function in variable.
 *
 * @param name name of the event
 * @param handler callback passed to `subscribed`
 */
function unsubscribe(name, handler) {
    getBus().unsubscribe(name, handler);
}
/**
 * Emit an event
 *
 * @param name name of the event
 * @param event event payload
 */
function emit(name, event) {
    getBus().emit(name, event);
}


//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/@nextcloud/auth/dist/index.es.mjs


let token = undefined;
const observers = [];
/**
 * Get current request token
 *
 * @return {string|null} Current request token or null if not set
 */
function getRequestToken() {
    if (token === undefined) {
        // Only on first load, try to get token from document
        const tokenElement = document?.getElementsByTagName('head')[0];
        token = tokenElement ? tokenElement.getAttribute('data-requesttoken') : null;
    }
    return token;
}
/**
 * Add an observer which is called when the CSRF token changes
 *
 * @param observer The observer
 */
function onRequestTokenUpdate(observer) {
    observers.push(observer);
}
// Listen to server event and keep token in sync
subscribe('csrf-token-update', e => {
    token = e.token;
    observers.forEach(observer => {
        try {
            observer(e.token);
        }
        catch (e) {
            console.error('error updating CSRF token observer', e);
        }
    });
});

const getAttribute = (el, attribute) => {
    if (el) {
        return el.getAttribute(attribute);
    }
    return null;
};
let currentUser = undefined;
function getCurrentUser() {
    if (currentUser !== undefined) {
        return currentUser;
    }
    const head = document?.getElementsByTagName('head')[0];
    if (!head) {
        return null;
    }
    // No user logged in so cache and return null
    const uid = getAttribute(head, 'data-user');
    if (uid === null) {
        currentUser = null;
        return currentUser;
    }
    currentUser = {
        uid,
        displayName: getAttribute(head, 'data-user-displayname'),
        isAdmin: !!window._oc_isadmin,
    };
    return currentUser;
}


//# sourceMappingURL=index.es.mjs.map

// EXTERNAL MODULE: ./node_modules/@nextcloud/logger/dist/index.js
var dist = __webpack_require__(17499);
// EXTERNAL MODULE: ./node_modules/@nextcloud/l10n/dist/index.mjs
var l10n_dist = __webpack_require__(31352);
// EXTERNAL MODULE: ./node_modules/path/path.js
var path = __webpack_require__(62520);
// EXTERNAL MODULE: ./node_modules/@nextcloud/paths/dist/index.js
var paths_dist = __webpack_require__(65358);
// EXTERNAL MODULE: ./node_modules/@nextcloud/router/dist/index.js
var router_dist = __webpack_require__(79753);
;// CONCATENATED MODULE: ./node_modules/webdav/dist/web/index.js
/*! For license information please see index.js.LICENSE.txt */
var t={584:t=>{function e(t,e,o){t instanceof RegExp&&(t=r(t,o)),e instanceof RegExp&&(e=r(e,o));var i=n(t,e,o);return i&&{start:i[0],end:i[1],pre:o.slice(0,i[0]),body:o.slice(i[0]+t.length,i[1]),post:o.slice(i[1]+e.length)}}function r(t,e){var r=e.match(t);return r?r[0]:null}function n(t,e,r){var n,o,i,a,s,u=r.indexOf(t),c=r.indexOf(e,u+1),l=u;if(u>=0&&c>0){for(n=[],i=r.length;l>=0&&!s;)l==u?(n.push(l),u=r.indexOf(t,l+1)):1==n.length?s=[n.pop(),c]:((o=n.pop())<i&&(i=o,a=c),c=r.indexOf(e,l+1)),l=u<c&&u>=0?u:c;n.length&&(s=[i,a])}return s}t.exports=e,e.range=n},146:function(t,e,r){var n;function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}t=r.nmd(t),function(i){var a="object"==o(e)&&e,s="object"==o(t)&&t&&t.exports==a&&t,u="object"==("undefined"==typeof global?"undefined":o(global))&&global;u.global!==u&&u.window!==u||(i=u);var c=function(t){this.message=t};(c.prototype=new Error).name="InvalidCharacterError";var l=function(t){throw new c(t)},f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h=/[\t\n\f\r ]/g,p={encode:function(t){t=String(t),/[^\0-\xFF]/.test(t)&&l("The string to be encoded contains characters outside of the Latin1 range.");for(var e,r,n,o,i=t.length%3,a="",s=-1,u=t.length-i;++s<u;)e=t.charCodeAt(s)<<16,r=t.charCodeAt(++s)<<8,n=t.charCodeAt(++s),a+=f.charAt((o=e+r+n)>>18&63)+f.charAt(o>>12&63)+f.charAt(o>>6&63)+f.charAt(63&o);return 2==i?(e=t.charCodeAt(s)<<8,r=t.charCodeAt(++s),a+=f.charAt((o=e+r)>>10)+f.charAt(o>>4&63)+f.charAt(o<<2&63)+"="):1==i&&(o=t.charCodeAt(s),a+=f.charAt(o>>2)+f.charAt(o<<4&63)+"=="),a},decode:function(t){var e=(t=String(t).replace(h,"")).length;e%4==0&&(e=(t=t.replace(/==?$/,"")).length),(e%4==1||/[^+a-zA-Z0-9/]/.test(t))&&l("Invalid character: the string to be decoded is not correctly encoded.");for(var r,n,o=0,i="",a=-1;++a<e;)n=f.indexOf(t.charAt(a)),r=o%4?64*r+n:n,o++%4&&(i+=String.fromCharCode(255&r>>(-2*o&6)));return i},version:"1.0.0"};if("object"==o(r.amdO)&&r.amdO)void 0===(n=function(){return p}.call(e,r,e,t))||(t.exports=n);else if(a&&!a.nodeType)if(s)s.exports=p;else for(var d in p)p.hasOwnProperty(d)&&(a[d]=p[d]);else i.base64=p}(this)},918:(t,e)=>{e.k=function(t){if(!t)return 0;for(var e=(t=t.toString()).length,r=t.length;r--;){var n=t.charCodeAt(r);56320<=n&&n<=57343&&r--,127<n&&n<=2047?e++:2047<n&&n<=65535&&(e+=2)}return e}},106:t=>{var e={utf8:{stringToBytes:function(t){return e.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(e.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e},bytesToString:function(t){for(var e=[],r=0;r<t.length;r++)e.push(String.fromCharCode(t[r]));return e.join("")}}};t.exports=e},718:t=>{var e,r;e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&r.rotl(t,8)|4278255360&r.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=r.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],r=0,n=0;r<t.length;r++,n+=8)e[n>>>5]|=t[r]<<24-n%32;return e},wordsToBytes:function(t){for(var e=[],r=0;r<32*t.length;r+=8)e.push(t[r>>>5]>>>24-r%32&255);return e},bytesToHex:function(t){for(var e=[],r=0;r<t.length;r++)e.push((t[r]>>>4).toString(16)),e.push((15&t[r]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],r=0;r<t.length;r+=2)e.push(parseInt(t.substr(r,2),16));return e},bytesToBase64:function(t){for(var r=[],n=0;n<t.length;n+=3)for(var o=t[n]<<16|t[n+1]<<8|t[n+2],i=0;i<4;i++)8*n+6*i<=8*t.length?r.push(e.charAt(o>>>6*(3-i)&63)):r.push("=");return r.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var r=[],n=0,o=0;n<t.length;o=++n%4)0!=o&&r.push((e.indexOf(t.charAt(n-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(t.charAt(n))>>>6-2*o);return r}},t.exports=r},5:(t,e,r)=>{var n=r(135),o=r(586),i=r(39);t.exports={XMLParser:o,XMLValidator:n,XMLBuilder:i}},410:(t,e)=>{var r=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",n="["+r+"]["+r+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",o=new RegExp("^"+n+"$");e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(t,e,r){if(e)for(var n=Object.keys(e),o=n.length,i=0;i<o;i++)t[n[i]]="strict"===r?[e[n[i]]]:e[n[i]]},e.getValue=function(t){return e.isExist(t)?t:""},e.isName=function(t){return!(null==o.exec(t))},e.getAllMatches=function(t,e){for(var r=[],n=e.exec(t);n;){var o=[];o.startIndex=e.lastIndex-n[0].length;for(var i=n.length,a=0;a<i;a++)o.push(n[a]);r.push(o),n=e.exec(t)}return r},e.nameRegexp=n},135:(t,e,r)=>{var n=r(410),o={allowBooleanAttributes:!1,unpairedTags:[]};function i(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function a(t,e){for(var r=e;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{var n=t.substr(r,e-r);if(e>5&&"xml"===n)return d("InvalidXml","XML declaration allowed only at the start of the document.",v(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function s(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){var r=1;for(e+=8;e<t.length;e++)if("<"===t[e])r++;else if(">"===t[e]&&0==--r)break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}e.validate=function(t,e){e=Object.assign({},o,e);var r,u=[],c=!1,f=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(var g=0;g<t.length;g++)if("<"===t[g]&&"?"===t[g+1]){if((g=a(t,g+=2)).err)return g}else{if("<"!==t[g]){if(i(t[g]))continue;return d("InvalidChar","char '"+t[g]+"' is not expected.",v(t,g))}var y=g;if("!"===t[++g]){g=s(t,g);continue}var m=!1;"/"===t[g]&&(m=!0,g++);for(var b="";g<t.length&&">"!==t[g]&&" "!==t[g]&&"\t"!==t[g]&&"\n"!==t[g]&&"\r"!==t[g];g++)b+=t[g];if("/"===(b=b.trim())[b.length-1]&&(b=b.substring(0,b.length-1),g--),r=b,!n.isName(r))return d("InvalidTag",0===b.trim().length?"Invalid space after '<'.":"Tag '"+b+"' is an invalid name.",v(t,g));var w=l(t,g);if(!1===w)return d("InvalidAttr","Attributes for '"+b+"' have open quote.",v(t,g));var x=w.value;if(g=w.index,"/"===x[x.length-1]){var O=g-x.length,A=h(x=x.substring(0,x.length-1),e);if(!0!==A)return d(A.err.code,A.err.msg,v(t,O+A.err.line));c=!0}else if(m){if(!w.tagClosed)return d("InvalidTag","Closing tag '"+b+"' doesn't have proper closing.",v(t,g));if(x.trim().length>0)return d("InvalidTag","Closing tag '"+b+"' can't have attributes or invalid starting.",v(t,y));var j=u.pop();if(b!==j.tagName){var P=v(t,j.tagStartPos);return d("InvalidTag","Expected closing tag '"+j.tagName+"' (opened in line "+P.line+", col "+P.col+") instead of closing tag '"+b+"'.",v(t,y))}0==u.length&&(f=!0)}else{var S=h(x,e);if(!0!==S)return d(S.err.code,S.err.msg,v(t,g-x.length+S.err.line));if(!0===f)return d("InvalidXml","Multiple possible root nodes found.",v(t,g));-1!==e.unpairedTags.indexOf(b)||u.push({tagName:b,tagStartPos:y}),c=!0}for(g++;g<t.length;g++)if("<"===t[g]){if("!"===t[g+1]){g=s(t,++g);continue}if("?"!==t[g+1])break;if((g=a(t,++g)).err)return g}else if("&"===t[g]){var E=p(t,g);if(-1==E)return d("InvalidChar","char '&' is not expected.",v(t,g));g=E}else if(!0===f&&!i(t[g]))return d("InvalidXml","Extra text at the end",v(t,g));"<"===t[g]&&g--}return c?1==u.length?d("InvalidTag","Unclosed tag '"+u[0].tagName+"'.",v(t,u[0].tagStartPos)):!(u.length>0)||d("InvalidXml","Invalid '"+JSON.stringify(u.map((function(t){return t.tagName})),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):d("InvalidXml","Start tag expected.",1)};var u='"',c="'";function l(t,e){for(var r="",n="",o=!1;e<t.length;e++){if(t[e]===u||t[e]===c)""===n?n=t[e]:n!==t[e]||(n="");else if(">"===t[e]&&""===n){o=!0;break}r+=t[e]}return""===n&&{value:r,index:e,tagClosed:o}}var f=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function h(t,e){for(var r=n.getAllMatches(t,f),o={},i=0;i<r.length;i++){if(0===r[i][1].length)return d("InvalidAttr","Attribute '"+r[i][2]+"' has no space in starting.",y(r[i]));if(void 0!==r[i][3]&&void 0===r[i][4])return d("InvalidAttr","Attribute '"+r[i][2]+"' is without value.",y(r[i]));if(void 0===r[i][3]&&!e.allowBooleanAttributes)return d("InvalidAttr","boolean attribute '"+r[i][2]+"' is not allowed.",y(r[i]));var a=r[i][2];if(!g(a))return d("InvalidAttr","Attribute '"+a+"' is an invalid name.",y(r[i]));if(o.hasOwnProperty(a))return d("InvalidAttr","Attribute '"+a+"' is repeated.",y(r[i]));o[a]=1}return!0}function p(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){var r=/\d/;for("x"===t[e]&&(e++,r=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(r))break}return-1}(t,++e);for(var r=0;e<t.length;e++,r++)if(!(t[e].match(/\w/)&&r<20)){if(";"===t[e])break;return-1}return e}function d(t,e,r){return{err:{code:t,msg:e,line:r.line||r,col:r.col}}}function g(t){return n.isName(t)}function v(t,e){var r=t.substring(0,e).split(/\r?\n/);return{line:r.length,col:r[r.length-1].length+1}}function y(t){return t.startIndex+t[1].length}},39:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=r(354),i={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function a(t){this.options=Object.assign({},i,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=c),this.processTextOrObjNode=s,this.options.format?(this.indentate=u,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function s(t,e,r){var n=this.j2x(t,r+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextValNode(t[this.options.textNodeName],e,n.attrStr,r):this.buildObjectNode(n.val,e,n.attrStr,r)}function u(t){return this.options.indentBy.repeat(t)}function c(t){return!(!t.startsWith(this.options.attributeNamePrefix)||t===this.options.textNodeName)&&t.substr(this.attrPrefixLen)}a.prototype.build=function(t){return this.options.preserveOrder?o(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(e={},n=t,(r=this.options.arrayNodeName)in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,t=e),this.j2x(t,0).val);var e,r,n},a.prototype.j2x=function(t,e){var r="",o="";for(var i in t)if(void 0===t[i])this.isAttribute(i)&&(o+="");else if(null===t[i])this.isAttribute(i)?o+="":"?"===i[0]?o+=this.indentate(e)+"<"+i+"?"+this.tagEndChar:o+=this.indentate(e)+"<"+i+"/"+this.tagEndChar;else if(t[i]instanceof Date)o+=this.buildTextValNode(t[i],i,"",e);else if("object"!==n(t[i])){var a=this.isAttribute(i);if(a)r+=this.buildAttrPairStr(a,""+t[i]);else if(i===this.options.textNodeName){var s=this.options.tagValueProcessor(i,""+t[i]);o+=this.replaceEntitiesValue(s)}else o+=this.buildTextValNode(t[i],i,"",e)}else if(Array.isArray(t[i])){for(var u=t[i].length,c="",l=0;l<u;l++){var f=t[i][l];void 0===f||(null===f?"?"===i[0]?o+=this.indentate(e)+"<"+i+"?"+this.tagEndChar:o+=this.indentate(e)+"<"+i+"/"+this.tagEndChar:"object"===n(f)?this.options.oneListGroup?c+=this.j2x(f,e+1).val:c+=this.processTextOrObjNode(f,i,e):c+=this.buildTextValNode(f,i,"",e))}this.options.oneListGroup&&(c=this.buildObjectNode(c,i,"",e)),o+=c}else if(this.options.attributesGroupName&&i===this.options.attributesGroupName)for(var h=Object.keys(t[i]),p=h.length,d=0;d<p;d++)r+=this.buildAttrPairStr(h[d],""+t[i][h[d]]);else o+=this.processTextOrObjNode(t[i],i,e);return{attrStr:r,val:o}},a.prototype.buildAttrPairStr=function(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'},a.prototype.buildObjectNode=function(t,e,r,n){if(""===t)return"?"===e[0]?this.indentate(n)+"<"+e+r+"?"+this.tagEndChar:this.indentate(n)+"<"+e+r+this.closeTag(e)+this.tagEndChar;var o="</"+e+this.tagEndChar,i="";return"?"===e[0]&&(i="?",o=""),!r&&""!==r||-1!==t.indexOf("<")?!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===i.length?this.indentate(n)+"\x3c!--".concat(t,"--\x3e")+this.newLine:this.indentate(n)+"<"+e+r+i+this.tagEndChar+t+this.indentate(n)+o:this.indentate(n)+"<"+e+r+i+">"+t+o},a.prototype.closeTag=function(t){var e="";return-1!==this.options.unpairedTags.indexOf(t)?this.options.suppressUnpairedNode||(e="/"):e=this.options.suppressEmptyNode?"/":"></".concat(t),e},a.prototype.buildTextValNode=function(t,e,r,n){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(n)+"<![CDATA[".concat(t,"]]>")+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(n)+"\x3c!--".concat(t,"--\x3e")+this.newLine;if("?"===e[0])return this.indentate(n)+"<"+e+r+"?"+this.tagEndChar;var o=this.options.tagValueProcessor(e,t);return""===(o=this.replaceEntitiesValue(o))?this.indentate(n)+"<"+e+r+this.closeTag(e)+this.tagEndChar:this.indentate(n)+"<"+e+r+">"+o+"</"+e+this.tagEndChar},a.prototype.replaceEntitiesValue=function(t){if(t&&t.length>0&&this.options.processEntities)for(var e=0;e<this.options.entities.length;e++){var r=this.options.entities[e];t=t.replace(r.regex,r.val)}return t},t.exports=a},354:t=>{function e(t,a,s,u){for(var c="",l=!1,f=0;f<t.length;f++){var h,p=t[f],d=r(p);if(h=0===s.length?d:"".concat(s,".").concat(d),d!==a.textNodeName)if(d!==a.cdataPropName)if(d!==a.commentPropName)if("?"!==d[0]){var g=u;""!==g&&(g+=a.indentBy);var v=n(p[":@"],a),y=u+"<".concat(d).concat(v),m=e(p[d],a,h,g);-1!==a.unpairedTags.indexOf(d)?a.suppressUnpairedNode?c+=y+">":c+=y+"/>":m&&0!==m.length||!a.suppressEmptyNode?m&&m.endsWith(">")?c+=y+">".concat(m).concat(u,"</").concat(d,">"):(c+=y+">",m&&""!==u&&(m.includes("/>")||m.includes("</"))?c+=u+a.indentBy+m+u:c+=m,c+="</".concat(d,">")):c+=y+"/>",l=!0}else{var b=n(p[":@"],a),w="?xml"===d?"":u,x=p[d][0][a.textNodeName];x=0!==x.length?" "+x:"",c+=w+"<".concat(d).concat(x).concat(b,"?>"),l=!0}else c+=u+"\x3c!--".concat(p[d][0][a.textNodeName],"--\x3e"),l=!0;else l&&(c+=u),c+="<![CDATA[".concat(p[d][0][a.textNodeName],"]]>"),l=!1;else{var O=p[d];o(h,a)||(O=i(O=a.tagValueProcessor(d,O),a)),l&&(c+=u),c+=O,l=!1}}return c}function r(t){for(var e=Object.keys(t),r=0;r<e.length;r++){var n=e[r];if(":@"!==n)return n}}function n(t,e){var r="";if(t&&!e.ignoreAttributes)for(var n in t){var o=e.attributeValueProcessor(n,t[n]);!0===(o=i(o,e))&&e.suppressBooleanAttributes?r+=" ".concat(n.substr(e.attributeNamePrefix.length)):r+=" ".concat(n.substr(e.attributeNamePrefix.length),'="').concat(o,'"')}return r}function o(t,e){var r=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(var n in e.stopNodes)if(e.stopNodes[n]===t||e.stopNodes[n]==="*."+r)return!0;return!1}function i(t,e){if(t&&t.length>0&&e.processEntities)for(var r=0;r<e.entities.length;r++){var n=e.entities[r];t=t.replace(n.regex,n.val)}return t}t.exports=function(t,r){var n="";return r.format&&r.indentBy.length>0&&(n="\n"),e(t,r,"",n)}},895:(t,e,r)=>{function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r(410);function a(t,e){for(var r="";e<t.length&&"'"!==t[e]&&'"'!==t[e];e++)r+=t[e];if(-1!==(r=r.trim()).indexOf(" "))throw new Error("External entites are not supported");for(var n=t[e++],o="";e<t.length&&t[e]!==n;e++)o+=t[e];return[r,o,e]}function s(t,e){return"!"===t[e+1]&&"-"===t[e+2]&&"-"===t[e+3]}function u(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7]}function c(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8]}function l(t,e){return"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8]}function f(t,e){return"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9]}function h(t){if(i.isName(t))return t;throw new Error("Invalid entity name ".concat(t))}t.exports=function(t,e){var r={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");e+=9;for(var o=1,i=!1,p=!1;e<t.length;e++)if("<"!==t[e]||p)if(">"===t[e]){if(p?"-"===t[e-1]&&"-"===t[e-2]&&(p=!1,o--):o--,0===o)break}else"["===t[e]?i=!0:t[e];else{if(i&&u(t,e)){var d=n(a(t,(e+=7)+1),3);entityName=d[0],val=d[1],e=d[2],-1===val.indexOf("&")&&(r[h(entityName)]={regx:RegExp("&".concat(entityName,";"),"g"),val})}else if(i&&c(t,e))e+=8;else if(i&&l(t,e))e+=8;else if(i&&f(t,e))e+=9;else{if(!s)throw new Error("Invalid DOCTYPE");p=!0}o++}if(0!==o)throw new Error("Unclosed DOCTYPE");return{entities:r,i:e}}},282:(t,e)=>{var r={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:function(){return!1},commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(t,e,r){return t}};e.buildOptions=function(t){return Object.assign({},r,t)},e.defaultOptions=r},502:(t,e,r)=>{function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t,e,r){return e&&i(t.prototype,e),r&&i(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}var s=r(410),u=r(961),c=r(895),l=r(512),f=("<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,s.nameRegexp),a((function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.options=e,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=h,this.parseXml=y,this.parseTextData=p,this.resolveNameSpace=d,this.buildAttributesMap=v,this.isItStopNode=x,this.replaceEntitiesValue=b,this.readStopNodeData=j,this.saveTextToParentTag=w,this.addChild=m})));function h(t){for(var e=Object.keys(t),r=0;r<e.length;r++){var n=e[r];this.lastEntities[n]={regex:new RegExp("&"+n+";","g"),val:t[n]}}}function p(t,e,r,n,i,a,s){if(void 0!==t&&(this.options.trimValues&&!n&&(t=t.trim()),t.length>0)){s||(t=this.replaceEntitiesValue(t));var u=this.options.tagValueProcessor(e,t,r,i,a);return null==u?t:o(u)!==o(t)||u!==t?u:this.options.trimValues||t.trim()===t?P(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function d(t){if(this.options.removeNSPrefix){var e=t.split(":"),r="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=r+e[1])}return t}var g=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function v(t,e,r){if(!this.options.ignoreAttributes&&"string"==typeof t){for(var n=s.getAllMatches(t,g),i=n.length,a={},u=0;u<i;u++){var c=this.resolveNameSpace(n[u][1]),l=n[u][4],f=this.options.attributeNamePrefix+c;if(c.length)if(this.options.transformAttributeName&&(f=this.options.transformAttributeName(f)),"__proto__"===f&&(f="#__proto__"),void 0!==l){this.options.trimValues&&(l=l.trim()),l=this.replaceEntitiesValue(l);var h=this.options.attributeValueProcessor(c,l,e);null==h?a[f]=l:o(h)!==o(l)||h!==l?a[f]=h:a[f]=P(l,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(a[f]=!0)}if(!Object.keys(a).length)return;if(this.options.attributesGroupName){var p={};return p[this.options.attributesGroupName]=a,p}return a}}var y=function(t){t=t.replace(/\r\n?/g,"\n");for(var e=new u("!xml"),r=e,o="",i="",a=0;a<t.length;a++)if("<"===t[a])if("/"===t[a+1]){var s=O(t,">",a,"Closing Tag is not closed."),l=t.substring(a+2,s).trim();if(this.options.removeNSPrefix){var f=l.indexOf(":");-1!==f&&(l=l.substr(f+1))}this.options.transformTagName&&(l=this.options.transformTagName(l)),r&&(o=this.saveTextToParentTag(o,r,i));var h=i.substring(i.lastIndexOf(".")+1);if(l&&-1!==this.options.unpairedTags.indexOf(l))throw new Error("Unpaired tag can not be used as closing tag: </".concat(l,">"));var p=0;h&&-1!==this.options.unpairedTags.indexOf(h)?(p=i.lastIndexOf(".",i.lastIndexOf(".")-1),this.tagsNodeStack.pop()):p=i.lastIndexOf("."),i=i.substring(0,p),r=this.tagsNodeStack.pop(),o="",a=s}else if("?"===t[a+1]){var d=A(t,a,!1,"?>");if(!d)throw new Error("Pi Tag is not closed.");if(o=this.saveTextToParentTag(o,r,i),this.options.ignoreDeclaration&&"?xml"===d.tagName||this.options.ignorePiTags);else{var g=new u(d.tagName);g.add(this.options.textNodeName,""),d.tagName!==d.tagExp&&d.attrExpPresent&&(g[":@"]=this.buildAttributesMap(d.tagExp,i,d.tagName)),this.addChild(r,g,i)}a=d.closeIndex+1}else if("!--"===t.substr(a+1,3)){var v=O(t,"--\x3e",a+4,"Comment is not closed.");if(this.options.commentPropName){var y=t.substring(a+4,v-2);o=this.saveTextToParentTag(o,r,i),r.add(this.options.commentPropName,[n({},this.options.textNodeName,y)])}a=v}else if("!D"===t.substr(a+1,2)){var m=c(t,a);this.docTypeEntities=m.entities,a=m.i}else if("!["===t.substr(a+1,2)){var b=O(t,"]]>",a,"CDATA is not closed.")-2,w=t.substring(a+9,b);if(o=this.saveTextToParentTag(o,r,i),this.options.cdataPropName)r.add(this.options.cdataPropName,[n({},this.options.textNodeName,w)]);else{var x=this.parseTextData(w,r.tagname,i,!0,!1,!0);null==x&&(x=""),r.add(this.options.textNodeName,x)}a=b+2}else{var j=A(t,a,this.options.removeNSPrefix),P=j.tagName,S=j.tagExp,E=j.attrExpPresent,N=j.closeIndex;this.options.transformTagName&&(P=this.options.transformTagName(P)),r&&o&&"!xml"!==r.tagname&&(o=this.saveTextToParentTag(o,r,i,!1));var T=r;if(T&&-1!==this.options.unpairedTags.indexOf(T.tagname)&&(r=this.tagsNodeStack.pop(),i=i.substring(0,i.lastIndexOf("."))),P!==e.tagname&&(i+=i?"."+P:P),this.isItStopNode(this.options.stopNodes,i,P)){var k="";if(S.length>0&&S.lastIndexOf("/")===S.length-1)a=j.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(P))a=j.closeIndex;else{var C=this.readStopNodeData(t,P,N+1);if(!C)throw new Error("Unexpected end of ".concat(P));a=C.i,k=C.tagContent}var I=new u(P);P!==S&&E&&(I[":@"]=this.buildAttributesMap(S,i,P)),k&&(k=this.parseTextData(k,P,i,!0,E,!0,!0)),i=i.substr(0,i.lastIndexOf(".")),I.add(this.options.textNodeName,k),this.addChild(r,I,i)}else{if(S.length>0&&S.lastIndexOf("/")===S.length-1){"/"===P[P.length-1]?(P=P.substr(0,P.length-1),i=i.substr(0,i.length-1),S=P):S=S.substr(0,S.length-1),this.options.transformTagName&&(P=this.options.transformTagName(P));var _=new u(P);P!==S&&E&&(_[":@"]=this.buildAttributesMap(S,i,P)),this.addChild(r,_,i),i=i.substr(0,i.lastIndexOf("."))}else{var R=new u(P);this.tagsNodeStack.push(r),P!==S&&E&&(R[":@"]=this.buildAttributesMap(S,i,P)),this.addChild(r,R,i),r=R}o="",a=N}}else o+=t[a];return e.child};function m(t,e,r){var n=this.options.updateTag(e.tagname,r,e[":@"]);!1===n||("string"==typeof n?(e.tagname=n,t.addChild(e)):t.addChild(e))}var b=function(t){if(this.options.processEntities){for(var e in this.docTypeEntities){var r=this.docTypeEntities[e];t=t.replace(r.regx,r.val)}for(var n in this.lastEntities){var o=this.lastEntities[n];t=t.replace(o.regex,o.val)}if(this.options.htmlEntities)for(var i in this.htmlEntities){var a=this.htmlEntities[i];t=t.replace(a.regex,a.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function w(t,e,r,n){return t&&(void 0===n&&(n=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,r,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,n))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function x(t,e,r){var n="*."+r;for(var o in t){var i=t[o];if(n===i||e===i)return!0}return!1}function O(t,e,r,n){var o=t.indexOf(e,r);if(-1===o)throw new Error(n);return o+e.length-1}function A(t,e,r){var n=function(t,e){for(var r,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:">",o="",i=e;i<t.length;i++){var a=t[i];if(r)a===r&&(r="");else if('"'===a||"'"===a)r=a;else if(a===n[0]){if(!n[1])return{data:o,index:i};if(t[i+1]===n[1])return{data:o,index:i}}else"\t"===a&&(a=" ");o+=a}}(t,e+1,arguments.length>3&&void 0!==arguments[3]?arguments[3]:">");if(n){var o=n.data,i=n.index,a=o.search(/\s/),s=o,u=!0;if(-1!==a&&(s=o.substr(0,a).replace(/\s\s*$/,""),o=o.substr(a+1)),r){var c=s.indexOf(":");-1!==c&&(u=(s=s.substr(c+1))!==n.data.substr(c+1))}return{tagName:s,tagExp:o,closeIndex:i,attrExpPresent:u}}}function j(t,e,r){for(var n=r,o=1;r<t.length;r++)if("<"===t[r])if("/"===t[r+1]){var i=O(t,">",r,"".concat(e," is not closed"));if(t.substring(r+2,i).trim()===e&&0==--o)return{tagContent:t.substring(n,r),i};r=i}else if("?"===t[r+1])r=O(t,"?>",r+1,"StopNode is not closed.");else if("!--"===t.substr(r+1,3))r=O(t,"--\x3e",r+3,"StopNode is not closed.");else if("!["===t.substr(r+1,2))r=O(t,"]]>",r,"StopNode is not closed.")-2;else{var a=A(t,r,">");a&&((a&&a.tagName)===e&&"/"!==a.tagExp[a.tagExp.length-1]&&o++,r=a.closeIndex)}}function P(t,e,r){if(e&&"string"==typeof t){var n=t.trim();return"true"===n||"false"!==n&&l(t,r)}return s.isExist(t)?t:""}t.exports=f},586:(t,e,r)=>{function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var o=r(282).buildOptions,i=r(502),a=r(869).prettify,s=r(135),u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.externalEntities={},this.options=o(e)}var e,r;return e=t,(r=[{key:"parse",value:function(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});var r=s.validate(t,e);if(!0!==r)throw Error("".concat(r.err.msg,":").concat(r.err.line,":").concat(r.err.col))}var n=new i(this.options);n.addExternalEntities(this.externalEntities);var o=n.parseXml(t);return this.options.preserveOrder||void 0===o?o:a(o,this.options)}},{key:"addEntity",value:function(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}}])&&n(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();t.exports=u},869:(t,e)=>{function r(t,e,a){for(var s,u={},c=0;c<t.length;c++){var l,f=t[c],h=n(f);if(l=void 0===a?h:a+"."+h,h===e.textNodeName)void 0===s?s=f[h]:s+=""+f[h];else{if(void 0===h)continue;if(f[h]){var p=r(f[h],e,l),d=i(p,e);f[":@"]?o(p,f[":@"],l,e):1!==Object.keys(p).length||void 0===p[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(p).length&&(e.alwaysCreateTextNode?p[e.textNodeName]="":p=""):p=p[e.textNodeName],void 0!==u[h]&&u.hasOwnProperty(h)?(Array.isArray(u[h])||(u[h]=[u[h]]),u[h].push(p)):e.isArray(h,l,d)?u[h]=[p]:u[h]=p}}}return"string"==typeof s?s.length>0&&(u[e.textNodeName]=s):void 0!==s&&(u[e.textNodeName]=s),u}function n(t){for(var e=Object.keys(t),r=0;r<e.length;r++){var n=e[r];if(":@"!==n)return n}}function o(t,e,r,n){if(e)for(var o=Object.keys(e),i=o.length,a=0;a<i;a++){var s=o[a];n.isArray(s,r+"."+s,!0,!0)?t[s]=[e[s]]:t[s]=e[s]}}function i(t,e){var r=e.textNodeName,n=Object.keys(t).length;return 0===n||!(1!==n||!t[r]&&"boolean"!=typeof t[r]&&0!==t[r])}e.prettify=function(t,e){return r(t,e)}},961:t=>{function e(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var n=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.tagname=e,this.child=[],this[":@"]={}}var n,o;return n=t,(o=[{key:"add",value:function(t,r){"__proto__"===t&&(t="#__proto__"),this.child.push(e({},t,r))}},{key:"addChild",value:function(t){var r;"__proto__"===t.tagname&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push((e(r={},t.tagname,t.child),e(r,":@",t[":@"]),r)):this.child.push(e({},t.tagname,t.child))}}])&&r(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),t}();t.exports=n},163:t=>{function e(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}t.exports=function(t){return null!=t&&(e(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&e(t.slice(0,0))}(t)||!!t._isBuffer)}},243:(t,e,r)=>{var n,o,i,a,s;n=r(718),o=r(106).utf8,i=r(163),a=r(106).bin,(s=function t(e,r){e.constructor==String?e=r&&"binary"===r.encoding?a.stringToBytes(e):o.stringToBytes(e):i(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||e.constructor===Uint8Array||(e=e.toString());for(var s=n.bytesToWords(e),u=8*e.length,c=1732584193,l=-271733879,f=-1732584194,h=271733878,p=0;p<s.length;p++)s[p]=16711935&(s[p]<<8|s[p]>>>24)|4278255360&(s[p]<<24|s[p]>>>8);s[u>>>5]|=128<<u%32,s[14+(u+64>>>9<<4)]=u;var d=t._ff,g=t._gg,v=t._hh,y=t._ii;for(p=0;p<s.length;p+=16){var m=c,b=l,w=f,x=h;c=d(c,l,f,h,s[p+0],7,-680876936),h=d(h,c,l,f,s[p+1],12,-389564586),f=d(f,h,c,l,s[p+2],17,606105819),l=d(l,f,h,c,s[p+3],22,-1044525330),c=d(c,l,f,h,s[p+4],7,-176418897),h=d(h,c,l,f,s[p+5],12,1200080426),f=d(f,h,c,l,s[p+6],17,-1473231341),l=d(l,f,h,c,s[p+7],22,-45705983),c=d(c,l,f,h,s[p+8],7,1770035416),h=d(h,c,l,f,s[p+9],12,-1958414417),f=d(f,h,c,l,s[p+10],17,-42063),l=d(l,f,h,c,s[p+11],22,-1990404162),c=d(c,l,f,h,s[p+12],7,1804603682),h=d(h,c,l,f,s[p+13],12,-40341101),f=d(f,h,c,l,s[p+14],17,-1502002290),c=g(c,l=d(l,f,h,c,s[p+15],22,1236535329),f,h,s[p+1],5,-165796510),h=g(h,c,l,f,s[p+6],9,-1069501632),f=g(f,h,c,l,s[p+11],14,643717713),l=g(l,f,h,c,s[p+0],20,-373897302),c=g(c,l,f,h,s[p+5],5,-701558691),h=g(h,c,l,f,s[p+10],9,38016083),f=g(f,h,c,l,s[p+15],14,-660478335),l=g(l,f,h,c,s[p+4],20,-405537848),c=g(c,l,f,h,s[p+9],5,568446438),h=g(h,c,l,f,s[p+14],9,-1019803690),f=g(f,h,c,l,s[p+3],14,-187363961),l=g(l,f,h,c,s[p+8],20,1163531501),c=g(c,l,f,h,s[p+13],5,-1444681467),h=g(h,c,l,f,s[p+2],9,-51403784),f=g(f,h,c,l,s[p+7],14,1735328473),c=v(c,l=g(l,f,h,c,s[p+12],20,-1926607734),f,h,s[p+5],4,-378558),h=v(h,c,l,f,s[p+8],11,-2022574463),f=v(f,h,c,l,s[p+11],16,1839030562),l=v(l,f,h,c,s[p+14],23,-35309556),c=v(c,l,f,h,s[p+1],4,-1530992060),h=v(h,c,l,f,s[p+4],11,1272893353),f=v(f,h,c,l,s[p+7],16,-155497632),l=v(l,f,h,c,s[p+10],23,-1094730640),c=v(c,l,f,h,s[p+13],4,681279174),h=v(h,c,l,f,s[p+0],11,-358537222),f=v(f,h,c,l,s[p+3],16,-722521979),l=v(l,f,h,c,s[p+6],23,76029189),c=v(c,l,f,h,s[p+9],4,-640364487),h=v(h,c,l,f,s[p+12],11,-421815835),f=v(f,h,c,l,s[p+15],16,530742520),c=y(c,l=v(l,f,h,c,s[p+2],23,-995338651),f,h,s[p+0],6,-198630844),h=y(h,c,l,f,s[p+7],10,1126891415),f=y(f,h,c,l,s[p+14],15,-1416354905),l=y(l,f,h,c,s[p+5],21,-57434055),c=y(c,l,f,h,s[p+12],6,1700485571),h=y(h,c,l,f,s[p+3],10,-1894986606),f=y(f,h,c,l,s[p+10],15,-1051523),l=y(l,f,h,c,s[p+1],21,-2054922799),c=y(c,l,f,h,s[p+8],6,1873313359),h=y(h,c,l,f,s[p+15],10,-30611744),f=y(f,h,c,l,s[p+6],15,-1560198380),l=y(l,f,h,c,s[p+13],21,1309151649),c=y(c,l,f,h,s[p+4],6,-145523070),h=y(h,c,l,f,s[p+11],10,-1120210379),f=y(f,h,c,l,s[p+2],15,718787259),l=y(l,f,h,c,s[p+9],21,-343485551),c=c+m>>>0,l=l+b>>>0,f=f+w>>>0,h=h+x>>>0}return n.endian([c,l,f,h])})._ff=function(t,e,r,n,o,i,a){var s=t+(e&r|~e&n)+(o>>>0)+a;return(s<<i|s>>>32-i)+e},s._gg=function(t,e,r,n,o,i,a){var s=t+(e&n|r&~n)+(o>>>0)+a;return(s<<i|s>>>32-i)+e},s._hh=function(t,e,r,n,o,i,a){var s=t+(e^r^n)+(o>>>0)+a;return(s<<i|s>>>32-i)+e},s._ii=function(t,e,r,n,o,i,a){var s=t+(r^(e|~n))+(o>>>0)+a;return(s<<i|s>>>32-i)+e},s._blocksize=16,s._digestsize=16,t.exports=function(t,e){if(null==t)throw new Error("Illegal argument "+t);var r=n.wordsToBytes(s(t,e));return e&&e.asBytes?r:e&&e.asString?a.bytesToString(r):n.bytesToHex(r)}},637:(t,e,r)=>{var n=r(584);t.exports=function(t){return t?("{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2)),v(function(t){return t.split("\\\\").join(o).split("\\{").join(i).split("\\}").join(a).split("\\,").join(s).split("\\.").join(u)}(t),!0).map(l)):[]};var o="\0SLASH"+Math.random()+"\0",i="\0OPEN"+Math.random()+"\0",a="\0CLOSE"+Math.random()+"\0",s="\0COMMA"+Math.random()+"\0",u="\0PERIOD"+Math.random()+"\0";function c(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function l(t){return t.split(o).join("\\").split(i).join("{").split(a).join("}").split(s).join(",").split(u).join(".")}function f(t){if(!t)return[""];var e=[],r=n("{","}",t);if(!r)return t.split(",");var o=r.pre,i=r.body,a=r.post,s=o.split(",");s[s.length-1]+="{"+i+"}";var u=f(a);return a.length&&(s[s.length-1]+=u.shift(),s.push.apply(s,u)),e.push.apply(e,s),e}function h(t){return"{"+t+"}"}function p(t){return/^-?0\d/.test(t)}function d(t,e){return t<=e}function g(t,e){return t>=e}function v(t,e){var r=[],o=n("{","}",t);if(!o)return[t];var i=o.pre,s=o.post.length?v(o.post,!1):[""];if(/\$$/.test(o.pre))for(var u=0;u<s.length;u++){var l=i+"{"+o.body+"}"+s[u];r.push(l)}else{var y,m,b=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(o.body),w=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(o.body),x=b||w,O=o.body.indexOf(",")>=0;if(!x&&!O)return o.post.match(/,.*\}/)?v(t=o.pre+"{"+o.body+a+o.post):[t];if(x)y=o.body.split(/\.\./);else if(1===(y=f(o.body)).length&&1===(y=v(y[0],!1).map(h)).length)return s.map((function(t){return o.pre+y[0]+t}));if(x){var A=c(y[0]),j=c(y[1]),P=Math.max(y[0].length,y[1].length),S=3==y.length?Math.abs(c(y[2])):1,E=d;j<A&&(S*=-1,E=g);var N=y.some(p);m=[];for(var T=A;E(T,j);T+=S){var k;if(w)"\\"===(k=String.fromCharCode(T))&&(k="");else if(k=String(T),N){var C=P-k.length;if(C>0){var I=new Array(C+1).join("0");k=T<0?"-"+I+k.slice(1):I+k}}m.push(k)}}else{m=[];for(var _=0;_<y.length;_++)m.push.apply(m,v(y[_],!1))}for(_=0;_<m.length;_++)for(u=0;u<s.length;u++)l=i+m[_]+s[u],(!e||x||l)&&r.push(l)}return r}},421:t=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function r(t){var e="function"==typeof Map?new Map:void 0;return r=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,a)}function a(){return n(t,arguments,i(this).constructor)}return a.prototype=Object.create(t.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),o(a,t)},r(t)}function n(t,e,r){return n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var i=new(Function.bind.apply(t,n));return r&&o(i,r.prototype),i},n.apply(null,arguments)}function o(t,e){return o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}function i(t){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},i(t)}var a="+",s=function(t){function r(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),(n=function(t,r){return!r||"object"!==e(r)&&"function"!=typeof r?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):r}(this,i(r).call(this,t))).name="ObjectPrototypeMutationError",n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t),r}(r(Error));function u(t,r){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=r.split("."),i=o.length,s=function(e){var r=o[e];if(!t)return{v:void 0};if(r===a){if(Array.isArray(t))return{v:t.map((function(r,i){var a=o.slice(e+1);return a.length>0?u(r,a.join("."),n):n(t,i,o,e)}))};var i=o.slice(0,e).join(".");throw new Error("Object at wildcard (".concat(i,") is not an array"))}t=n(t,r,o,e)},c=0;c<i;c++){var l=s(c);if("object"===e(l))return l.v}return t}function c(t,e){return t.length===e+1}t.exports={set:function(t,r,n){if("object"!=e(t)||null===t)return t;if(void 0===r)return t;if("number"==typeof r)return t[r]=n,t[r];try{return u(t,r,(function(t,e,r,o){if(t===Reflect.getPrototypeOf({}))throw new s("Attempting to mutate Object.prototype");if(!t[e]){var i=Number.isInteger(Number(r[o+1])),u=r[o+1]===a;t[e]=i||u?[]:{}}return c(r,o)&&(t[e]=n),t[e]}))}catch(e){if(e instanceof s)throw e;return t}},get:function(t,r){if("object"!=e(t)||null===t)return t;if(void 0===r)return t;if("number"==typeof r)return t[r];try{return u(t,r,(function(t,e){return t[e]}))}catch(e){return t}},has:function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("object"!=e(t)||null===t)return!1;if(void 0===r)return!1;if("number"==typeof r)return r in t;try{var o=!1;return u(t,r,(function(t,e,r,i){if(!c(r,i))return t&&t[e];o=n.own?t.hasOwnProperty(e):e in t})),o}catch(t){return!1}},hasOwn:function(t,e,r){return this.has(t,e,r||{own:!0})},isIn:function(t,r,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if("object"!=e(t)||null===t)return!1;if(void 0===r)return!1;try{var i=!1,a=!1;return u(t,r,(function(t,r,o,s){return i=i||t===n||!!t&&t[r]===n,a=c(o,s)&&"object"===e(t)&&r in t,t&&t[r]})),o.validPath?i&&a:i}catch(t){return!1}},ObjectPrototypeMutationError:s}},441:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=r(930),i=function(t){return"string"==typeof t};function a(t,e){for(var r=[],n=0;n<t.length;n++){var o=t[n];o&&"."!==o&&(".."===o?r.length&&".."!==r[r.length-1]?r.pop():e&&r.push(".."):r.push(o))}return r}var s=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,u={};function c(t){return s.exec(t).slice(1)}u.resolve=function(){for(var t="",e=!1,r=arguments.length-1;r>=-1&&!e;r--){var n=r>=0?arguments[r]:process.cwd();if(!i(n))throw new TypeError("Arguments to path.resolve must be strings");n&&(t=n+"/"+t,e="/"===n.charAt(0))}return(e?"/":"")+(t=a(t.split("/"),!e).join("/"))||"."},u.normalize=function(t){var e=u.isAbsolute(t),r="/"===t.substr(-1);return(t=a(t.split("/"),!e).join("/"))||e||(t="."),t&&r&&(t+="/"),(e?"/":"")+t},u.isAbsolute=function(t){return"/"===t.charAt(0)},u.join=function(){for(var t="",e=0;e<arguments.length;e++){var r=arguments[e];if(!i(r))throw new TypeError("Arguments to path.join must be strings");r&&(t+=t?"/"+r:r)}return u.normalize(t)},u.relative=function(t,e){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var r=t.length-1;r>=0&&""===t[r];r--);return e>r?[]:t.slice(e,r+1)}t=u.resolve(t).substr(1),e=u.resolve(e).substr(1);for(var n=r(t.split("/")),o=r(e.split("/")),i=Math.min(n.length,o.length),a=i,s=0;s<i;s++)if(n[s]!==o[s]){a=s;break}var c=[];for(s=a;s<n.length;s++)c.push("..");return(c=c.concat(o.slice(a))).join("/")},u._makeLong=function(t){return t},u.dirname=function(t){var e=c(t),r=e[0],n=e[1];return r||n?(n&&(n=n.substr(0,n.length-1)),r+n):"."},u.basename=function(t,e){var r=c(t)[2];return e&&r.substr(-1*e.length)===e&&(r=r.substr(0,r.length-e.length)),r},u.extname=function(t){return c(t)[3]},u.format=function(t){if(!o.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+n(t));var e=t.root||"";if(!i(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+n(t.root));return(t.dir?t.dir+u.sep:"")+(t.base||"")},u.parse=function(t){if(!i(t))throw new TypeError("Parameter 'pathString' must be a string, not "+n(t));var e=c(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return e[1]=e[1]||"",e[2]=e[2]||"",e[3]=e[3]||"",{root:e[0],dir:e[0]+e[1].slice(0,e[1].length-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},u.sep="/",u.delimiter=":",t.exports=u},361:(t,e)=>{var r=Object.prototype.hasOwnProperty;function n(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(t){return null}}function o(t){try{return encodeURIComponent(t)}catch(t){return null}}e.stringify=function(t,e){e=e||"";var n,i,a=[];for(i in"string"!=typeof e&&(e="?"),t)if(r.call(t,i)){if((n=t[i])||null!=n&&!isNaN(n)||(n=""),i=o(i),n=o(n),null===i||null===n)continue;a.push(i+"="+n)}return a.length?e+a.join("&"):""},e.parse=function(t){for(var e,r=/([^=?#&]+)=?([^&]*)/g,o={};e=r.exec(t);){var i=n(e[1]),a=n(e[2]);null===i||null===a||i in o||(o[i]=a)}return o}},620:t=>{t.exports=function(t,e){if(e=e.split(":")[0],!(t=+t))return!1;switch(e){case"http":case"ws":return 80!==t;case"https":case"wss":return 443!==t;case"ftp":return 21!==t;case"gopher":return 70!==t;case"file":return!1}return 0!==t}},512:t=>{var e=/^[-+]?0x[a-fA-F0-9]+$/,r=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);var n={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};t.exports=function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(o=Object.assign({},n,o),!t||"string"!=typeof t)return t;var i=t.trim();if(void 0!==o.skipLike&&o.skipLike.test(i))return t;if(o.hex&&e.test(i))return Number.parseInt(i,16);var a=r.exec(i);if(a){var s=a[1],u=a[2],c=function(t){return t&&-1!==t.indexOf(".")?("."===(t=t.replace(/0+$/,""))?t="0":"."===t[0]?t="0"+t:"."===t[t.length-1]&&(t=t.substr(0,t.length-1)),t):t}(a[3]),l=a[4]||a[6];if(!o.leadingZeros&&u.length>0&&s&&"."!==i[2])return t;if(!o.leadingZeros&&u.length>0&&!s&&"."!==i[1])return t;var f=Number(i),h=""+f;return-1!==h.search(/[eE]/)||l?o.eNotation?f:t:-1!==i.indexOf(".")?"0"===h&&""===c||h===c||s&&h==="-"+c?f:t:u?c===h||s+c===h?f:t:i===h||i===s+h?f:t}return t}},95:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=r(620),i=r(361),a=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,s=/[\n\r\t]/g,u=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,c=/:\d+$/,l=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,f=/^[a-zA-Z]:/;function h(t){return(t||"").toString().replace(a,"")}var p=[["#","hash"],["?","query"],function(t,e){return v(e.protocol)?t.replace(/\\/g,"/"):t},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],d={hash:1,query:1};function g(t){var e,r=("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}).location||{},o={},i=n(t=t||r);if("blob:"===t.protocol)o=new m(unescape(t.pathname),{});else if("string"===i)for(e in o=new m(t,{}),d)delete o[e];else if("object"===i){for(e in t)e in d||(o[e]=t[e]);void 0===o.slashes&&(o.slashes=u.test(t.href))}return o}function v(t){return"file:"===t||"ftp:"===t||"http:"===t||"https:"===t||"ws:"===t||"wss:"===t}function y(t,e){t=(t=h(t)).replace(s,""),e=e||{};var r,n=l.exec(t),o=n[1]?n[1].toLowerCase():"",i=!!n[2],a=!!n[3],u=0;return i?a?(r=n[2]+n[3]+n[4],u=n[2].length+n[3].length):(r=n[2]+n[4],u=n[2].length):a?(r=n[3]+n[4],u=n[3].length):r=n[4],"file:"===o?u>=2&&(r=r.slice(2)):v(o)?r=n[4]:o?i&&(r=r.slice(2)):u>=2&&v(e.protocol)&&(r=n[4]),{protocol:o,slashes:i||v(o),slashesCount:u,rest:r}}function m(t,e,r){if(t=(t=h(t)).replace(s,""),!(this instanceof m))return new m(t,e,r);var a,u,c,l,d,b,w=p.slice(),x=n(e),O=this,A=0;for("object"!==x&&"string"!==x&&(r=e,e=null),r&&"function"!=typeof r&&(r=i.parse),a=!(u=y(t||"",e=g(e))).protocol&&!u.slashes,O.slashes=u.slashes||a&&e.slashes,O.protocol=u.protocol||e.protocol||"",t=u.rest,("file:"===u.protocol&&(2!==u.slashesCount||f.test(t))||!u.slashes&&(u.protocol||u.slashesCount<2||!v(O.protocol)))&&(w[3]=[/(.*)/,"pathname"]);A<w.length;A++)"function"!=typeof(l=w[A])?(c=l[0],b=l[1],c!=c?O[b]=t:"string"==typeof c?~(d="@"===c?t.lastIndexOf(c):t.indexOf(c))&&("number"==typeof l[2]?(O[b]=t.slice(0,d),t=t.slice(d+l[2])):(O[b]=t.slice(d),t=t.slice(0,d))):(d=c.exec(t))&&(O[b]=d[1],t=t.slice(0,d.index)),O[b]=O[b]||a&&l[3]&&e[b]||"",l[4]&&(O[b]=O[b].toLowerCase())):t=l(t,O);r&&(O.query=r(O.query)),a&&e.slashes&&"/"!==O.pathname.charAt(0)&&(""!==O.pathname||""!==e.pathname)&&(O.pathname=function(t,e){if(""===t)return e;for(var r=(e||"/").split("/").slice(0,-1).concat(t.split("/")),n=r.length,o=r[n-1],i=!1,a=0;n--;)"."===r[n]?r.splice(n,1):".."===r[n]?(r.splice(n,1),a++):a&&(0===n&&(i=!0),r.splice(n,1),a--);return i&&r.unshift(""),"."!==o&&".."!==o||r.push(""),r.join("/")}(O.pathname,e.pathname)),"/"!==O.pathname.charAt(0)&&v(O.protocol)&&(O.pathname="/"+O.pathname),o(O.port,O.protocol)||(O.host=O.hostname,O.port=""),O.username=O.password="",O.auth&&(~(d=O.auth.indexOf(":"))?(O.username=O.auth.slice(0,d),O.username=encodeURIComponent(decodeURIComponent(O.username)),O.password=O.auth.slice(d+1),O.password=encodeURIComponent(decodeURIComponent(O.password))):O.username=encodeURIComponent(decodeURIComponent(O.auth)),O.auth=O.password?O.username+":"+O.password:O.username),O.origin="file:"!==O.protocol&&v(O.protocol)&&O.host?O.protocol+"//"+O.host:"null",O.href=O.toString()}m.prototype={set:function(t,e,r){var n=this;switch(t){case"query":"string"==typeof e&&e.length&&(e=(r||i.parse)(e)),n[t]=e;break;case"port":n[t]=e,o(e,n.protocol)?e&&(n.host=n.hostname+":"+e):(n.host=n.hostname,n[t]="");break;case"hostname":n[t]=e,n.port&&(e+=":"+n.port),n.host=e;break;case"host":n[t]=e,c.test(e)?(e=e.split(":"),n.port=e.pop(),n.hostname=e.join(":")):(n.hostname=e,n.port="");break;case"protocol":n.protocol=e.toLowerCase(),n.slashes=!r;break;case"pathname":case"hash":if(e){var a="pathname"===t?"/":"#";n[t]=e.charAt(0)!==a?a+e:e}else n[t]=e;break;case"username":case"password":n[t]=encodeURIComponent(e);break;case"auth":var s=e.indexOf(":");~s?(n.username=e.slice(0,s),n.username=encodeURIComponent(decodeURIComponent(n.username)),n.password=e.slice(s+1),n.password=encodeURIComponent(decodeURIComponent(n.password))):n.username=encodeURIComponent(decodeURIComponent(e))}for(var u=0;u<p.length;u++){var l=p[u];l[4]&&(n[l[1]]=n[l[1]].toLowerCase())}return n.auth=n.password?n.username+":"+n.password:n.username,n.origin="file:"!==n.protocol&&v(n.protocol)&&n.host?n.protocol+"//"+n.host:"null",n.href=n.toString(),n},toString:function(t){t&&"function"==typeof t||(t=i.stringify);var e,r=this,o=r.host,a=r.protocol;a&&":"!==a.charAt(a.length-1)&&(a+=":");var s=a+(r.protocol&&r.slashes||v(r.protocol)?"//":"");return r.username?(s+=r.username,r.password&&(s+=":"+r.password),s+="@"):r.password?(s+=":"+r.password,s+="@"):"file:"!==r.protocol&&v(r.protocol)&&!o&&"/"!==r.pathname&&(s+="@"),(":"===o[o.length-1]||c.test(r.hostname)&&!r.port)&&(o+=":"),s+=o+r.pathname,(e="object"===n(r.query)?t(r.query):r.query)&&(s+="?"!==e.charAt(0)?"?"+e:e),r.hash&&(s+=r.hash),s}},m.extractProtocol=y,m.location=g,m.trimLeft=h,m.qs=i,t.exports=m},930:()=>{},227:()=>{},347:()=>{},724:()=>{}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}r.amdO={},r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.nmd=t=>(t.paths=[],t.children||(t.children=[]),t);var n={};(()=>{r.d(n,{Gr:()=>I,jK:()=>_,cf:()=>M,HM:()=>U,eI:()=>Pr,lD:()=>G,yY:()=>Ee,sw:()=>Pe,np:()=>ve,_M:()=>Ne});var t=r(95),e=r.n(t);function o(t){if(!i(t))throw new Error("Parameter was not an error")}function i(t){return"[object Error]"===(e=t,Object.prototype.toString.call(e))||t instanceof Error;var e}function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t){var e="function"==typeof Map?new Map:void 0;return l=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return f(t,arguments,d(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),p(n,t)},l(t)}function f(t,e,r){return f=h()?Reflect.construct.bind():function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&p(o,r.prototype),o},f.apply(null,arguments)}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function p(t,e){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},p(t,e)}function d(t){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},d(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}(v,t);var e,r,n,l,f,g=(l=v,f=h(),function(){var t,e=d(l);if(f){var r=d(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===s(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return c(t)}(this,t)});function v(t,e){var r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v);var n=function(t){var e,r="";if(0===t.length)e={};else if(i(t[0]))e={cause:t[0]},r=t.slice(1).join(" ")||"";else if(t[0]&&"object"===a(t[0]))e=Object.assign({},t[0]),r=t.slice(1).join(" ")||"";else{if("string"!=typeof t[0])throw new Error("Invalid arguments passed to Layerr");e={},r=r=t.join(" ")||""}return{options:e,shortMessage:r}}(Array.prototype.slice.call(arguments)),o=n.options,u=n.shortMessage;if(o.cause&&(u="".concat(u,": ").concat(o.cause.message)),(r=g.call(this,u)).message=u,o.name&&"string"==typeof o.name?r.name=o.name:r.name="Layerr",o.cause&&Object.defineProperty(c(r),"_cause",{value:o.cause}),Object.defineProperty(c(r),"_info",{value:{}}),o.info&&"object"===s(o.info)&&Object.assign(r._info,o.info),Error.captureStackTrace){var l=o.constructorOpt||r.constructor;Error.captureStackTrace(c(r),l)}return r}return e=v,n=[{key:"cause",value:function(t){return o(t),t._cause&&i(t._cause)?t._cause:null}},{key:"fullStack",value:function(t){o(t);var e=v.cause(t);return e?"".concat(t.stack,"\ncaused by: ").concat(v.fullStack(e)):t.stack}},{key:"info",value:function(t){o(t);var e={},r=v.cause(t);return r&&Object.assign(e,v.info(r)),t._info&&Object.assign(e,t._info),e}}],(r=[{key:"cause",value:function(){return v.cause(this)}},{key:"toString",value:function(){var t=this.name||this.constructor.name||this.constructor.prototype.name;return this.message&&(t="".concat(t,": ").concat(this.message)),t}}])&&u(e.prototype,r),n&&u(e,n),Object.defineProperty(e,"prototype",{writable:!1}),v}(l(Error));function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}var y=r(441),m=r.n(y),b="__PATH_SEPARATOR_POSIX__",w="__PATH_SEPARATOR_WINDOWS__";function x(t){try{var e=t.replace(/\//g,b).replace(/\\\\/g,w);return encodeURIComponent(e).split(w).join("\\\\").split(b).join("/")}catch(t){throw new g(t,"Failed encoding path")}}function O(t){return t.startsWith("/")?t:"/"+t}function A(t){var e=t;return"/"!==e[0]&&(e="/"+e),/^.+\/$/.test(e)&&(e=e.substr(0,e.length-1)),e}function j(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(){return function(t){var e=[];if(0===t.length)return"";if("string"!=typeof t[0])throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var r=t.shift();t[0]=r+t[0]}t[0].match(/^file:\/\/\//)?t[0]=t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0]=t[0].replace(/^([^/:]+):\/*/,"$1://");for(var n=0;n<t.length;n++){var o=t[n];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(n>0&&(o=o.replace(/^[\/]+/,"")),o=n<t.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),e.push(o))}var i=e.join("/"),a=(i=i.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return a.shift()+(a.length>0?"?":"")+a.join("&")}("object"===v(arguments[0])?arguments[0]:[].slice.call(arguments))}(e.reduce((function(t,e,r){return(0===r||"/"!==e||"/"===e&&"/"!==t[t.length-1])&&t.push(e),t}),[]))}var P=r(243),S=r.n(P),E="abcdef0123456789";function N(t,e){var r=t.url.replace("//",""),n=-1==r.indexOf("/")?"/":r.slice(r.indexOf("/")),o=t.method?t.method.toUpperCase():"GET",i=!!/(^|,)\s*auth\s*($|,)/.test(e.qop)&&"auth",a="00000000".concat(e.nc).slice(-8),s=function(t,e,r,n,o,i,a){var s=a||S()("".concat(e,":").concat(r,":").concat(n));return t&&"md5-sess"===t.toLowerCase()?S()("".concat(s,":").concat(o,":").concat(i)):s}(e.algorithm,e.username,e.realm,e.password,e.nonce,e.cnonce,e.ha1),u=S()("".concat(o,":").concat(n)),c=i?S()("".concat(s,":").concat(e.nonce,":").concat(a,":").concat(e.cnonce,":").concat(i,":").concat(u)):S()("".concat(s,":").concat(e.nonce,":").concat(u)),l={username:e.username,realm:e.realm,nonce:e.nonce,uri:n,qop:i,response:c,nc:a,cnonce:e.cnonce,algorithm:e.algorithm,opaque:e.opaque},f=[];for(var h in l)l[h]&&("qop"===h||"nc"===h||"algorithm"===h?f.push("".concat(h,"=").concat(l[h])):f.push("".concat(h,'="').concat(l[h],'"')));return"Digest ".concat(f.join(", "))}var T=r(146),k=r.n(T);function C(t){return k().decode(t)}var I,_,R="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:"undefined"!=typeof window?window:globalThis,L=R.fetch.bind(R),M=(R.Headers,R.Request),U=R.Response;function D(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];if(0===e.length)throw new Error("Failed creating sequence: No functions provided");return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];for(var o=r;e.length>0;)o=[e.shift().apply(this,o)];return o[0]}}function F(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function $(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}!function(t){t.Digest="digest",t.None="none",t.Password="password",t.Token="token"}(I||(I={})),function(t){t.DataTypeNoLength="data-type-no-length",t.InvalidAuthType="invalid-auth-type",t.InvalidOutputFormat="invalid-output-format",t.LinkUnsupportedAuthType="link-unsupported-auth"}(_||(_={})),r(724);var B="@@HOTPATCHER",W=function(){};function V(t){return{original:t,methods:[t],final:!1}}var z=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._configuration={registry:{},getEmptyAction:"null"},this.__type__=B}var e,r;return e=t,r=[{key:"configuration",get:function(){return this._configuration}},{key:"getEmptyAction",get:function(){return this.configuration.getEmptyAction},set:function(t){this.configuration.getEmptyAction=t}},{key:"control",value:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t||t.__type__!==B)throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");return Object.keys(t.configuration.registry).forEach((function(n){e.configuration.registry.hasOwnProperty(n)?r&&(e.configuration.registry[n]=Object.assign({},t.configuration.registry[n])):e.configuration.registry[n]=Object.assign({},t.configuration.registry[n])})),t._configuration=this.configuration,this}},{key:"execute",value:function(t){for(var e=this.get(t)||W,r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return e.apply(void 0,n)}},{key:"get",value:function(t){var e,r=this.configuration.registry[t];if(!r)switch(this.getEmptyAction){case"null":return null;case"throw":throw new Error("Failed handling method request: No method provided for override: ".concat(t));default:throw new Error("Failed handling request which resulted in an empty method: Invalid empty-action specified: ".concat(this.getEmptyAction))}return D.apply(void 0,function(t){if(Array.isArray(t))return F(t)}(e=r.methods)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return F(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?F(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}},{key:"isPatched",value:function(t){return!!this.configuration.registry[t]}},{key:"patch",value:function(t,e){var r=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).chain,n=void 0!==r&&r;if(this.configuration.registry[t]&&this.configuration.registry[t].final)throw new Error("Failed patching '".concat(t,"': Method marked as being final"));if("function"!=typeof e)throw new Error("Failed patching '".concat(t,"': Provided method is not a function"));if(n)this.configuration.registry[t]?this.configuration.registry[t].methods.push(e):this.configuration.registry[t]=V(e);else if(this.isPatched(t)){var o=this.configuration.registry[t].original;this.configuration.registry[t]=Object.assign(V(e),{original:o})}else this.configuration.registry[t]=V(e);return this}},{key:"patchInline",value:function(t,e){this.isPatched(t)||this.patch(t,e);for(var r=arguments.length,n=new Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];return this.execute.apply(this,[t].concat(n))}},{key:"plugin",value:function(t){for(var e=this,r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return n.forEach((function(r){e.patch(t,r,{chain:!0})})),this}},{key:"restore",value:function(t){if(!this.isPatched(t))throw new Error("Failed restoring method: No method present for key: ".concat(t));if("function"!=typeof this.configuration.registry[t].original)throw new Error("Failed restoring method: Original method not found or of invalid type for key: ".concat(t));return this.configuration.registry[t].methods=[this.configuration.registry[t].original],this}},{key:"setFinal",value:function(t){if(!this.configuration.registry.hasOwnProperty(t))throw new Error("Failed marking '".concat(t,"' as final: No method found for key"));return this.configuration.registry[t].final=!0,this}}],r&&$(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}(),q=null;function G(){return q||(q=new z),q}function H(t){return function(t){if(Array.isArray(t))return X(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return X(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?X(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function Z(t){return Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Z(t)}function Y(t){return function(t){if("object"!==Z(t)||null===t||"[object Object]"!=Object.prototype.toString.call(t))return!1;if(null===Object.getPrototypeOf(t))return!0;for(var e=t;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}(t)?Object.assign({},t):Object.setPrototypeOf(Object.assign({},t),Object.getPrototypeOf(t))}function K(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];for(var n=null,o=[].concat(e);o.length>0;){var i=o.shift();n=n?J(n,i):Y(i)}return n}function J(t,e){var r=Y(t);return Object.keys(e).forEach((function(t){r.hasOwnProperty(t)?Array.isArray(e[t])?r[t]=Array.isArray(r[t])?[].concat(H(r[t]),H(e[t])):H(e[t]):"object"===Z(e[t])&&e[t]?r[t]="object"===Z(r[t])&&r[t]?J(r[t],e[t]):Y(e[t]):r[t]=e[t]:r[t]=e[t]})),r}function Q(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function tt(t){var e,r={},n=function(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return Q(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Q(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}(t.keys());try{for(n.s();!(e=n.n()).done;){var o=e.value;r[o]=t.get(o)}}catch(t){n.e(t)}finally{n.f()}return r}function et(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];if(0===e.length)return{};var n={};return e.reduce((function(t,e){return Object.keys(e).forEach((function(r){var o=r.toLowerCase();n.hasOwnProperty(o)?t[n[o]]=e[r]:(n[o]=r,t[r]=e[r])})),t}),{})}r(347);var rt="function"==typeof ArrayBuffer,nt=Object.prototype.toString;function ot(t){return rt&&(t instanceof ArrayBuffer||"[object ArrayBuffer]"===nt.call(t))}function it(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function at(t){return at="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},at(t)}function st(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function ut(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function ct(t){var e=G();return e.patchInline("request",(function(t){return e.patchInline("fetch",L,t.url,function(t){var e,r,n={},o={method:t.method};if(t.headers&&(n=et(n,t.headers)),void 0!==t.data){var i=(e=function(t){if("string"==typeof t)return[t,{}];if(it(t))return[t,{}];if(ot(t))return[t,{}];if(t&&"object"===at(t))return[JSON.stringify(t),{"content-type":"application/json"}];throw new Error("Unable to convert request body: Unexpected body type: ".concat(at(t)))}(t.data),r=2,function(t){if(Array.isArray(t))return t}(e)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(e,r)||function(t,e){if(t){if("string"==typeof t)return ut(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ut(t,e):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=i[0],s=i[1];o.body=a,n=et(n,s)}return t.signal&&(o.signal=t.signal),t.withCredentials&&(o.credentials="include"),o.headers=n,o}(t))}),t)}var lt,ft=(lt=function(t){if(!t._digest)return ct(t);var e=t._digest;return delete t._digest,e.hasDigestAuth&&(t=K(t,{headers:{Authorization:N(t,e)}})),st(ct(t),(function(r){var n,o,i=!1;return n=function(t){return i?t:r},(o=function(){if(401==r.status)return e.hasDigestAuth=function(t,e){var r=t.headers&&t.headers.get("www-authenticate")||"";if("digest"!==r.split(/\s/)[0].toLowerCase())return!1;for(var n=/([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;;){var o=n.exec(r);if(!o)break;e[o[1]]=o[2]||o[3]}return e.nc+=1,e.cnonce=function(){for(var t="",e=0;e<32;++e)t="".concat(t).concat(E[Math.floor(16*Math.random())]);return t}(),!0}(r,e),function(){if(e.hasDigestAuth)return st(ct(t=K(t,{headers:{Authorization:N(t,e)}})),(function(t){return 401==t.status?e.hasDigestAuth=!1:e.nc++,i=!0,t}))}();e.nc++}())&&o.then?o.then(n):n(o)}))},function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];try{return Promise.resolve(lt.apply(this,t))}catch(t){return Promise.reject(t)}});function ht(t,e,r){var n=Y(t);return n.headers=et(e.headers,n.headers||{},r.headers||{}),void 0!==r.data&&(n.data=r.data),r.signal&&(n.signal=r.signal),e.httpAgent&&(n.httpAgent=e.httpAgent),e.httpsAgent&&(n.httpsAgent=e.httpsAgent),e.digest&&(n._digest=e.digest),"boolean"==typeof e.withCredentials&&(n.withCredentials=e.withCredentials),n}var pt=r(637);function dt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return gt(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?gt(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function gt(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var vt={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",!0],"[:alpha:]":["\\p{L}\\p{Nl}",!0],"[:ascii:]":["\\x00-\\x7f",!1],"[:blank:]":["\\p{Zs}\\t",!0],"[:cntrl:]":["\\p{Cc}",!0],"[:digit:]":["\\p{Nd}",!0],"[:graph:]":["\\p{Z}\\p{C}",!0,!0],"[:lower:]":["\\p{Ll}",!0],"[:print:]":["\\p{C}",!0],"[:punct:]":["\\p{P}",!0],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",!0],"[:upper:]":["\\p{Lu}",!0],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",!0],"[:xdigit:]":["A-Fa-f0-9",!1]},yt=function(t){return t.replace(/[[\]\\-]/g,"\\$&")},mt=function(t){return t.join("")},bt=function(t,e){var r=e;if("["!==t.charAt(r))throw new Error("not in a brace expression");var n,o=[],i=[],a=r+1,s=!1,u=!1,c=!1,l=!1,f=r,h="";t:for(;a<t.length;){var p=t.charAt(a);if("!"!==p&&"^"!==p||a!==r+1){if("]"===p&&s&&!c){f=a+1;break}if(s=!0,"\\"!==p||c){if("["===p&&!c)for(var d=0,g=Object.entries(vt);d<g.length;d++){var v=dt(g[d],2),y=v[0],m=dt(v[1],3),b=m[0],w=m[1],x=m[2];if(t.startsWith(y,a)){if(h)return["$.",!1,t.length-r,!0];a+=y.length,x?i.push(b):o.push(b),u=u||w;continue t}}c=!1,h?(p>h?o.push(yt(h)+"-"+yt(p)):p===h&&o.push(yt(p)),h="",a++):t.startsWith("-]",a+1)?(o.push(yt(p+"-")),a+=2):t.startsWith("-",a+1)?(h=p,a+=2):(o.push(yt(p)),a++)}else c=!0,a++}else l=!0,a++}if(f<a)return["",!1,0,!1];if(!o.length&&!i.length)return["$.",!1,t.length-r,!0];if(0===i.length&&1===o.length&&/^\\?.$/.test(o[0])&&!l)return[(n=2===o[0].length?o[0].slice(-1):o[0],n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")),!1,f-r,!1];var O="["+(l?"^":"")+mt(o)+"]",A="["+(l?"":"^")+mt(i)+"]";return[o.length&&i.length?"("+O+"|"+A+")":o.length?O:A,u,f-r,!0]};function wt(t){return function(t){if(Array.isArray(t))return Ct(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||kt(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function xt(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=kt(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}function Ot(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function At(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function jt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Pt(t,e,r){return e&&jt(t.prototype,e),r&&jt(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function St(t,e){return St=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},St(t,e)}function Et(t){return Et=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Et(t)}function Nt(t){return Nt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Nt(t)}function Tt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(t,e)||kt(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function kt(t,e){if(t){if("string"==typeof t)return Ct(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Ct(t,e):void 0}}function Ct(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var It=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return le(e),!(!r.nocomment&&"#"===e.charAt(0))&&new pe(e,r).match(t)};const _t=It;var Rt=/^\*+([^+@!?\*\[\(]*)$/,Lt=function(t){return function(e){return!e.startsWith(".")&&e.endsWith(t)}},Mt=function(t){return function(e){return e.endsWith(t)}},Ut=function(t){return t=t.toLowerCase(),function(e){return!e.startsWith(".")&&e.toLowerCase().endsWith(t)}},Dt=function(t){return t=t.toLowerCase(),function(e){return e.toLowerCase().endsWith(t)}},Ft=/^\*+\.\*+$/,$t=function(t){return!t.startsWith(".")&&t.includes(".")},Bt=function(t){return"."!==t&&".."!==t&&t.includes(".")},Wt=/^\.\*+$/,Vt=function(t){return"."!==t&&".."!==t&&t.startsWith(".")},zt=/^\*+$/,qt=function(t){return 0!==t.length&&!t.startsWith(".")},Gt=function(t){return 0!==t.length&&"."!==t&&".."!==t},Ht=/^\?+([^+@!?\*\[\(]*)?$/,Xt=function(t){var e=Tt(t,2),r=e[0],n=e[1],o=void 0===n?"":n,i=Jt([r]);return o?(o=o.toLowerCase(),function(t){return i(t)&&t.toLowerCase().endsWith(o)}):i},Zt=function(t){var e=Tt(t,2),r=e[0],n=e[1],o=void 0===n?"":n,i=Qt([r]);return o?(o=o.toLowerCase(),function(t){return i(t)&&t.toLowerCase().endsWith(o)}):i},Yt=function(t){var e=Tt(t,2),r=e[0],n=e[1],o=void 0===n?"":n,i=Qt([r]);return o?function(t){return i(t)&&t.endsWith(o)}:i},Kt=function(t){var e=Tt(t,2),r=e[0],n=e[1],o=void 0===n?"":n,i=Jt([r]);return o?function(t){return i(t)&&t.endsWith(o)}:i},Jt=function(t){var e=Tt(t,1)[0].length;return function(t){return t.length===e&&!t.startsWith(".")}},Qt=function(t){var e=Tt(t,1)[0].length;return function(t){return t.length===e&&"."!==t&&".."!==t}},te="object"===("undefined"==typeof process?"undefined":Nt(process))&&process?"object"===Nt(process.env)&&process.env&&process.env.__MINIMATCH_TESTING_PLATFORM__||process.platform:"posix";It.sep="win32"===te?"\\":"/";var ee=Symbol("globstar **");It.GLOBSTAR=ee;var re={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},ne="[^/]",oe=ne+"*?",ie=function(t){return t.split("").reduce((function(t,e){return t[e]=!0,t}),{})},ae=ie("().*{}+?[]^$\\!"),se=ie("[.(");It.filter=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(r){return It(r,t,e)}};var ue=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.assign({},t,e)};It.defaults=function(t){if(!t||"object"!==Nt(t)||!Object.keys(t).length)return It;var e=It;return Object.assign((function(r,n){return e(r,n,ue(t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}))}),{Minimatch:function(r){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&St(t,e)}(a,r);var n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=Et(n);if(o){var r=Et(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===Nt(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return At(this,a),i.call(this,e,ue(t,r))}return Pt(a,null,[{key:"defaults",value:function(r){return e.defaults(ue(t,r)).Minimatch}}]),a}(e.Minimatch),unescape:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.unescape(r,ue(t,n))},escape:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.escape(r,ue(t,n))},filter:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter(r,ue(t,n))},defaults:function(r){return e.defaults(ue(t,r))},makeRe:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.makeRe(r,ue(t,n))},braceExpand:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.braceExpand(r,ue(t,n))},match:function(r,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.match(r,n,ue(t,o))},sep:e.sep,GLOBSTAR:ee})};var ce=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return le(t),e.nobrace||!/\{(?:(?!\{).)*\}/.test(t)?[t]:pt(t)};It.braceExpand=ce;var le=function(t){if("string"!=typeof t)throw new TypeError("invalid pattern");if(t.length>65536)throw new TypeError("pattern is too long")};It.makeRe=function(t){return new pe(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).makeRe()},It.match=function(t,e){var r=new pe(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{});return t=t.filter((function(t){return r.match(t)})),r.options.nonull&&!t.length&&t.push(e),t};var fe=/[?*]|[+@!]\(.*?\)|\[|\]/,he=function(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},pe=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};At(this,t),Ot(this,"options",void 0),Ot(this,"set",void 0),Ot(this,"pattern",void 0),Ot(this,"windowsPathsNoEscape",void 0),Ot(this,"nonegate",void 0),Ot(this,"negate",void 0),Ot(this,"comment",void 0),Ot(this,"empty",void 0),Ot(this,"preserveMultipleSlashes",void 0),Ot(this,"partial",void 0),Ot(this,"globSet",void 0),Ot(this,"globParts",void 0),Ot(this,"nocase",void 0),Ot(this,"isWindows",void 0),Ot(this,"platform",void 0),Ot(this,"windowsNoMagicRoot",void 0),Ot(this,"regexp",void 0),le(e),r=r||{},this.options=r,this.pattern=e,this.platform=r.platform||te,this.isWindows="win32"===this.platform,this.windowsPathsNoEscape=!!r.windowsPathsNoEscape||!1===r.allowWindowsEscape,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!r.preserveMultipleSlashes,this.regexp=null,this.negate=!1,this.nonegate=!!r.nonegate,this.comment=!1,this.empty=!1,this.partial=!!r.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=void 0!==r.windowsNoMagicRoot?r.windowsNoMagicRoot:!(!this.isWindows||!this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make()}return Pt(t,[{key:"hasMagic",value:function(){if(this.options.magicalBraces&&this.set.length>1)return!0;var t,e=xt(this.set);try{for(e.s();!(t=e.n()).done;){var r,n=xt(t.value);try{for(n.s();!(r=n.n()).done;)if("string"!=typeof r.value)return!0}catch(t){n.e(t)}finally{n.f()}}}catch(t){e.e(t)}finally{e.f()}return!1}},{key:"debug",value:function(){}},{key:"make",value:function(){var t=this,e=this.pattern,r=this.options;if(r.nocomment||"#"!==e.charAt(0))if(e){this.parseNegate(),this.globSet=wt(new Set(this.braceExpand())),r.debug&&(this.debug=function(){var t;return(t=console).error.apply(t,arguments)}),this.debug(this.pattern,this.globSet);var n=this.globSet.map((function(e){return t.slashSplit(e)}));this.globParts=this.preprocess(n),this.debug(this.pattern,this.globParts);var o=this.globParts.map((function(e,r,n){if(t.isWindows&&t.windowsNoMagicRoot){var o=!(""!==e[0]||""!==e[1]||"?"!==e[2]&&fe.test(e[2])||fe.test(e[3])),i=/^[a-z]:/i.test(e[0]);if(o)return[].concat(wt(e.slice(0,4)),wt(e.slice(4).map((function(e){return t.parse(e)}))));if(i)return[e[0]].concat(wt(e.slice(1).map((function(e){return t.parse(e)}))))}return e.map((function(e){return t.parse(e)}))}));if(this.debug(this.pattern,o),this.set=o.filter((function(t){return-1===t.indexOf(!1)})),this.isWindows)for(var i=0;i<this.set.length;i++){var a=this.set[i];""===a[0]&&""===a[1]&&"?"===this.globParts[i][2]&&"string"==typeof a[3]&&/^[a-z]:$/i.test(a[3])&&(a[2]="?")}this.debug(this.pattern,this.set)}else this.empty=!0;else this.comment=!0}},{key:"preprocess",value:function(t){if(this.options.noglobstar)for(var e=0;e<t.length;e++)for(var r=0;r<t[e].length;r++)"**"===t[e][r]&&(t[e][r]="*");var n=this.options.optimizationLevel,o=void 0===n?1:n;return o>=2?(t=this.firstPhasePreProcess(t),t=this.secondPhasePreProcess(t)):t=o>=1?this.levelOneOptimize(t):this.adjascentGlobstarOptimize(t),t}},{key:"adjascentGlobstarOptimize",value:function(t){return t.map((function(t){for(var e=-1;-1!==(e=t.indexOf("**",e+1));){for(var r=e;"**"===t[r+1];)r++;r!==e&&t.splice(e,r-e)}return t}))}},{key:"levelOneOptimize",value:function(t){return t.map((function(t){return 0===(t=t.reduce((function(t,e){var r=t[t.length-1];return"**"===e&&"**"===r?t:".."===e&&r&&".."!==r&&"."!==r&&"**"!==r?(t.pop(),t):(t.push(e),t)}),[])).length?[""]:t}))}},{key:"levelTwoFileOptimize",value:function(t){Array.isArray(t)||(t=this.slashSplit(t));var e=!1;do{if(e=!1,!this.preserveMultipleSlashes){for(var r=1;r<t.length-1;r++){var n=t[r];1===r&&""===n&&""===t[0]||"."!==n&&""!==n||(e=!0,t.splice(r,1),r--)}"."!==t[0]||2!==t.length||"."!==t[1]&&""!==t[1]||(e=!0,t.pop())}for(var o=0;-1!==(o=t.indexOf("..",o+1));){var i=t[o-1];i&&"."!==i&&".."!==i&&"**"!==i&&(e=!0,t.splice(o-1,2),o-=2)}}while(e);return 0===t.length?[""]:t}},{key:"firstPhasePreProcess",value:function(t){var e=!1;do{e=!1;var r,n=xt(t);try{for(n.s();!(r=n.n()).done;){for(var o=r.value,i=-1;-1!==(i=o.indexOf("**",i+1));){for(var a=i;"**"===o[a+1];)a++;a>i&&o.splice(i+1,a-i);var s=o[i+1],u=o[i+2],c=o[i+3];if(".."===s&&u&&"."!==u&&".."!==u&&c&&"."!==c&&".."!==c){e=!0,o.splice(i,1);var l=o.slice(0);l[i]="**",t.push(l),i--}}if(!this.preserveMultipleSlashes){for(var f=1;f<o.length-1;f++){var h=o[f];1===f&&""===h&&""===o[0]||"."!==h&&""!==h||(e=!0,o.splice(f,1),f--)}"."!==o[0]||2!==o.length||"."!==o[1]&&""!==o[1]||(e=!0,o.pop())}for(var p=0;-1!==(p=o.indexOf("..",p+1));){var d=o[p-1];if(d&&"."!==d&&".."!==d&&"**"!==d){e=!0;var g=1===p&&"**"===o[p+1]?["."]:[];o.splice.apply(o,[p-1,2].concat(g)),0===o.length&&o.push(""),p-=2}}}}catch(t){n.e(t)}finally{n.f()}}while(e);return t}},{key:"secondPhasePreProcess",value:function(t){for(var e=0;e<t.length-1;e++)for(var r=e+1;r<t.length;r++){var n=this.partsMatch(t[e],t[r],!this.preserveMultipleSlashes);n&&(t[e]=n,t[r]=[])}return t.filter((function(t){return t.length}))}},{key:"partsMatch",value:function(t,e){for(var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=0,o=0,i=[],a="";n<t.length&&o<e.length;)if(t[n]===e[o])i.push("b"===a?e[o]:t[n]),n++,o++;else if(r&&"**"===t[n]&&e[o]===t[n+1])i.push(t[n]),n++;else if(r&&"**"===e[o]&&t[n]===e[o+1])i.push(e[o]),o++;else if("*"!==t[n]||!e[o]||!this.options.dot&&e[o].startsWith(".")||"**"===e[o]){if("*"!==e[o]||!t[n]||!this.options.dot&&t[n].startsWith(".")||"**"===t[n])return!1;if("a"===a)return!1;a="b",i.push(e[o]),n++,o++}else{if("b"===a)return!1;a="a",i.push(t[n]),n++,o++}return t.length===e.length&&i}},{key:"parseNegate",value:function(){if(!this.nonegate){for(var t=this.pattern,e=!1,r=0,n=0;n<t.length&&"!"===t.charAt(n);n++)e=!e,r++;r&&(this.pattern=t.slice(r)),this.negate=e}}},{key:"matchOne",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=this.options;if(this.isWindows){var o=""===t[0]&&""===t[1]&&"?"===t[2]&&"string"==typeof t[3]&&/^[a-z]:$/i.test(t[3]),i=""===e[0]&&""===e[1]&&"?"===e[2]&&"string"==typeof e[3]&&/^[a-z]:$/i.test(e[3]);if(o&&i){var a=t[3],s=e[3];a.toLowerCase()===s.toLowerCase()&&(t[3]=s)}else if(i&&"string"==typeof t[0]){var u=e[3],c=t[0];u.toLowerCase()===c.toLowerCase()&&(e[3]=c,e=e.slice(3))}else if(o&&"string"==typeof e[0]){var l=t[3];l.toLowerCase()===e[0].toLowerCase()&&(e[0]=l,t=t.slice(3))}}var f=this.options.optimizationLevel;(void 0===f?1:f)>=2&&(t=this.levelTwoFileOptimize(t)),this.debug("matchOne",this,{file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var h=0,p=0,d=t.length,g=e.length;h<d&&p<g;h++,p++){this.debug("matchOne loop");var v=e[p],y=t[h];if(this.debug(e,v,y),!1===v)return!1;if(v===ee){this.debug("GLOBSTAR",[e,v,y]);var m=h,b=p+1;if(b===g){for(this.debug("** at the end");h<d;h++)if("."===t[h]||".."===t[h]||!n.dot&&"."===t[h].charAt(0))return!1;return!0}for(;m<d;){var w=t[m];if(this.debug("\nglobstar while",t,m,e,b,w),this.matchOne(t.slice(m),e.slice(b),r))return this.debug("globstar found match!",m,d,w),!0;if("."===w||".."===w||!n.dot&&"."===w.charAt(0)){this.debug("dot detected!",t,m,e,b);break}this.debug("globstar swallow a segment, and continue"),m++}return!(!r||(this.debug("\n>>> no match, partial?",t,m,e,b),m!==d))}var x=void 0;if("string"==typeof v?(x=y===v,this.debug("string match",v,y,x)):(x=v.test(y),this.debug("pattern match",v,y,x)),!x)return!1}if(h===d&&p===g)return!0;if(h===d)return r;if(p===g)return h===d-1&&""===t[h];throw new Error("wtf?")}},{key:"braceExpand",value:function(){return ce(this.pattern,this.options)}},{key:"parse",value:function(t){var e=this;le(t);var r,n=this.options;if("**"===t)return ee;if(""===t)return"";var o=null;(r=t.match(zt))?o=n.dot?Gt:qt:(r=t.match(Rt))?o=(n.nocase?n.dot?Dt:Ut:n.dot?Mt:Lt)(r[1]):(r=t.match(Ht))?o=(n.nocase?n.dot?Zt:Xt:n.dot?Yt:Kt)(r):(r=t.match(Ft))?o=n.dot?Bt:$t:(r=t.match(Wt))&&(o=Vt);for(var i,a,s="",u=!1,c=!1,l=[],f=[],h=!1,p=!1,d="."===t.charAt(0),g=n.dot||d,v=function(t){return"."===t.charAt(0)?"":n.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)"},y=function(){if(h){switch(h){case"*":s+=oe,u=!0;break;case"?":s+=ne,u=!0;break;default:s+="\\"+h}e.debug("clearStateChar %j %j",h,s),h=!1}},m=0;m<t.length&&(a=t.charAt(m));m++)if(this.debug("%s\t%s %s %j",t,m,s,a),c){if("/"===a)return!1;ae[a]&&(s+="\\"),s+=a,c=!1}else switch(a){case"/":return!1;case"\\":y(),c=!0;continue;case"?":case"*":case"+":case"@":case"!":this.debug("%s\t%s %s %j <-- stateChar",t,m,s,a),this.debug("call clearStateChar %j",h),y(),h=a,n.noext&&y();continue;case"(":if(!h){s+="\\(";continue}var b={type:h,start:m-1,reStart:s.length,open:re[h].open,close:re[h].close};this.debug(this.pattern,"\t",b),l.push(b),s+=b.open,0===b.start&&"!"!==b.type&&(d=!0,s+=v(t.slice(m+1))),this.debug("plType %j %j",h,s),h=!1;continue;case")":var w=l[l.length-1];if(!w){s+="\\)";continue}l.pop(),y(),u=!0,s+=(i=w).close,"!"===i.type&&f.push(Object.assign(i,{reEnd:s.length}));continue;case"|":var x=l[l.length-1];if(!x){s+="\\|";continue}y(),s+="|",0===x.start&&"!"!==x.type&&(d=!0,s+=v(t.slice(m+1)));continue;case"[":y();var O=Tt(bt(t,m),4),A=O[0],j=O[1],P=O[2],S=O[3];P?(s+=A,p=p||j,m+=P-1,u=u||S):s+="\\[";continue;case"]":s+="\\"+a;continue;default:y(),s+=he(a)}for(i=l.pop();i;i=l.pop()){var E=void 0;E=s.slice(i.reStart+i.open.length),this.debug(this.pattern,"setting tail",s,i),E=E.replace(/((?:\\{2}){0,64})(\\?)\|/g,(function(t,e,r){return r||(r="\\"),e+e+r+"|"})),this.debug("tail=%j\n   %s",E,E,i,s);var N="*"===i.type?oe:"?"===i.type?ne:"\\"+i.type;u=!0,s=s.slice(0,i.reStart)+N+"\\("+E}y(),c&&(s+="\\\\");for(var T=se[s.charAt(0)],k=f.length-1;k>-1;k--){for(var C=f[k],I=s.slice(0,C.reStart),_=s.slice(C.reStart,C.reEnd-8),R=s.slice(C.reEnd),L=s.slice(C.reEnd-8,C.reEnd)+R,M=I.split(")").length,U=I.split("(").length-M,D=R,F=0;F<U;F++)D=D.replace(/\)[+*?]?/,"");s=I+_+(R=D)+(""===R?"(?:$|\\/)":"")+L}if(""!==s&&u&&(s="(?=.)"+s),T&&(s=(d?"":g?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)")+s),!n.nocase||u||n.nocaseMagicOnly||(u=t.toUpperCase()!==t.toLowerCase()),!u)return s.replace(/\\(.)/g,"$1");var $=(n.nocase?"i":"")+(p?"u":"");try{var B=o?{_glob:t,_src:s,test:o}:{_glob:t,_src:s};return Object.assign(new RegExp("^"+s+"$",$),B)}catch(t){return this.debug("invalid regexp",t),new RegExp("$.")}}},{key:"makeRe",value:function(){if(this.regexp||!1===this.regexp)return this.regexp;var t=this.set;if(!t.length)return this.regexp=!1,this.regexp;var e=this.options,r=e.noglobstar?oe:e.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",n=e.nocase?"i":"",o=t.map((function(t){var e=t.map((function(t){return"string"==typeof t?he(t):t===ee?ee:t._src}));return e.forEach((function(t,n){var o=e[n+1],i=e[n-1];t===ee&&i!==ee&&(void 0===i?void 0!==o&&o!==ee?e[n+1]="(?:\\/|"+r+"\\/)?"+o:e[n]=r:void 0===o?e[n-1]=i+"(?:\\/|"+r+")?":o!==ee&&(e[n-1]=i+"(?:\\/|\\/"+r+"\\/)"+o,e[n+1]=ee))})),e.filter((function(t){return t!==ee})).join("/")})).join("|");o="^(?:"+o+")$",this.negate&&(o="^(?!"+o+").*$");try{this.regexp=new RegExp(o,n)}catch(t){this.regexp=!1}return this.regexp}},{key:"slashSplit",value:function(t){return this.preserveMultipleSlashes?t.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(t)?[""].concat(wt(t.split(/\/+/))):t.split(/\/+/)}},{key:"match",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.partial;if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;var r=this.options;this.isWindows&&(t=t.split("\\").join("/"));var n=this.slashSplit(t);this.debug(this.pattern,"split",n);var o=this.set;this.debug(this.pattern,"set",o);var i=n[n.length-1];if(!i)for(var a=n.length-2;!i&&a>=0;a--)i=n[a];for(var s=0;s<o.length;s++){var u=o[s],c=n;if(r.matchBase&&1===u.length&&(c=[i]),this.matchOne(c,u,e))return!!r.flipNegate||!this.negate}return!r.flipNegate&&this.negate}}],[{key:"defaults",value:function(t){return It.defaults(t).Minimatch}}]),t}();function de(t){var e=new Error("".concat(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"","Invalid response: ").concat(t.status," ").concat(t.statusText));return e.status=t.status,e.response=t,e}function ge(t,e){var r=e.status;if(401===r&&t.digest)return e;if(r>=400)throw de(e);return e}function ve(t,e){return arguments.length>2&&void 0!==arguments[2]&&arguments[2]?{data:e,headers:t.headers?tt(t.headers):{},status:t.status,statusText:t.statusText}:e}It.Minimatch=pe,It.escape=function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).windowsPathsNoEscape;return void 0!==e&&e?t.replace(/[?*()[\]]/g,"[$&]"):t.replace(/[?*()[\]\\]/g,"\\$&")},It.unescape=function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).windowsPathsNoEscape;return void 0!==e&&e?t.replace(/\[([^\/\\])\]/g,"$1"):t.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1")};var ye,me=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,r){var n,o,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=ht({url:j(t.remoteURL,x(e)),method:"COPY",headers:{Destination:j(t.remoteURL,x(r))}},t,i);return o=function(e){ge(t,e)},(n=ft(a))&&n.then||(n=Promise.resolve(n)),o?n.then(o):n})),be=r(5),we=r(421),xe=r.n(we);function Oe(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function Ae(t){return Ae="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ae(t)}function je(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ye.Original,n=xe().get(t,e);return"array"===r&&!1===Array.isArray(n)?[n]:"object"===r&&Array.isArray(n)?n[0]:n}function Pe(t){return new Promise((function(e){e(function(t){var e=t.multistatus;if(""===e)return{multistatus:{response:[]}};if(!e)throw new Error("Invalid response: No root multistatus found");var r={multistatus:Array.isArray(e)?e[0]:e};return xe().set(r,"multistatus.response",je(r,"multistatus.response",ye.Array)),xe().set(r,"multistatus.response",xe().get(r,"multistatus.response").map((function(t){return function(t){var e=Object.assign({},t);return e.status?xe().set(e,"status",je(e,"status",ye.Object)):(xe().set(e,"propstat",je(e,"propstat",ye.Object)),xe().set(e,"propstat.prop",je(e,"propstat.prop",ye.Object))),e}(t)}))),r}(new be.XMLParser({removeNSPrefix:!0,numberParseOptions:{hex:!0,leadingZeros:!1}}).parse(t)))}))}function Se(t,e){var r,n,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=t.getlastmodified,a=void 0===i?null:i,s=t.getcontentlength,u=void 0===s?"0":s,c=t.resourcetype,l=void 0===c?null:c,f=t.getcontenttype,h=void 0===f?null:f,p=t.getetag,d=void 0===p?null:p,g=l&&"object"===Ae(l)&&void 0!==l.collection?"directory":"file",v=(r=e,(n=document.createElement("textarea")).innerHTML=r,n.value),y={filename:v,basename:m().basename(v),lastmod:a,size:parseInt(u,10),type:g,etag:"string"==typeof d?d.replace(/"/g,""):null};return"file"===g&&(y.mime=h&&"string"==typeof h?h.split(";")[0]:""),o&&(y.props=t),y}function Ee(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=null;try{t.multistatus.response[0].propstat&&(n=t.multistatus.response[0])}catch(t){}if(!n)throw new Error("Failed getting item stat: bad response");var o,i,a=n.propstat,s=a.prop,u=(o=a.status.split(" ",3),i=3,function(t){if(Array.isArray(t))return t}(o)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(o,i)||function(t,e){if(t){if("string"==typeof t)return Oe(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Oe(t,e):void 0}}(o,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=(u[0],u[1]),l=u[2],f=parseInt(c,10);if(f>=400){var h=new Error("Invalid response: ".concat(f," ").concat(l));throw h.status=f,h}return Se(s,A(e),r)}function Ne(t){switch(t.toString()){case"-3":return"unlimited";case"-2":case"-1":return"unknown";default:return parseInt(t,10)}}function Te(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}!function(t){t.Array="array",t.Object="object",t.Original="original"}(ye||(ye={}));var ke=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.details,o=void 0!==n&&n,i=ht({url:j(t.remoteURL,x(e)),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,r);return Te(ft(i),(function(r){return ge(t,r),Te(r.text(),(function(t){return Te(Pe(t),(function(t){var n=Ee(t,e,o);return ve(r,n,o)}))}))}))}));function Ce(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function Ie(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}function _e(){}function Re(t,e){if(!e)return t&&t.then?t.then(_e):Promise.resolve()}var Le="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function Me(t,e,r){if(!t.s){if(r instanceof Ue){if(!r.s)return void(r.o=Me.bind(null,t,e));1&e&&(e=r.s),r=r.v}if(r&&r.then)return void r.then(Me.bind(null,t,e),Me.bind(null,t,2));t.s=e,t.v=r;var n=t.o;n&&n(t)}}var Ue=function(){function t(){}return t.prototype.then=function(e,r){var n=new t,o=this.s;if(o){var i=1&o?e:r;if(i){try{Me(n,1,i(this.v))}catch(t){Me(n,2,t)}return n}return this}return this.o=function(t){try{var o=t.v;1&t.s?Me(n,1,e?e(o):o):r?Me(n,1,r(o)):Me(n,2,o)}catch(t){Me(n,2,t)}},n},t}();function De(t){return t instanceof Ue&&1&t.s}function Fe(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function $e(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Fe(Object(r),!0).forEach((function(e){Be(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Fe(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function Be(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var We=Ie((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=function(t){if(!t||"/"===t)return[];var e=t,r=[];do{r.push(e),e=m().dirname(e)}while(e&&"/"!==e);return r}(A(e));n.sort((function(t,e){return t.length>e.length?1:e.length>t.length?-1:0}));var o=!1;return function(t,e,r){if("function"==typeof t[Le]){var n,o,i,a=t[Le]();if(function t(s){try{for(;!((n=a.next()).done||r&&r());)if((s=e(n.value))&&s.then){if(!De(s))return void s.then(t,i||(i=Me.bind(null,o=new Ue,2)));s=s.v}o?Me(o,1,s):o=s}catch(t){Me(o||(o=new Ue),2,t)}}(),a.return){var s=function(t){try{n.done||a.return()}catch(t){}return t};if(o&&o.then)return o.then(s,(function(t){throw s(t)}));s()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,e,r){var n,o,i=-1;return function a(s){try{for(;++i<t.length&&(!r||!r());)if((s=e(i))&&s.then){if(!De(s))return void s.then(a,o||(o=Me.bind(null,n=new Ue,2)));s=s.v}n?Me(n,1,s):n=s}catch(t){Me(n||(n=new Ue),2,t)}}(),n}(u,(function(t){return e(u[t])}),r)}(n,(function(n){return i=function(){return function(r,o){try{var i=Ce(ke(t,n),(function(t){if("directory"!==t.type)throw new Error("Path includes a file: ".concat(e))}))}catch(t){return o(t)}return i&&i.then?i.then(void 0,o):i}(0,(function(e){var i=e;return function(){if(404===i.status)return o=!0,Re(Ve(t,n,$e($e({},r),{},{recursive:!1})));throw e}()}))},(a=function(){if(o)return Re(Ve(t,n,$e($e({},r),{},{recursive:!1})))}())&&a.then?a.then(i):i();var i,a}),(function(){return!1}))})),Ve=Ie((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!0===r.recursive)return We(t,e,r);var n,o=ht({url:j(t.remoteURL,(n=x(e),n.endsWith("/")?n:n+"/")),method:"MKCOL"},t,r);return Ce(ft(o),(function(e){ge(t,e)}))}));var ze=r(227),qe=r.n(ze);function Ge(t){return Ge="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ge(t)}var He=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n={};if("object"===Ge(r.range)&&"number"==typeof r.range.start){var o="bytes=".concat(r.range.start,"-");"number"==typeof r.range.end&&(o="".concat(o).concat(r.range.end)),n.Range=o}var i,a,s=ht({url:j(t.remoteURL,x(e)),method:"GET",headers:n},t,r);return a=function(e){if(ge(t,e),n.Range&&206!==e.status){var o=new Error("Invalid response code for partial request: ".concat(e.status));throw o.status=e.status,o}return r.callback&&setTimeout((function(){r.callback(e)}),0),e.body},(i=ft(s))&&i.then||(i=Promise.resolve(i)),a?i.then(a):i})),Xe=function(){},Ze=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,r){r.url||(r.url=j(t.remoteURL,x(e)));var n,o,i=ht(r,t,{});return o=function(e){return ge(t,e),e},(n=ft(i))&&n.then||(n=Promise.resolve(n)),o?n.then(o):n})),Ye=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r,n,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=ht({url:j(t.remoteURL,x(e)),method:"DELETE"},t,o);return n=function(e){ge(t,e)},(r=ft(i))&&r.then||(r=Promise.resolve(r)),n?r.then(n):r})),Ke=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(n,o){try{var i=(a=ke(t,e,r),s=function(){return!0},u?s?s(a):a:(a&&a.then||(a=Promise.resolve(a)),s?a.then(s):a))}catch(t){return o(t)}var a,s,u;return i&&i.then?i.then(void 0,o):i}(0,(function(t){if(404===t.status)return!1;throw t}))}));function Je(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}var Qe=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=ht({url:j(t.remoteURL,x(e),"/"),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:r.deep?"infinity":"1"}},t,r);return Je(ft(n),(function(n){return ge(t,n),Je(n.text(),(function(o){if(!o)throw new Error("Failed parsing directory contents: Empty response");return Je(Pe(o),(function(o){var i=O(e),a=function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=m().join(e,"/"),a=t.multistatus.response.map((function(t){var e=function(t){try{return t.replace(/^https?:\/\/[^\/]+/,"")}catch(t){throw new g(t,"Failed normalising HREF")}}(t.href);return Se(t.propstat.prop,"/"===i?decodeURIComponent(A(e)):A(m().relative(decodeURIComponent(i),decodeURIComponent(e))),n)}));return o?a:a.filter((function(t){return t.basename&&("file"===t.type||t.filename!==r.replace(/\/$/,""))}))}(o,O(t.remoteBasePath||t.remotePath),i,r.details,r.includeSelf);return r.glob&&(a=function(t,e){return t.filter((function(t){return _t(t.filename,e,{matchBase:!0})}))}(a,r.glob)),ve(n,a,r.details)}))}))}))}));function tr(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}var er=tr((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=ht({url:j(t.remoteURL,x(e)),method:"GET",headers:{Accept:"text/plain"},transformResponse:[ir]},t,r);return rr(ft(n),(function(e){return ge(t,e),rr(e.text(),(function(t){return ve(e,t,r.details)}))}))}));function rr(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}var nr=tr((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=ht({url:j(t.remoteURL,x(e)),method:"GET"},t,r);return rr(ft(n),(function(e){var n;return ge(t,e),function(t,e){var r=t();return r&&r.then?r.then(e):e()}((function(){return rr(e.arrayBuffer(),(function(t){n=t}))}),(function(){return ve(e,n,r.details)}))}))})),or=tr((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.format,o=void 0===n?"binary":n;if("binary"!==o&&"text"!==o)throw new g({info:{code:_.InvalidOutputFormat}},"Invalid output format: ".concat(o));return"text"===o?er(t,e,r):nr(t,e,r)})),ir=function(t){return t};function ar(t){return ar="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ar(t)}function sr(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function ur(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function cr(t){return new be.XMLBuilder({attributeNamePrefix:"@_",format:!0,ignoreAttributes:!1,suppressEmptyNode:!0}).build(lr({lockinfo:{"@_xmlns:d":"DAV:",lockscope:{exclusive:{}},locktype:{write:{}},owner:{href:t}}},"d"))}function lr(t,e){var r=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?sr(Object(r),!0).forEach((function(e){ur(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):sr(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t);for(var n in r)r.hasOwnProperty(n)&&(r[n]&&"object"===ar(r[n])&&-1===n.indexOf(":")?(r["".concat(e,":").concat(n)]=lr(r[n],e),delete r[n]):!1===/^@_/.test(n)&&(r["".concat(e,":").concat(n)]=r[n],delete r[n]));return r}function fr(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function hr(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}var pr=hr((function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=ht({url:j(t.remoteURL,x(e)),method:"UNLOCK",headers:{"Lock-Token":r}},t,n);return fr(ft(o),(function(e){if(ge(t,e),204!==e.status&&200!==e.status)throw de(e)}))})),dr=hr((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.refreshToken,o=r.timeout,i={Accept:"text/plain,application/xml",Timeout:void 0===o?gr:o};n&&(i.If=n);var a=ht({url:j(t.remoteURL,x(e)),method:"LOCK",headers:i,data:cr(t.contactHref)},t,r);return fr(ft(a),(function(e){return ge(t,e),fr(e.text(),(function(t){var r,n=(r=t,new be.XMLParser({removeNSPrefix:!0,parseAttributeValue:!0,parseTagValue:!0}).parse(r)),o=xe().get(n,"prop.lockdiscovery.activelock.locktoken.href"),i=xe().get(n,"prop.lockdiscovery.activelock.timeout");if(!o)throw de(e,"No lock token received: ");return{token:o,serverTimeout:i}}))}))})),gr="Infinite, Second-4100000000";function vr(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function yr(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}var mr=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.path||"/",n=ht({url:j(t.remoteURL,r),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,e);return yr(ft(n),(function(r){return ge(t,r),yr(r.text(),(function(t){return yr(Pe(t),(function(t){var n=function(t){try{var e=(o=t.multistatus.response,i=1,function(t){if(Array.isArray(t))return t}(o)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(o,i)||function(t,e){if(t){if("string"==typeof t)return vr(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?vr(t,e):void 0}}(o,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0].propstat.prop,r=e["quota-used-bytes"],n=e["quota-available-bytes"];return void 0!==r&&void 0!==n?{used:parseInt(r,10),available:Ne(n)}:null}catch(t){}var o,i;return null}(t);return ve(r,n,e.details)}))}))}))}));function br(t,e,r){return r?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}var wr=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.details,o=void 0!==n&&n,i=ht({url:j(t.remoteURL,x(e)),method:"SEARCH",headers:{Accept:"text/plain,application/xml","Content-Type":t.headers["Content-Type"]||"application/xml; charset=utf-8"}},t,r);return br(ft(i),(function(r){return ge(t,r),br(r.text(),(function(t){return br(Pe(t),(function(t){var n=function(t,e,r){var n={truncated:!1,results:[]};return n.truncated=t.multistatus.response.some((function(t){var r,n;return"507"===(null===(r=(t.status||(null===(n=t.propstat)||void 0===n?void 0:n.status)).split(" ",3))||void 0===r?void 0:r[1])&&t.href.replace(/\/$/,"").endsWith(x(e).replace(/\/$/,""))})),t.multistatus.response.forEach((function(t){if(void 0!==t.propstat){var e=t.href.split("/").map(decodeURIComponent).join("/");n.results.push(Se(t.propstat.prop,e,r))}})),n}(t,e,o);return ve(r,n,o)}))}))}))})),xr=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,r){var n,o,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=ht({url:j(t.remoteURL,x(e)),method:"MOVE",headers:{Destination:j(t.remoteURL,x(r))}},t,i);return o=function(e){ge(t,e)},(n=ft(a))&&n.then||(n=Promise.resolve(n)),o?n.then(o):n})),Or=r(918),Ar=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=n.contentLength,i=void 0===o||o,a=n.overwrite,s=void 0===a||a,u={"Content-Type":"application/octet-stream"};!1===i||(u["Content-Length"]="".concat("number"==typeof i?i:function(t){if(ot(t))return t.byteLength;if(it(t))return t.length;if("string"==typeof t)return(0,Or.k)(t);throw new g({info:{code:_.DataTypeNoLength}},"Cannot calculate data length: Invalid type")}(r))),s||(u["If-None-Match"]="*");var c,l,f=ht({url:j(t.remoteURL,x(e)),method:"PUT",headers:u,data:r},t,n);return l=function(e){try{ge(t,e)}catch(t){var r=t;if(412!==r.status||s)throw r;return!1}return!0},(c=ft(f))&&c.then||(c=Promise.resolve(c)),l?c.then(l):c})),jr="https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";function Pr(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.authType,o=void 0===n?null:n,i=r.remoteBasePath,a=r.contactHref,s=void 0===a?jr:a,u=r.ha1,c=r.headers,l=void 0===c?{}:c,f=r.httpAgent,h=r.httpsAgent,p=r.password,d=r.token,v=r.username,y=r.withCredentials,m=o;m||(m=v||p?I.Password:I.None);var b,w,O={authType:m,remoteBasePath:i,contactHref:s,ha1:u,headers:Object.assign({},l),httpAgent:f,httpsAgent:h,password:p,remotePath:(b=t,w=new(e())(b).pathname,w.length<=0&&(w="/"),A(w)),remoteURL:t,token:d,username:v,withCredentials:y};return function(t,e,r,n,o){switch(t.authType){case I.Digest:t.digest=function(t,e,r){return{username:t,password:e,ha1:r,nc:0,algorithm:"md5",hasDigestAuth:!1}}(e,r,o);break;case I.None:break;case I.Password:t.headers.Authorization=function(t,e){var r,n=(r="".concat(t,":").concat(e),k().encode(r));return"Basic ".concat(n)}(e,r);break;case I.Token:t.headers.Authorization="".concat((i=n).token_type," ").concat(i.access_token);break;default:throw new g({info:{code:_.InvalidAuthType}},"Invalid auth type: ".concat(t.authType))}var i}(O,v,p,d,u),{copyFile:function(t,e,r){return me(O,t,e,r)},createDirectory:function(t,e){return Ve(O,t,e)},createReadStream:function(t,e){return function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=new(0,qe().PassThrough);return He(t,e,r).then((function(t){t.pipe(n)})).catch((function(t){n.emit("error",t)})),n}(O,t,e)},createWriteStream:function(t,e,r){return function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Xe,o=new(0,qe().PassThrough),i={};!1===r.overwrite&&(i["If-None-Match"]="*");var a=ht({url:j(t.remoteURL,x(e)),method:"PUT",headers:i,data:o,maxRedirects:0},t,r);return ft(a).then((function(e){return ge(t,e)})).then((function(t){setTimeout((function(){n(t)}),0)})).catch((function(t){o.emit("error",t)})),o}(O,t,e,r)},customRequest:function(t,e){return Ze(O,t,e)},deleteFile:function(t,e){return Ye(O,t,e)},exists:function(t,e){return Ke(O,t,e)},getDirectoryContents:function(t,e){return Qe(O,t,e)},getFileContents:function(t,e){return or(O,t,e)},getFileDownloadLink:function(t){return function(t,e){var r=j(t.remoteURL,x(e)),n=/^https:/i.test(r)?"https":"http";switch(t.authType){case I.None:break;case I.Password:var o=C(t.headers.Authorization.replace(/^Basic /i,"").trim());r=r.replace(/^https?:\/\//,"".concat(n,"://").concat(o,"@"));break;default:throw new g({info:{code:_.LinkUnsupportedAuthType}},"Unsupported auth type for file link: ".concat(t.authType))}return r}(O,t)},getFileUploadLink:function(t){return function(t,e){var r="".concat(j(t.remoteURL,x(e)),"?Content-Type=application/octet-stream"),n=/^https:/i.test(r)?"https":"http";switch(t.authType){case I.None:break;case I.Password:var o=C(t.headers.Authorization.replace(/^Basic /i,"").trim());r=r.replace(/^https?:\/\//,"".concat(n,"://").concat(o,"@"));break;default:throw new g({info:{code:_.LinkUnsupportedAuthType}},"Unsupported auth type for file link: ".concat(t.authType))}return r}(O,t)},getHeaders:function(){return Object.assign({},O.headers)},getQuota:function(t){return mr(O,t)},lock:function(t,e){return dr(O,t,e)},moveFile:function(t,e,r){return xr(O,t,e,r)},putFileContents:function(t,e,r){return Ar(O,t,e,r)},search:function(t,e){return wr(O,t,e)},setHeaders:function(t){O.headers=Object.assign({},t)},stat:function(t,e){return ke(O,t,e)},unlock:function(t,e,r){return pr(O,t,e,r)}}}})();var o=n.Gr,i=n.jK,a=n.cf,s=n.HM,u=n.eI,c=n.lD,l=n.yY,f=n.sw,h=n.np,p=n._M;
;// CONCATENATED MODULE: ./node_modules/@nextcloud/files/dist/index.mjs







/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const me = (e) => e === null ? (0,dist/* getLoggerBuilder */.IY)().setApp("files").build() : (0,dist/* getLoggerBuilder */.IY)().setApp("files").setUid(e.uid).build(), m = me(getCurrentUser());
/**
 * @copyright Copyright (c) 2021 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
class Ne {
  _entries = [];
  registerEntry(t) {
    this.validateEntry(t), this._entries.push(t);
  }
  unregisterEntry(t) {
    const r = typeof t == "string" ? this.getEntryIndex(t) : this.getEntryIndex(t.id);
    if (r === -1) {
      m.warn("Entry not found, nothing removed", { entry: t, entries: this.getEntries() });
      return;
    }
    this._entries.splice(r, 1);
  }
  /**
   * Get the list of registered entries
   *
   * @param {Folder} context the creation context. Usually the current folder
   */
  getEntries(t) {
    return t ? this._entries.filter((r) => typeof r.enabled == "function" ? r.enabled(t) : !0) : this._entries;
  }
  getEntryIndex(t) {
    return this._entries.findIndex((r) => r.id === t);
  }
  validateEntry(t) {
    if (!t.id || !t.displayName || !(t.iconSvgInline || t.iconClass) || !t.handler)
      throw new Error("Invalid entry");
    if (typeof t.id != "string" || typeof t.displayName != "string")
      throw new Error("Invalid id or displayName property");
    if (t.iconClass && typeof t.iconClass != "string" || t.iconSvgInline && typeof t.iconSvgInline != "string")
      throw new Error("Invalid icon provided");
    if (t.enabled !== void 0 && typeof t.enabled != "function")
      throw new Error("Invalid enabled property");
    if (typeof t.handler != "function")
      throw new Error("Invalid handler property");
    if ("order" in t && typeof t.order != "number")
      throw new Error("Invalid order property");
    if (this.getEntryIndex(t.id) !== -1)
      throw new Error("Duplicate entry");
  }
}
const F = function() {
  return typeof window._nc_newfilemenu > "u" && (window._nc_newfilemenu = new Ne(), m.debug("NewFileMenu initialized")), window._nc_newfilemenu;
};
/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const C = ["B", "KB", "MB", "GB", "TB", "PB"], P = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
function Yt(e, t = !1, r = !1, s = !1) {
  r = r && !s, typeof e == "string" && (e = Number(e));
  let n = e > 0 ? Math.floor(Math.log(e) / Math.log(s ? 1e3 : 1024)) : 0;
  n = Math.min((r ? P.length : C.length) - 1, n);
  const i = r ? P[n] : C[n];
  let d = (e / Math.pow(s ? 1e3 : 1024, n)).toFixed(1);
  return t === !0 && n === 0 ? (d !== "0.0" ? "< 1 " : "0 ") + (r ? P[1] : C[1]) : (n < 2 ? d = parseFloat(d).toFixed(0) : d = parseFloat(d).toLocaleString((0,l10n_dist/* getCanonicalLocale */.aj)()), d + " " + i);
}
function Jt(e, t = !1) {
  try {
    e = `${e}`.toLocaleLowerCase().replaceAll(/\s+/g, "").replaceAll(",", ".");
  } catch {
    return null;
  }
  const r = e.match(/^([0-9]*(\.[0-9]*)?)([kmgtp]?)(i?)b?$/);
  if (r === null || r[1] === "." || r[1] === "")
    return null;
  const s = {
    "": 0,
    k: 1,
    m: 2,
    g: 3,
    t: 4,
    p: 5,
    e: 6
  }, n = `${r[1]}`, i = r[4] === "i" || t ? 1024 : 1e3;
  return Math.round(Number.parseFloat(n) * i ** s[r[3]]);
}
/**
 * @copyright Copyright (c) 2023 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var Z = /* @__PURE__ */ ((e) => (e.DEFAULT = "default", e.HIDDEN = "hidden", e))(Z || {});
class Qt {
  _action;
  constructor(t) {
    this.validateAction(t), this._action = t;
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
  get inline() {
    return this._action.inline;
  }
  get renderInline() {
    return this._action.renderInline;
  }
  validateAction(t) {
    if (!t.id || typeof t.id != "string")
      throw new Error("Invalid id");
    if (!t.displayName || typeof t.displayName != "function")
      throw new Error("Invalid displayName function");
    if ("title" in t && typeof t.title != "function")
      throw new Error("Invalid title function");
    if (!t.iconSvgInline || typeof t.iconSvgInline != "function")
      throw new Error("Invalid iconSvgInline function");
    if (!t.exec || typeof t.exec != "function")
      throw new Error("Invalid exec function");
    if ("enabled" in t && typeof t.enabled != "function")
      throw new Error("Invalid enabled function");
    if ("execBatch" in t && typeof t.execBatch != "function")
      throw new Error("Invalid execBatch function");
    if ("order" in t && typeof t.order != "number")
      throw new Error("Invalid order");
    if ("parent" in t && typeof t.parent != "string")
      throw new Error("Invalid parent");
    if (t.default && !Object.values(Z).includes(t.default))
      throw new Error("Invalid default");
    if ("inline" in t && typeof t.inline != "function")
      throw new Error("Invalid inline function");
    if ("renderInline" in t && typeof t.renderInline != "function")
      throw new Error("Invalid renderInline function");
  }
}
const Dt = function(e) {
  if (typeof window._nc_fileactions > "u" && (window._nc_fileactions = [], m.debug("FileActions initialized")), window._nc_fileactions.find((t) => t.id === e.id)) {
    m.error(`FileAction ${e.id} already registered`, { action: e });
    return;
  }
  window._nc_fileactions.push(e);
}, er = function() {
  return typeof window._nc_fileactions > "u" && (window._nc_fileactions = [], m.debug("FileActions initialized")), window._nc_fileactions;
};
/**
 * @copyright Copyright (c) 2023 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
class tr {
  _header;
  constructor(t) {
    this.validateHeader(t), this._header = t;
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
  validateHeader(t) {
    if (!t.id || !t.render || !t.updated)
      throw new Error("Invalid header: id, render and updated are required");
    if (typeof t.id != "string")
      throw new Error("Invalid id property");
    if (t.enabled !== void 0 && typeof t.enabled != "function")
      throw new Error("Invalid enabled property");
    if (t.render && typeof t.render != "function")
      throw new Error("Invalid render property");
    if (t.updated && typeof t.updated != "function")
      throw new Error("Invalid updated property");
  }
}
const rr = function(e) {
  if (typeof window._nc_filelistheader > "u" && (window._nc_filelistheader = [], m.debug("FileListHeaders initialized")), window._nc_filelistheader.find((t) => t.id === e.id)) {
    m.error(`Header ${e.id} already registered`, { header: e });
    return;
  }
  window._nc_filelistheader.push(e);
}, nr = function() {
  return typeof window._nc_filelistheader > "u" && (window._nc_filelistheader = [], m.debug("FileListHeaders initialized")), window._nc_filelistheader;
};
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var N = /* @__PURE__ */ ((e) => (e[e.NONE = 0] = "NONE", e[e.CREATE = 4] = "CREATE", e[e.READ = 1] = "READ", e[e.UPDATE = 2] = "UPDATE", e[e.DELETE = 8] = "DELETE", e[e.SHARE = 16] = "SHARE", e[e.ALL = 31] = "ALL", e))(N || {});
/**
 * @copyright Copyright (c) 2023 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 * @author Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const j = [
  "d:getcontentlength",
  "d:getcontenttype",
  "d:getetag",
  "d:getlastmodified",
  "d:quota-available-bytes",
  "d:resourcetype",
  "nc:has-preview",
  "nc:is-encrypted",
  "nc:mount-type",
  "nc:share-attributes",
  "oc:comments-unread",
  "oc:favorite",
  "oc:fileid",
  "oc:owner-display-name",
  "oc:owner-id",
  "oc:permissions",
  "oc:share-types",
  "oc:size",
  "ocs:share-permissions"
], Y = {
  d: "DAV:",
  nc: "http://nextcloud.org/ns",
  oc: "http://owncloud.org/ns",
  ocs: "http://open-collaboration-services.org/ns"
}, ir = function(e, t = { nc: "http://nextcloud.org/ns" }) {
  typeof window._nc_dav_properties > "u" && (window._nc_dav_properties = [...j], window._nc_dav_namespaces = { ...Y });
  const r = { ...window._nc_dav_namespaces, ...t };
  if (window._nc_dav_properties.find((n) => n === e))
    return m.error(`${e} already registered`, { prop: e }), !1;
  if (e.startsWith("<") || e.split(":").length !== 2)
    return m.error(`${e} is not valid. See example: 'oc:fileid'`, { prop: e }), !1;
  const s = e.split(":")[0];
  return r[s] ? (window._nc_dav_properties.push(e), window._nc_dav_namespaces = r, !0) : (m.error(`${e} namespace unknown`, { prop: e, namespaces: r }), !1);
}, V = function() {
  return typeof window._nc_dav_properties > "u" && (window._nc_dav_properties = [...j]), window._nc_dav_properties.map((e) => `<${e} />`).join(" ");
}, L = function() {
  return typeof window._nc_dav_namespaces > "u" && (window._nc_dav_namespaces = { ...Y }), Object.keys(window._nc_dav_namespaces).map((e) => `xmlns:${e}="${window._nc_dav_namespaces?.[e]}"`).join(" ");
}, sr = function() {
  return `<?xml version="1.0"?>
		<d:propfind ${L()}>
			<d:prop>
				${V()}
			</d:prop>
		</d:propfind>`;
}, Ee = function() {
  return `<?xml version="1.0"?>
		<oc:filter-files ${L()}>
			<d:prop>
				${V()}
			</d:prop>
			<oc:filter-rules>
				<oc:favorite>1</oc:favorite>
			</oc:filter-rules>
		</oc:filter-files>`;
}, or = function(e) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<d:searchrequest ${L()}
	xmlns:ns="https://github.com/icewind1991/SearchDAV/ns">
	<d:basicsearch>
		<d:select>
			<d:prop>
				${V()}
			</d:prop>
		</d:select>
		<d:from>
			<d:scope>
				<d:href>/files/${getCurrentUser()?.uid}/</d:href>
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
					<d:literal>${e}</d:literal>
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
/**
 * @copyright Copyright (c) 2023 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 * @author Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const be = function(e = "") {
  let t = N.NONE;
  return e && ((e.includes("C") || e.includes("K")) && (t |= N.CREATE), e.includes("G") && (t |= N.READ), (e.includes("W") || e.includes("N") || e.includes("V")) && (t |= N.UPDATE), e.includes("D") && (t |= N.DELETE), e.includes("R") && (t |= N.SHARE)), t;
};
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var dist_R = /* @__PURE__ */ ((e) => (e.Folder = "folder", e.File = "file", e))(dist_R || {});
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const J = function(e, t) {
  return e.match(t) !== null;
}, X = (e, t) => {
  if (e.id && typeof e.id != "number")
    throw new Error("Invalid id type of value");
  if (!e.source)
    throw new Error("Missing mandatory source");
  try {
    new URL(e.source);
  } catch {
    throw new Error("Invalid source format, source must be a valid URL");
  }
  if (!e.source.startsWith("http"))
    throw new Error("Invalid source format, only http(s) is supported");
  if (e.mtime && !(e.mtime instanceof Date))
    throw new Error("Invalid mtime type");
  if (e.crtime && !(e.crtime instanceof Date))
    throw new Error("Invalid crtime type");
  if (!e.mime || typeof e.mime != "string" || !e.mime.match(/^[-\w.]+\/[-+\w.]+$/gi))
    throw new Error("Missing or invalid mandatory mime");
  if ("size" in e && typeof e.size != "number" && e.size !== void 0)
    throw new Error("Invalid size type");
  if ("permissions" in e && e.permissions !== void 0 && !(typeof e.permissions == "number" && e.permissions >= N.NONE && e.permissions <= N.ALL))
    throw new Error("Invalid permissions");
  if (e.owner && e.owner !== null && typeof e.owner != "string")
    throw new Error("Invalid owner type");
  if (e.attributes && typeof e.attributes != "object")
    throw new Error("Invalid attributes type");
  if (e.root && typeof e.root != "string")
    throw new Error("Invalid root type");
  if (e.root && !e.root.startsWith("/"))
    throw new Error("Root must start with a leading slash");
  if (e.root && !e.source.includes(e.root))
    throw new Error("Root must be part of the source");
  if (e.root && J(e.source, t)) {
    const r = e.source.match(t)[0];
    if (!e.source.includes((0,path.join)(r, e.root)))
      throw new Error("The root must be relative to the service. e.g /files/emma");
  }
  if (e.status && !Object.values(Q).includes(e.status))
    throw new Error("Status must be a valid NodeStatus");
};
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var Q = /* @__PURE__ */ ((e) => (e.NEW = "new", e.FAILED = "failed", e.LOADING = "loading", e.LOCKED = "locked", e))(Q || {});
class D {
  _data;
  _attributes;
  _knownDavService = /(remote|public)\.php\/(web)?dav/i;
  constructor(t, r) {
    X(t, r || this._knownDavService), this._data = t;
    const s = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set: (n, i, d) => (this.updateMtime(), Reflect.set(n, i, d)),
      deleteProperty: (n, i) => (this.updateMtime(), Reflect.deleteProperty(n, i))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
    this._attributes = new Proxy(t.attributes || {}, s), delete this._data.attributes, r && (this._knownDavService = r);
  }
  /**
   * Get the source url to this object
   */
  get source() {
    return this._data.source.replace(/\/$/i, "");
  }
  /**
   * Get the encoded source url to this object for requests purposes
   */
  get encodedSource() {
    const { origin: t } = new URL(this.source);
    return t + (0,paths_dist/* encodePath */.Ec)(this.source.slice(t.length));
  }
  /**
   * Get this object name
   */
  get basename() {
    return (0,path.basename)(this.source);
  }
  /**
   * Get this object's extension
   */
  get extension() {
    return (0,path.extname)(this.source);
  }
  /**
   * Get the directory path leading to this object
   * Will use the relative path to root if available
   */
  get dirname() {
    if (this.root) {
      const r = this.source.indexOf(this.root);
      return (0,path.dirname)(this.source.slice(r + this.root.length) || "/");
    }
    const t = new URL(this.source);
    return (0,path.dirname)(t.pathname);
  }
  /**
   * Get the file mime
   */
  get mime() {
    return this._data.mime;
  }
  /**
   * Get the file modification time
   */
  get mtime() {
    return this._data.mtime;
  }
  /**
   * Get the file creation time
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
   * Get the file attribute
   */
  get attributes() {
    return this._attributes;
  }
  /**
   * Get the file permissions
   */
  get permissions() {
    return this.owner === null && !this.isDavRessource ? N.READ : this._data.permissions !== void 0 ? this._data.permissions : N.NONE;
  }
  /**
   * Get the file owner
   */
  get owner() {
    return this.isDavRessource ? this._data.owner : null;
  }
  /**
   * Is this a dav-related ressource ?
   */
  get isDavRessource() {
    return J(this.source, this._knownDavService);
  }
  /**
   * Get the dav root of this object
   */
  get root() {
    return this._data.root ? this._data.root.replace(/^(.+)\/$/, "$1") : this.isDavRessource && (0,path.dirname)(this.source).split(this._knownDavService).pop() || null;
  }
  /**
   * Get the absolute path of this object relative to the root
   */
  get path() {
    if (this.root) {
      const t = this.source.indexOf(this.root);
      return this.source.slice(t + this.root.length) || "/";
    }
    return (this.dirname + "/" + this.basename).replace(/\/\//g, "/");
  }
  /**
   * Get the node id if defined.
   * Will look for the fileid in attributes if undefined.
   */
  get fileid() {
    return this._data?.id || this.attributes?.fileid;
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
  set status(t) {
    this._data.status = t;
  }
  /**
   * Move the node to a new destination
   *
   * @param {string} destination the new source.
   * e.g. https://cloud.domain.com/remote.php/dav/files/emma/Photos/picture.jpg
   */
  move(t) {
    X({ ...this._data, source: t }, this._knownDavService), this._data.source = t, this.updateMtime();
  }
  /**
   * Rename the node
   * This aliases the move method for easier usage
   *
   * @param basename The new name of the node
   */
  rename(t) {
    if (t.includes("/"))
      throw new Error("Invalid basename");
    this.move((0,path.dirname)(this.source) + "/" + t);
  }
  /**
   * Update the mtime if exists.
   */
  updateMtime() {
    this._data.mtime && (this._data.mtime = /* @__PURE__ */ new Date());
  }
}
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
class ye extends D {
  get type() {
    return dist_R.File;
  }
}
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
class _e extends D {
  constructor(t) {
    super({
      ...t,
      mime: "httpd/unix-directory"
    });
  }
  get type() {
    return dist_R.Folder;
  }
  get extension() {
    return null;
  }
  get mime() {
    return "httpd/unix-directory";
  }
}
/**
 * @copyright Copyright (c) 2023 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 * @author Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const ee = `/files/${getCurrentUser()?.uid}`, te = (0,router_dist.generateRemoteUrl)("dav"), ur = function(e = te) {
  const t = u(e);
  function r(n) {
    t.setHeaders({
      // Add this so the server knows it is an request from the browser
      "X-Requested-With": "XMLHttpRequest",
      // Inject user auth
      requesttoken: n ?? ""
    });
  }
  return onRequestTokenUpdate(r), r(getRequestToken()), c().patch("fetch", (n, i) => {
    const d = i.headers;
    return d?.method && (i.method = d.method, delete d.method), fetch(n, i);
  }), t;
}, dr = async (e, t = "/", r = ee) => (await e.getDirectoryContents(`${r}${t}`, {
  details: !0,
  data: Ee(),
  headers: {
    // see davGetClient for patched webdav client
    method: "REPORT"
  },
  includeSelf: !0
})).data.filter((n) => n.filename !== t).map((n) => ve(n, r)), ve = function(e, t = ee, r = te) {
  const s = e.props, n = be(s?.permissions), i = getCurrentUser()?.uid, d = {
    id: s?.fileid || 0,
    source: `${r}${e.filename}`,
    mtime: new Date(Date.parse(e.lastmod)),
    mime: e.mime,
    size: s?.size || Number.parseInt(s.getcontentlength || "0"),
    permissions: n,
    owner: i,
    root: t,
    attributes: {
      ...e,
      ...s,
      hasPreview: s?.["has-preview"]
    }
  };
  return delete d.attributes?.props, e.type === "file" ? new ye(d) : new _e(d);
};
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
class Te {
  _views = [];
  _currentView = null;
  register(t) {
    if (this._views.find((r) => r.id === t.id))
      throw new Error(`View id ${t.id} is already registered`);
    this._views.push(t);
  }
  remove(t) {
    const r = this._views.findIndex((s) => s.id === t);
    r !== -1 && this._views.splice(r, 1);
  }
  get views() {
    return this._views;
  }
  setActive(t) {
    this._currentView = t;
  }
  get active() {
    return this._currentView;
  }
}
const ar = function() {
  return typeof window._nc_navigation > "u" && (window._nc_navigation = new Te(), m.debug("Navigation service initialized")), window._nc_navigation;
};
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
class Ie {
  _column;
  constructor(t) {
    Ae(t), this._column = t;
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
const Ae = function(e) {
  if (!e.id || typeof e.id != "string")
    throw new Error("A column id is required");
  if (!e.title || typeof e.title != "string")
    throw new Error("A column title is required");
  if (!e.render || typeof e.render != "function")
    throw new Error("A render function is required");
  if (e.sort && typeof e.sort != "function")
    throw new Error("Column sortFunction must be a function");
  if (e.summary && typeof e.summary != "function")
    throw new Error("Column summary must be a function");
  return !0;
};
var S = {}, O = {};
(function(e) {
  const t = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", r = t + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040", s = "[" + t + "][" + r + "]*", n = new RegExp("^" + s + "$"), i = function(u, o) {
    const a = [];
    let l = o.exec(u);
    for (; l; ) {
      const f = [];
      f.startIndex = o.lastIndex - l[0].length;
      const c = l.length;
      for (let g = 0; g < c; g++)
        f.push(l[g]);
      a.push(f), l = o.exec(u);
    }
    return a;
  }, d = function(u) {
    const o = n.exec(u);
    return !(o === null || typeof o > "u");
  };
  e.isExist = function(u) {
    return typeof u < "u";
  }, e.isEmptyObject = function(u) {
    return Object.keys(u).length === 0;
  }, e.merge = function(u, o, a) {
    if (o) {
      const l = Object.keys(o), f = l.length;
      for (let c = 0; c < f; c++)
        a === "strict" ? u[l[c]] = [o[l[c]]] : u[l[c]] = o[l[c]];
    }
  }, e.getValue = function(u) {
    return e.isExist(u) ? u : "";
  }, e.isName = d, e.getAllMatches = i, e.nameRegexp = s;
})(O);
const M = O, Oe = {
  allowBooleanAttributes: !1,
  //A tag can have attributes without any value
  unpairedTags: []
};
S.validate = function(e, t) {
  t = Object.assign({}, Oe, t);
  const r = [];
  let s = !1, n = !1;
  e[0] === "\uFEFF" && (e = e.substr(1));
  for (let i = 0; i < e.length; i++)
    if (e[i] === "<" && e[i + 1] === "?") {
      if (i += 2, i = G(e, i), i.err)
        return i;
    } else if (e[i] === "<") {
      let d = i;
      if (i++, e[i] === "!") {
        i = z(e, i);
        continue;
      } else {
        let u = !1;
        e[i] === "/" && (u = !0, i++);
        let o = "";
        for (; i < e.length && e[i] !== ">" && e[i] !== " " && e[i] !== "	" && e[i] !== `
` && e[i] !== "\r"; i++)
          o += e[i];
        if (o = o.trim(), o[o.length - 1] === "/" && (o = o.substring(0, o.length - 1), i--), !Re(o)) {
          let f;
          return o.trim().length === 0 ? f = "Invalid space after '<'." : f = "Tag '" + o + "' is an invalid name.", dist_p("InvalidTag", f, w(e, i));
        }
        const a = xe(e, i);
        if (a === !1)
          return dist_p("InvalidAttr", "Attributes for '" + o + "' have open quote.", w(e, i));
        let l = a.value;
        if (i = a.index, l[l.length - 1] === "/") {
          const f = i - l.length;
          l = l.substring(0, l.length - 1);
          const c = H(l, t);
          if (c === !0)
            s = !0;
          else
            return dist_p(c.err.code, c.err.msg, w(e, f + c.err.line));
        } else if (u)
          if (a.tagClosed) {
            if (l.trim().length > 0)
              return dist_p("InvalidTag", "Closing tag '" + o + "' can't have attributes or invalid starting.", w(e, d));
            {
              const f = r.pop();
              if (o !== f.tagName) {
                let c = w(e, f.tagStartPos);
                return dist_p(
                  "InvalidTag",
                  "Expected closing tag '" + f.tagName + "' (opened in line " + c.line + ", col " + c.col + ") instead of closing tag '" + o + "'.",
                  w(e, d)
                );
              }
              r.length == 0 && (n = !0);
            }
          } else
            return dist_p("InvalidTag", "Closing tag '" + o + "' doesn't have proper closing.", w(e, i));
        else {
          const f = H(l, t);
          if (f !== !0)
            return dist_p(f.err.code, f.err.msg, w(e, i - l.length + f.err.line));
          if (n === !0)
            return dist_p("InvalidXml", "Multiple possible root nodes found.", w(e, i));
          t.unpairedTags.indexOf(o) !== -1 || r.push({ tagName: o, tagStartPos: d }), s = !0;
        }
        for (i++; i < e.length; i++)
          if (e[i] === "<")
            if (e[i + 1] === "!") {
              i++, i = z(e, i);
              continue;
            } else if (e[i + 1] === "?") {
              if (i = G(e, ++i), i.err)
                return i;
            } else
              break;
          else if (e[i] === "&") {
            const f = Ve(e, i);
            if (f == -1)
              return dist_p("InvalidChar", "char '&' is not expected.", w(e, i));
            i = f;
          } else if (n === !0 && !U(e[i]))
            return dist_p("InvalidXml", "Extra text at the end", w(e, i));
        e[i] === "<" && i--;
      }
    } else {
      if (U(e[i]))
        continue;
      return dist_p("InvalidChar", "char '" + e[i] + "' is not expected.", w(e, i));
    }
  if (s) {
    if (r.length == 1)
      return dist_p("InvalidTag", "Unclosed tag '" + r[0].tagName + "'.", w(e, r[0].tagStartPos));
    if (r.length > 0)
      return dist_p("InvalidXml", "Invalid '" + JSON.stringify(r.map((i) => i.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
  } else
    return dist_p("InvalidXml", "Start tag expected.", 1);
  return !0;
};
function U(e) {
  return e === " " || e === "	" || e === `
` || e === "\r";
}
function G(e, t) {
  const r = t;
  for (; t < e.length; t++)
    if (e[t] == "?" || e[t] == " ") {
      const s = e.substr(r, t - r);
      if (t > 5 && s === "xml")
        return dist_p("InvalidXml", "XML declaration allowed only at the start of the document.", w(e, t));
      if (e[t] == "?" && e[t + 1] == ">") {
        t++;
        break;
      } else
        continue;
    }
  return t;
}
function z(e, t) {
  if (e.length > t + 5 && e[t + 1] === "-" && e[t + 2] === "-") {
    for (t += 3; t < e.length; t++)
      if (e[t] === "-" && e[t + 1] === "-" && e[t + 2] === ">") {
        t += 2;
        break;
      }
  } else if (e.length > t + 8 && e[t + 1] === "D" && e[t + 2] === "O" && e[t + 3] === "C" && e[t + 4] === "T" && e[t + 5] === "Y" && e[t + 6] === "P" && e[t + 7] === "E") {
    let r = 1;
    for (t += 8; t < e.length; t++)
      if (e[t] === "<")
        r++;
      else if (e[t] === ">" && (r--, r === 0))
        break;
  } else if (e.length > t + 9 && e[t + 1] === "[" && e[t + 2] === "C" && e[t + 3] === "D" && e[t + 4] === "A" && e[t + 5] === "T" && e[t + 6] === "A" && e[t + 7] === "[") {
    for (t += 8; t < e.length; t++)
      if (e[t] === "]" && e[t + 1] === "]" && e[t + 2] === ">") {
        t += 2;
        break;
      }
  }
  return t;
}
const Ce = '"', Pe = "'";
function xe(e, t) {
  let r = "", s = "", n = !1;
  for (; t < e.length; t++) {
    if (e[t] === Ce || e[t] === Pe)
      s === "" ? s = e[t] : s !== e[t] || (s = "");
    else if (e[t] === ">" && s === "") {
      n = !0;
      break;
    }
    r += e[t];
  }
  return s !== "" ? !1 : {
    value: r,
    index: t,
    tagClosed: n
  };
}
const $e = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
function H(e, t) {
  const r = M.getAllMatches(e, $e), s = {};
  for (let n = 0; n < r.length; n++) {
    if (r[n][1].length === 0)
      return dist_p("InvalidAttr", "Attribute '" + r[n][2] + "' has no space in starting.", v(r[n]));
    if (r[n][3] !== void 0 && r[n][4] === void 0)
      return dist_p("InvalidAttr", "Attribute '" + r[n][2] + "' is without value.", v(r[n]));
    if (r[n][3] === void 0 && !t.allowBooleanAttributes)
      return dist_p("InvalidAttr", "boolean attribute '" + r[n][2] + "' is not allowed.", v(r[n]));
    const i = r[n][2];
    if (!Le(i))
      return dist_p("InvalidAttr", "Attribute '" + i + "' is an invalid name.", v(r[n]));
    if (!s.hasOwnProperty(i))
      s[i] = 1;
    else
      return dist_p("InvalidAttr", "Attribute '" + i + "' is repeated.", v(r[n]));
  }
  return !0;
}
function Fe(e, t) {
  let r = /\d/;
  for (e[t] === "x" && (t++, r = /[\da-fA-F]/); t < e.length; t++) {
    if (e[t] === ";")
      return t;
    if (!e[t].match(r))
      break;
  }
  return -1;
}
function Ve(e, t) {
  if (t++, e[t] === ";")
    return -1;
  if (e[t] === "#")
    return t++, Fe(e, t);
  let r = 0;
  for (; t < e.length; t++, r++)
    if (!(e[t].match(/\w/) && r < 20)) {
      if (e[t] === ";")
        break;
      return -1;
    }
  return t;
}
function dist_p(e, t, r) {
  return {
    err: {
      code: e,
      msg: t,
      line: r.line || r,
      col: r.col
    }
  };
}
function Le(e) {
  return M.isName(e);
}
function Re(e) {
  return M.isName(e);
}
function w(e, t) {
  const r = e.substring(0, t).split(/\r?\n/);
  return {
    line: r.length,
    // column number is last line's length + 1, because column numbering starts at 1:
    col: r[r.length - 1].length + 1
  };
}
function v(e) {
  return e.startIndex + e[1].length;
}
var B = {};
const re = {
  preserveOrder: !1,
  attributeNamePrefix: "@_",
  attributesGroupName: !1,
  textNodeName: "#text",
  ignoreAttributes: !0,
  removeNSPrefix: !1,
  // remove NS from tag name or attribute name if true
  allowBooleanAttributes: !1,
  //a tag can have attributes without any value
  //ignoreRootElement : false,
  parseTagValue: !0,
  parseAttributeValue: !1,
  trimValues: !0,
  //Trim string values of tag and attributes
  cdataPropName: !1,
  numberParseOptions: {
    hex: !0,
    leadingZeros: !0,
    eNotation: !0
  },
  tagValueProcessor: function(e, t) {
    return t;
  },
  attributeValueProcessor: function(e, t) {
    return t;
  },
  stopNodes: [],
  //nested tags will not be parsed even for errors
  alwaysCreateTextNode: !1,
  isArray: () => !1,
  commentPropName: !1,
  unpairedTags: [],
  processEntities: !0,
  htmlEntities: !1,
  ignoreDeclaration: !1,
  ignorePiTags: !1,
  transformTagName: !1,
  transformAttributeName: !1,
  updateTag: function(e, t, r) {
    return e;
  }
  // skipEmptyListItem: false
}, Se = function(e) {
  return Object.assign({}, re, e);
};
B.buildOptions = Se;
B.defaultOptions = re;
class Me {
  constructor(t) {
    this.tagname = t, this.child = [], this[":@"] = {};
  }
  add(t, r) {
    t === "__proto__" && (t = "#__proto__"), this.child.push({ [t]: r });
  }
  addChild(t) {
    t.tagname === "__proto__" && (t.tagname = "#__proto__"), t[":@"] && Object.keys(t[":@"]).length > 0 ? this.child.push({ [t.tagname]: t.child, ":@": t[":@"] }) : this.child.push({ [t.tagname]: t.child });
  }
}
var Be = Me;
const ke = O;
function qe(e, t) {
  const r = {};
  if (e[t + 3] === "O" && e[t + 4] === "C" && e[t + 5] === "T" && e[t + 6] === "Y" && e[t + 7] === "P" && e[t + 8] === "E") {
    t = t + 9;
    let s = 1, n = !1, i = !1, d = "";
    for (; t < e.length; t++)
      if (e[t] === "<" && !i) {
        if (n && Ge(e, t))
          t += 7, [entityName, val, t] = Xe(e, t + 1), val.indexOf("&") === -1 && (r[We(entityName)] = {
            regx: RegExp(`&${entityName};`, "g"),
            val
          });
        else if (n && ze(e, t))
          t += 8;
        else if (n && He(e, t))
          t += 8;
        else if (n && Ke(e, t))
          t += 9;
        else if (Ue)
          i = !0;
        else
          throw new Error("Invalid DOCTYPE");
        s++, d = "";
      } else if (e[t] === ">") {
        if (i ? e[t - 1] === "-" && e[t - 2] === "-" && (i = !1, s--) : s--, s === 0)
          break;
      } else
        e[t] === "[" ? n = !0 : d += e[t];
    if (s !== 0)
      throw new Error("Unclosed DOCTYPE");
  } else
    throw new Error("Invalid Tag instead of DOCTYPE");
  return { entities: r, i: t };
}
function Xe(e, t) {
  let r = "";
  for (; t < e.length && e[t] !== "'" && e[t] !== '"'; t++)
    r += e[t];
  if (r = r.trim(), r.indexOf(" ") !== -1)
    throw new Error("External entites are not supported");
  const s = e[t++];
  let n = "";
  for (; t < e.length && e[t] !== s; t++)
    n += e[t];
  return [r, n, t];
}
function Ue(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "-" && e[t + 3] === "-";
}
function Ge(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "E" && e[t + 3] === "N" && e[t + 4] === "T" && e[t + 5] === "I" && e[t + 6] === "T" && e[t + 7] === "Y";
}
function ze(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "E" && e[t + 3] === "L" && e[t + 4] === "E" && e[t + 5] === "M" && e[t + 6] === "E" && e[t + 7] === "N" && e[t + 8] === "T";
}
function He(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "A" && e[t + 3] === "T" && e[t + 4] === "T" && e[t + 5] === "L" && e[t + 6] === "I" && e[t + 7] === "S" && e[t + 8] === "T";
}
function Ke(e, t) {
  return e[t + 1] === "!" && e[t + 2] === "N" && e[t + 3] === "O" && e[t + 4] === "T" && e[t + 5] === "A" && e[t + 6] === "T" && e[t + 7] === "I" && e[t + 8] === "O" && e[t + 9] === "N";
}
function We(e) {
  if (ke.isName(e))
    return e;
  throw new Error(`Invalid entity name ${e}`);
}
var Ze = qe;
const je = /^[-+]?0x[a-fA-F0-9]+$/, Ye = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
!Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt);
!Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
const Je = {
  hex: !0,
  leadingZeros: !0,
  decimalPoint: ".",
  eNotation: !0
  //skipLike: /regex/
};
function Qe(e, t = {}) {
  if (t = Object.assign({}, Je, t), !e || typeof e != "string")
    return e;
  let r = e.trim();
  if (t.skipLike !== void 0 && t.skipLike.test(r))
    return e;
  if (t.hex && je.test(r))
    return Number.parseInt(r, 16);
  {
    const s = Ye.exec(r);
    if (s) {
      const n = s[1], i = s[2];
      let d = De(s[3]);
      const u = s[4] || s[6];
      if (!t.leadingZeros && i.length > 0 && n && r[2] !== ".")
        return e;
      if (!t.leadingZeros && i.length > 0 && !n && r[1] !== ".")
        return e;
      {
        const o = Number(r), a = "" + o;
        return a.search(/[eE]/) !== -1 || u ? t.eNotation ? o : e : r.indexOf(".") !== -1 ? a === "0" && d === "" || a === d || n && a === "-" + d ? o : e : i ? d === a || n + d === a ? o : e : r === a || r === n + a ? o : e;
      }
    } else
      return e;
  }
}
function De(e) {
  return e && e.indexOf(".") !== -1 && (e = e.replace(/0+$/, ""), e === "." ? e = "0" : e[0] === "." ? e = "0" + e : e[e.length - 1] === "." && (e = e.substr(0, e.length - 1))), e;
}
var et = Qe;
const k = O, T = Be, tt = Ze, rt = et;
"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, k.nameRegexp);
let nt = class {
  constructor(t) {
    this.options = t, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = {
      apos: { regex: /&(apos|#39|#x27);/g, val: "'" },
      gt: { regex: /&(gt|#62|#x3E);/g, val: ">" },
      lt: { regex: /&(lt|#60|#x3C);/g, val: "<" },
      quot: { regex: /&(quot|#34|#x22);/g, val: '"' }
    }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = {
      space: { regex: /&(nbsp|#160);/g, val: " " },
      // "lt" : { regex: /&(lt|#60);/g, val: "<" },
      // "gt" : { regex: /&(gt|#62);/g, val: ">" },
      // "amp" : { regex: /&(amp|#38);/g, val: "&" },
      // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
      // "apos" : { regex: /&(apos|#39);/g, val: "'" },
      cent: { regex: /&(cent|#162);/g, val: "¢" },
      pound: { regex: /&(pound|#163);/g, val: "£" },
      yen: { regex: /&(yen|#165);/g, val: "¥" },
      euro: { regex: /&(euro|#8364);/g, val: "€" },
      copyright: { regex: /&(copy|#169);/g, val: "©" },
      reg: { regex: /&(reg|#174);/g, val: "®" },
      inr: { regex: /&(inr|#8377);/g, val: "₹" }
    }, this.addExternalEntities = it, this.parseXml = at, this.parseTextData = st, this.resolveNameSpace = ot, this.buildAttributesMap = dt, this.isItStopNode = ht, this.replaceEntitiesValue = ft, this.readStopNodeData = gt, this.saveTextToParentTag = ct, this.addChild = lt;
  }
};
function it(e) {
  const t = Object.keys(e);
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    this.lastEntities[s] = {
      regex: new RegExp("&" + s + ";", "g"),
      val: e[s]
    };
  }
}
function st(e, t, r, s, n, i, d) {
  if (e !== void 0 && (this.options.trimValues && !s && (e = e.trim()), e.length > 0)) {
    d || (e = this.replaceEntitiesValue(e));
    const u = this.options.tagValueProcessor(t, e, r, n, i);
    return u == null ? e : typeof u != typeof e || u !== e ? u : this.options.trimValues ? $(e, this.options.parseTagValue, this.options.numberParseOptions) : e.trim() === e ? $(e, this.options.parseTagValue, this.options.numberParseOptions) : e;
  }
}
function ot(e) {
  if (this.options.removeNSPrefix) {
    const t = e.split(":"), r = e.charAt(0) === "/" ? "/" : "";
    if (t[0] === "xmlns")
      return "";
    t.length === 2 && (e = r + t[1]);
  }
  return e;
}
const ut = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
function dt(e, t, r) {
  if (!this.options.ignoreAttributes && typeof e == "string") {
    const s = k.getAllMatches(e, ut), n = s.length, i = {};
    for (let d = 0; d < n; d++) {
      const u = this.resolveNameSpace(s[d][1]);
      let o = s[d][4], a = this.options.attributeNamePrefix + u;
      if (u.length)
        if (this.options.transformAttributeName && (a = this.options.transformAttributeName(a)), a === "__proto__" && (a = "#__proto__"), o !== void 0) {
          this.options.trimValues && (o = o.trim()), o = this.replaceEntitiesValue(o);
          const l = this.options.attributeValueProcessor(u, o, t);
          l == null ? i[a] = o : typeof l != typeof o || l !== o ? i[a] = l : i[a] = $(
            o,
            this.options.parseAttributeValue,
            this.options.numberParseOptions
          );
        } else
          this.options.allowBooleanAttributes && (i[a] = !0);
    }
    if (!Object.keys(i).length)
      return;
    if (this.options.attributesGroupName) {
      const d = {};
      return d[this.options.attributesGroupName] = i, d;
    }
    return i;
  }
}
const at = function(e) {
  e = e.replace(/\r\n?/g, `
`);
  const t = new T("!xml");
  let r = t, s = "", n = "";
  for (let i = 0; i < e.length; i++)
    if (e[i] === "<")
      if (e[i + 1] === "/") {
        const u = y(e, ">", i, "Closing Tag is not closed.");
        let o = e.substring(i + 2, u).trim();
        if (this.options.removeNSPrefix) {
          const f = o.indexOf(":");
          f !== -1 && (o = o.substr(f + 1));
        }
        this.options.transformTagName && (o = this.options.transformTagName(o)), r && (s = this.saveTextToParentTag(s, r, n));
        const a = n.substring(n.lastIndexOf(".") + 1);
        if (o && this.options.unpairedTags.indexOf(o) !== -1)
          throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);
        let l = 0;
        a && this.options.unpairedTags.indexOf(a) !== -1 ? (l = n.lastIndexOf(".", n.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : l = n.lastIndexOf("."), n = n.substring(0, l), r = this.tagsNodeStack.pop(), s = "", i = u;
      } else if (e[i + 1] === "?") {
        let u = x(e, i, !1, "?>");
        if (!u)
          throw new Error("Pi Tag is not closed.");
        if (s = this.saveTextToParentTag(s, r, n), !(this.options.ignoreDeclaration && u.tagName === "?xml" || this.options.ignorePiTags)) {
          const o = new T(u.tagName);
          o.add(this.options.textNodeName, ""), u.tagName !== u.tagExp && u.attrExpPresent && (o[":@"] = this.buildAttributesMap(u.tagExp, n, u.tagName)), this.addChild(r, o, n);
        }
        i = u.closeIndex + 1;
      } else if (e.substr(i + 1, 3) === "!--") {
        const u = y(e, "-->", i + 4, "Comment is not closed.");
        if (this.options.commentPropName) {
          const o = e.substring(i + 4, u - 2);
          s = this.saveTextToParentTag(s, r, n), r.add(this.options.commentPropName, [{ [this.options.textNodeName]: o }]);
        }
        i = u;
      } else if (e.substr(i + 1, 2) === "!D") {
        const u = tt(e, i);
        this.docTypeEntities = u.entities, i = u.i;
      } else if (e.substr(i + 1, 2) === "![") {
        const u = y(e, "]]>", i, "CDATA is not closed.") - 2, o = e.substring(i + 9, u);
        if (s = this.saveTextToParentTag(s, r, n), this.options.cdataPropName)
          r.add(this.options.cdataPropName, [{ [this.options.textNodeName]: o }]);
        else {
          let a = this.parseTextData(o, r.tagname, n, !0, !1, !0);
          a == null && (a = ""), r.add(this.options.textNodeName, a);
        }
        i = u + 2;
      } else {
        let u = x(e, i, this.options.removeNSPrefix), o = u.tagName;
        const a = u.rawTagName;
        let l = u.tagExp, f = u.attrExpPresent, c = u.closeIndex;
        this.options.transformTagName && (o = this.options.transformTagName(o)), r && s && r.tagname !== "!xml" && (s = this.saveTextToParentTag(s, r, n, !1));
        const g = r;
        if (g && this.options.unpairedTags.indexOf(g.tagname) !== -1 && (r = this.tagsNodeStack.pop(), n = n.substring(0, n.lastIndexOf("."))), o !== t.tagname && (n += n ? "." + o : o), this.isItStopNode(this.options.stopNodes, n, o)) {
          let h = "";
          if (l.length > 0 && l.lastIndexOf("/") === l.length - 1)
            i = u.closeIndex;
          else if (this.options.unpairedTags.indexOf(o) !== -1)
            i = u.closeIndex;
          else {
            const E = this.readStopNodeData(e, a, c + 1);
            if (!E)
              throw new Error(`Unexpected end of ${a}`);
            i = E.i, h = E.tagContent;
          }
          const _ = new T(o);
          o !== l && f && (_[":@"] = this.buildAttributesMap(l, n, o)), h && (h = this.parseTextData(h, o, n, !0, f, !0, !0)), n = n.substr(0, n.lastIndexOf(".")), _.add(this.options.textNodeName, h), this.addChild(r, _, n);
        } else {
          if (l.length > 0 && l.lastIndexOf("/") === l.length - 1) {
            o[o.length - 1] === "/" ? (o = o.substr(0, o.length - 1), n = n.substr(0, n.length - 1), l = o) : l = l.substr(0, l.length - 1), this.options.transformTagName && (o = this.options.transformTagName(o));
            const h = new T(o);
            o !== l && f && (h[":@"] = this.buildAttributesMap(l, n, o)), this.addChild(r, h, n), n = n.substr(0, n.lastIndexOf("."));
          } else {
            const h = new T(o);
            this.tagsNodeStack.push(r), o !== l && f && (h[":@"] = this.buildAttributesMap(l, n, o)), this.addChild(r, h, n), r = h;
          }
          s = "", i = c;
        }
      }
    else
      s += e[i];
  return t.child;
};
function lt(e, t, r) {
  const s = this.options.updateTag(t.tagname, r, t[":@"]);
  s === !1 || (typeof s == "string" && (t.tagname = s), e.addChild(t));
}
const ft = function(e) {
  if (this.options.processEntities) {
    for (let t in this.docTypeEntities) {
      const r = this.docTypeEntities[t];
      e = e.replace(r.regx, r.val);
    }
    for (let t in this.lastEntities) {
      const r = this.lastEntities[t];
      e = e.replace(r.regex, r.val);
    }
    if (this.options.htmlEntities)
      for (let t in this.htmlEntities) {
        const r = this.htmlEntities[t];
        e = e.replace(r.regex, r.val);
      }
    e = e.replace(this.ampEntity.regex, this.ampEntity.val);
  }
  return e;
};
function ct(e, t, r, s) {
  return e && (s === void 0 && (s = Object.keys(t.child).length === 0), e = this.parseTextData(
    e,
    t.tagname,
    r,
    !1,
    t[":@"] ? Object.keys(t[":@"]).length !== 0 : !1,
    s
  ), e !== void 0 && e !== "" && t.add(this.options.textNodeName, e), e = ""), e;
}
function ht(e, t, r) {
  const s = "*." + r;
  for (const n in e) {
    const i = e[n];
    if (s === i || t === i)
      return !0;
  }
  return !1;
}
function pt(e, t, r = ">") {
  let s, n = "";
  for (let i = t; i < e.length; i++) {
    let d = e[i];
    if (s)
      d === s && (s = "");
    else if (d === '"' || d === "'")
      s = d;
    else if (d === r[0])
      if (r[1]) {
        if (e[i + 1] === r[1])
          return {
            data: n,
            index: i
          };
      } else
        return {
          data: n,
          index: i
        };
    else
      d === "	" && (d = " ");
    n += d;
  }
}
function y(e, t, r, s) {
  const n = e.indexOf(t, r);
  if (n === -1)
    throw new Error(s);
  return n + t.length - 1;
}
function x(e, t, r, s = ">") {
  const n = pt(e, t + 1, s);
  if (!n)
    return;
  let i = n.data;
  const d = n.index, u = i.search(/\s/);
  let o = i, a = !0;
  u !== -1 && (o = i.substr(0, u).replace(/\s\s*$/, ""), i = i.substr(u + 1));
  const l = o;
  if (r) {
    const f = o.indexOf(":");
    f !== -1 && (o = o.substr(f + 1), a = o !== n.data.substr(f + 1));
  }
  return {
    tagName: o,
    tagExp: i,
    closeIndex: d,
    attrExpPresent: a,
    rawTagName: l
  };
}
function gt(e, t, r) {
  const s = r;
  let n = 1;
  for (; r < e.length; r++)
    if (e[r] === "<")
      if (e[r + 1] === "/") {
        const i = y(e, ">", r, `${t} is not closed`);
        if (e.substring(r + 2, i).trim() === t && (n--, n === 0))
          return {
            tagContent: e.substring(s, r),
            i
          };
        r = i;
      } else if (e[r + 1] === "?")
        r = y(e, "?>", r + 1, "StopNode is not closed.");
      else if (e.substr(r + 1, 3) === "!--")
        r = y(e, "-->", r + 3, "StopNode is not closed.");
      else if (e.substr(r + 1, 2) === "![")
        r = y(e, "]]>", r, "StopNode is not closed.") - 2;
      else {
        const i = x(e, r, ">");
        i && ((i && i.tagName) === t && i.tagExp[i.tagExp.length - 1] !== "/" && n++, r = i.closeIndex);
      }
}
function $(e, t, r) {
  if (t && typeof e == "string") {
    const s = e.trim();
    return s === "true" ? !0 : s === "false" ? !1 : rt(e, r);
  } else
    return k.isExist(e) ? e : "";
}
var wt = nt, ne = {};
function mt(e, t) {
  return ie(e, t);
}
function ie(e, t, r) {
  let s;
  const n = {};
  for (let i = 0; i < e.length; i++) {
    const d = e[i], u = Nt(d);
    let o = "";
    if (r === void 0 ? o = u : o = r + "." + u, u === t.textNodeName)
      s === void 0 ? s = d[u] : s += "" + d[u];
    else {
      if (u === void 0)
        continue;
      if (d[u]) {
        let a = ie(d[u], t, o);
        const l = bt(a, t);
        d[":@"] ? Et(a, d[":@"], o, t) : Object.keys(a).length === 1 && a[t.textNodeName] !== void 0 && !t.alwaysCreateTextNode ? a = a[t.textNodeName] : Object.keys(a).length === 0 && (t.alwaysCreateTextNode ? a[t.textNodeName] = "" : a = ""), n[u] !== void 0 && n.hasOwnProperty(u) ? (Array.isArray(n[u]) || (n[u] = [n[u]]), n[u].push(a)) : t.isArray(u, o, l) ? n[u] = [a] : n[u] = a;
      }
    }
  }
  return typeof s == "string" ? s.length > 0 && (n[t.textNodeName] = s) : s !== void 0 && (n[t.textNodeName] = s), n;
}
function Nt(e) {
  const t = Object.keys(e);
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    if (s !== ":@")
      return s;
  }
}
function Et(e, t, r, s) {
  if (t) {
    const n = Object.keys(t), i = n.length;
    for (let d = 0; d < i; d++) {
      const u = n[d];
      s.isArray(u, r + "." + u, !0, !0) ? e[u] = [t[u]] : e[u] = t[u];
    }
  }
}
function bt(e, t) {
  const { textNodeName: r } = t, s = Object.keys(e).length;
  return !!(s === 0 || s === 1 && (e[r] || typeof e[r] == "boolean" || e[r] === 0));
}
ne.prettify = mt;
const { buildOptions: yt } = B, _t = wt, { prettify: vt } = ne, Tt = S;
let It = class {
  constructor(t) {
    this.externalEntities = {}, this.options = yt(t);
  }
  /**
   * Parse XML dats to JS object 
   * @param {string|Buffer} xmlData 
   * @param {boolean|Object} validationOption 
   */
  parse(t, r) {
    if (typeof t != "string")
      if (t.toString)
        t = t.toString();
      else
        throw new Error("XML data is accepted in String or Bytes[] form.");
    if (r) {
      r === !0 && (r = {});
      const i = Tt.validate(t, r);
      if (i !== !0)
        throw Error(`${i.err.msg}:${i.err.line}:${i.err.col}`);
    }
    const s = new _t(this.options);
    s.addExternalEntities(this.externalEntities);
    const n = s.parseXml(t);
    return this.options.preserveOrder || n === void 0 ? n : vt(n, this.options);
  }
  /**
   * Add Entity which is not by default supported by this library
   * @param {string} key 
   * @param {string} value 
   */
  addEntity(t, r) {
    if (r.indexOf("&") !== -1)
      throw new Error("Entity value can't have '&'");
    if (t.indexOf("&") !== -1 || t.indexOf(";") !== -1)
      throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
    if (r === "&")
      throw new Error("An entity with value '&' is not permitted");
    this.externalEntities[t] = r;
  }
};
var At = It;
const Ot = `
`;
function Ct(e, t) {
  let r = "";
  return t.format && t.indentBy.length > 0 && (r = Ot), se(e, t, "", r);
}
function se(e, t, r, s) {
  let n = "", i = !1;
  for (let d = 0; d < e.length; d++) {
    const u = e[d], o = Pt(u);
    if (o === void 0)
      continue;
    let a = "";
    if (r.length === 0 ? a = o : a = `${r}.${o}`, o === t.textNodeName) {
      let h = u[o];
      xt(a, t) || (h = t.tagValueProcessor(o, h), h = oe(h, t)), i && (n += s), n += h, i = !1;
      continue;
    } else if (o === t.cdataPropName) {
      i && (n += s), n += `<![CDATA[${u[o][0][t.textNodeName]}]]>`, i = !1;
      continue;
    } else if (o === t.commentPropName) {
      n += s + `<!--${u[o][0][t.textNodeName]}-->`, i = !0;
      continue;
    } else if (o[0] === "?") {
      const h = K(u[":@"], t), _ = o === "?xml" ? "" : s;
      let E = u[o][0][t.textNodeName];
      E = E.length !== 0 ? " " + E : "", n += _ + `<${o}${E}${h}?>`, i = !0;
      continue;
    }
    let l = s;
    l !== "" && (l += t.indentBy);
    const f = K(u[":@"], t), c = s + `<${o}${f}`, g = se(u[o], t, a, l);
    t.unpairedTags.indexOf(o) !== -1 ? t.suppressUnpairedNode ? n += c + ">" : n += c + "/>" : (!g || g.length === 0) && t.suppressEmptyNode ? n += c + "/>" : g && g.endsWith(">") ? n += c + `>${g}${s}</${o}>` : (n += c + ">", g && s !== "" && (g.includes("/>") || g.includes("</")) ? n += s + t.indentBy + g + s : n += g, n += `</${o}>`), i = !0;
  }
  return n;
}
function Pt(e) {
  const t = Object.keys(e);
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    if (e.hasOwnProperty(s) && s !== ":@")
      return s;
  }
}
function K(e, t) {
  let r = "";
  if (e && !t.ignoreAttributes)
    for (let s in e) {
      if (!e.hasOwnProperty(s))
        continue;
      let n = t.attributeValueProcessor(s, e[s]);
      n = oe(n, t), n === !0 && t.suppressBooleanAttributes ? r += ` ${s.substr(t.attributeNamePrefix.length)}` : r += ` ${s.substr(t.attributeNamePrefix.length)}="${n}"`;
    }
  return r;
}
function xt(e, t) {
  e = e.substr(0, e.length - t.textNodeName.length - 1);
  let r = e.substr(e.lastIndexOf(".") + 1);
  for (let s in t.stopNodes)
    if (t.stopNodes[s] === e || t.stopNodes[s] === "*." + r)
      return !0;
  return !1;
}
function oe(e, t) {
  if (e && e.length > 0 && t.processEntities)
    for (let r = 0; r < t.entities.length; r++) {
      const s = t.entities[r];
      e = e.replace(s.regex, s.val);
    }
  return e;
}
var $t = Ct;
const Ft = $t, Vt = {
  attributeNamePrefix: "@_",
  attributesGroupName: !1,
  textNodeName: "#text",
  ignoreAttributes: !0,
  cdataPropName: !1,
  format: !1,
  indentBy: "  ",
  suppressEmptyNode: !1,
  suppressUnpairedNode: !0,
  suppressBooleanAttributes: !0,
  tagValueProcessor: function(e, t) {
    return t;
  },
  attributeValueProcessor: function(e, t) {
    return t;
  },
  preserveOrder: !1,
  commentPropName: !1,
  unpairedTags: [],
  entities: [
    { regex: new RegExp("&", "g"), val: "&amp;" },
    //it must be on top
    { regex: new RegExp(">", "g"), val: "&gt;" },
    { regex: new RegExp("<", "g"), val: "&lt;" },
    { regex: new RegExp("'", "g"), val: "&apos;" },
    { regex: new RegExp('"', "g"), val: "&quot;" }
  ],
  processEntities: !0,
  stopNodes: [],
  // transformTagName: false,
  // transformAttributeName: false,
  oneListGroup: !1
};
function b(e) {
  this.options = Object.assign({}, Vt, e), this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
    return !1;
  } : (this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = St), this.processTextOrObjNode = Lt, this.options.format ? (this.indentate = Rt, this.tagEndChar = `>
`, this.newLine = `
`) : (this.indentate = function() {
    return "";
  }, this.tagEndChar = ">", this.newLine = "");
}
b.prototype.build = function(e) {
  return this.options.preserveOrder ? Ft(e, this.options) : (Array.isArray(e) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (e = {
    [this.options.arrayNodeName]: e
  }), this.j2x(e, 0).val);
};
b.prototype.j2x = function(e, t) {
  let r = "", s = "";
  for (let n in e)
    if (Object.prototype.hasOwnProperty.call(e, n))
      if (typeof e[n] > "u")
        this.isAttribute(n) && (s += "");
      else if (e[n] === null)
        this.isAttribute(n) ? s += "" : n[0] === "?" ? s += this.indentate(t) + "<" + n + "?" + this.tagEndChar : s += this.indentate(t) + "<" + n + "/" + this.tagEndChar;
      else if (e[n] instanceof Date)
        s += this.buildTextValNode(e[n], n, "", t);
      else if (typeof e[n] != "object") {
        const i = this.isAttribute(n);
        if (i)
          r += this.buildAttrPairStr(i, "" + e[n]);
        else if (n === this.options.textNodeName) {
          let d = this.options.tagValueProcessor(n, "" + e[n]);
          s += this.replaceEntitiesValue(d);
        } else
          s += this.buildTextValNode(e[n], n, "", t);
      } else if (Array.isArray(e[n])) {
        const i = e[n].length;
        let d = "";
        for (let u = 0; u < i; u++) {
          const o = e[n][u];
          typeof o > "u" || (o === null ? n[0] === "?" ? s += this.indentate(t) + "<" + n + "?" + this.tagEndChar : s += this.indentate(t) + "<" + n + "/" + this.tagEndChar : typeof o == "object" ? this.options.oneListGroup ? d += this.j2x(o, t + 1).val : d += this.processTextOrObjNode(o, n, t) : d += this.buildTextValNode(o, n, "", t));
        }
        this.options.oneListGroup && (d = this.buildObjectNode(d, n, "", t)), s += d;
      } else if (this.options.attributesGroupName && n === this.options.attributesGroupName) {
        const i = Object.keys(e[n]), d = i.length;
        for (let u = 0; u < d; u++)
          r += this.buildAttrPairStr(i[u], "" + e[n][i[u]]);
      } else
        s += this.processTextOrObjNode(e[n], n, t);
  return { attrStr: r, val: s };
};
b.prototype.buildAttrPairStr = function(e, t) {
  return t = this.options.attributeValueProcessor(e, "" + t), t = this.replaceEntitiesValue(t), this.options.suppressBooleanAttributes && t === "true" ? " " + e : " " + e + '="' + t + '"';
};
function Lt(e, t, r) {
  const s = this.j2x(e, r + 1);
  return e[this.options.textNodeName] !== void 0 && Object.keys(e).length === 1 ? this.buildTextValNode(e[this.options.textNodeName], t, s.attrStr, r) : this.buildObjectNode(s.val, t, s.attrStr, r);
}
b.prototype.buildObjectNode = function(e, t, r, s) {
  if (e === "")
    return t[0] === "?" ? this.indentate(s) + "<" + t + r + "?" + this.tagEndChar : this.indentate(s) + "<" + t + r + this.closeTag(t) + this.tagEndChar;
  {
    let n = "</" + t + this.tagEndChar, i = "";
    return t[0] === "?" && (i = "?", n = ""), (r || r === "") && e.indexOf("<") === -1 ? this.indentate(s) + "<" + t + r + i + ">" + e + n : this.options.commentPropName !== !1 && t === this.options.commentPropName && i.length === 0 ? this.indentate(s) + `<!--${e}-->` + this.newLine : this.indentate(s) + "<" + t + r + i + this.tagEndChar + e + this.indentate(s) + n;
  }
};
b.prototype.closeTag = function(e) {
  let t = "";
  return this.options.unpairedTags.indexOf(e) !== -1 ? this.options.suppressUnpairedNode || (t = "/") : this.options.suppressEmptyNode ? t = "/" : t = `></${e}`, t;
};
b.prototype.buildTextValNode = function(e, t, r, s) {
  if (this.options.cdataPropName !== !1 && t === this.options.cdataPropName)
    return this.indentate(s) + `<![CDATA[${e}]]>` + this.newLine;
  if (this.options.commentPropName !== !1 && t === this.options.commentPropName)
    return this.indentate(s) + `<!--${e}-->` + this.newLine;
  if (t[0] === "?")
    return this.indentate(s) + "<" + t + r + "?" + this.tagEndChar;
  {
    let n = this.options.tagValueProcessor(t, e);
    return n = this.replaceEntitiesValue(n), n === "" ? this.indentate(s) + "<" + t + r + this.closeTag(t) + this.tagEndChar : this.indentate(s) + "<" + t + r + ">" + n + "</" + t + this.tagEndChar;
  }
};
b.prototype.replaceEntitiesValue = function(e) {
  if (e && e.length > 0 && this.options.processEntities)
    for (let t = 0; t < this.options.entities.length; t++) {
      const r = this.options.entities[t];
      e = e.replace(r.regex, r.val);
    }
  return e;
};
function Rt(e) {
  return this.options.indentBy.repeat(e);
}
function St(e) {
  return e.startsWith(this.options.attributeNamePrefix) && e !== this.options.textNodeName ? e.substr(this.attrPrefixLen) : !1;
}
var Mt = b;
const Bt = S, kt = At, qt = Mt;
var W = {
  XMLParser: kt,
  XMLValidator: Bt,
  XMLBuilder: qt
};
function Xt(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  if (e = e.trim(), e.length === 0 || W.XMLValidator.validate(e) !== !0)
    return !1;
  let t;
  const r = new W.XMLParser();
  try {
    t = r.parse(e);
  } catch {
    return !1;
  }
  return !(!t || !("svg" in t));
}
/**
 * @copyright Copyright (c) 2022 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
class cr {
  _view;
  constructor(t) {
    Ut(t), this._view = t;
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
  get icon() {
    return this._view.icon;
  }
  set icon(t) {
    this._view.icon = t;
  }
  get order() {
    return this._view.order;
  }
  set order(t) {
    this._view.order = t;
  }
  get params() {
    return this._view.params;
  }
  set params(t) {
    this._view.params = t;
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
  set expanded(t) {
    this._view.expanded = t;
  }
  get defaultSortKey() {
    return this._view.defaultSortKey;
  }
}
const Ut = function(e) {
  if (!e.id || typeof e.id != "string")
    throw new Error("View id is required and must be a string");
  if (!e.name || typeof e.name != "string")
    throw new Error("View name is required and must be a string");
  if (e.columns && e.columns.length > 0 && (!e.caption || typeof e.caption != "string"))
    throw new Error("View caption is required for top-level views and must be a string");
  if (!e.getContents || typeof e.getContents != "function")
    throw new Error("View getContents is required and must be a function");
  if (!e.icon || typeof e.icon != "string" || !Xt(e.icon))
    throw new Error("View icon is required and must be a valid svg string");
  if (!("order" in e) || typeof e.order != "number")
    throw new Error("View order is required and must be a number");
  if (e.columns && e.columns.forEach((t) => {
    if (!(t instanceof Ie))
      throw new Error("View columns must be an array of Column. Invalid column found");
  }), e.emptyView && typeof e.emptyView != "function")
    throw new Error("View emptyView must be a function");
  if (e.parent && typeof e.parent != "string")
    throw new Error("View parent must be a string");
  if ("sticky" in e && typeof e.sticky != "boolean")
    throw new Error("View sticky must be a boolean");
  if ("expanded" in e && typeof e.expanded != "boolean")
    throw new Error("View expanded must be a boolean");
  if (e.defaultSortKey && typeof e.defaultSortKey != "string")
    throw new Error("View defaultSortKey must be a string");
  return !0;
};
/**
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const hr = function(e) {
  return F().registerEntry(e);
}, pr = function(e) {
  return F().unregisterEntry(e);
}, gr = function(e) {
  return F().getEntries(e).sort((r, s) => r.order !== void 0 && s.order !== void 0 && r.order !== s.order ? r.order - s.order : r.displayName.localeCompare(s.displayName, void 0, { numeric: !0, sensitivity: "base" }));
};


// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/node_modules/@nextcloud/vue/dist/index.module.js
var index_module = __webpack_require__(56697);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/index-69148435.mjs + 1 modules
var index_69148435 = __webpack_require__(30518);
// EXTERNAL MODULE: ./node_modules/@vueuse/shared/index.mjs + 1 modules
var shared = __webpack_require__(64886);
// EXTERNAL MODULE: ./node_modules/vue-frag/dist/frag.esm.js
var frag_esm = __webpack_require__(74139);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/toast-c61fd8a5.mjs
var toast_c61fd8a5 = __webpack_require__(11910);
;// CONCATENATED MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/FilePicker-65d21558.mjs











const FilePicker_65d21558_me = {
  name: "FileIcon",
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
var FilePicker_65d21558_ve = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon file-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, he = [], ge = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_me,
  FilePicker_65d21558_ve,
  he,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_K = ge.exports, FilePicker_65d21558_ye = {
  name: "MenuUpIcon",
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
var we = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon menu-up-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M7,15L12,10L17,15H7Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_ke = [], FilePicker_65d21558_Ce = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_ye,
  we,
  FilePicker_65d21558_ke,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_be = FilePicker_65d21558_Ce.exports, FilePicker_65d21558_Fe = {
  name: "MenuDownIcon",
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
var FilePicker_65d21558_Se = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon menu-down-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M7,10L12,15L17,10H7Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_$e = [], FilePicker_65d21558_xe = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Fe,
  FilePicker_65d21558_Se,
  FilePicker_65d21558_$e,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_Ne = FilePicker_65d21558_xe.exports, FilePicker_65d21558_Le = {
  "file-picker__file-icon": "_file-picker__file-icon_1vgv4_5"
}, FilePicker_65d21558_Pe = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.aZ)({
  __name: "LoadingTableRow",
  props: {
    showCheckbox: { type: Boolean }
  },
  setup(l) {
    return { __sfc: !0, fileListIconStyles: FilePicker_65d21558_Le };
  }
});
var FilePicker_65d21558_ze = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t("tr", { staticClass: "file-picker__row loading-row", attrs: { "aria-hidden": "true" } }, [e.showCheckbox ? t("td", { staticClass: "row-checkbox" }, [t("span")]) : e._e(), t("td", { staticClass: "row-name" }, [t("div", { staticClass: "row-wrapper" }, [t("span", { class: i.fileListIconStyles["file-picker__file-icon"] }), t("span")])]), e._m(0), e._m(1)]);
}, FilePicker_65d21558_Be = [function() {
  var l = this, e = l._self._c;
  return l._self._setupProxy, e("td", { staticClass: "row-size" }, [e("span")]);
}, function() {
  var l = this, e = l._self._c;
  return l._self._setupProxy, e("td", { staticClass: "row-modified" }, [e("span")]);
}], FilePicker_65d21558_Ie = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Pe,
  FilePicker_65d21558_ze,
  FilePicker_65d21558_Be,
  !1,
  null,
  "6aded0d9",
  null,
  null
);
const FilePicker_65d21558_Re = FilePicker_65d21558_Ie.exports;
/**
 * @copyright Copyright (c) 2023 Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @author Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
function FilePicker_65d21558_Me(l, e = {}) {
  var t;
  e = { size: 32, cropPreview: !1, mimeFallback: !0, ...e };
  try {
    const i = ((t = l.attributes) == null ? void 0 : t.previewUrl) || (0,router_dist.generateUrl)("/core/preview?fileId={fileid}", {
      fileid: l.fileid
    });
    let n;
    try {
      n = new URL(i);
    } catch {
      n = new URL(i, window.location.origin);
    }
    return n.searchParams.set("x", "".concat(e.size)), n.searchParams.set("y", "".concat(e.size)), n.searchParams.set("mimeFallback", "".concat(e.mimeFallback)), n.searchParams.set("c", "".concat(l.attributes.etag)), n.searchParams.set("a", e.cropPreview === !0 ? "0" : "1"), n;
  } catch {
    return null;
  }
}
const FilePicker_65d21558_De = (l, e) => {
  const t = (0,vue_runtime_esm/* ref */.iH)(null);
  return (0,vue_runtime_esm/* watchEffect */.m0)(() => {
    t.value = FilePicker_65d21558_Me((0,shared/* toValue */.Tn)(l), (0,shared/* toValue */.Tn)(e || {}));
  }), {
    previewURL: t
  };
}, FilePicker_65d21558_Ve = {
  name: "FolderIcon",
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
var FilePicker_65d21558_Te = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon folder-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_He = [], FilePicker_65d21558_Ae = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Ve,
  FilePicker_65d21558_Te,
  FilePicker_65d21558_He,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_V = FilePicker_65d21558_Ae.exports, FilePicker_65d21558_Ee = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.aZ)({
  __name: "FilePreview",
  props: {
    node: null
  },
  setup(l) {
    const e = l, { previewURL: t } = FilePicker_65d21558_De((0,vue_runtime_esm/* toRef */.Vh)(e, "node")), i = (0,vue_runtime_esm/* computed */.Fl)(() => e.node.type === dist_R.File), n = (0,vue_runtime_esm/* ref */.iH)(!1);
    return (0,vue_runtime_esm/* watch */.YP)(t, () => {
      if (n.value = !1, t.value) {
        const s = document.createElement("img");
        s.src = t.value.href, s.onerror = () => s.remove(), s.onload = () => {
          n.value = !0, s.remove();
        }, document.body.appendChild(s);
      }
    }, { immediate: !0 }), { __sfc: !0, props: e, previewURL: t, isFile: i, canLoadPreview: n, t: index_69148435.t, IconFile: FilePicker_65d21558_K, IconFolder: FilePicker_65d21558_V };
  }
});
var FilePicker_65d21558_Ue = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t("div", { staticClass: "file-picker__file-icon", style: i.canLoadPreview ? { backgroundImage: "url(".concat(i.previewURL, ")") } : void 0, attrs: { "aria-label": i.t("MIME type {mime}", { mime: e.node.mime || i.t("unknown") }) } }, [i.canLoadPreview ? e._e() : [i.isFile ? t(i.IconFile, { attrs: { size: 20 } }) : t(i.IconFolder, { attrs: { size: 20 } })]], 2);
}, FilePicker_65d21558_Oe = [], FilePicker_65d21558_Ze = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Ee,
  FilePicker_65d21558_Ue,
  FilePicker_65d21558_Oe,
  !1,
  null,
  "79e0cce3",
  null,
  null
);
const FilePicker_65d21558_je = FilePicker_65d21558_Ze.exports, FilePicker_65d21558_Ge = {
  long: (0,index_69148435.t)("a few seconds ago"),
  short: (0,index_69148435.t)("seconds ago"),
  // FOR TRANSLATORS: Shorter version of 'a few seconds ago'
  narrow: (0,index_69148435.t)("sec. ago")
  // FOR TRANSLATORS: If possible in your language an even shorter version of 'a few seconds ago'
}, FilePicker_65d21558_qe = (0,vue_runtime_esm/* defineComponent */.aZ)({
  name: "NcDatetime",
  props: {
    /**
     * The timestamp to display, either an unix timestamp (in milliseconds) or a Date object
     */
    timestamp: {
      type: [Date, Number],
      required: !0
    },
    /**
     * The format used for displaying, or if relative time is used the format used for the title (optional)
     *
     * @type {Intl.DateTimeFormatOptions}
     */
    format: {
      type: Object,
      default: () => ({ timeStyle: "medium", dateStyle: "short" })
    },
    /**
     * Wether to display the timestamp as time from now (optional)
     *
     * - `false`: Disable relative time
     * - `'long'`: Long text, like *2 seconds ago* (default)
     * - `'short'`: Short text, like *2 sec. ago*
     * - `'narrow'`: Even shorter text (same as `'short'` on some languages)
     */
    relativeTime: {
      type: [Boolean, String],
      default: "long",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (l) => l === !1 || ["long", "short", "narrow"].includes(l)
    },
    /**
     * Ignore seconds when displaying the relative time and just show `a few seconds ago`
     */
    ignoreSeconds: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      /** Current time in ms */
      currentTime: Date.now(),
      /** ID of the current time interval */
      intervalId: void 0
    };
  },
  computed: {
    /** ECMA Date object of the timestamp */
    dateObject() {
      return new Date(this.timestamp);
    },
    /** Time string formatted for main text */
    formattedTime() {
      if (this.relativeTime !== !1) {
        const l = new Intl.RelativeTimeFormat((0,l10n_dist/* getCanonicalLocale */.aj)(), { numeric: "auto", style: this.relativeTime }), t = (this.dateObject.valueOf() - this.currentTime) / 1e3;
        if (Math.abs(t) <= 90)
          return this.ignoreSeconds ? FilePicker_65d21558_Ge[this.relativeTime] : l.format(Math.round(t), "second");
        const i = t / 60;
        if (Math.abs(i) <= 90)
          return l.format(Math.round(i), "minute");
        const n = i / 60;
        if (Math.abs(n) <= 72)
          return l.format(Math.round(n), "hour");
        const s = n / 24;
        if (Math.abs(s) <= 6)
          return l.format(Math.round(s), "day");
        const c = s / 7;
        return Math.abs(c) <= 52 ? l.format(Math.round(c), "week") : l.format(Math.round(s / 365), "year");
      }
      return this.formattedFullTime;
    },
    formattedFullTime() {
      return new Intl.DateTimeFormat((0,l10n_dist/* getCanonicalLocale */.aj)(), this.format).format(this.dateObject);
    }
  },
  watch: {
    /**
     * Set or clear interval if relative time is dis/enabled
     *
     * @param {boolean} newValue The new value of the relativeTime property
     */
    relativeTime(l) {
      window.clearInterval(this.intervalId), this.intervalId = void 0, l && (this.intervalId = window.setInterval(this.setCurrentTime, 1e3));
    }
  },
  mounted() {
    this.relativeTime !== !1 && (this.intervalId = window.setInterval(this.setCurrentTime, 1e3));
  },
  destroyed() {
    window.clearInterval(this.intervalId);
  },
  methods: {
    /**
     * Set `currentTime` to the current timestamp, required as Date.now() is not reactive.
     */
    setCurrentTime() {
      this.currentTime = Date.now();
    }
  }
});
var FilePicker_65d21558_Ke = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("span", { staticClass: "nc-datetime", attrs: { "data-timestamp": e.timestamp, title: e.formattedFullTime } }, [e._v(e._s(e.formattedTime))]);
}, FilePicker_65d21558_We = [], FilePicker_65d21558_Je = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_qe,
  FilePicker_65d21558_Ke,
  FilePicker_65d21558_We,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_Qe = FilePicker_65d21558_Je.exports, FilePicker_65d21558_Xe = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.aZ)({
  __name: "FileListRow",
  props: {
    allowPickDirectory: { type: Boolean },
    selected: { type: Boolean },
    showCheckbox: { type: Boolean },
    canPick: { type: Boolean },
    node: null
  },
  emits: ["update:selected", "enter-directory"],
  setup(l, { emit: e }) {
    const t = l, i = (0,vue_runtime_esm/* computed */.Fl)(() => {
      var _;
      return ((_ = t.node.attributes) == null ? void 0 : _.displayName) || t.node.basename.slice(0, t.node.extension ? -t.node.extension.length : void 0);
    }), n = (0,vue_runtime_esm/* computed */.Fl)(() => t.node.extension), s = (0,vue_runtime_esm/* computed */.Fl)(() => t.node.type === dist_R.Folder), c = (0,vue_runtime_esm/* computed */.Fl)(() => t.canPick && (t.allowPickDirectory || !s.value));
    function u() {
      e("update:selected", !t.selected);
    }
    function a() {
      s.value ? e("enter-directory", t.node) : u();
    }
    function h(_) {
      _.key === "Enter" && a();
    }
    return { __sfc: !0, props: t, emit: e, displayName: i, fileExtension: n, isDirectory: s, isPickable: c, toggleSelected: u, handleClick: a, handleKeyDown: h, formatFileSize: Yt, NcCheckboxRadioSwitch: index_module/* NcCheckboxRadioSwitch */.rw, t: index_69148435.t, FilePreview: FilePicker_65d21558_je, NcDatetime: FilePicker_65d21558_Qe };
  }
});
var FilePicker_65d21558_Ye = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t("tr", e._g(
    { class: ["file-picker__row", {
      "file-picker__row--selected": e.selected && !e.showCheckbox
    }], attrs: { tabindex: e.showCheckbox && !i.isDirectory ? void 0 : 0, "aria-selected": i.isPickable ? e.selected : void 0, "data-filename": e.node.basename, "data-testid": "file-list-row" }, on: { click: i.handleClick } },
    /* same as tabindex -> if we hide the checkbox or this is a directory we need keyboard access to enter the directory or select the node */
    !e.showCheckbox || i.isDirectory ? { keydown: i.handleKeyDown } : {}
  ), [e.showCheckbox ? t("td", { staticClass: "row-checkbox" }, [t(i.NcCheckboxRadioSwitch, { attrs: { disabled: !i.isPickable, checked: e.selected, "aria-label": i.t("Select the row for {nodename}", { nodename: i.displayName }), "data-testid": "row-checkbox" }, on: { click: function(n) {
    n.stopPropagation();
  }, "update:checked": i.toggleSelected } })], 1) : e._e(), t("td", { staticClass: "row-name" }, [t("div", { staticClass: "file-picker__name-container", attrs: { "data-testid": "row-name" } }, [t(i.FilePreview, { attrs: { node: e.node } }), t("div", { staticClass: "file-picker__file-name", attrs: { title: i.displayName }, domProps: { textContent: e._s(i.displayName) } }), t("div", { staticClass: "file-picker__file-extension", domProps: { textContent: e._s(i.fileExtension) } })], 1)]), t("td", { staticClass: "row-size" }, [e._v(" " + e._s(i.formatFileSize(e.node.size || 0)) + " ")]), t("td", { staticClass: "row-modified" }, [e.node.mtime ? t(i.NcDatetime, { attrs: { timestamp: e.node.mtime, "ignore-seconds": !0 } }) : t("span", [e._v(e._s(i.t("Unset")))])], 1)]);
}, FilePicker_65d21558_et = [], FilePicker_65d21558_tt = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Xe,
  FilePicker_65d21558_Ye,
  FilePicker_65d21558_et,
  !1,
  null,
  "41f19c11",
  null,
  null
);
const FilePicker_65d21558_it = FilePicker_65d21558_tt.exports, FilePicker_65d21558_nt = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.aZ)({
  __name: "FileList",
  props: {
    multiselect: { type: Boolean },
    allowPickDirectory: { type: Boolean },
    loading: { type: Boolean },
    files: null,
    selectedFiles: null,
    path: null
  },
  emits: ["update:path", "update:selectedFiles"],
  setup(l, { emit: e }) {
    const t = l, i = (0,vue_runtime_esm/* ref */.iH)("ascending"), n = (0,vue_runtime_esm/* ref */.iH)(void 0), s = (0,vue_runtime_esm/* ref */.iH)(void 0), c = {
      ascending: (r, o, g) => g(r, o),
      descending: (r, o, g) => g(o, r),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      none: (r, o, g) => 0
    }, u = (r, o) => {
      var g, b;
      return (((g = r.attributes) == null ? void 0 : g.displayName) || r.basename).localeCompare(((b = o.attributes) == null ? void 0 : b.displayName) || o.basename, (0,l10n_dist/* getCanonicalLocale */.aj)());
    }, a = (r, o) => (o.size || 0) - (r.size || 0), h = (r, o) => {
      var g, b;
      return (((g = r.mtime) == null ? void 0 : g.getTime()) || 0) - (((b = o.mtime) == null ? void 0 : b.getTime()) || 0);
    }, _ = (r) => {
      const o = r.value;
      s.value = n.value = i.value = void 0, o === "ascending" ? r.value = "descending" : r.value = "ascending";
    }, k = () => _(i), y = () => _(n), S = () => _(s), w = (0,vue_runtime_esm/* computed */.Fl)(() => [...t.files].sort(
      (r, o) => (
        // Folders always come above the files
        (o.type === dist_R.Folder ? 1 : 0) - (r.type === dist_R.Folder ? 1 : 0) || c[i.value || "none"](r, o, u) || c[n.value || "none"](r, o, a) || c[s.value || "none"](r, o, h)
      )
    )), C = (0,vue_runtime_esm/* computed */.Fl)(() => t.files.filter((r) => t.allowPickDirectory || r.type !== dist_R.Folder)), x = (0,vue_runtime_esm/* computed */.Fl)(() => !t.loading && t.selectedFiles.length > 0 && t.selectedFiles.length >= C.value.length);
    function N() {
      t.selectedFiles.length < C.value.length ? e("update:selectedFiles", C.value) : e("update:selectedFiles", []);
    }
    function B(r) {
      t.selectedFiles.includes(r) ? e("update:selectedFiles", t.selectedFiles.filter((o) => o.path !== r.path)) : t.multiselect ? e("update:selectedFiles", [...t.selectedFiles, r]) : e("update:selectedFiles", [r]);
    }
    function I(r) {
      e("update:path", (0,path.join)(t.path, r.basename));
    }
    const R = (0,vue_runtime_esm/* ref */.iH)(4), f = (0,vue_runtime_esm/* ref */.iH)();
    {
      const r = () => (0,vue_runtime_esm/* nextTick */.Y3)(() => {
        var o, g, b, T, H;
        const M = ((g = (o = f.value) == null ? void 0 : o.parentElement) == null ? void 0 : g.children) || [];
        let A = ((T = (b = f.value) == null ? void 0 : b.parentElement) == null ? void 0 : T.clientHeight) || 450;
        for (let L = 0; L < M.length; L++)
          (H = f.value) != null && H.isSameNode(M[L]) || (A -= M[L].clientHeight);
        R.value = Math.floor((A - 50) / 50);
      });
      (0,vue_runtime_esm/* onMounted */.bv)(() => {
        window.addEventListener("resize", r), r();
      }), (0,vue_runtime_esm/* onUnmounted */.Ah)(() => {
        window.removeEventListener("resize", r);
      });
    }
    return { __sfc: !0, props: t, emit: e, sortByName: i, sortBySize: n, sortByModified: s, ordering: c, byName: u, bySize: a, byDate: h, toggleSorting: _, toggleSortByName: k, toggleSortBySize: y, toggleSortByModified: S, sortedFiles: w, selectableFiles: C, allSelected: x, onSelectAll: N, onNodeSelected: B, onChangeDirectory: I, skeletonNumber: R, fileContainer: f, NcButton: index_module/* NcButton */.P2, NcCheckboxRadioSwitch: index_module/* NcCheckboxRadioSwitch */.rw, t: index_69148435.t, IconSortAscending: FilePicker_65d21558_be, IconSortDescending: FilePicker_65d21558_Ne, LoadingTableRow: FilePicker_65d21558_Re, FileListRow: FilePicker_65d21558_it };
  }
});
var FilePicker_65d21558_lt = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t("div", { ref: "fileContainer", staticClass: "file-picker__files" }, [t("table", [t("thead", [t("tr", [e.multiselect ? t("th", { staticClass: "row-checkbox" }, [t("span", { staticClass: "hidden-visually" }, [e._v(" " + e._s(i.t("Select entry")) + " ")]), e.multiselect ? t(i.NcCheckboxRadioSwitch, { attrs: { "aria-label": i.t("Select all entries"), checked: i.allSelected, "data-testid": "select-all-checkbox" }, on: { "update:checked": i.onSelectAll } }) : e._e()], 1) : e._e(), t("th", { staticClass: "row-name", attrs: { "aria-sort": i.sortByName } }, [t("div", { staticClass: "header-wrapper" }, [t("span", { staticClass: "file-picker__header-preview" }), t(i.NcButton, { attrs: { wide: !0, type: "tertiary", "data-test": "file-picker_sort-name" }, on: { click: i.toggleSortByName }, scopedSlots: e._u([{ key: "icon", fn: function() {
    return [i.sortByName === "ascending" ? t(i.IconSortAscending, { attrs: { size: 20 } }) : i.sortByName === "descending" ? t(i.IconSortDescending, { attrs: { size: 20 } }) : t("span", { staticStyle: { width: "44px" } })];
  }, proxy: !0 }]) }, [e._v(" " + e._s(i.t("Name")) + " ")])], 1)]), t("th", { staticClass: "row-size", attrs: { "aria-sort": i.sortBySize } }, [t(i.NcButton, { attrs: { wide: !0, type: "tertiary" }, on: { click: i.toggleSortBySize }, scopedSlots: e._u([{ key: "icon", fn: function() {
    return [i.sortBySize === "ascending" ? t(i.IconSortAscending, { attrs: { size: 20 } }) : i.sortBySize === "descending" ? t(i.IconSortDescending, { attrs: { size: 20 } }) : t("span", { staticStyle: { width: "44px" } })];
  }, proxy: !0 }]) }, [e._v(" " + e._s(i.t("Size")) + " ")])], 1), t("th", { staticClass: "row-modified", attrs: { "aria-sort": i.sortByModified } }, [t(i.NcButton, { attrs: { wide: !0, type: "tertiary" }, on: { click: i.toggleSortByModified }, scopedSlots: e._u([{ key: "icon", fn: function() {
    return [i.sortByModified === "ascending" ? t(i.IconSortAscending, { attrs: { size: 20 } }) : i.sortByModified === "descending" ? t(i.IconSortDescending, { attrs: { size: 20 } }) : t("span", { staticStyle: { width: "44px" } })];
  }, proxy: !0 }]) }, [e._v(" " + e._s(i.t("Modified")) + " ")])], 1)])]), t("tbody", [e.loading ? e._l(i.skeletonNumber, function(n) {
    return t(i.LoadingTableRow, { key: n, attrs: { "show-checkbox": e.multiselect } });
  }) : e._l(i.sortedFiles, function(n) {
    return t(i.FileListRow, { key: n.fileid || n.path, attrs: { "allow-pick-directory": e.allowPickDirectory, "show-checkbox": e.multiselect, "can-pick": e.multiselect || e.selectedFiles.length === 0 || e.selectedFiles.includes(n), selected: e.selectedFiles.includes(n), node: n }, on: { "update:selected": function(s) {
      return i.onNodeSelected(n);
    }, "enter-directory": i.onChangeDirectory } });
  })], 2)])]);
}, FilePicker_65d21558_st = [], FilePicker_65d21558_rt = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_nt,
  FilePicker_65d21558_lt,
  FilePicker_65d21558_st,
  !1,
  null,
  "c78369e2",
  null,
  null
);
const FilePicker_65d21558_at = FilePicker_65d21558_rt.exports, FilePicker_65d21558_ot = {
  name: "HomeIcon",
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
var FilePicker_65d21558_ct = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon home-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_ut = [], FilePicker_65d21558_dt = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_ot,
  FilePicker_65d21558_ct,
  FilePicker_65d21558_ut,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_t = FilePicker_65d21558_dt.exports, FilePicker_65d21558_ft = {
  name: "PlusIcon",
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
var FilePicker_65d21558_pt = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon plus-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_mt = [], FilePicker_65d21558_vt = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_ft,
  FilePicker_65d21558_pt,
  FilePicker_65d21558_mt,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_ht = FilePicker_65d21558_vt.exports, FilePicker_65d21558_gt = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.aZ)({
  __name: "FilePickerBreadcrumbs",
  props: {
    path: null,
    showMenu: { type: Boolean }
  },
  emits: ["update:path", "create-node"],
  setup(l, { emit: e }) {
    const t = l, i = (0,vue_runtime_esm/* ref */.iH)(""), n = (0,vue_runtime_esm/* ref */.iH)();
    function s() {
      var a, h, _, k;
      const y = i.value.trim(), S = (h = (a = n.value) == null ? void 0 : a.$el) == null ? void 0 : h.querySelector("input");
      let w = "";
      return y.length === 0 ? w = (0,index_69148435.t)("File name cannot be empty.") : y.includes("/") ? w = (0,index_69148435.t)('"/" is not allowed inside a file name.') : ["..", "."].includes(y) ? w = (0,index_69148435.t)('"{name}" is an invalid file name.', { name: y }) : (_ = window.OC.config) != null && _.blacklist_files_regex && y.match((k = window.OC.config) == null ? void 0 : k.blacklist_files_regex) && (w = (0,index_69148435.t)('"{name}" is not an allowed filetype', { name: y })), S && S.setCustomValidity(w), w === "";
    }
    const c = function() {
      const a = i.value.trim();
      s() && (e("create-node", a), i.value = "");
    }, u = (0,vue_runtime_esm/* computed */.Fl)(
      () => t.path.split("/").filter((a) => a !== "").map((a, h, _) => ({
        name: a,
        path: "/" + _.slice(0, h + 1).join("/")
      }))
    );
    return { __sfc: !0, props: t, emit: e, newNodeName: i, nameInput: n, validateInput: s, onSubmit: c, pathElements: u, IconFolder: FilePicker_65d21558_V, IconHome: FilePicker_65d21558_t, IconPlus: FilePicker_65d21558_ht, NcActions: index_module/* NcActions */.O3, NcActionInput: index_module/* NcActionInput */.Iw, NcBreadcrumbs: index_module/* NcBreadcrumbs */.fg, NcBreadcrumb: index_module/* NcBreadcrumb */.$U, t: index_69148435.t };
  }
});
var FilePicker_65d21558_yt = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t(i.NcBreadcrumbs, { staticClass: "file-picker__breadcrumbs", scopedSlots: e._u([{ key: "default", fn: function() {
    return [t(i.NcBreadcrumb, { attrs: { name: i.t("Home"), title: i.t("Home") }, on: { click: function(n) {
      return i.emit("update:path", "/");
    } }, scopedSlots: e._u([{ key: "icon", fn: function() {
      return [t(i.IconHome, { attrs: { size: 20 } })];
    }, proxy: !0 }]) }), e._l(i.pathElements, function(n) {
      return t(i.NcBreadcrumb, { key: n.path, attrs: { name: n.name, title: n.path }, on: { click: function(s) {
        return i.emit("update:path", n.path);
      } } });
    })];
  }, proxy: !0 }, e.showMenu ? { key: "actions", fn: function() {
    return [t(i.NcActions, { attrs: { "aria-label": i.t("Create directory"), "force-menu": !0, "force-title": !0, "menu-title": i.t("New"), type: "secondary" }, on: { close: function(n) {
      i.newNodeName = "";
    } }, scopedSlots: e._u([{ key: "icon", fn: function() {
      return [t(i.IconPlus, { attrs: { size: 20 } })];
    }, proxy: !0 }], null, !1, 2971667417) }, [t(i.NcActionInput, { ref: "nameInput", attrs: { value: i.newNodeName, label: i.t("New folder"), placeholder: i.t("New folder name") }, on: { "update:value": function(n) {
      i.newNodeName = n;
    }, submit: i.onSubmit, input: i.validateInput }, scopedSlots: e._u([{ key: "icon", fn: function() {
      return [t(i.IconFolder, { attrs: { size: 20 } })];
    }, proxy: !0 }], null, !1, 1614167509) })], 1)];
  }, proxy: !0 } : null], null, !0) });
}, FilePicker_65d21558_wt = [], FilePicker_65d21558_kt = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_gt,
  FilePicker_65d21558_yt,
  FilePicker_65d21558_wt,
  !1,
  null,
  "f35f86d4",
  null,
  null
);
const FilePicker_65d21558_Ct = FilePicker_65d21558_kt.exports, FilePicker_65d21558_bt = {
  name: "ClockIcon",
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
var FilePicker_65d21558_Ft = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon clock-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_St = [], FilePicker_65d21558_$t = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_bt,
  FilePicker_65d21558_Ft,
  FilePicker_65d21558_St,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_xt = FilePicker_65d21558_$t.exports, FilePicker_65d21558_Nt = {
  name: "CloseIcon",
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
var FilePicker_65d21558_Lt = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon close-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_Pt = [], zt = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Nt,
  FilePicker_65d21558_Lt,
  FilePicker_65d21558_Pt,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_Bt = zt.exports, FilePicker_65d21558_It = {
  name: "MagnifyIcon",
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
var FilePicker_65d21558_Rt = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon magnify-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_Mt = [], FilePicker_65d21558_Dt = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_It,
  FilePicker_65d21558_Rt,
  FilePicker_65d21558_Mt,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_Vt = FilePicker_65d21558_Dt.exports, FilePicker_65d21558_Tt = {
  name: "StarIcon",
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
var Ht = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon star-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_65d21558_At = [], FilePicker_65d21558_Et = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Tt,
  Ht,
  FilePicker_65d21558_At,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_65d21558_Ut = FilePicker_65d21558_Et.exports, FilePicker_65d21558_Ot = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.aZ)({
  __name: "FilePickerNavigation",
  props: {
    currentView: null,
    filterString: null,
    isCollapsed: { type: Boolean }
  },
  emits: ["update:currentView", "update:filterString"],
  setup(l, { emit: e }) {
    const t = l, i = [{
      id: "files",
      label: (0,index_69148435.t)("All files"),
      icon: FilePicker_65d21558_V
    }, {
      id: "recent",
      label: (0,index_69148435.t)("Recent"),
      icon: FilePicker_65d21558_xt
    }, {
      id: "favorites",
      label: (0,index_69148435.t)("Favorites"),
      icon: FilePicker_65d21558_Ut
    }], n = (0,vue_runtime_esm/* computed */.Fl)(() => i.filter((c) => c.id === t.currentView)[0]);
    return { __sfc: !0, allViews: i, props: t, emit: e, currentViewObject: n, updateFilterValue: (c) => e("update:filterString", c), IconClose: FilePicker_65d21558_Bt, IconMagnify: FilePicker_65d21558_Vt, NcButton: index_module/* NcButton */.P2, NcSelect: index_module/* NcSelect */.QG, NcTextField: index_module/* NcTextField */.h3, t: index_69148435.t, Fragment: frag_esm.Fragment };
  }
});
var Zt = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t(i.Fragment, [t(i.NcTextField, { staticClass: "file-picker__filter-input", attrs: { value: e.filterString, label: i.t("Filter file list"), "show-trailing-button": !!e.filterString }, on: { "update:value": i.updateFilterValue, "trailing-button-click": function(n) {
    return i.updateFilterValue("");
  } }, scopedSlots: e._u([{ key: "trailing-button-icon", fn: function() {
    return [t(i.IconClose, { attrs: { size: 16 } })];
  }, proxy: !0 }]) }, [t(i.IconMagnify, { attrs: { size: 16 } })], 1), e.isCollapsed ? t(i.NcSelect, { attrs: { "aria-label": i.t("Current view selector"), clearable: !1, searchable: !1, options: i.allViews, value: i.currentViewObject }, on: { input: (n) => i.emit("update:currentView", n.id) } }) : t("ul", { staticClass: "file-picker__side", attrs: { role: "tablist", "aria-label": i.t("Filepicker sections") } }, e._l(i.allViews, function(n) {
    return t("li", { key: n.id }, [t(i.NcButton, { attrs: { "aria-selected": e.currentView === n.id, type: e.currentView === n.id ? "primary" : "tertiary", wide: !0, role: "tab" }, on: { click: function(s) {
      return e.$emit("update:currentView", n.id);
    } }, scopedSlots: e._u([{ key: "icon", fn: function() {
      return [t(n.icon, { tag: "component", attrs: { size: 20 } })];
    }, proxy: !0 }], null, !0) }, [e._v(" " + e._s(n.label) + " ")])], 1);
  }), 0)], 1);
}, jt = [], Gt = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Ot,
  Zt,
  jt,
  !1,
  null,
  "fcfd0f23",
  null,
  null
);
const FilePicker_65d21558_qt = Gt.exports;
/**
 * @copyright Copyright (c) 2023 Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @author Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const Kt = function(l, e) {
  const t = ur((0,router_dist.generateRemoteUrl)("dav")), i = (0,vue_runtime_esm/* ref */.iH)([]), n = (0,vue_runtime_esm/* ref */.iH)(!0);
  async function s(u) {
    const a = await t.stat("".concat(ee).concat(u), {
      details: !0
    });
    return ve(a.data);
  }
  async function c() {
    if (n.value = !0, l.value === "favorites")
      i.value = await t.getDirectoryContents("".concat(ee).concat(e.value), {
        details: !0,
        data: Ee(),
        headers: {
          method: "REPORT"
        },
        includeSelf: !1
      }).then((u) => u.data.map((a) => ve(a)));
    else if (l.value === "recent") {
      const u = Math.round(Date.now() / 1e3) - 1209600, a = await t.getDirectoryContents(e.value, {
        details: !0,
        data: or(u),
        headers: {
          method: "SEARCH",
          "Content-Type": "application/xml; charset=utf-8"
        },
        deep: !0
      });
      i.value = a.data.map((h) => ve(h));
    } else {
      const u = await t.getDirectoryContents("".concat(ee).concat(e.value), {
        details: !0,
        data: sr()
      });
      i.value = u.data.map((a) => ve(a));
    }
    n.value = !1;
  }
  return (0,vue_runtime_esm/* watch */.YP)([l, e], () => c()), {
    isLoading: n,
    files: i,
    loadFiles: () => c(),
    getFile: s,
    client: t
  };
};
/**
 * @copyright Copyright (c) 2023 Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @author Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const Wt = function(l) {
  const e = (0,vue_runtime_esm/* computed */.Fl)(() => l.value.map((i) => i.split("/")));
  return {
    isSupportedMimeType: (i) => {
      const n = i.split("/");
      return e.value.some(
        ([s, c]) => (
          // check mime type matches or is wildcard
          (n[0] === s || s === "*") && (n[1] === c || c === "*")
        )
      );
    }
  };
}, FilePicker_65d21558_Jt = {
  name: "FilePicker"
}, FilePicker_65d21558_Qt = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.aZ)({
  ...FilePicker_65d21558_Jt,
  props: {
    buttons: null,
    name: null,
    allowPickDirectory: { type: Boolean, default: !1 },
    container: { default: "body" },
    filterFn: { default: void 0 },
    mimetypeFilter: { default: () => [] },
    multiselect: { type: Boolean, default: !0 },
    path: { default: "/" }
  },
  emits: ["close"],
  setup(l, { emit: e }) {
    const t = l, i = (0,vue_runtime_esm/* computed */.Fl)(() => ({
      container: t.container,
      name: t.name,
      buttons: n.value,
      size: "large",
      contentClasses: ["file-picker__content"],
      dialogClasses: ["file-picker"],
      navigationClasses: ["file-picker__navigation"]
    })), n = (0,vue_runtime_esm/* computed */.Fl)(() => (typeof t.buttons == "function" ? t.buttons(u.value, _.value, s.value) : t.buttons).map((r) => ({
      ...r,
      callback: async () => {
        const o = u.value.length === 0 && t.allowPickDirectory ? [await x(_.value)] : u.value;
        r.callback(o), e("close", u.value);
      }
    }))), s = (0,vue_runtime_esm/* ref */.iH)("files"), c = (0,vue_runtime_esm/* computed */.Fl)(() => s.value === "favorites" ? (0,index_69148435.t)("Favorites") : s.value === "recent" ? (0,index_69148435.t)("Recent") : ""), u = (0,vue_runtime_esm/* ref */.iH)([]), a = (0,vue_runtime_esm/* ref */.iH)((window == null ? void 0 : window.sessionStorage.getItem("NC.FilePicker.LastPath")) || "/"), h = (0,vue_runtime_esm/* ref */.iH)(), _ = (0,vue_runtime_esm/* computed */.Fl)({
      // Only use the path for the files view as favorites and recent only works on the root
      get: () => s.value === "files" ? h.value || t.path || a.value : "/",
      /**
       * Navigate to the new path and save it to the session storage
       *
       * @param path The new path
       */
      set: (f) => {
        t.path === void 0 && window.sessionStorage.setItem("NC.FilePicker.LastPath", f), h.value = f, u.value = [];
      }
    }), k = (0,vue_runtime_esm/* ref */.iH)(""), { isSupportedMimeType: y } = Wt((0,vue_runtime_esm/* toRef */.Vh)(t, "mimetypeFilter")), { files: S, isLoading: w, loadFiles: C, getFile: x, client: N } = Kt(s, _);
    (0,vue_runtime_esm/* onMounted */.bv)(() => C());
    const B = (0,vue_runtime_esm/* computed */.Fl)(() => {
      let f = S.value;
      return t.mimetypeFilter.length > 0 && (f = f.filter((r) => r.type === "folder" || r.mime && y(r.mime))), k.value && (f = f.filter((r) => r.basename.toLowerCase().includes(k.value.toLowerCase()))), t.filterFn && (f = f.filter((r) => t.filterFn(r))), f;
    }), I = (0,vue_runtime_esm/* computed */.Fl)(() => s.value === "files" ? (0,index_69148435.t)("Upload some content or sync with your devices!") : s.value === "recent" ? (0,index_69148435.t)("Files and folders you recently modified will show up here.") : (0,index_69148435.t)("Files and folders you mark as favorite will show up here."));
    return { __sfc: !0, props: t, emit: e, dialogProps: i, dialogButtons: n, currentView: s, viewHeadline: c, selectedFiles: u, savedPath: a, navigatedPath: h, currentPath: _, filterString: k, isSupportedMimeType: y, files: S, isLoading: w, loadFiles: C, getFile: x, client: N, filteredFiles: B, noFilesDescription: I, onCreateFolder: (f) => {
      N.createDirectory((0,path.join)(ee, _.value, f)).then(() => C()).catch((r) => (0,toast_c61fd8a5.i)((0,index_69148435.t)("Could not create the new folder")));
    }, IconFile: FilePicker_65d21558_K, DialogBase: DialogBase_2d1c3e06.D, FileList: FilePicker_65d21558_at, FilePickerBreadcrumbs: FilePicker_65d21558_Ct, FilePickerNavigation: FilePicker_65d21558_qt, NcEmptyContent: index_module/* NcEmptyContent */.SL, t: index_69148435.t };
  }
});
var FilePicker_65d21558_Xt = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t(i.DialogBase, e._b({ on: { close: function(n) {
    return i.emit("close");
  } }, scopedSlots: e._u([{ key: "navigation", fn: function({ isCollapsed: n }) {
    return [t(i.FilePickerNavigation, { attrs: { "is-collapsed": n, "current-view": i.currentView, "filter-string": i.filterString }, on: { "update:currentView": function(s) {
      i.currentView = s;
    }, "update:current-view": function(s) {
      i.currentView = s;
    }, "update:filterString": function(s) {
      i.filterString = s;
    }, "update:filter-string": function(s) {
      i.filterString = s;
    } } })];
  } }]) }, "DialogBase", i.dialogProps, !1), [t("div", { staticClass: "file-picker__main" }, [i.currentView === "files" ? t(i.FilePickerBreadcrumbs, { attrs: { path: i.currentPath, "show-menu": e.allowPickDirectory }, on: { "update:path": function(n) {
    i.currentPath = n;
  }, "create-node": i.onCreateFolder } }) : t("div", { staticClass: "file-picker__view" }, [t("h3", [e._v(e._s(i.viewHeadline))])]), i.isLoading || i.filteredFiles.length > 0 ? t(i.FileList, { attrs: { "allow-pick-directory": e.allowPickDirectory, files: i.filteredFiles, multiselect: e.multiselect, loading: i.isLoading, path: i.currentPath, "selected-files": i.selectedFiles, name: i.viewHeadline }, on: { "update:path": [function(n) {
    i.currentPath = n;
  }, function(n) {
    i.currentView = "files";
  }], "update:selectedFiles": function(n) {
    i.selectedFiles = n;
  }, "update:selected-files": function(n) {
    i.selectedFiles = n;
  } } }) : i.filterString ? t(i.NcEmptyContent, { attrs: { name: i.t("No matching files"), description: i.t("No files matching your filter were found.") }, scopedSlots: e._u([{ key: "icon", fn: function() {
    return [t(i.IconFile)];
  }, proxy: !0 }]) }) : t(i.NcEmptyContent, { attrs: { name: i.t("No files in here"), description: i.noFilesDescription }, scopedSlots: e._u([{ key: "icon", fn: function() {
    return [t(i.IconFile)];
  }, proxy: !0 }]) })], 1)]);
}, FilePicker_65d21558_Yt = [], ei = /* @__PURE__ */ (0,DialogBase_2d1c3e06.n)(
  FilePicker_65d21558_Qt,
  FilePicker_65d21558_Xt,
  FilePicker_65d21558_Yt,
  !1,
  null,
  "dff32532",
  null,
  null
);
const _i = ei.exports;



/***/ })

}]);