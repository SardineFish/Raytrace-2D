import { RenderCmd, RenderState } from "./render";
import { jitteredSample, stratifiedSample, uniformSample } from "./trace";
import { Range } from "./lib";

onmessage = (e) =>
{
    console.log("receive");
    let renderCmd = e.data as RenderCmd;
    render(renderCmd);
}

const SampleFunctions:any = {
    JitteredSample: jitteredSample,
    StratifiedSample: stratifiedSample,
    UniformSample: uniformSample
};

function render(renderCmd: RenderCmd)
{
    renderCmd.xRange = new Range(renderCmd.xRange);
    renderCmd.yRange = new Range(renderCmd.yRange);
    let xStart = renderCmd.xRange.from;
    let xEnd = renderCmd.xRange.to;
    let yStart = renderCmd.yRange.from;
    let yEnd = renderCmd.yRange.to;

    let width = renderCmd.xRange.size;
    let height = renderCmd.yRange.size;
    
    let renderFunc = SampleFunctions[renderCmd.renderOption.raytraceOptions.sampleFunction];
    let buffer = renderCmd.buffer;
    
    for (let y = 0; y < height; y++)
    {
        for (let x = 0; x < width; x++)
        {
            let pos = y * width + x;
            let idx = pos << 2;
            buffer[idx] = 255 - buffer[idx];
            buffer[idx + 1] = 255 - buffer[idx + 1];
            buffer[idx + 2] = 255 - buffer[idx + 2];
            buffer[idx + 3] = 255 ;
        }
    }

    let state = new RenderState();
    state.buffer = buffer;
    state.progress = 1;
    postMessage(state, undefined, [state.buffer.buffer]);
}

