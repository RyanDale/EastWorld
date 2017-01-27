import Phaser from 'phaser'
import AI from './AI'
import Human from './Human'

class Player extends Human {
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

        this.animations.add('explosion', Phaser.Animation.generateFrameNames('explosion', 1, 4), 8, true);
    }

    startAnimation(animation) {
        switch (animation) {
            case 'walking':
                this.startWalking();
                break;
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

    switchWeapon(weaponName) {
        this.activeWeapon.name = _.find(this.weaponList, name => name === weaponName);
        this.frame = this.animations.getAnimation(weaponName).frame;
        this.weapon = this.game.add.weapon(-1, `${this.activeWeapon.name}Bullet`);
        this.weapon.physicsBodyType = Phaser.Physics.ARCADE;
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 100;
        this.weapon.bulletCollideWorldBounds = true;
        this.weapon.bulletAngleOffset = 90;
        this.weapon.bulletAngleVariance = 5;
        this.weapon.enableBody = true;

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
        this.weapon.fireAngle = this.game.math.radToDeg(this.body.rotation) - 90;
        this.weapon.trackSprite(this, 0, 0);
        this.bullet = this.weapon.fire();
    }

    update() {
        if (this.weapon) {
            this.game.physics.arcade.overlap(this.weapon.bullets, AI.ai, (enemy, bullet) => {
                let removeEnemy = () => {
                    console.log('enemy', enemy);
                    enemy.kill();
                };
                bullet.kill();
                enemy.killPlayer();
                this.game.time.events.add(Phaser.Timer.SECOND * 5, removeEnemy, this);
            });
        }
    }
}

export default Player;