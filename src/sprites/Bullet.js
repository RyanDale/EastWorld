import Phaser from 'phaser'

export default class Bullet extends Phaser.Sprite {

  constructor (game, x, y, asset, rotation, speed = 500) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game.physics.p2.enable(this);
    this.body.rotation = rotation;
    this.speed = speed;
    this.body.setZeroVelocity();
  }
}

