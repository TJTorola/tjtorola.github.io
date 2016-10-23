const toRad = num => {
	return 2 * Math.PI * (num / 360);
}

const RADIUS = 300;
const PERIOD = (1000 * 60 * 1);
const INTERVAL = 10;

class Canvas {
	constructor() {
		this.canvas = document.querySelector('canvas');
		this.canvas.width = document.body.clientWidth;
		this.canvas.height = document.body.clientHeight;
		this.center = [this.canvas.width / 2, this.canvas.height / 2];
		this.ctx = this.canvas.getContext('2d');
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.strokeStyle = "#FFFFFF";
		this.ctx.font = '40pt Share Tech Mono';
		this.ctx.textAlign = 'center';
		// this.rotateCtx(270);
	}

	rotateCtx(deg) {
		this.ctx.translate(...this.center);
		this.ctx.rotate(toRad(deg));
		this.ctx.translate(-this.center[0], -this.center[1]);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawCirc(deg) {
		deg %= 360;
		deg -= 90;
		this.ctx.beginPath();
		this.ctx.arc(...this.center, RADIUS, toRad(-90), toRad(deg));
		this.ctx.stroke();
	}

	drawTicks(deg) {
		let total = 0;
		let tickStart = this.center[1] - RADIUS - 10;
		let tickStop = tickStart - 20

		do {
			this.rotateCtx(total);
			this.ctx.beginPath();
			this.ctx.moveTo(this.center[0], tickStart);
			this.ctx.lineTo(this.center[0], tickStop);
			this.ctx.stroke();
			this.rotateCtx(-total);
			total += deg;
		} while (total < 360)


	}

	drawText(text) {
		this.ctx.fillText(text, ...this.center);
	}
}

class Timer {
	constructor() {
		this.canvas = new Canvas();
		this.started = 0;
		this.from = 0;
	}

	start() {
		this.started = Date.now() - this.from;
		this.from = 0;
		this.interval = setInterval(this.render.bind(this), INTERVAL);
	}

	stop() {
		this.from = this.diff()
		clearInterval(this.interval);
	}

	diff() {
		return Date.now() - this.started;
	}

	diffDegs() {
		return (this.diff() / PERIOD) * 360;
	}

	diffStr() {
		let diff = this.diff();
		diff = Math.floor(diff / 10);
		let decisecs = `0${diff % 100}`;
		diff = Math.floor(diff / 100);
		let secs = `0${diff % 60}`;
		diff = Math.floor(diff / 60);
		let mins = `00${diff}`;

		return `${mins.slice(-2)}:${secs.slice(-2)}.${decisecs.slice(-2)}`;
	}

	render() {
		this.canvas.clear();
		this.canvas.drawText(this.diffStr());
		this.canvas.drawCirc(this.diffDegs());
		this.canvas.drawTicks(10);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	window.timer = new Timer();
	window.timer.start();
});