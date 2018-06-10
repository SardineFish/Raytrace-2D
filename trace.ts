import { Color, Vector2, Vector4, plus, scale, vec4 } from "./lib.js";

type SDFResult = [number, Color];
type SDF = (x: number, y: number) => SDFResult;



function trace(sdf: SDF, p: Vector2, dir: Vector2, precision: number): Vector4
{
    let distance: number = 0;
    let color: Color;
    dir = dir.normalized;

    do
    {
        p = <Vector2>plus(p, scale(dir, distance));
        [distance, color] = sdf(p.x, p.y);
    }
    while (distance > precision);
    return vec4(color.red / 255, color.green / 255, color.blue / 255, color.alpha);
}
