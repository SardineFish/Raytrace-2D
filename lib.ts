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

    toString()
    {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
}
const max = Math.max;
const min = Math.min;
const sqrt = Math.sqrt;
const abs = Math.abs;
const length = (x:number, y:number): number => sqrt(x * x + y * y);
const clamp = (n: number, min: number, max: number): number => n > max ? max : n < min ? min : n;
const smin = (a: number, b: number, k: number): number => -Math.log(Math.exp(-k * a) + Math.exp(-k * b)) / k;

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
        let l = Math.hypot.call(this, this);
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
}

function vec2(x: number, y: number): Vector2
{
    return new Vector2(x, y);
}
function vec4(x: number, y: number, z: number, w: number): Vector4
{
    return new Vector4(x, y, z, w);
}
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
    plus,
    minus,
    scale,
    dot,
    cross,
    Vector4,
    vec4
};