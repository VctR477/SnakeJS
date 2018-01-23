'use strict';
const SIZE_OF_SQUARE = 4;

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
		this.clear();
		this.createCoordinates();
	}

	drawGrid() {

	}

	createCoordinates() {
		let lengthX = parseInt(this.props.width, 10);
		let lengthY = parseInt(this.props.height, 10);
		for (let i = 1; i <= lengthX; i += 3) {
			this.axisX.push(i);
		}
		for (let j = 1; j <= lengthY; j += 3) {
			this.axisY.push(j);
		}
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
