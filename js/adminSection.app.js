/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2778:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = void 0;
__webpack_unused_export__ = getAppRootUrl;
__webpack_unused_export__ = getRootUrl;
__webpack_unused_export__ = __webpack_unused_export__ = void 0;
__webpack_require__(173);
/**
 * Get an url with webroot to a file in an app
 *
 * @param {string} app the id of the app the file belongs to
 * @param {string} file the file path relative to the app folder
 * @return {string} URL with webroot to a file
 */
const linkTo = (app, file) => generateFilePath(app, '', file);

/**
 * Creates a relative url for remote use
 *
 * @param {string} service id
 * @return {string} the url
 */
__webpack_unused_export__ = linkTo;
const linkToRemoteBase = service => getRootUrl() + '/remote.php/' + service;

/**
 * @brief Creates an absolute url for remote use
 * @param {string} service id
 * @return {string} the url
 */
const generateRemoteUrl = service => window.location.protocol + '//' + window.location.host + linkToRemoteBase(service);

/**
 * Get the base path for the given OCS API service
 *
 * @param {string} url OCS API service url
 * @param {object} params parameters to be replaced into the service url
 * @param {UrlOptions} options options for the parameter replacement
 * @param {boolean} options.escape Set to false if parameters should not be URL encoded (default true)
 * @param {Number} options.ocsVersion OCS version to use (defaults to 2)
 * @return {string} Absolute path for the OCS URL
 */
__webpack_unused_export__ = generateRemoteUrl;
const generateOcsUrl = (url, params, options) => {
  const allOptions = Object.assign({
    ocsVersion: 2
  }, options || {});
  const version = allOptions.ocsVersion === 1 ? 1 : 2;
  return window.location.protocol + '//' + window.location.host + getRootUrl() + '/ocs/v' + version + '.php' + _generateUrlPath(url, params, options);
};
__webpack_unused_export__ = generateOcsUrl;
/**
 * Generate a url path, which can contain parameters
 *
 * Parameters will be URL encoded automatically
 *
 * @param {string} url address (can contain placeholders e.g. /call/{token} would replace {token} with the value of params.token
 * @param {object} params parameters to be replaced into the address
 * @param {UrlOptions} options options for the parameter replacement
 * @return {string} Path part for the given URL
 */
const _generateUrlPath = (url, params, options) => {
  const allOptions = Object.assign({
    escape: true
  }, options || {});
  const _build = function (text, vars) {
    vars = vars || {};
    return text.replace(/{([^{}]*)}/g, function (a, b) {
      var r = vars[b];
      if (allOptions.escape) {
        return typeof r === 'string' || typeof r === 'number' ? encodeURIComponent(r.toString()) : encodeURIComponent(a);
      } else {
        return typeof r === 'string' || typeof r === 'number' ? r.toString() : a;
      }
    });
  };
  if (url.charAt(0) !== '/') {
    url = '/' + url;
  }
  return _build(url, params || {});
};

/**
 * Generate the url with webroot for the given relative url, which can contain parameters
 *
 * Parameters will be URL encoded automatically
 *
 * @param {string} url address (can contain placeholders e.g. /call/{token} would replace {token} with the value of params.token
 * @param {object} params parameters to be replaced into the url
 * @param {UrlOptions} options options for the parameter replacement
 * @param {boolean} options.noRewrite True if you want to force index.php being added
 * @param {boolean} options.escape Set to false if parameters should not be URL encoded (default true)
 * @return {string} URL with webroot for the given relative URL
 */
const generateUrl = (url, params, options) => {
  var _window;
  const allOptions = Object.assign({
    noRewrite: false
  }, options || {});
  if (((_window = window) === null || _window === void 0 || (_window = _window.OC) === null || _window === void 0 || (_window = _window.config) === null || _window === void 0 ? void 0 : _window.modRewriteWorking) === true && !allOptions.noRewrite) {
    return getRootUrl() + _generateUrlPath(url, params, options);
  }
  return getRootUrl() + '/index.php' + _generateUrlPath(url, params, options);
};

/**
 * Get the path with webroot to an image file
 * if no extension is given for the image, it will automatically decide
 * between .png and .svg based on what the browser supports
 *
 * @param {string} app the app id to which the image belongs
 * @param {string} file the name of the image file
 * @return {string}
 */
__webpack_unused_export__ = generateUrl;
const imagePath = (app, file) => {
  if (file.indexOf('.') === -1) {
    //if no extension is given, use svg
    return generateFilePath(app, 'img', file + '.svg');
  }
  return generateFilePath(app, 'img', file);
};

/**
 * Get the url with webroot for a file in an app
 *
 * @param {string} app the id of the app
 * @param {string} type the type of the file to link to (e.g. css,img,ajax.template)
 * @param {string} file the filename
 * @return {string} URL with webroot for a file in an app
 */
__webpack_unused_export__ = imagePath;
const generateFilePath = (app, type, file) => {
  var _window2;
  const isCore = ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.OC) === null || _window2 === void 0 || (_window2 = _window2.coreApps) === null || _window2 === void 0 ? void 0 : _window2.indexOf(app)) !== -1;
  let link = getRootUrl();
  if (file.substring(file.length - 3) === 'php' && !isCore) {
    link += '/index.php/apps/' + app;
    if (file !== 'index.php') {
      link += '/';
      if (type) {
        link += encodeURI(type + '/');
      }
      link += file;
    }
  } else if (file.substring(file.length - 3) !== 'php' && !isCore) {
    link = getAppRootUrl(app);
    if (type) {
      link += '/' + type + '/';
    }
    if (link.substring(link.length - 1) !== '/') {
      link += '/';
    }
    link += file;
  } else {
    if ((app === 'settings' || app === 'core' || app === 'search') && type === 'ajax') {
      link += '/index.php/';
    } else {
      link += '/';
    }
    if (!isCore) {
      link += 'apps/';
    }
    if (app !== '') {
      app += '/';
      link += app;
    }
    if (type) {
      link += type + '/';
    }
    link += file;
  }
  return link;
};

/**
 * Return the web root path where this Nextcloud instance
 * is accessible, with a leading slash.
 * For example "/nextcloud".
 *
 * @return {string} web root path
 */
__webpack_unused_export__ = generateFilePath;
function getRootUrl() {
  let webroot = window._oc_webroot;
  if (typeof webroot === 'undefined') {
    webroot = location.pathname;
    const pos = webroot.indexOf('/index.php/');
    if (pos !== -1) {
      webroot = webroot.substr(0, pos);
    } else {
      webroot = webroot.substr(0, webroot.lastIndexOf('/'));
    }
  }
  return webroot;
}

/**
 * Return the web root path for a given app
 * @param {string} app The ID of the app
 */
function getAppRootUrl(app) {
  var _window$_oc_appswebro, _webroots$app;
  const webroots = (_window$_oc_appswebro = window._oc_appswebroots) !== null && _window$_oc_appswebro !== void 0 ? _window$_oc_appswebro : {};
  return (_webroots$app = webroots[app]) !== null && _webroots$app !== void 0 ? _webroots$app : '';
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 4601:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(8420);
var tryToString = __webpack_require__(3838);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 7234:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(7804).charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 3938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(5335);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 8186:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5476);
var toAbsoluteIndex = __webpack_require__(6539);
var lengthOfArrayLike = __webpack_require__(3493);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 8569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 3062:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(3129);
var isCallable = __webpack_require__(8420);
var classofRaw = __webpack_require__(8569);
var wellKnownSymbol = __webpack_require__(1602);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 4361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var hasOwn = __webpack_require__(6490);
var ownKeys = __webpack_require__(5816);
var getOwnPropertyDescriptorModule = __webpack_require__(7632);
var definePropertyModule = __webpack_require__(3610);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 7712:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(5077);
var definePropertyModule = __webpack_require__(3610);
var createPropertyDescriptor = __webpack_require__(6843);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 6843:
/***/ ((module) => {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 7485:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(8420);
var definePropertyModule = __webpack_require__(3610);
var makeBuiltIn = __webpack_require__(8218);
var defineGlobalProperty = __webpack_require__(9430);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 9430:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(200);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 5077:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2074);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 6568:
/***/ ((module) => {

"use strict";

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ 3262:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(200);
var isObject = __webpack_require__(5335);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 7061:
/***/ ((module) => {

"use strict";

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 6845:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(200);
var userAgent = __webpack_require__(7061);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 290:
/***/ ((module) => {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 1605:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(200);
var getOwnPropertyDescriptor = (__webpack_require__(7632).f);
var createNonEnumerableProperty = __webpack_require__(7712);
var defineBuiltIn = __webpack_require__(7485);
var defineGlobalProperty = __webpack_require__(9430);
var copyConstructorProperties = __webpack_require__(4361);
var isForced = __webpack_require__(4977);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 2074:
/***/ ((module) => {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 779:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(7136);
var uncurryThis = __webpack_require__(3091);
var defineBuiltIn = __webpack_require__(7485);
var regexpExec = __webpack_require__(54);
var fails = __webpack_require__(2074);
var wellKnownSymbol = __webpack_require__(1602);
var createNonEnumerableProperty = __webpack_require__(7712);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) !== 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 9070:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(8823);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 8823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2074);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 2368:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(8823);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 2071:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(5077);
var hasOwn = __webpack_require__(6490);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 3091:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classofRaw = __webpack_require__(8569);
var uncurryThis = __webpack_require__(281);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ 281:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_BIND = __webpack_require__(8823);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 6492:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(200);
var isCallable = __webpack_require__(8420);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 6457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(4601);
var isNullOrUndefined = __webpack_require__(8406);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 4433:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);
var toObject = __webpack_require__(2612);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ 6490:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);
var toObject = __webpack_require__(2612);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 7708:
/***/ ((module) => {

"use strict";

module.exports = {};


/***/ }),

/***/ 8890:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(6492);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 7694:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(5077);
var fails = __webpack_require__(2074);
var createElement = __webpack_require__(3262);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 8664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);
var fails = __webpack_require__(2074);
var classof = __webpack_require__(8569);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 9965:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);
var isCallable = __webpack_require__(8420);
var store = __webpack_require__(9310);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9206:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(8369);
var global = __webpack_require__(200);
var isObject = __webpack_require__(5335);
var createNonEnumerableProperty = __webpack_require__(7712);
var hasOwn = __webpack_require__(6490);
var shared = __webpack_require__(9310);
var sharedKey = __webpack_require__(5904);
var hiddenKeys = __webpack_require__(7708);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 8420:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $documentAll = __webpack_require__(6568);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2074);
var isCallable = __webpack_require__(8420);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 8406:
/***/ ((module) => {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 5335:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isCallable = __webpack_require__(8420);
var $documentAll = __webpack_require__(6568);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 6926:
/***/ ((module) => {

"use strict";

module.exports = false;


/***/ }),

/***/ 2328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(6492);
var isCallable = __webpack_require__(8420);
var isPrototypeOf = __webpack_require__(7658);
var USE_SYMBOL_AS_UID = __webpack_require__(5225);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 3493:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(3747);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 8218:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);
var fails = __webpack_require__(2074);
var isCallable = __webpack_require__(8420);
var hasOwn = __webpack_require__(6490);
var DESCRIPTORS = __webpack_require__(5077);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(2071).CONFIGURABLE);
var inspectSource = __webpack_require__(9965);
var InternalStateModule = __webpack_require__(9206);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 9830:
/***/ ((module) => {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 3105:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(3938);
var definePropertiesModule = __webpack_require__(5318);
var enumBugKeys = __webpack_require__(290);
var hiddenKeys = __webpack_require__(7708);
var html = __webpack_require__(8890);
var documentCreateElement = __webpack_require__(3262);
var sharedKey = __webpack_require__(5904);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 5318:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(5077);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(4491);
var definePropertyModule = __webpack_require__(3610);
var anObject = __webpack_require__(3938);
var toIndexedObject = __webpack_require__(5476);
var objectKeys = __webpack_require__(1641);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 3610:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(5077);
var IE8_DOM_DEFINE = __webpack_require__(7694);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(4491);
var anObject = __webpack_require__(3938);
var toPropertyKey = __webpack_require__(6032);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7632:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(5077);
var call = __webpack_require__(2368);
var propertyIsEnumerableModule = __webpack_require__(9304);
var createPropertyDescriptor = __webpack_require__(6843);
var toIndexedObject = __webpack_require__(5476);
var toPropertyKey = __webpack_require__(6032);
var hasOwn = __webpack_require__(6490);
var IE8_DOM_DEFINE = __webpack_require__(7694);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 4789:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(6347);
var enumBugKeys = __webpack_require__(290);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 8916:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7658:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6347:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);
var hasOwn = __webpack_require__(6490);
var toIndexedObject = __webpack_require__(5476);
var indexOf = (__webpack_require__(8186).indexOf);
var hiddenKeys = __webpack_require__(7708);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 1641:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(6347);
var enumBugKeys = __webpack_require__(290);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 9304:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 9751:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(2368);
var isCallable = __webpack_require__(8420);
var isObject = __webpack_require__(5335);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 5816:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(6492);
var uncurryThis = __webpack_require__(281);
var getOwnPropertyNamesModule = __webpack_require__(4789);
var getOwnPropertySymbolsModule = __webpack_require__(8916);
var anObject = __webpack_require__(3938);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 6793:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(2368);
var anObject = __webpack_require__(3938);
var isCallable = __webpack_require__(8420);
var classof = __webpack_require__(8569);
var regexpExec = __webpack_require__(54);

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw new $TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ 54:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(2368);
var uncurryThis = __webpack_require__(281);
var toString = __webpack_require__(5362);
var regexpFlags = __webpack_require__(6844);
var stickyHelpers = __webpack_require__(2192);
var shared = __webpack_require__(2);
var create = __webpack_require__(3105);
var getInternalState = (__webpack_require__(9206).get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(1036);
var UNSUPPORTED_NCG = __webpack_require__(8121);

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 6844:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(3938);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2192:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2074);
var global = __webpack_require__(200);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') !== null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') !== null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ 1036:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2074);
var global = __webpack_require__(200);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.test('\n') && re.flags === 's');
});


/***/ }),

/***/ 8121:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(2074);
var global = __webpack_require__(200);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 1229:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isNullOrUndefined = __webpack_require__(8406);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 5904:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var shared = __webpack_require__(2);
var uid = __webpack_require__(665);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 9310:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(200);
var defineGlobalProperty = __webpack_require__(9430);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IS_PURE = __webpack_require__(6926);
var store = __webpack_require__(9310);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.33.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.33.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 7804:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);
var toIntegerOrInfinity = __webpack_require__(9328);
var toString = __webpack_require__(5362);
var requireObjectCoercible = __webpack_require__(1229);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 2072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(6845);
var fails = __webpack_require__(2074);
var global = __webpack_require__(200);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 6539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(9328);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5476:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8664);
var requireObjectCoercible = __webpack_require__(1229);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var trunc = __webpack_require__(9830);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 3747:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIntegerOrInfinity = __webpack_require__(9328);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 2612:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var requireObjectCoercible = __webpack_require__(1229);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 874:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(2368);
var isObject = __webpack_require__(5335);
var isSymbol = __webpack_require__(2328);
var getMethod = __webpack_require__(6457);
var ordinaryToPrimitive = __webpack_require__(9751);
var wellKnownSymbol = __webpack_require__(1602);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 6032:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(874);
var isSymbol = __webpack_require__(2328);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 3129:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(1602);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 5362:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(3062);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 3838:
/***/ ((module) => {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 665:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(281);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 5225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(2072);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 4491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(5077);
var fails = __webpack_require__(2074);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 8369:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(200);
var isCallable = __webpack_require__(8420);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 1602:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(200);
var shared = __webpack_require__(2);
var hasOwn = __webpack_require__(6490);
var uid = __webpack_require__(665);
var NATIVE_SYMBOL = __webpack_require__(2072);
var USE_SYMBOL_AS_UID = __webpack_require__(5225);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 7136:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(1605);
var exec = __webpack_require__(54);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 173:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var apply = __webpack_require__(9070);
var call = __webpack_require__(2368);
var uncurryThis = __webpack_require__(281);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(779);
var fails = __webpack_require__(2074);
var anObject = __webpack_require__(3938);
var isCallable = __webpack_require__(8420);
var isNullOrUndefined = __webpack_require__(8406);
var toIntegerOrInfinity = __webpack_require__(9328);
var toLength = __webpack_require__(3747);
var toString = __webpack_require__(5362);
var requireObjectCoercible = __webpack_require__(1229);
var advanceStringIndex = __webpack_require__(7234);
var getMethod = __webpack_require__(6457);
var getSubstitution = __webpack_require__(4433);
var regExpExec = __webpack_require__(6793);
var wellKnownSymbol = __webpack_require__(1602);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      var fullUnicode;
      if (global) {
        fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];
      var result;
      while (true) {
        result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        var replacement;
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 2838:
/***/ (function(module) {

/*! @license DOMPurify 3.0.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.11/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  const {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  let {
    freeze,
    seal,
    create
  } = Object; // eslint-disable-line import/no-mutable-exports
  let {
    apply,
    construct
  } = typeof Reflect !== 'undefined' && Reflect;
  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }
  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }
  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }
  if (!construct) {
    construct = function construct(Func, args) {
      return new Func(...args);
    };
  }
  const arrayForEach = unapply(Array.prototype.forEach);
  const arrayPop = unapply(Array.prototype.pop);
  const arrayPush = unapply(Array.prototype.push);
  const stringToLowerCase = unapply(String.prototype.toLowerCase);
  const stringToString = unapply(String.prototype.toString);
  const stringMatch = unapply(String.prototype.match);
  const stringReplace = unapply(String.prototype.replace);
  const stringIndexOf = unapply(String.prototype.indexOf);
  const stringTrim = unapply(String.prototype.trim);
  const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  const regExpTest = unapply(RegExp.prototype.test);
  const typeErrorCreate = unconstruct(TypeError);

  /**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param {Function} func - The function to be wrapped and called.
   * @returns {Function} A new function that calls the given function with a specified thisArg and arguments.
   */
  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return apply(func, thisArg, args);
    };
  }

  /**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param {Function} func - The constructor function to be wrapped and called.
   * @returns {Function} A new function that constructs an instance of the given constructor function with the provided arguments.
   */
  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return construct(func, args);
    };
  }

  /**
   * Add properties to a lookup table
   *
   * @param {Object} set - The set to which elements will be added.
   * @param {Array} array - The array containing elements to be added to the set.
   * @param {Function} transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns {Object} The modified set with added elements.
   */
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }
    let l = array.length;
    while (l--) {
      let element = array[l];
      if (typeof element === 'string') {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }

  /**
   * Clean up an array to harden against CSPP
   *
   * @param {Array} array - The array to be cleaned.
   * @returns {Array} The cleaned version of the array
   */
  function cleanArray(array) {
    for (let index = 0; index < array.length; index++) {
      const isPropertyExist = objectHasOwnProperty(array, index);
      if (!isPropertyExist) {
        array[index] = null;
      }
    }
    return array;
  }

  /**
   * Shallow clone an object
   *
   * @param {Object} object - The object to be cloned.
   * @returns {Object} A new object that copies the original.
   */
  function clone(object) {
    const newObject = create(null);
    for (const [property, value] of entries(object)) {
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (Array.isArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === 'object' && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }

  /**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param {Object} object - The object to look up the getter function in its prototype chain.
   * @param {String} prop - The property name for which to find the getter function.
   * @returns {Function} The getter function found in the prototype chain or a fallback function.
   */
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }

  const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

  // SVG
  const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

  // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.
  const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);

  // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.
  const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  const text = freeze(['#text']);

  const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
  const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  // eslint-disable-next-line unicorn/better-regex
  const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
  const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
  const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
  const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
  const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );

  const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );

  const DOCTYPE_NAME = seal(/^html$/i);
  const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

  var EXPRESSIONS = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: MUSTACHE_EXPR,
    ERB_EXPR: ERB_EXPR,
    TMPLIT_EXPR: TMPLIT_EXPR,
    DATA_ATTR: DATA_ATTR,
    ARIA_ATTR: ARIA_ATTR,
    IS_ALLOWED_URI: IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE: ATTR_WHITESPACE,
    DOCTYPE_NAME: DOCTYPE_NAME,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT
  });

  const getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };

  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {HTMLScriptElement} purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return {TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */
  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    }

    // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.
    let suffix = null;
    const ATTR_NAME = 'data-tt-policy-suffix';
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html) {
          return html;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };
  function createDOMPurify() {
    let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
    const DOMPurify = root => createDOMPurify(root);

    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */
    DOMPurify.version = '3.0.11';

    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */
    DOMPurify.removed = [];
    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let {
      document
    } = window;
    const originalDocument = document;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element,
      NodeFilter,
      NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    const getParentNode = lookupGetter(ElementPrototype, 'parentNode');

    // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.
    if (typeof HTMLTemplateElement === 'function') {
      const template = document.createElement('template');
      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = '';
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document;
    const {
      importNode
    } = originalDocument;
    let hooks = {};

    /**
     * Expose whether this browser supports running the full DOMPurify.
     */
    DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
    const {
      MUSTACHE_EXPR,
      ERB_EXPR,
      TMPLIT_EXPR,
      DATA_ATTR,
      ARIA_ATTR,
      IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE,
      CUSTOM_ELEMENT
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;

    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);

    /* Allowed attribute names */
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);

    /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));

    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
    let FORBID_TAGS = null;

    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
    let FORBID_ATTR = null;

    /* Decide if ARIA attributes are okay */
    let ALLOW_ARIA_ATTR = true;

    /* Decide if custom data attributes are okay */
    let ALLOW_DATA_ATTR = true;

    /* Decide if unknown protocols are okay */
    let ALLOW_UNKNOWN_PROTOCOLS = false;

    /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */
    let ALLOW_SELF_CLOSE_IN_ATTR = true;

    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */
    let SAFE_FOR_TEMPLATES = false;

    /* Decide if document with <html>... should be returned */
    let WHOLE_DOCUMENT = false;

    /* Track whether config is already set on this instance of DOMPurify. */
    let SET_CONFIG = false;

    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */
    let FORCE_BODY = false;

    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */
    let RETURN_DOM = false;

    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */
    let RETURN_DOM_FRAGMENT = false;

    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */
    let RETURN_TRUSTED_TYPE = false;

    /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */
    let SANITIZE_DOM = true;

    /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';

    /* Keep element content when removing element? */
    let KEEP_CONTENT = true;

    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */
    let IN_PLACE = false;

    /* Allow usage of profiles like html, svg and mathMl */
    let USE_PROFILES = {};

    /* Tags to ignore content of when KEEP_CONTENT is true */
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

    /* Tags that are safe for data: URIs */
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);

    /* Attributes safe for values like "javascript:" */
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;

    /* Allowed XHTML+XML namespaces */
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);

    /* Parsing of strict XHTML documents */
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    let transformCaseFunc = null;

    /* Keep a reference to config to pass to hooks */
    let CONFIG = null;

    /* Ideally, do not touch anything below this line */
    /* ______________________________________________ */

    const formElement = document.createElement('form');
    const isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };

    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity
    const _parseConfig = function _parseConfig() {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }

      /* Shield configuration object from tampering */
      if (!cfg || typeof cfg !== 'object') {
        cfg = {};
      }

      /* Shield configuration object from prototype pollution */
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE =
      // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;

      // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;

      /* Set configuration parameters */
      ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES),
      // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS),
      // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
      RETURN_DOM = cfg.RETURN_DOM || false; // Default false
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
      FORCE_BODY = cfg.FORCE_BODY || false; // Default false
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
      IN_PLACE = cfg.IN_PLACE || false; // Default false
      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }

      /* Parse profile info */
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }

      /* Merge configuration parameters */
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }

      /* Add #text in case KEEP_CONTENT is set to true */
      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }

      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }

      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }

        // Overwrite existing TrustedTypes policy.
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;

        // Sign local variables required by `sanitize`.
        emptyHTML = trustedTypesPolicy.createHTML('');
      } else {
        // Uninitialized policy, attempt to initialize the internal dompurify policy.
        if (trustedTypesPolicy === undefined) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }

        // If creating the internal policy succeeded sign internal variables.
        if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
          emptyHTML = trustedTypesPolicy.createHTML('');
        }
      }

      // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    const HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']);

    // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);

    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);

    /**
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */
    const _checkValidNamespace = function _checkValidNamespace(element) {
      let parent = getParentNode(element);

      // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: 'template'
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        }

        // The only way to switch from MathML to SVG is via`
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }

        // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        }

        // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        }

        // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }

      // For XHTML and XML documents that support custom namespaces
      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }

      // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
      // Return false just in case.
      return false;
    };

    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */
    const _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        node.parentNode.removeChild(node);
      } catch (_) {
        node.remove();
      }
    };

    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */
    const _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }
      node.removeAttribute(name);

      // We void attribute values for unremovable "is"" attributes
      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };

    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */
    const _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }

      /* Use createHTMLDocument in case DOMParser is not available */
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {
          // Syntax error if dirtyPayload is invalid xml
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }

      /* Work on whole document or just its body */
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };

    /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param  {Node} root The root element or node to start traversing on.
     * @return {NodeIterator} The created NodeIterator
     */
    const _createNodeIterator = function _createNodeIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
    };

    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */
    const _isClobbered = function _isClobbered(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
    };

    /**
     * Checks whether the given object is a DOM node.
     *
     * @param  {Node} object object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */
    const _isNode = function _isNode(object) {
      return typeof Node === 'function' && object instanceof Node;
    };

    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */
    const _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }
      arrayForEach(hooks[entryPoint], hook => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };

    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */
    const _sanitizeElements = function _sanitizeElements(currentNode) {
      let content = null;

      /* Execute a hook if present */
      _executeHook('beforeSanitizeElements', currentNode, null);

      /* Check if element is clobbered or can clobber */
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Now let's check the element's type and name */
      const tagName = transformCaseFunc(currentNode.nodeName);

      /* Execute a hook if present */
      _executeHook('uponSanitizeElement', currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });

      /* Detect mXSS attempts abusing namespace confusion */
      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Remove any ocurrence of processing instructions */
      if (currentNode.nodeType === 7) {
        _forceRemove(currentNode);
        return true;
      }

      /* Remove element if anything forbids its presence */
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }

        /* Keep content except for bad-listed elements */
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }

      /* Check whether element has a valid namespace */
      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Make sure that older browsers don't get fallback-tag mXSS */
      if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Sanitize element content to be template-safe */
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          content = stringReplace(content, expr, ' ');
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeElements', currentNode, null);
      return false;
    };

    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity
    const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }

      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) ||
        // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
        return false;
      } else ;
      return true;
    };

    /**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param {string} tagName name of the tag of the node to sanitize
     * @returns {boolean} Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */
    const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
      return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
    };

    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */
    const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      /* Execute a hook if present */
      _executeHook('beforeSanitizeAttributes', currentNode, null);
      const {
        attributes
      } = currentNode;

      /* Check if we have attributes; if not we might have a text node */
      if (!attributes) {
        return;
      }
      const hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      let l = attributes.length;

      /* Go backwards over all attributes; safely remove bad ones */
      while (l--) {
        const attr = attributes[l];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        let value = name === 'value' ? attrValue : stringTrim(attrValue);

        /* Execute a hook if present */
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */
        if (hookEvent.forceKeepAttr) {
          continue;
        }

        /* Remove attribute */
        _removeAttribute(name, currentNode);

        /* Did the hooks approve of the attribute? */
        if (!hookEvent.keepAttr) {
          continue;
        }

        /* Work around a security issue in jQuery 3.0 */
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }

        /* Sanitize attribute content to be template-safe */
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
            value = stringReplace(value, expr, ' ');
          });
        }

        /* Is `value` valid for this attribute? */
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }

        /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */
        if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
          // Remove the attribute with this value
          _removeAttribute(name, currentNode);

          // Prefix the value and later re-create the attribute with the sanitized value
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }

        /* Handle attributes that require Trusted Types */
        if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
          if (namespaceURI) ; else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case 'TrustedHTML':
                {
                  value = trustedTypesPolicy.createHTML(value);
                  break;
                }
              case 'TrustedScriptURL':
                {
                  value = trustedTypesPolicy.createScriptURL(value);
                  break;
                }
            }
          }
        }

        /* Handle invalid data-* attribute set by try-catching it */
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }
          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeAttributes', currentNode, null);
    };

    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */
    const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);

      /* Execute a hook if present */
      _executeHook('beforeSanitizeShadowDOM', fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);

        /* Sanitize tags and elements */
        if (_sanitizeElements(shadowNode)) {
          continue;
        }

        /* Deep shadow DOM detected */
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(shadowNode);
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };

    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} cfg object
     */
    // eslint-disable-next-line complexity
    DOMPurify.sanitize = function (dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }

      /* Stringify, in case dirty is an object */
      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        if (typeof dirty.toString === 'function') {
          dirty = dirty.toString();
          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        } else {
          throw typeErrorCreate('toString is not a function');
        }
      }

      /* Return dirty HTML if DOMPurify cannot run */
      if (!DOMPurify.isSupported) {
        return dirty;
      }

      /* Assign config vars */
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }

      /* Clean up removed elements */
      DOMPurify.removed = [];

      /* Check if dirty is correctly typed for IN_PLACE */
      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes */
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
      } else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
        // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }

        /* Initialize the document to work on */
        body = _initDocument(dirty);

        /* Check we have a DOM node from the data */
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }

      /* Remove first element node (ours) if FORCE_BODY is set */
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }

      /* Get node iterator */
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);

      /* Now start iterating over the created document */
      while (currentNode = nodeIterator.nextNode()) {
        /* Sanitize tags and elements */
        if (_sanitizeElements(currentNode)) {
          continue;
        }

        /* Shadow DOM detected, sanitize it */
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(currentNode);
      }

      /* If we sanitized `dirty` in-place, return it. */
      if (IN_PLACE) {
        return dirty;
      }

      /* Return sanitized string or DOM */
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

      /* Serialize doctype if allowed */
      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }

      /* Sanitize final string template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          serializedHTML = stringReplace(serializedHTML, expr, ' ');
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };

    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */
    DOMPurify.setConfig = function () {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };

    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */
    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };

    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {String} tag Tag name of containing element.
     * @param  {String} attr Attribute name.
     * @param  {String} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */
    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };

    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */
    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }
      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };

    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */
    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };

    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */
    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };

    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     */
    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ 580:
/***/ ((module) => {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),

/***/ 4692:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
( function( global, factory ) {

	"use strict";

	if (  true && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket trac-14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var version = "3.7.1",

	rhtmlSuffix = /HTML$/i,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},


	// Retrieve the text value of an array of DOM nodes
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		}
		if ( nodeType === 1 || nodeType === 11 ) {
			return elem.textContent;
		}
		if ( nodeType === 9 ) {
			return elem.documentElement.textContent;
		}
		if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	isXMLDoc: function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Assume HTML when documentElement doesn't yet exist, such as inside
		// document fragments.
		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var pop = arr.pop;


var sort = arr.sort;


var splice = arr.splice;


var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
	"g"
);




// Note: an element does not contain itself
jQuery.contains = function( a, b ) {
	var bup = b && b.parentNode;

	return a === bup || !!( bup && bup.nodeType === 1 && (

		// Support: IE 9 - 11+
		// IE doesn't have `contains` on SVG.
		a.contains ?
			a.contains( bup ) :
			a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	) );
};




// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

function fcssescape( ch, asCodePoint ) {
	if ( asCodePoint ) {

		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
		if ( ch === "\0" ) {
			return "\uFFFD";
		}

		// Control characters and (dependent upon position) numbers get escaped as code points
		return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
	}

	// Other potentially-special ASCII characters get backslash-escaped
	return "\\" + ch;
}

jQuery.escapeSelector = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};




var preferredDoc = document,
	pushNative = push;

