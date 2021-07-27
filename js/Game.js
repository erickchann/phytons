class Game {
	constructor() {
		this.score = 6;

		this.snake;
		this.food = [];

		this.dir = 'right';

		this.drawBg();
		this.init();
		this.listener();
	}

	/**
 	 * Initialization the Snake and Food
 	 */
	init() {
		this.snake = new Snake();

		for (let i = 0; i < 3; i++) {
			this.food.push(new Food());
		}
	}

	/**
 	 * Update the game
 	 */
	update() {
		this.checkLose();
		this.eat();
		this.snake.update();
		this.drawFood();
	}

	/**
 	 * Draw the Food
 	 */
	drawFood() {
		this.food.forEach((val) => {
			ctx.fillStyle = 'red';
			ctx.fillRect(val.x, val.y, blockW, blockH);
		});
	}

	/**
 	 * Check whether snake eat the pellet, if yes snake will get longger and pellet will dissapear
 	 */
	eat() {
		this.food.forEach((val, i) => {
			if (this.snake.head.x == val.x && this.snake.head.y == val.y) {
				this.score++;
				score.innerHTML = `Score: ${this.score}`;
				this.food.splice(i, 1);

				this.snake.body.push({x: this.snake.body[this.snake.body.length - 1].x, y: this.snake.body[this.snake.body.length - 1].y});
			}
		});
	}

	/**
 	 * Check wether snake hit its own tail, if yes game will be stop and show the leaderboard
 	 */
	checkLose() {
		for (let i = 1; i < this.snake.body.length; i++) {
			if (this.snake.head.x == this.snake.body[i].x && this.snake.head.y == this.snake.body[i].y) {
				leaderBoard.push({username: username.value, score: this.score});
				localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));

				this.leaderBoard();
				activeRewind();
				modalOver.style.display = 'flex';
			}
		}
	}

	/**
 	 * Function to handle the game leaderboard
 	 */
	leaderBoard() {
		let leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'));

		// To sort the leaderboard with descending order
		leaderBoard.sort((a, b) => {

            if(b.score != a.score){
                return b.score - a.score;
            }

		});

		let row = ``;
		leaderBoard.forEach((val, i) => {
			row += `<tr>
						<td>${i + 1}</td>
						<td>${val.username}</td>
						<td>${val.score}</td>
					</tr>`;
		});

		table.innerHTML = row;
	}

	/**
 	 * Keydown event handler
 	 */
	listener() {
		document.addEventListener('keydown', (e) => {
			// W or ArrowUp
			if (e.keyCode == 87 || e.keyCode == 38) {
				if (this.dir != 'down') {
					this.dir = 'up';
					this.snake.dir(0, -blockH);
				}
			}

			// S or ArrowDown
			else if (e.keyCode == 83 || e.keyCode == 40) {
				if (this.dir != 'up') {
					this.dir = 'down';
					this.snake.dir(0, blockH);
				}
			}

			// D or ArrowRight
			else if (e.keyCode == 68 || e.keyCode == 39) {
				if (this.dir != 'left') {
					this.dir = 'right';
					this.snake.dir(blockW, 0);
				}
			}

			// A or ArrowLeft
			else if (e.keyCode == 65 || e.keyCode == 37) {
				if (this.dir != 'right') {
					this.dir = 'left';
					this.snake.dir(-blockW, 0);
				}
			}

			// Space (to trigger rewind function)
			else if (e.keyCode == 32) {
				activeRewind();
			}
		});
	}

	/**
 	 * Draw stripped background
 	 */
	drawBg() {
		for (let i = 0; i < 30; i++) {
			for(let j = 0; j < 48; j++) {
				if (i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0) {
					ctx.fillStyle = '#0b3058';
				} else {
					ctx.fillStyle = '#081727';
				}
				ctx.fillRect(blockW * j, blockH * i, blockW, blockH);
			}
		}
	}
}