const Missile = require('./missile');
// const Bullet = require('./bullet');
const Util = require("./util");
const Explosion = require("./explosion.js");


class Game {
  constructor() {
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
    this.bullets = [];

    this.timeEnteredNewLevel;

    this.startScreen = true;
    this.pause = false;
  }

  addMissile(options) {
    this.missiles.push(new Missile(
        { position: [Game.X_DIMENSION * Math.random(), 0], // zero to always generate at top of the screen
          game: this,
          color: "red",
          word: Game.dictionary[Math.floor(Math.random() * Game.dictionary.length)],
          radius: 0,
          speed: this.speed
          }
      )
    );
  }

  splitMissile(missile) {
    if (missile) {
      for (let i = 0; i < missile.word.length; i++) {
        console.log(missile.word[i]);
        this.missiles.push(
          new Missile(
            {
              position: [ missile.position[0] + (i * 40), missile.position[1]],
              game: this,
              color: 'hsl(' + 360 * Math.random() + ', 100%, 55%)',
              word: missile.word[i],
              radius: 0,
              speed: (this.speed / 2)
            }
          )
        );

      }
    }
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

  createExplosion(thisPosition, time){
    // if (Date.now() < time + 3000) {
    this.explosions.push(
      new Explosion({
        position: thisPosition,
        game: this,
        radius: 5,
        time: time
      }
      )
    );
  }

  draw(context) {

    // empty the canvas
    context.clearRect(0, 0, Game.X_DIMENSION, Game.Y_DIMENSION);
    context.fillStyle = Game.BACKGROUND_COLOR;
    context.fillRect(0,0, Game.X_DIMENSION, Game.Y_DIMENSION);

    if (this.startScreen === true) {

      this.drawStartScreen(context);

    } else if (this.pause === true) {

      this.drawPauseScreen(context);

    } else {

      if (this.totalPoints >= 22500) {
        this.missileCreationRate = 125;
        this.currentLevel = 4;
      }
      else if (this.totalPoints >= 15000) {
        this.missileCreationRate = 150;
        this.currentLevel = 3;
      }
      else if (this.totalPoints >= 7500) {
        this.missileCreationRate = 175;
        this.currentLevel = 2;
      } else if (this.totalPoints >= 0) {
        this.missileCreationRate = 200;
        this.currentLevel = 1;
      }

      // GENERATE RANDOM MISSILES AT RATE DEPENDING ON CURRENT LEVEL
      const randomNumber = Math.floor(Math.random() * this.missileCreationRate);
      if (randomNumber === 2 || randomNumber == 3) {
        this.addMissile(context);
      }
      // SPLIT MISSILE INTO MULTIPLE MISSILES
      else if (randomNumber === 4 || randomNumber === 5) {
        let tempMissile = this.missiles[0];
        this.missiles.splice(this.missiles[0], 1);
        this.splitMissile(tempMissile);
      }

      // DRAW MISSILES
      this.missiles.forEach((object) => {
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
      context.fillText(`TOTAL  ` + this.totalPoints, 500, 20);

      // TEMP SCORE
      context.font = "18px Emulogic";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "blue";
      context.fillText(`temp  ` + this.tempPoints, 250, 20);

      // LEVEL
      context.font = "18px Emulogic";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "green";
      context.fillText(`level ` + this.currentLevel, 750, 20);

      context.fillStyle = 'rgba(255, 251, 0, 1)';

      context.fillRect(0,550,1000,100);

      // console.log(this.missiles[0].radius);
      // COLLISION WITH BOTTOM OF SCREEN
      for (let i = 0; i < this.missiles.length; i++) {
        if ( (this.missiles[i].position[1] + this.missiles[i].radius) >= 550) {

          // console.log((this.missiles[i].position[1] + this.missiles[i].radius));
          this.totalPoints -= this.missiles[i].word.split("").length * 100;

          let explosionPosition = this.missiles[i].position;
          let explosionTime = Date.now();

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

    }

    // DISPLAY THE EXPLOSIONS
    if (this.explosions.length > 0) {
      for (let i = 0; i < this.explosions.length; i++) {
        this.explosions[i].draw(context);

        // DELETE EXPLOSION AFTER IT HAS EXISTED FOR FOUR SECONDS
        if (Date.now() > this.explosions[i].time + 4000) {
          this.explosions.splice(this.explosions[i], 1);
        }
      }
    }

    // DISPLAY BULLETS
    if (this.bullets.length > 0) {
      for (let i = 0; i < this.bullets.length; i++) {
        let bulletPosition = this.bullets[i];
        context.strokeStyle = "white";
        context.lineWidth = 1;
        context.setLineDash([Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)]);
        context.beginPath();
        context.moveTo(500,550);
        context.lineTo(bulletPosition[0], bulletPosition[1]);
        context.stroke();
      }
      this.bullets = [];
    }

  }

  drawStartScreen(context) {
    context.font = "60px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    let randomColor = Math.floor(Math.random() * 160 + 30);
    context.fillStyle = "rgba(44, 216, " + randomColor +", 1)";
    context.fillText("TYPE COMMAND", 500, 30);

    context.font = "18px Emulogic";
    context.fillStyle = "WHITE";
    context.fillText("Welcome! Learn to type faster and have fun doing it!", 500, 50);

    context.textAlign = "left";
    context.font = "18px Emulogic";
    context.fillStyle = "red";
    context.fillText("ENTER: PLAY / PAUSE", 250, 100);
    context.fillStyle = "blue";
    context.fillText("ESC: END GAME", 250, 130);
    context.fillStyle = "GREEN";
    context.fillText("DELETE/BACKSPACE: UNSELECT", 250, 160);

    context.textAlign = "center";
    context.fillStyle = "YELLOW";
    context.fillText("INSTRUCTIONS", 500, 280);
    context.fillText("Word “missiles” are falling from the sky - your", 500, 310);
    // job is to type them before they hit the ground
    context.fillText("When you start typing a word, it will be SELECTED.", 500, 340);
    // You must finish typing this word before it hits the ground

    context.fillText("CAREFUL! Once you select a word,", 500, 370);
    // any typos will cost you points!

    context.fillStyle = "BLUE";
    context.fillText("TIPS:", 500, 430);
    context.fillText("Didn’t select the word you wanted? Hit", 500, 460);
    // delete/backspace to deselect it and type the word you want
    context.fillText("Once you unselect a word, it will continue to", 500, 490);
    // fall at it’s original speed (faster than when selected)
  }

  drawPauseScreen(context) {
    // DRAW THE SCORES
    context.font = "18px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "grey";
    context.fillText(`TOTAL  ` + this.totalPoints, 500, 20);

    // TEMP SCORE
    context.font = "18px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "grey";
    context.fillText(`temp  ` + this.tempPoints, 250, 20);

    // LEVEL
    context.font = "18px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "grey";
    context.fillText(`level ` + this.currentLevel, 750, 20);


    context.font = "36px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    let randomColor = Math.floor(Math.random() * 250);
    context.fillStyle = "rgba(44, 216, " + randomColor +", 1)";
    context.fillText("PAUSED", 500, 325 );


    context.font = "12px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText("enter: continue playing", 500, 450);
    context.fillText("esc: start over", 500, 475);

    // DRAW MISSILES
    this.missiles.forEach((object) => {
      object.draw(context, "rgba(255, 251, 0, .2)", "*");
    });

    // DRAW SELECTED WORD
    if (this.selectedWord.length === 1) {
      // console.log("entered selected word");
      this.selectedWord[0].draw(context, "grey");
    }
  }

  // PLAY THE KEYSTROKE ENTERED
  playMove(keyEntered) {

    // ENTER SCREEN
    if (keyEntered === "enter") {
      if (this.startScreen === true) {
        this.startScreen = false;
      } else {
        this.pause === false ? this.pause = true : this.pause = false;
      }
    } else if (keyEntered === "escape") {
      this.restartGame();
    } else {
      // IF NO WORD IS CURRENTLY SELECTED
      if (this.selectedWord.length === 0) {
        for (let i = 0; i < this.missiles.length; i++) {
          if (this.selectedWord.length === 0 && this.missiles[i].word.split("")[0] === keyEntered) {
            // console.log("matchfound");
            this.selectedWord.push(this.missiles[i]);
            this.missiles.splice(this.missiles.indexOf(this.missiles[i]), 1);
            this.selectedWord[0].removeFirstLetter();
            this.tempPoints += 100;
            this.fireBullet(this.selectedWord[0].position);
          }
        }
      }
      // A WORD HAS ALREADY BEEN SELECTED
      else {
        // deselect if backspace
        if (keyEntered === "backspace") {
          this.missiles.push(this.selectedWord[0]);
          this.selectedWord = [];
        }

        if (keyEntered === this.selectedWord[0].word.split("")[0]) {
          this.selectedWord[0].removeFirstLetter();
          this.tempPoints += 100;
          this.fireBullet(this.selectedWord[0].position);
        } else {
          this.tempPoints -= 100;
        }

      }

      // MISSILE DESTROYED
      if (this.selectedWord[0].word.split("").length === 0) {
        // CREATE EXPLOSION
        let explosionPosition = this.selectedWord[0].position;
        let explosionTime = Date.now();
        this.createExplosion(explosionPosition, explosionTime);

        this.selectedWord = [];
        this.totalPoints += this.tempPoints;
        this.tempPoints = 0;
      }

    }

  }

  fireBullet(missilePosition) {
    this.bullets.push(missilePosition);
  }

  restartGame() {
    this.startScreen = true;
    this.pause = false;
    this.missiles = [];
    this.selectedWord = [];
    this.matchedLetters = [];
    this.totalPoints = 0;
    this.tempPoints = 0;
    this.missileCreationRate = 200;
    this.currentLevel = 1;
    this.speed = 1;
    this.explosions = [];
    this.bullets = [];
    this.timeEnteredNewLevel;
  }

}

Game.dictionary = ["elephant", "cat", "dog", "canary", "jenna", "the", "of"];
Game.BACKGROUND_COLOR = "#000000";
Game.X_DIMENSION = 1000;
Game.Y_DIMENSION = 650;
Game.FPS = 32;

module.exports = Game;
