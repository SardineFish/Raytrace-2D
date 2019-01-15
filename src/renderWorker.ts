import { Range, Matrix3x3, Vector2 } from "./lib";

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
    
    let sampleFunc = SampleFunctions[renderCmd.renderOption.raytraceOptions.sampleFunction];
    let buffer = renderCmd.buffer;

    let progress = 0;
    
    for (let y = 0; y < height; y++)
    {
        for (let x = 0; x < width; x++)
        {
            let pos = y * width + x;
            let idx = pos << 2;
            let p = Matrix3x3.multipleVector(renderCmd.renderOption.viewerOptions.transform, new Vector2(xStart + x, yStart + y));
            let color = sample(renderCmd.sdf,
                p,
                sampleFunc,
                renderCmd.renderOption.raytraceOptions.hitThreshold,
                renderCmd.renderOption.raytraceOptions.subDivide
            );
            buffer[idx] = color.red;
            buffer[idx + 1] = color.green;
            buffer[idx + 2] = color.blue;
            buffer[idx + 3] = color.alpha;
        }

        let state = new RenderState();
        state.buffer = new Uint8ClampedArray(buffer);
        state.progress = y / height;
        postMessage(state, undefined, [state.buffer.buffer]);
    }
}

