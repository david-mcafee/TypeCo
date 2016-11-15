const Util = require("./util");
const MovingObject = require("./moving_object");
// const Ship = require("./ship");
// const Tower = require("./tower");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 4
};

class Missile extends MovingObject{
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.position = options.position || [options.game.randomPosition()];
    options.radius = DEFAULTS.RADIUS;
    options.velocity = options.velocity || Util.randomVec(DEFAULTS.SPEED);
    options.word = options.word;
    super(options);
  }

  // collideWithBottom() {}
}

module.exports = Missile;
