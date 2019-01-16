import { Material, sqrt, min, max, length, abs, clamp } from "./lib";
/*import { moduleHub } from "./module-hub";*/

type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;

/**
 * 
 * @param {Number} r - radius
 * @returns {SDF}
 */
function circle(r: number): SDF
{
    //return (x, y) => [sqrt(x * x + y * y) - r, material];
    return (x, y) => [sqrt(x * x + y * y) - r, Material.default];
}
/**
 * 
 * @param {Number} w - Width of rectangle
 * @param {Number} h - Height of rectangle
 * @returns {SDF}
 */
function rect(w: number, h: number): SDF
{
    return (x, y) =>
    {
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
function torus(rOuter: number, rInner: number): SDF
{
    const mid = (rOuter + rInner) / 2;
    const wide = (rOuter - rInner) / 2;
    return (x, y) =>
    {
        const l = length(x, y);
        return [abs(l - mid) - wide, Material.default];
    }
}

/**
 * 
 * @param {Number} wide - Width of the belt
 * @returns {SDF}
 */
function belt(wide: number, material: Material): SDF
{
    return (x, y) => [y - wide / 2, material];
}

/**
 * 
 * @param {Number} l - Length between two center of semi-circle
 * @param {Number} radius - The radius of the semi-circle at end
 * @returns {SDF}
 */
function capsule(l: number, radius: number, ): SDF
{
    const half = l / 2;
    return (x, y) =>
    {
        const dx = abs(x) - half;
        return [length(clamp(dx, 0, abs(dx)), y) - radius, Material.default];
    }
}


export { circle, rect, torus, belt, capsule };