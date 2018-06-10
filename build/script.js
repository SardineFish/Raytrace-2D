import { Color, Range, vec2 } from "./lib.js";
import { translate, union, subtract } from "./transform.js";
import { circle, rect } from "./shape.js";
import { setBound, jitteredSample } from "./trace.js";
/*type SDFResult = [number, Color];
type SDF = (x: number, y: number) => SDFResult;*/
const $ = (selector) => document.querySelector(selector);
let renderingSDF = (x, y) => NaN;
let width, height;
function main(t) {
    let c = circle(50, new Color(255, 255, 252, 1.0));
    let c2 = translate(circle(50, new Color(255, 255, 255, 1.0)), 50, 0);
    let rec = translate(rect(50, 50, new Color(128, 0, 0, 1.0)), 100, 100);
    let graph = union(subtract(c, c2), rec);
    renderingSDF = graph;
    visibleRender((x, y) => {
        let color = jitteredSample(graph, vec2(x, y), 0.1, 64);
        return mapColor(color, 1 / 64);
    });
}
/**
 *
 * @param {RenderingCallback} callback
 */
function customRender(callback) {
    const canvas = $("#canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    let imgData = ctx.getImageData(0, 0, width, height);
    for (let y = -height / 2; y < height / 2; y++) {
        for (let x = -width / 2; x < width / 2; x++) {
            let color = callback(x, y);
            drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
        }
    }
    ctx.putImageData(imgData, 0, 0);
}
function visibleRender(callback) {
    const canvas = $("#canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    let imgData = ctx.getImageData(0, 0, width, height);
    let y = -height / 2;
    function update() {
        for (let x = -width / 2; x < width / 2; x++) {
            let color = callback(x, y);
            drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
        }
        ctx.putImageData(imgData, 0, 0);
        y++;
        if (y < height / 2)
            requestAnimationFrame(update);
    }
    update();
}
/**
 *
 * @param {SDF} sdf
 * @param {Color} fColor
 * @param {Color} bgColor
 * @param {Number} [threshold]
 */
function render(sdf, fColor, bgColor, threshold = 1) {
    //renderingSDF = sdf;
    const canvas = $("#canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    let imgData = ctx.getImageData(0, 0, width, height);
    for (let y = -height / 2; y < height / 2; y++) {
        for (let x = -width / 2; x < width / 2; x++) {
            let d = sdf(x, y);
            let color = bgColor;
            if (d <= 0)
                color = fColor;
            else if (d < threshold) {
                var t = d / threshold;
                color = Color.blend(bgColor, fColor, 1 - t);
            }
            drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
        }
    }
    ctx.putImageData(imgData, 0, 0);
}
/**
 *
 * @param {ImageData} imgData
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Color} color
 */
function drawPixel(imgData, x, y, width, height, color) {
    //alert(x);
    let idx = (y * width + x) * 4;
    imgData.data[idx] = color.red;
    imgData.data[idx + 1] = color.green;
    imgData.data[idx + 2] = color.blue;
    imgData.data[idx + 3] = Math.floor(color.alpha * 255);
}
/**
 *
 * @param {Vector4} v
 * @param {number} k
 * @returns {Color}
 */
function mapColor(v, k) {
    return new Color(v.x * k * 255, v.y * k * 255, v.z * k * 255, 1.0);
}
export { render, customRender, mapColor, visibleRender };
let lastFrame = 0;
function update(delay) {
    requestAnimationFrame(update);
    const dt = delay - lastFrame;
    const fps = Math.floor(1000 / dt);
    $("#fps").innerText = fps;
    lastFrame = delay;
    main(delay / 1000);
}
function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    $("#canvas").width = width;
    $("#canvas").height = height;
    window.onmousemove = (e) => {
        let x = Math.floor(e.clientX - width / 2);
        let y = Math.floor(-(e.clientY - height / 2));
        $("#mouse-pos").innerText = `(${x}, ${y})`;
        $("#sdf-value").innerText = renderingSDF(x, y)["0"];
    };
    setBound(new Range(-width / 2, width / 2), new Range(-height / 2, height / 2));
}
window.onload = () => {
    try {
        init();
        main();
        //requestAnimationFrame(update);
    }
    catch (ex) {
        console.error(ex.stack);
        //alert(ex.message);
    }
};
/**
 * @typedef {function(number,number)=>Color} RenderingCallback
 */
//# sourceMappingURL=script.js.map