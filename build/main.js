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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/*! exports provided: Color, max, min, sqrt, abs, length, clamp, smin, vec2, Vector2, Matrix3x3, plus, minus, scale, dot, cross, Vector4, vec4, Range, Material, mapColor, gradient */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix3x3", function() { return Matrix3x3; });
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
class Matrix3x3 {
    constructor(mat = null) {
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
    multipleMatrix(m) {
        let mat = Matrix3x3.multipleMatrix(this, m);
        this[0] = mat[0].copyWithin(0, 0);
        this[1] = mat[1].copyWithin(0, 0);
        this[2] = mat[2].copyWithin(0, 0);
        return this;
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

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: render, RenderingCallback, customRender, mapColor, visibleRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingCallback", function() { return RenderingCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customRender", function() { return customRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibleRender", function() { return visibleRender; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapColor", function() { return _lib__WEBPACK_IMPORTED_MODULE_0__["mapColor"]; });

/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ "./src/transform.ts");
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shape */ "./src/shape.ts");
/* harmony import */ var _trace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trace */ "./src/trace.ts");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render */ "./src/render.ts");





/*type SDFResult = [number, Color];
type SDF = (x: number, y: number) => SDFResult;*/
const $ = (selector) => document.querySelector(selector);
let renderingSDF = (x, y) => NaN;
let width, height;
window.wkr = new Worker("./build/renderWorker.js");
wkr.onmessage = (e) => {
	console.log(e);
};
function main(t)
{
	const SubDivide = 64;

	let c = Object(_shape__WEBPACK_IMPORTED_MODULE_2__["circle"])(50, new _lib__WEBPACK_IMPORTED_MODULE_0__["Material"]( new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](255, 255, 252, 1.0)));
	let c2 = Object(_transform__WEBPACK_IMPORTED_MODULE_1__["translate"])(Object(_shape__WEBPACK_IMPORTED_MODULE_2__["circle"])(50, new _lib__WEBPACK_IMPORTED_MODULE_0__["Material"](new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](0, 255, 255, 1.0))), 50, 0);
	let c3 = Object(_transform__WEBPACK_IMPORTED_MODULE_1__["translate"])(Object(_shape__WEBPACK_IMPORTED_MODULE_2__["circle"])(10, new _lib__WEBPACK_IMPORTED_MODULE_0__["Material"](new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](255, 255, 0, 1))), 70, 0);
	let rec = Object(_transform__WEBPACK_IMPORTED_MODULE_1__["translate"])(Object(_shape__WEBPACK_IMPORTED_MODULE_2__["rect"])(50, 50, new _lib__WEBPACK_IMPORTED_MODULE_0__["Material"](new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](255, 0, 0, 1.0))), -0, -200);
	let graph =
		Object(_transform__WEBPACK_IMPORTED_MODULE_1__["union"])(
			Object(_transform__WEBPACK_IMPORTED_MODULE_1__["union"])(
				Object(_transform__WEBPACK_IMPORTED_MODULE_1__["subtract"])(c, c2),
				rec),
			c3);
	let g = Object(_transform__WEBPACK_IMPORTED_MODULE_1__["union"])(
		c,
		Object(_transform__WEBPACK_IMPORTED_MODULE_1__["translate"])(Object(_shape__WEBPACK_IMPORTED_MODULE_2__["circle"])(50, new _lib__WEBPACK_IMPORTED_MODULE_0__["Material"](new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](255, 0, 0, 1.0))), 50, 0)
	);
	console.log(graph.toString());
	renderingSDF = graph;
	let renderOption = new _render__WEBPACK_IMPORTED_MODULE_4__["RenderOption"]();
	renderOption.environmentOptions.backgroundColor = new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](255, 128, 180, 1.0);
	Object(_render__WEBPACK_IMPORTED_MODULE_4__["renderSDF"])(graph, renderOption, $("#canvas"));
	Object(_render__WEBPACK_IMPORTED_MODULE_4__["renderRaytrace"])(graph, renderOption, $("#canvas"));
	return;
	visibleRender((x, y) =>
	{
		/*let [dx, dy] = gradient(graph,x,y,0.1);
		return new Color(127 + dx * 128, 127 + dy * 128, 0, 1);*/
		/*let color = jitteredSample(graph, vec2(x, y), 0.1, SubDivide);
		return mapColor(color, 1 / SubDivide);*/
		return Object(_trace__WEBPACK_IMPORTED_MODULE_3__["sample"])(graph, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["vec2"])(x, y), _trace__WEBPACK_IMPORTED_MODULE_3__["jitteredSample"], 0.1, SubDivide);
	});
}
/**
 * 
 * @param {RenderingCallback} callback 
 */
