import { Graphics, filters, Container, Sprite } from 'pixi.js';
import { backout, lerp, tweenTo } from './utils';

export default class ReelContainer {
	constructor(addToStage, sprites, renderer, ticker) {
		this.sprites = sprites;
		this.renderer = renderer;
		this.addToStage = addToStage;
		this.ticker = ticker;
		this.REEL_WIDTH = 250;
		this.SYMBOL_SIZE = 220;
		this.LINE_COUNT = 3;
		this.reelContainer = new Container();
		this.reels = [];
		this.tweening = [];

		this.createReels();
		this.createMargins();
		this.animationUpdate();
		this.animateTweening();

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

			for (let j = 0; j < 7; j++) {
				const symbol = new Sprite(this.sprites[Math.floor(Math.random() * this.sprites.length)]);

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

	startPlay(reelsComplete) {
		this.reels.forEach((reel, index) => {
			const extra = Math.floor(Math.random() * 3);
			const target = reel.position + 10 + index * 5 + extra;
			const time = 250 + index * 600 + extra * 600;

			const tween = tweenTo(
				reel,
				'position',
				target,
				time,
				backout(0.5),
				null,
				index === this.reels.length - 1 ? reelsComplete : null
			);

			this.tweening.push(tween);
		})
	}

	animationUpdate() {
		this.ticker.add(() => {
			this.reels.forEach(reel => {
				reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
				reel.previousPosition = reel.position;
				reel.symbols.forEach((symbol, index) => {
					const prevY = symbol.y;
					symbol.y = ((reel.position + index) % reel.symbols.length) * this.SYMBOL_SIZE - this.SYMBOL_SIZE;
					if (symbol.y < 0 && prevY > this.SYMBOL_SIZE) {
						symbol.texture = this.sprites[Math.floor(Math.random() * this.sprites.length)];
						symbol.scale.x = symbol.scale.y = Math.min(this.SYMBOL_SIZE / symbol.texture.width, this.SYMBOL_SIZE / symbol.texture.height);
						symbol.x = Math.round((this.SYMBOL_SIZE - symbol.width) / 2);
					}
				})
			})
		});
	}

	animateTweening() {
		this.ticker.add(() => {
			const now = Date.now();
			const remove = [];

			this.tweening.forEach(tween => {
				const phase = Math.min(1, (now - tween.start) / tween.time);

				tween.object[tween.property] = lerp(tween.propertyBeginValue, tween.target, tween.easing(phase));
				if (tween.change) tween.change(tween);

				if (phase === 1) {
					tween.object[tween.property] = tween.target;
					if (tween.complete) tween.complete(tween);
					remove.push(tween);
				}
			})

			remove.forEach((_, index) => {
				this.tweening.splice(this.tweening.indexOf(remove[index]), 1);
			})
		});
	}
}
