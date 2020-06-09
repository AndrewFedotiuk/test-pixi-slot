import {Graphics, filters, Container, Sprite} from 'pixi.js'

export default class ReelContainer {
	constructor(addToStage, sprites, renderer) {
		this.sprites = sprites;
		this.renderer = renderer;
		this.addToStage = addToStage;
		this.reels = [];
		this.REEL_WIDTH = 250;
		this.SYMBOL_SIZE = 220;
		this.LINE_COUNT = 3;
		this.reelContainer = new Container();
		this.reels = [];

		this.createReels();
		this.createMargins();

		addToStage(this.reelContainer);
	}

	createReels(){
		for (let i = 0; i < this.LINE_COUNT; i++) {
			const reelWrapper = new Container();
			reelWrapper.x = i * this.REEL_WIDTH;
			this.reelContainer.addChild(reelWrapper);

			const reel = {
				container: reelWrapper,
				symbols: [],
				position: 0,
				previousPosition: 0,
				blur: new filters.BlurFilter(),
			};
			reel.blur.blurX = 0;
			reel.blur.blurY = 0;
			reelWrapper.filters = [reel.blur];

			// Build the symbols
			for (let j = 0; j < 8; j++) {
				const symbol = new Sprite(this.sprites[Math.floor(Math.random() * this.sprites.length)]);
				// Scale the symbol to fit symbol area.
				symbol.y = j * this.SYMBOL_SIZE;
				symbol.scale.x = symbol.scale.y = Math.min(this.SYMBOL_SIZE / symbol.width, this.SYMBOL_SIZE / symbol.height);
				symbol.x = Math.round((this.SYMBOL_SIZE - symbol.width) / 2);
				reel.symbols.push(symbol);
				reelWrapper.addChild(symbol);
			}
			this.reels.push(reel);
		}
	}

	createMargins(){
		const margin = (this.renderer.screen.height - this.SYMBOL_SIZE * 3);

		this.reelContainer.y = 10;
		this.reelContainer.x = 10;

		const bottom = new Graphics();
		bottom.zIndex = 2;

		bottom.beginFill(0, 1);
		bottom.drawRect(0, this.SYMBOL_SIZE * 3, this.renderer.screen.width, margin);

		this.addToStage(bottom);
	}
}
