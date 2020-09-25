import {Game} from './modules/game.js';
import {Renderer} from './modules/renderer.js';

const game = new Game();
const renderer = new Renderer(game);

renderer.init();