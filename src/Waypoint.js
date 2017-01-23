let wayPoints = [];

class WayPoint {
    constructor(x = 0, y = 0) {
        this.position = new Point(x, y);
        if (!_.find(wayPoints, wayPoint => wayPoint.position === this.position)) {
            wayPoints.push(this);
        }
    }

    static random() {
        let i = parseInt(Math.random() * 100 * wayPoints.length);
        return wayPoints[i];
    }
}

export default WayPoint