function customRender(callback) {
	const canvas = $("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, width, height);
	let imgData = ctx.getImageData(0, 0, width, height);

	for (let y = -height / 2; y < height / 2; y++) {
		for (let x = -width / 2; x < width / 2; x++) {
			let color = callback(x, y);
			drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
		}
	}
	ctx.putImageData(imgData, 0, 0);
}

function visibleRender(callback) {
	console.log(new Date());
	const canvas = $("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, width, height);
	let imgData = ctx.getImageData(0, 0, width, height);

	let y = -height / 2;

	function update() {
		for (let x = -width / 2; x < width / 2; x++) {
			let color = callback(x, y);
			drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
		}
		ctx.putImageData(imgData, 0, 0);
		y++;
		if (y < height / 2)
			requestAnimationFrame(update);
		else
		{
			console.log(new Date());
		}
	}
	update();
}
/**
 * 
 * @param {SDF} sdf 
 * @param {Color} fColor 
 * @param {Color} bgColor 
 * @param {Number} [threshold] 
 */
function render(sdf, fColor, bgColor, threshold = 1) {
	//renderingSDF = sdf;
	const canvas = $("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, width, height);
	let imgData = ctx.getImageData(0, 0, width, height);

	for (let y = -height / 2; y < height / 2; y++) {
		for (let x = -width / 2; x < width / 2; x++) {
			let d = sdf(x, y);
			let color = bgColor;
			if (d <= 0)
				color = fColor;
			else if (d < threshold) {
				var t = d / threshold;
				color = _lib__WEBPACK_IMPORTED_MODULE_0__["Color"].blend(bgColor, fColor, 1 - t);
			}

			drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
		}
	}
	ctx.putImageData(imgData, 0, 0);
}
/**
 * 
 * @param {ImageData} imgData 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Color} color 
 */
function drawPixel(imgData, x, y, width, height, color) {
	//alert(x);
	let idx = (y * width + x) * 4;
	imgData.data[idx] = color.red;
	imgData.data[idx + 1] = color.green;
	imgData.data[idx + 2] = color.blue;
	imgData.data[idx + 3] = Math.floor(color.alpha * 255);
}



let lastFrame = 0;

function update(delay) {
	requestAnimationFrame(update);
	const dt = delay - lastFrame;
	const fps = Math.floor(1000 / dt);
	$("#fps").innerText = fps;
	lastFrame = delay;
	main(delay / 1000);
}

function init() {
	width = window.innerWidth;
	height = window.innerHeight;
	$("#canvas").width = width;
	$("#canvas").height = height;
	window.onmousemove = (e) => {
		let x = Math.floor(e.clientX - width / 2);
		let y = Math.floor(-(e.clientY - height / 2));
		$("#mouse-pos").innerText = `(${x}, ${y})`;
		$("#sdf-value").innerText = renderingSDF(x, y)["0"];
	}
	Object(_trace__WEBPACK_IMPORTED_MODULE_3__["setBound"])(new _lib__WEBPACK_IMPORTED_MODULE_0__["Range"](-width / 2, width / 2), new _lib__WEBPACK_IMPORTED_MODULE_0__["Range"](-height / 2, height / 2));
}
window.onload = () => {
	try {
		init();
		main();
		//requestAnimationFrame(update);
	} catch (ex) {
		console.error(ex.stack);
		//alert(ex.message);
	}
};

	
/**
 * @typedef {function(number,number)=>Color} RenderingCallback
 */

	

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
        this.viewerOptions = new ViewerOptions();
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
class ViewerOptions {
    constructor() {
        this.transform = new _lib__WEBPACK_IMPORTED_MODULE_0__["Matrix3x3"]();
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

/***/ "./src/shape.ts":
/*!**********************!*\
  !*** ./src/shape.ts ***!
  \**********************/
/*! exports provided: circle, rect, torus, belt, capsule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circle", function() { return circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rect", function() { return rect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "torus", function() { return torus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "belt", function() { return belt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capsule", function() { return capsule; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");

/**
 *
 * @param {Number} r - radius
 * @param {Material} material - The material
 * @returns {SDF}
 */
function circle(r, material) {
    return (x, y) => [Object(_lib__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + y * y) - r, material];
}
/**
 *
 * @param {Number} w - Width of rectangle
 * @param {Number} h - Height of rectangle
 * @param {Material} material - The material
 * @returns {SDF}
 */
function rect(w, h, material) {
    return (x, y) => {
        const dx = Math.abs(x) - w / 2;
        const dy = Math.abs(y) - h / 2;
        return [Object(_lib__WEBPACK_IMPORTED_MODULE_0__["min"])(Object(_lib__WEBPACK_IMPORTED_MODULE_0__["max"])(dx, dy), 0) + Object(_lib__WEBPACK_IMPORTED_MODULE_0__["length"])(Object(_lib__WEBPACK_IMPORTED_MODULE_0__["max"])(dx, 0), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["max"])(dy, 0)), material];
    };
}
/**
 *
 * @param {Number} rOuter - Outer radius
 * @param {Number} rInner - Inner radius
 * @param {Material} material - The material
 * @returns {SDF}
 */
function torus(rOuter, rInner, material) {
    const mid = (rOuter + rInner) / 2;
    const wide = (rOuter - rInner) / 2;
    return (x, y) => {
        const l = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["length"])(x, y);
        return [Object(_lib__WEBPACK_IMPORTED_MODULE_0__["abs"])(l - mid) - wide, material];
    };
}
/**
 *
 * @param {Number} wide - Width of the belt
 * @param {Material} material - The material
 * @returns {SDF}
 */
function belt(wide, material) {
    return (x, y) => [y - wide / 2, material];
}
/**
 *
 * @param {Number} l - Length between two center of semi-circle
 * @param {Number} radius - The radius of the semi-circle at end
 * @param {Material} material - The material
 * @returns {SDF}
 */
function capsule(l, radius, material) {
    const half = l / 2;
    return (x, y) => {
        const dx = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["abs"])(x) - half;
        return [Object(_lib__WEBPACK_IMPORTED_MODULE_0__["length"])(Object(_lib__WEBPACK_IMPORTED_MODULE_0__["clamp"])(dx, 0, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["abs"])(dx)), y) - radius, material];
    };
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



/***/ }),

