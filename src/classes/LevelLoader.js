import MapTile from './MapTile'

export default class LevelLoader {
    constructor(game) {
        this.game = game;
        this.loadLevel();
    }

    loadLevel() {
        let level = this.game.cache.getJSON('level'),
            scaler = 512;

        this.tiles = [];

        _.each(level.tiles, (tileRow, rowIndex) => {
            _.each(tileRow, (tile, colIndex) => {
                let mapTile = new MapTile(this.game, colIndex * scaler, rowIndex * scaler, tile.sprite, null, tile.rotation);
                this.game.add.existing(mapTile);
                this.game.physics.enable(mapTile, Phaser.Physics.ARCADE);

                mapTile.enableCollision();
                this.tiles.push(mapTile);
            });
        });
    }
}
