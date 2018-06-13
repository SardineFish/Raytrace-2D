import { sqrt, min, max, length, abs, clamp } from "./lib.js";
/**
 *
 * @param {Number} r - radius
 * @param {Material} material - The material
 * @returns {SDF}
 */
function circle(r, material) {
    return (x, y) => [sqrt(x * x + y * y) - r, material];
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
        return [min(max(dx, dy), 0) + length(max(dx, 0), max(dy, 0)), material];
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
        const l = length(x, y);
        return [abs(l - mid) - wide, material];
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
        const dx = abs(x) - half;
        return [length(clamp(dx, 0, abs(dx)), y) - radius, material];
    };
}
export { circle, rect, torus, belt, capsule };
//# sourceMappingURL=shape.js.map