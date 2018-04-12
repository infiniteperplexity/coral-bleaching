let series = [1, 2, 3, 4, 5, 16];
let sorted = series.sort((a,b)=>a-b);
let smin = series[0];
let smax = series[series.length-1];
let srange = smax-smin;
const CMAX = 255;
let cstep = srange/255;
let colormap = function(temp) {
	let srange = smax - smin;
	const CMAX = 255;
	
}