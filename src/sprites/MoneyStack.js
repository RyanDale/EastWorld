import { Phaser, Sprite } from 'phaser';

export default class MoneyStack extends Sprite {
    constructor(game, x, y, asset, frame, rotation = 0) {
        super(game, x, y, asset, frame);
        this.rotation = rotation;
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.immovable = true;
        if (!MoneyStack.moneyStacks) {
            MoneyStack.moneyStacks = [];
        }
        MoneyStack.moneyStacks.push(this);
    }

    destroy() {
        this.kill();
    }
}
