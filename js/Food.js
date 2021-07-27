class Food {
	/**
	 * Generate food position in game area
	 */
	constructor() {
		this.x = 20 * Math.floor(Math.random() * 960 / 20);
		this.y = 20 * Math.floor(Math.random() * 600 / 20);
	}
}