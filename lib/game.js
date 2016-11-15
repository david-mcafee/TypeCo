const Missile = require('./missile');
// const Bullet = require('./bullet');
const Util = require("./util");


class Game {
  constructor() {
    this.missiles = [];
    this.addMissile();
    this.selectedWord = [];
  }

  addMissile() {
    this.missiles.push(new Missile(
        { position: [Game.X_DIMENSION * Math.random(), 0], // zero to always generate at top of the screen
          radius: 25,
          game: this,
          color: "#008080",
          word: Game.dictionary[Math.floor(Math.random() * Game.dictionary.length)]
          }
      )
    );
  }

  randomPosition() {
    return [
      Game.X_DIMENSION * Math.random(),
      Game.Y_DIMENSION * Math.random()
    ];
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
    context.clearRect(0, 0, Game.X_DIMENSION, Game.Y_DIMENSION);
    context.fillStyle = Game.BACKGROUND_COLOR;
    context.fillRect(0,0, Game.X_DIMENSION, Game.Y_DIMENSION);


    // Generate missiles at random times
    const randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber === 2) {
      this.addMissile();
    }

    this.missiles.forEach((object) => {
      object.draw(context);
    });
  }

  playMove(keyEntered) {
    console.log(this.missiles);
    for (let i = 0; i < this.missiles.length; i++) {
      if (this.missiles[i].word.split("")[0] === keyEntered) {
        // console.log("matchfound");
        this.selectedWord.push[this.missiles[i]];
        this.missiles.splice(this.missiles.indexOf(this.missiles[i]), 1);
      }
    }

    console.log(this.missiles);
  }

}

Game.dictionary = ["elephant", "cat", "dog", "canary", "Jenna", "the", "of"];
Game.BACKGROUND_COLOR = "#000000";
Game.X_DIMENSION = 1000;
Game.Y_DIMENSION = 1000;
Game.FPS = 32;

module.exports = Game;
