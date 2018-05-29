import { Color } from "./lib.js";
import { scale, translate, union, rotate, expand, subtract, repeat, displace, blend } from "./transform.js";
import { circle, rect, torus, belt, capsule } from "./shape.js";

const $ = (selector) => document.querySelector(selector);
let renderingSDF = () => Number.NaN;
let width, height;
function main(t)
{
	let circle1 = translate(scale(circle(), 50), 100, 100);
	let circle2 = translate(scale(circle(),100,200), 200, 200);
	
	let rectangle = translate(
		rotate(
			expand(
				rect(40, 30),
				30),
			Math.PI / 6),
		130,
		130);
	let tor = translate(
		expand(
			torus(80, 70),
			10),	
		0,
		0);
	let cps = translate(
		capsule(300, 10),
		0,
		0
	);
	let rpt = repeat(
		circle(5),
		40,
		40,
		-20,
		-20
	);
	let bld = blend(cps, tor, 1 / t);
	let graph = blend(rectangle, bld, 1 / t);
	render(graph, new Color(255, 255, 255, 1), new Color(0, 0, 0, 1));
}

/**
 * 
 * @param {SDF} sdf 
 * @param {Color} fColor 
 * @param {Color} bgColor 
 * @param {Number} [threshold] 
 */
function render(sdf, fColor, bgColor, threshold = 1)
{
	renderingSDF = sdf;
	const canvas = $("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, width, height);
	let imgData = ctx.getImageData(0, 0, width, height);

	for (let y = -height / 2; y < height / 2; y++)
	{
		for (let x = -width / 2; x < width / 2; x++)
		{
			let d = sdf(x, y);
			let color = bgColor;
			if (d <= 0)
				color = fColor;
			else if (d < threshold)
			{
				var t = d / threshold;
				color = Color.blend(bgColor, fColor, 1 - t);
			}
			
			drawPixel(imgData, x + width / 2, -y + height / 2, width, height, color);
		}
	}
	ctx.putImageData(imgData,0,0);
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
function drawPixel(imgData, x, y, width, height, color)
{
	//alert(x);
	let idx = (y * width + x) * 4;
	imgData.data[idx] = color.red;
	imgData.data[idx + 1] = color.green;
	imgData.data[idx + 2] = color.blue;
	imgData.data[idx + 3] = Math.floor(color.alpha * 255);
}
let lastFrame = 0;
function update(delay)
{
	requestAnimationFrame(update);
	const dt = delay - lastFrame;
	const fps = Math.floor(1000 / dt);
	$("#fps").innerText = fps;
	lastFrame = delay;
	main(delay / 1000);
}	
function init()
{
	width = window.innerWidth;
	height = window.innerHeight;
	$("#canvas").width = width;
	$("#canvas").height = height;
	window.onmousemove = (e) =>
	{
		let x = Math.floor(e.clientX - width / 2);
		let y = Math.floor(-(e.clientY - height / 2));
		$("#mouse-pos").innerText = `(${x}, ${y})`;
		$("#sdf-value").innerText = renderingSDF(x, y);
	}
}
window.onload=()=>
{
	try
	{
		init();
		//main();
		requestAnimationFrame(update);
	}
	catch(ex)
	{
		console.error(ex.stack);
		//alert(ex.message);
	}
};