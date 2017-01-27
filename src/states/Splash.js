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

    // Blood Splatters
    this.load.image('blood1', 'assets/images/blood-splatter/blood1.png');
    this.load.image('blood2', 'assets/images/blood-splatter/blood2.png');
    this.load.image('blood3', 'assets/images/blood-splatter/blood3.png');

    // Bullets
    this.load.image('bomb', 'assets/images/bullets/bomb.png');
    this.load.image('flameBullet', 'assets/images/bullets/flameBullet.png');
    this.load.image('m4Bullet', 'assets/images/bullets/m4Bullet.png');
    this.load.image('rocketBullet', 'assets/images/bullets/rocketBullet.png');
    this.load.image('uziBullet', 'assets/images/bullets/uziBullet.png');

    this.load.image('grassTile', 'assets/images/tiles/Grass.png');
    this.load.image('straightTile', 'assets/images/tiles/straight.png');
    this.load.image('turnTile', 'assets/images/tiles/turn.png');
    this.load.image('helipadTile', 'assets/images/tiles/helipad.png');
    this.load.image('helipadLightTile', 'assets/images/tiles/helipad2.png');
    this.load.image('parkingTile', 'assets/images/tiles/parking.png');
    this.load.image('beachTile', 'assets/images/tiles/beach.png');
    this.load.image('beachCornerTile', 'assets/images/tiles/beachCorner.png');

    this.load.image('officeTile', 'assets/images/tiles/office.png');
    this.load.image('officeTwoTile', 'assets/images/tiles/officeTwo.png');
    this.load.image('threeWayTile', 'assets/images/tiles/threeWay.png');
    this.load.image('fourWayTile', 'assets/images/tiles/fourWay.png');
    this.load.image('schoolTile', 'assets/images/tiles/school.png');
    this.load.image('waterTile', 'assets/images/tiles/water.jpg');
    this.load.image('islandTile', 'assets/images/tiles/island.png');

    this.load.image('houseTile', 'assets/images/tiles/house.png');
    this.load.image('houseTwoTile', 'assets/images/tiles/houseTwo.png');
    this.load.image('houseThreeTile', 'assets/images/tiles/houseThree.png');

    this.load.image('explosion', 'assets/images/explosion_sprites.png');

    // Load explosions
    _.times(36, i => this.load.image(`explosion${(i + 1)}`, `assets/images/explosion/Explosion${(i + 1)}.png`));

    // Load helicopter
    _.times(6, i => this.load.image(`helicopter${(i + 1)}`, `assets/images/helicopter/heli${(i + 1)}.png`));
    game.load.json('level', 'assets/level.json');
  }

  create () {
    this.state.start('Game');
  }

}
