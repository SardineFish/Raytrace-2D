import { Color } from "./lib.js";

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
	let circle1 = translate(circle(30),100,100);
	let circle2 = translate(scale(circle(50),1,2), 200, 200);
	
	let graph = combine(circle1,circle2);
	render(graph, new Color(255,255,255,1), new Color(0,0,0,1));
}

function render(sdf, fColor, bgColor, threshold)
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
			if(d<0)
				color = fColor;
			
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

window.onload=()=>
{
	try
	{
		init();
		main();
	}
	catch(ex)
	{
		alert(ex.message);
	}
};

function circle(r)
{
	return (x,y) => Math.sqrt(x*x +y*y)-r;
}
function translate(sdf, dx, dy)
{
	return (x,y) => sdf(x-dx, y-dy);
}
function scale(sdf, kx, ky)
{
	return (x,y) => sdf(x/kx, y/ky);
}
function combine(sdf1, sdf2)
{
	return (x,y) => Math.min(sdf1(x,y), sdf2(x,y));
}
