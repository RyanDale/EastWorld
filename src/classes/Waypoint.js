import {Phaser, Point} from 'phaser'

class WayPoint {
    constructor(x = 0, y = 0) {
        this.position = new Point(x, y);
        let duplicatePoint = point => point.position.x === this.position.x && point.position.y === this.position.y;
        if (!_.find(WayPoint.wayPoints, duplicatePoint)) {
            WayPoint.wayPoints.push(this);
        }
    }

    static random() {
        return _.sample(wayPoints);
    }

    static randomWalkable() {
        // TODO: Rewrite to not use hard coded number.
        return _(WayPoint.wayPoints).filter(wayPoint => wayPoint.position.y <= 5211).sample();
    }
}

WayPoint.wayPoints = [];

export default WayPoint