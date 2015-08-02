// jshint esnext: true

import Map from '../Maps/default';
import UI from '../UI';

// set Game function prototype
export default class Game {
    constructor(game){
    
    }
    
    init () {
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

        this.map = new Map(this);
        this.ui = new UI(this);
    }

    preload () {
        this.map.preload(this);
        this.ui.preload(this);
        
		// Get files ready so its fast, stage_1 is placeholder
		this.load.image('stage_1', 'asset/images/stage_1_shitty.png');
		this.load.image('squirrel', 'asset/images/leaf_squirrel.png');

		// Enemies
		this.load.image('knight_red', 'asset/images/knight_red.jpg');

		// Sounds .ogg will NOT WORK WITH IE
		this.load.audio('bgm_1', 'asset/sounds/forrest_bgm_1.ogg');
    }

    gameResized (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

    create () {
		// Things in here only happen when starting the state

		let bgm = this.add.audio('bgm_1');
		bgm.loop = true;
		//bgm.play();
        
        this.map.create();
        this.ui.create();
	}

	update() {
        
	}
}
