import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';

import config from './config';

class Game extends Phaser.Game {

    constructor() {
        const docElement = document.documentElement,
            width = docElement.clientWidth,//docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth,
            height = docElement.clientHeight;//docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

        super(width, height, Phaser.CANVAS, 'content', null);

        this.state.add('Boot', BootState, false);
        this.state.add('Splash', SplashState, false);
        this.state.add('Game', GameState, false);

        this.state.start('Boot');
    }
}

window.game = new Game();
