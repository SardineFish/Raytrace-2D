define("lib", ["require", "exports"], function (require, exports) {
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
            let l = Math.hypot.call(this, this);
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
        inRange(n) {
            return this.from < n && n < this.to;
        }
        inRangeInclude(n) {
            return this.from <= n && n <= this.to;
        }
    }
    exports.Range = Range;
});
define("transform", ["require", "exports", "lib", "lib"], function (require, exports, lib_1, lib_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.translate = translate;
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
    exports.scale = scale;
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
    exports.rotate = rotate;
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
    exports.union = union;
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
                return [d2, c2];
        };
    }
    exports.subtract = subtract;
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
    exports.expand = expand;
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
        const color1 = sdf1(0, 0)["1"];
        const color2 = sdf2(0, 0)["1"];
        const color = lib_2.Color.add(color1, color2);
        return (x, y) => [sdf1(x, y)["0"] + sdf2(x, y)["0"], color];
    }
    exports.displace = displace;
    /**
     *
     * @param {SDF} sdf1
     * @param {SDF} sdf2
     * @param {Number} k
     * @returns {SDF}
     */
    function blend(sdf1, sdf2, k) {
        const color1 = sdf1(0, 0)["1"];
        const color2 = sdf2(0, 0)["1"];
        const color = new lib_2.Color(lib_1.smin(color1.red, color2.red, k), lib_1.smin(color1.green, color2.green, k), lib_1.smin(color1.blue, color2.blue, k), lib_1.smin(color1.alpha, color2.alpha, k));
        return (x, y) => [lib_1.smin(sdf1(x, y)["0"], sdf2(x, y)["0"], k), color];
    }
    exports.blend = blend;
    function colorSDF(sdf, color) {
        return (x, y) => [sdf(x, y)["0"], color];
    }
    exports.colorSDF = colorSDF;
});
define("shape", ["require", "exports", "lib"], function (require, exports, lib_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *
     * @param {Number} r - radius
     * @param {Color} color - The color
     * @returns {SDF}
     */
    function circle(r, color) {
        return (x, y) => [lib_js_1.sqrt(x * x + y * y) - r, color];
    }
    exports.circle = circle;
    /**
     *
     * @param {Number} w - Width of rectangle
     * @param {Number} h - Height of rectangle
     * @param {Color} color - The color
     * @returns {SDF}
     */
    function rect(w, h, color) {
        return (x, y) => {
            const dx = Math.abs(x) - w / 2;
            const dy = Math.abs(y) - h / 2;
            return [lib_js_1.min(lib_js_1.max(dx, dy), 0) + lib_js_1.length(lib_js_1.max(dx, 0), lib_js_1.max(dy, 0)), color];
        };
    }
    exports.rect = rect;
    /**
     *
     * @param {Number} rOuter - Outer radius
     * @param {Number} rInner - Inner radius
     * @param {Color} color - The color
     * @returns {SDF}
     */
    function torus(rOuter, rInner, color) {
        const mid = (rOuter + rInner) / 2;
        const wide = (rOuter - rInner) / 2;
        return (x, y) => {
            const l = lib_js_1.length(x, y);
            return [lib_js_1.abs(l - mid) - wide, color];
        };
    }
    exports.torus = torus;
    /**
     *
     * @param {Number} wide - Width of the belt
     * @param {Color} color - The color
     * @returns {SDF}
     */
    function belt(wide, color) {
        return (x, y) => [y - wide / 2, color];
    }
    exports.belt = belt;
    /**
     *
     * @param {Number} l - Length between two center of semi-circle
     * @param {Number} radius - The radius of the semi-circle at end
     * @param {Color} color - The color
     * @returns {SDF}
     */
    function capsule(l, radius, color) {
        const half = l / 2;
        return (x, y) => {
            const dx = lib_js_1.abs(x) - half;
            return [lib_js_1.length(lib_js_1.clamp(dx, 0, lib_js_1.abs(dx)), y) - radius, color];
        };
    }
    exports.capsule = capsule;
});
define("script", ["require", "exports", "lib", "shape"], function (require, exports, lib_js_2, shape_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*type SDFResult = [number, Color];
    type SDF = (x: number, y: number) => SDFResult;*/
    const $ = (selector) => document.querySelector(selector);
    let renderingSDF = (x, y) => NaN;
    let width, height;
    function main(t) {
        let c = shape_js_1.circle(50, new lib_js_2.Color(255, 255, 252, 1.0));
    }
    /**
     *
     * @param {SDF} sdf
     * @param {Color} fColor
     * @param {Color} bgColor
     * @param {Number} [threshold]
     */
    function render(sdf, fColor, bgColor, threshold = 1) {
        renderingSDF = sdf;
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
                    color = lib_js_2.Color.blend(bgColor, fColor, 1 - t);
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
            $("#sdf-value").innerText = renderingSDF(x, y);
        };
    }
    window.onload = () => {
        try {
            init();
            //main();
            requestAnimationFrame(update);
        }
        catch (ex) {
            console.error(ex.stack);
            //alert(ex.message);
        }
    };
});
define("trace", ["require", "exports", "lib"], function (require, exports, lib_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let BoundX = new lib_js_3.Range(-500, 500);
    let BoundY = new lib_js_3.Range(-500, 500);
    function trace(sdf, p, dir, precision) {
        let distance = 0;
        let color;
        dir = dir.normalized;
        do {
            p = lib_js_3.plus(p, lib_js_3.scale(dir, distance));
            [distance, color] = sdf(p.x, p.y);
            if (!BoundX.inRange(p.x) || !BoundY.inRange(p.y))
                return lib_js_3.vec4(0, 0, 0, 1);
        } while (distance > precision);
        return lib_js_3.vec4(color.red / 255, color.green / 255, color.blue / 255, color.alpha);
    }
    exports.trace = trace;
    function sample(sdf, p, precision, n) {
        let color = lib_js_3.vec4(0, 0, 0, 1);
        for (let i = 0; i < n; i++) {
            let rad = Math.PI * 2 * Math.random();
            color = lib_js_3.plus(trace(sdf, p, lib_js_3.vec2(Math.cos(rad), Math.sin(rad)), precision), color);
        }
        return color;
    }
    exports.sample = sample;
    function setBound(boundX, boundY) {
        BoundX = boundX;
        BoundY = boundY;
    }
    exports.setBound = setBound;
});
//# sourceMappingURL=main.js.map