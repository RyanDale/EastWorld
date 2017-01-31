import {Phaser, Point} from 'phaser'

class WayPoint {
    constructor(x = 0, y = 0) {
        this.position = new Point(x, y);
        let duplicatePoint = point => point.position.x === this.position.x && point.position.y === this.position.y;
        if (!_.find(WayPoint.wayPoints, duplicatePoint)) {
            WayPoint.wayPoints.push(this);
        }
    }

    static randomWalkable() {
        return _.sample(WayPoint.wayPoints);
    }
}

WayPoint.wayPoints = [];

export default WayPoint