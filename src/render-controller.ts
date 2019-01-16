import { RenderOption, RenderCommand, RenderResult } from "./render";
import { SDF, Color, vec2, Matrix3x3 } from "./lib";
import linq from "linq";

const RenderWorkerScript = "./build/renderWorker.js";

export interface RenderProgress
{
    estimate: number;
    spend: number;
    progress: number;
    buffer: Uint8ClampedArray;
}

export class RaytraceRenderController
{
    workers: Worker[] = [];
    workerProgress: number[] = [];
    state: "rendering" | "ready" = "ready";
    process(code: string, option: RenderOption, complete: (result: RenderResult) => void, onProgress?: (result: RenderResult) => void)
    {
        if (this.state != "ready")
            return;
        option.raytrace.subDivide = Math.ceil(option.raytrace.subDivide / option.thread) * option.thread;
        this.state = "rendering";
        const mix = new Uint8ClampedArray(option.viewport.size.x * option.viewport.size.y * 4);
        let n = 0;
        const resultBuffers: Uint8ClampedArray[] = [];
        for (let i = 0; i < option.thread; i++)
        {
            const worker = new Worker(RenderWorkerScript);
            this.workers.push(worker);
            this.workerProgress.push(0);
            resultBuffers.push(new Uint8ClampedArray(option.viewport.size.x * option.viewport.size.y * 4));
            worker.onmessage = (e) =>
            {
                n++;
                const result = e.data as RenderResult;
                this.workerProgress[i] = result.progress;
                resultBuffers[i] = result.buffer;
                let sum = 0;
                for (let i = 0; i < result.buffer.length; i++)
                {
                    sum = 0;
                    for (let j = 0; j < option.thread; j++)
                    {
                        sum += resultBuffers[j][i];
                    }
                    mix[i] = sum / option.thread;
                } 
                onProgress({
                    progress: linq.from(this.workerProgress).sum() / this.workers.length,
                    buffer: mix
                });
                if (linq.from(this.workerProgress).sum() == option.thread)
                {
                    this.cleanup();
                    complete({
                        progress: 1,
                        buffer: mix
                    });
                }
            }
        }
        const seed = Date.now();
        this.workers.forEach((worker, idx) => worker.postMessage(<RenderCommand>{
            code: code,
            options: option,
            renderType: "raytrace",
            seed: seed, 
            index: idx
        }));
    }

    private cleanup()
    {
        this.workers.forEach(worker => worker.terminate());
        this.workers = [];
        this.workerProgress = [];
        this.state = "ready";
    }
}

export class PreviewController
{
    scheduledRender: number;
    state: "ready" | "rendering" = "ready";
    worker = new Worker(RenderWorkerScript);

    render(code: string, option: RenderOption, complete: (result: RenderResult) => void)
    {
        if (this.state != "ready")
            return;
        if (this.scheduledRender)
            clearTimeout(this.scheduledRender);
        this.scheduledRender = setTimeout(() =>
        {
            this.state = "rendering";
            this.scheduledRender = 0;
            this.worker.onmessage = (e) =>
            {
                complete(e.data as RenderResult);
            };
            this.worker.postMessage(<RenderCommand>{
                code: code,
                options: option,
                renderType: 'preview'
            });
        }, 500) as any;
    }
}