( function() {

var i,
	Expr,
	outermostContext,
	sortInput,
	hasDuplicate,
	push = pushNative,

	// Local document vars
	document,
	documentElement,
	documentIsHTML,
	rbuggyQSA,
	matches,

	// Instance-specific data
	expando = jQuery.expando,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
		"loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
		whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		ID: new RegExp( "^#(" + identifier + ")" ),
		CLASS: new RegExp( "^\\.(" + identifier + ")" ),
		TAG: new RegExp( "^(" + identifier + "|[*])" ),
		ATTR: new RegExp( "^" + attributes ),
		PSEUDO: new RegExp( "^" + pseudos ),
		CHILD: new RegExp(
			"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
				whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
				whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		needsContext: new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		if ( nonHex ) {

			// Strip the backslash prefix from a non-hex escape sequence
			return nonHex;
		}

		// Replace a hexadecimal escape sequence with the encoded Unicode code point
		// Support: IE <=11+
		// For values outside the Basic Multilingual Plane (BMP), manually construct a
		// surrogate pair
		return high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes; see `setDocument`.
	// Support: IE 9 - 11+, Edge 12 - 18+
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE/Edge.
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && nodeName( elem, "fieldset" );
		},
		{ dir: "parentNode", next: "legend" }
	);

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android <=4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = {
		apply: function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		},
		call: function( target ) {
			pushNative.apply( target, slice.call( arguments, 1 ) );
		}
	};
}

function find( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE 9 only
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								push.call( results, elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE 9 only
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							find.contains( context, elem ) &&
							elem.id === m ) {

							push.call( results, elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( !nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when
					// strict-comparing two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( newContext != context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = jQuery.escapeSelector( nid );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties
		// (see https://github.com/jquery/sizzle/issues/157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		return nodeName( elem, "input" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
			elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11+
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
function setDocument( node ) {
	var subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	documentElement = document.documentElement;
	documentIsHTML = !jQuery.isXMLDoc( document );

	// Support: iOS 7 only, IE 9 - 11+
	// Older browsers didn't support unprefixed `matches`.
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.msMatchesSelector;

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors
	// (see trac-13936).
	// Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
	// all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
	if ( documentElement.msMatchesSelector &&

		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 9 - 11+, Edge 12 - 18+
		subWindow.addEventListener( "unload", unloadHandler );
	}

	// Support: IE <10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		documentElement.appendChild( el ).id = jQuery.expando;
		return !document.getElementsByName ||
			!document.getElementsByName( jQuery.expando ).length;
	} );

	// Support: IE 9 only
	// Check to see if it's possible to do matchesSelector
	// on a disconnected node.
	support.disconnectedMatch = assert( function( el ) {
		return matches.call( el, "*" );
	} );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// IE/Edge don't support the :scope pseudo-class.
	support.scope = assert( function() {
		return document.querySelectorAll( ":scope" );
	} );

	// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
	// Make sure the `:has()` argument is parsed unforgivingly.
	// We include `*` in the test to detect buggy implementations that are
	// _selectively_ forgiving (specifically when the list includes at least
	// one valid selector).
	// Note that we treat complete lack of support for `:has()` as if it were
	// spec-compliant support, which is fine because use of `:has()` in such
	// environments will fail in the qSA path and fall back to jQuery traversal
	// anyway.
	support.cssHas = assert( function() {
		try {
			document.querySelector( ":has(*,:jqfake)" );
			return false;
		} catch ( e ) {
			return true;
		}
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter.ID = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter.ID =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find.TAG = function( tag, context ) {
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			return context.getElementsByTagName( tag );

		// DocumentFragment nodes don't have gEBTN
		} else {
			return context.querySelectorAll( tag );
		}
	};

	// Class
	Expr.find.CLASS = function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	rbuggyQSA = [];

	// Build QSA regex
	// Regex strategy adopted from Diego Perini
	assert( function( el ) {

		var input;

		documentElement.appendChild( el ).innerHTML =
			"<a id='" + expando + "' href='' disabled='disabled'></a>" +
			"<select id='" + expando + "-\r\\' disabled='disabled'>" +
			"<option selected=''></option></select>";

		// Support: iOS <=7 - 8 only
		// Boolean attributes and "value" are not treated correctly in some XML documents
		if ( !el.querySelectorAll( "[selected]" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
		}

		// Support: iOS <=7 - 8 only
		if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
			rbuggyQSA.push( "~=" );
		}

		// Support: iOS 8 only
		// https://bugs.webkit.org/show_bug.cgi?id=136851
		// In-page `selector#id sibling-combinator selector` fails
		if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
			rbuggyQSA.push( ".#.+[+~]" );
		}

		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		if ( !el.querySelectorAll( ":checked" ).length ) {
			rbuggyQSA.push( ":checked" );
		}

		// Support: Windows 8 Native Apps
		// The type and name attributes are restricted during .innerHTML assignment
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		el.appendChild( input ).setAttribute( "name", "D" );

		// Support: IE 9 - 11+
		// IE's :disabled selector does not pick up the children of disabled fieldsets
		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		documentElement.appendChild( el ).disabled = true;
		if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
			rbuggyQSA.push( ":enabled", ":disabled" );
		}

		// Support: IE 11+, Edge 15 - 18+
		// IE 11/Edge don't find elements on a `[name='']` query in some cases.
		// Adding a temporary attribute to the document before the selection works
		// around the issue.
		// Interestingly, IE 10 & older don't seem to have the issue.
		input = document.createElement( "input" );
		input.setAttribute( "name", "" );
		el.appendChild( input );
		if ( !el.querySelectorAll( "[name='']" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
				whitespace + "*(?:''|\"\")" );
		}
	} );

	if ( !support.cssHas ) {

		// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
		// Our regular `try-catch` mechanism fails to detect natively-unsupported
		// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
		// in browsers that parse the `:has()` argument as a forgiving selector list.
		// https://drafts.csswg.org/selectors/#relational now requires the argument
		// to be parsed unforgivingly, but browsers have not yet fully adjusted.
		rbuggyQSA.push( ":has" );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a === document || a.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b === document || b.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	};

	return document;
}

find.matches = function( expr, elements ) {
	return find( expr, null, null, elements );
};

find.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return find( expr, document, null, [ elem ] ).length > 0;
};

find.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return jQuery.contains( context, elem );
};


find.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (see trac-13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	if ( val !== undefined ) {
		return val;
	}

	return elem.getAttribute( name );
};

