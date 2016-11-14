const Game = require("./game");
const GameView = require("./game_view");

// NOTE: wait for dom content to be loaded
document.addEventListener("DOMContentLoaded", function(){
  const canvasElement = document.getElementsByTagName("canvas")[0];

  const context = canvasElement.getContext("2d");
  const game = new Game();
  new GameView(game, context).start();
});