/***/ "./src/transform.ts":
/*!**************************!*\
  !*** ./src/transform.ts ***!
  \**************************/
/*! exports provided: translate, union, scale, rotate, expand, subtract, displace, blend, wrapSDF, intersect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "union", function() { return union; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expand", function() { return expand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displace", function() { return displace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blend", function() { return blend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSDF", function() { return wrapSDF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersect", function() { return intersect; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");


/**
 *
 * @param {SDF} sdf
 * @param {Number} dx
 * @param {SDF} dy
 * @returns {SDF}
 */
function translate(sdf, dx, dy) {
    return (x, y) => sdf(x - dx, y - dy);
}
/**
 *
 * @param {SDF} sdf
 * @param {Number} kx
 * @param {Number} [ky]
 * @returns {SDF}
 */
function scale(sdf, kx, ky) {
    kx = kx === undefined ? 1 : kx;
    ky = ky === undefined ? kx : ky;
    return (x, y) => sdf(x / kx, y / ky);
}
/**
 *
 * @param {SDF} sdf
 * @param {Number} rad
 * @returns {SDF}
 */
function rotate(sdf, rad) {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return (x, y) => sdf(x * cos - y * sin, x * sin + y * cos);
}
/**
 *
 * @param {SDF} sdf1
 * @param {SDF} sdf2
 * @returns {SDF}
 */
function union(sdf1, sdf2) {
    return (x, y) => {
        let [d1, c1] = sdf1(x, y);
        let [d2, c2] = sdf2(x, y);
        if (d1 < d2)
            return [d1, c1];
        else
            return [d2, c2];
    };
}
/**
 *
 * @param {SDF} sdf1
 * @param {SDF} sdf2
 * @returns {SDF}
 */
function subtract(sdf1, sdf2) {
    return (x, y) => {
        let [d1, c1] = sdf1(x, y);
        let [d2, c2] = sdf2(x, y);
        d2 = -d2;
        if (d1 > d2)
            return [d1, c1];
        else
            return [d2, c1];
    };
}
/**
 *
 * @param {SDF} sdf1
 * @param {SDF} sdf2
 * @returns {SDF}
 */
function intersect(sdf1, sdf2) {
    return (x, y) => {
        let [d1, c1] = sdf1(x, y);
        let [d2, c2] = sdf2(x, y);
        if (d1 > d2)
            return [d1, c1];
        else
            return [d2, c2];
    };
}
/**
 *
 * @param {SDF} sdf
 * @param {Number} radius
 * @returns {SDF}
 */
function expand(sdf, radius) {
    return (x, y) => {
        let [d, c] = sdf(x, y);
        return [d - radius, c];
    };
}
/*
function repeat(sdf:SDF, dx, dy = dx, ox = 0, oy = 0)
{
    return (x, y) => sdf(x % dx + ox, y % dy + oy);
}*/
/**
 *
 * @param {SDF} sdf1
 * @param {SDF} sdf2
 * @returns {SDF}
 */
function displace(sdf1, sdf2) {
    const m = sdf1(0, 0)["1"];
    return (x, y) => [sdf1(x, y)["0"] + sdf2(x, y)["0"], m];
}
/**
 *
 * @param {SDF} sdf1
 * @param {SDF} sdf2
 * @param {Number} k
 * @returns {SDF}
 */
function blend(sdf1, sdf2, k) {
    const material1 = sdf1(0, 0)["1"];
    const material2 = sdf2(0, 0)["1"];
    const material = new _lib__WEBPACK_IMPORTED_MODULE_0__["Material"]();
    material.emission = new _lib__WEBPACK_IMPORTED_MODULE_0__["Color"](Object(_lib__WEBPACK_IMPORTED_MODULE_0__["smin"])(material1.emission.red, material2.emission.red, k), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["smin"])(material1.emission.green, material2.emission.green, k), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["smin"])(material1.emission.blue, material2.emission.blue, k), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["smin"])(material1.emission.alpha, material2.emission.alpha, k));
    return (x, y) => [Object(_lib__WEBPACK_IMPORTED_MODULE_0__["smin"])(sdf1(x, y)["0"], sdf2(x, y)["0"], k), material];
}
/**
 *
 * @param sdf - The SDF function
 * @param material - The material to add to this object
 */
function wrapSDF(sdf, material) {
    return (x, y) => [sdf(x, y)["0"], material];
}



/***/ })

/******/ });
//# sourceMappingURL=main.js.map