import { Loader, Texture } from 'pixi.js'
import image1 from './assets/image-1.png'

export default class ImageLoader {
	constructor(onAssetsLoaded) {
		this.loader = new Loader;
		this.loadAssets();

		this.loader.load((loader, resources) => {
			// this.sprites.push(new Sprite(resources.image1.texture));
			this.sprites = [
				Texture.from(image1),
			]
		});
		this.loader.onComplete.add(onAssetsLoaded);
	}

	loadAssets() {
		this.loader.add('image1', image1)
	}
}
