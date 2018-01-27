'use strict';
const DEFAULT_CANVAS_WIDTH = 600;
const DEFAULT_CANVAS_HEIGHT = 600;
const DEFAULT_CANVAS_BGCOLOR = '#cecece';
const DEFAULT_CANVAS_BORDER = '1px solid #000';
const SIZE_OF_SQUARE = 30;
const GRID_LINE_WIDTH = 2;
const GRID_LINE_COLOR = 'rgba(255, 0, 0, 0.5)';
const DEFAULT_SNAKE_COLOR = 'darkgreen';

class Snake {
	constructor(props) {
		this.defaultProps = {
			width: DEFAULT_CANVAS_WIDTH,
			height: DEFAULT_CANVAS_HEIGHT,
			bgColor: DEFAULT_CANVAS_BGCOLOR,
			border: DEFAULT_CANVAS_BORDER,
		};
		this.props = Object.assign(this.defaultProps, props);
		this.axisX = [];
		this.axisY = [];
		this.ctx;
		this.snakeSize = 0;
		this.snakeColor = DEFAULT_SNAKE_COLOR;
		this.snakePos = [];
	}

	prepareCanvas() {
		let width = this.props.width;
		let height = this.props.height;
		let step = SIZE_OF_SQUARE - GRID_LINE_WIDTH;
		let remainW = width % step;
		let remainH = height % step;

		if (remainW !== 0) {
			width += SIZE_OF_SQUARE - remainW;
			this.props.width = width;
		}
		if (remainH !== 0) {
			height += SIZE_OF_SQUARE - remainH;
			this.props.height = height;
		}

		const canvas = document.getElementById('canvas');
		
		canvas.width = this.props.width;
		canvas.height = this.props.height;
		canvas.style.backgroundColor = this.props.bgColor;
		canvas.style.border = this.props.border;
		this.ctx = canvas.getContext('2d');
	}

	init() {
		this.prepareCanvas();
		this.createCoordinates();
		this.drawGrid();
		this.createFirstSnakePosition();
		this.drawSnake();
	}

	drawGrid() {
		const ctx = this.ctx;
		const height = this.props.height;
		const width = this.props.width;
		const lineStartCoordinate = 0;
		ctx.fillStyle = GRID_LINE_COLOR;
		for (let i = 0; i < this.axisX.length; i++) {
			ctx.fillRect(this.axisX[i], lineStartCoordinate, GRID_LINE_WIDTH, height);
		}
		for (let j = 0; j < this.axisY.length; j++) {
			ctx.fillRect(lineStartCoordinate, this.axisY[j], width, GRID_LINE_WIDTH);
		}
	}

	createCoordinates() {
		let lengthX = this.props.width - 1;
		let lengthY = this.props.height - 1;
		let step = SIZE_OF_SQUARE - GRID_LINE_WIDTH;
		for (let i = 0; i <= lengthX; i += step) {
			this.axisX.push(i);
		}
		for (let j = 0; j <= lengthY; j += step) {
			this.axisY.push(j);
		}
		this.snakeSize = this.axisX[ 1 ] - this.axisX[ 0 ];
	}

	createFirstSnakePosition() {
		let snakeYPosition = ~~((this.axisY.length / 2) - 1);
		let snakeXPosition = ~~((this.axisX.length - 4) / 2);
		for (let i = 0; i < 4; i++) {
			let xy = [];
			xy.push(this.axisX[ snakeXPosition + i ]);
			xy.push(this.axisY[ snakeYPosition ]);
			this.snakePos.push(xy);
		}
	}

	drawSnake() {
		const size = this.snakeSize - GRID_LINE_WIDTH;
		const ctx = this.ctx;
		ctx.fillStyle = DEFAULT_SNAKE_COLOR;
		this.snakePos.forEach(item => {
			let x = item[ 0 ] + GRID_LINE_WIDTH;
			let y = item[ 1 ] + GRID_LINE_WIDTH;
			ctx.fillRect(x, y, size, size);
		});
	}

	clear() {
		this.ctx.clearRect(0, 0, this.props.width, this.props.height);
	}

	randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		rand = Math.round(rand);
		return rand;
	}
}

let snake = new Snake();
snake.init();
