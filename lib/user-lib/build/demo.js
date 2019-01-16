let whiteCircle = material(circle(50), rgb(255, 255, 252));
let blueCircle = material(translate(circle(50), 50, 0), rgb(0, 255, 255));
let yellowCircle = material(translate(circle(10), 70, 0), rgb(255, 255, 0))
let redRect = material(translate(rect(50, 50), -0, -200), rgb(255, 0, 0));
let graph =
    union(
        union(
            subtract(whiteCircle, blueCircle),
            redRect),
        yellowCircle);

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
        // subDivide: 64                    // The amount of rays each pixel. (To get better result, >= 64 for "jittered", >= 256 for "stratified" & "uniform")
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
    // thread: 4,                           // The amount of workers to render ray-trace. It might make the browser crash when it is more than the CPU cores.
    // preview: true,                       // Enable render preview for the graph when typing.
});

render(graph);