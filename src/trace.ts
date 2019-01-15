import { Color, Vector2, Vector4, plus, scale, vec4, vec2, Range, Material, mapColor, gradient, minus, Rect } from "./lib";
import { RenderOption, SampleFunctions } from "./render";

type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;
type SampleFunction = (sdf: SDF, p: Vector2, subdiv: number) => Vector4;

let BoundX = new Range(-500, 500);
let BoundY = new Range(-500, 500);


function setBound(boundX: Range, boundY: Range)
{
    BoundX = boundX;
    BoundY = boundY;
}

/*function antiAlias(sdf: SDF, p: Vector2, colorCallback:Function): Vector4
{
    
}*/

export class RayTracer2D
{
    options: RenderOption;
    bound: Rect;

    constructor(options: RenderOption)
    {
        this.options = options;
        this.bound = new Rect(options.viewport.size);
    }

    trace(sdf: SDF, p: Vector2, dir: Vector2): Vector4
    {
        let distance: number = 0;
        let material: Material;
        dir = dir.normalized;
        do
        {
            p = <Vector2>plus(p, scale(dir, distance));
            [distance, material] = sdf(p.x, p.y);
            if (!this.bound.inRect(p))
                return this.options.environment.backgroundColor.toVector4();
        }
        while (distance > this.options.raytrace.hitThreshold);
        return material.emission.toVector4();
    }

    sample(sdf: SDF, p: Vector2): Color
    {
        const antiAliasThreshold = 1;
        let sampleFunction: (sdf: SDF, p: Vector2) => Vector4;
        switch (this.options.raytrace.sampleFunction)
        {
            case "jittered":
                sampleFunction = this.jitteredSample;
                break;
            case "stratified":
                sampleFunction = this.stratifiedSample;
                break;
            case "uniform":
                sampleFunction = this.uniformSample;
                break;
        }
        let color = mapColor(sampleFunction(sdf, p), 1 / this.options.raytrace.subDivide);
        let distance = sdf(p.x, p.y)["0"];
        if (0 <= distance && distance <= antiAliasThreshold)
        {
            let grad = new Vector2(gradient(sdf, p.x, p.y, 0.1));
            let pN = <Vector2>minus(p, scale(grad.normalized, antiAliasThreshold));
            let colorN = mapColor(sampleFunction(sdf, pN), 1 / this.options.raytrace.subDivide);
            return Color.blend(colorN, color, distance / antiAliasThreshold);
        }
        return color;
    }

    

    uniformSample(sdf: SDF, p: Vector2): Vector4
    {
        let color: Vector4 = vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++)
        {
            let rad = Math.PI * 2 * Math.random();
            color = <Vector4>plus(this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad))), color);
        }
        return color;
    }

    stratifiedSample(sdf: SDF, p: Vector2): Vector4
    {
        let color: Vector4 = vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++)
        {
            let rad = Math.PI * 2 * i / this.options.raytrace.subDivide;
            color = <Vector4>plus(this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad))), color);
        }
        return color;
    }
    jitteredSample(sdf: SDF, p: Vector2): Vector4
    {
        let color: Vector4 = vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++)
        {
            let rad = Math.PI * 2 * (i + Math.random()) / this.options.raytrace.subDivide;
            color = <Vector4>plus(this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad))), color);
        }
        return color;
    }

}