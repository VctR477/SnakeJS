'use strict';

class Snake {
	constructor(props) { 
		this.defaultProps = {
			width: '400px',
			height: '400px',
			bgColor: '#cecece',
			border: '1px solid #000'
		};
		this.props = Object.assign(this.defaultProps, props);
		this.cnt;
	}

	prepareCanvas() {
		const cvs = document.getElementById('canvas');
		cvs.style.width = this.props.width;
		cvs.style.height = this.props.height;
		cvs.style.backgroundColor = this.props.bgColor;
		cvs.style.border = this.props.border;
		this.cnt = cvs.getContext('2d'); 
	}

	init() {
		this.prepareCanvas();
		console.log();
	}
}

let snake = new Snake({});
snake.init();
