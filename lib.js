class Color
{
	constructor(r, g, b, a)
	{
		this.red = r;
		this.green = r;
		this.blue = b;
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
	toString()
	{
		return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
	}
	
}

export { Color };
