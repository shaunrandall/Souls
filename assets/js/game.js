var Game = {
	
	preload : function() {
		// Get files ready so its fast, stage_1 is placeholder
		game.load.image('stage_1', './assets/images/stage_1_shitty.png');
	},

	create : function() {
		// Things in here only happen when starting the state

		game.add.tileSprite(0, 0, 800, 600, 'stage_1');
	},

	update : function() {
		//Things in here at about 60 FPS

	}
};