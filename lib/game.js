const Missile = require('./missile');
// const Bullet = require('./bullet');
const Util = require("./util");


class Game {
  constructor() {
    this.missiles = [];
    this.addMissiles();
  }

  addMissile() {
    this.missiles.push(new Missile(
        { position: [300 * Math.random(), 300 * Math.random()],
          radius: 25,
          game: this,
          color: "#505050",
          }
      )
    );
  }

  remove(missile) {
    this.missiles.splice(this.missiles.indexOf(missile), 1);
  }

  step(delta) {
    this.moveObjects(delta);
    //this.checkCollisions;
  }

  moveObjects(delta) {
    this.missiles.forEach( (object) => {
      object.move(delta);
    });
  }

  draw(context) {
    // empty the canvas
    context.clearRect(0, 0, 300, 300);
    //context.fillStyle = Game.BG_COLOR;
    context.fillRect(0,0,300,300);

    this.missiles.forEach((object) => {
      object.draw(context);
    });
  }

  start(canvasElement) {
    // NOTE: get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a canvas DOM element.
    const context = canvasElement.getContext("2d");

    //this function will update the position of all the circles,
    //clear the canvas, and redraw them
    const animateCallback = () => {
    // this.moveCircles();
    this.render(context);
    //this will call our animateCallback again, but only when the browser
    //is ready, usually every 1/60th of a second
    requestAnimationFrame(animateCallback);

    //if we didn't know about requestAnimationFrame, we could use setTimeout
    //setTimeout(animateCallback, 1000/60);
    };

    //this will cause the first render and start the endless triggering of
    //the function using requestAnimationFrame
    animateCallback();

  }
}

// Game.BackgroundColor = "";
// Game.XDimension = ;
// Game.YDimension = ;

module.exports = Game;
