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

interface RenderSession
{
    code: string,
    option: RenderOption,
    progress: RenderProgress;
    onProgress?: (result: RenderProgress) => void;
    complete: (result: RenderResult) => void;
}

export class RaytraceRenderController
{
    workers: Worker[] = [];
    workerProgress: number[] = [];
    timer: number;
    state: "rendering" | "ready" = "ready";
    session: RenderSession;
    process(code: string, option: RenderOption, complete: (result: RenderResult) => void, onProgress?: (result: RenderProgress) => void)
    {
        if (this.state != "ready")
            return;
        this.session = {
            code: code,
            option: option,
            complete: complete,
            progress: null,
            onProgress: onProgress
        };
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
                /*onProgress({
                    progress: linq.from(this.workerProgress).sum() / this.workers.length,
                    buffer: mix
                });*/
                if (linq.from(this.workerProgress).sum() == option.thread)
                {
                }
            }
            const startTime = Date.now();
            const timer = () =>
            {
                const spend = Date.now() - startTime;
                const progress = linq.from(this.workerProgress).sum() / this.workers.length;
                const estimate = progress > 0 ? spend / progress - spend : -1;
                const renderProgress = {
                    spend: spend,
                    estimate: estimate,
                    progress: progress,
                    buffer: mix
                };
                if (this.session)
                    this.session.progress = renderProgress;
                if (onProgress)
                    onProgress(renderProgress);
                if (progress >= 1)
                {
                    complete({
                        buffer: mix,
                        progress: 1
                    });
                    this.cleanup();
                }
                    
                if (this.state == "rendering")
                    this.timer = setTimeout(timer, 1000) as any;
            };
            timer();
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
        this.session = null;
        this.state = "ready";
    }

    public abort()
    {
        if (this.state != "rendering")
            return;
        clearTimeout(this.timer);
        this.session.complete({
            progress: 1,
            buffer: this.session.progress.buffer
        });
        this.cleanup();
    }
}


interface PreviewRequest
{
    code: string;
    option: RenderOption;
    complete: (result: RenderResult) => void;
}

export class PreviewController
{
    scheduledRender: number;
    state: "ready" | "rendering" = "ready";
    pending: PreviewRequest;
    worker = new Worker(RenderWorkerScript);

    render(code: string, option: RenderOption, complete: (result: RenderResult) => void)
    {
        if (this.state != "ready")
        {
            this.pending = {
                code: code,
                option: option,
                complete: complete
            };
            return;
        }
        if (this.scheduledRender)
            clearTimeout(this.scheduledRender);
        this.scheduledRender = setTimeout(() =>
        {
            try
            {
                this.state = "rendering";
                this.scheduledRender = 0;
                this.worker.onmessage = (e) =>
                {
                    complete(e.data as RenderResult);
                    this.state = "ready";
                    if (this.pending)
                    {
                        let code = this.pending.code;
                        let option = this.pending.option;
                        let complete = this.pending.complete;
                        setTimeout(() => this.render(code, option, complete));
                        this.pending = null;
                    }
                };
                this.worker.postMessage(<RenderCommand>{
                    code: code,
                    options: option,
                    renderType: 'preview'
                });
            }
            catch (ex)
            {
                console.error(ex.message);
                this.state = "ready";
            }
        }, 500) as any;
    }
}