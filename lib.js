class Color
{
	constructor(r, g, b, a)
	{
		this.red = r;
		this.green = r;
		this.blue = b;
		this.alpha = a;
	}
	toString()
	{
		return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
	}
}

export { Color };
