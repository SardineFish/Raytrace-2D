import { smin, Color, Material, mix } from "./lib";
type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;
/**
 * 
 * @param {SDF} sdf 
 * @param {Number} dx 
 * @param {SDF} dy 
 * @returns {SDF}
 */
function translate(sdf: SDF, dx: number, dy: number): SDF
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
function scale(sdf: SDF, kx: number = 1, ky: number = kx): SDF
{
    return (x, y) => sdf(x / kx, y / ky);
}

/**
 * 
 * @param {SDF} sdf 
 * @param {Number} rad 
 * @returns {SDF}
 */
function rotate(sdf: SDF, rad: number): SDF
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
function union(sdf1: SDF, sdf2: SDF): SDF
{
    return (x, y) =>
    {
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
function subtract(sdf1: SDF, sdf2: SDF): SDF
{
    return (x, y) =>
    {
        let [d1, c1] = sdf1(x, y);
        let [d2, c2] = sdf2(x, y);
        d2 = -d2;
        if (d1 > d2)
            return [d1, c1];
        else
            return [d2, c1];

    }
}

/**
 * 
 * @param {SDF} sdf1 
 * @param {SDF} sdf2 
 * @returns {SDF}
 */
function intersect(sdf1: SDF, sdf2: SDF)
{
    return (x: number, y: number) =>
    {
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
function expand(sdf: SDF, radius: number): SDF
{
    return (x, y) =>
    {
        let [d, c] = sdf(x, y);
        return [d - radius, c];

    }
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
function displace(sdf1: SDF, sdf2: SDF): SDF
{
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
function blend(sdf1: SDF, sdf2: SDF, k: number): SDF
{
    const material1 = sdf1(0, 0)[1];
    const material2 = sdf2(0, 0)[1];
    const material = new Material();
    material.emission = new Color(
        smin(material1.emission.red, material2.emission.red, k),
        smin(material1.emission.green, material2.emission.green, k),
        smin(material1.emission.blue, material2.emission.blue, k),
        smin(material1.emission.alpha, material2.emission.alpha, k));

    return (x, y) =>
    {
        const [d1, m1] = sdf1(x, y);
        const [d2, m2] = sdf2(x, y);
        return [smin(d1, d2, k), Material.blend(m1, m2, mix(d1, d2, k))];
        //return [smin(d1, d2, k), new Material(mapColor(smin(m1.emission.toVector4(), m2.emission.toVector4(), k), 1))];
    }
}
function material(sdf: SDF, color: Color): SDF
function material(sdf: SDF, material: Material): SDF
function material(sdf: SDF, material: Material | Color): SDF
{
    if (material instanceof Color)
        material = new Material(material);
    return (x: number, y: number) => [sdf(x, y)[0], material as Material];
}

export { translate, union, scale, rotate, expand, subtract, displace, blend, intersect, material };