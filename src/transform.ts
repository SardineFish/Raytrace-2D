import { smin, Color, Material } from "./lib";
type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;
/**
 * 
 * @param {SDF} sdf 
 * @param {Number} dx 
 * @param {SDF} dy 
 * @returns {SDF}
 */
function translate(sdf:SDF, dx:number, dy:number):SDF
{
    const f: SDF = (x, y) => sdf(x - dx, y - dy);
    f.toString = () =>
    {
        return `
        (x, y) => {
            var sdf = ${sdf.toString()};
            return sdf(x - ${dx}, y - ${dy});
        }`;
    };
    return f;
}

/**
 * 
 * @param {SDF} sdf 
 * @param {Number} kx 
 * @param {Number} [ky] 
 * @returns {SDF}
 */
function scale(sdf: SDF, kx: number, ky:number):SDF
{
    kx = kx === undefined ? 1 : kx;
    ky = ky === undefined ? kx : ky;

    const f: SDF = (x, y) => sdf(x / kx, y / ky);

    f.toString = () =>
    {
        return `
        (x, y) => {
            var sdf = ${sdf.toString()};
            return sdf(x / ${kx}, y / ${ky});
        }`;
    };
    return f;
}

/**
 * 
 * @param {SDF} sdf 
 * @param {Number} rad 
 * @returns {SDF}
 */
function rotate(sdf:SDF, rad:number):SDF
{
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const f: SDF = (x, y) => sdf(x * cos - y * sin, x * sin + y * cos);

    f.toString = () =>
    {
        return `
        (x, y) => {
            var sdf = ${sdf.toString()};
            return sdf(x * ${cos} - y * ${sin}, x * ${sin} + y * ${cos});
        }`;
    };
    return f;
}

/**
 * 
 * @param {SDF} sdf1 
 * @param {SDF} sdf2 
 * @returns {SDF}
 */
function union(sdf1:SDF, sdf2:SDF):SDF
{
    const f: SDF = (x, y) =>
    {
        let [d1, c1] = sdf1(x, y);
        let [d2, c2] = sdf2(x, y);
        if (d1 < d2)
            return [d1, c1];
        else
            return [d2, c2];
            
    };

    f.toString = () =>
    {
        return `
        (x, y) =>
        {
            var sdf1 = ${sdf1.toString()};
            var sdf2 = ${sdf2.toString()};
            let [d1, c1] = sdf1(x, y);
            let [d2, c2] = sdf2(x, y);
            if (d1 < d2)
                return [d1, c1];
            else
                return [d2, c2];

        }`
    };
    return f;

    
}

/**
 * 
 * @param {SDF} sdf1 
 * @param {SDF} sdf2 
 * @returns {SDF}
 */
function subtract(sdf1:SDF, sdf2:SDF):SDF
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
function intersect(sdf1:SDF, sdf2:SDF)
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
function expand(sdf:SDF, radius:number):SDF
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
function displace(sdf1:SDF, sdf2:SDF):SDF
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
function blend(sdf1: SDF, sdf2: SDF, k:number):SDF
{
    const material1 = sdf1(0, 0)["1"];
    const material2 = sdf2(0, 0)["1"];
    const material = new Material();
    material.emission = new Color(
        smin(material1.emission.red, material2.emission.red, k),
        smin(material1.emission.green, material2.emission.green, k),
        smin(material1.emission.blue, material2.emission.blue, k),
        smin(material1.emission.alpha, material2.emission.alpha, k));

    return (x, y) => [smin(sdf1(x, y)["0"], sdf2(x, y)["0"], k), material];
}

/**
 * 
 * @param sdf - The SDF function
 * @param material - The material to add to this object
 */
function wrapSDF(sdf: SDF, material: Material): SDF
{
    return (x, y) => [sdf(x, y)["0"], material];
}

export { translate, union, scale, rotate, expand, subtract, displace, blend, wrapSDF, intersect };