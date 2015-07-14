var player, enemy;

// create BasicGame Class
var Souls = {

};

// create Game function in BasicGame
Souls.Game = function (game) {
};

// set Game function prototype
Souls.Game.prototype = {

    init: function () {
        // set up input max pointers
        this.input.maxPointers = 1;
        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        this.scale.forceOrientation(false, true);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        this.scale.setScreenSize(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();

    },

    preload: function () {
		// Get files ready so its fast, stage_1 is placeholder
		this.load.image('stage_1', 'asset/images/stage_1_shitty.png');
		this.load.image('squirrel', 'asset/images/leaf_squirrel.png');

		// Enemies
		this.load.image('knight_red', 'asset/images/knight_red.jpg');

		// Sounds .ogg will NOT WORK WITH IE
		this.load.audio('bgm_1', 'asset/sounds/forrest_bgm_1.ogg');
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    },

    create: function () {        
		// Things in here only happen when starting the state

		var bgm = this.add.audio('bgm_1');
		bgm.loop = true;
		//bgm.play();
		// Paint the background
		this.add.tileSprite(0, 0, 800, 600, 'stage_1');
		this.physics.startSystem(Phaser.Physics.Arcade);

		// Drop the player in
		player = this.add.sprite(this.world.width / 2, this.world.height / 2, 'squirrel');
		// Give the player Physics
		this.physics.arcade.enable(player);
		// Make the player have 100 height and maintain ratio
		player.scale.setTo( 100 / player.height, 100 / player.height);
		// Make the player move from the center!
		player.anchor.setTo(0.5,0.5);
		player.body.collideWorldBounds = true;
		player.body.enable = true;
		player.canAttack = true;
		player.attackCooldown = 100;
		

		// Spawn First Enemy
		enemy = ai.randomSpawn(this);
	},

	update : function() {
		//Things in here at about 60 FPS
		if(this.physics.arcade.collide(player, enemy) && player.canAttack)
		{
			// Play Attack Animation


			// Deal Damage
			var damage = this.add.text(enemy.x,enemy.y, 10);
			damage.lifespan = 200;
			enemy.health = enemy.health - 10;

			// Attack Cooldown
			player.canAttack = false;
			this.time.events.add(player.attackCooldown, 
									(function() {
										player.canAttack = true;
										}),
									this
								);

			if (enemy.health < 0) { enemy.destroy(); }
		}
		// Look to see if you're clicking something other than yourself
		if (this.input.pointer1.isDownn && !Phaser.Rectangle.contains(player.body, this.input.x, this.input.y))
		{
			// Move!
			this.physics.arcade.moveToPointer(player, 200);
		}
		else if (this.input.mousePointer.isDown &&
                 Phaser.Rectangle.contains(player.body, this.input.x, this.input.y) || 
                 Phaser.Rectangle.contains(player.body, this.input.pointer1.positionUp.x, this.input.pointer1.positionUp.y))
		{
			// Stop moving because you clicked on yourself or got to position
			player.body.velocity.setTo(0, 0);
		}

		// Spawn an enemy if one doesn't exist already
		if (!enemy.exists){
			enemy = ai.randomSpawn(this);
		}
	}
};