class Color
{
	constructor(r, g, b, a)
	{
		this.red = Math.floor(r);
		this.green = Math.floor(r);
		this.blue = Math.floor(b);
		this.alpha = a;
	}
	static add(a,b)
	{
		const t = b.alpha;
		return new Color(
			(1-t)*a.red+t*b.red,
			(1-t)*a.green + t*b.green,
			(1-t)*a.blue + t*b.blue,
			1-(1-a.alpha)*(1-b.alpha)
		);
	}
	/**
	 * 
	 * @param {Color} a 
	 * @param {Color} b 
	 * @param {Number} t 
	 */
	static blend(a, b, t)
	{
		return new Color(
			(1 - t) * a.red + t * b.red,
			(1 - t) * a.green + t * b.green,
			(1 - t) * a.blue + t * b.blue,
			1
		);
	}
	toString()
	{
		return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
	}
	
}
const max = Math.max;
const min = Math.min;
const sqrt = Math.sqrt;
const abs = Math.abs;
const length = (x, y) => sqrt(x * x + y * y);
const clamp = (n, min, max) => n > max ? max : n < min ? min : n;
const smin = (a, b, k) => -Math.log(Math.exp(-k * a) + Math.exp(-k * b)) / k;

export { Color, max, min, sqrt, abs, length, clamp, smin };
