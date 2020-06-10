import { Loader, Texture } from 'pixi.js'
import image1 from './assets/image-1.png'
import image2 from './assets/image-2.png'
import image3 from './assets/image-3.png'
import image4 from './assets/image-4.png'
import image5 from './assets/image-5.png'
import image6 from './assets/image-6.png'
import image7 from './assets/image-7.png'
import image8 from './assets/image-8.png'

export default class ImageLoader {
	constructor(onAssetsLoaded) {
		this.loader = new Loader;
		this.loadAssets();

		this.loader.load((loader, resources) => {
			this.sprites = [
				Texture.from(image1),
				Texture.from(image2),
				Texture.from(image3),
				Texture.from(image4),
				Texture.from(image5),
				Texture.from(image6),
				Texture.from(image7),
				Texture.from(image8),
			]
		});
		this.loader.onComplete.add(onAssetsLoaded);
	}

	loadAssets() {
		this.loader.add('image1', image1)
		this.loader.add('image2', image2)
		this.loader.add('image3', image3)
		this.loader.add('image4', image4)
		this.loader.add('image5', image5)
		this.loader.add('image6', image6)
		this.loader.add('image7', image7)
		this.loader.add('image8', image8)
	}
}
