import { Container, autoDetectRenderer } from 'pixi.js'


export default class Controller {
	constructor() {
		this.width = null;
		this.height = null;
		this.stopCount = 0;
		this.stage = new Container();
		this.stage.sortableChildren = true;
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
}
