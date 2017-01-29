import Phaser from 'phaser'
import Waypoint from './Waypoint'

export default class MapTile extends Phaser.Sprite {
    constructor(game, x = 0, y = 0, key = null, frame = null, rotation = 0) {
        super(game, x, y, key, frame);
        this.game = game;
        this.angle = rotation;
        this.pivot.x = 256;
        this.pivot.y = 256;
        if (this.width === 512 && this.height === 512 && key !== 'waterTile') {
            let offset = 256;
            new Waypoint(x - offset, y - offset);
            new Waypoint(x - offset + this.width, y - offset);
            new Waypoint(x - offset, y - offset + this.height);
            new Waypoint(x - offset + this.width, y - offset + this.height);
        } else if (key) {
            this.collide = true;
        }
    }

    enableCollision() {
        let newWidth = this.width - 128,
            newHeight = this.height - 128;
        if (this.width === 32 && this.height === 32) {
            return;
        }
        this.body.immovable = true;
        if (this.width !== 512 && this.height !== 512) {
            this.body.setSize(newWidth, newHeight, 64, 64);
        }
    }
}
