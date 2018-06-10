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
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static plus(u, v) {
        return new Vector2(u.x + v.x, u.y + v.y);
    }
    static minus(u, v) {
        return new Vector2(u.x - v.x, u.y - v.y);
    }
    static scale(v, k) {
        return new Vector2(v.x * k, v.y * k);
    }
    static dot(u, v) {
        return u.x * v.x + u.y * v.y;
    }
    static cross(u, v) {
        return u.x * v.y - u.y * v.x;
    }
}
function vec2(x, y) {
    return new Vector2(x, y);
}
const plus = Vector2.scale;
const minus = Vector2.minus;
const scale = Vector2.scale;
const dot = Vector2.dot;
const cross = Vector2.cross;
export { Color, max, min, sqrt, abs, length, clamp, smin, vec2, Vector2, plus, minus, scale, dot, cross, };
//# sourceMappingURL=lib.js.map