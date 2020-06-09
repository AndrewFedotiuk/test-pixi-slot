import App from './src/main';
import * as PIXI from 'pixi.js';
window.PIXI = PIXI;

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });

new App;
