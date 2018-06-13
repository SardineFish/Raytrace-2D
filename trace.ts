import { Color, Vector2, Vector4, plus, scale, vec4, vec2, Range, Material, mapColor, gradient, minus } from "./lib.js";

type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;
type SampleFunction = (sdf: SDF, p: Vector2, precision: number, subdiv: number) => Vector4;

let BoundX = new Range(-500, 500);
let BoundY = new Range(-500, 500);


function setBound(boundX: Range, boundY: Range)
{
    BoundX = boundX;
    BoundY = boundY;
}



function trace(sdf: SDF, p: Vector2, dir: Vector2, precision: number): Vector4
{
    let distance: number = 0;
    let material: Material;
    dir = dir.normalized;
    do
    {
        p = <Vector2>plus(p, scale(dir, distance));
        [distance, material] = sdf(p.x, p.y);
        if (!BoundX.inRange(p.x) || !BoundY.inRange(p.y))
            return vec4(0, 0, 0, 1);    
    }
    while (distance > precision);
    return vec4(material.emission.red / 255, material.emission.green / 255, material.emission.blue / 255, material.emission.alpha);
}

/*function antiAlias(sdf: SDF, p: Vector2, colorCallback:Function): Vector4
{
    
}*/

function sample(sdf: SDF, p: Vector2, sampleFunction: SampleFunction, precision: number, subdiv: number): Color
{
    const antiAliasThreshold =1;
    let color = mapColor(sampleFunction(sdf, p, precision, subdiv), 1 / subdiv);
    let distance = sdf(p.x, p.y)["0"];
    if (0<=distance&&distance <= antiAliasThreshold)
    {
        let grad = new Vector2(gradient(sdf, p.x, p.y, 0.1));
        let pN = <Vector2>minus(p, scale(grad.normalized, antiAliasThreshold));
        let colorN = mapColor(sampleFunction(sdf, pN, precision, subdiv), 1 / subdiv);
        return Color.blend(colorN, color, distance / antiAliasThreshold);
    }
    return color;
}

function uniformSample(sdf: SDF, p: Vector2, precision: number, subdiv: number): Vector4
{
    let color: Vector4 = vec4(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++)
    {
        let rad = Math.PI * 2 * Math.random();
        color = <Vector4>plus(trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}

function stratifiedSample(sdf: SDF, p: Vector2, precision: number, subdiv: number): Vector4
{
    let color: Vector4 = vec4(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++)
    {
        let rad = Math.PI * 2 * i / subdiv;
        color = <Vector4>plus(trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}

function jitteredSample(sdf: SDF, p: Vector2, precision: number, subdiv: number): Vector4
{
    let color: Vector4 = vec4(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++)
    {
        let rad = Math.PI * 2 * (i + Math.random()) / subdiv;
        color = <Vector4>plus(trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}

export { trace, setBound, uniformSample,stratifiedSample, jitteredSample,sample };