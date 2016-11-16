class GameView {
  constructor(game, context) {
    this.context = context;
    this.game = game;
    // add towers, etc
  }

  bindKeyHandlers() {
    // const tower = this.tower;

    Object.keys(GameView.MOVES).forEach( (k) => {
      let move = GameView.MOVES[k];
      key(k, () => { this.game.playMove(k);});
    });

  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // start animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {

    if (this.game.selectedWord.length === 1) {
      // console.log("word selected");
    } else {
      // console.log("word not selected");
    }

    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.context);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "a": [1,1],
  "b": [1,1],
  "c": [1,1],
  "d": [1,1],
  "e": [1,1],
  "f": [1,1],
  "g": [1,1],
  "h": [1,1],
  "i": [1,1],
  "j": [1,1],
  "k": [1,1],
  "l": [1,1],
  "m": [1,1],
  "n": [1,1],
  "o": [1,1],
  "p": [1,1],
  "q": [1,1],
  "r": [1,1],
  "s": [1,1],
  "t": [1,1],
  "u": [1,1],
  "v": [1,1],
  "w": [1,1],
  "x": [1,1],
  "y": [1,1],
  "z": [1,1],
  "backspace": [1,1],
  "enter": [1,1],
  "escape": [1,1]
};

module.exports = GameView;
