import Controller from './controller';
import ImageLoader from './loader';
import ReelContainer from './reel-container';

export default class App extends Controller{
	constructor() {
		super();
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.createRenderer();

		this.loader = new ImageLoader(this.init.bind(this));
	}

	init(){
		console.log(this.loader);
		this.createReels();
	}

	createReels(){
		this.reels = new ReelContainer(this.stageAdd.bind(this), this.loader.sprites, this.renderer);
	}
}
