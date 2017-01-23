import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import _ from 'lodash';

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png');

    // Blood Splatters
    this.load.image('blood1', 'assets/images/blood-splatter/blood1.png');
    this.load.image('blood2', 'assets/images/blood-splatter/blood2.png');
    this.load.image('blood3', 'assets/images/blood-splatter/blood3.png');

    // Bullets
    this.load.image('bomb', 'assets/images/bullets/bomb.png');
    this.load.image('flame', 'assets/images/bullets/flame.png');
    this.load.image('m4Ammo', 'assets/images/bullets/m4-ammo.png');
    this.load.image('missile', 'assets/images/bullets/missile.png');
    this.load.image('uziBullet', 'assets/images/bullets/uzi-bullet.png');

    // Load explosions
    _.times(36, i => this.load.image(`explosion${(i + 1)}`, `assets/images/explosion/Explosion${(i + 1)}.png`));

    // Load helicopter
    _.times(6, i => this.load.image(`helicopter${(i + 1)}`, `assets/images/helicopter/heli${(i + 1)}.png`));

    this.load.spritesheet('playerPunch', 'assets/images/player/punch.png', 136, 136);
  }

  create () {
    this.state.start('Game');
  }

}
