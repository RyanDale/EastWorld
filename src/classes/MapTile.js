import Phaser from 'phaser'

export default class MapTile extends Phaser.Image {
    constructor(game, x = 0, y = 0, key = null, frame = null, rotation = 0) {
        super(game, x, y, key, frame);
        this.angle = rotation;
        this.pivot.x = 256;
        this.pivot.y = 256;
    }
}
