import { max, min, sqrt, abs, length, clamp } from "./lib.js";

/**
 * 
 * @param {Number} r - radius
 * @returns {SDF}
 */
function circle(r)
{
    return (x, y) => Math.sqrt(x * x + y * y) - r;
}
/**
 * 
 * @param {Number} w - Width of rectangle
 * @param {Number} h - Height of rectangle
 * @returns {SDF}
 */
function rect(w, h)
{
    return (x, y) =>
    {
        const dx = Math.abs(x) - w / 2;
        const dy = Math.abs(y) - h / 2;
        return min(max(dx, dy), 0) + length(max(dx, 0), max(dy, 0));
    };    
}

/**
 * 
 * @param {Number} rOuter - Outer radius
 * @param {Number} rInner - Inner radius
 * @returns {SDF}
 */
function torus(rOuter, rInner)
{
    const mid = (rOuter + rInner) / 2;
    const wide = (rOuter - rInner) / 2;
    return (x, y) =>
    {
        const l = length(x, y);
        return abs(l - mid) - wide;
    }
}

/**
 * 
 * @param {Number} wide - Width of the belt
 * @returns {SDF}
 */
function belt(wide)
{
    return (x, y) => y - wide / 2;
}

/**
 * 
 * @param {Number} l - Length between two center of semi-circle
 * @param {Number} radius - The radius of the semi-circle at end
 * @returns {SDF}
 */
function capsule(l, radius)
{
    const half = l / 2;
    return (x, y) =>
    {
        const dx = abs(x) - half;
        return length(clamp(dx, 0, abs(dx)), y) - radius;
    }
}

export { circle, rect, torus, belt, capsule };

/**
 * @typedef {function (Number, Number) => Number} SDF
 */