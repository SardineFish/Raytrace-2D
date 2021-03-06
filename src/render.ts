import { RayTracer2D } from "./trace";
import { Color, Material, Range, Matrix3x3, Vector2 } from "./lib";
import seedrandom from "seedrandom";

type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;
export interface RenderCommand
{
    renderType: "preview" | "raytrace";
    code: string;
    options: RenderOption;
    index?: number;
    seed?: number;
}
export interface RenderResult
{
    progress: number;
    buffer: Uint8ClampedArray;
}
export interface RenderOption
{
    [key: string]: any;
    environment: EnvironmentOptions;// = new EnvironmentOptions();
    raytrace: RaytraceOptions;// = new RaytraceOptions();
    viewport: ViewerOptions;// = new ViewerOptions();
    antiAlias: boolean;// = true;
    renderOrder: RenderOrder;// = RenderOrder.Progressive;
    thread: number;// = 4;
    preview: boolean;// = true;
}
export type SampleFunctions = "jittered" | "stratified" | "uniform";
export type RenderOrder = "progressive";
export interface EnvironmentOptions
{
    backgroundColor: Color;
    ambient: Color;
}
export interface RaytraceOptions
{
    sampleFunction: SampleFunctions;// = SampleFunctions.JitteredSample;
    subDivide: number;// = 64;
    reflectDepth: number;// = 8;
    refrectDepth: number;// = 8;
    hitThreshold: number;// = 0.1;
}
export interface ViewerOptions
{
    size: Vector2;
    transform: Matrix3x3;// = new Matrix3x3();
}

function renderSDF(sdf: SDF, renderOption: RenderOption, outputBuffer: Uint8ClampedArray)
{
    const width = renderOption.viewport.size.x;
    const height = renderOption.viewport.size.y;
    const antiAliasThreshold = 1;

    for (let y = -height / 2 + 1; y <= height / 2; y++)
    {
        for (let x = -width / 2; x < width / 2; x++)
        {
            let [dst, mat] = sdf(x, y);
            let color = renderOption.environment.backgroundColor;
            if (dst <= 0)
                color = mat.emission;
            else if (renderOption.antiAlias && dst < antiAliasThreshold)
            {
                var t = dst / antiAliasThreshold;
                color = Color.blend(renderOption.environment.backgroundColor, mat.emission, 1 - t);
            }

            drawPixel(outputBuffer, x + width / 2, -y + height / 2, width, height, color);
        }
    }
}

function drawPixel(buffer: Uint8ClampedArray, x: number, y: number, width: number, height: number, color: Color)
{
    let idx = (y * width + x) * 4;
    buffer[idx] = color.red;
    buffer[idx + 1] = color.green;
    buffer[idx + 2] = color.blue;
    buffer[idx + 3] = Math.floor(color.alpha * 255);
}

export class Renderer
{
    options: RenderOption;
    raytracer: RayTracer2D;

    constructor(options: RenderOption)
    {
        this.options = options;
        this.raytracer = new RayTracer2D(options);
    }

    render(sdf: SDF, buffer: Uint8ClampedArray): void
    {
        
    }

    *renderRaytraceIterator(sdf: SDF, buffer: Uint8ClampedArray, rand: seedrandom.prng, offset:number=0): IterableIterator<RenderResult>
    {
        const pixelRenderer: IterableIterator<Color>[][] = [];
        const [width, height] = this.options.viewport.size;
        let p: Vector2;
        for (let y = 0; y < height; y++)
        {
            pixelRenderer.push([]);
            for (let x = 0; x < width; x++)
            {
                p = Matrix3x3.multiplePoint(this.options.viewport.transform, new Vector2(x, y));
                pixelRenderer[y].push(this.raytracer.sampleIterator(sdf, p, rand, offset));
            }
        }
        let idx: number = 0;
        let color: Color;
        for (var i = 1; i <= this.options.raytrace.subDivide; i++)
        {
            for (let y = 0; y < height; y++)
            {
                for (let x = 0; x < width; x++)
                {
                    idx = (y * width + x) * 4;
                    color = pixelRenderer[y][x].next().value;
                    buffer[idx] = color.red;
                    buffer[idx + 1] = color.green;
                    buffer[idx + 2] = color.blue;
                    buffer[idx + 3] = Math.floor(color.alpha * 255);
                }
            }
            yield {
                progress: i / this.options.raytrace.subDivide,
                buffer: buffer
            };
        }
    }

    renderRaytrace(sdf: SDF, buffer: Uint8ClampedArray)
    {
        const [width, height] = this.options.viewport.size;
        const rand = seedrandom.alea(Date.now().toString());
        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                let idx = (y * width + x) * 4;
                let p = Matrix3x3.multiplePoint(this.options.viewport.transform, new Vector2(x, y));
                let color = this.raytracer.sample(sdf, p, rand);
                buffer[idx] = color.red;
                buffer[idx + 1] = color.green;
                buffer[idx + 2] = color.blue;
                buffer[idx + 3] = Math.floor(color.alpha * 255);
            }
        }
    }

    renderSDF(sdf: SDF, buffer: Uint8ClampedArray)
    {
        renderSDF(sdf, this.options, buffer);
    }
}