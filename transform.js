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
function combine(sdf1, sdf2)
{
    
    return (x, y) => Math.min(sdf1(x, y), sdf2(x, y));
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

export { translate, combine, scale, rotate, expand };

/**
 * @typedef {function (Number, Number) => Number} SDF
 */