/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/renderWorker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/seedrandom/index.js":
/*!******************************************!*\
  !*** ./node_modules/seedrandom/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(/*! ./lib/alea */ "./node_modules/seedrandom/lib/alea.js");

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(/*! ./lib/xor128 */ "./node_modules/seedrandom/lib/xor128.js");

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(/*! ./lib/xorwow */ "./node_modules/seedrandom/lib/xorwow.js");

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(/*! ./lib/xorshift7 */ "./node_modules/seedrandom/lib/xorshift7.js");

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(/*! ./lib/xor4096 */ "./node_modules/seedrandom/lib/xor4096.js");

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(/*! ./lib/tychei */ "./node_modules/seedrandom/lib/tychei.js");

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(/*! ./seedrandom */ "./node_modules/seedrandom/seedrandom.js");

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),

/***/ "./node_modules/seedrandom/lib/alea.js":
/*!*********************************************!*\
  !*** ./node_modules/seedrandom/lib/alea.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/tychei.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/tychei.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor128.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xor128.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor4096.js":
/*!************************************************!*\
  !*** ./node_modules/seedrandom/lib/xor4096.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorshift7.js":
/*!**************************************************!*\
  !*** ./node_modules/seedrandom/lib/xorshift7.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorwow.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xorwow.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/seedrandom.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/seedrandom.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

// Detect the global object, even if operating in strict mode.
// http://stackoverflow.com/a/14387057/265298
var global = (0, eval)('this'),
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ( true && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(/*! crypto */ 0);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return seedrandom; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(r, g, b, a = 1.0) {
        this.red = 255;
        this.green = 255;
        this.blue = 255;
        this.alpha = 1.0;
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    get hue() {
        const R = this.red / 255;
        const G = this.green / 255;
        const B = this.blue / 255;
        const max = Math.max(R, G, B);
        const min = Math.min(R, G, B);
        let h;
        if (max === min)
            h = 0;
        else if (max === R)
            h = 60 * (0 + (G - B) / (max - min));
        else if (max === G)
            h = 60 * (2 + (B - R) / (max - min));
        else if (max === B)
            h = 60 * (4 + (R - G) / (max - min));
        return h < 0 ? h + 360 : h;
    }
    get saturation() {
        const max = Math.max(this.red, this.green, this.blue) / 255;
        const min = Math.min(this.red, this.blue, this.green) / 255;
        if (max === 0)
            return 0;
        else if (min == 1)
            return 0;
        return (max - min) / (1 - Math.abs(max + min - 1));
    }
    get lightness() {
        const max = Math.max(this.red, this.green, this.blue) / 255;
        const min = Math.min(this.red, this.blue, this.green) / 255;
        return (max + min) / 2;
    }
    set hue(value) {
        this.setHSL(value, this.saturation, this.lightness);
    }
    set saturation(value) {
        this.setHSL(this.hue, value, this.lightness);
    }
    set lightness(value) {
        this.setHSL(this.hue, this.saturation, value);
    }
    static add(a, b) {
        const t = b.alpha;
        return new Color((1 - t) * a.red + t * b.red, (1 - t) * a.green + t * b.green, (1 - t) * a.blue + t * b.blue, 1 - (1 - a.alpha) * (1 - b.alpha));
    }
    static blend(a, b, t) {
        return new Color((1 - t) * a.red + t * b.red, (1 - t) * a.green + t * b.green, (1 - t) * a.blue + t * b.blue, 1);
    }
    static fromHSL(h, s, l, alpha = 1) {
        return new Color(0, 0, 0, alpha).setHSL(h, s, l);
    }
    static from(color) {
        return new Color(color.red, color.green, color.blue, color.alpha);
    }
    setHSL(h, s, l) {
        h = h < 0 ? h + 360 : h;
        const chroma = (1 - Math.abs(2 * l - 1)) * s;
        if (isNaN(h)) {
            this.red = this.green = this.blue = 0;
            return this;
        }
        h = h / 60;
        const x = chroma * (1 - Math.abs(h % 2 - 1));
        let color = [0, 0, 0];
        if (0 <= h && h <= 1)
            color = [chroma, x, 0];
        else if (h <= 2)
            color = [x, chroma, 0];
        else if (h <= 3)
            color = [0, chroma, x];
        else if (h <= 4)
            color = [0, x, chroma];
        else if (h <= 5)
            color = [x, 0, chroma];
        else if (h <= 6)
            color = [chroma, 0, x];
        let m = l - chroma / 2;
        this.red = Math.floor((color[0] + m) * 255);
        this.green = Math.floor((color[1] + m) * 255);
        this.blue = Math.floor((color[2] + m) * 255);
        return this;
    }
    static fromString(str, alpha = 1) {
        str = str.replace(new RegExp(/\s/g), "");
        var reg = new RegExp("#[0-9a-fA-F]{6}");
        if (reg.test(str)) {
            str = str.replace("#", "");
            var strR = str.charAt(0) + str.charAt(1);
            var strG = str.charAt(2) + str.charAt(3);
            var strB = str.charAt(4) + str.charAt(5);
            var r = parseInt(strR, 16);
            var g = parseInt(strG, 16);
            var b = parseInt(strB, 16);
            return new Color(r, g, b, alpha);
        }
        reg = new RegExp("rgb\\(([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1})\\)");
        if (reg.test(str)) {
            var colorArray = str.replace("rgb(", "").replace(")", "").split(",");
            var r = parseInt(colorArray[0]);
            var g = parseInt(colorArray[1]);
            var b = parseInt(colorArray[2]);
            var a = 1.00;
            return new Color(r, g, b, a);
        }
        reg = new RegExp("rgba\\(([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1})\\)");
        if (reg.test(str)) {
            var colorArray = str.replace("rgba(", "").replace(")", "").split(",");
            var r = parseInt(colorArray[0]);
            var g = parseInt(colorArray[1]);
            var b = parseInt(colorArray[2]);
            var a = parseFloat(colorArray[3]);
            return new Color(r, g, b, a);
        }
    }
    toString() {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
    }
    toVector4() {
        return new Vector4(this.red / 255, this.green / 255, this.blue / 255, this.alpha);
    }
}
exports.Color = Color;
const max = Math.max;
exports.max = max;
const min = Math.min;
exports.min = min;
const sqrt = Math.sqrt;
exports.sqrt = sqrt;
const abs = Math.abs;
exports.abs = abs;
const length = (x, y) => sqrt(x * x + y * y);
exports.length = length;
const clamp = (n, min, max) => n > max ? max : n < min ? min : n;
exports.clamp = clamp;
const smin = (a, b, k) => -Math.log(Math.exp(-k * a) + Math.exp(-k * b)) / k;
exports.smin = smin;
class Vector2 extends Array {
    constructor(x, y = 0) {
        super(4);
        if (x instanceof Array) {
            this[0] = x[0];
            this[1] = x[1];
        }
        else {
            this[0] = x;
            this[1] = y;
        }
    }
    get x() {
        return this[0];
    }
    set x(value) {
        this[0] = value;
    }
    get y() {
        return this[1];
    }
    set y(value) {
        this[1] = value;
    }
    get normalized() {
        let l = Math.hypot(this.x, this.y);
        return new Vector2(this.x / l, this.y / l);
    }
    get magnitude() {
        return Math.hypot(this[0], this[1]);
    }
}
exports.Vector2 = Vector2;
class Vector4 extends Array {
    constructor(x, y = 0, z = 0, w = 0) {
        super(4);
        if (x instanceof Array) {
            this[0] = x[0];
            this[1] = x[1];
            this[2] = x[2];
            this[3] = x[3];
        }
        else {
            this[0] = x;
            this[1] = y;
            this[2] = z;
            this[3] = w;
        }
    }
    get x() {
        return this[0];
    }
    set x(value) {
        this[0] = value;
    }
    get y() {
        return this[1];
    }
    set y(value) {
        this[1] = value;
    }
    get z() {
        return this[2];
    }
    set z(value) {
        this[2] = value;
    }
    get w() {
        return this[3];
    }
    set w(value) {
        this[3] = value;
    }
    static scale(u, k) {
        return new Vector4(u.map(n => n * k));
    }
}
exports.Vector4 = Vector4;
function vec2(x, y) {
    return new Vector2(x, y);
}
exports.vec2 = vec2;
function vec4(x, y, z, w) {
    return new Vector4(x, y, z, w);
}
exports.vec4 = vec4;
function plus(u, v) {
    if (u instanceof Vector2) {
        return new Vector2(u.x + v.x, u.y + v.y);
    }
    else if (v instanceof Vector4) {
        return new Vector4([u.x + v.x, u.y + v.y, u.z + v.z, u.w + v.w]);
    }
    return new Vector4(u.map((n, i) => n + v[i]));
}
exports.plus = plus;
function minus(u, v) {
    if (u instanceof Vector2) {
        return new Vector2(u.x - v.x, u.y - v.y);
    }
    else if (v instanceof Vector4) {
        return new Vector4([u.x - v.x, u.y - v.y, u.z - v.z, u.w - v.w]);
    }
    return new Vector4(u.map((n, i) => n - v[i]));
}
exports.minus = minus;
function scale(u, k) {
    if (u instanceof Vector2) {
        return new Vector2(u.x * k, u.y * k);
    }
    else {
        return new Vector4([u.x * k, u.y * k, u.z * k, u.w * k]);
    }
}
exports.scale = scale;
function dot(u, v) {
    if (u instanceof Vector2) {
        return u.x * v.x + u.y * v.y;
    }
    else {
        return u[0] * v[0] +
            u[1] * v[1] +
            u[2] * v[2] +
            u[3] * v[3];
    }
}
exports.dot = dot;
function cross(u, v) {
    return u.x * v.y - u.y * v.x;
}
exports.cross = cross;
class Range extends Vector2 {
    get from() {
        return this[0];
    }
    set from(value) {
        this[0] = value;
    }
    get to() {
        return this[1];
    }
    set to(value) {
        this[1] = value;
    }
    get size() {
        console.log(this[1] - this[0]);
        return this[1] - this[0];
    }
    inRange(n) {
        return this.from < n && n < this.to;
    }
    inRangeInclude(n) {
        return this.from <= n && n <= this.to;
    }
}
exports.Range = Range;
class Rect {
    constructor(size, offset = new Vector2(0, 0)) {
        this.size = size;
        this.offset = offset;
    }
    inRect(p) {
        let dp = scale(minus(p, this.offset), 2);
        return -this.size.x <= dp.x && dp.x <= this.size.x
            && -this.size.y <= dp.y && dp.y <= this.size.y;
    }
}
exports.Rect = Rect;
class Matrix3x3 extends Array {
    constructor(mat = null) {
        super(...[
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);
        this[0] = [1, 0, 0];
        this[1] = [0, 1, 0];
        this[2] = [0, 0, 1];
        if (mat instanceof Matrix3x3 || mat instanceof Array) {
            this[0] = mat[0].copyWithin(0, 0);
            this[1] = mat[1].copyWithin(0, 0);
            this[2] = mat[2].copyWithin(0, 0);
        }
    }
    static get identity() {
        return new Matrix3x3();
    }
    static multipleVector(mat, v) {
        let result = [
            mat[0][0] * v[0] + mat[0][1] * v[1],
            mat[1][0] * v[0] + mat[1][1] * v[1],
            mat[2][0] * v[2] + mat[2][1] * v[1],
        ];
        return new Vector2(result);
    }
    static multiplePoint(mat, v) {
        let result = [
            mat[0][0] * v[0] + mat[0][1] * v[1] + mat[0][2] * 1,
            mat[1][0] * v[0] + mat[1][1] * v[1] + mat[1][2] * 1,
            mat[2][0] * v[2] + mat[2][1] * v[1] + mat[2][2] * 1,
        ];
        return new Vector2(result);
    }
    static multipleMatrix(a, b) {
        let mat = new Matrix3x3();
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                for (let k = 0; k < 3; k++)
                    mat[i][j] = a[i][k] * b[k][j];
        return mat;
    }
    multipleVector(v) {
        return Matrix3x3.multipleVector(this, v);
    }
    multiplePoint(p) {
        return Matrix3x3.multiplePoint(this, p);
    }
    multipleMatrix(m) {
        let mat = Matrix3x3.multipleMatrix(this, m);
        this[0] = mat[0].copyWithin(0, 0);
        this[1] = mat[1].copyWithin(0, 0);
        this[2] = mat[2].copyWithin(0, 0);
        return this;
    }
}
exports.Matrix3x3 = Matrix3x3;
class Material {
    constructor(emission = new Color(0, 0, 0, 1.0)) {
        this.diffuseColor = new Color(0, 0, 0, 1.0);
        this.reflectivity = 0;
        this.refractivity = 0;
        this.emission = new Color(0, 0, 0, 1.0);
        this.emission = emission;
    }
}
exports.Material = Material;
function mapColor(v, k) {
    return new Color(v.x * k * 255, v.y * k * 255, v.z * k * 255, 1.0);
}
exports.mapColor = mapColor;
function gradient(sdf, x, y, delta) {
    return [
        (sdf(x + delta, y)["0"] - sdf(x - delta, y)["0"]) / (2 * delta),
        (sdf(x, y + delta)["0"] - sdf(x, y - delta)["0"]) / (2 * delta)
    ];
}
exports.gradient = gradient;


/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const trace_1 = __webpack_require__(/*! ./trace */ "./src/trace.ts");
const lib_1 = __webpack_require__(/*! ./lib */ "./src/lib.ts");
class RenderCmd {
    constructor(renderOption) {
        this.renderOption = null;
        this.buffer = null;
        this.xRange = null;
        this.yRange = null;
        this.renderOption = renderOption;
    }
}
class RenderState {
    constructor() {
        this.progress = 0;
        this.buffer = null;
    }
}
function startRenderWorker(renderCmd, outputTarget) {
    //renderCmd.buffer = new Uint8ClampedArray(renderCmd.xRange.length * renderCmd.yRange.length << 2);
    let worker = new Worker("./build/renderWorker.js");
    let ctx = outputTarget.getContext("2d");
    worker.onmessage = (e) => {
        let state = e.data;
        let imgData = new ImageData(state.buffer, renderCmd.xRange.size, renderCmd.yRange.size);
        ctx.putImageData(imgData, renderCmd.xRange.from, renderCmd.yRange.from);
        if (state.progress >= 1)
            worker.terminate();
    };
    renderCmd.buffer;
    worker.postMessage(renderCmd, [renderCmd.buffer.buffer]);
}
function renderRaytrace(sdf, renderOption, outputTarget) {
    //outputTarget.width = renderOption.width;
    //outputTarget.height = renderOption.height;
    /*
        let renderCmd = new RenderCmd(renderOption);
        renderCmd.xRange = new Range(0, renderOption.viewport.size.x);
        renderCmd.yRange = new Range(0, renderOption.viewport.size.y);
        
        let imgDta = outputTarget.getContext("2d").getImageData(0, 0, renderOption.width, renderOption.height);
        renderCmd.buffer = new Uint8ClampedArray(imgDta.data);
        startRenderWorker(renderCmd, outputTarget);*/
}
function renderSDF(sdf, renderOption, outputBuffer) {
    const width = renderOption.viewport.size.x;
    const height = renderOption.viewport.size.y;
    const threshold = 1;
    let imgData = new ImageData(outputBuffer, width, height);
    for (let y = -height / 2 + 1; y <= height / 2; y++) {
        for (let x = -width / 2; x < width / 2; x++) {
            let [dst, mat] = sdf(x, y);
            let color = renderOption.environment.backgroundColor;
            if (dst <= 0)
                color = mat.emission;
            else if (dst < threshold) {
                var t = dst / threshold;
                color = lib_1.Color.blend(renderOption.environment.backgroundColor, mat.emission, 1 - t);
            }
            drawPixel(outputBuffer, x + width / 2, -y + height / 2, width, height, color);
        }
    }
}
function drawPixel(buffer, x, y, width, height, color) {
    let idx = (y * width + x) * 4;
    buffer[idx] = color.red;
    buffer[idx + 1] = color.green;
    buffer[idx + 2] = color.blue;
    buffer[idx + 3] = Math.floor(color.alpha * 255);
}
class Renderer {
    constructor(options) {
        this.options = options;
        this.raytracer = new trace_1.RayTracer2D(options);
    }
    render(sdf, buffer) {
    }
    *renderRaytraceIterator(sdf, buffer, rand, offset = 0) {
        const pixelRenderer = [];
        const [width, height] = this.options.viewport.size;
        for (let y = 0; y < height; y++) {
            pixelRenderer.push([]);
            for (let x = 0; x < width; x++) {
                let p = lib_1.Matrix3x3.multiplePoint(this.options.viewport.transform, new lib_1.Vector2(x, y));
                pixelRenderer[y].push(this.raytracer.sampleIterator(sdf, p, rand, offset));
            }
        }
        for (var i = 1; i <= this.options.raytrace.subDivide; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let idx = (y * width + x) * 4;
                    let color = pixelRenderer[y][x].next().value;
                    buffer[idx] = color.red;
                    buffer[idx + 1] = color.green;
                    buffer[idx + 2] = color.blue;
                    buffer[idx + 3] = Math.floor(color.alpha * 255);
                }
            }
            yield {
                progress: i / this.options.raytrace.subDivide,
                buffer: buffer
            };
        }
    }
    renderRaytrace(sdf, buffer) {
        const [width, height] = this.options.viewport.size;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let idx = (y * width + x) * 4;
                let p = lib_1.Matrix3x3.multiplePoint(this.options.viewport.transform, new lib_1.Vector2(x, y));
                let color = this.raytracer.sample(sdf, p);
                buffer[idx] = color.red;
                buffer[idx + 1] = color.green;
                buffer[idx + 2] = color.blue;
                buffer[idx + 3] = Math.floor(color.alpha * 255);
            }
            /*
            let state = new RenderState();
            state.buffer = new Uint8ClampedArray(buffer);
            state.progress = y / height;
            postMessage(state, undefined, [state.buffer.buffer]);*/
        }
        //outputTarget.width = renderOption.width;
        //outputTarget.height = renderOption.height;
        /*
        let renderCmd = new RenderCmd(renderOption);
        renderCmd.xRange = new Range(0, renderOption.width);
        renderCmd.yRange = new Range(0, renderOption.height);

        let imgDta = outputTarget.getContext("2d").getImageData(0, 0, renderOption.width, renderOption.height);
        renderCmd.buffer = new Uint8ClampedArray(imgDta.data);
        startRenderWorker(renderCmd, outputTarget);*/
    }
    renderSDF(sdf, buffer) {
        renderSDF(sdf, this.options, buffer);
    }
}
exports.Renderer = Renderer;


