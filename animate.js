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
