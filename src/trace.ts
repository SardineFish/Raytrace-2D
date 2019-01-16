import { Color, Vector2, Vector4, plus, scale, vec4, vec2, Range, Material, mapColor, gradient, minus, Rect } from "./lib";
import { RenderOption, SampleFunctions } from "./render";
import seedrandom from "seedrandom";

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
        let sampleFunction: (sdf: SDF, p: Vector2, rand: seedrandom.prng, offset?: number) => IterableIterator<Vector4>;
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
        sampleFunction = sampleFunction.bind(this);
        let color = vec4(0, 0, 0, 0);
        const N = this.options.raytrace.subDivide;
        
        for (const c of sampleFunction(sdf, p, null))
        {
            color = plus(color, c);
        }

        const distance = sdf(p.x, p.y)[0];
        if (0 <= distance && distance <= antiAliasThreshold)
        {
            let grad = new Vector2(gradient(sdf, p.x, p.y, 0.1));
            let pN = minus(p, scale(grad.normalized, antiAliasThreshold));
            let antiAliasColor = vec4(0, 0, 0, 0);
            for (const c of sampleFunction(sdf, pN, null))
            {
                antiAliasColor = plus(color, c);
            }
            return Color.blend(mapColor(antiAliasColor, 1 / N), mapColor(color, 1 / N), distance / antiAliasThreshold);
        }
        return mapColor(color, 1 / N);
    }

    *sampleIterator(sdf: SDF, p: Vector2, rand: seedrandom.prng, offset: number = 0): IterableIterator<Color>
    {
        const antiAliasThreshold = 1;
        let sampleFunction: (sdf: SDF, p: Vector2, rand: seedrandom.prng, offset?: number) => IterableIterator<Vector4>;
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
        sampleFunction = sampleFunction.bind(this);
        let color = vec4(0, 0, 0, 0);
        let antiAliasColor = vec4(0, 0, 0, 0);
        let n = 0;
        const distance = sdf(p.x, p.y)[0];
        let antiAliasIterator: IterableIterator<Vector4> = null;
        if (0 <= distance && distance <= antiAliasThreshold)
        {
            let grad = new Vector2(gradient(sdf, p.x, p.y, 0.1));
            let pN = minus(p, scale(grad.normalized, antiAliasThreshold));
            antiAliasIterator = sampleFunction(sdf, pN, rand, offset);
        }
        for (const c of sampleFunction(sdf, p, rand, offset))
        {
            n++;
            color = plus(color, c);
            if (antiAliasIterator)
            {
                antiAliasColor = plus(antiAliasColor, antiAliasIterator.next().value);
                yield Color.blend(mapColor(antiAliasColor, 1 / n), mapColor(color, 1 / n), distance / antiAliasThreshold);
            }
            else
                yield mapColor(color, 1 / n);
        }
    }

    *uniformSample(sdf: SDF, p: Vector2, rand: seedrandom.prng, offset: number = 0)
    {
        let color: Vector4 = vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++)
        {
            let rad = Math.PI * 2 * Math.random();
            yield this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)));
        }
        return color;
    }

    *stratifiedSample(sdf: SDF, p: Vector2, rand: seedrandom.prng, offset: number = 0)
    {
        let color: Vector4 = vec4(0, 0, 0, 1);
        for (let i = 0; i < this.options.raytrace.subDivide; i++)
        {
            let rad = Math.PI * 2 * i / this.options.raytrace.subDivide;
            yield this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)));
        }
        return color;
    }
    *jitteredSample(sdf: SDF, p: Vector2, rand: seedrandom.prng, offset: number = 0)
    {
        let color: Vector4 = vec4(0, 0, 0, 1);
        //const offset = Math.floor(this.options.raytrace.subDivide * Math.random());
        offset = Math.floor(this.options.raytrace.subDivide * rand()) + offset;
        for (let i = 0; i < this.options.raytrace.subDivide; i++)
        {
            
            let rad = Math.PI * 2 * ((i + offset) % this.options.raytrace.subDivide + rand()) / this.options.raytrace.subDivide;
            yield this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)));
            //color = <Vector4>plus(this.trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad))), color);
        }
    }

}