find.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
jQuery.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	//
	// Support: Android <=4.0+
	// Testing for detecting duplicates is unpredictable so instead assume we can't
	// depend on duplicate detection in all browsers without a stable sort.
	hasDuplicate = !support.sortStable;
	sortInput = !support.sortStable && slice.call( results, 0 );
	sort.call( results, sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			splice.call( results, duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

jQuery.fn.uniqueSort = function() {
	return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
};

Expr = jQuery.expr = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		ATTR: function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
				.replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		CHILD: function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					find.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
				);
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

			// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				find.error( match[ 0 ] );
			}

			return match;
		},

		PSEUDO: function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		TAG: function( nodeNameSelector ) {
			var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return nodeName( elem, expectedNodeName );
				};
		},

		CLASS: function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace + ")" + className +
					"(" + whitespace + "|$)" ) ) &&
				classCache( className, function( elem ) {
					return pattern.test(
						typeof elem.className === "string" && elem.className ||
							typeof elem.getAttribute !== "undefined" &&
								elem.getAttribute( "class" ) ||
							""
					);
				} );
		},

		ATTR: function( name, operator, check ) {
			return function( elem ) {
				var result = find.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				if ( operator === "=" ) {
					return result === check;
				}
				if ( operator === "!=" ) {
					return result !== check;
				}
				if ( operator === "^=" ) {
					return check && result.indexOf( check ) === 0;
				}
				if ( operator === "*=" ) {
					return check && result.indexOf( check ) > -1;
				}
				if ( operator === "$=" ) {
					return check && result.slice( -check.length ) === check;
				}
				if ( operator === "~=" ) {
					return ( " " + result.replace( rwhitespace, " " ) + " " )
						.indexOf( check ) > -1;
				}
				if ( operator === "|=" ) {
					return result === check || result.slice( 0, check.length + 1 ) === check + "-";
				}

				return false;
			};
		},

		CHILD: function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || ( parent[ expando ] = {} );
							cache = outerCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {
								outerCache = elem[ expando ] || ( elem[ expando ] = {} );
								cache = outerCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );
											outerCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		PSEUDO: function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// https://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					find.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as jQuery does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		not: markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrimCSS, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element
					// (see https://github.com/jquery/sizzle/issues/299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		has: markFunction( function( selector ) {
			return function( elem ) {
				return find( selector, elem ).length > 0;
			};
		} ),

		contains: markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// https://www.w3.org/TR/selectors/#lang-pseudo
		lang: markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				find.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		target: function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		root: function( elem ) {
			return elem === documentElement;
		},

		focus: function( elem ) {
			return elem === safeActiveElement() &&
				document.hasFocus() &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		enabled: createDisabledPseudo( false ),
		disabled: createDisabledPseudo( true ),

		checked: function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			return ( nodeName( elem, "input" ) && !!elem.checked ) ||
				( nodeName( elem, "option" ) && !!elem.selected );
		},

		selected: function( elem ) {

			// Support: IE <=11+
			// Accessing the selectedIndex property
			// forces the browser to treat the default option as
			// selected when in an optgroup.
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		empty: function( elem ) {

			// https://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		parent: function( elem ) {
			return !Expr.pseudos.empty( elem );
		},

		// Element/input types
		header: function( elem ) {
			return rheader.test( elem.nodeName );
		},

		input: function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		button: function( elem ) {
			return nodeName( elem, "input" ) && elem.type === "button" ||
				nodeName( elem, "button" );
		},

		text: function( elem ) {
			var attr;
			return nodeName( elem, "input" ) && elem.type === "text" &&

				// Support: IE <10 only
				// New HTML5 attribute values (e.g., "search") appear
				// with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		first: createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		last: createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		even: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		odd: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i;

			if ( argument < 0 ) {
				i = argument + length;
			} else if ( argument > length ) {
				i = length;
			} else {
				i = argument;
			}

			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos.nth = Expr.pseudos.eq;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrimCSS, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	if ( parseOnly ) {
		return soFar.length;
	}

	return soFar ?
		find.error( selector ) :

		// Cache the tokens
		tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						if ( skip && nodeName( elem, skip ) ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = outerCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							outerCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		find( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem, matcherOut,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed ||
				multipleContexts( selector || "*",
					context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems;

		if ( matcher ) {

			// If we have a postFinder, or filtered seed, or non-seed postFilter
			// or preexisting results,
			matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results;

			// Find primary matches
			matcher( matcherIn, matcherOut, context, xml );
		} else {
			matcherOut = matcherIn;
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element
			// (see https://github.com/jquery/sizzle/issues/299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 )
							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrimCSS, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find.TAG( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: iOS <=7 - 9 only
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
			// elements by id. (see trac-14142)
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							push.call( results, elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					jQuery.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

function compile( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
}

/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find.ID(
				token.matches[ 0 ].replace( runescape, funescape ),
				context
			) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) &&
						testContext( context.parentNode ) || context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Initialize against the default document
setDocument();

// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

jQuery.find = find;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.unique = jQuery.uniqueSort;

// These have always been private, but they used to be documented as part of
// Sizzle so let's maintain them for now for backwards compatibility purposes.
find.compile = compile;
find.select = select;
find.setDocument = setDocument;
find.tokenize = tokenize;

find.escape = jQuery.escapeSelector;
find.getText = jQuery.text;
find.isXML = jQuery.isXMLDoc;
find.selectors = jQuery.expr;
find.support = jQuery.support;
find.uniqueSort = jQuery.uniqueSort;

	/* eslint-enable */

} )();


var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	// Strict HTML recognition (trac-11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to jQuery#find
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.error );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the error, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getErrorHook ) {
									process.error = jQuery.Deferred.getErrorHook();

								// The deprecated alias of the above. While the name suggests
								// returning the stack, not an error instance, jQuery just passes
								// it directly to `console.warn` so both will work; an instance
								// just better cooperates with source maps.
								} else if ( jQuery.Deferred.getStackHook ) {
									process.error = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook = function( error, asyncError ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message,
			error.stack, asyncError );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See trac-6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see trac-8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (trac-14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (trac-11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (trac-14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (trac-12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (trac-13208)
				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (trac-13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", true );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, isSetup ) {

	// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
	if ( !isSetup ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				if ( !saved ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					this[ type ]();
					result = dataPriv.get( this, type );
					dataPriv.set( this, type, false );

					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						return result;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering
				// the native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved ) {

				// ...and capture the result
				dataPriv.set( this, type, jQuery.event.trigger(
					saved[ 0 ],
					saved.slice( 1 ),
					this
				) );

				// Abort handling of the native event by all jQuery handlers while allowing
				// native handlers on the same element to run. On target, this is achieved
				// by stopping immediate propagation just on the jQuery event. However,
				// the native event is re-wrapped by a jQuery one on each level of the
				// propagation so the only way to stop it for jQuery is to stop it for
				// everyone via native `stopPropagation()`. This is not a problem for
				// focus/blur which don't bubble, but it does also stop click on checkboxes
				// and radios. We accept this limitation.
				event.stopPropagation();
				event.isImmediatePropagationStopped = returnTrue;
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (trac-504, trac-13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

	function focusMappedHandler( nativeEvent ) {
		if ( document.documentMode ) {

			// Support: IE 11+
			// Attach a single focusin/focusout handler on the document while someone wants
			// focus/blur. This is because the former are synchronous in IE while the latter
			// are async. In other browsers, all those handlers are invoked synchronously.

			// `handle` from private data would already wrap the event, but we need
			// to change the `type` here.
			var handle = dataPriv.get( this, "handle" ),
				event = jQuery.event.fix( nativeEvent );
			event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
			event.isSimulated = true;

			// First, handle focusin/focusout
			handle( nativeEvent );

			// ...then, handle focus/blur
			//
			// focus/blur don't bubble while focusin/focusout do; simulate the former by only
			// invoking the handler at the lower level.
			if ( event.target === event.currentTarget ) {

				// The setup part calls `leverageNative`, which, in turn, calls
				// `jQuery.event.add`, so event handle will already have been set
				// by this point.
				handle( event );
			}
		} else {

			// For non-IE browsers, attach a single capturing handler on the document
			// while someone wants focusin/focusout.
			jQuery.event.simulate( delegateType, nativeEvent.target,
				jQuery.event.fix( nativeEvent ) );
		}
	}

	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			var attaches;

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, true );

			if ( document.documentMode ) {

				// Support: IE 9 - 11+
				// We use the same native handler for focusin & focus (and focusout & blur)
				// so we need to coordinate setup & teardown parts between those events.
				// Use `delegateType` as the key as `type` is already used by `leverageNative`.
				attaches = dataPriv.get( this, delegateType );
				if ( !attaches ) {
					this.addEventListener( delegateType, focusMappedHandler );
				}
				dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
			} else {

				// Return false to allow normal processing in the caller
				return false;
			}
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		teardown: function() {
			var attaches;

			if ( document.documentMode ) {
				attaches = dataPriv.get( this, delegateType ) - 1;
				if ( !attaches ) {
					this.removeEventListener( delegateType, focusMappedHandler );
					dataPriv.remove( this, delegateType );
				} else {
					dataPriv.set( this, delegateType, attaches );
				}
			} else {

				// Return false to indicate standard teardown should be applied
				return false;
			}
		},

		// Suppress native focus or blur if we're currently inside
		// a leveraged native-event stack
		_default: function( event ) {
			return dataPriv.get( event.target, type );
		},

		delegateType: delegateType
	};

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	//
	// Support: IE 9 - 11+
	// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
	// attach a single handler for both events in IE.
	jQuery.event.special[ delegateType ] = {
		setup: function() {

			// Handle: regular nodes (via `this.ownerDocument`), window
			// (via `this.document`) & document (via `this`).
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType );

			// Support: IE 9 - 11+
			// We use the same native handler for focusin & focus (and focusout & blur)
			// so we need to coordinate setup & teardown parts between those events.
			// Use `delegateType` as the key as `type` is already used by `leverageNative`.
			if ( !attaches ) {
				if ( document.documentMode ) {
					this.addEventListener( delegateType, focusMappedHandler );
				} else {
					doc.addEventListener( type, focusMappedHandler, true );
				}
			}
			dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
		},
		teardown: function() {
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType ) - 1;

			if ( !attaches ) {
				if ( document.documentMode ) {
					this.removeEventListener( delegateType, focusMappedHandler );
				} else {
					doc.removeEventListener( type, focusMappedHandler, true );
				}
				dataPriv.remove( dataHolder, delegateType );
			} else {
				dataPriv.set( dataHolder, delegateType, attaches );
			}
		}
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (trac-8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Re-enable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {

							// Unwrap a CDATA section containing script contents. This shouldn't be
							// needed as in XML documents they're already not visible when
							// inspecting element contents and in HTML documents they have no
							// meaning but we're preserving that logic for backwards compatibility.
							// This will be removed completely in 4.0. See gh-4904.
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew jQuery#find here for performance reasons:
			// https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (trac-8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "box-sizing:content-box;border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is `display: block`
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		isCustomProp = rcustomProp.test( name ),

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, trac-12537)
	//   .css('--customProperty) (gh-3144)
	if ( computed ) {

		// Support: IE <=9 - 11+
		// IE only supports `"float"` in `getPropertyValue`; in computed styles
		// it's only available as `"cssFloat"`. We no longer modify properties
		// sent to `.css()` apart from camelCasing, so we need to check both.
		// Normally, this would create difference in behavior: if
		// `getPropertyValue` returns an empty string, the value returned
		// by `.css()` would be `undefined`. This is usually the case for
		// disconnected elements. However, in IE even disconnected elements
		// with no styles return `"none"` for `getPropertyValue( "float" )`
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( isCustomProp && ret ) {

			// Support: Firefox 105+, Chrome <=105+
			// Spec requires trimming whitespace for custom properties (gh-4926).
			// Firefox only trims leading whitespace. Chrome just collapses
			// both leading & trailing whitespace to a single space.
			//
			// Fall back to `undefined` if empty string returned.
			// This collapses a missing definition with property defined
			// and set to an empty string but there's no standard API
			// allowing us to differentiate them without a performance penalty
			// and returning `undefined` aligns with older jQuery.
			//
			// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
			// as whitespace while CSS does not, but this is not a problem
			// because CSS preprocessing replaces them with U+000A LINE FEED
			// (which *is* CSS whitespace)
			// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
			ret = ret.replace( rtrimCSS, "$1" ) || undefined;
		}

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0,
		marginDelta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		// Count margin delta separately to only add it after scroll gutter adjustment.
		// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
		if ( box === "margin" ) {
			marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta + marginDelta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		animationIterationCount: true,
		aspectRatio: true,
		borderImageSlice: true,
		columnCount: true,
		flexGrow: true,
		flexShrink: true,
		fontWeight: true,
		gridArea: true,
		gridColumn: true,
		gridColumnEnd: true,
		gridColumnStart: true,
		gridRow: true,
		gridRowEnd: true,
		gridRowStart: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		scale: true,
		widows: true,
		zIndex: true,
		zoom: true,

		// SVG-related
		fillOpacity: true,
		floodOpacity: true,
		stopOpacity: true,
		strokeMiterlimit: true,
		strokeOpacity: true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (trac-7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug trac-9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (trac-7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// Use proper attribute retrieval (trac-12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];
						if ( cur.indexOf( " " + className + " " ) < 0 ) {
							cur += className + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );

				// This expression is here for better compressibility (see addClass)
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Remove *all* instances
						while ( cur.indexOf( " " + className + " " ) > -1 ) {
							cur = cur.replace( " " + className + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var classNames, className, i, self,
			type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		classNames = classesToArray( value );

		return this.each( function() {
			if ( isValidValue ) {

				// Toggle individual class names
				self = jQuery( this );

				for ( i = 0; i < classNames.length; i++ ) {
					className = classNames[ i ];

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (trac-14686, trac-14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (trac-2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (trac-9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (trac-6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// trac-7653, trac-8125, trac-8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (trac-10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket trac-12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// trac-9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (trac-11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// trac-1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see trac-8605, trac-14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// trac-14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this
			.on( "mouseenter", fnOver )
			.on( "mouseleave", fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ 6762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ 2148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var get = __webpack_require__(6762);
var plurals = __webpack_require__(635);

module.exports = Gettext;

/**
 * Creates and returns a new Gettext instance.
 *
 * @constructor
 * @param  {Object}  [options]             A set of options
 * @param  {String}  options.sourceLocale  The locale that the source code and its
 *                                         texts are written in. Translations for
 *                                         this locale is not necessary.
 * @param  {Boolean} options.debug         Whether to output debug info into the
 *                                         console.
 * @return {Object}  A Gettext instance
 */
function Gettext(options) {
    options = options || {};

    this.catalogs = {};
    this.locale = '';
    this.domain = 'messages';

    this.listeners = [];

    // Set source locale
    this.sourceLocale = '';
    if (options.sourceLocale) {
        if (typeof options.sourceLocale === 'string') {
            this.sourceLocale = options.sourceLocale;
        }
        else {
            this.warn('The `sourceLocale` option should be a string');
        }
    }

    // Set debug flag
    this.debug = 'debug' in options && options.debug === true;
}

/**
 * Adds an event listener.
 *
 * @param  {String}   eventName  An event name
 * @param  {Function} callback   An event handler function
 */
Gettext.prototype.on = function(eventName, callback) {
    this.listeners.push({
        eventName: eventName,
        callback: callback
    });
};

/**
 * Removes an event listener.
 *
 * @param  {String}   eventName  An event name
 * @param  {Function} callback   A previously registered event handler function
 */
Gettext.prototype.off = function(eventName, callback) {
    this.listeners = this.listeners.filter(function(listener) {
        return (
            listener.eventName === eventName &&
            listener.callback === callback
        ) === false;
    });
};

/**
 * Emits an event to all registered event listener.
 *
 * @private
 * @param  {String} eventName  An event name
 * @param  {any}    eventData  Data to pass to event listeners
 */
Gettext.prototype.emit = function(eventName, eventData) {
    for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
        if (listener.eventName === eventName) {
            listener.callback(eventData);
        }
    }
};

/**
 * Logs a warning to the console if debug mode is enabled.
 *
 * @ignore
 * @param  {String} message  A warning message
 */
Gettext.prototype.warn = function(message) {
    if (this.debug) {
        console.warn(message);
    }

    this.emit('error', new Error(message));
};

/**
 * Stores a set of translations in the set of gettext
 * catalogs.
 *
 * @example
 *     gt.addTranslations('sv-SE', 'messages', translationsObject)
 *
 * @param {String} locale        A locale string
 * @param {String} domain        A domain name
 * @param {Object} translations  An object of gettext-parser JSON shape
 */
Gettext.prototype.addTranslations = function(locale, domain, translations) {
    if (!this.catalogs[locale]) {
        this.catalogs[locale] = {};
    }

    this.catalogs[locale][domain] = translations;
};

/**
 * Sets the locale to get translated messages for.
 *
 * @example
 *     gt.setLocale('sv-SE')
 *
 * @param {String} locale  A locale
 */
Gettext.prototype.setLocale = function(locale) {
    if (typeof locale !== 'string') {
        this.warn(
            'You called setLocale() with an argument of type ' + (typeof locale) + '. ' +
            'The locale must be a string.'
        );
        return;
    }

    if (locale.trim() === '') {
        this.warn('You called setLocale() with an empty value, which makes little sense.');
    }

    if (locale !== this.sourceLocale && !this.catalogs[locale]) {
        this.warn('You called setLocale() with "' + locale + '", but no translations for that locale has been added.');
    }

    this.locale = locale;
};

/**
 * Sets the default gettext domain.
 *
 * @example
 *     gt.setTextDomain('domainname')
 *
 * @param {String} domain  A gettext domain name
 */
Gettext.prototype.setTextDomain = function(domain) {
    if (typeof domain !== 'string') {
        this.warn(
            'You called setTextDomain() with an argument of type ' + (typeof domain) + '. ' +
            'The domain must be a string.'
        );
        return;
    }

    if (domain.trim() === '') {
        this.warn('You called setTextDomain() with an empty `domain` value.');
    }

    this.domain = domain;
};

/**
 * Translates a string using the default textdomain
 *
 * @example
 *     gt.gettext('Some text')
 *
 * @param  {String} msgid  String to be translated
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.gettext = function(msgid) {
    return this.dnpgettext(this.domain, '', msgid);
};

/**
 * Translates a string using a specific domain
 *
 * @example
 *     gt.dgettext('domainname', 'Some text')
 *
 * @param  {String} domain  A gettext domain name
 * @param  {String} msgid   String to be translated
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.dgettext = function(domain, msgid) {
    return this.dnpgettext(domain, '', msgid);
};

/**
 * Translates a plural string using the default textdomain
 *
 * @example
 *     gt.ngettext('One thing', 'Many things', numberOfThings)
 *
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.ngettext = function(msgid, msgidPlural, count) {
    return this.dnpgettext(this.domain, '', msgid, msgidPlural, count);
};

/**
 * Translates a plural string using a specific textdomain
 *
 * @example
 *     gt.dngettext('domainname', 'One thing', 'Many things', numberOfThings)
 *
 * @param  {String} domain       A gettext domain name
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.dngettext = function(domain, msgid, msgidPlural, count) {
    return this.dnpgettext(domain, '', msgid, msgidPlural, count);
};

/**
 * Translates a string from a specific context using the default textdomain
 *
 * @example
 *    gt.pgettext('sports', 'Back')
 *
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.pgettext = function(msgctxt, msgid) {
    return this.dnpgettext(this.domain, msgctxt, msgid);
};

/**
 * Translates a string from a specific context using s specific textdomain
 *
 * @example
 *     gt.dpgettext('domainname', 'sports', 'Back')
 *
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.dpgettext = function(domain, msgctxt, msgid) {
    return this.dnpgettext(domain, msgctxt, msgid);
};

/**
 * Translates a plural string from a specific context using the default textdomain
 *
 * @example
 *     gt.npgettext('sports', 'Back', '%d backs', numberOfBacks)
 *
 * @param  {String} msgctxt      Translation context
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.npgettext = function(msgctxt, msgid, msgidPlural, count) {
    return this.dnpgettext(this.domain, msgctxt, msgid, msgidPlural, count);
};

/**
 * Translates a plural string from a specifi context using a specific textdomain
 *
 * @example
 *     gt.dnpgettext('domainname', 'sports', 'Back', '%d backs', numberOfBacks)
 *
 * @param  {String} domain       A gettext domain name
 * @param  {String} msgctxt      Translation context
 * @param  {String} msgid        String to be translated
 * @param  {String} msgidPlural  If no translation was found, return this on count!=1
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */
Gettext.prototype.dnpgettext = function(domain, msgctxt, msgid, msgidPlural, count) {
    var defaultTranslation = msgid;
    var translation;
    var index;

    msgctxt = msgctxt || '';

    if (!isNaN(count) && count !== 1) {
        defaultTranslation = msgidPlural || msgid;
    }

    translation = this._getTranslation(domain, msgctxt, msgid);

    if (translation) {
        if (typeof count === 'number') {
            var pluralsFunc = plurals[Gettext.getLanguageCode(this.locale)].pluralsFunc;
            index = pluralsFunc(count);
            if (typeof index === 'boolean') {
                index = index ? 1 : 0;
            }
        } else {
            index = 0;
        }

        return translation.msgstr[index] || defaultTranslation;
    }
    else if (!this.sourceLocale || this.locale !== this.sourceLocale) {
        this.warn('No translation was found for msgid "' + msgid + '" in msgctxt "' + msgctxt + '" and domain "' + domain + '"');
    }

    return defaultTranslation;
};

/**
 * Retrieves comments object for a translation. The comments object
 * has the shape `{ translator, extracted, reference, flag, previous }`.
 *
 * @example
 *     const comment = gt.getComment('domainname', 'sports', 'Backs')
 *
 * @private
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {Object} Comments object or false if not found
 */
Gettext.prototype.getComment = function(domain, msgctxt, msgid) {
    var translation;

    translation = this._getTranslation(domain, msgctxt, msgid);
    if (translation) {
        return translation.comments || {};
    }

    return {};
};

/**
 * Retrieves translation object from the domain and context
 *
 * @private
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {Object} Translation object or false if not found
 */
Gettext.prototype._getTranslation = function(domain, msgctxt, msgid) {
    msgctxt = msgctxt || '';

    return get(this.catalogs, [this.locale, domain, 'translations', msgctxt, msgid]);
};

/**
 * Returns the language code part of a locale
 *
 * @example
 *     Gettext.getLanguageCode('sv-SE')
 *     // -> "sv"
 *
 * @private
 * @param   {String} locale  A case-insensitive locale string
 * @returns {String} A language code
 */
Gettext.getLanguageCode = function(locale) {
    return locale.split(/[\-_]/)[0].toLowerCase();
};

/* C-style aliases */

/**
 * C-style alias for [setTextDomain](#gettextsettextdomaindomain)
 *
 * @see Gettext#setTextDomain
 */
Gettext.prototype.textdomain = function(domain) {
    if (this.debug) {
        console.warn('textdomain(domain) was used to set locales in node-gettext v1. ' +
            'Make sure you are using it for domains, and switch to setLocale(locale) if you are not.\n\n ' +
            'To read more about the migration from node-gettext v1 to v2, ' +
            'see https://github.com/alexanderwallin/node-gettext/#migrating-from-1x-to-2x\n\n' +
            'This warning will be removed in the final 2.0.0');
    }

    this.setTextDomain(domain);
};

/**
 * C-style alias for [setLocale](#gettextsetlocalelocale)
 *
 * @see Gettext#setLocale
 */
Gettext.prototype.setlocale = function(locale) {
    this.setLocale(locale);
};

/* Deprecated functions */

/**
 * This function will be removed in the final 2.0.0 release.
 *
 * @deprecated
 */
Gettext.prototype.addTextdomain = function() {
    console.error('addTextdomain() is deprecated.\n\n' +
        '* To add translations, use addTranslations()\n' +
        '* To set the default domain, use setTextDomain() (or its alias textdomain())\n' +
        '\n' +
        'To read more about the migration from node-gettext v1 to v2, ' +
        'see https://github.com/alexanderwallin/node-gettext/#migrating-from-1x-to-2x');
};


/***/ }),

/***/ 635:
/***/ ((module) => {

"use strict";


module.exports = {
    ach: {
        name: 'Acholi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    af: {
        name: 'Afrikaans',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ak: {
        name: 'Akan',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    am: {
        name: 'Amharic',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    an: {
        name: 'Aragonese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ar: {
        name: 'Arabic',
        examples: [{
            plural: 0,
            sample: 0
        }, {
            plural: 1,
            sample: 1
        }, {
            plural: 2,
            sample: 2
        }, {
            plural: 3,
            sample: 3
        }, {
            plural: 4,
            sample: 11
        }, {
            plural: 5,
            sample: 100
        }],
        nplurals: 6,
        pluralsText: 'nplurals = 6; plural = (n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5)',
        pluralsFunc: function(n) {
            return (n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
        }
    },
    arn: {
        name: 'Mapudungun',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    ast: {
        name: 'Asturian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ay: {
        name: 'Aymará',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    az: {
        name: 'Azerbaijani',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    be: {
        name: 'Belarusian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    bg: {
        name: 'Bulgarian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    bn: {
        name: 'Bengali',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    bo: {
        name: 'Tibetan',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    br: {
        name: 'Breton',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    brx: {
        name: 'Bodo',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    bs: {
        name: 'Bosnian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    ca: {
        name: 'Catalan',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    cgg: {
        name: 'Chiga',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    cs: {
        name: 'Czech',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2);
        }
    },
    csb: {
        name: 'Kashubian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    cy: {
        name: 'Welsh',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 8
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 2 ? 1 : (n !== 8 && n !== 11) ? 2 : 3)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n === 2 ? 1 : (n !== 8 && n !== 11) ? 2 : 3);
        }
    },
    da: {
        name: 'Danish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    de: {
        name: 'German',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    doi: {
        name: 'Dogri',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    dz: {
        name: 'Dzongkha',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    el: {
        name: 'Greek',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    en: {
        name: 'English',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    eo: {
        name: 'Esperanto',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    es: {
        name: 'Spanish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    et: {
        name: 'Estonian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    eu: {
        name: 'Basque',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fa: {
        name: 'Persian',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    ff: {
        name: 'Fulah',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fi: {
        name: 'Finnish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fil: {
        name: 'Filipino',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    fo: {
        name: 'Faroese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fr: {
        name: 'French',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    fur: {
        name: 'Friulian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    fy: {
        name: 'Frisian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ga: {
        name: 'Irish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 7
        }, {
            plural: 4,
            sample: 11
        }],
        nplurals: 5,
        pluralsText: 'nplurals = 5; plural = (n === 1 ? 0 : n === 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n === 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
        }
    },
    gd: {
        name: 'Scottish Gaelic',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 20
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = ((n === 1 || n === 11) ? 0 : (n === 2 || n === 12) ? 1 : (n > 2 && n < 20) ? 2 : 3)',
        pluralsFunc: function(n) {
            return ((n === 1 || n === 11) ? 0 : (n === 2 || n === 12) ? 1 : (n > 2 && n < 20) ? 2 : 3);
        }
    },
    gl: {
        name: 'Galician',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    gu: {
        name: 'Gujarati',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    gun: {
        name: 'Gun',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    ha: {
        name: 'Hausa',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    he: {
        name: 'Hebrew',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    hi: {
        name: 'Hindi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    hne: {
        name: 'Chhattisgarhi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    hr: {
        name: 'Croatian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    hu: {
        name: 'Hungarian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    hy: {
        name: 'Armenian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    id: {
        name: 'Indonesian',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    is: {
        name: 'Icelandic',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n % 10 !== 1 || n % 100 === 11)',
        pluralsFunc: function(n) {
            return (n % 10 !== 1 || n % 100 === 11);
        }
    },
    it: {
        name: 'Italian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ja: {
        name: 'Japanese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    jbo: {
        name: 'Lojban',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    jv: {
        name: 'Javanese',
        examples: [{
            plural: 0,
            sample: 0
        }, {
            plural: 1,
            sample: 1
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 0)',
        pluralsFunc: function(n) {
            return (n !== 0);
        }
    },
    ka: {
        name: 'Georgian',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    kk: {
        name: 'Kazakh',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    km: {
        name: 'Khmer',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    kn: {
        name: 'Kannada',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ko: {
        name: 'Korean',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    ku: {
        name: 'Kurdish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    kw: {
        name: 'Cornish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 4
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3);
        }
    },
    ky: {
        name: 'Kyrgyz',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    lb: {
        name: 'Letzeburgesch',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ln: {
        name: 'Lingala',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    lo: {
        name: 'Lao',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    lt: {
        name: 'Lithuanian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 10
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    lv: {
        name: 'Latvian',
        examples: [{
            plural: 2,
            sample: 0
        }, {
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2);
        }
    },
    mai: {
        name: 'Maithili',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    mfe: {
        name: 'Mauritian Creole',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    mg: {
        name: 'Malagasy',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    mi: {
        name: 'Maori',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    mk: {
        name: 'Macedonian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n === 1 || n % 10 === 1 ? 0 : 1)',
        pluralsFunc: function(n) {
            return (n === 1 || n % 10 === 1 ? 0 : 1);
        }
    },
    ml: {
        name: 'Malayalam',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    mn: {
        name: 'Mongolian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    mni: {
        name: 'Manipuri',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    mnk: {
        name: 'Mandinka',
        examples: [{
            plural: 0,
            sample: 0
        }, {
            plural: 1,
            sample: 1
        }, {
            plural: 2,
            sample: 2
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 0 ? 0 : n === 1 ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 0 ? 0 : n === 1 ? 1 : 2);
        }
    },
    mr: {
        name: 'Marathi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ms: {
        name: 'Malay',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    mt: {
        name: 'Maltese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 11
        }, {
            plural: 3,
            sample: 20
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 0 || ( n % 100 > 1 && n % 100 < 11) ? 1 : (n % 100 > 10 && n % 100 < 20 ) ? 2 : 3)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n === 0 || (n % 100 > 1 && n % 100 < 11) ? 1 : (n % 100 > 10 && n % 100 < 20) ? 2 : 3);
        }
    },
    my: {
        name: 'Burmese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    nah: {
        name: 'Nahuatl',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nap: {
        name: 'Neapolitan',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nb: {
        name: 'Norwegian Bokmal',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ne: {
        name: 'Nepali',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nl: {
        name: 'Dutch',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nn: {
        name: 'Norwegian Nynorsk',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    no: {
        name: 'Norwegian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    nso: {
        name: 'Northern Sotho',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    oc: {
        name: 'Occitan',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    or: {
        name: 'Oriya',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    pa: {
        name: 'Punjabi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    pap: {
        name: 'Papiamento',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    pl: {
        name: 'Polish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    pms: {
        name: 'Piemontese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ps: {
        name: 'Pashto',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    pt: {
        name: 'Portuguese',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    rm: {
        name: 'Romansh',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ro: {
        name: 'Romanian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 20
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n === 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : (n === 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2);
        }
    },
    ru: {
        name: 'Russian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    rw: {
        name: 'Kinyarwanda',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sah: {
        name: 'Yakut',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    sat: {
        name: 'Santali',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sco: {
        name: 'Scots',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sd: {
        name: 'Sindhi',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    se: {
        name: 'Northern Sami',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    si: {
        name: 'Sinhala',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sk: {
        name: 'Slovak',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2);
        }
    },
    sl: {
        name: 'Slovenian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 3
        }, {
            plural: 3,
            sample: 5
        }],
        nplurals: 4,
        pluralsText: 'nplurals = 4; plural = (n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3)',
        pluralsFunc: function(n) {
            return (n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3);
        }
    },
    so: {
        name: 'Somali',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    son: {
        name: 'Songhay',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sq: {
        name: 'Albanian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sr: {
        name: 'Serbian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    su: {
        name: 'Sundanese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    sv: {
        name: 'Swedish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    sw: {
        name: 'Swahili',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    ta: {
        name: 'Tamil',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    te: {
        name: 'Telugu',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    tg: {
        name: 'Tajik',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    th: {
        name: 'Thai',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    ti: {
        name: 'Tigrinya',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    tk: {
        name: 'Turkmen',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    tr: {
        name: 'Turkish',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    tt: {
        name: 'Tatar',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    ug: {
        name: 'Uyghur',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    uk: {
        name: 'Ukrainian',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }, {
            plural: 2,
            sample: 5
        }],
        nplurals: 3,
        pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
        pluralsFunc: function(n) {
            return (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    ur: {
        name: 'Urdu',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    uz: {
        name: 'Uzbek',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    vi: {
        name: 'Vietnamese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    wa: {
        name: 'Walloon',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n > 1)',
        pluralsFunc: function(n) {
            return (n > 1);
        }
    },
    wo: {
        name: 'Wolof',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    },
    yo: {
        name: 'Yoruba',
        examples: [{
            plural: 0,
            sample: 1
        }, {
            plural: 1,
            sample: 2
        }],
        nplurals: 2,
        pluralsText: 'nplurals = 2; plural = (n !== 1)',
        pluralsFunc: function(n) {
            return (n !== 1);
        }
    },
    zh: {
        name: 'Chinese',
        examples: [{
            plural: 0,
            sample: 1
        }],
        nplurals: 1,
        pluralsText: 'nplurals = 1; plural = 0',
        pluralsFunc: function() {
            return 0;
        }
    }
};


/***/ }),

/***/ 7599:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 3016:
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 6920:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(__webpack_require__.g.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(3016);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(7599);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


/***/ }),

/***/ 3627:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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




var isWindows = "browser" === 'win32';
var util = __webpack_require__(6920);


// resolves . and .. elements in a path array with directory names there
// must be no slashes or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  var res = [];
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];

    // ignore empty parts
    if (!p || p === '.')
      continue;

    if (p === '..') {
      if (res.length && res[res.length - 1] !== '..') {
        res.pop();
      } else if (allowAboveRoot) {
        res.push('..');
      }
    } else {
      res.push(p);
    }
  }

  return res;
}

// returns an array with empty elements removed from either end of the input
// array or the original array if no elements need to be removed
function trimArray(arr) {
  var lastIndex = arr.length - 1;
  var start = 0;
  for (; start <= lastIndex; start++) {
    if (arr[start])
      break;
  }

  var end = lastIndex;
  for (; end >= 0; end--) {
    if (arr[end])
      break;
  }

  if (start === 0 && end === lastIndex)
    return arr;
  if (start > end)
    return [];
  return arr.slice(start, end + 1);
}

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
var splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

// Regex to split the tail part of the above into [*, dir, basename, ext]
var splitTailRe =
    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

var win32 = {};

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename) {
  // Separate device+slash from tail
  var result = splitDeviceRe.exec(filename),
      device = (result[1] || '') + (result[2] || ''),
      tail = result[3] || '';
  // Split the tail into dir, basename and extension
  var result2 = splitTailRe.exec(tail),
      dir = result2[1],
      basename = result2[2],
      ext = result2[3];
  return [device, dir, basename, ext];
}

function win32StatPath(path) {
  var result = splitDeviceRe.exec(path),
      device = result[1] || '',
      isUnc = !!device && device[1] !== ':';
  return {
    device: device,
    isUnc: isUnc,
    isAbsolute: isUnc || !!result[2], // UNC paths are always absolute
    tail: result[3]
  };
}

function normalizeUNCRoot(device) {
  return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
}

// path.resolve([from ...], to)
win32.resolve = function() {
  var resolvedDevice = '',
      resolvedTail = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1; i--) {
    var path;
    if (i >= 0) {
      path = arguments[i];
    } else if (!resolvedDevice) {
      path = process.cwd();
    } else {
      // Windows has the concept of drive-specific current working
      // directories. If we've resolved a drive letter but not yet an
      // absolute path, get cwd for that drive. We're sure the device is not
      // an unc path at this points, because unc paths are always absolute.
      path = process.env['=' + resolvedDevice];
      // Verify that a drive-local cwd was found and that it actually points
      // to our drive. If not, default to the drive's root.
      if (!path || path.substr(0, 3).toLowerCase() !==
          resolvedDevice.toLowerCase() + '\\') {
        path = resolvedDevice + '\\';
      }
    }

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    var result = win32StatPath(path),
        device = result.device,
        isUnc = result.isUnc,
        isAbsolute = result.isAbsolute,
        tail = result.tail;

    if (device &&
        resolvedDevice &&
        device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      // This path points to another device so it is not applicable
      continue;
    }

    if (!resolvedDevice) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = tail + '\\' + resolvedTail;
      resolvedAbsolute = isAbsolute;
    }

    if (resolvedDevice && resolvedAbsolute) {
      break;
    }
  }

  // Convert slashes to backslashes when `resolvedDevice` points to an UNC
  // root. Also squash multiple slashes into a single one where appropriate.
  if (isUnc) {
    resolvedDevice = normalizeUNCRoot(resolvedDevice);
  }

  // At this point the path should be resolved to a full absolute path,
  // but handle relative paths to be safe (might happen when process.cwd()
  // fails)

  // Normalize the tail path
  resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/),
                                !resolvedAbsolute).join('\\');

  return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
         '.';
};


win32.normalize = function(path) {
  var result = win32StatPath(path),
      device = result.device,
      isUnc = result.isUnc,
      isAbsolute = result.isAbsolute,
      tail = result.tail,
      trailingSlash = /[\\\/]$/.test(tail);

  // Normalize the tail path
  tail = normalizeArray(tail.split(/[\\\/]+/), !isAbsolute).join('\\');

  if (!tail && !isAbsolute) {
    tail = '.';
  }
  if (tail && trailingSlash) {
    tail += '\\';
  }

  // Convert slashes to backslashes when `device` points to an UNC root.
  // Also squash multiple slashes into a single one where appropriate.
  if (isUnc) {
    device = normalizeUNCRoot(device);
  }

  return device + (isAbsolute ? '\\' : '') + tail;
};


win32.isAbsolute = function(path) {
  return win32StatPath(path).isAbsolute;
};

win32.join = function() {
  var paths = [];
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!util.isString(arg)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    if (arg) {
      paths.push(arg);
    }
  }

  var joined = paths.join('\\');

  // Make sure that the joined path doesn't start with two slashes, because
  // normalize() will mistake it for an UNC path then.
  //
  // This step is skipped when it is very clear that the user actually
  // intended to point at an UNC path. This is assumed when the first
  // non-empty string arguments starts with exactly two slashes followed by
  // at least one more non-slash character.
  //
  // Note that for normalize() to treat a path as an UNC path it needs to
  // have at least 2 components, so we don't filter for that here.
  // This means that the user can use join to construct UNC paths from
  // a server name and a share name; for example:
  //   path.join('//server', 'share') -> '\\\\server\\share\')
  if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
    joined = joined.replace(/^[\\\/]{2,}/, '\\');
  }

  return win32.normalize(joined);
};


// path.relative(from, to)
// it will solve the relative path from 'from' to 'to', for instance:
// from = 'C:\\orandea\\test\\aaa'
// to = 'C:\\orandea\\impl\\bbb'
// The output of the function should be: '..\\..\\impl\\bbb'
win32.relative = function(from, to) {
  from = win32.resolve(from);
  to = win32.resolve(to);

  // windows is not case sensitive
  var lowerFrom = from.toLowerCase();
  var lowerTo = to.toLowerCase();

  var toParts = trimArray(to.split('\\'));

  var lowerFromParts = trimArray(lowerFrom.split('\\'));
  var lowerToParts = trimArray(lowerTo.split('\\'));

  var length = Math.min(lowerFromParts.length, lowerToParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (lowerFromParts[i] !== lowerToParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  if (samePartsLength == 0) {
    return to;
  }

  var outputParts = [];
  for (var i = samePartsLength; i < lowerFromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('\\');
};


win32._makeLong = function(path) {
  // Note: this will *probably* throw somewhere.
  if (!util.isString(path))
    return path;

  if (!path) {
    return '';
  }

  var resolvedPath = win32.resolve(path);

  if (/^[a-zA-Z]\:\\/.test(resolvedPath)) {
    // path is local filesystem path, which needs to be converted
    // to long UNC path.
    return '\\\\?\\' + resolvedPath;
  } else if (/^\\\\[^?.]/.test(resolvedPath)) {
    // path is network UNC path, which needs to be converted
    // to long UNC path.
    return '\\\\?\\UNC\\' + resolvedPath.substring(2);
  }

  return path;
};


win32.dirname = function(path) {
  var result = win32SplitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


win32.basename = function(path, ext) {
  var f = win32SplitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


win32.extname = function(path) {
  return win32SplitPath(path)[3];
};


win32.format = function(pathObject) {
  if (!util.isObject(pathObject)) {
    throw new TypeError(
        "Parameter 'pathObject' must be an object, not " + typeof pathObject
    );
  }

  var root = pathObject.root || '';

  if (!util.isString(root)) {
    throw new TypeError(
        "'pathObject.root' must be a string or undefined, not " +
        typeof pathObject.root
    );
  }

  var dir = pathObject.dir;
  var base = pathObject.base || '';
  if (!dir) {
    return base;
  }
  if (dir[dir.length - 1] === win32.sep) {
    return dir + base;
  }
  return dir + win32.sep + base;
};


win32.parse = function(pathString) {
  if (!util.isString(pathString)) {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = win32SplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};


win32.sep = '\\';
win32.delimiter = ';';


// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var posix = {};


function posixSplitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
}


// path.resolve([from ...], to)
// posix version
posix.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path[0] === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(resolvedPath.split('/'),
                                !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
posix.normalize = function(path) {
  var isAbsolute = posix.isAbsolute(path),
      trailingSlash = path && path[path.length - 1] === '/';

  // Normalize the path
  path = normalizeArray(path.split('/'), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
posix.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
posix.join = function() {
  var path = '';
  for (var i = 0; i < arguments.length; i++) {
    var segment = arguments[i];
    if (!util.isString(segment)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    if (segment) {
      if (!path) {
        path += segment;
      } else {
        path += '/' + segment;
      }
    }
  }
  return posix.normalize(path);
};


// path.relative(from, to)
// posix version
posix.relative = function(from, to) {
  from = posix.resolve(from).substr(1);
  to = posix.resolve(to).substr(1);

  var fromParts = trimArray(from.split('/'));
  var toParts = trimArray(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};


posix._makeLong = function(path) {
  return path;
};


posix.dirname = function(path) {
  var result = posixSplitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


posix.basename = function(path, ext) {
  var f = posixSplitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


posix.extname = function(path) {
  return posixSplitPath(path)[3];
};


posix.format = function(pathObject) {
  if (!util.isObject(pathObject)) {
    throw new TypeError(
        "Parameter 'pathObject' must be an object, not " + typeof pathObject
    );
  }

  var root = pathObject.root || '';

  if (!util.isString(root)) {
    throw new TypeError(
        "'pathObject.root' must be a string or undefined, not " +
        typeof pathObject.root
    );
  }

  var dir = pathObject.dir ? pathObject.dir + posix.sep : '';
  var base = pathObject.base || '';
  return dir + base;
};


posix.parse = function(pathString) {
  if (!util.isString(pathString)) {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = posixSplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  allParts[1] = allParts[1] || '';
  allParts[2] = allParts[2] || '';
  allParts[3] = allParts[3] || '';

  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};


posix.sep = '/';
posix.delimiter = ':';


if (isWindows)
  module.exports = win32;
else /* posix */
  module.exports = posix;

module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),

/***/ 7736:
/***/ (function(module) {

/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
(function(root, factory) {
  if ( true && module.exports) {
    module.exports = factory();
  } else {
    root.Toastify = factory();
  }
})(this, function(global) {
  // Object initialization
  var Toastify = function(options) {
      // Returning a new init object
      return new Toastify.lib.init(options);
    },
    // Library version
    version = "1.12.0";

  // Set the default global options
  Toastify.defaults = {
    oldestFirst: true,
    text: "Toastify is awesome!",
    node: undefined,
    duration: 3000,
    selector: undefined,
    callback: function () {
    },
    destination: undefined,
    newWindow: false,
    close: false,
    gravity: "toastify-top",
    positionLeft: false,
    position: '',
    backgroundColor: '',
    avatar: "",
    className: "",
    stopOnFocus: true,
    onClick: function () {
    },
    offset: {x: 0, y: 0},
    escapeMarkup: true,
    ariaLive: 'polite',
    style: {background: ''}
  };

  // Defining the prototype of the object
  Toastify.lib = Toastify.prototype = {
    toastify: version,

    constructor: Toastify,

    // Initializing the object with required parameters
    init: function(options) {
      // Verifying and validating the input object
      if (!options) {
        options = {};
      }

      // Creating the options object
      this.options = {};

      this.toastElement = null;

      // Validating the options
      this.options.text = options.text || Toastify.defaults.text; // Display message
      this.options.node = options.node || Toastify.defaults.node;  // Display content as node
      this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration; // Display duration
      this.options.selector = options.selector || Toastify.defaults.selector; // Parent selector
      this.options.callback = options.callback || Toastify.defaults.callback; // Callback after display
      this.options.destination = options.destination || Toastify.defaults.destination; // On-click destination
      this.options.newWindow = options.newWindow || Toastify.defaults.newWindow; // Open destination in new window
      this.options.close = options.close || Toastify.defaults.close; // Show toast close icon
      this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity; // toast position - top or bottom
      this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft; // toast position - left or right
      this.options.position = options.position || Toastify.defaults.position; // toast position - left or right
      this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor; // toast background color
      this.options.avatar = options.avatar || Toastify.defaults.avatar; // img element src - url or a path
      this.options.className = options.className || Toastify.defaults.className; // additional class names for the toast
      this.options.stopOnFocus = options.stopOnFocus === undefined ? Toastify.defaults.stopOnFocus : options.stopOnFocus; // stop timeout on focus
      this.options.onClick = options.onClick || Toastify.defaults.onClick; // Callback after click
      this.options.offset = options.offset || Toastify.defaults.offset; // toast offset
      this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
      this.options.ariaLive = options.ariaLive || Toastify.defaults.ariaLive;
      this.options.style = options.style || Toastify.defaults.style;
      if(options.backgroundColor) {
        this.options.style.background = options.backgroundColor;
      }

      // Returning the current object for chaining functions
      return this;
    },

    // Building the DOM element
    buildToast: function() {
      // Validating if the options are defined
      if (!this.options) {
        throw "Toastify is not initialized";
      }

      // Creating the DOM object
      var divElement = document.createElement("div");
      divElement.className = "toastify on " + this.options.className;

      // Positioning toast to left or right or center
      if (!!this.options.position) {
        divElement.className += " toastify-" + this.options.position;
      } else {
        // To be depreciated in further versions
        if (this.options.positionLeft === true) {
          divElement.className += " toastify-left";
          console.warn('Property `positionLeft` will be depreciated in further versions. Please use `position` instead.')
        } else {
          // Default position
          divElement.className += " toastify-right";
        }
      }

      // Assigning gravity of element
      divElement.className += " " + this.options.gravity;

      if (this.options.backgroundColor) {
        // This is being deprecated in favor of using the style HTML DOM property
        console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
      }

      // Loop through our style object and apply styles to divElement
      for (var property in this.options.style) {
        divElement.style[property] = this.options.style[property];
      }

      // Announce the toast to screen readers
      if (this.options.ariaLive) {
        divElement.setAttribute('aria-live', this.options.ariaLive)
      }

      // Adding the toast message/node
      if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
        // If we have a valid node, we insert it
        divElement.appendChild(this.options.node)
      } else {
        if (this.options.escapeMarkup) {
          divElement.innerText = this.options.text;
        } else {
          divElement.innerHTML = this.options.text;
        }

        if (this.options.avatar !== "") {
          var avatarElement = document.createElement("img");
          avatarElement.src = this.options.avatar;

          avatarElement.className = "toastify-avatar";

          if (this.options.position == "left" || this.options.positionLeft === true) {
            // Adding close icon on the left of content
            divElement.appendChild(avatarElement);
          } else {
            // Adding close icon on the right of content
            divElement.insertAdjacentElement("afterbegin", avatarElement);
          }
        }
      }

      // Adding a close icon to the toast
      if (this.options.close === true) {
        // Create a span for close element
        var closeElement = document.createElement("button");
        closeElement.type = "button";
        closeElement.setAttribute("aria-label", "Close");
        closeElement.className = "toast-close";
        closeElement.innerHTML = "&#10006;";

        // Triggering the removal of toast from DOM on close click
        closeElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            this.removeElement(this.toastElement);
            window.clearTimeout(this.toastElement.timeOutValue);
          }.bind(this)
        );

        //Calculating screen width
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        // Adding the close icon to the toast element
        // Display on the right if screen width is less than or equal to 360px
        if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
          // Adding close icon on the left of content
          divElement.insertAdjacentElement("afterbegin", closeElement);
        } else {
          // Adding close icon on the right of content
          divElement.appendChild(closeElement);
        }
      }

      // Clear timeout while toast is focused
      if (this.options.stopOnFocus && this.options.duration > 0) {
        var self = this;
        // stop countdown
        divElement.addEventListener(
          "mouseover",
          function(event) {
            window.clearTimeout(divElement.timeOutValue);
          }
        )
        // add back the timeout
        divElement.addEventListener(
          "mouseleave",
          function() {
            divElement.timeOutValue = window.setTimeout(
              function() {
                // Remove the toast from DOM
                self.removeElement(divElement);
              },
              self.options.duration
            )
          }
        )
      }

      // Adding an on-click destination path
      if (typeof this.options.destination !== "undefined") {
        divElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            if (this.options.newWindow === true) {
              window.open(this.options.destination, "_blank");
            } else {
              window.location = this.options.destination;
            }
          }.bind(this)
        );
      }

      if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
        divElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            this.options.onClick();
          }.bind(this)
        );
      }

      // Adding offset
      if(typeof this.options.offset === "object") {

        var x = getAxisOffsetAValue("x", this.options);
        var y = getAxisOffsetAValue("y", this.options);

        var xOffset = this.options.position == "left" ? x : "-" + x;
        var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;

        divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";

      }

      // Returning the generated element
      return divElement;
    },

    // Displaying the toast
    showToast: function() {
      // Creating the DOM object for the toast
      this.toastElement = this.buildToast();

      // Getting the root element to with the toast needs to be added
      var rootElement;
      if (typeof this.options.selector === "string") {
        rootElement = document.getElementById(this.options.selector);
      } else if (this.options.selector instanceof HTMLElement || (typeof ShadowRoot !== 'undefined' && this.options.selector instanceof ShadowRoot)) {
        rootElement = this.options.selector;
      } else {
        rootElement = document.body;
      }

      // Validating if root element is present in DOM
      if (!rootElement) {
        throw "Root element is not defined";
      }

      // Adding the DOM element
      var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
      rootElement.insertBefore(this.toastElement, elementToInsert);

      // Repositioning the toasts in case multiple toasts are present
      Toastify.reposition();

      if (this.options.duration > 0) {
        this.toastElement.timeOutValue = window.setTimeout(
          function() {
            // Remove the toast from DOM
            this.removeElement(this.toastElement);
          }.bind(this),
          this.options.duration
        ); // Binding `this` for function invocation
      }

      // Supporting function chaining
      return this;
    },

    hideToast: function() {
      if (this.toastElement.timeOutValue) {
        clearTimeout(this.toastElement.timeOutValue);
      }
      this.removeElement(this.toastElement);
    },

    // Removing the element from the DOM
    removeElement: function(toastElement) {
      // Hiding the element
      // toastElement.classList.remove("on");
      toastElement.className = toastElement.className.replace(" on", "");

      // Removing the element from DOM after transition end
      window.setTimeout(
        function() {
          // remove options node if any
          if (this.options.node && this.options.node.parentNode) {
            this.options.node.parentNode.removeChild(this.options.node);
          }

          // Remove the element from the DOM, only when the parent node was not removed before.
          if (toastElement.parentNode) {
            toastElement.parentNode.removeChild(toastElement);
          }

          // Calling the callback function
          this.options.callback.call(toastElement);

          // Repositioning the toasts again
          Toastify.reposition();
        }.bind(this),
        400
      ); // Binding `this` for function invocation
    },
  };

  // Positioning the toasts on the DOM
  Toastify.reposition = function() {

    // Top margins with gravity
    var topLeftOffsetSize = {
      top: 15,
      bottom: 15,
    };
    var topRightOffsetSize = {
      top: 15,
      bottom: 15,
    };
    var offsetSize = {
      top: 15,
      bottom: 15,
    };

    // Get all toast messages on the DOM
    var allToasts = document.getElementsByClassName("toastify");

    var classUsed;

    // Modifying the position of each toast element
    for (var i = 0; i < allToasts.length; i++) {
      // Getting the applied gravity
      if (containsClass(allToasts[i], "toastify-top") === true) {
        classUsed = "toastify-top";
      } else {
        classUsed = "toastify-bottom";
      }

      var height = allToasts[i].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length-1)
      // Spacing between toasts
      var offset = 15;

      var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

      // Show toast in center if screen with less than or equal to 360px
      if (width <= 360) {
        // Setting the position
        allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";

        offsetSize[classUsed] += height + offset;
      } else {
        if (containsClass(allToasts[i], "toastify-left") === true) {
          // Setting the position
          allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";

          topLeftOffsetSize[classUsed] += height + offset;
        } else {
          // Setting the position
          allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";

          topRightOffsetSize[classUsed] += height + offset;
        }
      }
    }

    // Supporting function chaining
    return this;
  };

  // Helper function to get offset.
  function getAxisOffsetAValue(axis, options) {

    if(options.offset[axis]) {
      if(isNaN(options.offset[axis])) {
        return options.offset[axis];
      }
      else {
        return options.offset[axis] + 'px';
      }
    }

    return '0px';

  }

  function containsClass(elem, yourClass) {
    if (!elem || typeof yourClass !== "string") {
      return false;
    } else if (
      elem.className &&
      elem.className
        .trim()
        .split(/\s+/gi)
        .indexOf(yourClass) > -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Setting up the prototype for the init object
  Toastify.lib.init.prototype = Toastify.lib;

  // Returning the Toastify function to be assigned to the window object/module
  return Toastify;
});


/***/ }),

/***/ 523:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ S),
/* harmony export */   k: () => (/* binding */ L),
/* harmony export */   t: () => (/* binding */ u)
/* harmony export */ });
/* unused harmony exports T, a, b, c, d, e, f, g, i, j, l, n, s */
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7736);
/* harmony import */ var _nextcloud_l10n_gettext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1195);


/**
 * @copyright Copyright (c) 2023 Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @author Ferdinand Thiessen <opensource@fthiessen.de>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const g = (0,_nextcloud_l10n_gettext__WEBPACK_IMPORTED_MODULE_1__/* .getGettextBuilder */ .$)().detectLocale();
[{ locale: "af", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Afrikaans (https://app.transifex.com/nextcloud/teams/64236/af/)", "Content-Type": "text/plain; charset=UTF-8", Language: "af", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Afrikaans (https://app.transifex.com/nextcloud/teams/64236/af/)
Content-Type: text/plain; charset=UTF-8
Language: af
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ar", json: { charset: "utf-8", headers: { "Last-Translator": "Ali <alimahwer@yahoo.com>, 2024", "Language-Team": "Arabic (https://app.transifex.com/nextcloud/teams/64236/ar/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ar", "Plural-Forms": "nplurals=6; plural=n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Ali <alimahwer@yahoo.com>, 2024
` }, msgstr: [`Last-Translator: Ali <alimahwer@yahoo.com>, 2024
Language-Team: Arabic (https://app.transifex.com/nextcloud/teams/64236/ar/)
Content-Type: text/plain; charset=UTF-8
Language: ar
Plural-Forms: nplurals=6; plural=n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 && n%100<=99 ? 4 : 5;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" لا يصلح كاسم مجلد.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" غير مسموح به كاسم مجلد'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" غير مسموح به داخل اسم مجلد.'] }, "All files": { msgid: "All files", msgstr: ["كل الملفات"] }, Choose: { msgid: "Choose", msgstr: ["إختَر"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["إختَر {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["إختَر %n ملف", "إختَر %n ملف", "إختَر %n ملف", "إختَر %n ملفات", "إختَر %n ملف", "إختَر %n ملف"] }, Copy: { msgid: "Copy", msgstr: ["نسخ"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["نسخٌ إلى {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["تعذّر إنشاء المجلد الجديد"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["يتعذّر تحميل إعدادات الملفات"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["يتعذّر تحميل مناظير views الملفات"] }, "Create directory": { msgid: "Create directory", msgstr: ["أنشِيءْ مجلّداً"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["مُنتقِي المنظور الحالي"] }, Favorites: { msgid: "Favorites", msgstr: ["المُفضَّلة"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["الملفات و المجلدات التي تُميِّزُها كمٌفضَّلة ستظهر هنا."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["الملفات و المجلدات التي قمت مؤخراً بتعديلها سوف تظهر هنا."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["فلترة قائمة الملفات"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["اسم المجلد لا يمكن أن يكون فارغاً."] }, Home: { msgid: "Home", msgstr: ["البداية"] }, Modified: { msgid: "Modified", msgstr: ["مُعدَّل"] }, Move: { msgid: "Move", msgstr: ["أُنقُل"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["أُنقُل إلى {target}"] }, Name: { msgid: "Name", msgstr: ["الاسم"] }, New: { msgid: "New", msgstr: ["جديد"] }, "New folder": { msgid: "New folder", msgstr: ["مٌجلّد جديد"] }, "New folder name": { msgid: "New folder name", msgstr: ["اسم المجلد الجديد"] }, "No files in here": { msgid: "No files in here", msgstr: ["لا توجد ملفات هنا"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["لا توجد ملفات تتطابق مع الفلتر الذي وضعته"] }, "No matching files": { msgid: "No matching files", msgstr: ["لا توجد ملفات مُطابِقة"] }, Recent: { msgid: "Recent", msgstr: ["الحالي"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["حدِّد كل المداخل"] }, "Select entry": { msgid: "Select entry", msgstr: ["إختَر المدخل"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["إختر سطر الـ {nodename}"] }, Size: { msgid: "Size", msgstr: ["الحجم"] }, Undo: { msgid: "Undo", msgstr: ["تراجع"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["قُم برفع محتوىً أو قُم بمزامنة أجهزتك!"] } } } } }, { locale: "ast", json: { charset: "utf-8", headers: { "Last-Translator": "enolp <enolp@softastur.org>, 2024", "Language-Team": "Asturian (https://app.transifex.com/nextcloud/teams/64236/ast/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ast", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
enolp <enolp@softastur.org>, 2024
` }, msgstr: [`Last-Translator: enolp <enolp@softastur.org>, 2024
Language-Team: Asturian (https://app.transifex.com/nextcloud/teams/64236/ast/)
Content-Type: text/plain; charset=UTF-8
Language: ast
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["«{name}» ye un nome de carpeta inválidu."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["«{name}» ye un nome de carpeta inválidu"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["Nun se permite'l caráuter «/» dientro'l nome de les carpetes."] }, "All files": { msgid: "All files", msgstr: ["Tolos ficheros"] }, Choose: { msgid: "Choose", msgstr: ["Escoyer"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Escoyer «{ficheru}»"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Escoyer %n ficheru", "Escoyer %n ficheros"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar en: {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nun se pudo crear la carpeta"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nun se pudo cargar la configuración de los ficheros"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nun se pudieron cargar les vistes de los ficheros"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear un direutoriu"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de la vista actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Equí apaecen los ficheros y les carpetes que metas en Favoritos."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Equí apaecen los fichero y les carpetes que modificares apocayá."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Peñerar la llista de ficheros"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["El nome de la carpeta nun pue tar baleru."] }, Home: { msgid: "Home", msgstr: ["Aniciu"] }, Modified: { msgid: "Modified", msgstr: ["Modificóse"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover a {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, New: { msgid: "New", msgstr: ["Nuevu"] }, "New folder": { msgid: "New folder", msgstr: ["Carpeta nueva"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nome de carpeta nuevu"] }, "No files in here": { msgid: "No files in here", msgstr: ["Equí nun hai nengún ficheru"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nun s'atopó nengún ficheru que concasare cola peñera."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nun hai nengún ficheru que concase"] }, Recent: { msgid: "Recent", msgstr: ["De recién"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleicionar toles entraes"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleicionar la entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleicionar la filera de: {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamañu"] }, Undo: { msgid: "Undo", msgstr: ["Desfacer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["¡Xubi dalgún elementu o sincroniza colos tos preseos!"] } } } } }, { locale: "az", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Azerbaijani (https://app.transifex.com/nextcloud/teams/64236/az/)", "Content-Type": "text/plain; charset=UTF-8", Language: "az", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Azerbaijani (https://app.transifex.com/nextcloud/teams/64236/az/)
Content-Type: text/plain; charset=UTF-8
Language: az
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "be", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Belarusian (https://app.transifex.com/nextcloud/teams/64236/be/)", "Content-Type": "text/plain; charset=UTF-8", Language: "be", "Plural-Forms": "nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Belarusian (https://app.transifex.com/nextcloud/teams/64236/be/)
Content-Type: text/plain; charset=UTF-8
Language: be
Plural-Forms: nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "bg_BG", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Bulgarian (Bulgaria) (https://app.transifex.com/nextcloud/teams/64236/bg_BG/)", "Content-Type": "text/plain; charset=UTF-8", Language: "bg_BG", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Bulgarian (Bulgaria) (https://app.transifex.com/nextcloud/teams/64236/bg_BG/)
Content-Type: text/plain; charset=UTF-8
Language: bg_BG
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "bn_BD", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Bengali (Bangladesh) (https://app.transifex.com/nextcloud/teams/64236/bn_BD/)", "Content-Type": "text/plain; charset=UTF-8", Language: "bn_BD", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Bengali (Bangladesh) (https://app.transifex.com/nextcloud/teams/64236/bn_BD/)
Content-Type: text/plain; charset=UTF-8
Language: bn_BD
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "br", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Breton (https://app.transifex.com/nextcloud/teams/64236/br/)", "Content-Type": "text/plain; charset=UTF-8", Language: "br", "Plural-Forms": "nplurals=5; plural=((n%10 == 1) && (n%100 != 11) && (n%100 !=71) && (n%100 !=91) ? 0 :(n%10 == 2) && (n%100 != 12) && (n%100 !=72) && (n%100 !=92) ? 1 :(n%10 ==3 || n%10==4 || n%10==9) && (n%100 < 10 || n% 100 > 19) && (n%100 < 70 || n%100 > 79) && (n%100 < 90 || n%100 > 99) ? 2 :(n != 0 && n % 1000000 == 0) ? 3 : 4);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Breton (https://app.transifex.com/nextcloud/teams/64236/br/)
Content-Type: text/plain; charset=UTF-8
Language: br
Plural-Forms: nplurals=5; plural=((n%10 == 1) && (n%100 != 11) && (n%100 !=71) && (n%100 !=91) ? 0 :(n%10 == 2) && (n%100 != 12) && (n%100 !=72) && (n%100 !=92) ? 1 :(n%10 ==3 || n%10==4 || n%10==9) && (n%100 < 10 || n% 100 > 19) && (n%100 < 70 || n%100 > 79) && (n%100 < 90 || n%100 > 99) ? 2 :(n != 0 && n % 1000000 == 0) ? 3 : 4);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Disober"] } } } } }, { locale: "bs", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Bosnian (https://app.transifex.com/nextcloud/teams/64236/bs/)", "Content-Type": "text/plain; charset=UTF-8", Language: "bs", "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Bosnian (https://app.transifex.com/nextcloud/teams/64236/bs/)
Content-Type: text/plain; charset=UTF-8
Language: bs
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ca", json: { charset: "utf-8", headers: { "Last-Translator": "v v <e670006006@gmail.com>, 2024", "Language-Team": "Catalan (https://app.transifex.com/nextcloud/teams/64236/ca/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ca", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
v v <e670006006@gmail.com>, 2024
` }, msgstr: [`Last-Translator: v v <e670006006@gmail.com>, 2024
Language-Team: Catalan (https://app.transifex.com/nextcloud/teams/64236/ca/)
Content-Type: text/plain; charset=UTF-8
Language: ca
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" és un nom de carpeta no vàlid.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" no és permès en el nom de carpeta'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" no és permès en el nom de carpeta.'] }, "All files": { msgid: "All files", msgstr: ["Tots els arxius"] }, Choose: { msgid: "Choose", msgstr: ["Triar"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Triar {file}"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar a {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["No es pot crear la nova carpeta"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear directori"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de visualització actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favorits"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Els fitxers i les carpetes que marqueu com a favorits es mostraran aquí."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Els fitxers i les carpetes recentment modificats es mostraran aquí."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar llistat de fitxers"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["El nom de la carpeta no pot estar buit."] }, Home: { msgid: "Home", msgstr: ["Inici"] }, Modified: { msgid: "Modified", msgstr: ["Modificat"] }, Move: { msgid: "Move", msgstr: ["Moure"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["More a {target}"] }, Name: { msgid: "Name", msgstr: ["Nom"] }, New: { msgid: "New", msgstr: ["Nou"] }, "New folder": { msgid: "New folder", msgstr: ["Nova carpeta"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nom de nova carpeta"] }, "No files in here": { msgid: "No files in here", msgstr: ["No hi ha arxius"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["No s'han trobat fitxers coincidents amb el vostre filtre."] }, "No matching files": { msgid: "No matching files", msgstr: ["Sense arxius coincidents"] }, Recent: { msgid: "Recent", msgstr: ["Recent"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleccioneu totes les entrades"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleccionar entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleccioneu la fila per a {nodename}"] }, Size: { msgid: "Size", msgstr: ["Mida"] }, Undo: { msgid: "Undo", msgstr: ["Desfés"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Pengeu contingut o sincronitzeu-vos amb els vostres dispositius!"] } } } } }, { locale: "cs", json: { charset: "utf-8", headers: { "Last-Translator": "Pavel Borecki <pavel.borecki@gmail.com>, 2020", "Language-Team": "Czech (https://www.transifex.com/nextcloud/teams/64236/cs/)", "Content-Type": "text/plain; charset=UTF-8", Language: "cs", "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Pavel Borecki <pavel.borecki@gmail.com>, 2020
` }, msgstr: [`Last-Translator: Pavel Borecki <pavel.borecki@gmail.com>, 2020
Language-Team: Czech (https://www.transifex.com/nextcloud/teams/64236/cs/)
Content-Type: text/plain; charset=UTF-8
Language: cs
Plural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:187" }, msgstr: ["Zpět"] } } } } }, { locale: "cs_CZ", json: { charset: "utf-8", headers: { "Last-Translator": "Pavel Borecki <pavel.borecki@gmail.com>, 2024", "Language-Team": "Czech (Czech Republic) (https://app.transifex.com/nextcloud/teams/64236/cs_CZ/)", "Content-Type": "text/plain; charset=UTF-8", Language: "cs_CZ", "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Pavel Borecki <pavel.borecki@gmail.com>, 2024
` }, msgstr: [`Last-Translator: Pavel Borecki <pavel.borecki@gmail.com>, 2024
Language-Team: Czech (Czech Republic) (https://app.transifex.com/nextcloud/teams/64236/cs_CZ/)
Content-Type: text/plain; charset=UTF-8
Language: cs_CZ
Plural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n >= 2 && n <= 4 && n % 1 == 0) ? 1: (n % 1 != 0 ) ? 2 : 3;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}“ není platný název složky."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}“ není povolený název složky."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["znak „/“ (dopředné lomítko) není možné použít v názvu složky."] }, "All files": { msgid: "All files", msgstr: ["Veškeré soubory"] }, Choose: { msgid: "Choose", msgstr: ["Zvolit"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Zvolit {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Zvolte %n soubor", "Zvolte %n soubory", "Zvolte %n souborů", "Zvolte %n soubory"] }, Copy: { msgid: "Copy", msgstr: ["Zkopírovat"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Zkopírovat do {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Novou složku se nepodařilo vytvořit"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nepodařilo se načíst nastavení pro soubory"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nepodařilo se načíst pohledy souborů"] }, "Create directory": { msgid: "Create directory", msgstr: ["Vytvořit složku"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Výběr stávajícího zobrazení"] }, Favorites: { msgid: "Favorites", msgstr: ["Oblíbené"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Zde se zobrazí soubory a složky, které označíte jako oblíbené."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Zde se zobrazí soubory a složky, které jste nedávno pozměnili."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrovat seznam souborů"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Složku je třeba nějak nazvat."] }, Home: { msgid: "Home", msgstr: ["Domů"] }, Modified: { msgid: "Modified", msgstr: ["Změněno"] }, Move: { msgid: "Move", msgstr: ["Přesounout"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Přesunout do {target}"] }, Name: { msgid: "Name", msgstr: ["Název"] }, New: { msgid: "New", msgstr: ["Nové"] }, "New folder": { msgid: "New folder", msgstr: ["Nová složka"] }, "New folder name": { msgid: "New folder name", msgstr: ["Název pro novou složku"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nejsou zde žádné soubory"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nenalezeny žádné soubory odpovídající vašemu filtru"] }, "No matching files": { msgid: "No matching files", msgstr: ["Žádné odpovídající soubory"] }, Recent: { msgid: "Recent", msgstr: ["Nedávné"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Vybrat všechny položky"] }, "Select entry": { msgid: "Select entry", msgstr: ["Vybrat položku"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Vybrat řádek pro {nodename}"] }, Size: { msgid: "Size", msgstr: ["Velikost"] }, Undo: { msgid: "Undo", msgstr: ["Zpět"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Nahrajte nějaký obsah nebo proveďte synchronizaci se svými zařízeními!"] } } } } }, { locale: "cy_GB", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Welsh (United Kingdom) (https://app.transifex.com/nextcloud/teams/64236/cy_GB/)", "Content-Type": "text/plain; charset=UTF-8", Language: "cy_GB", "Plural-Forms": "nplurals=4; plural=(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Welsh (United Kingdom) (https://app.transifex.com/nextcloud/teams/64236/cy_GB/)
Content-Type: text/plain; charset=UTF-8
Language: cy_GB
Plural-Forms: nplurals=4; plural=(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "da", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Danish (https://app.transifex.com/nextcloud/teams/64236/da/)", "Content-Type": "text/plain; charset=UTF-8", Language: "da", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Danish (https://app.transifex.com/nextcloud/teams/64236/da/)
Content-Type: text/plain; charset=UTF-8
Language: da
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Fortryd"] } } } } }, { locale: "de", json: { charset: "utf-8", headers: { "Last-Translator": "Joachim Sokolowski, 2023", "Language-Team": "German (https://app.transifex.com/nextcloud/teams/64236/de/)", "Content-Type": "text/plain; charset=UTF-8", Language: "de", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Mario Siegmann <mario_siegmann@web.de>, 2023
Markus Eckstein, 2023
Andy Scherzinger <info@andy-scherzinger.de>, 2023
Joachim Sokolowski, 2023
` }, msgstr: [`Last-Translator: Joachim Sokolowski, 2023
Language-Team: German (https://app.transifex.com/nextcloud/teams/64236/de/)
Content-Type: text/plain; charset=UTF-8
Language: de
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" ist ein ungültiger Ordnername.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" ist kein zulässiger Ordnername'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" ist innerhalb eines Ordnernamens nicht zulässig.'] }, "All files": { msgid: "All files", msgstr: ["Alle Dateien"] }, Choose: { msgid: "Choose", msgstr: ["Auswählen"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} auswählen"] }, Copy: { msgid: "Copy", msgstr: ["Kopieren"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Nach {target} kopieren"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Der neue Ordner konnte nicht erstellt werden."] }, "Create directory": { msgid: "Create directory", msgstr: ["Verzeichnis erstellen"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Aktuelle Ansichtsauswahl"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoriten"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Dateien und Ordner, die du als Favorit markierst, werden hier angezeigt."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Dateien und Ordner, die du kürzlich geändert hast, werden hier angezeigt."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Dateiliste filtern"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Der Ordnername darf nicht leer sein."] }, Home: { msgid: "Home", msgstr: ["Startseite"] }, Modified: { msgid: "Modified", msgstr: ["Geändert"] }, Move: { msgid: "Move", msgstr: ["Verschieben"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Nach {target} verschieben"] }, Name: { msgid: "Name", msgstr: ["Name"] }, New: { msgid: "New", msgstr: ["Neu"] }, "New folder": { msgid: "New folder", msgstr: ["Neuer Ordner"] }, "New folder name": { msgid: "New folder name", msgstr: ["Neuer Ordnername"] }, "No files in here": { msgid: "No files in here", msgstr: ["Keine Dateien vorhanden"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Es wurden keine Dateien gefunden, die deinem Filter entsprechen."] }, "No matching files": { msgid: "No matching files", msgstr: ["Keine passenden Dateien"] }, Recent: { msgid: "Recent", msgstr: ["Jüngste"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Alle Einträge auswählen"] }, "Select entry": { msgid: "Select entry", msgstr: ["Eintrag auswählen"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Die Zeile für {nodename} auswählen."] }, Size: { msgid: "Size", msgstr: ["Größe"] }, Undo: { msgid: "Undo", msgstr: ["Rückgängig"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Lade Inhalte hoch oder synchronisieren diese mit deinen Geräten!"] } } } } }, { locale: "de_DE", json: { charset: "utf-8", headers: { "Last-Translator": "Mario Siegmann <mario_siegmann@web.de>, 2024", "Language-Team": "German (Germany) (https://app.transifex.com/nextcloud/teams/64236/de_DE/)", "Content-Type": "text/plain; charset=UTF-8", Language: "de_DE", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Mark Ziegler <mark.ziegler@rakekniven.de>, 2023
Mario Siegmann <mario_siegmann@web.de>, 2024
` }, msgstr: [`Last-Translator: Mario Siegmann <mario_siegmann@web.de>, 2024
Language-Team: German (Germany) (https://app.transifex.com/nextcloud/teams/64236/de_DE/)
Content-Type: text/plain; charset=UTF-8
Language: de_DE
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" ist ein ungültiger Ordnername.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" ist kein zulässiger Ordnername'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" ist innerhalb eines Ordnernamens nicht zulässig.'] }, "All files": { msgid: "All files", msgstr: ["Alle Dateien"] }, Choose: { msgid: "Choose", msgstr: ["Auswählen"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} auswählen"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["%n Datei auswählen", "%n Dateien auswählen"] }, Copy: { msgid: "Copy", msgstr: ["Kopieren"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Nach {target} kopieren"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Der neue Ordner konnte nicht erstellt werden"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Dateieinstellungen konnten nicht geladen werden"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Dateiansichten konnten nicht geladen werden"] }, "Create directory": { msgid: "Create directory", msgstr: ["Verzeichnis erstellen"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Aktuelle Ansichtsauswahl"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoriten"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Dateien und Ordner, die Sie als Favorit markieren, werden hier angezeigt."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Dateien und Ordner, die Sie kürzlich geändert haben, werden hier angezeigt."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Dateiliste filtern"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Der Ordnername darf nicht leer sein."] }, Home: { msgid: "Home", msgstr: ["Home"] }, Modified: { msgid: "Modified", msgstr: ["Geändert"] }, Move: { msgid: "Move", msgstr: ["Verschieben"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Nach {target} verschieben"] }, Name: { msgid: "Name", msgstr: ["Name"] }, New: { msgid: "New", msgstr: ["Neu"] }, "New folder": { msgid: "New folder", msgstr: ["Neuer Ordner"] }, "New folder name": { msgid: "New folder name", msgstr: ["Neuer Ordnername"] }, "No files in here": { msgid: "No files in here", msgstr: ["Hier sind keine Dateien"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Es wurden keine Dateien gefunden, die Ihrem Filter entsprechen."] }, "No matching files": { msgid: "No matching files", msgstr: ["Keine passenden Dateien"] }, Recent: { msgid: "Recent", msgstr: ["Neueste"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Alle Einträge auswählen"] }, "Select entry": { msgid: "Select entry", msgstr: ["Eintrag auswählen"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Die Zeile für {nodename} auswählen."] }, Size: { msgid: "Size", msgstr: ["Größe"] }, Undo: { msgid: "Undo", msgstr: ["Rückgängig machen"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Laden Sie Inhalte hoch oder synchronisieren Sie diese mit Ihren Geräten!"] } } } } }, { locale: "el", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Greek (https://app.transifex.com/nextcloud/teams/64236/el/)", "Content-Type": "text/plain; charset=UTF-8", Language: "el", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Greek (https://app.transifex.com/nextcloud/teams/64236/el/)
Content-Type: text/plain; charset=UTF-8
Language: el
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Αναίρεση"] } } } } }, { locale: "en_GB", json: { charset: "utf-8", headers: { "Last-Translator": "Andi Chandler <andi@gowling.com>, 2024", "Language-Team": "English (United Kingdom) (https://app.transifex.com/nextcloud/teams/64236/en_GB/)", "Content-Type": "text/plain; charset=UTF-8", Language: "en_GB", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Café Tango, 2023
Andi Chandler <andi@gowling.com>, 2024
` }, msgstr: [`Last-Translator: Andi Chandler <andi@gowling.com>, 2024
Language-Team: English (United Kingdom) (https://app.transifex.com/nextcloud/teams/64236/en_GB/)
Content-Type: text/plain; charset=UTF-8
Language: en_GB
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" is an invalid folder name.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" is not an allowed folder name'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" is not allowed inside a folder name.'] }, "All files": { msgid: "All files", msgstr: ["All files"] }, Choose: { msgid: "Choose", msgstr: ["Choose"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Choose {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Choose %n file", "Choose %n files"] }, Copy: { msgid: "Copy", msgstr: ["Copy"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copy to {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Could not create the new folder"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Could not load files settings"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Could not load files views"] }, "Create directory": { msgid: "Create directory", msgstr: ["Create directory"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Current view selector"] }, Favorites: { msgid: "Favorites", msgstr: ["Favourites"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Files and folders you mark as favourite will show up here."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Files and folders you recently modified will show up here."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filter file list"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Folder name cannot be empty."] }, Home: { msgid: "Home", msgstr: ["Home"] }, Modified: { msgid: "Modified", msgstr: ["Modified"] }, Move: { msgid: "Move", msgstr: ["Move"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Move to {target}"] }, Name: { msgid: "Name", msgstr: ["Name"] }, New: { msgid: "New", msgstr: ["New"] }, "New folder": { msgid: "New folder", msgstr: ["New folder"] }, "New folder name": { msgid: "New folder name", msgstr: ["New folder name"] }, "No files in here": { msgid: "No files in here", msgstr: ["No files in here"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["No files matching your filter were found."] }, "No matching files": { msgid: "No matching files", msgstr: ["No matching files"] }, Recent: { msgid: "Recent", msgstr: ["Recent"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Select all entries"] }, "Select entry": { msgid: "Select entry", msgstr: ["Select entry"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Select the row for {nodename}"] }, Size: { msgid: "Size", msgstr: ["Size"] }, Undo: { msgid: "Undo", msgstr: ["Undo"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Upload some content or sync with your devices!"] } } } } }, { locale: "eo", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Esperanto (https://app.transifex.com/nextcloud/teams/64236/eo/)", "Content-Type": "text/plain; charset=UTF-8", Language: "eo", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Esperanto (https://app.transifex.com/nextcloud/teams/64236/eo/)
Content-Type: text/plain; charset=UTF-8
Language: eo
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Malfari"] } } } } }, { locale: "es", json: { charset: "utf-8", headers: { "Last-Translator": "Julio C. Ortega, 2024", "Language-Team": "Spanish (https://app.transifex.com/nextcloud/teams/64236/es/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
FranciscoFJ <dev-ooo@satel-sa.com>, 2023
Julio C. Ortega, 2024
` }, msgstr: [`Last-Translator: Julio C. Ortega, 2024
Language-Team: Spanish (https://app.transifex.com/nextcloud/teams/64236/es/)
Content-Type: text/plain; charset=UTF-8
Language: es
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{nombre}" es un nombre de carpeta no válido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" no es un nombre de carpeta permitido'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" no está permitido dentro del nombre de una carpeta.'] }, "All files": { msgid: "All files", msgstr: ["Todos los archivos"] }, Choose: { msgid: "Choose", msgstr: ["Escoger"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Escoger {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Elige %n archivo", "Elige %n archivos", "Elige %n archivos"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar a {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["No se pudo crear la carpeta nueva"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear directorio"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de vista actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar lista de archivos"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["El nombre de la carpeta no puede estar vacío."] }, Home: { msgid: "Home", msgstr: ["Inicio"] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover a {target}"] }, Name: { msgid: "Name", msgstr: ["Nombre"] }, New: { msgid: "New", msgstr: ["Nuevo"] }, "New folder": { msgid: "New folder", msgstr: [" Nueva carpeta"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nuevo nombre de carpeta"] }, "No files in here": { msgid: "No files in here", msgstr: ["No hay archivos aquí"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["No se encontraron archivos que coincidiesen con su filtro."] }, "No matching files": { msgid: "No matching files", msgstr: ["No hay archivos coincidentes"] }, Recent: { msgid: "Recent", msgstr: ["Reciente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleccionar todas las entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleccionar entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleccione la fila para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamaño"] }, Undo: { msgid: "Undo", msgstr: ["Deshacer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["¡Cargue algún contenido o sincronice con sus dispositivos!"] } } } } }, { locale: "es_419", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Latin America) (https://app.transifex.com/nextcloud/teams/64236/es_419/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_419", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Latin America) (https://app.transifex.com/nextcloud/teams/64236/es_419/)
Content-Type: text/plain; charset=UTF-8
Language: es_419
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_AR", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Spanish (Argentina) (https://app.transifex.com/nextcloud/teams/64236/es_AR/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_AR", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Spanish (Argentina) (https://app.transifex.com/nextcloud/teams/64236/es_AR/)
Content-Type: text/plain; charset=UTF-8
Language: es_AR
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Deshacer"] } } } } }, { locale: "es_CL", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Chile) (https://app.transifex.com/nextcloud/teams/64236/es_CL/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_CL", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Chile) (https://app.transifex.com/nextcloud/teams/64236/es_CL/)
Content-Type: text/plain; charset=UTF-8
Language: es_CL
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_CO", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Colombia) (https://app.transifex.com/nextcloud/teams/64236/es_CO/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_CO", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Colombia) (https://app.transifex.com/nextcloud/teams/64236/es_CO/)
Content-Type: text/plain; charset=UTF-8
Language: es_CO
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_CR", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Costa Rica) (https://app.transifex.com/nextcloud/teams/64236/es_CR/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_CR", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Costa Rica) (https://app.transifex.com/nextcloud/teams/64236/es_CR/)
Content-Type: text/plain; charset=UTF-8
Language: es_CR
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_DO", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Dominican Republic) (https://app.transifex.com/nextcloud/teams/64236/es_DO/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_DO", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Dominican Republic) (https://app.transifex.com/nextcloud/teams/64236/es_DO/)
Content-Type: text/plain; charset=UTF-8
Language: es_DO
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_EC", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Ecuador) (https://app.transifex.com/nextcloud/teams/64236/es_EC/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_EC", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Ecuador) (https://app.transifex.com/nextcloud/teams/64236/es_EC/)
Content-Type: text/plain; charset=UTF-8
Language: es_EC
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_GT", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Guatemala) (https://app.transifex.com/nextcloud/teams/64236/es_GT/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_GT", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Guatemala) (https://app.transifex.com/nextcloud/teams/64236/es_GT/)
Content-Type: text/plain; charset=UTF-8
Language: es_GT
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_HN", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Honduras) (https://app.transifex.com/nextcloud/teams/64236/es_HN/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_HN", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Honduras) (https://app.transifex.com/nextcloud/teams/64236/es_HN/)
Content-Type: text/plain; charset=UTF-8
Language: es_HN
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_MX", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Spanish (Mexico) (https://app.transifex.com/nextcloud/teams/64236/es_MX/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_MX", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Spanish (Mexico) (https://app.transifex.com/nextcloud/teams/64236/es_MX/)
Content-Type: text/plain; charset=UTF-8
Language: es_MX
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Deshacer"] } } } } }, { locale: "es_NI", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Nicaragua) (https://app.transifex.com/nextcloud/teams/64236/es_NI/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_NI", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Nicaragua) (https://app.transifex.com/nextcloud/teams/64236/es_NI/)
Content-Type: text/plain; charset=UTF-8
Language: es_NI
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_PA", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Panama) (https://app.transifex.com/nextcloud/teams/64236/es_PA/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_PA", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Panama) (https://app.transifex.com/nextcloud/teams/64236/es_PA/)
Content-Type: text/plain; charset=UTF-8
Language: es_PA
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_PE", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Peru) (https://app.transifex.com/nextcloud/teams/64236/es_PE/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_PE", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Peru) (https://app.transifex.com/nextcloud/teams/64236/es_PE/)
Content-Type: text/plain; charset=UTF-8
Language: es_PE
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_PR", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Puerto Rico) (https://app.transifex.com/nextcloud/teams/64236/es_PR/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_PR", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Puerto Rico) (https://app.transifex.com/nextcloud/teams/64236/es_PR/)
Content-Type: text/plain; charset=UTF-8
Language: es_PR
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_PY", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Paraguay) (https://app.transifex.com/nextcloud/teams/64236/es_PY/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_PY", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Paraguay) (https://app.transifex.com/nextcloud/teams/64236/es_PY/)
Content-Type: text/plain; charset=UTF-8
Language: es_PY
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_SV", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (El Salvador) (https://app.transifex.com/nextcloud/teams/64236/es_SV/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_SV", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (El Salvador) (https://app.transifex.com/nextcloud/teams/64236/es_SV/)
Content-Type: text/plain; charset=UTF-8
Language: es_SV
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "es_UY", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Spanish (Uruguay) (https://app.transifex.com/nextcloud/teams/64236/es_UY/)", "Content-Type": "text/plain; charset=UTF-8", Language: "es_UY", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Spanish (Uruguay) (https://app.transifex.com/nextcloud/teams/64236/es_UY/)
Content-Type: text/plain; charset=UTF-8
Language: es_UY
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "et_EE", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Estonian (Estonia) (https://app.transifex.com/nextcloud/teams/64236/et_EE/)", "Content-Type": "text/plain; charset=UTF-8", Language: "et_EE", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Estonian (Estonia) (https://app.transifex.com/nextcloud/teams/64236/et_EE/)
Content-Type: text/plain; charset=UTF-8
Language: et_EE
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "eu", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Basque (https://app.transifex.com/nextcloud/teams/64236/eu/)", "Content-Type": "text/plain; charset=UTF-8", Language: "eu", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Basque (https://app.transifex.com/nextcloud/teams/64236/eu/)
Content-Type: text/plain; charset=UTF-8
Language: eu
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Desegin"] } } } } }, { locale: "fa", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Persian (https://app.transifex.com/nextcloud/teams/64236/fa/)", "Content-Type": "text/plain; charset=UTF-8", Language: "fa", "Plural-Forms": "nplurals=2; plural=(n > 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Persian (https://app.transifex.com/nextcloud/teams/64236/fa/)
Content-Type: text/plain; charset=UTF-8
Language: fa
Plural-Forms: nplurals=2; plural=(n > 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["بازگردانی"] } } } } }, { locale: "fi_FI", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Finnish (Finland) (https://app.transifex.com/nextcloud/teams/64236/fi_FI/)", "Content-Type": "text/plain; charset=UTF-8", Language: "fi_FI", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Finnish (Finland) (https://app.transifex.com/nextcloud/teams/64236/fi_FI/)
Content-Type: text/plain; charset=UTF-8
Language: fi_FI
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Kumoa"] } } } } }, { locale: "fo", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Faroese (https://app.transifex.com/nextcloud/teams/64236/fo/)", "Content-Type": "text/plain; charset=UTF-8", Language: "fo", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Faroese (https://app.transifex.com/nextcloud/teams/64236/fo/)
Content-Type: text/plain; charset=UTF-8
Language: fo
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "fr", json: { charset: "utf-8", headers: { "Last-Translator": "fleopaul thp, 2023", "Language-Team": "French (https://app.transifex.com/nextcloud/teams/64236/fr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "fr", "Plural-Forms": "nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Rémi LEBLOND, 2023
Mordecai, 2023
fleopaul thp, 2023
` }, msgstr: [`Last-Translator: fleopaul thp, 2023
Language-Team: French (https://app.transifex.com/nextcloud/teams/64236/fr/)
Content-Type: text/plain; charset=UTF-8
Language: fr
Plural-Forms: nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["« {name} » n'est pas un nom de dossier valide."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["« {name} » n'est pas un nom de dossier autorisé."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["Le caractère « / » n'est pas autorisé dans un nom de dossier."] }, "All files": { msgid: "All files", msgstr: ["Tous les fichiers"] }, Choose: { msgid: "Choose", msgstr: ["Choisir"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Choisir {file}"] }, Copy: { msgid: "Copy", msgstr: ["Copier"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copier vers {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Impossible de créer le nouveau dossier"] }, "Create directory": { msgid: "Create directory", msgstr: ["Créer un répertoire"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Sélecteur de vue courante"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoris"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Les fichiers et répertoires marqués en favoris apparaîtront ici."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Les fichiers et répertoires modifiés récemment apparaîtront ici."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Liste de filtre de fichiers"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Le nom du dossier ne peut pas être vide."] }, Home: { msgid: "Home", msgstr: ["Accueil"] }, Modified: { msgid: "Modified", msgstr: ["Modifié"] }, Move: { msgid: "Move", msgstr: ["Déplacer"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Déplacer vers {target}"] }, Name: { msgid: "Name", msgstr: ["Nom"] }, New: { msgid: "New", msgstr: ["Nouveau"] }, "New folder": { msgid: "New folder", msgstr: ["Nouveau répertoire"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nom du nouveau répertoire"] }, "No files in here": { msgid: "No files in here", msgstr: ["Aucun fichier ici"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Aucun fichier trouvé correspondant à votre filtre."] }, "No matching files": { msgid: "No matching files", msgstr: ["Aucun fichier trouvé"] }, Recent: { msgid: "Recent", msgstr: ["Récents"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Tous sélectionner"] }, "Select entry": { msgid: "Select entry", msgstr: ["Sélectionner une entrée"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Sélectionner l'enregistrement pour {nodename}"] }, Size: { msgid: "Size", msgstr: ["Taille"] }, Undo: { msgid: "Undo", msgstr: ["Rétablir"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Charger du contenu ou synchroniser avec vos équipements !"] } } } } }, { locale: "gd", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Gaelic, Scottish (https://app.transifex.com/nextcloud/teams/64236/gd/)", "Content-Type": "text/plain; charset=UTF-8", Language: "gd", "Plural-Forms": "nplurals=4; plural=(n==1 || n==11) ? 0 : (n==2 || n==12) ? 1 : (n > 2 && n < 20) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Gaelic, Scottish (https://app.transifex.com/nextcloud/teams/64236/gd/)
Content-Type: text/plain; charset=UTF-8
Language: gd
Plural-Forms: nplurals=4; plural=(n==1 || n==11) ? 0 : (n==2 || n==12) ? 1 : (n > 2 && n < 20) ? 2 : 3;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "gl", json: { charset: "utf-8", headers: { "Last-Translator": "Miguel Anxo Bouzada <mbouzada@gmail.com>, 2024", "Language-Team": "Galician (https://app.transifex.com/nextcloud/teams/64236/gl/)", "Content-Type": "text/plain; charset=UTF-8", Language: "gl", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Miguel Anxo Bouzada <mbouzada@gmail.com>, 2024
` }, msgstr: [`Last-Translator: Miguel Anxo Bouzada <mbouzada@gmail.com>, 2024
Language-Team: Galician (https://app.transifex.com/nextcloud/teams/64236/gl/)
Content-Type: text/plain; charset=UTF-8
Language: gl
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["«{name}» non é un nome de cartafol válido."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["«{name}» non é un nome de cartafol permitido"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["A «/» non está permitida no nome dun cartafol."] }, "All files": { msgid: "All files", msgstr: ["Todos os ficheiros"] }, Choose: { msgid: "Choose", msgstr: ["Escoller"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Escoller {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Escoller %n ficheiro", "Escoller %n ficheiros"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar en  {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Non foi posíbel crear o novo cartafol"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crear un directorio"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selector de vista actual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Os ficheiros e cartafoles que marque como favoritos aparecerán aquí."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Os ficheiros e cartafoles que modificou recentemente aparecerán aquí."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar a lista de ficheiros"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["O nome do cartafol non pode estar baleiro."] }, Home: { msgid: "Home", msgstr: ["Inicio"] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover cara a {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, New: { msgid: "New", msgstr: ["Novo"] }, "New folder": { msgid: "New folder", msgstr: ["Novo cartafol"] }, "New folder name": { msgid: "New folder name", msgstr: ["Novo nome do cartafol"] }, "No files in here": { msgid: "No files in here", msgstr: ["Aquí non hai ficheiros"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Non se atopou ningún ficheiro que coincida co filtro."] }, "No matching files": { msgid: "No matching files", msgstr: ["Non hai ficheiros coincidentes"] }, Recent: { msgid: "Recent", msgstr: ["Recente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Seleccionar todas as entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleccionar a entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleccionar a fila para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamaño"] }, Undo: { msgid: "Undo", msgstr: ["Desfacer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Enviar algún contido ou sincronizalo cos seus dispositivos!"] } } } } }, { locale: "he", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Hebrew (https://app.transifex.com/nextcloud/teams/64236/he/)", "Content-Type": "text/plain; charset=UTF-8", Language: "he", "Plural-Forms": "nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n == 2 && n % 1 == 0) ? 1: (n % 10 == 0 && n % 1 == 0 && n > 10) ? 2 : 3;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Hebrew (https://app.transifex.com/nextcloud/teams/64236/he/)
Content-Type: text/plain; charset=UTF-8
Language: he
Plural-Forms: nplurals=4; plural=(n == 1 && n % 1 == 0) ? 0 : (n == 2 && n % 1 == 0) ? 1: (n % 10 == 0 && n % 1 == 0 && n > 10) ? 2 : 3;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["ביטול"] } } } } }, { locale: "hi_IN", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Hindi (India) (https://app.transifex.com/nextcloud/teams/64236/hi_IN/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hi_IN", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Hindi (India) (https://app.transifex.com/nextcloud/teams/64236/hi_IN/)
Content-Type: text/plain; charset=UTF-8
Language: hi_IN
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "hr", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Croatian (https://app.transifex.com/nextcloud/teams/64236/hr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hr", "Plural-Forms": "nplurals=3; plural=n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Croatian (https://app.transifex.com/nextcloud/teams/64236/hr/)
Content-Type: text/plain; charset=UTF-8
Language: hr
Plural-Forms: nplurals=3; plural=n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "hsb", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Upper Sorbian (https://app.transifex.com/nextcloud/teams/64236/hsb/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hsb", "Plural-Forms": "nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Upper Sorbian (https://app.transifex.com/nextcloud/teams/64236/hsb/)
Content-Type: text/plain; charset=UTF-8
Language: hsb
Plural-Forms: nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "hu_HU", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Hungarian (Hungary) (https://app.transifex.com/nextcloud/teams/64236/hu_HU/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hu_HU", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Hungarian (Hungary) (https://app.transifex.com/nextcloud/teams/64236/hu_HU/)
Content-Type: text/plain; charset=UTF-8
Language: hu_HU
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Visszavonás"] } } } } }, { locale: "hy", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Armenian (https://app.transifex.com/nextcloud/teams/64236/hy/)", "Content-Type": "text/plain; charset=UTF-8", Language: "hy", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Armenian (https://app.transifex.com/nextcloud/teams/64236/hy/)
Content-Type: text/plain; charset=UTF-8
Language: hy
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ia", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Interlingua (https://app.transifex.com/nextcloud/teams/64236/ia/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ia", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Interlingua (https://app.transifex.com/nextcloud/teams/64236/ia/)
Content-Type: text/plain; charset=UTF-8
Language: ia
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "id", json: { charset: "utf-8", headers: { "Last-Translator": "Lun May, 2024", "Language-Team": "Indonesian (https://app.transifex.com/nextcloud/teams/64236/id/)", "Content-Type": "text/plain; charset=UTF-8", Language: "id", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Linerly <linerly@proton.me>, 2023
Lun May, 2024
` }, msgstr: [`Last-Translator: Lun May, 2024
Language-Team: Indonesian (https://app.transifex.com/nextcloud/teams/64236/id/)
Content-Type: text/plain; charset=UTF-8
Language: id
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" bukan nama folder yang valid.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" merupakan nama folder yang tidak diperbolehkan'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" tidak diperbolehkan di dalam nama folder.'] }, "All files": { msgid: "All files", msgstr: ["Semua berkas"] }, Choose: { msgid: "Choose", msgstr: ["Pilih"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Pilih {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Pilih %n file"] }, Copy: { msgid: "Copy", msgstr: ["Salin"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Salin ke {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Tidak dapat membuat folder baru"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Tidak dapat memuat pengaturan file"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Tidak dapat memuat tampilan file"] }, "Create directory": { msgid: "Create directory", msgstr: ["Buat direktori"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Pemilih tampilan saat ini"] }, Favorites: { msgid: "Favorites", msgstr: ["Favorit"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Berkas dan folder yang Anda tandai sebagai favorit akan muncul di sini."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Berkas dan folder yang Anda ubah baru-baru ini akan muncul di sini."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Saring daftar berkas"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Name berkas tidak boleh kosong."] }, Home: { msgid: "Home", msgstr: ["Beranda"] }, Modified: { msgid: "Modified", msgstr: ["Diubah"] }, Move: { msgid: "Move", msgstr: ["Pindahkan"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Pindahkan ke {target}"] }, Name: { msgid: "Name", msgstr: ["Nama"] }, New: { msgid: "New", msgstr: ["Baru"] }, "New folder": { msgid: "New folder", msgstr: ["Folder baru"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nama folder baru"] }, "No files in here": { msgid: "No files in here", msgstr: ["Tidak ada berkas di sini"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Tidak ada berkas yang cocok dengan penyaringan Anda."] }, "No matching files": { msgid: "No matching files", msgstr: ["Tidak ada berkas yang cocok"] }, Recent: { msgid: "Recent", msgstr: ["Terkini"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Pilih semua entri"] }, "Select entry": { msgid: "Select entry", msgstr: ["Pilih entri"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Pilih baris untuk {nodename}"] }, Size: { msgid: "Size", msgstr: ["Ukuran"] }, Undo: { msgid: "Undo", msgstr: ["Tidak jadi"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Unggah beberapa konten atau sinkronkan dengan perangkat Anda!"] } } } } }, { locale: "ig", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Igbo (https://app.transifex.com/nextcloud/teams/64236/ig/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ig", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Igbo (https://app.transifex.com/nextcloud/teams/64236/ig/)
Content-Type: text/plain; charset=UTF-8
Language: ig
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "is", json: { charset: "utf-8", headers: { "Last-Translator": "Sveinn í Felli <sv1@fellsnet.is>, 2023", "Language-Team": "Icelandic (https://app.transifex.com/nextcloud/teams/64236/is/)", "Content-Type": "text/plain; charset=UTF-8", Language: "is", "Plural-Forms": "nplurals=2; plural=(n % 10 != 1 || n % 100 == 11);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Sveinn í Felli <sv1@fellsnet.is>, 2023
` }, msgstr: [`Last-Translator: Sveinn í Felli <sv1@fellsnet.is>, 2023
Language-Team: Icelandic (https://app.transifex.com/nextcloud/teams/64236/is/)
Content-Type: text/plain; charset=UTF-8
Language: is
Plural-Forms: nplurals=2; plural=(n % 10 != 1 || n % 100 == 11);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" er ógilt möppuheiti.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" er ekki leyfilegt möppuheiti'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" er er ekki leyfilegt innan í skráarheiti.'] }, "All files": { msgid: "All files", msgstr: ["Allar skrár"] }, Choose: { msgid: "Choose", msgstr: ["Veldu"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Veldu {file}"] }, Copy: { msgid: "Copy", msgstr: ["Afrita"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Afrita í {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Get ekki búið til nýju möppuna"] }, "Create directory": { msgid: "Create directory", msgstr: ["Búa til möppu"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Núverandi val sýnar"] }, Favorites: { msgid: "Favorites", msgstr: ["Eftirlæti"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Skrár og möppur sem þú merkir sem eftirlæti birtast hér."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Skrár og möppur sem þú breyttir nýlega birtast hér."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Sía skráalista"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Möppuheiti má ekki vera tómt."] }, Home: { msgid: "Home", msgstr: ["Heim"] }, Modified: { msgid: "Modified", msgstr: ["Breytt"] }, Move: { msgid: "Move", msgstr: ["Færa"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Færa í {target}"] }, Name: { msgid: "Name", msgstr: ["Heiti"] }, New: { msgid: "New", msgstr: ["Nýtt"] }, "New folder": { msgid: "New folder", msgstr: ["Ný mappa"] }, "New folder name": { msgid: "New folder name", msgstr: ["Heiti nýrrar möppu"] }, "No files in here": { msgid: "No files in here", msgstr: ["Engar skrár hér"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Engar skrár fundust sem passa við síuna."] }, "No matching files": { msgid: "No matching files", msgstr: ["Engar samsvarandi skrár"] }, Recent: { msgid: "Recent", msgstr: ["Nýlegt"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Velja allar færslur"] }, "Select entry": { msgid: "Select entry", msgstr: ["Velja færslu"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Veldu röðina fyrir {nodename}"] }, Size: { msgid: "Size", msgstr: ["Stærð"] }, Undo: { msgid: "Undo", msgstr: ["Afturkalla"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Sendu inn eitthvað efni eða samstilltu við tækin þín!"] } } } } }, { locale: "it", json: { charset: "utf-8", headers: { "Last-Translator": "Raffaele Silano <raffaelone@gmail.com>, 2024", "Language-Team": "Italian (https://app.transifex.com/nextcloud/teams/64236/it/)", "Content-Type": "text/plain; charset=UTF-8", Language: "it", "Plural-Forms": "nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Claudio Scandella, 2023
Raffaele Silano <raffaelone@gmail.com>, 2024
` }, msgstr: [`Last-Translator: Raffaele Silano <raffaelone@gmail.com>, 2024
Language-Team: Italian (https://app.transifex.com/nextcloud/teams/64236/it/)
Content-Type: text/plain; charset=UTF-8
Language: it
Plural-Forms: nplurals=3; plural=n == 1 ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" non è un nome di cartella valido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}"  non è un nome di cartella ammesso'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: [`"/" non è ammesso all'interno del nome di una cartella.`] }, "All files": { msgid: "All files", msgstr: ["Tutti i file"] }, Choose: { msgid: "Choose", msgstr: ["Scegli"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Scegli {file}"] }, Copy: { msgid: "Copy", msgstr: ["Copia"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copia in {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Impossibile creare la nuova cartella"] }, "Create directory": { msgid: "Create directory", msgstr: ["Crea directory"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selettore della vista corrente"] }, Favorites: { msgid: "Favorites", msgstr: ["Preferiti"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["I file e le cartelle contrassegnate come preferite saranno mostrate qui."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["I file e le cartelle che hai modificato di recente saranno mostrate qui."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtra elenco file"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Il nome della cartella non può essere vuoto."] }, Home: { msgid: "Home", msgstr: ["Home"] }, Modified: { msgid: "Modified", msgstr: ["Modificato"] }, Move: { msgid: "Move", msgstr: ["Sposta"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Sposta in {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, New: { msgid: "New", msgstr: ["Nuovo"] }, "New folder": { msgid: "New folder", msgstr: ["Nuova cartella"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nuovo nome cartella"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nessun file qui"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nessun file che corrisponde al tuo filtro è stato trovato."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nessun file corrispondente"] }, Recent: { msgid: "Recent", msgstr: ["Recente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Scegli tutte le voci"] }, "Select entry": { msgid: "Select entry", msgstr: ["Seleziona la voce"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Seleziona la riga per {nodename}"] }, Size: { msgid: "Size", msgstr: ["Taglia/dimensioni"] }, Undo: { msgid: "Undo", msgstr: ["Annulla"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Carica qualche contenuto o sincronizza con i tuoi dispositivi!"] } } } } }, { locale: "ja_JP", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Japanese (Japan) (https://app.transifex.com/nextcloud/teams/64236/ja_JP/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ja_JP", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Japanese (Japan) (https://app.transifex.com/nextcloud/teams/64236/ja_JP/)
Content-Type: text/plain; charset=UTF-8
Language: ja_JP
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["元に戻す"] } } } } }, { locale: "ka", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Georgian (https://app.transifex.com/nextcloud/teams/64236/ka/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ka", "Plural-Forms": "nplurals=2; plural=(n!=1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Georgian (https://app.transifex.com/nextcloud/teams/64236/ka/)
Content-Type: text/plain; charset=UTF-8
Language: ka
Plural-Forms: nplurals=2; plural=(n!=1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ka_GE", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Georgian (Georgia) (https://app.transifex.com/nextcloud/teams/64236/ka_GE/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ka_GE", "Plural-Forms": "nplurals=2; plural=(n!=1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Georgian (Georgia) (https://app.transifex.com/nextcloud/teams/64236/ka_GE/)
Content-Type: text/plain; charset=UTF-8
Language: ka_GE
Plural-Forms: nplurals=2; plural=(n!=1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "kab", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Kabyle (https://app.transifex.com/nextcloud/teams/64236/kab/)", "Content-Type": "text/plain; charset=UTF-8", Language: "kab", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Kabyle (https://app.transifex.com/nextcloud/teams/64236/kab/)
Content-Type: text/plain; charset=UTF-8
Language: kab
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Sefsex"] } } } } }, { locale: "kk", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Kazakh (https://app.transifex.com/nextcloud/teams/64236/kk/)", "Content-Type": "text/plain; charset=UTF-8", Language: "kk", "Plural-Forms": "nplurals=2; plural=(n!=1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Kazakh (https://app.transifex.com/nextcloud/teams/64236/kk/)
Content-Type: text/plain; charset=UTF-8
Language: kk
Plural-Forms: nplurals=2; plural=(n!=1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "km", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Khmer (https://app.transifex.com/nextcloud/teams/64236/km/)", "Content-Type": "text/plain; charset=UTF-8", Language: "km", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Khmer (https://app.transifex.com/nextcloud/teams/64236/km/)
Content-Type: text/plain; charset=UTF-8
Language: km
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "kn", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Kannada (https://app.transifex.com/nextcloud/teams/64236/kn/)", "Content-Type": "text/plain; charset=UTF-8", Language: "kn", "Plural-Forms": "nplurals=2; plural=(n > 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Kannada (https://app.transifex.com/nextcloud/teams/64236/kn/)
Content-Type: text/plain; charset=UTF-8
Language: kn
Plural-Forms: nplurals=2; plural=(n > 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ko", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Korean (https://app.transifex.com/nextcloud/teams/64236/ko/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ko", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Korean (https://app.transifex.com/nextcloud/teams/64236/ko/)
Content-Type: text/plain; charset=UTF-8
Language: ko
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["되돌리기"] } } } } }, { locale: "la", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Latin (https://app.transifex.com/nextcloud/teams/64236/la/)", "Content-Type": "text/plain; charset=UTF-8", Language: "la", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Latin (https://app.transifex.com/nextcloud/teams/64236/la/)
Content-Type: text/plain; charset=UTF-8
Language: la
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "lb", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Luxembourgish (https://app.transifex.com/nextcloud/teams/64236/lb/)", "Content-Type": "text/plain; charset=UTF-8", Language: "lb", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Luxembourgish (https://app.transifex.com/nextcloud/teams/64236/lb/)
Content-Type: text/plain; charset=UTF-8
Language: lb
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "lo", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Lao (https://app.transifex.com/nextcloud/teams/64236/lo/)", "Content-Type": "text/plain; charset=UTF-8", Language: "lo", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Lao (https://app.transifex.com/nextcloud/teams/64236/lo/)
Content-Type: text/plain; charset=UTF-8
Language: lo
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "lt_LT", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Lithuanian (Lithuania) (https://app.transifex.com/nextcloud/teams/64236/lt_LT/)", "Content-Type": "text/plain; charset=UTF-8", Language: "lt_LT", "Plural-Forms": "nplurals=4; plural=(n % 10 == 1 && (n % 100 > 19 || n % 100 < 11) ? 0 : (n % 10 >= 2 && n % 10 <=9) && (n % 100 > 19 || n % 100 < 11) ? 1 : n % 1 != 0 ? 2: 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Lithuanian (Lithuania) (https://app.transifex.com/nextcloud/teams/64236/lt_LT/)
Content-Type: text/plain; charset=UTF-8
Language: lt_LT
Plural-Forms: nplurals=4; plural=(n % 10 == 1 && (n % 100 > 19 || n % 100 < 11) ? 0 : (n % 10 >= 2 && n % 10 <=9) && (n % 100 > 19 || n % 100 < 11) ? 1 : n % 1 != 0 ? 2: 3);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Atšaukti"] } } } } }, { locale: "lv", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Latvian (https://app.transifex.com/nextcloud/teams/64236/lv/)", "Content-Type": "text/plain; charset=UTF-8", Language: "lv", "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Latvian (https://app.transifex.com/nextcloud/teams/64236/lv/)
Content-Type: text/plain; charset=UTF-8
Language: lv
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "mk", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Macedonian (https://app.transifex.com/nextcloud/teams/64236/mk/)", "Content-Type": "text/plain; charset=UTF-8", Language: "mk", "Plural-Forms": "nplurals=2; plural=(n % 10 == 1 && n % 100 != 11) ? 0 : 1;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Macedonian (https://app.transifex.com/nextcloud/teams/64236/mk/)
Content-Type: text/plain; charset=UTF-8
Language: mk
Plural-Forms: nplurals=2; plural=(n % 10 == 1 && n % 100 != 11) ? 0 : 1;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Врати"] } } } } }, { locale: "mn", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Mongolian (https://app.transifex.com/nextcloud/teams/64236/mn/)", "Content-Type": "text/plain; charset=UTF-8", Language: "mn", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Mongolian (https://app.transifex.com/nextcloud/teams/64236/mn/)
Content-Type: text/plain; charset=UTF-8
Language: mn
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Буцаах"] } } } } }, { locale: "mr", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Marathi (https://app.transifex.com/nextcloud/teams/64236/mr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "mr", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Marathi (https://app.transifex.com/nextcloud/teams/64236/mr/)
Content-Type: text/plain; charset=UTF-8
Language: mr
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["पूर्ववत करा"] } } } } }, { locale: "ms_MY", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Malay (Malaysia) (https://app.transifex.com/nextcloud/teams/64236/ms_MY/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ms_MY", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Malay (Malaysia) (https://app.transifex.com/nextcloud/teams/64236/ms_MY/)
Content-Type: text/plain; charset=UTF-8
Language: ms_MY
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "my", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Burmese (https://app.transifex.com/nextcloud/teams/64236/my/)", "Content-Type": "text/plain; charset=UTF-8", Language: "my", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Burmese (https://app.transifex.com/nextcloud/teams/64236/my/)
Content-Type: text/plain; charset=UTF-8
Language: my
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["နဂိုအတိုင်းပြန်ထားရန်"] } } } } }, { locale: "nb_NO", json: { charset: "utf-8", headers: { "Last-Translator": "Syvert Fossdal, 2024", "Language-Team": "Norwegian Bokmål (Norway) (https://app.transifex.com/nextcloud/teams/64236/nb_NO/)", "Content-Type": "text/plain; charset=UTF-8", Language: "nb_NO", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
D PE, 2023
Syvert Fossdal, 2024
` }, msgstr: [`Last-Translator: Syvert Fossdal, 2024
Language-Team: Norwegian Bokmål (Norway) (https://app.transifex.com/nextcloud/teams/64236/nb_NO/)
Content-Type: text/plain; charset=UTF-8
Language: nb_NO
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" er et ugyldig mappenavn.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" er ikke et tillatt mappenavn.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" er ikke tillatt inne i et mappenavn.'] }, "All files": { msgid: "All files", msgstr: ["Alle filer"] }, Choose: { msgid: "Choose", msgstr: ["Velg"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Velg {fil}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Velg %n fil", "Velg %n filer"] }, Copy: { msgid: "Copy", msgstr: ["Kopier"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopier til {destinasjon}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Kunne ikke opprette den nye mappen"] }, "Create directory": { msgid: "Create directory", msgstr: ["Opprett mappe"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Nåværende visningsvelger"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritter"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Filer og mapper du markerer som favoritter vil vises her."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Filer og mapper du nylig har endret, vil vises her."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrer filliste"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Mappenavn kan ikke være tomt."] }, Home: { msgid: "Home", msgstr: ["Hjem"] }, Modified: { msgid: "Modified", msgstr: ["Modifisert"] }, Move: { msgid: "Move", msgstr: ["Flytt"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Flytt til {destinasjon}"] }, Name: { msgid: "Name", msgstr: ["Navn"] }, New: { msgid: "New", msgstr: ["Ny"] }, "New folder": { msgid: "New folder", msgstr: ["Ny mappe"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nytt mappenavn"] }, "No files in here": { msgid: "No files in here", msgstr: ["Ingen filer her"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Ingen filer funnet med ditt filter."] }, "No matching files": { msgid: "No matching files", msgstr: ["Ingen treffende filer"] }, Recent: { msgid: "Recent", msgstr: ["Nylig"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Velg alle oppføringer"] }, "Select entry": { msgid: "Select entry", msgstr: ["Velg oppføring"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Velg raden for {nodenavn}"] }, Size: { msgid: "Size", msgstr: ["Størrelse"] }, Undo: { msgid: "Undo", msgstr: ["Angre"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Last opp innhold eller synkroniser med enhetene dine!"] } } } } }, { locale: "ne", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Nepali (https://app.transifex.com/nextcloud/teams/64236/ne/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ne", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Nepali (https://app.transifex.com/nextcloud/teams/64236/ne/)
Content-Type: text/plain; charset=UTF-8
Language: ne
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "nl", json: { charset: "utf-8", headers: { "Last-Translator": "Jeroen Gui, 2023", "Language-Team": "Dutch (https://app.transifex.com/nextcloud/teams/64236/nl/)", "Content-Type": "text/plain; charset=UTF-8", Language: "nl", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Joost <joho500@hotmail.com>, 2023
Jeroen Gui, 2023
` }, msgstr: [`Last-Translator: Jeroen Gui, 2023
Language-Team: Dutch (https://app.transifex.com/nextcloud/teams/64236/nl/)
Content-Type: text/plain; charset=UTF-8
Language: nl
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" is een ongeldige mapnaam.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" is geen toegestane mapnaam'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" is niet toegestaan binnen een bestandsnaam'] }, "All files": { msgid: "All files", msgstr: ["Alle bestanden"] }, Choose: { msgid: "Choose", msgstr: ["Kies"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Kies {file}"] }, Copy: { msgid: "Copy", msgstr: ["Kopieer"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopieer naar {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Kon de nieuwe map niet maken"] }, "Create directory": { msgid: "Create directory", msgstr: ["Maak map"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Huidige weergave keuze"] }, Favorites: { msgid: "Favorites", msgstr: ["Favorieten"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Bestanden en mappen die je favoriet maakt, worden hier getoond."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Bestanden en mappen die je recent hebt gewijzigd, worden hier getoond."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filter bestandslijst"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Mapnaam mag niet leeg zijn."] }, Home: { msgid: "Home", msgstr: ["Home"] }, Modified: { msgid: "Modified", msgstr: ["Gewijzigd"] }, Move: { msgid: "Move", msgstr: ["Verplaatsen"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Verplaats naar {target}"] }, Name: { msgid: "Name", msgstr: ["Naam"] }, New: { msgid: "New", msgstr: ["Nieuw"] }, "New folder": { msgid: "New folder", msgstr: ["Nieuwe map"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nieuwe mapnaam"] }, "No files in here": { msgid: "No files in here", msgstr: ["Geen bestanden hier"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Geen bestanden gevonden die voldoen aan je filter."] }, "No matching files": { msgid: "No matching files", msgstr: ["Geen gevonden bestanden"] }, Recent: { msgid: "Recent", msgstr: ["Recent"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Selecteer alle invoer"] }, "Select entry": { msgid: "Select entry", msgstr: ["Selecteer invoer"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Selecteer de rij voor {nodename}"] }, Size: { msgid: "Size", msgstr: ["Grootte"] }, Undo: { msgid: "Undo", msgstr: ["Ongedaan maken"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Upload inhoud of synchroniseer met je apparaten!"] } } } } }, { locale: "nn_NO", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Norwegian Nynorsk (Norway) (https://app.transifex.com/nextcloud/teams/64236/nn_NO/)", "Content-Type": "text/plain; charset=UTF-8", Language: "nn_NO", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Norwegian Nynorsk (Norway) (https://app.transifex.com/nextcloud/teams/64236/nn_NO/)
Content-Type: text/plain; charset=UTF-8
Language: nn_NO
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "oc", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Occitan (post 1500) (https://app.transifex.com/nextcloud/teams/64236/oc/)", "Content-Type": "text/plain; charset=UTF-8", Language: "oc", "Plural-Forms": "nplurals=2; plural=(n > 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Occitan (post 1500) (https://app.transifex.com/nextcloud/teams/64236/oc/)
Content-Type: text/plain; charset=UTF-8
Language: oc
Plural-Forms: nplurals=2; plural=(n > 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Anullar"] } } } } }, { locale: "pl", json: { charset: "utf-8", headers: { "Last-Translator": "Valdnet, 2024", "Language-Team": "Polish (https://app.transifex.com/nextcloud/teams/64236/pl/)", "Content-Type": "text/plain; charset=UTF-8", Language: "pl", "Plural-Forms": "nplurals=4; plural=(n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
JUJER wtf, 2023
M H <haincu@o2.pl>, 2023
Valdnet, 2024
` }, msgstr: [`Last-Translator: Valdnet, 2024
Language-Team: Polish (https://app.transifex.com/nextcloud/teams/64236/pl/)
Content-Type: text/plain; charset=UTF-8
Language: pl
Plural-Forms: nplurals=4; plural=(n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" jest nieprawidłową nazwą folderu'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" nie jest dozwoloną nazwą folderu'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['Znak "/" nie jest dozwolony w nazwie folderu'] }, "All files": { msgid: "All files", msgstr: ["Wszystkie pliki"] }, Choose: { msgid: "Choose", msgstr: ["Wybierz"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Wybierz {file}"] }, Copy: { msgid: "Copy", msgstr: ["Kopiuj"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Skopiuj do {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nie można utworzyć nowego folderu"] }, "Create directory": { msgid: "Create directory", msgstr: ["Utwórz katalog"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Bieżący selektor widoku"] }, Favorites: { msgid: "Favorites", msgstr: ["Ulubione"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Pliki i foldery które oznaczysz jako ulubione będą wyświetlały się tutaj"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Pliki i foldery które ostatnio modyfikowałeś będą wyświetlały się tutaj"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtruj listę plików"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Nazwa folderu nie może być pusta"] }, Home: { msgid: "Home", msgstr: ["Strona główna"] }, Modified: { msgid: "Modified", msgstr: ["Zmodyfikowano"] }, Move: { msgid: "Move", msgstr: ["Przenieś"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Przejdź do {target}"] }, Name: { msgid: "Name", msgstr: ["Nazwa"] }, New: { msgid: "New", msgstr: ["Nowy"] }, "New folder": { msgid: "New folder", msgstr: ["Nowy folder"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nowa nazwa folderu"] }, "No files in here": { msgid: "No files in here", msgstr: ["Brak plików"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nie znaleziono plików spełniających warunki filtru"] }, "No matching files": { msgid: "No matching files", msgstr: ["Brak pasujących plików"] }, Recent: { msgid: "Recent", msgstr: ["Ostatni"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Wybierz wszystkie wpisy"] }, "Select entry": { msgid: "Select entry", msgstr: ["Wybierz wpis"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Wybierz wiersz dla {nodename}"] }, Size: { msgid: "Size", msgstr: ["Rozmiar"] }, Undo: { msgid: "Undo", msgstr: ["Cofnij"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Wyślij zawartość lub zsynchronizuj ze swoimi urządzeniami!"] } } } } }, { locale: "ps", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Pashto (https://app.transifex.com/nextcloud/teams/64236/ps/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ps", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Pashto (https://app.transifex.com/nextcloud/teams/64236/ps/)
Content-Type: text/plain; charset=UTF-8
Language: ps
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "pt_BR", json: { charset: "utf-8", headers: { "Last-Translator": "Flávio Veras <flaviove@gmail.com>, 2023", "Language-Team": "Portuguese (Brazil) (https://app.transifex.com/nextcloud/teams/64236/pt_BR/)", "Content-Type": "text/plain; charset=UTF-8", Language: "pt_BR", "Plural-Forms": "nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Flávio Veras <flaviove@gmail.com>, 2023
` }, msgstr: [`Last-Translator: Flávio Veras <flaviove@gmail.com>, 2023
Language-Team: Portuguese (Brazil) (https://app.transifex.com/nextcloud/teams/64236/pt_BR/)
Content-Type: text/plain; charset=UTF-8
Language: pt_BR
Plural-Forms: nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" é um nome de pasta inválido.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" não é um nome de pasta permitido'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" não é permitido dentro de um nome de pasta.'] }, "All files": { msgid: "All files", msgstr: ["Todos os arquivos"] }, Choose: { msgid: "Choose", msgstr: ["Escolher"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Escolher arquivo}"] }, Copy: { msgid: "Copy", msgstr: ["Copiar"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiar para {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Não foi possível criar a nova pasta"] }, "Create directory": { msgid: "Create directory", msgstr: ["Criar diretório"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Seletor de visualização atual"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoritos"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Os arquivos e pastas marcados como favoritos aparecerão aqui."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Arquivos e pastas que você modificou recentemente aparecerão aqui."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrar lista de arquivos"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["O nome da pasta não pode ficar vazio."] }, Home: { msgid: "Home", msgstr: ["Home"] }, Modified: { msgid: "Modified", msgstr: ["Modificado"] }, Move: { msgid: "Move", msgstr: ["Mover"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mover para {target}"] }, Name: { msgid: "Name", msgstr: ["Nome"] }, New: { msgid: "New", msgstr: ["Novo"] }, "New folder": { msgid: "New folder", msgstr: ["Nova pasta"] }, "New folder name": { msgid: "New folder name", msgstr: ["Novo nome de pasta"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nenhum arquivo aqui"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nenhum arquivo correspondente ao seu filtro foi encontrado."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nenhum arquivo correspondente"] }, Recent: { msgid: "Recent", msgstr: ["Recente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Selecione todas as entradas"] }, "Select entry": { msgid: "Select entry", msgstr: ["Selecione a entrada"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Selecione a linha para {nodename}"] }, Size: { msgid: "Size", msgstr: ["Tamanho"] }, Undo: { msgid: "Undo", msgstr: ["Desfazer"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Carregue algum conteúdo ou sincronize com seus dispositivos!"] } } } } }, { locale: "pt_PT", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Portuguese (Portugal) (https://app.transifex.com/nextcloud/teams/64236/pt_PT/)", "Content-Type": "text/plain; charset=UTF-8", Language: "pt_PT", "Plural-Forms": "nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Portuguese (Portugal) (https://app.transifex.com/nextcloud/teams/64236/pt_PT/)
Content-Type: text/plain; charset=UTF-8
Language: pt_PT
Plural-Forms: nplurals=3; plural=(n == 0 || n == 1) ? 0 : n != 0 && n % 1000000 == 0 ? 1 : 2;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Anular"] } } } } }, { locale: "ro", json: { charset: "utf-8", headers: { "Last-Translator": "Daniel MD <dmihaidumitru@gmail.com>, 2023", "Language-Team": "Romanian (https://app.transifex.com/nextcloud/teams/64236/ro/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ro", "Plural-Forms": "nplurals=3; plural=(n==1?0:(((n%100>19)||((n%100==0)&&(n!=0)))?2:1));" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Daniel MD <dmihaidumitru@gmail.com>, 2023
` }, msgstr: [`Last-Translator: Daniel MD <dmihaidumitru@gmail.com>, 2023
Language-Team: Romanian (https://app.transifex.com/nextcloud/teams/64236/ro/)
Content-Type: text/plain; charset=UTF-8
Language: ro
Plural-Forms: nplurals=3; plural=(n==1?0:(((n%100>19)||((n%100==0)&&(n!=0)))?2:1));
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" este un nume de director invalid.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" nu este un nume de director permis'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" nu este permis în numele unui director.'] }, "All files": { msgid: "All files", msgstr: ["Toate fișierele"] }, Choose: { msgid: "Choose", msgstr: ["Alege"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Alege {file}"] }, Copy: { msgid: "Copy", msgstr: ["Copiază"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Copiază în {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nu s-a putut crea noul director"] }, "Create directory": { msgid: "Create directory", msgstr: ["Creează director"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Selectorul curent al vizualizării"] }, Favorites: { msgid: "Favorites", msgstr: ["Favorite"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Fișiere și directoare pe care le marcați ca favorite vor apărea aici."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Fișiere și directoare pe care le-ați modificat recent vor apărea aici."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrează lista de fișiere"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Numele de director nu poate fi necompletat."] }, Home: { msgid: "Home", msgstr: ["Acasă"] }, Modified: { msgid: "Modified", msgstr: ["Modificat"] }, Move: { msgid: "Move", msgstr: ["Mută"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Mută către {target}"] }, Name: { msgid: "Name", msgstr: ["Nume"] }, New: { msgid: "New", msgstr: ["Nou"] }, "New folder": { msgid: "New folder", msgstr: ["Director nou"] }, "New folder name": { msgid: "New folder name", msgstr: ["Numele noului director"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nu există fișiere"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nu există fișiere potrivite pentru filtrul selectat"] }, "No matching files": { msgid: "No matching files", msgstr: ["Nu există fișiere potrivite"] }, Recent: { msgid: "Recent", msgstr: ["Recente"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Selectează toate înregistrările"] }, "Select entry": { msgid: "Select entry", msgstr: ["Selectează înregistrarea"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Selectează rândul pentru {nodename}"] }, Size: { msgid: "Size", msgstr: ["Mărime"] }, Undo: { msgid: "Undo", msgstr: ["Anulează"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Încărcați conținut sau sincronizați cu dispozitivele dumneavoastră!"] } } } } }, { locale: "ru", json: { charset: "utf-8", headers: { "Last-Translator": "R4SAS, 2024", "Language-Team": "Russian (https://app.transifex.com/nextcloud/teams/64236/ru/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ru", "Plural-Forms": "nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Max Smith <sevinfolds@gmail.com>, 2023
ashed <craysy@gmail.com>, 2023
Alex <kekcuha@gmail.com>, 2024
R4SAS, 2024
` }, msgstr: [`Last-Translator: R4SAS, 2024
Language-Team: Russian (https://app.transifex.com/nextcloud/teams/64236/ru/)
Content-Type: text/plain; charset=UTF-8
Language: ru
Plural-Forms: nplurals=4; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["«{name}» — недопустимое имя папки."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["«{name}» не является разрешенным именем папки"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["Символ «/» не допускается внутри имени папки."] }, "All files": { msgid: "All files", msgstr: ["Все файлы"] }, Choose: { msgid: "Choose", msgstr: ["Выбрать"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Выбрать {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Выбрать %n файл", "Выбрать %n файла", "Выбрать %n файлов", "Выбрать %n файлов"] }, Copy: { msgid: "Copy", msgstr: ["Копировать"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Копировать в «{target}»"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Не удалось создать новую папку"] }, "Create directory": { msgid: "Create directory", msgstr: ["Создать папку"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Переключатель текущего вида"] }, Favorites: { msgid: "Favorites", msgstr: ["Избранное"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Здесь появятся файлы и папки, которые вы пометили как избранные."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Здесь будут отображаться файлы и папки, которые вы недавно изменили."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Фильтровать список файлов"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Имя папки не может быть пустым."] }, Home: { msgid: "Home", msgstr: ["Home"] }, Modified: { msgid: "Modified", msgstr: ["Модифицированный"] }, Move: { msgid: "Move", msgstr: ["Переместить"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Перейти к {target}"] }, Name: { msgid: "Name", msgstr: ["Имя"] }, New: { msgid: "New", msgstr: ["Новый"] }, "New folder": { msgid: "New folder", msgstr: ["Новая папка"] }, "New folder name": { msgid: "New folder name", msgstr: ["Новое имя папки"] }, "No files in here": { msgid: "No files in here", msgstr: ["Здесь нет файлов"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Файлы, соответствующие вашему фильтру, не найдены."] }, "No matching files": { msgid: "No matching files", msgstr: ["Нет подходящих файлов"] }, Recent: { msgid: "Recent", msgstr: ["Недавний"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Выбрать все записи"] }, "Select entry": { msgid: "Select entry", msgstr: ["Выберите запись"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Выберите строку для {nodename}"] }, Size: { msgid: "Size", msgstr: ["Размер"] }, Undo: { msgid: "Undo", msgstr: ["Отменить"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Загрузите контент или синхронизируйте его со своими устройствами!"] } } } } }, { locale: "sc", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Sardinian (https://app.transifex.com/nextcloud/teams/64236/sc/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sc", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Sardinian (https://app.transifex.com/nextcloud/teams/64236/sc/)
Content-Type: text/plain; charset=UTF-8
Language: sc
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "si", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Sinhala (https://app.transifex.com/nextcloud/teams/64236/si/)", "Content-Type": "text/plain; charset=UTF-8", Language: "si", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Sinhala (https://app.transifex.com/nextcloud/teams/64236/si/)
Content-Type: text/plain; charset=UTF-8
Language: si
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["පෙරසේ"] } } } } }, { locale: "sk_SK", json: { charset: "utf-8", headers: { "Last-Translator": "Tomas Rusnak <linkermail@gmail.com>, 2024", "Language-Team": "Slovak (Slovakia) (https://app.transifex.com/nextcloud/teams/64236/sk_SK/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sk_SK", "Plural-Forms": "nplurals=4; plural=(n % 1 == 0 && n == 1 ? 0 : n % 1 == 0 && n >= 2 && n <= 4 ? 1 : n % 1 != 0 ? 2: 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Stanislav Prekop <prekop3@gmail.com>, 2024
Tomas Rusnak <linkermail@gmail.com>, 2024
` }, msgstr: [`Last-Translator: Tomas Rusnak <linkermail@gmail.com>, 2024
Language-Team: Slovak (Slovakia) (https://app.transifex.com/nextcloud/teams/64236/sk_SK/)
Content-Type: text/plain; charset=UTF-8
Language: sk_SK
Plural-Forms: nplurals=4; plural=(n % 1 == 0 && n == 1 ? 0 : n % 1 == 0 && n >= 2 && n <= 4 ? 1 : n % 1 != 0 ? 2: 3);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" je neplatný názov pričinka.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" nie je povolený názov priečinka.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" nie je povolené v názve priečinka.'] }, "All files": { msgid: "All files", msgstr: ["Všetky súbory"] }, Choose: { msgid: "Choose", msgstr: ["Vybrať"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Vybrať {súbor}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Vybraný %n súbor", "Vybrané %n súbory", "Vybraných %n súborov", "Vybraných %n súborov"] }, Copy: { msgid: "Copy", msgstr: ["Kopírovať"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopírovať do {umiestnenia}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Nepodarilo sa vytvoriť nový priečinok"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Nepodarilo sa načítať nastavenia súborov"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Nepodarilo sa načítať pohľady súborov"] }, "Create directory": { msgid: "Create directory", msgstr: ["Vytvoriť adresár"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Výber aktuálneho zobrazenia"] }, Favorites: { msgid: "Favorites", msgstr: ["Obľúbené"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Tu sa zobrazia súbory a priečinky, ktoré označíte ako obľúbené."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Tu sa zobrazia súbory a priečinky, ktoré ste nedávno upravili."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrovať zoznam súborov"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Názov priečinka nemôže byť prázdny."] }, Home: { msgid: "Home", msgstr: ["Domov"] }, Modified: { msgid: "Modified", msgstr: ["Upravené"] }, Move: { msgid: "Move", msgstr: ["Prejsť"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Prejsť na {umiestnenie}"] }, Name: { msgid: "Name", msgstr: ["Názov"] }, New: { msgid: "New", msgstr: ["Pridať"] }, "New folder": { msgid: "New folder", msgstr: ["Pridať priečinok"] }, "New folder name": { msgid: "New folder name", msgstr: ["Pridať názov priečinka"] }, "No files in here": { msgid: "No files in here", msgstr: ["Nie sú tu žiadne súbory"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nenašli sa žiadne súbory zodpovedajúce vášmu filtru."] }, "No matching files": { msgid: "No matching files", msgstr: ["Žiadne zodpovedajúce súbory"] }, Recent: { msgid: "Recent", msgstr: ["Nedávne"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Vybrať všetky položky"] }, "Select entry": { msgid: "Select entry", msgstr: ["Vybrať položku"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Vyberte riadok pre {názov uzla}"] }, Size: { msgid: "Size", msgstr: ["Veľkosť"] }, Undo: { msgid: "Undo", msgstr: ["Späť"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Nahrajte nejaký obsah alebo synchronizujte so svojimi zariadeniami!"] } } } } }, { locale: "sl", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Slovenian (https://app.transifex.com/nextcloud/teams/64236/sl/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sl", "Plural-Forms": "nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Slovenian (https://app.transifex.com/nextcloud/teams/64236/sl/)
Content-Type: text/plain; charset=UTF-8
Language: sl
Plural-Forms: nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Razveljavi"] } } } } }, { locale: "sq", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Albanian (https://app.transifex.com/nextcloud/teams/64236/sq/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sq", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Albanian (https://app.transifex.com/nextcloud/teams/64236/sq/)
Content-Type: text/plain; charset=UTF-8
Language: sq
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "sr", json: { charset: "utf-8", headers: { "Last-Translator": "Иван Пешић, 2024", "Language-Team": "Serbian (https://app.transifex.com/nextcloud/teams/64236/sr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sr", "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Иван Пешић, 2024
` }, msgstr: [`Last-Translator: Иван Пешић, 2024
Language-Team: Serbian (https://app.transifex.com/nextcloud/teams/64236/sr/)
Content-Type: text/plain; charset=UTF-8
Language: sr
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}” није исправно име фолдера."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}” није дозвољено име за фолдер."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["„/” није дозвољено унутар имена фолдера."] }, "All files": { msgid: "All files", msgstr: ["Сви фајлови"] }, Choose: { msgid: "Choose", msgstr: ["Изаберите"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Изаберите {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Изаберите %n фајл", "Изаберите %n фајла", "Изаберите %n фајлова"] }, Copy: { msgid: "Copy", msgstr: ["Копирај"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Копирај у {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Није могао да се креира нови фолдер"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Не могу да се учитају подешавања фајлова"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Не могу да се учитају прикази фајлова"] }, "Create directory": { msgid: "Create directory", msgstr: ["Креирај директоријум"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Бирач тренутног приказа"] }, Favorites: { msgid: "Favorites", msgstr: ["Омиљено"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Овде ће се појавити фајлови и фолдери које сте означили као омиљене."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Овде ће се појавити фајлови и фолдери који се се недавно изменили."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Фитрирање листе фајлова"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Име фолдера не може бити празно."] }, Home: { msgid: "Home", msgstr: ["Почетак"] }, Modified: { msgid: "Modified", msgstr: ["Измењено"] }, Move: { msgid: "Move", msgstr: ["Премести"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Премести у {target}"] }, Name: { msgid: "Name", msgstr: ["Име"] }, New: { msgid: "New", msgstr: ["Ново"] }, "New folder": { msgid: "New folder", msgstr: ["Нови фолдер"] }, "New folder name": { msgid: "New folder name", msgstr: ["Име новог фолдера"] }, "No files in here": { msgid: "No files in here", msgstr: ["Овде нема фајлова"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Није пронађен ниједан фајл који задовољава ваш филтер."] }, "No matching files": { msgid: "No matching files", msgstr: ["Нема таквих фајлова"] }, Recent: { msgid: "Recent", msgstr: ["Скорашње"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Изаберите све ставке"] }, "Select entry": { msgid: "Select entry", msgstr: ["Изаберите ставку"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Изаберите ред за {nodename}"] }, Size: { msgid: "Size", msgstr: ["Величина"] }, Undo: { msgid: "Undo", msgstr: ["Поништи"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Отпремите нешто или синхронизујте са својим уређајима!"] } } } } }, { locale: "sr@latin", json: { charset: "utf-8", headers: { "Last-Translator": "Bogdan Vuković, 2024", "Language-Team": "Serbian (Latin) (https://app.transifex.com/nextcloud/teams/64236/sr@latin/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sr@latin", "Plural-Forms": "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Bogdan Vuković, 2024
` }, msgstr: [`Last-Translator: Bogdan Vuković, 2024
Language-Team: Serbian (Latin) (https://app.transifex.com/nextcloud/teams/64236/sr@latin/)
Content-Type: text/plain; charset=UTF-8
Language: sr@latin
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["„{name}” je neispravan naziv foldera."] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["„{name}” je nedozvoljen naziv foldera."] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["„/” se ne može koristiti unutar naziva foldera."] }, "All files": { msgid: "All files", msgstr: ["Svi fajlovi"] }, Choose: { msgid: "Choose", msgstr: ["Izaberite"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Izaberite {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Izaberite %n fajl", "Izaberite %n fajla", "Izaberite %n fajlova"] }, Copy: { msgid: "Copy", msgstr: ["Kopiraj"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopiraj u {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Neuspešno kreiranje novog foldera"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Neuspešno učitavanje podešavanja fajlova"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Neuspešno učitavanje prikaza fajlova"] }, "Create directory": { msgid: "Create directory", msgstr: ["Kreiraj direktorijum"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Birač trenutnog prikaza"] }, Favorites: { msgid: "Favorites", msgstr: ["Omiljeno"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Lista omiljenih fajlova i foldera."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Lista fajlova i foldera sa skorašnjim izmenama."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Fitriranje liste fajlova"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Naziv foldera ne može biti prazan."] }, Home: { msgid: "Home", msgstr: ["Početak"] }, Modified: { msgid: "Modified", msgstr: ["Izmenjeno"] }, Move: { msgid: "Move", msgstr: ["Premesti"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Premesti u {target}"] }, Name: { msgid: "Name", msgstr: ["Naziv"] }, New: { msgid: "New", msgstr: ["Novo"] }, "New folder": { msgid: "New folder", msgstr: ["Novi folder"] }, "New folder name": { msgid: "New folder name", msgstr: ["Naziv novog foldera"] }, "No files in here": { msgid: "No files in here", msgstr: ["Bez fajlova"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Nema fajlova koji zadovoljavaju uslove filtera."] }, "No matching files": { msgid: "No matching files", msgstr: ["Nema takvih fajlova"] }, Recent: { msgid: "Recent", msgstr: ["Skorašnje"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Izaberite sve stavke"] }, "Select entry": { msgid: "Select entry", msgstr: ["Izaberite stavku"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Izaberite red za {nodename}"] }, Size: { msgid: "Size", msgstr: ["Veličina"] }, Undo: { msgid: "Undo", msgstr: ["Vrati"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Otpremite sadržaj ili sinhronizujte sa svojim uređajima!"] } } } } }, { locale: "sv", json: { charset: "utf-8", headers: { "Last-Translator": "Magnus Höglund, 2024", "Language-Team": "Swedish (https://app.transifex.com/nextcloud/teams/64236/sv/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sv", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Magnus Höglund, 2024
` }, msgstr: [`Last-Translator: Magnus Höglund, 2024
Language-Team: Swedish (https://app.transifex.com/nextcloud/teams/64236/sv/)
Content-Type: text/plain; charset=UTF-8
Language: sv
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" är ett ogiltigt mappnamn.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" är inte ett tillåtet mappnamn'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" är inte tillåtet i ett mappnamn.'] }, "All files": { msgid: "All files", msgstr: ["Alla filer"] }, Choose: { msgid: "Choose", msgstr: ["Välj"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Välj {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Välj %n fil", "Välj %n filer"] }, Copy: { msgid: "Copy", msgstr: ["Kopiera"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Kopiera till {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Kunde inte skapa den nya mappen"] }, "Could not load files settings": { msgid: "Could not load files settings", msgstr: ["Kunde inte ladda filinställningar"] }, "Could not load files views": { msgid: "Could not load files views", msgstr: ["Kunde inte ladda läsa in filvyer"] }, "Create directory": { msgid: "Create directory", msgstr: ["Skapa katalog"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Aktuell vyväljare"] }, Favorites: { msgid: "Favorites", msgstr: ["Favoriter"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Filer och mappar som du markerar som favorit kommer att visas här."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Filer och mappar som du nyligen ändrat kommer att visas här."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Filtrera fillistan"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Mappnamnet får inte vara tomt."] }, Home: { msgid: "Home", msgstr: ["Hem"] }, Modified: { msgid: "Modified", msgstr: ["Ändrad"] }, Move: { msgid: "Move", msgstr: ["Flytta"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Flytta till {target}"] }, Name: { msgid: "Name", msgstr: ["Namn"] }, New: { msgid: "New", msgstr: ["Ny"] }, "New folder": { msgid: "New folder", msgstr: ["Ny mapp"] }, "New folder name": { msgid: "New folder name", msgstr: ["Nytt mappnamn"] }, "No files in here": { msgid: "No files in here", msgstr: ["Inga filer här"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Inga filer som matchar ditt filter hittades."] }, "No matching files": { msgid: "No matching files", msgstr: ["Inga matchande filer"] }, Recent: { msgid: "Recent", msgstr: ["Nyligen"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Välj alla poster"] }, "Select entry": { msgid: "Select entry", msgstr: ["Välj post"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Välj raden för {nodename}"] }, Size: { msgid: "Size", msgstr: ["Storlek"] }, Undo: { msgid: "Undo", msgstr: ["Ångra"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Ladda upp lite innehåll eller synkronisera med dina enheter!"] } } } } }, { locale: "sw", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Swahili (https://app.transifex.com/nextcloud/teams/64236/sw/)", "Content-Type": "text/plain; charset=UTF-8", Language: "sw", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Swahili (https://app.transifex.com/nextcloud/teams/64236/sw/)
Content-Type: text/plain; charset=UTF-8
Language: sw
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "ta", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Tamil (https://app.transifex.com/nextcloud/teams/64236/ta/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ta", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Tamil (https://app.transifex.com/nextcloud/teams/64236/ta/)
Content-Type: text/plain; charset=UTF-8
Language: ta
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["செயல்தவிர்"] } } } } }, { locale: "th_TH", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Thai (Thailand) (https://app.transifex.com/nextcloud/teams/64236/th_TH/)", "Content-Type": "text/plain; charset=UTF-8", Language: "th_TH", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Thai (Thailand) (https://app.transifex.com/nextcloud/teams/64236/th_TH/)
Content-Type: text/plain; charset=UTF-8
Language: th_TH
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["เลิกทำ"] } } } } }, { locale: "tk", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Turkmen (https://app.transifex.com/nextcloud/teams/64236/tk/)", "Content-Type": "text/plain; charset=UTF-8", Language: "tk", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Turkmen (https://app.transifex.com/nextcloud/teams/64236/tk/)
Content-Type: text/plain; charset=UTF-8
Language: tk
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "tr", json: { charset: "utf-8", headers: { "Last-Translator": "Kaya Zeren <kayazeren@gmail.com>, 2024", "Language-Team": "Turkish (https://app.transifex.com/nextcloud/teams/64236/tr/)", "Content-Type": "text/plain; charset=UTF-8", Language: "tr", "Plural-Forms": "nplurals=2; plural=(n > 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Kaya Zeren <kayazeren@gmail.com>, 2024
` }, msgstr: [`Last-Translator: Kaya Zeren <kayazeren@gmail.com>, 2024
Language-Team: Turkish (https://app.transifex.com/nextcloud/teams/64236/tr/)
Content-Type: text/plain; charset=UTF-8
Language: tr
Plural-Forms: nplurals=2; plural=(n > 1);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" geçersiz bir klasör adı.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" izin verilen bir klasör adı değil'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" karakteri klasör adında kullanılamaz.'] }, "All files": { msgid: "All files", msgstr: ["Tüm dosyalar"] }, Choose: { msgid: "Choose", msgstr: ["Seçin"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["{file} seçin"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["%n dosya seçin", "%n dosya seçin"] }, Copy: { msgid: "Copy", msgstr: ["Kopyala"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["{target} üzerine kopyala"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Yeni klasör oluşturulamadı"] }, "Create directory": { msgid: "Create directory", msgstr: ["Klasör oluştur"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Geçerli görünüm seçici"] }, Favorites: { msgid: "Favorites", msgstr: ["Sık kullanılanlar"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Sık kullanılan olarak seçtiğiniz dosyalar burada görüntülenir."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Son zamanlarda değiştirdiğiniz dosya ve klasörler burada görüntülenir."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Dosya listesini süz"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Klasör adı boş olamaz."] }, Home: { msgid: "Home", msgstr: ["Giriş"] }, Modified: { msgid: "Modified", msgstr: ["Değiştirilme"] }, Move: { msgid: "Move", msgstr: ["Taşı"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["{target} üzerine taşı"] }, Name: { msgid: "Name", msgstr: ["Ad"] }, New: { msgid: "New", msgstr: ["Yeni"] }, "New folder": { msgid: "New folder", msgstr: ["Yeni klasör"] }, "New folder name": { msgid: "New folder name", msgstr: ["Yeni klasör adı"] }, "No files in here": { msgid: "No files in here", msgstr: ["Burada herhangi bir dosya yok"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Süzgece uyan bir dosya bulunamadı."] }, "No matching files": { msgid: "No matching files", msgstr: ["Eşleşen bir dosya yok"] }, Recent: { msgid: "Recent", msgstr: ["Son kullanılanlar"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Tüm kayıtları seç"] }, "Select entry": { msgid: "Select entry", msgstr: ["Kaydı seç"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["{nodename} satırını seçin"] }, Size: { msgid: "Size", msgstr: ["Boyut"] }, Undo: { msgid: "Undo", msgstr: ["Geri al"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Bazı içerikler yükleyin ya da aygıtlarınızla eşitleyin!"] } } } } }, { locale: "ug", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Uyghur (https://app.transifex.com/nextcloud/teams/64236/ug/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ug", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Uyghur (https://app.transifex.com/nextcloud/teams/64236/ug/)
Content-Type: text/plain; charset=UTF-8
Language: ug
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "uk", json: { charset: "utf-8", headers: { "Last-Translator": "O St <oleksiy.stasevych@gmail.com>, 2024", "Language-Team": "Ukrainian (https://app.transifex.com/nextcloud/teams/64236/uk/)", "Content-Type": "text/plain; charset=UTF-8", Language: "uk", "Plural-Forms": "nplurals=4; plural=(n % 1 == 0 && n % 10 == 1 && n % 100 != 11 ? 0 : n % 1 == 0 && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : n % 1 == 0 && (n % 10 ==0 || (n % 10 >=5 && n % 10 <=9) || (n % 100 >=11 && n % 100 <=14 )) ? 2: 3);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
O St <oleksiy.stasevych@gmail.com>, 2024
` }, msgstr: [`Last-Translator: O St <oleksiy.stasevych@gmail.com>, 2024
Language-Team: Ukrainian (https://app.transifex.com/nextcloud/teams/64236/uk/)
Content-Type: text/plain; charset=UTF-8
Language: uk
Plural-Forms: nplurals=4; plural=(n % 1 == 0 && n % 10 == 1 && n % 100 != 11 ? 0 : n % 1 == 0 && n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : n % 1 == 0 && (n % 10 ==0 || (n % 10 >=5 && n % 10 <=9) || (n % 100 >=11 && n % 100 <=14 )) ? 2: 3);
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ['"{name}" є недійсною назвою для каталогу.'] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ['"{name}" не є дозволеною назвою для каталогу.'] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ['"/" не дозволено у назві каталогу.'] }, "All files": { msgid: "All files", msgstr: ["Всі файли"] }, Choose: { msgid: "Choose", msgstr: ["Вибрати"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["Вибрати {file}"] }, "Choose %n file": { msgid: "Choose %n file", msgid_plural: "Choose %n files", msgstr: ["Вибрати %n файл", "Вибрати %n файли", "Вибрати %n файлів", "Вибрати %n файлів"] }, Copy: { msgid: "Copy", msgstr: ["Копіювати"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["Копіювати до {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["Не вдалося створити новий каталог"] }, "Create directory": { msgid: "Create directory", msgstr: ["Створити каталог"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["Вибір подання"] }, Favorites: { msgid: "Favorites", msgstr: ["Із зірочкою"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["Тут показуватимуться файли та каталоги, які ви позначите зірочкою."] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["Тут показуватимуться файли та каталоги, які було нещодавно змінено."] }, "Filter file list": { msgid: "Filter file list", msgstr: ["Фільтрувати список файлів"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["Ім'я каталогу не може бути порожнім."] }, Home: { msgid: "Home", msgstr: ["Домівка"] }, Modified: { msgid: "Modified", msgstr: ["Змінено"] }, Move: { msgid: "Move", msgstr: ["Перемістити"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["Перемістити до {target}"] }, Name: { msgid: "Name", msgstr: ["Ім'я"] }, New: { msgid: "New", msgstr: ["Новий"] }, "New folder": { msgid: "New folder", msgstr: ["Новий каталог"] }, "New folder name": { msgid: "New folder name", msgstr: ["Ім'я нового каталогу"] }, "No files in here": { msgid: "No files in here", msgstr: ["Тут відсутні файли"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["Відсутні збіги за фільтром."] }, "No matching files": { msgid: "No matching files", msgstr: ["Відсутні збіги файлів."] }, Recent: { msgid: "Recent", msgstr: ["Останні"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["Вибрати всі записи"] }, "Select entry": { msgid: "Select entry", msgstr: ["Вибрати запис"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["Вибрати рядок для {nodename}"] }, Size: { msgid: "Size", msgstr: ["Розмір"] }, Undo: { msgid: "Undo", msgstr: ["Повернути"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["Завантажте вміст або синхронізуйте з вашим пристроєм!"] } } } } }, { locale: "ur_PK", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Urdu (Pakistan) (https://app.transifex.com/nextcloud/teams/64236/ur_PK/)", "Content-Type": "text/plain; charset=UTF-8", Language: "ur_PK", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Urdu (Pakistan) (https://app.transifex.com/nextcloud/teams/64236/ur_PK/)
Content-Type: text/plain; charset=UTF-8
Language: ur_PK
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "uz", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Uzbek (https://app.transifex.com/nextcloud/teams/64236/uz/)", "Content-Type": "text/plain; charset=UTF-8", Language: "uz", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Uzbek (https://app.transifex.com/nextcloud/teams/64236/uz/)
Content-Type: text/plain; charset=UTF-8
Language: uz
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }, { locale: "vi", json: { charset: "utf-8", headers: { "Last-Translator": "Joas Schilling, 2023", "Language-Team": "Vietnamese (https://app.transifex.com/nextcloud/teams/64236/vi/)", "Content-Type": "text/plain; charset=UTF-8", Language: "vi", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Joas Schilling, 2023
` }, msgstr: [`Last-Translator: Joas Schilling, 2023
Language-Team: Vietnamese (https://app.transifex.com/nextcloud/teams/64236/vi/)
Content-Type: text/plain; charset=UTF-8
Language: vi
Plural-Forms: nplurals=1; plural=0;
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: ["Hoàn tác"] } } } } }, { locale: "zh_CN", json: { charset: "utf-8", headers: { "Last-Translator": "Eric, 2023", "Language-Team": "Chinese (China) (https://app.transifex.com/nextcloud/teams/64236/zh_CN/)", "Content-Type": "text/plain; charset=UTF-8", Language: "zh_CN", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
ken, 2023
Eric, 2023
` }, msgstr: [`Last-Translator: Eric, 2023
Language-Team: Chinese (China) (https://app.transifex.com/nextcloud/teams/64236/zh_CN/)
Content-Type: text/plain; charset=UTF-8
Language: zh_CN
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid folder name.': { msgid: '"{name}" is an invalid folder name.', msgstr: ["“{name}”是无效的文件夹名称。"] }, '"{name}" is not an allowed folder name': { msgid: '"{name}" is not an allowed folder name', msgstr: ["“{name}”不是允许的文件夹名称"] }, '"/" is not allowed inside a folder name.': { msgid: '"/" is not allowed inside a folder name.', msgstr: ["文件夹名称中不允许包含“/”。"] }, "All files": { msgid: "All files", msgstr: ["所有文件"] }, Choose: { msgid: "Choose", msgstr: ["选择"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["选择 {file}"] }, Copy: { msgid: "Copy", msgstr: ["复制"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["复制到 {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["无法创建新文件夹"] }, "Create directory": { msgid: "Create directory", msgstr: ["创建目录"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["当前视图选择器"] }, Favorites: { msgid: "Favorites", msgstr: ["最爱"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["您标记为最爱的文件与文件夹会显示在这里"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["您最近修改的文件与文件夹会显示在这里"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["过滤文件列表"] }, "Folder name cannot be empty.": { msgid: "Folder name cannot be empty.", msgstr: ["文件夹名称不能为空。"] }, Home: { msgid: "Home", msgstr: ["主目录"] }, Modified: { msgid: "Modified", msgstr: ["已修改"] }, Move: { msgid: "Move", msgstr: ["移动"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["移动至 {target}"] }, Name: { msgid: "Name", msgstr: ["名称"] }, New: { msgid: "New", msgstr: ["新"] }, "New folder": { msgid: "New folder", msgstr: ["新文件夹"] }, "New folder name": { msgid: "New folder name", msgstr: ["新文件夹名称"] }, "No files in here": { msgid: "No files in here", msgstr: ["此处无文件"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["找不到符合您过滤条件的文件"] }, "No matching files": { msgid: "No matching files", msgstr: ["无符合的文件"] }, Recent: { msgid: "Recent", msgstr: ["最近"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["选择所有条目"] }, "Select entry": { msgid: "Select entry", msgstr: ["选择条目"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["选择 {nodename} 的列"] }, Size: { msgid: "Size", msgstr: ["大小"] }, Undo: { msgid: "Undo", msgstr: [" 撤消"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["上传一些项目或与您的设备同步！"] } } } } }, { locale: "zh_HK", json: { charset: "utf-8", headers: { "Last-Translator": "Café Tango, 2023", "Language-Team": "Chinese (Hong Kong) (https://app.transifex.com/nextcloud/teams/64236/zh_HK/)", "Content-Type": "text/plain; charset=UTF-8", Language: "zh_HK", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
Café Tango, 2023
` }, msgstr: [`Last-Translator: Café Tango, 2023
Language-Team: Chinese (Hong Kong) (https://app.transifex.com/nextcloud/teams/64236/zh_HK/)
Content-Type: text/plain; charset=UTF-8
Language: zh_HK
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid file name.': { msgid: '"{name}" is an invalid file name.', msgstr: ["「{name}」是無效的檔案名稱。"] }, '"{name}" is not an allowed filetype': { msgid: '"{name}" is not an allowed filetype', msgstr: ["「{name}」並非允許的檔案類型"] }, '"/" is not allowed inside a file name.': { msgid: '"/" is not allowed inside a file name.', msgstr: ['檔案名稱中不允許使用 "/"。'] }, "All files": { msgid: "All files", msgstr: ["所有檔案"] }, Choose: { msgid: "Choose", msgstr: ["選擇"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["選擇 {file}"] }, Copy: { msgid: "Copy", msgstr: ["複製"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["複製到 {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["無法建立新資料夾"] }, "Create directory": { msgid: "Create directory", msgstr: ["建立目錄"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["目前檢視選取器"] }, Favorites: { msgid: "Favorites", msgstr: ["最愛"] }, "File name cannot be empty.": { msgid: "File name cannot be empty.", msgstr: ["檔案名稱不能為空。"] }, "Filepicker sections": { msgid: "Filepicker sections", msgstr: ["檔案挑選器部分"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["您標記為最愛的檔案與資料夾將會顯示在此處。"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["您最近修改的檔案與資料夾將會顯示在此處。"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["過濾檔案清單"] }, Home: { msgid: "Home", msgstr: ["首頁"] }, "MIME type {mime}": { msgid: "MIME type {mime}", msgstr: ["MIME 類型 {mime}"] }, Modified: { msgid: "Modified", msgstr: ["已修改"] }, Move: { msgid: "Move", msgstr: ["移動"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["移動至 {target}"] }, Name: { msgid: "Name", msgstr: ["名稱"] }, New: { msgid: "New", msgstr: ["新"] }, "New folder": { msgid: "New folder", msgstr: ["新資料夾"] }, "New folder name": { msgid: "New folder name", msgstr: ["新資料夾名稱"] }, "No files in here": { msgid: "No files in here", msgstr: ["此處無檔案"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["找不到符合您過濾條件的檔案。"] }, "No matching files": { msgid: "No matching files", msgstr: ["無符合的檔案"] }, Recent: { msgid: "Recent", msgstr: ["最近"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["選取所有條目"] }, "Select entry": { msgid: "Select entry", msgstr: ["選取條目"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["選取 {nodename} 的列"] }, Size: { msgid: "Size", msgstr: ["大小"] }, Undo: { msgid: "Undo", msgstr: ["還原"] }, unknown: { msgid: "unknown", msgstr: ["不詳"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["上傳一些內容或與您的裝置同步"] } } } } }, { locale: "zh_TW", json: { charset: "utf-8", headers: { "Last-Translator": "黃柏諺 <s8321414@gmail.com>, 2023", "Language-Team": "Chinese (Taiwan) (https://app.transifex.com/nextcloud/teams/64236/zh_TW/)", "Content-Type": "text/plain; charset=UTF-8", Language: "zh_TW", "Plural-Forms": "nplurals=1; plural=0;" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
John Molakvoæ <skjnldsv@protonmail.com>, 2023
黃柏諺 <s8321414@gmail.com>, 2023
` }, msgstr: [`Last-Translator: 黃柏諺 <s8321414@gmail.com>, 2023
Language-Team: Chinese (Taiwan) (https://app.transifex.com/nextcloud/teams/64236/zh_TW/)
Content-Type: text/plain; charset=UTF-8
Language: zh_TW
Plural-Forms: nplurals=1; plural=0;
`] }, '"{name}" is an invalid file name.': { msgid: '"{name}" is an invalid file name.', msgstr: ["「{name}」是無效的檔案名稱。"] }, '"{name}" is not an allowed filetype': { msgid: '"{name}" is not an allowed filetype', msgstr: ["「{name}」並非允許的檔案類型"] }, '"/" is not allowed inside a file name.': { msgid: '"/" is not allowed inside a file name.', msgstr: ["檔案名稱中不允許使用「/」。"] }, "All files": { msgid: "All files", msgstr: ["所有檔案"] }, Choose: { msgid: "Choose", msgstr: ["選擇"] }, "Choose {file}": { msgid: "Choose {file}", msgstr: ["選擇 {file}"] }, Copy: { msgid: "Copy", msgstr: ["複製"] }, "Copy to {target}": { msgid: "Copy to {target}", msgstr: ["複製到 {target}"] }, "Could not create the new folder": { msgid: "Could not create the new folder", msgstr: ["無法建立新資料夾"] }, "Create directory": { msgid: "Create directory", msgstr: ["建立目錄"] }, "Current view selector": { msgid: "Current view selector", msgstr: ["目前檢視選取器"] }, Favorites: { msgid: "Favorites", msgstr: ["最愛"] }, "File name cannot be empty.": { msgid: "File name cannot be empty.", msgstr: ["檔案名稱不能為空。"] }, "Filepicker sections": { msgid: "Filepicker sections", msgstr: ["檔案挑選器選取"] }, "Files and folders you mark as favorite will show up here.": { msgid: "Files and folders you mark as favorite will show up here.", msgstr: ["您標記為最愛的檔案與資料夾將會顯示在此處。"] }, "Files and folders you recently modified will show up here.": { msgid: "Files and folders you recently modified will show up here.", msgstr: ["您最近修改的檔案與資料夾將會顯示在此處。"] }, "Filter file list": { msgid: "Filter file list", msgstr: ["過濾檔案清單"] }, Home: { msgid: "Home", msgstr: ["家"] }, "Mime type {mime}": { msgid: "Mime type {mime}", msgstr: ["Mime type {mime}"] }, Modified: { msgid: "Modified", msgstr: ["已修改"] }, Move: { msgid: "Move", msgstr: ["移動"] }, "Move to {target}": { msgid: "Move to {target}", msgstr: ["移動至 {target}"] }, Name: { msgid: "Name", msgstr: ["名稱"] }, New: { msgid: "New", msgstr: ["新"] }, "New folder": { msgid: "New folder", msgstr: ["新資料夾"] }, "New folder name": { msgid: "New folder name", msgstr: ["新資料夾名稱"] }, "No files in here": { msgid: "No files in here", msgstr: ["此處無檔案"] }, "No files matching your filter were found.": { msgid: "No files matching your filter were found.", msgstr: ["找不到符合您過濾條件的檔案。"] }, "No matching files": { msgid: "No matching files", msgstr: ["無符合的檔案"] }, Recent: { msgid: "Recent", msgstr: ["最近"] }, "Select all entries": { msgid: "Select all entries", msgstr: ["選取所有條目"] }, "Select entry": { msgid: "Select entry", msgstr: ["選取條目"] }, "Select the row for {nodename}": { msgid: "Select the row for {nodename}", msgstr: ["選取 {nodename} 的列"] }, Size: { msgid: "Size", msgstr: ["大小"] }, Undo: { msgid: "Undo", msgstr: ["復原"] }, unknown: { msgid: "unknown", msgstr: ["未知"] }, "Upload some content or sync with your devices!": { msgid: "Upload some content or sync with your devices!", msgstr: ["上傳一些內容或與您的裝置同步"] } } } } }, { locale: "zu_ZA", json: { charset: "utf-8", headers: { "Last-Translator": "Transifex Bot <>, 2023", "Language-Team": "Zulu (South Africa) (https://app.transifex.com/nextcloud/teams/64236/zu_ZA/)", "Content-Type": "text/plain; charset=UTF-8", Language: "zu_ZA", "Plural-Forms": "nplurals=2; plural=(n != 1);" }, translations: { "": { "": { msgid: "", comments: { translator: `
Translators:
Transifex Bot <>, 2023
` }, msgstr: [`Last-Translator: Transifex Bot <>, 2023
Language-Team: Zulu (South Africa) (https://app.transifex.com/nextcloud/teams/64236/zu_ZA/)
Content-Type: text/plain; charset=UTF-8
Language: zu_ZA
Plural-Forms: nplurals=2; plural=(n != 1);
`] }, Undo: { msgid: "Undo", comments: { reference: "lib/toast.ts:223" }, msgstr: [""] } } } } }].map((e) => g.addTranslation(e.locale, e.json));
const i = g.build(), C = i.ngettext.bind(i), u = i.gettext.bind(i);
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
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
var p = /* @__PURE__ */ ((e) => (e.ERROR = "toast-error", e.WARNING = "toast-warning", e.INFO = "toast-info", e.SUCCESS = "toast-success", e.PERMANENT = "toast-error", e.UNDO = "toast-undo", e))(p || {});
const f = "off", h = "polite", T = "assertive";
var m = /* @__PURE__ */ ((e) => (e[e.OFF = f] = "OFF", e[e.POLITE = h] = "POLITE", e[e.ASSERTIVE = T] = "ASSERTIVE", e))(m || {});
const y = 1e4, w = 7e3, F = (/* unused pure expression or super */ null && (-1));
function l(e, s) {
  if (s = Object.assign({
    timeout: w,
    isHTML: !1,
    type: void 0,
    // An undefined selector defaults to the body element
    selector: void 0,
    onRemove: () => {
    },
    onClick: void 0,
    close: !0
  }, s), typeof e == "string" && !s.isHTML) {
    const o = document.createElement("div");
    o.innerHTML = e, e = o.innerText;
  }
  let n = s.type ?? "";
  typeof s.onClick == "function" && (n += " toast-with-click ");
  const r = e instanceof Node;
  let a = m.POLITE;
  s.ariaLive ? a = s.ariaLive : (s.type === "toast-error" || s.type === "toast-undo") && (a = m.ASSERTIVE);
  const t = toastify_js__WEBPACK_IMPORTED_MODULE_0__({
    [r ? "node" : "text"]: e,
    duration: s.timeout,
    callback: s.onRemove,
    onClick: s.onClick,
    close: s.close,
    gravity: "top",
    selector: s.selector,
    position: "right",
    backgroundColor: "",
    className: "dialogs " + n,
    escapeMarkup: !s.isHTML,
    ariaLive: a
  });
  return t.showToast(), t;
}
function L(e, s) {
  return l(e, {
    ...s,
    type: "toast-error"
    /* ERROR */
  });
}
function N(e, s) {
  return l(e, {
    ...s,
    type: "toast-warning"
    /* WARNING */
  });
}
function U(e, s) {
  return l(e, {
    ...s,
    type: "toast-info"
    /* INFO */
  });
}
function S(e, s) {
  return l(e, {
    ...s,
    type: "toast-success"
    /* SUCCESS */
  });
}
function k(e, s, n) {
  if (!(s instanceof Function))
    throw new Error("Please provide a valid onUndo method");
  let r;
  n = Object.assign(n || {}, {
    // force 10 seconds of timeout
    timeout: y,
    // remove close button
    close: !1
  });
  const a = document.createElement("span"), t = document.createElement("button");
  return a.classList.add("toast-undo-container"), t.classList.add("toast-undo-button"), t.innerText = u("Undo"), a.innerText = e, a.appendChild(t), t.addEventListener("click", function(o) {
    o.stopPropagation(), s(o), r?.hideToast instanceof Function && r.hideToast();
  }), r = l(a, {
    ...n,
    type: "toast-undo"
    /* UNDO */
  }), r;
}



/***/ }),

/***/ 1195:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ getGettextBuilder)
/* harmony export */ });
/* harmony import */ var node_gettext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2148);
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2778);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2838);
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(580);





/**
 * Returns the user's locale
 */
/**
 * Returns the user's language
 */
function getLanguage() {
    return document.documentElement.lang || 'en';
}

/**
 * This module provides functionality to translate applications independent from Nextcloud
 *
 * @packageDocumentation
 * @module @nextcloud/l10n/gettext
 * @example
 * ```js
import { getGettextBuilder } from '@nextcloud/l10n/gettext'
const gt = getGettextBuilder()
            .detectLocale() // or use setLanguage()
            .addTranslation(/* ... *\/)
            .build()
gt.gettext('some string to translate')
```
 */
/**
 * @notExported
 */
class GettextBuilder {
    constructor() {
        this.translations = {};
        this.debug = false;
    }
    setLanguage(language) {
        this.locale = language;
        return this;
    }
    /** Try to detect locale from context with `en` as fallback value */
    detectLocale() {
        return this.setLanguage(getLanguage().replace('-', '_'));
    }
    addTranslation(language, data) {
        this.translations[language] = data;
        return this;
    }
    enableDebugMode() {
        this.debug = true;
        return this;
    }
    build() {
        return new GettextWrapper(this.locale || 'en', this.translations, this.debug);
    }
}
/**
 * @notExported
 */
class GettextWrapper {
    constructor(locale, data, debug) {
        this.gt = new node_gettext__WEBPACK_IMPORTED_MODULE_0__({
            debug,
            sourceLocale: 'en',
        });
        for (const key in data) {
            this.gt.addTranslations(key, 'messages', data[key]);
        }
        this.gt.setLocale(locale);
    }
    subtitudePlaceholders(translated, vars) {
        return translated.replace(/{([^{}]*)}/g, (a, b) => {
            const r = vars[b];
            if (typeof r === 'string' || typeof r === 'number') {
                return r.toString();
            }
            else {
                return a;
            }
        });
    }
    /**
     * Get translated string (singular form), optionally with placeholders
     *
     * @param original original string to translate
     * @param placeholders map of placeholder key to value
     */
    gettext(original, placeholders = {}) {
        return this.subtitudePlaceholders(this.gt.gettext(original), placeholders);
    }
    /**
     * Get translated string with plural forms
     *
     * @param singular Singular text form
     * @param plural Plural text form to be used if `count` requires it
     * @param count The number to insert into the text
     * @param placeholders optional map of placeholder key to value
     */
    ngettext(singular, plural, count, placeholders = {}) {
        return this.subtitudePlaceholders(this.gt.ngettext(singular, plural, count).replace(/%n/g, count.toString()), placeholders);
    }
}
/**
 * Create a new GettextBuilder instance
 */
function getGettextBuilder() {
    return new GettextBuilder();
}




/***/ }),

/***/ 3334:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $X: () => (/* binding */ getDayNamesShort),
/* harmony export */   JN: () => (/* binding */ getFirstDay),
/* harmony export */   Pe: () => (/* binding */ getDayNamesMin),
/* harmony export */   Tl: () => (/* binding */ translate),
/* harmony export */   fL: () => (/* binding */ getMonthNames),
/* harmony export */   hY: () => (/* binding */ getDayNames),
/* harmony export */   lG: () => (/* binding */ getMonthNamesShort),
/* harmony export */   lO: () => (/* binding */ getCanonicalLocale)
/* harmony export */ });
/* unused harmony exports getLanguage, getLocale, getPlural, isRTL, loadTranslations, register, translatePlural, unregister */
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2778);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2838);
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(580);




/// <reference types="@nextcloud/typings" />
/**
 * Get the first day of the week
 *
 * @return {number}
 */
function getFirstDay() {
    if (typeof window.firstDay === 'undefined') {
        console.warn('No firstDay found');
        return 1;
    }
    return window.firstDay;
}
/**
 * Get a list of day names (full names)
 *
 * @return {string[]}
 */
function getDayNames() {
    if (typeof window.dayNames === 'undefined') {
        console.warn('No dayNames found');
        return [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
    }
    return window.dayNames;
}
/**
 * Get a list of day names (short names)
 *
 * @return {string[]}
 */
function getDayNamesShort() {
    if (typeof window.dayNamesShort === 'undefined') {
        console.warn('No dayNamesShort found');
        return ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
    }
    return window.dayNamesShort;
}
/**
 * Get a list of day names (minified names)
 *
 * @return {string[]}
 */
function getDayNamesMin() {
    if (typeof window.dayNamesMin === 'undefined') {
        console.warn('No dayNamesMin found');
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    }
    return window.dayNamesMin;
}
/**
 * Get a list of month names (full names)
 *
 * @return {string[]}
 */
function getMonthNames() {
    if (typeof window.monthNames === 'undefined') {
        console.warn('No monthNames found');
        return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    }
    return window.monthNames;
}
/**
 * Get a list of month names (short names)
 *
 * @return {string[]}
 */
function getMonthNamesShort() {
    if (typeof window.monthNamesShort === 'undefined') {
        console.warn('No monthNamesShort found');
        return [
            'Jan.',
            'Feb.',
            'Mar.',
            'Apr.',
            'May.',
            'Jun.',
            'Jul.',
            'Aug.',
            'Sep.',
            'Oct.',
            'Nov.',
            'Dec.',
        ];
    }
    return window.monthNamesShort;
}

/**
 * Returns the user's locale
 */
function getLocale() {
    return document.documentElement.dataset.locale || 'en';
}
/**
 * Returns user's locale in canonical form
 * E.g. `en-US` instead of `en_US`
 */
function getCanonicalLocale() {
    return getLocale().replace(/_/g, '-');
}
/**
 * Returns the user's language
 */
function getLanguage() {
    return document.documentElement.lang || 'en';
}
/**
 * Check whether the current, or a given, language is read right-to-left
 *
 * @param language Language code to check, defaults to current language
 */
function isRTL(language) {
    const languageCode = language || getLanguage();
    // Source: https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
    const rtlLanguages = [
        /* eslint-disable no-multi-spaces */
        'ae',
        'ar',
        'arc',
        'arz',
        'bcc',
        'bqi',
        'ckb',
        'dv',
        'fa',
        'glk',
        'ha',
        'he',
        'khw',
        'ks',
        'ku',
        'mzn',
        'nqo',
        'pnb',
        'ps',
        'sd',
        'ug',
        'ur',
        'uzs',
        'yi', // 'ייִדיש', Yiddish
        /* eslint-enable no-multi-spaces */
    ];
    // special case for Uzbek Afghan
    if ((language || getCanonicalLocale()).startsWith('uz-AF')) {
        return true;
    }
    return rtlLanguages.includes(languageCode);
}

/// <reference types="@nextcloud/typings" />
/**
 * Check if translations and plural function are set for given app
 *
 * @param {string} appId the app id
 * @return {boolean}
 */
function hasAppTranslations(appId) {
    var _a, _b;
    return (((_a = window._oc_l10n_registry_translations) === null || _a === void 0 ? void 0 : _a[appId]) !== undefined
        && ((_b = window._oc_l10n_registry_plural_functions) === null || _b === void 0 ? void 0 : _b[appId]) !== undefined);
}
/**
 * Register new, or extend available, translations for an app
 *
 * @param {string} appId the app id
 * @param {object} translations the translations list
 * @param {Function} pluralFunction the plural function
 */
function registerAppTranslations(appId, translations, pluralFunction) {
    var _a;
    window._oc_l10n_registry_translations = Object.assign(window._oc_l10n_registry_translations || {}, {
        [appId]: Object.assign(((_a = window._oc_l10n_registry_translations) === null || _a === void 0 ? void 0 : _a[appId]) || {}, translations),
    });
    window._oc_l10n_registry_plural_functions = Object.assign(window._oc_l10n_registry_plural_functions || {}, {
        [appId]: pluralFunction,
    });
}
/**
 * Unregister all translations and plural function for given app
 *
 * @param {string} appId the app id
 */
function unregisterAppTranslations(appId) {
    var _a, _b;
    (_a = window._oc_l10n_registry_translations) === null || _a === void 0 ? true : delete _a[appId];
    (_b = window._oc_l10n_registry_plural_functions) === null || _b === void 0 ? true : delete _b[appId];
}
/**
 * Get translations bundle for given app and current locale
 *
 * @param {string} appId the app id
 * @return {object}
 */
function getAppTranslations(appId) {
    var _a, _b, _c, _d;
    return {
        translations: (_b = (_a = window._oc_l10n_registry_translations) === null || _a === void 0 ? void 0 : _a[appId]) !== null && _b !== void 0 ? _b : {},
        pluralFunction: (_d = (_c = window._oc_l10n_registry_plural_functions) === null || _c === void 0 ? void 0 : _c[appId]) !== null && _d !== void 0 ? _d : ((number) => number),
    };
}

/**
 * Translate a string
 *
 * @param {string} app the id of the app for which to translate the string
 * @param {string} text the string to translate
 * @param {object} vars map of placeholder key to value
 * @param {number} number to replace %n with
 * @param {object} [options] options object
 * @return {string}
 */
function translate(app, text, vars, number, options) {
    const defaultOptions = {
        escape: true,
        sanitize: true,
    };
    const allOptions = Object.assign({}, defaultOptions, options || {});
    const identity = (value) => value;
    const optSanitize = allOptions.sanitize ? dompurify__WEBPACK_IMPORTED_MODULE_1__.sanitize : identity;
    const optEscape = allOptions.escape ? escape_html__WEBPACK_IMPORTED_MODULE_2__ : identity;
    // TODO: cache this function to avoid inline recreation
    // of the same function over and over again in case
    // translate() is used in a loop
    const _build = (text, vars, number) => {
        return text.replace(/%n/g, '' + number).replace(/{([^{}]*)}/g, (match, key) => {
            if (vars === undefined || !(key in vars)) {
                return optSanitize(match);
            }
            const r = vars[key];
            if (typeof r === 'string' || typeof r === 'number') {
                return optSanitize(optEscape(r));
            }
            else {
                return optSanitize(match);
            }
        });
    };
    const bundle = getAppTranslations(app);
    let translation = bundle.translations[text] || text;
    translation = Array.isArray(translation) ? translation[0] : translation;
    if (typeof vars === 'object' || number !== undefined) {
        return optSanitize(_build(translation, vars, number));
    }
    else {
        return optSanitize(translation);
    }
}
/**
 * Translate a string containing an object which possibly requires a plural form
 *
 * @param {string} app the id of the app for which to translate the string
 * @param {string} textSingular the string to translate for exactly one object
 * @param {string} textPlural the string to translate for n objects
 * @param {number} number number to determine whether to use singular or plural
 * @param {object} vars of placeholder key to value
 * @param {object} options options object
 */
function translatePlural(app, textSingular, textPlural, number, vars, options) {
    const identifier = '_' + textSingular + '_::_' + textPlural + '_';
    const bundle = getAppTranslations(app);
    const value = bundle.translations[identifier];
    if (typeof value !== 'undefined') {
        const translation = value;
        if (Array.isArray(translation)) {
            const plural = bundle.pluralFunction(number);
            return translate(app, translation[plural], vars, number, options);
        }
    }
    if (number === 1) {
        return translate(app, textSingular, vars, number, options);
    }
    else {
        return translate(app, textPlural, vars, number, options);
    }
}
/**
 * Load an app's translation bundle if not loaded already.
 *
 * @param {string} appName name of the app
 * @param {Function} callback callback to be called when
 * the translations are loaded
 * @return {Promise} promise
 */
function loadTranslations(appName, callback) {
    if (hasAppTranslations(appName) || getLocale() === 'en') {
        return Promise.resolve().then(callback);
    }
    const url = generateFilePath(appName, 'l10n', getLocale() + '.json');
    const promise = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onerror = () => {
            reject(new Error(request.statusText || 'Network error'));
        };
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                try {
                    const bundle = JSON.parse(request.responseText);
                    if (typeof bundle.translations === 'object')
                        resolve(bundle);
                }
                catch (error) {
                    // error is probably a SyntaxError due to invalid response text, this is handled by next line
                }
                reject(new Error('Invalid content of translation bundle'));
            }
            else {
                reject(new Error(request.statusText));
            }
        };
        request.send();
    });
    // load JSON translation bundle per AJAX
    return promise
        .then((result) => {
        register(appName, result.translations);
        return result;
    })
        .then(callback);
}
/**
 * Register an app's translation bundle.
 *
 * @param {string} appName name of the app
 * @param {Object<string, string>} bundle translation bundle
 */
function register(appName, bundle) {
    registerAppTranslations(appName, bundle, getPlural);
}
/**
 * Unregister all translations of an app
 *
 * @param appName name of the app
 * @since 2.1.0
 */
function unregister(appName) {
    return unregisterAppTranslations(appName);
}
/**
 * Get array index of translations for a plural form
 *
 *
 * @param {number} number the number of elements
 * @return {number} 0 for the singular form(, 1 for the first plural form, ...)
 */
function getPlural(number) {
    let language = getLanguage();
    if (language === 'pt-BR') {
        // temporary set a locale for brazilian
        language = 'xbr';
    }
    if (language.length > 3) {
        language = language.substring(0, language.lastIndexOf('-'));
    }
    /*
     * The plural rules are derived from code of the Zend Framework (2010-09-25),
     * which is subject to the new BSD license (http://framework.zend.com/license/new-bsd).
     * Copyright (c) 2005-2010 Zend Technologies USA Inc. (http://www.zend.com)
     */
    switch (language) {
        case 'az':
        case 'bo':
        case 'dz':
        case 'id':
        case 'ja':
        case 'jv':
        case 'ka':
        case 'km':
        case 'kn':
        case 'ko':
        case 'ms':
        case 'th':
        case 'tr':
        case 'vi':
        case 'zh':
            return 0;
        case 'af':
        case 'bn':
        case 'bg':
        case 'ca':
        case 'da':
        case 'de':
        case 'el':
        case 'en':
        case 'eo':
        case 'es':
        case 'et':
        case 'eu':
        case 'fa':
        case 'fi':
        case 'fo':
        case 'fur':
        case 'fy':
        case 'gl':
        case 'gu':
        case 'ha':
        case 'he':
        case 'hu':
        case 'is':
        case 'it':
        case 'ku':
        case 'lb':
        case 'ml':
        case 'mn':
        case 'mr':
        case 'nah':
        case 'nb':
        case 'ne':
        case 'nl':
        case 'nn':
        case 'no':
        case 'oc':
        case 'om':
        case 'or':
        case 'pa':
        case 'pap':
        case 'ps':
        case 'pt':
        case 'so':
        case 'sq':
        case 'sv':
        case 'sw':
        case 'ta':
        case 'te':
        case 'tk':
        case 'ur':
        case 'zu':
            return number === 1 ? 0 : 1;
        case 'am':
        case 'bh':
        case 'fil':
        case 'fr':
        case 'gun':
        case 'hi':
        case 'hy':
        case 'ln':
        case 'mg':
        case 'nso':
        case 'xbr':
        case 'ti':
        case 'wa':
            return number === 0 || number === 1 ? 0 : 1;
        case 'be':
        case 'bs':
        case 'hr':
        case 'ru':
        case 'sh':
        case 'sr':
        case 'uk':
            return number % 10 === 1 && number % 100 !== 11
                ? 0
                : number % 10 >= 2
                    && number % 10 <= 4
                    && (number % 100 < 10 || number % 100 >= 20)
                    ? 1
                    : 2;
        case 'cs':
        case 'sk':
            return number === 1 ? 0 : number >= 2 && number <= 4 ? 1 : 2;
        case 'ga':
            return number === 1 ? 0 : number === 2 ? 1 : 2;
        case 'lt':
            return number % 10 === 1 && number % 100 !== 11
                ? 0
                : number % 10 >= 2 && (number % 100 < 10 || number % 100 >= 20)
                    ? 1
                    : 2;
        case 'sl':
            return number % 100 === 1
                ? 0
                : number % 100 === 2
                    ? 1
                    : number % 100 === 3 || number % 100 === 4
                        ? 2
                        : 3;
        case 'mk':
            return number % 10 === 1 ? 0 : 1;
        case 'mt':
            return number === 1
                ? 0
                : number === 0 || (number % 100 > 1 && number % 100 < 11)
                    ? 1
                    : number % 100 > 10 && number % 100 < 20
                        ? 2
                        : 3;
        case 'lv':
            return number === 0
                ? 0
                : number % 10 === 1 && number % 100 !== 11
                    ? 1
                    : 2;
        case 'pl':
            return number === 1
                ? 0
                : number % 10 >= 2
                    && number % 10 <= 4
                    && (number % 100 < 12 || number % 100 > 14)
                    ? 1
                    : 2;
        case 'cy':
            return number === 1
                ? 0
                : number === 2
                    ? 1
                    : number === 8 || number === 11
                        ? 2
                        : 3;
        case 'ro':
            return number === 1
                ? 0
                : number === 0 || (number % 100 > 0 && number % 100 < 20)
                    ? 1
                    : 2;
        case 'ar':
            return number === 0
                ? 0
                : number === 1
                    ? 1
                    : number === 2
                        ? 2
                        : number % 100 >= 3 && number % 100 <= 10
                            ? 3
                            : number % 100 >= 11 && number % 100 <= 99
                                ? 4
                                : 5;
        default:
            return 0;
    }
}




/***/ }),

/***/ 3814:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $_: () => (/* binding */ w),
/* harmony export */   Jv: () => (/* binding */ _),
/* harmony export */   KT: () => (/* binding */ v),
/* harmony export */   d0: () => (/* binding */ h),
/* harmony export */   dC: () => (/* binding */ U)
/* harmony export */ });
/* unused harmony exports generateFilePath, getAppRootUrl, getRootUrl, linkTo */
const R = (n, e) => u(n, "", e), g = (n) => "/remote.php/" + n, U = (n, e) => {
  var o;
  return ((o = e == null ? void 0 : e.baseURL) != null ? o : w()) + g(n);
}, v = (n, e, o) => {
  var c;
  const i = Object.assign({
    ocsVersion: 2
  }, o || {}).ocsVersion === 1 ? 1 : 2;
  return ((c = o == null ? void 0 : o.baseURL) != null ? c : w()) + "/ocs/v" + i + ".php" + d(n, e, o);
}, d = (n, e, o) => {
  const c = Object.assign({
    escape: !0
  }, o || {}), s = function(i, r) {
    return r = r || {}, i.replace(
      /{([^{}]*)}/g,
      function(l, t) {
        const a = r[t];
        return c.escape ? encodeURIComponent(typeof a == "string" || typeof a == "number" ? a.toString() : l) : typeof a == "string" || typeof a == "number" ? a.toString() : l;
      }
    );
  };
  return n.charAt(0) !== "/" && (n = "/" + n), s(n, e || {});
}, _ = (n, e, o) => {
  var c, s, i;
  const r = Object.assign({
    noRewrite: !1
  }, o || {}), l = (c = o == null ? void 0 : o.baseURL) != null ? c : f();
  return ((i = (s = window == null ? void 0 : window.OC) == null ? void 0 : s.config) == null ? void 0 : i.modRewriteWorking) === !0 && !r.noRewrite ? l + d(n, e, o) : l + "/index.php" + d(n, e, o);
}, h = (n, e) => e.indexOf(".") === -1 ? u(n, "img", e + ".svg") : u(n, "img", e), u = (n, e, o) => {
  var c, s, i;
  const r = (i = (s = (c = window == null ? void 0 : window.OC) == null ? void 0 : c.coreApps) == null ? void 0 : s.includes(n)) != null ? i : !1, l = o.slice(-3) === "php";
  let t = f();
  return l && !r ? (t += "/index.php/apps/".concat(n), e && (t += "/".concat(encodeURI(e))), o !== "index.php" && (t += "/".concat(o))) : !l && !r ? (t = b(n), e && (t += "/".concat(e, "/")), t.at(-1) !== "/" && (t += "/"), t += o) : ((n === "settings" || n === "core" || n === "search") && e === "ajax" && (t += "/index.php"), n && (t += "/".concat(n)), e && (t += "/".concat(e)), t += "/".concat(o)), t;
}, w = () => window.location.protocol + "//" + window.location.host + f();
function f() {
  let n = window._oc_webroot;
  if (typeof n > "u") {
    n = location.pathname;
    const e = n.indexOf("/index.php/");
    if (e !== -1)
      n = n.slice(0, e);
    else {
      const o = n.indexOf("/", 1);
      n = n.slice(0, o > 0 ? o : void 0);
    }
  }
  return n;
}
function b(n) {
  var e, o;
  return (o = ((e = window._oc_appswebroots) != null ? e : {})[n]) != null ? o : "";
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "../js/" + chunkId + ".app.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "gestion:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../dist/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			129: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgestion"] = self["webpackChunkgestion"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/path/path.js
var path = __webpack_require__(3627);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/toast-WB-IZBJw.mjs
var toast_WB_IZBJw = __webpack_require__(523);
;// CONCATENATED MODULE: ./node_modules/@nextcloud/dialogs/dist/index.mjs




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
const w = (e, t, i = () => {
}) => {
  const a = document.createElement("div");
  (document.querySelector(t?.container) || document.body).appendChild(a);
  const s = new d({
    el: a,
    name: "VueDialogHelper",
    render: (o) => o(e, {
      props: t,
      on: {
        close: (...n) => {
          i(...n.map((h) => m(h))), s.$destroy();
        }
      }
    })
  });
}, b = '<svg xmlns="http://www.w3.org/2000/svg" id="mdi-folder-move" viewBox="0 0 24 24"><path d="M14,18V15H10V11H14V8L19,13M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" /></svg>', f = '<svg xmlns="http://www.w3.org/2000/svg" id="mdi-folder-multiple" viewBox="0 0 24 24"><path d="M22,4H14L12,2H6A2,2 0 0,0 4,4V16A2,2 0 0,0 6,18H22A2,2 0 0,0 24,16V6A2,2 0 0,0 22,4M2,6H0V11H0V20A2,2 0 0,0 2,22H20V20H2V6Z" /></svg>';
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
var A = /* @__PURE__ */ ((e) => (e[e.Choose = 1] = "Choose", e[e.Move = 2] = "Move", e[e.Copy = 3] = "Copy", e[e.CopyMove = 4] = "CopyMove", e[e.Custom = 5] = "Custom", e))(A || {});
class g extends (/* unused pure expression or super */ null && (Error)) {
}
class v {
  title;
  multiSelect;
  mimeTypeFilter;
  directoriesAllowed;
  buttons;
  path;
  filter;
  container;
  disabledNavigation;
  constructor(t, i, a, r, s, o, n, h, c = !1) {
    this.title = t, this.multiSelect = i, this.mimeTypeFilter = a, this.directoriesAllowed = r, this.path = o, this.filter = n, this.buttons = s, this.container = h, this.disabledNavigation = c;
  }
  /**
   * Pick files using the FilePicker
   *
   * @return Promise with array of picked files or rejected promise on close without picking
   */
  async pick() {
    const { FilePickerVue: t } = await __webpack_require__.e(/* import() */ 618).then(__webpack_require__.bind(__webpack_require__, 8618));
    return new Promise((i, a) => {
      w(t, {
        allowPickDirectory: this.directoriesAllowed,
        buttons: this.buttons,
        container: this.container,
        name: this.title,
        path: this.path,
        mimetypeFilter: this.mimeTypeFilter,
        multiselect: this.multiSelect,
        filterFn: this.filter,
        disabledNavigation: this.disabledNavigation
      }, (...r) => {
        const [s] = r;
        !Array.isArray(s) || s.length === 0 ? a(new g("FilePicker: No nodes selected")) : this.multiSelect ? i(s.map((o) => o.path)) : i(s[0]?.path || "/");
      });
    });
  }
}
class T {
  title;
  multiSelect = !1;
  mimeTypeFilter = [];
  directoriesAllowed = !1;
  path;
  filter;
  buttons = [];
  container;
  disabledNavigation = !1;
  /**
   * Construct a new FilePicker
   *
   * @param title Title of the FilePicker
   */
  constructor(t) {
    this.title = t;
  }
  /**
   * Set the container where the FilePicker will be mounted
   * By default 'body' is used
   *
   * @param container The dialog container
   */
  setContainer(t) {
    return this.container = t, this;
  }
  /**
   * Enable or disable picking multiple files
   *
   * @param ms True to enable picking multiple files, false otherwise
   */
  setMultiSelect(t) {
    return this.multiSelect = t, this;
  }
  /**
   * Add allowed MIME type
   *
   * @param filter MIME type to allow
   */
  addMimeTypeFilter(t) {
    return this.mimeTypeFilter.push(t), this;
  }
  /**
   * Set allowed MIME types
   *
   * @param filter Array of allowed MIME types
   */
  setMimeTypeFilter(t) {
    return this.mimeTypeFilter = t, this;
  }
  /**
   * Add a button to the FilePicker
   * Note: This overrides any previous `setButtonFactory` call
   *
   * @param button The button
   */
  addButton(t) {
    return typeof this.buttons == "function" && (console.warn("FilePicker buttons were set to factory, now overwritten with button object."), this.buttons = []), this.buttons.push(t), this;
  }
  /**
   * Set the button factory which is used to generate buttons from current view, path and selected nodes
   * Note: This overrides any previous `addButton` call
   *
   * @param factory The button factory
   */
  setButtonFactory(t) {
    return this.buttons = t, this;
  }
  /**
   * Set FilePicker type based on legacy file picker types
   * @param type The legacy filepicker type to emulate
   * @deprecated Use `addButton` or `setButtonFactory` instead as with setType you do not know which button was pressed
   */
  setType(t) {
    return this.buttons = (i, a) => {
      const r = [], s = i?.[0]?.attributes?.displayName || i?.[0]?.basename, o = s || u(a);
      if (t === 1) {
        let n = l("Choose");
        i.length === 1 ? n = l("Choose {file}", { file: s }) : this.multiSelect && (n = p("Choose %n file", "Choose %n files", i.length)), r.push({
          callback: () => {
          },
          type: "primary",
          label: n
        });
      }
      return (t === 4 || t === 3) && r.push({
        callback: () => {
        },
        label: o ? l("Copy to {target}", { target: o }) : l("Copy"),
        type: "primary",
        icon: f
      }), (t === 2 || t === 4) && r.push({
        callback: () => {
        },
        label: o ? l("Move to {target}", { target: o }) : l("Move"),
        type: t === 2 ? "primary" : "secondary",
        icon: b
      }), r;
    }, this;
  }
  /**
   * Allow to pick directories besides files
   *
   * @param allow True to allow picking directories
   */
  allowDirectories(t = !0) {
    return this.directoriesAllowed = t, this;
  }
  /**
   * Set starting path of the FilePicker
   *
   * @param path Path to start from picking
   */
  startAt(t) {
    return this.path = t, this;
  }
  /**
   * Add filter function to filter file list of FilePicker
   *
   * @param filter Filter function to apply
   */
  setFilter(t) {
    return this.filter = t, this;
  }
  /**
   * Allow to pick directories besides files
   *
   * @param allow True to allow picking directories
   */
  disableNavigation() {
    return this.disabledNavigation = !0, this;
  }
  /**
   * Construct the configured FilePicker
   */
  build() {
    return new v(
      this.title,
      this.multiSelect,
      this.mimeTypeFilter,
      this.directoriesAllowed,
      this.buttons,
      this.path,
      this.filter,
      this.container,
      this.disabledNavigation
    );
  }
}
function S(e) {
  return new T(e);
}


// EXTERNAL MODULE: ./node_modules/@nextcloud/l10n/dist/index.mjs
var dist = __webpack_require__(3334);
// EXTERNAL MODULE: ./node_modules/@nextcloud/router/dist/index.mjs
var router_dist = __webpack_require__(3814);
;// CONCATENATED MODULE: ./src/js/objects/devis.js




class Devis {

  /**
   * Devis object
   * @param myresp instantiate devis object
   */
  constructor(myresp) {
    this.id = myresp.id;
    this.user_id = myresp.user_id;
    this.date = ((myresp.date == null || myresp.date.length === 0) ? '-' : myresp.date);
    this.num = ((myresp.num == null || myresp.num.length === 0) ? '-' : myresp.num);
    this.cid = ((myresp.cid == null || myresp.cid.length === 0) ? '-' : myresp.cid);
    this.nom = ((myresp.nom == null || myresp.nom.length === 0) ? '-' : myresp.nom);
    this.prenom = ((myresp.prenom == null || myresp.prenom.length === 0) ? '-' : myresp.prenom);
    this.version = ((myresp.version == null || myresp.version.length === 0) ? '-' : myresp.version);
    this.mentions = ((myresp.mentions == null || myresp.mentions.length === 0) ? '-' : myresp.mentions);
    this.baseUrl = generateUrl(`/apps/gestion/devis/${this.id}/show`);
  }

  /**undefined
   * Get datatable row for a devis
   */
  getDTRow() {
    let myrow = [
      '<div>' + this.user_id + '</div>',
      '<input style="margin:0;padding:0;" class="inputDate" type="date" value=' + this.date + ' data-table="devis" data-column="date" data-id="' + this.id + '"/>',
      '<div class="editable" data-table="devis" data-column="num" data-id="' + this.id + '" style="display:inline">' + this.num + '</div>',
      '<div class="loadSelect_listclient" data-table="devis" data-column="id_client" data-id="' + this.id + '" data-current="' + this.cid + '">'+ this.cid + ' ' + this.prenom + ' ' + this.nom + '</div>',
      '<div class="editable" data-table="devis" data-column="version" data-id="' + this.id + '" style="display:inline">' + this.version + '</div>',
      '<div class="editable" data-table="devis" data-column="mentions" data-id="' + this.id + '" style="display:inline">' + this.mentions + '</div>',
      '<div style="display:inline-block;margin-right:0px;width:80%;"><a href="' + this.baseUrl + '"><button>' + t('gestion', 'Open') + '</button></a></div><div data-modifier="devis" data-id=' + this.id + ' data-table="devis" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div>'
    ];
    return myrow;
  }

  /**
   * 
   * @param {*} dt 
   */
  static newDevis(dt) {
    var oReq = new XMLHttpRequest();
    oReq.open('POST', baseUrl + '/devis/insert', true);
    oReq.onload = function(e){
      if (this.status == 200) {
        showDone()
        Devis.loadDevisDT(dt);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

  /**
   * Load devis ajax
   * @param devisDT devis datatable
   */
  static loadDevisDT(devisDT) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getDevis', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.onload = function(e){
      if (this.status == 200) {
        LoadDT(devisDT, JSON.parse(this.response), Devis);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

  static getDevis(callback){
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getDevis', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.onload = function(e){
      if (this.status == 200) {
        callback(JSON.parse(this.response));
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

  static loadDevisList_dnum(e){
    Devis.getDevis( response => {
      var selectElement = document.createElement("select");
      selectElement.dataset.current = e.target.dataset.current;
      selectElement.dataset.id = e.target.dataset.id;
      selectElement.dataset.old = e.target.innerHTML;

      selectElement.addEventListener("change", el=>{
        if(el.target.value != 0){
          updateDB(el.target.parentElement.dataset.table,
            el.target.parentElement.dataset.column,
            el.target.value,
            el.target.parentElement.dataset.id
          );

          var parentElement = el.target.parentElement;
          parentElement.innerHTML = el.target.options[el.target.selectedIndex].text;
          parentElement.dataset.current = el.target.value;
        }else{
          var parentElement = el.target.parentElement
          parentElement.innerHTML = el.target.dataset.old
        }
      });

      var option = document.createElement("option");
        option.value = 0;
        option.text = t('gestion', 'Cancel');
        selectElement.appendChild(option);

      JSON.parse(response).forEach(myresp => {
        var option = document.createElement("option");
        option.value = myresp.id;
        option.text = myresp.num + ' ' + myresp.prenom + ' ' + myresp.nom;
        selectElement.appendChild(option);
      });
      
      checkSelectPurJs(selectElement);

      e.target.innerHTML = ''
      e.target.appendChild(selectElement);
    });
  }
}

;// CONCATENATED MODULE: ./src/js/objects/client.js
/* provided dependency */ var $ = __webpack_require__(4692);



class Client {

  /**
   * 
   * @param myresp instantiate client object
   */
  constructor(myresp) {
    this.id = myresp.id;
    this.entreprise = ((myresp.entreprise.length === 0) ? '-' : myresp.entreprise);
    this.prenom = ((myresp.prenom.length === 0) ? '-' : myresp.prenom);
    this.nom = ((myresp.nom.length === 0) ? '-' : myresp.nom);
    this.legal_one = ((myresp.legal_one.length === 0) ? '-' : myresp.legal_one);
    this.telephone = ((myresp.telephone.length === 0) ? '-' : myresp.telephone);
    this.mail = ((myresp.mail.length === 0) ? '-' : myresp.mail);
    this.adresse = ((myresp.adresse.length === 0) ? '-' : myresp.adresse);
  }

  /**
   * Get datatable row for a client
   */
  getDTRow() {
    let myrow = [
      '<div>' + this.id + '</div>',
      '<div class="editable" data-table="client" data-column="entreprise" data-id="' + this.id + '">' + this.entreprise + '</div>',
      '<div class="editable" data-table="client" data-column="prenom" data-id="' + this.id + '">' + this.prenom + '</div>',
      '<div class="editable" data-table="client" data-column="nom" data-id="' + this.id + '">' + this.nom + '</div>',
      '<div class="editable" data-table="client" data-column="legal_one" data-id="' + this.id + '">' + this.legal_one + '</div>',
      '<div class="editable" data-table="client" data-column="telephone" data-id="' + this.id + '">' + this.telephone + '</div>',
      '<div class="editable" data-table="client" data-column="mail" data-id="' + this.id + '">' + this.mail + '</div>',
      '<div class="editable" data-table="client" data-column="adresse" data-id="' + this.id + '">' + this.adresse + '</div>',
      '<center><div data-modifier="client" data-id=' + this.id + ' data-table="client" style="display:inline-block;margin-right:0px;" class="deleteItem icon-delete"></div></center>'
    ];
    return myrow;
  }

  /**
   * 
   * @param {*} dt 
   */
  static newClient(dt) {
    var oReq = new XMLHttpRequest();
    oReq.open('POST', baseUrl + '/client/insert', true);
    oReq.onload = function(e){
      if (this.status == 200) {
        showDone()
        Client.loadClientDT(dt);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

  /**
   * 
   * @param {*} clientDT 
   */
  static loadClientDT(clientDT) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getClients', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.onload = function(e){
      if (this.status == 200) {
        LoadDT(clientDT, JSON.parse(this.response), Client);
      }else{
        showError(this.response);
      }
    };
    oReq.send();
  }

  /**
   * 
   * @param {*} callback 
   */
  static getClients(callback) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getClients', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.onload = function(e){
      if (this.status == 200) {
        callback(JSON.parse(this.response));
      }else{
        showError(this.response);
      }
    };
    oReq.send();
    }

  /**
   * 
   * @param {*} id 
   */
  static getClientByIdDevis(id) {
    var myData = { id: id, };
    $.ajax({
        url: baseUrl + '/clientbyiddevis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        $.each(JSON.parse(response), function (arrayID, myresp) {
            $("#nomprenom").html(myresp.prenom + ' ' + myresp.nom);
            $("#nomprenom").attr('data-id', id);
            $("#entreprise").html(myresp.entreprise);
            $("#adresse").html(myresp.adresse);
            $("#mail").html(myresp.mail);
            $("#telephone").html(myresp.telephone);
            $("#legal_one").html(myresp.legal_one);
            $("#pdf").attr("data-folder", myresp.num);
            if ($("#factureid").length) {
                $("#pdf").data('name', myresp.entreprise + "_" + $("#factureid").text() + "_v" + $('#factureversion').text());
            } else {
                $("#pdf").data('name', myresp.entreprise + "_" + myresp.num + "_v" + $('#devisversion').text());
            }

        });
    }).fail(function (response, code) {
        showError(response);
    });
  }

  /**
   * 
   */
  // static loadClientList() {
  //   Client.getClients(function (response) {
  //     var listClients = document.querySelectorAll(".listClient");

  //     listClients.forEach(selectElement => {
  //       removeOptions(selectElement);
  //       var option = document.createElement("option");
  //       option.value = 0;
  //       option.text = t('gestion', 'Choose customer');
  //       selectElement.appendChild(option);

  //       JSON.parse(response).forEach(myresp => {
  //         var option = document.createElement("option");
  //         option.value = myresp.id;
  //         option.text = myresp.prenom + ' ' + myresp.nom;
  //         selectElement.appendChild(option);
  //       });
  
  //       checkSelectPurJs(selectElement);
  //     });
  //   });
  // }

  /**
   * 
   * @param {*} cid 
   */
  static loadClientList_cid(e){
    Client.getClients(response => {

      var selectElement = document.createElement("select");
      selectElement.dataset.current = e.target.dataset.current;
      selectElement.dataset.id = e.target.dataset.id;
      selectElement.dataset.old = e.target.innerHTML;

      selectElement.addEventListener("change", el=>{
        if(el.target.value != 0){
          updateDB(el.target.parentElement.dataset.table,
            el.target.parentElement.dataset.column,
            el.target.value,
            el.target.parentElement.dataset.id
          );

          var parentElement = el.target.parentElement
          parentElement.innerHTML = el.target.value + " " + el.target.options[el.target.selectedIndex].text;
          parentElement.dataset.current = el.target.value;
        }else{
          var parentElement = el.target.parentElement
          parentElement.innerHTML = el.target.dataset.old
        }
      });

      var option = document.createElement("option");
        option.value = 0;
        option.text = t('gestion', 'Cancel');
        selectElement.appendChild(option);

      JSON.parse(response).forEach(myresp => {
        var option = document.createElement("option");
        option.value = myresp.id;
        option.text = myresp.prenom + ' ' + myresp.nom;
        selectElement.appendChild(option);
      });
      
      checkSelectPurJs(selectElement);

      e.target.innerHTML = ''
      e.target.appendChild(selectElement);
    });
  }
}

;// CONCATENATED MODULE: ./src/js/modules/mainFunction.js
/* provided dependency */ var mainFunction_$ = __webpack_require__(4692);







var mainFunction_baseUrl = (0,router_dist/* generateUrl */.Jv)('/apps/gestion');
var mainFunction_cur = null;

/**
 * 
 */
 var optionDatatable = {
    autoWidth: false,
    stateSave: true,
    lengthMenu: [[100, 300, 500, -1], [100, 300, 500, "All"]],
    language: {
        "search": (0,dist/* translate */.Tl)('gestion', 'Search'),
        "emptyTable": (0,dist/* translate */.Tl)('gestion', 'No data available in table'),
        "info": (0,dist/* translate */.Tl)('gestion', 'Showing {start} to {end} of {total} entries', { start: '_START_', end: '_END_', total: '_TOTAL_' }),
        "infoEmpty": (0,dist/* translate */.Tl)('gestion', 'Showing 0 to 0 of 0 entries'),
        "loadingRecords": (0,dist/* translate */.Tl)('gestion', 'Loading records …'),
        "processing": (0,dist/* translate */.Tl)('gestion', 'Processing …'),
        "infoFiltered": (0,dist/* translate */.Tl)('gestion', '{max} entries filtered', { max: '_MAX_' }),
        "lengthMenu": (0,dist/* translate */.Tl)('gestion', 'Show {menu} entries', { menu: '_MENU_' }),
        "zeroRecords": (0,dist/* translate */.Tl)('gestion', 'No corresponding entry'),
        "paginate": {
            "first": (0,dist/* translate */.Tl)('gestion', 'First'),
            "last": (0,dist/* translate */.Tl)('gestion', 'Last'),
            "next": (0,dist/* translate */.Tl)('gestion', 'Next'),
            "previous": (0,dist/* translate */.Tl)('gestion', 'Previous'),
        }
    }
}

/**
 * 
 * @param {*} checkConfig 
 */
function globalConfiguration(checkConfig=true){
    getStats();
    if(checkConfig){
        isconfig();
    }
    configuration(getCurrency);
    configuration(mainFunction_path);
}

/**
 * 
 */
function configureDT() {
    mainFunction_$('.editable').attr('title', t('gestion', 'Editable (Click to change)'));
}

/**
 * 
 */
function configureShow() {
    mainFunction_$('.sendmail').attr('title', t('gestion', 'Your global Nextcloud mail server need to be configured'));
}

/**
 * Success message
 */
function mainFunction_showDone() {
    showSuccess(t('gestion', 'Added!'));
}

/**
 * 
 * @param {*} el 
 */
function checkSelect(el) {
    mainFunction_$(el).each(function (arrayID, elem) {
        mainFunction_$(elem).find('option').each(function () {
            if (this.value == elem.getAttribute("data-current")) {
                mainFunction_$(this).prop('selected', true)
            }
        })
    })
}


function mainFunction_checkSelectPurJs(el) {
    console.log(el.options)
    Array.from(el.options).forEach(element => {
        if (element.value == el.getAttribute("data-current")) {
            element.setAttribute('selected', true);
        }
    });
}

/**
 * 
 * @param {*} DT 
 * @param {*} response 
 * @param {*} cls 
 */
function mainFunction_LoadDT(DT, response, cls) {
    DT.clear();
    mainFunction_$.each(JSON.parse(response), function (arrayID, myresp) {
        let c = new cls(myresp);
        DT.row.add(c.getDTRow());
    });
    DT.columns.adjust(optionDatatable).draw(true);
    configureDT();
}

/**
 * 
 * @param {*} ID 
 * @param {*} positionRow 
 * @param {*} positionColumn 
 * @param {*} data 
 */
function mainFunction_insertRow(ID, positionRow = -1, positionColumn = -1, data){
    
    t = document.getElementById(ID);
    var r = t.insertRow(positionRow);
    mainFunction_insertCell(r, -1, data, "statHead");

    //Ajout de toutes les colonnes
    for (let i = 1; i < 13; i++) {
        mainFunction_insertCell(r, -1, mainFunction_cur.format(0));
    }
    return r;
}
/**
 * 
 * @param {*} row
 * @param {*} positionColumn 
 * @param {*} data 
 */
function mainFunction_insertCell(row, positionColumn = -1, data, className="statData"){
    var c = row.insertCell(positionColumn);
    c.appendChild(document.createTextNode(data));
    c.setAttribute("class", className);
}

/**
 * 
 * @param {*} r 
 * @param {*} positionColumn 
 * @param {*} data 
 */
function mainFunction_modifyCell(r, positionColumn = -1, data){
    var cell = r.cells[positionColumn];
    cell.innerHTML = data;
}

/**
 * 
 * @param {*} res 
 */
 function mainFunction_path(res) {
    var myres = JSON.parse(res)[0];
    mainFunction_$("#theFolder").val(myres.path);
    mainFunction_$("#theFolder").attr('data-id', myres.id);
};


/**
 * 
 * @param {*} response 
 */
function getCurrency(response) {
    try {
        var myresp = JSON.parse(response)[0];
        mainFunction_cur = new Intl.NumberFormat(myresp.format, { style: 'currency', currency: myresp.devise, minimumFractionDigits: 2 });
    } catch (error) {
        mainFunction_cur = new Intl.NumberFormat("en-EN", { style: 'currency', currency: myresp.devise, minimumFractionDigits: 2 });
        console.log(error);
    }
}

/**
 * 
 * @param {*} total 
 */
function mainFunction_getGlobal(total) {
    mainFunction_$.ajax({
        url: mainFunction_baseUrl + '/getConfiguration',
        type: 'PROPFIND',
        contentType: 'application/json',
    }).done(function (response) {
        var myresp = JSON.parse(response)[0];
        var tva = parseFloat(myresp.tva_default);
        mainFunction_$('#totaldevis tbody').append('<tr><td>' + mainFunction_cur.format(total) + '</td><td id="tva">' + tva + ' %</td><td id="totaltva">' + mainFunction_cur.format(Math.round((total * tva)) / 100) + '</td><td>' + mainFunction_cur.format(Math.round((total * (tva + 100))) / 100) + '</td></tr>');
        mainFunction_$('#mentions_default').html(myresp.mentions_default);
    })
}

/**
 * //@
 * @param {*} response 
 * 
 */
function checkAutoIncrement(response){
    var myresp = JSON.parse(response)[0];
    if(myresp.auto_invoice_number==1){
        mainFunction_$('.deleteItem').remove();
        mainFunction_$(".factureNum").removeClass("editable");
    }
}

/**
 * Format number if it's monetary
 * @param {*} el 
 * @param {*} format_number 
 */
function updateNumerical(el, format_number=true){
    el.innerText=el.innerText.replace(',', '.').replace(/[^0-9.-]+/g,"")
    updateEditable(el);
    if(format_number){
        el.innerText=mainFunction_cur.format(el.innerText)
    }else{
        el.innerText=el.innerText
    }
}

function removeOptions(selectElement) {
    
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }
;// CONCATENATED MODULE: ./src/js/modules/ajaxRequest.js
/* provided dependency */ var ajaxRequest_$ = __webpack_require__(4692);




/**
 * Update data
 * @param table 
 * @param column 
 * @param data 
 * @param id 
 */
function ajaxRequest_updateDB(table, column, data, id) {
    var myData = {
        table: table,
        column: column,
        data: data,
        id: id,
    };

    ajaxRequest_$.ajax({
        url: baseUrl + '/update',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        showSuccess(t('gestion', 'Modification saved'));
    }).fail(function (response, code) {
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
    });
}

/**
 * Update data
 * @param table 
 * @param column 
 * @param data 
 * @param id 
 */
function updateDBConfiguration(table, column, data, id) {
    
    var myData = {
        table: table,
        column: column,
        data: data,
        id: id,
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl + '/updateConfiguration', true); // false for synchronous request
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request successful
            showSuccess(t('gestion', 'Modification saved'));
        } else {
            // Request failed
            showError(t('gestion', 'There is an error with the format, please check the documentation'));
        }
    };

    xhr.onerror = function () {
        // Connection error
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
    };

    xhr.send(JSON.stringify(myData));
}


/**
 * Update session var
 * @param table 
 * @param column 
 */
function updateCurrentCompany(companyID) {
    var myData = {
        companyID: companyID
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl + '/updateSession', false); // false for synchronous request
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("requesttoken", oc_requesttoken);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request successful
            showSuccess(t('gestion', 'Modification saved'));
            window.location.reload();
        } else {
            // Request failed
            showError(t('gestion', 'There is an error with the format, please check the documentation'));
        }
    };

    xhr.onerror = function () {
        // Connection error
        showError(t('gestion', 'There is an error with the format, please check the documentation'));
    };

    xhr.send(JSON.stringify(myData));
}

/**
 * Delete data
 * @param table
 * @param id 
 */
function deleteDB(table, id) {
    var myData = {
        table: table,
        id: id,
    };

    if(window.confirm(t('gestion','Are you sure you want to delete?'))){
        ajaxRequest_$.ajax({
            url: baseUrl + '/delete',
            type: 'DELETE',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(myData)
        }).done(function (response, code) {
            showSuccess(t('gestion', 'Modification saved'));
        }).fail(function (response, code) {
            showError(response);
        });
    }else{
        showMessage(t('gestion', 'Nothing changed'))
    }
}

/**
 * 
 */
function ajaxRequest_getStats() {
    ajaxRequest_$.ajax({
        url: baseUrl + '/getStats',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        var res = JSON.parse(response);
        ajaxRequest_$("#statsclient").text(res.client);
        ajaxRequest_$("#statsdevis").text(res.devis);
        ajaxRequest_$("#statsfacture").text(res.facture);
        ajaxRequest_$("#statsproduit").text(res.produit);
    }).fail(function (response, code) {
        showError(response);
    });
}


/**
 * 
 * @param {*} f1 
 */
function ajaxRequest_configuration(f1) {
    ajaxRequest_$.ajax({
        url: baseUrl + '/getConfiguration',
        type: 'PROPFIND',
        contentType: 'application/json',
        async: false,
    }).done(function (response) {
        f1(response);
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * 
 */
function ajaxRequest_isconfig() {
    ajaxRequest_$.ajax({
        url: baseUrl + '/isconfig',
        type: 'GET',
        contentType: 'application/json'
    }).done(function (response) {
        if (!response) {
            var modal = document.getElementById("modalConfig");
            modal.style.display = "block";
        }
    })
}

/**
 * 
 * @param {*} cur 
 */
function getAnnualTurnoverPerMonthNoVat(cur) {
    ajaxRequest_$.ajax({
        url: baseUrl + '/getAnnualTurnoverPerMonthNoVat',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        var res = JSON.parse(response);
        var curY = "";
        var curRow;
        var total=0;
        res.forEach(function(item){
            if(curY !== item.y){
                
                if(curY !== ""){
                    insertCell(curRow, -1, cur.format(total));
                    total=0;
                }

                curY = item.y;
                curRow = insertRow("Statistical", -1, 0, item.y);
                modifyCell(curRow, (item.m), cur.format(Math.round(item.total)));
                total+= Math.round(item.total);

            }else{

                modifyCell(curRow, (item.m), cur.format(Math.round(item.total)));
                total+= Math.round(item.total);

            }
        });
        // At the end
        insertCell(curRow, -1, cur.format(total));
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * 
 * @param {*} myCase 
 */
function ajaxRequest_updateEditable(myCase) {
    ajaxRequest_updateDB(myCase.dataset.table, myCase.dataset.column, myCase.innerText, myCase.dataset.id);
    if (myCase.dataset.modifier === "getProduitsById") {getProduitsById();}
    myCase.removeAttribute('contenteditable');
}

/**
 * 
 * @param {*} myCase 
 */
function updateEditableConfiguration(myCase) {
    updateDBConfiguration(myCase.dataset.table, myCase.dataset.column, myCase.innerText, myCase.dataset.id);
    if (myCase.dataset.modifier === "getProduitsById") {getProduitsById();}
    myCase.removeAttribute('contenteditable');
}


/**
 * 
 * @param {*} lp 
 * @param {*} id 
 * @param {*} produitid 
 */
function listProduit(lp, id, produitid) {
    ajaxRequest_$.ajax({
        url: baseUrl + '/getProduits',
        type: 'PROPFIND',
        contentType: 'application/json'
    }).done(function (response) {
        lp.append('<option data-table="produit_devis" data-column="produit_id" data-val="' + produitid + '" data-id="' + id + '">'+t('gestion','Cancel')+'</option>');
        ajaxRequest_$.each(JSON.parse(response), function (arrayID, myresp) {
            var selected = "";
            if (produitid == myresp.id) {
                selected = "selected";
            }
            lp.append('<option ' + selected + ' data-table="produit_devis" data-column="produit_id" data-val="' + myresp.id + '" data-id="' + id + '">' + myresp.reference + ' ' + myresp.description + ' ' + cur.format(myresp.prix_unitaire) + '</option>');
        });
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Get a product in database using id
 */
 function getProduitsById() {
    var devis_id = ajaxRequest_$('#devisid').data('id');
    var myData = { numdevis: devis_id, };

    ajaxRequest_$.ajax({
        url: baseUrl + '/getProduitsById',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        ajaxRequest_$('#produits tbody').empty();
        var total = 0;
        var deleteDisable = "";
        if (ajaxRequest_$('#produits').data("type") === "facture") {
            deleteDisable = "d-none";
        }

        ajaxRequest_$.each(JSON.parse(response), function (arrayID, myresp) {
            ajaxRequest_$('#produits tbody').append('<tr><td><div data-html2canvas-ignore data-modifier="getProduitsById" data-id="' + myresp.pdid + '" data-table="produit_devis" class="' + deleteDisable + ' deleteItem icon-delete"></div><div style="display:inline;" data-val="' + myresp.pid + '" data-id="' + myresp.pdid + '" class="selectable">' + myresp.reference + '</div></td>' +
                '<td>' + myresp.description + '</td>' +
                '<td><div class="editable" data-table="produit_devis" data-column="comment" data-id="' + myresp.pdid + '">' + ((myresp.comment.length === 0) ? '-' : myresp.comment) + '</div></td>' +
                '<td><div class="editableNumber getProduitsById" style="display:inline;" data-modifier="getProduitsById" data-table="produit_devis" data-column="quantite" data-id=' + myresp.pdid + '>' + myresp.quantite + '</div> </td>' +
                '<td>' + cur.format(myresp.prix_unitaire) + '</td>' +
                '<td>' + cur.format((myresp.quantite * myresp.prix_unitaire)) + '</td></tr>');
            total += (myresp.quantite * myresp.prix_unitaire);
        });

        ajaxRequest_$("#totaldevis tbody").empty();
        getGlobal(total);
    }).fail(function (response, code) {
        showError(response);
    });
}

/**
 * Save pdf in nextcloud
 * @param {*} myData 
 */
function saveNextcloud(myData) {
    ajaxRequest_$.ajax({
      url: baseUrl + '/savePDF',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(myData)
    }).done(function (response) {
      showMessage(t('gestion', 'Save in') + " " + ajaxRequest_$("#theFolder").val() + "/" + ajaxRequest_$("#pdf").data("folder"));
    }).fail(function (response, code) {
      showMessage(t('gestion', 'There is an error'));
      error(response);
    });
  };

  function getMailServerFrom(input) {
    var oReq = new XMLHttpRequest();
    oReq.open('PROPFIND', baseUrl + '/getServerFromMail', true);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.setRequestHeader("requesttoken", oc_requesttoken);
    oReq.onload = function(e){
        if (this.status == 200) {
            input.value = JSON.parse(this.response)['mail'];
        }else{
            showError(this.response);
        }
    };
    oReq.send();
    }

    function backup(){
        var oReq = new XMLHttpRequest();
        oReq.open('GET', mainFunction_baseUrl + '/backup', true);
        oReq.setRequestHeader("Content-Type", "application/json");
        oReq.setRequestHeader("requesttoken", oc_requesttoken);
        oReq.onload = function(e){
            if (this.status == 200) {
                (0,toast_WB_IZBJw.h)((0,dist/* translate */.Tl)('gestion', 'Save in')+' '+JSON.parse(this.response)['name']+'\n'+(0,dist/* translate */.Tl)('gestion','(do not forget to show hidden folders)'));
            }else{
                (0,toast_WB_IZBJw.k)(this.response);
            }
        };
        oReq.send();
    }

;// CONCATENATED MODULE: ./src/js/adminSection.js


window.addEventListener("DOMContentLoaded", function () {
    var back = document.getElementById("backup");
    back.addEventListener("click", function(){
        backup();
    });
});
})();

/******/ })()
;