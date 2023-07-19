const Util = require("./util");
const Game = require("./game");

class City {
  constructor(options) {
    this.position = options.position;
    this.width = options.width;
    this.height = options.height;
    this.game = options.game;
    this.health = 230;
    this.color = "hsla(260, 87%, 60%, 1)";
  }

  draw(context, newColor) {
    context.fillStyle = this.color;
    context.fillRect(
      this.position[0],
      this.position[1],
      this.width,
      this.height
    );

    context.font = "12px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText(
      330 - this.health,
      this.position[0] + this.width / 2,
      this.position[1] + this.height / 2
    );
  }

  decreaseHealth(amount) {
    this.health += amount;
    this.color = "hsla(" + this.health + ", 87%, 60%, 1)";
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = City;
