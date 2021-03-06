import Phaser from 'phaser';
import AI from './AI';
import Human from './Human';

export default class Player extends Human {
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
        this.money = 0;
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

        // TODO: This only changes the sprite size on weapon change. Change this code to run any time there is a change.
        let bodyHeight = this.body.height,
            bodyWidth = this.body.width,
            spriteWidth = this.width,
            spriteHeight = this.height;

        this.body.setSize(bodyWidth, bodyHeight, spriteWidth * 0.5 - bodyWidth * 0.5,
            spriteHeight * 0.5 - bodyHeight * 0.5);
    }

    shootWeapon() {
        if (!this.activeWeapon.name) {
            return;
        }
        this.weapon.fireAngle = this.body.rotation;
        this.weapon.trackSprite(this, 0, 0);
        this.bullet = this.weapon.fire();
    }

    update() {
        if (this.weapon) {
            this.game.physics.arcade.overlap(this.weapon.bullets, _.filter(AI.ai, 'alive'), (enemy, bullet) => {
                bullet.kill();
                enemy.killPlayer();
                this.addScore(100);
            });
        }
    }

    addScore(newScore) {
        this.money += newScore;
        this.game.state.getCurrentState().scoreText.setText(`$${this.money.toFixed(2)}`);
    }
}