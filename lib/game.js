const Missile = require('./missile');
// const Bullet = require('./bullet');
const Util = require("./util");


class Game {
  constructor() {
    this.missiles = [];
    this.addMissile();
    this.selectedWord = [];
    this.matchedLetters = [];
    this.totalPoints = 0;
    this.tempPoints = 0;
  }

  addMissile() {
    this.missiles.push(new Missile(
        { position: [Game.X_DIMENSION * Math.random(), 0], // zero to always generate at top of the screen
          radius: 25,
          game: this,
          color: "red",
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

    // NOTE: HERE IS WHERE YOU CAN SLOW DOWN SELECTED WORDS
    if (this.selectedWord.length === 1) {
      this.selectedWord[0].move(delta / 2);
    }
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

    if (this.selectedWord.length === 1) {
      // console.log("entered selected word");
      this.selectedWord[0].draw(context, "white");
    }

    // DRAW THE SCORES
    context.font = "18px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText(`TOTAL  ` + this.totalPoints, 500, 20);

    //
    context.font = "18px Emulogic";
    context.textAlign = "blue";
    context.textBaseline = "middle";
    context.fillStyle = "blue";
    context.fillText(`temp  ` + this.tempPoints, 250, 20);
  }

  // PLAY THE KEYSTROKE ENTERED
  playMove(keyEntered) {
    // IF NO WORD IS CURRENTLY SELECTED
    if (this.selectedWord.length === 0) {
      for (let i = 0; i < this.missiles.length; i++) {
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
      this.selectedWord = [];
      this.totalPoints += this.tempPoints;
      this.tempPoints = 0;
    }

  }

}

Game.dictionary = ["elephant", "cat", "dog", "canary", "jenna", "the", "of"];
Game.BACKGROUND_COLOR = "#000000";
Game.X_DIMENSION = 1000;
Game.Y_DIMENSION = 1000;
Game.FPS = 32;

module.exports = Game;
