import { max, min, sqrt, abs, length, clamp } from "./lib.js";


function circle(r)
{
    return (x, y) => Math.sqrt(x * x + y * y) - 1;
}
function rect(w, h)
{
    return (x, y) =>
    {
        const dx = Math.abs(x) - w / 2;
        const dy = Math.abs(y) - h / 2;
        return min(max(dx, dy), 0) + length(max(dx, 0), max(dy, 0));
    };    
}
function torus(rOuter, rInner)
{
    const mid = (rOuter + rInner) / 2;
    const wide = (rOuter - rInner) / 2;
    return (x, y) =>
    {
        const l = length(x, y);
        return abs(l - mid) - wide;
    }
}
function belt(wide)
{
    return (x, y) => y - wide / 2;
}

function capsule(l, radius)
{
    const half = l / 2;
    return (x, y) =>
    {
        const dx = abs(x) - half;
        return length(clamp(dx, 0, abs(dx)), y) - radius;
    }
}

export { circle, rect, torus, belt, capsule };