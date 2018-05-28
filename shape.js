const max = Math.max;
const min = Math.min;
const sqrt = Math.sqrt;
const length = (x, y) => sqrt(x * x + y * y);

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
function torus(rOuter,rInner)
{
    
}
export { circle, rect };