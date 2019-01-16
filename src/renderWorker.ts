import { Range, Matrix3x3, Vector2, SDF, Color } from "./lib";
import {RenderCommand, Renderer, RenderResult} from "./render"

onmessage = (e) =>
{
    console.log("receive");
    let renderCmd = <RenderCommand>e.data;
    process(renderCmd);
    
}

function report(result: RenderResult)
{
    postMessage(result, undefined, [result.buffer]);
}

function process(renderCmd: RenderCommand)
{
    function config()
    { 
        renderCmd.options.environment.ambient = Color.from(renderCmd.options.environment.ambient);
        renderCmd.options.environment.backgroundColor = Color.from(renderCmd.options.environment.ambient);
        renderCmd.options.viewport.size = new Vector2(renderCmd.options.viewport.size);
        renderCmd.options.viewport.transform = new Matrix3x3(renderCmd.options.viewport.transform);
    }
    function render(sdf: SDF)
    {
        const renderer = new Renderer(renderCmd.options);
        let buffer = new Uint8ClampedArray(renderCmd.options.viewport.size.x * renderCmd.options.viewport.size.y * 4);
        if (renderCmd.renderType == "preview")
        {
            renderer.renderSDF(sdf, buffer);
            report({
                progress: 1,
                buffer: buffer
            });
        }
        else if (renderCmd.renderType == "raytrace")
        {
            let N = 0;
            for (const result of renderer.renderRaytraceIterator(sdf, buffer))
            {
                report({
                    progress: result.progress,
                    buffer: new Uint8ClampedArray(result.buffer.buffer)
                });
            }
        }
    }
    
    eval(renderCmd.code);
}