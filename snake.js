'use strict';
const SIZE_OF_SQUARE = 10;

class Snake {
	constructor(props) {
		this.defaultProps = {
			width: '400px',
			height: '400px',
			bgColor: '#cecece',
			border: '1px solid #000'
		};
		this.props = Object.assign(this.defaultProps, props);
		this.axisX = [];
		this.axisY = [];
		this.ctx;
	}

	prepareCanvas() {
		let width = parseInt(this.props.width, 10);
		let height = parseInt(this.props.height, 10);
		let remainW = width % SIZE_OF_SQUARE;
		let remainH = height % SIZE_OF_SQUARE;

		if (remainW !== 0) {
			width += SIZE_OF_SQUARE - remainW;
			this.props.width = width + 'px';
		}
		if (remainH !== 0) {
			height += SIZE_OF_SQUARE - remainH;
			this.props.height = height + 'px';
		}

		const canvas = document.getElementById('canvas');
		canvas.style.width = this.props.width;
		canvas.style.height = this.props.height;
		canvas.style.backgroundColor = this.props.bgColor;
		canvas.style.border = this.props.border;
		this.ctx = canvas.getContext('2d');
	}

	init() {
		this.prepareCanvas();
		this.createCoordinates();
		this.drawGrid();
	}

	drawGrid() {
		const ctx = this.ctx;
		const height = parseInt(this.props.height, 10);
		const width = parseInt(this.props.width, 10);
		const lineWidth = 1;
		const lineStartCoordinate = 0;
		ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
		for (let i = 0; i < this.axisX.length; i++) {
			ctx.fillRect(this.axisX[i], lineStartCoordinate, lineWidth, height);
		}
		for (let j = 0; j < this.axisY.length; j++) {
			ctx.fillRect(lineStartCoordinate, this.axisY[j], width, lineWidth);
		}
	}

	createCoordinates() {
		let lengthX = parseInt(this.props.width, 10);
		let lengthY = parseInt(this.props.height, 10);
		let step = SIZE_OF_SQUARE - 1;
		for (let i = 1; i <= lengthX; i += step) {
			this.axisX.push(i);
		}
		for (let j = 1; j <= lengthY; j += step) {
			this.axisY.push(j);
		}
		console.log(this.axisX[ 21 ]);
		console.log(this.axisY[21]);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.props.width, this.props.height);
	}
}

let snake = new Snake();
snake.init();

// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
// fillRect(x, y, width, height)
// Рисование заполненного прямоугольника.
// strokeRect(x, y, width, height)
// Рисование прямоугольного контура.
// clearRect(x, y, width, height)
// Очистка  прямоугольной области, делая содержимое совершенно прозрачным.