/***/ }),

/***/ "./src/renderWorker.ts":
/*!*****************************!*\
  !*** ./src/renderWorker.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __webpack_require__(/*! ./lib */ "./src/lib.ts");
const render_1 = __webpack_require__(/*! ./render */ "./src/render.ts");
const seedrandom_1 = __importDefault(__webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js"));
onmessage = (e) => {
    let renderCmd = e.data;
    console.log(`Worker #${renderCmd.index} started.`);
    process(renderCmd);
};
function report(result) {
    postMessage(result, undefined, [result.buffer]);
}
function process(renderCmd) {
    function config() {
        renderCmd.options.environment.ambient = lib_1.Color.from(renderCmd.options.environment.ambient);
        renderCmd.options.environment.backgroundColor = lib_1.Color.from(renderCmd.options.environment.ambient);
        renderCmd.options.viewport.size = new lib_1.Vector2(renderCmd.options.viewport.size);
        renderCmd.options.viewport.transform = new lib_1.Matrix3x3(renderCmd.options.viewport.transform);
    }
    function render(sdf) {
        let buffer = new Uint8ClampedArray(renderCmd.options.viewport.size.x * renderCmd.options.viewport.size.y * 4);
        if (renderCmd.renderType == "preview") {
            const renderer = new render_1.Renderer(renderCmd.options);
            renderer.renderSDF(sdf, buffer);
            report({
                progress: 1,
                buffer: buffer
            });
        }
        else if (renderCmd.renderType == "raytrace") {
            renderCmd.index = renderCmd.index || 0;
            const renderer = new render_1.Renderer(renderCmd.options);
            const N = renderCmd.options.raytrace.subDivide / renderCmd.options.thread;
            const rand = seedrandom_1.default.alea(renderCmd.seed.toString());
            let i = 0;
            for (const result of renderer.renderRaytraceIterator(sdf, buffer, rand, renderCmd.index * N)) {
                if (i >= N)
                    return;
                report({
                    progress: result.progress * renderCmd.options.thread,
                    buffer: new Uint8ClampedArray(result.buffer.buffer)
                });
                i++;
            }
        }
    }
    eval(renderCmd.code);
}


/***/ }),

