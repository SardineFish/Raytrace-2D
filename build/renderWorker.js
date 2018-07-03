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

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/*! exports provided: Color, max, min, sqrt, abs, length, clamp, smin, vec2, Vector2, plus, minus, scale, dot, cross, Vector4, vec4, Range, Material, mapColor, gradient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smin", function() { return smin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vec2", function() { return vec2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plus", function() { return plus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minus", function() { return minus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector4", function() { return Vector4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return vec4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapColor", function() { return mapColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gradient", function() { return gradient; });
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
    static add(a, b) {
        const t = b.alpha;
        return new Color((1 - t) * a.red + t * b.red, (1 - t) * a.green + t * b.green, (1 - t) * a.blue + t * b.blue, 1 - (1 - a.alpha) * (1 - b.alpha));
    }
    static blend(a, b, t) {
        return new Color((1 - t) * a.red + t * b.red, (1 - t) * a.green + t * b.green, (1 - t) * a.blue + t * b.blue, 1);
    }
    toString() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
}
const max = Math.max;
const min = Math.min;
const sqrt = Math.sqrt;
const abs = Math.abs;
const length = (x, y) => sqrt(x * x + y * y);
const clamp = (n, min, max) => n > max ? max : n < min ? min : n;
const smin = (a, b, k) => -Math.log(Math.exp(-k * a) + Math.exp(-k * b)) / k;
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
function vec2(x, y) {
    return new Vector2(x, y);
}
function vec4(x, y, z, w) {
    return new Vector4(x, y, z, w);
}
function plus(u, v) {
    if (u instanceof Vector2) {
        return new Vector2(u.x + v.x, u.y + v.y);
    }
    else if (v instanceof Vector4) {
        return new Vector4([u.x + v.x, u.y + v.y, u.z + v.z, u.w + v.w]);
    }
    return new Vector4(u.map((n, i) => n + v[i]));
}
function minus(u, v) {
    if (u instanceof Vector2) {
        return new Vector2(u.x - v.x, u.y - v.y);
    }
    else if (v instanceof Vector4) {
        return new Vector4([u.x - v.x, u.y - v.y, u.z - v.z, u.w - v.w]);
    }
    return new Vector4(u.map((n, i) => n - v[i]));
}
function scale(u, k) {
    if (u instanceof Vector2) {
        return new Vector2(u.x * k, u.y * k);
    }
    else {
        return new Vector4([u.x * k, u.y * k, u.z * k, u.w * k]);
    }
}
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
function cross(u, v) {
    return u.x * v.y - u.y * v.x;
}
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
class Material {
    constructor(emission = new Color(0, 0, 0, 1.0)) {
        this.diffuseColor = new Color(0, 0, 0, 1.0);
        this.reflectivity = 0;
        this.refractivity = 0;
        this.emission = new Color(0, 0, 0, 1.0);
        this.emission = emission;
    }
}
function mapColor(v, k) {
    return new Color(v.x * k * 255, v.y * k * 255, v.z * k * 255, 1.0);
}
function gradient(sdf, x, y, delta) {
    return [
        (sdf(x + delta, y)["0"] - sdf(x - delta, y)["0"]) / (2 * delta),
        (sdf(x, y + delta)["0"] - sdf(x, y - delta)["0"]) / (2 * delta)
    ];
}



/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/*! exports provided: RenderOption, SampleFunctions, EnvironmentOptions, RaytraceOptions, RenderCmd, renderRaytrace, renderSDF, RenderState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderOption", function() { return RenderOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleFunctions", function() { return SampleFunctions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentOptions", function() { return EnvironmentOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RaytraceOptions", function() { return RaytraceOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderCmd", function() { return RenderCmd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderRaytrace", function() { return renderRaytrace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSDF", function() { return renderSDF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderState", function() { return RenderState; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");

class RenderOption {
    constructor() {
        this.width = 600;
        this.height = 480;
        this.environmentOptions = new EnvironmentOptions();
        this.raytraceOptions = new RaytraceOptions();
        this.antiAlias = true;
        this.renderOrder = RenderOrder.Progressive;
        //outputTarget: HTMLCanvasElement = null;
    }
}
var SampleFunctions;
(function (SampleFunctions) {
    SampleFunctions["JitteredSample"] = "JitteredSample";
    SampleFunctions["StratifiedSample"] = "StratifiedSample";
    SampleFunctions["UniformSample"] = "UniformSample";
})(SampleFunctions || (SampleFunctions = {}));
var RenderOrder;
(function (RenderOrder) {
    RenderOrder[RenderOrder["Progressive"] = 0] = "Progressive";
})(RenderOrder || (RenderOrder = {}));
class EnvironmentOptions {
    constructor() {
        this.backgroundColor = new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](0, 0, 0, 1.0);
        this.ambient = new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](0, 0, 0, 1.0);
    }
}
class RaytraceOptions {
    constructor() {
        this.sampleFunction = SampleFunctions.JitteredSample;
        this.subDivide = 64;
        this.reflectDepth = 8;
        this.refrectDepth = 8;
        this.hitThreshold = 0.1;
    }
}
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
    let renderCmd = new RenderCmd(renderOption);
    renderCmd.xRange = new _lib__WEBPACK_IMPORTED_MODULE_0__["Range"](0, renderOption.width);
    renderCmd.yRange = new _lib__WEBPACK_IMPORTED_MODULE_0__["Range"](0, renderOption.height);
    let imgDta = outputTarget.getContext("2d").getImageData(0, 0, renderOption.width, renderOption.height);
    renderCmd.buffer = new Uint8ClampedArray(imgDta.data);
    startRenderWorker(renderCmd, outputTarget);
}
function renderSDF(sdf, renderOption, outputTarget) {
    const width = renderOption.width;
    const height = renderOption.height;
    const threshold = 1;
    outputTarget.width = width;
    outputTarget.height = height;
    let ctx = outputTarget.getContext("2d");
    let buffer = new Uint8ClampedArray(width * height << 2);
    let imgData = new ImageData(buffer, width, height);
    for (let y = -height / 2 + 1; y <= height / 2; y++) {
        for (let x = -width / 2; x < width / 2; x++) {
            let [dst, mat] = sdf(x, y);
            let color = renderOption.environmentOptions.backgroundColor;
            if (dst <= 0)
                color = mat.emission;
            else if (dst < threshold) {
                var t = dst / threshold;
                color = _lib__WEBPACK_IMPORTED_MODULE_0__["Color"].blend(renderOption.environmentOptions.backgroundColor, mat.emission, 1 - t);
            }
            drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
        }
    }
    ctx.putImageData(imgData, 0, 0);
}
function drawPixel(imgData, x, y, width, height, color) {
    //alert(x);
    let idx = (y * width + x) * 4;
    imgData.data[idx] = color.red;
    imgData.data[idx + 1] = color.green;
    imgData.data[idx + 2] = color.blue;
    imgData.data[idx + 3] = Math.floor(color.alpha * 255);
}



/***/ }),

