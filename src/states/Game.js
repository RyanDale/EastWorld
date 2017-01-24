import {Phaser, Point} from 'phaser'
import LevelLoader from '../classes/LevelLoader'

export default class extends Phaser.State {
    preload() {
        this.game.load.atlas('player_sprite', 'assets/images/player_sprites.png', 'assets/images/player_sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
    }

    create() {
        const bannerText = 'Lipsum Text';
        let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText);

        let levelLoader = new LevelLoader(this);
        this.world.setBounds(-256, -256, 5120, 5120 + 4096 + 2048 + 1024);
        this.cursors = this.input.keyboard.createCursorKeys();

        banner.font = 'Roboto';
        banner.padding.set(10, 16);
        banner.fontSize = 40;
        banner.fill = '#77BFA3';
        banner.smoothed = false;
        banner.anchor.setTo(0.5);

        let playerSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player_sprite');
        playerSprite.anchor.setTo(0.5, 0.5);

        playerSprite.animations.add('walking', Phaser.Animation.generateFrameNames('walking', 1, 4), 8, true);
        playerSprite.animations.add('dying', Phaser.Animation.generateFrameNames('dying', 1, 2), 8, true);
        playerSprite.animations.add('rocket', Phaser.Animation.generateFrameNames('rocket', 1, 5), 8, true);
        playerSprite.animations.add('punch', Phaser.Animation.generateFrameNames('punch', 1, 4), 8, true);
        playerSprite.animations.add('uzi', Phaser.Animation.generateFrameNames('uzi', 1, 5), 8, true);
        playerSprite.animations.add('m4', Phaser.Animation.generateFrameNames('m4_', 1, 4), 8, true);
        playerSprite.animations.add('flame', Phaser.Animation.generateFrameNames('flame', 1, 4), 8, true);
        playerSprite.animations.add('idle', ['idle'], 8, false);

        playerSprite.animations.play('idle', 8, false);
        this.camera.follow(playerSprite);

        let enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(() => playerSprite.animations.play('idle', 8, false), this);

        let Q = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        Q.onDown.add(() => playerSprite.animations.play('walking', 8, true), this);

        let W = game.input.keyboard.addKey(Phaser.Keyboard.W);
        W.onDown.add(() => playerSprite.animations.play('dying', 8, false), this);

        let E = game.input.keyboard.addKey(Phaser.Keyboard.E);
        E.onDown.add(() => playerSprite.animations.play('rocket', 8, true), this);

        let R = game.input.keyboard.addKey(Phaser.Keyboard.R);
        R.onDown.add(() => playerSprite.animations.play('punch', 8, false), this);

        let T = game.input.keyboard.addKey(Phaser.Keyboard.T);
        T.onDown.add(() => playerSprite.animations.play('uzi', 8, true), this);

        let Y = game.input.keyboard.addKey(Phaser.Keyboard.Y);
        Y.onDown.add(() => playerSprite.animations.play('m4', 8, true), this);

        let U = game.input.keyboard.addKey(Phaser.Keyboard.U);
        U.onDown.add(() => playerSprite.animations.play('flame', 8, true), this);

        this.physics.startSystem(Phaser.Physics.P2JS);
        playerSprite.events.onAnimationComplete.add(() => playerSprite.animations.play('idle'));
        this.player = playerSprite;
        this.physics.p2.enable(this.player);
    }

    update() {
        this.player.body.setZeroVelocity();

        if (this.cursors.up.isDown) {
            this.player.body.moveForward(300);
            this.player.animations.play('walking', 8, false);
        }
        else if (this.cursors.down.isDown) {
            this.player.body.moveBackward(300);
            this.player.animations.play('walking', 8, false);
        }

        if (this.cursors.left.isDown) {
            this.player.body.rotation -= .05;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.rotation += .05;
        }
    }

    render() {
        if (__DEV__) {
            this.game.debug.cameraInfo(this.camera, 32, 32);
        }
    }
}
