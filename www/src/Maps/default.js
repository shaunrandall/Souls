// jshint esnext: true

import Map from '../Map'

export default class DefaultMap extends Map {
    constructor(game) {
        super(game);
        
        this.assets = [
            ['image','stage_1', 'asset/images/stage_1_shitty.png']
        ];
    }
    create() {
        this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'stage_1');
    }
};