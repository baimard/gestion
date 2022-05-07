<<<<<<< HEAD
(self["webpackChunkgestion"] = self["webpackChunkgestion"] || []).push([[814],{

/***/ 9483:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isConstructor = __webpack_require__(4411);
var tryToString = __webpack_require__(6330);

var TypeError = global.TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ 6077:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(30);
var definePropertyModule = __webpack_require__(3070);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 5787:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isPrototypeOf = __webpack_require__(7976);

var TypeError = global.TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw TypeError('Incorrect invocation');
};


/***/ }),

/***/ 9341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ 3671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var aCallable = __webpack_require__(9662);
var toObject = __webpack_require__(7908);
var IndexedObject = __webpack_require__(8361);
var lengthOfArrayLike = __webpack_require__(6244);

var TypeError = global.TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ 1589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);
var createProperty = __webpack_require__(6135);

var Array = global.Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ 206:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 7072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 4964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 8544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 4994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(3383).IteratorPrototype);
var create = __webpack_require__(30);
var createPropertyDescriptor = __webpack_require__(9114);
var setToStringTag = __webpack_require__(8003);
var Iterators = __webpack_require__(7497);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 6135:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(4948);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var call = __webpack_require__(6916);
var IS_PURE = __webpack_require__(1913);
var FunctionName = __webpack_require__(6530);
var isCallable = __webpack_require__(614);
var createIteratorConstructor = __webpack_require__(4994);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(7497);
var IteratorsCore = __webpack_require__(3383);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ 8324:
/***/ ((module) => {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 8509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(317);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ 7871:
/***/ ((module) => {

module.exports = typeof window == 'object' && typeof Deno != 'object';


/***/ }),

/***/ 1528:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);
var global = __webpack_require__(7854);

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ 6833:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ 5268:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);
var global = __webpack_require__(7854);

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ 1036:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(8113);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ 9974:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(9662);
var NATIVE_BIND = __webpack_require__(4374);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 1246:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(648);
var getMethod = __webpack_require__(8173);
var Iterators = __webpack_require__(7497);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 8554:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var aCallable = __webpack_require__(9662);
var anObject = __webpack_require__(9670);
var tryToString = __webpack_require__(6330);
var getIteratorMethod = __webpack_require__(1246);

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ 7659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(7497);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 1349:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 4411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var classof = __webpack_require__(648);
var getBuiltIn = __webpack_require__(5005);
var inspectSource = __webpack_require__(2788);

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 7850:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var classof = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var bind = __webpack_require__(9974);
var call = __webpack_require__(6916);
var anObject = __webpack_require__(9670);
var tryToString = __webpack_require__(6330);
var isArrayIteratorMethod = __webpack_require__(7659);
var lengthOfArrayLike = __webpack_require__(6244);
var isPrototypeOf = __webpack_require__(7976);
var getIterator = __webpack_require__(8554);
var getIteratorMethod = __webpack_require__(1246);
var iteratorClose = __webpack_require__(9212);

var TypeError = global.TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 9212:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(6916);
var anObject = __webpack_require__(9670);
var getMethod = __webpack_require__(8173);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 3383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var create = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(9518);
var redefine = __webpack_require__(1320);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 7497:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 5948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var bind = __webpack_require__(9974);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var macrotask = (__webpack_require__(261).set);
var IS_IOS = __webpack_require__(6833);
var IS_IOS_PEBBLE = __webpack_require__(1528);
var IS_WEBOS_WEBKIT = __webpack_require__(1036);
var IS_NODE = __webpack_require__(5268);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ 8523:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(9662);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 3929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var isRegExp = __webpack_require__(7850);

var TypeError = global.TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 9518:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 7674:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2534:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 3702:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var NativePromiseConstructor = __webpack_require__(2492);
var isCallable = __webpack_require__(614);
var isForced = __webpack_require__(4705);
var inspectSource = __webpack_require__(2788);
var wellKnownSymbol = __webpack_require__(5112);
var IS_BROWSER = __webpack_require__(7871);
var IS_PURE = __webpack_require__(1913);
var V8_VERSION = __webpack_require__(7392);

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var SPECIES = wellKnownSymbol('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_PROMISE_REJECTION_EVENT;
});

module.exports = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
  SUBCLASSING: SUBCLASSING
};


/***/ }),

/***/ 2492:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = global.Promise;


/***/ }),

/***/ 9478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var newPromiseCapability = __webpack_require__(8523);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 612:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NativePromiseConstructor = __webpack_require__(2492);
var checkCorrectnessOfIteration = __webpack_require__(7072);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(3702).CONSTRUCTOR);

module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
});


/***/ }),

/***/ 8572:
/***/ ((module) => {

var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;


/***/ }),

/***/ 2248:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(1320);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 4706:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(6916);
var hasOwn = __webpack_require__(2597);
var isPrototypeOf = __webpack_require__(7976);
var regExpFlags = __webpack_require__(7066);

var RegExpPrototype = RegExp.prototype;

module.exports = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
    ? call(regExpFlags, R) : flags;
};


/***/ }),

/***/ 6340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var definePropertyModule = __webpack_require__(3070);
var wellKnownSymbol = __webpack_require__(5112);
var DESCRIPTORS = __webpack_require__(9781);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ 8003:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = (__webpack_require__(3070).f);
var hasOwn = __webpack_require__(2597);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 6707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var aConstructor = __webpack_require__(9483);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ 6091:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var PROPER_FUNCTION_NAME = (__webpack_require__(6530).PROPER);
var fails = __webpack_require__(7293);
var whitespaces = __webpack_require__(1361);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};


/***/ }),

/***/ 3111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var whitespaces = __webpack_require__(1361);

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var apply = __webpack_require__(2104);
var bind = __webpack_require__(9974);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var fails = __webpack_require__(7293);
var html = __webpack_require__(490);
var arraySlice = __webpack_require__(206);
var createElement = __webpack_require__(317);
var validateArgumentsLength = __webpack_require__(8053);
var IS_IOS = __webpack_require__(6833);
var IS_NODE = __webpack_require__(5268);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 8053:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

var TypeError = global.TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 1361:
/***/ ((module) => {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 2772:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es-x/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__(2109);
var uncurryThis = __webpack_require__(1702);
var $IndexOf = (__webpack_require__(1318).indexOf);
var arrayMethodIsStrict = __webpack_require__(9341);

var un$IndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0
      : $IndexOf(this, searchElement, fromIndex);
  }
});


/***/ }),

/***/ 6992:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5656);
var addToUnscopables = __webpack_require__(1223);
var Iterators = __webpack_require__(7497);
var InternalStateModule = __webpack_require__(9909);
var defineProperty = (__webpack_require__(3070).f);
var defineIterator = __webpack_require__(654);
var IS_PURE = __webpack_require__(1913);
var DESCRIPTORS = __webpack_require__(9781);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ 5827:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $reduce = (__webpack_require__(3671).left);
var arrayMethodIsStrict = __webpack_require__(9341);
var CHROME_VERSION = __webpack_require__(7392);
var IS_NODE = __webpack_require__(5268);

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 5069:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var uncurryThis = __webpack_require__(1702);
var isArray = __webpack_require__(1349);

var un$Reverse = uncurryThis([].reverse);
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return un$Reverse(this);
  }
});


/***/ }),

/***/ 821:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var call = __webpack_require__(6916);
var aCallable = __webpack_require__(9662);
var newPromiseCapabilityModule = __webpack_require__(8523);
var perform = __webpack_require__(2534);
var iterate = __webpack_require__(408);
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(612);

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 4164:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var IS_PURE = __webpack_require__(1913);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(3702).CONSTRUCTOR);
var NativePromiseConstructor = __webpack_require__(2492);
var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var redefine = __webpack_require__(1320);

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    redefine(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}


/***/ }),

/***/ 3401:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var IS_PURE = __webpack_require__(1913);
var IS_NODE = __webpack_require__(5268);
var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var redefine = __webpack_require__(1320);
var redefineAll = __webpack_require__(2248);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var setSpecies = __webpack_require__(6340);
var aCallable = __webpack_require__(9662);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var anInstance = __webpack_require__(5787);
var speciesConstructor = __webpack_require__(6707);
var task = (__webpack_require__(261).set);
var microtask = __webpack_require__(5948);
var hostReportErrors = __webpack_require__(842);
var perform = __webpack_require__(2534);
var Queue = __webpack_require__(8572);
var InternalStateModule = __webpack_require__(9909);
var NativePromiseConstructor = __webpack_require__(2492);
var PromiseConstructorDetection = __webpack_require__(3702);
var newPromiseCapabilityModule = __webpack_require__(8523);

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var PromiseConstructor = NativePromiseConstructor;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  Internal.prototype = redefineAll(PromisePrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    // eslint-disable-next-line unicorn/no-thenable -- safe
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);
      else microtask(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    }
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);


/***/ }),

/***/ 8674:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(3401);
__webpack_require__(821);
__webpack_require__(4164);
__webpack_require__(6027);
__webpack_require__(683);
__webpack_require__(6294);


/***/ }),

/***/ 6027:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var call = __webpack_require__(6916);
var aCallable = __webpack_require__(9662);
var newPromiseCapabilityModule = __webpack_require__(8523);
var perform = __webpack_require__(2534);
var iterate = __webpack_require__(408);
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(612);

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 683:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var call = __webpack_require__(6916);
var newPromiseCapabilityModule = __webpack_require__(8523);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(3702).CONSTRUCTOR);

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});


/***/ }),

/***/ 6294:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var getBuiltIn = __webpack_require__(5005);
var IS_PURE = __webpack_require__(1913);
var NativePromiseConstructor = __webpack_require__(2492);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(3702).CONSTRUCTOR);
var promiseResolve = __webpack_require__(9478);

var PromiseConstructorWrapper = getBuiltIn('Promise');
var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
  }
});


/***/ }),

/***/ 9714:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var PROPER_FUNCTION_NAME = (__webpack_require__(6530).PROPER);
var redefine = __webpack_require__(1320);
var anObject = __webpack_require__(9670);
var $toString = __webpack_require__(1340);
var fails = __webpack_require__(7293);
var getRegExpFlags = __webpack_require__(4706);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}


/***/ }),

/***/ 7852:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var correctIsRegExpLogic = __webpack_require__(4964);
var IS_PURE = __webpack_require__(1913);

// eslint-disable-next-line es-x/no-string-prototype-endswith -- safe
var un$EndsWith = uncurryThis(''.endsWith);
var slice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return un$EndsWith
      ? un$EndsWith(that, search, end)
      : slice(that, end - search.length, end) === search;
  }
});


/***/ }),

/***/ 2023:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var uncurryThis = __webpack_require__(1702);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var correctIsRegExpLogic = __webpack_require__(4964);

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ 4723:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(6916);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var anObject = __webpack_require__(9670);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);
var getMethod = __webpack_require__(8173);
var advanceStringIndex = __webpack_require__(1530);
var regExpExec = __webpack_require__(7651);

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ 3123:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var apply = __webpack_require__(2104);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var isRegExp = __webpack_require__(7850);
var anObject = __webpack_require__(9670);
var requireObjectCoercible = __webpack_require__(4488);
var speciesConstructor = __webpack_require__(6707);
var advanceStringIndex = __webpack_require__(1530);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var getMethod = __webpack_require__(8173);
var arraySlice = __webpack_require__(1589);
var callRegExpExec = __webpack_require__(7651);
var regexpExec = __webpack_require__(2261);
var stickyHelpers = __webpack_require__(2999);
var fails = __webpack_require__(7293);

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ 3157:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var correctIsRegExpLogic = __webpack_require__(4964);
var IS_PURE = __webpack_require__(1913);

// eslint-disable-next-line es-x/no-string-prototype-startswith -- safe
var un$StartsWith = uncurryThis(''.startsWith);
var stringSlice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return un$StartsWith
      ? un$StartsWith(that, search, index)
      : stringSlice(that, index, index + search.length) === search;
  }
});


/***/ }),

/***/ 3210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(2109);
var $trim = (__webpack_require__(3111).trim);
var forcedStringTrimMethod = __webpack_require__(6091);

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ 3948:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var DOMIterables = __webpack_require__(8324);
var DOMTokenListPrototype = __webpack_require__(8509);
var ArrayIteratorMethods = __webpack_require__(6992);
var createNonEnumerableProperty = __webpack_require__(8880);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ 75:
/***/ (function(module) {

// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map


/***/ }),

/***/ 4087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var now = __webpack_require__(75)
  , root = typeof window === 'undefined' ? __webpack_require__.g : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}


/***/ }),

/***/ 6131:
/***/ ((module) => {

/*
	Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
	http://www.phpied.com/rgb-color-parser-in-javascript/
*/

module.exports = function(color_string) {
    this.ok = false;
    this.alpha = 1.0;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        rebeccapurple: '663399',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    color_string = simple_colors[color_string] || color_string;
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
            example: ['rgba(123, 234, 45, 0.8)', 'rgba(255,234,245,1.0)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3]),
                    parseFloat(bits[4])
                ];
            }
        },
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            var channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            if (channels.length > 3) {
                this.alpha = channels[3];
            }
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
    this.alpha = (this.alpha < 0) ? 0 : ((this.alpha > 1.0 || isNaN(this.alpha)) ? 1.0 : this.alpha);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toRGBA = function () {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText =
                        'margin: 3px; '
                        + 'border: 1px solid black; '
                        + 'background:' + list_color.toHex() + '; '
                        + 'color:' + list_color.toHex()
                ;
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(
                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
                );
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);

            } catch(e){}
        }
        return xml;

    }

}


/***/ }),

/***/ 5814:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AElement": () => (/* binding */ AElement),
  "AnimateColorElement": () => (/* binding */ AnimateColorElement),
  "AnimateElement": () => (/* binding */ AnimateElement),
  "AnimateTransformElement": () => (/* binding */ AnimateTransformElement),
  "BoundingBox": () => (/* binding */ BoundingBox),
  "CB1": () => (/* binding */ CB1),
  "CB2": () => (/* binding */ CB2),
  "CB3": () => (/* binding */ CB3),
  "CB4": () => (/* binding */ CB4),
  "Canvg": () => (/* binding */ Canvg),
  "CircleElement": () => (/* binding */ CircleElement),
  "ClipPathElement": () => (/* binding */ ClipPathElement),
  "DefsElement": () => (/* binding */ DefsElement),
  "DescElement": () => (/* binding */ DescElement),
  "Document": () => (/* binding */ Document),
  "Element": () => (/* binding */ Element),
  "EllipseElement": () => (/* binding */ EllipseElement),
  "FeColorMatrixElement": () => (/* binding */ FeColorMatrixElement),
  "FeCompositeElement": () => (/* binding */ FeCompositeElement),
  "FeDropShadowElement": () => (/* binding */ FeDropShadowElement),
  "FeGaussianBlurElement": () => (/* binding */ FeGaussianBlurElement),
  "FeMorphologyElement": () => (/* binding */ FeMorphologyElement),
  "FilterElement": () => (/* binding */ FilterElement),
  "Font": () => (/* binding */ Font),
  "FontElement": () => (/* binding */ FontElement),
  "FontFaceElement": () => (/* binding */ FontFaceElement),
  "GElement": () => (/* binding */ GElement),
  "GlyphElement": () => (/* binding */ GlyphElement),
  "GradientElement": () => (/* binding */ GradientElement),
  "ImageElement": () => (/* binding */ ImageElement),
  "LineElement": () => (/* binding */ LineElement),
  "LinearGradientElement": () => (/* binding */ LinearGradientElement),
  "MarkerElement": () => (/* binding */ MarkerElement),
  "MaskElement": () => (/* binding */ MaskElement),
  "Matrix": () => (/* binding */ Matrix),
  "MissingGlyphElement": () => (/* binding */ MissingGlyphElement),
  "Mouse": () => (/* binding */ Mouse),
  "PSEUDO_ZERO": () => (/* binding */ PSEUDO_ZERO),
  "Parser": () => (/* binding */ Parser),
  "PathElement": () => (/* binding */ PathElement),
  "PathParser": () => (/* binding */ PathParser),
  "PatternElement": () => (/* binding */ PatternElement),
  "Point": () => (/* binding */ Point),
  "PolygonElement": () => (/* binding */ PolygonElement),
  "PolylineElement": () => (/* binding */ PolylineElement),
  "Property": () => (/* binding */ Property),
  "QB1": () => (/* binding */ QB1),
  "QB2": () => (/* binding */ QB2),
  "QB3": () => (/* binding */ QB3),
  "RadialGradientElement": () => (/* binding */ RadialGradientElement),
  "RectElement": () => (/* binding */ RectElement),
  "RenderedElement": () => (/* binding */ RenderedElement),
  "Rotate": () => (/* binding */ Rotate),
  "SVGElement": () => (/* binding */ SVGElement),
  "SVGFontLoader": () => (/* binding */ SVGFontLoader),
  "Scale": () => (/* binding */ Scale),
  "Screen": () => (/* binding */ Screen),
  "Skew": () => (/* binding */ Skew),
  "SkewX": () => (/* binding */ SkewX),
  "SkewY": () => (/* binding */ SkewY),
  "StopElement": () => (/* binding */ StopElement),
  "StyleElement": () => (/* binding */ StyleElement),
  "SymbolElement": () => (/* binding */ SymbolElement),
  "TRefElement": () => (/* binding */ TRefElement),
  "TSpanElement": () => (/* binding */ TSpanElement),
  "TextElement": () => (/* binding */ TextElement),
  "TextPathElement": () => (/* binding */ TextPathElement),
  "TitleElement": () => (/* binding */ TitleElement),
  "Transform": () => (/* binding */ Transform),
  "Translate": () => (/* binding */ Translate),
  "UnknownElement": () => (/* binding */ UnknownElement),
  "UseElement": () => (/* binding */ UseElement),
  "ViewPort": () => (/* binding */ ViewPort),
  "compressSpaces": () => (/* binding */ compressSpaces),
  "default": () => (/* binding */ Canvg),
  "getSelectorSpecificity": () => (/* binding */ getSelectorSpecificity),
  "normalizeAttributeName": () => (/* binding */ normalizeAttributeName),
  "normalizeColor": () => (/* binding */ normalizeColor),
  "parseExternalUrl": () => (/* binding */ parseExternalUrl),
  "presets": () => (/* binding */ index),
  "toNumbers": () => (/* binding */ toNumbers),
  "trimLeft": () => (/* binding */ trimLeft),
  "trimRight": () => (/* binding */ trimRight),
  "vectorMagnitude": () => (/* binding */ vectorMagnitude),
  "vectorsAngle": () => (/* binding */ vectorsAngle),
  "vectorsRatio": () => (/* binding */ vectorsRatio)
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__(4723);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5306);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__(3157);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(5827);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.ends-with.js
var es_string_ends_with = __webpack_require__(7852);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(3123);
// EXTERNAL MODULE: ./node_modules/raf/index.js
var raf = __webpack_require__(4087);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(3210);
// EXTERNAL MODULE: ./node_modules/rgbcolor/index.js
var rgbcolor = __webpack_require__(6131);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__(2772);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(2023);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reverse.js
var es_array_reverse = __webpack_require__(5069);
;// CONCATENATED MODULE: ./node_modules/svg-pathdata/lib/SVGPathData.module.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])})(r,e)};function r(r,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}function e(t){var r="";Array.isArray(t)||(t=[t]);for(var e=0;e<t.length;e++){var i=t[e];if(i.type===_.CLOSE_PATH)r+="z";else if(i.type===_.HORIZ_LINE_TO)r+=(i.relative?"h":"H")+i.x;else if(i.type===_.VERT_LINE_TO)r+=(i.relative?"v":"V")+i.y;else if(i.type===_.MOVE_TO)r+=(i.relative?"m":"M")+i.x+" "+i.y;else if(i.type===_.LINE_TO)r+=(i.relative?"l":"L")+i.x+" "+i.y;else if(i.type===_.CURVE_TO)r+=(i.relative?"c":"C")+i.x1+" "+i.y1+" "+i.x2+" "+i.y2+" "+i.x+" "+i.y;else if(i.type===_.SMOOTH_CURVE_TO)r+=(i.relative?"s":"S")+i.x2+" "+i.y2+" "+i.x+" "+i.y;else if(i.type===_.QUAD_TO)r+=(i.relative?"q":"Q")+i.x1+" "+i.y1+" "+i.x+" "+i.y;else if(i.type===_.SMOOTH_QUAD_TO)r+=(i.relative?"t":"T")+i.x+" "+i.y;else{if(i.type!==_.ARC)throw new Error('Unexpected command type "'+i.type+'" at index '+e+".");r+=(i.relative?"a":"A")+i.rX+" "+i.rY+" "+i.xRot+" "+ +i.lArcFlag+" "+ +i.sweepFlag+" "+i.x+" "+i.y}}return r}function i(t,r){var e=t[0],i=t[1];return[e*Math.cos(r)-i*Math.sin(r),e*Math.sin(r)+i*Math.cos(r)]}function a(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];for(var e=0;e<t.length;e++)if("number"!=typeof t[e])throw new Error("assertNumbers arguments["+e+"] is not a number. "+typeof t[e]+" == typeof "+t[e]);return!0}var n=Math.PI;function o(t,r,e){t.lArcFlag=0===t.lArcFlag?0:1,t.sweepFlag=0===t.sweepFlag?0:1;var a=t.rX,o=t.rY,s=t.x,u=t.y;a=Math.abs(t.rX),o=Math.abs(t.rY);var h=i([(r-s)/2,(e-u)/2],-t.xRot/180*n),c=h[0],y=h[1],p=Math.pow(c,2)/Math.pow(a,2)+Math.pow(y,2)/Math.pow(o,2);1<p&&(a*=Math.sqrt(p),o*=Math.sqrt(p)),t.rX=a,t.rY=o;var m=Math.pow(a,2)*Math.pow(y,2)+Math.pow(o,2)*Math.pow(c,2),O=(t.lArcFlag!==t.sweepFlag?1:-1)*Math.sqrt(Math.max(0,(Math.pow(a,2)*Math.pow(o,2)-m)/m)),l=a*y/o*O,T=-o*c/a*O,v=i([l,T],t.xRot/180*n);t.cX=v[0]+(r+s)/2,t.cY=v[1]+(e+u)/2,t.phi1=Math.atan2((y-T)/o,(c-l)/a),t.phi2=Math.atan2((-y-T)/o,(-c-l)/a),0===t.sweepFlag&&t.phi2>t.phi1&&(t.phi2-=2*n),1===t.sweepFlag&&t.phi2<t.phi1&&(t.phi2+=2*n),t.phi1*=180/n,t.phi2*=180/n}function s(t,r,e){a(t,r,e);var i=t*t+r*r-e*e;if(0>i)return[];if(0===i)return[[t*e/(t*t+r*r),r*e/(t*t+r*r)]];var n=Math.sqrt(i);return[[(t*e+r*n)/(t*t+r*r),(r*e-t*n)/(t*t+r*r)],[(t*e-r*n)/(t*t+r*r),(r*e+t*n)/(t*t+r*r)]]}var u,h=Math.PI/180;function c(t,r,e){return(1-e)*t+e*r}function y(t,r,e,i){return t+Math.cos(i/180*n)*r+Math.sin(i/180*n)*e}function p(t,r,e,i){var a=1e-6,n=r-t,o=e-r,s=3*n+3*(i-e)-6*o,u=6*(o-n),h=3*n;return Math.abs(s)<a?[-h/u]:function(t,r,e){void 0===e&&(e=1e-6);var i=t*t/4-r;if(i<-e)return[];if(i<=e)return[-t/2];var a=Math.sqrt(i);return[-t/2-a,-t/2+a]}(u/s,h/s,a)}function m(t,r,e,i,a){var n=1-a;return t*(n*n*n)+r*(3*n*n*a)+e*(3*n*a*a)+i*(a*a*a)}!function(t){function r(){return u((function(t,r,e){return t.relative&&(void 0!==t.x1&&(t.x1+=r),void 0!==t.y1&&(t.y1+=e),void 0!==t.x2&&(t.x2+=r),void 0!==t.y2&&(t.y2+=e),void 0!==t.x&&(t.x+=r),void 0!==t.y&&(t.y+=e),t.relative=!1),t}))}function e(){var t=NaN,r=NaN,e=NaN,i=NaN;return u((function(a,n,o){return a.type&_.SMOOTH_CURVE_TO&&(a.type=_.CURVE_TO,t=isNaN(t)?n:t,r=isNaN(r)?o:r,a.x1=a.relative?n-t:2*n-t,a.y1=a.relative?o-r:2*o-r),a.type&_.CURVE_TO?(t=a.relative?n+a.x2:a.x2,r=a.relative?o+a.y2:a.y2):(t=NaN,r=NaN),a.type&_.SMOOTH_QUAD_TO&&(a.type=_.QUAD_TO,e=isNaN(e)?n:e,i=isNaN(i)?o:i,a.x1=a.relative?n-e:2*n-e,a.y1=a.relative?o-i:2*o-i),a.type&_.QUAD_TO?(e=a.relative?n+a.x1:a.x1,i=a.relative?o+a.y1:a.y1):(e=NaN,i=NaN),a}))}function n(){var t=NaN,r=NaN;return u((function(e,i,a){if(e.type&_.SMOOTH_QUAD_TO&&(e.type=_.QUAD_TO,t=isNaN(t)?i:t,r=isNaN(r)?a:r,e.x1=e.relative?i-t:2*i-t,e.y1=e.relative?a-r:2*a-r),e.type&_.QUAD_TO){t=e.relative?i+e.x1:e.x1,r=e.relative?a+e.y1:e.y1;var n=e.x1,o=e.y1;e.type=_.CURVE_TO,e.x1=((e.relative?0:i)+2*n)/3,e.y1=((e.relative?0:a)+2*o)/3,e.x2=(e.x+2*n)/3,e.y2=(e.y+2*o)/3}else t=NaN,r=NaN;return e}))}function u(t){var r=0,e=0,i=NaN,a=NaN;return function(n){if(isNaN(i)&&!(n.type&_.MOVE_TO))throw new Error("path must start with moveto");var o=t(n,r,e,i,a);return n.type&_.CLOSE_PATH&&(r=i,e=a),void 0!==n.x&&(r=n.relative?r+n.x:n.x),void 0!==n.y&&(e=n.relative?e+n.y:n.y),n.type&_.MOVE_TO&&(i=r,a=e),o}}function O(t,r,e,i,n,o){return a(t,r,e,i,n,o),u((function(a,s,u,h){var c=a.x1,y=a.x2,p=a.relative&&!isNaN(h),m=void 0!==a.x?a.x:p?0:s,O=void 0!==a.y?a.y:p?0:u;function l(t){return t*t}a.type&_.HORIZ_LINE_TO&&0!==r&&(a.type=_.LINE_TO,a.y=a.relative?0:u),a.type&_.VERT_LINE_TO&&0!==e&&(a.type=_.LINE_TO,a.x=a.relative?0:s),void 0!==a.x&&(a.x=a.x*t+O*e+(p?0:n)),void 0!==a.y&&(a.y=m*r+a.y*i+(p?0:o)),void 0!==a.x1&&(a.x1=a.x1*t+a.y1*e+(p?0:n)),void 0!==a.y1&&(a.y1=c*r+a.y1*i+(p?0:o)),void 0!==a.x2&&(a.x2=a.x2*t+a.y2*e+(p?0:n)),void 0!==a.y2&&(a.y2=y*r+a.y2*i+(p?0:o));var T=t*i-r*e;if(void 0!==a.xRot&&(1!==t||0!==r||0!==e||1!==i))if(0===T)delete a.rX,delete a.rY,delete a.xRot,delete a.lArcFlag,delete a.sweepFlag,a.type=_.LINE_TO;else{var v=a.xRot*Math.PI/180,f=Math.sin(v),N=Math.cos(v),x=1/l(a.rX),d=1/l(a.rY),E=l(N)*x+l(f)*d,A=2*f*N*(x-d),C=l(f)*x+l(N)*d,M=E*i*i-A*r*i+C*r*r,R=A*(t*i+r*e)-2*(E*e*i+C*t*r),g=E*e*e-A*t*e+C*t*t,I=(Math.atan2(R,M-g)+Math.PI)%Math.PI/2,S=Math.sin(I),L=Math.cos(I);a.rX=Math.abs(T)/Math.sqrt(M*l(L)+R*S*L+g*l(S)),a.rY=Math.abs(T)/Math.sqrt(M*l(S)-R*S*L+g*l(L)),a.xRot=180*I/Math.PI}return void 0!==a.sweepFlag&&0>T&&(a.sweepFlag=+!a.sweepFlag),a}))}function l(){return function(t){var r={};for(var e in t)r[e]=t[e];return r}}t.ROUND=function(t){function r(r){return Math.round(r*t)/t}return void 0===t&&(t=1e13),a(t),function(t){return void 0!==t.x1&&(t.x1=r(t.x1)),void 0!==t.y1&&(t.y1=r(t.y1)),void 0!==t.x2&&(t.x2=r(t.x2)),void 0!==t.y2&&(t.y2=r(t.y2)),void 0!==t.x&&(t.x=r(t.x)),void 0!==t.y&&(t.y=r(t.y)),void 0!==t.rX&&(t.rX=r(t.rX)),void 0!==t.rY&&(t.rY=r(t.rY)),t}},t.TO_ABS=r,t.TO_REL=function(){return u((function(t,r,e){return t.relative||(void 0!==t.x1&&(t.x1-=r),void 0!==t.y1&&(t.y1-=e),void 0!==t.x2&&(t.x2-=r),void 0!==t.y2&&(t.y2-=e),void 0!==t.x&&(t.x-=r),void 0!==t.y&&(t.y-=e),t.relative=!0),t}))},t.NORMALIZE_HVZ=function(t,r,e){return void 0===t&&(t=!0),void 0===r&&(r=!0),void 0===e&&(e=!0),u((function(i,a,n,o,s){if(isNaN(o)&&!(i.type&_.MOVE_TO))throw new Error("path must start with moveto");return r&&i.type&_.HORIZ_LINE_TO&&(i.type=_.LINE_TO,i.y=i.relative?0:n),e&&i.type&_.VERT_LINE_TO&&(i.type=_.LINE_TO,i.x=i.relative?0:a),t&&i.type&_.CLOSE_PATH&&(i.type=_.LINE_TO,i.x=i.relative?o-a:o,i.y=i.relative?s-n:s),i.type&_.ARC&&(0===i.rX||0===i.rY)&&(i.type=_.LINE_TO,delete i.rX,delete i.rY,delete i.xRot,delete i.lArcFlag,delete i.sweepFlag),i}))},t.NORMALIZE_ST=e,t.QT_TO_C=n,t.INFO=u,t.SANITIZE=function(t){void 0===t&&(t=0),a(t);var r=NaN,e=NaN,i=NaN,n=NaN;return u((function(a,o,s,u,h){var c=Math.abs,y=!1,p=0,m=0;if(a.type&_.SMOOTH_CURVE_TO&&(p=isNaN(r)?0:o-r,m=isNaN(e)?0:s-e),a.type&(_.CURVE_TO|_.SMOOTH_CURVE_TO)?(r=a.relative?o+a.x2:a.x2,e=a.relative?s+a.y2:a.y2):(r=NaN,e=NaN),a.type&_.SMOOTH_QUAD_TO?(i=isNaN(i)?o:2*o-i,n=isNaN(n)?s:2*s-n):a.type&_.QUAD_TO?(i=a.relative?o+a.x1:a.x1,n=a.relative?s+a.y1:a.y2):(i=NaN,n=NaN),a.type&_.LINE_COMMANDS||a.type&_.ARC&&(0===a.rX||0===a.rY||!a.lArcFlag)||a.type&_.CURVE_TO||a.type&_.SMOOTH_CURVE_TO||a.type&_.QUAD_TO||a.type&_.SMOOTH_QUAD_TO){var O=void 0===a.x?0:a.relative?a.x:a.x-o,l=void 0===a.y?0:a.relative?a.y:a.y-s;p=isNaN(i)?void 0===a.x1?p:a.relative?a.x:a.x1-o:i-o,m=isNaN(n)?void 0===a.y1?m:a.relative?a.y:a.y1-s:n-s;var T=void 0===a.x2?0:a.relative?a.x:a.x2-o,v=void 0===a.y2?0:a.relative?a.y:a.y2-s;c(O)<=t&&c(l)<=t&&c(p)<=t&&c(m)<=t&&c(T)<=t&&c(v)<=t&&(y=!0)}return a.type&_.CLOSE_PATH&&c(o-u)<=t&&c(s-h)<=t&&(y=!0),y?[]:a}))},t.MATRIX=O,t.ROTATE=function(t,r,e){void 0===r&&(r=0),void 0===e&&(e=0),a(t,r,e);var i=Math.sin(t),n=Math.cos(t);return O(n,i,-i,n,r-r*n+e*i,e-r*i-e*n)},t.TRANSLATE=function(t,r){return void 0===r&&(r=0),a(t,r),O(1,0,0,1,t,r)},t.SCALE=function(t,r){return void 0===r&&(r=t),a(t,r),O(t,0,0,r,0,0)},t.SKEW_X=function(t){return a(t),O(1,0,Math.atan(t),1,0,0)},t.SKEW_Y=function(t){return a(t),O(1,Math.atan(t),0,1,0,0)},t.X_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),a(t),O(-1,0,0,1,t,0)},t.Y_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),a(t),O(1,0,0,-1,0,t)},t.A_TO_C=function(){return u((function(t,r,e){return _.ARC===t.type?function(t,r,e){var a,n,s,u;t.cX||o(t,r,e);for(var y=Math.min(t.phi1,t.phi2),p=Math.max(t.phi1,t.phi2)-y,m=Math.ceil(p/90),O=new Array(m),l=r,T=e,v=0;v<m;v++){var f=c(t.phi1,t.phi2,v/m),N=c(t.phi1,t.phi2,(v+1)/m),x=N-f,d=4/3*Math.tan(x*h/4),E=[Math.cos(f*h)-d*Math.sin(f*h),Math.sin(f*h)+d*Math.cos(f*h)],A=E[0],C=E[1],M=[Math.cos(N*h),Math.sin(N*h)],R=M[0],g=M[1],I=[R+d*Math.sin(N*h),g-d*Math.cos(N*h)],S=I[0],L=I[1];O[v]={relative:t.relative,type:_.CURVE_TO};var H=function(r,e){var a=i([r*t.rX,e*t.rY],t.xRot),n=a[0],o=a[1];return[t.cX+n,t.cY+o]};a=H(A,C),O[v].x1=a[0],O[v].y1=a[1],n=H(S,L),O[v].x2=n[0],O[v].y2=n[1],s=H(R,g),O[v].x=s[0],O[v].y=s[1],t.relative&&(O[v].x1-=l,O[v].y1-=T,O[v].x2-=l,O[v].y2-=T,O[v].x-=l,O[v].y-=T),l=(u=[O[v].x,O[v].y])[0],T=u[1]}return O}(t,t.relative?0:r,t.relative?0:e):t}))},t.ANNOTATE_ARCS=function(){return u((function(t,r,e){return t.relative&&(r=0,e=0),_.ARC===t.type&&o(t,r,e),t}))},t.CLONE=l,t.CALCULATE_BOUNDS=function(){var t=function(t){var r={};for(var e in t)r[e]=t[e];return r},i=r(),a=n(),h=e(),c=u((function(r,e,n){var u=h(a(i(t(r))));function O(t){t>c.maxX&&(c.maxX=t),t<c.minX&&(c.minX=t)}function l(t){t>c.maxY&&(c.maxY=t),t<c.minY&&(c.minY=t)}if(u.type&_.DRAWING_COMMANDS&&(O(e),l(n)),u.type&_.HORIZ_LINE_TO&&O(u.x),u.type&_.VERT_LINE_TO&&l(u.y),u.type&_.LINE_TO&&(O(u.x),l(u.y)),u.type&_.CURVE_TO){O(u.x),l(u.y);for(var T=0,v=p(e,u.x1,u.x2,u.x);T<v.length;T++){0<(w=v[T])&&1>w&&O(m(e,u.x1,u.x2,u.x,w))}for(var f=0,N=p(n,u.y1,u.y2,u.y);f<N.length;f++){0<(w=N[f])&&1>w&&l(m(n,u.y1,u.y2,u.y,w))}}if(u.type&_.ARC){O(u.x),l(u.y),o(u,e,n);for(var x=u.xRot/180*Math.PI,d=Math.cos(x)*u.rX,E=Math.sin(x)*u.rX,A=-Math.sin(x)*u.rY,C=Math.cos(x)*u.rY,M=u.phi1<u.phi2?[u.phi1,u.phi2]:-180>u.phi2?[u.phi2+360,u.phi1+360]:[u.phi2,u.phi1],R=M[0],g=M[1],I=function(t){var r=t[0],e=t[1],i=180*Math.atan2(e,r)/Math.PI;return i<R?i+360:i},S=0,L=s(A,-d,0).map(I);S<L.length;S++){(w=L[S])>R&&w<g&&O(y(u.cX,d,A,w))}for(var H=0,U=s(C,-E,0).map(I);H<U.length;H++){var w;(w=U[H])>R&&w<g&&l(y(u.cY,E,C,w))}}return r}));return c.minX=1/0,c.maxX=-1/0,c.minY=1/0,c.maxY=-1/0,c}}(u||(u={}));var O,l=function(){function t(){}return t.prototype.round=function(t){return this.transform(u.ROUND(t))},t.prototype.toAbs=function(){return this.transform(u.TO_ABS())},t.prototype.toRel=function(){return this.transform(u.TO_REL())},t.prototype.normalizeHVZ=function(t,r,e){return this.transform(u.NORMALIZE_HVZ(t,r,e))},t.prototype.normalizeST=function(){return this.transform(u.NORMALIZE_ST())},t.prototype.qtToC=function(){return this.transform(u.QT_TO_C())},t.prototype.aToC=function(){return this.transform(u.A_TO_C())},t.prototype.sanitize=function(t){return this.transform(u.SANITIZE(t))},t.prototype.translate=function(t,r){return this.transform(u.TRANSLATE(t,r))},t.prototype.scale=function(t,r){return this.transform(u.SCALE(t,r))},t.prototype.rotate=function(t,r,e){return this.transform(u.ROTATE(t,r,e))},t.prototype.matrix=function(t,r,e,i,a,n){return this.transform(u.MATRIX(t,r,e,i,a,n))},t.prototype.skewX=function(t){return this.transform(u.SKEW_X(t))},t.prototype.skewY=function(t){return this.transform(u.SKEW_Y(t))},t.prototype.xSymmetry=function(t){return this.transform(u.X_AXIS_SYMMETRY(t))},t.prototype.ySymmetry=function(t){return this.transform(u.Y_AXIS_SYMMETRY(t))},t.prototype.annotateArcs=function(){return this.transform(u.ANNOTATE_ARCS())},t}(),T=function(t){return" "===t||"\t"===t||"\r"===t||"\n"===t},v=function(t){return"0".charCodeAt(0)<=t.charCodeAt(0)&&t.charCodeAt(0)<="9".charCodeAt(0)},f=function(t){function e(){var r=t.call(this)||this;return r.curNumber="",r.curCommandType=-1,r.curCommandRelative=!1,r.canParseCommandOrComma=!0,r.curNumberHasExp=!1,r.curNumberHasExpDigits=!1,r.curNumberHasDecimal=!1,r.curArgs=[],r}return r(e,t),e.prototype.finish=function(t){if(void 0===t&&(t=[]),this.parse(" ",t),0!==this.curArgs.length||!this.canParseCommandOrComma)throw new SyntaxError("Unterminated command at the path end.");return t},e.prototype.parse=function(t,r){var e=this;void 0===r&&(r=[]);for(var i=function(t){r.push(t),e.curArgs.length=0,e.canParseCommandOrComma=!0},a=0;a<t.length;a++){var n=t[a],o=!(this.curCommandType!==_.ARC||3!==this.curArgs.length&&4!==this.curArgs.length||1!==this.curNumber.length||"0"!==this.curNumber&&"1"!==this.curNumber),s=v(n)&&("0"===this.curNumber&&"0"===n||o);if(!v(n)||s)if("e"!==n&&"E"!==n)if("-"!==n&&"+"!==n||!this.curNumberHasExp||this.curNumberHasExpDigits)if("."!==n||this.curNumberHasExp||this.curNumberHasDecimal||o){if(this.curNumber&&-1!==this.curCommandType){var u=Number(this.curNumber);if(isNaN(u))throw new SyntaxError("Invalid number ending at "+a);if(this.curCommandType===_.ARC)if(0===this.curArgs.length||1===this.curArgs.length){if(0>u)throw new SyntaxError('Expected positive number, got "'+u+'" at index "'+a+'"')}else if((3===this.curArgs.length||4===this.curArgs.length)&&"0"!==this.curNumber&&"1"!==this.curNumber)throw new SyntaxError('Expected a flag, got "'+this.curNumber+'" at index "'+a+'"');this.curArgs.push(u),this.curArgs.length===N[this.curCommandType]&&(_.HORIZ_LINE_TO===this.curCommandType?i({type:_.HORIZ_LINE_TO,relative:this.curCommandRelative,x:u}):_.VERT_LINE_TO===this.curCommandType?i({type:_.VERT_LINE_TO,relative:this.curCommandRelative,y:u}):this.curCommandType===_.MOVE_TO||this.curCommandType===_.LINE_TO||this.curCommandType===_.SMOOTH_QUAD_TO?(i({type:this.curCommandType,relative:this.curCommandRelative,x:this.curArgs[0],y:this.curArgs[1]}),_.MOVE_TO===this.curCommandType&&(this.curCommandType=_.LINE_TO)):this.curCommandType===_.CURVE_TO?i({type:_.CURVE_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x2:this.curArgs[2],y2:this.curArgs[3],x:this.curArgs[4],y:this.curArgs[5]}):this.curCommandType===_.SMOOTH_CURVE_TO?i({type:_.SMOOTH_CURVE_TO,relative:this.curCommandRelative,x2:this.curArgs[0],y2:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===_.QUAD_TO?i({type:_.QUAD_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===_.ARC&&i({type:_.ARC,relative:this.curCommandRelative,rX:this.curArgs[0],rY:this.curArgs[1],xRot:this.curArgs[2],lArcFlag:this.curArgs[3],sweepFlag:this.curArgs[4],x:this.curArgs[5],y:this.curArgs[6]})),this.curNumber="",this.curNumberHasExpDigits=!1,this.curNumberHasExp=!1,this.curNumberHasDecimal=!1,this.canParseCommandOrComma=!0}if(!T(n))if(","===n&&this.canParseCommandOrComma)this.canParseCommandOrComma=!1;else if("+"!==n&&"-"!==n&&"."!==n)if(s)this.curNumber=n,this.curNumberHasDecimal=!1;else{if(0!==this.curArgs.length)throw new SyntaxError("Unterminated command at index "+a+".");if(!this.canParseCommandOrComma)throw new SyntaxError('Unexpected character "'+n+'" at index '+a+". Command cannot follow comma");if(this.canParseCommandOrComma=!1,"z"!==n&&"Z"!==n)if("h"===n||"H"===n)this.curCommandType=_.HORIZ_LINE_TO,this.curCommandRelative="h"===n;else if("v"===n||"V"===n)this.curCommandType=_.VERT_LINE_TO,this.curCommandRelative="v"===n;else if("m"===n||"M"===n)this.curCommandType=_.MOVE_TO,this.curCommandRelative="m"===n;else if("l"===n||"L"===n)this.curCommandType=_.LINE_TO,this.curCommandRelative="l"===n;else if("c"===n||"C"===n)this.curCommandType=_.CURVE_TO,this.curCommandRelative="c"===n;else if("s"===n||"S"===n)this.curCommandType=_.SMOOTH_CURVE_TO,this.curCommandRelative="s"===n;else if("q"===n||"Q"===n)this.curCommandType=_.QUAD_TO,this.curCommandRelative="q"===n;else if("t"===n||"T"===n)this.curCommandType=_.SMOOTH_QUAD_TO,this.curCommandRelative="t"===n;else{if("a"!==n&&"A"!==n)throw new SyntaxError('Unexpected character "'+n+'" at index '+a+".");this.curCommandType=_.ARC,this.curCommandRelative="a"===n}else r.push({type:_.CLOSE_PATH}),this.canParseCommandOrComma=!0,this.curCommandType=-1}else this.curNumber=n,this.curNumberHasDecimal="."===n}else this.curNumber+=n,this.curNumberHasDecimal=!0;else this.curNumber+=n;else this.curNumber+=n,this.curNumberHasExp=!0;else this.curNumber+=n,this.curNumberHasExpDigits=this.curNumberHasExp}return r},e.prototype.transform=function(t){return Object.create(this,{parse:{value:function(r,e){void 0===e&&(e=[]);for(var i=0,a=Object.getPrototypeOf(this).parse.call(this,r);i<a.length;i++){var n=a[i],o=t(n);Array.isArray(o)?e.push.apply(e,o):e.push(o)}return e}}})},e}(l),_=function(t){function i(r){var e=t.call(this)||this;return e.commands="string"==typeof r?i.parse(r):r,e}return r(i,t),i.prototype.encode=function(){return i.encode(this.commands)},i.prototype.getBounds=function(){var t=u.CALCULATE_BOUNDS();return this.transform(t),t},i.prototype.transform=function(t){for(var r=[],e=0,i=this.commands;e<i.length;e++){var a=t(i[e]);Array.isArray(a)?r.push.apply(r,a):r.push(a)}return this.commands=r,this},i.encode=function(t){return e(t)},i.parse=function(t){var r=new f,e=[];return r.parse(t,e),r.finish(e),e},i.CLOSE_PATH=1,i.MOVE_TO=2,i.HORIZ_LINE_TO=4,i.VERT_LINE_TO=8,i.LINE_TO=16,i.CURVE_TO=32,i.SMOOTH_CURVE_TO=64,i.QUAD_TO=128,i.SMOOTH_QUAD_TO=256,i.ARC=512,i.LINE_COMMANDS=i.LINE_TO|i.HORIZ_LINE_TO|i.VERT_LINE_TO,i.DRAWING_COMMANDS=i.HORIZ_LINE_TO|i.VERT_LINE_TO|i.LINE_TO|i.CURVE_TO|i.SMOOTH_CURVE_TO|i.QUAD_TO|i.SMOOTH_QUAD_TO|i.ARC,i}(l),N=((O={})[_.MOVE_TO]=2,O[_.LINE_TO]=2,O[_.HORIZ_LINE_TO]=1,O[_.VERT_LINE_TO]=1,O[_.CLOSE_PATH]=0,O[_.QUAD_TO]=4,O[_.SMOOTH_QUAD_TO]=2,O[_.CURVE_TO]=6,O[_.SMOOTH_CURVE_TO]=4,O[_.ARC]=7,O);
//# sourceMappingURL=SVGPathData.module.js.map

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(9714);
;// CONCATENATED MODULE: ./node_modules/stackblur-canvas/dist/stackblur-es.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/* eslint-disable no-bitwise -- used for calculations */

/* eslint-disable unicorn/prefer-query-selector -- aiming at
  backward-compatibility */

/**
* StackBlur - a fast almost Gaussian Blur For Canvas
*
* In case you find this class useful - especially in commercial projects -
* I am not totally unhappy for a small donation to my PayPal account
* mario@quasimondo.de
*
* Or support me on flattr:
* {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}.
*
* @module StackBlur
* @author Mario Klingemann
* Contact: mario@quasimondo.com
* Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
* Twitter: @quasimondo
*
* @copyright (c) 2010 Mario Klingemann
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
var mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
var shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
/**
 * @param {string|HTMLImageElement} img
 * @param {string|HTMLCanvasElement} canvas
 * @param {Float} radius
 * @param {boolean} blurAlphaChannel
 * @param {boolean} useOffset
 * @param {boolean} skipStyles
 * @returns {undefined}
 */

function processImage(img, canvas, radius, blurAlphaChannel, useOffset, skipStyles) {
  if (typeof img === 'string') {
    img = document.getElementById(img);
  }

  if (!img || !('naturalWidth' in img)) {
    return;
  }

  var dimensionType = useOffset ? 'offset' : 'natural';
  var w = img[dimensionType + 'Width'];
  var h = img[dimensionType + 'Height'];

  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }

  if (!canvas || !('getContext' in canvas)) {
    return;
  }

  if (!skipStyles) {
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  }

  canvas.width = w;
  canvas.height = h;
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, w, h);
  context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, w, h);

  if (isNaN(radius) || radius < 1) {
    return;
  }

  if (blurAlphaChannel) {
    processCanvasRGBA(canvas, 0, 0, w, h, radius);
  } else {
    processCanvasRGB(canvas, 0, 0, w, h, radius);
  }
}
/**
 * @param {string|HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @throws {Error|TypeError}
 * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
 */


function getImageDataFromCanvas(canvas, topX, topY, width, height) {
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }

  if (!canvas || _typeof(canvas) !== 'object' || !('getContext' in canvas)) {
    throw new TypeError('Expecting canvas with `getContext` method ' + 'in processCanvasRGB(A) calls!');
  }

  var context = canvas.getContext('2d');

  try {
    return context.getImageData(topX, topY, width, height);
  } catch (e) {
    throw new Error('unable to access image data: ' + e);
  }
}
/**
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {undefined}
 */


function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
  if (isNaN(radius) || radius < 1) {
    return;
  }

  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
  imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
  canvas.getContext('2d').putImageData(imageData, topX, topY);
}
/**
 * @param {ImageData} imageData
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {ImageData}
 */


function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
  var pixels = imageData.data;
  var div = 2 * radius + 1; // const w4 = width << 2;

  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;
  var stackEnd;

  for (var i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();

    if (i === radiusPlus1) {
      stackEnd = stack;
    }
  }

  stack.next = stackStart;
  var stackIn = null,
      stackOut = null,
      yw = 0,
      yi = 0;
  var mulSum = mulTable[radius];
  var shgSum = shgTable[radius];

  for (var y = 0; y < height; y++) {
    stack = stackStart;
    var pr = pixels[yi],
        pg = pixels[yi + 1],
        pb = pixels[yi + 2],
        pa = pixels[yi + 3];

    for (var _i = 0; _i < radiusPlus1; _i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }

    var rInSum = 0,
        gInSum = 0,
        bInSum = 0,
        aInSum = 0,
        rOutSum = radiusPlus1 * pr,
        gOutSum = radiusPlus1 * pg,
        bOutSum = radiusPlus1 * pb,
        aOutSum = radiusPlus1 * pa,
        rSum = sumFactor * pr,
        gSum = sumFactor * pg,
        bSum = sumFactor * pb,
        aSum = sumFactor * pa;

    for (var _i2 = 1; _i2 < radiusPlus1; _i2++) {
      var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
      var r = pixels[p],
          g = pixels[p + 1],
          b = pixels[p + 2],
          a = pixels[p + 3];
      var rbs = radiusPlus1 - _i2;
      rSum += (stack.r = r) * rbs;
      gSum += (stack.g = g) * rbs;
      bSum += (stack.b = b) * rbs;
      aSum += (stack.a = a) * rbs;
      rInSum += r;
      gInSum += g;
      bInSum += b;
      aInSum += a;
      stack = stack.next;
    }

    stackIn = stackStart;
    stackOut = stackEnd;

    for (var x = 0; x < width; x++) {
      var paInitial = aSum * mulSum >> shgSum;
      pixels[yi + 3] = paInitial;

      if (paInitial !== 0) {
        var _a2 = 255 / paInitial;

        pixels[yi] = (rSum * mulSum >> shgSum) * _a2;
        pixels[yi + 1] = (gSum * mulSum >> shgSum) * _a2;
        pixels[yi + 2] = (bSum * mulSum >> shgSum) * _a2;
      } else {
        pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
      }

      rSum -= rOutSum;
      gSum -= gOutSum;
      bSum -= bOutSum;
      aSum -= aOutSum;
      rOutSum -= stackIn.r;
      gOutSum -= stackIn.g;
      bOutSum -= stackIn.b;
      aOutSum -= stackIn.a;

      var _p = x + radius + 1;

      _p = yw + (_p < widthMinus1 ? _p : widthMinus1) << 2;
      rInSum += stackIn.r = pixels[_p];
      gInSum += stackIn.g = pixels[_p + 1];
      bInSum += stackIn.b = pixels[_p + 2];
      aInSum += stackIn.a = pixels[_p + 3];
      rSum += rInSum;
      gSum += gInSum;
      bSum += bInSum;
      aSum += aInSum;
      stackIn = stackIn.next;
      var _stackOut = stackOut,
          _r = _stackOut.r,
          _g = _stackOut.g,
          _b = _stackOut.b,
          _a = _stackOut.a;
      rOutSum += _r;
      gOutSum += _g;
      bOutSum += _b;
      aOutSum += _a;
      rInSum -= _r;
      gInSum -= _g;
      bInSum -= _b;
      aInSum -= _a;
      stackOut = stackOut.next;
      yi += 4;
    }

    yw += width;
  }

  for (var _x = 0; _x < width; _x++) {
    yi = _x << 2;

    var _pr = pixels[yi],
        _pg = pixels[yi + 1],
        _pb = pixels[yi + 2],
        _pa = pixels[yi + 3],
        _rOutSum = radiusPlus1 * _pr,
        _gOutSum = radiusPlus1 * _pg,
        _bOutSum = radiusPlus1 * _pb,
        _aOutSum = radiusPlus1 * _pa,
        _rSum = sumFactor * _pr,
        _gSum = sumFactor * _pg,
        _bSum = sumFactor * _pb,
        _aSum = sumFactor * _pa;

    stack = stackStart;

    for (var _i3 = 0; _i3 < radiusPlus1; _i3++) {
      stack.r = _pr;
      stack.g = _pg;
      stack.b = _pb;
      stack.a = _pa;
      stack = stack.next;
    }

    var yp = width;
    var _gInSum = 0,
        _bInSum = 0,
        _aInSum = 0,
        _rInSum = 0;

    for (var _i4 = 1; _i4 <= radius; _i4++) {
      yi = yp + _x << 2;

      var _rbs = radiusPlus1 - _i4;

      _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
      _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
      _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
      _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
      _rInSum += _pr;
      _gInSum += _pg;
      _bInSum += _pb;
      _aInSum += _pa;
      stack = stack.next;

      if (_i4 < heightMinus1) {
        yp += width;
      }
    }

    yi = _x;
    stackIn = stackStart;
    stackOut = stackEnd;

    for (var _y = 0; _y < height; _y++) {
      var _p2 = yi << 2;

      pixels[_p2 + 3] = _pa = _aSum * mulSum >> shgSum;

      if (_pa > 0) {
        _pa = 255 / _pa;
        pixels[_p2] = (_rSum * mulSum >> shgSum) * _pa;
        pixels[_p2 + 1] = (_gSum * mulSum >> shgSum) * _pa;
        pixels[_p2 + 2] = (_bSum * mulSum >> shgSum) * _pa;
      } else {
        pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
      }

      _rSum -= _rOutSum;
      _gSum -= _gOutSum;
      _bSum -= _bOutSum;
      _aSum -= _aOutSum;
      _rOutSum -= stackIn.r;
      _gOutSum -= stackIn.g;
      _bOutSum -= stackIn.b;
      _aOutSum -= stackIn.a;
      _p2 = _x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width << 2;
      _rSum += _rInSum += stackIn.r = pixels[_p2];
      _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
      _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
      _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
      stackIn = stackIn.next;
      _rOutSum += _pr = stackOut.r;
      _gOutSum += _pg = stackOut.g;
      _bOutSum += _pb = stackOut.b;
      _aOutSum += _pa = stackOut.a;
      _rInSum -= _pr;
      _gInSum -= _pg;
      _bInSum -= _pb;
      _aInSum -= _pa;
      stackOut = stackOut.next;
      yi += width;
    }
  }

  return imageData;
}
/**
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {undefined}
 */


function processCanvasRGB(canvas, topX, topY, width, height, radius) {
  if (isNaN(radius) || radius < 1) {
    return;
  }

  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
  imageData = processImageDataRGB(imageData, topX, topY, width, height, radius);
  canvas.getContext('2d').putImageData(imageData, topX, topY);
}
/**
 * @param {ImageData} imageData
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {ImageData}
 */


function processImageDataRGB(imageData, topX, topY, width, height, radius) {
  var pixels = imageData.data;
  var div = 2 * radius + 1; // const w4 = width << 2;

  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;
  var stackEnd;

  for (var i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();

    if (i === radiusPlus1) {
      stackEnd = stack;
    }
  }

  stack.next = stackStart;
  var stackIn = null;
  var stackOut = null;
  var mulSum = mulTable[radius];
  var shgSum = shgTable[radius];
  var p, rbs;
  var yw = 0,
      yi = 0;

  for (var y = 0; y < height; y++) {
    var pr = pixels[yi],
        pg = pixels[yi + 1],
        pb = pixels[yi + 2],
        rOutSum = radiusPlus1 * pr,
        gOutSum = radiusPlus1 * pg,
        bOutSum = radiusPlus1 * pb,
        rSum = sumFactor * pr,
        gSum = sumFactor * pg,
        bSum = sumFactor * pb;
    stack = stackStart;

    for (var _i5 = 0; _i5 < radiusPlus1; _i5++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }

    var rInSum = 0,
        gInSum = 0,
        bInSum = 0;

    for (var _i6 = 1; _i6 < radiusPlus1; _i6++) {
      p = yi + ((widthMinus1 < _i6 ? widthMinus1 : _i6) << 2);
      rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - _i6);
      gSum += (stack.g = pg = pixels[p + 1]) * rbs;
      bSum += (stack.b = pb = pixels[p + 2]) * rbs;
      rInSum += pr;
      gInSum += pg;
      bInSum += pb;
      stack = stack.next;
    }

    stackIn = stackStart;
    stackOut = stackEnd;

    for (var x = 0; x < width; x++) {
      pixels[yi] = rSum * mulSum >> shgSum;
      pixels[yi + 1] = gSum * mulSum >> shgSum;
      pixels[yi + 2] = bSum * mulSum >> shgSum;
      rSum -= rOutSum;
      gSum -= gOutSum;
      bSum -= bOutSum;
      rOutSum -= stackIn.r;
      gOutSum -= stackIn.g;
      bOutSum -= stackIn.b;
      p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
      rInSum += stackIn.r = pixels[p];
      gInSum += stackIn.g = pixels[p + 1];
      bInSum += stackIn.b = pixels[p + 2];
      rSum += rInSum;
      gSum += gInSum;
      bSum += bInSum;
      stackIn = stackIn.next;
      rOutSum += pr = stackOut.r;
      gOutSum += pg = stackOut.g;
      bOutSum += pb = stackOut.b;
      rInSum -= pr;
      gInSum -= pg;
      bInSum -= pb;
      stackOut = stackOut.next;
      yi += 4;
    }

    yw += width;
  }

  for (var _x2 = 0; _x2 < width; _x2++) {
    yi = _x2 << 2;

    var _pr2 = pixels[yi],
        _pg2 = pixels[yi + 1],
        _pb2 = pixels[yi + 2],
        _rOutSum2 = radiusPlus1 * _pr2,
        _gOutSum2 = radiusPlus1 * _pg2,
        _bOutSum2 = radiusPlus1 * _pb2,
        _rSum2 = sumFactor * _pr2,
        _gSum2 = sumFactor * _pg2,
        _bSum2 = sumFactor * _pb2;

    stack = stackStart;

    for (var _i7 = 0; _i7 < radiusPlus1; _i7++) {
      stack.r = _pr2;
      stack.g = _pg2;
      stack.b = _pb2;
      stack = stack.next;
    }

    var _rInSum2 = 0,
        _gInSum2 = 0,
        _bInSum2 = 0;

    for (var _i8 = 1, yp = width; _i8 <= radius; _i8++) {
      yi = yp + _x2 << 2;
      _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
      _gSum2 += (stack.g = _pg2 = pixels[yi + 1]) * rbs;
      _bSum2 += (stack.b = _pb2 = pixels[yi + 2]) * rbs;
      _rInSum2 += _pr2;
      _gInSum2 += _pg2;
      _bInSum2 += _pb2;
      stack = stack.next;

      if (_i8 < heightMinus1) {
        yp += width;
      }
    }

    yi = _x2;
    stackIn = stackStart;
    stackOut = stackEnd;

    for (var _y2 = 0; _y2 < height; _y2++) {
      p = yi << 2;
      pixels[p] = _rSum2 * mulSum >> shgSum;
      pixels[p + 1] = _gSum2 * mulSum >> shgSum;
      pixels[p + 2] = _bSum2 * mulSum >> shgSum;
      _rSum2 -= _rOutSum2;
      _gSum2 -= _gOutSum2;
      _bSum2 -= _bOutSum2;
      _rOutSum2 -= stackIn.r;
      _gOutSum2 -= stackIn.g;
      _bOutSum2 -= stackIn.b;
      p = _x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
      _rSum2 += _rInSum2 += stackIn.r = pixels[p];
      _gSum2 += _gInSum2 += stackIn.g = pixels[p + 1];
      _bSum2 += _bInSum2 += stackIn.b = pixels[p + 2];
      stackIn = stackIn.next;
      _rOutSum2 += _pr2 = stackOut.r;
      _gOutSum2 += _pg2 = stackOut.g;
      _bOutSum2 += _pb2 = stackOut.b;
      _rInSum2 -= _pr2;
      _gInSum2 -= _pg2;
      _bInSum2 -= _pb2;
      stackOut = stackOut.next;
      yi += width;
    }
  }

  return imageData;
}
/**
 *
 */


var BlurStack =
/**
 * Set properties.
 */
function BlurStack() {
  _classCallCheck(this, BlurStack);

  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
  this.next = null;
};



;// CONCATENATED MODULE: ./node_modules/jspdf/node_modules/canvg/lib/index.es.js





















/**
 * Options preset for `OffscreenCanvas`.
 * @param config - Preset requirements.
 * @param config.DOMParser - XML/HTML parser from string into DOM Document.
 * @returns Preset object.
 */
function offscreen() {
  var {
    DOMParser: DOMParserFallback
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var preset = {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser: DOMParserFallback,

    createCanvas(width, height) {
      return new OffscreenCanvas(width, height);
    },

    createImage(url) {
      return _asyncToGenerator(function* () {
        var response = yield fetch(url);
        var blob = yield response.blob();
        var img = yield createImageBitmap(blob);
        return img;
      })();
    }

  };

  if (typeof DOMParser !== 'undefined' || typeof DOMParserFallback === 'undefined') {
    Reflect.deleteProperty(preset, 'DOMParser');
  }

  return preset;
}

/**
 * Options preset for `node-canvas`.
 * @param config - Preset requirements.
 * @param config.DOMParser - XML/HTML parser from string into DOM Document.
 * @param config.canvas - `node-canvas` exports.
 * @param config.fetch - WHATWG-compatible `fetch` function.
 * @returns Preset object.
 */
function node(_ref) {
  var {
    DOMParser,
    canvas,
    fetch
  } = _ref;
  return {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser,
    fetch,
    createCanvas: canvas.createCanvas,
    createImage: canvas.loadImage
  };
}

var index = /*#__PURE__*/Object.freeze({
	__proto__: null,
	offscreen: offscreen,
	node: node
});

/**
 * HTML-safe compress white-spaces.
 * @param str - String to compress.
 * @returns String.
 */
function compressSpaces(str) {
  return str.replace(/(?!\u3000)\s+/gm, ' ');
}
/**
 * HTML-safe left trim.
 * @param str - String to trim.
 * @returns String.
 */

function trimLeft(str) {
  return str.replace(/^[\n \t]+/, '');
}
/**
 * HTML-safe right trim.
 * @param str - String to trim.
 * @returns String.
 */

function trimRight(str) {
  return str.replace(/[\n \t]+$/, '');
}
/**
 * String to numbers array.
 * @param str - Numbers string.
 * @returns Numbers array.
 */

function toNumbers(str) {
  var matches = (str || '').match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];
  return matches.map(parseFloat);
} // Microsoft Edge fix

var allUppercase = /^[A-Z-]+$/;
/**
 * Normalize attribute name.
 * @param name - Attribute name.
 * @returns Normalized attribute name.
 */

function normalizeAttributeName(name) {
  if (allUppercase.test(name)) {
    return name.toLowerCase();
  }

  return name;
}
/**
 * Parse external URL.
 * @param url - CSS url string.
 * @returns Parsed URL.
 */

function parseExternalUrl(url) {
  //                      single quotes [2]
  //                      v         double quotes [3]
  //                      v         v         no quotes [4]
  //                      v         v         v
  var urlMatch = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(url) || [];
  return urlMatch[2] || urlMatch[3] || urlMatch[4];
}
/**
 * Transform floats to integers in rgb colors.
 * @param color - Color to normalize.
 * @returns Normalized color.
 */

function normalizeColor(color) {
  if (!color.startsWith('rgb')) {
    return color;
  }

  var rgbParts = 3;
  var normalizedColor = color.replace(/\d+(\.\d+)?/g, (num, isFloat) => rgbParts-- && isFloat ? String(Math.round(parseFloat(num))) : num);
  return normalizedColor;
}

// slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js
var attributeRegex = /(\[[^\]]+\])/g;
var idRegex = /(#[^\s+>~.[:]+)/g;
var classRegex = /(\.[^\s+>~.[:]+)/g;
var pseudoElementRegex = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi;
var pseudoClassWithBracketsRegex = /(:[\w-]+\([^)]*\))/gi;
var pseudoClassRegex = /(:[^\s+>~.[:]+)/g;
var elementRegex = /([^\s+>~.[:]+)/g;

function findSelectorMatch(selector, regex) {
  var matches = regex.exec(selector);

  if (!matches) {
    return [selector, 0];
  }

  return [selector.replace(regex, ' '), matches.length];
}
/**
 * Measure selector specificity.
 * @param selector - Selector to measure.
 * @returns Specificity.
 */


function getSelectorSpecificity(selector) {
  var specificity = [0, 0, 0];
  var currentSelector = selector.replace(/:not\(([^)]*)\)/g, '     $1 ').replace(/{[\s\S]*/gm, ' ');
  var delta = 0;
  [currentSelector, delta] = findSelectorMatch(currentSelector, attributeRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, idRegex);
  specificity[0] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, classRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoElementRegex);
  specificity[2] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassWithBracketsRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassRegex);
  specificity[1] += delta;
  currentSelector = currentSelector.replace(/[*\s+>~]/g, ' ').replace(/[#.]/g, ' ');
  [currentSelector, delta] = findSelectorMatch(currentSelector, elementRegex); // lgtm [js/useless-assignment-to-local]

  specificity[2] += delta;
  return specificity.join('');
}

var PSEUDO_ZERO = .00000001;
/**
 * Vector magnitude.
 * @param v
 * @returns Number result.
 */

function vectorMagnitude(v) {
  return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
}
/**
 * Ratio between two vectors.
 * @param u
 * @param v
 * @returns Number result.
 */

function vectorsRatio(u, v) {
  return (u[0] * v[0] + u[1] * v[1]) / (vectorMagnitude(u) * vectorMagnitude(v));
}
/**
 * Angle between two vectors.
 * @param u
 * @param v
 * @returns Number result.
 */

function vectorsAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vectorsRatio(u, v));
}
function CB1(t) {
  return t * t * t;
}
function CB2(t) {
  return 3 * t * t * (1 - t);
}
function CB3(t) {
  return 3 * t * (1 - t) * (1 - t);
}
function CB4(t) {
  return (1 - t) * (1 - t) * (1 - t);
}
function QB1(t) {
  return t * t;
}
function QB2(t) {
  return 2 * t * (1 - t);
}
function QB3(t) {
  return (1 - t) * (1 - t);
}

class Property {
  constructor(document, name, value) {
    this.document = document;
    this.name = name;
    this.value = value;
    this.isNormalizedColor = false;
  }

  static empty(document) {
    return new Property(document, 'EMPTY', '');
  }

  split() {
    var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
    var {
      document,
      name
    } = this;
    return compressSpaces(this.getString()).trim().split(separator).map(value => new Property(document, name, value));
  }

  hasValue(zeroIsValue) {
    var {
      value
    } = this;
    return value !== null && value !== '' && (zeroIsValue || value !== 0) && typeof value !== 'undefined';
  }

  isString(regexp) {
    var {
      value
    } = this;
    var result = typeof value === 'string';

    if (!result || !regexp) {
      return result;
    }

    return regexp.test(value);
  }

  isUrlDefinition() {
    return this.isString(/^url\(/);
  }

  isPixels() {
    if (!this.hasValue()) {
      return false;
    }

    var asString = this.getString();

    switch (true) {
      case asString.endsWith('px'):
      case /^[0-9]+$/.test(asString):
        return true;

      default:
        return false;
    }
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  getValue(def) {
    if (typeof def === 'undefined' || this.hasValue()) {
      return this.value;
    }

    return def;
  }

  getNumber(def) {
    if (!this.hasValue()) {
      if (typeof def === 'undefined') {
        return 0;
      }

      return parseFloat(def);
    }

    var {
      value
    } = this;
    var n = parseFloat(value);

    if (this.isString(/%$/)) {
      n /= 100.0;
    }

    return n;
  }

  getString(def) {
    if (typeof def === 'undefined' || this.hasValue()) {
      return typeof this.value === 'undefined' ? '' : String(this.value);
    }

    return String(def);
  }

  getColor(def) {
    var color = this.getString(def);

    if (this.isNormalizedColor) {
      return color;
    }

    this.isNormalizedColor = true;
    color = normalizeColor(color);
    this.value = color;
    return color;
  }

  getDpi() {
    return 96.0; // TODO: compute?
  }

  getRem() {
    return this.document.rootEmSize;
  }

  getEm() {
    return this.document.emSize;
  }

  getUnits() {
    return this.getString().replace(/[0-9.-]/g, '');
  }

  getPixels(axisOrIsFontSize) {
    var processPercent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!this.hasValue()) {
      return 0;
    }

    var [axis, isFontSize] = typeof axisOrIsFontSize === 'boolean' ? [undefined, axisOrIsFontSize] : [axisOrIsFontSize];
    var {
      viewPort
    } = this.document.screen;

    switch (true) {
      case this.isString(/vmin$/):
        return this.getNumber() / 100.0 * Math.min(viewPort.computeSize('x'), viewPort.computeSize('y'));

      case this.isString(/vmax$/):
        return this.getNumber() / 100.0 * Math.max(viewPort.computeSize('x'), viewPort.computeSize('y'));

      case this.isString(/vw$/):
        return this.getNumber() / 100.0 * viewPort.computeSize('x');

      case this.isString(/vh$/):
        return this.getNumber() / 100.0 * viewPort.computeSize('y');

      case this.isString(/rem$/):
        return this.getNumber() * this.getRem();

      case this.isString(/em$/):
        return this.getNumber() * this.getEm();

      case this.isString(/ex$/):
        return this.getNumber() * this.getEm() / 2.0;

      case this.isString(/px$/):
        return this.getNumber();

      case this.isString(/pt$/):
        return this.getNumber() * this.getDpi() * (1.0 / 72.0);

      case this.isString(/pc$/):
        return this.getNumber() * 15;

      case this.isString(/cm$/):
        return this.getNumber() * this.getDpi() / 2.54;

      case this.isString(/mm$/):
        return this.getNumber() * this.getDpi() / 25.4;

      case this.isString(/in$/):
        return this.getNumber() * this.getDpi();

      case this.isString(/%$/) && isFontSize:
        return this.getNumber() * this.getEm();

      case this.isString(/%$/):
        return this.getNumber() * viewPort.computeSize(axis);

      default:
        {
          var n = this.getNumber();

          if (processPercent && n < 1.0) {
            return n * viewPort.computeSize(axis);
          }

          return n;
        }
    }
  }

  getMilliseconds() {
    if (!this.hasValue()) {
      return 0;
    }

    if (this.isString(/ms$/)) {
      return this.getNumber();
    }

    return this.getNumber() * 1000;
  }

  getRadians() {
    if (!this.hasValue()) {
      return 0;
    }

    switch (true) {
      case this.isString(/deg$/):
        return this.getNumber() * (Math.PI / 180.0);

      case this.isString(/grad$/):
        return this.getNumber() * (Math.PI / 200.0);

      case this.isString(/rad$/):
        return this.getNumber();

      default:
        return this.getNumber() * (Math.PI / 180.0);
    }
  }

  getDefinition() {
    var asString = this.getString();
    var name = /#([^)'"]+)/.exec(asString);

    if (name) {
      name = name[1];
    }

    if (!name) {
      name = asString;
    }

    return this.document.definitions[name];
  }

  getFillStyleDefinition(element, opacity) {
    var def = this.getDefinition();

    if (!def) {
      return null;
    } // gradient


    if (typeof def.createGradient === 'function') {
      return def.createGradient(this.document.ctx, element, opacity);
    } // pattern


    if (typeof def.createPattern === 'function') {
      if (def.getHrefAttribute().hasValue()) {
        var patternTransform = def.getAttribute('patternTransform');
        def = def.getHrefAttribute().getDefinition();

        if (patternTransform.hasValue()) {
          def.getAttribute('patternTransform', true).setValue(patternTransform.value);
        }
      }

      return def.createPattern(this.document.ctx, element, opacity);
    }

    return null;
  }

  getTextBaseline() {
    if (!this.hasValue()) {
      return null;
    }

    return Property.textBaselineMapping[this.getString()];
  }

  addOpacity(opacity) {
    var value = this.getColor();
    var len = value.length;
    var commas = 0; // Simulate old RGBColor version, which can't parse rgba.

    for (var i = 0; i < len; i++) {
      if (value[i] === ',') {
        commas++;
      }

      if (commas === 3) {
        break;
      }
    }

    if (opacity.hasValue() && this.isString() && commas !== 3) {
      var color = new rgbcolor(value);

      if (color.ok) {
        color.alpha = opacity.getNumber();
        value = color.toRGBA();
      }
    }

    return new Property(this.document, this.name, value);
  }

}
Property.textBaselineMapping = {
  'baseline': 'alphabetic',
  'before-edge': 'top',
  'text-before-edge': 'top',
  'middle': 'middle',
  'central': 'middle',
  'after-edge': 'bottom',
  'text-after-edge': 'bottom',
  'ideographic': 'ideographic',
  'alphabetic': 'alphabetic',
  'hanging': 'hanging',
  'mathematical': 'alphabetic'
};

class ViewPort {
  constructor() {
    this.viewPorts = [];
  }

  clear() {
    this.viewPorts = [];
  }

  setCurrent(width, height) {
    this.viewPorts.push({
      width,
      height
    });
  }

  removeCurrent() {
    this.viewPorts.pop();
  }

  getCurrent() {
    var {
      viewPorts
    } = this;
    return viewPorts[viewPorts.length - 1];
  }

  get width() {
    return this.getCurrent().width;
  }

  get height() {
    return this.getCurrent().height;
  }

  computeSize(d) {
    if (typeof d === 'number') {
      return d;
    }

    if (d === 'x') {
      return this.width;
    }

    if (d === 'y') {
      return this.height;
    }

    return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / Math.sqrt(2);
  }

}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static parse(point) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var [x = defaultValue, y = defaultValue] = toNumbers(point);
    return new Point(x, y);
  }

  static parseScale(scale) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var [x = defaultValue, y = x] = toNumbers(scale);
    return new Point(x, y);
  }

  static parsePath(path) {
    var points = toNumbers(path);
    var len = points.length;
    var pathPoints = [];

    for (var i = 0; i < len; i += 2) {
      pathPoints.push(new Point(points[i], points[i + 1]));
    }

    return pathPoints;
  }

  angleTo(point) {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }

  applyTransform(transform) {
    var {
      x,
      y
    } = this;
    var xp = x * transform[0] + y * transform[2] + transform[4];
    var yp = x * transform[1] + y * transform[3] + transform[5];
    this.x = xp;
    this.y = yp;
  }

}

class Mouse {
  constructor(screen) {
    this.screen = screen;
    this.working = false;
    this.events = [];
    this.eventElements = []; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    this.onClick = this.onClick.bind(this); // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  isWorking() {
    return this.working;
  }

  start() {
    if (this.working) {
      return;
    }

    var {
      screen,
      onClick,
      onMouseMove
    } = this;
    var canvas = screen.ctx.canvas;
    canvas.onclick = onClick;
    canvas.onmousemove = onMouseMove;
    this.working = true;
  }

  stop() {
    if (!this.working) {
      return;
    }

    var canvas = this.screen.ctx.canvas;
    this.working = false;
    canvas.onclick = null;
    canvas.onmousemove = null;
  }

  hasEvents() {
    return this.working && this.events.length > 0;
  }

  runEvents() {
    if (!this.working) {
      return;
    }

    var {
      screen: document,
      events,
      eventElements
    } = this;
    var {
      style
    } = document.ctx.canvas;

    if (style) {
      style.cursor = '';
    }

    events.forEach((_ref, i) => {
      var {
        run
      } = _ref;
      var element = eventElements[i];

      while (element) {
        run(element);
        element = element.parent;
      }
    }); // done running, clear

    this.events = [];
    this.eventElements = [];
  }

  checkPath(element, ctx) {
    if (!this.working || !ctx) {
      return;
    }

    var {
      events,
      eventElements
    } = this;
    events.forEach((_ref2, i) => {
      var {
        x,
        y
      } = _ref2;

      if (!eventElements[i] && ctx.isPointInPath && ctx.isPointInPath(x, y)) {
        eventElements[i] = element;
      }
    });
  }

  checkBoundingBox(element, boundingBox) {
    if (!this.working || !boundingBox) {
      return;
    }

    var {
      events,
      eventElements
    } = this;
    events.forEach((_ref3, i) => {
      var {
        x,
        y
      } = _ref3;

      if (!eventElements[i] && boundingBox.isPointInBox(x, y)) {
        eventElements[i] = element;
      }
    });
  }

  mapXY(x, y) {
    var {
      window,
      ctx
    } = this.screen;
    var point = new Point(x, y);
    var element = ctx.canvas;

    while (element) {
      point.x -= element.offsetLeft;
      point.y -= element.offsetTop;
      element = element.offsetParent;
    }

    if (window.scrollX) {
      point.x += window.scrollX;
    }

    if (window.scrollY) {
      point.y += window.scrollY;
    }

    return point;
  }

  onClick(event) {
    var {
      x,
      y
    } = this.mapXY(event.clientX, event.clientY);
    this.events.push({
      type: 'onclick',
      x,
      y,

      run(eventTarget) {
        if (eventTarget.onClick) {
          eventTarget.onClick();
        }
      }

    });
  }

  onMouseMove(event) {
    var {
      x,
      y
    } = this.mapXY(event.clientX, event.clientY);
    this.events.push({
      type: 'onmousemove',
      x,
      y,

      run(eventTarget) {
        if (eventTarget.onMouseMove) {
          eventTarget.onMouseMove();
        }
      }

    });
  }

}

var defaultWindow = typeof window !== 'undefined' ? window : null;
var defaultFetch$1 = typeof fetch !== 'undefined' ? fetch.bind(undefined) // `fetch` depends on context: `someObject.fetch(...)` will throw error.
: null;
class Screen {
  constructor(ctx) {
    var {
      fetch = defaultFetch$1,
      window = defaultWindow
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.ctx = ctx;
    this.FRAMERATE = 30;
    this.MAX_VIRTUAL_PIXELS = 30000;
    this.CLIENT_WIDTH = 800;
    this.CLIENT_HEIGHT = 600;
    this.viewPort = new ViewPort();
    this.mouse = new Mouse(this);
    this.animations = [];
    this.waits = [];
    this.frameDuration = 0;
    this.isReadyLock = false;
    this.isFirstRender = true;
    this.intervalId = null;
    this.window = window;
    this.fetch = fetch;
  }

  wait(checker) {
    this.waits.push(checker);
  }

  ready() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!this.readyPromise) {
      return Promise.resolve();
    }

    return this.readyPromise;
  }

  isReady() {
    if (this.isReadyLock) {
      return true;
    }

    var isReadyLock = this.waits.every(_ => _());

    if (isReadyLock) {
      this.waits = [];

      if (this.resolveReady) {
        this.resolveReady();
      }
    }

    this.isReadyLock = isReadyLock;
    return isReadyLock;
  }

  setDefaults(ctx) {
    // initial values and defaults
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 4;
  }

  setViewBox(_ref) {
    var {
      document,
      ctx,
      aspectRatio,
      width,
      desiredWidth,
      height,
      desiredHeight,
      minX = 0,
      minY = 0,
      refX,
      refY,
      clip = false,
      clipX = 0,
      clipY = 0
    } = _ref;
    // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
    var cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, ''); // ignore defer

    var [aspectRatioAlign, aspectRatioMeetOrSlice] = cleanAspectRatio.split(' ');
    var align = aspectRatioAlign || 'xMidYMid';
    var meetOrSlice = aspectRatioMeetOrSlice || 'meet'; // calculate scale

    var scaleX = width / desiredWidth;
    var scaleY = height / desiredHeight;
    var scaleMin = Math.min(scaleX, scaleY);
    var scaleMax = Math.max(scaleX, scaleY);
    var finalDesiredWidth = desiredWidth;
    var finalDesiredHeight = desiredHeight;

    if (meetOrSlice === 'meet') {
      finalDesiredWidth *= scaleMin;
      finalDesiredHeight *= scaleMin;
    }

    if (meetOrSlice === 'slice') {
      finalDesiredWidth *= scaleMax;
      finalDesiredHeight *= scaleMax;
    }

    var refXProp = new Property(document, 'refX', refX);
    var refYProp = new Property(document, 'refY', refY);
    var hasRefs = refXProp.hasValue() && refYProp.hasValue();

    if (hasRefs) {
      ctx.translate(-scaleMin * refXProp.getPixels('x'), -scaleMin * refYProp.getPixels('y'));
    }

    if (clip) {
      var scaledClipX = scaleMin * clipX;
      var scaledClipY = scaleMin * clipY;
      ctx.beginPath();
      ctx.moveTo(scaledClipX, scaledClipY);
      ctx.lineTo(width, scaledClipY);
      ctx.lineTo(width, height);
      ctx.lineTo(scaledClipX, height);
      ctx.closePath();
      ctx.clip();
    }

    if (!hasRefs) {
      var isMeetMinY = meetOrSlice === 'meet' && scaleMin === scaleY;
      var isSliceMaxY = meetOrSlice === 'slice' && scaleMax === scaleY;
      var isMeetMinX = meetOrSlice === 'meet' && scaleMin === scaleX;
      var isSliceMaxX = meetOrSlice === 'slice' && scaleMax === scaleX;

      if (align.startsWith('xMid') && (isMeetMinY || isSliceMaxY)) {
        ctx.translate(width / 2.0 - finalDesiredWidth / 2.0, 0);
      }

      if (align.endsWith('YMid') && (isMeetMinX || isSliceMaxX)) {
        ctx.translate(0, height / 2.0 - finalDesiredHeight / 2.0);
      }

      if (align.startsWith('xMax') && (isMeetMinY || isSliceMaxY)) {
        ctx.translate(width - finalDesiredWidth, 0);
      }

      if (align.endsWith('YMax') && (isMeetMinX || isSliceMaxX)) {
        ctx.translate(0, height - finalDesiredHeight);
      }
    } // scale


    switch (true) {
      case align === 'none':
        ctx.scale(scaleX, scaleY);
        break;

      case meetOrSlice === 'meet':
        ctx.scale(scaleMin, scaleMin);
        break;

      case meetOrSlice === 'slice':
        ctx.scale(scaleMax, scaleMax);
        break;
    } // translate


    ctx.translate(-minX, -minY);
  }

  start(element) {
    var {
      enableRedraw = false,
      ignoreMouse = false,
      ignoreAnimation = false,
      ignoreDimensions = false,
      ignoreClear = false,
      forceRedraw,
      scaleWidth,
      scaleHeight,
      offsetX,
      offsetY
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      FRAMERATE,
      mouse
    } = this;
    var frameDuration = 1000 / FRAMERATE;
    this.frameDuration = frameDuration;
    this.readyPromise = new Promise(resolve => {
      this.resolveReady = resolve;
    });

    if (this.isReady()) {
      this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
    }

    if (!enableRedraw) {
      return;
    }

    var now = Date.now();
    var then = now;
    var delta = 0;

    var tick = () => {
      now = Date.now();
      delta = now - then;

      if (delta >= frameDuration) {
        then = now - delta % frameDuration;

        if (this.shouldUpdate(ignoreAnimation, forceRedraw)) {
          this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
          mouse.runEvents();
        }
      }

      this.intervalId = raf(tick);
    };

    if (!ignoreMouse) {
      mouse.start();
    }

    this.intervalId = raf(tick);
  }

  stop() {
    if (this.intervalId) {
      raf.cancel(this.intervalId);
      this.intervalId = null;
    }

    this.mouse.stop();
  }

  shouldUpdate(ignoreAnimation, forceRedraw) {
    // need update from animations?
    if (!ignoreAnimation) {
      var {
        frameDuration
      } = this;
      var shouldUpdate = this.animations.reduce((shouldUpdate, animation) => animation.update(frameDuration) || shouldUpdate, false);

      if (shouldUpdate) {
        return true;
      }
    } // need update from redraw?


    if (typeof forceRedraw === 'function' && forceRedraw()) {
      return true;
    }

    if (!this.isReadyLock && this.isReady()) {
      return true;
    } // need update from mouse events?


    if (this.mouse.hasEvents()) {
      return true;
    }

    return false;
  }

  render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY) {
    var {
      CLIENT_WIDTH,
      CLIENT_HEIGHT,
      viewPort,
      ctx,
      isFirstRender
    } = this;
    var canvas = ctx.canvas;
    viewPort.clear();

    if (canvas.width && canvas.height) {
      viewPort.setCurrent(canvas.width, canvas.height);
    } else {
      viewPort.setCurrent(CLIENT_WIDTH, CLIENT_HEIGHT);
    }

    var widthStyle = element.getStyle('width');
    var heightStyle = element.getStyle('height');

    if (!ignoreDimensions && (isFirstRender || typeof scaleWidth !== 'number' && typeof scaleHeight !== 'number')) {
      // set canvas size
      if (widthStyle.hasValue()) {
        canvas.width = widthStyle.getPixels('x');

        if (canvas.style) {
          canvas.style.width = "".concat(canvas.width, "px");
        }
      }

      if (heightStyle.hasValue()) {
        canvas.height = heightStyle.getPixels('y');

        if (canvas.style) {
          canvas.style.height = "".concat(canvas.height, "px");
        }
      }
    }

    var cWidth = canvas.clientWidth || canvas.width;
    var cHeight = canvas.clientHeight || canvas.height;

    if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
      cWidth = widthStyle.getPixels('x');
      cHeight = heightStyle.getPixels('y');
    }

    viewPort.setCurrent(cWidth, cHeight);

    if (typeof offsetX === 'number') {
      element.getAttribute('x', true).setValue(offsetX);
    }

    if (typeof offsetY === 'number') {
      element.getAttribute('y', true).setValue(offsetY);
    }

    if (typeof scaleWidth === 'number' || typeof scaleHeight === 'number') {
      var viewBox = toNumbers(element.getAttribute('viewBox').getString());
      var xRatio = 0;
      var yRatio = 0;

      if (typeof scaleWidth === 'number') {
        var _widthStyle = element.getStyle('width');

        if (_widthStyle.hasValue()) {
          xRatio = _widthStyle.getPixels('x') / scaleWidth;
        } else if (!isNaN(viewBox[2])) {
          xRatio = viewBox[2] / scaleWidth;
        }
      }

      if (typeof scaleHeight === 'number') {
        var _heightStyle = element.getStyle('height');

        if (_heightStyle.hasValue()) {
          yRatio = _heightStyle.getPixels('y') / scaleHeight;
        } else if (!isNaN(viewBox[3])) {
          yRatio = viewBox[3] / scaleHeight;
        }
      }

      if (!xRatio) {
        xRatio = yRatio;
      }

      if (!yRatio) {
        yRatio = xRatio;
      }

      element.getAttribute('width', true).setValue(scaleWidth);
      element.getAttribute('height', true).setValue(scaleHeight);
      var transformStyle = element.getStyle('transform', true, true);
      transformStyle.setValue("".concat(transformStyle.getString(), " scale(").concat(1.0 / xRatio, ", ").concat(1.0 / yRatio, ")"));
    } // clear and render


    if (!ignoreClear) {
      ctx.clearRect(0, 0, cWidth, cHeight);
    }

    element.render(ctx);

    if (isFirstRender) {
      this.isFirstRender = false;
    }
  }

}
Screen.defaultWindow = defaultWindow;
Screen.defaultFetch = defaultFetch$1;

var {
  defaultFetch
} = Screen;
var DefaultDOMParser = typeof DOMParser !== 'undefined' ? DOMParser : null;
class Parser {
  constructor() {
    var {
      fetch = defaultFetch,
      DOMParser = DefaultDOMParser
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.fetch = fetch;
    this.DOMParser = DOMParser;
  }

  parse(resource) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (resource.startsWith('<')) {
        return _this.parseFromString(resource);
      }

      return _this.load(resource);
    })();
  }

  parseFromString(xml) {
    var parser = new this.DOMParser();

    try {
      return this.checkDocument(parser.parseFromString(xml, 'image/svg+xml'));
    } catch (err) {
      return this.checkDocument(parser.parseFromString(xml, 'text/xml'));
    }
  }

  checkDocument(document) {
    var parserError = document.getElementsByTagName('parsererror')[0];

    if (parserError) {
      throw new Error(parserError.textContent);
    }

    return document;
  }

  load(url) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var response = yield _this2.fetch(url);
      var xml = yield response.text();
      return _this2.parseFromString(xml);
    })();
  }

}

class Translate {
  constructor(_, point) {
    this.type = 'translate';
    this.point = null;
    this.point = Point.parse(point);
  }

  apply(ctx) {
    var {
      x,
      y
    } = this.point;
    ctx.translate(x || 0.0, y || 0.0);
  }

  unapply(ctx) {
    var {
      x,
      y
    } = this.point;
    ctx.translate(-1.0 * x || 0.0, -1.0 * y || 0.0);
  }

  applyToPoint(point) {
    var {
      x,
      y
    } = this.point;
    point.applyTransform([1, 0, 0, 1, x || 0.0, y || 0.0]);
  }

}

class Rotate {
  constructor(document, rotate, transformOrigin) {
    this.type = 'rotate';
    this.angle = null;
    this.originX = null;
    this.originY = null;
    this.cx = 0;
    this.cy = 0;
    var numbers = toNumbers(rotate);
    this.angle = new Property(document, 'angle', numbers[0]);
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
    this.cx = numbers[1] || 0;
    this.cy = numbers[2] || 0;
  }

  apply(ctx) {
    var {
      cx,
      cy,
      originX,
      originY,
      angle
    } = this;
    var tx = cx + originX.getPixels('x');
    var ty = cy + originY.getPixels('y');
    ctx.translate(tx, ty);
    ctx.rotate(angle.getRadians());
    ctx.translate(-tx, -ty);
  }

  unapply(ctx) {
    var {
      cx,
      cy,
      originX,
      originY,
      angle
    } = this;
    var tx = cx + originX.getPixels('x');
    var ty = cy + originY.getPixels('y');
    ctx.translate(tx, ty);
    ctx.rotate(-1.0 * angle.getRadians());
    ctx.translate(-tx, -ty);
  }

  applyToPoint(point) {
    var {
      cx,
      cy,
      angle
    } = this;
    var rad = angle.getRadians();
    point.applyTransform([1, 0, 0, 1, cx || 0.0, cy || 0.0 // this.p.y
    ]);
    point.applyTransform([Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), 0, 0]);
    point.applyTransform([1, 0, 0, 1, -cx || 0.0, -cy || 0.0 // -this.p.y
    ]);
  }

}

class Scale {
  constructor(_, scale, transformOrigin) {
    this.type = 'scale';
    this.scale = null;
    this.originX = null;
    this.originY = null;
    var scaleSize = Point.parseScale(scale); // Workaround for node-canvas

    if (scaleSize.x === 0 || scaleSize.y === 0) {
      scaleSize.x = PSEUDO_ZERO;
      scaleSize.y = PSEUDO_ZERO;
    }

    this.scale = scaleSize;
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
  }

  apply(ctx) {
    var {
      scale: {
        x,
        y
      },
      originX,
      originY
    } = this;
    var tx = originX.getPixels('x');
    var ty = originY.getPixels('y');
    ctx.translate(tx, ty);
    ctx.scale(x, y || x);
    ctx.translate(-tx, -ty);
  }

  unapply(ctx) {
    var {
      scale: {
        x,
        y
      },
      originX,
      originY
    } = this;
    var tx = originX.getPixels('x');
    var ty = originY.getPixels('y');
    ctx.translate(tx, ty);
    ctx.scale(1.0 / x, 1.0 / y || x);
    ctx.translate(-tx, -ty);
  }

  applyToPoint(point) {
    var {
      x,
      y
    } = this.scale;
    point.applyTransform([x || 0.0, 0, 0, y || 0.0, 0, 0]);
  }

}

class Matrix {
  constructor(_, matrix, transformOrigin) {
    this.type = 'matrix';
    this.matrix = [];
    this.originX = null;
    this.originY = null;
    this.matrix = toNumbers(matrix);
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
  }

  apply(ctx) {
    var {
      originX,
      originY,
      matrix
    } = this;
    var tx = originX.getPixels('x');
    var ty = originY.getPixels('y');
    ctx.translate(tx, ty);
    ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    ctx.translate(-tx, -ty);
  }

  unapply(ctx) {
    var {
      originX,
      originY,
      matrix
    } = this;
    var a = matrix[0];
    var b = matrix[2];
    var c = matrix[4];
    var d = matrix[1];
    var e = matrix[3];
    var f = matrix[5];
    var g = 0.0;
    var h = 0.0;
    var i = 1.0;
    var det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g));
    var tx = originX.getPixels('x');
    var ty = originY.getPixels('y');
    ctx.translate(tx, ty);
    ctx.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c * h - b * i), det * (a * i - c * g), det * (b * f - c * e), det * (c * d - a * f));
    ctx.translate(-tx, -ty);
  }

  applyToPoint(point) {
    point.applyTransform(this.matrix);
  }

}

class Skew extends Matrix {
  constructor(document, skew, transformOrigin) {
    super(document, skew, transformOrigin);
    this.type = 'skew';
    this.angle = null;
    this.angle = new Property(document, 'angle', skew);
  }

}

class SkewX extends Skew {
  constructor(document, skew, transformOrigin) {
    super(document, skew, transformOrigin);
    this.type = 'skewX';
    this.matrix = [1, 0, Math.tan(this.angle.getRadians()), 1, 0, 0];
  }

}

class SkewY extends Skew {
  constructor(document, skew, transformOrigin) {
    super(document, skew, transformOrigin);
    this.type = 'skewY';
    this.matrix = [1, Math.tan(this.angle.getRadians()), 0, 1, 0, 0];
  }

}

function parseTransforms(transform) {
  return compressSpaces(transform).trim().replace(/\)([a-zA-Z])/g, ') $1').replace(/\)(\s?,\s?)/g, ') ').split(/\s(?=[a-z])/);
}

function parseTransform(transform) {
  var [type, value] = transform.split('(');
  return [type.trim(), value.trim().replace(')', '')];
}

class Transform {
  constructor(document, transform, transformOrigin) {
    this.document = document;
    this.transforms = [];
    var data = parseTransforms(transform);
    data.forEach(transform => {
      if (transform === 'none') {
        return;
      }

      var [type, value] = parseTransform(transform);
      var TransformType = Transform.transformTypes[type];

      if (typeof TransformType !== 'undefined') {
        this.transforms.push(new TransformType(this.document, value, transformOrigin));
      }
    });
  }

  static fromElement(document, element) {
    var transformStyle = element.getStyle('transform', false, true);
    var [transformOriginXProperty, transformOriginYProperty = transformOriginXProperty] = element.getStyle('transform-origin', false, true).split();
    var transformOrigin = [transformOriginXProperty, transformOriginYProperty];

    if (transformStyle.hasValue()) {
      return new Transform(document, transformStyle.getString(), transformOrigin);
    }

    return null;
  }

  apply(ctx) {
    var {
      transforms
    } = this;
    var len = transforms.length;

    for (var i = 0; i < len; i++) {
      transforms[i].apply(ctx);
    }
  }

  unapply(ctx) {
    var {
      transforms
    } = this;
    var len = transforms.length;

    for (var i = len - 1; i >= 0; i--) {
      transforms[i].unapply(ctx);
    }
  } // TODO: applyToPoint unused ... remove?


  applyToPoint(point) {
    var {
      transforms
    } = this;
    var len = transforms.length;

    for (var i = 0; i < len; i++) {
      transforms[i].applyToPoint(point);
    }
  }

}
Transform.transformTypes = {
  translate: Translate,
  rotate: Rotate,
  scale: Scale,
  matrix: Matrix,
  skewX: SkewX,
  skewY: SkewY
};

class Element {
  constructor(document, node) {
    var captureTextNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    this.document = document;
    this.node = node;
    this.captureTextNodes = captureTextNodes;
    this.attributes = {};
    this.styles = {};
    this.stylesSpecificity = {};
    this.animationFrozen = false;
    this.animationFrozenValue = '';
    this.parent = null;
    this.children = [];

    if (!node || node.nodeType !== 1) {
      // ELEMENT_NODE
      return;
    } // add attributes


    Array.from(node.attributes).forEach(attribute => {
      var nodeName = normalizeAttributeName(attribute.nodeName);
      this.attributes[nodeName] = new Property(document, nodeName, attribute.value);
    });
    this.addStylesFromStyleDefinition(); // add inline styles

    if (this.getAttribute('style').hasValue()) {
      var styles = this.getAttribute('style').getString().split(';').map(_ => _.trim());
      styles.forEach(style => {
        if (!style) {
          return;
        }

        var [name, value] = style.split(':').map(_ => _.trim());
        this.styles[name] = new Property(document, name, value);
      });
    }

    var {
      definitions
    } = document;
    var id = this.getAttribute('id'); // add id

    if (id.hasValue()) {
      if (!definitions[id.getString()]) {
        definitions[id.getString()] = this;
      }
    }

    Array.from(node.childNodes).forEach(childNode => {
      if (childNode.nodeType === 1) {
        this.addChild(childNode); // ELEMENT_NODE
      } else if (captureTextNodes && (childNode.nodeType === 3 || childNode.nodeType === 4)) {
        var textNode = document.createTextNode(childNode);

        if (textNode.getText().length > 0) {
          this.addChild(textNode); // TEXT_NODE
        }
      }
    });
  }

  getAttribute(name) {
    var createIfNotExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var attr = this.attributes[name];

    if (!attr && createIfNotExists) {
      var _attr = new Property(this.document, name, '');

      this.attributes[name] = _attr;
      return _attr;
    }

    return attr || Property.empty(this.document);
  }

  getHrefAttribute() {
    for (var key in this.attributes) {
      if (key === 'href' || key.endsWith(':href')) {
        return this.attributes[key];
      }
    }

    return Property.empty(this.document);
  }

  getStyle(name) {
    var createIfNotExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var skipAncestors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var style = this.styles[name];

    if (style) {
      return style;
    }

    var attr = this.getAttribute(name);

    if (attr !== null && attr !== void 0 && attr.hasValue()) {
      this.styles[name] = attr; // move up to me to cache

      return attr;
    }

    if (!skipAncestors) {
      var {
        parent
      } = this;

      if (parent) {
        var parentStyle = parent.getStyle(name);

        if (parentStyle !== null && parentStyle !== void 0 && parentStyle.hasValue()) {
          return parentStyle;
        }
      }
    }

    if (createIfNotExists) {
      var _style = new Property(this.document, name, '');

      this.styles[name] = _style;
      return _style;
    }

    return style || Property.empty(this.document);
  }

  render(ctx) {
    // don't render display=none
    // don't render visibility=hidden
    if (this.getStyle('display').getString() === 'none' || this.getStyle('visibility').getString() === 'hidden') {
      return;
    }

    ctx.save();

    if (this.getStyle('mask').hasValue()) {
      // mask
      var mask = this.getStyle('mask').getDefinition();

      if (mask) {
        this.applyEffects(ctx);
        mask.apply(ctx, this);
      }
    } else if (this.getStyle('filter').getValue('none') !== 'none') {
      // filter
      var filter = this.getStyle('filter').getDefinition();

      if (filter) {
        this.applyEffects(ctx);
        filter.apply(ctx, this);
      }
    } else {
      this.setContext(ctx);
      this.renderChildren(ctx);
      this.clearContext(ctx);
    }

    ctx.restore();
  }

  setContext(_) {// NO RENDER
  }

  applyEffects(ctx) {
    // transform
    var transform = Transform.fromElement(this.document, this);

    if (transform) {
      transform.apply(ctx);
    } // clip


    var clipPathStyleProp = this.getStyle('clip-path', false, true);

    if (clipPathStyleProp.hasValue()) {
      var clip = clipPathStyleProp.getDefinition();

      if (clip) {
        clip.apply(ctx);
      }
    }
  }

  clearContext(_) {// NO RENDER
  }

  renderChildren(ctx) {
    this.children.forEach(child => {
      child.render(ctx);
    });
  }

  addChild(childNode) {
    var child = childNode instanceof Element ? childNode : this.document.createElement(childNode);
    child.parent = this;

    if (!Element.ignoreChildTypes.includes(child.type)) {
      this.children.push(child);
    }
  }

  matchesSelector(selector) {
    var _node$getAttribute;

    var {
      node
    } = this;

    if (typeof node.matches === 'function') {
      return node.matches(selector);
    }

    var styleClasses = (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'class');

    if (!styleClasses || styleClasses === '') {
      return false;
    }

    return styleClasses.split(' ').some(styleClass => ".".concat(styleClass) === selector);
  }

  addStylesFromStyleDefinition() {
    var {
      styles,
      stylesSpecificity
    } = this.document;

    for (var selector in styles) {
      if (!selector.startsWith('@') && this.matchesSelector(selector)) {
        var style = styles[selector];
        var specificity = stylesSpecificity[selector];

        if (style) {
          for (var name in style) {
            var existingSpecificity = this.stylesSpecificity[name];

            if (typeof existingSpecificity === 'undefined') {
              existingSpecificity = '000';
            }

            if (specificity >= existingSpecificity) {
              this.styles[name] = style[name];
              this.stylesSpecificity[name] = specificity;
            }
          }
        }
      }
    }
  }

  removeStyles(element, ignoreStyles) {
    var toRestore = ignoreStyles.reduce((toRestore, name) => {
      var styleProp = element.getStyle(name);

      if (!styleProp.hasValue()) {
        return toRestore;
      }

      var value = styleProp.getString();
      styleProp.setValue('');
      return [...toRestore, [name, value]];
    }, []);
    return toRestore;
  }

  restoreStyles(element, styles) {
    styles.forEach(_ref => {
      var [name, value] = _ref;
      element.getStyle(name, true).setValue(value);
    });
  }

  isFirstChild() {
    var _this$parent;

    return ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.children.indexOf(this)) === 0;
  }

}
Element.ignoreChildTypes = ['title'];

class UnknownElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
  }

}

function wrapFontFamily(fontFamily) {
  var trimmed = fontFamily.trim();
  return /^('|")/.test(trimmed) ? trimmed : "\"".concat(trimmed, "\"");
}

function prepareFontFamily(fontFamily) {
  return typeof process === 'undefined' ? fontFamily : fontFamily.trim().split(',').map(wrapFontFamily).join(',');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
 * @param fontStyle
 * @returns CSS font style.
 */


function prepareFontStyle(fontStyle) {
  if (!fontStyle) {
    return '';
  }

  var targetFontStyle = fontStyle.trim().toLowerCase();

  switch (targetFontStyle) {
    case 'normal':
    case 'italic':
    case 'oblique':
    case 'inherit':
    case 'initial':
    case 'unset':
      return targetFontStyle;

    default:
      if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) {
        return targetFontStyle;
      }

      return '';
  }
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 * @param fontWeight
 * @returns CSS font weight.
 */


function prepareFontWeight(fontWeight) {
  if (!fontWeight) {
    return '';
  }

  var targetFontWeight = fontWeight.trim().toLowerCase();

  switch (targetFontWeight) {
    case 'normal':
    case 'bold':
    case 'lighter':
    case 'bolder':
    case 'inherit':
    case 'initial':
    case 'unset':
      return targetFontWeight;

    default:
      if (/^[\d.]+$/.test(targetFontWeight)) {
        return targetFontWeight;
      }

      return '';
  }
}

class Font {
  constructor(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
    var inheritFont = inherit ? typeof inherit === 'string' ? Font.parse(inherit) : inherit : {};
    this.fontFamily = fontFamily || inheritFont.fontFamily;
    this.fontSize = fontSize || inheritFont.fontSize;
    this.fontStyle = fontStyle || inheritFont.fontStyle;
    this.fontWeight = fontWeight || inheritFont.fontWeight;
    this.fontVariant = fontVariant || inheritFont.fontVariant;
  }

  static parse() {
    var font = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var inherit = arguments.length > 1 ? arguments[1] : undefined;
    var fontStyle = '';
    var fontVariant = '';
    var fontWeight = '';
    var fontSize = '';
    var fontFamily = '';
    var parts = compressSpaces(font).trim().split(' ');
    var set = {
      fontSize: false,
      fontStyle: false,
      fontWeight: false,
      fontVariant: false
    };
    parts.forEach(part => {
      switch (true) {
        case !set.fontStyle && Font.styles.includes(part):
          if (part !== 'inherit') {
            fontStyle = part;
          }

          set.fontStyle = true;
          break;

        case !set.fontVariant && Font.variants.includes(part):
          if (part !== 'inherit') {
            fontVariant = part;
          }

          set.fontStyle = true;
          set.fontVariant = true;
          break;

        case !set.fontWeight && Font.weights.includes(part):
          if (part !== 'inherit') {
            fontWeight = part;
          }

          set.fontStyle = true;
          set.fontVariant = true;
          set.fontWeight = true;
          break;

        case !set.fontSize:
          if (part !== 'inherit') {
            [fontSize] = part.split('/');
          }

          set.fontStyle = true;
          set.fontVariant = true;
          set.fontWeight = true;
          set.fontSize = true;
          break;

        default:
          if (part !== 'inherit') {
            fontFamily += part;
          }

      }
    });
    return new Font(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit);
  }

  toString() {
    return [prepareFontStyle(this.fontStyle), this.fontVariant, prepareFontWeight(this.fontWeight), this.fontSize, // Wrap fontFamily only on nodejs and only for canvas.ctx
    prepareFontFamily(this.fontFamily)].join(' ').trim();
  }

}
Font.styles = 'normal|italic|oblique|inherit';
Font.variants = 'normal|small-caps|inherit';
Font.weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

class BoundingBox {
  constructor() {
    var x1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.NaN;
    var y1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.NaN;
    var x2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.NaN;
    var y2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.NaN;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.addPoint(x1, y1);
    this.addPoint(x2, y2);
  }

  get x() {
    return this.x1;
  }

  get y() {
    return this.y1;
  }

  get width() {
    return this.x2 - this.x1;
  }

  get height() {
    return this.y2 - this.y1;
  }

  addPoint(x, y) {
    if (typeof x !== 'undefined') {
      if (isNaN(this.x1) || isNaN(this.x2)) {
        this.x1 = x;
        this.x2 = x;
      }

      if (x < this.x1) {
        this.x1 = x;
      }

      if (x > this.x2) {
        this.x2 = x;
      }
    }

    if (typeof y !== 'undefined') {
      if (isNaN(this.y1) || isNaN(this.y2)) {
        this.y1 = y;
        this.y2 = y;
      }

      if (y < this.y1) {
        this.y1 = y;
      }

      if (y > this.y2) {
        this.y2 = y;
      }
    }
  }

  addX(x) {
    this.addPoint(x, null);
  }

  addY(y) {
    this.addPoint(null, y);
  }

  addBoundingBox(boundingBox) {
    if (!boundingBox) {
      return;
    }

    var {
      x1,
      y1,
      x2,
      y2
    } = boundingBox;
    this.addPoint(x1, y1);
    this.addPoint(x2, y2);
  }

  sumCubic(t, p0, p1, p2, p3) {
    return Math.pow(1 - t, 3) * p0 + 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
  }

  bezierCurveAdd(forX, p0, p1, p2, p3) {
    var b = 6 * p0 - 12 * p1 + 6 * p2;
    var a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
    var c = 3 * p1 - 3 * p0;

    if (a === 0) {
      if (b === 0) {
        return;
      }

      var t = -c / b;

      if (0 < t && t < 1) {
        if (forX) {
          this.addX(this.sumCubic(t, p0, p1, p2, p3));
        } else {
          this.addY(this.sumCubic(t, p0, p1, p2, p3));
        }
      }

      return;
    }

    var b2ac = Math.pow(b, 2) - 4 * c * a;

    if (b2ac < 0) {
      return;
    }

    var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);

    if (0 < t1 && t1 < 1) {
      if (forX) {
        this.addX(this.sumCubic(t1, p0, p1, p2, p3));
      } else {
        this.addY(this.sumCubic(t1, p0, p1, p2, p3));
      }
    }

    var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);

    if (0 < t2 && t2 < 1) {
      if (forX) {
        this.addX(this.sumCubic(t2, p0, p1, p2, p3));
      } else {
        this.addY(this.sumCubic(t2, p0, p1, p2, p3));
      }
    }
  } // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html


  addBezierCurve(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
    this.addPoint(p0x, p0y);
    this.addPoint(p3x, p3y);
    this.bezierCurveAdd(true, p0x, p1x, p2x, p3x);
    this.bezierCurveAdd(false, p0y, p1y, p2y, p3y);
  }

  addQuadraticCurve(p0x, p0y, p1x, p1y, p2x, p2y) {
    var cp1x = p0x + 2 / 3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)

    var cp1y = p0y + 2 / 3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)

    var cp2x = cp1x + 1 / 3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)

    var cp2y = cp1y + 1 / 3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)

    this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
  }

  isPointInBox(x, y) {
    var {
      x1,
      y1,
      x2,
      y2
    } = this;
    return x1 <= x && x <= x2 && y1 <= y && y <= y2;
  }

}

class PathParser extends _ {
  constructor(path) {
    super(path // Fix spaces after signs.
    .replace(/([+\-.])\s+/gm, '$1') // Remove invalid part.
    .replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, ''));
    this.control = null;
    this.start = null;
    this.current = null;
    this.command = null;
    this.commands = this.commands;
    this.i = -1;
    this.previousCommand = null;
    this.points = [];
    this.angles = [];
  }

  reset() {
    this.i = -1;
    this.command = null;
    this.previousCommand = null;
    this.start = new Point(0, 0);
    this.control = new Point(0, 0);
    this.current = new Point(0, 0);
    this.points = [];
    this.angles = [];
  }

  isEnd() {
    var {
      i,
      commands
    } = this;
    return i >= commands.length - 1;
  }

  next() {
    var command = this.commands[++this.i];
    this.previousCommand = this.command;
    this.command = command;
    return command;
  }

  getPoint() {
    var xProp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'x';
    var yProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';
    var point = new Point(this.command[xProp], this.command[yProp]);
    return this.makeAbsolute(point);
  }

  getAsControlPoint(xProp, yProp) {
    var point = this.getPoint(xProp, yProp);
    this.control = point;
    return point;
  }

  getAsCurrentPoint(xProp, yProp) {
    var point = this.getPoint(xProp, yProp);
    this.current = point;
    return point;
  }

  getReflectedControlPoint() {
    var previousCommand = this.previousCommand.type;

    if (previousCommand !== _.CURVE_TO && previousCommand !== _.SMOOTH_CURVE_TO && previousCommand !== _.QUAD_TO && previousCommand !== _.SMOOTH_QUAD_TO) {
      return this.current;
    } // reflect point


    var {
      current: {
        x: cx,
        y: cy
      },
      control: {
        x: ox,
        y: oy
      }
    } = this;
    var point = new Point(2 * cx - ox, 2 * cy - oy);
    return point;
  }

  makeAbsolute(point) {
    if (this.command.relative) {
      var {
        x,
        y
      } = this.current;
      point.x += x;
      point.y += y;
    }

    return point;
  }

  addMarker(point, from, priorTo) {
    var {
      points,
      angles
    } = this; // if the last angle isn't filled in because we didn't have this point yet ...

    if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
      angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
    }

    this.addMarkerAngle(point, from ? from.angleTo(point) : null);
  }

  addMarkerAngle(point, angle) {
    this.points.push(point);
    this.angles.push(angle);
  }

  getMarkerPoints() {
    return this.points;
  }

  getMarkerAngles() {
    var {
      angles
    } = this;
    var len = angles.length;

    for (var i = 0; i < len; i++) {
      if (!angles[i]) {
        for (var j = i + 1; j < len; j++) {
          if (angles[j]) {
            angles[i] = angles[j];
            break;
          }
        }
      }
    }

    return angles;
  }

}

class RenderedElement extends Element {
  constructor() {
    super(...arguments);
    this.modifiedEmSizeStack = false;
  }

  calculateOpacity() {
    var opacity = 1.0; // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this

    var element = this;

    while (element) {
      var opacityStyle = element.getStyle('opacity', false, true); // no ancestors on style call

      if (opacityStyle.hasValue(true)) {
        opacity *= opacityStyle.getNumber();
      }

      element = element.parent;
    }

    return opacity;
  }

  setContext(ctx) {
    var fromMeasure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!fromMeasure) {
      // causes stack overflow when measuring text with gradients
      // fill
      var fillStyleProp = this.getStyle('fill');
      var fillOpacityStyleProp = this.getStyle('fill-opacity');
      var strokeStyleProp = this.getStyle('stroke');
      var strokeOpacityProp = this.getStyle('stroke-opacity');

      if (fillStyleProp.isUrlDefinition()) {
        var fillStyle = fillStyleProp.getFillStyleDefinition(this, fillOpacityStyleProp);

        if (fillStyle) {
          ctx.fillStyle = fillStyle;
        }
      } else if (fillStyleProp.hasValue()) {
        if (fillStyleProp.getString() === 'currentColor') {
          fillStyleProp.setValue(this.getStyle('color').getColor());
        }

        var _fillStyle = fillStyleProp.getColor();

        if (_fillStyle !== 'inherit') {
          ctx.fillStyle = _fillStyle === 'none' ? 'rgba(0,0,0,0)' : _fillStyle;
        }
      }

      if (fillOpacityStyleProp.hasValue()) {
        var _fillStyle2 = new Property(this.document, 'fill', ctx.fillStyle).addOpacity(fillOpacityStyleProp).getColor();

        ctx.fillStyle = _fillStyle2;
      } // stroke


      if (strokeStyleProp.isUrlDefinition()) {
        var strokeStyle = strokeStyleProp.getFillStyleDefinition(this, strokeOpacityProp);

        if (strokeStyle) {
          ctx.strokeStyle = strokeStyle;
        }
      } else if (strokeStyleProp.hasValue()) {
        if (strokeStyleProp.getString() === 'currentColor') {
          strokeStyleProp.setValue(this.getStyle('color').getColor());
        }

        var _strokeStyle = strokeStyleProp.getString();

        if (_strokeStyle !== 'inherit') {
          ctx.strokeStyle = _strokeStyle === 'none' ? 'rgba(0,0,0,0)' : _strokeStyle;
        }
      }

      if (strokeOpacityProp.hasValue()) {
        var _strokeStyle2 = new Property(this.document, 'stroke', ctx.strokeStyle).addOpacity(strokeOpacityProp).getString();

        ctx.strokeStyle = _strokeStyle2;
      }

      var strokeWidthStyleProp = this.getStyle('stroke-width');

      if (strokeWidthStyleProp.hasValue()) {
        var newLineWidth = strokeWidthStyleProp.getPixels();
        ctx.lineWidth = !newLineWidth ? PSEUDO_ZERO // browsers don't respect 0 (or node-canvas? :-)
        : newLineWidth;
      }

      var strokeLinecapStyleProp = this.getStyle('stroke-linecap');
      var strokeLinejoinStyleProp = this.getStyle('stroke-linejoin');
      var strokeMiterlimitProp = this.getStyle('stroke-miterlimit'); // NEED TEST
      // const pointOrderStyleProp = this.getStyle('paint-order');

      var strokeDasharrayStyleProp = this.getStyle('stroke-dasharray');
      var strokeDashoffsetProp = this.getStyle('stroke-dashoffset');

      if (strokeLinecapStyleProp.hasValue()) {
        ctx.lineCap = strokeLinecapStyleProp.getString();
      }

      if (strokeLinejoinStyleProp.hasValue()) {
        ctx.lineJoin = strokeLinejoinStyleProp.getString();
      }

      if (strokeMiterlimitProp.hasValue()) {
        ctx.miterLimit = strokeMiterlimitProp.getNumber();
      } // NEED TEST
      // if (pointOrderStyleProp.hasValue()) {
      // 	// ?
      // 	ctx.paintOrder = pointOrderStyleProp.getValue();
      // }


      if (strokeDasharrayStyleProp.hasValue() && strokeDasharrayStyleProp.getString() !== 'none') {
        var gaps = toNumbers(strokeDasharrayStyleProp.getString());

        if (typeof ctx.setLineDash !== 'undefined') {
          ctx.setLineDash(gaps);
        } else // @ts-expect-error Handle browser prefix.
          if (typeof ctx.webkitLineDash !== 'undefined') {
            // @ts-expect-error Handle browser prefix.
            ctx.webkitLineDash = gaps;
          } else // @ts-expect-error Handle browser prefix.
            if (typeof ctx.mozDash !== 'undefined' && !(gaps.length === 1 && gaps[0] === 0)) {
              // @ts-expect-error Handle browser prefix.
              ctx.mozDash = gaps;
            }

        var offset = strokeDashoffsetProp.getPixels();

        if (typeof ctx.lineDashOffset !== 'undefined') {
          ctx.lineDashOffset = offset;
        } else // @ts-expect-error Handle browser prefix.
          if (typeof ctx.webkitLineDashOffset !== 'undefined') {
            // @ts-expect-error Handle browser prefix.
            ctx.webkitLineDashOffset = offset;
          } else // @ts-expect-error Handle browser prefix.
            if (typeof ctx.mozDashOffset !== 'undefined') {
              // @ts-expect-error Handle browser prefix.
              ctx.mozDashOffset = offset;
            }
      }
    } // font


    this.modifiedEmSizeStack = false;

    if (typeof ctx.font !== 'undefined') {
      var fontStyleProp = this.getStyle('font');
      var fontStyleStyleProp = this.getStyle('font-style');
      var fontVariantStyleProp = this.getStyle('font-variant');
      var fontWeightStyleProp = this.getStyle('font-weight');
      var fontSizeStyleProp = this.getStyle('font-size');
      var fontFamilyStyleProp = this.getStyle('font-family');
      var font = new Font(fontStyleStyleProp.getString(), fontVariantStyleProp.getString(), fontWeightStyleProp.getString(), fontSizeStyleProp.hasValue() ? "".concat(fontSizeStyleProp.getPixels(true), "px") : '', fontFamilyStyleProp.getString(), Font.parse(fontStyleProp.getString(), ctx.font));
      fontStyleStyleProp.setValue(font.fontStyle);
      fontVariantStyleProp.setValue(font.fontVariant);
      fontWeightStyleProp.setValue(font.fontWeight);
      fontSizeStyleProp.setValue(font.fontSize);
      fontFamilyStyleProp.setValue(font.fontFamily);
      ctx.font = font.toString();

      if (fontSizeStyleProp.isPixels()) {
        this.document.emSize = fontSizeStyleProp.getPixels();
        this.modifiedEmSizeStack = true;
      }
    }

    if (!fromMeasure) {
      // effects
      this.applyEffects(ctx); // opacity

      ctx.globalAlpha = this.calculateOpacity();
    }
  }

  clearContext(ctx) {
    super.clearContext(ctx);

    if (this.modifiedEmSizeStack) {
      this.document.popEmSize();
    }
  }

}

class PathElement extends RenderedElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'path';
    this.pathParser = null;
    this.pathParser = new PathParser(this.getAttribute('d').getString());
  }

  path(ctx) {
    var {
      pathParser
    } = this;
    var boundingBox = new BoundingBox();
    pathParser.reset();

    if (ctx) {
      ctx.beginPath();
    }

    while (!pathParser.isEnd()) {
      switch (pathParser.next().type) {
        case PathParser.MOVE_TO:
          this.pathM(ctx, boundingBox);
          break;

        case PathParser.LINE_TO:
          this.pathL(ctx, boundingBox);
          break;

        case PathParser.HORIZ_LINE_TO:
          this.pathH(ctx, boundingBox);
          break;

        case PathParser.VERT_LINE_TO:
          this.pathV(ctx, boundingBox);
          break;

        case PathParser.CURVE_TO:
          this.pathC(ctx, boundingBox);
          break;

        case PathParser.SMOOTH_CURVE_TO:
          this.pathS(ctx, boundingBox);
          break;

        case PathParser.QUAD_TO:
          this.pathQ(ctx, boundingBox);
          break;

        case PathParser.SMOOTH_QUAD_TO:
          this.pathT(ctx, boundingBox);
          break;

        case PathParser.ARC:
          this.pathA(ctx, boundingBox);
          break;

        case PathParser.CLOSE_PATH:
          this.pathZ(ctx, boundingBox);
          break;
      }
    }

    return boundingBox;
  }

  getBoundingBox(_) {
    return this.path();
  }

  getMarkers() {
    var {
      pathParser
    } = this;
    var points = pathParser.getMarkerPoints();
    var angles = pathParser.getMarkerAngles();
    var markers = points.map((point, i) => [point, angles[i]]);
    return markers;
  }

  renderChildren(ctx) {
    this.path(ctx);
    this.document.screen.mouse.checkPath(this, ctx);
    var fillRuleStyleProp = this.getStyle('fill-rule');

    if (ctx.fillStyle !== '') {
      if (fillRuleStyleProp.getString('inherit') !== 'inherit') {
        ctx.fill(fillRuleStyleProp.getString());
      } else {
        ctx.fill();
      }
    }

    if (ctx.strokeStyle !== '') {
      if (this.getAttribute('vector-effect').getString() === 'non-scaling-stroke') {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.stroke();
      }
    }

    var markers = this.getMarkers();

    if (markers) {
      var markersLastIndex = markers.length - 1;
      var markerStartStyleProp = this.getStyle('marker-start');
      var markerMidStyleProp = this.getStyle('marker-mid');
      var markerEndStyleProp = this.getStyle('marker-end');

      if (markerStartStyleProp.isUrlDefinition()) {
        var marker = markerStartStyleProp.getDefinition();
        var [point, angle] = markers[0];
        marker.render(ctx, point, angle);
      }

      if (markerMidStyleProp.isUrlDefinition()) {
        var _marker = markerMidStyleProp.getDefinition();

        for (var i = 1; i < markersLastIndex; i++) {
          var [_point, _angle] = markers[i];

          _marker.render(ctx, _point, _angle);
        }
      }

      if (markerEndStyleProp.isUrlDefinition()) {
        var _marker2 = markerEndStyleProp.getDefinition();

        var [_point2, _angle2] = markers[markersLastIndex];

        _marker2.render(ctx, _point2, _angle2);
      }
    }
  }

  static pathM(pathParser) {
    var point = pathParser.getAsCurrentPoint();
    pathParser.start = pathParser.current;
    return {
      point
    };
  }

  pathM(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      point
    } = PathElement.pathM(pathParser);
    var {
      x,
      y
    } = point;
    pathParser.addMarker(point);
    boundingBox.addPoint(x, y);

    if (ctx) {
      ctx.moveTo(x, y);
    }
  }

  static pathL(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getAsCurrentPoint();
    return {
      current,
      point
    };
  }

  pathL(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = PathElement.pathL(pathParser);
    var {
      x,
      y
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y);

    if (ctx) {
      ctx.lineTo(x, y);
    }
  }

  static pathH(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var point = new Point((command.relative ? current.x : 0) + command.x, current.y);
    pathParser.current = point;
    return {
      current,
      point
    };
  }

  pathH(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = PathElement.pathH(pathParser);
    var {
      x,
      y
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y);

    if (ctx) {
      ctx.lineTo(x, y);
    }
  }

  static pathV(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var point = new Point(current.x, (command.relative ? current.y : 0) + command.y);
    pathParser.current = point;
    return {
      current,
      point
    };
  }

  pathV(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = PathElement.pathV(pathParser);
    var {
      x,
      y
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y);

    if (ctx) {
      ctx.lineTo(x, y);
    }
  }

  static pathC(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getPoint('x1', 'y1');
    var controlPoint = pathParser.getAsControlPoint('x2', 'y2');
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      point,
      controlPoint,
      currentPoint
    };
  }

  pathC(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathC(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, point);
    boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);

    if (ctx) {
      ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }

  static pathS(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getReflectedControlPoint();
    var controlPoint = pathParser.getAsControlPoint('x2', 'y2');
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      point,
      controlPoint,
      currentPoint
    };
  }

  pathS(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathS(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, point);
    boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);

    if (ctx) {
      ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }

  static pathQ(pathParser) {
    var {
      current
    } = pathParser;
    var controlPoint = pathParser.getAsControlPoint('x1', 'y1');
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      controlPoint,
      currentPoint
    };
  }

  pathQ(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      controlPoint,
      currentPoint
    } = PathElement.pathQ(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, controlPoint);
    boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);

    if (ctx) {
      ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }

  static pathT(pathParser) {
    var {
      current
    } = pathParser;
    var controlPoint = pathParser.getReflectedControlPoint();
    pathParser.control = controlPoint;
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      controlPoint,
      currentPoint
    };
  }

  pathT(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      controlPoint,
      currentPoint
    } = PathElement.pathT(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, controlPoint);
    boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);

    if (ctx) {
      ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }

  static pathA(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var {
      rX,
      rY,
      xRot,
      lArcFlag,
      sweepFlag
    } = command;
    var xAxisRotation = xRot * (Math.PI / 180.0);
    var currentPoint = pathParser.getAsCurrentPoint(); // Conversion from endpoint to center parameterization
    // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
    // x1', y1'

    var currp = new Point(Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2.0 + Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2.0, -Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2.0 + Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2.0); // adjust radii

    var l = Math.pow(currp.x, 2) / Math.pow(rX, 2) + Math.pow(currp.y, 2) / Math.pow(rY, 2);

    if (l > 1) {
      rX *= Math.sqrt(l);
      rY *= Math.sqrt(l);
    } // cx', cy'


    var s = (lArcFlag === sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rX, 2) * Math.pow(rY, 2) - Math.pow(rX, 2) * Math.pow(currp.y, 2) - Math.pow(rY, 2) * Math.pow(currp.x, 2)) / (Math.pow(rX, 2) * Math.pow(currp.y, 2) + Math.pow(rY, 2) * Math.pow(currp.x, 2)));

    if (isNaN(s)) {
      s = 0;
    }

    var cpp = new Point(s * rX * currp.y / rY, s * -rY * currp.x / rX); // cx, cy

    var centp = new Point((current.x + currentPoint.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (current.y + currentPoint.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y); // initial angle

    var a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY]); // θ1
    // angle delta

    var u = [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY];
    var v = [(-currp.x - cpp.x) / rX, (-currp.y - cpp.y) / rY];
    var ad = vectorsAngle(u, v); // Δθ

    if (vectorsRatio(u, v) <= -1) {
      ad = Math.PI;
    }

    if (vectorsRatio(u, v) >= 1) {
      ad = 0;
    }

    return {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    };
  }

  pathA(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    } = PathElement.pathA(pathParser); // for markers

    var dir = 1 - sweepFlag ? 1.0 : -1.0;
    var ah = a1 + dir * (ad / 2.0);
    var halfWay = new Point(centp.x + rX * Math.cos(ah), centp.y + rY * Math.sin(ah));
    pathParser.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
    pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);
    boundingBox.addPoint(currentPoint.x, currentPoint.y); // TODO: this is too naive, make it better

    if (ctx && !isNaN(a1) && !isNaN(ad)) {
      var r = rX > rY ? rX : rY;
      var sx = rX > rY ? 1 : rX / rY;
      var sy = rX > rY ? rY / rX : 1;
      ctx.translate(centp.x, centp.y);
      ctx.rotate(xAxisRotation);
      ctx.scale(sx, sy);
      ctx.arc(0, 0, r, a1, a1 + ad, Boolean(1 - sweepFlag));
      ctx.scale(1 / sx, 1 / sy);
      ctx.rotate(-xAxisRotation);
      ctx.translate(-centp.x, -centp.y);
    }
  }

  static pathZ(pathParser) {
    pathParser.current = pathParser.start;
  }

  pathZ(ctx, boundingBox) {
    PathElement.pathZ(this.pathParser);

    if (ctx) {
      // only close path if it is not a straight line
      if (boundingBox.x1 !== boundingBox.x2 && boundingBox.y1 !== boundingBox.y2) {
        ctx.closePath();
      }
    }
  }

}

class GlyphElement extends PathElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'glyph';
    this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber();
    this.unicode = this.getAttribute('unicode').getString();
    this.arabicForm = this.getAttribute('arabic-form').getString();
  }

}

class TextElement extends RenderedElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, new.target === TextElement ? true : captureTextNodes);
    this.type = 'text';
    this.x = 0;
    this.y = 0;
    this.measureCache = -1;
  }

  setContext(ctx) {
    var fromMeasure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    super.setContext(ctx, fromMeasure);
    var textBaseline = this.getStyle('dominant-baseline').getTextBaseline() || this.getStyle('alignment-baseline').getTextBaseline();

    if (textBaseline) {
      ctx.textBaseline = textBaseline;
    }
  }

  initializeCoordinates() {
    this.x = 0;
    this.y = 0;
    this.leafTexts = [];
    this.textChunkStart = 0;
    this.minX = Number.POSITIVE_INFINITY;
    this.maxX = Number.NEGATIVE_INFINITY;
  }

  getBoundingBox(ctx) {
    if (this.type !== 'text') {
      return this.getTElementBoundingBox(ctx);
    } // first, calculate child positions


    this.initializeCoordinates();
    this.adjustChildCoordinatesRecursive(ctx);
    var boundingBox = null; // then calculate bounding box

    this.children.forEach((_, i) => {
      var childBoundingBox = this.getChildBoundingBox(ctx, this, this, i);

      if (!boundingBox) {
        boundingBox = childBoundingBox;
      } else {
        boundingBox.addBoundingBox(childBoundingBox);
      }
    });
    return boundingBox;
  }

  getFontSize() {
    var {
      document,
      parent
    } = this;
    var inheritFontSize = Font.parse(document.ctx.font).fontSize;
    var fontSize = parent.getStyle('font-size').getNumber(inheritFontSize);
    return fontSize;
  }

  getTElementBoundingBox(ctx) {
    var fontSize = this.getFontSize();
    return new BoundingBox(this.x, this.y - fontSize, this.x + this.measureText(ctx), this.y);
  }

  getGlyph(font, text, i) {
    var char = text[i];
    var glyph = null;

    if (font.isArabic) {
      var len = text.length;
      var prevChar = text[i - 1];
      var nextChar = text[i + 1];
      var arabicForm = 'isolated';

      if ((i === 0 || prevChar === ' ') && i < len - 1 && nextChar !== ' ') {
        arabicForm = 'terminal';
      }

      if (i > 0 && prevChar !== ' ' && i < len - 1 && nextChar !== ' ') {
        arabicForm = 'medial';
      }

      if (i > 0 && prevChar !== ' ' && (i === len - 1 || nextChar === ' ')) {
        arabicForm = 'initial';
      }

      if (typeof font.glyphs[char] !== 'undefined') {
        // NEED TEST
        var maybeGlyph = font.glyphs[char];
        glyph = maybeGlyph instanceof GlyphElement ? maybeGlyph : maybeGlyph[arabicForm];
      }
    } else {
      glyph = font.glyphs[char];
    }

    if (!glyph) {
      glyph = font.missingGlyph;
    }

    return glyph;
  }

  getText() {
    return '';
  }

  getTextFromNode(node) {
    var textNode = node || this.node;
    var childNodes = Array.from(textNode.parentNode.childNodes);
    var index = childNodes.indexOf(textNode);
    var lastIndex = childNodes.length - 1;
    var text = compressSpaces( // textNode.value
    // || textNode.text
    textNode.textContent || '');

    if (index === 0) {
      text = trimLeft(text);
    }

    if (index === lastIndex) {
      text = trimRight(text);
    }

    return text;
  }

  renderChildren(ctx) {
    if (this.type !== 'text') {
      this.renderTElementChildren(ctx);
      return;
    } // first, calculate child positions


    this.initializeCoordinates();
    this.adjustChildCoordinatesRecursive(ctx); // then render

    this.children.forEach((_, i) => {
      this.renderChild(ctx, this, this, i);
    });
    var {
      mouse
    } = this.document.screen; // Do not calc bounding box if mouse is not working.

    if (mouse.isWorking()) {
      mouse.checkBoundingBox(this, this.getBoundingBox(ctx));
    }
  }

  renderTElementChildren(ctx) {
    var {
      document,
      parent
    } = this;
    var renderText = this.getText();
    var customFont = parent.getStyle('font-family').getDefinition();

    if (customFont) {
      var {
        unitsPerEm
      } = customFont.fontFace;
      var ctxFont = Font.parse(document.ctx.font);
      var fontSize = parent.getStyle('font-size').getNumber(ctxFont.fontSize);
      var fontStyle = parent.getStyle('font-style').getString(ctxFont.fontStyle);
      var scale = fontSize / unitsPerEm;
      var text = customFont.isRTL ? renderText.split('').reverse().join('') : renderText;
      var dx = toNumbers(parent.getAttribute('dx').getString());
      var len = text.length;

      for (var i = 0; i < len; i++) {
        var glyph = this.getGlyph(customFont, text, i);
        ctx.translate(this.x, this.y);
        ctx.scale(scale, -scale);
        var lw = ctx.lineWidth;
        ctx.lineWidth = ctx.lineWidth * unitsPerEm / fontSize;

        if (fontStyle === 'italic') {
          ctx.transform(1, 0, .4, 1, 0, 0);
        }

        glyph.render(ctx);

        if (fontStyle === 'italic') {
          ctx.transform(1, 0, -.4, 1, 0, 0);
        }

        ctx.lineWidth = lw;
        ctx.scale(1 / scale, -1 / scale);
        ctx.translate(-this.x, -this.y);
        this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / unitsPerEm;

        if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
          this.x += dx[i];
        }
      }

      return;
    }

    var {
      x,
      y
    } = this; // NEED TEST
    // if (ctx.paintOrder === 'stroke') {
    // 	if (ctx.strokeStyle) {
    // 		ctx.strokeText(renderText, x, y);
    // 	}
    // 	if (ctx.fillStyle) {
    // 		ctx.fillText(renderText, x, y);
    // 	}
    // } else {

    if (ctx.fillStyle) {
      ctx.fillText(renderText, x, y);
    }

    if (ctx.strokeStyle) {
      ctx.strokeText(renderText, x, y);
    } // }

  }

  applyAnchoring() {
    if (this.textChunkStart >= this.leafTexts.length) {
      return;
    } // This is basically the "Apply anchoring" part of https://www.w3.org/TR/SVG2/text.html#TextLayoutAlgorithm.
    // The difference is that we apply the anchoring as soon as a chunk is finished. This saves some extra looping.
    // Vertical text is not supported.


    var firstElement = this.leafTexts[this.textChunkStart];
    var textAnchor = firstElement.getStyle('text-anchor').getString('start');
    var isRTL = false; // we treat RTL like LTR

    var shift = 0;

    if (textAnchor === 'start' && !isRTL || textAnchor === 'end' && isRTL) {
      shift = firstElement.x - this.minX;
    } else if (textAnchor === 'end' && !isRTL || textAnchor === 'start' && isRTL) {
      shift = firstElement.x - this.maxX;
    } else {
      shift = firstElement.x - (this.minX + this.maxX) / 2;
    }

    for (var i = this.textChunkStart; i < this.leafTexts.length; i++) {
      this.leafTexts[i].x += shift;
    } // start new chunk


    this.minX = Number.POSITIVE_INFINITY;
    this.maxX = Number.NEGATIVE_INFINITY;
    this.textChunkStart = this.leafTexts.length;
  }

  adjustChildCoordinatesRecursive(ctx) {
    this.children.forEach((_, i) => {
      this.adjustChildCoordinatesRecursiveCore(ctx, this, this, i);
    });
    this.applyAnchoring();
  }

  adjustChildCoordinatesRecursiveCore(ctx, textParent, parent, i) {
    var child = parent.children[i];

    if (child.children.length > 0) {
      child.children.forEach((_, i) => {
        textParent.adjustChildCoordinatesRecursiveCore(ctx, textParent, child, i);
      });
    } else {
      // only leafs are relevant
      this.adjustChildCoordinates(ctx, textParent, parent, i);
    }
  }

  adjustChildCoordinates(ctx, textParent, parent, i) {
    var child = parent.children[i];

    if (typeof child.measureText !== 'function') {
      return child;
    }

    ctx.save();
    child.setContext(ctx, true);
    var xAttr = child.getAttribute('x');
    var yAttr = child.getAttribute('y');
    var dxAttr = child.getAttribute('dx');
    var dyAttr = child.getAttribute('dy');
    var customFont = child.getStyle('font-family').getDefinition();
    var isRTL = Boolean(customFont) && customFont.isRTL;

    if (i === 0) {
      // First children inherit attributes from parent(s). Positional attributes
      // are only inherited from a parent to it's first child.
      if (!xAttr.hasValue()) {
        xAttr.setValue(child.getInheritedAttribute('x'));
      }

      if (!yAttr.hasValue()) {
        yAttr.setValue(child.getInheritedAttribute('y'));
      }

      if (!dxAttr.hasValue()) {
        dxAttr.setValue(child.getInheritedAttribute('dx'));
      }

      if (!dyAttr.hasValue()) {
        dyAttr.setValue(child.getInheritedAttribute('dy'));
      }
    }

    var width = child.measureText(ctx);

    if (isRTL) {
      textParent.x -= width;
    }

    if (xAttr.hasValue()) {
      // an "x" attribute marks the start of a new chunk
      textParent.applyAnchoring();
      child.x = xAttr.getPixels('x');

      if (dxAttr.hasValue()) {
        child.x += dxAttr.getPixels('x');
      }
    } else {
      if (dxAttr.hasValue()) {
        textParent.x += dxAttr.getPixels('x');
      }

      child.x = textParent.x;
    }

    textParent.x = child.x;

    if (!isRTL) {
      textParent.x += width;
    }

    if (yAttr.hasValue()) {
      child.y = yAttr.getPixels('y');

      if (dyAttr.hasValue()) {
        child.y += dyAttr.getPixels('y');
      }
    } else {
      if (dyAttr.hasValue()) {
        textParent.y += dyAttr.getPixels('y');
      }

      child.y = textParent.y;
    }

    textParent.y = child.y; // update the current chunk and it's bounds

    textParent.leafTexts.push(child);
    textParent.minX = Math.min(textParent.minX, child.x, child.x + width);
    textParent.maxX = Math.max(textParent.maxX, child.x, child.x + width);
    child.clearContext(ctx);
    ctx.restore();
    return child;
  }

  getChildBoundingBox(ctx, textParent, parent, i) {
    var child = parent.children[i]; // not a text node?

    if (typeof child.getBoundingBox !== 'function') {
      return null;
    }

    var boundingBox = child.getBoundingBox(ctx);

    if (!boundingBox) {
      return null;
    }

    child.children.forEach((_, i) => {
      var childBoundingBox = textParent.getChildBoundingBox(ctx, textParent, child, i);
      boundingBox.addBoundingBox(childBoundingBox);
    });
    return boundingBox;
  }

  renderChild(ctx, textParent, parent, i) {
    var child = parent.children[i];
    child.render(ctx);
    child.children.forEach((_, i) => {
      textParent.renderChild(ctx, textParent, child, i);
    });
  }

  measureText(ctx) {
    var {
      measureCache
    } = this;

    if (~measureCache) {
      return measureCache;
    }

    var renderText = this.getText();
    var measure = this.measureTargetText(ctx, renderText);
    this.measureCache = measure;
    return measure;
  }

  measureTargetText(ctx, targetText) {
    if (!targetText.length) {
      return 0;
    }

    var {
      parent
    } = this;
    var customFont = parent.getStyle('font-family').getDefinition();

    if (customFont) {
      var fontSize = this.getFontSize();
      var text = customFont.isRTL ? targetText.split('').reverse().join('') : targetText;
      var dx = toNumbers(parent.getAttribute('dx').getString());
      var len = text.length;
      var _measure = 0;

      for (var i = 0; i < len; i++) {
        var glyph = this.getGlyph(customFont, text, i);
        _measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;

        if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
          _measure += dx[i];
        }
      }

      return _measure;
    }

    if (!ctx.measureText) {
      return targetText.length * 10;
    }

    ctx.save();
    this.setContext(ctx, true);
    var {
      width: measure
    } = ctx.measureText(targetText);
    this.clearContext(ctx);
    ctx.restore();
    return measure;
  }
  /**
   * Inherits positional attributes from {@link TextElement} parent(s). Attributes
   * are only inherited from a parent to its first child.
   * @param name - The attribute name.
   * @returns The attribute value or null.
   */


  getInheritedAttribute(name) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias,consistent-this
    var current = this;

    while (current instanceof TextElement && current.isFirstChild()) {
      var parentAttr = current.parent.getAttribute(name);

      if (parentAttr.hasValue(true)) {
        return parentAttr.getValue('0');
      }

      current = current.parent;
    }

    return null;
  }

}

class TSpanElement extends TextElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, new.target === TSpanElement ? true : captureTextNodes);
    this.type = 'tspan'; // if this node has children, then they own the text

    this.text = this.children.length > 0 ? '' : this.getTextFromNode();
  }

  getText() {
    return this.text;
  }

}

class TextNode extends TSpanElement {
  constructor() {
    super(...arguments);
    this.type = 'textNode';
  }

}

class SVGElement extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = 'svg';
    this.root = false;
  }

  setContext(ctx) {
    var _this$node$parentNode;

    var {
      document
    } = this;
    var {
      screen,
      window
    } = document;
    var canvas = ctx.canvas;
    screen.setDefaults(ctx);

    if (canvas.style && typeof ctx.font !== 'undefined' && window && typeof window.getComputedStyle !== 'undefined') {
      ctx.font = window.getComputedStyle(canvas).getPropertyValue('font');
      var fontSizeProp = new Property(document, 'fontSize', Font.parse(ctx.font).fontSize);

      if (fontSizeProp.hasValue()) {
        document.rootEmSize = fontSizeProp.getPixels('y');
        document.emSize = document.rootEmSize;
      }
    } // create new view port


    if (!this.getAttribute('x').hasValue()) {
      this.getAttribute('x', true).setValue(0);
    }

    if (!this.getAttribute('y').hasValue()) {
      this.getAttribute('y', true).setValue(0);
    }

    var {
      width,
      height
    } = screen.viewPort;

    if (!this.getStyle('width').hasValue()) {
      this.getStyle('width', true).setValue('100%');
    }

    if (!this.getStyle('height').hasValue()) {
      this.getStyle('height', true).setValue('100%');
    }

    if (!this.getStyle('color').hasValue()) {
      this.getStyle('color', true).setValue('black');
    }

    var refXAttr = this.getAttribute('refX');
    var refYAttr = this.getAttribute('refY');
    var viewBoxAttr = this.getAttribute('viewBox');
    var viewBox = viewBoxAttr.hasValue() ? toNumbers(viewBoxAttr.getString()) : null;
    var clip = !this.root && this.getStyle('overflow').getValue('hidden') !== 'visible';
    var minX = 0;
    var minY = 0;
    var clipX = 0;
    var clipY = 0;

    if (viewBox) {
      minX = viewBox[0];
      minY = viewBox[1];
    }

    if (!this.root) {
      width = this.getStyle('width').getPixels('x');
      height = this.getStyle('height').getPixels('y');

      if (this.type === 'marker') {
        clipX = minX;
        clipY = minY;
        minX = 0;
        minY = 0;
      }
    }

    screen.viewPort.setCurrent(width, height); // Default value of transform-origin is center only for root SVG elements
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform-origin

    if (this.node // is not temporary SVGElement
    && (!this.parent || ((_this$node$parentNode = this.node.parentNode) === null || _this$node$parentNode === void 0 ? void 0 : _this$node$parentNode.nodeName) === 'foreignObject') && this.getStyle('transform', false, true).hasValue() && !this.getStyle('transform-origin', false, true).hasValue()) {
      this.getStyle('transform-origin', true, true).setValue('50% 50%');
    }

    super.setContext(ctx);
    ctx.translate(this.getAttribute('x').getPixels('x'), this.getAttribute('y').getPixels('y'));

    if (viewBox) {
      width = viewBox[2];
      height = viewBox[3];
    }

    document.setViewBox({
      ctx,
      aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
      width: screen.viewPort.width,
      desiredWidth: width,
      height: screen.viewPort.height,
      desiredHeight: height,
      minX,
      minY,
      refX: refXAttr.getValue(),
      refY: refYAttr.getValue(),
      clip,
      clipX,
      clipY
    });

    if (viewBox) {
      screen.viewPort.removeCurrent();
      screen.viewPort.setCurrent(width, height);
    }
  }

  clearContext(ctx) {
    super.clearContext(ctx);
    this.document.screen.viewPort.removeCurrent();
  }
  /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */


  resize(width) {
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
    var preserveAspectRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var widthAttr = this.getAttribute('width', true);
    var heightAttr = this.getAttribute('height', true);
    var viewBoxAttr = this.getAttribute('viewBox');
    var styleAttr = this.getAttribute('style');
    var originWidth = widthAttr.getNumber(0);
    var originHeight = heightAttr.getNumber(0);

    if (preserveAspectRatio) {
      if (typeof preserveAspectRatio === 'string') {
        this.getAttribute('preserveAspectRatio', true).setValue(preserveAspectRatio);
      } else {
        var preserveAspectRatioAttr = this.getAttribute('preserveAspectRatio');

        if (preserveAspectRatioAttr.hasValue()) {
          preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, '$1'));
        }
      }
    }

    widthAttr.setValue(width);
    heightAttr.setValue(height);

    if (!viewBoxAttr.hasValue()) {
      viewBoxAttr.setValue("0 0 ".concat(originWidth || width, " ").concat(originHeight || height));
    }

    if (styleAttr.hasValue()) {
      var widthStyle = this.getStyle('width');
      var heightStyle = this.getStyle('height');

      if (widthStyle.hasValue()) {
        widthStyle.setValue("".concat(width, "px"));
      }

      if (heightStyle.hasValue()) {
        heightStyle.setValue("".concat(height, "px"));
      }
    }
  }

}

class RectElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = 'rect';
  }

  path(ctx) {
    var x = this.getAttribute('x').getPixels('x');
    var y = this.getAttribute('y').getPixels('y');
    var width = this.getStyle('width', false, true).getPixels('x');
    var height = this.getStyle('height', false, true).getPixels('y');
    var rxAttr = this.getAttribute('rx');
    var ryAttr = this.getAttribute('ry');
    var rx = rxAttr.getPixels('x');
    var ry = ryAttr.getPixels('y');

    if (rxAttr.hasValue() && !ryAttr.hasValue()) {
      ry = rx;
    }

    if (ryAttr.hasValue() && !rxAttr.hasValue()) {
      rx = ry;
    }

    rx = Math.min(rx, width / 2.0);
    ry = Math.min(ry, height / 2.0);

    if (ctx) {
      var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
      ctx.beginPath(); // always start the path so we don't fill prior paths

      if (height > 0 && width > 0) {
        ctx.moveTo(x + rx, y);
        ctx.lineTo(x + width - rx, y);
        ctx.bezierCurveTo(x + width - rx + KAPPA * rx, y, x + width, y + ry - KAPPA * ry, x + width, y + ry);
        ctx.lineTo(x + width, y + height - ry);
        ctx.bezierCurveTo(x + width, y + height - ry + KAPPA * ry, x + width - rx + KAPPA * rx, y + height, x + width - rx, y + height);
        ctx.lineTo(x + rx, y + height);
        ctx.bezierCurveTo(x + rx - KAPPA * rx, y + height, x, y + height - ry + KAPPA * ry, x, y + height - ry);
        ctx.lineTo(x, y + ry);
        ctx.bezierCurveTo(x, y + ry - KAPPA * ry, x + rx - KAPPA * rx, y, x + rx, y);
        ctx.closePath();
      }
    }

    return new BoundingBox(x, y, x + width, y + height);
  }

  getMarkers() {
    return null;
  }

}

class CircleElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = 'circle';
  }

  path(ctx) {
    var cx = this.getAttribute('cx').getPixels('x');
    var cy = this.getAttribute('cy').getPixels('y');
    var r = this.getAttribute('r').getPixels();

    if (ctx && r > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
      ctx.closePath();
    }

    return new BoundingBox(cx - r, cy - r, cx + r, cy + r);
  }

  getMarkers() {
    return null;
  }

}

class EllipseElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = 'ellipse';
  }

  path(ctx) {
    var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
    var rx = this.getAttribute('rx').getPixels('x');
    var ry = this.getAttribute('ry').getPixels('y');
    var cx = this.getAttribute('cx').getPixels('x');
    var cy = this.getAttribute('cy').getPixels('y');

    if (ctx && rx > 0 && ry > 0) {
      ctx.beginPath();
      ctx.moveTo(cx + rx, cy);
      ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
      ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
      ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
      ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
      ctx.closePath();
    }

    return new BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
  }

  getMarkers() {
    return null;
  }

}

class LineElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = 'line';
  }

  getPoints() {
    return [new Point(this.getAttribute('x1').getPixels('x'), this.getAttribute('y1').getPixels('y')), new Point(this.getAttribute('x2').getPixels('x'), this.getAttribute('y2').getPixels('y'))];
  }

  path(ctx) {
    var [{
      x: x0,
      y: y0
    }, {
      x: x1,
      y: y1
    }] = this.getPoints();

    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
    }

    return new BoundingBox(x0, y0, x1, y1);
  }

  getMarkers() {
    var [p0, p1] = this.getPoints();
    var a = p0.angleTo(p1);
    return [[p0, a], [p1, a]];
  }

}

class PolylineElement extends PathElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'polyline';
    this.points = [];
    this.points = Point.parsePath(this.getAttribute('points').getString());
  }

  path(ctx) {
    var {
      points
    } = this;
    var [{
      x: x0,
      y: y0
    }] = points;
    var boundingBox = new BoundingBox(x0, y0);

    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
    }

    points.forEach(_ref => {
      var {
        x,
        y
      } = _ref;
      boundingBox.addPoint(x, y);

      if (ctx) {
        ctx.lineTo(x, y);
      }
    });
    return boundingBox;
  }

  getMarkers() {
    var {
      points
    } = this;
    var lastIndex = points.length - 1;
    var markers = [];
    points.forEach((point, i) => {
      if (i === lastIndex) {
        return;
      }

      markers.push([point, point.angleTo(points[i + 1])]);
    });

    if (markers.length > 0) {
      markers.push([points[points.length - 1], markers[markers.length - 1][1]]);
    }

    return markers;
  }

}

class PolygonElement extends PolylineElement {
  constructor() {
    super(...arguments);
    this.type = 'polygon';
  }

  path(ctx) {
    var boundingBox = super.path(ctx);
    var [{
      x,
      y
    }] = this.points;

    if (ctx) {
      ctx.lineTo(x, y);
      ctx.closePath();
    }

    return boundingBox;
  }

}

class PatternElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'pattern';
  }

  createPattern(ctx, _, parentOpacityProp) {
    var width = this.getStyle('width').getPixels('x', true);
    var height = this.getStyle('height').getPixels('y', true); // render me using a temporary svg element

    var patternSvg = new SVGElement(this.document, null);
    patternSvg.attributes.viewBox = new Property(this.document, 'viewBox', this.getAttribute('viewBox').getValue());
    patternSvg.attributes.width = new Property(this.document, 'width', "".concat(width, "px"));
    patternSvg.attributes.height = new Property(this.document, 'height', "".concat(height, "px"));
    patternSvg.attributes.transform = new Property(this.document, 'transform', this.getAttribute('patternTransform').getValue());
    patternSvg.children = this.children;
    var patternCanvas = this.document.createCanvas(width, height);
    var patternCtx = patternCanvas.getContext('2d');
    var xAttr = this.getAttribute('x');
    var yAttr = this.getAttribute('y');

    if (xAttr.hasValue() && yAttr.hasValue()) {
      patternCtx.translate(xAttr.getPixels('x', true), yAttr.getPixels('y', true));
    }

    if (parentOpacityProp.hasValue()) {
      this.styles['fill-opacity'] = parentOpacityProp;
    } else {
      Reflect.deleteProperty(this.styles, 'fill-opacity');
    } // render 3x3 grid so when we transform there's no white space on edges


    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        patternCtx.save();
        patternSvg.attributes.x = new Property(this.document, 'x', x * patternCanvas.width);
        patternSvg.attributes.y = new Property(this.document, 'y', y * patternCanvas.height);
        patternSvg.render(patternCtx);
        patternCtx.restore();
      }
    }

    var pattern = ctx.createPattern(patternCanvas, 'repeat');
    return pattern;
  }

}

class MarkerElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'marker';
  }

  render(ctx, point, angle) {
    if (!point) {
      return;
    }

    var {
      x,
      y
    } = point;
    var orient = this.getAttribute('orient').getString('auto');
    var markerUnits = this.getAttribute('markerUnits').getString('strokeWidth');
    ctx.translate(x, y);

    if (orient === 'auto') {
      ctx.rotate(angle);
    }

    if (markerUnits === 'strokeWidth') {
      ctx.scale(ctx.lineWidth, ctx.lineWidth);
    }

    ctx.save(); // render me using a temporary svg element

    var markerSvg = new SVGElement(this.document, null);
    markerSvg.type = this.type;
    markerSvg.attributes.viewBox = new Property(this.document, 'viewBox', this.getAttribute('viewBox').getValue());
    markerSvg.attributes.refX = new Property(this.document, 'refX', this.getAttribute('refX').getValue());
    markerSvg.attributes.refY = new Property(this.document, 'refY', this.getAttribute('refY').getValue());
    markerSvg.attributes.width = new Property(this.document, 'width', this.getAttribute('markerWidth').getValue());
    markerSvg.attributes.height = new Property(this.document, 'height', this.getAttribute('markerHeight').getValue());
    markerSvg.attributes.overflow = new Property(this.document, 'overflow', this.getAttribute('overflow').getValue());
    markerSvg.attributes.fill = new Property(this.document, 'fill', this.getAttribute('fill').getColor('black'));
    markerSvg.attributes.stroke = new Property(this.document, 'stroke', this.getAttribute('stroke').getValue('none'));
    markerSvg.children = this.children;
    markerSvg.render(ctx);
    ctx.restore();

    if (markerUnits === 'strokeWidth') {
      ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
    }

    if (orient === 'auto') {
      ctx.rotate(-angle);
    }

    ctx.translate(-x, -y);
  }

}

class DefsElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'defs';
  }

  render() {// NOOP
  }

}

class GElement extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = 'g';
  }

  getBoundingBox(ctx) {
    var boundingBox = new BoundingBox();
    this.children.forEach(child => {
      boundingBox.addBoundingBox(child.getBoundingBox(ctx));
    });
    return boundingBox;
  }

}

class GradientElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.attributesToInherit = ['gradientUnits'];
    this.stops = [];
    var {
      stops,
      children
    } = this;
    children.forEach(child => {
      if (child.type === 'stop') {
        stops.push(child);
      }
    });
  }

  getGradientUnits() {
    return this.getAttribute('gradientUnits').getString('objectBoundingBox');
  }

  createGradient(ctx, element, parentOpacityProp) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this
    var stopsContainer = this;

    if (this.getHrefAttribute().hasValue()) {
      stopsContainer = this.getHrefAttribute().getDefinition();
      this.inheritStopContainer(stopsContainer);
    }

    var {
      stops
    } = stopsContainer;
    var gradient = this.getGradient(ctx, element);

    if (!gradient) {
      return this.addParentOpacity(parentOpacityProp, stops[stops.length - 1].color);
    }

    stops.forEach(stop => {
      gradient.addColorStop(stop.offset, this.addParentOpacity(parentOpacityProp, stop.color));
    });

    if (this.getAttribute('gradientTransform').hasValue()) {
      // render as transformed pattern on temporary canvas
      var {
        document
      } = this;
      var {
        MAX_VIRTUAL_PIXELS,
        viewPort
      } = document.screen;
      var [rootView] = viewPort.viewPorts;
      var rect = new RectElement(document, null);
      rect.attributes.x = new Property(document, 'x', -MAX_VIRTUAL_PIXELS / 3.0);
      rect.attributes.y = new Property(document, 'y', -MAX_VIRTUAL_PIXELS / 3.0);
      rect.attributes.width = new Property(document, 'width', MAX_VIRTUAL_PIXELS);
      rect.attributes.height = new Property(document, 'height', MAX_VIRTUAL_PIXELS);
      var group = new GElement(document, null);
      group.attributes.transform = new Property(document, 'transform', this.getAttribute('gradientTransform').getValue());
      group.children = [rect];
      var patternSvg = new SVGElement(document, null);
      patternSvg.attributes.x = new Property(document, 'x', 0);
      patternSvg.attributes.y = new Property(document, 'y', 0);
      patternSvg.attributes.width = new Property(document, 'width', rootView.width);
      patternSvg.attributes.height = new Property(document, 'height', rootView.height);
      patternSvg.children = [group];
      var patternCanvas = document.createCanvas(rootView.width, rootView.height);
      var patternCtx = patternCanvas.getContext('2d');
      patternCtx.fillStyle = gradient;
      patternSvg.render(patternCtx);
      return patternCtx.createPattern(patternCanvas, 'no-repeat');
    }

    return gradient;
  }

  inheritStopContainer(stopsContainer) {
    this.attributesToInherit.forEach(attributeToInherit => {
      if (!this.getAttribute(attributeToInherit).hasValue() && stopsContainer.getAttribute(attributeToInherit).hasValue()) {
        this.getAttribute(attributeToInherit, true).setValue(stopsContainer.getAttribute(attributeToInherit).getValue());
      }
    });
  }

  addParentOpacity(parentOpacityProp, color) {
    if (parentOpacityProp.hasValue()) {
      var colorProp = new Property(this.document, 'color', color);
      return colorProp.addOpacity(parentOpacityProp).getColor();
    }

    return color;
  }

}

class LinearGradientElement extends GradientElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'linearGradient';
    this.attributesToInherit.push('x1', 'y1', 'x2', 'y2');
  }

  getGradient(ctx, element) {
    var isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox';
    var boundingBox = isBoundingBoxUnits ? element.getBoundingBox(ctx) : null;

    if (isBoundingBoxUnits && !boundingBox) {
      return null;
    }

    if (!this.getAttribute('x1').hasValue() && !this.getAttribute('y1').hasValue() && !this.getAttribute('x2').hasValue() && !this.getAttribute('y2').hasValue()) {
      this.getAttribute('x1', true).setValue(0);
      this.getAttribute('y1', true).setValue(0);
      this.getAttribute('x2', true).setValue(1);
      this.getAttribute('y2', true).setValue(0);
    }

    var x1 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('x1').getNumber() : this.getAttribute('x1').getPixels('x');
    var y1 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('y1').getNumber() : this.getAttribute('y1').getPixels('y');
    var x2 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('x2').getNumber() : this.getAttribute('x2').getPixels('x');
    var y2 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('y2').getNumber() : this.getAttribute('y2').getPixels('y');

    if (x1 === x2 && y1 === y2) {
      return null;
    }

    return ctx.createLinearGradient(x1, y1, x2, y2);
  }

}

class RadialGradientElement extends GradientElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'radialGradient';
    this.attributesToInherit.push('cx', 'cy', 'r', 'fx', 'fy', 'fr');
  }

  getGradient(ctx, element) {
    var isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox';
    var boundingBox = element.getBoundingBox(ctx);

    if (isBoundingBoxUnits && !boundingBox) {
      return null;
    }

    if (!this.getAttribute('cx').hasValue()) {
      this.getAttribute('cx', true).setValue('50%');
    }

    if (!this.getAttribute('cy').hasValue()) {
      this.getAttribute('cy', true).setValue('50%');
    }

    if (!this.getAttribute('r').hasValue()) {
      this.getAttribute('r', true).setValue('50%');
    }

    var cx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('cx').getNumber() : this.getAttribute('cx').getPixels('x');
    var cy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('cy').getNumber() : this.getAttribute('cy').getPixels('y');
    var fx = cx;
    var fy = cy;

    if (this.getAttribute('fx').hasValue()) {
      fx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('fx').getNumber() : this.getAttribute('fx').getPixels('x');
    }

    if (this.getAttribute('fy').hasValue()) {
      fy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('fy').getNumber() : this.getAttribute('fy').getPixels('y');
    }

    var r = isBoundingBoxUnits ? (boundingBox.width + boundingBox.height) / 2.0 * this.getAttribute('r').getNumber() : this.getAttribute('r').getPixels();
    var fr = this.getAttribute('fr').getPixels();
    return ctx.createRadialGradient(fx, fy, fr, cx, cy, r);
  }

}

class StopElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'stop';
    var offset = Math.max(0, Math.min(1, this.getAttribute('offset').getNumber()));
    var stopOpacity = this.getStyle('stop-opacity');
    var stopColor = this.getStyle('stop-color', true);

    if (stopColor.getString() === '') {
      stopColor.setValue('#000');
    }

    if (stopOpacity.hasValue()) {
      stopColor = stopColor.addOpacity(stopOpacity);
    }

    this.offset = offset;
    this.color = stopColor.getColor();
  }

}

class AnimateElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'animate';
    this.duration = 0;
    this.initialValue = null;
    this.initialUnits = '';
    this.removed = false;
    this.frozen = false;
    document.screen.animations.push(this);
    this.begin = this.getAttribute('begin').getMilliseconds();
    this.maxDuration = this.begin + this.getAttribute('dur').getMilliseconds();
    this.from = this.getAttribute('from');
    this.to = this.getAttribute('to');
    this.values = new Property(document, 'values', null);
    var valuesAttr = this.getAttribute('values');

    if (valuesAttr.hasValue()) {
      this.values.setValue(valuesAttr.getString().split(';'));
    }
  }

  getProperty() {
    var attributeType = this.getAttribute('attributeType').getString();
    var attributeName = this.getAttribute('attributeName').getString();

    if (attributeType === 'CSS') {
      return this.parent.getStyle(attributeName, true);
    }

    return this.parent.getAttribute(attributeName, true);
  }

  calcValue() {
    var {
      initialUnits
    } = this;
    var {
      progress,
      from,
      to
    } = this.getProgress(); // tween value linearly

    var newValue = from.getNumber() + (to.getNumber() - from.getNumber()) * progress;

    if (initialUnits === '%') {
      newValue *= 100.0; // numValue() returns 0-1 whereas properties are 0-100
    }

    return "".concat(newValue).concat(initialUnits);
  }

  update(delta) {
    var {
      parent
    } = this;
    var prop = this.getProperty(); // set initial value

    if (!this.initialValue) {
      this.initialValue = prop.getString();
      this.initialUnits = prop.getUnits();
    } // if we're past the end time


    if (this.duration > this.maxDuration) {
      var fill = this.getAttribute('fill').getString('remove'); // loop for indefinitely repeating animations

      if (this.getAttribute('repeatCount').getString() === 'indefinite' || this.getAttribute('repeatDur').getString() === 'indefinite') {
        this.duration = 0;
      } else if (fill === 'freeze' && !this.frozen) {
        this.frozen = true;
        parent.animationFrozen = true;
        parent.animationFrozenValue = prop.getString();
      } else if (fill === 'remove' && !this.removed) {
        this.removed = true;
        prop.setValue(parent.animationFrozen ? parent.animationFrozenValue : this.initialValue);
        return true;
      }

      return false;
    }

    this.duration += delta; // if we're past the begin time

    var updated = false;

    if (this.begin < this.duration) {
      var newValue = this.calcValue(); // tween

      var typeAttr = this.getAttribute('type');

      if (typeAttr.hasValue()) {
        // for transform, etc.
        var type = typeAttr.getString();
        newValue = "".concat(type, "(").concat(newValue, ")");
      }

      prop.setValue(newValue);
      updated = true;
    }

    return updated;
  }

  getProgress() {
    var {
      document,
      values
    } = this;
    var result = {
      progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
    };

    if (values.hasValue()) {
      var p = result.progress * (values.getValue().length - 1);
      var lb = Math.floor(p);
      var ub = Math.ceil(p);
      result.from = new Property(document, 'from', parseFloat(values.getValue()[lb]));
      result.to = new Property(document, 'to', parseFloat(values.getValue()[ub]));
      result.progress = (p - lb) / (ub - lb);
    } else {
      result.from = this.from;
      result.to = this.to;
    }

    return result;
  }

}

class AnimateColorElement extends AnimateElement {
  constructor() {
    super(...arguments);
    this.type = 'animateColor';
  }

  calcValue() {
    var {
      progress,
      from,
      to
    } = this.getProgress();
    var colorFrom = new rgbcolor(from.getColor());
    var colorTo = new rgbcolor(to.getColor());

    if (colorFrom.ok && colorTo.ok) {
      // tween color linearly
      var r = colorFrom.r + (colorTo.r - colorFrom.r) * progress;
      var g = colorFrom.g + (colorTo.g - colorFrom.g) * progress;
      var b = colorFrom.b + (colorTo.b - colorFrom.b) * progress; // ? alpha

      return "rgb(".concat(Math.floor(r), ", ").concat(Math.floor(g), ", ").concat(Math.floor(b), ")");
    }

    return this.getAttribute('from').getColor();
  }

}

class AnimateTransformElement extends AnimateElement {
  constructor() {
    super(...arguments);
    this.type = 'animateTransform';
  }

  calcValue() {
    var {
      progress,
      from,
      to
    } = this.getProgress(); // tween value linearly

    var transformFrom = toNumbers(from.getString());
    var transformTo = toNumbers(to.getString());
    var newValue = transformFrom.map((from, i) => {
      var to = transformTo[i];
      return from + (to - from) * progress;
    }).join(' ');
    return newValue;
  }

}

class FontElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'font';
    this.glyphs = {};
    this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber();
    var {
      definitions
    } = document;
    var {
      children
    } = this;

    for (var child of children) {
      switch (child.type) {
        case 'font-face':
          {
            this.fontFace = child;
            var fontFamilyStyle = child.getStyle('font-family');

            if (fontFamilyStyle.hasValue()) {
              definitions[fontFamilyStyle.getString()] = this;
            }

            break;
          }

        case 'missing-glyph':
          this.missingGlyph = child;
          break;

        case 'glyph':
          {
            var glyph = child;

            if (glyph.arabicForm) {
              this.isRTL = true;
              this.isArabic = true;

              if (typeof this.glyphs[glyph.unicode] === 'undefined') {
                this.glyphs[glyph.unicode] = {};
              }

              this.glyphs[glyph.unicode][glyph.arabicForm] = glyph;
            } else {
              this.glyphs[glyph.unicode] = glyph;
            }

            break;
          }
      }
    }
  }

  render() {// NO RENDER
  }

}

class FontFaceElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'font-face';
    this.ascent = this.getAttribute('ascent').getNumber();
    this.descent = this.getAttribute('descent').getNumber();
    this.unitsPerEm = this.getAttribute('units-per-em').getNumber();
  }

}

class MissingGlyphElement extends PathElement {
  constructor() {
    super(...arguments);
    this.type = 'missing-glyph';
    this.horizAdvX = 0;
  }

}

class TRefElement extends TextElement {
  constructor() {
    super(...arguments);
    this.type = 'tref';
  }

  getText() {
    var element = this.getHrefAttribute().getDefinition();

    if (element) {
      var firstChild = element.children[0];

      if (firstChild) {
        return firstChild.getText();
      }
    }

    return '';
  }

}

class AElement extends TextElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'a';
    var {
      childNodes
    } = node;
    var firstChild = childNodes[0];
    var hasText = childNodes.length > 0 && Array.from(childNodes).every(node => node.nodeType === 3);
    this.hasText = hasText;
    this.text = hasText ? this.getTextFromNode(firstChild) : '';
  }

  getText() {
    return this.text;
  }

  renderChildren(ctx) {
    if (this.hasText) {
      // render as text element
      super.renderChildren(ctx);
      var {
        document,
        x,
        y
      } = this;
      var {
        mouse
      } = document.screen;
      var fontSize = new Property(document, 'fontSize', Font.parse(document.ctx.font).fontSize); // Do not calc bounding box if mouse is not working.

      if (mouse.isWorking()) {
        mouse.checkBoundingBox(this, new BoundingBox(x, y - fontSize.getPixels('y'), x + this.measureText(ctx), y));
      }
    } else if (this.children.length > 0) {
      // render as temporary group
      var g = new GElement(this.document, null);
      g.children = this.children;
      g.parent = this;
      g.render(ctx);
    }
  }

  onClick() {
    var {
      window
    } = this.document;

    if (window) {
      window.open(this.getHrefAttribute().getString());
    }
  }

  onMouseMove() {
    var ctx = this.document.ctx;
    ctx.canvas.style.cursor = 'pointer';
  }

}

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
class TextPathElement extends TextElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'textPath';
    this.textWidth = 0;
    this.textHeight = 0;
    this.pathLength = -1;
    this.glyphInfo = null;
    this.letterSpacingCache = [];
    this.measuresCache = new Map([['', 0]]);
    var pathElement = this.getHrefAttribute().getDefinition();
    this.text = this.getTextFromNode();
    this.dataArray = this.parsePathData(pathElement);
  }

  getText() {
    return this.text;
  }

  path(ctx) {
    var {
      dataArray
    } = this;

    if (ctx) {
      ctx.beginPath();
    }

    dataArray.forEach(_ref => {
      var {
        type,
        points
      } = _ref;

      switch (type) {
        case PathParser.LINE_TO:
          if (ctx) {
            ctx.lineTo(points[0], points[1]);
          }

          break;

        case PathParser.MOVE_TO:
          if (ctx) {
            ctx.moveTo(points[0], points[1]);
          }

          break;

        case PathParser.CURVE_TO:
          if (ctx) {
            ctx.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5]);
          }

          break;

        case PathParser.QUAD_TO:
          if (ctx) {
            ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
          }

          break;

        case PathParser.ARC:
          {
            var [cx, cy, rx, ry, theta, dTheta, psi, fs] = points;
            var r = rx > ry ? rx : ry;
            var scaleX = rx > ry ? 1 : rx / ry;
            var scaleY = rx > ry ? ry / rx : 1;

            if (ctx) {
              ctx.translate(cx, cy);
              ctx.rotate(psi);
              ctx.scale(scaleX, scaleY);
              ctx.arc(0, 0, r, theta, theta + dTheta, Boolean(1 - fs));
              ctx.scale(1 / scaleX, 1 / scaleY);
              ctx.rotate(-psi);
              ctx.translate(-cx, -cy);
            }

            break;
          }

        case PathParser.CLOSE_PATH:
          if (ctx) {
            ctx.closePath();
          }

          break;
      }
    });
  }

  renderChildren(ctx) {
    this.setTextData(ctx);
    ctx.save();
    var textDecoration = this.parent.getStyle('text-decoration').getString();
    var fontSize = this.getFontSize();
    var {
      glyphInfo
    } = this;
    var fill = ctx.fillStyle;

    if (textDecoration === 'underline') {
      ctx.beginPath();
    }

    glyphInfo.forEach((glyph, i) => {
      var {
        p0,
        p1,
        rotation,
        text: partialText
      } = glyph;
      ctx.save();
      ctx.translate(p0.x, p0.y);
      ctx.rotate(rotation);

      if (ctx.fillStyle) {
        ctx.fillText(partialText, 0, 0);
      }

      if (ctx.strokeStyle) {
        ctx.strokeText(partialText, 0, 0);
      }

      ctx.restore();

      if (textDecoration === 'underline') {
        if (i === 0) {
          ctx.moveTo(p0.x, p0.y + fontSize / 8);
        }

        ctx.lineTo(p1.x, p1.y + fontSize / 5);
      } // // To assist with debugging visually, uncomment following
      //
      // ctx.beginPath();
      // if (i % 2)
      // 	ctx.strokeStyle = 'red';
      // else
      // 	ctx.strokeStyle = 'green';
      // ctx.moveTo(p0.x, p0.y);
      // ctx.lineTo(p1.x, p1.y);
      // ctx.stroke();
      // ctx.closePath();

    });

    if (textDecoration === 'underline') {
      ctx.lineWidth = fontSize / 20;
      ctx.strokeStyle = fill;
      ctx.stroke();
      ctx.closePath();
    }

    ctx.restore();
  }

  getLetterSpacingAt() {
    var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return this.letterSpacingCache[idx] || 0;
  }

  findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, inputOffset, dy, c, charI) {
    var offset = inputOffset;
    var glyphWidth = this.measureText(ctx, c);

    if (c === ' ' && anchor === 'justify' && textFullWidth < fullPathWidth) {
      glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
    }

    if (charI > -1) {
      offset += this.getLetterSpacingAt(charI);
    }

    var splineStep = this.textHeight / 20;
    var p0 = this.getEquidistantPointOnPath(offset, splineStep, 0);
    var p1 = this.getEquidistantPointOnPath(offset + glyphWidth, splineStep, 0);
    var segment = {
      p0,
      p1
    };
    var rotation = p0 && p1 ? Math.atan2(p1.y - p0.y, p1.x - p0.x) : 0;

    if (dy) {
      var dyX = Math.cos(Math.PI / 2 + rotation) * dy;
      var dyY = Math.cos(-rotation) * dy;
      segment.p0 = _objectSpread$2(_objectSpread$2({}, p0), {}, {
        x: p0.x + dyX,
        y: p0.y + dyY
      });
      segment.p1 = _objectSpread$2(_objectSpread$2({}, p1), {}, {
        x: p1.x + dyX,
        y: p1.y + dyY
      });
    }

    offset += glyphWidth;
    return {
      offset,
      segment,
      rotation
    };
  }

  measureText(ctx, text) {
    var {
      measuresCache
    } = this;
    var targetText = text || this.getText();

    if (measuresCache.has(targetText)) {
      return measuresCache.get(targetText);
    }

    var measure = this.measureTargetText(ctx, targetText);
    measuresCache.set(targetText, measure);
    return measure;
  } // This method supposes what all custom fonts already loaded.
  // If some font will be loaded after this method call, <textPath> will not be rendered correctly.
  // You need to call this method manually to update glyphs cache.


  setTextData(ctx) {
    if (this.glyphInfo) {
      return;
    }

    var renderText = this.getText();
    var chars = renderText.split('');
    var spacesNumber = renderText.split(' ').length - 1;
    var dx = this.parent.getAttribute('dx').split().map(_ => _.getPixels('x'));
    var dy = this.parent.getAttribute('dy').getPixels('y');
    var anchor = this.parent.getStyle('text-anchor').getString('start');
    var thisSpacing = this.getStyle('letter-spacing');
    var parentSpacing = this.parent.getStyle('letter-spacing');
    var letterSpacing = 0;

    if (!thisSpacing.hasValue() || thisSpacing.getValue() === 'inherit') {
      letterSpacing = parentSpacing.getPixels();
    } else if (thisSpacing.hasValue()) {
      if (thisSpacing.getValue() !== 'initial' && thisSpacing.getValue() !== 'unset') {
        letterSpacing = thisSpacing.getPixels();
      }
    } // fill letter-spacing cache


    var letterSpacingCache = [];
    var textLen = renderText.length;
    this.letterSpacingCache = letterSpacingCache;

    for (var i = 0; i < textLen; i++) {
      letterSpacingCache.push(typeof dx[i] !== 'undefined' ? dx[i] : letterSpacing);
    }

    var dxSum = letterSpacingCache.reduce((acc, cur, i) => i === 0 ? 0 : acc + cur || 0, 0);
    var textWidth = this.measureText(ctx);
    var textFullWidth = Math.max(textWidth + dxSum, 0);
    this.textWidth = textWidth;
    this.textHeight = this.getFontSize();
    this.glyphInfo = [];
    var fullPathWidth = this.getPathLength();
    var startOffset = this.getStyle('startOffset').getNumber(0) * fullPathWidth;
    var offset = 0;

    if (anchor === 'middle' || anchor === 'center') {
      offset = -textFullWidth / 2;
    }

    if (anchor === 'end' || anchor === 'right') {
      offset = -textFullWidth;
    }

    offset += startOffset;
    chars.forEach((char, i) => {
      // Find such segment what distance between p0 and p1 is approx. width of glyph
      var {
        offset: nextOffset,
        segment,
        rotation
      } = this.findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, offset, dy, char, i);
      offset = nextOffset;

      if (!segment.p0 || !segment.p1) {
        return;
      } // const width = this.getLineLength(
      // 	segment.p0.x,
      // 	segment.p0.y,
      // 	segment.p1.x,
      // 	segment.p1.y
      // );
      // Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
      // Can foresee having a rough pair table built in that the developer can override as needed.
      // Or use "dx" attribute of the <text> node as a naive replacement
      // const kern = 0;
      // placeholder for future implementation
      // const midpoint = this.getPointOnLine(
      // 	kern + width / 2.0,
      // 	segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y
      // );


      this.glyphInfo.push({
        // transposeX: midpoint.x,
        // transposeY: midpoint.y,
        text: chars[i],
        p0: segment.p0,
        p1: segment.p1,
        rotation
      });
    });
  }

  parsePathData(path) {
    this.pathLength = -1; // reset path length

    if (!path) {
      return [];
    }

    var pathCommands = [];
    var {
      pathParser
    } = path;
    pathParser.reset(); // convert l, H, h, V, and v to L

    while (!pathParser.isEnd()) {
      var {
        current
      } = pathParser;
      var startX = current ? current.x : 0;
      var startY = current ? current.y : 0;
      var command = pathParser.next();
      var nextCommandType = command.type;
      var points = [];

      switch (command.type) {
        case PathParser.MOVE_TO:
          this.pathM(pathParser, points);
          break;

        case PathParser.LINE_TO:
          nextCommandType = this.pathL(pathParser, points);
          break;

        case PathParser.HORIZ_LINE_TO:
          nextCommandType = this.pathH(pathParser, points);
          break;

        case PathParser.VERT_LINE_TO:
          nextCommandType = this.pathV(pathParser, points);
          break;

        case PathParser.CURVE_TO:
          this.pathC(pathParser, points);
          break;

        case PathParser.SMOOTH_CURVE_TO:
          nextCommandType = this.pathS(pathParser, points);
          break;

        case PathParser.QUAD_TO:
          this.pathQ(pathParser, points);
          break;

        case PathParser.SMOOTH_QUAD_TO:
          nextCommandType = this.pathT(pathParser, points);
          break;

        case PathParser.ARC:
          points = this.pathA(pathParser);
          break;

        case PathParser.CLOSE_PATH:
          PathElement.pathZ(pathParser);
          break;
      }

      if (command.type !== PathParser.CLOSE_PATH) {
        pathCommands.push({
          type: nextCommandType,
          points,
          start: {
            x: startX,
            y: startY
          },
          pathLength: this.calcLength(startX, startY, nextCommandType, points)
        });
      } else {
        pathCommands.push({
          type: PathParser.CLOSE_PATH,
          points: [],
          pathLength: 0
        });
      }
    }

    return pathCommands;
  }

  pathM(pathParser, points) {
    var {
      x,
      y
    } = PathElement.pathM(pathParser).point;
    points.push(x, y);
  }

  pathL(pathParser, points) {
    var {
      x,
      y
    } = PathElement.pathL(pathParser).point;
    points.push(x, y);
    return PathParser.LINE_TO;
  }

  pathH(pathParser, points) {
    var {
      x,
      y
    } = PathElement.pathH(pathParser).point;
    points.push(x, y);
    return PathParser.LINE_TO;
  }

  pathV(pathParser, points) {
    var {
      x,
      y
    } = PathElement.pathV(pathParser).point;
    points.push(x, y);
    return PathParser.LINE_TO;
  }

  pathC(pathParser, points) {
    var {
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathC(pathParser);
    points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
  }

  pathS(pathParser, points) {
    var {
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathS(pathParser);
    points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    return PathParser.CURVE_TO;
  }

  pathQ(pathParser, points) {
    var {
      controlPoint,
      currentPoint
    } = PathElement.pathQ(pathParser);
    points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
  }

  pathT(pathParser, points) {
    var {
      controlPoint,
      currentPoint
    } = PathElement.pathT(pathParser);
    points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    return PathParser.QUAD_TO;
  }

  pathA(pathParser) {
    var {
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    } = PathElement.pathA(pathParser);

    if (sweepFlag === 0 && ad > 0) {
      ad -= 2 * Math.PI;
    }

    if (sweepFlag === 1 && ad < 0) {
      ad += 2 * Math.PI;
    }

    return [centp.x, centp.y, rX, rY, a1, ad, xAxisRotation, sweepFlag];
  }

  calcLength(x, y, commandType, points) {
    var len = 0;
    var p1 = null;
    var p2 = null;
    var t = 0;

    switch (commandType) {
      case PathParser.LINE_TO:
        return this.getLineLength(x, y, points[0], points[1]);

      case PathParser.CURVE_TO:
        // Approximates by breaking curve into 100 line segments
        len = 0.0;
        p1 = this.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);

        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = this.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }

        return len;

      case PathParser.QUAD_TO:
        // Approximates by breaking curve into 100 line segments
        len = 0.0;
        p1 = this.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);

        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = this.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }

        return len;

      case PathParser.ARC:
        {
          // Approximates by breaking curve into line segments
          len = 0.0;
          var start = points[4]; // 4 = theta

          var dTheta = points[5]; // 5 = dTheta

          var end = points[4] + dTheta;
          var inc = Math.PI / 180.0; // 1 degree resolution

          if (Math.abs(start - end) < inc) {
            inc = Math.abs(start - end);
          } // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi


          p1 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);

          if (dTheta < 0) {
            // clockwise
            for (t = start - inc; t > end; t -= inc) {
              p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
              len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
              p1 = p2;
            }
          } else {
            // counter-clockwise
            for (t = start + inc; t < end; t += inc) {
              p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
              len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
              p1 = p2;
            }
          }

          p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
          return len;
        }
    }

    return 0;
  }

  getPointOnLine(dist, p1x, p1y, p2x, p2y) {
    var fromX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : p1x;
    var fromY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : p1y;
    var m = (p2y - p1y) / (p2x - p1x + PSEUDO_ZERO);
    var run = Math.sqrt(dist * dist / (1 + m * m));

    if (p2x < p1x) {
      run *= -1;
    }

    var rise = m * run;
    var pt = null;

    if (p2x === p1x) {
      // vertical line
      pt = {
        x: fromX,
        y: fromY + rise
      };
    } else if ((fromY - p1y) / (fromX - p1x + PSEUDO_ZERO) === m) {
      pt = {
        x: fromX + run,
        y: fromY + rise
      };
    } else {
      var ix = 0;
      var iy = 0;
      var len = this.getLineLength(p1x, p1y, p2x, p2y);

      if (len < PSEUDO_ZERO) {
        return null;
      }

      var u = (fromX - p1x) * (p2x - p1x) + (fromY - p1y) * (p2y - p1y);
      u /= len * len;
      ix = p1x + u * (p2x - p1x);
      iy = p1y + u * (p2y - p1y);
      var pRise = this.getLineLength(fromX, fromY, ix, iy);
      var pRun = Math.sqrt(dist * dist - pRise * pRise);
      run = Math.sqrt(pRun * pRun / (1 + m * m));

      if (p2x < p1x) {
        run *= -1;
      }

      rise = m * run;
      pt = {
        x: ix + run,
        y: iy + rise
      };
    }

    return pt;
  }

  getPointOnPath(distance) {
    var fullLen = this.getPathLength();
    var cumulativePathLength = 0;
    var p = null;

    if (distance < -0.00005 || distance - 0.00005 > fullLen) {
      return null;
    }

    var {
      dataArray
    } = this;

    for (var command of dataArray) {
      if (command && (command.pathLength < 0.00005 || cumulativePathLength + command.pathLength + 0.00005 < distance)) {
        cumulativePathLength += command.pathLength;
        continue;
      }

      var delta = distance - cumulativePathLength;
      var currentT = 0;

      switch (command.type) {
        case PathParser.LINE_TO:
          p = this.getPointOnLine(delta, command.start.x, command.start.y, command.points[0], command.points[1], command.start.x, command.start.y);
          break;

        case PathParser.ARC:
          {
            var start = command.points[4]; // 4 = theta

            var dTheta = command.points[5]; // 5 = dTheta

            var end = command.points[4] + dTheta;
            currentT = start + delta / command.pathLength * dTheta;

            if (dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) {
              break;
            }

            p = this.getPointOnEllipticalArc(command.points[0], command.points[1], command.points[2], command.points[3], currentT, command.points[6]);
            break;
          }

        case PathParser.CURVE_TO:
          currentT = delta / command.pathLength;

          if (currentT > 1) {
            currentT = 1;
          }

          p = this.getPointOnCubicBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3], command.points[4], command.points[5]);
          break;

        case PathParser.QUAD_TO:
          currentT = delta / command.pathLength;

          if (currentT > 1) {
            currentT = 1;
          }

          p = this.getPointOnQuadraticBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3]);
          break;
      }

      if (p) {
        return p;
      }

      break;
    }

    return null;
  }

  getLineLength(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  getPathLength() {
    if (this.pathLength === -1) {
      this.pathLength = this.dataArray.reduce((length, command) => command.pathLength > 0 ? length + command.pathLength : length, 0);
    }

    return this.pathLength;
  }

  getPointOnCubicBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
    var x = p4x * CB1(pct) + p3x * CB2(pct) + p2x * CB3(pct) + p1x * CB4(pct);
    var y = p4y * CB1(pct) + p3y * CB2(pct) + p2y * CB3(pct) + p1y * CB4(pct);
    return {
      x,
      y
    };
  }

  getPointOnQuadraticBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y) {
    var x = p3x * QB1(pct) + p2x * QB2(pct) + p1x * QB3(pct);
    var y = p3y * QB1(pct) + p2y * QB2(pct) + p1y * QB3(pct);
    return {
      x,
      y
    };
  }

  getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var pt = {
      x: rx * Math.cos(theta),
      y: ry * Math.sin(theta)
    };
    return {
      x: cx + (pt.x * cosPsi - pt.y * sinPsi),
      y: cy + (pt.x * sinPsi + pt.y * cosPsi)
    };
  } // TODO need some optimisations. possibly build cache only for curved segments?


  buildEquidistantCache(inputStep, inputPrecision) {
    var fullLen = this.getPathLength();
    var precision = inputPrecision || 0.25; // accuracy vs performance

    var step = inputStep || fullLen / 100;

    if (!this.equidistantCache || this.equidistantCache.step !== step || this.equidistantCache.precision !== precision) {
      // Prepare cache
      this.equidistantCache = {
        step,
        precision,
        points: []
      }; // Calculate points

      var s = 0;

      for (var l = 0; l <= fullLen; l += precision) {
        var p0 = this.getPointOnPath(l);
        var p1 = this.getPointOnPath(l + precision);

        if (!p0 || !p1) {
          continue;
        }

        s += this.getLineLength(p0.x, p0.y, p1.x, p1.y);

        if (s >= step) {
          this.equidistantCache.points.push({
            x: p0.x,
            y: p0.y,
            distance: l
          });
          s -= step;
        }
      }
    }
  }

  getEquidistantPointOnPath(targetDistance, step, precision) {
    this.buildEquidistantCache(step, precision);

    if (targetDistance < 0 || targetDistance - this.getPathLength() > 0.00005) {
      return null;
    }

    var idx = Math.round(targetDistance / this.getPathLength() * (this.equidistantCache.points.length - 1));
    return this.equidistantCache.points[idx] || null;
  }

}

var dataUriRegex = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;
class ImageElement extends RenderedElement {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'image';
    this.loaded = false;
    var href = this.getHrefAttribute().getString();

    if (!href) {
      return;
    }

    var isSvg = href.endsWith('.svg') || /^\s*data:image\/svg\+xml/i.test(href);
    document.images.push(this);

    if (!isSvg) {
      void this.loadImage(href);
    } else {
      void this.loadSvg(href);
    }

    this.isSvg = isSvg;
  }

  loadImage(href) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        var image = yield _this.document.createImage(href);
        _this.image = image;
      } catch (err) {
        console.error("Error while loading image \"".concat(href, "\":"), err);
      }

      _this.loaded = true;
    })();
  }

  loadSvg(href) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var match = dataUriRegex.exec(href);

      if (match) {
        var data = match[5];

        if (match[4] === 'base64') {
          _this2.image = atob(data);
        } else {
          _this2.image = decodeURIComponent(data);
        }
      } else {
        try {
          var response = yield _this2.document.fetch(href);
          var svg = yield response.text();
          _this2.image = svg;
        } catch (err) {
          console.error("Error while loading image \"".concat(href, "\":"), err);
        }
      }

      _this2.loaded = true;
    })();
  }

  renderChildren(ctx) {
    var {
      document,
      image,
      loaded
    } = this;
    var x = this.getAttribute('x').getPixels('x');
    var y = this.getAttribute('y').getPixels('y');
    var width = this.getStyle('width').getPixels('x');
    var height = this.getStyle('height').getPixels('y');

    if (!loaded || !image || !width || !height) {
      return;
    }

    ctx.save();
    ctx.translate(x, y);

    if (this.isSvg) {
      var subDocument = document.canvg.forkString(ctx, this.image, {
        ignoreMouse: true,
        ignoreAnimation: true,
        ignoreDimensions: true,
        ignoreClear: true,
        offsetX: 0,
        offsetY: 0,
        scaleWidth: width,
        scaleHeight: height
      });
      subDocument.document.documentElement.parent = this;
      void subDocument.render();
    } else {
      var _image = this.image;
      document.setViewBox({
        ctx,
        aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
        width,
        desiredWidth: _image.width,
        height,
        desiredHeight: _image.height
      });

      if (this.loaded) {
        if (typeof _image.complete === 'undefined' || _image.complete) {
          ctx.drawImage(_image, 0, 0);
        }
      }
    }

    ctx.restore();
  }

  getBoundingBox() {
    var x = this.getAttribute('x').getPixels('x');
    var y = this.getAttribute('y').getPixels('y');
    var width = this.getStyle('width').getPixels('x');
    var height = this.getStyle('height').getPixels('y');
    return new BoundingBox(x, y, x + width, y + height);
  }

}

class SymbolElement extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = 'symbol';
  }

  render(_) {// NO RENDER
  }

}

class SVGFontLoader {
  constructor(document) {
    this.document = document;
    this.loaded = false;
    document.fonts.push(this);
  }

  load(fontFamily, url) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        var {
          document
        } = _this;
        var svgDocument = yield document.canvg.parser.load(url);
        var fonts = svgDocument.getElementsByTagName('font');
        Array.from(fonts).forEach(fontNode => {
          var font = document.createElement(fontNode);
          document.definitions[fontFamily] = font;
        });
      } catch (err) {
        console.error("Error while loading font \"".concat(url, "\":"), err);
      }

      _this.loaded = true;
    })();
  }

}

class StyleElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'style';
    var css = compressSpaces(Array.from(node.childNodes) // NEED TEST
    .map(_ => _.textContent).join('').replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, '') // remove comments
    .replace(/@import.*;/g, '') // remove imports
    );
    var cssDefs = css.split('}');
    cssDefs.forEach(_ => {
      var def = _.trim();

      if (!def) {
        return;
      }

      var cssParts = def.split('{');
      var cssClasses = cssParts[0].split(',');
      var cssProps = cssParts[1].split(';');
      cssClasses.forEach(_ => {
        var cssClass = _.trim();

        if (!cssClass) {
          return;
        }

        var props = document.styles[cssClass] || {};
        cssProps.forEach(cssProp => {
          var prop = cssProp.indexOf(':');
          var name = cssProp.substr(0, prop).trim();
          var value = cssProp.substr(prop + 1, cssProp.length - prop).trim();

          if (name && value) {
            props[name] = new Property(document, name, value);
          }
        });
        document.styles[cssClass] = props;
        document.stylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);

        if (cssClass === '@font-face') {
          //  && !nodeEnv
          var fontFamily = props['font-family'].getString().replace(/"|'/g, '');
          var srcs = props.src.getString().split(',');
          srcs.forEach(src => {
            if (src.indexOf('format("svg")') > 0) {
              var url = parseExternalUrl(src);

              if (url) {
                void new SVGFontLoader(document).load(fontFamily, url);
              }
            }
          });
        }
      });
    });
  }

}
StyleElement.parseExternalUrl = parseExternalUrl;

class UseElement extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = 'use';
  }

  setContext(ctx) {
    super.setContext(ctx);
    var xAttr = this.getAttribute('x');
    var yAttr = this.getAttribute('y');

    if (xAttr.hasValue()) {
      ctx.translate(xAttr.getPixels('x'), 0);
    }

    if (yAttr.hasValue()) {
      ctx.translate(0, yAttr.getPixels('y'));
    }
  }

  path(ctx) {
    var {
      element
    } = this;

    if (element) {
      element.path(ctx);
    }
  }

  renderChildren(ctx) {
    var {
      document,
      element
    } = this;

    if (element) {
      var tempSvg = element;

      if (element.type === 'symbol') {
        // render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
        tempSvg = new SVGElement(document, null);
        tempSvg.attributes.viewBox = new Property(document, 'viewBox', element.getAttribute('viewBox').getString());
        tempSvg.attributes.preserveAspectRatio = new Property(document, 'preserveAspectRatio', element.getAttribute('preserveAspectRatio').getString());
        tempSvg.attributes.overflow = new Property(document, 'overflow', element.getAttribute('overflow').getString());
        tempSvg.children = element.children; // element is still the parent of the children

        element.styles.opacity = new Property(document, 'opacity', this.calculateOpacity());
      }

      if (tempSvg.type === 'svg') {
        var widthStyle = this.getStyle('width', false, true);
        var heightStyle = this.getStyle('height', false, true); // if symbol or svg, inherit width/height from me

        if (widthStyle.hasValue()) {
          tempSvg.attributes.width = new Property(document, 'width', widthStyle.getString());
        }

        if (heightStyle.hasValue()) {
          tempSvg.attributes.height = new Property(document, 'height', heightStyle.getString());
        }
      }

      var oldParent = tempSvg.parent;
      tempSvg.parent = this;
      tempSvg.render(ctx);
      tempSvg.parent = oldParent;
    }
  }

  getBoundingBox(ctx) {
    var {
      element
    } = this;

    if (element) {
      return element.getBoundingBox(ctx);
    }

    return null;
  }

  elementTransform() {
    var {
      document,
      element
    } = this;
    return Transform.fromElement(document, element);
  }

  get element() {
    if (!this.cachedElement) {
      this.cachedElement = this.getHrefAttribute().getDefinition();
    }

    return this.cachedElement;
  }

}

function imGet(img, x, y, width, _height, rgba) {
  return img[y * width * 4 + x * 4 + rgba];
}

function imSet(img, x, y, width, _height, rgba, val) {
  img[y * width * 4 + x * 4 + rgba] = val;
}

function index_es_m(matrix, i, v) {
  var mi = matrix[i];
  return mi * v;
}

function index_es_c(a, m1, m2, m3) {
  return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
}

class FeColorMatrixElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'feColorMatrix';
    var matrix = toNumbers(this.getAttribute('values').getString());

    switch (this.getAttribute('type').getString('matrix')) {
      // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
      case 'saturate':
        {
          var s = matrix[0];
          /* eslint-disable array-element-newline */

          matrix = [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
          /* eslint-enable array-element-newline */

          break;
        }

      case 'hueRotate':
        {
          var a = matrix[0] * Math.PI / 180.0;
          /* eslint-disable array-element-newline */

          matrix = [index_es_c(a, 0.213, 0.787, -0.213), index_es_c(a, 0.715, -0.715, -0.715), index_es_c(a, 0.072, -0.072, 0.928), 0, 0, index_es_c(a, 0.213, -0.213, 0.143), index_es_c(a, 0.715, 0.285, 0.140), index_es_c(a, 0.072, -0.072, -0.283), 0, 0, index_es_c(a, 0.213, -0.213, -0.787), index_es_c(a, 0.715, -0.715, 0.715), index_es_c(a, 0.072, 0.928, 0.072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
          /* eslint-enable array-element-newline */

          break;
        }

      case 'luminanceToAlpha':
        /* eslint-disable array-element-newline */
        matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0, 0, 0, 0, 0, 1];
        /* eslint-enable array-element-newline */

        break;
    }

    this.matrix = matrix;
    this.includeOpacity = this.getAttribute('includeOpacity').hasValue();
  }

  apply(ctx, _x, _y, width, height) {
    // assuming x==0 && y==0 for now
    var {
      includeOpacity,
      matrix
    } = this;
    var srcData = ctx.getImageData(0, 0, width, height);

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var r = imGet(srcData.data, x, y, width, height, 0);
        var g = imGet(srcData.data, x, y, width, height, 1);
        var b = imGet(srcData.data, x, y, width, height, 2);
        var a = imGet(srcData.data, x, y, width, height, 3);
        var nr = index_es_m(matrix, 0, r) + index_es_m(matrix, 1, g) + index_es_m(matrix, 2, b) + index_es_m(matrix, 3, a) + index_es_m(matrix, 4, 1);
        var ng = index_es_m(matrix, 5, r) + index_es_m(matrix, 6, g) + index_es_m(matrix, 7, b) + index_es_m(matrix, 8, a) + index_es_m(matrix, 9, 1);
        var nb = index_es_m(matrix, 10, r) + index_es_m(matrix, 11, g) + index_es_m(matrix, 12, b) + index_es_m(matrix, 13, a) + index_es_m(matrix, 14, 1);
        var na = index_es_m(matrix, 15, r) + index_es_m(matrix, 16, g) + index_es_m(matrix, 17, b) + index_es_m(matrix, 18, a) + index_es_m(matrix, 19, 1);

        if (includeOpacity) {
          nr = 0;
          ng = 0;
          nb = 0;
          na *= a / 255;
        }

        imSet(srcData.data, x, y, width, height, 0, nr);
        imSet(srcData.data, x, y, width, height, 1, ng);
        imSet(srcData.data, x, y, width, height, 2, nb);
        imSet(srcData.data, x, y, width, height, 3, na);
      }
    }

    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(srcData, 0, 0);
  }

}

class MaskElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'mask';
  }

  apply(ctx, element) {
    var {
      document
    } = this; // render as temp svg

    var x = this.getAttribute('x').getPixels('x');
    var y = this.getAttribute('y').getPixels('y');
    var width = this.getStyle('width').getPixels('x');
    var height = this.getStyle('height').getPixels('y');

    if (!width && !height) {
      var boundingBox = new BoundingBox();
      this.children.forEach(child => {
        boundingBox.addBoundingBox(child.getBoundingBox(ctx));
      });
      x = Math.floor(boundingBox.x1);
      y = Math.floor(boundingBox.y1);
      width = Math.floor(boundingBox.width);
      height = Math.floor(boundingBox.height);
    }

    var ignoredStyles = this.removeStyles(element, MaskElement.ignoreStyles);
    var maskCanvas = document.createCanvas(x + width, y + height);
    var maskCtx = maskCanvas.getContext('2d');
    document.screen.setDefaults(maskCtx);
    this.renderChildren(maskCtx); // convert mask to alpha with a fake node
    // TODO: refactor out apply from feColorMatrix

    new FeColorMatrixElement(document, {
      nodeType: 1,
      childNodes: [],
      attributes: [{
        nodeName: 'type',
        value: 'luminanceToAlpha'
      }, {
        nodeName: 'includeOpacity',
        value: 'true'
      }]
    }).apply(maskCtx, 0, 0, x + width, y + height);
    var tmpCanvas = document.createCanvas(x + width, y + height);
    var tmpCtx = tmpCanvas.getContext('2d');
    document.screen.setDefaults(tmpCtx);
    element.render(tmpCtx);
    tmpCtx.globalCompositeOperation = 'destination-in';
    tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas, 'no-repeat');
    tmpCtx.fillRect(0, 0, x + width, y + height);
    ctx.fillStyle = tmpCtx.createPattern(tmpCanvas, 'no-repeat');
    ctx.fillRect(0, 0, x + width, y + height); // reassign mask

    this.restoreStyles(element, ignoredStyles);
  }

  render(_) {// NO RENDER
  }

}
MaskElement.ignoreStyles = ['mask', 'transform', 'clip-path'];

var noop = () => {// NOOP
};

class ClipPathElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'clipPath';
  }

  apply(ctx) {
    var {
      document
    } = this;
    var contextProto = Reflect.getPrototypeOf(ctx);
    var {
      beginPath,
      closePath
    } = ctx;

    if (contextProto) {
      contextProto.beginPath = noop;
      contextProto.closePath = noop;
    }

    Reflect.apply(beginPath, ctx, []);
    this.children.forEach(child => {
      if (typeof child.path === 'undefined') {
        return;
      }

      var transform = typeof child.elementTransform !== 'undefined' ? child.elementTransform() : null; // handle <use />

      if (!transform) {
        transform = Transform.fromElement(document, child);
      }

      if (transform) {
        transform.apply(ctx);
      }

      child.path(ctx);

      if (contextProto) {
        contextProto.closePath = closePath;
      }

      if (transform) {
        transform.unapply(ctx);
      }
    });
    Reflect.apply(closePath, ctx, []);
    ctx.clip();

    if (contextProto) {
      contextProto.beginPath = beginPath;
      contextProto.closePath = closePath;
    }
  }

  render(_) {// NO RENDER
  }

}

class FilterElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'filter';
  }

  apply(ctx, element) {
    // render as temp svg
    var {
      document,
      children
    } = this;
    var boundingBox = element.getBoundingBox(ctx);

    if (!boundingBox) {
      return;
    }

    var px = 0;
    var py = 0;
    children.forEach(child => {
      var efd = child.extraFilterDistance || 0;
      px = Math.max(px, efd);
      py = Math.max(py, efd);
    });
    var width = Math.floor(boundingBox.width);
    var height = Math.floor(boundingBox.height);
    var tmpCanvasWidth = width + 2 * px;
    var tmpCanvasHeight = height + 2 * py;

    if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) {
      return;
    }

    var x = Math.floor(boundingBox.x);
    var y = Math.floor(boundingBox.y);
    var ignoredStyles = this.removeStyles(element, FilterElement.ignoreStyles);
    var tmpCanvas = document.createCanvas(tmpCanvasWidth, tmpCanvasHeight);
    var tmpCtx = tmpCanvas.getContext('2d');
    document.screen.setDefaults(tmpCtx);
    tmpCtx.translate(-x + px, -y + py);
    element.render(tmpCtx); // apply filters

    children.forEach(child => {
      if (typeof child.apply === 'function') {
        child.apply(tmpCtx, 0, 0, tmpCanvasWidth, tmpCanvasHeight);
      }
    }); // render on me

    ctx.drawImage(tmpCanvas, 0, 0, tmpCanvasWidth, tmpCanvasHeight, x - px, y - py, tmpCanvasWidth, tmpCanvasHeight);
    this.restoreStyles(element, ignoredStyles);
  }

  render(_) {// NO RENDER
  }

}
FilterElement.ignoreStyles = ['filter', 'transform', 'clip-path'];

class FeDropShadowElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'feDropShadow';
    this.addStylesFromStyleDefinition();
  }

  apply(_, _x, _y, _width, _height) {// TODO: implement
  }

}

class FeMorphologyElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'feMorphology';
  }

  apply(_, _x, _y, _width, _height) {// TODO: implement
  }

}

class FeCompositeElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'feComposite';
  }

  apply(_, _x, _y, _width, _height) {// TODO: implement
  }

}

class FeGaussianBlurElement extends Element {
  constructor(document, node, captureTextNodes) {
    super(document, node, captureTextNodes);
    this.type = 'feGaussianBlur';
    this.blurRadius = Math.floor(this.getAttribute('stdDeviation').getNumber());
    this.extraFilterDistance = this.blurRadius;
  }

  apply(ctx, x, y, width, height) {
    var {
      document,
      blurRadius
    } = this;
    var body = document.window ? document.window.document.body : null;
    var canvas = ctx.canvas; // StackBlur requires canvas be on document

    canvas.id = document.getUniqueId();

    if (body) {
      canvas.style.display = 'none';
      body.appendChild(canvas);
    }

    processCanvasRGBA(canvas, x, y, width, height, blurRadius);

    if (body) {
      body.removeChild(canvas);
    }
  }

}

class TitleElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'title';
  }

}

class DescElement extends Element {
  constructor() {
    super(...arguments);
    this.type = 'desc';
  }

}

var index_es_elements = {
  'svg': SVGElement,
  'rect': RectElement,
  'circle': CircleElement,
  'ellipse': EllipseElement,
  'line': LineElement,
  'polyline': PolylineElement,
  'polygon': PolygonElement,
  'path': PathElement,
  'pattern': PatternElement,
  'marker': MarkerElement,
  'defs': DefsElement,
  'linearGradient': LinearGradientElement,
  'radialGradient': RadialGradientElement,
  'stop': StopElement,
  'animate': AnimateElement,
  'animateColor': AnimateColorElement,
  'animateTransform': AnimateTransformElement,
  'font': FontElement,
  'font-face': FontFaceElement,
  'missing-glyph': MissingGlyphElement,
  'glyph': GlyphElement,
  'text': TextElement,
  'tspan': TSpanElement,
  'tref': TRefElement,
  'a': AElement,
  'textPath': TextPathElement,
  'image': ImageElement,
  'g': GElement,
  'symbol': SymbolElement,
  'style': StyleElement,
  'use': UseElement,
  'mask': MaskElement,
  'clipPath': ClipPathElement,
  'filter': FilterElement,
  'feDropShadow': FeDropShadowElement,
  'feMorphology': FeMorphologyElement,
  'feComposite': FeCompositeElement,
  'feColorMatrix': FeColorMatrixElement,
  'feGaussianBlur': FeGaussianBlurElement,
  'title': TitleElement,
  'desc': DescElement
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createCanvas(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function createImage(_x) {
  return _createImage.apply(this, arguments);
}

function _createImage() {
  _createImage = _asyncToGenerator(function* (src) {
    var anonymousCrossOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var image = document.createElement('img');

    if (anonymousCrossOrigin) {
      image.crossOrigin = 'Anonymous';
    }

    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve(image);
      };

      image.onerror = (_event, _source, _lineno, _colno, error) => {
        reject(error);
      };

      image.src = src;
    });
  });
  return _createImage.apply(this, arguments);
}

class Document {
  constructor(canvg) {
    var {
      rootEmSize = 12,
      emSize = 12,
      createCanvas = Document.createCanvas,
      createImage = Document.createImage,
      anonymousCrossOrigin
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.canvg = canvg;
    this.definitions = {};
    this.styles = {};
    this.stylesSpecificity = {};
    this.images = [];
    this.fonts = [];
    this.emSizeStack = [];
    this.uniqueId = 0;
    this.screen = canvg.screen;
    this.rootEmSize = rootEmSize;
    this.emSize = emSize;
    this.createCanvas = createCanvas;
    this.createImage = this.bindCreateImage(createImage, anonymousCrossOrigin);
    this.screen.wait(this.isImagesLoaded.bind(this));
    this.screen.wait(this.isFontsLoaded.bind(this));
  }

  bindCreateImage(createImage, anonymousCrossOrigin) {
    if (typeof anonymousCrossOrigin === 'boolean') {
      return (source, forceAnonymousCrossOrigin) => createImage(source, typeof forceAnonymousCrossOrigin === 'boolean' ? forceAnonymousCrossOrigin : anonymousCrossOrigin);
    }

    return createImage;
  }

  get window() {
    return this.screen.window;
  }

  get fetch() {
    return this.screen.fetch;
  }

  get ctx() {
    return this.screen.ctx;
  }

  get emSize() {
    var {
      emSizeStack
    } = this;
    return emSizeStack[emSizeStack.length - 1];
  }

  set emSize(value) {
    var {
      emSizeStack
    } = this;
    emSizeStack.push(value);
  }

  popEmSize() {
    var {
      emSizeStack
    } = this;
    emSizeStack.pop();
  }

  getUniqueId() {
    return "canvg".concat(++this.uniqueId);
  }

  isImagesLoaded() {
    return this.images.every(_ => _.loaded);
  }

  isFontsLoaded() {
    return this.fonts.every(_ => _.loaded);
  }

  createDocumentElement(document) {
    var documentElement = this.createElement(document.documentElement);
    documentElement.root = true;
    documentElement.addStylesFromStyleDefinition();
    this.documentElement = documentElement;
    return documentElement;
  }

  createElement(node) {
    var elementType = node.nodeName.replace(/^[^:]+:/, '');
    var ElementType = Document.elementTypes[elementType];

    if (typeof ElementType !== 'undefined') {
      return new ElementType(this, node);
    }

    return new UnknownElement(this, node);
  }

  createTextNode(node) {
    return new TextNode(this, node);
  }

  setViewBox(config) {
    this.screen.setViewBox(_objectSpread$1({
      document: this
    }, config));
  }

}
Document.createCanvas = createCanvas;
Document.createImage = createImage;
Document.elementTypes = index_es_elements;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * SVG renderer on canvas.
 */

class Canvg {
  /**
   * Main constructor.
   * @param ctx - Rendering context.
   * @param svg - SVG Document.
   * @param options - Rendering options.
   */
  constructor(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    this.parser = new Parser(options);
    this.screen = new Screen(ctx, options);
    this.options = options;
    var document = new Document(this, options);
    var documentElement = document.createDocumentElement(svg);
    this.document = document;
    this.documentElement = documentElement;
  }
  /**
   * Create Canvg instance from SVG source string or URL.
   * @param ctx - Rendering context.
   * @param svg - SVG source string or URL.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */


  static from(ctx, svg) {
    var _arguments = arguments;
    return _asyncToGenerator(function* () {
      var options = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : {};
      var parser = new Parser(options);
      var svgDocument = yield parser.parse(svg);
      return new Canvg(ctx, svgDocument, options);
    })();
  }
  /**
   * Create Canvg instance from SVG source string.
   * @param ctx - Rendering context.
   * @param svg - SVG source string.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */


  static fromString(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var parser = new Parser(options);
    var svgDocument = parser.parseFromString(svg);
    return new Canvg(ctx, svgDocument, options);
  }
  /**
   * Create new Canvg instance with inherited options.
   * @param ctx - Rendering context.
   * @param svg - SVG source string or URL.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */


  fork(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return Canvg.from(ctx, svg, _objectSpread(_objectSpread({}, this.options), options));
  }
  /**
   * Create new Canvg instance with inherited options.
   * @param ctx - Rendering context.
   * @param svg - SVG source string.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */


  forkString(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return Canvg.fromString(ctx, svg, _objectSpread(_objectSpread({}, this.options), options));
  }
  /**
   * Document is ready promise.
   * @returns Ready promise.
   */


  ready() {
    return this.screen.ready();
  }
  /**
   * Document is ready value.
   * @returns Is ready or not.
   */


  isReady() {
    return this.screen.isReady();
  }
  /**
   * Render only first frame, ignoring animations and mouse.
   * @param options - Rendering options.
   */


  render() {
    var _arguments2 = arguments,
        _this = this;

    return _asyncToGenerator(function* () {
      var options = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};

      _this.start(_objectSpread({
        enableRedraw: true,
        ignoreAnimation: true,
        ignoreMouse: true
      }, options));

      yield _this.ready();

      _this.stop();
    })();
  }
  /**
   * Start rendering.
   * @param options - Render options.
   */


  start() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      documentElement,
      screen,
      options: baseOptions
    } = this;
    screen.start(documentElement, _objectSpread(_objectSpread({
      enableRedraw: true
    }, baseOptions), options));
  }
  /**
   * Stop rendering.
   */


  stop() {
    this.screen.stop();
  }
  /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */


  resize(width) {
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
    var preserveAspectRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    this.documentElement.resize(width, height, preserveAspectRatio);
  }

}


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==


/***/ })

}]);
=======
(self.webpackChunkgestion=self.webpackChunkgestion||[]).push([[814],{9483:(t,e,r)=>{var i=r(7854),n=r(4411),a=r(6330),s=i.TypeError;t.exports=function(t){if(n(t))return t;throw s(a(t)+" is not a constructor")}},6077:(t,e,r)=>{var i=r(7854),n=r(614),a=i.String,s=i.TypeError;t.exports=function(t){if("object"==typeof t||n(t))return t;throw s("Can't set "+a(t)+" as a prototype")}},1223:(t,e,r)=>{var i=r(5112),n=r(30),a=r(3070),s=i("unscopables"),o=Array.prototype;null==o[s]&&a.f(o,s,{configurable:!0,value:n(null)}),t.exports=function(t){o[s][t]=!0}},5787:(t,e,r)=>{var i=r(7854),n=r(7976),a=i.TypeError;t.exports=function(t,e){if(n(e,t))return t;throw a("Incorrect invocation")}},9341:(t,e,r)=>{"use strict";var i=r(7293);t.exports=function(t,e){var r=[][t];return!!r&&i((function(){r.call(null,e||function(){return 1},1)}))}},3671:(t,e,r)=>{var i=r(7854),n=r(9662),a=r(7908),s=r(8361),o=r(6244),h=i.TypeError,u=function(t){return function(e,r,i,u){n(r);var l=a(e),c=s(l),g=o(l),f=t?g-1:0,p=t?-1:1;if(i<2)for(;;){if(f in c){u=c[f],f+=p;break}if(f+=p,t?f<0:g<=f)throw h("Reduce of empty array with no initial value")}for(;t?f>=0:g>f;f+=p)f in c&&(u=r(u,c[f],f,l));return u}};t.exports={left:u(!1),right:u(!0)}},1589:(t,e,r)=>{var i=r(7854),n=r(1400),a=r(6244),s=r(6135),o=i.Array,h=Math.max;t.exports=function(t,e,r){for(var i=a(t),u=n(e,i),l=n(void 0===r?i:r,i),c=o(h(l-u,0)),g=0;u<l;u++,g++)s(c,g,t[u]);return c.length=g,c}},206:(t,e,r)=>{var i=r(1702);t.exports=i([].slice)},7072:(t,e,r)=>{var i=r(5112)("iterator"),n=!1;try{var a=0,s={next:function(){return{done:!!a++}},return:function(){n=!0}};s[i]=function(){return this},Array.from(s,(function(){throw 2}))}catch(t){}t.exports=function(t,e){if(!e&&!n)return!1;var r=!1;try{var a={};a[i]=function(){return{next:function(){return{done:r=!0}}}},t(a)}catch(t){}return r}},4964:(t,e,r)=>{var i=r(5112)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(r){try{return e[i]=!1,"/./"[t](e)}catch(t){}}return!1}},8544:(t,e,r)=>{var i=r(7293);t.exports=!i((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},4994:(t,e,r)=>{"use strict";var i=r(3383).IteratorPrototype,n=r(30),a=r(9114),s=r(8003),o=r(7497),h=function(){return this};t.exports=function(t,e,r,u){var l=e+" Iterator";return t.prototype=n(i,{next:a(+!u,r)}),s(t,l,!1,!0),o[l]=h,t}},6135:(t,e,r)=>{"use strict";var i=r(4948),n=r(3070),a=r(9114);t.exports=function(t,e,r){var s=i(e);s in t?n.f(t,s,a(0,r)):t[s]=r}},654:(t,e,r)=>{"use strict";var i=r(2109),n=r(6916),a=r(1913),s=r(6530),o=r(614),h=r(4994),u=r(9518),l=r(7674),c=r(8003),g=r(8880),f=r(1320),p=r(5112),d=r(7497),v=r(3383),y=s.PROPER,m=s.CONFIGURABLE,x=v.IteratorPrototype,b=v.BUGGY_SAFARI_ITERATORS,S=p("iterator"),w="keys",T="values",A="entries",C=function(){return this};t.exports=function(t,e,r,s,p,v,O){h(r,e,s);var P,E,M,N=function(t){if(t===p&&I)return I;if(!b&&t in R)return R[t];switch(t){case w:case T:case A:return function(){return new r(this,t)}}return function(){return new r(this)}},V=e+" Iterator",_=!1,R=t.prototype,k=R[S]||R["@@iterator"]||p&&R[p],I=!b&&k||N(p),L="Array"==e&&R.entries||k;if(L&&(P=u(L.call(new t)))!==Object.prototype&&P.next&&(a||u(P)===x||(l?l(P,x):o(P[S])||f(P,S,C)),c(P,V,!0,!0),a&&(d[V]=C)),y&&p==T&&k&&k.name!==T&&(!a&&m?g(R,"name",T):(_=!0,I=function(){return n(k,this)})),p)if(E={values:N(T),keys:v?I:N(w),entries:N(A)},O)for(M in E)(b||_||!(M in R))&&f(R,M,E[M]);else i({target:e,proto:!0,forced:b||_},E);return a&&!O||R[S]===I||f(R,S,I,{name:p}),d[e]=I,E}},8324:t=>{t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},8509:(t,e,r)=>{var i=r(317)("span").classList,n=i&&i.constructor&&i.constructor.prototype;t.exports=n===Object.prototype?void 0:n},7871:t=>{t.exports="object"==typeof window&&"object"!=typeof Deno},1528:(t,e,r)=>{var i=r(8113),n=r(7854);t.exports=/ipad|iphone|ipod/i.test(i)&&void 0!==n.Pebble},6833:(t,e,r)=>{var i=r(8113);t.exports=/(?:ipad|iphone|ipod).*applewebkit/i.test(i)},5268:(t,e,r)=>{var i=r(4326),n=r(7854);t.exports="process"==i(n.process)},1036:(t,e,r)=>{var i=r(8113);t.exports=/web0s(?!.*chrome)/i.test(i)},9974:(t,e,r)=>{var i=r(1702),n=r(9662),a=r(4374),s=i(i.bind);t.exports=function(t,e){return n(t),void 0===e?t:a?s(t,e):function(){return t.apply(e,arguments)}}},1246:(t,e,r)=>{var i=r(648),n=r(8173),a=r(7497),s=r(5112)("iterator");t.exports=function(t){if(null!=t)return n(t,s)||n(t,"@@iterator")||a[i(t)]}},8554:(t,e,r)=>{var i=r(7854),n=r(6916),a=r(9662),s=r(9670),o=r(6330),h=r(1246),u=i.TypeError;t.exports=function(t,e){var r=arguments.length<2?h(t):e;if(a(r))return s(n(r,t));throw u(o(t)+" is not iterable")}},842:(t,e,r)=>{var i=r(7854);t.exports=function(t,e){var r=i.console;r&&r.error&&(1==arguments.length?r.error(t):r.error(t,e))}},7659:(t,e,r)=>{var i=r(5112),n=r(7497),a=i("iterator"),s=Array.prototype;t.exports=function(t){return void 0!==t&&(n.Array===t||s[a]===t)}},1349:(t,e,r)=>{var i=r(4326);t.exports=Array.isArray||function(t){return"Array"==i(t)}},4411:(t,e,r)=>{var i=r(1702),n=r(7293),a=r(614),s=r(648),o=r(5005),h=r(2788),u=function(){},l=[],c=o("Reflect","construct"),g=/^\s*(?:class|function)\b/,f=i(g.exec),p=!g.exec(u),d=function(t){if(!a(t))return!1;try{return c(u,l,t),!0}catch(t){return!1}},v=function(t){if(!a(t))return!1;switch(s(t)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return p||!!f(g,h(t))}catch(t){return!0}};v.sham=!0,t.exports=!c||n((function(){var t;return d(d.call)||!d(Object)||!d((function(){t=!0}))||t}))?v:d},7850:(t,e,r)=>{var i=r(111),n=r(4326),a=r(5112)("match");t.exports=function(t){var e;return i(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==n(t))}},408:(t,e,r)=>{var i=r(7854),n=r(9974),a=r(6916),s=r(9670),o=r(6330),h=r(7659),u=r(6244),l=r(7976),c=r(8554),g=r(1246),f=r(9212),p=i.TypeError,d=function(t,e){this.stopped=t,this.result=e},v=d.prototype;t.exports=function(t,e,r){var i,y,m,x,b,S,w,T=r&&r.that,A=!(!r||!r.AS_ENTRIES),C=!(!r||!r.IS_ITERATOR),O=!(!r||!r.INTERRUPTED),P=n(e,T),E=function(t){return i&&f(i,"normal",t),new d(!0,t)},M=function(t){return A?(s(t),O?P(t[0],t[1],E):P(t[0],t[1])):O?P(t,E):P(t)};if(C)i=t;else{if(!(y=g(t)))throw p(o(t)+" is not iterable");if(h(y)){for(m=0,x=u(t);x>m;m++)if((b=M(t[m]))&&l(v,b))return b;return new d(!1)}i=c(t,y)}for(S=i.next;!(w=a(S,i)).done;){try{b=M(w.value)}catch(t){f(i,"throw",t)}if("object"==typeof b&&b&&l(v,b))return b}return new d(!1)}},9212:(t,e,r)=>{var i=r(6916),n=r(9670),a=r(8173);t.exports=function(t,e,r){var s,o;n(t);try{if(!(s=a(t,"return"))){if("throw"===e)throw r;return r}s=i(s,t)}catch(t){o=!0,s=t}if("throw"===e)throw r;if(o)throw s;return n(s),r}},3383:(t,e,r)=>{"use strict";var i,n,a,s=r(7293),o=r(614),h=r(30),u=r(9518),l=r(1320),c=r(5112),g=r(1913),f=c("iterator"),p=!1;[].keys&&("next"in(a=[].keys())?(n=u(u(a)))!==Object.prototype&&(i=n):p=!0),null==i||s((function(){var t={};return i[f].call(t)!==t}))?i={}:g&&(i=h(i)),o(i[f])||l(i,f,(function(){return this})),t.exports={IteratorPrototype:i,BUGGY_SAFARI_ITERATORS:p}},7497:t=>{t.exports={}},5948:(t,e,r)=>{var i,n,a,s,o,h,u,l,c=r(7854),g=r(9974),f=r(1236).f,p=r(261).set,d=r(6833),v=r(1528),y=r(1036),m=r(5268),x=c.MutationObserver||c.WebKitMutationObserver,b=c.document,S=c.process,w=c.Promise,T=f(c,"queueMicrotask"),A=T&&T.value;A||(i=function(){var t,e;for(m&&(t=S.domain)&&t.exit();n;){e=n.fn,n=n.next;try{e()}catch(t){throw n?s():a=void 0,t}}a=void 0,t&&t.enter()},d||m||y||!x||!b?!v&&w&&w.resolve?((u=w.resolve(void 0)).constructor=w,l=g(u.then,u),s=function(){l(i)}):m?s=function(){S.nextTick(i)}:(p=g(p,c),s=function(){p(i)}):(o=!0,h=b.createTextNode(""),new x(i).observe(h,{characterData:!0}),s=function(){h.data=o=!o})),t.exports=A||function(t){var e={fn:t,next:void 0};a&&(a.next=e),n||(n=e,s()),a=e}},8523:(t,e,r)=>{"use strict";var i=r(9662),n=function(t){var e,r;this.promise=new t((function(t,i){if(void 0!==e||void 0!==r)throw TypeError("Bad Promise constructor");e=t,r=i})),this.resolve=i(e),this.reject=i(r)};t.exports.f=function(t){return new n(t)}},3929:(t,e,r)=>{var i=r(7854),n=r(7850),a=i.TypeError;t.exports=function(t){if(n(t))throw a("The method doesn't accept regular expressions");return t}},9518:(t,e,r)=>{var i=r(7854),n=r(2597),a=r(614),s=r(7908),o=r(6200),h=r(8544),u=o("IE_PROTO"),l=i.Object,c=l.prototype;t.exports=h?l.getPrototypeOf:function(t){var e=s(t);if(n(e,u))return e[u];var r=e.constructor;return a(r)&&e instanceof r?r.prototype:e instanceof l?c:null}},7674:(t,e,r)=>{var i=r(1702),n=r(9670),a=r(6077);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,r={};try{(t=i(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set))(r,[]),e=r instanceof Array}catch(t){}return function(r,i){return n(r),a(i),e?t(r,i):r.__proto__=i,r}}():void 0)},2534:t=>{t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},3702:(t,e,r)=>{var i=r(7854),n=r(2492),a=r(614),s=r(4705),o=r(2788),h=r(5112),u=r(7871),l=r(1913),c=r(7392),g=n&&n.prototype,f=h("species"),p=!1,d=a(i.PromiseRejectionEvent),v=s("Promise",(function(){var t=o(n),e=t!==String(n);if(!e&&66===c)return!0;if(l&&(!g.catch||!g.finally))return!0;if(c>=51&&/native code/.test(t))return!1;var r=new n((function(t){t(1)})),i=function(t){t((function(){}),(function(){}))};return(r.constructor={})[f]=i,!(p=r.then((function(){}))instanceof i)||!e&&u&&!d}));t.exports={CONSTRUCTOR:v,REJECTION_EVENT:d,SUBCLASSING:p}},2492:(t,e,r)=>{var i=r(7854);t.exports=i.Promise},9478:(t,e,r)=>{var i=r(9670),n=r(111),a=r(8523);t.exports=function(t,e){if(i(t),n(e)&&e.constructor===t)return e;var r=a.f(t);return(0,r.resolve)(e),r.promise}},612:(t,e,r)=>{var i=r(2492),n=r(7072),a=r(3702).CONSTRUCTOR;t.exports=a||!n((function(t){i.all(t).then(void 0,(function(){}))}))},8572:t=>{var e=function(){this.head=null,this.tail=null};e.prototype={add:function(t){var e={item:t,next:null};this.head?this.tail.next=e:this.head=e,this.tail=e},get:function(){var t=this.head;if(t)return this.head=t.next,this.tail===t&&(this.tail=null),t.item}},t.exports=e},2248:(t,e,r)=>{var i=r(1320);t.exports=function(t,e,r){for(var n in e)i(t,n,e[n],r);return t}},4706:(t,e,r)=>{var i=r(6916),n=r(2597),a=r(7976),s=r(7066),o=RegExp.prototype;t.exports=function(t){var e=t.flags;return void 0!==e||"flags"in o||n(t,"flags")||!a(o,t)?e:i(s,t)}},6340:(t,e,r)=>{"use strict";var i=r(5005),n=r(3070),a=r(5112),s=r(9781),o=a("species");t.exports=function(t){var e=i(t),r=n.f;s&&e&&!e[o]&&r(e,o,{configurable:!0,get:function(){return this}})}},8003:(t,e,r)=>{var i=r(3070).f,n=r(2597),a=r(5112)("toStringTag");t.exports=function(t,e,r){t&&!r&&(t=t.prototype),t&&!n(t,a)&&i(t,a,{configurable:!0,value:e})}},6707:(t,e,r)=>{var i=r(9670),n=r(9483),a=r(5112)("species");t.exports=function(t,e){var r,s=i(t).constructor;return void 0===s||null==(r=i(s)[a])?e:n(r)}},6091:(t,e,r)=>{var i=r(6530).PROPER,n=r(7293),a=r(1361);t.exports=function(t){return n((function(){return!!a[t]()||"​᠎"!=="​᠎"[t]()||i&&a[t].name!==t}))}},3111:(t,e,r)=>{var i=r(1702),n=r(4488),a=r(1340),s=r(1361),o=i("".replace),h="["+s+"]",u=RegExp("^"+h+h+"*"),l=RegExp(h+h+"*$"),c=function(t){return function(e){var r=a(n(e));return 1&t&&(r=o(r,u,"")),2&t&&(r=o(r,l,"")),r}};t.exports={start:c(1),end:c(2),trim:c(3)}},261:(t,e,r)=>{var i,n,a,s,o=r(7854),h=r(2104),u=r(9974),l=r(614),c=r(2597),g=r(7293),f=r(490),p=r(206),d=r(317),v=r(8053),y=r(6833),m=r(5268),x=o.setImmediate,b=o.clearImmediate,S=o.process,w=o.Dispatch,T=o.Function,A=o.MessageChannel,C=o.String,O=0,P={};try{i=o.location}catch(t){}var E=function(t){if(c(P,t)){var e=P[t];delete P[t],e()}},M=function(t){return function(){E(t)}},N=function(t){E(t.data)},V=function(t){o.postMessage(C(t),i.protocol+"//"+i.host)};x&&b||(x=function(t){v(arguments.length,1);var e=l(t)?t:T(t),r=p(arguments,1);return P[++O]=function(){h(e,void 0,r)},n(O),O},b=function(t){delete P[t]},m?n=function(t){S.nextTick(M(t))}:w&&w.now?n=function(t){w.now(M(t))}:A&&!y?(s=(a=new A).port2,a.port1.onmessage=N,n=u(s.postMessage,s)):o.addEventListener&&l(o.postMessage)&&!o.importScripts&&i&&"file:"!==i.protocol&&!g(V)?(n=V,o.addEventListener("message",N,!1)):n="onreadystatechange"in d("script")?function(t){f.appendChild(d("script")).onreadystatechange=function(){f.removeChild(this),E(t)}}:function(t){setTimeout(M(t),0)}),t.exports={set:x,clear:b}},8053:(t,e,r)=>{var i=r(7854).TypeError;t.exports=function(t,e){if(t<e)throw i("Not enough arguments");return t}},1361:t=>{t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},2772:(t,e,r)=>{"use strict";var i=r(2109),n=r(1702),a=r(1318).indexOf,s=r(9341),o=n([].indexOf),h=!!o&&1/o([1],1,-0)<0,u=s("indexOf");i({target:"Array",proto:!0,forced:h||!u},{indexOf:function(t){var e=arguments.length>1?arguments[1]:void 0;return h?o(this,t,e)||0:a(this,t,e)}})},6992:(t,e,r)=>{"use strict";var i=r(5656),n=r(1223),a=r(7497),s=r(9909),o=r(3070).f,h=r(654),u=r(1913),l=r(9781),c="Array Iterator",g=s.set,f=s.getterFor(c);t.exports=h(Array,"Array",(function(t,e){g(this,{type:c,target:i(t),index:0,kind:e})}),(function(){var t=f(this),e=t.target,r=t.kind,i=t.index++;return!e||i>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==r?{value:i,done:!1}:"values"==r?{value:e[i],done:!1}:{value:[i,e[i]],done:!1}}),"values");var p=a.Arguments=a.Array;if(n("keys"),n("values"),n("entries"),!u&&l&&"values"!==p.name)try{o(p,"name",{value:"values"})}catch(t){}},5827:(t,e,r)=>{"use strict";var i=r(2109),n=r(3671).left,a=r(9341),s=r(7392),o=r(5268);i({target:"Array",proto:!0,forced:!a("reduce")||!o&&s>79&&s<83},{reduce:function(t){var e=arguments.length;return n(this,t,e,e>1?arguments[1]:void 0)}})},5069:(t,e,r)=>{"use strict";var i=r(2109),n=r(1702),a=r(1349),s=n([].reverse),o=[1,2];i({target:"Array",proto:!0,forced:String(o)===String(o.reverse())},{reverse:function(){return a(this)&&(this.length=this.length),s(this)}})},821:(t,e,r)=>{"use strict";var i=r(2109),n=r(6916),a=r(9662),s=r(8523),o=r(2534),h=r(408);i({target:"Promise",stat:!0,forced:r(612)},{all:function(t){var e=this,r=s.f(e),i=r.resolve,u=r.reject,l=o((function(){var r=a(e.resolve),s=[],o=0,l=1;h(t,(function(t){var a=o++,h=!1;l++,n(r,e,t).then((function(t){h||(h=!0,s[a]=t,--l||i(s))}),u)})),--l||i(s)}));return l.error&&u(l.value),r.promise}})},4164:(t,e,r)=>{"use strict";var i=r(2109),n=r(1913),a=r(3702).CONSTRUCTOR,s=r(2492),o=r(5005),h=r(614),u=r(1320),l=s&&s.prototype;if(i({target:"Promise",proto:!0,forced:a,real:!0},{catch:function(t){return this.then(void 0,t)}}),!n&&h(s)){var c=o("Promise").prototype.catch;l.catch!==c&&u(l,"catch",c,{unsafe:!0})}},3401:(t,e,r)=>{"use strict";var i,n,a,s=r(2109),o=r(1913),h=r(5268),u=r(7854),l=r(6916),c=r(1320),g=r(2248),f=r(7674),p=r(8003),d=r(6340),v=r(9662),y=r(614),m=r(111),x=r(5787),b=r(6707),S=r(261).set,w=r(5948),T=r(842),A=r(2534),C=r(8572),O=r(9909),P=r(2492),E=r(3702),M=r(8523),N="Promise",V=E.CONSTRUCTOR,_=E.REJECTION_EVENT,R=E.SUBCLASSING,k=O.getterFor(N),I=O.set,L=P&&P.prototype,D=P,B=L,z=u.TypeError,U=u.document,F=u.process,H=M.f,X=H,j=!!(U&&U.createEvent&&u.dispatchEvent),Y="unhandledrejection",q=function(t){var e;return!(!m(t)||!y(e=t.then))&&e},W=function(t,e){var r,i,n,a=e.value,s=1==e.state,o=s?t.ok:t.fail,h=t.resolve,u=t.reject,c=t.domain;try{o?(s||(2===e.rejection&&K(e),e.rejection=1),!0===o?r=a:(c&&c.enter(),r=o(a),c&&(c.exit(),n=!0)),r===t.promise?u(z("Promise-chain cycle")):(i=q(r))?l(i,r,h,u):h(r)):u(a)}catch(t){c&&!n&&c.exit(),u(t)}},G=function(t,e){t.notified||(t.notified=!0,w((function(){for(var r,i=t.reactions;r=i.get();)W(r,t);t.notified=!1,e&&!t.rejection&&$(t)})))},Q=function(t,e,r){var i,n;j?((i=U.createEvent("Event")).promise=e,i.reason=r,i.initEvent(t,!1,!0),u.dispatchEvent(i)):i={promise:e,reason:r},!_&&(n=u["on"+t])?n(i):t===Y&&T("Unhandled promise rejection",r)},$=function(t){l(S,u,(function(){var e,r=t.facade,i=t.value;if(Z(t)&&(e=A((function(){h?F.emit("unhandledRejection",i,r):Q(Y,r,i)})),t.rejection=h||Z(t)?2:1,e.error))throw e.value}))},Z=function(t){return 1!==t.rejection&&!t.parent},K=function(t){l(S,u,(function(){var e=t.facade;h?F.emit("rejectionHandled",e):Q("rejectionhandled",e,t.value)}))},J=function(t,e,r){return function(i){t(e,i,r)}},tt=function(t,e,r){t.done||(t.done=!0,r&&(t=r),t.value=e,t.state=2,G(t,!0))},et=function(t,e,r){if(!t.done){t.done=!0,r&&(t=r);try{if(t.facade===e)throw z("Promise can't be resolved itself");var i=q(e);i?w((function(){var r={done:!1};try{l(i,e,J(et,r,t),J(tt,r,t))}catch(e){tt(r,e,t)}})):(t.value=e,t.state=1,G(t,!1))}catch(e){tt({done:!1},e,t)}}};if(V&&(B=(D=function(t){x(this,B),v(t),l(i,this);var e=k(this);try{t(J(et,e),J(tt,e))}catch(t){tt(e,t)}}).prototype,(i=function(t){I(this,{type:N,done:!1,notified:!1,parent:!1,reactions:new C,rejection:!1,state:0,value:void 0})}).prototype=g(B,{then:function(t,e){var r=k(this),i=H(b(this,D));return r.parent=!0,i.ok=!y(t)||t,i.fail=y(e)&&e,i.domain=h?F.domain:void 0,0==r.state?r.reactions.add(i):w((function(){W(i,r)})),i.promise}}),n=function(){var t=new i,e=k(t);this.promise=t,this.resolve=J(et,e),this.reject=J(tt,e)},M.f=H=function(t){return t===D||void 0===t?new n(t):X(t)},!o&&y(P)&&L!==Object.prototype)){a=L.then,R||c(L,"then",(function(t,e){var r=this;return new D((function(t,e){l(a,r,t,e)})).then(t,e)}),{unsafe:!0});try{delete L.constructor}catch(t){}f&&f(L,B)}s({global:!0,wrap:!0,forced:V},{Promise:D}),p(D,N,!1,!0),d(N)},8674:(t,e,r)=>{r(3401),r(821),r(4164),r(6027),r(683),r(6294)},6027:(t,e,r)=>{"use strict";var i=r(2109),n=r(6916),a=r(9662),s=r(8523),o=r(2534),h=r(408);i({target:"Promise",stat:!0,forced:r(612)},{race:function(t){var e=this,r=s.f(e),i=r.reject,u=o((function(){var s=a(e.resolve);h(t,(function(t){n(s,e,t).then(r.resolve,i)}))}));return u.error&&i(u.value),r.promise}})},683:(t,e,r)=>{"use strict";var i=r(2109),n=r(6916),a=r(8523);i({target:"Promise",stat:!0,forced:r(3702).CONSTRUCTOR},{reject:function(t){var e=a.f(this);return n(e.reject,void 0,t),e.promise}})},6294:(t,e,r)=>{"use strict";var i=r(2109),n=r(5005),a=r(1913),s=r(2492),o=r(3702).CONSTRUCTOR,h=r(9478),u=n("Promise"),l=a&&!o;i({target:"Promise",stat:!0,forced:a||o},{resolve:function(t){return h(l&&this===u?s:this,t)}})},9714:(t,e,r)=>{"use strict";var i=r(6530).PROPER,n=r(1320),a=r(9670),s=r(1340),o=r(7293),h=r(4706),u="toString",l=RegExp.prototype.toString,c=o((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),g=i&&l.name!=u;(c||g)&&n(RegExp.prototype,u,(function(){var t=a(this);return"/"+s(t.source)+"/"+s(h(t))}),{unsafe:!0})},7852:(t,e,r)=>{"use strict";var i,n=r(2109),a=r(1702),s=r(1236).f,o=r(7466),h=r(1340),u=r(3929),l=r(4488),c=r(4964),g=r(1913),f=a("".endsWith),p=a("".slice),d=Math.min,v=c("endsWith");n({target:"String",proto:!0,forced:!(!g&&!v&&(i=s(String.prototype,"endsWith"),i&&!i.writable)||v)},{endsWith:function(t){var e=h(l(this));u(t);var r=arguments.length>1?arguments[1]:void 0,i=e.length,n=void 0===r?i:d(o(r),i),a=h(t);return f?f(e,a,n):p(e,n-a.length,n)===a}})},2023:(t,e,r)=>{"use strict";var i=r(2109),n=r(1702),a=r(3929),s=r(4488),o=r(1340),h=r(4964),u=n("".indexOf);i({target:"String",proto:!0,forced:!h("includes")},{includes:function(t){return!!~u(o(s(this)),o(a(t)),arguments.length>1?arguments[1]:void 0)}})},4723:(t,e,r)=>{"use strict";var i=r(6916),n=r(7007),a=r(9670),s=r(7466),o=r(1340),h=r(4488),u=r(8173),l=r(1530),c=r(7651);n("match",(function(t,e,r){return[function(e){var r=h(this),n=null==e?void 0:u(e,t);return n?i(n,e,r):new RegExp(e)[t](o(r))},function(t){var i=a(this),n=o(t),h=r(e,i,n);if(h.done)return h.value;if(!i.global)return c(i,n);var u=i.unicode;i.lastIndex=0;for(var g,f=[],p=0;null!==(g=c(i,n));){var d=o(g[0]);f[p]=d,""===d&&(i.lastIndex=l(n,s(i.lastIndex),u)),p++}return 0===p?null:f}]}))},3123:(t,e,r)=>{"use strict";var i=r(2104),n=r(6916),a=r(1702),s=r(7007),o=r(7850),h=r(9670),u=r(4488),l=r(6707),c=r(1530),g=r(7466),f=r(1340),p=r(8173),d=r(1589),v=r(7651),y=r(2261),m=r(2999),x=r(7293),b=m.UNSUPPORTED_Y,S=4294967295,w=Math.min,T=[].push,A=a(/./.exec),C=a(T),O=a("".slice);s("split",(function(t,e,r){var a;return a="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,r){var a=f(u(this)),s=void 0===r?S:r>>>0;if(0===s)return[];if(void 0===t)return[a];if(!o(t))return n(e,a,t,s);for(var h,l,c,g=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),v=0,m=new RegExp(t.source,p+"g");(h=n(y,m,a))&&!((l=m.lastIndex)>v&&(C(g,O(a,v,h.index)),h.length>1&&h.index<a.length&&i(T,g,d(h,1)),c=h[0].length,v=l,g.length>=s));)m.lastIndex===h.index&&m.lastIndex++;return v===a.length?!c&&A(m,"")||C(g,""):C(g,O(a,v)),g.length>s?d(g,0,s):g}:"0".split(void 0,0).length?function(t,r){return void 0===t&&0===r?[]:n(e,this,t,r)}:e,[function(e,r){var i=u(this),s=null==e?void 0:p(e,t);return s?n(s,e,i,r):n(a,f(i),e,r)},function(t,i){var n=h(this),s=f(t),o=r(a,n,s,i,a!==e);if(o.done)return o.value;var u=l(n,RegExp),p=n.unicode,d=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.unicode?"u":"")+(b?"g":"y"),y=new u(b?"^(?:"+n.source+")":n,d),m=void 0===i?S:i>>>0;if(0===m)return[];if(0===s.length)return null===v(y,s)?[s]:[];for(var x=0,T=0,A=[];T<s.length;){y.lastIndex=b?0:T;var P,E=v(y,b?O(s,T):s);if(null===E||(P=w(g(y.lastIndex+(b?T:0)),s.length))===x)T=c(s,T,p);else{if(C(A,O(s,x,T)),A.length===m)return A;for(var M=1;M<=E.length-1;M++)if(C(A,E[M]),A.length===m)return A;T=x=P}}return C(A,O(s,x)),A}]}),!!x((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]})),b)},3157:(t,e,r)=>{"use strict";var i,n=r(2109),a=r(1702),s=r(1236).f,o=r(7466),h=r(1340),u=r(3929),l=r(4488),c=r(4964),g=r(1913),f=a("".startsWith),p=a("".slice),d=Math.min,v=c("startsWith");n({target:"String",proto:!0,forced:!(!g&&!v&&(i=s(String.prototype,"startsWith"),i&&!i.writable)||v)},{startsWith:function(t){var e=h(l(this));u(t);var r=o(d(arguments.length>1?arguments[1]:void 0,e.length)),i=h(t);return f?f(e,i,r):p(e,r,r+i.length)===i}})},3210:(t,e,r)=>{"use strict";var i=r(2109),n=r(3111).trim;i({target:"String",proto:!0,forced:r(6091)("trim")},{trim:function(){return n(this)}})},3948:(t,e,r)=>{var i=r(7854),n=r(8324),a=r(8509),s=r(6992),o=r(8880),h=r(5112),u=h("iterator"),l=h("toStringTag"),c=s.values,g=function(t,e){if(t){if(t[u]!==c)try{o(t,u,c)}catch(e){t[u]=c}if(t[l]||o(t,l,e),n[e])for(var r in s)if(t[r]!==s[r])try{o(t,r,s[r])}catch(e){t[r]=s[r]}}};for(var f in n)g(i[f]&&i[f].prototype,f);g(a,"DOMTokenList")},75:function(t){(function(){var e,r,i,n,a,s;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(t.exports=function(){return(e()-a)/1e6},r=process.hrtime,n=(e=function(){var t;return 1e9*(t=r())[0]+t[1]})(),s=1e9*process.uptime(),a=n-s):Date.now?(t.exports=function(){return Date.now()-i},i=Date.now()):(t.exports=function(){return(new Date).getTime()-i},i=(new Date).getTime())}).call(this)},4087:(t,e,r)=>{for(var i=r(75),n="undefined"==typeof window?r.g:window,a=["moz","webkit"],s="AnimationFrame",o=n["request"+s],h=n["cancel"+s]||n["cancelRequest"+s],u=0;!o&&u<a.length;u++)o=n[a[u]+"Request"+s],h=n[a[u]+"Cancel"+s]||n[a[u]+"CancelRequest"+s];if(!o||!h){var l=0,c=0,g=[];o=function(t){if(0===g.length){var e=i(),r=Math.max(0,16.666666666666668-(e-l));l=r+e,setTimeout((function(){var t=g.slice(0);g.length=0;for(var e=0;e<t.length;e++)if(!t[e].cancelled)try{t[e].callback(l)}catch(t){setTimeout((function(){throw t}),0)}}),Math.round(r))}return g.push({handle:++c,callback:t,cancelled:!1}),c},h=function(t){for(var e=0;e<g.length;e++)g[e].handle===t&&(g[e].cancelled=!0)}}t.exports=function(t){return o.call(n,t)},t.exports.cancel=function(){h.apply(n,arguments)},t.exports.polyfill=function(t){t||(t=n),t.requestAnimationFrame=o,t.cancelAnimationFrame=h}},6131:t=>{t.exports=function(t){this.ok=!1,this.alpha=1,"#"==t.charAt(0)&&(t=t.substr(1,6)),t=(t=t.replace(/ /g,"")).toLowerCase();var e={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};t=e[t]||t;for(var r=[{re:/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,example:["rgba(123, 234, 45, 0.8)","rgba(255,234,245,1.0)"],process:function(t){return[parseInt(t[1]),parseInt(t[2]),parseInt(t[3]),parseFloat(t[4])]}},{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(t){return[parseInt(t[1]),parseInt(t[2]),parseInt(t[3])]}},{re:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,example:["#00ff00","336699"],process:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,example:["#fb0","f0f"],process:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}}],i=0;i<r.length;i++){var n=r[i].re,a=r[i].process,s=n.exec(t);if(s){var o=a(s);this.r=o[0],this.g=o[1],this.b=o[2],o.length>3&&(this.alpha=o[3]),this.ok=!0}}this.r=this.r<0||isNaN(this.r)?0:this.r>255?255:this.r,this.g=this.g<0||isNaN(this.g)?0:this.g>255?255:this.g,this.b=this.b<0||isNaN(this.b)?0:this.b>255?255:this.b,this.alpha=this.alpha<0?0:this.alpha>1||isNaN(this.alpha)?1:this.alpha,this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"},this.toRGBA=function(){return"rgba("+this.r+", "+this.g+", "+this.b+", "+this.alpha+")"},this.toHex=function(){var t=this.r.toString(16),e=this.g.toString(16),r=this.b.toString(16);return 1==t.length&&(t="0"+t),1==e.length&&(e="0"+e),1==r.length&&(r="0"+r),"#"+t+e+r},this.getHelpXML=function(){for(var t=new Array,i=0;i<r.length;i++)for(var n=r[i].example,a=0;a<n.length;a++)t[t.length]=n[a];for(var s in e)t[t.length]=s;var o=document.createElement("ul");for(o.setAttribute("id","rgbcolor-examples"),i=0;i<t.length;i++)try{var h=document.createElement("li"),u=new RGBColor(t[i]),l=document.createElement("div");l.style.cssText="margin: 3px; border: 1px solid black; background:"+u.toHex()+"; color:"+u.toHex(),l.appendChild(document.createTextNode("test"));var c=document.createTextNode(" "+t[i]+" -> "+u.toRGB()+" -> "+u.toHex());h.appendChild(l),h.appendChild(c),o.appendChild(h)}catch(t){}return o}}},5814:(t,e,r)=>{"use strict";function i(t,e,r,i,n,a,s){try{var o=t[a](s),h=o.value}catch(t){return void r(t)}o.done?e(h):Promise.resolve(h).then(i,n)}function n(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var s=t.apply(e,r);function o(t){i(s,n,a,o,h,"next",t)}function h(t){i(s,n,a,o,h,"throw",t)}o(void 0)}))}}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.r(e),r.d(e,{AElement:()=>he,AnimateColorElement:()=>re,AnimateElement:()=>ee,AnimateTransformElement:()=>ie,BoundingBox:()=>_t,CB1:()=>et,CB2:()=>rt,CB3:()=>it,CB4:()=>nt,Canvg:()=>ze,CircleElement:()=>Ht,ClipPathElement:()=>Ce,DefsElement:()=>Qt,DescElement:()=>_e,Document:()=>Le,Element:()=>Ot,EllipseElement:()=>Xt,FeColorMatrixElement:()=>we,FeCompositeElement:()=>Me,FeDropShadowElement:()=>Pe,FeGaussianBlurElement:()=>Ne,FeMorphologyElement:()=>Ee,FilterElement:()=>Oe,Font:()=>Vt,FontElement:()=>ne,FontFaceElement:()=>ae,GElement:()=>$t,GlyphElement:()=>Lt,GradientElement:()=>Zt,ImageElement:()=>fe,LineElement:()=>jt,LinearGradientElement:()=>Kt,MarkerElement:()=>Gt,MaskElement:()=>Te,Matrix:()=>St,MissingGlyphElement:()=>se,Mouse:()=>ct,PSEUDO_ZERO:()=>Z,Parser:()=>yt,PathElement:()=>It,PathParser:()=>Rt,PatternElement:()=>Wt,Point:()=>lt,PolygonElement:()=>qt,PolylineElement:()=>Yt,Property:()=>ht,QB1:()=>at,QB2:()=>st,QB3:()=>ot,RadialGradientElement:()=>Jt,RectElement:()=>Ft,RenderedElement:()=>kt,Rotate:()=>xt,SVGElement:()=>Ut,SVGFontLoader:()=>de,Scale:()=>bt,Screen:()=>pt,Skew:()=>wt,SkewX:()=>Tt,SkewY:()=>At,StopElement:()=>te,StyleElement:()=>ve,SymbolElement:()=>pe,TRefElement:()=>oe,TSpanElement:()=>Bt,TextElement:()=>Dt,TextPathElement:()=>ce,TitleElement:()=>Ve,Transform:()=>Ct,Translate:()=>mt,UnknownElement:()=>Pt,UseElement:()=>ye,ViewPort:()=>ut,compressSpaces:()=>k,default:()=>ze,getSelectorSpecificity:()=>$,normalizeAttributeName:()=>z,normalizeColor:()=>F,parseExternalUrl:()=>U,presets:()=>R,toNumbers:()=>D,trimLeft:()=>I,trimRight:()=>L,vectorMagnitude:()=>K,vectorsAngle:()=>tt,vectorsRatio:()=>J}),r(8674),r(4723),r(5306),r(3157),r(6992),r(3948),r(5827),r(7852),r(3123);var s=r(4087),o=(r(3210),r(6131)),h=(r(2772),r(2023),r(5069),function(t,e){return(h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)});function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}h(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function l(t,e){var r=t[0],i=t[1];return[r*Math.cos(e)-i*Math.sin(e),r*Math.sin(e)+i*Math.cos(e)]}function c(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var r=0;r<t.length;r++)if("number"!=typeof t[r])throw new Error("assertNumbers arguments["+r+"] is not a number. "+typeof t[r]+" == typeof "+t[r]);return!0}var g=Math.PI;function f(t,e,r){t.lArcFlag=0===t.lArcFlag?0:1,t.sweepFlag=0===t.sweepFlag?0:1;var i=t.rX,n=t.rY,a=t.x,s=t.y;i=Math.abs(t.rX),n=Math.abs(t.rY);var o=l([(e-a)/2,(r-s)/2],-t.xRot/180*g),h=o[0],u=o[1],c=Math.pow(h,2)/Math.pow(i,2)+Math.pow(u,2)/Math.pow(n,2);1<c&&(i*=Math.sqrt(c),n*=Math.sqrt(c)),t.rX=i,t.rY=n;var f=Math.pow(i,2)*Math.pow(u,2)+Math.pow(n,2)*Math.pow(h,2),p=(t.lArcFlag!==t.sweepFlag?1:-1)*Math.sqrt(Math.max(0,(Math.pow(i,2)*Math.pow(n,2)-f)/f)),d=i*u/n*p,v=-n*h/i*p,y=l([d,v],t.xRot/180*g);t.cX=y[0]+(e+a)/2,t.cY=y[1]+(r+s)/2,t.phi1=Math.atan2((u-v)/n,(h-d)/i),t.phi2=Math.atan2((-u-v)/n,(-h-d)/i),0===t.sweepFlag&&t.phi2>t.phi1&&(t.phi2-=2*g),1===t.sweepFlag&&t.phi2<t.phi1&&(t.phi2+=2*g),t.phi1*=180/g,t.phi2*=180/g}function p(t,e,r){c(t,e,r);var i=t*t+e*e-r*r;if(0>i)return[];if(0===i)return[[t*r/(t*t+e*e),e*r/(t*t+e*e)]];var n=Math.sqrt(i);return[[(t*r+e*n)/(t*t+e*e),(e*r-t*n)/(t*t+e*e)],[(t*r-e*n)/(t*t+e*e),(e*r+t*n)/(t*t+e*e)]]}var d,v=Math.PI/180;function y(t,e,r){return(1-r)*t+r*e}function m(t,e,r,i){return t+Math.cos(i/180*g)*e+Math.sin(i/180*g)*r}function x(t,e,r,i){var n=1e-6,a=e-t,s=r-e,o=3*a+3*(i-r)-6*s,h=6*(s-a),u=3*a;return Math.abs(o)<n?[-u/h]:function(t,e,r){void 0===r&&(r=1e-6);var i=t*t/4-e;if(i<-r)return[];if(i<=r)return[-t/2];var n=Math.sqrt(i);return[-t/2-n,-t/2+n]}(h/o,u/o,n)}function b(t,e,r,i,n){var a=1-n;return t*(a*a*a)+e*(3*a*a*n)+r*(3*a*n*n)+i*(n*n*n)}!function(t){function e(){return n((function(t,e,r){return t.relative&&(void 0!==t.x1&&(t.x1+=e),void 0!==t.y1&&(t.y1+=r),void 0!==t.x2&&(t.x2+=e),void 0!==t.y2&&(t.y2+=r),void 0!==t.x&&(t.x+=e),void 0!==t.y&&(t.y+=r),t.relative=!1),t}))}function r(){var t=NaN,e=NaN,r=NaN,i=NaN;return n((function(n,a,s){return n.type&O.SMOOTH_CURVE_TO&&(n.type=O.CURVE_TO,t=isNaN(t)?a:t,e=isNaN(e)?s:e,n.x1=n.relative?a-t:2*a-t,n.y1=n.relative?s-e:2*s-e),n.type&O.CURVE_TO?(t=n.relative?a+n.x2:n.x2,e=n.relative?s+n.y2:n.y2):(t=NaN,e=NaN),n.type&O.SMOOTH_QUAD_TO&&(n.type=O.QUAD_TO,r=isNaN(r)?a:r,i=isNaN(i)?s:i,n.x1=n.relative?a-r:2*a-r,n.y1=n.relative?s-i:2*s-i),n.type&O.QUAD_TO?(r=n.relative?a+n.x1:n.x1,i=n.relative?s+n.y1:n.y1):(r=NaN,i=NaN),n}))}function i(){var t=NaN,e=NaN;return n((function(r,i,n){if(r.type&O.SMOOTH_QUAD_TO&&(r.type=O.QUAD_TO,t=isNaN(t)?i:t,e=isNaN(e)?n:e,r.x1=r.relative?i-t:2*i-t,r.y1=r.relative?n-e:2*n-e),r.type&O.QUAD_TO){t=r.relative?i+r.x1:r.x1,e=r.relative?n+r.y1:r.y1;var a=r.x1,s=r.y1;r.type=O.CURVE_TO,r.x1=((r.relative?0:i)+2*a)/3,r.y1=((r.relative?0:n)+2*s)/3,r.x2=(r.x+2*a)/3,r.y2=(r.y+2*s)/3}else t=NaN,e=NaN;return r}))}function n(t){var e=0,r=0,i=NaN,n=NaN;return function(a){if(isNaN(i)&&!(a.type&O.MOVE_TO))throw new Error("path must start with moveto");var s=t(a,e,r,i,n);return a.type&O.CLOSE_PATH&&(e=i,r=n),void 0!==a.x&&(e=a.relative?e+a.x:a.x),void 0!==a.y&&(r=a.relative?r+a.y:a.y),a.type&O.MOVE_TO&&(i=e,n=r),s}}function a(t,e,r,i,a,s){return c(t,e,r,i,a,s),n((function(n,o,h,u){var l=n.x1,c=n.x2,g=n.relative&&!isNaN(u),f=void 0!==n.x?n.x:g?0:o,p=void 0!==n.y?n.y:g?0:h;function d(t){return t*t}n.type&O.HORIZ_LINE_TO&&0!==e&&(n.type=O.LINE_TO,n.y=n.relative?0:h),n.type&O.VERT_LINE_TO&&0!==r&&(n.type=O.LINE_TO,n.x=n.relative?0:o),void 0!==n.x&&(n.x=n.x*t+p*r+(g?0:a)),void 0!==n.y&&(n.y=f*e+n.y*i+(g?0:s)),void 0!==n.x1&&(n.x1=n.x1*t+n.y1*r+(g?0:a)),void 0!==n.y1&&(n.y1=l*e+n.y1*i+(g?0:s)),void 0!==n.x2&&(n.x2=n.x2*t+n.y2*r+(g?0:a)),void 0!==n.y2&&(n.y2=c*e+n.y2*i+(g?0:s));var v=t*i-e*r;if(void 0!==n.xRot&&(1!==t||0!==e||0!==r||1!==i))if(0===v)delete n.rX,delete n.rY,delete n.xRot,delete n.lArcFlag,delete n.sweepFlag,n.type=O.LINE_TO;else{var y=n.xRot*Math.PI/180,m=Math.sin(y),x=Math.cos(y),b=1/d(n.rX),S=1/d(n.rY),w=d(x)*b+d(m)*S,T=2*m*x*(b-S),A=d(m)*b+d(x)*S,C=w*i*i-T*e*i+A*e*e,P=T*(t*i+e*r)-2*(w*r*i+A*t*e),E=w*r*r-T*t*r+A*t*t,M=(Math.atan2(P,C-E)+Math.PI)%Math.PI/2,N=Math.sin(M),V=Math.cos(M);n.rX=Math.abs(v)/Math.sqrt(C*d(V)+P*N*V+E*d(N)),n.rY=Math.abs(v)/Math.sqrt(C*d(N)-P*N*V+E*d(V)),n.xRot=180*M/Math.PI}return void 0!==n.sweepFlag&&0>v&&(n.sweepFlag=+!n.sweepFlag),n}))}t.ROUND=function(t){function e(e){return Math.round(e*t)/t}return void 0===t&&(t=1e13),c(t),function(t){return void 0!==t.x1&&(t.x1=e(t.x1)),void 0!==t.y1&&(t.y1=e(t.y1)),void 0!==t.x2&&(t.x2=e(t.x2)),void 0!==t.y2&&(t.y2=e(t.y2)),void 0!==t.x&&(t.x=e(t.x)),void 0!==t.y&&(t.y=e(t.y)),void 0!==t.rX&&(t.rX=e(t.rX)),void 0!==t.rY&&(t.rY=e(t.rY)),t}},t.TO_ABS=e,t.TO_REL=function(){return n((function(t,e,r){return t.relative||(void 0!==t.x1&&(t.x1-=e),void 0!==t.y1&&(t.y1-=r),void 0!==t.x2&&(t.x2-=e),void 0!==t.y2&&(t.y2-=r),void 0!==t.x&&(t.x-=e),void 0!==t.y&&(t.y-=r),t.relative=!0),t}))},t.NORMALIZE_HVZ=function(t,e,r){return void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),n((function(i,n,a,s,o){if(isNaN(s)&&!(i.type&O.MOVE_TO))throw new Error("path must start with moveto");return e&&i.type&O.HORIZ_LINE_TO&&(i.type=O.LINE_TO,i.y=i.relative?0:a),r&&i.type&O.VERT_LINE_TO&&(i.type=O.LINE_TO,i.x=i.relative?0:n),t&&i.type&O.CLOSE_PATH&&(i.type=O.LINE_TO,i.x=i.relative?s-n:s,i.y=i.relative?o-a:o),i.type&O.ARC&&(0===i.rX||0===i.rY)&&(i.type=O.LINE_TO,delete i.rX,delete i.rY,delete i.xRot,delete i.lArcFlag,delete i.sweepFlag),i}))},t.NORMALIZE_ST=r,t.QT_TO_C=i,t.INFO=n,t.SANITIZE=function(t){void 0===t&&(t=0),c(t);var e=NaN,r=NaN,i=NaN,a=NaN;return n((function(n,s,o,h,u){var l=Math.abs,c=!1,g=0,f=0;if(n.type&O.SMOOTH_CURVE_TO&&(g=isNaN(e)?0:s-e,f=isNaN(r)?0:o-r),n.type&(O.CURVE_TO|O.SMOOTH_CURVE_TO)?(e=n.relative?s+n.x2:n.x2,r=n.relative?o+n.y2:n.y2):(e=NaN,r=NaN),n.type&O.SMOOTH_QUAD_TO?(i=isNaN(i)?s:2*s-i,a=isNaN(a)?o:2*o-a):n.type&O.QUAD_TO?(i=n.relative?s+n.x1:n.x1,a=n.relative?o+n.y1:n.y2):(i=NaN,a=NaN),n.type&O.LINE_COMMANDS||n.type&O.ARC&&(0===n.rX||0===n.rY||!n.lArcFlag)||n.type&O.CURVE_TO||n.type&O.SMOOTH_CURVE_TO||n.type&O.QUAD_TO||n.type&O.SMOOTH_QUAD_TO){var p=void 0===n.x?0:n.relative?n.x:n.x-s,d=void 0===n.y?0:n.relative?n.y:n.y-o;g=isNaN(i)?void 0===n.x1?g:n.relative?n.x:n.x1-s:i-s,f=isNaN(a)?void 0===n.y1?f:n.relative?n.y:n.y1-o:a-o;var v=void 0===n.x2?0:n.relative?n.x:n.x2-s,y=void 0===n.y2?0:n.relative?n.y:n.y2-o;l(p)<=t&&l(d)<=t&&l(g)<=t&&l(f)<=t&&l(v)<=t&&l(y)<=t&&(c=!0)}return n.type&O.CLOSE_PATH&&l(s-h)<=t&&l(o-u)<=t&&(c=!0),c?[]:n}))},t.MATRIX=a,t.ROTATE=function(t,e,r){void 0===e&&(e=0),void 0===r&&(r=0),c(t,e,r);var i=Math.sin(t),n=Math.cos(t);return a(n,i,-i,n,e-e*n+r*i,r-e*i-r*n)},t.TRANSLATE=function(t,e){return void 0===e&&(e=0),c(t,e),a(1,0,0,1,t,e)},t.SCALE=function(t,e){return void 0===e&&(e=t),c(t,e),a(t,0,0,e,0,0)},t.SKEW_X=function(t){return c(t),a(1,0,Math.atan(t),1,0,0)},t.SKEW_Y=function(t){return c(t),a(1,Math.atan(t),0,1,0,0)},t.X_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),c(t),a(-1,0,0,1,t,0)},t.Y_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),c(t),a(1,0,0,-1,0,t)},t.A_TO_C=function(){return n((function(t,e,r){return O.ARC===t.type?function(t,e,r){var i,n,a,s;t.cX||f(t,e,r);for(var o=Math.min(t.phi1,t.phi2),h=Math.max(t.phi1,t.phi2)-o,u=Math.ceil(h/90),c=new Array(u),g=e,p=r,d=0;d<u;d++){var m=y(t.phi1,t.phi2,d/u),x=y(t.phi1,t.phi2,(d+1)/u),b=x-m,S=4/3*Math.tan(b*v/4),w=[Math.cos(m*v)-S*Math.sin(m*v),Math.sin(m*v)+S*Math.cos(m*v)],T=w[0],A=w[1],C=[Math.cos(x*v),Math.sin(x*v)],P=C[0],E=C[1],M=[P+S*Math.sin(x*v),E-S*Math.cos(x*v)],N=M[0],V=M[1];c[d]={relative:t.relative,type:O.CURVE_TO};var _=function(e,r){var i=l([e*t.rX,r*t.rY],t.xRot),n=i[0],a=i[1];return[t.cX+n,t.cY+a]};i=_(T,A),c[d].x1=i[0],c[d].y1=i[1],n=_(N,V),c[d].x2=n[0],c[d].y2=n[1],a=_(P,E),c[d].x=a[0],c[d].y=a[1],t.relative&&(c[d].x1-=g,c[d].y1-=p,c[d].x2-=g,c[d].y2-=p,c[d].x-=g,c[d].y-=p),g=(s=[c[d].x,c[d].y])[0],p=s[1]}return c}(t,t.relative?0:e,t.relative?0:r):t}))},t.ANNOTATE_ARCS=function(){return n((function(t,e,r){return t.relative&&(e=0,r=0),O.ARC===t.type&&f(t,e,r),t}))},t.CLONE=function(){return function(t){var e={};for(var r in t)e[r]=t[r];return e}},t.CALCULATE_BOUNDS=function(){var t=e(),a=i(),s=r(),o=n((function(e,r,i){var n=s(a(t(function(t){var e={};for(var r in t)e[r]=t[r];return e}(e))));function h(t){t>o.maxX&&(o.maxX=t),t<o.minX&&(o.minX=t)}function u(t){t>o.maxY&&(o.maxY=t),t<o.minY&&(o.minY=t)}if(n.type&O.DRAWING_COMMANDS&&(h(r),u(i)),n.type&O.HORIZ_LINE_TO&&h(n.x),n.type&O.VERT_LINE_TO&&u(n.y),n.type&O.LINE_TO&&(h(n.x),u(n.y)),n.type&O.CURVE_TO){h(n.x),u(n.y);for(var l=0,c=x(r,n.x1,n.x2,n.x);l<c.length;l++)0<(R=c[l])&&1>R&&h(b(r,n.x1,n.x2,n.x,R));for(var g=0,d=x(i,n.y1,n.y2,n.y);g<d.length;g++)0<(R=d[g])&&1>R&&u(b(i,n.y1,n.y2,n.y,R))}if(n.type&O.ARC){h(n.x),u(n.y),f(n,r,i);for(var v=n.xRot/180*Math.PI,y=Math.cos(v)*n.rX,S=Math.sin(v)*n.rX,w=-Math.sin(v)*n.rY,T=Math.cos(v)*n.rY,A=n.phi1<n.phi2?[n.phi1,n.phi2]:-180>n.phi2?[n.phi2+360,n.phi1+360]:[n.phi2,n.phi1],C=A[0],P=A[1],E=function(t){var e=t[0],r=t[1],i=180*Math.atan2(r,e)/Math.PI;return i<C?i+360:i},M=0,N=p(w,-y,0).map(E);M<N.length;M++)(R=N[M])>C&&R<P&&h(m(n.cX,y,w,R));for(var V=0,_=p(T,-S,0).map(E);V<_.length;V++){var R;(R=_[V])>C&&R<P&&u(m(n.cY,S,T,R))}}return e}));return o.minX=1/0,o.maxX=-1/0,o.minY=1/0,o.maxY=-1/0,o}}(d||(d={}));var S,w=function(){function t(){}return t.prototype.round=function(t){return this.transform(d.ROUND(t))},t.prototype.toAbs=function(){return this.transform(d.TO_ABS())},t.prototype.toRel=function(){return this.transform(d.TO_REL())},t.prototype.normalizeHVZ=function(t,e,r){return this.transform(d.NORMALIZE_HVZ(t,e,r))},t.prototype.normalizeST=function(){return this.transform(d.NORMALIZE_ST())},t.prototype.qtToC=function(){return this.transform(d.QT_TO_C())},t.prototype.aToC=function(){return this.transform(d.A_TO_C())},t.prototype.sanitize=function(t){return this.transform(d.SANITIZE(t))},t.prototype.translate=function(t,e){return this.transform(d.TRANSLATE(t,e))},t.prototype.scale=function(t,e){return this.transform(d.SCALE(t,e))},t.prototype.rotate=function(t,e,r){return this.transform(d.ROTATE(t,e,r))},t.prototype.matrix=function(t,e,r,i,n,a){return this.transform(d.MATRIX(t,e,r,i,n,a))},t.prototype.skewX=function(t){return this.transform(d.SKEW_X(t))},t.prototype.skewY=function(t){return this.transform(d.SKEW_Y(t))},t.prototype.xSymmetry=function(t){return this.transform(d.X_AXIS_SYMMETRY(t))},t.prototype.ySymmetry=function(t){return this.transform(d.Y_AXIS_SYMMETRY(t))},t.prototype.annotateArcs=function(){return this.transform(d.ANNOTATE_ARCS())},t}(),T=function(t){return" "===t||"\t"===t||"\r"===t||"\n"===t},A=function(t){return"0".charCodeAt(0)<=t.charCodeAt(0)&&t.charCodeAt(0)<="9".charCodeAt(0)},C=function(t){function e(){var e=t.call(this)||this;return e.curNumber="",e.curCommandType=-1,e.curCommandRelative=!1,e.canParseCommandOrComma=!0,e.curNumberHasExp=!1,e.curNumberHasExpDigits=!1,e.curNumberHasDecimal=!1,e.curArgs=[],e}return u(e,t),e.prototype.finish=function(t){if(void 0===t&&(t=[]),this.parse(" ",t),0!==this.curArgs.length||!this.canParseCommandOrComma)throw new SyntaxError("Unterminated command at the path end.");return t},e.prototype.parse=function(t,e){var r=this;void 0===e&&(e=[]);for(var i=function(t){e.push(t),r.curArgs.length=0,r.canParseCommandOrComma=!0},n=0;n<t.length;n++){var a=t[n],s=!(this.curCommandType!==O.ARC||3!==this.curArgs.length&&4!==this.curArgs.length||1!==this.curNumber.length||"0"!==this.curNumber&&"1"!==this.curNumber),o=A(a)&&("0"===this.curNumber&&"0"===a||s);if(!A(a)||o)if("e"!==a&&"E"!==a)if("-"!==a&&"+"!==a||!this.curNumberHasExp||this.curNumberHasExpDigits)if("."!==a||this.curNumberHasExp||this.curNumberHasDecimal||s){if(this.curNumber&&-1!==this.curCommandType){var h=Number(this.curNumber);if(isNaN(h))throw new SyntaxError("Invalid number ending at "+n);if(this.curCommandType===O.ARC)if(0===this.curArgs.length||1===this.curArgs.length){if(0>h)throw new SyntaxError('Expected positive number, got "'+h+'" at index "'+n+'"')}else if((3===this.curArgs.length||4===this.curArgs.length)&&"0"!==this.curNumber&&"1"!==this.curNumber)throw new SyntaxError('Expected a flag, got "'+this.curNumber+'" at index "'+n+'"');this.curArgs.push(h),this.curArgs.length===P[this.curCommandType]&&(O.HORIZ_LINE_TO===this.curCommandType?i({type:O.HORIZ_LINE_TO,relative:this.curCommandRelative,x:h}):O.VERT_LINE_TO===this.curCommandType?i({type:O.VERT_LINE_TO,relative:this.curCommandRelative,y:h}):this.curCommandType===O.MOVE_TO||this.curCommandType===O.LINE_TO||this.curCommandType===O.SMOOTH_QUAD_TO?(i({type:this.curCommandType,relative:this.curCommandRelative,x:this.curArgs[0],y:this.curArgs[1]}),O.MOVE_TO===this.curCommandType&&(this.curCommandType=O.LINE_TO)):this.curCommandType===O.CURVE_TO?i({type:O.CURVE_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x2:this.curArgs[2],y2:this.curArgs[3],x:this.curArgs[4],y:this.curArgs[5]}):this.curCommandType===O.SMOOTH_CURVE_TO?i({type:O.SMOOTH_CURVE_TO,relative:this.curCommandRelative,x2:this.curArgs[0],y2:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===O.QUAD_TO?i({type:O.QUAD_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===O.ARC&&i({type:O.ARC,relative:this.curCommandRelative,rX:this.curArgs[0],rY:this.curArgs[1],xRot:this.curArgs[2],lArcFlag:this.curArgs[3],sweepFlag:this.curArgs[4],x:this.curArgs[5],y:this.curArgs[6]})),this.curNumber="",this.curNumberHasExpDigits=!1,this.curNumberHasExp=!1,this.curNumberHasDecimal=!1,this.canParseCommandOrComma=!0}if(!T(a))if(","===a&&this.canParseCommandOrComma)this.canParseCommandOrComma=!1;else if("+"!==a&&"-"!==a&&"."!==a)if(o)this.curNumber=a,this.curNumberHasDecimal=!1;else{if(0!==this.curArgs.length)throw new SyntaxError("Unterminated command at index "+n+".");if(!this.canParseCommandOrComma)throw new SyntaxError('Unexpected character "'+a+'" at index '+n+". Command cannot follow comma");if(this.canParseCommandOrComma=!1,"z"!==a&&"Z"!==a)if("h"===a||"H"===a)this.curCommandType=O.HORIZ_LINE_TO,this.curCommandRelative="h"===a;else if("v"===a||"V"===a)this.curCommandType=O.VERT_LINE_TO,this.curCommandRelative="v"===a;else if("m"===a||"M"===a)this.curCommandType=O.MOVE_TO,this.curCommandRelative="m"===a;else if("l"===a||"L"===a)this.curCommandType=O.LINE_TO,this.curCommandRelative="l"===a;else if("c"===a||"C"===a)this.curCommandType=O.CURVE_TO,this.curCommandRelative="c"===a;else if("s"===a||"S"===a)this.curCommandType=O.SMOOTH_CURVE_TO,this.curCommandRelative="s"===a;else if("q"===a||"Q"===a)this.curCommandType=O.QUAD_TO,this.curCommandRelative="q"===a;else if("t"===a||"T"===a)this.curCommandType=O.SMOOTH_QUAD_TO,this.curCommandRelative="t"===a;else{if("a"!==a&&"A"!==a)throw new SyntaxError('Unexpected character "'+a+'" at index '+n+".");this.curCommandType=O.ARC,this.curCommandRelative="a"===a}else e.push({type:O.CLOSE_PATH}),this.canParseCommandOrComma=!0,this.curCommandType=-1}else this.curNumber=a,this.curNumberHasDecimal="."===a}else this.curNumber+=a,this.curNumberHasDecimal=!0;else this.curNumber+=a;else this.curNumber+=a,this.curNumberHasExp=!0;else this.curNumber+=a,this.curNumberHasExpDigits=this.curNumberHasExp}return e},e.prototype.transform=function(t){return Object.create(this,{parse:{value:function(e,r){void 0===r&&(r=[]);for(var i=0,n=Object.getPrototypeOf(this).parse.call(this,e);i<n.length;i++){var a=n[i],s=t(a);Array.isArray(s)?r.push.apply(r,s):r.push(s)}return r}}})},e}(w),O=function(t){function e(r){var i=t.call(this)||this;return i.commands="string"==typeof r?e.parse(r):r,i}return u(e,t),e.prototype.encode=function(){return e.encode(this.commands)},e.prototype.getBounds=function(){var t=d.CALCULATE_BOUNDS();return this.transform(t),t},e.prototype.transform=function(t){for(var e=[],r=0,i=this.commands;r<i.length;r++){var n=t(i[r]);Array.isArray(n)?e.push.apply(e,n):e.push(n)}return this.commands=e,this},e.encode=function(t){return function(t){var e="";Array.isArray(t)||(t=[t]);for(var r=0;r<t.length;r++){var i=t[r];if(i.type===O.CLOSE_PATH)e+="z";else if(i.type===O.HORIZ_LINE_TO)e+=(i.relative?"h":"H")+i.x;else if(i.type===O.VERT_LINE_TO)e+=(i.relative?"v":"V")+i.y;else if(i.type===O.MOVE_TO)e+=(i.relative?"m":"M")+i.x+" "+i.y;else if(i.type===O.LINE_TO)e+=(i.relative?"l":"L")+i.x+" "+i.y;else if(i.type===O.CURVE_TO)e+=(i.relative?"c":"C")+i.x1+" "+i.y1+" "+i.x2+" "+i.y2+" "+i.x+" "+i.y;else if(i.type===O.SMOOTH_CURVE_TO)e+=(i.relative?"s":"S")+i.x2+" "+i.y2+" "+i.x+" "+i.y;else if(i.type===O.QUAD_TO)e+=(i.relative?"q":"Q")+i.x1+" "+i.y1+" "+i.x+" "+i.y;else if(i.type===O.SMOOTH_QUAD_TO)e+=(i.relative?"t":"T")+i.x+" "+i.y;else{if(i.type!==O.ARC)throw new Error('Unexpected command type "'+i.type+'" at index '+r+".");e+=(i.relative?"a":"A")+i.rX+" "+i.rY+" "+i.xRot+" "+ +i.lArcFlag+" "+ +i.sweepFlag+" "+i.x+" "+i.y}}return e}(t)},e.parse=function(t){var e=new C,r=[];return e.parse(t,r),e.finish(r),r},e.CLOSE_PATH=1,e.MOVE_TO=2,e.HORIZ_LINE_TO=4,e.VERT_LINE_TO=8,e.LINE_TO=16,e.CURVE_TO=32,e.SMOOTH_CURVE_TO=64,e.QUAD_TO=128,e.SMOOTH_QUAD_TO=256,e.ARC=512,e.LINE_COMMANDS=e.LINE_TO|e.HORIZ_LINE_TO|e.VERT_LINE_TO,e.DRAWING_COMMANDS=e.HORIZ_LINE_TO|e.VERT_LINE_TO|e.LINE_TO|e.CURVE_TO|e.SMOOTH_CURVE_TO|e.QUAD_TO|e.SMOOTH_QUAD_TO|e.ARC,e}(w),P=((S={})[O.MOVE_TO]=2,S[O.LINE_TO]=2,S[O.HORIZ_LINE_TO]=1,S[O.VERT_LINE_TO]=1,S[O.CLOSE_PATH]=0,S[O.QUAD_TO]=4,S[O.SMOOTH_QUAD_TO]=2,S[O.CURVE_TO]=6,S[O.SMOOTH_CURVE_TO]=4,S[O.ARC]=7,S);function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}r(9714);var M=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],N=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function V(t,e,r,i,n,a){if(!(isNaN(a)||a<1)){a|=0;var s=function(t,e,r,i,n){if("string"==typeof t&&(t=document.getElementById(t)),!t||"object"!==E(t)||!("getContext"in t))throw new TypeError("Expecting canvas with `getContext` method in processCanvasRGB(A) calls!");var a=t.getContext("2d");try{return a.getImageData(e,r,i,n)}catch(t){throw new Error("unable to access image data: "+t)}}(t,e,r,i,n);s=function(t,e,r,i,n,a){for(var s,o=t.data,h=2*a+1,u=i-1,l=n-1,c=a+1,g=c*(c+1)/2,f=new _,p=f,d=1;d<h;d++)p=p.next=new _,d===c&&(s=p);p.next=f;for(var v=null,y=null,m=0,x=0,b=M[a],S=N[a],w=0;w<n;w++){p=f;for(var T=o[x],A=o[x+1],C=o[x+2],O=o[x+3],P=0;P<c;P++)p.r=T,p.g=A,p.b=C,p.a=O,p=p.next;for(var E=0,V=0,R=0,k=0,I=c*T,L=c*A,D=c*C,B=c*O,z=g*T,U=g*A,F=g*C,H=g*O,X=1;X<c;X++){var j=x+((u<X?u:X)<<2),Y=o[j],q=o[j+1],W=o[j+2],G=o[j+3],Q=c-X;z+=(p.r=Y)*Q,U+=(p.g=q)*Q,F+=(p.b=W)*Q,H+=(p.a=G)*Q,E+=Y,V+=q,R+=W,k+=G,p=p.next}v=f,y=s;for(var $=0;$<i;$++){var Z=H*b>>S;if(o[x+3]=Z,0!==Z){var K=255/Z;o[x]=(z*b>>S)*K,o[x+1]=(U*b>>S)*K,o[x+2]=(F*b>>S)*K}else o[x]=o[x+1]=o[x+2]=0;z-=I,U-=L,F-=D,H-=B,I-=v.r,L-=v.g,D-=v.b,B-=v.a;var J=$+a+1;J=m+(J<u?J:u)<<2,z+=E+=v.r=o[J],U+=V+=v.g=o[J+1],F+=R+=v.b=o[J+2],H+=k+=v.a=o[J+3],v=v.next;var tt=y,et=tt.r,rt=tt.g,it=tt.b,nt=tt.a;I+=et,L+=rt,D+=it,B+=nt,E-=et,V-=rt,R-=it,k-=nt,y=y.next,x+=4}m+=i}for(var at=0;at<i;at++){var st=o[x=at<<2],ot=o[x+1],ht=o[x+2],ut=o[x+3],lt=c*st,ct=c*ot,gt=c*ht,ft=c*ut,pt=g*st,dt=g*ot,vt=g*ht,yt=g*ut;p=f;for(var mt=0;mt<c;mt++)p.r=st,p.g=ot,p.b=ht,p.a=ut,p=p.next;for(var xt=i,bt=0,St=0,wt=0,Tt=0,At=1;At<=a;At++){x=xt+at<<2;var Ct=c-At;pt+=(p.r=st=o[x])*Ct,dt+=(p.g=ot=o[x+1])*Ct,vt+=(p.b=ht=o[x+2])*Ct,yt+=(p.a=ut=o[x+3])*Ct,Tt+=st,bt+=ot,St+=ht,wt+=ut,p=p.next,At<l&&(xt+=i)}x=at,v=f,y=s;for(var Ot=0;Ot<n;Ot++){var Pt=x<<2;o[Pt+3]=ut=yt*b>>S,ut>0?(ut=255/ut,o[Pt]=(pt*b>>S)*ut,o[Pt+1]=(dt*b>>S)*ut,o[Pt+2]=(vt*b>>S)*ut):o[Pt]=o[Pt+1]=o[Pt+2]=0,pt-=lt,dt-=ct,vt-=gt,yt-=ft,lt-=v.r,ct-=v.g,gt-=v.b,ft-=v.a,Pt=at+((Pt=Ot+c)<l?Pt:l)*i<<2,pt+=Tt+=v.r=o[Pt],dt+=bt+=v.g=o[Pt+1],vt+=St+=v.b=o[Pt+2],yt+=wt+=v.a=o[Pt+3],v=v.next,lt+=st=y.r,ct+=ot=y.g,gt+=ht=y.b,ft+=ut=y.a,Tt-=st,bt-=ot,St-=ht,wt-=ut,y=y.next,x+=i}}return t}(s,0,0,i,n,a),t.getContext("2d").putImageData(s,e,r)}}var _=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.r=0,this.g=0,this.b=0,this.a=0,this.next=null},R=Object.freeze({__proto__:null,offscreen:function(){var{DOMParser:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e={window:null,ignoreAnimation:!0,ignoreMouse:!0,DOMParser:t,createCanvas:(t,e)=>new OffscreenCanvas(t,e),createImage:t=>n((function*(){var e=yield fetch(t),r=yield e.blob();return yield createImageBitmap(r)}))()};return"undefined"==typeof DOMParser&&void 0!==t||Reflect.deleteProperty(e,"DOMParser"),e},node:function(t){var{DOMParser:e,canvas:r,fetch:i}=t;return{window:null,ignoreAnimation:!0,ignoreMouse:!0,DOMParser:e,fetch:i,createCanvas:r.createCanvas,createImage:r.loadImage}}});function k(t){return t.replace(/(?!\u3000)\s+/gm," ")}function I(t){return t.replace(/^[\n \t]+/,"")}function L(t){return t.replace(/[\n \t]+$/,"")}function D(t){return((t||"").match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm)||[]).map(parseFloat)}var B=/^[A-Z-]+$/;function z(t){return B.test(t)?t.toLowerCase():t}function U(t){var e=/url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(t)||[];return e[2]||e[3]||e[4]}function F(t){if(!t.startsWith("rgb"))return t;var e=3;return t.replace(/\d+(\.\d+)?/g,((t,r)=>e--&&r?String(Math.round(parseFloat(t))):t))}var H=/(\[[^\]]+\])/g,X=/(#[^\s+>~.[:]+)/g,j=/(\.[^\s+>~.[:]+)/g,Y=/(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi,q=/(:[\w-]+\([^)]*\))/gi,W=/(:[^\s+>~.[:]+)/g,G=/([^\s+>~.[:]+)/g;function Q(t,e){var r=e.exec(t);return r?[t.replace(e," "),r.length]:[t,0]}function $(t){var e=[0,0,0],r=t.replace(/:not\(([^)]*)\)/g,"     $1 ").replace(/{[\s\S]*/gm," "),i=0;return[r,i]=Q(r,H),e[1]+=i,[r,i]=Q(r,X),e[0]+=i,[r,i]=Q(r,j),e[1]+=i,[r,i]=Q(r,Y),e[2]+=i,[r,i]=Q(r,q),e[1]+=i,[r,i]=Q(r,W),e[1]+=i,r=r.replace(/[*\s+>~]/g," ").replace(/[#.]/g," "),[r,i]=Q(r,G),e[2]+=i,e.join("")}var Z=1e-8;function K(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2))}function J(t,e){return(t[0]*e[0]+t[1]*e[1])/(K(t)*K(e))}function tt(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(J(t,e))}function et(t){return t*t*t}function rt(t){return 3*t*t*(1-t)}function it(t){return 3*t*(1-t)*(1-t)}function nt(t){return(1-t)*(1-t)*(1-t)}function at(t){return t*t}function st(t){return 2*t*(1-t)}function ot(t){return(1-t)*(1-t)}class ht{constructor(t,e,r){this.document=t,this.name=e,this.value=r,this.isNormalizedColor=!1}static empty(t){return new ht(t,"EMPTY","")}split(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:" ",{document:e,name:r}=this;return k(this.getString()).trim().split(t).map((t=>new ht(e,r,t)))}hasValue(t){var{value:e}=this;return null!==e&&""!==e&&(t||0!==e)&&void 0!==e}isString(t){var{value:e}=this,r="string"==typeof e;return r&&t?t.test(e):r}isUrlDefinition(){return this.isString(/^url\(/)}isPixels(){if(!this.hasValue())return!1;var t=this.getString();switch(!0){case t.endsWith("px"):case/^[0-9]+$/.test(t):return!0;default:return!1}}setValue(t){return this.value=t,this}getValue(t){return void 0===t||this.hasValue()?this.value:t}getNumber(t){if(!this.hasValue())return void 0===t?0:parseFloat(t);var{value:e}=this,r=parseFloat(e);return this.isString(/%$/)&&(r/=100),r}getString(t){return void 0===t||this.hasValue()?void 0===this.value?"":String(this.value):String(t)}getColor(t){var e=this.getString(t);return this.isNormalizedColor||(this.isNormalizedColor=!0,e=F(e),this.value=e),e}getDpi(){return 96}getRem(){return this.document.rootEmSize}getEm(){return this.document.emSize}getUnits(){return this.getString().replace(/[0-9.-]/g,"")}getPixels(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!this.hasValue())return 0;var[r,i]="boolean"==typeof t?[void 0,t]:[t],{viewPort:n}=this.document.screen;switch(!0){case this.isString(/vmin$/):return this.getNumber()/100*Math.min(n.computeSize("x"),n.computeSize("y"));case this.isString(/vmax$/):return this.getNumber()/100*Math.max(n.computeSize("x"),n.computeSize("y"));case this.isString(/vw$/):return this.getNumber()/100*n.computeSize("x");case this.isString(/vh$/):return this.getNumber()/100*n.computeSize("y");case this.isString(/rem$/):return this.getNumber()*this.getRem();case this.isString(/em$/):return this.getNumber()*this.getEm();case this.isString(/ex$/):return this.getNumber()*this.getEm()/2;case this.isString(/px$/):return this.getNumber();case this.isString(/pt$/):return this.getNumber()*this.getDpi()*(1/72);case this.isString(/pc$/):return 15*this.getNumber();case this.isString(/cm$/):return this.getNumber()*this.getDpi()/2.54;case this.isString(/mm$/):return this.getNumber()*this.getDpi()/25.4;case this.isString(/in$/):return this.getNumber()*this.getDpi();case this.isString(/%$/)&&i:return this.getNumber()*this.getEm();case this.isString(/%$/):return this.getNumber()*n.computeSize(r);default:var a=this.getNumber();return e&&a<1?a*n.computeSize(r):a}}getMilliseconds(){return this.hasValue()?this.isString(/ms$/)?this.getNumber():1e3*this.getNumber():0}getRadians(){if(!this.hasValue())return 0;switch(!0){case this.isString(/deg$/):return this.getNumber()*(Math.PI/180);case this.isString(/grad$/):return this.getNumber()*(Math.PI/200);case this.isString(/rad$/):return this.getNumber();default:return this.getNumber()*(Math.PI/180)}}getDefinition(){var t=this.getString(),e=/#([^)'"]+)/.exec(t);return e&&(e=e[1]),e||(e=t),this.document.definitions[e]}getFillStyleDefinition(t,e){var r=this.getDefinition();if(!r)return null;if("function"==typeof r.createGradient)return r.createGradient(this.document.ctx,t,e);if("function"==typeof r.createPattern){if(r.getHrefAttribute().hasValue()){var i=r.getAttribute("patternTransform");r=r.getHrefAttribute().getDefinition(),i.hasValue()&&r.getAttribute("patternTransform",!0).setValue(i.value)}return r.createPattern(this.document.ctx,t,e)}return null}getTextBaseline(){return this.hasValue()?ht.textBaselineMapping[this.getString()]:null}addOpacity(t){for(var e=this.getColor(),r=e.length,i=0,n=0;n<r&&(","===e[n]&&i++,3!==i);n++);if(t.hasValue()&&this.isString()&&3!==i){var a=new o(e);a.ok&&(a.alpha=t.getNumber(),e=a.toRGBA())}return new ht(this.document,this.name,e)}}ht.textBaselineMapping={baseline:"alphabetic","before-edge":"top","text-before-edge":"top",middle:"middle",central:"middle","after-edge":"bottom","text-after-edge":"bottom",ideographic:"ideographic",alphabetic:"alphabetic",hanging:"hanging",mathematical:"alphabetic"};class ut{constructor(){this.viewPorts=[]}clear(){this.viewPorts=[]}setCurrent(t,e){this.viewPorts.push({width:t,height:e})}removeCurrent(){this.viewPorts.pop()}getCurrent(){var{viewPorts:t}=this;return t[t.length-1]}get width(){return this.getCurrent().width}get height(){return this.getCurrent().height}computeSize(t){return"number"==typeof t?t:"x"===t?this.width:"y"===t?this.height:Math.sqrt(Math.pow(this.width,2)+Math.pow(this.height,2))/Math.sqrt(2)}}class lt{constructor(t,e){this.x=t,this.y=e}static parse(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,[r=e,i=e]=D(t);return new lt(r,i)}static parseScale(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,[r=e,i=r]=D(t);return new lt(r,i)}static parsePath(t){for(var e=D(t),r=e.length,i=[],n=0;n<r;n+=2)i.push(new lt(e[n],e[n+1]));return i}angleTo(t){return Math.atan2(t.y-this.y,t.x-this.x)}applyTransform(t){var{x:e,y:r}=this,i=e*t[0]+r*t[2]+t[4],n=e*t[1]+r*t[3]+t[5];this.x=i,this.y=n}}class ct{constructor(t){this.screen=t,this.working=!1,this.events=[],this.eventElements=[],this.onClick=this.onClick.bind(this),this.onMouseMove=this.onMouseMove.bind(this)}isWorking(){return this.working}start(){if(!this.working){var{screen:t,onClick:e,onMouseMove:r}=this,i=t.ctx.canvas;i.onclick=e,i.onmousemove=r,this.working=!0}}stop(){if(this.working){var t=this.screen.ctx.canvas;this.working=!1,t.onclick=null,t.onmousemove=null}}hasEvents(){return this.working&&this.events.length>0}runEvents(){if(this.working){var{screen:t,events:e,eventElements:r}=this,{style:i}=t.ctx.canvas;i&&(i.cursor=""),e.forEach(((t,e)=>{for(var{run:i}=t,n=r[e];n;)i(n),n=n.parent})),this.events=[],this.eventElements=[]}}checkPath(t,e){if(this.working&&e){var{events:r,eventElements:i}=this;r.forEach(((r,n)=>{var{x:a,y:s}=r;!i[n]&&e.isPointInPath&&e.isPointInPath(a,s)&&(i[n]=t)}))}}checkBoundingBox(t,e){if(this.working&&e){var{events:r,eventElements:i}=this;r.forEach(((r,n)=>{var{x:a,y:s}=r;!i[n]&&e.isPointInBox(a,s)&&(i[n]=t)}))}}mapXY(t,e){for(var{window:r,ctx:i}=this.screen,n=new lt(t,e),a=i.canvas;a;)n.x-=a.offsetLeft,n.y-=a.offsetTop,a=a.offsetParent;return r.scrollX&&(n.x+=r.scrollX),r.scrollY&&(n.y+=r.scrollY),n}onClick(t){var{x:e,y:r}=this.mapXY(t.clientX,t.clientY);this.events.push({type:"onclick",x:e,y:r,run(t){t.onClick&&t.onClick()}})}onMouseMove(t){var{x:e,y:r}=this.mapXY(t.clientX,t.clientY);this.events.push({type:"onmousemove",x:e,y:r,run(t){t.onMouseMove&&t.onMouseMove()}})}}var gt="undefined"!=typeof window?window:null,ft="undefined"!=typeof fetch?fetch.bind(void 0):null;class pt{constructor(t){var{fetch:e=ft,window:r=gt}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.ctx=t,this.FRAMERATE=30,this.MAX_VIRTUAL_PIXELS=3e4,this.CLIENT_WIDTH=800,this.CLIENT_HEIGHT=600,this.viewPort=new ut,this.mouse=new ct(this),this.animations=[],this.waits=[],this.frameDuration=0,this.isReadyLock=!1,this.isFirstRender=!0,this.intervalId=null,this.window=r,this.fetch=e}wait(t){this.waits.push(t)}ready(){return this.readyPromise?this.readyPromise:Promise.resolve()}isReady(){if(this.isReadyLock)return!0;var t=this.waits.every((t=>t()));return t&&(this.waits=[],this.resolveReady&&this.resolveReady()),this.isReadyLock=t,t}setDefaults(t){t.strokeStyle="rgba(0,0,0,0)",t.lineCap="butt",t.lineJoin="miter",t.miterLimit=4}setViewBox(t){var{document:e,ctx:r,aspectRatio:i,width:n,desiredWidth:a,height:s,desiredHeight:o,minX:h=0,minY:u=0,refX:l,refY:c,clip:g=!1,clipX:f=0,clipY:p=0}=t,d=k(i).replace(/^defer\s/,""),[v,y]=d.split(" "),m=v||"xMidYMid",x=y||"meet",b=n/a,S=s/o,w=Math.min(b,S),T=Math.max(b,S),A=a,C=o;"meet"===x&&(A*=w,C*=w),"slice"===x&&(A*=T,C*=T);var O=new ht(e,"refX",l),P=new ht(e,"refY",c),E=O.hasValue()&&P.hasValue();if(E&&r.translate(-w*O.getPixels("x"),-w*P.getPixels("y")),g){var M=w*f,N=w*p;r.beginPath(),r.moveTo(M,N),r.lineTo(n,N),r.lineTo(n,s),r.lineTo(M,s),r.closePath(),r.clip()}if(!E){var V="meet"===x&&w===S,_="slice"===x&&T===S,R="meet"===x&&w===b,I="slice"===x&&T===b;m.startsWith("xMid")&&(V||_)&&r.translate(n/2-A/2,0),m.endsWith("YMid")&&(R||I)&&r.translate(0,s/2-C/2),m.startsWith("xMax")&&(V||_)&&r.translate(n-A,0),m.endsWith("YMax")&&(R||I)&&r.translate(0,s-C)}switch(!0){case"none"===m:r.scale(b,S);break;case"meet"===x:r.scale(w,w);break;case"slice"===x:r.scale(T,T)}r.translate(-h,-u)}start(t){var{enableRedraw:e=!1,ignoreMouse:r=!1,ignoreAnimation:i=!1,ignoreDimensions:n=!1,ignoreClear:a=!1,forceRedraw:o,scaleWidth:h,scaleHeight:u,offsetX:l,offsetY:c}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{FRAMERATE:g,mouse:f}=this,p=1e3/g;if(this.frameDuration=p,this.readyPromise=new Promise((t=>{this.resolveReady=t})),this.isReady()&&this.render(t,n,a,h,u,l,c),e){var d=Date.now(),v=d,y=0,m=()=>{d=Date.now(),(y=d-v)>=p&&(v=d-y%p,this.shouldUpdate(i,o)&&(this.render(t,n,a,h,u,l,c),f.runEvents())),this.intervalId=s(m)};r||f.start(),this.intervalId=s(m)}}stop(){this.intervalId&&(s.cancel(this.intervalId),this.intervalId=null),this.mouse.stop()}shouldUpdate(t,e){if(!t){var{frameDuration:r}=this;if(this.animations.reduce(((t,e)=>e.update(r)||t),!1))return!0}return!("function"!=typeof e||!e())||!(this.isReadyLock||!this.isReady())||!!this.mouse.hasEvents()}render(t,e,r,i,n,a,s){var{CLIENT_WIDTH:o,CLIENT_HEIGHT:h,viewPort:u,ctx:l,isFirstRender:c}=this,g=l.canvas;u.clear(),g.width&&g.height?u.setCurrent(g.width,g.height):u.setCurrent(o,h);var f=t.getStyle("width"),p=t.getStyle("height");!e&&(c||"number"!=typeof i&&"number"!=typeof n)&&(f.hasValue()&&(g.width=f.getPixels("x"),g.style&&(g.style.width="".concat(g.width,"px"))),p.hasValue()&&(g.height=p.getPixels("y"),g.style&&(g.style.height="".concat(g.height,"px"))));var d=g.clientWidth||g.width,v=g.clientHeight||g.height;if(e&&f.hasValue()&&p.hasValue()&&(d=f.getPixels("x"),v=p.getPixels("y")),u.setCurrent(d,v),"number"==typeof a&&t.getAttribute("x",!0).setValue(a),"number"==typeof s&&t.getAttribute("y",!0).setValue(s),"number"==typeof i||"number"==typeof n){var y=D(t.getAttribute("viewBox").getString()),m=0,x=0;if("number"==typeof i){var b=t.getStyle("width");b.hasValue()?m=b.getPixels("x")/i:isNaN(y[2])||(m=y[2]/i)}if("number"==typeof n){var S=t.getStyle("height");S.hasValue()?x=S.getPixels("y")/n:isNaN(y[3])||(x=y[3]/n)}m||(m=x),x||(x=m),t.getAttribute("width",!0).setValue(i),t.getAttribute("height",!0).setValue(n);var w=t.getStyle("transform",!0,!0);w.setValue("".concat(w.getString()," scale(").concat(1/m,", ").concat(1/x,")"))}r||l.clearRect(0,0,d,v),t.render(l),c&&(this.isFirstRender=!1)}}pt.defaultWindow=gt,pt.defaultFetch=ft;var{defaultFetch:dt}=pt,vt="undefined"!=typeof DOMParser?DOMParser:null;class yt{constructor(){var{fetch:t=dt,DOMParser:e=vt}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.fetch=t,this.DOMParser=e}parse(t){var e=this;return n((function*(){return t.startsWith("<")?e.parseFromString(t):e.load(t)}))()}parseFromString(t){var e=new this.DOMParser;try{return this.checkDocument(e.parseFromString(t,"image/svg+xml"))}catch(r){return this.checkDocument(e.parseFromString(t,"text/xml"))}}checkDocument(t){var e=t.getElementsByTagName("parsererror")[0];if(e)throw new Error(e.textContent);return t}load(t){var e=this;return n((function*(){var r=yield e.fetch(t),i=yield r.text();return e.parseFromString(i)}))()}}class mt{constructor(t,e){this.type="translate",this.point=null,this.point=lt.parse(e)}apply(t){var{x:e,y:r}=this.point;t.translate(e||0,r||0)}unapply(t){var{x:e,y:r}=this.point;t.translate(-1*e||0,-1*r||0)}applyToPoint(t){var{x:e,y:r}=this.point;t.applyTransform([1,0,0,1,e||0,r||0])}}class xt{constructor(t,e,r){this.type="rotate",this.angle=null,this.originX=null,this.originY=null,this.cx=0,this.cy=0;var i=D(e);this.angle=new ht(t,"angle",i[0]),this.originX=r[0],this.originY=r[1],this.cx=i[1]||0,this.cy=i[2]||0}apply(t){var{cx:e,cy:r,originX:i,originY:n,angle:a}=this,s=e+i.getPixels("x"),o=r+n.getPixels("y");t.translate(s,o),t.rotate(a.getRadians()),t.translate(-s,-o)}unapply(t){var{cx:e,cy:r,originX:i,originY:n,angle:a}=this,s=e+i.getPixels("x"),o=r+n.getPixels("y");t.translate(s,o),t.rotate(-1*a.getRadians()),t.translate(-s,-o)}applyToPoint(t){var{cx:e,cy:r,angle:i}=this,n=i.getRadians();t.applyTransform([1,0,0,1,e||0,r||0]),t.applyTransform([Math.cos(n),Math.sin(n),-Math.sin(n),Math.cos(n),0,0]),t.applyTransform([1,0,0,1,-e||0,-r||0])}}class bt{constructor(t,e,r){this.type="scale",this.scale=null,this.originX=null,this.originY=null;var i=lt.parseScale(e);0!==i.x&&0!==i.y||(i.x=Z,i.y=Z),this.scale=i,this.originX=r[0],this.originY=r[1]}apply(t){var{scale:{x:e,y:r},originX:i,originY:n}=this,a=i.getPixels("x"),s=n.getPixels("y");t.translate(a,s),t.scale(e,r||e),t.translate(-a,-s)}unapply(t){var{scale:{x:e,y:r},originX:i,originY:n}=this,a=i.getPixels("x"),s=n.getPixels("y");t.translate(a,s),t.scale(1/e,1/r||e),t.translate(-a,-s)}applyToPoint(t){var{x:e,y:r}=this.scale;t.applyTransform([e||0,0,0,r||0,0,0])}}class St{constructor(t,e,r){this.type="matrix",this.matrix=[],this.originX=null,this.originY=null,this.matrix=D(e),this.originX=r[0],this.originY=r[1]}apply(t){var{originX:e,originY:r,matrix:i}=this,n=e.getPixels("x"),a=r.getPixels("y");t.translate(n,a),t.transform(i[0],i[1],i[2],i[3],i[4],i[5]),t.translate(-n,-a)}unapply(t){var{originX:e,originY:r,matrix:i}=this,n=i[0],a=i[2],s=i[4],o=i[1],h=i[3],u=i[5],l=1/(n*(1*h-0*u)-a*(1*o-0*u)+s*(0*o-0*h)),c=e.getPixels("x"),g=r.getPixels("y");t.translate(c,g),t.transform(l*(1*h-0*u),l*(0*u-1*o),l*(0*s-1*a),l*(1*n-0*s),l*(a*u-s*h),l*(s*o-n*u)),t.translate(-c,-g)}applyToPoint(t){t.applyTransform(this.matrix)}}class wt extends St{constructor(t,e,r){super(t,e,r),this.type="skew",this.angle=null,this.angle=new ht(t,"angle",e)}}class Tt extends wt{constructor(t,e,r){super(t,e,r),this.type="skewX",this.matrix=[1,0,Math.tan(this.angle.getRadians()),1,0,0]}}class At extends wt{constructor(t,e,r){super(t,e,r),this.type="skewY",this.matrix=[1,Math.tan(this.angle.getRadians()),0,1,0,0]}}class Ct{constructor(t,e,r){this.document=t,this.transforms=[];var i=function(t){return k(t).trim().replace(/\)([a-zA-Z])/g,") $1").replace(/\)(\s?,\s?)/g,") ").split(/\s(?=[a-z])/)}(e);i.forEach((t=>{if("none"!==t){var[e,i]=function(t){var[e,r]=t.split("(");return[e.trim(),r.trim().replace(")","")]}(t),n=Ct.transformTypes[e];void 0!==n&&this.transforms.push(new n(this.document,i,r))}}))}static fromElement(t,e){var r=e.getStyle("transform",!1,!0),[i,n=i]=e.getStyle("transform-origin",!1,!0).split(),a=[i,n];return r.hasValue()?new Ct(t,r.getString(),a):null}apply(t){for(var{transforms:e}=this,r=e.length,i=0;i<r;i++)e[i].apply(t)}unapply(t){for(var{transforms:e}=this,r=e.length-1;r>=0;r--)e[r].unapply(t)}applyToPoint(t){for(var{transforms:e}=this,r=e.length,i=0;i<r;i++)e[i].applyToPoint(t)}}Ct.transformTypes={translate:mt,rotate:xt,scale:bt,matrix:St,skewX:Tt,skewY:At};class Ot{constructor(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(this.document=t,this.node=e,this.captureTextNodes=r,this.attributes={},this.styles={},this.stylesSpecificity={},this.animationFrozen=!1,this.animationFrozenValue="",this.parent=null,this.children=[],e&&1===e.nodeType){if(Array.from(e.attributes).forEach((e=>{var r=z(e.nodeName);this.attributes[r]=new ht(t,r,e.value)})),this.addStylesFromStyleDefinition(),this.getAttribute("style").hasValue()){var i=this.getAttribute("style").getString().split(";").map((t=>t.trim()));i.forEach((e=>{if(e){var[r,i]=e.split(":").map((t=>t.trim()));this.styles[r]=new ht(t,r,i)}}))}var{definitions:n}=t,a=this.getAttribute("id");a.hasValue()&&(n[a.getString()]||(n[a.getString()]=this)),Array.from(e.childNodes).forEach((e=>{if(1===e.nodeType)this.addChild(e);else if(r&&(3===e.nodeType||4===e.nodeType)){var i=t.createTextNode(e);i.getText().length>0&&this.addChild(i)}}))}}getAttribute(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.attributes[t];if(!r&&e){var i=new ht(this.document,t,"");return this.attributes[t]=i,i}return r||ht.empty(this.document)}getHrefAttribute(){for(var t in this.attributes)if("href"===t||t.endsWith(":href"))return this.attributes[t];return ht.empty(this.document)}getStyle(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this.styles[t];if(i)return i;var n=this.getAttribute(t);if(null!=n&&n.hasValue())return this.styles[t]=n,n;if(!r){var{parent:a}=this;if(a){var s=a.getStyle(t);if(null!=s&&s.hasValue())return s}}if(e){var o=new ht(this.document,t,"");return this.styles[t]=o,o}return i||ht.empty(this.document)}render(t){if("none"!==this.getStyle("display").getString()&&"hidden"!==this.getStyle("visibility").getString()){if(t.save(),this.getStyle("mask").hasValue()){var e=this.getStyle("mask").getDefinition();e&&(this.applyEffects(t),e.apply(t,this))}else if("none"!==this.getStyle("filter").getValue("none")){var r=this.getStyle("filter").getDefinition();r&&(this.applyEffects(t),r.apply(t,this))}else this.setContext(t),this.renderChildren(t),this.clearContext(t);t.restore()}}setContext(t){}applyEffects(t){var e=Ct.fromElement(this.document,this);e&&e.apply(t);var r=this.getStyle("clip-path",!1,!0);if(r.hasValue()){var i=r.getDefinition();i&&i.apply(t)}}clearContext(t){}renderChildren(t){this.children.forEach((e=>{e.render(t)}))}addChild(t){var e=t instanceof Ot?t:this.document.createElement(t);e.parent=this,Ot.ignoreChildTypes.includes(e.type)||this.children.push(e)}matchesSelector(t){var e,{node:r}=this;if("function"==typeof r.matches)return r.matches(t);var i=null===(e=r.getAttribute)||void 0===e?void 0:e.call(r,"class");return!(!i||""===i)&&i.split(" ").some((e=>".".concat(e)===t))}addStylesFromStyleDefinition(){var{styles:t,stylesSpecificity:e}=this.document;for(var r in t)if(!r.startsWith("@")&&this.matchesSelector(r)){var i=t[r],n=e[r];if(i)for(var a in i){var s=this.stylesSpecificity[a];void 0===s&&(s="000"),n>=s&&(this.styles[a]=i[a],this.stylesSpecificity[a]=n)}}}removeStyles(t,e){return e.reduce(((e,r)=>{var i=t.getStyle(r);if(!i.hasValue())return e;var n=i.getString();return i.setValue(""),[...e,[r,n]]}),[])}restoreStyles(t,e){e.forEach((e=>{var[r,i]=e;t.getStyle(r,!0).setValue(i)}))}isFirstChild(){var t;return 0===(null===(t=this.parent)||void 0===t?void 0:t.children.indexOf(this))}}Ot.ignoreChildTypes=["title"];class Pt extends Ot{constructor(t,e,r){super(t,e,r)}}function Et(t){var e=t.trim();return/^('|")/.test(e)?e:'"'.concat(e,'"')}function Mt(t){if(!t)return"";var e=t.trim().toLowerCase();switch(e){case"normal":case"italic":case"oblique":case"inherit":case"initial":case"unset":return e;default:return/^oblique\s+(-|)\d+deg$/.test(e)?e:""}}function Nt(t){if(!t)return"";var e=t.trim().toLowerCase();switch(e){case"normal":case"bold":case"lighter":case"bolder":case"inherit":case"initial":case"unset":return e;default:return/^[\d.]+$/.test(e)?e:""}}class Vt{constructor(t,e,r,i,n,a){var s=a?"string"==typeof a?Vt.parse(a):a:{};this.fontFamily=n||s.fontFamily,this.fontSize=i||s.fontSize,this.fontStyle=t||s.fontStyle,this.fontWeight=r||s.fontWeight,this.fontVariant=e||s.fontVariant}static parse(){var t=arguments.length>1?arguments[1]:void 0,e="",r="",i="",n="",a="",s=k(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").trim().split(" "),o={fontSize:!1,fontStyle:!1,fontWeight:!1,fontVariant:!1};return s.forEach((t=>{switch(!0){case!o.fontStyle&&Vt.styles.includes(t):"inherit"!==t&&(e=t),o.fontStyle=!0;break;case!o.fontVariant&&Vt.variants.includes(t):"inherit"!==t&&(r=t),o.fontStyle=!0,o.fontVariant=!0;break;case!o.fontWeight&&Vt.weights.includes(t):"inherit"!==t&&(i=t),o.fontStyle=!0,o.fontVariant=!0,o.fontWeight=!0;break;case!o.fontSize:"inherit"!==t&&([n]=t.split("/")),o.fontStyle=!0,o.fontVariant=!0,o.fontWeight=!0,o.fontSize=!0;break;default:"inherit"!==t&&(a+=t)}})),new Vt(e,r,i,n,a,t)}toString(){return[Mt(this.fontStyle),this.fontVariant,Nt(this.fontWeight),this.fontSize,(t=this.fontFamily,"undefined"==typeof process?t:t.trim().split(",").map(Et).join(","))].join(" ").trim();var t}}Vt.styles="normal|italic|oblique|inherit",Vt.variants="normal|small-caps|inherit",Vt.weights="normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit";class _t{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Number.NaN,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.NaN,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Number.NaN,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Number.NaN;this.x1=t,this.y1=e,this.x2=r,this.y2=i,this.addPoint(t,e),this.addPoint(r,i)}get x(){return this.x1}get y(){return this.y1}get width(){return this.x2-this.x1}get height(){return this.y2-this.y1}addPoint(t,e){void 0!==t&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=t,this.x2=t),t<this.x1&&(this.x1=t),t>this.x2&&(this.x2=t)),void 0!==e&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=e,this.y2=e),e<this.y1&&(this.y1=e),e>this.y2&&(this.y2=e))}addX(t){this.addPoint(t,null)}addY(t){this.addPoint(null,t)}addBoundingBox(t){if(t){var{x1:e,y1:r,x2:i,y2:n}=t;this.addPoint(e,r),this.addPoint(i,n)}}sumCubic(t,e,r,i,n){return Math.pow(1-t,3)*e+3*Math.pow(1-t,2)*t*r+3*(1-t)*Math.pow(t,2)*i+Math.pow(t,3)*n}bezierCurveAdd(t,e,r,i,n){var a=6*e-12*r+6*i,s=-3*e+9*r-9*i+3*n,o=3*r-3*e;if(0!==s){var h=Math.pow(a,2)-4*o*s;if(!(h<0)){var u=(-a+Math.sqrt(h))/(2*s);0<u&&u<1&&(t?this.addX(this.sumCubic(u,e,r,i,n)):this.addY(this.sumCubic(u,e,r,i,n)));var l=(-a-Math.sqrt(h))/(2*s);0<l&&l<1&&(t?this.addX(this.sumCubic(l,e,r,i,n)):this.addY(this.sumCubic(l,e,r,i,n)))}}else{if(0===a)return;var c=-o/a;0<c&&c<1&&(t?this.addX(this.sumCubic(c,e,r,i,n)):this.addY(this.sumCubic(c,e,r,i,n)))}}addBezierCurve(t,e,r,i,n,a,s,o){this.addPoint(t,e),this.addPoint(s,o),this.bezierCurveAdd(!0,t,r,n,s),this.bezierCurveAdd(!1,e,i,a,o)}addQuadraticCurve(t,e,r,i,n,a){var s=t+2/3*(r-t),o=e+2/3*(i-e),h=s+1/3*(n-t),u=o+1/3*(a-e);this.addBezierCurve(t,e,s,h,o,u,n,a)}isPointInBox(t,e){var{x1:r,y1:i,x2:n,y2:a}=this;return r<=t&&t<=n&&i<=e&&e<=a}}class Rt extends O{constructor(t){super(t.replace(/([+\-.])\s+/gm,"$1").replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g,"")),this.control=null,this.start=null,this.current=null,this.command=null,this.commands=this.commands,this.i=-1,this.previousCommand=null,this.points=[],this.angles=[]}reset(){this.i=-1,this.command=null,this.previousCommand=null,this.start=new lt(0,0),this.control=new lt(0,0),this.current=new lt(0,0),this.points=[],this.angles=[]}isEnd(){var{i:t,commands:e}=this;return t>=e.length-1}next(){var t=this.commands[++this.i];return this.previousCommand=this.command,this.command=t,t}getPoint(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"x",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"y",r=new lt(this.command[t],this.command[e]);return this.makeAbsolute(r)}getAsControlPoint(t,e){var r=this.getPoint(t,e);return this.control=r,r}getAsCurrentPoint(t,e){var r=this.getPoint(t,e);return this.current=r,r}getReflectedControlPoint(){var t=this.previousCommand.type;if(t!==O.CURVE_TO&&t!==O.SMOOTH_CURVE_TO&&t!==O.QUAD_TO&&t!==O.SMOOTH_QUAD_TO)return this.current;var{current:{x:e,y:r},control:{x:i,y:n}}=this;return new lt(2*e-i,2*r-n)}makeAbsolute(t){if(this.command.relative){var{x:e,y:r}=this.current;t.x+=e,t.y+=r}return t}addMarker(t,e,r){var{points:i,angles:n}=this;r&&n.length>0&&!n[n.length-1]&&(n[n.length-1]=i[i.length-1].angleTo(r)),this.addMarkerAngle(t,e?e.angleTo(t):null)}addMarkerAngle(t,e){this.points.push(t),this.angles.push(e)}getMarkerPoints(){return this.points}getMarkerAngles(){for(var{angles:t}=this,e=t.length,r=0;r<e;r++)if(!t[r])for(var i=r+1;i<e;i++)if(t[i]){t[r]=t[i];break}return t}}class kt extends Ot{constructor(){super(...arguments),this.modifiedEmSizeStack=!1}calculateOpacity(){for(var t=1,e=this;e;){var r=e.getStyle("opacity",!1,!0);r.hasValue(!0)&&(t*=r.getNumber()),e=e.parent}return t}setContext(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!e){var r=this.getStyle("fill"),i=this.getStyle("fill-opacity"),n=this.getStyle("stroke"),a=this.getStyle("stroke-opacity");if(r.isUrlDefinition()){var s=r.getFillStyleDefinition(this,i);s&&(t.fillStyle=s)}else if(r.hasValue()){"currentColor"===r.getString()&&r.setValue(this.getStyle("color").getColor());var o=r.getColor();"inherit"!==o&&(t.fillStyle="none"===o?"rgba(0,0,0,0)":o)}if(i.hasValue()){var h=new ht(this.document,"fill",t.fillStyle).addOpacity(i).getColor();t.fillStyle=h}if(n.isUrlDefinition()){var u=n.getFillStyleDefinition(this,a);u&&(t.strokeStyle=u)}else if(n.hasValue()){"currentColor"===n.getString()&&n.setValue(this.getStyle("color").getColor());var l=n.getString();"inherit"!==l&&(t.strokeStyle="none"===l?"rgba(0,0,0,0)":l)}if(a.hasValue()){var c=new ht(this.document,"stroke",t.strokeStyle).addOpacity(a).getString();t.strokeStyle=c}var g=this.getStyle("stroke-width");if(g.hasValue()){var f=g.getPixels();t.lineWidth=f||Z}var p=this.getStyle("stroke-linecap"),d=this.getStyle("stroke-linejoin"),v=this.getStyle("stroke-miterlimit"),y=this.getStyle("stroke-dasharray"),m=this.getStyle("stroke-dashoffset");if(p.hasValue()&&(t.lineCap=p.getString()),d.hasValue()&&(t.lineJoin=d.getString()),v.hasValue()&&(t.miterLimit=v.getNumber()),y.hasValue()&&"none"!==y.getString()){var x=D(y.getString());void 0!==t.setLineDash?t.setLineDash(x):void 0!==t.webkitLineDash?t.webkitLineDash=x:void 0===t.mozDash||1===x.length&&0===x[0]||(t.mozDash=x);var b=m.getPixels();void 0!==t.lineDashOffset?t.lineDashOffset=b:void 0!==t.webkitLineDashOffset?t.webkitLineDashOffset=b:void 0!==t.mozDashOffset&&(t.mozDashOffset=b)}}if(this.modifiedEmSizeStack=!1,void 0!==t.font){var S=this.getStyle("font"),w=this.getStyle("font-style"),T=this.getStyle("font-variant"),A=this.getStyle("font-weight"),C=this.getStyle("font-size"),O=this.getStyle("font-family"),P=new Vt(w.getString(),T.getString(),A.getString(),C.hasValue()?"".concat(C.getPixels(!0),"px"):"",O.getString(),Vt.parse(S.getString(),t.font));w.setValue(P.fontStyle),T.setValue(P.fontVariant),A.setValue(P.fontWeight),C.setValue(P.fontSize),O.setValue(P.fontFamily),t.font=P.toString(),C.isPixels()&&(this.document.emSize=C.getPixels(),this.modifiedEmSizeStack=!0)}e||(this.applyEffects(t),t.globalAlpha=this.calculateOpacity())}clearContext(t){super.clearContext(t),this.modifiedEmSizeStack&&this.document.popEmSize()}}class It extends kt{constructor(t,e,r){super(t,e,r),this.type="path",this.pathParser=null,this.pathParser=new Rt(this.getAttribute("d").getString())}path(t){var{pathParser:e}=this,r=new _t;for(e.reset(),t&&t.beginPath();!e.isEnd();)switch(e.next().type){case Rt.MOVE_TO:this.pathM(t,r);break;case Rt.LINE_TO:this.pathL(t,r);break;case Rt.HORIZ_LINE_TO:this.pathH(t,r);break;case Rt.VERT_LINE_TO:this.pathV(t,r);break;case Rt.CURVE_TO:this.pathC(t,r);break;case Rt.SMOOTH_CURVE_TO:this.pathS(t,r);break;case Rt.QUAD_TO:this.pathQ(t,r);break;case Rt.SMOOTH_QUAD_TO:this.pathT(t,r);break;case Rt.ARC:this.pathA(t,r);break;case Rt.CLOSE_PATH:this.pathZ(t,r)}return r}getBoundingBox(t){return this.path()}getMarkers(){var{pathParser:t}=this,e=t.getMarkerPoints(),r=t.getMarkerAngles(),i=e.map(((t,e)=>[t,r[e]]));return i}renderChildren(t){this.path(t),this.document.screen.mouse.checkPath(this,t);var e=this.getStyle("fill-rule");""!==t.fillStyle&&("inherit"!==e.getString("inherit")?t.fill(e.getString()):t.fill()),""!==t.strokeStyle&&("non-scaling-stroke"===this.getAttribute("vector-effect").getString()?(t.save(),t.setTransform(1,0,0,1,0,0),t.stroke(),t.restore()):t.stroke());var r=this.getMarkers();if(r){var i=r.length-1,n=this.getStyle("marker-start"),a=this.getStyle("marker-mid"),s=this.getStyle("marker-end");if(n.isUrlDefinition()){var o=n.getDefinition(),[h,u]=r[0];o.render(t,h,u)}if(a.isUrlDefinition())for(var l=a.getDefinition(),c=1;c<i;c++){var[g,f]=r[c];l.render(t,g,f)}if(s.isUrlDefinition()){var p=s.getDefinition(),[d,v]=r[i];p.render(t,d,v)}}}static pathM(t){var e=t.getAsCurrentPoint();return t.start=t.current,{point:e}}pathM(t,e){var{pathParser:r}=this,{point:i}=It.pathM(r),{x:n,y:a}=i;r.addMarker(i),e.addPoint(n,a),t&&t.moveTo(n,a)}static pathL(t){var{current:e}=t;return{current:e,point:t.getAsCurrentPoint()}}pathL(t,e){var{pathParser:r}=this,{current:i,point:n}=It.pathL(r),{x:a,y:s}=n;r.addMarker(n,i),e.addPoint(a,s),t&&t.lineTo(a,s)}static pathH(t){var{current:e,command:r}=t,i=new lt((r.relative?e.x:0)+r.x,e.y);return t.current=i,{current:e,point:i}}pathH(t,e){var{pathParser:r}=this,{current:i,point:n}=It.pathH(r),{x:a,y:s}=n;r.addMarker(n,i),e.addPoint(a,s),t&&t.lineTo(a,s)}static pathV(t){var{current:e,command:r}=t,i=new lt(e.x,(r.relative?e.y:0)+r.y);return t.current=i,{current:e,point:i}}pathV(t,e){var{pathParser:r}=this,{current:i,point:n}=It.pathV(r),{x:a,y:s}=n;r.addMarker(n,i),e.addPoint(a,s),t&&t.lineTo(a,s)}static pathC(t){var{current:e}=t;return{current:e,point:t.getPoint("x1","y1"),controlPoint:t.getAsControlPoint("x2","y2"),currentPoint:t.getAsCurrentPoint()}}pathC(t,e){var{pathParser:r}=this,{current:i,point:n,controlPoint:a,currentPoint:s}=It.pathC(r);r.addMarker(s,a,n),e.addBezierCurve(i.x,i.y,n.x,n.y,a.x,a.y,s.x,s.y),t&&t.bezierCurveTo(n.x,n.y,a.x,a.y,s.x,s.y)}static pathS(t){var{current:e}=t;return{current:e,point:t.getReflectedControlPoint(),controlPoint:t.getAsControlPoint("x2","y2"),currentPoint:t.getAsCurrentPoint()}}pathS(t,e){var{pathParser:r}=this,{current:i,point:n,controlPoint:a,currentPoint:s}=It.pathS(r);r.addMarker(s,a,n),e.addBezierCurve(i.x,i.y,n.x,n.y,a.x,a.y,s.x,s.y),t&&t.bezierCurveTo(n.x,n.y,a.x,a.y,s.x,s.y)}static pathQ(t){var{current:e}=t;return{current:e,controlPoint:t.getAsControlPoint("x1","y1"),currentPoint:t.getAsCurrentPoint()}}pathQ(t,e){var{pathParser:r}=this,{current:i,controlPoint:n,currentPoint:a}=It.pathQ(r);r.addMarker(a,n,n),e.addQuadraticCurve(i.x,i.y,n.x,n.y,a.x,a.y),t&&t.quadraticCurveTo(n.x,n.y,a.x,a.y)}static pathT(t){var{current:e}=t,r=t.getReflectedControlPoint();return t.control=r,{current:e,controlPoint:r,currentPoint:t.getAsCurrentPoint()}}pathT(t,e){var{pathParser:r}=this,{current:i,controlPoint:n,currentPoint:a}=It.pathT(r);r.addMarker(a,n,n),e.addQuadraticCurve(i.x,i.y,n.x,n.y,a.x,a.y),t&&t.quadraticCurveTo(n.x,n.y,a.x,a.y)}static pathA(t){var{current:e,command:r}=t,{rX:i,rY:n,xRot:a,lArcFlag:s,sweepFlag:o}=r,h=a*(Math.PI/180),u=t.getAsCurrentPoint(),l=new lt(Math.cos(h)*(e.x-u.x)/2+Math.sin(h)*(e.y-u.y)/2,-Math.sin(h)*(e.x-u.x)/2+Math.cos(h)*(e.y-u.y)/2),c=Math.pow(l.x,2)/Math.pow(i,2)+Math.pow(l.y,2)/Math.pow(n,2);c>1&&(i*=Math.sqrt(c),n*=Math.sqrt(c));var g=(s===o?-1:1)*Math.sqrt((Math.pow(i,2)*Math.pow(n,2)-Math.pow(i,2)*Math.pow(l.y,2)-Math.pow(n,2)*Math.pow(l.x,2))/(Math.pow(i,2)*Math.pow(l.y,2)+Math.pow(n,2)*Math.pow(l.x,2)));isNaN(g)&&(g=0);var f=new lt(g*i*l.y/n,g*-n*l.x/i),p=new lt((e.x+u.x)/2+Math.cos(h)*f.x-Math.sin(h)*f.y,(e.y+u.y)/2+Math.sin(h)*f.x+Math.cos(h)*f.y),d=tt([1,0],[(l.x-f.x)/i,(l.y-f.y)/n]),v=[(l.x-f.x)/i,(l.y-f.y)/n],y=[(-l.x-f.x)/i,(-l.y-f.y)/n],m=tt(v,y);return J(v,y)<=-1&&(m=Math.PI),J(v,y)>=1&&(m=0),{currentPoint:u,rX:i,rY:n,sweepFlag:o,xAxisRotation:h,centp:p,a1:d,ad:m}}pathA(t,e){var{pathParser:r}=this,{currentPoint:i,rX:n,rY:a,sweepFlag:s,xAxisRotation:o,centp:h,a1:u,ad:l}=It.pathA(r),c=1-s?1:-1,g=u+c*(l/2),f=new lt(h.x+n*Math.cos(g),h.y+a*Math.sin(g));if(r.addMarkerAngle(f,g-c*Math.PI/2),r.addMarkerAngle(i,g-c*Math.PI),e.addPoint(i.x,i.y),t&&!isNaN(u)&&!isNaN(l)){var p=n>a?n:a,d=n>a?1:n/a,v=n>a?a/n:1;t.translate(h.x,h.y),t.rotate(o),t.scale(d,v),t.arc(0,0,p,u,u+l,Boolean(1-s)),t.scale(1/d,1/v),t.rotate(-o),t.translate(-h.x,-h.y)}}static pathZ(t){t.current=t.start}pathZ(t,e){It.pathZ(this.pathParser),t&&e.x1!==e.x2&&e.y1!==e.y2&&t.closePath()}}class Lt extends It{constructor(t,e,r){super(t,e,r),this.type="glyph",this.horizAdvX=this.getAttribute("horiz-adv-x").getNumber(),this.unicode=this.getAttribute("unicode").getString(),this.arabicForm=this.getAttribute("arabic-form").getString()}}class Dt extends kt{constructor(t,e,r){super(t,e,new.target===Dt||r),this.type="text",this.x=0,this.y=0,this.measureCache=-1}setContext(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];super.setContext(t,e);var r=this.getStyle("dominant-baseline").getTextBaseline()||this.getStyle("alignment-baseline").getTextBaseline();r&&(t.textBaseline=r)}initializeCoordinates(){this.x=0,this.y=0,this.leafTexts=[],this.textChunkStart=0,this.minX=Number.POSITIVE_INFINITY,this.maxX=Number.NEGATIVE_INFINITY}getBoundingBox(t){if("text"!==this.type)return this.getTElementBoundingBox(t);this.initializeCoordinates(),this.adjustChildCoordinatesRecursive(t);var e=null;return this.children.forEach(((r,i)=>{var n=this.getChildBoundingBox(t,this,this,i);e?e.addBoundingBox(n):e=n})),e}getFontSize(){var{document:t,parent:e}=this,r=Vt.parse(t.ctx.font).fontSize;return e.getStyle("font-size").getNumber(r)}getTElementBoundingBox(t){var e=this.getFontSize();return new _t(this.x,this.y-e,this.x+this.measureText(t),this.y)}getGlyph(t,e,r){var i=e[r],n=null;if(t.isArabic){var a=e.length,s=e[r-1],o=e[r+1],h="isolated";if((0===r||" "===s)&&r<a-1&&" "!==o&&(h="terminal"),r>0&&" "!==s&&r<a-1&&" "!==o&&(h="medial"),r>0&&" "!==s&&(r===a-1||" "===o)&&(h="initial"),void 0!==t.glyphs[i]){var u=t.glyphs[i];n=u instanceof Lt?u:u[h]}}else n=t.glyphs[i];return n||(n=t.missingGlyph),n}getText(){return""}getTextFromNode(t){var e=t||this.node,r=Array.from(e.parentNode.childNodes),i=r.indexOf(e),n=r.length-1,a=k(e.textContent||"");return 0===i&&(a=I(a)),i===n&&(a=L(a)),a}renderChildren(t){if("text"===this.type){this.initializeCoordinates(),this.adjustChildCoordinatesRecursive(t),this.children.forEach(((e,r)=>{this.renderChild(t,this,this,r)}));var{mouse:e}=this.document.screen;e.isWorking()&&e.checkBoundingBox(this,this.getBoundingBox(t))}else this.renderTElementChildren(t)}renderTElementChildren(t){var{document:e,parent:r}=this,i=this.getText(),n=r.getStyle("font-family").getDefinition();if(n)for(var{unitsPerEm:a}=n.fontFace,s=Vt.parse(e.ctx.font),o=r.getStyle("font-size").getNumber(s.fontSize),h=r.getStyle("font-style").getString(s.fontStyle),u=o/a,l=n.isRTL?i.split("").reverse().join(""):i,c=D(r.getAttribute("dx").getString()),g=l.length,f=0;f<g;f++){var p=this.getGlyph(n,l,f);t.translate(this.x,this.y),t.scale(u,-u);var d=t.lineWidth;t.lineWidth=t.lineWidth*a/o,"italic"===h&&t.transform(1,0,.4,1,0,0),p.render(t),"italic"===h&&t.transform(1,0,-.4,1,0,0),t.lineWidth=d,t.scale(1/u,-1/u),t.translate(-this.x,-this.y),this.x+=o*(p.horizAdvX||n.horizAdvX)/a,void 0===c[f]||isNaN(c[f])||(this.x+=c[f])}else{var{x:v,y}=this;t.fillStyle&&t.fillText(i,v,y),t.strokeStyle&&t.strokeText(i,v,y)}}applyAnchoring(){if(!(this.textChunkStart>=this.leafTexts.length)){var t,e=this.leafTexts[this.textChunkStart],r=e.getStyle("text-anchor").getString("start");t="start"===r?e.x-this.minX:"end"===r?e.x-this.maxX:e.x-(this.minX+this.maxX)/2;for(var i=this.textChunkStart;i<this.leafTexts.length;i++)this.leafTexts[i].x+=t;this.minX=Number.POSITIVE_INFINITY,this.maxX=Number.NEGATIVE_INFINITY,this.textChunkStart=this.leafTexts.length}}adjustChildCoordinatesRecursive(t){this.children.forEach(((e,r)=>{this.adjustChildCoordinatesRecursiveCore(t,this,this,r)})),this.applyAnchoring()}adjustChildCoordinatesRecursiveCore(t,e,r,i){var n=r.children[i];n.children.length>0?n.children.forEach(((r,i)=>{e.adjustChildCoordinatesRecursiveCore(t,e,n,i)})):this.adjustChildCoordinates(t,e,r,i)}adjustChildCoordinates(t,e,r,i){var n=r.children[i];if("function"!=typeof n.measureText)return n;t.save(),n.setContext(t,!0);var a=n.getAttribute("x"),s=n.getAttribute("y"),o=n.getAttribute("dx"),h=n.getAttribute("dy"),u=n.getStyle("font-family").getDefinition(),l=Boolean(u)&&u.isRTL;0===i&&(a.hasValue()||a.setValue(n.getInheritedAttribute("x")),s.hasValue()||s.setValue(n.getInheritedAttribute("y")),o.hasValue()||o.setValue(n.getInheritedAttribute("dx")),h.hasValue()||h.setValue(n.getInheritedAttribute("dy")));var c=n.measureText(t);return l&&(e.x-=c),a.hasValue()?(e.applyAnchoring(),n.x=a.getPixels("x"),o.hasValue()&&(n.x+=o.getPixels("x"))):(o.hasValue()&&(e.x+=o.getPixels("x")),n.x=e.x),e.x=n.x,l||(e.x+=c),s.hasValue()?(n.y=s.getPixels("y"),h.hasValue()&&(n.y+=h.getPixels("y"))):(h.hasValue()&&(e.y+=h.getPixels("y")),n.y=e.y),e.y=n.y,e.leafTexts.push(n),e.minX=Math.min(e.minX,n.x,n.x+c),e.maxX=Math.max(e.maxX,n.x,n.x+c),n.clearContext(t),t.restore(),n}getChildBoundingBox(t,e,r,i){var n=r.children[i];if("function"!=typeof n.getBoundingBox)return null;var a=n.getBoundingBox(t);return a?(n.children.forEach(((r,i)=>{var s=e.getChildBoundingBox(t,e,n,i);a.addBoundingBox(s)})),a):null}renderChild(t,e,r,i){var n=r.children[i];n.render(t),n.children.forEach(((r,i)=>{e.renderChild(t,e,n,i)}))}measureText(t){var{measureCache:e}=this;if(~e)return e;var r=this.getText(),i=this.measureTargetText(t,r);return this.measureCache=i,i}measureTargetText(t,e){if(!e.length)return 0;var{parent:r}=this,i=r.getStyle("font-family").getDefinition();if(i){for(var n=this.getFontSize(),a=i.isRTL?e.split("").reverse().join(""):e,s=D(r.getAttribute("dx").getString()),o=a.length,h=0,u=0;u<o;u++)h+=(this.getGlyph(i,a,u).horizAdvX||i.horizAdvX)*n/i.fontFace.unitsPerEm,void 0===s[u]||isNaN(s[u])||(h+=s[u]);return h}if(!t.measureText)return 10*e.length;t.save(),this.setContext(t,!0);var{width:l}=t.measureText(e);return this.clearContext(t),t.restore(),l}getInheritedAttribute(t){for(var e=this;e instanceof Dt&&e.isFirstChild();){var r=e.parent.getAttribute(t);if(r.hasValue(!0))return r.getValue("0");e=e.parent}return null}}class Bt extends Dt{constructor(t,e,r){super(t,e,new.target===Bt||r),this.type="tspan",this.text=this.children.length>0?"":this.getTextFromNode()}getText(){return this.text}}class zt extends Bt{constructor(){super(...arguments),this.type="textNode"}}class Ut extends kt{constructor(){super(...arguments),this.type="svg",this.root=!1}setContext(t){var e,{document:r}=this,{screen:i,window:n}=r,a=t.canvas;if(i.setDefaults(t),a.style&&void 0!==t.font&&n&&void 0!==n.getComputedStyle){t.font=n.getComputedStyle(a).getPropertyValue("font");var s=new ht(r,"fontSize",Vt.parse(t.font).fontSize);s.hasValue()&&(r.rootEmSize=s.getPixels("y"),r.emSize=r.rootEmSize)}this.getAttribute("x").hasValue()||this.getAttribute("x",!0).setValue(0),this.getAttribute("y").hasValue()||this.getAttribute("y",!0).setValue(0);var{width:o,height:h}=i.viewPort;this.getStyle("width").hasValue()||this.getStyle("width",!0).setValue("100%"),this.getStyle("height").hasValue()||this.getStyle("height",!0).setValue("100%"),this.getStyle("color").hasValue()||this.getStyle("color",!0).setValue("black");var u=this.getAttribute("refX"),l=this.getAttribute("refY"),c=this.getAttribute("viewBox"),g=c.hasValue()?D(c.getString()):null,f=!this.root&&"visible"!==this.getStyle("overflow").getValue("hidden"),p=0,d=0,v=0,y=0;g&&(p=g[0],d=g[1]),this.root||(o=this.getStyle("width").getPixels("x"),h=this.getStyle("height").getPixels("y"),"marker"===this.type&&(v=p,y=d,p=0,d=0)),i.viewPort.setCurrent(o,h),!this.node||this.parent&&"foreignObject"!==(null===(e=this.node.parentNode)||void 0===e?void 0:e.nodeName)||!this.getStyle("transform",!1,!0).hasValue()||this.getStyle("transform-origin",!1,!0).hasValue()||this.getStyle("transform-origin",!0,!0).setValue("50% 50%"),super.setContext(t),t.translate(this.getAttribute("x").getPixels("x"),this.getAttribute("y").getPixels("y")),g&&(o=g[2],h=g[3]),r.setViewBox({ctx:t,aspectRatio:this.getAttribute("preserveAspectRatio").getString(),width:i.viewPort.width,desiredWidth:o,height:i.viewPort.height,desiredHeight:h,minX:p,minY:d,refX:u.getValue(),refY:l.getValue(),clip:f,clipX:v,clipY:y}),g&&(i.viewPort.removeCurrent(),i.viewPort.setCurrent(o,h))}clearContext(t){super.clearContext(t),this.document.screen.viewPort.removeCurrent()}resize(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this.getAttribute("width",!0),n=this.getAttribute("height",!0),a=this.getAttribute("viewBox"),s=this.getAttribute("style"),o=i.getNumber(0),h=n.getNumber(0);if(r)if("string"==typeof r)this.getAttribute("preserveAspectRatio",!0).setValue(r);else{var u=this.getAttribute("preserveAspectRatio");u.hasValue()&&u.setValue(u.getString().replace(/^\s*(\S.*\S)\s*$/,"$1"))}if(i.setValue(t),n.setValue(e),a.hasValue()||a.setValue("0 0 ".concat(o||t," ").concat(h||e)),s.hasValue()){var l=this.getStyle("width"),c=this.getStyle("height");l.hasValue()&&l.setValue("".concat(t,"px")),c.hasValue()&&c.setValue("".concat(e,"px"))}}}class Ft extends It{constructor(){super(...arguments),this.type="rect"}path(t){var e=this.getAttribute("x").getPixels("x"),r=this.getAttribute("y").getPixels("y"),i=this.getStyle("width",!1,!0).getPixels("x"),n=this.getStyle("height",!1,!0).getPixels("y"),a=this.getAttribute("rx"),s=this.getAttribute("ry"),o=a.getPixels("x"),h=s.getPixels("y");if(a.hasValue()&&!s.hasValue()&&(h=o),s.hasValue()&&!a.hasValue()&&(o=h),o=Math.min(o,i/2),h=Math.min(h,n/2),t){var u=(Math.sqrt(2)-1)/3*4;t.beginPath(),n>0&&i>0&&(t.moveTo(e+o,r),t.lineTo(e+i-o,r),t.bezierCurveTo(e+i-o+u*o,r,e+i,r+h-u*h,e+i,r+h),t.lineTo(e+i,r+n-h),t.bezierCurveTo(e+i,r+n-h+u*h,e+i-o+u*o,r+n,e+i-o,r+n),t.lineTo(e+o,r+n),t.bezierCurveTo(e+o-u*o,r+n,e,r+n-h+u*h,e,r+n-h),t.lineTo(e,r+h),t.bezierCurveTo(e,r+h-u*h,e+o-u*o,r,e+o,r),t.closePath())}return new _t(e,r,e+i,r+n)}getMarkers(){return null}}class Ht extends It{constructor(){super(...arguments),this.type="circle"}path(t){var e=this.getAttribute("cx").getPixels("x"),r=this.getAttribute("cy").getPixels("y"),i=this.getAttribute("r").getPixels();return t&&i>0&&(t.beginPath(),t.arc(e,r,i,0,2*Math.PI,!1),t.closePath()),new _t(e-i,r-i,e+i,r+i)}getMarkers(){return null}}class Xt extends It{constructor(){super(...arguments),this.type="ellipse"}path(t){var e=(Math.sqrt(2)-1)/3*4,r=this.getAttribute("rx").getPixels("x"),i=this.getAttribute("ry").getPixels("y"),n=this.getAttribute("cx").getPixels("x"),a=this.getAttribute("cy").getPixels("y");return t&&r>0&&i>0&&(t.beginPath(),t.moveTo(n+r,a),t.bezierCurveTo(n+r,a+e*i,n+e*r,a+i,n,a+i),t.bezierCurveTo(n-e*r,a+i,n-r,a+e*i,n-r,a),t.bezierCurveTo(n-r,a-e*i,n-e*r,a-i,n,a-i),t.bezierCurveTo(n+e*r,a-i,n+r,a-e*i,n+r,a),t.closePath()),new _t(n-r,a-i,n+r,a+i)}getMarkers(){return null}}class jt extends It{constructor(){super(...arguments),this.type="line"}getPoints(){return[new lt(this.getAttribute("x1").getPixels("x"),this.getAttribute("y1").getPixels("y")),new lt(this.getAttribute("x2").getPixels("x"),this.getAttribute("y2").getPixels("y"))]}path(t){var[{x:e,y:r},{x:i,y:n}]=this.getPoints();return t&&(t.beginPath(),t.moveTo(e,r),t.lineTo(i,n)),new _t(e,r,i,n)}getMarkers(){var[t,e]=this.getPoints(),r=t.angleTo(e);return[[t,r],[e,r]]}}class Yt extends It{constructor(t,e,r){super(t,e,r),this.type="polyline",this.points=[],this.points=lt.parsePath(this.getAttribute("points").getString())}path(t){var{points:e}=this,[{x:r,y:i}]=e,n=new _t(r,i);return t&&(t.beginPath(),t.moveTo(r,i)),e.forEach((e=>{var{x:r,y:i}=e;n.addPoint(r,i),t&&t.lineTo(r,i)})),n}getMarkers(){var{points:t}=this,e=t.length-1,r=[];return t.forEach(((i,n)=>{n!==e&&r.push([i,i.angleTo(t[n+1])])})),r.length>0&&r.push([t[t.length-1],r[r.length-1][1]]),r}}class qt extends Yt{constructor(){super(...arguments),this.type="polygon"}path(t){var e=super.path(t),[{x:r,y:i}]=this.points;return t&&(t.lineTo(r,i),t.closePath()),e}}class Wt extends Ot{constructor(){super(...arguments),this.type="pattern"}createPattern(t,e,r){var i=this.getStyle("width").getPixels("x",!0),n=this.getStyle("height").getPixels("y",!0),a=new Ut(this.document,null);a.attributes.viewBox=new ht(this.document,"viewBox",this.getAttribute("viewBox").getValue()),a.attributes.width=new ht(this.document,"width","".concat(i,"px")),a.attributes.height=new ht(this.document,"height","".concat(n,"px")),a.attributes.transform=new ht(this.document,"transform",this.getAttribute("patternTransform").getValue()),a.children=this.children;var s=this.document.createCanvas(i,n),o=s.getContext("2d"),h=this.getAttribute("x"),u=this.getAttribute("y");h.hasValue()&&u.hasValue()&&o.translate(h.getPixels("x",!0),u.getPixels("y",!0)),r.hasValue()?this.styles["fill-opacity"]=r:Reflect.deleteProperty(this.styles,"fill-opacity");for(var l=-1;l<=1;l++)for(var c=-1;c<=1;c++)o.save(),a.attributes.x=new ht(this.document,"x",l*s.width),a.attributes.y=new ht(this.document,"y",c*s.height),a.render(o),o.restore();return t.createPattern(s,"repeat")}}class Gt extends Ot{constructor(){super(...arguments),this.type="marker"}render(t,e,r){if(e){var{x:i,y:n}=e,a=this.getAttribute("orient").getString("auto"),s=this.getAttribute("markerUnits").getString("strokeWidth");t.translate(i,n),"auto"===a&&t.rotate(r),"strokeWidth"===s&&t.scale(t.lineWidth,t.lineWidth),t.save();var o=new Ut(this.document,null);o.type=this.type,o.attributes.viewBox=new ht(this.document,"viewBox",this.getAttribute("viewBox").getValue()),o.attributes.refX=new ht(this.document,"refX",this.getAttribute("refX").getValue()),o.attributes.refY=new ht(this.document,"refY",this.getAttribute("refY").getValue()),o.attributes.width=new ht(this.document,"width",this.getAttribute("markerWidth").getValue()),o.attributes.height=new ht(this.document,"height",this.getAttribute("markerHeight").getValue()),o.attributes.overflow=new ht(this.document,"overflow",this.getAttribute("overflow").getValue()),o.attributes.fill=new ht(this.document,"fill",this.getAttribute("fill").getColor("black")),o.attributes.stroke=new ht(this.document,"stroke",this.getAttribute("stroke").getValue("none")),o.children=this.children,o.render(t),t.restore(),"strokeWidth"===s&&t.scale(1/t.lineWidth,1/t.lineWidth),"auto"===a&&t.rotate(-r),t.translate(-i,-n)}}}class Qt extends Ot{constructor(){super(...arguments),this.type="defs"}render(){}}class $t extends kt{constructor(){super(...arguments),this.type="g"}getBoundingBox(t){var e=new _t;return this.children.forEach((r=>{e.addBoundingBox(r.getBoundingBox(t))})),e}}class Zt extends Ot{constructor(t,e,r){super(t,e,r),this.attributesToInherit=["gradientUnits"],this.stops=[];var{stops:i,children:n}=this;n.forEach((t=>{"stop"===t.type&&i.push(t)}))}getGradientUnits(){return this.getAttribute("gradientUnits").getString("objectBoundingBox")}createGradient(t,e,r){var i=this;this.getHrefAttribute().hasValue()&&(i=this.getHrefAttribute().getDefinition(),this.inheritStopContainer(i));var{stops:n}=i,a=this.getGradient(t,e);if(!a)return this.addParentOpacity(r,n[n.length-1].color);if(n.forEach((t=>{a.addColorStop(t.offset,this.addParentOpacity(r,t.color))})),this.getAttribute("gradientTransform").hasValue()){var{document:s}=this,{MAX_VIRTUAL_PIXELS:o,viewPort:h}=s.screen,[u]=h.viewPorts,l=new Ft(s,null);l.attributes.x=new ht(s,"x",-o/3),l.attributes.y=new ht(s,"y",-o/3),l.attributes.width=new ht(s,"width",o),l.attributes.height=new ht(s,"height",o);var c=new $t(s,null);c.attributes.transform=new ht(s,"transform",this.getAttribute("gradientTransform").getValue()),c.children=[l];var g=new Ut(s,null);g.attributes.x=new ht(s,"x",0),g.attributes.y=new ht(s,"y",0),g.attributes.width=new ht(s,"width",u.width),g.attributes.height=new ht(s,"height",u.height),g.children=[c];var f=s.createCanvas(u.width,u.height),p=f.getContext("2d");return p.fillStyle=a,g.render(p),p.createPattern(f,"no-repeat")}return a}inheritStopContainer(t){this.attributesToInherit.forEach((e=>{!this.getAttribute(e).hasValue()&&t.getAttribute(e).hasValue()&&this.getAttribute(e,!0).setValue(t.getAttribute(e).getValue())}))}addParentOpacity(t,e){return t.hasValue()?new ht(this.document,"color",e).addOpacity(t).getColor():e}}class Kt extends Zt{constructor(t,e,r){super(t,e,r),this.type="linearGradient",this.attributesToInherit.push("x1","y1","x2","y2")}getGradient(t,e){var r="objectBoundingBox"===this.getGradientUnits(),i=r?e.getBoundingBox(t):null;if(r&&!i)return null;this.getAttribute("x1").hasValue()||this.getAttribute("y1").hasValue()||this.getAttribute("x2").hasValue()||this.getAttribute("y2").hasValue()||(this.getAttribute("x1",!0).setValue(0),this.getAttribute("y1",!0).setValue(0),this.getAttribute("x2",!0).setValue(1),this.getAttribute("y2",!0).setValue(0));var n=r?i.x+i.width*this.getAttribute("x1").getNumber():this.getAttribute("x1").getPixels("x"),a=r?i.y+i.height*this.getAttribute("y1").getNumber():this.getAttribute("y1").getPixels("y"),s=r?i.x+i.width*this.getAttribute("x2").getNumber():this.getAttribute("x2").getPixels("x"),o=r?i.y+i.height*this.getAttribute("y2").getNumber():this.getAttribute("y2").getPixels("y");return n===s&&a===o?null:t.createLinearGradient(n,a,s,o)}}class Jt extends Zt{constructor(t,e,r){super(t,e,r),this.type="radialGradient",this.attributesToInherit.push("cx","cy","r","fx","fy","fr")}getGradient(t,e){var r="objectBoundingBox"===this.getGradientUnits(),i=e.getBoundingBox(t);if(r&&!i)return null;this.getAttribute("cx").hasValue()||this.getAttribute("cx",!0).setValue("50%"),this.getAttribute("cy").hasValue()||this.getAttribute("cy",!0).setValue("50%"),this.getAttribute("r").hasValue()||this.getAttribute("r",!0).setValue("50%");var n=r?i.x+i.width*this.getAttribute("cx").getNumber():this.getAttribute("cx").getPixels("x"),a=r?i.y+i.height*this.getAttribute("cy").getNumber():this.getAttribute("cy").getPixels("y"),s=n,o=a;this.getAttribute("fx").hasValue()&&(s=r?i.x+i.width*this.getAttribute("fx").getNumber():this.getAttribute("fx").getPixels("x")),this.getAttribute("fy").hasValue()&&(o=r?i.y+i.height*this.getAttribute("fy").getNumber():this.getAttribute("fy").getPixels("y"));var h=r?(i.width+i.height)/2*this.getAttribute("r").getNumber():this.getAttribute("r").getPixels(),u=this.getAttribute("fr").getPixels();return t.createRadialGradient(s,o,u,n,a,h)}}class te extends Ot{constructor(t,e,r){super(t,e,r),this.type="stop";var i=Math.max(0,Math.min(1,this.getAttribute("offset").getNumber())),n=this.getStyle("stop-opacity"),a=this.getStyle("stop-color",!0);""===a.getString()&&a.setValue("#000"),n.hasValue()&&(a=a.addOpacity(n)),this.offset=i,this.color=a.getColor()}}class ee extends Ot{constructor(t,e,r){super(t,e,r),this.type="animate",this.duration=0,this.initialValue=null,this.initialUnits="",this.removed=!1,this.frozen=!1,t.screen.animations.push(this),this.begin=this.getAttribute("begin").getMilliseconds(),this.maxDuration=this.begin+this.getAttribute("dur").getMilliseconds(),this.from=this.getAttribute("from"),this.to=this.getAttribute("to"),this.values=new ht(t,"values",null);var i=this.getAttribute("values");i.hasValue()&&this.values.setValue(i.getString().split(";"))}getProperty(){var t=this.getAttribute("attributeType").getString(),e=this.getAttribute("attributeName").getString();return"CSS"===t?this.parent.getStyle(e,!0):this.parent.getAttribute(e,!0)}calcValue(){var{initialUnits:t}=this,{progress:e,from:r,to:i}=this.getProgress(),n=r.getNumber()+(i.getNumber()-r.getNumber())*e;return"%"===t&&(n*=100),"".concat(n).concat(t)}update(t){var{parent:e}=this,r=this.getProperty();if(this.initialValue||(this.initialValue=r.getString(),this.initialUnits=r.getUnits()),this.duration>this.maxDuration){var i=this.getAttribute("fill").getString("remove");if("indefinite"===this.getAttribute("repeatCount").getString()||"indefinite"===this.getAttribute("repeatDur").getString())this.duration=0;else if("freeze"!==i||this.frozen){if("remove"===i&&!this.removed)return this.removed=!0,r.setValue(e.animationFrozen?e.animationFrozenValue:this.initialValue),!0}else this.frozen=!0,e.animationFrozen=!0,e.animationFrozenValue=r.getString();return!1}this.duration+=t;var n=!1;if(this.begin<this.duration){var a=this.calcValue(),s=this.getAttribute("type");if(s.hasValue()){var o=s.getString();a="".concat(o,"(").concat(a,")")}r.setValue(a),n=!0}return n}getProgress(){var{document:t,values:e}=this,r={progress:(this.duration-this.begin)/(this.maxDuration-this.begin)};if(e.hasValue()){var i=r.progress*(e.getValue().length-1),n=Math.floor(i),a=Math.ceil(i);r.from=new ht(t,"from",parseFloat(e.getValue()[n])),r.to=new ht(t,"to",parseFloat(e.getValue()[a])),r.progress=(i-n)/(a-n)}else r.from=this.from,r.to=this.to;return r}}class re extends ee{constructor(){super(...arguments),this.type="animateColor"}calcValue(){var{progress:t,from:e,to:r}=this.getProgress(),i=new o(e.getColor()),n=new o(r.getColor());if(i.ok&&n.ok){var a=i.r+(n.r-i.r)*t,s=i.g+(n.g-i.g)*t,h=i.b+(n.b-i.b)*t;return"rgb(".concat(Math.floor(a),", ").concat(Math.floor(s),", ").concat(Math.floor(h),")")}return this.getAttribute("from").getColor()}}class ie extends ee{constructor(){super(...arguments),this.type="animateTransform"}calcValue(){var{progress:t,from:e,to:r}=this.getProgress(),i=D(e.getString()),n=D(r.getString()),a=i.map(((e,r)=>e+(n[r]-e)*t)).join(" ");return a}}class ne extends Ot{constructor(t,e,r){super(t,e,r),this.type="font",this.glyphs={},this.horizAdvX=this.getAttribute("horiz-adv-x").getNumber();var{definitions:i}=t,{children:n}=this;for(var a of n)switch(a.type){case"font-face":this.fontFace=a;var s=a.getStyle("font-family");s.hasValue()&&(i[s.getString()]=this);break;case"missing-glyph":this.missingGlyph=a;break;case"glyph":var o=a;o.arabicForm?(this.isRTL=!0,this.isArabic=!0,void 0===this.glyphs[o.unicode]&&(this.glyphs[o.unicode]={}),this.glyphs[o.unicode][o.arabicForm]=o):this.glyphs[o.unicode]=o}}render(){}}class ae extends Ot{constructor(t,e,r){super(t,e,r),this.type="font-face",this.ascent=this.getAttribute("ascent").getNumber(),this.descent=this.getAttribute("descent").getNumber(),this.unitsPerEm=this.getAttribute("units-per-em").getNumber()}}class se extends It{constructor(){super(...arguments),this.type="missing-glyph",this.horizAdvX=0}}class oe extends Dt{constructor(){super(...arguments),this.type="tref"}getText(){var t=this.getHrefAttribute().getDefinition();if(t){var e=t.children[0];if(e)return e.getText()}return""}}class he extends Dt{constructor(t,e,r){super(t,e,r),this.type="a";var{childNodes:i}=e,n=i[0],a=i.length>0&&Array.from(i).every((t=>3===t.nodeType));this.hasText=a,this.text=a?this.getTextFromNode(n):""}getText(){return this.text}renderChildren(t){if(this.hasText){super.renderChildren(t);var{document:e,x:r,y:i}=this,{mouse:n}=e.screen,a=new ht(e,"fontSize",Vt.parse(e.ctx.font).fontSize);n.isWorking()&&n.checkBoundingBox(this,new _t(r,i-a.getPixels("y"),r+this.measureText(t),i))}else if(this.children.length>0){var s=new $t(this.document,null);s.children=this.children,s.parent=this,s.render(t)}}onClick(){var{window:t}=this.document;t&&t.open(this.getHrefAttribute().getString())}onMouseMove(){this.document.ctx.canvas.style.cursor="pointer"}}function ue(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function le(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ue(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ue(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}class ce extends Dt{constructor(t,e,r){super(t,e,r),this.type="textPath",this.textWidth=0,this.textHeight=0,this.pathLength=-1,this.glyphInfo=null,this.letterSpacingCache=[],this.measuresCache=new Map([["",0]]);var i=this.getHrefAttribute().getDefinition();this.text=this.getTextFromNode(),this.dataArray=this.parsePathData(i)}getText(){return this.text}path(t){var{dataArray:e}=this;t&&t.beginPath(),e.forEach((e=>{var{type:r,points:i}=e;switch(r){case Rt.LINE_TO:t&&t.lineTo(i[0],i[1]);break;case Rt.MOVE_TO:t&&t.moveTo(i[0],i[1]);break;case Rt.CURVE_TO:t&&t.bezierCurveTo(i[0],i[1],i[2],i[3],i[4],i[5]);break;case Rt.QUAD_TO:t&&t.quadraticCurveTo(i[0],i[1],i[2],i[3]);break;case Rt.ARC:var[n,a,s,o,h,u,l,c]=i,g=s>o?s:o,f=s>o?1:s/o,p=s>o?o/s:1;t&&(t.translate(n,a),t.rotate(l),t.scale(f,p),t.arc(0,0,g,h,h+u,Boolean(1-c)),t.scale(1/f,1/p),t.rotate(-l),t.translate(-n,-a));break;case Rt.CLOSE_PATH:t&&t.closePath()}}))}renderChildren(t){this.setTextData(t),t.save();var e=this.parent.getStyle("text-decoration").getString(),r=this.getFontSize(),{glyphInfo:i}=this,n=t.fillStyle;"underline"===e&&t.beginPath(),i.forEach(((i,n)=>{var{p0:a,p1:s,rotation:o,text:h}=i;t.save(),t.translate(a.x,a.y),t.rotate(o),t.fillStyle&&t.fillText(h,0,0),t.strokeStyle&&t.strokeText(h,0,0),t.restore(),"underline"===e&&(0===n&&t.moveTo(a.x,a.y+r/8),t.lineTo(s.x,s.y+r/5))})),"underline"===e&&(t.lineWidth=r/20,t.strokeStyle=n,t.stroke(),t.closePath()),t.restore()}getLetterSpacingAt(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return this.letterSpacingCache[t]||0}findSegmentToFitChar(t,e,r,i,n,a,s,o,h){var u=a,l=this.measureText(t,o);" "===o&&"justify"===e&&r<i&&(l+=(i-r)/n),h>-1&&(u+=this.getLetterSpacingAt(h));var c=this.textHeight/20,g=this.getEquidistantPointOnPath(u,c,0),f=this.getEquidistantPointOnPath(u+l,c,0),p={p0:g,p1:f},d=g&&f?Math.atan2(f.y-g.y,f.x-g.x):0;if(s){var v=Math.cos(Math.PI/2+d)*s,y=Math.cos(-d)*s;p.p0=le(le({},g),{},{x:g.x+v,y:g.y+y}),p.p1=le(le({},f),{},{x:f.x+v,y:f.y+y})}return{offset:u+=l,segment:p,rotation:d}}measureText(t,e){var{measuresCache:r}=this,i=e||this.getText();if(r.has(i))return r.get(i);var n=this.measureTargetText(t,i);return r.set(i,n),n}setTextData(t){if(!this.glyphInfo){var e=this.getText(),r=e.split(""),i=e.split(" ").length-1,n=this.parent.getAttribute("dx").split().map((t=>t.getPixels("x"))),a=this.parent.getAttribute("dy").getPixels("y"),s=this.parent.getStyle("text-anchor").getString("start"),o=this.getStyle("letter-spacing"),h=this.parent.getStyle("letter-spacing"),u=0;o.hasValue()&&"inherit"!==o.getValue()?o.hasValue()&&"initial"!==o.getValue()&&"unset"!==o.getValue()&&(u=o.getPixels()):u=h.getPixels();var l=[],c=e.length;this.letterSpacingCache=l;for(var g=0;g<c;g++)l.push(void 0!==n[g]?n[g]:u);var f=l.reduce(((t,e,r)=>0===r?0:t+e||0),0),p=this.measureText(t),d=Math.max(p+f,0);this.textWidth=p,this.textHeight=this.getFontSize(),this.glyphInfo=[];var v=this.getPathLength(),y=this.getStyle("startOffset").getNumber(0)*v,m=0;"middle"!==s&&"center"!==s||(m=-d/2),"end"!==s&&"right"!==s||(m=-d),m+=y,r.forEach(((e,n)=>{var{offset:o,segment:h,rotation:u}=this.findSegmentToFitChar(t,s,d,v,i,m,a,e,n);m=o,h.p0&&h.p1&&this.glyphInfo.push({text:r[n],p0:h.p0,p1:h.p1,rotation:u})}))}}parsePathData(t){if(this.pathLength=-1,!t)return[];var e=[],{pathParser:r}=t;for(r.reset();!r.isEnd();){var{current:i}=r,n=i?i.x:0,a=i?i.y:0,s=r.next(),o=s.type,h=[];switch(s.type){case Rt.MOVE_TO:this.pathM(r,h);break;case Rt.LINE_TO:o=this.pathL(r,h);break;case Rt.HORIZ_LINE_TO:o=this.pathH(r,h);break;case Rt.VERT_LINE_TO:o=this.pathV(r,h);break;case Rt.CURVE_TO:this.pathC(r,h);break;case Rt.SMOOTH_CURVE_TO:o=this.pathS(r,h);break;case Rt.QUAD_TO:this.pathQ(r,h);break;case Rt.SMOOTH_QUAD_TO:o=this.pathT(r,h);break;case Rt.ARC:h=this.pathA(r);break;case Rt.CLOSE_PATH:It.pathZ(r)}s.type!==Rt.CLOSE_PATH?e.push({type:o,points:h,start:{x:n,y:a},pathLength:this.calcLength(n,a,o,h)}):e.push({type:Rt.CLOSE_PATH,points:[],pathLength:0})}return e}pathM(t,e){var{x:r,y:i}=It.pathM(t).point;e.push(r,i)}pathL(t,e){var{x:r,y:i}=It.pathL(t).point;return e.push(r,i),Rt.LINE_TO}pathH(t,e){var{x:r,y:i}=It.pathH(t).point;return e.push(r,i),Rt.LINE_TO}pathV(t,e){var{x:r,y:i}=It.pathV(t).point;return e.push(r,i),Rt.LINE_TO}pathC(t,e){var{point:r,controlPoint:i,currentPoint:n}=It.pathC(t);e.push(r.x,r.y,i.x,i.y,n.x,n.y)}pathS(t,e){var{point:r,controlPoint:i,currentPoint:n}=It.pathS(t);return e.push(r.x,r.y,i.x,i.y,n.x,n.y),Rt.CURVE_TO}pathQ(t,e){var{controlPoint:r,currentPoint:i}=It.pathQ(t);e.push(r.x,r.y,i.x,i.y)}pathT(t,e){var{controlPoint:r,currentPoint:i}=It.pathT(t);return e.push(r.x,r.y,i.x,i.y),Rt.QUAD_TO}pathA(t){var{rX:e,rY:r,sweepFlag:i,xAxisRotation:n,centp:a,a1:s,ad:o}=It.pathA(t);return 0===i&&o>0&&(o-=2*Math.PI),1===i&&o<0&&(o+=2*Math.PI),[a.x,a.y,e,r,s,o,n,i]}calcLength(t,e,r,i){var n=0,a=null,s=null,o=0;switch(r){case Rt.LINE_TO:return this.getLineLength(t,e,i[0],i[1]);case Rt.CURVE_TO:for(n=0,a=this.getPointOnCubicBezier(0,t,e,i[0],i[1],i[2],i[3],i[4],i[5]),o=.01;o<=1;o+=.01)s=this.getPointOnCubicBezier(o,t,e,i[0],i[1],i[2],i[3],i[4],i[5]),n+=this.getLineLength(a.x,a.y,s.x,s.y),a=s;return n;case Rt.QUAD_TO:for(n=0,a=this.getPointOnQuadraticBezier(0,t,e,i[0],i[1],i[2],i[3]),o=.01;o<=1;o+=.01)s=this.getPointOnQuadraticBezier(o,t,e,i[0],i[1],i[2],i[3]),n+=this.getLineLength(a.x,a.y,s.x,s.y),a=s;return n;case Rt.ARC:n=0;var h=i[4],u=i[5],l=i[4]+u,c=Math.PI/180;if(Math.abs(h-l)<c&&(c=Math.abs(h-l)),a=this.getPointOnEllipticalArc(i[0],i[1],i[2],i[3],h,0),u<0)for(o=h-c;o>l;o-=c)s=this.getPointOnEllipticalArc(i[0],i[1],i[2],i[3],o,0),n+=this.getLineLength(a.x,a.y,s.x,s.y),a=s;else for(o=h+c;o<l;o+=c)s=this.getPointOnEllipticalArc(i[0],i[1],i[2],i[3],o,0),n+=this.getLineLength(a.x,a.y,s.x,s.y),a=s;return s=this.getPointOnEllipticalArc(i[0],i[1],i[2],i[3],l,0),n+this.getLineLength(a.x,a.y,s.x,s.y)}return 0}getPointOnLine(t,e,r,i,n){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:e,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:r,o=(n-r)/(i-e+Z),h=Math.sqrt(t*t/(1+o*o));i<e&&(h*=-1);var u=o*h,l=null;if(i===e)l={x:a,y:s+u};else if((s-r)/(a-e+Z)===o)l={x:a+h,y:s+u};else{var c,g,f=this.getLineLength(e,r,i,n);if(f<Z)return null;var p=(a-e)*(i-e)+(s-r)*(n-r);c=e+(p/=f*f)*(i-e),g=r+p*(n-r);var d=this.getLineLength(a,s,c,g),v=Math.sqrt(t*t-d*d);h=Math.sqrt(v*v/(1+o*o)),i<e&&(h*=-1),l={x:c+h,y:g+(u=o*h)}}return l}getPointOnPath(t){var e=this.getPathLength(),r=0,i=null;if(t<-5e-5||t-5e-5>e)return null;var{dataArray:n}=this;for(var a of n){if(!a||!(a.pathLength<5e-5||r+a.pathLength+5e-5<t)){var s=t-r,o=0;switch(a.type){case Rt.LINE_TO:i=this.getPointOnLine(s,a.start.x,a.start.y,a.points[0],a.points[1],a.start.x,a.start.y);break;case Rt.ARC:var h=a.points[4],u=a.points[5],l=a.points[4]+u;if(o=h+s/a.pathLength*u,u<0&&o<l||u>=0&&o>l)break;i=this.getPointOnEllipticalArc(a.points[0],a.points[1],a.points[2],a.points[3],o,a.points[6]);break;case Rt.CURVE_TO:(o=s/a.pathLength)>1&&(o=1),i=this.getPointOnCubicBezier(o,a.start.x,a.start.y,a.points[0],a.points[1],a.points[2],a.points[3],a.points[4],a.points[5]);break;case Rt.QUAD_TO:(o=s/a.pathLength)>1&&(o=1),i=this.getPointOnQuadraticBezier(o,a.start.x,a.start.y,a.points[0],a.points[1],a.points[2],a.points[3])}if(i)return i;break}r+=a.pathLength}return null}getLineLength(t,e,r,i){return Math.sqrt((r-t)*(r-t)+(i-e)*(i-e))}getPathLength(){return-1===this.pathLength&&(this.pathLength=this.dataArray.reduce(((t,e)=>e.pathLength>0?t+e.pathLength:t),0)),this.pathLength}getPointOnCubicBezier(t,e,r,i,n,a,s,o,h){return{x:o*et(t)+a*rt(t)+i*it(t)+e*nt(t),y:h*et(t)+s*rt(t)+n*it(t)+r*nt(t)}}getPointOnQuadraticBezier(t,e,r,i,n,a,s){return{x:a*at(t)+i*st(t)+e*ot(t),y:s*at(t)+n*st(t)+r*ot(t)}}getPointOnEllipticalArc(t,e,r,i,n,a){var s=Math.cos(a),o=Math.sin(a),h=r*Math.cos(n),u=i*Math.sin(n);return{x:t+(h*s-u*o),y:e+(h*o+u*s)}}buildEquidistantCache(t,e){var r=this.getPathLength(),i=e||.25,n=t||r/100;if(!this.equidistantCache||this.equidistantCache.step!==n||this.equidistantCache.precision!==i){this.equidistantCache={step:n,precision:i,points:[]};for(var a=0,s=0;s<=r;s+=i){var o=this.getPointOnPath(s),h=this.getPointOnPath(s+i);o&&h&&(a+=this.getLineLength(o.x,o.y,h.x,h.y))>=n&&(this.equidistantCache.points.push({x:o.x,y:o.y,distance:s}),a-=n)}}}getEquidistantPointOnPath(t,e,r){if(this.buildEquidistantCache(e,r),t<0||t-this.getPathLength()>5e-5)return null;var i=Math.round(t/this.getPathLength()*(this.equidistantCache.points.length-1));return this.equidistantCache.points[i]||null}}var ge=/^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;class fe extends kt{constructor(t,e,r){super(t,e,r),this.type="image",this.loaded=!1;var i=this.getHrefAttribute().getString();if(i){var n=i.endsWith(".svg")||/^\s*data:image\/svg\+xml/i.test(i);t.images.push(this),n?this.loadSvg(i):this.loadImage(i),this.isSvg=n}}loadImage(t){var e=this;return n((function*(){try{var r=yield e.document.createImage(t);e.image=r}catch(e){console.error('Error while loading image "'.concat(t,'":'),e)}e.loaded=!0}))()}loadSvg(t){var e=this;return n((function*(){var r=ge.exec(t);if(r){var i=r[5];"base64"===r[4]?e.image=atob(i):e.image=decodeURIComponent(i)}else try{var n=yield e.document.fetch(t),a=yield n.text();e.image=a}catch(e){console.error('Error while loading image "'.concat(t,'":'),e)}e.loaded=!0}))()}renderChildren(t){var{document:e,image:r,loaded:i}=this,n=this.getAttribute("x").getPixels("x"),a=this.getAttribute("y").getPixels("y"),s=this.getStyle("width").getPixels("x"),o=this.getStyle("height").getPixels("y");if(i&&r&&s&&o){if(t.save(),t.translate(n,a),this.isSvg){var h=e.canvg.forkString(t,this.image,{ignoreMouse:!0,ignoreAnimation:!0,ignoreDimensions:!0,ignoreClear:!0,offsetX:0,offsetY:0,scaleWidth:s,scaleHeight:o});h.document.documentElement.parent=this,h.render()}else{var u=this.image;e.setViewBox({ctx:t,aspectRatio:this.getAttribute("preserveAspectRatio").getString(),width:s,desiredWidth:u.width,height:o,desiredHeight:u.height}),this.loaded&&(void 0===u.complete||u.complete)&&t.drawImage(u,0,0)}t.restore()}}getBoundingBox(){var t=this.getAttribute("x").getPixels("x"),e=this.getAttribute("y").getPixels("y"),r=this.getStyle("width").getPixels("x"),i=this.getStyle("height").getPixels("y");return new _t(t,e,t+r,e+i)}}class pe extends kt{constructor(){super(...arguments),this.type="symbol"}render(t){}}class de{constructor(t){this.document=t,this.loaded=!1,t.fonts.push(this)}load(t,e){var r=this;return n((function*(){try{var{document:i}=r,n=(yield i.canvg.parser.load(e)).getElementsByTagName("font");Array.from(n).forEach((e=>{var r=i.createElement(e);i.definitions[t]=r}))}catch(t){console.error('Error while loading font "'.concat(e,'":'),t)}r.loaded=!0}))()}}class ve extends Ot{constructor(t,e,r){super(t,e,r),this.type="style";var i=k(Array.from(e.childNodes).map((t=>t.textContent)).join("").replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm,"").replace(/@import.*;/g,""));i.split("}").forEach((e=>{var r=e.trim();if(r){var i=r.split("{"),n=i[0].split(","),a=i[1].split(";");n.forEach((e=>{var r=e.trim();if(r){var i=t.styles[r]||{};if(a.forEach((e=>{var r=e.indexOf(":"),n=e.substr(0,r).trim(),a=e.substr(r+1,e.length-r).trim();n&&a&&(i[n]=new ht(t,n,a))})),t.styles[r]=i,t.stylesSpecificity[r]=$(r),"@font-face"===r){var n=i["font-family"].getString().replace(/"|'/g,"");i.src.getString().split(",").forEach((e=>{if(e.indexOf('format("svg")')>0){var r=U(e);r&&new de(t).load(n,r)}}))}}}))}}))}}ve.parseExternalUrl=U;class ye extends kt{constructor(){super(...arguments),this.type="use"}setContext(t){super.setContext(t);var e=this.getAttribute("x"),r=this.getAttribute("y");e.hasValue()&&t.translate(e.getPixels("x"),0),r.hasValue()&&t.translate(0,r.getPixels("y"))}path(t){var{element:e}=this;e&&e.path(t)}renderChildren(t){var{document:e,element:r}=this;if(r){var i=r;if("symbol"===r.type&&((i=new Ut(e,null)).attributes.viewBox=new ht(e,"viewBox",r.getAttribute("viewBox").getString()),i.attributes.preserveAspectRatio=new ht(e,"preserveAspectRatio",r.getAttribute("preserveAspectRatio").getString()),i.attributes.overflow=new ht(e,"overflow",r.getAttribute("overflow").getString()),i.children=r.children,r.styles.opacity=new ht(e,"opacity",this.calculateOpacity())),"svg"===i.type){var n=this.getStyle("width",!1,!0),a=this.getStyle("height",!1,!0);n.hasValue()&&(i.attributes.width=new ht(e,"width",n.getString())),a.hasValue()&&(i.attributes.height=new ht(e,"height",a.getString()))}var s=i.parent;i.parent=this,i.render(t),i.parent=s}}getBoundingBox(t){var{element:e}=this;return e?e.getBoundingBox(t):null}elementTransform(){var{document:t,element:e}=this;return Ct.fromElement(t,e)}get element(){return this.cachedElement||(this.cachedElement=this.getHrefAttribute().getDefinition()),this.cachedElement}}function me(t,e,r,i,n,a){return t[r*i*4+4*e+a]}function xe(t,e,r,i,n,a,s){t[r*i*4+4*e+a]=s}function be(t,e,r){return t[e]*r}function Se(t,e,r,i){return e+Math.cos(t)*r+Math.sin(t)*i}class we extends Ot{constructor(t,e,r){super(t,e,r),this.type="feColorMatrix";var i=D(this.getAttribute("values").getString());switch(this.getAttribute("type").getString("matrix")){case"saturate":var n=i[0];i=[.213+.787*n,.715-.715*n,.072-.072*n,0,0,.213-.213*n,.715+.285*n,.072-.072*n,0,0,.213-.213*n,.715-.715*n,.072+.928*n,0,0,0,0,0,1,0,0,0,0,0,1];break;case"hueRotate":var a=i[0]*Math.PI/180;i=[Se(a,.213,.787,-.213),Se(a,.715,-.715,-.715),Se(a,.072,-.072,.928),0,0,Se(a,.213,-.213,.143),Se(a,.715,.285,.14),Se(a,.072,-.072,-.283),0,0,Se(a,.213,-.213,-.787),Se(a,.715,-.715,.715),Se(a,.072,.928,.072),0,0,0,0,0,1,0,0,0,0,0,1];break;case"luminanceToAlpha":i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.2125,.7154,.0721,0,0,0,0,0,0,1]}this.matrix=i,this.includeOpacity=this.getAttribute("includeOpacity").hasValue()}apply(t,e,r,i,n){for(var{includeOpacity:a,matrix:s}=this,o=t.getImageData(0,0,i,n),h=0;h<n;h++)for(var u=0;u<i;u++){var l=me(o.data,u,h,i,0,0),c=me(o.data,u,h,i,0,1),g=me(o.data,u,h,i,0,2),f=me(o.data,u,h,i,0,3),p=be(s,0,l)+be(s,1,c)+be(s,2,g)+be(s,3,f)+be(s,4,1),d=be(s,5,l)+be(s,6,c)+be(s,7,g)+be(s,8,f)+be(s,9,1),v=be(s,10,l)+be(s,11,c)+be(s,12,g)+be(s,13,f)+be(s,14,1),y=be(s,15,l)+be(s,16,c)+be(s,17,g)+be(s,18,f)+be(s,19,1);a&&(p=0,d=0,v=0,y*=f/255),xe(o.data,u,h,i,0,0,p),xe(o.data,u,h,i,0,1,d),xe(o.data,u,h,i,0,2,v),xe(o.data,u,h,i,0,3,y)}t.clearRect(0,0,i,n),t.putImageData(o,0,0)}}class Te extends Ot{constructor(){super(...arguments),this.type="mask"}apply(t,e){var{document:r}=this,i=this.getAttribute("x").getPixels("x"),n=this.getAttribute("y").getPixels("y"),a=this.getStyle("width").getPixels("x"),s=this.getStyle("height").getPixels("y");if(!a&&!s){var o=new _t;this.children.forEach((e=>{o.addBoundingBox(e.getBoundingBox(t))})),i=Math.floor(o.x1),n=Math.floor(o.y1),a=Math.floor(o.width),s=Math.floor(o.height)}var h=this.removeStyles(e,Te.ignoreStyles),u=r.createCanvas(i+a,n+s),l=u.getContext("2d");r.screen.setDefaults(l),this.renderChildren(l),new we(r,{nodeType:1,childNodes:[],attributes:[{nodeName:"type",value:"luminanceToAlpha"},{nodeName:"includeOpacity",value:"true"}]}).apply(l,0,0,i+a,n+s);var c=r.createCanvas(i+a,n+s),g=c.getContext("2d");r.screen.setDefaults(g),e.render(g),g.globalCompositeOperation="destination-in",g.fillStyle=l.createPattern(u,"no-repeat"),g.fillRect(0,0,i+a,n+s),t.fillStyle=g.createPattern(c,"no-repeat"),t.fillRect(0,0,i+a,n+s),this.restoreStyles(e,h)}render(t){}}Te.ignoreStyles=["mask","transform","clip-path"];var Ae=()=>{};class Ce extends Ot{constructor(){super(...arguments),this.type="clipPath"}apply(t){var{document:e}=this,r=Reflect.getPrototypeOf(t),{beginPath:i,closePath:n}=t;r&&(r.beginPath=Ae,r.closePath=Ae),Reflect.apply(i,t,[]),this.children.forEach((i=>{if(void 0!==i.path){var a=void 0!==i.elementTransform?i.elementTransform():null;a||(a=Ct.fromElement(e,i)),a&&a.apply(t),i.path(t),r&&(r.closePath=n),a&&a.unapply(t)}})),Reflect.apply(n,t,[]),t.clip(),r&&(r.beginPath=i,r.closePath=n)}render(t){}}class Oe extends Ot{constructor(){super(...arguments),this.type="filter"}apply(t,e){var{document:r,children:i}=this,n=e.getBoundingBox(t);if(n){var a=0,s=0;i.forEach((t=>{var e=t.extraFilterDistance||0;a=Math.max(a,e),s=Math.max(s,e)}));var o=Math.floor(n.width),h=Math.floor(n.height),u=o+2*a,l=h+2*s;if(!(u<1||l<1)){var c=Math.floor(n.x),g=Math.floor(n.y),f=this.removeStyles(e,Oe.ignoreStyles),p=r.createCanvas(u,l),d=p.getContext("2d");r.screen.setDefaults(d),d.translate(-c+a,-g+s),e.render(d),i.forEach((t=>{"function"==typeof t.apply&&t.apply(d,0,0,u,l)})),t.drawImage(p,0,0,u,l,c-a,g-s,u,l),this.restoreStyles(e,f)}}}render(t){}}Oe.ignoreStyles=["filter","transform","clip-path"];class Pe extends Ot{constructor(t,e,r){super(t,e,r),this.type="feDropShadow",this.addStylesFromStyleDefinition()}apply(t,e,r,i,n){}}class Ee extends Ot{constructor(){super(...arguments),this.type="feMorphology"}apply(t,e,r,i,n){}}class Me extends Ot{constructor(){super(...arguments),this.type="feComposite"}apply(t,e,r,i,n){}}class Ne extends Ot{constructor(t,e,r){super(t,e,r),this.type="feGaussianBlur",this.blurRadius=Math.floor(this.getAttribute("stdDeviation").getNumber()),this.extraFilterDistance=this.blurRadius}apply(t,e,r,i,n){var{document:a,blurRadius:s}=this,o=a.window?a.window.document.body:null,h=t.canvas;h.id=a.getUniqueId(),o&&(h.style.display="none",o.appendChild(h)),V(h,e,r,i,n,s),o&&o.removeChild(h)}}class Ve extends Ot{constructor(){super(...arguments),this.type="title"}}class _e extends Ot{constructor(){super(...arguments),this.type="desc"}}var Re={svg:Ut,rect:Ft,circle:Ht,ellipse:Xt,line:jt,polyline:Yt,polygon:qt,path:It,pattern:Wt,marker:Gt,defs:Qt,linearGradient:Kt,radialGradient:Jt,stop:te,animate:ee,animateColor:re,animateTransform:ie,font:ne,"font-face":ae,"missing-glyph":se,glyph:Lt,text:Dt,tspan:Bt,tref:oe,a:he,textPath:ce,image:fe,g:$t,symbol:pe,style:ve,use:ye,mask:Te,clipPath:Ce,filter:Oe,feDropShadow:Pe,feMorphology:Ee,feComposite:Me,feColorMatrix:we,feGaussianBlur:Ne,title:Ve,desc:_e};function ke(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function Ie(){return Ie=n((function*(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=document.createElement("img");return e&&(r.crossOrigin="Anonymous"),new Promise(((e,i)=>{r.onload=()=>{e(r)},r.onerror=(t,e,r,n,a)=>{i(a)},r.src=t}))})),Ie.apply(this,arguments)}class Le{constructor(t){var{rootEmSize:e=12,emSize:r=12,createCanvas:i=Le.createCanvas,createImage:n=Le.createImage,anonymousCrossOrigin:a}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.canvg=t,this.definitions={},this.styles={},this.stylesSpecificity={},this.images=[],this.fonts=[],this.emSizeStack=[],this.uniqueId=0,this.screen=t.screen,this.rootEmSize=e,this.emSize=r,this.createCanvas=i,this.createImage=this.bindCreateImage(n,a),this.screen.wait(this.isImagesLoaded.bind(this)),this.screen.wait(this.isFontsLoaded.bind(this))}bindCreateImage(t,e){return"boolean"==typeof e?(r,i)=>t(r,"boolean"==typeof i?i:e):t}get window(){return this.screen.window}get fetch(){return this.screen.fetch}get ctx(){return this.screen.ctx}get emSize(){var{emSizeStack:t}=this;return t[t.length-1]}set emSize(t){var{emSizeStack:e}=this;e.push(t)}popEmSize(){var{emSizeStack:t}=this;t.pop()}getUniqueId(){return"canvg".concat(++this.uniqueId)}isImagesLoaded(){return this.images.every((t=>t.loaded))}isFontsLoaded(){return this.fonts.every((t=>t.loaded))}createDocumentElement(t){var e=this.createElement(t.documentElement);return e.root=!0,e.addStylesFromStyleDefinition(),this.documentElement=e,e}createElement(t){var e=t.nodeName.replace(/^[^:]+:/,""),r=Le.elementTypes[e];return void 0!==r?new r(this,t):new Pt(this,t)}createTextNode(t){return new zt(this,t)}setViewBox(t){this.screen.setViewBox(function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ke(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ke(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({document:this},t))}}function De(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function Be(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?De(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):De(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}Le.createCanvas=function(t,e){var r=document.createElement("canvas");return r.width=t,r.height=e,r},Le.createImage=function(t){return Ie.apply(this,arguments)},Le.elementTypes=Re;class ze{constructor(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.parser=new yt(r),this.screen=new pt(t,r),this.options=r;var i=new Le(this,r),n=i.createDocumentElement(e);this.document=i,this.documentElement=n}static from(t,e){var r=arguments;return n((function*(){var i=r.length>2&&void 0!==r[2]?r[2]:{},n=new yt(i),a=yield n.parse(e);return new ze(t,a,i)}))()}static fromString(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=new yt(r).parseFromString(e);return new ze(t,i,r)}fork(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return ze.from(t,e,Be(Be({},this.options),r))}forkString(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return ze.fromString(t,e,Be(Be({},this.options),r))}ready(){return this.screen.ready()}isReady(){return this.screen.isReady()}render(){var t=arguments,e=this;return n((function*(){var r=t.length>0&&void 0!==t[0]?t[0]:{};e.start(Be({enableRedraw:!0,ignoreAnimation:!0,ignoreMouse:!0},r)),yield e.ready(),e.stop()}))()}start(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{documentElement:e,screen:r,options:i}=this;r.start(e,Be(Be({enableRedraw:!0},i),t))}stop(){this.screen.stop()}resize(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.documentElement.resize(t,e,r)}}}}]);
>>>>>>> 0497027e1cad0210109f891995f7ac260d8c6e2e