/***/ "./src/renderWorker.ts":
/*!*****************************!*\
  !*** ./src/renderWorker.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.ts");
/* harmony import */ var _trace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trace */ "./src/trace.ts");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");



onmessage = (e) => {
    console.log("receive");
    let renderCmd = e.data;
    render(renderCmd);
};
const SampleFunctions = {
    JitteredSample: _trace__WEBPACK_IMPORTED_MODULE_1__["jitteredSample"],
    StratifiedSample: _trace__WEBPACK_IMPORTED_MODULE_1__["stratifiedSample"],
    UniformSample: _trace__WEBPACK_IMPORTED_MODULE_1__["uniformSample"]
};
function render(renderCmd) {
    renderCmd.xRange = new _lib__WEBPACK_IMPORTED_MODULE_2__["Range"](renderCmd.xRange);
    renderCmd.yRange = new _lib__WEBPACK_IMPORTED_MODULE_2__["Range"](renderCmd.yRange);
    let xStart = renderCmd.xRange.from;
    let xEnd = renderCmd.xRange.to;
    let yStart = renderCmd.yRange.from;
    let yEnd = renderCmd.yRange.to;
    let width = renderCmd.xRange.size;
    let height = renderCmd.yRange.size;
    let renderFunc = SampleFunctions[renderCmd.renderOption.raytraceOptions.sampleFunction];
    let buffer = renderCmd.buffer;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let pos = y * width + x;
            let idx = pos << 2;
            buffer[idx] = 255 - buffer[idx];
            buffer[idx + 1] = 255 - buffer[idx + 1];
            buffer[idx + 2] = 255 - buffer[idx + 2];
            buffer[idx + 3] = 255;
        }
    }
    let state = new _render__WEBPACK_IMPORTED_MODULE_0__["RenderState"]();
    state.buffer = buffer;
    state.progress = 1;
    postMessage(state, undefined, [state.buffer.buffer]);
}


