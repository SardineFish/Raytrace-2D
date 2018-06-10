import { plus, scale, vec4, vec2, Range } from "./lib.js";
let BoundX = new Range(-500, 500);
let BoundY = new Range(-500, 500);
function setBound(boundX, boundY) {
    BoundX = boundX;
    BoundY = boundY;
}
function trace(sdf, p, dir, precision) {
    let distance = 0;
    let color;
    dir = dir.normalized;
    do {
        p = plus(p, scale(dir, distance));
        [distance, color] = sdf(p.x, p.y);
        if (!BoundX.inRange(p.x) || !BoundY.inRange(p.y))
            return vec4(0, 0, 0, 1);
    } while (distance > precision);
    return vec4(color.red / 255, color.green / 255, color.blue / 255, color.alpha);
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
export { trace, setBound, uniformSample, stratifiedSample, jitteredSample };
//# sourceMappingURL=trace.js.map