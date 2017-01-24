import MapTile from './MapTile'

export default class LevelLoader {
    constructor(game) {
        this.game = game;
        this.loadLevel();
    }

    loadLevel() {
        let level = this.game.cache.getJSON('level'),
            scaler = 512;
        _.each(level.tiles, (tileRow, rowIndex) => {
            _.each(tileRow, (tile, colIndex) => {
                let mapTile = new MapTile(this.game, colIndex * scaler, rowIndex * scaler, tile.sprite, null, tile.rotation);
                this.game.add.existing(mapTile);
            });
        });
    }
}
