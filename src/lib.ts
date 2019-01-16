type SDFResult = [number, Material];
export type SDF = (x: number, y: number) => SDFResult;

class Color
{
    red: number = 255;
    green: number = 255;
    blue: number = 255;
    alpha: number = 1.0;
    constructor(r: number, g: number, b: number, a: number = 1.0)
    {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }

    get hue(): number
    {
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
    get saturation(): number
    {
        const max = Math.max(this.red, this.green, this.blue) / 255;
        const min = Math.min(this.red, this.blue, this.green) / 255;
        if (max === 0)
            return 0
        else if (min == 1)
            return 0;
        return (max - min) / (1 - Math.abs(max + min - 1));
    }
    get lightness(): number
    {
        const max = Math.max(this.red, this.green, this.blue) / 255;
        const min = Math.min(this.red, this.blue, this.green) / 255;
        return (max + min) / 2;
    }

    set hue(value: number)
    {
        this.setHSL(value, this.saturation, this.lightness);
    }
    set saturation(value: number)
    {
        this.setHSL(this.hue, value, this.lightness);
    }
    set lightness(value: number)
    {
        this.setHSL(this.hue, this.saturation, value);
    }

    static add(a: Color, b: Color)
    {
        const t = b.alpha;
        return new Color(
            (1 - t) * a.red + t * b.red,
            (1 - t) * a.green + t * b.green,
            (1 - t) * a.blue + t * b.blue,
            1 - (1 - a.alpha) * (1 - b.alpha)
        );
    }

    static blend(a: Color, b: Color, t: number)
    {
        return new Color(
            (1 - t) * a.red + t * b.red,
            (1 - t) * a.green + t * b.green,
            (1 - t) * a.blue + t * b.blue,
            1
        );
    }

    static fromHSL(h: number, s: number, l: number, alpha: number = 1)
    {
        return new Color(0, 0, 0, alpha).setHSL(h, s, l);
    }

    static from(color: Color)
    {
        return new Color(color.red, color.green, color.blue, color.alpha);
    }

    setHSL(h: number, s: number, l: number)
    {
        h = h < 0 ? h + 360 : h;
        const chroma = (1 - Math.abs(2 * l - 1)) * s;
        if (isNaN(h))
        {
            this.red = this.green = this.blue = 0;
            return this;
        }
        h = h / 60;
        const x = chroma * (1 - Math.abs(h % 2 - 1));
        let color = [0, 0, 0];
        if (0 <= h && h <= 1)
            color = [chroma, x, 0];
        else if (h <= 2)
            color = [x, chroma, 0]
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

    static fromString(str: string, alpha: number = 1): Color
    {
        str = str.replace(new RegExp(/\s/g), "");

        var reg = new RegExp("#[0-9a-fA-F]{6}");
        if (reg.test(str))
        {
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
        if (reg.test(str))
        {
            var colorArray = str.replace("rgb(", "").replace(")", "").split(",");
            var r = parseInt(colorArray[0]);
            var g = parseInt(colorArray[1]);
            var b = parseInt(colorArray[2]);
            var a = 1.00;
            return new Color(r, g, b, a);
        }
        reg = new RegExp("rgba\\(([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1}),([0-9]+(\\.[0-9]+){0,1})\\)");
        if (reg.test(str))
        {
            var colorArray = str.replace("rgba(", "").replace(")", "").split(",");
            var r = parseInt(colorArray[0]);
            var g = parseInt(colorArray[1]);
            var b = parseInt(colorArray[2]);
            var a = parseFloat(colorArray[3]);
            return new Color(r, g, b, a);
        }
    }

    toString()
    {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
    }
    toVector4(): Vector4
    {
        return new Vector4(this.red / 255, this.green / 255, this.blue / 255, this.alpha);
    }
}
const max = Math.max;
const min = Math.min;
const sqrt = Math.sqrt;
const abs = Math.abs;
const length = (x:number, y:number): number => sqrt(x * x + y * y);
const clamp = (n: number, min: number, max: number): number => n > max ? max : n < min ? min : n;
const interpolate = (a: number, b: number, t: number) => a + (b - a) * t;
function smin(a: number, b: number, k: number): number
function smin(u: Vector4, v: Vector4, k: number): Vector4
function smin(a: number | Vector4, b: number | Vector4, k: number): number | Vector4
{
    if (typeof (a) === "number" && typeof (b) === "number")
    {
        const h = Math.max(k - Math.abs(a - b), 0) / k;
        return Math.min(a, b) - h * h * k * 0.25;
    }
    else 
    {
        a = a as Vector4;
        b = b as Vector4;
        return new Vector4(
            smin(a[0], b[0], k),
            smin(a[1], b[1], k),
            smin(a[2], b[2], k),
            smin(a[3], b[3], k)
        );
    }
}
export function mix(a: number, b: number, k: number)
{
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return 1 - ((h * h - 1) * Math.sign(a - b) * 0.5 + 0.5);
}


class Vector2 extends Array<number>
{
    constructor(x: number|number[], y: number=0)
    {
        super(4);
        if (x instanceof Array)
        {
            this[0] = x[0];
            this[1] = x[1];
        }
        else
        {
            this[0] = x;
            this[1] = y;
        }
    }
    get x(): number
    {
        return this[0];
    }
    set x(value)
    {
        this[0] = value;
    }
    get y(): number
    {
        return this[1];
    }
    set y(value)
    {
        this[1] = value;
    }
    get normalized()
    {
        let l = Math.hypot(this.x, this.y);
        return new Vector2(this.x / l, this.y / l);
    }
    get magnitude()
    {
        return Math.hypot(this[0], this[1]);
    }
}

class Vector4 extends Array<number>
{
    constructor(x: number | number[], y: number = 0, z: number = 0, w: number = 0)
    {
        super(4);
        if (x instanceof Array)
        {
            this[0] = x[0];
            this[1] = x[1];
            this[2] = x[2];
            this[3] = x[3];
        }
        else
        {
            this[0] = x;
            this[1] = y;
            this[2] = z;
            this[3] = w;
        }
    }
    get x():number
    {
        return this[0];
    }
    set x(value)
    {
        this[0] = value;
    }
    get y(): number
    {
        return this[1];
    }
    set y(value)
    {
        this[1] = value;
    }
    get z(): number
    {
        return this[2];
    }
    set z(value)
    {
        this[2] = value;
    }
    get w(): number
    {
        return this[3];
    }
    set w(value)
    {
        this[3] = value;
    }
    
    static scale(u: Vector4, k: number):Vector4
    {
        return new Vector4(u.map(n => n * k));
    }
}



function vec2(x: number, y: number): Vector2
{
    return new Vector2(x, y);
}
function vec4(x: number, y: number, z: number, w: number): Vector4
{
    return new Vector4(x, y, z, w);
}

function plus(u: Vector2, v: Vector2): Vector2
function plus(u:Vector4,v:Vector4):Vector4
function plus(u: Vector4 | Vector2, v: Vector4 | Vector2): Vector4 | Vector2
{
    if (u instanceof Vector2)
    {
        return new Vector2(u.x + v.x, u.y + v.y);
    }
    else if (v instanceof Vector4)
    {
        return new Vector4([u.x + v.x, u.y + v.y, u.z + v.z, u.w + v.w]);
    }
    return new Vector4(u.map((n, i) => n + v[i]));
}
function minus(u: Vector2, v: Vector2): Vector2
function minus(u: Vector4, v: Vector4): Vector4
function minus(u: Vector4 | Vector2, v: Vector4 | Vector2): Vector4 | Vector2
{
    if (u instanceof Vector2)
    {
        return new Vector2(u.x - v.x, u.y - v.y);
    }
    else if (v instanceof Vector4)
    {
        return new Vector4([u.x - v.x, u.y - v.y, u.z - v.z, u.w - v.w]);
    }
    return new Vector4(u.map((n, i) => n - v[i]));
}
function scale(u: Vector2, k: number): Vector2
function scale(u: Vector4, k: number): Vector4
function scale(u: Vector4 | Vector2, k: number): Vector4 | Vector2
{
    if (u instanceof Vector2)
    {
        return new Vector2(u.x *k, u.y *k);
    }
    else
    {
        return new Vector4([u.x * k, u.y * k, u.z * k, u.w * k]);
    }
}
function dot(u: Vector4 | Vector2, v: Vector4 | Vector2): number
{
    if (u instanceof Vector2)
    {
        return u.x * v.x + u.y * v.y;
    }
    else
    {
        return u[0] * v[0] +
            u[1] * v[1] +
            u[2] * v[2] +
            u[3] * v[3];
    }
}
function cross(u: Vector2, v: Vector2): number
{
    return u.x * v.y - u.y * v.x;
}
class Range extends Vector2
{
    get from()
    {
        return this[0];
    }
    set from(value)
    {
        this[0] = value;
    }

    get to()
    {
        return this[1];
    }
    set to(value)
    {
        this[1] = value;
    }

    get size()
    {
        console.log(this[1] - this[0]);
        return this[1] - this[0];
    }
    inRange(n: number): boolean
    {
        return this.from < n && n < this.to;
    }

    inRangeInclude(n: number): boolean
    {
        return this.from <= n && n <= this.to;
    }
}

export class Rect
{
    offset: Vector2;
    size: Vector2;
    constructor(size: Vector2, offset: Vector2 = new Vector2(0, 0))
    {
        this.size = size;
        this.offset = offset;
    }
    inRect(p: Vector2)
    {
        let dp = scale(minus(p, this.offset), 2);
        return -this.size.x <= dp.x && dp.x <= this.size.x
            && -this.size.y <= dp.y && dp.y <= this.size.y;
    }
}

class Matrix3x3 extends Array<Array<number>>
{
    constructor(mat: Matrix3x3 | number[][] = null)
    {
        super(...[
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);
        this[0] = [1, 0, 0];
        this[1] = [0, 1, 0];
        this[2] = [0, 0, 1];
        if (mat instanceof Matrix3x3 || mat instanceof Array)
        {
            this[0] = mat[0].copyWithin(0, 0);
            this[1] = mat[1].copyWithin(0, 0);
            this[2] = mat[2].copyWithin(0, 0);
        }
    }
    static get identity()
    {
        return new Matrix3x3();
    }
    static multipleVector(mat:Matrix3x3,v: Vector2): Vector2
    {
        let result = [
            mat[0][0] * v[0] + mat[0][1] * v[1],
            mat[1][0] * v[0] + mat[1][1] * v[1],
            mat[2][0] * v[2] + mat[2][1] * v[1],
        ]
        return new Vector2(result);
    }
    static multiplePoint(mat: Matrix3x3, v: Vector2): Vector2
    {
        let result = [
            mat[0][0] * v[0] + mat[0][1] * v[1] + mat[0][2] * 1,
            mat[1][0] * v[0] + mat[1][1] * v[1] + mat[1][2] * 1,
            mat[2][0] * v[2] + mat[2][1] * v[1] + mat[2][2] * 1,
        ]
        return new Vector2(result);
    }
    static multipleMatrix(a: Matrix3x3, b: Matrix3x3): Matrix3x3
    {
        let mat = new Matrix3x3();
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                for (let k = 0; k < 3; k++)
                    mat[i][j] = a[i][k] * b[k][j];
        return mat;
    }
    
    multipleVector(v:Vector2): Vector2
    {
        return Matrix3x3.multipleVector(this, v);
    }
    multiplePoint(p: Vector2): Vector2
    {
        return Matrix3x3.multiplePoint(this, p);
    }
    multipleMatrix(m: Matrix3x3): Matrix3x3
    {
        let mat = Matrix3x3.multipleMatrix(this, m);
        this[0] = mat[0].copyWithin(0, 0);
        this[1] = mat[1].copyWithin(0, 0);
        this[2] = mat[2].copyWithin(0, 0);
        return this;
    }
}
interface MaterialOptions
{
    diffuse?: Color;
    reflect?: number;
    refrect?: number;
    emission?: Color;
}
class Material
{
    diffuseColor: Color = new Color(0, 0, 0, 1.0);
    reflectivity: number = 0;
    refractivity: number = 0;
    emission: Color = new Color(0, 0, 0, 1.0);
    static default = new Material(new Color(255, 255, 255, 1));
    constructor()
    constructor(emission: Color)
    constructor(options: MaterialOptions)
    constructor(options: Color | MaterialOptions = new Color(0, 0, 0, 1.0))
    {
        if (options instanceof Color)
            this.emission = options;
        else
        {
            this.emission = options.emission || this.emission;
            this.diffuseColor = options.diffuse || this.diffuseColor;
            this.reflectivity = options.reflect || this.reflectivity;
            this.refractivity = options.refrect || this.refractivity;
        }
    }
    static blend(m1: Material, m2: Material, k: number)
    {
        return new Material({
            emission: Color.blend(m1.emission, m2.emission, k),
            diffuse: Color.blend(m1.diffuseColor, m2.diffuseColor, k),
            reflect: interpolate(m1.reflectivity, m2.reflectivity, k),
            refrect: interpolate(m1.refractivity, m2.refractivity, k)
        });
    }
}

function mapColor(v:Vector4, k:number):Color
{
    return new Color(v.x * k * 255, v.y * k * 255, v.z * k * 255, 1.0);
}

function gradient(sdf: SDF,x:number,y:number, delta: number): [number, number]
{
    return [
        (sdf(x + delta, y)["0"] - sdf(x - delta, y)["0"]) / (2 * delta),
        (sdf(x, y + delta)["0"] - sdf(x, y - delta)["0"]) / (2 * delta)
    ];
}
export
{
    Color,
    max,
    min,
    sqrt,
    abs,
    length,
    clamp,
    smin,
    vec2,
    Vector2,
    Matrix3x3,
    plus,
    minus,
    scale,
    dot,
    cross,
    Vector4,
    vec4,
    Range,
    Material,
    mapColor,
    gradient,
};