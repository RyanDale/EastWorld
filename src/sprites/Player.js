import Phaser from 'phaser'

export default class Player extends Phaser.Sprite {
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
    }

    startAnimation(animation) {
        switch (animation) {
            case 'walking':
                this.startWalking();
                break;
        }
    }

    startWalking() {
        let activeWeaponName = _.get(this, 'activeWeapon.name');
        if (activeWeaponName) {
            this.animations.play(activeWeaponName, 8, false);
        } else {
            this.animations.play('walking', 8, false);
        }
    }

    switchWeapon(weaponName) {
        this.activeWeapon.name = _.find(this.weaponList, name => name === weaponName);
        this.frame = this.animations.getAnimation(weaponName).frame;
    }

    cycleWeapon() {
        if (_.get(this, 'activeWeapon.name')) {
            let index = _.findIndex(this.weaponList, name => name === this.activeWeapon.name);
            if (index + 1 < this.weaponList.length) {
                this.switchWeapon(this.weaponList[index + 1]);
            } else {
                this.switchWeapon(this.weaponList[0]);
            }
        } else {
            this.switchWeapon(this.weaponList[0]);
        }
    }

    shootWeapon() {
        if (!this.activeWeapon.name) {
            return;
        }
        let weapon = this.game.add.weapon(50, `${this.activeWeapon.name}Bullet`);
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 600;
        weapon.fireRate = 100;
        weapon.bulletCollideWorldBounds = true;
        weapon.bulletAngleOffset = 90;
        weapon.bulletAngleVariance = 5;
        weapon.fireAngle = this.game.math.radToDeg(this.body.rotation) - 90;
        weapon.trackSprite(this, 0, 0);
        weapon.fire();
    }
}