/***/ }),

/***/ "./src/trace.ts":
/*!**********************!*\
  !*** ./src/trace.ts ***!
  \**********************/
/*! exports provided: trace, setBound, uniformSample, stratifiedSample, jitteredSample, sample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trace", function() { return trace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBound", function() { return setBound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniformSample", function() { return uniformSample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stratifiedSample", function() { return stratifiedSample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jitteredSample", function() { return jitteredSample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return sample; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");

let BoundX = new _lib__WEBPACK_IMPORTED_MODULE_0__["Range"](-500, 500);
let BoundY = new _lib__WEBPACK_IMPORTED_MODULE_0__["Range"](-500, 500);
function setBound(boundX, boundY) {
    BoundX = boundX;
    BoundY = boundY;
}
function trace(sdf, p, dir, precision) {
    let distance = 0;
    let material;
    dir = dir.normalized;
    do {
        p = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["plus"])(p, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["scale"])(dir, distance));
        [distance, material] = sdf(p.x, p.y);
        if (!BoundX.inRange(p.x) || !BoundY.inRange(p.y))
            return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec4"])(0, 0, 0, 1);
    } while (distance > precision);
    return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec4"])(material.emission.red / 255, material.emission.green / 255, material.emission.blue / 255, material.emission.alpha);
}
/*function antiAlias(sdf: SDF, p: Vector2, colorCallback:Function): Vector4
{
    
}*/
function sample(sdf, p, sampleFunction, precision, subdiv) {
    const antiAliasThreshold = 1;
    let color = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["mapColor"])(sampleFunction(sdf, p, precision, subdiv), 1 / subdiv);
    let distance = sdf(p.x, p.y)["0"];
    if (0 <= distance && distance <= antiAliasThreshold) {
        let grad = new _lib__WEBPACK_IMPORTED_MODULE_0__["Vector2"](Object(_lib__WEBPACK_IMPORTED_MODULE_0__["gradient"])(sdf, p.x, p.y, 0.1));
        let pN = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["minus"])(p, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["scale"])(grad.normalized, antiAliasThreshold));
        let colorN = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["mapColor"])(sampleFunction(sdf, pN, precision, subdiv), 1 / subdiv);
        return _lib__WEBPACK_IMPORTED_MODULE_0__["Color"].blend(colorN, color, distance / antiAliasThreshold);
    }
    return color;
}
function uniformSample(sdf, p, precision, subdiv) {
    let color = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec4"])(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++) {
        let rad = Math.PI * 2 * Math.random();
        color = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["plus"])(trace(sdf, p, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec2"])(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}
function stratifiedSample(sdf, p, precision, subdiv) {
    let color = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec4"])(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++) {
        let rad = Math.PI * 2 * i / subdiv;
        color = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["plus"])(trace(sdf, p, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec2"])(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}
function jitteredSample(sdf, p, precision, subdiv) {
    let color = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec4"])(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++) {
        let rad = Math.PI * 2 * (i + Math.random()) / subdiv;
        color = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["plus"])(trace(sdf, p, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec2"])(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}



/***/ })

/******/ });
//# sourceMappingURL=renderWorker.js.map