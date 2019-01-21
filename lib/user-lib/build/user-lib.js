"use strict";
//------------ shape.ts
/**
 *
 * @param {Number} r - radius
 * @returns {SDF}
 */
function circle(r) {
    //return (x, y) => [sqrt(x * x + y * y) - r, material];
    return (x, y) => [sqrt(x * x + y * y) - r, Material.default];
}
/**
 *
 * @param {Number} w - Width of rectangle
 * @param {Number} h - Height of rectangle
 * @returns {SDF}
 */
function rect(w, h) {
    return (x, y) => {
        const dx = Math.abs(x) - w / 2;
        const dy = Math.abs(y) - h / 2;
        return [min(max(dx, dy), 0) + length(max(dx, 0), max(dy, 0)), Material.default];
    };
}
/**
 *
 * @param {Number} rOuter - Outer radius
 * @param {Number} rInner - Inner radius
 * @returns {SDF}
 */
function torus(rOuter, rInner) {
    const mid = (rOuter + rInner) / 2;
    const wide = (rOuter - rInner) / 2;
    return (x, y) => {
        const l = length(x, y);
        return [abs(l - mid) - wide, Material.default];
    };
}
/**
 *
 * @param {Number} wide - Width of the belt
 * @returns {SDF}
 */
function belt(wide, material) {
    return (x, y) => [y - wide / 2, material];
}
/**
 *
 * @param {Number} l - Length between two center of semi-circle
 * @param {Number} radius - The radius of the semi-circle at end
 * @returns {SDF}
 */
function capsule(l, radius) {
    const half = l / 2;
    return (x, y) => {
        const dx = abs(x) - half;
        return [length(clamp(dx, 0, abs(dx)), y) - radius, Material.default];
    };
}
//--------- transform.ts
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
function scale(sdf, kx = 1, ky = kx) {
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
    const material1 = sdf1(0, 0)[1];
    const material2 = sdf2(0, 0)[1];
    const material = new Material();
    material.emission = new Color(smin(material1.emission.red, material2.emission.red, k), smin(material1.emission.green, material2.emission.green, k), smin(material1.emission.blue, material2.emission.blue, k), smin(material1.emission.alpha, material2.emission.alpha, k));
    return (x, y) => {
        const [d1, m1] = sdf1(x, y);
        const [d2, m2] = sdf2(x, y);
        return [smin(d1, d2, k), Material.blend(m1, m2, mix(d1, d2, k))];
        //return [smin(d1, d2, k), new Material(mapColor(smin(m1.emission.toVector4(), m2.emission.toVector4(), k), 1))];
    };
}
function material(sdf, material) {
    if (material instanceof Color)
        material = new Material(material);
    const resultTest = sdf(Math.random(), Math.random());
    if (typeof (resultTest) === "number")
        return (x, y) => [sdf(x, y), material];
    return (x, y) => [sdf(x, y)[0], material];
}
//--------- lib.ts
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
        return new Color(0, 0, 0, 1);
    }
    toString() {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
    }
    toVector4() {
        return new Vector4(this.red / 255, this.green / 255, this.blue / 255, this.alpha);
    }
}
const rgba = (r, g, b, a) => new Color(r, g, b, a);
const rgb = (r, g, b) => new Color(r, g, b, 1);
const max = Math.max;
const min = Math.min;
const sqrt = Math.sqrt;
const abs = Math.abs;
const length = (x, y) => sqrt(x * x + y * y);
const clamp = (n, min, max) => n > max ? max : n < min ? min : n;
const interpolate = (a, b, t) => a + (b - a) * t;
function smin(a, b, k) {
    if (typeof (a) === "number" && typeof (b) === "number") {
        const h = Math.max(k - Math.abs(a - b), 0) / k;
        return Math.min(a, b) - h * h * k * 0.25;
    }
    else {
        a = a;
        b = b;
        return new Vector4(smin(a[0], b[0], k), smin(a[1], b[1], k), smin(a[2], b[2], k), smin(a[3], b[3], k));
    }
}
function mix(a, b, k) {
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return 1 - ((h * h - 1) * Math.sign(a - b) * 0.5 + 0.5);
}
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
function multi(u, k) {
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
class Rect {
    constructor(size, offset = new Vector2(0, 0)) {
        this.size = size;
        this.offset = offset;
    }
    inRect(p) {
        let dp = multi(minus(p, this.offset), 2);
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
class Material {
    constructor(options = new Color(0, 0, 0, 1.0)) {
        this.diffuseColor = new Color(0, 0, 0, 1.0);
        this.reflectivity = 0;
        this.refractivity = 0;
        this.emission = new Color(0, 0, 0, 1.0);
        if (options instanceof Color)
            this.emission = options;
        else {
            this.emission = options.emission || this.emission;
            this.diffuseColor = options.diffuse || this.diffuseColor;
            this.reflectivity = options.reflect || this.reflectivity;
            this.refractivity = options.refrect || this.refractivity;
        }
    }
    static blend(m1, m2, k) {
        return new Material({
            emission: Color.blend(m1.emission, m2.emission, k),
            diffuse: Color.blend(m1.diffuseColor, m2.diffuseColor, k),
            reflect: interpolate(m1.reflectivity, m2.reflectivity, k),
            refrect: interpolate(m1.refractivity, m2.refractivity, k)
        });
    }
}
Material.default = new Material(new Color(255, 255, 255, 1));
function mapColor(v, k) {
    return new Color(v.x * k * 255, v.y * k * 255, v.z * k * 255, 1.0);
}
function gradient(sdf, x, y, delta) {
    return [
        (sdf(x + delta, y)[0] - sdf(x - delta, y)[0]) / (2 * delta),
        (sdf(x, y + delta)[0] - sdf(x, y - delta)[0]) / (2 * delta)
    ];
}
