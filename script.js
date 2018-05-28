import { Color } from "./lib.js";
import { scale, translate, combine, rotate, expand } from "./transform.js";
import { circle, rect, torus, belt, capsule } from "./shape.js";

const $ = (selector) => document.querySelector(selector);
let width, height;
function init()
{
	width = window.innerWidth;
	height = window.innerHeight;
	$("#canvas").width = width;
	$("#canvas").height = height;
}
function main()
{
	let circle1 = translate(scale(circle(), 50), 100, 100);
	let circle2 = translate(scale(circle(),100,200), 200, 200);
	
	let rectangle = translate(
		rotate(
			expand(
				rect(40, 30),
				30),
			Math.PI / 6),
		100,
		100);
	let tor = translate(
		expand(
			torus(40, 30),
			10),	
		300,
		300);
	let graph = translate(
		capsule(50, 10),
		300,
		300
	);
	render(graph, new Color(255, 255, 255, 1), new Color(0, 0, 0, 1));
}

function render(sdf, fColor, bgColor, threshold = 1)
{
	const canvas =$("#canvas");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,width,height);
	let imgData = ctx.getImageData(0,0,width,height);

	for(let y=0; y<height; y++)
	{
		for(let x=0; x<width; x++)
		{
			let d = sdf(x, y);
			let color = bgColor;
			if(d<=0)
				color = fColor;
			else if (d < threshold)
			{
				var t = d / threshold;
				color = Color.blend(bgColor, fColor, 1 - t);
			}	
			
			drawPixel(imgData,x,y,width,height,color);
		}
	}
	//alert(imgData.data.length);
	ctx.putImageData(imgData,0,0);
	/*$("#root").innerHTML="";
	for(let i=0;i<100;i++)
		$("#root").innerText+=imgData.data[i];
	*/
}
function drawPixel(imgData, x, y, width, height, color)
{
	//alert(x);
	let idx = y * width * 4 + x * 4;
	imgData.data[idx] = color.red;
	imgData.data[idx + 1] = color.green;
	imgData.data[idx + 2] = color.blue;
	imgData.data[idx + 3] = Math.floor(color.alpha * 255);
}
function update(delay)
{
	requestAnimationFrame(update);
	main(delay / 1000);
}	
window.onload=()=>
{
	try
	{
		init();
		main();
		//requestAnimationFrame(update);
	}
	catch(ex)
	{
		console.error(ex.stack);
		//alert(ex.message);
	}
};