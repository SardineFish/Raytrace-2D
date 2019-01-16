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
    *renderRaytraceIterator(sdf, buffer) {
        const pixelRenderer = [];
        const [width, height] = this.options.viewport.size;
        for (let y = 0; y < height; y++) {
            pixelRenderer.push([]);
            for (let x = 0; x < width; x++) {
                let p = lib_1.Matrix3x3.multiplePoint(this.options.viewport.transform, new lib_1.Vector2(x, y));
                pixelRenderer[y].push(this.raytracer.sampleIterator(sdf, p));
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

Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __webpack_require__(/*! ./lib */ "./src/lib.ts");
const render_1 = __webpack_require__(/*! ./render */ "./src/render.ts");
onmessage = (e) => {
    console.log("receive");
    let renderCmd = e.data;
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
        const renderer = new render_1.Renderer(renderCmd.options);
        let buffer = new Uint8ClampedArray(renderCmd.options.viewport.size.x * renderCmd.options.viewport.size.y * 4);
        if (renderCmd.renderType == "preview") {
            renderer.renderSDF(sdf, buffer);
            report({
                progress: 1,
                buffer: buffer
            });
        }
        else if (renderCmd.renderType == "raytrace") {
            let N = 0;
            for (const result of renderer.renderRaytraceIterator(sdf, buffer)) {
                report({
                    progress: result.progress,
                    buffer: new Uint8ClampedArray(result.buffer.buffer)
                });
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
        for (const c of sampleFunction(sdf, p)) {
            color = lib_1.plus(color, c);
        }
        const distance = sdf(p.x, p.y)[0];
        if (0 <= distance && distance <= antiAliasThreshold) {
            let grad = new lib_1.Vector2(lib_1.gradient(sdf, p.x, p.y, 0.1));
            let pN = lib_1.minus(p, lib_1.scale(grad.normalized, antiAliasThreshold));
            let antiAliasColor = lib_1.vec4(0, 0, 0, 0);
            for (const c of sampleFunction(sdf, pN)) {
                antiAliasColor = lib_1.plus(color, c);
            }
            return lib_1.Color.blend(lib_1.mapColor(antiAliasColor, 1 / N), lib_1.mapColor(color, 1 / N), distance / antiAliasThreshold);
        }
        return lib_1.mapColor(color, 1 / N);
    }
    *sampleIterator(sdf, p) {
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
            antiAliasIterator = sampleFunction(sdf, pN);
        }
        for (const c of sampleFunction(sdf, p)) {
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
    *uniformSample(sdf, p) {
        let color = lib_1.vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++) {
            let rad = Math.PI * 2 * Math.random();
            yield this.trace(sdf, p, lib_1.vec2(Math.cos(rad), Math.sin(rad)));
        }
        return color;
    }
    *stratifiedSample(sdf, p) {
        let color = lib_1.vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++) {
            let rad = Math.PI * 2 * i / this.options.raytrace.subDivide;
            yield this.trace(sdf, p, lib_1.vec2(Math.cos(rad), Math.sin(rad)));
        }
        return color;
    }
    *jitteredSample(sdf, p) {
        let color = lib_1.vec4(0, 0, 0, 1);
        const offset = Math.floor(this.options.raytrace.subDivide * Math.random());
        for (let i = 0; i < this.options.raytrace.subDivide; i++) {
            let rad = Math.PI * 2 * ((i + offset) % this.options.raytrace.subDivide + Math.random()) / this.options.raytrace.subDivide;
            yield this.trace(sdf, p, lib_1.vec2(Math.cos(rad), Math.sin(rad)));
            //color = <Vector4>plus(this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad))), color);
        }
    }
}
exports.RayTracer2D = RayTracer2D;


/***/ })

/******/ });
//# sourceMappingURL=renderWorker.js.map