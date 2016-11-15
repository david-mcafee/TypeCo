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
	
	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(5);
	
	// NOTE: wait for dom content to be loaded
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasElement = document.getElementsByTagName("canvas")[0];
	
	  var context = canvasElement.getContext("2d");
	  var game = new Game();
	  new GameView(game, context).start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Missile = __webpack_require__(2);
	// const Bullet = require('./bullet');
	var Util = __webpack_require__(3);
	var Explosion = __webpack_require__(6);
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.missiles = [];
	    this.addMissile();
	    this.selectedWord = [];
	    this.matchedLetters = [];
	    this.totalPoints = 0;
	    this.tempPoints = 0;
	    this.missileCreationRate = 200;
	    this.currentLevel = 1;
	    this.speed = 1;
	    this.explosions = [];
	  }
	
	  _createClass(Game, [{
	    key: "addMissile",
	    value: function addMissile(options) {
	      this.missiles.push(new Missile({ position: [Game.X_DIMENSION * Math.random(), 0], // zero to always generate at top of the screen
	        game: this,
	        color: "red",
	        word: Game.dictionary[Math.floor(Math.random() * Game.dictionary.length)],
	        radius: 0,
	        speed: this.speed
	      }));
	    }
	  }, {
	    key: "splitMissile",
	    value: function splitMissile(missile) {
	      if (missile) {
	        for (var i = 0; i < missile.word.length; i++) {
	          console.log(missile.word[i]);
	          this.missiles.push(new Missile({
	            position: [missile.position[0] + i * 40, missile.position[1]],
	            game: this,
	            color: 'hsl(' + 360 * Math.random() + ', 100%, 55%)',
	            word: missile.word[i],
	            radius: 0,
	            speed: this.speed / 2
	          }));
	        }
	      }
	    }
	  }, {
	    key: "randomPosition",
	    value: function randomPosition() {
	      return [Game.X_DIMENSION * Math.random(), Game.Y_DIMENSION * Math.random()];
	    }
	  }, {
	    key: "remove",
	    value: function remove(missile) {
	      this.missiles.splice(this.missiles.indexOf(missile), 1);
	    }
	  }, {
	    key: "step",
	    value: function step(delta) {
	      this.moveObjects(delta);
	      //this.checkCollisions;
	    }
	  }, {
	    key: "moveObjects",
	    value: function moveObjects(delta) {
	      this.missiles.forEach(function (object) {
	        object.move(delta);
	      });
	
	      // NOTE: HERE IS WHERE YOU CAN SLOW DOWN SELECTED WORDS
	      if (this.selectedWord.length === 1) {
	        this.selectedWord[0].move(delta / 2);
	      }
	    }
	  }, {
	    key: "createExplosion",
	    value: function createExplosion(thisPosition, time) {
	      // if (Date.now() < time + 3000) {
	      this.explosions.push(new Explosion({
	        position: thisPosition,
	        game: this,
	        radius: 5,
	        time: time
	      }));
	    }
	  }, {
	    key: "draw",
	    value: function draw(context) {
	      // empty the canvas
	      context.clearRect(0, 0, Game.X_DIMENSION, Game.Y_DIMENSION);
	      context.fillStyle = Game.BACKGROUND_COLOR;
	      context.fillRect(0, 0, Game.X_DIMENSION, Game.Y_DIMENSION);
	
	      if (this.totalPoints >= 22500) {
	        this.missileCreationRate = 125;
	        this.currentLevel = 4;
	        setTimeout(function () {
	          console.log("test");
	        }, 10000);
	      } else if (this.totalPoints >= 15000) {
	        this.missileCreationRate = 150;
	        this.currentLevel = 3;
	        setTimeout(function () {
	          console.log("test");
	        }, 10000);
	      } else if (this.totalPoints >= 7500) {
	        this.missileCreationRate = 175;
	        this.currentLevel = 2;
	        setTimeout(function () {
	          console.log("test");
	        }, 10000);
	      } else if (this.totalPoints >= 0) {
	        this.missileCreationRate = 200;
	        this.currentLevel = 1;
	      }
	
	      // GENERATE RANDOM MISSILES AT RATE DEPENDING ON CURRENT LEVEL
	      var randomNumber = Math.floor(Math.random() * this.missileCreationRate);
	      if (randomNumber === 2 || randomNumber == 3) {
	        this.addMissile(context);
	      }
	      // SPLIT MISSILE INTO MULTIPLE MISSILES
	      else if (randomNumber === 4 || randomNumber === 5) {
	          var tempMissile = this.missiles[0];
	          this.missiles.splice(this.missiles[0], 1);
	          this.splitMissile(tempMissile);
	        }
	
	      // DRAW MISSILES
	      this.missiles.forEach(function (object) {
	        object.draw(context);
	      });
	
	      // DRAW SELECTED WORD
	      if (this.selectedWord.length === 1) {
	        // console.log("entered selected word");
	        this.selectedWord[0].draw(context, "white");
	      }
	
	      // DRAW THE SCORES
	      context.font = "18px Emulogic";
	      context.textAlign = "center";
	      context.textBaseline = "middle";
	      context.fillStyle = "white";
	      context.fillText("TOTAL  " + this.totalPoints, 500, 20);
	
	      // TEMP SCORE
	      context.font = "18px Emulogic";
	      context.textAlign = "center";
	      context.textBaseline = "middle";
	      context.fillStyle = "blue";
	      context.fillText("temp  " + this.tempPoints, 250, 20);
	
	      // LEVEL
	      context.font = "18px Emulogic";
	      context.textAlign = "center";
	      context.textBaseline = "middle";
	      context.fillStyle = "green";
	      context.fillText("level " + this.currentLevel, 750, 20);
	
	      context.fillStyle = 'rgba(255, 251, 0, 1)';
	
	      context.fillRect(0, 550, 1000, 100);
	
	      // console.log(this.missiles[0].radius);
	      // COLLISION WITH BOTTOM OF SCREEN
	      for (var i = 0; i < this.missiles.length; i++) {
	        if (this.missiles[i].position[1] + this.missiles[i].radius >= 550) {
	
	          // console.log((this.missiles[i].position[1] + this.missiles[i].radius));
	          this.totalPoints -= this.missiles[i].word.split("").length * 100;
	
	          var explosionPosition = this.missiles[i].position;
	          var explosionTime = Date.now();
	
	          this.createExplosion(explosionPosition, explosionTime);
	
	          // REMOVE MISSILE
	          this.missiles.splice(i, 1);
	        }
	      }
	
	      // SELECTED WORD COLLISION - WORTH MORE POINTS
	      if (this.selectedWord.length > 0) {
	        if (this.selectedWord[0].position[1] + this.selectedWord[0].radius >= 550) {
	          this.totalPoints -= this.selectedWord[0].word.split("").length * 200;
	          this.selectedWord = [];
	        }
	      }
	
	      // DISPLAY THE EXPLOSIONS
	      if (this.explosions.length > 0) {
	        for (var _i = 0; _i < this.explosions.length; _i++) {
	          // if (Date.now < this.explosions[i].time + 4000) {
	          this.explosions[_i].draw(context);
	          // }
	        }
	      }
	    }
	
	    // PLAY THE KEYSTROKE ENTERED
	
	  }, {
	    key: "playMove",
	    value: function playMove(keyEntered) {
	      // IF NO WORD IS CURRENTLY SELECTED
	      if (this.selectedWord.length === 0) {
	        for (var i = 0; i < this.missiles.length; i++) {
	          if (this.selectedWord.length === 0 && this.missiles[i].word.split("")[0] === keyEntered) {
	            // console.log("matchfound");
	            this.selectedWord.push(this.missiles[i]);
	            this.missiles.splice(this.missiles.indexOf(this.missiles[i]), 1);
	            this.selectedWord[0].removeFirstLetter();
	            this.tempPoints += 100;
	          }
	        }
	      }
	      // A WORD HAS ALREADY BEEN SELECTED
	      else {
	          if (keyEntered === this.selectedWord[0].word.split("")[0]) {
	            this.selectedWord[0].removeFirstLetter();
	            this.tempPoints += 100;
	          } else {
	            this.tempPoints -= 100;
	          }
	        }
	
	      // MISSILE DESTROYED
	      if (this.selectedWord[0].word.split("").length === 0) {
	        // CREATE EXPLOSION
	        var explosionPosition = this.selectedWord[0].position;
	        var explosionTime = Date.now();
	        this.createExplosion(explosionPosition, explosionTime);
	
	        this.selectedWord = [];
	        this.totalPoints += this.tempPoints;
	        this.tempPoints = 0;
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	Game.dictionary = ["elephant", "cat", "dog", "canary", "jenna", "the", "of"];
	Game.BACKGROUND_COLOR = "#000000";
	Game.X_DIMENSION = 1000;
	Game.Y_DIMENSION = 650;
	Game.FPS = 32;
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);
	// const Ship = require("./ship");
	// const Tower = require("./tower");
	
	var DEFAULTS = {
	  COLOR: "#505050",
	  RADIUS: 0,
	  SPEED: 4
	};
	
	var Missile = function (_MovingObject) {
	  _inherits(Missile, _MovingObject);
	
	  function Missile() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Missile);
	
	    options.color = options.color || DEFAULTS.COLOR;
	    options.position = options.position || [options.game.randomPosition()];
	    options.radius = options.radius || DEFAULTS.RADIUS;
	    options.velocity = Util.randomVec(options.speed) || Util.randomVec(DEFAULTS.SPEED);
	    options.word = options.word;
	    return _possibleConstructorReturn(this, (Missile.__proto__ || Object.getPrototypeOf(Missile)).call(this, options));
	  }
	
	  // collideWithBottom() {}
	
	
	  return Missile;
	}(MovingObject);
	
	module.exports = Missile;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var Util = {
	  // NOTE: normalize the length of the vector to 1, maintaining direction.
	  dir: function dir(vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	
	  // Find distance between two points.
	  dist: function dist(pos1, pos2) {
	    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	  },
	
	
	  // Find the length of the vector.
	  norm: function norm(vec) {
	    return Util.dist([0, 0], vec);
	  },
	
	  // Return a randomly oriented vector with the given length.
	  randomVec: function randomVec(length) {
	    // const deg = 2 * Math.PI * Math.random();
	    // return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	    var deg = 0;
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	
	
	  // Scale the length of a vector by the given amount.
	  scale: function scale(vec, m) {
	    // return [vec[0] * m, vec[1] * m];
	    return [0 * m, 1 * m];
	  },
	  wrap: function wrap(coord, max) {
	    if (coord < 0) {
	      return max - coord % max;
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  }
	};
	
	module.exports = Util;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = __webpack_require__(3);
	
	var MovingObject = function () {
	  function MovingObject(options) {
	    _classCallCheck(this, MovingObject);
	
	    this.position = options.position;
	    this.velocity = options.velocity;
	    this.radius = options.radius;
	    this.game = options.game;
	    this.color = options.color;
	    this.word = options.word;
	    // this.isWrappable = true;
	
	    this.removeFirstLetter = this.removeFirstLetter.bind(this);
	  }
	
	  _createClass(MovingObject, [{
	    key: "removeFirstLetter",
	    value: function removeFirstLetter() {
	      this.word = this.word.slice(1, this.word.length);
	    }
	  }, {
	    key: "draw",
	    value: function draw(context, newColor) {
	      context.fillStyle = newColor || this.color;
	
	      context.beginPath();
	
	      context.arc(this.position[0], this.position[1], context.measureText(this.word).width / 2 + 10, 0, 2 * Math.PI, true);
	
	      context.fill();
	
	      context.font = "18px Emulogic";
	      context.textAlign = "center";
	      context.textBaseline = "middle";
	      context.fillStyle = "green";
	      context.fillText(this.word, this.position[0], this.position[1]);
	    }
	  }, {
	    key: "move",
	    value: function move(timeDelta) {
	      //timeDelta is number of milliseconds since last move
	      //if the computer is busy the time delta will be larger
	      //in this case the MovingObject should move farther in this frame
	      //velocity of object is how far it should move in 1/60th of a second
	      var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
	          offsetX = this.velocity[0] * velocityScale,
	          offsetY = this.velocity[1] * velocityScale;
	
	      this.position = [this.position[0] + offsetX, this.position[1] + offsetY];
	
	      // if (this.game.isOutOfBounds(this.position)) {
	      //   this.remove();
	      // }
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      this.game.remove(this);
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
	
	module.exports = MovingObject;

/***/ },
/* 5 */
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
	
	      if (this.game.selectedWord.length === 1) {
	        // console.log("word selected");
	      } else {
	          // console.log("word not selected");
	        }
	
	      var timeDelta = time - this.lastTime;
	      this.game.step(timeDelta);
	      this.game.draw(this.context);
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
	  "z": [1, 1]
	};
	
	module.exports = GameView;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Explosion = function () {
	  function Explosion(options) {
	    _classCallCheck(this, Explosion);
	
	    this.position = options.position;
	    this.radius = options.radius;
	    this.game = options.game;
	    this.time = options.time;
	    this.opacity = 1;
	  }
	
	  _createClass(Explosion, [{
	    key: "draw",
	    value: function draw(context) {
	      var num1 = Math.floor(Math.random() * 255);
	      var num2 = Math.floor(Math.random() * 255);
	      var num3 = Math.floor(Math.random() * 255);
	      this.opacity -= .025;
	
	      // let string = "rgba(" + num1.toString() + ", " + num2.toString() + ", " + num3.toString()+ ", " + this.opacity.toString() + ")";
	      var string = "rgba(255, 255, 255," + this.opacity.toString() + ")";
	
	      context.fillStyle = string;
	
	      context.beginPath();
	
	      // void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	      context.arc(this.position[0], this.position[1], this.radius += 10, 0, 2 * Math.PI, true);
	
	      context.fill();
	    }
	  }]);
	
	  return Explosion;
	}();
	
	module.exports = Explosion;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map