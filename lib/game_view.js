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
      key(k, () => { console.log(k);});
    });

  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    // start animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.context);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

module.exports = GameView;
