import { RayTracer2D } from "./trace";
import { Color, Material, Range, Matrix3x3, Vector2 } from "./lib";

type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;
export interface RenderCommand
{
    renderType: "preview" | "raytrace"
    code: string;
    options: RenderOption;
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

class RenderCmd
{
    sdf: SDF;
    renderOption: RenderOption = null;
    buffer: Uint8ClampedArray = null;
    xRange: Range = null;
    yRange: Range = null;
    constructor(renderOption: RenderOption)
    {
        this.renderOption = renderOption;
    }
}

class RenderState
{
    progress: number = 0;
    buffer: Uint8ClampedArray = null;
}
function startRenderWorker(renderCmd: RenderCmd, outputTarget: HTMLCanvasElement)
{
    //renderCmd.buffer = new Uint8ClampedArray(renderCmd.xRange.length * renderCmd.yRange.length << 2);

    let worker = new Worker("./build/renderWorker.js");

    let ctx = outputTarget.getContext("2d");
    worker.onmessage = (e) =>
    {
        let state = e.data as RenderState;
        let imgData = new ImageData(state.buffer, renderCmd.xRange.size, renderCmd.yRange.size);
        ctx.putImageData(imgData, renderCmd.xRange.from, renderCmd.yRange.from);
        if (state.progress >= 1)
            worker.terminate();
    };
    renderCmd.buffer;
    worker.postMessage(renderCmd, [renderCmd.buffer.buffer]);
}

function renderRaytrace(sdf: SDF, renderOption: RenderOption, outputTarget:HTMLCanvasElement)
{
    //outputTarget.width = renderOption.width;
    //outputTarget.height = renderOption.height;
/*
    let renderCmd = new RenderCmd(renderOption);
    renderCmd.xRange = new Range(0, renderOption.viewport.size.x);
    renderCmd.yRange = new Range(0, renderOption.viewport.size.y);
    
    let imgDta = outputTarget.getContext("2d").getImageData(0, 0, renderOption.width, renderOption.height);
    renderCmd.buffer = new Uint8ClampedArray(imgDta.data);
    startRenderWorker(renderCmd, outputTarget);*/
}

function renderSDF(sdf: SDF, renderOption: RenderOption, outputBuffer: Uint8ClampedArray)
{
    const width = renderOption.viewport.size.x;
    const height = renderOption.viewport.size.y;
    const threshold = 1;

    let imgData = new ImageData(outputBuffer, width, height);

    for (let y = -height / 2 + 1; y <= height / 2; y++)
    {
        for (let x = -width / 2; x < width / 2; x++)
        {
            let [dst, mat] = sdf(x, y);
            let color = renderOption.environment.backgroundColor;
            if (dst <= 0)
                color = mat.emission;
            else if (dst < threshold)
            {
                var t = dst / threshold;
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

    *renderRaytraceIterator(sdf: SDF, buffer: Uint8ClampedArray): IterableIterator<RenderResult>
    {
        const pixelRenderer: IterableIterator<Color>[][] = [];
        const [width, height] = this.options.viewport.size;
        for (let y = 0; y < height; y++)
        {
            pixelRenderer.push([]);
            for (let x = 0; x < width; x++)
            {
                let p = Matrix3x3.multiplePoint(this.options.viewport.transform, new Vector2(x, y));
                pixelRenderer[y].push(this.raytracer.sampleIterator(sdf, p));
            }
        }
        for (var i = 1; i <= this.options.raytrace.subDivide; i++)
        {
            for (let y = 0; y < height; y++)
            {
                for (let x = 0; x < width; x++)
                {
                    let idx = (y * width + x) * 4;
                    let color = pixelRenderer[y][x].next().value;
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
        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                let idx = (y * width + x) * 4;
                let p = Matrix3x3.multiplePoint(this.options.viewport.transform, new Vector2(x, y));
                let color = this.raytracer.sample(sdf, p);
                buffer[idx] = color.red;
                buffer[idx + 1] = color.green;
                buffer[idx + 2] = color.blue;
                buffer[idx + 3] = Math.floor(color.alpha * 255);
            }
            /*
            let state = new RenderState();
            state.buffer = new Uint8ClampedArray(buffer);
            state.progress = y / height;
            postMessage(state, undefined, [state.buffer.buffer]);*/
        }
        //outputTarget.width = renderOption.width;
        //outputTarget.height = renderOption.height;

        /*
        let renderCmd = new RenderCmd(renderOption);
        renderCmd.xRange = new Range(0, renderOption.width);
        renderCmd.yRange = new Range(0, renderOption.height);

        let imgDta = outputTarget.getContext("2d").getImageData(0, 0, renderOption.width, renderOption.height);
        renderCmd.buffer = new Uint8ClampedArray(imgDta.data);
        startRenderWorker(renderCmd, outputTarget);*/
    }

    renderSDF(sdf: SDF, buffer: Uint8ClampedArray)
    {
        renderSDF(sdf, this.options, buffer);
    }
}