import { jitteredSample, stratifiedSample, uniformSample } from "./trace";
import { Color, Material, Range } from "./lib";

type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;

class RenderOption
{
    width: number = 600;
    height: number = 480;
    environmentOptions: EnvironmentOptions = new EnvironmentOptions();
    raytraceOptions: RaytraceOptions = new RaytraceOptions();
    antiAlias: boolean = true;
    renderOrder: RenderOrder = RenderOrder.Progressive;
    //outputTarget: HTMLCanvasElement = null;
}
enum SampleFunctions
{
    JitteredSample = "JitteredSample",
    StratifiedSample = "StratifiedSample",
    UniformSample = "UniformSample",
}
enum RenderOrder
{
    Progressive
}
class EnvironmentOptions
{
    backgroundColor: Color = new Color(0, 0, 0, 1.0);
    ambient: Color = new Color(0, 0, 0, 1.0);
}
class RaytraceOptions
{
    sampleFunction: SampleFunctions = SampleFunctions.JitteredSample;
    subDivide: number = 64;
    reflectDepth: number = 8;
    refrectDepth: number = 8;
    hitThreshold: number = 0.1;
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

    let renderCmd = new RenderCmd(renderOption);
    renderCmd.xRange = new Range(0, renderOption.width);
    renderCmd.yRange = new Range(0, renderOption.height);
    
    let imgDta = outputTarget.getContext("2d").getImageData(0, 0, renderOption.width, renderOption.height);
    renderCmd.buffer = new Uint8ClampedArray(imgDta.data);
    startRenderWorker(renderCmd, outputTarget);
}
function renderSDF(sdf: SDF,renderOption:RenderOption , outputTarget: HTMLCanvasElement)
{
    const width = renderOption.width;
    const height = renderOption.height;
    const threshold = 1;

    outputTarget.width = width;
    outputTarget.height = height;
    let ctx = outputTarget.getContext("2d");
    let buffer = new Uint8ClampedArray(width * height << 2);
    let imgData = new ImageData(buffer, width, height);

    for (let y = -height / 2 + 1; y <= height / 2; y++)
    {
        for (let x = -width / 2; x < width / 2; x++)
        {
            let [dst, mat] = sdf(x, y);
            let color = renderOption.environmentOptions.backgroundColor;
            if (dst <= 0)
                color = mat.emission;
            else if (dst < threshold)
            {
                var t = dst / threshold;
                color = Color.blend(renderOption.environmentOptions.backgroundColor, mat.emission, 1 - t);
            }

            drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function drawPixel(imgData: ImageData, x: number, y: number, width: number, height: number, color: Color)
{
    //alert(x);
    let idx = (y * width + x) * 4;
    imgData.data[idx] = color.red;
    imgData.data[idx + 1] = color.green;
    imgData.data[idx + 2] = color.blue;
    imgData.data[idx + 3] = Math.floor(color.alpha * 255);
}
export
{
    RenderOption,
    SampleFunctions,
    EnvironmentOptions,
    RaytraceOptions,
    RenderCmd,
    renderRaytrace,
    renderSDF,
    RenderState
    
};