import { Color } from "./lib.js";
class RenderOption {
    constructor() {
        this.width = 600;
        this.height = 480;
        this.environmentOptions = new EnvironmentOptions();
        this.raytraceOptions = new RaytraceOptions();
        this.antiAlias = true;
        this.renderOrder = RenderOrder.Progressive;
    }
}
var SampleFunctions;
(function (SampleFunctions) {
    SampleFunctions["JitteredSample"] = "JitteredSample";
    SampleFunctions["StratifiedSample"] = "StratifiedSample";
    SampleFunctions["UniformSample"] = "UniformSample";
})(SampleFunctions || (SampleFunctions = {}));
var RenderOrder;
(function (RenderOrder) {
    RenderOrder[RenderOrder["Progressive"] = 0] = "Progressive";
})(RenderOrder || (RenderOrder = {}));
class EnvironmentOptions {
    constructor() {
        this.backgroundColor = new Color(0, 0, 0, 1.0);
        this.ambient = new Color(0, 0, 0, 1.0);
    }
}
class RaytraceOptions {
    constructor() {
        this.sampleFunction = SampleFunctions.JitteredSample;
        this.subDivide = 64;
        this.reflectDepth = 8;
        this.refrectDepth = 8;
        this.hitThreshold = 0.1;
    }
}
class RenderCmd {
    constructor() {
        this.renderOption = null;
        this.buffer = null;
        this.xRange = null;
        this.yRange = null;
    }
}
export { RenderOption, SampleFunctions, EnvironmentOptions, RaytraceOptions };
//# sourceMappingURL=render.js.map