/***/ "./src/trace.ts":
/*!**********************!*\
  !*** ./src/trace.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __webpack_require__(/*! ./lib */ "./src/lib.ts");
let BoundX = new lib_1.Range(-500, 500);
let BoundY = new lib_1.Range(-500, 500);
function setBound(boundX, boundY) {
    BoundX = boundX;
    BoundY = boundY;
}
/*function antiAlias(sdf: SDF, p: Vector2, colorCallback:Function): Vector4
{
    
}*/
class RayTracer2D {
    constructor(options) {
        this.options = options;
        this.bound = new lib_1.Rect(options.viewport.size);
    }
    trace(sdf, p, dir) {
        let distance = 0;
        let material;
        dir = dir.normalized;
        do {
            p = lib_1.plus(p, lib_1.scale(dir, distance));
            [distance, material] = sdf(p.x, p.y);
            if (!this.bound.inRect(p))
                return this.options.environment.backgroundColor.toVector4();
        } while (distance > this.options.raytrace.hitThreshold);
        return material.emission.toVector4();
    }
    sample(sdf, p) {
        const antiAliasThreshold = 1;
        let sampleFunction;
        switch (this.options.raytrace.sampleFunction) {
            case "jittered":
                sampleFunction = this.jitteredSample;
                break;
            case "stratified":
                sampleFunction = this.stratifiedSample;
                break;
            case "uniform":
                sampleFunction = this.uniformSample;
                break;
        }
        sampleFunction = sampleFunction.bind(this);
        let color = lib_1.vec4(0, 0, 0, 0);
        const N = this.options.raytrace.subDivide;
        for (const c of sampleFunction(sdf, p, null)) {
            color = lib_1.plus(color, c);
        }
        const distance = sdf(p.x, p.y)[0];
        if (0 <= distance && distance <= antiAliasThreshold) {
            let grad = new lib_1.Vector2(lib_1.gradient(sdf, p.x, p.y, 0.1));
            let pN = lib_1.minus(p, lib_1.scale(grad.normalized, antiAliasThreshold));
            let antiAliasColor = lib_1.vec4(0, 0, 0, 0);
            for (const c of sampleFunction(sdf, pN, null)) {
                antiAliasColor = lib_1.plus(color, c);
            }
            return lib_1.Color.blend(lib_1.mapColor(antiAliasColor, 1 / N), lib_1.mapColor(color, 1 / N), distance / antiAliasThreshold);
        }
        return lib_1.mapColor(color, 1 / N);
    }
    *sampleIterator(sdf, p, rand, offset = 0) {
        const antiAliasThreshold = 1;
        let sampleFunction;
        switch (this.options.raytrace.sampleFunction) {
            case "jittered":
                sampleFunction = this.jitteredSample;
                break;
            case "stratified":
                sampleFunction = this.stratifiedSample;
                break;
            case "uniform":
                sampleFunction = this.uniformSample;
                break;
        }
        sampleFunction = sampleFunction.bind(this);
        let color = lib_1.vec4(0, 0, 0, 0);
        let antiAliasColor = lib_1.vec4(0, 0, 0, 0);
        let n = 0;
        const distance = sdf(p.x, p.y)[0];
        let antiAliasIterator = null;
        if (0 <= distance && distance <= antiAliasThreshold) {
            let grad = new lib_1.Vector2(lib_1.gradient(sdf, p.x, p.y, 0.1));
            let pN = lib_1.minus(p, lib_1.scale(grad.normalized, antiAliasThreshold));
            antiAliasIterator = sampleFunction(sdf, pN, rand, offset);
        }
        for (const c of sampleFunction(sdf, p, rand, offset)) {
            n++;
            color = lib_1.plus(color, c);
            if (antiAliasIterator) {
                antiAliasColor = lib_1.plus(antiAliasColor, antiAliasIterator.next().value);
                yield lib_1.Color.blend(lib_1.mapColor(antiAliasColor, 1 / n), lib_1.mapColor(color, 1 / n), distance / antiAliasThreshold);
            }
            else
                yield lib_1.mapColor(color, 1 / n);
        }
    }
    *uniformSample(sdf, p, rand, offset = 0) {
        let color = lib_1.vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++) {
            let rad = Math.PI * 2 * Math.random();
            yield this.trace(sdf, p, lib_1.vec2(Math.cos(rad), Math.sin(rad)));
        }
        return color;
    }
    *stratifiedSample(sdf, p, rand, offset = 0) {
        let color = lib_1.vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++) {
            let rad = Math.PI * 2 * i / this.options.raytrace.subDivide;
            yield this.trace(sdf, p, lib_1.vec2(Math.cos(rad), Math.sin(rad)));
        }
        return color;
    }
    *jitteredSample(sdf, p, rand, offset = 0) {
        let color = lib_1.vec4(0, 0, 0, 1);
        //const offset = Math.floor(this.options.raytrace.subDivide * Math.random());
        offset = Math.floor(this.options.raytrace.subDivide * rand()) + offset;
        for (let i = 0; i < this.options.raytrace.subDivide; i++) {
            let rad = Math.PI * 2 * ((i + offset) % this.options.raytrace.subDivide + rand()) / this.options.raytrace.subDivide;
            yield this.trace(sdf, p, lib_1.vec2(Math.cos(rad), Math.sin(rad)));
            //color = <Vector4>plus(this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad))), color);
        }
    }
}
exports.RayTracer2D = RayTracer2D;


/***/ }),

/***/ 0:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=renderWorker.js.map