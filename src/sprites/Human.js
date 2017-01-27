import Phaser from 'phaser'

class Human extends Phaser.Sprite {
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
        this.loadAnimations();
    }

    loadAnimations() {
        this.animations.add('walking', Phaser.Animation.generateFrameNames('walking', 1, 4), 8, true);
        this.animations.add('dying', Phaser.Animation.generateFrameNames('dying', 1, 2), 8, true);
        this.animations.add('rocket', Phaser.Animation.generateFrameNames('rocket', 1, 5), 8, true);
        this.animations.add('punch', Phaser.Animation.generateFrameNames('punch', 1, 4), 8, true);
        this.animations.add('uzi', Phaser.Animation.generateFrameNames('uzi', 1, 5), 8, true);
        this.animations.add('m4', Phaser.Animation.generateFrameNames('m4_', 1, 4), 8, true);
        this.animations.add('flame', Phaser.Animation.generateFrameNames('flame', 1, 4), 8, true);

        this.animations.add('walking', Phaser.Animation.generateFrameNames('walking', 1, 4), 8, true);
        this.animations.add('dying', Phaser.Animation.generateFrameNames('dying', 1, 2), 8, true);
        this.animations.add('rocket', Phaser.Animation.generateFrameNames('rocket', 1, 5), 8, true);
        this.animations.add('punch', Phaser.Animation.generateFrameNames('punch', 1, 4), 8, true);
        this.animations.add('uzi', Phaser.Animation.generateFrameNames('uzi', 1, 5), 8, true);
        this.animations.add('m4', Phaser.Animation.generateFrameNames('m4_', 1, 4), 8, true);
        this.animations.add('flame', Phaser.Animation.generateFrameNames('flame', 1, 4), 8, true);

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
    }
}

export default Human;