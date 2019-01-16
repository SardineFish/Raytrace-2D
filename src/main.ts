import { Color, Range, vec2, Vector4, Material, mapColor, gradient, Matrix3x3, SDF, Vector2 } from "./lib";
import { scale, translate, union, rotate, expand, subtract, displace, blend, wrapSDF, intersect } from "./transform";
import { circle, rect, torus, belt, capsule } from "./shape";
import { RenderOption, Renderer, RenderCommand, RenderResult } from "./render";
import * as ace from "../lib/ace-builds";
import { PreviewController, RaytraceRenderController, RenderProgress } from "./render-controller";
require("../lib/ace-builds/src-noconflict/ext-language_tools");
/*type SDFResult = [number, Color];
type SDF = (x: number, y: number) => SDFResult;*/
const $ = (selector: string) => <HTMLElement>document.querySelector(selector);
let renderingSDF = (x: number, y: number) => NaN;
let width: number, height: number;
/*window.wkr = new Worker("./build/renderWorker.js");
wkr.onmessage = (e) => {
	console.log(e);
};*/
/*let testWorker = new Worker("./build/testWorker.js");
testWorker.onmessage = (e) =>
{
	console.log(FunctionRecaller.recall(e.data));
}*/
function main(t?:number)
{
	return;
	const SubDivide = 64;

	let c = circle(50, new Material(new Color(255, 255, 252, 1.0)));
	/*testWorker.postMessage(c.recaller);
	return;*/
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
	/*console.log(graph.toString());
	renderingSDF = graph;
	let renderOption = new RenderOption();
	renderOption.environment.backgroundColor = new Color(255, 128, 180, 1.0);
	renderSDF(graph, renderOption, $("#canvas"));
	renderRaytrace(graph, renderOption, $("#canvas"));*/
/*
	const renderer = new Renderer({
		environment: {
			ambient: new Color(0, 0, 0),
			backgroundColor: new Color(0, 0, 0),
		},
		raytrace: {
			hitThreshold: 0.01,
			reflectDepth: 8,
			refrectDepth: 8,
			sampleFunction: "jittered",
			subDivide: 4
		},
		renderOrder: "progressive",
		viewport: {
			size: vec2(800, 600),
			transform: new Matrix3x3([
				[1, 0, -400 + 1],
				[0, 1, -300 + 1],
				[0, 0, 1]
			])
		},
		antiAlias: true
	})
	var buffer = new Uint8ClampedArray(800 * 600 * 4);
	renderer.renderRaytrace(graph, buffer);
	var imgData = new ImageData(buffer, 800, 600);
	($("#canvas") as HTMLCanvasElement).getContext("2d").putImageData(imgData, 0, 0);
	return;
	/*visibleRender((x, y) =>
	{
		/*let [dx, dy] = gradient(graph,x,y,0.1);
		return new Color(127 + dx * 128, 127 + dy * 128, 0, 1);*/
		/*let color = jitteredSample(graph, vec2(x, y), 0.1, SubDivide);
		return mapColor(color, 1 / SubDivide);/
		return sample(graph, vec2(x, y), jitteredSample, 0.1, SubDivide);
	});*/
}

