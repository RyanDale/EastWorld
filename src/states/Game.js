import {Phaser, Point} from 'phaser'
import LevelLoader from '../classes/LevelLoader'
import Player from '../sprites/Player'
import AI from '../sprites/AI'

export default class extends Phaser.State {
    preload() {
        this.game.load.atlas('player_sprite', 'assets/images/player_sprites.png', 'assets/images/player_sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
    }

    create() {
        //this.game.world.scale.setTo(.35);
        const bannerText = 'EastWorld';
        let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.levelLoader = new LevelLoader(this);
        this.world.setBounds(-256, -256, 5120, 5120 + 4096 + 2048 + 1024 + 256);
        this.cursors = this.input.keyboard.createCursorKeys();

        banner.font = 'Roboto';
        banner.padding.set(10, 16);
        banner.fontSize = 40;
        banner.fill = '#77BFA3';
        banner.smoothed = false;
        banner.anchor.setTo(0.5);

        _.times(25, () => {
            let ai = this.game.add.existing(new AI(this.game, 'player_sprite', 'idle'));
            this.physics.arcade.enable(ai);
            ai.movePlayer();
        });

        let playerSprite = new Player(this.game, this.game.world.centerX - 1800, this.game.world.centerY - 1024,
            'player_sprite', 'idle');
        this.game.add.existing(playerSprite);
        this.player = playerSprite;

        this.game.time.advancedTiming = true;

        this.camera.follow(playerSprite);

        let shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        shift.onDown.add(() => this.player.cycleWeapon(), this);
        let enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(() => this.player.shootWeapon(), this);

        this.physics.arcade.enable(this.player);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
    }

    update() {
        this.player.body.velocity.setTo(0, 0);
        this.player.body.angularVelocity = 0;

        if (this.cursors.up.isDown) {
            this.player.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.player.angle, 300));
            this.player.startAnimation('walking');
        }

        if (this.cursors.left.isDown) {
            this.player.body.angularVelocity = -300;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.angularVelocity = 300;
        }
        else {
            this.player.body.angularVelocity = 0;
        }

        this.physics.arcade.collide(this.player, _.filter(this.levelLoader.tiles, 'collide'), () => {}, null, this);
        this.physics.arcade.collide(this.levelLoader.vehicles, _.filter(this.levelLoader.tiles, 'collide'), () => {}, null, this);
        this.physics.arcade.collide(..._.partition(this.levelLoader.vehicles, 'speed'));
        this.physics.arcade.collide(_.filter(AI.ai, 'alive'), _.filter(this.levelLoader.vehicles, 'speed'), ai => {
            ai.killPlayer();
        }, null, this);
        this.physics.arcade.collide(this.player,  _.reject(this.levelLoader.vehicles, 'speed'), (player, vehicle) => {
            vehicle.startVehicle();
            let q = game.input.keyboard.addKey(Phaser.Keyboard.Q);
            q.onDown.add(() => vehicle.exitVehicle(), this);
        }, null, this);
    }

    render() {
        if (__DEV__) {
            this.game.debug.cameraInfo(this.camera, 32, 32);
            this.game.debug.text(this.game.time.fps, 32, 128);
            this.game.debug.body(this.player);
            this.levelLoader.tiles.filter(tile => tile.collide).forEach(tile => this.game.debug.body(tile));
        }
    }
}
