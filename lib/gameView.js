function GameView (game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  setInterval(function () {
    this.game.moveObjects();
    this.game.draw();
  }.bind(this), 20);
};

module.exports = GameView;