/*
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
*/
const previewController = new PreviewController();
const raytraceController = new RaytraceRenderController();
function initCanvas(option: RenderOption)
{
	const canvas = $("#canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");
	canvas.width = option.viewport.size.x;
	canvas.height = option.viewport.size.y;
}
function display(buffer: Uint8ClampedArray, size: Vector2)
{
	const canvas = $("#canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");
	canvas.width = size.x;
	canvas.height = size.y;
	ctx.putImageData(new ImageData(buffer, size.x, size.y), 0, 0);
}
function formatNumber(x: number)
{
	return x > 10 ? x.toString() : "0" + x.toString();
}
function formatTime(time: number)
{
	return time > 0
		? `${formatNumber(Math.floor(time / 3600000))}:${formatNumber(Math.floor(time % 3600000 / 60000))}:${formatNumber(Math.floor(time % 60000 / 1000))}`
		: "--:--:--";
		
}
function showProgress(progress: number | RenderProgress)
{
	$("#render-progress").classList.add("show");
	if (typeof (progress) === "number")
		$("#render-progress .progress").style.width = `${progress * 100}%`;
	else 
	{
		$("#render-progress .progress").style.width = `${progress.progress * 100}%`;
		$("#time-spend").innerText = formatTime(progress.spend);
		$("#time-est").innerText = formatTime(progress.estimate);
	}
}
function renderCaller(code: string, mode: "preview" | "raytrace")
{
	const option: RenderOption = {
		environment: {
			ambient: new Color(0, 0, 0),
			backgroundColor: new Color(0, 0, 0),
		},
		raytrace: {
			hitThreshold: 0.01,
			reflectDepth: 8,
			refrectDepth: 8,
			sampleFunction: "jittered",
			subDivide: 4
		},
		renderOrder: "progressive",
		viewport: {
			size: vec2(800, 480),
			transform: new Matrix3x3([
				[1, 0, -400 + 1],
				[0, -1, 240 - 1],
				[0, 0, 1]
			])
		},
		antiAlias: true,
		thread: 4,
		preview: true
	};
	function render(sdf: SDF)
	{
		if (mode == "preview" && option.preview)
		{
			previewController.render(code, option, (result) =>
			{
				display(result.buffer, option.viewport.size);
			});
		}
		else if (mode == "raytrace")
		{
			showProgress(0);
			raytraceController.process(code, option,
				(complete) =>
				{
					display(complete.buffer, option.viewport.size);
					showProgress(complete.progress);
				}, (progress) =>
				{
					showProgress(progress);
					display(progress.buffer, option.viewport.size);
				});
		}
	}
	function config(config: RenderOption)
	{
		if (config.environment)
		{
			option.environment.ambient = config.environment.ambient || new Color(0, 0, 0);
			option.environment.backgroundColor = config.environment.backgroundColor || new Color(0, 0, 0);
		}
		if (config.viewport)
		{
			option.viewport.size = config.viewport.size || vec2(800, 480);
			if (config.viewport.transform)
				option.viewport.transform = Matrix3x3.multipleMatrix(option.viewport.transform, config.viewport.transform);
		}
		if (config.raytrace)
		{
			option.raytrace.hitThreshold = config.raytrace.hitThreshold || 0.01;
			option.raytrace.reflectDepth = config.raytrace.reflectDepth || 8;
			option.raytrace.refrectDepth = config.raytrace.refrectDepth || 8;
			option.raytrace.sampleFunction = config.raytrace.sampleFunction || "jittered";
			option.raytrace.subDivide = config.raytrace.subDivide || 64;
		}
		option.renderOrder = config.renderOrder || "progressive";
		option.antiAlias = config.antiAlias === undefined ? true : option.antiAlias;
		option.preview = config.preview === undefined ? true : option.preview;
		option.thread = config.thread || 4;
		
	}
	config({} as any);
	eval(code);
}
async function init()
{
	width = window.innerWidth;
	height = window.innerHeight;
	window.onmousemove = (e) => {
		let x = Math.floor(e.clientX - width / 2);
		let y = Math.floor(-(e.clientY - height / 2));
		
		/*$("#mouse-pos").innerText = `(${x}, ${y})`;
		$("#sdf-value").innerText = renderingSDF(x, y)["0"];*/
	}

	ace.config.set("basePath", "/lib/ace-builds/src-min-noconflict");
	const editor = ace.edit($("#editor-wrapper"));
	editor.setOptions({
		enableBasicAutocompletion: true,
		enableLiveAutocompletion: true,
		autoScrollEditorIntoView: true,
		hScrollBarAlwaysVisible: true,
		vScrollBarAlwaysVisible: true,
		fontSize: "11pt",
		fontFamily: "consolas"
	});
	editor.setTheme("ace/theme/monokai");
	editor.session.setMode("ace/mode/javascript");
	fetch("/lib/user-lib/build/demo.js")
		.then(response => response.text())
		.then(code =>
		{
			editor.session.getDocument().setValue(code);
			fetch("/lib/user-lib/build/user-lib.js")
				.then((response) => response.text())
				.then((lib) =>
				{
					$("#button-render").addEventListener("click", () =>
					{
						const code = editor.session.getDocument().getValue();
						renderCaller(lib + code, "raytrace");
					});
					$("#button-abort").addEventListener("click", () =>
					{
						raytraceController.abort();
					});
					editor.on("change", (e) =>
					{
						setTimeout(() =>
						{
							const code = editor.session.getDocument().getValue();
							renderCaller(lib + code, "preview");
						});
					});

					var code = editor.session.getDocument().getValue();
					renderCaller(lib + code, "preview");
				});
		});
	

	

	//setBound(new Range(-width / 2, width / 2), new Range(-height / 2, height / 2));
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

	