// jshint esnext: true

export default class UI {
    constructor (game) {
        this.game = game;
    }
    
    preload () {
        this.game.load.spritesheet('button', 'asset/buttons/button_sprite_sheet.png', 193, 71);
    }
    
    create () {
        let button = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.uiButtonClick, this, 2, 1, 0);
    }
}