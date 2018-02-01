'use strict';
const DEFAULT_CANVAS_WIDTH = 600;
const DEFAULT_CANVAS_HEIGHT = 600;
const DEFAULT_CANVAS_BGCOLOR = '#cecece';
const DEFAULT_CANVAS_BORDER = '1px solid #000';
const SIZE_OF_SQUARE = 20;
const GRID_LINE_WIDTH = 2;
const GRID_LINE_COLOR = 'rgba(255, 0, 0, 0.5)';
const DEFAULT_SNAKE_COLOR = 'darkgreen';
const ONE_SECOND = 1000;
const FPS = 6;
const KEY_CODE_ARROW_RIGHT = 39;
const KEY_CODE_ARROW_LEFT = 37;
const KEY_CODE_ARROW_BOTTOM =40 ;
const KEY_CODE_ARROW_TOP = 38;

class Snake {
	constructor(props) {
		this.defaultProps = {
			width: DEFAULT_CANVAS_WIDTH,
			height: DEFAULT_CANVAS_HEIGHT,
			bgColor: DEFAULT_CANVAS_BGCOLOR,
			border: DEFAULT_CANVAS_BORDER,
			sizeSquare: SIZE_OF_SQUARE,
			lineWidth: GRID_LINE_WIDTH,
			lineColor: GRID_LINE_COLOR,
			snakeColor: DEFAULT_SNAKE_COLOR,
			fps: FPS,
		};
		this.props = Object.assign(this.defaultProps, props);
		this.axisX = [];
		this.axisY = [];
		this.ctx;
		this.snakeSize = 0;
		this.snake = {
			position: [],
			direction: 'top',
		};
		this.game = false;
	}

	prepareCanvas() {
		let width = this.props.width;
		let height = this.props.height;
		let step = this.props.sizeSquare - this.props.lineWidth;
		let remainW = width % step;
		let remainH = height % step;

		if (remainW !== 0) {
			width += this.props.sizeSquare - remainW;
			this.props.width = width;
		}
		if (remainH !== 0) {
			height += this.props.sizeSquare - remainH;
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
		ctx.fillStyle = this.props.lineColor;
		for (let i = 0; i < this.axisX.length; i++) {
			ctx.fillRect(this.axisX[i], lineStartCoordinate, this.props.lineWidth, height);
		}
		for (let j = 0; j < this.axisY.length; j++) {
			ctx.fillRect(lineStartCoordinate, this.axisY[j], width, this.props.lineWidth);
		}
	}

	createCoordinates() {
		let lengthX = this.props.width - 1;
		let lengthY = this.props.height - 1;
		let step = this.props.sizeSquare - this.props.lineWidth;
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
			this.snake.position.push(xy);
		}
	}

	drawSnake() {
		const size = this.snakeSize - this.props.lineWidth;
		const ctx = this.ctx;
		ctx.fillStyle = this.props.snakeColor;
		this.snake.position.forEach(item => {
			let x = item[ 0 ] + this.props.lineWidth;
			let y = item[ 1 ] + this.props.lineWidth;
			ctx.fillRect(x, y, size, size);
		});
	}

	snakeOneStep() {
		let direction = this.snake.direction;
		const snakeHeadIndex = this.snake.position.length - 1;
		const snakeHead = this.snake.position[ snakeHeadIndex ];
		let xPositionIndex = this.axisX.indexOf(snakeHead[ 0 ]);
		let yPositionIndex = this.axisY.indexOf(snakeHead[ 1 ]);
		let newXY = [];
		switch (direction) { 
			case 'right':
				xPositionIndex++;
				break;
			case 'left':
				xPositionIndex--;
				break;
			case 'top':
				yPositionIndex--;
				break;
			case 'bottom':
				yPositionIndex++;
				break;
			default:
				break;
		}
		let x = this.axisX[ xPositionIndex ];
		let y = this.axisY[ yPositionIndex ];
		newXY.push(x);
		newXY.push(y);
		this.snake.position.push(newXY);
		this.snake.position.shift();

	}

	gameUpdate() {
		this.snakeOneStep();
		this.clear();
		this.drawSnake();
	}

	clear() {
		this.ctx.clearRect(0, 0, this.props.width, this.props.height);
		this.drawGrid();
	}

	randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		rand = Math.round(rand);
		return rand;
	}
}

let snake = new Snake();
snake.init();

gameStart();

function gameStart() {
	snake.gameUpdate();
	snake.game = setTimeout(() => {
		requestAnimationFrame(gameStart);
	}, ONE_SECOND / snake.props.fps);
}

let btn = document.getElementById('btn');
btn.addEventListener('click', () => {
	clearTimeout(snake.game);
});

document.addEventListener('keydown', (event) => {
	switch (event.keyCode) {
		case KEY_CODE_ARROW_RIGHT:
			snake.snake.direction = snake.snake.direction !== 'left' ? 'right' : 'left';
			break;
		case KEY_CODE_ARROW_LEFT:
			snake.snake.direction = snake.snake.direction !== 'right' ? 'left' : 'right';
			break;
		case KEY_CODE_ARROW_TOP:
			snake.snake.direction = snake.snake.direction !== 'bottom' ? 'top' : 'bottom';
			break;
		case KEY_CODE_ARROW_BOTTOM:
			snake.snake.direction = snake.snake.direction !== 'top' ? 'bottom' : 'top';
			break;
		default:
			break;
	}
});




