import {Phaser, Point, Rectangle, Sprite} from 'phaser'

export default class Vehicle extends Sprite {
    constructor(game, x, y, asset, frame, rotation) {
        super(game, x, y, asset, frame, rotation);
        this.anchor.setTo(0.5, 0.5);
    }
}
