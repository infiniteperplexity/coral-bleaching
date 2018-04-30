const WIDTH = 800;
const HEIGHT = 600;
const DOTS = 512;
const RADIUS = 5;
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