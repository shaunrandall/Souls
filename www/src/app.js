// jshint esnext: true
console.clear();

import StateMain from './States/main.js'

(function () {
    var game = new Phaser.Game(480, 640, Phaser.AUTO, 'game');
    
    game.state.add('Main', StateMain);
    
    game.state.start('Main');

})();