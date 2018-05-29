import { max, smin } from "./lib.js";

/**
 * 
 * @param {SDF} sdf 
 * @param {Number} dx 
 * @param {SDF} dy 
 * @returns {SDF}
 */
function translate(sdf, dx, dy)
{
    return (x, y) => sdf(x - dx, y - dy);
}
/**
 * 
 * @param {SDF} sdf 
 * @param {Number} kx 
 * @param {Number} [ky] 
 * @returns {SDF}
 */
function scale(sdf, kx, ky)
{
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
function rotate(sdf, rad)
{
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
function union(sdf1, sdf2)
{
    return (x, y) => min(sdf1(x, y), sdf2(x, y));
}

/**
 * 
 * @param {SDF} sdf1 
 * @param {SDF} sdf2 
 * @returns {SDF}
 */
function subtract(sdf1, sdf2)
{
    return (x, y) => max(sdf1(x, y), -sdf2(x, y));
}

/**
 * 
 * @param {SDF} sdf1 
 * @param {SDF} sdf2 
 * @returns {SDF}
 */
function intersect(sdf1, sdf2)
{
    return (x, y) => max(sdf1(x, y), sdf2(x, y));
}

/**
 * 
 * @param {SDF} sdf 
 * @param {Number} radius 
 * @returns {SDF}
 */
function expand(sdf, radius)
{
    return (x, y) => sdf(x, y) - radius;
}

function repeat(sdf, dx, dy = dx, ox = 0, oy = 0)
{
    return (x, y) => sdf(x % dx + ox, y % dy + oy);
}

/**
 * 
 * @param {SDF} sdf1 
 * @param {SDF} sdf2 
 * @returns {SDF}
 */
function displace(sdf1, sdf2)
{
    return (x, y) => sdf1(x, y) + sdf2(x, y);
}

/**
 * 
 * @param {SDF} sdf1 
 * @param {SDF} sdf2 
 * @param {Number} k 
 * @returns {SDF}
 */
function blend(sdf1, sdf2,k)
{
    return (x, y) => smin(sdf1(x, y), sdf2(x, y), k);
}
export { translate, union, scale, rotate, expand,subtract,repeat,displace,blend };

/**
 * @typedef {function (Number, Number) => Number} SDF
 */