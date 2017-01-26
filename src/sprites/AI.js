import {Phaser, Point, Rectangle} from 'phaser'
import Player from './Player'
import Waypoint from '../classes/Waypoint'

export default class AI extends Player {

    constructor(game, asset, frame = null) {
        let position = Waypoint.randomWalkable().position;
        super(game, position.x, position.y, asset, frame);
        this.anchor.setTo(0.5);
        this.generateNewTarget();
    }

    movePlayer() {
        this.game.physics.arcade.moveToXY(this, this.wayPoint.position.x, this.wayPoint.position.y, 100);
        this.startWalking(true);
    }

    /* Go to the way point that's gets you closest to the target */
    findDistance(wayPoints) {
        if (wayPoints.length <= 1) {
            return wayPoints[0];
        }

        let currentWayPoint = wayPoints[0],
            currentDistance = Point.distance(currentWayPoint.position, this.target.position),
            distance;

        _.each(wayPoints, wayPoint => {
            distance = Point.distance(wayPoint.position, this.target.position);
            if (distance < currentDistance) {
                currentDistance = distance;
                currentWayPoint = wayPoint;
            }
        });
        return currentWayPoint;
    }

    /* Find points surrounding the AI */
    findPoints() {
        const spacing = 512;
        let rectangle1 = new Rectangle(this.position.x, this.position.y + spacing, this.width, this.height),
            rectangle2 = new Rectangle(this.position.x + spacing, this.position.y, this.width, this.height),
            rectangle3 = new Rectangle(this.position.x, this.position.y - spacing, this.width, this.height),
            rectangle4 = new Rectangle(this.position.x - spacing, this.position.y, this.width, this.height);
        return _.filter(Waypoint.wayPoints, wayPoint => rectangle1.contains(wayPoint.position.x, wayPoint.position.y) ||
            rectangle2.contains(wayPoint.position.x, wayPoint.position.y) ||
            rectangle3.contains(wayPoint.position.x, wayPoint.position.y) ||
            rectangle4.contains(wayPoint.position.x, wayPoint.position.y));
    }

    generateNewTarget() {
        this.target = Waypoint.randomWalkable();
        this.wayPoint = this.findDistance(this.findPoints());
    }

    update() {
        this.angle = 90 + Math.atan2(this.wayPoint.position.y - this.y, this.wayPoint.position.x - this.x) *
            (180 / Math.PI);

        if (new Rectangle(this.wayPoint.position.x - 4, this.wayPoint.position.y - 4, 8, 8).contains(this.position.x,
                this.position.y)) {
            this.position = _.clone(this.wayPoint.position);
            this.wayPoint = this.findDistance(this.findPoints());
            if (this.position.x == this.target.position.x && this.position.y == this.target.position.y) {
                this.generateNewTarget();
            }
            this.movePlayer();
        }
    }
}
