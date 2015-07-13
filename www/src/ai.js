var ai = {
	randomSpawn : function(game) {
		var enemy = game.add.sprite(game.world.randomX, game.world.randomY, 'knight_red');
		game.physics.arcade.enable(enemy);
		enemy.scale.setTo( 100 / enemy.height, 100 / enemy.height);
		enemy.body.enable = true;
		enemy.body.collideWorldBounds = true;
		enemy.health = 100;
		return enemy;
	}
};