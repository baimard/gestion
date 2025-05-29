(self["webpackChunkgestion"] = self["webpackChunkgestion"] || []).push([[14],{

/***/ 73500:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = exports.dC = __webpack_unused_export__ = __webpack_unused_export__ = void 0;
__webpack_unused_export__ = getAppRootUrl;
__webpack_unused_export__ = getRootUrl;
__webpack_unused_export__ = __webpack_unused_export__ = void 0;
__webpack_require__(40173);
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
exports.dC = generateRemoteUrl;
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

/***/ 85914:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/base64 v1.0.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '1.0.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return base64;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));


/***/ }),

/***/ 66067:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
	var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(codePoint) {
		return '&#x' + codePoint.toString(16).toUpperCase() + ';';
	};

	var decEscape = function(codePoint) {
		return '&#' + codePoint + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		var escapeCodePoint = options.decimal ? decEscape : hexEscape;

		var escapeBmpSymbol = function(symbol) {
			return escapeCodePoint(symbol.charCodeAt(0));
		};

		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return escapeBmpSymbol(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, escapeBmpSymbol);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false,
		'decimal' : false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
			var codePoint;
			var semicolon;
			var decDigits;
			var hexDigits;
			var reference;
			var next;

			if ($1) {
				reference = $1;
				// Note: there is no need to check `has(decodeMap, reference)`.
				return decodeMap[reference];
			}

			if ($2) {
				// Decode named character references without trailing `;`, e.g. `&amp`.
				// This is only a parse error if it gets converted to `&`, or if it is
				// followed by `=` in an attribute context.
				reference = $2;
				next = $3;
				if (next && options.isAttributeValue) {
					if (strict && next == '=') {
						parseError('`&` did not start a character reference');
					}
					return $0;
				} else {
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					// Note: there is no need to check `has(decodeMapLegacy, reference)`.
					return decodeMapLegacy[reference] + (next || '');
				}
			}

			if ($4) {
				// Decode decimal escapes, e.g. `&#119558;`.
				decDigits = $4;
				semicolon = $5;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(decDigits, 10);
				return codePointToSymbol(codePoint, strict);
			}

			if ($6) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $6;
				semicolon = $7;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}

			// If we’re still here, `if ($7)` is implied; it’s an ambiguous
			// ampersand for sure. https://mths.be/notes/ambiguous-ampersands
			if (strict) {
				parseError(
					'named character reference was not terminated by a semicolon'
				);
			}
			return $0;
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '1.2.0',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return he;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));


/***/ }),

