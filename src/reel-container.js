import { Graphics, filters, Container, Sprite } from 'pixi.js'
import { gsap } from 'gsap';

export default class ReelContainer {
	constructor(addToStage, sprites, renderer) {
		this.sprites = sprites;
		this.renderer = renderer;
		this.addToStage = addToStage;
		this.REEL_WIDTH = 250;
		this.SYMBOL_SIZE = 220;
		this.LINE_COUNT = 3;
		this.reelContainer = new Container();
		this.reels = [];

		this.createReels();
		this.createMargins();

		addToStage(this.reelContainer);
	}

	createReels() {
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

	createMargins() {
		const margin = (this.renderer.screen.height - this.SYMBOL_SIZE * 3);

		this.reelContainer.y = 10;
		this.reelContainer.x = Math.round(this.renderer.screen.width / 2 - (this.REEL_WIDTH * 3) / 2);

		const bottom = new Graphics();
		bottom.zIndex = 2;

		bottom.beginFill(0, 1);
		bottom.drawRect(0, this.SYMBOL_SIZE * 3, this.renderer.screen.width, margin);

		this.addToStage(bottom);
	}

	startPlay() {
		this.reels.forEach((reel, index) => {
			const extra = Math.floor(Math.random() * 3);
			const target = reel.container.y - (index + 1) * this.SYMBOL_SIZE * 3;
			const time = 250 + index * 600 + extra * 600;
			gsap.to(reel.container, { y: target, duration: time/1000 });
		})
	}
}
