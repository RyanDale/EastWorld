import Phaser from 'phaser'
import Waypoint from './Waypoint'

export default class MapTile extends Phaser.Image {
    constructor(game, x = 0, y = 0, key = null, frame = null, rotation = 0) {
        super(game, x, y, key, frame);
        this.angle = rotation;
        this.pivot.x = 256;
        this.pivot.y = 256;
        if (this.width === 512 && this.height === 512) {
            let offset = 256;
            new Waypoint(x - offset, y - offset);
            new Waypoint(x - offset + this.width, y - offset);
            new Waypoint(x - offset, y - offset + this.height);
            new Waypoint(x - offset + this.width, y - offset + this.height);
        }
    }
}