/***/ 61014:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ vi)
});

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(85471);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/DialogBase-aNq6aLpb.mjs + 2 modules
var DialogBase_aNq6aLpb = __webpack_require__(71712);
// EXTERNAL MODULE: ./node_modules/@nextcloud/event-bus/node_modules/semver/functions/valid.js
var valid = __webpack_require__(38711);
// EXTERNAL MODULE: ./node_modules/@nextcloud/event-bus/node_modules/semver/functions/major.js
var major = __webpack_require__(38064);
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
var dist = __webpack_require__(53529);
// EXTERNAL MODULE: ./node_modules/@nextcloud/l10n/dist/index.mjs
var l10n_dist = __webpack_require__(53334);
// EXTERNAL MODULE: ./node_modules/path/path.js
var path = __webpack_require__(43627);
// EXTERNAL MODULE: ./node_modules/@nextcloud/files/node_modules/@nextcloud/router/dist/index.js
var router_dist = __webpack_require__(73500);
;// CONCATENATED MODULE: ./node_modules/webdav/dist/web/index.js
/*! For license information please see index.js.LICENSE.txt */
var t={2:t=>{function e(t,e,o){t instanceof RegExp&&(t=n(t,o)),e instanceof RegExp&&(e=n(e,o));var i=r(t,e,o);return i&&{start:i[0],end:i[1],pre:o.slice(0,i[0]),body:o.slice(i[0]+t.length,i[1]),post:o.slice(i[1]+e.length)}}function n(t,e){var n=e.match(t);return n?n[0]:null}function r(t,e,n){var r,o,i,s,a,c=n.indexOf(t),u=n.indexOf(e,c+1),l=c;if(c>=0&&u>0){for(r=[],i=n.length;l>=0&&!a;)l==c?(r.push(l),c=n.indexOf(t,l+1)):1==r.length?a=[r.pop(),u]:((o=r.pop())<i&&(i=o,s=u),u=n.indexOf(e,l+1)),l=c<u&&c>=0?c:u;r.length&&(a=[i,s])}return a}t.exports=e,e.range=r},101:function(t,e,n){var r;t=n.nmd(t),function(o){var i=(t&&t.exports,"object"==typeof global&&global);i.global!==i&&i.window;var s=function(t){this.message=t};(s.prototype=new Error).name="InvalidCharacterError";var a=function(t){throw new s(t)},c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=/[\t\n\f\r ]/g,l={encode:function(t){t=String(t),/[^\0-\xFF]/.test(t)&&a("The string to be encoded contains characters outside of the Latin1 range.");for(var e,n,r,o,i=t.length%3,s="",u=-1,l=t.length-i;++u<l;)e=t.charCodeAt(u)<<16,n=t.charCodeAt(++u)<<8,r=t.charCodeAt(++u),s+=c.charAt((o=e+n+r)>>18&63)+c.charAt(o>>12&63)+c.charAt(o>>6&63)+c.charAt(63&o);return 2==i?(e=t.charCodeAt(u)<<8,n=t.charCodeAt(++u),s+=c.charAt((o=e+n)>>10)+c.charAt(o>>4&63)+c.charAt(o<<2&63)+"="):1==i&&(o=t.charCodeAt(u),s+=c.charAt(o>>2)+c.charAt(o<<4&63)+"=="),s},decode:function(t){var e=(t=String(t).replace(u,"")).length;e%4==0&&(e=(t=t.replace(/==?$/,"")).length),(e%4==1||/[^+a-zA-Z0-9/]/.test(t))&&a("Invalid character: the string to be decoded is not correctly encoded.");for(var n,r,o=0,i="",s=-1;++s<e;)r=c.indexOf(t.charAt(s)),n=o%4?64*n+r:r,o++%4&&(i+=String.fromCharCode(255&n>>(-2*o&6)));return i},version:"1.0.0"};void 0===(r=function(){return l}.call(e,n,e,t))||(t.exports=r)}()},172:(t,e)=>{e.d=function(t){if(!t)return 0;for(var e=(t=t.toString()).length,n=t.length;n--;){var r=t.charCodeAt(n);56320<=r&&r<=57343&&n--,127<r&&r<=2047?e++:2047<r&&r<=65535&&(e+=2)}return e}},526:t=>{var e={utf8:{stringToBytes:function(t){return e.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(e.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e},bytesToString:function(t){for(var e=[],n=0;n<t.length;n++)e.push(String.fromCharCode(t[n]));return e.join("")}}};t.exports=e},298:t=>{var e,n;e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&n.rotl(t,8)|4278255360&n.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=n.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],n=0,r=0;n<t.length;n++,r+=8)e[r>>>5]|=t[n]<<24-r%32;return e},wordsToBytes:function(t){for(var e=[],n=0;n<32*t.length;n+=8)e.push(t[n>>>5]>>>24-n%32&255);return e},bytesToHex:function(t){for(var e=[],n=0;n<t.length;n++)e.push((t[n]>>>4).toString(16)),e.push((15&t[n]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],n=0;n<t.length;n+=2)e.push(parseInt(t.substr(n,2),16));return e},bytesToBase64:function(t){for(var n=[],r=0;r<t.length;r+=3)for(var o=t[r]<<16|t[r+1]<<8|t[r+2],i=0;i<4;i++)8*r+6*i<=8*t.length?n.push(e.charAt(o>>>6*(3-i)&63)):n.push("=");return n.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],r=0,o=0;r<t.length;o=++r%4)0!=o&&n.push((e.indexOf(t.charAt(r-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(t.charAt(r))>>>6-2*o);return n}},t.exports=n},635:(t,e,n)=>{const r=n(31),o=n(338),i=n(221);t.exports={XMLParser:o,XMLValidator:r,XMLBuilder:i}},705:(t,e)=>{const n=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",r="["+n+"]["+n+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",o=new RegExp("^"+r+"$");e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(t,e,n){if(e){const r=Object.keys(e),o=r.length;for(let i=0;i<o;i++)t[r[i]]="strict"===n?[e[r[i]]]:e[r[i]]}},e.getValue=function(t){return e.isExist(t)?t:""},e.isName=function(t){return!(null==o.exec(t))},e.getAllMatches=function(t,e){const n=[];let r=e.exec(t);for(;r;){const o=[];o.startIndex=e.lastIndex-r[0].length;const i=r.length;for(let t=0;t<i;t++)o.push(r[t]);n.push(o),r=e.exec(t)}return n},e.nameRegexp=r},31:(t,e,n)=>{const r=n(705),o={allowBooleanAttributes:!1,unpairedTags:[]};function i(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function s(t,e){const n=e;for(;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{const r=t.substr(n,e-n);if(e>5&&"xml"===r)return d("InvalidXml","XML declaration allowed only at the start of the document.",m(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function a(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let n=1;for(e+=8;e<t.length;e++)if("<"===t[e])n++;else if(">"===t[e]&&(n--,0===n))break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}e.validate=function(t,e){e=Object.assign({},o,e);const n=[];let c=!1,u=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(let o=0;o<t.length;o++)if("<"===t[o]&&"?"===t[o+1]){if(o+=2,o=s(t,o),o.err)return o}else{if("<"!==t[o]){if(i(t[o]))continue;return d("InvalidChar","char '"+t[o]+"' is not expected.",m(t,o))}{let g=o;if(o++,"!"===t[o]){o=a(t,o);continue}{let v=!1;"/"===t[o]&&(v=!0,o++);let y="";for(;o<t.length&&">"!==t[o]&&" "!==t[o]&&"\t"!==t[o]&&"\n"!==t[o]&&"\r"!==t[o];o++)y+=t[o];if(y=y.trim(),"/"===y[y.length-1]&&(y=y.substring(0,y.length-1),o--),h=y,!r.isName(h)){let e;return e=0===y.trim().length?"Invalid space after '<'.":"Tag '"+y+"' is an invalid name.",d("InvalidTag",e,m(t,o))}const b=l(t,o);if(!1===b)return d("InvalidAttr","Attributes for '"+y+"' have open quote.",m(t,o));let w=b.value;if(o=b.index,"/"===w[w.length-1]){const n=o-w.length;w=w.substring(0,w.length-1);const r=f(w,e);if(!0!==r)return d(r.err.code,r.err.msg,m(t,n+r.err.line));c=!0}else if(v){if(!b.tagClosed)return d("InvalidTag","Closing tag '"+y+"' doesn't have proper closing.",m(t,o));if(w.trim().length>0)return d("InvalidTag","Closing tag '"+y+"' can't have attributes or invalid starting.",m(t,g));{const e=n.pop();if(y!==e.tagName){let n=m(t,e.tagStartPos);return d("InvalidTag","Expected closing tag '"+e.tagName+"' (opened in line "+n.line+", col "+n.col+") instead of closing tag '"+y+"'.",m(t,g))}0==n.length&&(u=!0)}}else{const r=f(w,e);if(!0!==r)return d(r.err.code,r.err.msg,m(t,o-w.length+r.err.line));if(!0===u)return d("InvalidXml","Multiple possible root nodes found.",m(t,o));-1!==e.unpairedTags.indexOf(y)||n.push({tagName:y,tagStartPos:g}),c=!0}for(o++;o<t.length;o++)if("<"===t[o]){if("!"===t[o+1]){o++,o=a(t,o);continue}if("?"!==t[o+1])break;if(o=s(t,++o),o.err)return o}else if("&"===t[o]){const e=p(t,o);if(-1==e)return d("InvalidChar","char '&' is not expected.",m(t,o));o=e}else if(!0===u&&!i(t[o]))return d("InvalidXml","Extra text at the end",m(t,o));"<"===t[o]&&o--}}}var h;return c?1==n.length?d("InvalidTag","Unclosed tag '"+n[0].tagName+"'.",m(t,n[0].tagStartPos)):!(n.length>0)||d("InvalidXml","Invalid '"+JSON.stringify(n.map((t=>t.tagName)),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):d("InvalidXml","Start tag expected.",1)};const c='"',u="'";function l(t,e){let n="",r="",o=!1;for(;e<t.length;e++){if(t[e]===c||t[e]===u)""===r?r=t[e]:r!==t[e]||(r="");else if(">"===t[e]&&""===r){o=!0;break}n+=t[e]}return""===r&&{value:n,index:e,tagClosed:o}}const h=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function f(t,e){const n=r.getAllMatches(t,h),o={};for(let t=0;t<n.length;t++){if(0===n[t][1].length)return d("InvalidAttr","Attribute '"+n[t][2]+"' has no space in starting.",v(n[t]));if(void 0!==n[t][3]&&void 0===n[t][4])return d("InvalidAttr","Attribute '"+n[t][2]+"' is without value.",v(n[t]));if(void 0===n[t][3]&&!e.allowBooleanAttributes)return d("InvalidAttr","boolean attribute '"+n[t][2]+"' is not allowed.",v(n[t]));const r=n[t][2];if(!g(r))return d("InvalidAttr","Attribute '"+r+"' is an invalid name.",v(n[t]));if(o.hasOwnProperty(r))return d("InvalidAttr","Attribute '"+r+"' is repeated.",v(n[t]));o[r]=1}return!0}function p(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let n=/\d/;for("x"===t[e]&&(e++,n=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(n))break}return-1}(t,++e);let n=0;for(;e<t.length;e++,n++)if(!(t[e].match(/\w/)&&n<20)){if(";"===t[e])break;return-1}return e}function d(t,e,n){return{err:{code:t,msg:e,line:n.line||n,col:n.col}}}function g(t){return r.isName(t)}function m(t,e){const n=t.substring(0,e).split(/\r?\n/);return{line:n.length,col:n[n.length-1].length+1}}function v(t){return t.startIndex+t[1].length}},221:(t,e,n)=>{const r=n(87),o={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function i(t){this.options=Object.assign({},o,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=c),this.processTextOrObjNode=s,this.options.format?(this.indentate=a,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function s(t,e,n){const r=this.j2x(t,n+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextValNode(t[this.options.textNodeName],e,r.attrStr,n):this.buildObjectNode(r.val,e,r.attrStr,n)}function a(t){return this.options.indentBy.repeat(t)}function c(t){return!(!t.startsWith(this.options.attributeNamePrefix)||t===this.options.textNodeName)&&t.substr(this.attrPrefixLen)}i.prototype.build=function(t){return this.options.preserveOrder?r(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0).val)},i.prototype.j2x=function(t,e){let n="",r="";for(let o in t)if(void 0===t[o])this.isAttribute(o)&&(r+="");else if(null===t[o])this.isAttribute(o)?r+="":"?"===o[0]?r+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:r+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if(t[o]instanceof Date)r+=this.buildTextValNode(t[o],o,"",e);else if("object"!=typeof t[o]){const i=this.isAttribute(o);if(i)n+=this.buildAttrPairStr(i,""+t[o]);else if(o===this.options.textNodeName){let e=this.options.tagValueProcessor(o,""+t[o]);r+=this.replaceEntitiesValue(e)}else r+=this.buildTextValNode(t[o],o,"",e)}else if(Array.isArray(t[o])){const n=t[o].length;let i="";for(let s=0;s<n;s++){const n=t[o][s];void 0===n||(null===n?"?"===o[0]?r+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:r+=this.indentate(e)+"<"+o+"/"+this.tagEndChar:"object"==typeof n?this.options.oneListGroup?i+=this.j2x(n,e+1).val:i+=this.processTextOrObjNode(n,o,e):i+=this.buildTextValNode(n,o,"",e))}this.options.oneListGroup&&(i=this.buildObjectNode(i,o,"",e)),r+=i}else if(this.options.attributesGroupName&&o===this.options.attributesGroupName){const e=Object.keys(t[o]),r=e.length;for(let i=0;i<r;i++)n+=this.buildAttrPairStr(e[i],""+t[o][e[i]])}else r+=this.processTextOrObjNode(t[o],o,e);return{attrStr:n,val:r}},i.prototype.buildAttrPairStr=function(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'},i.prototype.buildObjectNode=function(t,e,n,r){if(""===t)return"?"===e[0]?this.indentate(r)+"<"+e+n+"?"+this.tagEndChar:this.indentate(r)+"<"+e+n+this.closeTag(e)+this.tagEndChar;{let o="</"+e+this.tagEndChar,i="";return"?"===e[0]&&(i="?",o=""),!n&&""!==n||-1!==t.indexOf("<")?!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===i.length?this.indentate(r)+"\x3c!--".concat(t,"--\x3e")+this.newLine:this.indentate(r)+"<"+e+n+i+this.tagEndChar+t+this.indentate(r)+o:this.indentate(r)+"<"+e+n+i+">"+t+o}},i.prototype.closeTag=function(t){let e="";return-1!==this.options.unpairedTags.indexOf(t)?this.options.suppressUnpairedNode||(e="/"):e=this.options.suppressEmptyNode?"/":"></".concat(t),e},i.prototype.buildTextValNode=function(t,e,n,r){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(r)+"<![CDATA[".concat(t,"]]>")+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(r)+"\x3c!--".concat(t,"--\x3e")+this.newLine;if("?"===e[0])return this.indentate(r)+"<"+e+n+"?"+this.tagEndChar;{let o=this.options.tagValueProcessor(e,t);return o=this.replaceEntitiesValue(o),""===o?this.indentate(r)+"<"+e+n+this.closeTag(e)+this.tagEndChar:this.indentate(r)+"<"+e+n+">"+o+"</"+e+this.tagEndChar}},i.prototype.replaceEntitiesValue=function(t){if(t&&t.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){const n=this.options.entities[e];t=t.replace(n.regex,n.val)}return t},t.exports=i},87:t=>{function e(t,s,a,c){let u="",l=!1;for(let h=0;h<t.length;h++){const f=t[h],p=n(f);let d="";if(d=0===a.length?p:"".concat(a,".").concat(p),p===s.textNodeName){let t=f[p];o(d,s)||(t=s.tagValueProcessor(p,t),t=i(t,s)),l&&(u+=c),u+=t,l=!1;continue}if(p===s.cdataPropName){l&&(u+=c),u+="<![CDATA[".concat(f[p][0][s.textNodeName],"]]>"),l=!1;continue}if(p===s.commentPropName){u+=c+"\x3c!--".concat(f[p][0][s.textNodeName],"--\x3e"),l=!0;continue}if("?"===p[0]){const t=r(f[":@"],s),e="?xml"===p?"":c;let n=f[p][0][s.textNodeName];n=0!==n.length?" "+n:"",u+=e+"<".concat(p).concat(n).concat(t,"?>"),l=!0;continue}let g=c;""!==g&&(g+=s.indentBy);const m=r(f[":@"],s),v=c+"<".concat(p).concat(m),y=e(f[p],s,d,g);-1!==s.unpairedTags.indexOf(p)?s.suppressUnpairedNode?u+=v+">":u+=v+"/>":y&&0!==y.length||!s.suppressEmptyNode?y&&y.endsWith(">")?u+=v+">".concat(y).concat(c,"</").concat(p,">"):(u+=v+">",y&&""!==c&&(y.includes("/>")||y.includes("</"))?u+=c+s.indentBy+y+c:u+=y,u+="</".concat(p,">")):u+=v+"/>",l=!0}return u}function n(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const n=e[t];if(":@"!==n)return n}}function r(t,e){let n="";if(t&&!e.ignoreAttributes)for(let r in t){let o=e.attributeValueProcessor(r,t[r]);o=i(o,e),!0===o&&e.suppressBooleanAttributes?n+=" ".concat(r.substr(e.attributeNamePrefix.length)):n+=" ".concat(r.substr(e.attributeNamePrefix.length),'="').concat(o,'"')}return n}function o(t,e){let n=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(let r in e.stopNodes)if(e.stopNodes[r]===t||e.stopNodes[r]==="*."+n)return!0;return!1}function i(t,e){if(t&&t.length>0&&e.processEntities)for(let n=0;n<e.entities.length;n++){const r=e.entities[n];t=t.replace(r.regex,r.val)}return t}t.exports=function(t,n){let r="";return n.format&&n.indentBy.length>0&&(r="\n"),e(t,n,"",r)}},193:(t,e,n)=>{const r=n(705);function o(t,e){let n="";for(;e<t.length&&"'"!==t[e]&&'"'!==t[e];e++)n+=t[e];if(n=n.trim(),-1!==n.indexOf(" "))throw new Error("External entites are not supported");const r=t[e++];let o="";for(;e<t.length&&t[e]!==r;e++)o+=t[e];return[n,o,e]}function i(t,e){return"!"===t[e+1]&&"-"===t[e+2]&&"-"===t[e+3]}function s(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7]}function a(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8]}function c(t,e){return"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8]}function u(t,e){return"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9]}function l(t){if(r.isName(t))return t;throw new Error("Invalid entity name ".concat(t))}t.exports=function(t,e){const n={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");{e+=9;let r=1,h=!1,f=!1,p="";for(;e<t.length;e++)if("<"!==t[e]||f)if(">"===t[e]){if(f?"-"===t[e-1]&&"-"===t[e-2]&&(f=!1,r--):r--,0===r)break}else"["===t[e]?h=!0:p+=t[e];else{if(h&&s(t,e))e+=7,[entityName,val,e]=o(t,e+1),-1===val.indexOf("&")&&(n[l(entityName)]={regx:RegExp("&".concat(entityName,";"),"g"),val});else if(h&&a(t,e))e+=8;else if(h&&c(t,e))e+=8;else if(h&&u(t,e))e+=9;else{if(!i)throw new Error("Invalid DOCTYPE");f=!0}r++,p=""}if(0!==r)throw new Error("Unclosed DOCTYPE")}return{entities:n,i:e}}},63:(t,e)=>{const n={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(t,e,n){return t}};e.buildOptions=function(t){return Object.assign({},n,t)},e.defaultOptions=n},299:(t,e,n)=>{const r=n(705),o=n(365),i=n(193),s=n(494);function a(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const r=e[n];this.lastEntities[r]={regex:new RegExp("&"+r+";","g"),val:t[r]}}}function c(t,e,n,r,o,i,s){if(void 0!==t&&(this.options.trimValues&&!r&&(t=t.trim()),t.length>0)){s||(t=this.replaceEntitiesValue(t));const r=this.options.tagValueProcessor(e,t,n,o,i);return null==r?t:typeof r!=typeof t||r!==t?r:this.options.trimValues||t.trim()===t?w(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function u(t){if(this.options.removeNSPrefix){const e=t.split(":"),n="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=n+e[1])}return t}"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,r.nameRegexp);const l=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function h(t,e,n){if(!this.options.ignoreAttributes&&"string"==typeof t){const n=r.getAllMatches(t,l),o=n.length,i={};for(let t=0;t<o;t++){const r=this.resolveNameSpace(n[t][1]);let o=n[t][4],s=this.options.attributeNamePrefix+r;if(r.length)if(this.options.transformAttributeName&&(s=this.options.transformAttributeName(s)),"__proto__"===s&&(s="#__proto__"),void 0!==o){this.options.trimValues&&(o=o.trim()),o=this.replaceEntitiesValue(o);const t=this.options.attributeValueProcessor(r,o,e);i[s]=null==t?o:typeof t!=typeof o||t!==o?t:w(o,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(i[s]=!0)}if(!Object.keys(i).length)return;if(this.options.attributesGroupName){const t={};return t[this.options.attributesGroupName]=i,t}return i}}const f=function(t){t=t.replace(/\r\n?/g,"\n");const e=new o("!xml");let n=e,r="",s="";for(let a=0;a<t.length;a++)if("<"===t[a])if("/"===t[a+1]){const e=v(t,">",a,"Closing Tag is not closed.");let o=t.substring(a+2,e).trim();if(this.options.removeNSPrefix){const t=o.indexOf(":");-1!==t&&(o=o.substr(t+1))}this.options.transformTagName&&(o=this.options.transformTagName(o)),n&&(r=this.saveTextToParentTag(r,n,s));const i=s.substring(s.lastIndexOf(".")+1);if(o&&-1!==this.options.unpairedTags.indexOf(o))throw new Error("Unpaired tag can not be used as closing tag: </".concat(o,">"));let c=0;i&&-1!==this.options.unpairedTags.indexOf(i)?(c=s.lastIndexOf(".",s.lastIndexOf(".")-1),this.tagsNodeStack.pop()):c=s.lastIndexOf("."),s=s.substring(0,c),n=this.tagsNodeStack.pop(),r="",a=e}else if("?"===t[a+1]){let e=y(t,a,!1,"?>");if(!e)throw new Error("Pi Tag is not closed.");if(r=this.saveTextToParentTag(r,n,s),this.options.ignoreDeclaration&&"?xml"===e.tagName||this.options.ignorePiTags);else{const t=new o(e.tagName);t.add(this.options.textNodeName,""),e.tagName!==e.tagExp&&e.attrExpPresent&&(t[":@"]=this.buildAttributesMap(e.tagExp,s,e.tagName)),this.addChild(n,t,s)}a=e.closeIndex+1}else if("!--"===t.substr(a+1,3)){const e=v(t,"--\x3e",a+4,"Comment is not closed.");if(this.options.commentPropName){const o=t.substring(a+4,e-2);r=this.saveTextToParentTag(r,n,s),n.add(this.options.commentPropName,[{[this.options.textNodeName]:o}])}a=e}else if("!D"===t.substr(a+1,2)){const e=i(t,a);this.docTypeEntities=e.entities,a=e.i}else if("!["===t.substr(a+1,2)){const e=v(t,"]]>",a,"CDATA is not closed.")-2,o=t.substring(a+9,e);if(r=this.saveTextToParentTag(r,n,s),this.options.cdataPropName)n.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]);else{let t=this.parseTextData(o,n.tagname,s,!0,!1,!0);null==t&&(t=""),n.add(this.options.textNodeName,t)}a=e+2}else{let i=y(t,a,this.options.removeNSPrefix),c=i.tagName,u=i.tagExp,l=i.attrExpPresent,h=i.closeIndex;this.options.transformTagName&&(c=this.options.transformTagName(c)),n&&r&&"!xml"!==n.tagname&&(r=this.saveTextToParentTag(r,n,s,!1));const f=n;if(f&&-1!==this.options.unpairedTags.indexOf(f.tagname)&&(n=this.tagsNodeStack.pop(),s=s.substring(0,s.lastIndexOf("."))),c!==e.tagname&&(s+=s?"."+c:c),this.isItStopNode(this.options.stopNodes,s,c)){let e="";if(u.length>0&&u.lastIndexOf("/")===u.length-1)a=i.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(c))a=i.closeIndex;else{const n=this.readStopNodeData(t,c,h+1);if(!n)throw new Error("Unexpected end of ".concat(c));a=n.i,e=n.tagContent}const r=new o(c);c!==u&&l&&(r[":@"]=this.buildAttributesMap(u,s,c)),e&&(e=this.parseTextData(e,c,s,!0,l,!0,!0)),s=s.substr(0,s.lastIndexOf(".")),r.add(this.options.textNodeName,e),this.addChild(n,r,s)}else{if(u.length>0&&u.lastIndexOf("/")===u.length-1){"/"===c[c.length-1]?(c=c.substr(0,c.length-1),s=s.substr(0,s.length-1),u=c):u=u.substr(0,u.length-1),this.options.transformTagName&&(c=this.options.transformTagName(c));const t=new o(c);c!==u&&l&&(t[":@"]=this.buildAttributesMap(u,s,c)),this.addChild(n,t,s),s=s.substr(0,s.lastIndexOf("."))}else{const t=new o(c);this.tagsNodeStack.push(n),c!==u&&l&&(t[":@"]=this.buildAttributesMap(u,s,c)),this.addChild(n,t,s),n=t}r="",a=h}}else r+=t[a];return e.child};function p(t,e,n){const r=this.options.updateTag(e.tagname,n,e[":@"]);!1===r||("string"==typeof r?(e.tagname=r,t.addChild(e)):t.addChild(e))}const d=function(t){if(this.options.processEntities){for(let e in this.docTypeEntities){const n=this.docTypeEntities[e];t=t.replace(n.regx,n.val)}for(let e in this.lastEntities){const n=this.lastEntities[e];t=t.replace(n.regex,n.val)}if(this.options.htmlEntities)for(let e in this.htmlEntities){const n=this.htmlEntities[e];t=t.replace(n.regex,n.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function g(t,e,n,r){return t&&(void 0===r&&(r=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,n,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,r))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function m(t,e,n){const r="*."+n;for(const n in t){const o=t[n];if(r===o||e===o)return!0}return!1}function v(t,e,n,r){const o=t.indexOf(e,n);if(-1===o)throw new Error(r);return o+e.length-1}function y(t,e,n){const r=function(t,e){let n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:">",o="";for(let i=e;i<t.length;i++){let e=t[i];if(n)e===n&&(n="");else if('"'===e||"'"===e)n=e;else if(e===r[0]){if(!r[1])return{data:o,index:i};if(t[i+1]===r[1])return{data:o,index:i}}else"\t"===e&&(e=" ");o+=e}}(t,e+1,arguments.length>3&&void 0!==arguments[3]?arguments[3]:">");if(!r)return;let o=r.data;const i=r.index,s=o.search(/\s/);let a=o,c=!0;if(-1!==s&&(a=o.substr(0,s).replace(/\s\s*$/,""),o=o.substr(s+1)),n){const t=a.indexOf(":");-1!==t&&(a=a.substr(t+1),c=a!==r.data.substr(t+1))}return{tagName:a,tagExp:o,closeIndex:i,attrExpPresent:c}}function b(t,e,n){const r=n;let o=1;for(;n<t.length;n++)if("<"===t[n])if("/"===t[n+1]){const i=v(t,">",n,"".concat(e," is not closed"));if(t.substring(n+2,i).trim()===e&&(o--,0===o))return{tagContent:t.substring(r,n),i};n=i}else if("?"===t[n+1])n=v(t,"?>",n+1,"StopNode is not closed.");else if("!--"===t.substr(n+1,3))n=v(t,"--\x3e",n+3,"StopNode is not closed.");else if("!["===t.substr(n+1,2))n=v(t,"]]>",n,"StopNode is not closed.")-2;else{const r=y(t,n,">");r&&((r&&r.tagName)===e&&"/"!==r.tagExp[r.tagExp.length-1]&&o++,n=r.closeIndex)}}function w(t,e,n){if(e&&"string"==typeof t){const e=t.trim();return"true"===e||"false"!==e&&s(t,n)}return r.isExist(t)?t:""}t.exports=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=a,this.parseXml=f,this.parseTextData=c,this.resolveNameSpace=u,this.buildAttributesMap=h,this.isItStopNode=m,this.replaceEntitiesValue=d,this.readStopNodeData=b,this.saveTextToParentTag=g,this.addChild=p}}},338:(t,e,n)=>{const{buildOptions:r}=n(63),o=n(299),{prettify:i}=n(728),s=n(31);t.exports=class{constructor(t){this.externalEntities={},this.options=r(t)}parse(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});const n=s.validate(t,e);if(!0!==n)throw Error("".concat(n.err.msg,":").concat(n.err.line,":").concat(n.err.col))}const n=new o(this.options);n.addExternalEntities(this.externalEntities);const r=n.parseXml(t);return this.options.preserveOrder||void 0===r?r:i(r,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}}},728:(t,e)=>{function n(t,e,s){let a;const c={};for(let u=0;u<t.length;u++){const l=t[u],h=r(l);let f="";if(f=void 0===s?h:s+"."+h,h===e.textNodeName)void 0===a?a=l[h]:a+=""+l[h];else{if(void 0===h)continue;if(l[h]){let t=n(l[h],e,f);const r=i(t,e);l[":@"]?o(t,l[":@"],f,e):1!==Object.keys(t).length||void 0===t[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(t).length&&(e.alwaysCreateTextNode?t[e.textNodeName]="":t=""):t=t[e.textNodeName],void 0!==c[h]&&c.hasOwnProperty(h)?(Array.isArray(c[h])||(c[h]=[c[h]]),c[h].push(t)):e.isArray(h,f,r)?c[h]=[t]:c[h]=t}}}return"string"==typeof a?a.length>0&&(c[e.textNodeName]=a):void 0!==a&&(c[e.textNodeName]=a),c}function r(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const n=e[t];if(":@"!==n)return n}}function o(t,e,n,r){if(e){const o=Object.keys(e),i=o.length;for(let s=0;s<i;s++){const i=o[s];r.isArray(i,n+"."+i,!0,!0)?t[i]=[e[i]]:t[i]=e[i]}}}function i(t,e){const{textNodeName:n}=e,r=Object.keys(t).length;return 0===r||!(1!==r||!t[n]&&"boolean"!=typeof t[n]&&0!==t[n])}e.prettify=function(t,e){return n(t,e)}},365:t=>{t.exports=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){"__proto__"===t&&(t="#__proto__"),this.child.push({[t]:e})}addChild(t){"__proto__"===t.tagname&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}}},135:t=>{function e(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}t.exports=function(t){return null!=t&&(e(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&e(t.slice(0,0))}(t)||!!t._isBuffer)}},542:(t,e,n)=>{var r,o,i,s,a;r=n(298),o=n(526).utf8,i=n(135),s=n(526).bin,(a=function(t,e){t.constructor==String?t=e&&"binary"===e.encoding?s.stringToBytes(t):o.stringToBytes(t):i(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||t.constructor===Uint8Array||(t=t.toString());for(var n=r.bytesToWords(t),c=8*t.length,u=1732584193,l=-271733879,h=-1732584194,f=271733878,p=0;p<n.length;p++)n[p]=16711935&(n[p]<<8|n[p]>>>24)|4278255360&(n[p]<<24|n[p]>>>8);n[c>>>5]|=128<<c%32,n[14+(c+64>>>9<<4)]=c;var d=a._ff,g=a._gg,m=a._hh,v=a._ii;for(p=0;p<n.length;p+=16){var y=u,b=l,w=h,x=f;u=d(u,l,h,f,n[p+0],7,-680876936),f=d(f,u,l,h,n[p+1],12,-389564586),h=d(h,f,u,l,n[p+2],17,606105819),l=d(l,h,f,u,n[p+3],22,-1044525330),u=d(u,l,h,f,n[p+4],7,-176418897),f=d(f,u,l,h,n[p+5],12,1200080426),h=d(h,f,u,l,n[p+6],17,-1473231341),l=d(l,h,f,u,n[p+7],22,-45705983),u=d(u,l,h,f,n[p+8],7,1770035416),f=d(f,u,l,h,n[p+9],12,-1958414417),h=d(h,f,u,l,n[p+10],17,-42063),l=d(l,h,f,u,n[p+11],22,-1990404162),u=d(u,l,h,f,n[p+12],7,1804603682),f=d(f,u,l,h,n[p+13],12,-40341101),h=d(h,f,u,l,n[p+14],17,-1502002290),u=g(u,l=d(l,h,f,u,n[p+15],22,1236535329),h,f,n[p+1],5,-165796510),f=g(f,u,l,h,n[p+6],9,-1069501632),h=g(h,f,u,l,n[p+11],14,643717713),l=g(l,h,f,u,n[p+0],20,-373897302),u=g(u,l,h,f,n[p+5],5,-701558691),f=g(f,u,l,h,n[p+10],9,38016083),h=g(h,f,u,l,n[p+15],14,-660478335),l=g(l,h,f,u,n[p+4],20,-405537848),u=g(u,l,h,f,n[p+9],5,568446438),f=g(f,u,l,h,n[p+14],9,-1019803690),h=g(h,f,u,l,n[p+3],14,-187363961),l=g(l,h,f,u,n[p+8],20,1163531501),u=g(u,l,h,f,n[p+13],5,-1444681467),f=g(f,u,l,h,n[p+2],9,-51403784),h=g(h,f,u,l,n[p+7],14,1735328473),u=m(u,l=g(l,h,f,u,n[p+12],20,-1926607734),h,f,n[p+5],4,-378558),f=m(f,u,l,h,n[p+8],11,-2022574463),h=m(h,f,u,l,n[p+11],16,1839030562),l=m(l,h,f,u,n[p+14],23,-35309556),u=m(u,l,h,f,n[p+1],4,-1530992060),f=m(f,u,l,h,n[p+4],11,1272893353),h=m(h,f,u,l,n[p+7],16,-155497632),l=m(l,h,f,u,n[p+10],23,-1094730640),u=m(u,l,h,f,n[p+13],4,681279174),f=m(f,u,l,h,n[p+0],11,-358537222),h=m(h,f,u,l,n[p+3],16,-722521979),l=m(l,h,f,u,n[p+6],23,76029189),u=m(u,l,h,f,n[p+9],4,-640364487),f=m(f,u,l,h,n[p+12],11,-421815835),h=m(h,f,u,l,n[p+15],16,530742520),u=v(u,l=m(l,h,f,u,n[p+2],23,-995338651),h,f,n[p+0],6,-198630844),f=v(f,u,l,h,n[p+7],10,1126891415),h=v(h,f,u,l,n[p+14],15,-1416354905),l=v(l,h,f,u,n[p+5],21,-57434055),u=v(u,l,h,f,n[p+12],6,1700485571),f=v(f,u,l,h,n[p+3],10,-1894986606),h=v(h,f,u,l,n[p+10],15,-1051523),l=v(l,h,f,u,n[p+1],21,-2054922799),u=v(u,l,h,f,n[p+8],6,1873313359),f=v(f,u,l,h,n[p+15],10,-30611744),h=v(h,f,u,l,n[p+6],15,-1560198380),l=v(l,h,f,u,n[p+13],21,1309151649),u=v(u,l,h,f,n[p+4],6,-145523070),f=v(f,u,l,h,n[p+11],10,-1120210379),h=v(h,f,u,l,n[p+2],15,718787259),l=v(l,h,f,u,n[p+9],21,-343485551),u=u+y>>>0,l=l+b>>>0,h=h+w>>>0,f=f+x>>>0}return r.endian([u,l,h,f])})._ff=function(t,e,n,r,o,i,s){var a=t+(e&n|~e&r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},a._gg=function(t,e,n,r,o,i,s){var a=t+(e&r|n&~r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},a._hh=function(t,e,n,r,o,i,s){var a=t+(e^n^r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},a._ii=function(t,e,n,r,o,i,s){var a=t+(n^(e|~r))+(o>>>0)+s;return(a<<i|a>>>32-i)+e},a._blocksize=16,a._digestsize=16,t.exports=function(t,e){if(null==t)throw new Error("Illegal argument "+t);var n=r.wordsToBytes(a(t,e));return e&&e.asBytes?n:e&&e.asString?s.bytesToString(n):r.bytesToHex(n)}},285:(t,e,n)=>{var r=n(2);t.exports=function(t){return t?("{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2)),m(function(t){return t.split("\\\\").join(o).split("\\{").join(i).split("\\}").join(s).split("\\,").join(a).split("\\.").join(c)}(t),!0).map(l)):[]};var o="\0SLASH"+Math.random()+"\0",i="\0OPEN"+Math.random()+"\0",s="\0CLOSE"+Math.random()+"\0",a="\0COMMA"+Math.random()+"\0",c="\0PERIOD"+Math.random()+"\0";function u(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function l(t){return t.split(o).join("\\").split(i).join("{").split(s).join("}").split(a).join(",").split(c).join(".")}function h(t){if(!t)return[""];var e=[],n=r("{","}",t);if(!n)return t.split(",");var o=n.pre,i=n.body,s=n.post,a=o.split(",");a[a.length-1]+="{"+i+"}";var c=h(s);return s.length&&(a[a.length-1]+=c.shift(),a.push.apply(a,c)),e.push.apply(e,a),e}function f(t){return"{"+t+"}"}function p(t){return/^-?0\d/.test(t)}function d(t,e){return t<=e}function g(t,e){return t>=e}function m(t,e){var n=[],o=r("{","}",t);if(!o)return[t];var i=o.pre,a=o.post.length?m(o.post,!1):[""];if(/\$$/.test(o.pre))for(var c=0;c<a.length;c++){var l=i+"{"+o.body+"}"+a[c];n.push(l)}else{var v,y,b=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(o.body),w=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(o.body),x=b||w,N=o.body.indexOf(",")>=0;if(!x&&!N)return o.post.match(/,.*\}/)?m(t=o.pre+"{"+o.body+s+o.post):[t];if(x)v=o.body.split(/\.\./);else if(1===(v=h(o.body)).length&&1===(v=m(v[0],!1).map(f)).length)return a.map((function(t){return o.pre+v[0]+t}));if(x){var P=u(v[0]),A=u(v[1]),O=Math.max(v[0].length,v[1].length),E=3==v.length?Math.abs(u(v[2])):1,T=d;A<P&&(E*=-1,T=g);var j=v.some(p);y=[];for(var C=P;T(C,A);C+=E){var S;if(w)"\\"===(S=String.fromCharCode(C))&&(S="");else if(S=String(C),j){var I=O-S.length;if(I>0){var k=new Array(I+1).join("0");S=C<0?"-"+k+S.slice(1):k+S}}y.push(S)}}else{y=[];for(var R=0;R<v.length;R++)y.push.apply(y,m(v[R],!1))}for(R=0;R<y.length;R++)for(c=0;c<a.length;c++)l=i+y[R]+a[c],(!e||x||l)&&n.push(l)}return n}},829:t=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function n(t){var e="function"==typeof Map?new Map:void 0;return n=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,s)}function s(){return r(t,arguments,i(this).constructor)}return s.prototype=Object.create(t.prototype,{constructor:{value:s,enumerable:!1,writable:!0,configurable:!0}}),o(s,t)},n(t)}function r(t,e,n){return r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i},r.apply(null,arguments)}function o(t,e){return o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}function i(t){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},i(t)}var s=function(t){function n(t){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),(r=function(t,n){return!n||"object"!==e(n)&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}(this,i(n).call(this,t))).name="ObjectPrototypeMutationError",r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(n,t),n}(n(Error));function a(t,n){for(var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=n.split("."),i=o.length,s=function(e){var n=o[e];if(!t)return{v:void 0};if("+"===n){if(Array.isArray(t))return{v:t.map((function(n,i){var s=o.slice(e+1);return s.length>0?a(n,s.join("."),r):r(t,i,o,e)}))};var i=o.slice(0,e).join(".");throw new Error("Object at wildcard (".concat(i,") is not an array"))}t=r(t,n,o,e)},c=0;c<i;c++){var u=s(c);if("object"===e(u))return u.v}return t}function c(t,e){return t.length===e+1}t.exports={set:function(t,n,r){if("object"!=e(t)||null===t)return t;if(void 0===n)return t;if("number"==typeof n)return t[n]=r,t[n];try{return a(t,n,(function(t,e,n,o){if(t===Reflect.getPrototypeOf({}))throw new s("Attempting to mutate Object.prototype");if(!t[e]){var i=Number.isInteger(Number(n[o+1])),a="+"===n[o+1];t[e]=i||a?[]:{}}return c(n,o)&&(t[e]=r),t[e]}))}catch(e){if(e instanceof s)throw e;return t}},get:function(t,n){if("object"!=e(t)||null===t)return t;if(void 0===n)return t;if("number"==typeof n)return t[n];try{return a(t,n,(function(t,e){return t[e]}))}catch(e){return t}},has:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("object"!=e(t)||null===t)return!1;if(void 0===n)return!1;if("number"==typeof n)return n in t;try{var o=!1;return a(t,n,(function(t,e,n,i){if(!c(n,i))return t&&t[e];o=r.own?t.hasOwnProperty(e):e in t})),o}catch(t){return!1}},hasOwn:function(t,e,n){return this.has(t,e,n||{own:!0})},isIn:function(t,n,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if("object"!=e(t)||null===t)return!1;if(void 0===n)return!1;try{var i=!1,s=!1;return a(t,n,(function(t,n,o,a){return i=i||t===r||!!t&&t[n]===r,s=c(o,a)&&"object"===e(t)&&n in t,t&&t[n]})),o.validPath?i&&s:i}catch(t){return!1}},ObjectPrototypeMutationError:s}},47:(t,e,n)=>{var r=n(410),o=function(t){return"string"==typeof t};function i(t,e){for(var n=[],r=0;r<t.length;r++){var o=t[r];o&&"."!==o&&(".."===o?n.length&&".."!==n[n.length-1]?n.pop():e&&n.push(".."):n.push(o))}return n}var s=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,a={};function c(t){return s.exec(t).slice(1)}a.resolve=function(){for(var t="",e=!1,n=arguments.length-1;n>=-1&&!e;n--){var r=n>=0?arguments[n]:process.cwd();if(!o(r))throw new TypeError("Arguments to path.resolve must be strings");r&&(t=r+"/"+t,e="/"===r.charAt(0))}return(e?"/":"")+(t=i(t.split("/"),!e).join("/"))||"."},a.normalize=function(t){var e=a.isAbsolute(t),n="/"===t.substr(-1);return(t=i(t.split("/"),!e).join("/"))||e||(t="."),t&&n&&(t+="/"),(e?"/":"")+t},a.isAbsolute=function(t){return"/"===t.charAt(0)},a.join=function(){for(var t="",e=0;e<arguments.length;e++){var n=arguments[e];if(!o(n))throw new TypeError("Arguments to path.join must be strings");n&&(t+=t?"/"+n:n)}return a.normalize(t)},a.relative=function(t,e){function n(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n+1)}t=a.resolve(t).substr(1),e=a.resolve(e).substr(1);for(var r=n(t.split("/")),o=n(e.split("/")),i=Math.min(r.length,o.length),s=i,c=0;c<i;c++)if(r[c]!==o[c]){s=c;break}var u=[];for(c=s;c<r.length;c++)u.push("..");return(u=u.concat(o.slice(s))).join("/")},a._makeLong=function(t){return t},a.dirname=function(t){var e=c(t),n=e[0],r=e[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},a.basename=function(t,e){var n=c(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},a.extname=function(t){return c(t)[3]},a.format=function(t){if(!r.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof t);var e=t.root||"";if(!o(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof t.root);return(t.dir?t.dir+a.sep:"")+(t.base||"")},a.parse=function(t){if(!o(t))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof t);var e=c(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return e[1]=e[1]||"",e[2]=e[2]||"",e[3]=e[3]||"",{root:e[0],dir:e[0]+e[1].slice(0,e[1].length-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},a.sep="/",a.delimiter=":",t.exports=a},647:(t,e)=>{var n=Object.prototype.hasOwnProperty;function r(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(t){return null}}function o(t){try{return encodeURIComponent(t)}catch(t){return null}}e.stringify=function(t,e){e=e||"";var r,i,s=[];for(i in"string"!=typeof e&&(e="?"),t)if(n.call(t,i)){if((r=t[i])||null!=r&&!isNaN(r)||(r=""),i=o(i),r=o(r),null===i||null===r)continue;s.push(i+"="+r)}return s.length?e+s.join("&"):""},e.parse=function(t){for(var e,n=/([^=?#&]+)=?([^&]*)/g,o={};e=n.exec(t);){var i=r(e[1]),s=r(e[2]);null===i||null===s||i in o||(o[i]=s)}return o}},670:t=>{t.exports=function(t,e){if(e=e.split(":")[0],!(t=+t))return!1;switch(e){case"http":case"ws":return 80!==t;case"https":case"wss":return 443!==t;case"ftp":return 21!==t;case"gopher":return 70!==t;case"file":return!1}return 0!==t}},494:t=>{const e=/^[-+]?0x[a-fA-F0-9]+$/,n=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const r={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};t.exports=function(t){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(o=Object.assign({},r,o),!t||"string"!=typeof t)return t;let i=t.trim();if(void 0!==o.skipLike&&o.skipLike.test(i))return t;if(o.hex&&e.test(i))return Number.parseInt(i,16);{const e=n.exec(i);if(e){const n=e[1],r=e[2];let a=(s=e[3])&&-1!==s.indexOf(".")?("."===(s=s.replace(/0+$/,""))?s="0":"."===s[0]?s="0"+s:"."===s[s.length-1]&&(s=s.substr(0,s.length-1)),s):s;const c=e[4]||e[6];if(!o.leadingZeros&&r.length>0&&n&&"."!==i[2])return t;if(!o.leadingZeros&&r.length>0&&!n&&"."!==i[1])return t;{const e=Number(i),s=""+e;return-1!==s.search(/[eE]/)||c?o.eNotation?e:t:-1!==i.indexOf(".")?"0"===s&&""===a||s===a||n&&s==="-"+a?e:t:r?a===s||n+a===s?e:t:i===s||i===n+s?e:t}}return t}var s}},737:(t,e,n)=>{var r=n(670),o=n(647),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,s=/[\n\r\t]/g,a=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,c=/:\d+$/,u=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function h(t){return(t||"").toString().replace(i,"")}var f=[["#","hash"],["?","query"],function(t,e){return g(e.protocol)?t.replace(/\\/g,"/"):t},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],p={hash:1,query:1};function d(t){var e,n=("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}).location||{},r={},o=typeof(t=t||n);if("blob:"===t.protocol)r=new v(unescape(t.pathname),{});else if("string"===o)for(e in r=new v(t,{}),p)delete r[e];else if("object"===o){for(e in t)e in p||(r[e]=t[e]);void 0===r.slashes&&(r.slashes=a.test(t.href))}return r}function g(t){return"file:"===t||"ftp:"===t||"http:"===t||"https:"===t||"ws:"===t||"wss:"===t}function m(t,e){t=(t=h(t)).replace(s,""),e=e||{};var n,r=u.exec(t),o=r[1]?r[1].toLowerCase():"",i=!!r[2],a=!!r[3],c=0;return i?a?(n=r[2]+r[3]+r[4],c=r[2].length+r[3].length):(n=r[2]+r[4],c=r[2].length):a?(n=r[3]+r[4],c=r[3].length):n=r[4],"file:"===o?c>=2&&(n=n.slice(2)):g(o)?n=r[4]:o?i&&(n=n.slice(2)):c>=2&&g(e.protocol)&&(n=r[4]),{protocol:o,slashes:i||g(o),slashesCount:c,rest:n}}function v(t,e,n){if(t=(t=h(t)).replace(s,""),!(this instanceof v))return new v(t,e,n);var i,a,c,u,p,y,b=f.slice(),w=typeof e,x=this,N=0;for("object"!==w&&"string"!==w&&(n=e,e=null),n&&"function"!=typeof n&&(n=o.parse),i=!(a=m(t||"",e=d(e))).protocol&&!a.slashes,x.slashes=a.slashes||i&&e.slashes,x.protocol=a.protocol||e.protocol||"",t=a.rest,("file:"===a.protocol&&(2!==a.slashesCount||l.test(t))||!a.slashes&&(a.protocol||a.slashesCount<2||!g(x.protocol)))&&(b[3]=[/(.*)/,"pathname"]);N<b.length;N++)"function"!=typeof(u=b[N])?(c=u[0],y=u[1],c!=c?x[y]=t:"string"==typeof c?~(p="@"===c?t.lastIndexOf(c):t.indexOf(c))&&("number"==typeof u[2]?(x[y]=t.slice(0,p),t=t.slice(p+u[2])):(x[y]=t.slice(p),t=t.slice(0,p))):(p=c.exec(t))&&(x[y]=p[1],t=t.slice(0,p.index)),x[y]=x[y]||i&&u[3]&&e[y]||"",u[4]&&(x[y]=x[y].toLowerCase())):t=u(t,x);n&&(x.query=n(x.query)),i&&e.slashes&&"/"!==x.pathname.charAt(0)&&(""!==x.pathname||""!==e.pathname)&&(x.pathname=function(t,e){if(""===t)return e;for(var n=(e||"/").split("/").slice(0,-1).concat(t.split("/")),r=n.length,o=n[r-1],i=!1,s=0;r--;)"."===n[r]?n.splice(r,1):".."===n[r]?(n.splice(r,1),s++):s&&(0===r&&(i=!0),n.splice(r,1),s--);return i&&n.unshift(""),"."!==o&&".."!==o||n.push(""),n.join("/")}(x.pathname,e.pathname)),"/"!==x.pathname.charAt(0)&&g(x.protocol)&&(x.pathname="/"+x.pathname),r(x.port,x.protocol)||(x.host=x.hostname,x.port=""),x.username=x.password="",x.auth&&(~(p=x.auth.indexOf(":"))?(x.username=x.auth.slice(0,p),x.username=encodeURIComponent(decodeURIComponent(x.username)),x.password=x.auth.slice(p+1),x.password=encodeURIComponent(decodeURIComponent(x.password))):x.username=encodeURIComponent(decodeURIComponent(x.auth)),x.auth=x.password?x.username+":"+x.password:x.username),x.origin="file:"!==x.protocol&&g(x.protocol)&&x.host?x.protocol+"//"+x.host:"null",x.href=x.toString()}v.prototype={set:function(t,e,n){var i=this;switch(t){case"query":"string"==typeof e&&e.length&&(e=(n||o.parse)(e)),i[t]=e;break;case"port":i[t]=e,r(e,i.protocol)?e&&(i.host=i.hostname+":"+e):(i.host=i.hostname,i[t]="");break;case"hostname":i[t]=e,i.port&&(e+=":"+i.port),i.host=e;break;case"host":i[t]=e,c.test(e)?(e=e.split(":"),i.port=e.pop(),i.hostname=e.join(":")):(i.hostname=e,i.port="");break;case"protocol":i.protocol=e.toLowerCase(),i.slashes=!n;break;case"pathname":case"hash":if(e){var s="pathname"===t?"/":"#";i[t]=e.charAt(0)!==s?s+e:e}else i[t]=e;break;case"username":case"password":i[t]=encodeURIComponent(e);break;case"auth":var a=e.indexOf(":");~a?(i.username=e.slice(0,a),i.username=encodeURIComponent(decodeURIComponent(i.username)),i.password=e.slice(a+1),i.password=encodeURIComponent(decodeURIComponent(i.password))):i.username=encodeURIComponent(decodeURIComponent(e))}for(var u=0;u<f.length;u++){var l=f[u];l[4]&&(i[l[1]]=i[l[1]].toLowerCase())}return i.auth=i.password?i.username+":"+i.password:i.username,i.origin="file:"!==i.protocol&&g(i.protocol)&&i.host?i.protocol+"//"+i.host:"null",i.href=i.toString(),i},toString:function(t){t&&"function"==typeof t||(t=o.stringify);var e,n=this,r=n.host,i=n.protocol;i&&":"!==i.charAt(i.length-1)&&(i+=":");var s=i+(n.protocol&&n.slashes||g(n.protocol)?"//":"");return n.username?(s+=n.username,n.password&&(s+=":"+n.password),s+="@"):n.password?(s+=":"+n.password,s+="@"):"file:"!==n.protocol&&g(n.protocol)&&!r&&"/"!==n.pathname&&(s+="@"),(":"===r[r.length-1]||c.test(n.hostname)&&!n.port)&&(r+=":"),s+=r+n.pathname,(e="object"==typeof n.query?t(n.query):n.query)&&(s+="?"!==e.charAt(0)?"?"+e:e),n.hash&&(s+=n.hash),s}},v.extractProtocol=m,v.location=d,v.trimLeft=h,v.qs=o,t.exports=v},410:()=>{},388:()=>{},805:()=>{},800:()=>{}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t);var r={};(()=>{n.d(r,{hT:()=>C,O4:()=>S,Kd:()=>T,YK:()=>j,UU:()=>Ke,Gu:()=>M,ky:()=>te,h4:()=>Jt,hq:()=>zt,i5:()=>ee});var t=n(737),e=n.n(t);function o(t){if(!i(t))throw new Error("Parameter was not an error")}function i(t){return"[object Error]"===(e=t,Object.prototype.toString.call(e))||t instanceof Error;var e}class s extends Error{constructor(t,e){const n=[...arguments],{options:r,shortMessage:o}=function(t){let e,n="";if(0===t.length)e={};else if(i(t[0]))e={cause:t[0]},n=t.slice(1).join(" ")||"";else if(t[0]&&"object"==typeof t[0])e=Object.assign({},t[0]),n=t.slice(1).join(" ")||"";else{if("string"!=typeof t[0])throw new Error("Invalid arguments passed to Layerr");e={},n=n=t.join(" ")||""}return{options:e,shortMessage:n}}(n);let s=o;if(r.cause&&(s="".concat(s,": ").concat(r.cause.message)),super(s),this.message=s,r.name&&"string"==typeof r.name?this.name=r.name:this.name="Layerr",r.cause&&Object.defineProperty(this,"_cause",{value:r.cause}),Object.defineProperty(this,"_info",{value:{}}),r.info&&"object"==typeof r.info&&Object.assign(this._info,r.info),Error.captureStackTrace){const t=r.constructorOpt||this.constructor;Error.captureStackTrace(this,t)}}static cause(t){return o(t),t._cause&&i(t._cause)?t._cause:null}static fullStack(t){o(t);const e=s.cause(t);return e?"".concat(t.stack,"\ncaused by: ").concat(s.fullStack(e)):t.stack}static info(t){o(t);const e={},n=s.cause(t);return n&&Object.assign(e,s.info(n)),t._info&&Object.assign(e,t._info),e}cause(){return s.cause(this)}toString(){let t=this.name||this.constructor.name||this.constructor.prototype.name;return this.message&&(t="".concat(t,": ").concat(this.message)),t}}var a=n(47),c=n.n(a);const u="__PATH_SEPARATOR_POSIX__",l="__PATH_SEPARATOR_WINDOWS__";function h(t){try{const e=t.replace(/\//g,u).replace(/\\\\/g,l);return encodeURIComponent(e).split(l).join("\\\\").split(u).join("/")}catch(t){throw new s(t,"Failed encoding path")}}function f(t){return t.startsWith("/")?t:"/"+t}function p(t){let e=t;return"/"!==e[0]&&(e="/"+e),/^.+\/$/.test(e)&&(e=e.substr(0,e.length-1)),e}function d(t){let n=new(e())(t).pathname;return n.length<=0&&(n="/"),p(n)}function g(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(){return function(t){var e=[];if(0===t.length)return"";if("string"!=typeof t[0])throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var n=t.shift();t[0]=n+t[0]}t[0].match(/^file:\/\/\//)?t[0]=t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0]=t[0].replace(/^([^/:]+):\/*/,"$1://");for(var r=0;r<t.length;r++){var o=t[r];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(r>0&&(o=o.replace(/^[\/]+/,"")),o=r<t.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),e.push(o))}var i=e.join("/"),s=(i=i.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return s.shift()+(s.length>0?"?":"")+s.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}(e.reduce(((t,e,n)=>((0===n||"/"!==e||"/"===e&&"/"!==t[t.length-1])&&t.push(e),t)),[]))}var m=n(542),v=n.n(m);const y="abcdef0123456789";function b(t,e){const n=t.url.replace("//",""),r=-1==n.indexOf("/")?"/":n.slice(n.indexOf("/")),o=t.method?t.method.toUpperCase():"GET",i=!!/(^|,)\s*auth\s*($|,)/.test(e.qop)&&"auth",s="00000000".concat(e.nc).slice(-8),a=function(t,e,n,r,o,i,s){const a=s||v()("".concat(e,":").concat(n,":").concat(r));return t&&"md5-sess"===t.toLowerCase()?v()("".concat(a,":").concat(o,":").concat(i)):a}(e.algorithm,e.username,e.realm,e.password,e.nonce,e.cnonce,e.ha1),c=v()("".concat(o,":").concat(r)),u=i?v()("".concat(a,":").concat(e.nonce,":").concat(s,":").concat(e.cnonce,":").concat(i,":").concat(c)):v()("".concat(a,":").concat(e.nonce,":").concat(c)),l={username:e.username,realm:e.realm,nonce:e.nonce,uri:r,qop:i,response:u,nc:s,cnonce:e.cnonce,algorithm:e.algorithm,opaque:e.opaque},h=[];for(const t in l)l[t]&&("qop"===t||"nc"===t||"algorithm"===t?h.push("".concat(t,"=").concat(l[t])):h.push("".concat(t,'="').concat(l[t],'"')));return"Digest ".concat(h.join(", "))}function w(t){return"digest"===(t.headers&&t.headers.get("www-authenticate")||"").split(/\s/)[0].toLowerCase()}var x=n(101),N=n.n(x);function P(t){return N().decode(t)}function A(t,e){const n=(r="".concat(t,":").concat(e),N().encode(r));var r;return"Basic ".concat(n)}const O="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:"undefined"!=typeof window?window:globalThis,E=O.fetch.bind(O),T=(O.Headers,O.Request),j=O.Response;let C=function(t){return t.Auto="auto",t.Digest="digest",t.None="none",t.Password="password",t.Token="token",t}({}),S=function(t){return t.DataTypeNoLength="data-type-no-length",t.InvalidAuthType="invalid-auth-type",t.InvalidOutputFormat="invalid-output-format",t.LinkUnsupportedAuthType="link-unsupported-auth",t.InvalidUpdateRange="invalid-update-range",t.NotSupported="not-supported",t}({});function I(t,e,n,r,o){switch(t.authType){case C.Auto:e&&n&&(t.headers.Authorization=A(e,n));break;case C.Digest:t.digest=function(t,e,n){return{username:t,password:e,ha1:n,nc:0,algorithm:"md5",hasDigestAuth:!1}}(e,n,o);break;case C.None:break;case C.Password:t.headers.Authorization=A(e,n);break;case C.Token:t.headers.Authorization="".concat((i=r).token_type," ").concat(i.access_token);break;default:throw new s({info:{code:S.InvalidAuthType}},"Invalid auth type: ".concat(t.authType))}var i}n(800);const k="@@HOTPATCHER",R=()=>{};function L(t){return{original:t,methods:[t],final:!1}}class _{constructor(){this._configuration={registry:{},getEmptyAction:"null"},this.__type__=k}get configuration(){return this._configuration}get getEmptyAction(){return this.configuration.getEmptyAction}set getEmptyAction(t){this.configuration.getEmptyAction=t}control(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t||t.__type__!==k)throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");return Object.keys(t.configuration.registry).forEach((n=>{this.configuration.registry.hasOwnProperty(n)?e&&(this.configuration.registry[n]=Object.assign({},t.configuration.registry[n])):this.configuration.registry[n]=Object.assign({},t.configuration.registry[n])})),t._configuration=this.configuration,this}execute(t){const e=this.get(t)||R;for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return e(...r)}get(t){const e=this.configuration.registry[t];if(!e)switch(this.getEmptyAction){case"null":return null;case"throw":throw new Error("Failed handling method request: No method provided for override: ".concat(t));default:throw new Error("Failed handling request which resulted in an empty method: Invalid empty-action specified: ".concat(this.getEmptyAction))}return function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];if(0===e.length)throw new Error("Failed creating sequence: No functions provided");return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];let o=n;const i=this;for(;e.length>0;)o=[e.shift().apply(i,o)];return o[0]}}(...e.methods)}isPatched(t){return!!this.configuration.registry[t]}patch(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{chain:r=!1}=n;if(this.configuration.registry[t]&&this.configuration.registry[t].final)throw new Error("Failed patching '".concat(t,"': Method marked as being final"));if("function"!=typeof e)throw new Error("Failed patching '".concat(t,"': Provided method is not a function"));if(r)this.configuration.registry[t]?this.configuration.registry[t].methods.push(e):this.configuration.registry[t]=L(e);else if(this.isPatched(t)){const{original:n}=this.configuration.registry[t];this.configuration.registry[t]=Object.assign(L(e),{original:n})}else this.configuration.registry[t]=L(e);return this}patchInline(t,e){this.isPatched(t)||this.patch(t,e);for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return this.execute(t,...r)}plugin(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.forEach((e=>{this.patch(t,e,{chain:!0})})),this}restore(t){if(!this.isPatched(t))throw new Error("Failed restoring method: No method present for key: ".concat(t));if("function"!=typeof this.configuration.registry[t].original)throw new Error("Failed restoring method: Original method not found or of invalid type for key: ".concat(t));return this.configuration.registry[t].methods=[this.configuration.registry[t].original],this}setFinal(t){if(!this.configuration.registry.hasOwnProperty(t))throw new Error("Failed marking '".concat(t,"' as final: No method found for key"));return this.configuration.registry[t].final=!0,this}}let U=null;function M(){return U||(U=new _),U}function F(t){return function(t){if("object"!=typeof t||null===t||"[object Object]"!=Object.prototype.toString.call(t))return!1;if(null===Object.getPrototypeOf(t))return!0;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}(t)?Object.assign({},t):Object.setPrototypeOf(Object.assign({},t),Object.getPrototypeOf(t))}function D(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];let r=null,o=[...e];for(;o.length>0;){const t=o.shift();r=r?$(r,t):F(t)}return r}function $(t,e){const n=F(t);return Object.keys(e).forEach((t=>{n.hasOwnProperty(t)?Array.isArray(e[t])?n[t]=Array.isArray(n[t])?[...n[t],...e[t]]:[...e[t]]:"object"==typeof e[t]&&e[t]?n[t]="object"==typeof n[t]&&n[t]?$(n[t],e[t]):F(e[t]):n[t]=e[t]:n[t]=e[t]})),n}function B(t){const e={};for(const n of t.keys())e[n]=t.get(n);return e}function W(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];if(0===e.length)return{};const r={};return e.reduce(((t,e)=>(Object.keys(e).forEach((n=>{const o=n.toLowerCase();r.hasOwnProperty(o)?t[r[o]]=e[n]:(r[o]=n,t[n]=e[n])})),t)),{})}n(805);const V="function"==typeof ArrayBuffer,{toString:z}=Object.prototype;function q(t){return V&&(t instanceof ArrayBuffer||"[object ArrayBuffer]"===z.call(t))}function G(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function H(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}function X(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Z=H((function(t){const e=t._digest;return delete t._digest,e.hasDigestAuth&&(t=D(t,{headers:{Authorization:b(t,e)}})),X(Q(t),(function(n){let r=!1;return o=function(t){return r?t:n},(i=function(){if(401==n.status)return e.hasDigestAuth=function(t,e){if(!w(t))return!1;const n=/([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;for(;;){const r=t.headers&&t.headers.get("www-authenticate")||"",o=n.exec(r);if(!o)break;e[o[1]]=o[2]||o[3]}return e.nc+=1,e.cnonce=function(){let t="";for(let e=0;e<32;++e)t="".concat(t).concat(y[Math.floor(16*Math.random())]);return t}(),!0}(n,e),function(){if(e.hasDigestAuth)return X(Q(t=D(t,{headers:{Authorization:b(t,e)}})),(function(t){return 401==t.status?e.hasDigestAuth=!1:e.nc++,r=!0,t}))}();e.nc++}())&&i.then?i.then(o):o(i);var o,i}))})),Y=H((function(t,e){return X(Q(t),(function(n){return n.ok?(e.authType=C.Password,n):401==n.status&&w(n)?(e.authType=C.Digest,I(e,e.username,e.password,void 0,void 0),t._digest=e.digest,Z(t)):n}))})),K=H((function(t,e){return e.authType===C.Auto?Y(t,e):t._digest?Z(t):Q(t)}));function J(t,e,n){const r=F(t);return r.headers=W(e.headers,r.headers||{},n.headers||{}),void 0!==n.data&&(r.data=n.data),n.signal&&(r.signal=n.signal),e.httpAgent&&(r.httpAgent=e.httpAgent),e.httpsAgent&&(r.httpsAgent=e.httpsAgent),e.digest&&(r._digest=e.digest),"boolean"==typeof e.withCredentials&&(r.withCredentials=e.withCredentials),r}function Q(t){const e=M();return e.patchInline("request",(t=>e.patchInline("fetch",E,t.url,function(t){let e={};const n={method:t.method};if(t.headers&&(e=W(e,t.headers)),void 0!==t.data){const[r,o]=function(t){if("string"==typeof t)return[t,{}];if(G(t))return[t,{}];if(q(t))return[t,{}];if(t&&"object"==typeof t)return[JSON.stringify(t),{"content-type":"application/json"}];throw new Error("Unable to convert request body: Unexpected body type: ".concat(typeof t))}(t.data);n.body=r,e=W(e,o)}return t.signal&&(n.signal=t.signal),t.withCredentials&&(n.credentials="include"),n.headers=e,n}(t))),t)}var tt=n(285);const et={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",!0],"[:alpha:]":["\\p{L}\\p{Nl}",!0],"[:ascii:]":["\\x00-\\x7f",!1],"[:blank:]":["\\p{Zs}\\t",!0],"[:cntrl:]":["\\p{Cc}",!0],"[:digit:]":["\\p{Nd}",!0],"[:graph:]":["\\p{Z}\\p{C}",!0,!0],"[:lower:]":["\\p{Ll}",!0],"[:print:]":["\\p{C}",!0],"[:punct:]":["\\p{P}",!0],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",!0],"[:upper:]":["\\p{Lu}",!0],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",!0],"[:xdigit:]":["A-Fa-f0-9",!1]},nt=t=>t.replace(/[[\]\\-]/g,"\\$&"),rt=t=>t.join(""),ot=(t,e)=>{const n=e;if("["!==t.charAt(n))throw new Error("not in a brace expression");const r=[],o=[];let i=n+1,s=!1,a=!1,c=!1,u=!1,l=n,h="";t:for(;i<t.length;){const e=t.charAt(i);if("!"!==e&&"^"!==e||i!==n+1){if("]"===e&&s&&!c){l=i+1;break}if(s=!0,"\\"!==e||c){if("["===e&&!c)for(const[e,[s,c,u]]of Object.entries(et))if(t.startsWith(e,i)){if(h)return["$.",!1,t.length-n,!0];i+=e.length,u?o.push(s):r.push(s),a=a||c;continue t}c=!1,h?(e>h?r.push(nt(h)+"-"+nt(e)):e===h&&r.push(nt(e)),h="",i++):t.startsWith("-]",i+1)?(r.push(nt(e+"-")),i+=2):t.startsWith("-",i+1)?(h=e,i+=2):(r.push(nt(e)),i++)}else c=!0,i++}else u=!0,i++}if(l<i)return["",!1,0,!1];if(!r.length&&!o.length)return["$.",!1,t.length-n,!0];if(0===o.length&&1===r.length&&/^\\?.$/.test(r[0])&&!u){return[(f=2===r[0].length?r[0].slice(-1):r[0],f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")),!1,l-n,!1]}var f;const p="["+(u?"^":"")+rt(r)+"]",d="["+(u?"":"^")+rt(o)+"]";return[r.length&&o.length?"("+p+"|"+d+")":r.length?p:d,a,l-n,!0]};function it(t,e,n){var r;return(e="symbol"==typeof(r=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(e))?r:String(r))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}const st=function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return Ft(e),!(!n.nocomment&&"#"===e.charAt(0))&&new Bt(e,n).match(t)},at=st,ct=/^\*+([^+@!?\*\[\(]*)$/,ut=t=>e=>!e.startsWith(".")&&e.endsWith(t),lt=t=>e=>e.endsWith(t),ht=t=>(t=t.toLowerCase(),e=>!e.startsWith(".")&&e.toLowerCase().endsWith(t)),ft=t=>(t=t.toLowerCase(),e=>e.toLowerCase().endsWith(t)),pt=/^\*+\.\*+$/,dt=t=>!t.startsWith(".")&&t.includes("."),gt=t=>"."!==t&&".."!==t&&t.includes("."),mt=/^\.\*+$/,vt=t=>"."!==t&&".."!==t&&t.startsWith("."),yt=/^\*+$/,bt=t=>0!==t.length&&!t.startsWith("."),wt=t=>0!==t.length&&"."!==t&&".."!==t,xt=/^\?+([^+@!?\*\[\(]*)?$/,Nt=t=>{let[e,n=""]=t;const r=Et([e]);return n?(n=n.toLowerCase(),t=>r(t)&&t.toLowerCase().endsWith(n)):r},Pt=t=>{let[e,n=""]=t;const r=Tt([e]);return n?(n=n.toLowerCase(),t=>r(t)&&t.toLowerCase().endsWith(n)):r},At=t=>{let[e,n=""]=t;const r=Tt([e]);return n?t=>r(t)&&t.endsWith(n):r},Ot=t=>{let[e,n=""]=t;const r=Et([e]);return n?t=>r(t)&&t.endsWith(n):r},Et=t=>{let[e]=t;const n=e.length;return t=>t.length===n&&!t.startsWith(".")},Tt=t=>{let[e]=t;const n=e.length;return t=>t.length===n&&"."!==t&&".."!==t},jt="object"==typeof process&&process?"object"==typeof process.env&&process.env&&process.env.__MINIMATCH_TESTING_PLATFORM__||process.platform:"posix";st.sep="win32"===jt?"\\":"/";const Ct=Symbol("globstar **");st.GLOBSTAR=Ct;const St={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},It="[^/]",kt=It+"*?",Rt=t=>t.split("").reduce(((t,e)=>(t[e]=!0,t)),{}),Lt=Rt("().*{}+?[]^$\\!"),_t=Rt("[.(");st.filter=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n=>st(n,t,e)};const Ut=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.assign({},t,e)};st.defaults=t=>{if(!t||"object"!=typeof t||!Object.keys(t).length)return st;const e=st;return Object.assign((function(n,r){return e(n,r,Ut(t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}))}),{Minimatch:class extends e.Minimatch{constructor(e){super(e,Ut(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}))}static defaults(n){return e.defaults(Ut(t,n)).Minimatch}},unescape:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.unescape(n,Ut(t,r))},escape:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.escape(n,Ut(t,r))},filter:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter(n,Ut(t,r))},defaults:n=>e.defaults(Ut(t,n)),makeRe:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.makeRe(n,Ut(t,r))},braceExpand:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.braceExpand(n,Ut(t,r))},match:function(n,r){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.match(n,r,Ut(t,o))},sep:e.sep,GLOBSTAR:Ct})};const Mt=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Ft(t),e.nobrace||!/\{(?:(?!\{).)*\}/.test(t)?[t]:tt(t)};st.braceExpand=Mt;const Ft=t=>{if("string"!=typeof t)throw new TypeError("invalid pattern");if(t.length>65536)throw new TypeError("pattern is too long")};st.makeRe=function(t){return new Bt(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).makeRe()},st.match=function(t,e){const n=new Bt(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{});return t=t.filter((t=>n.match(t))),n.options.nonull&&!t.length&&t.push(e),t};const Dt=/[?*]|[+@!]\(.*?\)|\[|\]/,$t=t=>t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");class Bt{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};it(this,"options",void 0),it(this,"set",void 0),it(this,"pattern",void 0),it(this,"windowsPathsNoEscape",void 0),it(this,"nonegate",void 0),it(this,"negate",void 0),it(this,"comment",void 0),it(this,"empty",void 0),it(this,"preserveMultipleSlashes",void 0),it(this,"partial",void 0),it(this,"globSet",void 0),it(this,"globParts",void 0),it(this,"nocase",void 0),it(this,"isWindows",void 0),it(this,"platform",void 0),it(this,"windowsNoMagicRoot",void 0),it(this,"regexp",void 0),Ft(t),e=e||{},this.options=e,this.pattern=t,this.platform=e.platform||jt,this.isWindows="win32"===this.platform,this.windowsPathsNoEscape=!!e.windowsPathsNoEscape||!1===e.allowWindowsEscape,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!e.preserveMultipleSlashes,this.regexp=null,this.negate=!1,this.nonegate=!!e.nonegate,this.comment=!1,this.empty=!1,this.partial=!!e.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=void 0!==e.windowsNoMagicRoot?e.windowsNoMagicRoot:!(!this.isWindows||!this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make()}hasMagic(){if(this.options.magicalBraces&&this.set.length>1)return!0;for(const t of this.set)for(const e of t)if("string"!=typeof e)return!0;return!1}debug(){}make(){const t=this.pattern,e=this.options;if(!e.nocomment&&"#"===t.charAt(0))return void(this.comment=!0);if(!t)return void(this.empty=!0);this.parseNegate(),this.globSet=[...new Set(this.braceExpand())],e.debug&&(this.debug=function(){return console.error(...arguments)}),this.debug(this.pattern,this.globSet);const n=this.globSet.map((t=>this.slashSplit(t)));this.globParts=this.preprocess(n),this.debug(this.pattern,this.globParts);let r=this.globParts.map(((t,e,n)=>{if(this.isWindows&&this.windowsNoMagicRoot){const e=!(""!==t[0]||""!==t[1]||"?"!==t[2]&&Dt.test(t[2])||Dt.test(t[3])),n=/^[a-z]:/i.test(t[0]);if(e)return[...t.slice(0,4),...t.slice(4).map((t=>this.parse(t)))];if(n)return[t[0],...t.slice(1).map((t=>this.parse(t)))]}return t.map((t=>this.parse(t)))}));if(this.debug(this.pattern,r),this.set=r.filter((t=>-1===t.indexOf(!1))),this.isWindows)for(let t=0;t<this.set.length;t++){const e=this.set[t];""===e[0]&&""===e[1]&&"?"===this.globParts[t][2]&&"string"==typeof e[3]&&/^[a-z]:$/i.test(e[3])&&(e[2]="?")}this.debug(this.pattern,this.set)}preprocess(t){if(this.options.noglobstar)for(let e=0;e<t.length;e++)for(let n=0;n<t[e].length;n++)"**"===t[e][n]&&(t[e][n]="*");const{optimizationLevel:e=1}=this.options;return e>=2?(t=this.firstPhasePreProcess(t),t=this.secondPhasePreProcess(t)):t=e>=1?this.levelOneOptimize(t):this.adjascentGlobstarOptimize(t),t}adjascentGlobstarOptimize(t){return t.map((t=>{let e=-1;for(;-1!==(e=t.indexOf("**",e+1));){let n=e;for(;"**"===t[n+1];)n++;n!==e&&t.splice(e,n-e)}return t}))}levelOneOptimize(t){return t.map((t=>0===(t=t.reduce(((t,e)=>{const n=t[t.length-1];return"**"===e&&"**"===n?t:".."===e&&n&&".."!==n&&"."!==n&&"**"!==n?(t.pop(),t):(t.push(e),t)}),[])).length?[""]:t))}levelTwoFileOptimize(t){Array.isArray(t)||(t=this.slashSplit(t));let e=!1;do{if(e=!1,!this.preserveMultipleSlashes){for(let n=1;n<t.length-1;n++){const r=t[n];1===n&&""===r&&""===t[0]||"."!==r&&""!==r||(e=!0,t.splice(n,1),n--)}"."!==t[0]||2!==t.length||"."!==t[1]&&""!==t[1]||(e=!0,t.pop())}let n=0;for(;-1!==(n=t.indexOf("..",n+1));){const r=t[n-1];r&&"."!==r&&".."!==r&&"**"!==r&&(e=!0,t.splice(n-1,2),n-=2)}}while(e);return 0===t.length?[""]:t}firstPhasePreProcess(t){let e=!1;do{e=!1;for(let n of t){let r=-1;for(;-1!==(r=n.indexOf("**",r+1));){let o=r;for(;"**"===n[o+1];)o++;o>r&&n.splice(r+1,o-r);let i=n[r+1];const s=n[r+2],a=n[r+3];if(".."!==i)continue;if(!s||"."===s||".."===s||!a||"."===a||".."===a)continue;e=!0,n.splice(r,1);const c=n.slice(0);c[r]="**",t.push(c),r--}if(!this.preserveMultipleSlashes){for(let t=1;t<n.length-1;t++){const r=n[t];1===t&&""===r&&""===n[0]||"."!==r&&""!==r||(e=!0,n.splice(t,1),t--)}"."!==n[0]||2!==n.length||"."!==n[1]&&""!==n[1]||(e=!0,n.pop())}let o=0;for(;-1!==(o=n.indexOf("..",o+1));){const t=n[o-1];if(t&&"."!==t&&".."!==t&&"**"!==t){e=!0;const t=1===o&&"**"===n[o+1]?["."]:[];n.splice(o-1,2,...t),0===n.length&&n.push(""),o-=2}}}}while(e);return t}secondPhasePreProcess(t){for(let e=0;e<t.length-1;e++)for(let n=e+1;n<t.length;n++){const r=this.partsMatch(t[e],t[n],!this.preserveMultipleSlashes);r&&(t[e]=r,t[n]=[])}return t.filter((t=>t.length))}partsMatch(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=0,o=0,i=[],s="";for(;r<t.length&&o<e.length;)if(t[r]===e[o])i.push("b"===s?e[o]:t[r]),r++,o++;else if(n&&"**"===t[r]&&e[o]===t[r+1])i.push(t[r]),r++;else if(n&&"**"===e[o]&&t[r]===e[o+1])i.push(e[o]),o++;else if("*"!==t[r]||!e[o]||!this.options.dot&&e[o].startsWith(".")||"**"===e[o]){if("*"!==e[o]||!t[r]||!this.options.dot&&t[r].startsWith(".")||"**"===t[r])return!1;if("a"===s)return!1;s="b",i.push(e[o]),r++,o++}else{if("b"===s)return!1;s="a",i.push(t[r]),r++,o++}return t.length===e.length&&i}parseNegate(){if(this.nonegate)return;const t=this.pattern;let e=!1,n=0;for(let r=0;r<t.length&&"!"===t.charAt(r);r++)e=!e,n++;n&&(this.pattern=t.slice(n)),this.negate=e}matchOne(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=this.options;if(this.isWindows){const n=""===t[0]&&""===t[1]&&"?"===t[2]&&"string"==typeof t[3]&&/^[a-z]:$/i.test(t[3]),r=""===e[0]&&""===e[1]&&"?"===e[2]&&"string"==typeof e[3]&&/^[a-z]:$/i.test(e[3]);if(n&&r){const n=t[3],r=e[3];n.toLowerCase()===r.toLowerCase()&&(t[3]=r)}else if(r&&"string"==typeof t[0]){const n=e[3],r=t[0];n.toLowerCase()===r.toLowerCase()&&(e[3]=r,e=e.slice(3))}else if(n&&"string"==typeof e[0]){const n=t[3];n.toLowerCase()===e[0].toLowerCase()&&(e[0]=n,t=t.slice(3))}}const{optimizationLevel:o=1}=this.options;o>=2&&(t=this.levelTwoFileOptimize(t)),this.debug("matchOne",this,{file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var i=0,s=0,a=t.length,c=e.length;i<a&&s<c;i++,s++){this.debug("matchOne loop");var u=e[s],l=t[i];if(this.debug(e,u,l),!1===u)return!1;if(u===Ct){this.debug("GLOBSTAR",[e,u,l]);var h=i,f=s+1;if(f===c){for(this.debug("** at the end");i<a;i++)if("."===t[i]||".."===t[i]||!r.dot&&"."===t[i].charAt(0))return!1;return!0}for(;h<a;){var p=t[h];if(this.debug("\nglobstar while",t,h,e,f,p),this.matchOne(t.slice(h),e.slice(f),n))return this.debug("globstar found match!",h,a,p),!0;if("."===p||".."===p||!r.dot&&"."===p.charAt(0)){this.debug("dot detected!",t,h,e,f);break}this.debug("globstar swallow a segment, and continue"),h++}return!(!n||(this.debug("\n>>> no match, partial?",t,h,e,f),h!==a))}let o;if("string"==typeof u?(o=l===u,this.debug("string match",u,l,o)):(o=u.test(l),this.debug("pattern match",u,l,o)),!o)return!1}if(i===a&&s===c)return!0;if(i===a)return n;if(s===c)return i===a-1&&""===t[i];throw new Error("wtf?")}braceExpand(){return Mt(this.pattern,this.options)}parse(t){Ft(t);const e=this.options;if("**"===t)return Ct;if(""===t)return"";let n,r=null;(n=t.match(yt))?r=e.dot?wt:bt:(n=t.match(ct))?r=(e.nocase?e.dot?ft:ht:e.dot?lt:ut)(n[1]):(n=t.match(xt))?r=(e.nocase?e.dot?Pt:Nt:e.dot?At:Ot)(n):(n=t.match(pt))?r=e.dot?gt:dt:(n=t.match(mt))&&(r=vt);let o="",i=!1,s=!1;const a=[],c=[];let u,l=!1,h=!1,f="."===t.charAt(0),p=e.dot||f;const d=t=>"."===t.charAt(0)?"":e.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)",g=()=>{if(l){switch(l){case"*":o+=kt,i=!0;break;case"?":o+=It,i=!0;break;default:o+="\\"+l}this.debug("clearStateChar %j %j",l,o),l=!1}};for(let n,r=0;r<t.length&&(n=t.charAt(r));r++)if(this.debug("%s\t%s %s %j",t,r,o,n),s){if("/"===n)return!1;Lt[n]&&(o+="\\"),o+=n,s=!1}else switch(n){case"/":return!1;case"\\":g(),s=!0;continue;case"?":case"*":case"+":case"@":case"!":this.debug("%s\t%s %s %j <-- stateChar",t,r,o,n),this.debug("call clearStateChar %j",l),g(),l=n,e.noext&&g();continue;case"(":{if(!l){o+="\\(";continue}const e={type:l,start:r-1,reStart:o.length,open:St[l].open,close:St[l].close};this.debug(this.pattern,"\t",e),a.push(e),o+=e.open,0===e.start&&"!"!==e.type&&(f=!0,o+=d(t.slice(r+1))),this.debug("plType %j %j",l,o),l=!1;continue}case")":{const t=a[a.length-1];if(!t){o+="\\)";continue}a.pop(),g(),i=!0,u=t,o+=u.close,"!"===u.type&&c.push(Object.assign(u,{reEnd:o.length}));continue}case"|":{const e=a[a.length-1];if(!e){o+="\\|";continue}g(),o+="|",0===e.start&&"!"!==e.type&&(f=!0,o+=d(t.slice(r+1)));continue}case"[":g();const[p,m,v,y]=ot(t,r);v?(o+=p,h=h||m,r+=v-1,i=i||y):o+="\\[";continue;case"]":o+="\\"+n;continue;default:g(),o+=$t(n)}for(u=a.pop();u;u=a.pop()){let t;t=o.slice(u.reStart+u.open.length),this.debug(this.pattern,"setting tail",o,u),t=t.replace(/((?:\\{2}){0,64})(\\?)\|/g,((t,e,n)=>(n||(n="\\"),e+e+n+"|"))),this.debug("tail=%j\n   %s",t,t,u,o);const e="*"===u.type?kt:"?"===u.type?It:"\\"+u.type;i=!0,o=o.slice(0,u.reStart)+e+"\\("+t}g(),s&&(o+="\\\\");const m=_t[o.charAt(0)];for(let t=c.length-1;t>-1;t--){const e=c[t],n=o.slice(0,e.reStart),r=o.slice(e.reStart,e.reEnd-8);let i=o.slice(e.reEnd);const s=o.slice(e.reEnd-8,e.reEnd)+i,a=n.split(")").length,u=n.split("(").length-a;let l=i;for(let t=0;t<u;t++)l=l.replace(/\)[+*?]?/,"");i=l,o=n+r+i+(""===i?"(?:$|\\/)":"")+s}if(""!==o&&i&&(o="(?=.)"+o),m&&(o=(f?"":p?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)")+o),!e.nocase||i||e.nocaseMagicOnly||(i=t.toUpperCase()!==t.toLowerCase()),!i)return o.replace(/\\(.)/g,"$1");const v=(e.nocase?"i":"")+(h?"u":"");try{const e=r?{_glob:t,_src:o,test:r}:{_glob:t,_src:o};return Object.assign(new RegExp("^"+o+"$",v),e)}catch(t){return this.debug("invalid regexp",t),new RegExp("$.")}}makeRe(){if(this.regexp||!1===this.regexp)return this.regexp;const t=this.set;if(!t.length)return this.regexp=!1,this.regexp;const e=this.options,n=e.noglobstar?kt:e.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",r=e.nocase?"i":"";let o=t.map((t=>{const e=t.map((t=>"string"==typeof t?$t(t):t===Ct?Ct:t._src));return e.forEach(((t,r)=>{const o=e[r+1],i=e[r-1];t===Ct&&i!==Ct&&(void 0===i?void 0!==o&&o!==Ct?e[r+1]="(?:\\/|"+n+"\\/)?"+o:e[r]=n:void 0===o?e[r-1]=i+"(?:\\/|"+n+")?":o!==Ct&&(e[r-1]=i+"(?:\\/|\\/"+n+"\\/)"+o,e[r+1]=Ct))})),e.filter((t=>t!==Ct)).join("/")})).join("|");o="^(?:"+o+")$",this.negate&&(o="^(?!"+o+").*$");try{this.regexp=new RegExp(o,r)}catch(t){this.regexp=!1}return this.regexp}slashSplit(t){return this.preserveMultipleSlashes?t.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(t)?["",...t.split(/\/+/)]:t.split(/\/+/)}match(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.partial;if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;const n=this.options;this.isWindows&&(t=t.split("\\").join("/"));const r=this.slashSplit(t);this.debug(this.pattern,"split",r);const o=this.set;this.debug(this.pattern,"set",o);let i=r[r.length-1];if(!i)for(let t=r.length-2;!i&&t>=0;t--)i=r[t];for(let t=0;t<o.length;t++){const s=o[t];let a=r;if(n.matchBase&&1===s.length&&(a=[i]),this.matchOne(a,s,e))return!!n.flipNegate||!this.negate}return!n.flipNegate&&this.negate}static defaults(t){return st.defaults(t).Minimatch}}function Wt(t){const e=new Error("".concat(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"","Invalid response: ").concat(t.status," ").concat(t.statusText));return e.status=t.status,e.response=t,e}function Vt(t,e){const{status:n}=e;if(401===n&&t.digest)return e;if(n>=400)throw Wt(e);return e}function zt(t,e){return arguments.length>2&&void 0!==arguments[2]&&arguments[2]?{data:e,headers:t.headers?B(t.headers):{},status:t.status,statusText:t.statusText}:e}st.Minimatch=Bt,st.escape=function(t){let{windowsPathsNoEscape:e=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e?t.replace(/[?*()[\]]/g,"[$&]"):t.replace(/[?*()[\]\\]/g,"\\$&")},st.unescape=function(t){let{windowsPathsNoEscape:e=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e?t.replace(/\[([^\/\\])\]/g,"$1"):t.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1")};const qt=(Gt=function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=J({url:g(t.remoteURL,h(e)),method:"COPY",headers:{Destination:g(t.remoteURL,h(n)),Overwrite:!1===r.overwrite?"F":"T",Depth:r.shallow?"0":"infinity"}},t,r);return s=function(e){Vt(t,e)},(i=K(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;var i,s},function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];try{return Promise.resolve(Gt.apply(this,t))}catch(t){return Promise.reject(t)}});var Gt,Ht=n(635),Xt=n(829),Zt=n.n(Xt),Yt=function(t){return t.Array="array",t.Object="object",t.Original="original",t}(Yt||{});function Kt(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Yt.Original;const r=Zt().get(t,e);return"array"===n&&!1===Array.isArray(r)?[r]:"object"===n&&Array.isArray(r)?r[0]:r}function Jt(t){return new Promise((e=>{e(function(t){const{multistatus:e}=t;if(""===e)return{multistatus:{response:[]}};if(!e)throw new Error("Invalid response: No root multistatus found");const n={multistatus:Array.isArray(e)?e[0]:e};return Zt().set(n,"multistatus.response",Kt(n,"multistatus.response",Yt.Array)),Zt().set(n,"multistatus.response",Zt().get(n,"multistatus.response").map((t=>function(t){const e=Object.assign({},t);return e.status?Zt().set(e,"status",Kt(e,"status",Yt.Object)):(Zt().set(e,"propstat",Kt(e,"propstat",Yt.Object)),Zt().set(e,"propstat.prop",Kt(e,"propstat.prop",Yt.Object))),e}(t)))),n}(new Ht.XMLParser({removeNSPrefix:!0,numberParseOptions:{hex:!0,leadingZeros:!1}}).parse(t)))}))}function Qt(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const{getlastmodified:r=null,getcontentlength:o="0",resourcetype:i=null,getcontenttype:s=null,getetag:a=null}=t,u=i&&"object"==typeof i&&void 0!==i.collection?"directory":"file",l={filename:e,basename:c().basename(e),lastmod:r,size:parseInt(o,10),type:u,etag:"string"==typeof a?a.replace(/"/g,""):null};return"file"===u&&(l.mime=s&&"string"==typeof s?s.split(";")[0]:""),n&&(l.props=t),l}function te(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=null;try{t.multistatus.response[0].propstat&&(r=t.multistatus.response[0])}catch(t){}if(!r)throw new Error("Failed getting item stat: bad response");const{propstat:{prop:o,status:i}}=r,[s,a,c]=i.split(" ",3),u=parseInt(a,10);if(u>=400){const t=new Error("Invalid response: ".concat(u," ").concat(c));throw t.status=u,t}return Qt(o,p(e),n)}function ee(t){switch(t.toString()){case"-3":return"unlimited";case"-2":case"-1":return"unknown";default:return parseInt(t,10)}}function ne(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const re=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{details:r=!1}=n,o=J({url:g(t.remoteURL,h(e)),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,n);return ne(K(o,t),(function(n){return Vt(t,n),ne(n.text(),(function(t){return ne(Jt(t),(function(t){const o=te(t,e,r);return zt(n,o,r)}))}))}))}));function oe(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const ie=se((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=function(t){if(!t||"/"===t)return[];let e=t;const n=[];do{n.push(e),e=c().dirname(e)}while(e&&"/"!==e);return n}(p(e));r.sort(((t,e)=>t.length>e.length?1:e.length>t.length?-1:0));let o=!1;return function(t,e,n){if("function"==typeof t[ue]){var r,o,i,s=t[ue]();function l(t){try{for(;!(r=s.next()).done;)if((t=e(r.value))&&t.then){if(!fe(t))return void t.then(l,i||(i=le.bind(null,o=new he,2)));t=t.v}o?le(o,1,t):o=t}catch(t){le(o||(o=new he),2,t)}}if(l(),s.return){var a=function(t){try{r.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,(function(t){throw a(t)}));a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var c=[],u=0;u<t.length;u++)c.push(t[u]);return function(t,e,n){var r,o,i=-1;return function s(a){try{for(;++i<t.length&&(!n||!n());)if((a=e(i))&&a.then){if(!fe(a))return void a.then(s,o||(o=le.bind(null,r=new he,2)));a=a.v}r?le(r,1,a):r=a}catch(t){le(r||(r=new he),2,t)}}(),r}(c,(function(t){return e(c[t])}),n)}(r,(function(r){return i=function(){return function(n,o){try{var i=oe(re(t,r),(function(t){if("directory"!==t.type)throw new Error("Path includes a file: ".concat(e))}))}catch(t){return o(t)}return i&&i.then?i.then(void 0,o):i}(0,(function(e){const i=e;return function(){if(404===i.status)return o=!0,ce(pe(t,r,{...n,recursive:!1}));throw e}()}))},(s=function(){if(o)return ce(pe(t,r,{...n,recursive:!1}))}())&&s.then?s.then(i):i();var i,s}),(function(){return!1}))}));function se(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}function ae(){}function ce(t,e){if(!e)return t&&t.then?t.then(ae):Promise.resolve()}const ue="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function le(t,e,n){if(!t.s){if(n instanceof he){if(!n.s)return void(n.o=le.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(le.bind(null,t,e),le.bind(null,t,2));t.s=e,t.v=n;const r=t.o;r&&r(t)}}const he=function(){function t(){}return t.prototype.then=function(e,n){const r=new t,o=this.s;if(o){const t=1&o?e:n;if(t){try{le(r,1,t(this.v))}catch(t){le(r,2,t)}return r}return this}return this.o=function(t){try{const o=t.v;1&t.s?le(r,1,e?e(o):o):n?le(r,1,n(o)):le(r,2,o)}catch(t){le(r,2,t)}},r},t}();function fe(t){return t instanceof he&&1&t.s}const pe=se((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!0===n.recursive)return ie(t,e,n);const r=J({url:g(t.remoteURL,(o=h(e),o.endsWith("/")?o:o+"/")),method:"MKCOL"},t,n);var o;return oe(K(r,t),(function(e){Vt(t,e)}))}));var de=n(388),ge=n.n(de);const me=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r={};if("object"==typeof n.range&&"number"==typeof n.range.start){let t="bytes=".concat(n.range.start,"-");"number"==typeof n.range.end&&(t="".concat(t).concat(n.range.end)),r.Range=t}const o=J({url:g(t.remoteURL,h(e)),method:"GET",headers:r},t,n);return s=function(e){if(Vt(t,e),r.Range&&206!==e.status){const t=new Error("Invalid response code for partial request: ".concat(e.status));throw t.status=e.status,t}return n.callback&&setTimeout((()=>{n.callback(e)}),0),e.body},(i=K(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;var i,s})),ve=()=>{},ye=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){n.url||(n.url=g(t.remoteURL,h(e)));const r=J(n,t,{});return i=function(e){return Vt(t,e),e},(o=K(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;var o,i})),be=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=J({url:g(t.remoteURL,h(e)),method:"DELETE"},t,n);return i=function(e){Vt(t,e)},(o=K(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;var o,i})),we=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(r,o){try{var i=(s=re(t,e,n),a=function(){return!0},c?a?a(s):s:(s&&s.then||(s=Promise.resolve(s)),a?s.then(a):s))}catch(t){return o(t)}var s,a,c;return i&&i.then?i.then(void 0,o):i}(0,(function(t){if(404===t.status)return!1;throw t}))}));function xe(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Ne=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=J({url:g(t.remoteURL,h(e),"/"),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:n.deep?"infinity":"1"}},t,n);return xe(K(r,t),(function(r){return Vt(t,r),xe(r.text(),(function(o){if(!o)throw new Error("Failed parsing directory contents: Empty response");return xe(Jt(o),(function(o){const i=f(e);let a=function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const i=c().join(e,"/"),{multistatus:{response:a}}=t,u=a.map((t=>{const e=function(t){try{return t.replace(/^https?:\/\/[^\/]+/,"")}catch(t){throw new s(t,"Failed normalising HREF")}}(t.href),{propstat:{prop:n}}=t;return Qt(n,"/"===i?decodeURIComponent(p(e)):p(c().relative(decodeURIComponent(i),decodeURIComponent(e))),r)}));return o?u:u.filter((t=>t.basename&&("file"===t.type||t.filename!==n.replace(/\/$/,""))))}(o,f(t.remoteBasePath||t.remotePath),i,n.details,n.includeSelf);return n.glob&&(a=function(t,e){return t.filter((t=>at(t.filename,e,{matchBase:!0})))}(a,n.glob)),zt(r,a,n.details)}))}))}))}));function Pe(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const Ae=Pe((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=J({url:g(t.remoteURL,h(e)),method:"GET",headers:{Accept:"text/plain"},transformResponse:[je]},t,n);return Oe(K(r,t),(function(e){return Vt(t,e),Oe(e.text(),(function(t){return zt(e,t,n.details)}))}))}));function Oe(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Ee=Pe((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=J({url:g(t.remoteURL,h(e)),method:"GET"},t,n);return Oe(K(r,t),(function(e){let r;return Vt(t,e),function(t,e){var n=t();return n&&n.then?n.then(e):e()}((function(){return Oe(e.arrayBuffer(),(function(t){r=t}))}),(function(){return zt(e,r,n.details)}))}))})),Te=Pe((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{format:r="binary"}=n;if("binary"!==r&&"text"!==r)throw new s({info:{code:S.InvalidOutputFormat}},"Invalid output format: ".concat(r));return"text"===r?Ae(t,e,n):Ee(t,e,n)})),je=t=>t;function Ce(t){return new Ht.XMLBuilder({attributeNamePrefix:"@_",format:!0,ignoreAttributes:!1,suppressEmptyNode:!0}).build(Se({lockinfo:{"@_xmlns:d":"DAV:",lockscope:{exclusive:{}},locktype:{write:{}},owner:{href:t}}},"d"))}function Se(t,e){const n={...t};for(const t in n)n.hasOwnProperty(t)&&(n[t]&&"object"==typeof n[t]&&-1===t.indexOf(":")?(n["".concat(e,":").concat(t)]=Se(n[t],e),delete n[t]):!1===/^@_/.test(t)&&(n["".concat(e,":").concat(t)]=n[t],delete n[t]));return n}function Ie(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function ke(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const Re=ke((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=J({url:g(t.remoteURL,h(e)),method:"UNLOCK",headers:{"Lock-Token":n}},t,r);return Ie(K(o,t),(function(e){if(Vt(t,e),204!==e.status&&200!==e.status)throw Wt(e)}))})),Le=ke((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{refreshToken:r,timeout:o=_e}=n,i={Accept:"text/plain,application/xml",Timeout:o};r&&(i.If=r);const s=J({url:g(t.remoteURL,h(e)),method:"LOCK",headers:i,data:Ce(t.contactHref)},t,n);return Ie(K(s,t),(function(e){return Vt(t,e),Ie(e.text(),(function(t){const n=(i=t,new Ht.XMLParser({removeNSPrefix:!0,parseAttributeValue:!0,parseTagValue:!0}).parse(i)),r=Zt().get(n,"prop.lockdiscovery.activelock.locktoken.href"),o=Zt().get(n,"prop.lockdiscovery.activelock.timeout");var i;if(!r)throw Wt(e,"No lock token received: ");return{token:r,serverTimeout:o}}))}))})),_e="Infinite, Second-4100000000";function Ue(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Me=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=e.path||"/",r=J({url:g(t.remoteURL,n),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,e);return Ue(K(r,t),(function(n){return Vt(t,n),Ue(n.text(),(function(t){return Ue(Jt(t),(function(t){const r=function(t){try{const[e]=t.multistatus.response,{propstat:{prop:{"quota-used-bytes":n,"quota-available-bytes":r}}}=e;return void 0!==n&&void 0!==r?{used:parseInt(n,10),available:ee(r)}:null}catch(t){}return null}(t);return zt(n,r,e.details)}))}))}))}));function Fe(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const De=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{details:r=!1}=n,o=J({url:g(t.remoteURL,h(e)),method:"SEARCH",headers:{Accept:"text/plain,application/xml","Content-Type":t.headers["Content-Type"]||"application/xml; charset=utf-8"}},t,n);return Fe(K(o,t),(function(n){return Vt(t,n),Fe(n.text(),(function(t){return Fe(Jt(t),(function(t){const o=function(t,e,n){const r={truncated:!1,results:[]};return r.truncated=t.multistatus.response.some((t=>{var n,r;return"507"===(null===(n=(t.status||(null===(r=t.propstat)||void 0===r?void 0:r.status)).split(" ",3))||void 0===n?void 0:n[1])&&t.href.replace(/\/$/,"").endsWith(h(e).replace(/\/$/,""))})),t.multistatus.response.forEach((t=>{if(void 0===t.propstat)return;const e=t.href.split("/").map(decodeURIComponent).join("/");r.results.push(Qt(t.propstat.prop,e,n))})),r}(t,e,r);return zt(n,o,r)}))}))}))})),$e=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=J({url:g(t.remoteURL,h(e)),method:"MOVE",headers:{Destination:g(t.remoteURL,h(n)),Overwrite:!1===r.overwrite?"F":"T"}},t,r);return s=function(e){Vt(t,e)},(i=K(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;var i,s}));var Be=n(172);const We=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const{contentLength:o=!0,overwrite:i=!0}=r,a={"Content-Type":"application/octet-stream"};!1===o||(a["Content-Length"]="".concat("number"==typeof o?o:function(t){if(q(t))return t.byteLength;if(G(t))return t.length;if("string"==typeof t)return(0,Be.d)(t);throw new s({info:{code:S.DataTypeNoLength}},"Cannot calculate data length: Invalid type")}(n))),i||(a["If-None-Match"]="*");const c=J({url:g(t.remoteURL,h(e)),method:"PUT",headers:a,data:n},t,r);return l=function(e){try{Vt(t,e)}catch(t){const e=t;if(412!==e.status||i)throw e;return!1}return!0},(u=K(c,t))&&u.then||(u=Promise.resolve(u)),l?u.then(l):u;var u,l})),Ve=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=J({url:g(t.remoteURL,h(e)),method:"OPTIONS"},t,n);return i=function(e){var n,r;try{Vt(t,e)}catch(t){throw t}return{compliance:(null!==(n=e.headers.get("DAV"))&&void 0!==n?n:"").split(",").map((t=>t.trim())),server:null!==(r=e.headers.get("Server"))&&void 0!==r?r:""}},(o=K(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;var o,i}));function ze(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const qe=Xe((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};if(n>r||n<0)throw new s({info:{code:S.InvalidUpdateRange}},"Invalid update range ".concat(n," for partial update"));const a={"Content-Type":"application/octet-stream","Content-Length":"".concat(r-n+1),"Content-Range":"bytes ".concat(n,"-").concat(r,"/*")},c=J({url:g(t.remoteURL,h(e)),method:"PUT",headers:a,data:o},t,i);return ze(K(c,t),(function(e){Vt(t,e)}))}));function Ge(t,e){var n=t();return n&&n.then?n.then(e):e(n)}const He=Xe((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};if(n>r||n<0)throw new s({info:{code:S.InvalidUpdateRange}},"Invalid update range ".concat(n," for partial update"));const a={"Content-Type":"application/x-sabredav-partialupdate","Content-Length":"".concat(r-n+1),"X-Update-Range":"bytes=".concat(n,"-").concat(r)},c=J({url:g(t.remoteURL,h(e)),method:"PATCH",headers:a,data:o},t,i);return ze(K(c,t),(function(e){Vt(t,e)}))}));function Xe(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const Ze=Xe((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};return ze(Ve(t,e,i),(function(a){let c=!1;return Ge((function(){if(a.compliance.includes("sabredav-partialupdate"))return ze(He(t,e,n,r,o,i),(function(t){return c=!0,t}))}),(function(u){let l=!1;return c?u:Ge((function(){if(a.server.includes("Apache")&&a.compliance.includes("<http://apache.org/dav/propset/fs/1>"))return ze(qe(t,e,n,r,o,i),(function(t){return l=!0,t}))}),(function(t){if(l)return t;throw new s({info:{code:S.NotSupported}},"Not supported")}))}))}))})),Ye="https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";function Ke(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{authType:n=null,remoteBasePath:r,contactHref:o=Ye,ha1:i,headers:a={},httpAgent:c,httpsAgent:u,password:l,token:f,username:p,withCredentials:m}=e;let v=n;v||(v=p||l?C.Password:C.None);const y={authType:v,remoteBasePath:r,contactHref:o,ha1:i,headers:Object.assign({},a),httpAgent:c,httpsAgent:u,password:l,remotePath:d(t),remoteURL:t,token:f,username:p,withCredentials:m};return I(y,p,l,f,i),{copyFile:(t,e,n)=>qt(y,t,e,n),createDirectory:(t,e)=>pe(y,t,e),createReadStream:(t,e)=>function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=new(0,ge().PassThrough);return me(t,e,n).then((t=>{t.pipe(r)})).catch((t=>{r.emit("error",t)})),r}(y,t,e),createWriteStream:(t,e,n)=>function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:ve;const o=new(0,ge().PassThrough),i={};!1===n.overwrite&&(i["If-None-Match"]="*");const s=J({url:g(t.remoteURL,h(e)),method:"PUT",headers:i,data:o,maxRedirects:0},t,n);return K(s,t).then((e=>Vt(t,e))).then((t=>{setTimeout((()=>{r(t)}),0)})).catch((t=>{o.emit("error",t)})),o}(y,t,e,n),customRequest:(t,e)=>ye(y,t,e),deleteFile:(t,e)=>be(y,t,e),exists:(t,e)=>we(y,t,e),getDirectoryContents:(t,e)=>Ne(y,t,e),getFileContents:(t,e)=>Te(y,t,e),getFileDownloadLink:t=>function(t,e){let n=g(t.remoteURL,h(e));const r=/^https:/i.test(n)?"https":"http";switch(t.authType){case C.None:break;case C.Password:{const e=P(t.headers.Authorization.replace(/^Basic /i,"").trim());n=n.replace(/^https?:\/\//,"".concat(r,"://").concat(e,"@"));break}default:throw new s({info:{code:S.LinkUnsupportedAuthType}},"Unsupported auth type for file link: ".concat(t.authType))}return n}(y,t),getFileUploadLink:t=>function(t,e){let n="".concat(g(t.remoteURL,h(e)),"?Content-Type=application/octet-stream");const r=/^https:/i.test(n)?"https":"http";switch(t.authType){case C.None:break;case C.Password:{const e=P(t.headers.Authorization.replace(/^Basic /i,"").trim());n=n.replace(/^https?:\/\//,"".concat(r,"://").concat(e,"@"));break}default:throw new s({info:{code:S.LinkUnsupportedAuthType}},"Unsupported auth type for file link: ".concat(t.authType))}return n}(y,t),getHeaders:()=>Object.assign({},y.headers),getQuota:t=>Me(y,t),lock:(t,e)=>Le(y,t,e),moveFile:(t,e,n)=>$e(y,t,e,n),putFileContents:(t,e,n)=>We(y,t,e,n),partialUpdateFileContents:(t,e,n,r,o)=>Ze(y,t,e,n,r,o),getDAVCompliance:t=>Ve(y,t),search:(t,e)=>De(y,t,e),setHeaders:t=>{y.headers=Object.assign({},t)},stat:(t,e)=>re(y,t,e),unlock:(t,e,n)=>Re(y,t,e,n)}}})();var o=r.hT,i=r.O4,s=r.Kd,a=r.YK,c=r.UU,u=r.Gu,l=r.ky,h=r.h4,f=r.hq,p=r.i5;
// EXTERNAL MODULE: http (ignored)
var http_ignored_ = __webpack_require__(29932);
// EXTERNAL MODULE: https (ignored)
var https_ignored_ = __webpack_require__(98383);
;// CONCATENATED MODULE: ./node_modules/@buttercup/fetch/dist/index.browser.js
const inWebWorker = typeof WorkerGlobalScope !== "undefined" &&
    self instanceof WorkerGlobalScope;
const root = inWebWorker
    ? self
    : typeof window !== "undefined"
        ? window
        : globalThis;
const fetch = root.fetch.bind(root);
const Headers = root.Headers;
const Request = root.Request;
const Response = root.Response;

;// CONCATENATED MODULE: ./node_modules/hot-patcher/dist/functions.js
function sequence(...methods) {
    if (methods.length === 0) {
        throw new Error("Failed creating sequence: No functions provided");
    }
    return function __executeSequence(...args) {
        let result = args;
        const _this = this;
        while (methods.length > 0) {
            const method = methods.shift();
            result = [method.apply(_this, result)];
        }
        return result[0];
    };
}

;// CONCATENATED MODULE: ./node_modules/hot-patcher/dist/patcher.js

const HOT_PATCHER_TYPE = "@@HOTPATCHER";
const NOOP = () => { };
function createNewItem(method) {
    return {
        original: method,
        methods: [method],
        final: false
    };
}
/**
 * Hot patching manager class
 */
class HotPatcher {
    constructor() {
        this._configuration = {
            registry: {},
            getEmptyAction: "null"
        };
        this.__type__ = HOT_PATCHER_TYPE;
    }
    /**
     * Configuration object reference
     * @readonly
     */
    get configuration() {
        return this._configuration;
    }
    /**
     * The action to take when a non-set method is requested
     * Possible values: null/throw
     */
    get getEmptyAction() {
        return this.configuration.getEmptyAction;
    }
    set getEmptyAction(newAction) {
        this.configuration.getEmptyAction = newAction;
    }
    /**
     * Control another hot-patcher instance
     * Force the remote instance to use patched methods from calling instance
     * @param target The target instance to control
     * @param allowTargetOverrides Allow the target to override patched methods on
     * the controller (default is false)
     * @returns Returns self
     * @throws {Error} Throws if the target is invalid
     */
    control(target, allowTargetOverrides = false) {
        if (!target || target.__type__ !== HOT_PATCHER_TYPE) {
            throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");
        }
        Object.keys(target.configuration.registry).forEach(foreignKey => {
            if (this.configuration.registry.hasOwnProperty(foreignKey)) {
                if (allowTargetOverrides) {
                    this.configuration.registry[foreignKey] = Object.assign({}, target.configuration.registry[foreignKey]);
                }
            }
            else {
                this.configuration.registry[foreignKey] = Object.assign({}, target.configuration.registry[foreignKey]);
            }
        });
        target._configuration = this.configuration;
        return this;
    }
    /**
     * Execute a patched method
     * @param key The method key
     * @param args Arguments to pass to the method (optional)
     * @see HotPatcher#get
     * @returns The output of the called method
     */
    execute(key, ...args) {
        const method = this.get(key) || NOOP;
        return method(...args);
    }
    /**
     * Get a method for a key
     * @param key The method key
     * @returns Returns the requested function or null if the function
     * does not exist and the host is configured to return null (and not throw)
     * @throws {Error} Throws if the configuration specifies to throw and the method
     * does not exist
     * @throws {Error} Throws if the `getEmptyAction` value is invalid
     */
    get(key) {
        const item = this.configuration.registry[key];
        if (!item) {
            switch (this.getEmptyAction) {
                case "null":
                    return null;
                case "throw":
                    throw new Error(`Failed handling method request: No method provided for override: ${key}`);
                default:
                    throw new Error(`Failed handling request which resulted in an empty method: Invalid empty-action specified: ${this.getEmptyAction}`);
            }
        }
        return sequence(...item.methods);
    }
    /**
     * Check if a method has been patched
     * @param key The function key
     * @returns True if already patched
     */
    isPatched(key) {
        return !!this.configuration.registry[key];
    }
    /**
     * Patch a method name
     * @param key The method key to patch
     * @param method The function to set
     * @param opts Patch options
     * @returns Returns self
     */
    patch(key, method, opts = {}) {
        const { chain = false } = opts;
        if (this.configuration.registry[key] && this.configuration.registry[key].final) {
            throw new Error(`Failed patching '${key}': Method marked as being final`);
        }
        if (typeof method !== "function") {
            throw new Error(`Failed patching '${key}': Provided method is not a function`);
        }
        if (chain) {
            // Add new method to the chain
            if (!this.configuration.registry[key]) {
                // New key, create item
                this.configuration.registry[key] = createNewItem(method);
            }
            else {
                // Existing, push the method
                this.configuration.registry[key].methods.push(method);
            }
        }
        else {
            // Replace the original
            if (this.isPatched(key)) {
                const { original } = this.configuration.registry[key];
                this.configuration.registry[key] = Object.assign(createNewItem(method), {
                    original
                });
            }
            else {
                this.configuration.registry[key] = createNewItem(method);
            }
        }
        return this;
    }
    /**
     * Patch a method inline, execute it and return the value
     * Used for patching contents of functions. This method will not apply a patched
     * function if it has already been patched, allowing for external overrides to
     * function. It also means that the function is cached so that it is not
     * instantiated every time the outer function is invoked.
     * @param key The function key to use
     * @param method The function to patch (once, only if not patched)
     * @param args Arguments to pass to the function
     * @returns The output of the patched function
     * @example
     *  function mySpecialFunction(a, b) {
     *      return hotPatcher.patchInline("func", (a, b) => {
     *          return a + b;
     *      }, a, b);
     *  }
     */
    patchInline(key, method, ...args) {
        if (!this.isPatched(key)) {
            this.patch(key, method);
        }
        return this.execute(key, ...args);
    }
    /**
     * Patch a method (or methods) in sequential-mode
     * See `patch()` with the option `chain: true`
     * @see patch
     * @param key The key to patch
     * @param methods The methods to patch
     * @returns Returns self
     */
    plugin(key, ...methods) {
        methods.forEach(method => {
            this.patch(key, method, { chain: true });
        });
        return this;
    }
    /**
     * Restore a patched method if it has been overridden
     * @param key The method key
     * @returns Returns self
     */
    restore(key) {
        if (!this.isPatched(key)) {
            throw new Error(`Failed restoring method: No method present for key: ${key}`);
        }
        else if (typeof this.configuration.registry[key].original !== "function") {
            throw new Error(`Failed restoring method: Original method not found or of invalid type for key: ${key}`);
        }
        this.configuration.registry[key].methods = [this.configuration.registry[key].original];
        return this;
    }
    /**
     * Set a method as being final
     * This sets a method as having been finally overridden. Attempts at overriding
     * again will fail with an error.
     * @param key The key to make final
     * @returns Returns self
     */
    setFinal(key) {
        if (!this.configuration.registry.hasOwnProperty(key)) {
            throw new Error(`Failed marking '${key}' as final: No method found for key`);
        }
        this.configuration.registry[key].final = true;
        return this;
    }
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/compat/patcher.js

let __patcher = null;
function getPatcher() {
    if (!__patcher) {
        __patcher = new HotPatcher();
    }
    return __patcher;
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/compat/env.js
function getDebugBuildName() {
    if (typeof TARGET === "string") {
        return TARGET;
    }
    return "node";
}
function isReactNative() {
    return typeof TARGET === "string" && TARGET === "react-native";
}
function env_isWeb() {
    return typeof TARGET === "string" && TARGET === "web";
}

// EXTERNAL MODULE: ./node_modules/md5/md5.js
var md5 = __webpack_require__(83503);
;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/tools/crypto.js

function ha1Compute(algorithm, user, realm, pass, nonce, cnonce, ha1) {
    const ha1Hash = ha1 || md5(`${user}:${realm}:${pass}`);
    if (algorithm && algorithm.toLowerCase() === "md5-sess") {
        return md5(`${ha1Hash}:${nonce}:${cnonce}`);
    }
    return ha1Hash;
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/auth/digest.js


const NONCE_CHARS = "abcdef0123456789";
const NONCE_SIZE = 32;
function createDigestContext(username, password, ha1) {
    return { username, password, ha1, nc: 0, algorithm: "md5", hasDigestAuth: false };
}
function generateDigestAuthHeader(options, digest) {
    const url = options.url.replace("//", "");
    const uri = url.indexOf("/") == -1 ? "/" : url.slice(url.indexOf("/"));
    const method = options.method ? options.method.toUpperCase() : "GET";
    const qop = /(^|,)\s*auth\s*($|,)/.test(digest.qop) ? "auth" : false;
    const ncString = `00000000${digest.nc}`.slice(-8);
    const ha1 = ha1Compute(digest.algorithm, digest.username, digest.realm, digest.password, digest.nonce, digest.cnonce, digest.ha1);
    const ha2 = md5(`${method}:${uri}`);
    const digestResponse = qop
        ? md5(`${ha1}:${digest.nonce}:${ncString}:${digest.cnonce}:${qop}:${ha2}`)
        : md5(`${ha1}:${digest.nonce}:${ha2}`);
    const authValues = {
        username: digest.username,
        realm: digest.realm,
        nonce: digest.nonce,
        uri,
        qop,
        response: digestResponse,
        nc: ncString,
        cnonce: digest.cnonce,
        algorithm: digest.algorithm,
        opaque: digest.opaque
    };
    const authHeader = [];
    for (const k in authValues) {
        if (authValues[k]) {
            if (k === "qop" || k === "nc" || k === "algorithm") {
                authHeader.push(`${k}=${authValues[k]}`);
            }
            else {
                authHeader.push(`${k}="${authValues[k]}"`);
            }
        }
    }
    return `Digest ${authHeader.join(", ")}`;
}
function makeNonce() {
    let uid = "";
    for (let i = 0; i < NONCE_SIZE; ++i) {
        uid = `${uid}${NONCE_CHARS[Math.floor(Math.random() * NONCE_CHARS.length)]}`;
    }
    return uid;
}
function parseDigestAuth(response, _digest) {
    const isDigest = responseIndicatesDigestAuth(response);
    if (!isDigest) {
        return false;
    }
    const re = /([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;
    for (;;) {
        const authHeader = (response.headers && response.headers.get("www-authenticate")) || "";
        const match = re.exec(authHeader);
        if (!match) {
            break;
        }
        _digest[match[1]] = match[2] || match[3];
    }
    _digest.nc += 1;
    _digest.cnonce = makeNonce();
    return true;
}
function responseIndicatesDigestAuth(response) {
    const authHeader = (response.headers && response.headers.get("www-authenticate")) || "";
    return authHeader.split(/\s/)[0].toLowerCase() === "digest";
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/tools/merge.js
function merge_cloneShallow(obj) {
    return isPlainObject(obj)
        ? Object.assign({}, obj)
        : Object.setPrototypeOf(Object.assign({}, obj), Object.getPrototypeOf(obj));
}
function isPlainObject(obj) {
    if (typeof obj !== "object" ||
        obj === null ||
        Object.prototype.toString.call(obj) != "[object Object]") {
        // Not an object
        return false;
    }
    if (Object.getPrototypeOf(obj) === null) {
        return true;
    }
    let proto = obj;
    // Find the prototype
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
}
function merge(...args) {
    let output = null, items = [...args];
    while (items.length > 0) {
        const nextItem = items.shift();
        if (!output) {
            output = merge_cloneShallow(nextItem);
        }
        else {
            output = mergeObjects(output, nextItem);
        }
    }
    return output;
}
function mergeObjects(obj1, obj2) {
    const output = merge_cloneShallow(obj1);
    Object.keys(obj2).forEach(key => {
        if (!output.hasOwnProperty(key)) {
            output[key] = obj2[key];
            return;
        }
        if (Array.isArray(obj2[key])) {
            output[key] = Array.isArray(output[key])
                ? [...output[key], ...obj2[key]]
                : [...obj2[key]];
        }
        else if (typeof obj2[key] === "object" && !!obj2[key]) {
            output[key] =
                typeof output[key] === "object" && !!output[key]
                    ? mergeObjects(output[key], obj2[key])
                    : merge_cloneShallow(obj2[key]);
        }
        else {
            output[key] = obj2[key];
        }
    });
    return output;
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/tools/headers.js
function convertResponseHeaders(headers) {
    const output = {};
    for (const key of headers.keys()) {
        output[key] = headers.get(key);
    }
    return output;
}
function headers_mergeHeaders(...headerPayloads) {
    if (headerPayloads.length === 0)
        return {};
    const headerKeys = {};
    return headerPayloads.reduce((output, headers) => {
        Object.keys(headers).forEach(header => {
            const lowerHeader = header.toLowerCase();
            if (headerKeys.hasOwnProperty(lowerHeader)) {
                output[headerKeys[lowerHeader]] = headers[header];
            }
            else {
                headerKeys[lowerHeader] = header;
                output[header] = headers[header];
            }
        });
        return output;
    }, {});
}

// EXTERNAL MODULE: stream (ignored)
var stream_ignored_ = __webpack_require__(68888);
;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/compat/arrayBuffer.js
const hasArrayBuffer = typeof ArrayBuffer === "function";
const { toString: objToString } = Object.prototype;
// Taken from: https://github.com/fengyuanchen/is-array-buffer/blob/master/src/index.js
function isArrayBuffer(value) {
    return (hasArrayBuffer &&
        (value instanceof ArrayBuffer || objToString.call(value) === "[object ArrayBuffer]"));
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/compat/buffer.js
function isBuffer(value) {
    return (value != null &&
        value.constructor != null &&
        typeof value.constructor.isBuffer === "function" &&
        value.constructor.isBuffer(value));
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/tools/body.js




function requestDataToFetchBody(data) {
    if (!env_isWeb() && !isReactNative() && data instanceof stream_ignored_.Readable) {
        // @ts-ignore
        return [data, {}];
    }
    if (typeof data === "string") {
        return [data, {}];
    }
    else if (isBuffer(data)) {
        return [data, {}];
    }
    else if (isArrayBuffer(data)) {
        return [data, {}];
    }
    else if (data && typeof data === "object") {
        return [
            JSON.stringify(data),
            {
                "content-type": "application/json"
            }
        ];
    }
    throw new Error(`Unable to convert request body: Unexpected body type: ${typeof data}`);
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/types.js

var AuthType;
(function (AuthType) {
    AuthType["Auto"] = "auto";
    AuthType["Digest"] = "digest";
    AuthType["None"] = "none";
    AuthType["Password"] = "password";
    AuthType["Token"] = "token";
})(AuthType || (AuthType = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["DataTypeNoLength"] = "data-type-no-length";
    ErrorCode["InvalidAuthType"] = "invalid-auth-type";
    ErrorCode["InvalidOutputFormat"] = "invalid-output-format";
    ErrorCode["LinkUnsupportedAuthType"] = "link-unsupported-auth";
    ErrorCode["InvalidUpdateRange"] = "invalid-update-range";
    ErrorCode["NotSupported"] = "not-supported";
})(ErrorCode || (ErrorCode = {}));

;// CONCATENATED MODULE: ./node_modules/layerr/dist/error.js
function assertError(err) {
    if (!isError(err)) {
        throw new Error("Parameter was not an error");
    }
}
function isError(err) {
    return objectToString(err) === "[object Error]" || err instanceof Error;
}
function objectToString(obj) {
    return Object.prototype.toString.call(obj);
}

;// CONCATENATED MODULE: ./node_modules/layerr/dist/tools.js

function parseArguments(args) {
    let options, shortMessage = "";
    if (args.length === 0) {
        options = {};
    }
    else if (isError(args[0])) {
        options = {
            cause: args[0]
        };
        shortMessage = args.slice(1).join(" ") || "";
    }
    else if (args[0] && typeof args[0] === "object") {
        options = Object.assign({}, args[0]);
        shortMessage = args.slice(1).join(" ") || "";
    }
    else if (typeof args[0] === "string") {
        options = {};
        shortMessage = shortMessage = args.join(" ") || "";
    }
    else {
        throw new Error("Invalid arguments passed to Layerr");
    }
    return {
        options,
        shortMessage
    };
}

;// CONCATENATED MODULE: ./node_modules/layerr/dist/layerr.js


class Layerr extends Error {
    constructor(errorOptionsOrMessage, messageText) {
        const args = [...arguments];
        const { options, shortMessage } = parseArguments(args);
        let message = shortMessage;
        if (options.cause) {
            message = `${message}: ${options.cause.message}`;
        }
        super(message);
        this.message = message;
        if (options.name && typeof options.name === "string") {
            this.name = options.name;
        }
        else {
            this.name = "Layerr";
        }
        if (options.cause) {
            Object.defineProperty(this, "_cause", { value: options.cause });
        }
        Object.defineProperty(this, "_info", { value: {} });
        if (options.info && typeof options.info === "object") {
            Object.assign(this._info, options.info);
        }
        if (Error.captureStackTrace) {
            const ctor = options.constructorOpt || this.constructor;
            Error.captureStackTrace(this, ctor);
        }
    }
    static cause(err) {
        assertError(err);
        if (!err._cause)
            return null;
        return isError(err._cause) ? err._cause : null;
    }
    static fullStack(err) {
        assertError(err);
        const cause = Layerr.cause(err);
        if (cause) {
            return `${err.stack}\ncaused by: ${Layerr.fullStack(cause)}`;
        }
        return err.stack;
    }
    static info(err) {
        assertError(err);
        const output = {};
        const cause = Layerr.cause(err);
        if (cause) {
            Object.assign(output, Layerr.info(cause));
        }
        if (err._info) {
            Object.assign(output, err._info);
        }
        return output;
    }
    cause() {
        return Layerr.cause(this);
    }
    toString() {
        let output = this.name || this.constructor.name || this.constructor.prototype.name;
        if (this.message) {
            output = `${output}: ${this.message}`;
        }
        return output;
    }
}

;// CONCATENATED MODULE: ./node_modules/layerr/dist/index.js




// EXTERNAL MODULE: ./node_modules/base-64/base64.js
var base_64_base64 = __webpack_require__(85914);
// EXTERNAL MODULE: ./node_modules/he/he.js
var he_he = __webpack_require__(66067);
;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/tools/encode.js



function decodeHTMLEntities(text) {
    if (isWeb()) {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }
    return he.decode(text);
}
function fromBase64(text) {
    return base64.decode(text);
}
function toBase64(text) {
    return base_64_base64.encode(text);
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/auth/basic.js

function generateBasicAuthHeader(username, password) {
    const encoded = toBase64(`${username}:${password}`);
    return `Basic ${encoded}`;
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/auth/oauth.js
function generateTokenAuthHeader(token) {
    return `${token.token_type} ${token.access_token}`;
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/auth/index.js





function setupAuth(context, username, password, oauthToken, ha1) {
    switch (context.authType) {
        case AuthType.Auto:
            if (username && password) {
                context.headers.Authorization = generateBasicAuthHeader(username, password);
            }
            break;
        case AuthType.Digest:
            context.digest = createDigestContext(username, password, ha1);
            break;
        case AuthType.None:
            // Do nothing
            break;
        case AuthType.Password:
            context.headers.Authorization = generateBasicAuthHeader(username, password);
            break;
        case AuthType.Token:
            context.headers.Authorization = generateTokenAuthHeader(oauthToken);
            break;
        default:
            throw new Layerr({
                info: {
                    code: ErrorCode.InvalidAuthType
                }
            }, `Invalid auth type: ${context.authType}`);
    }
}

;// CONCATENATED MODULE: ./node_modules/webdav/dist/node/request.js











function getFetchOptions(requestOptions) {
    let headers = {};
    // Handle standard options
    const opts = {
        method: requestOptions.method
    };
    if (requestOptions.headers) {
        headers = headers_mergeHeaders(headers, requestOptions.headers);
    }
    if (typeof requestOptions.data !== "undefined") {
        const [body, newHeaders] = requestDataToFetchBody(requestOptions.data);
        opts.body = body;
        headers = headers_mergeHeaders(headers, newHeaders);
    }
    if (requestOptions.signal) {
        opts.signal = requestOptions.signal;
    }
    if (requestOptions.withCredentials) {
        opts.credentials = "include";
    }
    // Check for node-specific options
    if (!env_isWeb() && !isReactNative()) {
        if (requestOptions.httpAgent || requestOptions.httpsAgent) {
            opts.agent = (parsedURL) => {
                if (parsedURL.protocol === "http:") {
                    return requestOptions.httpAgent || new http_ignored_.Agent();
                }
                return requestOptions.httpsAgent || new https_ignored_.Agent();
            };
        }
    }
    // Attach headers
    opts.headers = headers;
    return opts;
}
function prepareRequestOptions(requestOptions, context, userOptions) {
    const finalOptions = cloneShallow(requestOptions);
    finalOptions.headers = mergeHeaders(context.headers, finalOptions.headers || {}, userOptions.headers || {});
    if (typeof userOptions.data !== "undefined") {
        finalOptions.data = userOptions.data;
    }
    if (userOptions.signal) {
        finalOptions.signal = userOptions.signal;
    }
    if (context.httpAgent) {
        finalOptions.httpAgent = context.httpAgent;
    }
    if (context.httpsAgent) {
        finalOptions.httpsAgent = context.httpsAgent;
    }
    if (context.digest) {
        finalOptions._digest = context.digest;
    }
    if (typeof context.withCredentials === "boolean") {
        finalOptions.withCredentials = context.withCredentials;
    }
    return finalOptions;
}
async function request(requestOptions, context) {
    if (context.authType === AuthType.Auto) {
        return requestAuto(requestOptions, context);
    }
    if (requestOptions._digest) {
        return requestDigest(requestOptions);
    }
    return requestStandard(requestOptions);
}
async function requestAuto(requestOptions, context) {
    const response = await requestStandard(requestOptions);
    if (response.ok) {
        context.authType = AuthType.Password;
        return response;
    }
    if (response.status == 401 && responseIndicatesDigestAuth(response)) {
        context.authType = AuthType.Digest;
        setupAuth(context, context.username, context.password, undefined, undefined);
        requestOptions._digest = context.digest;
        return requestDigest(requestOptions);
    }
    return response;
}
async function requestDigest(requestOptions) {
    // Remove client's digest authentication object from request options
    const _digest = requestOptions._digest;
    delete requestOptions._digest;
    // If client is already using digest authentication, include the digest authorization header
    if (_digest.hasDigestAuth) {
        requestOptions = merge(requestOptions, {
            headers: {
                Authorization: generateDigestAuthHeader(requestOptions, _digest)
            }
        });
    }
    // Perform digest request + check
    const response = await requestStandard(requestOptions);
    if (response.status == 401) {
        _digest.hasDigestAuth = parseDigestAuth(response, _digest);
        if (_digest.hasDigestAuth) {
            requestOptions = merge(requestOptions, {
                headers: {
                    Authorization: generateDigestAuthHeader(requestOptions, _digest)
                }
            });
            const response2 = await requestStandard(requestOptions);
            if (response2.status == 401) {
                _digest.hasDigestAuth = false;
            }
            else {
                _digest.nc++;
            }
            return response2;
        }
    }
    else {
        _digest.nc++;
    }
    return response;
}
function requestStandard(requestOptions) {
    const patcher = getPatcher();
    return patcher.patchInline("request", (options) => patcher.patchInline("fetch", fetch, options.url, getFetchOptions(options)), requestOptions);
}

;// CONCATENATED MODULE: ./node_modules/@nextcloud/files/dist/index.mjs







const mt = (t) => t === null ? (0,dist/* getLoggerBuilder */.YK)().setApp("files").build() : (0,dist/* getLoggerBuilder */.YK)().setApp("files").setUid(t.uid).build(), m = mt(getCurrentUser());
class wt {
  _entries = [];
  registerEntry(e) {
    this.validateEntry(e), this._entries.push(e);
  }
  unregisterEntry(e) {
    const i = typeof e == "string" ? this.getEntryIndex(e) : this.getEntryIndex(e.id);
    if (i === -1) {
      m.warn("Entry not found, nothing removed", { entry: e, entries: this.getEntries() });
      return;
    }
    this._entries.splice(i, 1);
  }
  getEntries(e) {
    return e ? this._entries.filter((i) => typeof i.if == "function" ? i.if(e) : !0) : this._entries;
  }
  getEntryIndex(e) {
    return this._entries.findIndex((i) => i.id === e);
  }
  validateEntry(e) {
    if (!e.id || !e.displayName || !(e.iconSvgInline || e.iconClass || e.handler))
      throw new Error("Invalid entry");
    if (typeof e.id != "string" || typeof e.displayName != "string")
      throw new Error("Invalid id or displayName property");
    if (e.iconClass && typeof e.iconClass != "string" || e.iconSvgInline && typeof e.iconSvgInline != "string")
      throw new Error("Invalid icon provided");
    if (e.if !== void 0 && typeof e.if != "function")
      throw new Error("Invalid if property");
    if (e.templateName && typeof e.templateName != "string")
      throw new Error("Invalid templateName property");
    if (e.handler && typeof e.handler != "function")
      throw new Error("Invalid handler property");
    if (!e.templateName && !e.handler)
      throw new Error("At least a templateName or a handler must be provided");
    if (this.getEntryIndex(e.id) !== -1)
      throw new Error("Duplicate entry");
  }
}
const S = function() {
  return typeof window._nc_newfilemenu > "u" && (window._nc_newfilemenu = new wt(), m.debug("NewFileMenu initialized")), window._nc_newfilemenu;
}, I = ["B", "KB", "MB", "GB", "TB", "PB"], O = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
function We(t, e = !1, i = !1) {
  typeof t == "string" && (t = Number(t));
  let s = t > 0 ? Math.floor(Math.log(t) / Math.log(i ? 1024 : 1e3)) : 0;
  s = Math.min((i ? O.length : I.length) - 1, s);
  const n = i ? O[s] : I[s];
  let r = (t / Math.pow(i ? 1024 : 1e3, s)).toFixed(1);
  return e === !0 && s === 0 ? (r !== "0.0" ? "< 1 " : "0 ") + (i ? O[1] : I[1]) : (s < 2 ? r = parseFloat(r).toFixed(0) : r = parseFloat(r).toLocaleString((0,l10n_dist/* getCanonicalLocale */.lO)()), r + " " + n);
}
var H = ((t) => (t.DEFAULT = "default", t.HIDDEN = "hidden", t))(H || {});
class Ye {
  _action;
  constructor(e) {
    this.validateAction(e), this._action = e;
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
  get default() {
    return this._action.default;
  }
  get inline() {
    return this._action.inline;
  }
  get renderInline() {
    return this._action.renderInline;
  }
  validateAction(e) {
    if (!e.id || typeof e.id != "string")
      throw new Error("Invalid id");
    if (!e.displayName || typeof e.displayName != "function")
      throw new Error("Invalid displayName function");
    if (!e.iconSvgInline || typeof e.iconSvgInline != "function")
      throw new Error("Invalid iconSvgInline function");
    if (!e.exec || typeof e.exec != "function")
      throw new Error("Invalid exec function");
    if ("enabled" in e && typeof e.enabled != "function")
      throw new Error("Invalid enabled function");
    if ("execBatch" in e && typeof e.execBatch != "function")
      throw new Error("Invalid execBatch function");
    if ("order" in e && typeof e.order != "number")
      throw new Error("Invalid order");
    if (e.default && !Object.values(H).includes(e.default))
      throw new Error("Invalid default");
    if ("inline" in e && typeof e.inline != "function")
      throw new Error("Invalid inline function");
    if ("renderInline" in e && typeof e.renderInline != "function")
      throw new Error("Invalid renderInline function");
  }
}
const Ze = function(t) {
  if (typeof window._nc_fileactions > "u" && (window._nc_fileactions = [], m.debug("FileActions initialized")), window._nc_fileactions.find((e) => e.id === t.id)) {
    m.error(`FileAction ${t.id} already registered`, { action: t });
    return;
  }
  window._nc_fileactions.push(t);
}, Je = function() {
  return typeof window._nc_fileactions > "u" && (window._nc_fileactions = [], m.debug("FileActions initialized")), window._nc_fileactions;
};
class Qe {
  _header;
  constructor(e) {
    this.validateHeader(e), this._header = e;
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
  validateHeader(e) {
    if (!e.id || !e.render || !e.updated)
      throw new Error("Invalid header: id, render and updated are required");
    if (typeof e.id != "string")
      throw new Error("Invalid id property");
    if (e.enabled !== void 0 && typeof e.enabled != "function")
      throw new Error("Invalid enabled property");
    if (e.render && typeof e.render != "function")
      throw new Error("Invalid render property");
    if (e.updated && typeof e.updated != "function")
      throw new Error("Invalid updated property");
  }
}
const ti = function(t) {
  if (typeof window._nc_filelistheader > "u" && (window._nc_filelistheader = [], m.debug("FileListHeaders initialized")), window._nc_filelistheader.find((e) => e.id === t.id)) {
    m.error(`Header ${t.id} already registered`, { header: t });
    return;
  }
  window._nc_filelistheader.push(t);
}, ei = function() {
  return typeof window._nc_filelistheader > "u" && (window._nc_filelistheader = [], m.debug("FileListHeaders initialized")), window._nc_filelistheader;
};
var v = ((t) => (t[t.NONE = 0] = "NONE", t[t.CREATE = 4] = "CREATE", t[t.READ = 1] = "READ", t[t.UPDATE = 2] = "UPDATE", t[t.DELETE = 8] = "DELETE", t[t.SHARE = 16] = "SHARE", t[t.ALL = 31] = "ALL", t))(v || {});
const K = ["d:getcontentlength", "d:getcontenttype", "d:getetag", "d:getlastmodified", "d:quota-available-bytes", "d:resourcetype", "nc:has-preview", "nc:is-encrypted", "nc:mount-type", "nc:share-attributes", "oc:comments-unread", "oc:favorite", "oc:fileid", "oc:owner-display-name", "oc:owner-id", "oc:permissions", "oc:share-types", "oc:size", "ocs:share-permissions"], W = { d: "DAV:", nc: "http://nextcloud.org/ns", oc: "http://owncloud.org/ns", ocs: "http://open-collaboration-services.org/ns" }, ii = function(t, e = { nc: "http://nextcloud.org/ns" }) {
  typeof window._nc_dav_properties > "u" && (window._nc_dav_properties = [...K], window._nc_dav_namespaces = { ...W });
  const i = { ...window._nc_dav_namespaces, ...e };
  if (window._nc_dav_properties.find((n) => n === t))
    return m.error(`${t} already registered`, { prop: t }), !1;
  if (t.startsWith("<") || t.split(":").length !== 2)
    return m.error(`${t} is not valid. See example: 'oc:fileid'`, { prop: t }), !1;
  const s = t.split(":")[0];
  return i[s] ? (window._nc_dav_properties.push(t), window._nc_dav_namespaces = i, !0) : (m.error(`${t} namespace unknown`, { prop: t, namespaces: i }), !1);
}, F = function() {
  return typeof window._nc_dav_properties > "u" && (window._nc_dav_properties = [...K]), window._nc_dav_properties.map((t) => `<${t} />`).join(" ");
}, V = function() {
  return typeof window._nc_dav_namespaces > "u" && (window._nc_dav_namespaces = { ...W }), Object.keys(window._nc_dav_namespaces).map((t) => `xmlns:${t}="${window._nc_dav_namespaces?.[t]}"`).join(" ");
}, ni = function() {
  return `<?xml version="1.0"?>
		<d:propfind ${V()}>
			<d:prop>
				${F()}
			</d:prop>
		</d:propfind>`;
}, vt = function() {
  return `<?xml version="1.0"?>
		<oc:filter-files ${V()}>
			<d:prop>
				${F()}
			</d:prop>
			<oc:filter-rules>
				<oc:favorite>1</oc:favorite>
			</oc:filter-rules>
		</oc:filter-files>`;
}, ri = function(t) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<d:searchrequest ${V()}
	xmlns:ns="https://github.com/icewind1991/SearchDAV/ns">
	<d:basicsearch>
		<d:select>
			<d:prop>
				${F()}
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
					<d:literal>${t}</d:literal>
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
}, yt = function(t = "") {
  let e = v.NONE;
  return t && ((t.includes("C") || t.includes("K")) && (e |= v.CREATE), t.includes("G") && (e |= v.READ), (t.includes("W") || t.includes("N") || t.includes("V")) && (e |= v.UPDATE), t.includes("D") && (e |= v.DELETE), t.includes("R") && (e |= v.SHARE)), e;
};
var dist_$ = ((t) => (t.Folder = "folder", t.File = "file", t))(dist_$ || {});
const Y = function(t, e) {
  return t.match(e) !== null;
}, M = (t, e) => {
  if (t.id && typeof t.id != "number")
    throw new Error("Invalid id type of value");
  if (!t.source)
    throw new Error("Missing mandatory source");
  try {
    new URL(t.source);
  } catch {
    throw new Error("Invalid source format, source must be a valid URL");
  }
  if (!t.source.startsWith("http"))
    throw new Error("Invalid source format, only http(s) is supported");
  if (t.mtime && !(t.mtime instanceof Date))
    throw new Error("Invalid mtime type");
  if (t.crtime && !(t.crtime instanceof Date))
    throw new Error("Invalid crtime type");
  if (!t.mime || typeof t.mime != "string" || !t.mime.match(/^[-\w.]+\/[-+\w.]+$/gi))
    throw new Error("Missing or invalid mandatory mime");
  if ("size" in t && typeof t.size != "number" && t.size !== void 0)
    throw new Error("Invalid size type");
  if ("permissions" in t && t.permissions !== void 0 && !(typeof t.permissions == "number" && t.permissions >= v.NONE && t.permissions <= v.ALL))
    throw new Error("Invalid permissions");
  if (t.owner && t.owner !== null && typeof t.owner != "string")
    throw new Error("Invalid owner type");
  if (t.attributes && typeof t.attributes != "object")
    throw new Error("Invalid attributes type");
  if (t.root && typeof t.root != "string")
    throw new Error("Invalid root type");
  if (t.root && !t.root.startsWith("/"))
    throw new Error("Root must start with a leading slash");
  if (t.root && !t.source.includes(t.root))
    throw new Error("Root must be part of the source");
  if (t.root && Y(t.source, e)) {
    const i = t.source.match(e)[0];
    if (!t.source.includes((0,path.join)(i, t.root)))
      throw new Error("The root must be relative to the service. e.g /files/emma");
  }
  if (t.status && !Object.values(Z).includes(t.status))
    throw new Error("Status must be a valid NodeStatus");
};
var Z = ((t) => (t.NEW = "new", t.FAILED = "failed", t.LOADING = "loading", t.LOCKED = "locked", t))(Z || {});
class J {
  _data;
  _attributes;
  _knownDavService = /(remote|public)\.php\/(web)?dav/i;
  constructor(e, i) {
    M(e, i || this._knownDavService), this._data = e;
    const s = { set: (n, r, l) => (this.updateMtime(), Reflect.set(n, r, l)), deleteProperty: (n, r) => (this.updateMtime(), Reflect.deleteProperty(n, r)) };
    this._attributes = new Proxy(e.attributes || {}, s), delete this._data.attributes, i && (this._knownDavService = i);
  }
  get source() {
    return this._data.source.replace(/\/$/i, "");
  }
  get basename() {
    return (0,path.basename)(this.source);
  }
  get extension() {
    return (0,path.extname)(this.source);
  }
  get dirname() {
    if (this.root) {
      const i = this.source.indexOf(this.root);
      return (0,path.dirname)(this.source.slice(i + this.root.length) || "/");
    }
    const e = new URL(this.source);
    return (0,path.dirname)(e.pathname);
  }
  get mime() {
    return this._data.mime;
  }
  get mtime() {
    return this._data.mtime;
  }
  get crtime() {
    return this._data.crtime;
  }
  get size() {
    return this._data.size;
  }
  get attributes() {
    return this._attributes;
  }
  get permissions() {
    return this.owner === null && !this.isDavRessource ? v.READ : this._data.permissions !== void 0 ? this._data.permissions : v.NONE;
  }
  get owner() {
    return this.isDavRessource ? this._data.owner : null;
  }
  get isDavRessource() {
    return Y(this.source, this._knownDavService);
  }
  get root() {
    return this._data.root ? this._data.root.replace(/^(.+)\/$/, "$1") : this.isDavRessource && (0,path.dirname)(this.source).split(this._knownDavService).pop() || null;
  }
  get path() {
    if (this.root) {
      const e = this.source.indexOf(this.root);
      return this.source.slice(e + this.root.length) || "/";
    }
    return (this.dirname + "/" + this.basename).replace(/\/\//g, "/");
  }
  get fileid() {
    return this._data?.id || this.attributes?.fileid;
  }
  get status() {
    return this._data?.status;
  }
  set status(e) {
    this._data.status = e;
  }
  move(e) {
    M({ ...this._data, source: e }, this._knownDavService), this._data.source = e, this.updateMtime();
  }
  rename(e) {
    if (e.includes("/"))
      throw new Error("Invalid basename");
    this.move((0,path.dirname)(this.source) + "/" + e);
  }
  updateMtime() {
    this._data.mtime && (this._data.mtime = /* @__PURE__ */ new Date());
  }
}
class xt extends J {
  get type() {
    return dist_$.File;
  }
}
class bt extends J {
  constructor(e) {
    super({ ...e, mime: "httpd/unix-directory" });
  }
  get type() {
    return dist_$.Folder;
  }
  get extension() {
    return null;
  }
  get mime() {
    return "httpd/unix-directory";
  }
}
const Q = `/files/${getCurrentUser()?.uid}`, tt = (0,router_dist/* generateRemoteUrl */.dC)("dav"), si = function(t = tt) {
  const e = c(t, { headers: { requesttoken: getRequestToken() || "" } });
  return u().patch("request", (i) => (i.headers?.method && (i.method = i.headers.method, delete i.headers.method), request(i))), e;
}, oi = async (t, e = "/", i = Q) => (await t.getDirectoryContents(`${i}${e}`, { details: !0, data: vt(), headers: { method: "REPORT" }, includeSelf: !0 })).data.filter((s) => s.filename !== e).map((s) => Et(s, i)), Et = function(t, e = Q, i = tt) {
  const s = t.props, n = yt(s?.permissions), r = getCurrentUser()?.uid, l = { id: s?.fileid || 0, source: `${i}${t.filename}`, mtime: new Date(Date.parse(t.lastmod)), mime: t.mime, size: s?.size || Number.parseInt(s.getcontentlength || "0"), permissions: n, owner: r, root: e, attributes: { ...t, ...s, hasPreview: s?.["has-preview"] } };
  return delete l.attributes?.props, t.type === "file" ? new xt(l) : new bt(l);
};
class Nt {
  _views = [];
  _currentView = null;
  register(e) {
    if (this._views.find((i) => i.id === e.id))
      throw new Error(`View id ${e.id} is already registered`);
    this._views.push(e);
  }
  remove(e) {
    const i = this._views.findIndex((s) => s.id === e);
    i !== -1 && this._views.splice(i, 1);
  }
  get views() {
    return this._views;
  }
  setActive(e) {
    this._currentView = e;
  }
  get active() {
    return this._currentView;
  }
}
const ai = function() {
  return typeof window._nc_navigation > "u" && (window._nc_navigation = new Nt(), m.debug("Navigation service initialized")), window._nc_navigation;
};
class _t {
  _column;
  constructor(e) {
    At(e), this._column = e;
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
const At = function(t) {
  if (!t.id || typeof t.id != "string")
    throw new Error("A column id is required");
  if (!t.title || typeof t.title != "string")
    throw new Error("A column title is required");
  if (!t.render || typeof t.render != "function")
    throw new Error("A render function is required");
  if (t.sort && typeof t.sort != "function")
    throw new Error("Column sortFunction must be a function");
  if (t.summary && typeof t.summary != "function")
    throw new Error("Column summary must be a function");
  return !0;
};
var k = {}, T = {};
(function(t) {
  const e = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", i = e + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040", s = "[" + e + "][" + i + "]*", n = new RegExp("^" + s + "$"), r = function(o, a) {
    const d = [];
    let u = a.exec(o);
    for (; u; ) {
      const h = [];
      h.startIndex = a.lastIndex - u[0].length;
      const c = u.length;
      for (let f = 0; f < c; f++)
        h.push(u[f]);
      d.push(h), u = a.exec(o);
    }
    return d;
  }, l = function(o) {
    const a = n.exec(o);
    return !(a === null || typeof a > "u");
  };
  t.isExist = function(o) {
    return typeof o < "u";
  }, t.isEmptyObject = function(o) {
    return Object.keys(o).length === 0;
  }, t.merge = function(o, a, d) {
    if (a) {
      const u = Object.keys(a), h = u.length;
      for (let c = 0; c < h; c++)
        d === "strict" ? o[u[c]] = [a[u[c]]] : o[u[c]] = a[u[c]];
    }
  }, t.getValue = function(o) {
    return t.isExist(o) ? o : "";
  }, t.isName = l, t.getAllMatches = r, t.nameRegexp = s;
})(T);
const L = T, Tt = { allowBooleanAttributes: !1, unpairedTags: [] };
k.validate = function(t, e) {
  e = Object.assign({}, Tt, e);
  const i = [];
  let s = !1, n = !1;
  t[0] === "\uFEFF" && (t = t.substr(1));
  for (let r = 0; r < t.length; r++)
    if (t[r] === "<" && t[r + 1] === "?") {
      if (r += 2, r = q(t, r), r.err)
        return r;
    } else if (t[r] === "<") {
      let l = r;
      if (r++, t[r] === "!") {
        r = U(t, r);
        continue;
      } else {
        let o = !1;
        t[r] === "/" && (o = !0, r++);
        let a = "";
        for (; r < t.length && t[r] !== ">" && t[r] !== " " && t[r] !== "	" && t[r] !== `
` && t[r] !== "\r"; r++)
          a += t[r];
        if (a = a.trim(), a[a.length - 1] === "/" && (a = a.substring(0, a.length - 1), r--), !Vt(a)) {
          let h;
          return a.trim().length === 0 ? h = "Invalid space after '<'." : h = "Tag '" + a + "' is an invalid name.", dist_p("InvalidTag", h, g(t, r));
        }
        const d = Pt(t, r);
        if (d === !1)
          return dist_p("InvalidAttr", "Attributes for '" + a + "' have open quote.", g(t, r));
        let u = d.value;
        if (r = d.index, u[u.length - 1] === "/") {
          const h = r - u.length;
          u = u.substring(0, u.length - 1);
          const c = z(u, e);
          if (c === !0)
            s = !0;
          else
            return dist_p(c.err.code, c.err.msg, g(t, h + c.err.line));
        } else if (o)
          if (d.tagClosed) {
            if (u.trim().length > 0)
              return dist_p("InvalidTag", "Closing tag '" + a + "' can't have attributes or invalid starting.", g(t, l));
            {
              const h = i.pop();
              if (a !== h.tagName) {
                let c = g(t, h.tagStartPos);
                return dist_p("InvalidTag", "Expected closing tag '" + h.tagName + "' (opened in line " + c.line + ", col " + c.col + ") instead of closing tag '" + a + "'.", g(t, l));
              }
              i.length == 0 && (n = !0);
            }
          } else
            return dist_p("InvalidTag", "Closing tag '" + a + "' doesn't have proper closing.", g(t, r));
        else {
          const h = z(u, e);
          if (h !== !0)
            return dist_p(h.err.code, h.err.msg, g(t, r - u.length + h.err.line));
          if (n === !0)
            return dist_p("InvalidXml", "Multiple possible root nodes found.", g(t, r));
          e.unpairedTags.indexOf(a) !== -1 || i.push({ tagName: a, tagStartPos: l }), s = !0;
        }
        for (r++; r < t.length; r++)
          if (t[r] === "<")
            if (t[r + 1] === "!") {
              r++, r = U(t, r);
              continue;
            } else if (t[r + 1] === "?") {
              if (r = q(t, ++r), r.err)
                return r;
            } else
              break;
          else if (t[r] === "&") {
            const h = St(t, r);
            if (h == -1)
              return dist_p("InvalidChar", "char '&' is not expected.", g(t, r));
            r = h;
          } else if (n === !0 && !B(t[r]))
            return dist_p("InvalidXml", "Extra text at the end", g(t, r));
        t[r] === "<" && r--;
      }
    } else {
      if (B(t[r]))
        continue;
      return dist_p("InvalidChar", "char '" + t[r] + "' is not expected.", g(t, r));
    }
  if (s) {
    if (i.length == 1)
      return dist_p("InvalidTag", "Unclosed tag '" + i[0].tagName + "'.", g(t, i[0].tagStartPos));
    if (i.length > 0)
      return dist_p("InvalidXml", "Invalid '" + JSON.stringify(i.map((r) => r.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
  } else
    return dist_p("InvalidXml", "Start tag expected.", 1);
  return !0;
};
function B(t) {
  return t === " " || t === "	" || t === `
` || t === "\r";
}
function q(t, e) {
  const i = e;
  for (; e < t.length; e++)
    if (t[e] == "?" || t[e] == " ") {
      const s = t.substr(i, e - i);
      if (e > 5 && s === "xml")
        return dist_p("InvalidXml", "XML declaration allowed only at the start of the document.", g(t, e));
      if (t[e] == "?" && t[e + 1] == ">") {
        e++;
        break;
      } else
        continue;
    }
  return e;
}
function U(t, e) {
  if (t.length > e + 5 && t[e + 1] === "-" && t[e + 2] === "-") {
    for (e += 3; e < t.length; e++)
      if (t[e] === "-" && t[e + 1] === "-" && t[e + 2] === ">") {
        e += 2;
        break;
      }
  } else if (t.length > e + 8 && t[e + 1] === "D" && t[e + 2] === "O" && t[e + 3] === "C" && t[e + 4] === "T" && t[e + 5] === "Y" && t[e + 6] === "P" && t[e + 7] === "E") {
    let i = 1;
    for (e += 8; e < t.length; e++)
      if (t[e] === "<")
        i++;
      else if (t[e] === ">" && (i--, i === 0))
        break;
  } else if (t.length > e + 9 && t[e + 1] === "[" && t[e + 2] === "C" && t[e + 3] === "D" && t[e + 4] === "A" && t[e + 5] === "T" && t[e + 6] === "A" && t[e + 7] === "[") {
    for (e += 8; e < t.length; e++)
      if (t[e] === "]" && t[e + 1] === "]" && t[e + 2] === ">") {
        e += 2;
        break;
      }
  }
  return e;
}
const It = '"', Ot = "'";
function Pt(t, e) {
  let i = "", s = "", n = !1;
  for (; e < t.length; e++) {
    if (t[e] === It || t[e] === Ot)
      s === "" ? s = t[e] : s !== t[e] || (s = "");
    else if (t[e] === ">" && s === "") {
      n = !0;
      break;
    }
    i += t[e];
  }
  return s !== "" ? !1 : { value: i, index: e, tagClosed: n };
}
const Ct = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
function z(t, e) {
  const i = L.getAllMatches(t, Ct), s = {};
  for (let n = 0; n < i.length; n++) {
    if (i[n][1].length === 0)
      return dist_p("InvalidAttr", "Attribute '" + i[n][2] + "' has no space in starting.", b(i[n]));
    if (i[n][3] !== void 0 && i[n][4] === void 0)
      return dist_p("InvalidAttr", "Attribute '" + i[n][2] + "' is without value.", b(i[n]));
    if (i[n][3] === void 0 && !e.allowBooleanAttributes)
      return dist_p("InvalidAttr", "boolean attribute '" + i[n][2] + "' is not allowed.", b(i[n]));
    const r = i[n][2];
    if (!Ft(r))
      return dist_p("InvalidAttr", "Attribute '" + r + "' is an invalid name.", b(i[n]));
    if (!s.hasOwnProperty(r))
      s[r] = 1;
    else
      return dist_p("InvalidAttr", "Attribute '" + r + "' is repeated.", b(i[n]));
  }
  return !0;
}
function Dt(t, e) {
  let i = /\d/;
  for (t[e] === "x" && (e++, i = /[\da-fA-F]/); e < t.length; e++) {
    if (t[e] === ";")
      return e;
    if (!t[e].match(i))
      break;
  }
  return -1;
}
function St(t, e) {
  if (e++, t[e] === ";")
    return -1;
  if (t[e] === "#")
    return e++, Dt(t, e);
  let i = 0;
  for (; e < t.length; e++, i++)
    if (!(t[e].match(/\w/) && i < 20)) {
      if (t[e] === ";")
        break;
      return -1;
    }
  return e;
}
function dist_p(t, e, i) {
  return { err: { code: t, msg: e, line: i.line || i, col: i.col } };
}
function Ft(t) {
  return L.isName(t);
}
function Vt(t) {
  return L.isName(t);
}
function g(t, e) {
  const i = t.substring(0, e).split(/\r?\n/);
  return { line: i.length, col: i[i.length - 1].length + 1 };
}
function b(t) {
  return t.startIndex + t[1].length;
}
var P = {};
const et = { preserveOrder: !1, attributeNamePrefix: "@_", attributesGroupName: !1, textNodeName: "#text", ignoreAttributes: !0, removeNSPrefix: !1, allowBooleanAttributes: !1, parseTagValue: !0, parseAttributeValue: !1, trimValues: !0, cdataPropName: !1, numberParseOptions: { hex: !0, leadingZeros: !0, eNotation: !0 }, tagValueProcessor: function(t, e) {
  return e;
}, attributeValueProcessor: function(t, e) {
  return e;
}, stopNodes: [], alwaysCreateTextNode: !1, isArray: () => !1, commentPropName: !1, unpairedTags: [], processEntities: !0, htmlEntities: !1, ignoreDeclaration: !1, ignorePiTags: !1, transformTagName: !1, transformAttributeName: !1, updateTag: function(t, e, i) {
  return t;
} }, $t = function(t) {
  return Object.assign({}, et, t);
};
P.buildOptions = $t, P.defaultOptions = et;
class kt {
  constructor(e) {
    this.tagname = e, this.child = [], this[":@"] = {};
  }
  add(e, i) {
    e === "__proto__" && (e = "#__proto__"), this.child.push({ [e]: i });
  }
  addChild(e) {
    e.tagname === "__proto__" && (e.tagname = "#__proto__"), e[":@"] && Object.keys(e[":@"]).length > 0 ? this.child.push({ [e.tagname]: e.child, ":@": e[":@"] }) : this.child.push({ [e.tagname]: e.child });
  }
}
var Lt = kt;
const Rt = T;
function jt(t, e) {
  const i = {};
  if (t[e + 3] === "O" && t[e + 4] === "C" && t[e + 5] === "T" && t[e + 6] === "Y" && t[e + 7] === "P" && t[e + 8] === "E") {
    e = e + 9;
    let s = 1, n = !1, r = !1, l = "";
    for (; e < t.length; e++)
      if (t[e] === "<" && !r) {
        if (n && qt(t, e))
          e += 7, [entityName, val, e] = Mt(t, e + 1), val.indexOf("&") === -1 && (i[Xt(entityName)] = { regx: RegExp(`&${entityName};`, "g"), val });
        else if (n && Ut(t, e))
          e += 8;
        else if (n && zt(t, e))
          e += 8;
        else if (n && Gt(t, e))
          e += 9;
        else if (Bt)
          r = !0;
        else
          throw new Error("Invalid DOCTYPE");
        s++, l = "";
      } else if (t[e] === ">") {
        if (r ? t[e - 1] === "-" && t[e - 2] === "-" && (r = !1, s--) : s--, s === 0)
          break;
      } else
        t[e] === "[" ? n = !0 : l += t[e];
    if (s !== 0)
      throw new Error("Unclosed DOCTYPE");
  } else
    throw new Error("Invalid Tag instead of DOCTYPE");
  return { entities: i, i: e };
}
function Mt(t, e) {
  let i = "";
  for (; e < t.length && t[e] !== "'" && t[e] !== '"'; e++)
    i += t[e];
  if (i = i.trim(), i.indexOf(" ") !== -1)
    throw new Error("External entites are not supported");
  const s = t[e++];
  let n = "";
  for (; e < t.length && t[e] !== s; e++)
    n += t[e];
  return [i, n, e];
}
function Bt(t, e) {
  return t[e + 1] === "!" && t[e + 2] === "-" && t[e + 3] === "-";
}
function qt(t, e) {
  return t[e + 1] === "!" && t[e + 2] === "E" && t[e + 3] === "N" && t[e + 4] === "T" && t[e + 5] === "I" && t[e + 6] === "T" && t[e + 7] === "Y";
}
function Ut(t, e) {
  return t[e + 1] === "!" && t[e + 2] === "E" && t[e + 3] === "L" && t[e + 4] === "E" && t[e + 5] === "M" && t[e + 6] === "E" && t[e + 7] === "N" && t[e + 8] === "T";
}
function zt(t, e) {
  return t[e + 1] === "!" && t[e + 2] === "A" && t[e + 3] === "T" && t[e + 4] === "T" && t[e + 5] === "L" && t[e + 6] === "I" && t[e + 7] === "S" && t[e + 8] === "T";
}
function Gt(t, e) {
  return t[e + 1] === "!" && t[e + 2] === "N" && t[e + 3] === "O" && t[e + 4] === "T" && t[e + 5] === "A" && t[e + 6] === "T" && t[e + 7] === "I" && t[e + 8] === "O" && t[e + 9] === "N";
}
function Xt(t) {
  if (Rt.isName(t))
    return t;
  throw new Error(`Invalid entity name ${t}`);
}
var Ht = jt;
const Kt = /^[-+]?0x[a-fA-F0-9]+$/, Wt = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
!Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt), !Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
const Yt = { hex: !0, leadingZeros: !0, decimalPoint: ".", eNotation: !0 };
function Zt(t, e = {}) {
  if (e = Object.assign({}, Yt, e), !t || typeof t != "string")
    return t;
  let i = t.trim();
  if (e.skipLike !== void 0 && e.skipLike.test(i))
    return t;
  if (e.hex && Kt.test(i))
    return Number.parseInt(i, 16);
  {
    const s = Wt.exec(i);
    if (s) {
      const n = s[1], r = s[2];
      let l = Jt(s[3]);
      const o = s[4] || s[6];
      if (!e.leadingZeros && r.length > 0 && n && i[2] !== "." || !e.leadingZeros && r.length > 0 && !n && i[1] !== ".")
        return t;
      {
        const a = Number(i), d = "" + a;
        return d.search(/[eE]/) !== -1 || o ? e.eNotation ? a : t : i.indexOf(".") !== -1 ? d === "0" && l === "" || d === l || n && d === "-" + l ? a : t : r ? l === d || n + l === d ? a : t : i === d || i === n + d ? a : t;
      }
    } else
      return t;
  }
}
function Jt(t) {
  return t && t.indexOf(".") !== -1 && (t = t.replace(/0+$/, ""), t === "." ? t = "0" : t[0] === "." ? t = "0" + t : t[t.length - 1] === "." && (t = t.substr(0, t.length - 1))), t;
}
var Qt = Zt;
const R = T, E = Lt, te = Ht, ee = Qt;
"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, R.nameRegexp);
let ie = class {
  constructor(t) {
    this.options = t, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = { apos: { regex: /&(apos|#39|#x27);/g, val: "'" }, gt: { regex: /&(gt|#62|#x3E);/g, val: ">" }, lt: { regex: /&(lt|#60|#x3C);/g, val: "<" }, quot: { regex: /&(quot|#34|#x22);/g, val: '"' } }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = { space: { regex: /&(nbsp|#160);/g, val: " " }, cent: { regex: /&(cent|#162);/g, val: "¢" }, pound: { regex: /&(pound|#163);/g, val: "£" }, yen: { regex: /&(yen|#165);/g, val: "¥" }, euro: { regex: /&(euro|#8364);/g, val: "€" }, copyright: { regex: /&(copy|#169);/g, val: "©" }, reg: { regex: /&(reg|#174);/g, val: "®" }, inr: { regex: /&(inr|#8377);/g, val: "₹" } }, this.addExternalEntities = ne, this.parseXml = le, this.parseTextData = re, this.resolveNameSpace = se, this.buildAttributesMap = ae, this.isItStopNode = dist_he, this.replaceEntitiesValue = ue, this.readStopNodeData = fe, this.saveTextToParentTag = ce, this.addChild = de;
  }
};
function ne(t) {
  const e = Object.keys(t);
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    this.lastEntities[s] = { regex: new RegExp("&" + s + ";", "g"), val: t[s] };
  }
}
function re(t, e, i, s, n, r, l) {
  if (t !== void 0 && (this.options.trimValues && !s && (t = t.trim()), t.length > 0)) {
    l || (t = this.replaceEntitiesValue(t));
    const o = this.options.tagValueProcessor(e, t, i, n, r);
    return o == null ? t : typeof o != typeof t || o !== t ? o : this.options.trimValues ? D(t, this.options.parseTagValue, this.options.numberParseOptions) : t.trim() === t ? D(t, this.options.parseTagValue, this.options.numberParseOptions) : t;
  }
}
function se(t) {
  if (this.options.removeNSPrefix) {
    const e = t.split(":"), i = t.charAt(0) === "/" ? "/" : "";
    if (e[0] === "xmlns")
      return "";
    e.length === 2 && (t = i + e[1]);
  }
  return t;
}
const oe = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
function ae(t, e, i) {
  if (!this.options.ignoreAttributes && typeof t == "string") {
    const s = R.getAllMatches(t, oe), n = s.length, r = {};
    for (let l = 0; l < n; l++) {
      const o = this.resolveNameSpace(s[l][1]);
      let a = s[l][4], d = this.options.attributeNamePrefix + o;
      if (o.length)
        if (this.options.transformAttributeName && (d = this.options.transformAttributeName(d)), d === "__proto__" && (d = "#__proto__"), a !== void 0) {
          this.options.trimValues && (a = a.trim()), a = this.replaceEntitiesValue(a);
          const u = this.options.attributeValueProcessor(o, a, e);
          u == null ? r[d] = a : typeof u != typeof a || u !== a ? r[d] = u : r[d] = D(a, this.options.parseAttributeValue, this.options.numberParseOptions);
        } else
          this.options.allowBooleanAttributes && (r[d] = !0);
    }
    if (!Object.keys(r).length)
      return;
    if (this.options.attributesGroupName) {
      const l = {};
      return l[this.options.attributesGroupName] = r, l;
    }
    return r;
  }
}
const le = function(t) {
  t = t.replace(/\r\n?/g, `
`);
  const e = new E("!xml");
  let i = e, s = "", n = "";
  for (let r = 0; r < t.length; r++)
    if (t[r] === "<")
      if (t[r + 1] === "/") {
        const l = x(t, ">", r, "Closing Tag is not closed.");
        let o = t.substring(r + 2, l).trim();
        if (this.options.removeNSPrefix) {
          const u = o.indexOf(":");
          u !== -1 && (o = o.substr(u + 1));
        }
        this.options.transformTagName && (o = this.options.transformTagName(o)), i && (s = this.saveTextToParentTag(s, i, n));
        const a = n.substring(n.lastIndexOf(".") + 1);
        if (o && this.options.unpairedTags.indexOf(o) !== -1)
          throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);
        let d = 0;
        a && this.options.unpairedTags.indexOf(a) !== -1 ? (d = n.lastIndexOf(".", n.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : d = n.lastIndexOf("."), n = n.substring(0, d), i = this.tagsNodeStack.pop(), s = "", r = l;
      } else if (t[r + 1] === "?") {
        let l = C(t, r, !1, "?>");
        if (!l)
          throw new Error("Pi Tag is not closed.");
        if (s = this.saveTextToParentTag(s, i, n), !(this.options.ignoreDeclaration && l.tagName === "?xml" || this.options.ignorePiTags)) {
          const o = new E(l.tagName);
          o.add(this.options.textNodeName, ""), l.tagName !== l.tagExp && l.attrExpPresent && (o[":@"] = this.buildAttributesMap(l.tagExp, n, l.tagName)), this.addChild(i, o, n);
        }
        r = l.closeIndex + 1;
      } else if (t.substr(r + 1, 3) === "!--") {
        const l = x(t, "-->", r + 4, "Comment is not closed.");
        if (this.options.commentPropName) {
          const o = t.substring(r + 4, l - 2);
          s = this.saveTextToParentTag(s, i, n), i.add(this.options.commentPropName, [{ [this.options.textNodeName]: o }]);
        }
        r = l;
      } else if (t.substr(r + 1, 2) === "!D") {
        const l = te(t, r);
        this.docTypeEntities = l.entities, r = l.i;
      } else if (t.substr(r + 1, 2) === "![") {
        const l = x(t, "]]>", r, "CDATA is not closed.") - 2, o = t.substring(r + 9, l);
        if (s = this.saveTextToParentTag(s, i, n), this.options.cdataPropName)
          i.add(this.options.cdataPropName, [{ [this.options.textNodeName]: o }]);
        else {
          let a = this.parseTextData(o, i.tagname, n, !0, !1, !0);
          a == null && (a = ""), i.add(this.options.textNodeName, a);
        }
        r = l + 2;
      } else {
        let l = C(t, r, this.options.removeNSPrefix), o = l.tagName, a = l.tagExp, d = l.attrExpPresent, u = l.closeIndex;
        this.options.transformTagName && (o = this.options.transformTagName(o)), i && s && i.tagname !== "!xml" && (s = this.saveTextToParentTag(s, i, n, !1));
        const h = i;
        if (h && this.options.unpairedTags.indexOf(h.tagname) !== -1 && (i = this.tagsNodeStack.pop(), n = n.substring(0, n.lastIndexOf("."))), o !== e.tagname && (n += n ? "." + o : o), this.isItStopNode(this.options.stopNodes, n, o)) {
          let c = "";
          if (a.length > 0 && a.lastIndexOf("/") === a.length - 1)
            r = l.closeIndex;
          else if (this.options.unpairedTags.indexOf(o) !== -1)
            r = l.closeIndex;
          else {
            const w = this.readStopNodeData(t, o, u + 1);
            if (!w)
              throw new Error(`Unexpected end of ${o}`);
            r = w.i, c = w.tagContent;
          }
          const f = new E(o);
          o !== a && d && (f[":@"] = this.buildAttributesMap(a, n, o)), c && (c = this.parseTextData(c, o, n, !0, d, !0, !0)), n = n.substr(0, n.lastIndexOf(".")), f.add(this.options.textNodeName, c), this.addChild(i, f, n);
        } else {
          if (a.length > 0 && a.lastIndexOf("/") === a.length - 1) {
            o[o.length - 1] === "/" ? (o = o.substr(0, o.length - 1), n = n.substr(0, n.length - 1), a = o) : a = a.substr(0, a.length - 1), this.options.transformTagName && (o = this.options.transformTagName(o));
            const c = new E(o);
            o !== a && d && (c[":@"] = this.buildAttributesMap(a, n, o)), this.addChild(i, c, n), n = n.substr(0, n.lastIndexOf("."));
          } else {
            const c = new E(o);
            this.tagsNodeStack.push(i), o !== a && d && (c[":@"] = this.buildAttributesMap(a, n, o)), this.addChild(i, c, n), i = c;
          }
          s = "", r = u;
        }
      }
    else
      s += t[r];
  return e.child;
};
function de(t, e, i) {
  const s = this.options.updateTag(e.tagname, i, e[":@"]);
  s === !1 || (typeof s == "string" && (e.tagname = s), t.addChild(e));
}
const ue = function(t) {
  if (this.options.processEntities) {
    for (let e in this.docTypeEntities) {
      const i = this.docTypeEntities[e];
      t = t.replace(i.regx, i.val);
    }
    for (let e in this.lastEntities) {
      const i = this.lastEntities[e];
      t = t.replace(i.regex, i.val);
    }
    if (this.options.htmlEntities)
      for (let e in this.htmlEntities) {
        const i = this.htmlEntities[e];
        t = t.replace(i.regex, i.val);
      }
    t = t.replace(this.ampEntity.regex, this.ampEntity.val);
  }
  return t;
};
function ce(t, e, i, s) {
  return t && (s === void 0 && (s = Object.keys(e.child).length === 0), t = this.parseTextData(t, e.tagname, i, !1, e[":@"] ? Object.keys(e[":@"]).length !== 0 : !1, s), t !== void 0 && t !== "" && e.add(this.options.textNodeName, t), t = ""), t;
}
function dist_he(t, e, i) {
  const s = "*." + i;
  for (const n in t) {
    const r = t[n];
    if (s === r || e === r)
      return !0;
  }
  return !1;
}
function pe(t, e, i = ">") {
  let s, n = "";
  for (let r = e; r < t.length; r++) {
    let l = t[r];
    if (s)
      l === s && (s = "");
    else if (l === '"' || l === "'")
      s = l;
    else if (l === i[0])
      if (i[1]) {
        if (t[r + 1] === i[1])
          return { data: n, index: r };
      } else
        return { data: n, index: r };
    else
      l === "	" && (l = " ");
    n += l;
  }
}
function x(t, e, i, s) {
  const n = t.indexOf(e, i);
  if (n === -1)
    throw new Error(s);
  return n + e.length - 1;
}
function C(t, e, i, s = ">") {
  const n = pe(t, e + 1, s);
  if (!n)
    return;
  let r = n.data;
  const l = n.index, o = r.search(/\s/);
  let a = r, d = !0;
  if (o !== -1 && (a = r.substr(0, o).replace(/\s\s*$/, ""), r = r.substr(o + 1)), i) {
    const u = a.indexOf(":");
    u !== -1 && (a = a.substr(u + 1), d = a !== n.data.substr(u + 1));
  }
  return { tagName: a, tagExp: r, closeIndex: l, attrExpPresent: d };
}
function fe(t, e, i) {
  const s = i;
  let n = 1;
  for (; i < t.length; i++)
    if (t[i] === "<")
      if (t[i + 1] === "/") {
        const r = x(t, ">", i, `${e} is not closed`);
        if (t.substring(i + 2, r).trim() === e && (n--, n === 0))
          return { tagContent: t.substring(s, i), i: r };
        i = r;
      } else if (t[i + 1] === "?")
        i = x(t, "?>", i + 1, "StopNode is not closed.");
      else if (t.substr(i + 1, 3) === "!--")
        i = x(t, "-->", i + 3, "StopNode is not closed.");
      else if (t.substr(i + 1, 2) === "![")
        i = x(t, "]]>", i, "StopNode is not closed.") - 2;
      else {
        const r = C(t, i, ">");
        r && ((r && r.tagName) === e && r.tagExp[r.tagExp.length - 1] !== "/" && n++, i = r.closeIndex);
      }
}
function D(t, e, i) {
  if (e && typeof t == "string") {
    const s = t.trim();
    return s === "true" ? !0 : s === "false" ? !1 : ee(t, i);
  } else
    return R.isExist(t) ? t : "";
}
var ge = ie, it = {};
function me(t, e) {
  return nt(t, e);
}
function nt(t, e, i) {
  let s;
  const n = {};
  for (let r = 0; r < t.length; r++) {
    const l = t[r], o = we(l);
    let a = "";
    if (i === void 0 ? a = o : a = i + "." + o, o === e.textNodeName)
      s === void 0 ? s = l[o] : s += "" + l[o];
    else {
      if (o === void 0)
        continue;
      if (l[o]) {
        let d = nt(l[o], e, a);
        const u = ye(d, e);
        l[":@"] ? ve(d, l[":@"], a, e) : Object.keys(d).length === 1 && d[e.textNodeName] !== void 0 && !e.alwaysCreateTextNode ? d = d[e.textNodeName] : Object.keys(d).length === 0 && (e.alwaysCreateTextNode ? d[e.textNodeName] = "" : d = ""), n[o] !== void 0 && n.hasOwnProperty(o) ? (Array.isArray(n[o]) || (n[o] = [n[o]]), n[o].push(d)) : e.isArray(o, a, u) ? n[o] = [d] : n[o] = d;
      }
    }
  }
  return typeof s == "string" ? s.length > 0 && (n[e.textNodeName] = s) : s !== void 0 && (n[e.textNodeName] = s), n;
}
function we(t) {
  const e = Object.keys(t);
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    if (s !== ":@")
      return s;
  }
}
function ve(t, e, i, s) {
  if (e) {
    const n = Object.keys(e), r = n.length;
    for (let l = 0; l < r; l++) {
      const o = n[l];
      s.isArray(o, i + "." + o, !0, !0) ? t[o] = [e[o]] : t[o] = e[o];
    }
  }
}
function ye(t, e) {
  const { textNodeName: i } = e, s = Object.keys(t).length;
  return !!(s === 0 || s === 1 && (t[i] || typeof t[i] == "boolean" || t[i] === 0));
}
it.prettify = me;
const { buildOptions: xe } = P, be = ge, { prettify: Ee } = it, Ne = k;
let _e = class {
  constructor(t) {
    this.externalEntities = {}, this.options = xe(t);
  }
  parse(t, e) {
    if (typeof t != "string")
      if (t.toString)
        t = t.toString();
      else
        throw new Error("XML data is accepted in String or Bytes[] form.");
    if (e) {
      e === !0 && (e = {});
      const n = Ne.validate(t, e);
      if (n !== !0)
        throw Error(`${n.err.msg}:${n.err.line}:${n.err.col}`);
    }
    const i = new be(this.options);
    i.addExternalEntities(this.externalEntities);
    const s = i.parseXml(t);
    return this.options.preserveOrder || s === void 0 ? s : Ee(s, this.options);
  }
  addEntity(t, e) {
    if (e.indexOf("&") !== -1)
      throw new Error("Entity value can't have '&'");
    if (t.indexOf("&") !== -1 || t.indexOf(";") !== -1)
      throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
    if (e === "&")
      throw new Error("An entity with value '&' is not permitted");
    this.externalEntities[t] = e;
  }
};
var Ae = _e;
const Te = `
`;
function Ie(t, e) {
  let i = "";
  return e.format && e.indentBy.length > 0 && (i = Te), rt(t, e, "", i);
}
function rt(t, e, i, s) {
  let n = "", r = !1;
  for (let l = 0; l < t.length; l++) {
    const o = t[l], a = Oe(o);
    let d = "";
    if (i.length === 0 ? d = a : d = `${i}.${a}`, a === e.textNodeName) {
      let w = o[a];
      Pe(d, e) || (w = e.tagValueProcessor(a, w), w = st(w, e)), r && (n += s), n += w, r = !1;
      continue;
    } else if (a === e.cdataPropName) {
      r && (n += s), n += `<![CDATA[${o[a][0][e.textNodeName]}]]>`, r = !1;
      continue;
    } else if (a === e.commentPropName) {
      n += s + `<!--${o[a][0][e.textNodeName]}-->`, r = !0;
      continue;
    } else if (a[0] === "?") {
      const w = G(o[":@"], e), ot = a === "?xml" ? "" : s;
      let N = o[a][0][e.textNodeName];
      N = N.length !== 0 ? " " + N : "", n += ot + `<${a}${N}${w}?>`, r = !0;
      continue;
    }
    let u = s;
    u !== "" && (u += e.indentBy);
    const h = G(o[":@"], e), c = s + `<${a}${h}`, f = rt(o[a], e, d, u);
    e.unpairedTags.indexOf(a) !== -1 ? e.suppressUnpairedNode ? n += c + ">" : n += c + "/>" : (!f || f.length === 0) && e.suppressEmptyNode ? n += c + "/>" : f && f.endsWith(">") ? n += c + `>${f}${s}</${a}>` : (n += c + ">", f && s !== "" && (f.includes("/>") || f.includes("</")) ? n += s + e.indentBy + f + s : n += f, n += `</${a}>`), r = !0;
  }
  return n;
}
function Oe(t) {
  const e = Object.keys(t);
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    if (s !== ":@")
      return s;
  }
}
function G(t, e) {
  let i = "";
  if (t && !e.ignoreAttributes)
    for (let s in t) {
      let n = e.attributeValueProcessor(s, t[s]);
      n = st(n, e), n === !0 && e.suppressBooleanAttributes ? i += ` ${s.substr(e.attributeNamePrefix.length)}` : i += ` ${s.substr(e.attributeNamePrefix.length)}="${n}"`;
    }
  return i;
}
function Pe(t, e) {
  t = t.substr(0, t.length - e.textNodeName.length - 1);
  let i = t.substr(t.lastIndexOf(".") + 1);
  for (let s in e.stopNodes)
    if (e.stopNodes[s] === t || e.stopNodes[s] === "*." + i)
      return !0;
  return !1;
}
function st(t, e) {
  if (t && t.length > 0 && e.processEntities)
    for (let i = 0; i < e.entities.length; i++) {
      const s = e.entities[i];
      t = t.replace(s.regex, s.val);
    }
  return t;
}
var Ce = Ie;
const De = Ce, Se = { attributeNamePrefix: "@_", attributesGroupName: !1, textNodeName: "#text", ignoreAttributes: !0, cdataPropName: !1, format: !1, indentBy: "  ", suppressEmptyNode: !1, suppressUnpairedNode: !0, suppressBooleanAttributes: !0, tagValueProcessor: function(t, e) {
  return e;
}, attributeValueProcessor: function(t, e) {
  return e;
}, preserveOrder: !1, commentPropName: !1, unpairedTags: [], entities: [{ regex: new RegExp("&", "g"), val: "&amp;" }, { regex: new RegExp(">", "g"), val: "&gt;" }, { regex: new RegExp("<", "g"), val: "&lt;" }, { regex: new RegExp("'", "g"), val: "&apos;" }, { regex: new RegExp('"', "g"), val: "&quot;" }], processEntities: !0, stopNodes: [], oneListGroup: !1 };
function y(t) {
  this.options = Object.assign({}, Se, t), this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
    return !1;
  } : (this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = $e), this.processTextOrObjNode = Fe, this.options.format ? (this.indentate = Ve, this.tagEndChar = `>
`, this.newLine = `
`) : (this.indentate = function() {
    return "";
  }, this.tagEndChar = ">", this.newLine = "");
}
y.prototype.build = function(t) {
  return this.options.preserveOrder ? De(t, this.options) : (Array.isArray(t) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (t = { [this.options.arrayNodeName]: t }), this.j2x(t, 0).val);
}, y.prototype.j2x = function(t, e) {
  let i = "", s = "";
  for (let n in t)
    if (typeof t[n] > "u")
      this.isAttribute(n) && (s += "");
    else if (t[n] === null)
      this.isAttribute(n) ? s += "" : n[0] === "?" ? s += this.indentate(e) + "<" + n + "?" + this.tagEndChar : s += this.indentate(e) + "<" + n + "/" + this.tagEndChar;
    else if (t[n] instanceof Date)
      s += this.buildTextValNode(t[n], n, "", e);
    else if (typeof t[n] != "object") {
      const r = this.isAttribute(n);
      if (r)
        i += this.buildAttrPairStr(r, "" + t[n]);
      else if (n === this.options.textNodeName) {
        let l = this.options.tagValueProcessor(n, "" + t[n]);
        s += this.replaceEntitiesValue(l);
      } else
        s += this.buildTextValNode(t[n], n, "", e);
    } else if (Array.isArray(t[n])) {
      const r = t[n].length;
      let l = "";
      for (let o = 0; o < r; o++) {
        const a = t[n][o];
        typeof a > "u" || (a === null ? n[0] === "?" ? s += this.indentate(e) + "<" + n + "?" + this.tagEndChar : s += this.indentate(e) + "<" + n + "/" + this.tagEndChar : typeof a == "object" ? this.options.oneListGroup ? l += this.j2x(a, e + 1).val : l += this.processTextOrObjNode(a, n, e) : l += this.buildTextValNode(a, n, "", e));
      }
      this.options.oneListGroup && (l = this.buildObjectNode(l, n, "", e)), s += l;
    } else if (this.options.attributesGroupName && n === this.options.attributesGroupName) {
      const r = Object.keys(t[n]), l = r.length;
      for (let o = 0; o < l; o++)
        i += this.buildAttrPairStr(r[o], "" + t[n][r[o]]);
    } else
      s += this.processTextOrObjNode(t[n], n, e);
  return { attrStr: i, val: s };
}, y.prototype.buildAttrPairStr = function(t, e) {
  return e = this.options.attributeValueProcessor(t, "" + e), e = this.replaceEntitiesValue(e), this.options.suppressBooleanAttributes && e === "true" ? " " + t : " " + t + '="' + e + '"';
};
function Fe(t, e, i) {
  const s = this.j2x(t, i + 1);
  return t[this.options.textNodeName] !== void 0 && Object.keys(t).length === 1 ? this.buildTextValNode(t[this.options.textNodeName], e, s.attrStr, i) : this.buildObjectNode(s.val, e, s.attrStr, i);
}
y.prototype.buildObjectNode = function(t, e, i, s) {
  if (t === "")
    return e[0] === "?" ? this.indentate(s) + "<" + e + i + "?" + this.tagEndChar : this.indentate(s) + "<" + e + i + this.closeTag(e) + this.tagEndChar;
  {
    let n = "</" + e + this.tagEndChar, r = "";
    return e[0] === "?" && (r = "?", n = ""), (i || i === "") && t.indexOf("<") === -1 ? this.indentate(s) + "<" + e + i + r + ">" + t + n : this.options.commentPropName !== !1 && e === this.options.commentPropName && r.length === 0 ? this.indentate(s) + `<!--${t}-->` + this.newLine : this.indentate(s) + "<" + e + i + r + this.tagEndChar + t + this.indentate(s) + n;
  }
}, y.prototype.closeTag = function(t) {
  let e = "";
  return this.options.unpairedTags.indexOf(t) !== -1 ? this.options.suppressUnpairedNode || (e = "/") : this.options.suppressEmptyNode ? e = "/" : e = `></${t}`, e;
}, y.prototype.buildTextValNode = function(t, e, i, s) {
  if (this.options.cdataPropName !== !1 && e === this.options.cdataPropName)
    return this.indentate(s) + `<![CDATA[${t}]]>` + this.newLine;
  if (this.options.commentPropName !== !1 && e === this.options.commentPropName)
    return this.indentate(s) + `<!--${t}-->` + this.newLine;
  if (e[0] === "?")
    return this.indentate(s) + "<" + e + i + "?" + this.tagEndChar;
  {
    let n = this.options.tagValueProcessor(e, t);
    return n = this.replaceEntitiesValue(n), n === "" ? this.indentate(s) + "<" + e + i + this.closeTag(e) + this.tagEndChar : this.indentate(s) + "<" + e + i + ">" + n + "</" + e + this.tagEndChar;
  }
}, y.prototype.replaceEntitiesValue = function(t) {
  if (t && t.length > 0 && this.options.processEntities)
    for (let e = 0; e < this.options.entities.length; e++) {
      const i = this.options.entities[e];
      t = t.replace(i.regex, i.val);
    }
  return t;
};
function Ve(t) {
  return this.options.indentBy.repeat(t);
}
function $e(t) {
  return t.startsWith(this.options.attributeNamePrefix) && t !== this.options.textNodeName ? t.substr(this.attrPrefixLen) : !1;
}
var ke = y;
const Le = k, Re = Ae, je = ke;
var X = { XMLParser: Re, XMLValidator: Le, XMLBuilder: je };
function Me(t) {
  if (typeof t != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);
  if (t = t.trim(), t.length === 0 || X.XMLValidator.validate(t) !== !0)
    return !1;
  let e;
  const i = new X.XMLParser();
  try {
    e = i.parse(t);
  } catch {
    return !1;
  }
  return !(!e || !("svg" in e));
}
class li {
  _view;
  constructor(e) {
    Be(e), this._view = e;
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
  set icon(e) {
    this._view.icon = e;
  }
  get order() {
    return this._view.order;
  }
  set order(e) {
    this._view.order = e;
  }
  get params() {
    return this._view.params;
  }
  set params(e) {
    this._view.params = e;
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
  set expanded(e) {
    this._view.expanded = e;
  }
  get defaultSortKey() {
    return this._view.defaultSortKey;
  }
}
const Be = function(t) {
  if (!t.id || typeof t.id != "string")
    throw new Error("View id is required and must be a string");
  if (!t.name || typeof t.name != "string")
    throw new Error("View name is required and must be a string");
  if (t.columns && t.columns.length > 0 && (!t.caption || typeof t.caption != "string"))
    throw new Error("View caption is required for top-level views and must be a string");
  if (!t.getContents || typeof t.getContents != "function")
    throw new Error("View getContents is required and must be a function");
  if (!t.icon || typeof t.icon != "string" || !Me(t.icon))
    throw new Error("View icon is required and must be a valid svg string");
  if (!("order" in t) || typeof t.order != "number")
    throw new Error("View order is required and must be a number");
  if (t.columns && t.columns.forEach((e) => {
    if (!(e instanceof _t))
      throw new Error("View columns must be an array of Column. Invalid column found");
  }), t.emptyView && typeof t.emptyView != "function")
    throw new Error("View emptyView must be a function");
  if (t.parent && typeof t.parent != "string")
    throw new Error("View parent must be a string");
  if ("sticky" in t && typeof t.sticky != "boolean")
    throw new Error("View sticky must be a boolean");
  if ("expanded" in t && typeof t.expanded != "boolean")
    throw new Error("View expanded must be a boolean");
  if (t.defaultSortKey && typeof t.defaultSortKey != "string")
    throw new Error("View defaultSortKey must be a string");
  return !0;
}, di = function(t) {
  return S().registerEntry(t);
}, ui = function(t) {
  return S().unregisterEntry(t);
}, ci = function(t) {
  return S().getEntries(t);
};


// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/node_modules/@nextcloud/vue/dist/index.module.js
var index_module = __webpack_require__(39387);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/index-X06k2874.mjs + 1 modules
var index_X06k2874 = __webpack_require__(15754);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/node_modules/@nextcloud/router/dist/index.js
var _nextcloud_router_dist = __webpack_require__(55866);
// EXTERNAL MODULE: ./node_modules/@vueuse/shared/index.mjs + 1 modules
var shared = __webpack_require__(59271);
// EXTERNAL MODULE: ./node_modules/vue-frag/dist/frag.esm.js
var frag_esm = __webpack_require__(54914);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/toast-ctTsYfrv.mjs
var toast_ctTsYfrv = __webpack_require__(21316);
;// CONCATENATED MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/FilePicker-8ibBgPg_.mjs











const FilePicker_8ibBgPg_ye = {
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
var FilePicker_8ibBgPg_we = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon file-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_8ibBgPg_ke = [], FilePicker_8ibBgPg_be = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_ye,
  FilePicker_8ibBgPg_we,
  FilePicker_8ibBgPg_ke,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_q = FilePicker_8ibBgPg_be.exports, FilePicker_8ibBgPg_Ce = {
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
var FilePicker_8ibBgPg_Fe = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon menu-up-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M7,15L12,10L17,15H7Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_8ibBgPg_Se = [], FilePicker_8ibBgPg_$e = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_Ce,
  FilePicker_8ibBgPg_Fe,
  FilePicker_8ibBgPg_Se,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_xe = FilePicker_8ibBgPg_$e.exports, FilePicker_8ibBgPg_Ne = {
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
var FilePicker_8ibBgPg_Le = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon menu-down-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M7,10L12,15L17,10H7Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, ze = [], FilePicker_8ibBgPg_Pe = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_Ne,
  FilePicker_8ibBgPg_Le,
  ze,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_Ie = FilePicker_8ibBgPg_Pe.exports, FilePicker_8ibBgPg_Be = {
  "file-picker__file-icon": "_file-picker__file-icon_1vgv4_5"
}, FilePicker_8ibBgPg_Me = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.pM)({
  __name: "LoadingTableRow",
  props: {
    showCheckbox: { type: Boolean }
  },
  setup(l) {
    return { __sfc: !0, fileListIconStyles: FilePicker_8ibBgPg_Be };
  }
});
var FilePicker_8ibBgPg_Re = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t("tr", { staticClass: "file-picker__row loading-row", attrs: { "aria-hidden": "true" } }, [e.showCheckbox ? t("td", { staticClass: "row-checkbox" }, [t("span")]) : e._e(), t("td", { staticClass: "row-name" }, [t("div", { staticClass: "row-wrapper" }, [t("span", { class: i.fileListIconStyles["file-picker__file-icon"] }), t("span")])]), e._m(0), e._m(1)]);
}, FilePicker_8ibBgPg_De = [function() {
  var l = this, e = l._self._c;
  return l._self._setupProxy, e("td", { staticClass: "row-size" }, [e("span")]);
}, function() {
  var l = this, e = l._self._c;
  return l._self._setupProxy, e("td", { staticClass: "row-modified" }, [e("span")]);
}], FilePicker_8ibBgPg_Ve = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_Me,
  FilePicker_8ibBgPg_Re,
  FilePicker_8ibBgPg_De,
  !1,
  null,
  "6aded0d9",
  null,
  null
);
const FilePicker_8ibBgPg_Te = FilePicker_8ibBgPg_Ve.exports;
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
function He(l, e = {}) {
  var t;
  e = { size: 32, cropPreview: !1, mimeFallback: !0, ...e };
  try {
    const i = ((t = l.attributes) == null ? void 0 : t.previewUrl) || (0,_nextcloud_router_dist.generateUrl)("/core/preview?fileId={fileid}", {
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
const FilePicker_8ibBgPg_Ae = (l, e) => {
  const t = (0,vue_runtime_esm/* ref */.KR)(null);
  return (0,vue_runtime_esm/* watchEffect */.nT)(() => {
    t.value = He((0,shared/* toValue */.BA)(l), (0,shared/* toValue */.BA)(e || {}));
  }), {
    previewURL: t
  };
}, Ue = {
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
var FilePicker_8ibBgPg_Ee = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon folder-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_8ibBgPg_Oe = [], FilePicker_8ibBgPg_Ze = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  Ue,
  FilePicker_8ibBgPg_Ee,
  FilePicker_8ibBgPg_Oe,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_R = FilePicker_8ibBgPg_Ze.exports, FilePicker_8ibBgPg_je = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.pM)({
  __name: "FilePreview",
  props: {
    node: null
  },
  setup(l) {
    const e = l, { previewURL: t } = FilePicker_8ibBgPg_Ae((0,vue_runtime_esm/* toRef */.lW)(e, "node")), i = (0,vue_runtime_esm/* computed */.EW)(() => e.node.type === dist_$.File), n = (0,vue_runtime_esm/* ref */.KR)(!1);
    return (0,vue_runtime_esm/* watch */.wB)(t, () => {
      if (n.value = !1, t.value) {
        const s = document.createElement("img");
        s.src = t.value.href, s.onerror = () => s.remove(), s.onload = () => {
          n.value = !0, s.remove();
        }, document.body.appendChild(s);
      }
    }, { immediate: !0 }), { __sfc: !0, props: e, previewURL: t, isFile: i, canLoadPreview: n, t: index_X06k2874.t, IconFile: FilePicker_8ibBgPg_q, IconFolder: FilePicker_8ibBgPg_R };
  }
});
var Ge = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t("div", { staticClass: "file-picker__file-icon", style: i.canLoadPreview ? { backgroundImage: "url(".concat(i.previewURL, ")") } : void 0, attrs: { "aria-label": i.t("MIME type {mime}", { mime: e.node.mime || i.t("unknown") }) } }, [i.canLoadPreview ? e._e() : [i.isFile ? t(i.IconFile, { attrs: { size: 20 } }) : t(i.IconFolder, { attrs: { size: 20 } })]], 2);
}, qe = [], Ke = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_je,
  Ge,
  qe,
  !1,
  null,
  "79e0cce3",
  null,
  null
);
const FilePicker_8ibBgPg_We = Ke.exports, FilePicker_8ibBgPg_Je = {
  long: (0,index_X06k2874.t)("a few seconds ago"),
  short: (0,index_X06k2874.t)("seconds ago"),
  // FOR TRANSLATORS: Shorter version of 'a few seconds ago'
  narrow: (0,index_X06k2874.t)("sec. ago")
  // FOR TRANSLATORS: If possible in your language an even shorter version of 'a few seconds ago'
}, FilePicker_8ibBgPg_Qe = (0,vue_runtime_esm/* defineComponent */.pM)({
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
        const l = new Intl.RelativeTimeFormat((0,l10n_dist/* getCanonicalLocale */.lO)(), { numeric: "auto", style: this.relativeTime }), t = (this.dateObject.valueOf() - this.currentTime) / 1e3;
        if (Math.abs(t) <= 90)
          return this.ignoreSeconds ? FilePicker_8ibBgPg_Je[this.relativeTime] : l.format(Math.round(t), "second");
        const i = t / 60;
        if (Math.abs(i) <= 90)
          return l.format(Math.round(i), "minute");
        const n = i / 60;
        if (Math.abs(n) <= 72)
          return l.format(Math.round(n), "hour");
        const s = n / 24;
        if (Math.abs(s) <= 6)
          return l.format(Math.round(s), "day");
        const o = s / 7;
        return Math.abs(o) <= 52 ? l.format(Math.round(o), "week") : l.format(Math.round(s / 365), "year");
      }
      return this.formattedFullTime;
    },
    formattedFullTime() {
      return new Intl.DateTimeFormat((0,l10n_dist/* getCanonicalLocale */.lO)(), this.format).format(this.dateObject);
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
var Xe = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("span", { staticClass: "nc-datetime", attrs: { "data-timestamp": e.timestamp, title: e.formattedFullTime } }, [e._v(e._s(e.formattedTime))]);
}, FilePicker_8ibBgPg_Ye = [], FilePicker_8ibBgPg_et = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_Qe,
  Xe,
  FilePicker_8ibBgPg_Ye,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_tt = FilePicker_8ibBgPg_et.exports, FilePicker_8ibBgPg_it = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.pM)({
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
    const t = l, i = (0,vue_runtime_esm/* computed */.EW)(() => {
      var m;
      return ((m = t.node.attributes) == null ? void 0 : m.displayName) || t.node.basename.slice(0, t.node.extension ? -t.node.extension.length : void 0);
    }), n = (0,vue_runtime_esm/* computed */.EW)(() => t.node.extension), s = (0,vue_runtime_esm/* computed */.EW)(() => t.node.type === dist_$.Folder), o = (0,vue_runtime_esm/* computed */.EW)(() => t.canPick && (t.allowPickDirectory || !s.value));
    function p() {
      e("update:selected", !t.selected);
    }
    function c() {
      s.value ? e("enter-directory", t.node) : p();
    }
    function w(m) {
      m.key === "Enter" && c();
    }
    return { __sfc: !0, props: t, emit: e, displayName: i, fileExtension: n, isDirectory: s, isPickable: o, toggleSelected: p, handleClick: c, handleKeyDown: w, formatFileSize: We, NcCheckboxRadioSwitch: index_module/* NcCheckboxRadioSwitch */.AO, t: index_X06k2874.t, FilePreview: FilePicker_8ibBgPg_We, NcDatetime: FilePicker_8ibBgPg_tt };
  }
});
var FilePicker_8ibBgPg_nt = function() {
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
}, lt = [], FilePicker_8ibBgPg_st = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_it,
  FilePicker_8ibBgPg_nt,
  lt,
  !1,
  null,
  "41f19c11",
  null,
  null
);
const FilePicker_8ibBgPg_rt = FilePicker_8ibBgPg_st.exports, at = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.pM)({
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
    const t = l, i = (0,vue_runtime_esm/* ref */.KR)("ascending"), n = (0,vue_runtime_esm/* ref */.KR)(void 0), s = (0,vue_runtime_esm/* ref */.KR)(void 0), o = {
      ascending: (r, a, y) => y(r, a),
      descending: (r, a, y) => y(a, r),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      none: (r, a, y) => 0
    }, p = (r, a) => {
      var y, F;
      return (((y = r.attributes) == null ? void 0 : y.displayName) || r.basename).localeCompare(((F = a.attributes) == null ? void 0 : F.displayName) || a.basename, (0,l10n_dist/* getCanonicalLocale */.lO)());
    }, c = (r, a) => (a.size || 0) - (r.size || 0), w = (r, a) => {
      var y, F;
      return (((y = r.mtime) == null ? void 0 : y.getTime()) || 0) - (((F = a.mtime) == null ? void 0 : F.getTime()) || 0);
    }, m = (r) => {
      const a = r.value;
      s.value = n.value = i.value = void 0, a === "ascending" ? r.value = "descending" : r.value = "ascending";
    }, k = () => m(i), u = () => m(n), d = () => m(s), f = (0,vue_runtime_esm/* computed */.EW)(() => [...t.files].sort(
      (r, a) => (
        // Folders always come above the files
        (a.type === dist_$.Folder ? 1 : 0) - (r.type === dist_$.Folder ? 1 : 0) || o[i.value || "none"](r, a, p) || o[n.value || "none"](r, a, c) || o[s.value || "none"](r, a, w)
      )
    )), b = (0,vue_runtime_esm/* computed */.EW)(() => t.files.filter((r) => t.allowPickDirectory || r.type !== dist_$.Folder)), $ = (0,vue_runtime_esm/* computed */.EW)(() => !t.loading && t.selectedFiles.length > 0 && t.selectedFiles.length >= b.value.length);
    function C() {
      t.selectedFiles.length < b.value.length ? e("update:selectedFiles", b.value) : e("update:selectedFiles", []);
    }
    function L(r) {
      t.selectedFiles.includes(r) ? e("update:selectedFiles", t.selectedFiles.filter((a) => a.path !== r.path)) : t.multiselect ? e("update:selectedFiles", [...t.selectedFiles, r]) : e("update:selectedFiles", [r]);
    }
    function I(r) {
      e("update:path", r.path);
    }
    const z = (0,vue_runtime_esm/* ref */.KR)(4), x = (0,vue_runtime_esm/* ref */.KR)();
    {
      const r = () => (0,vue_runtime_esm/* nextTick */.dY)(() => {
        var a, y, F, D, V;
        const B = ((y = (a = x.value) == null ? void 0 : a.parentElement) == null ? void 0 : y.children) || [];
        let T = ((D = (F = x.value) == null ? void 0 : F.parentElement) == null ? void 0 : D.clientHeight) || 450;
        for (let P = 0; P < B.length; P++)
          (V = x.value) != null && V.isSameNode(B[P]) || (T -= B[P].clientHeight);
        z.value = Math.floor((T - 50) / 50);
      });
      (0,vue_runtime_esm/* onMounted */.sV)(() => {
        window.addEventListener("resize", r), r();
      }), (0,vue_runtime_esm/* onUnmounted */.hi)(() => {
        window.removeEventListener("resize", r);
      });
    }
    return { __sfc: !0, props: t, emit: e, sortByName: i, sortBySize: n, sortByModified: s, ordering: o, byName: p, bySize: c, byDate: w, toggleSorting: m, toggleSortByName: k, toggleSortBySize: u, toggleSortByModified: d, sortedFiles: f, selectableFiles: b, allSelected: $, onSelectAll: C, onNodeSelected: L, onChangeDirectory: I, skeletonNumber: z, fileContainer: x, NcButton: index_module/* NcButton */.x1, NcCheckboxRadioSwitch: index_module/* NcCheckboxRadioSwitch */.AO, t: index_X06k2874.t, IconSortAscending: FilePicker_8ibBgPg_xe, IconSortDescending: FilePicker_8ibBgPg_Ie, LoadingTableRow: FilePicker_8ibBgPg_Te, FileListRow: FilePicker_8ibBgPg_rt };
  }
});
var ot = function() {
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
}, ct = [], ut = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  at,
  ot,
  ct,
  !1,
  null,
  "83ce6888",
  null,
  null
);
const dt = ut.exports, ft = {
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
var FilePicker_8ibBgPg_t = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon home-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, pt = [], FilePicker_8ibBgPg_mt = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  ft,
  FilePicker_8ibBgPg_t,
  pt,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_vt = FilePicker_8ibBgPg_mt.exports, ht = {
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
var gt = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon plus-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_8ibBgPg_yt = [], FilePicker_8ibBgPg_wt = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  ht,
  gt,
  FilePicker_8ibBgPg_yt,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_kt = FilePicker_8ibBgPg_wt.exports, FilePicker_8ibBgPg_bt = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.pM)({
  __name: "FilePickerBreadcrumbs",
  props: {
    path: null,
    showMenu: { type: Boolean }
  },
  emits: ["update:path", "create-node"],
  setup(l, { emit: e }) {
    const t = l, i = (0,vue_runtime_esm/* ref */.KR)(""), n = (0,vue_runtime_esm/* ref */.KR)();
    function s() {
      var c, w, m, k;
      const u = i.value.trim(), d = (w = (c = n.value) == null ? void 0 : c.$el) == null ? void 0 : w.querySelector("input");
      let f = "";
      return u.length === 0 ? f = (0,index_X06k2874.t)("File name cannot be empty.") : u.includes("/") ? f = (0,index_X06k2874.t)('"/" is not allowed inside a file name.') : ["..", "."].includes(u) ? f = (0,index_X06k2874.t)('"{name}" is an invalid file name.', { name: u }) : (m = window.OC.config) != null && m.blacklist_files_regex && u.match((k = window.OC.config) == null ? void 0 : k.blacklist_files_regex) && (f = (0,index_X06k2874.t)('"{name}" is not an allowed filetype', { name: u })), d && d.setCustomValidity(f), f === "";
    }
    const o = function() {
      const c = i.value.trim();
      s() && (e("create-node", c), i.value = "");
    }, p = (0,vue_runtime_esm/* computed */.EW)(
      () => t.path.split("/").filter((c) => c !== "").map((c, w, m) => ({
        name: c,
        path: "/" + m.slice(0, w + 1).join("/")
      }))
    );
    return { __sfc: !0, props: t, emit: e, newNodeName: i, nameInput: n, validateInput: s, onSubmit: o, pathElements: p, IconFolder: FilePicker_8ibBgPg_R, IconHome: FilePicker_8ibBgPg_vt, IconPlus: FilePicker_8ibBgPg_kt, NcActions: index_module/* NcActions */.B6, NcActionInput: index_module/* NcActionInput */.Az, NcBreadcrumbs: index_module/* NcBreadcrumbs */.Qz, NcBreadcrumb: index_module/* NcBreadcrumb */.R1, t: index_X06k2874.t };
  }
});
var FilePicker_8ibBgPg_Ct = function() {
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
}, FilePicker_8ibBgPg_Ft = [], FilePicker_8ibBgPg_St = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_bt,
  FilePicker_8ibBgPg_Ct,
  FilePicker_8ibBgPg_Ft,
  !1,
  null,
  "f35f86d4",
  null,
  null
);
const FilePicker_8ibBgPg_$t = FilePicker_8ibBgPg_St.exports, FilePicker_8ibBgPg_xt = {
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
var FilePicker_8ibBgPg_Nt = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon clock-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_8ibBgPg_Lt = [], FilePicker_8ibBgPg_zt = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_xt,
  FilePicker_8ibBgPg_Nt,
  FilePicker_8ibBgPg_Lt,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_Pt = FilePicker_8ibBgPg_zt.exports, FilePicker_8ibBgPg_It = {
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
var FilePicker_8ibBgPg_Bt = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon close-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_8ibBgPg_Mt = [], FilePicker_8ibBgPg_Rt = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_It,
  FilePicker_8ibBgPg_Bt,
  FilePicker_8ibBgPg_Mt,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_Dt = FilePicker_8ibBgPg_Rt.exports, FilePicker_8ibBgPg_Vt = {
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
var FilePicker_8ibBgPg_Tt = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon magnify-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_8ibBgPg_Ht = [], FilePicker_8ibBgPg_At = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_Vt,
  FilePicker_8ibBgPg_Tt,
  FilePicker_8ibBgPg_Ht,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_Ut = FilePicker_8ibBgPg_At.exports, FilePicker_8ibBgPg_Et = {
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
var FilePicker_8ibBgPg_Ot = function() {
  var e = this, t = e._self._c;
  return t("span", e._b({ staticClass: "material-design-icon star-icon", attrs: { "aria-hidden": !e.title, "aria-label": e.title, role: "img" }, on: { click: function(i) {
    return e.$emit("click", i);
  } } }, "span", e.$attrs, !1), [t("svg", { staticClass: "material-design-icon__svg", attrs: { fill: e.fillColor, width: e.size, height: e.size, viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" } }, [e.title ? t("title", [e._v(e._s(e.title))]) : e._e()])])]);
}, FilePicker_8ibBgPg_Zt = [], FilePicker_8ibBgPg_jt = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_Et,
  FilePicker_8ibBgPg_Ot,
  FilePicker_8ibBgPg_Zt,
  !1,
  null,
  null,
  null,
  null
);
const FilePicker_8ibBgPg_Gt = FilePicker_8ibBgPg_jt.exports, FilePicker_8ibBgPg_K = () => {
  const l = () => {
    var t;
    return ((t = document.getElementById("isPublic")) == null ? void 0 : t.value) === "1";
  }, e = (0,vue_runtime_esm/* ref */.KR)(!0);
  return (0,vue_runtime_esm/* onBeforeMount */.KC)(() => {
    e.value = l();
  }), {
    isPublic: e
  };
}, FilePicker_8ibBgPg_qt = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.pM)({
  __name: "FilePickerNavigation",
  props: {
    currentView: null,
    filterString: null,
    isCollapsed: { type: Boolean }
  },
  emits: ["update:currentView", "update:filterString"],
  setup(l, { emit: e }) {
    const t = l, { isPublic: i } = FilePicker_8ibBgPg_K(), n = [{
      id: "files",
      label: (0,index_X06k2874.t)("All files"),
      icon: FilePicker_8ibBgPg_R
    }, {
      id: "recent",
      label: (0,index_X06k2874.t)("Recent"),
      icon: FilePicker_8ibBgPg_Pt
    }, {
      id: "favorites",
      label: (0,index_X06k2874.t)("Favorites"),
      icon: FilePicker_8ibBgPg_Gt
    }], s = (0,vue_runtime_esm/* computed */.EW)(() => n.filter((p) => p.id === t.currentView)[0]);
    return { __sfc: !0, isPublic: i, allViews: n, props: t, emit: e, currentViewObject: s, updateFilterValue: (p) => e("update:filterString", p), IconClose: FilePicker_8ibBgPg_Dt, IconMagnify: FilePicker_8ibBgPg_Ut, NcButton: index_module/* NcButton */.x1, NcSelect: index_module/* NcSelect */.EQ, NcTextField: index_module/* NcTextField */.v, Fragment: frag_esm.Fragment, t: index_X06k2874.t };
  }
});
var FilePicker_8ibBgPg_Kt = function() {
  var e = this, t = e._self._c, i = e._self._setupProxy;
  return t(i.Fragment, [t(i.NcTextField, { staticClass: "file-picker__filter-input", attrs: { value: e.filterString, label: i.t("Filter file list"), "show-trailing-button": !!e.filterString }, on: { "update:value": i.updateFilterValue, "trailing-button-click": function(n) {
    return i.updateFilterValue("");
  } }, scopedSlots: e._u([{ key: "trailing-button-icon", fn: function() {
    return [t(i.IconClose, { attrs: { size: 16 } })];
  }, proxy: !0 }]) }, [t(i.IconMagnify, { attrs: { size: 16 } })], 1), i.isPublic ? e._e() : [e.isCollapsed ? t(i.NcSelect, { attrs: { "aria-label": i.t("Current view selector"), clearable: !1, searchable: !1, options: i.allViews, value: i.currentViewObject }, on: { input: (n) => i.emit("update:currentView", n.id) } }) : t("ul", { staticClass: "file-picker__side", attrs: { role: "tablist", "aria-label": i.t("Filepicker sections") } }, e._l(i.allViews, function(n) {
    return t("li", { key: n.id }, [t(i.NcButton, { attrs: { "aria-selected": e.currentView === n.id, type: e.currentView === n.id ? "primary" : "tertiary", wide: !0, role: "tab" }, on: { click: function(s) {
      return e.$emit("update:currentView", n.id);
    } }, scopedSlots: e._u([{ key: "icon", fn: function() {
      return [t(n.icon, { tag: "component", attrs: { size: 20 } })];
    }, proxy: !0 }], null, !0) }, [e._v(" " + e._s(n.label) + " ")])], 1);
  }), 0)]], 2);
}, FilePicker_8ibBgPg_Wt = [], FilePicker_8ibBgPg_Jt = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_qt,
  FilePicker_8ibBgPg_Kt,
  FilePicker_8ibBgPg_Wt,
  !1,
  null,
  "429eb827",
  null,
  null
);
const FilePicker_8ibBgPg_Qt = FilePicker_8ibBgPg_Jt.exports;
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
const FilePicker_8ibBgPg_Xt = function(l, e, t) {
  const i = (0,vue_runtime_esm/* computed */.EW)(() => t.value ? "/" : Q), n = (0,vue_runtime_esm/* computed */.EW)(() => t.value ? (0,_nextcloud_router_dist.generateRemoteUrl)("webdav").replace("/remote.php", "/public.php") : tt), s = (0,vue_runtime_esm/* computed */.EW)(() => {
    if (t.value) {
      const u = document.getElementById("sharingToken").value, d = btoa("".concat(u, ":null")), f = si(n.value);
      return f.setHeaders({ Authorization: "Basic ".concat(d) }), f;
    }
    return si();
  }), o = (u) => {
    const d = Et(u, i.value, n.value);
    return t.value ? new Proxy(d, {
      get(f, b) {
        if (b === "dirname" || b === "path") {
          let C = f.source.slice(n.value.length);
          return C[0] !== "/" && (C = "/".concat(C)), b === "dirname" ? (0,path.dirname)(C) : C;
        }
        return f[b];
      }
    }) : d;
  }, p = (0,vue_runtime_esm/* ref */.KR)([]), c = (0,vue_runtime_esm/* ref */.KR)(!0);
  async function w(u) {
    const d = (0,path.join)(e.value, u);
    await s.value.createDirectory((0,path.join)(i.value, d));
    const f = await m(d);
    return p.value.push(f), f;
  }
  async function m(u, d = void 0) {
    d = d != null ? d : i.value;
    const { data: f } = await s.value.stat("".concat(d).concat(u), {
      details: !0
    });
    return o(f);
  }
  async function k() {
    if (c.value = !0, l.value === "favorites")
      p.value = await oi(s.value, e.value, i.value);
    else if (l.value === "recent") {
      const u = Math.round(Date.now() / 1e3) - 1209600, { data: d } = await s.value.search("/", {
        details: !0,
        data: ri(u)
      });
      p.value = d.results.map(o);
    } else {
      const u = await s.value.getDirectoryContents("".concat(i.value).concat(e.value), {
        details: !0,
        data: ni()
      });
      p.value = u.data.map(o), t.value && (p.value = p.value.filter((d) => d.path !== e.value));
    }
    c.value = !1;
  }
  return (0,vue_runtime_esm/* watch */.wB)([l, e], () => k()), {
    isLoading: c,
    files: p,
    loadFiles: () => k(),
    getFile: m,
    createDirectory: w
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
const FilePicker_8ibBgPg_Yt = function(l) {
  const e = (0,vue_runtime_esm/* computed */.EW)(() => l.value.map((i) => i.split("/")));
  return {
    isSupportedMimeType: (i) => {
      const n = i.split("/");
      return e.value.some(
        ([s, o]) => (
          // check mime type matches or is wildcard
          (n[0] === s || s === "*") && (n[1] === o || o === "*")
        )
      );
    }
  };
}, FilePicker_8ibBgPg_ei = {
  name: "FilePicker"
}, FilePicker_8ibBgPg_ti = /* @__PURE__ */ (0,vue_runtime_esm/* defineComponent */.pM)({
  ...FilePicker_8ibBgPg_ei,
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
    const t = l, { isPublic: i } = FilePicker_8ibBgPg_K(), n = (0,vue_runtime_esm/* computed */.EW)(() => ({
      container: t.container,
      name: t.name,
      buttons: s.value,
      size: "large",
      contentClasses: ["file-picker__content"],
      dialogClasses: ["file-picker"],
      navigationClasses: ["file-picker__navigation"]
    })), s = (0,vue_runtime_esm/* computed */.EW)(() => (typeof t.buttons == "function" ? t.buttons(c.value, k.value, o.value) : t.buttons).map((a) => ({
      ...a,
      callback: async () => {
        const y = c.value.length === 0 && t.allowPickDirectory ? [await C(k.value)] : c.value;
        a.callback(y), e("close", c.value);
      }
    }))), o = (0,vue_runtime_esm/* ref */.KR)("files"), p = (0,vue_runtime_esm/* computed */.EW)(() => o.value === "favorites" ? (0,index_X06k2874.t)("Favorites") : o.value === "recent" ? (0,index_X06k2874.t)("Recent") : ""), c = (0,vue_runtime_esm/* ref */.KR)([]), w = (0,vue_runtime_esm/* ref */.KR)((window == null ? void 0 : window.sessionStorage.getItem("NC.FilePicker.LastPath")) || "/"), m = (0,vue_runtime_esm/* ref */.KR)(), k = (0,vue_runtime_esm/* computed */.EW)({
      // Only use the path for the files view as favorites and recent only works on the root
      get: () => o.value === "files" ? m.value || t.path || w.value : "/",
      /**
       * Navigate to the new path and save it to the session storage
       *
       * @param path The new path
       */
      set: (r) => {
        t.path === void 0 && window.sessionStorage.setItem("NC.FilePicker.LastPath", r), m.value = r, c.value = [];
      }
    }), u = (0,vue_runtime_esm/* ref */.KR)(""), { isSupportedMimeType: d } = FilePicker_8ibBgPg_Yt((0,vue_runtime_esm/* toRef */.lW)(t, "mimetypeFilter")), { files: f, isLoading: b, loadFiles: $, getFile: C, createDirectory: L } = FilePicker_8ibBgPg_Xt(o, k, i);
    (0,vue_runtime_esm/* onMounted */.sV)(() => $());
    const I = (0,vue_runtime_esm/* computed */.EW)(() => {
      let r = f.value;
      return t.mimetypeFilter.length > 0 && (r = r.filter((a) => a.type === "folder" || a.mime && d(a.mime))), u.value && (r = r.filter((a) => a.basename.toLowerCase().includes(u.value.toLowerCase()))), t.filterFn && (r = r.filter((a) => t.filterFn(a))), r;
    }), z = (0,vue_runtime_esm/* computed */.EW)(() => o.value === "files" ? (0,index_X06k2874.t)("Upload some content or sync with your devices!") : o.value === "recent" ? (0,index_X06k2874.t)("Files and folders you recently modified will show up here.") : (0,index_X06k2874.t)("Files and folders you mark as favorite will show up here."));
    return { __sfc: !0, props: t, emit: e, isPublic: i, dialogProps: n, dialogButtons: s, currentView: o, viewHeadline: p, selectedFiles: c, savedPath: w, navigatedPath: m, currentPath: k, filterString: u, isSupportedMimeType: d, files: f, isLoading: b, loadFiles: $, getFile: C, createDirectory: L, filteredFiles: I, noFilesDescription: z, onCreateFolder: async (r) => {
      try {
        await L(r);
      } catch (a) {
        console.warn("Could not create new folder", { name: r, error: a }), (0,toast_ctTsYfrv.i)((0,index_X06k2874.t)("Could not create the new folder"));
      }
    }, IconFile: FilePicker_8ibBgPg_q, DialogBase: DialogBase_aNq6aLpb.D, FileList: dt, FilePickerBreadcrumbs: FilePicker_8ibBgPg_$t, FilePickerNavigation: FilePicker_8ibBgPg_Qt, NcEmptyContent: index_module/* NcEmptyContent */.yI, t: index_X06k2874.t };
  }
});
var FilePicker_8ibBgPg_ii = function() {
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
}, FilePicker_8ibBgPg_ni = [], FilePicker_8ibBgPg_li = /* @__PURE__ */ (0,DialogBase_aNq6aLpb.n)(
  FilePicker_8ibBgPg_ti,
  FilePicker_8ibBgPg_ii,
  FilePicker_8ibBgPg_ni,
  !1,
  null,
  "f7b6434d",
  null,
  null
);
const vi = FilePicker_8ibBgPg_li.exports;



/***/ })

}]);