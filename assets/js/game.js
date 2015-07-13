var player;

var Game = {
	
	preload : function() {
		// Get files ready so its fast, stage_1 is placeholder
		game.load.image('stage_1', './assets/images/stage_1_shitty.png');
		game.load.image('squirrel', './assets/images/leaf_squirrel.png');

		// Enemies
		game.load.image('knight_red', './assets/images/knight_red.jpg');

		// Sounds .ogg will NOT WORK WITH IE
		game.load.audio('bgm_1', './assets/sounds/forrest_bgm_1.ogg')
	},

	create : function() {
		// Things in here only happen when starting the state

		bgm = game.add.audio('bgm_1');
		bgm.loop = true;
		bgm.play();
		// Paint the background
		game.add.tileSprite(0, 0, 800, 600, 'stage_1');
		game.physics.startSystem(Phaser.Physics.Arcade);

		// Drop the player in
		player = game.add.sprite(game.world.width / 2, game.world.height / 2, 'squirrel');
		// Give the player Physics
		game.physics.arcade.enable(player);
		// Make the player have 100 height and maintain ratio
		player.scale.setTo( 100 / player.height, 100 / player.height);
		// Make the player move from the center!
		player.anchor.setTo(.5,.5);
		player.body.collideWorldBounds = true;
		player.body.enable = true;
		player.canAttack = true;
		player.attackCooldown = 100;
		

		// Spawn First Enemy
		enemy = ai.randomSpawn();
	},

	update : function() {
		//Things in here at about 60 FPS
		if(game.physics.arcade.collide(player, enemy) && player.canAttack)
		{
			// Play Attack Animation


			// Deal Damage
			var damage = game.add.text(enemy.x,enemy.y, 10);
			damage.lifespan = 200;
			enemy.health = enemy.health - 10;

			// Attack Cooldown
			player.canAttack = false;
			game.time.events.add(player.attackCooldown, 
									(function() {
										player.canAttack = true;
										}),
									this
								);

			if (enemy.health < 0) { enemy.destroy() };
		}
		// Look to see if you're clicking something other than yourself
		if (game.input.mousePointer.isDown
			&& !Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)
			)
		{
			// Move!
			game.physics.arcade.moveToPointer(player, 200);
		}
		else if (game.input.mousePointer.isDown
			    && Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)
			    || Phaser.Rectangle.contains(player.body, game.input.mousePointer.positionUp.x, game.input.mousePointer.positionUp.y))
		{
			// Stop moving because you clicked on yourself or got to position
			player.body.velocity.setTo(0, 0);
		}

		// Spawn an enemy if one doesn't exist already
		if (!enemy.exists){
			enemy = ai.randomSpawn();
		}
	}
};