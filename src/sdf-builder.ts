import { Material, sqrt, min, max, length, abs, clamp, smin, Color } from "./lib";
import { moduleHub } from "./module-hub";
type SDFResult = [number, Material];
type SDF = (x: number, y: number) => SDFResult;
var _force_import = [Material, sqrt, min, max, length, abs, clamp, smin, Color, moduleHub];
function BuildSDF(sdf: SDF, builder: Function, args: any[]): SDF
{
    (sdf as any).recaller = new FunctionRecaller(builder, args);
    return sdf;
}
class FunctionRecaller
{
    funcStr: string;
    args: Array<any>;
    isRecaller = true;
    constructor(func: Function, args: any[])
    {
        this.funcStr = func.toString();
        if (/^(function)\s*([a-zA-Z0-9_$]+)\s*(\(.*\))/.test(this.funcStr))
            this.funcStr = this.funcStr.replace(/^(function)\s*([a-zA-Z0-9_$]+)\s*(\(.*\))/, "$1$3");
        console.log(this.funcStr);
        this.args = args.map(arg => (arg instanceof Function) ? arg.recaller : arg);
    }
    static recall(recaller: FunctionRecaller)
    {
        let args: any[] = recaller.args.map(arg => (arg instanceof FunctionRecaller) ? arg.recall() : arg);
        let func: Function = eval(`(${recaller.funcStr})`);
        return func.call(args);
    }
    recall()
    {
        return FunctionRecaller.recall(this);
    }
}

export
{
    FunctionRecaller,
    BuildSDF
};