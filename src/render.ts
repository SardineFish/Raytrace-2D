import { jitteredSample, stratifiedSample, uniformSample } from "./trace";
import { Color, Material, Range } from "./lib";

type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;

class RenderOption
{
    public width: number = 600;
    public height: number = 480;
    public environmentOptions: EnvironmentOptions = new EnvironmentOptions();
    public raytraceOptions: RaytraceOptions = new RaytraceOptions();
    public antiAlias: boolean = true;
    public renderOrder: RenderOrder = RenderOrder.Progressive;
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
    public backgroundColor: Color = new Color(0, 0, 0, 1.0);
    public ambient: Color = new Color(0, 0, 0, 1.0);
}
class RaytraceOptions
{
    public sampleFunction: SampleFunctions = SampleFunctions.JitteredSample;
    public subDivide: number = 64;
    public reflectDepth: number = 8;
    public refrectDepth: number = 8;
    public hitThreshold: number = 0.1;
}

class RenderCmd
{
    public renderOption: RenderOption = null;
    public buffer: Uint8ClampedArray = null;
    public xRange: Range = null;
    public yRange: Range = null;
}

export
{
    RenderOption,
    SampleFunctions,
    EnvironmentOptions,
    RaytraceOptions
};