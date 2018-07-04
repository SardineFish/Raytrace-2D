import { Color, Range, vec2, Vector4, Material, mapColor, gradient } from "./lib";
import { scale, translate, union, rotate, expand, subtract, repeat, displace, blend, wrapSDF, intersect } from "./transform";
import { circle, rect, torus, belt, capsule } from "./shape";
import { setBound, uniformSample, stratifiedSample, jitteredSample, sample } from "./trace";
import { RenderOption, renderSDF, renderRaytrace } from "./render";
/*type SDFResult = [number, Color];
type SDF = (x: number, y: number) => SDFResult;*/
const $ = (selector) => document.querySelector(selector);
let renderingSDF = (x, y) => NaN;
let width, height;
window.wkr = new Worker("./build/renderWorker.js");
wkr.onmessage = (e) => {
	console.log(e);
};
function main(t)
{
	const SubDivide = 64;

	let c = circle(50, new Material( new Color(255, 255, 252, 1.0)));
	let c2 = translate(circle(50, new Material(new Color(0, 255, 255, 1.0))), 50, 0);
	let c3 = translate(circle(10, new Material(new Color(255, 255, 0, 1))), 70, 0);
	let rec = translate(rect(50, 50, new Material(new Color(255, 0, 0, 1.0))), -0, -200);
	let graph =
		union(
			union(
				subtract(c, c2),
				rec),
			c3);
	let g = union(
		c,
		translate(circle(50, new Material(new Color(255, 0, 0, 1.0))), 50, 0)
	);
	console.log(graph.toString());
	renderingSDF = graph;
	let renderOption = new RenderOption();
	renderOption.environmentOptions.backgroundColor = new Color(255, 128, 180, 1.0);
	renderSDF(graph, renderOption, $("#canvas"));
	renderRaytrace(graph, renderOption, $("#canvas"));
	return;
	visibleRender((x, y) =>
	{
		/*let [dx, dy] = gradient(graph,x,y,0.1);
		return new Color(127 + dx * 128, 127 + dy * 128, 0, 1);*/
		/*let color = jitteredSample(graph, vec2(x, y), 0.1, SubDivide);
		return mapColor(color, 1 / SubDivide);*/
		return sample(graph, vec2(x, y), jitteredSample, 0.1, SubDivide);
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
	console.log(new Date());
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
		else
		{
			console.log(new Date());
		}
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

export {
	render,
	RenderingCallback,
	customRender,
	mapColor,
	visibleRender
};

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
	}
	setBound(new Range(-width / 2, width / 2), new Range(-height / 2, height / 2));
}
window.onload = () => {
	try {
		init();
		main();
		//requestAnimationFrame(update);
	} catch (ex) {
		console.error(ex.stack);
		//alert(ex.message);
	}
};

	
/**
 * @typedef {function(number,number)=>Color} RenderingCallback
 */

	