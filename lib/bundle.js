/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Game = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./game\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var GameView = __webpack_require__(2);
	
	// NOTE: wait for dom content to be loaded
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasElement = document.getElementsByTagName("canvas")[0];
	
	  var context = canvasElement.getContext("2d");
	  var game = new Game();
	  new GameView(game, context).start();
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(game, context) {
	    _classCallCheck(this, GameView);
	
	    this.context = context;
	    this.game = game;
	    // add towers, etc
	  }
	
	  _createClass(GameView, [{
	    key: "bindKeyHandlers",
	    value: function bindKeyHandlers() {
	      var _this = this;
	
	      // const tower = this.tower;
	
	      Object.keys(GameView.MOVES).forEach(function (k) {
	        var move = GameView.MOVES[k];
	        key(k, function () {
	          _this.game.playMove(k);
	        });
	      });
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.bindKeyHandlers();
	      this.lastTime = 0;
	      // start animation
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }, {
	    key: "animate",
	    value: function animate(time) {
	      var timeDelta = time - this.lastTime;
	
	      if (this.game.pause === true) {
	        this.game.draw(this.context);
	      } else {
	        this.game.step(timeDelta);
	        this.game.draw(this.context);
	      }
	
	      this.lastTime = time;
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }]);
	
	  return GameView;
	}();
	
	GameView.MOVES = {
	  "a": [1, 1],
	  "b": [1, 1],
	  "c": [1, 1],
	  "d": [1, 1],
	  "e": [1, 1],
	  "f": [1, 1],
	  "g": [1, 1],
	  "h": [1, 1],
	  "i": [1, 1],
	  "j": [1, 1],
	  "k": [1, 1],
	  "l": [1, 1],
	  "m": [1, 1],
	  "n": [1, 1],
	  "o": [1, 1],
	  "p": [1, 1],
	  "q": [1, 1],
	  "r": [1, 1],
	  "s": [1, 1],
	  "t": [1, 1],
	  "u": [1, 1],
	  "v": [1, 1],
	  "w": [1, 1],
	  "x": [1, 1],
	  "y": [1, 1],
	  "z": [1, 1],
	  "backspace": [1, 1],
	  "enter": [1, 1],
	  "escape": [1, 1]
	};
	
	module.exports = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map