(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// jshint esnext: true

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = (function () {
    function Map(game) {
        _classCallCheck(this, Map);

        this.game = game;
    }

    _createClass(Map, [{
        key: "preload",
        value: function preload() {
            var _this = this;

            this.assets.forEach(function (asset) {
                _this.game.load[asset[0]](asset[1], asset[2]);
            });
        }
    }]);

    return Map;
})();

exports["default"] = Map;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
// jshint esnext: true

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Map2 = require('../Map');

var _Map3 = _interopRequireDefault(_Map2);

var DefaultMap = (function (_Map) {
    _inherits(DefaultMap, _Map);

    function DefaultMap(game) {
        _classCallCheck(this, DefaultMap);

        _get(Object.getPrototypeOf(DefaultMap.prototype), 'constructor', this).call(this, game);

        this.assets = [['image', 'stage_1', 'asset/images/stage_1_shitty.png']];
    }

    _createClass(DefaultMap, [{
        key: 'create',
        value: function create() {
            this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'stage_1');
        }
    }]);

    return DefaultMap;
})(_Map3['default']);

exports['default'] = DefaultMap;
;
module.exports = exports['default'];

},{"../Map":1}],3:[function(require,module,exports){
// jshint esnext: true

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _MapsDefault = require('../Maps/default');

var _MapsDefault2 = _interopRequireDefault(_MapsDefault);

var _UI = require('../UI');

var _UI2 = _interopRequireDefault(_UI);

// set Game function prototype

var Game = (function () {
    function Game(game) {
        _classCallCheck(this, Game);
    }

    _createClass(Game, [{
        key: 'init',
        value: function init() {
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

            this.map = new _MapsDefault2['default'](this);
            this.ui = new _UI2['default'](this);
        }
    }, {
        key: 'preload',
        value: function preload() {
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
    }, {
        key: 'gameResized',
        value: function gameResized(width, height) {}
    }, {
        key: 'create',
        value: function create() {
            // Things in here only happen when starting the state

            var bgm = this.add.audio('bgm_1');
            bgm.loop = true;
            //bgm.play();

            this.map.create();
            this.ui.create();
        }
    }, {
        key: 'update',
        value: function update() {}
    }]);

    return Game;
})();

exports['default'] = Game;
module.exports = exports['default'];

// This could be handy if you need to do any extra processing if the
// game resizes. A resize could happen if for example swapping
// orientation on a device or resizing the browser window. Note that
// this callback is only really useful if you use a ScaleMode of RESIZE
// and place it inside your main game state.

},{"../Maps/default":2,"../UI":4}],4:[function(require,module,exports){
// jshint esnext: true

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var UI = (function () {
    function UI(game) {
        _classCallCheck(this, UI);

        this.game = game;
    }

    _createClass(UI, [{
        key: 'preload',
        value: function preload() {
            this.game.load.spritesheet('button', 'asset/buttons/button_sprite_sheet.png', 193, 71);
        }
    }, {
        key: 'create',
        value: function create() {
            var button = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.uiButtonClick, this, 2, 1, 0);
        }
    }]);

    return UI;
})();

exports['default'] = UI;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
// jshint esnext: true
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _StatesMainJs = require('./States/main.js');

var _StatesMainJs2 = _interopRequireDefault(_StatesMainJs);

console.clear();

(function () {
    var game = new Phaser.Game(480, 640, Phaser.AUTO, 'game');

    game.state.add('Main', _StatesMainJs2['default']);

    game.state.start('Main');
})();

},{"./States/main.js":3}]},{},[5]);
