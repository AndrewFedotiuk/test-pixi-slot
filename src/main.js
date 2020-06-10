import Controller from './controller';
import ImageLoader from './loader';
import ReelContainer from './reel-container';

export default class App extends Controller {
	constructor() {
		super();
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.createRenderer();

		this.loader = new ImageLoader(this.init.bind(this));
	}

	init() {
		this.createReels();
		this.addEvents();
		this.ticker.start();
	}

	addEvents() {
		const spinButton = document.getElementById('spinBtn');
		spinButton.addEventListener('click', () => this.startPlay());
	}

	startPlay(){
		if (this.running) return;
		this.running = true;

		this.reelsWrapper.startPlay(this.reelsComplete.bind(this));
	}

	reelsComplete(){
		this.running = false;
	}

	createReels() {
		this.reelsWrapper = new ReelContainer(
			this.stageAdd.bind(this),
			this.loader.sprites,
			this.renderer,
			this.ticker
		);
	}
}
