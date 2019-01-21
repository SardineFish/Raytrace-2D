let fib = (x) => x <= 0 ? 0 : x <= 2 ? 1 : fib(x - 1) + fib(x - 2);
let sequence = [0, 1, 2, 3, 4, 5, 6, 7].map(x => fib(x) * 10);
const size = 10;
let center = [vec2(0,0)];
let endPoint = [vec2(0, 0), vec2(size, 0)];
let dir = [vec2(0, 0)];
for (let i = 1; i < sequence.length; i++)
{
    let ang = (i - 1) * Math.PI / 2;
    center[i] = plus(center[i - 1], multi(vec2(Math.round(Math.cos(ang + Math.PI)), Math.round(Math.sin(ang + Math.PI))), fib(i - 2) * size));
    dir[i] = vec2(Math.cos(ang + Math.PI / 4), Math.sin(ang + Math.PI / 4));
    endPoint.push(plus(center[i], multi(vec2(Math.cos(ang + Math.PI / 2), Math.sin(ang + Math.PI / 2)), fib(i) * size)));
}
console.log(dir);
let Cos45 = Math.cos(Math.PI / 4);
function graph(x, y)
{
    
    return Math.min(...sequence.map((n, i) =>
    {
        const dp = minus(vec2(x, y), center[i]);
        if (dot(dp.normalized, dir[i]) < Cos45)
            return Math.min(Math.hypot(x - endPoint[i + 1].x, y - endPoint[i + 1].y), Math.hypot(x - endPoint[i].x, y - endPoint[i].y)) - 0.5;
        return Math.abs(dp.magnitude - n) - 0.5;
    }));
}
graph = material(graph, rgb(255, 255, 255));
const cir = material(translate(circle(20), 0, -20), rgb(0, 0, 0));
graph = union(cir, graph);
config({
    environment: {
        // ambient: rgb(0, 0, 0),           // The ambient color of the environment added to whole image.
        // backgroundColor: rgb(0, 0, 0),   // The backgournd color of the environment, any ray goes out of bound will return this color.
    },
    raytrace: {
        // hitThreshold: 0.01,              // The threshold to determind whether the ray reach the graph surface.
        // reflectDepth: 8,                 // Max reflect times each ray.
        // refrectDepth: 8,                 // Max refract times each ray.
        // sampleFunction: "jittered",      // The algorithm use to sample each pixel with ray-trace, could be "jittered", "stratified", "uniform".
        subDivide: 64 // The amount of rays each pixel. (To get better result, >= 64 for "jittered", >= 256 for "stratified" & "uniform")
    },
    viewport: {
        // size: vec2(800, 480),            // The size of the output image.
        /* transform: new Matrix3x3([       // The transform matrix apply to the position of each pixel.
        	[1, 0, 0],
        	[0, 1, 0],
        	[0, 0, 1],
        ]) */
    },
    // antiAlias: true,                     // Enable the anti-alias.
    thread: 2, // The amount of workers to render ray-trace. Too many workers may cause browser crash due to the memory limit.
    preview: true, // Enable render preview for the graph when typing.
});

render(graph);