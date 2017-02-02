import {Phaser, Sprite} from 'phaser';

export default class Vehicle extends Sprite {
    constructor(game, x, y, asset, frame, rotation, maxSpeed = 500) {
        super(game, x, y, asset, frame);
        this.rotation = rotation;
        this.maxSpeed = maxSpeed;
        this.anchor.setTo(0.5, 0.5);
        this.hasDriver = false;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.set(0.5);
        this.body.maxVelocity.setTo(600, 600);
        this.body.collideWorldBounds = true;
        this.body.immovable = true;
        this.engineStarted = false;
        this.pedalDown = false;
    }

    startVehicle() {
        this.addChild(this.game.player);
        this.body.immovable = false;
        this.engineStarted = true;
        this.game.camera.follow(this);
    }

    exitVehicle() {
        let player = this.game.player;
        this.removeChild(player);
        this.game.add.existing(player);
        this.game.camera.follow(player);
        player.x = this.x + this.width;
        player.y = this.y + this.height;
        this.engineStarted = false;
        this.speed = 0;
        this.body.immovable = true;
    }

    update() {
        this.pedalDown = this.game.cursors.up.isDown;

        if (!this.engineStarted) {
            return;
        }

        if (this.pedalDown) {
            if (this.game.cursors.left.isDown) {
                this.angle -= 4;
            } else if (this.game.cursors.right.isDown) {
                this.angle += 4;
            }
        }

        if (this.pedalDown) {
            this.speed = this.maxSpeed;
        } else {
            if (this.speed > 0) {
                this.speed -= 2;
                this.speed = Math.max(this.speed, 0);
            }
        }

        if (this.speed > 0) {
            this.game.physics.arcade.velocityFromRotation(this.rotation, this.speed, this.body.velocity);
        }
    }
}
