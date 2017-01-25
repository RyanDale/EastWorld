import {Phaser, Point} from 'phaser'

let wayPoints = [];

class WayPoint {
    constructor(x = 0, y = 0) {
        this.position = new Point(x, y);
        let duplicatePoint = point => point.position.x === this.position.x && point.position.y === this.position.y;
        if (!_.find(wayPoints, duplicatePoint)) {
            wayPoints.push(this);
        }
    }

    static random() {
        return _.sample(wayPoints);
    }

    static randomWalkable() {
        // TODO: Rewrite to not use hard coded number.
        return _(wayPoints).filter(wayPoint => wayPoint.position.y <= 5211).sample();
    }
}

export default WayPoint