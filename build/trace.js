import { Color, Vector2, plus, scale, vec4, vec2, Range, mapColor, gradient, minus } from "./lib.js";
let BoundX = new Range(-500, 500);
let BoundY = new Range(-500, 500);
function setBound(boundX, boundY) {
    BoundX = boundX;
    BoundY = boundY;
}
function trace(sdf, p, dir, precision) {
    let distance = 0;
    let material;
    dir = dir.normalized;
    do {
        p = plus(p, scale(dir, distance));
        [distance, material] = sdf(p.x, p.y);
        if (!BoundX.inRange(p.x) || !BoundY.inRange(p.y))
            return vec4(0, 0, 0, 1);
    } while (distance > precision);
    return vec4(material.emission.red / 255, material.emission.green / 255, material.emission.blue / 255, material.emission.alpha);
}
/*function antiAlias(sdf: SDF, p: Vector2, colorCallback:Function): Vector4
{
    
}*/
function sample(sdf, p, sampleFunction, precision, subdiv) {
    const antiAliasThreshold = 1;
    let color = mapColor(sampleFunction(sdf, p, precision, subdiv), 1 / subdiv);
    let distance = sdf(p.x, p.y)["0"];
    if (0 <= distance && distance <= antiAliasThreshold) {
        let grad = new Vector2(gradient(sdf, p.x, p.y, 0.1));
        let pN = minus(p, scale(grad.normalized, antiAliasThreshold));
        let colorN = mapColor(sampleFunction(sdf, pN, precision, subdiv), 1 / subdiv);
        return Color.blend(colorN, color, distance / antiAliasThreshold);
    }
    return color;
}
function uniformSample(sdf, p, precision, subdiv) {
    let color = vec4(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++) {
        let rad = Math.PI * 2 * Math.random();
        color = plus(trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}
function stratifiedSample(sdf, p, precision, subdiv) {
    let color = vec4(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++) {
        let rad = Math.PI * 2 * i / subdiv;
        color = plus(trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}
function jitteredSample(sdf, p, precision, subdiv) {
    let color = vec4(0, 0, 0, 1);
    for (let i = 0; i < subdiv; i++) {
        let rad = Math.PI * 2 * (i + Math.random()) / subdiv;
        color = plus(trace(sdf, p, vec2(Math.cos(rad), Math.sin(rad)), precision), color);
    }
    return color;
}
export { trace, setBound, uniformSample, stratifiedSample, jitteredSample, sample };
//# sourceMappingURL=trace.js.map