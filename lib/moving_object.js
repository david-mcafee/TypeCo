const Util = require('./util');

class MovingObject {
  constructor(options) {
    this.position = options.position;
    this.velocity = options.velocity;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color;
    // this.isWrappable = true;
  }

  draw(context) {
    context.fillStyle = this.color;

    context.beginPath();

    context.arc(
      this.position[0],
      this.position[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    context.fill();
  }

  move(timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.velocity[0] * velocityScale,
        offsetY = this.velocity[1] * velocityScale;

    this.position = [this.position[0] + offsetX, this.position[1] + offsetY];

    // if (this.game.isOutOfBounds(this.position)) {
    //   this.remove();
    // }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;