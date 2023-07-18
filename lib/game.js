const Missile = require('./missile');
const Util = require("./util");
const Explosion = require("./explosion.js");
const Dictionary = require("./dictionary.js");
const City = require("./city");

class Game {
  constructor() {
    this.missiles = [];
    this.selectedWord = [];
    this.matchedLetters = [];
    this.totalPoints = 0;
    this.tempPoints = 0;
    this.missileCreationRate;
    this.missileCreationIncrement = 25;
    this.currentLevel = 1;
    this.speed = 1;
    this.explosions = [];
    this.bullets = [];
    this.levelColors = {ground: "yellow", city: "blue", missile: "red"};

    this.levelComplete = false;
    this.timeEnteredNewLevel;
    this.lengthOfLevel = 30000;

    this.startScreen = true;
    this.pause = false;
    this.timePaused;

    this.gameOver = false;
    this.gameWon = false;

    this.cities = [
      new City({
        position: [Game.X_DIMENSION * (1/9), Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (2/9), Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (3/9), Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (5/9), Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (6/9) , Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (7/9) , Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),

    ];
  }

  addMissile(options) {
    this.missiles.push(new Missile(
        { position: [((Game.X_DIMENSION - 400) * Math.random() + 120), 0], // zero to always generate at top of the screen
          game: this,
          color: "red",
          word: Game.dictionaryWords.words[Math.floor(Math.random() * Game.dictionaryWords.words.length)],
          radius: 0,
          speed: this.speed
          }
      )
    );
  }

  splitMissile(missile) {
    if (missile) {
      for (let i = 0; i < missile.word.length; i++) {
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
    }
    else if (this.pause === true) {
      this.drawPauseScreen(context);
    }
    else if (this.levelComplete === true) {
      this.drawLevelComplete(context);
    }
    else if (this.gameWon === true) {
      this.drawGameWon(context);
    }
    else if (this.gameOver === true){
      this.drawGameOver(context);
    }
    else {
      this.drawGamePlay(context);
    }

    context.fillStyle = "grey";
    context.fillRect(0,0,Game.X_DIMENSION, 45);

    this.drawExplosions(context);
    this.drawBullets(context);

    this.drawScores(context);

  }

  drawGamePlay(context) {
    this.setLevel(context);

    this.handleMissiles(context);

    // DRAW MISSILES
    this.missiles.forEach((object) => {
      object.draw(context, this.levelColors["missile"]);
    });

    // DRAW SELECTED WORD
    if (this.selectedWord.length === 1) {
      this.selectedWord[0].draw(context, "white");
    }

    // DRAW GROUND
    context.fillStyle = this.levelColors["ground"];
    context.fillRect(0,Game.Y_DIMENSION * (17/20),Game.X_DIMENSION, Game.Y_DIMENSION - (Game.Y_DIMENSION * (17/20)) );

    // COLLISION WITH BOTTOM OF SCREEN
    for (let i = 0; i < this.missiles.length; i++) {
      if ( (this.missiles[i].position[1] + this.missiles[i].radius) >= Game.Y_DIMENSION * (17/20)) {

        let pointsDeducted = this.missiles[i].word.split("").length;
        let explosionPosition = this.missiles[i].position;
        let explosionTime = Date.now();

        this.createExplosion(explosionPosition, explosionTime);

        for (var idx2 = 0; idx2 < this.cities.length; idx2++) {
          // COLLISION WITH A CITY OCCURED
          if (this.missiles[i].position[0] >= this.cities[idx2].position[0] &&
            this.missiles[i].position[0] <= (this.cities[idx2].position[0] + this.cities[idx2].width) ) {
              this.cities[idx2].decreaseHealth(pointsDeducted * 20);

              if (this.cities[idx2].health >= 330) {
                this.cities.splice(idx2, 1);
              }
            }
        }

        // REMOVE MISSILE
        this.missiles.splice(i, 1);

      }
    }

    // SELECTED WORD COLLISION - WORTH MORE POINTS
    if (this.selectedWord.length > 0) {

      if (this.selectedWord[0].position[1] >= (Game.Y_DIMENSION * (17/20) ) ) {

        let pointsDeducted = this.selectedWord[0].word.split("").length;
        this.totalPoints -= pointsDeducted * 200;

        for (var idx2 = 0; idx2 < this.cities.length; idx2++) {
          // COLLISION WITH A CITY OCCURED
          if (this.selectedWord[0].position[0] >= this.cities[idx2].position[0] &&
            this.selectedWord[0].position[0] <= (this.cities[idx2].position[0] + this.cities[idx2].width) ) {
              this.cities[idx2].decreaseHealth(pointsDeducted * 20);

              if (this.cities[idx2].health >= 330) {
                this.cities.splice(idx2, 1);
              }
            }
        }

        this.selectedWord = [];
      }

    }

    for (var i = 0; i < this.cities.length; i++) {
      this.cities[i].draw(context, this.levelColors["city"]);
    }

  }

  drawExplosions(context){
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
  }

  drawBullets(context){
    // DISPLAY BULLETS
    if (this.bullets.length > 0) {
      for (let i = 0; i < this.bullets.length; i++) {

        let bulletPosition = this.bullets[i];

        context.strokeStyle = "white";
        context.lineWidth = 1;
        context.setLineDash([Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)]);
        context.beginPath();
        context.moveTo(Game.X_DIMENSION / 2, Game.Y_DIMENSION * (17/20));
        context.lineTo(bulletPosition[0], bulletPosition[1]);
        context.stroke();

      }
      this.bullets = [];
    }
  }

  setLevel(context){
    if (this.cities.length === 0) {
      this.gameOver = true;
    }
    else if (this.currentLevel === 5) {
      this.missileCreationRate = 180;
      this.currentLevel = 5;
      this.levelColors = {ground: "blue", city: "blue", missile: "orange"};
    }
    else if (this.currentLevel === 4) {
      this.missileCreationRate = 200;
      this.currentLevel = 4;
      this.levelColors = {ground: "green", city: "blue", missile: "purple"};
    }
    else if (this.currentLevel === 3) {
      this.missileCreationRate = 220;
      this.currentLevel = 3;
      this.levelColors = {ground: "blue", city: "blue", missile: "red"};
    }
    else if (this.currentLevel === 2) {
      this.missileCreationRate = 240;
      this.currentLevel = 2;
      this.levelColors = {ground: "green", city: "blue", missile: "blue"};
    } else if (this.currentLevel === 1) {
      this.missileCreationRate = 260;
      this.currentLevel = 1;
      this.levelColors = {ground: "yellow", city: "blue", missile: "red"};
    } else {
      this.gameWon = true;
    }

    if (Date.now() > (this.timeEnteredNewLevel + this.lengthOfLevel) ) {
      this.levelComplete = true;
    }
  }

  drawLevelComplete(context){
    this.missiles = [];
    this.selectedWord = [];
    this.matchedLetters = [];
    this.explosions = [];
    this.bullets = [];

    // DRAW MISSILES
    this.missiles.forEach((object) => {
      object.draw(context, "rgba(255, 251, 0, .2)", "*");
    });

    // DRAW SELECTED WORD
    if (this.selectedWord.length === 1) {
      this.selectedWord[0].draw(context, "grey", "selected");
    }


    context.font = "60px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    let randomColor = Math.floor(Math.random() * 250);
    context.fillStyle = "rgba(44, 216, " + randomColor +", 1)";
    context.fillText("LEVEL " + this.currentLevel + " COMPLETE", Game.X_DIMENSION / 2, Game.Y_DIMENSION / 2 );


    context.font = "12px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText("enter: continue playing", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (7/10));
    context.fillText("esc: start over", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (8/10));
  }

  drawGameOver(context){
    context.font = "60px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    let randomColor = Math.floor(Math.random() * 250);
    context.fillStyle = "rgba(44, 216, " + randomColor +", 1)";
    context.fillText("GAME OVER", Game.X_DIMENSION / 2, Game.Y_DIMENSION / 3 );


    context.font = "12px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText("esc: start over", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (2/3) );
  }

  drawGameWon(context){
    context.font = "60px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    let randomColor = Math.floor(Math.random() * 250);
    context.fillStyle = "rgba(44, 216, " + randomColor +", 1)";
    context.fillText("GAME WON", Game.X_DIMENSION / 2, Game.Y_DIMENSION / 3 );


    context.font = "12px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText("esc: start over", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (2/3) );
  }

  handleMissiles(context){
    // GENERATE RANDOM MISSILES AT RATE DEPENDING ON CURRENT LEVEL
    const randomNumber = Math.floor(Math.random() * this.missileCreationRate);
    if (randomNumber === 2 || randomNumber == 3) {
      this.addMissile(context);
    }
    // SPLIT MISSILE INTO MULTIPLE MISSILES
    else if (randomNumber === 4) {
      let tempMissile = this.missiles[0];
      this.missiles.splice(this.missiles[0], 1);
      this.splitMissile(tempMissile);
    }
  }

  drawScores(context){
    // TOTAL
    context.font = "18px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText(`TOTAL  ` + this.totalPoints, (Game.X_DIMENSION / 2), (Game.Y_DIMENSION * (1/35)));

    // TEMP
    context.font = "18px Emulogic";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = "blue";
    context.fillText(`temp  ` + this.tempPoints, 30, (Game.Y_DIMENSION * (1/35) ));

    // LEVEL
    context.font = "18px Emulogic";
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillStyle = "green";
    context.fillText(`level ` + this.currentLevel, Game.X_DIMENSION - 30, (Game.Y_DIMENSION * (1/35)));

    // time
    context.font = "12px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "yellow";

    let time;

    if (this.pause) {
      time = this.pauseTime();
    }
    else if (this.gameOver || this.gameWon || this.levelComplete || this.startScreen) {
      time = 0;
    }
    else {
      time = 30000 - (Date.now() - this.timeEnteredNewLevel);
      isNaN(parseFloat(time)) ? time = 0 : time = time;
    }

    context.fillText(`time: ` + time, Game.X_DIMENSION * (1/4), (Game.Y_DIMENSION * (1/35)));
  }

  pauseTime() {
    return ( 30000 - (this.timePaused - this.timeEnteredNewLevel) );
  }

  drawStartScreen(context) {

    // // x, y, width, height
    // context.fillStyle = "grey";
    // context.fillRect(Game.X_DIMENSION * (1/20), Game.Y_DIMENSION * (9/20), Game.X_DIMENSION * (18/20), Game.Y_DIMENSION * (18/20));

    context.font = "60px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    let randomColor = Math.floor(Math.random() * 160 + 30);
    context.fillStyle = "rgba(44, 216, " + randomColor +", 1)";
    context.fillText("TYPE COMMAND", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (2/10));

    context.textAlign = "middle";
    context.font = "15px Emulogic";
    context.fillStyle = "red";
    context.fillText("ENTER: PLAY / PAUSE", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (24/80));
    context.fillStyle = "blue";
    context.fillText("ESC: END GAME", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (27/80));
    context.fillStyle = "GREEN";
    context.fillText("DELETE/BACKSPACE: UNSELECT", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (30/80) );

    context.textAlign = "center";
    context.fillStyle = "yellow";
    context.fillText("Instructions", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (36/80));
    context.fillText("Word “missiles” are falling from the sky!", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (39/80));
    context.fillText("Type them before they hit the cities.", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (42/80));
    //
    context.fillText("When you start typing a word, it will be selected", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (45/80));
    context.fillText("Once you select a word,", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (48/80));
    context.fillText("any typos will cost you points!", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (51/80));
    //

    context.fillStyle = "red";
    context.fillText("TIP:", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (57/80));
    context.fillText("Didn’t select the word you wanted?", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (60/80));
    context.fillText("Type delete/backspace.", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (63 / 80));
    //
    
    context.font = "10px Emulogic";
    context.fillStyle = "green";
    context.fillText("NOTE: Since the words are missiles (i.e. `enemies`), PLEASE", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (69/80));
    context.fillText("contact me if you find a word that shouldn't be there!", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (72/80));
  }

  drawPauseScreen(context) {

    // DRAW MISSILES
    this.missiles.forEach((object) => {
      object.draw(context, "rgba(255, 251, 0, .2)", "*");
    });

    // DRAW SELECTED WORD
    if (this.selectedWord.length === 1) {
      this.selectedWord[0].draw(context, "grey", "selected");
    }

    context.font = "36px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    let randomColor = Math.floor(Math.random() * 250);
    context.fillStyle = "rgba(44, 216, " + randomColor +", 1)";
    context.fillText("PAUSED", Game.X_DIMENSION / 2, Game.Y_DIMENSION / 2 );


    context.font = "12px Emulogic";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    context.fillText("enter: continue playing", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (12/20) );
    context.fillText("esc: start over", Game.X_DIMENSION / 2, Game.Y_DIMENSION * (13/20));
  }

  playMove(keyEntered, context) {
    // ENTER SCREEN
    if (keyEntered === "enter") {
      if (this.startScreen === true) {
        this.startScreen = false;
        this.timeEnteredNewLevel = Date.now();
        this.addMissile(context);
      }
      else if (this.levelComplete === true){
        this.levelComplete = false;
        this.timeEnteredNewLevel = Date.now();
        this.currentLevel += 1;
        this.addMissile(context);
      }
      else {
        if (this.gameOver === true) {

        }
        else if (this.pause === false){
          this.pause = true;
          this.timePaused = Date.now();
        } else {
          this.pause = false;
          this.timeEnteredNewLevel = this.timeEnteredNewLevel + (Date.now() - this.timePaused);
        }
      }
    } else if (keyEntered === "escape") {
      this.restartGame();
    } else {
      // IF NO WORD IS CURRENTLY SELECTED
      if (this.selectedWord.length === 0) {
        for (let i = 0; i < this.missiles.length; i++) {
          if (this.selectedWord.length === 0 && this.missiles[i].word.split("")[0] === keyEntered) {
            this.selectedWord.push(this.missiles[i]);
            this.missiles.splice(this.missiles.indexOf(this.missiles[i]), 1);
            this.selectedWord[0].removeFirstLetter();
            this.tempPoints += 100;
            this.fireBullet(this.selectedWord[0].position);
          }
        }

        // MISSILE DESTROYED
        if (this.selectedWord.length !== 0 && this.selectedWord[0].word.split("").length === 0) {
          // CREATE EXPLOSION
          let explosionPosition = this.selectedWord[0].position;
          let explosionTime = Date.now();
          this.createExplosion(explosionPosition, explosionTime);

          this.selectedWord = [];
          this.totalPoints += this.tempPoints;
          this.tempPoints = 0;
        }
      }
      // A WORD HAS ALREADY BEEN SELECTED
      else {
        // deselect if backspace
        if (keyEntered === "backspace") {
          this.missiles.push(this.selectedWord[0]);
          this.selectedWord = [];
        }
        // key entered for selected word other than backspace
        else
        {
          if (keyEntered === this.selectedWord[0].word.split("")[0]) {
            this.selectedWord[0].removeFirstLetter();
            this.tempPoints += 100;
            this.fireBullet(this.selectedWord[0].position);
          } else {
            this.tempPoints -= 100;
          }

        }

          if (keyEntered !== "backspace") {
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
    }
  }


  fireBullet(missilePosition) {
    this.bullets.push(missilePosition);
  }

  restartGame() {
    this.missiles = [];
    this.selectedWord = [];
    this.matchedLetters = [];
    this.totalPoints = 0;
    this.tempPoints = 0;
    this.missileCreationRate;
    this.missileCreationIncrement = 25;
    this.currentLevel = 1;
    this.speed = 1;
    this.explosions = [];
    this.bullets = [];
    this.levelColors = {ground: "yellow", city: "blue", missile: "red"};

    this.levelComplete = false;
    this.timeEnteredNewLevel;
    this.lengthOfLevel = 30000;

    this.startScreen = true;
    this.pause = false;
    this.timePaused;

    this.gameOver = false;

    this.cities = [
      new City({
        position: [Game.X_DIMENSION * (1/9), Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (2/9), Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (3/9), Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),

      new City({
        position: [Game.X_DIMENSION * (5/9), Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (6/9) , Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),
      new City({
        position: [Game.X_DIMENSION * (7/9) , Game.Y_DIMENSION * (15/18)],
        width: Game.X_DIMENSION * (3/36),
        height: Game.Y_DIMENSION * (1/9),
        game: this.game,
        color: this.levelColors["city"]
      }),

    ];
  }

}

Game.dictionaryWords = new Dictionary();
Game.BACKGROUND_COLOR = "#000000";
Game.X_DIMENSION = window.innerWidth - 25;
Game.Y_DIMENSION = window.innerHeight - 25;
Game.FPS = 32;

module.exports = Game;
