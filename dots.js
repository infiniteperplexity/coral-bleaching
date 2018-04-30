const WIDTH = 800;
const HEIGHT = 600;
const DOTS = 512;
const RADIUS = 5;
const RATE = 100;
let COLOR = "red";
let canvas;

let dots = [];
let dot = {
	bleaching: 0,
	health: 1,
	dead: false
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

function draw() {
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.rect(0,0,WIDTH,HEIGHT);
	ctx.fill();
	ctx.fillStyle = COLOR;
	for (let d of dots) {
		ctx.beginPath();
		ctx.arc(d.x,d.y,RADIUS,0,2*Math.PI);
		ctx.fill();
	}
}

let months = [];
let averages = [];
for (let i=0; i<12; i++) {
	months.push([]);
}
for (let i=0; i<series.length; i++) {
	months[i%12].push(series[i]);
}
for (let month of months) {
	let sum = month.reduce((a,b)=>(a+b));
	let len = month.length;
	let avg = sum/len;
	averages.push(avg);
}
let maxavg = averages.reduce((a,b)=>Math.max(a,b));
dhweeks = [0,0];
for (let i=0+2; i<series.length; i++) {
	let month0 = Math.max(0,series[i-2]-maxavg-1);
	let month1 = Math.max(0,series[i-1]-maxavg-1);
	let month2 = Math.max(0,series[i-0]-maxavg-1);
	let dhw = 4*(month0+month1+month2);
	dhweeks.push(dhw);
}

// or should this be "probability of bleaching?"
function dhw2dbleach(dhw) {
	if (dhw>=8.0) {
		// severe bleaching
	} else if (dhw>=4.0) {
		// significant bleaching
	} else if (dhw>=1.0) {
		// thermal stress
	} else {
		// recovery?
	}
	return dbleach;
}

function bleach2dhealth(bleach, health) {
	if (bleaching===1) {
		// death
	} else {
		// slow recovery?
	}
	return dhealth;
}



// should show year as well
function animate() {
	let header = document.getElementById("year");
	init();
	let hues = 256;
	let steps = 4;
	let r = hues;
	let g = 0;
	let b = 0;
	let p = 0;
	let period = 0;
	setInterval(()=>{
		BLEACHED = (1/11)+(1/55)*series[period];
		BLEACHED = Math.max(Math.min(BLEACHED,1),0);
		//BLEACHED = 1;
		p = (p+steps)%(hues*3);
		if (p<hues) {
			r-=steps;
			g+=steps;
		} else if (p<(hues*2)) {
			g-=steps;
			b+=steps;
		} else {
			b-=steps;
			r+=steps;
		}
		COLOR = "rgb("+(r+(hues-r)*BLEACHED).toFixed(0)+","+(g+(hues-g)*BLEACHED).toFixed(0)+","+(b+(hues-b)*BLEACHED).toFixed(0)+")";
		draw();
		period = (period+1)%series.length;
		let year = 1800+days[period]/365.25;
		year = year.toFixed(2);
		header.innerHTML = "Year: " + year;
	},100);
}
