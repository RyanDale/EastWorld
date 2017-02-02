import {Phaser, Sprite} from 'phaser';

export default class Human extends Phaser.Sprite {
    constructor(game, x, y, asset, frame) {
        super(game, x, y, asset, frame);
        this.activeWeapon = null;
        this.activeWeapon = {};
        this.anchor.setTo(0.5, 0.5);
        this.weaponList = [
            'flame',
            'm4',
            'rocket',
            'uzi'
        ];
    }

    loadAnimations() {
        this.animations.add('walking', Phaser.Animation.generateFrameNames('walking_', 1, 4), 8, true);
        this.animations.add('dying', Phaser.Animation.generateFrameNames('dying_', 1, 2), 8, true);
        this.animations.add('rocket', Phaser.Animation.generateFrameNames('rocket_', 1, 5), 8, true);
        this.animations.add('punch', Phaser.Animation.generateFrameNames('punch_', 1, 4), 8, true);
        this.animations.add('uzi', Phaser.Animation.generateFrameNames('uzi_', 1, 5), 8, true);
        this.animations.add('m4', Phaser.Animation.generateFrameNames('m4_', 1, 4), 8, true);
        this.animations.add('flame', Phaser.Animation.generateFrameNames('flame_', 1, 5), 8, true);

        this.animations.add('idle', ['idle'], 8, false);

        this.animations.add('explosion', Phaser.Animation.generateFrameNames('explosion', 1, 36), 8, true);
    }

    startAnimation(animation, repeat = false) {
        switch (animation) {
        case 'walking':
            this.startWalking(repeat);
            break;
        default:
            this.animations.play(animation, 8, repeat);
        }
    }

    startWalking(repeat = false) {
        let activeWeaponName = _.get(this, 'activeWeapon.name');
        if (activeWeaponName) {
            this.animations.play(activeWeaponName, 8, repeat);
        } else {
            this.animations.play('walking', 8, repeat);
        }
    }

    killPlayer() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.startAnimation('dying');
        this.alive = false;
        let bloodSplatter = new Sprite(this.game, 0, 0, `blood${this.game.rnd.integerInRange(1, 3)}`);
        bloodSplatter.anchor.setTo(0.5, 0.5);
        bloodSplatter.angle = this.game.rnd.integerInRange(0, 359);
        this.addChild(bloodSplatter);
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.kill, this);
    }
}
