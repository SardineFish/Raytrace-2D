import { Color, Vector2, Vector4, plus, scale, vec4, vec2, Range } from "./lib.js";

type SDFResult = [number, Color];
type SDF = (x: number, y: number) => SDFResult;

let BoundX = new Range(-500, 500);
let BoundY = new Range(-500, 500);

function trace(sdf: SDF, p: Vector2, dir: Vector2, precision: number): Vector4
{
    let distance: number = 0;
    let color: Color;
    dir = dir.normalized;

    do
    {
        p = <Vector2>plus(p, scale(dir, distance));
        [distance, color] = sdf(p.x, p.y);
        if (!BoundX.inRange(p.x) || !BoundY.inRange(p.y))
            return vec4(0, 0, 0, 1);    
    }
    while (distance > precision);
    return vec4(color.red / 255, color.green / 255, color.blue / 255, color.alpha);
}

function sample(sdf: SDF, p: Vector2, precision: number, n: number): Vector4
{
    let color: Vector4 = vec4(0, 0, 0, 1);
    for (let i = 0; i < n; i++)
    {
        let rad = Math.PI * 2 * Math.random();
        color = <Vector4>plus(trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}

function setBound(boundX: Range, boundY: Range)
{
    BoundX = boundX;
    BoundY = boundY;
}

export { trace, setBound, sample };