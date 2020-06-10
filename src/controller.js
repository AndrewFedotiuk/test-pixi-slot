import { Container, Ticker, autoDetectRenderer, UPDATE_PRIORITY } from 'pixi.js'


export default class Controller {
	constructor() {
		this.width = null;
		this.height = null;
		this.running = false;
		this.stage = new Container();
		this.ticker = new Ticker();
		this.stage.sortableChildren = true;

		this.ticker.add(
			this.render.bind(this),
			UPDATE_PRIORITY.LOW
		)
	}

	createRenderer() {
		const options = {
			width: this.width,
			height: this.height
		};

		this.renderer = autoDetectRenderer(options);
		document.getElementById('app').appendChild(this.renderer.view);
		this.renderer.render(this.stage);
	}

	stageAdd(item) {
		this.stage.addChild(item);
		this.renderer.render(this.stage);
	}

	render() {
		this.renderer.render(this.stage)
		// console.log(this.joy.directionData);
	}
}
