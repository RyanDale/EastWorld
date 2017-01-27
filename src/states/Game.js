import {Phaser, Point} from 'phaser'
import LevelLoader from '../classes/LevelLoader'
import Player from '../sprites/Player'
import AI from '../sprites/AI'

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
        //this.game.world.scale.setTo(.35);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        _.times(25, () => {
            let ai = this.game.add.existing(new AI(this.game, 'player_sprite', 'idle'));
            this.physics.arcade.enable(ai);
            ai.movePlayer();
        });

        let playerSprite = new Player(this.game, this.game.world.centerX, this.game.world.centerY - 2048,
            'player_sprite', 'idle');
        this.game.add.existing(playerSprite);
        this.player = playerSprite;

        this.game.time.advancedTiming = true;

        this.camera.follow(playerSprite);

        let shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        shift.onDown.add(() => this.player.cycleWeapon(), this);
        let enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(() => this.player.shootWeapon(), this);

        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.enable(this.player);


    }

    update() {
        this.player.body.setZeroVelocity();

        if (this.cursors.up.isDown) {
            this.player.body.moveForward(300);
            this.player.startAnimation('walking');
        }
        else if (this.cursors.down.isDown) {
            this.player.body.moveBackward(300);
            this.player.startAnimation('walking');
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
            this.game.debug.text(this.game.time.fps, 32, 128)
        }
    }
}
