
function Game () {
  this.aliens = [];



  this.addAliens();
}

Game.prototype.addAliens = function () {
  for (var i = 1; i <= Game.NUM_ALIENS; i++) {
    var alien;
    if (i <= 8) {
      alien = new Alien({
        pos: [i * 100, 100]
      });
    } else if (i <= 16) {

      alien = new Alien({
        pos: [(i * 100) / 2, 200]
      });

    } else if (i <= 24) {

      alien = new Alien({
        pos: [(i * 100) / 3, 300]
      });
    }
    this.aliens.push(alien);
  }
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.aliens.forEach(function (alien) {
    alien.draw();
  }.bind(this));
};

Game.prototype.moveObjects = function () {
  this.aliens.forEach(function (alien) {
    alien.move();
  }.bind(this));
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ALIENS = 24;
Game.BG_COLOR = "#000";

module.exports = Game;
