import { Color, vec2, Matrix3x3, SDF, Vector2 } from "./lib";
import { RenderOption} from "./render";
import * as ace from "../lib/ace-builds";
import { PreviewController, RaytraceRenderController, RenderProgress } from "./render-controller";
import seedrandom from "seedrandom";
require("../lib/ace-builds/src-noconflict/ext-language_tools");

const $ = (selector: string) => <HTMLElement>document.querySelector(selector);

function main()
{

}

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
	return x >= 10 ? x.toString() : "0" + x.toString();
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
			if (raytraceController.state != "rendering")
			{
				previewController.render(code, option, (result) =>
				{
					display(result.buffer, option.viewport.size);
				});
			}
		}
		else if (mode == "raytrace")
		{
			/*let renderer = new Renderer(option);
			var buffer = new Uint8ClampedArray(option.viewport.size.x * option.viewport.size.y * 4);
			//renderer.renderRaytrace(sdf, new Uint8ClampedArray(option.viewport.size.x * option.viewport.size.y * 4));
			
			for (const result of renderer.renderRaytraceIterator(sdf, buffer, seedrandom.alea(Date.now().toString())))
			{
				display(buffer, option.viewport.size);
			}
			renderer = null;
			return;*/
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
		option.antiAlias = config.antiAlias === undefined ? true : config.antiAlias;
		option.preview = config.preview === undefined ? true : config.preview;
		option.thread = config.thread || 4;
		
	}
	config({} as any);
	eval(code);
}
async function init()
{
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
}
window.onload = () =>
{
	init();
	main();
};

	
/**
 * @typedef {function(number,number)=>Color} RenderingCallback
 */

	