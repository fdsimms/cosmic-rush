(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function () {
    this.aliens = [];
    this.addAliens();
    this.ship = new SpaceInvaders.Ship({});
  };

  Game.prototype.addAliens = function () {

    for (var i = 1; i <= Game.NUM_ALIENS; i++) {
      var alien;
      if (i <= 8) {
        alien = new SpaceInvaders.Alien({
          game: this,
          pos: [(i % 8 + 1) * 50, 50]
        });
      } else if (i <= 16) {

        alien = new SpaceInvaders.Alien({
          game: this,
          pos: [(i % 8 + 1) * 50, 100]
        });

      } else if (i <= 24) {

        alien = new SpaceInvaders.Alien({
          game: this,
          pos: [(i % 8 + 1) * 50, 150]
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
      alien.draw(ctx);
    }.bind(this));
    this.ship.draw(ctx);
  };

  Game.prototype.allObjects = function () {
   return [].concat(this.aliens);
 };

  Game.prototype.redirectAliens = function (vel) {
    this.aliens.forEach(function (alien) {
      alien.vel = vel;
    });
  };

  Game.prototype.remove = function (alien) {
    this.aliens.splice(this.aliens.indexOf(alien), 1);
  };

  Game.prototype.moveObjects = function () {

    this.aliens.forEach(function (alien) {
      if (alien.pos[0] + alien.radius === Game.DIM_X - 1 &&
          alien.vel[0] === 1 &&
          alien.vel[1] === 0) {

        this.redirectAliens([0, 2]);
        setTimeout(function () {
          this.redirectAliens([-1, 0]);
        }.bind(this), 500);
      } else if (alien.pos[0] - alien.radius === 1 &&
          alien.vel[0] === -1 &&
          alien.vel[1] === 0) {

        this.redirectAliens([0, 2]);
        setTimeout(function () {
          this.redirectAliens([1, 0]);
        }.bind(this), 500);

      } else {
        alien.move();
      }
    }.bind(this));
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.checkCollisions = function () {
    this.aliens.forEach(function (alien, idx1) {
      this.aliens.forEach(function (alien, idx2) {
        if (idx1 !== idx2) {
          var alien1 = this.aliens[idx1];
          var alien2 = this.aliens[idx2];
          alien1.isCollidedWith(alien2);
        }
      }.bind(this));
    }.bind(this));
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ALIENS = 24;
  Game.BG_COLOR = "#FFF";

})();
