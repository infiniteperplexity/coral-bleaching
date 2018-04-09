/*
-5 to 40 mapped to 0 to 1






*/


// should show year as well


function animate() {
	Voronoi.init();
	let hues = 256;
	let steps = 4;
	let r = hues;
	let g = 0;
	let b = 0;
	let p = 0;
	let period = 0;
	setInterval(()=>{
		BLEACHED = (1/11)+(1/55)*series[period];
		console.log(BLEACHED);
		BLEACHED = Math.max(Math.min(BLEACHED,1),0);
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
		COLOR = "rgb("+(r+(hues-r)*BLEACHED)+","+(g+(hues-g)*BLEACHED)+","+(b+(hues-b)*BLEACHED)+")";
		Voronoi.draw();
		period = (period+1)%series.length;
	},25);
}
