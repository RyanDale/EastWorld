import MapTile from './MapTile'
import Vehicle from '../sprites/Vehicle'

export default class LevelLoader {
    constructor(game) {
        this.game = game;
        this.loadLevel();
    }

    loadLevel() {
        let level = this.game.cache.getJSON('level'),
            scaler = 512;

        this.tiles = [];
        this.vehicles = [];

        _.each(level.tiles, (tileRow, rowIndex) => {
            _.each(tileRow, (tile, colIndex) => {
                let mapTile = new MapTile(this.game, colIndex * scaler, rowIndex * scaler, tile.sprite, null, tile.rotation);
                this.game.add.existing(mapTile);
                this.game.physics.enable(mapTile, Phaser.Physics.ARCADE);

                mapTile.enableCollision();
                this.tiles.push(mapTile);
            });
        });
        let vehicleList = [
            {
                sprite: 'car',
                x: 4212,
                y: 5632,
                rotation: this.game.math.degToRad(270)
            },
            {
                sprite: 'pagani',
                x: 3996,
                y: 5632,
                rotation: this.game.math.degToRad(270)
            },
            {
                sprite: 'hyundai',
                x: 400,
                y: 5632,
                rotation: this.game.math.degToRad(270)
            },
            {
                sprite: 'police_car',
                x: 1150,
                y: 2074,
                rotation: this.game.math.degToRad(270)

            },
            {
                sprite: 'atv',
                x: 620,
                y: 5632,
                rotation: this.game.math.degToRad(270)
            },
        ];
        _.each(vehicleList, config => {
            let vehicle = new Vehicle(this.game, config.x, config.y, config.sprite, null, config.rotation);
            this.game.add.existing(vehicle);
            this.game.physics.enable(vehicle, Phaser.Physics.ARCADE);
            vehicle.body.immovable = true;
            vehicle.bringToTop();
            this.vehicles.push(vehicle);
        });
    }
}
