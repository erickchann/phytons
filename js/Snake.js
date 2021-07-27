class Snake {
	constructor() {
		this.x = w / 2 - 5 * blockW;
		this.y = h / 2;

		this.xspeed = blockW;
		this.yspeed = 0;

		this.length = 6;

		this.head;
		this.body = [];

		this.init();
		this.draw();
	}

	/**
 	 * Generate the snake with initial length (6)
 	 */
	init() {
		for (let i = this.length; i > 0; i--) {
			this.body.push({x: this.x + i * blockW, y: this.y});
		}
		this.head = this.body[0];
	}

	/**
 	 * Update snake direction
 	 */
	dir(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	/**
 	 * Update the snake
 	 */
	update() {
		this.body.unshift({x: this.head.x + this.xspeed, y: this.head.y + this.yspeed});
		this.body.pop();
		this.head = this.body[0];

		this.checkBoundary();
		this.draw();
	}

	/**
 	 * Draw the snake
 	 */
	draw() {
		this.body.forEach((val) => {
			ctx.fillStyle = 'yellow';
			ctx.fillRect(val.x, val.y, blockW, blockH);
		});
	}

	/**
 	 * To handle If phyton head hit board edge, then its head should appear on the opposite edge
 	 */
	checkBoundary() {
		if (this.head.x > 960 - blockW) {
			this.head.x = 0;
		}

		else if (this.head.x < 0) {
			this.head.x = 960;
		}

		if (this.head.y > 600 - blockH) {
			this.head.y = 0;
		}

		else if (this.head.y < 0) {
			this.head.y = 600;
		}
	}
}