// jshint esnext: true

export default class Map {
    constructor(game) {
        this.game = game;
    }
    preload() {
        this.assets.forEach(asset => {
            this.game.load[asset[0]](asset[1], asset[2]);
        });
    }
}