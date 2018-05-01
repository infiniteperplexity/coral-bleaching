const WIDTH = 800;
const HEIGHT = 600;
const DOTS = 512;
const RADIUS = 5;
const RATE = 100;
const HUES = 256;
let canvas;

let dots = [];
let dot = {
	bleached: 0,
	health: 1,
	dead: false,
	r: HUES-1,
	g: 0,
	b: 0
}
function init() {
	canvas = document.getElementById("canvas");
	canvas.height = HEIGHT;
	canvas.width = WIDTH;
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.rect(0,0,WIDTH,HEIGHT);
	for (let i=0; i<DOTS; i++) {
		let x = Math.floor(Math.random()*WIDTH);
		let y = Math.floor(Math.random()*HEIGHT);
		let d = {...dot, x: x, y: y};
		dots.push(d);
	}
}

function hue(color, bleached) {
	return (color+(HUES-color)*bleached).toFixed(0);
}
function draw() {
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.rect(0,0,WIDTH,HEIGHT);
	ctx.fill();
	for (let d of dots) {
		ctx.beginPath();
		ctx.arc(d.x,d.y,RADIUS,0,2*Math.PI);
		ctx.fillStyle = "rgb("+hue(d.r, d.bleached)+","+hue(d.g, d.bleached)+","+hue(d.b, d.bleached)+")";
		ctx.fill();
	}
}

// or should this be "probability of bleaching?"
// if it's a constant thing, then we need a different constant per dot
// if it's a probabilistic thing, not so much
// even if it's probabilistic, I still need a fade in / out function
// so it sounds like partial bleaching *is* potentially a thing
// which leans towards a "random effects" model
// oh wait, or fixed effects...but let's not do that for now

// make everything per day
function dhw2dbleach(dhw) {
	if (dhw>=8.0) {
		// severe bleaching
		return 0.1; // bleach fully in 10 days
	} else if (dhw>=4.0) {
		// significant bleaching
		return 0.04 // bleach fully in 25 days
	} else if (dhw>=1.0) {
		// thermal stress
		return 0.02 // bleach fully in 50 days
	} else {
		// recovery?
		return -0.02 // recover fully in 50 days
	}
	return dbleach;
}

function bleach2dhealth(bleach) {
	if (bleaching>=0.75) {
		// dying
		return -0.05 // dies in 20 days
	} else {
		// slow recovery?
		return 0.005 // recover fully in 500 days
	}
	return dhealth;
}

function regrowth() {
	return 0.00025 // recover fully in 5000 days
}

function bounds(n) {
	return Math.max(Math.min(n,1),0);
}



// should show year as well
function animate() {
	let header = document.getElementById("year");
	init();
	let steps = 4;
	let r = hues;
	let g = 0;
	let b = 0;
	let p = 0;
	let period = 0;
	setInterval(()=>{
		p = (p+steps)%(HUES*3);
		if (p<hues) {
			r-=steps;
			g+=steps;
		} else if (p<(HUES*2)) {
			g-=steps;
			b+=steps;
		} else {
			b-=steps;
			r+=steps;
		}
		for (let d of dots) {
			d.r = r;
			d.g = g;
			d.b = b;
		} 
		draw();
		period = (period+1)%series.length;
		let gap = (period===0) ? 7 : days[period]-days[period-1]
		let dhw = dhws[period];
		for (let d of dots) {
			if (d.dead===false) {
				d.bleached = bounds(d.bleached+dhw2dbleach(dhw));
				d.health = bounds(d.health+bleachd2dhealth(d.bleached));
				if (d.health===0) {
					d.dead = true;
					d.bleached = 1;
				}
			} else {
				d.bleached = 1;
				d.health = 0;
			}
		} 
		let year = 1800+days[period]/365.25;
		year = year.toFixed(0);
		header.innerHTML = "Year: " + year;
	},RATE);
}
