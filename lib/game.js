(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function () {
    this.aliens = [];
    this.bullets = [];
    this.addAliens();
    this.ship = new SpaceInvaders.Ship({ game: this });
  };

  Game.prototype.addAliens = function () {

    for (var i = 1; i <= Game.NUM_ALIENS; i++) {
      var y = Math.ceil(i / 8);
      alien = new SpaceInvaders.Alien({
        game: this,
        pos: [(i % 8 + 1) * 50, 50 * y]
      });

      this.aliens.push(alien);
    }

  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    }.bind(this));
    this.ship.draw(ctx);
  };

  Game.prototype.allObjects = function () {
   return [].concat(this.aliens).concat(this.bullets);
 };

  Game.prototype.redirectAliens = function (vel) {
    this.aliens.forEach(function (alien) {
      alien.vel = vel;
    });
  };

  Game.prototype.remove = function (object) {
    if (object instanceof SpaceInvaders.Alien) {
      this.aliens.splice(this.aliens.indexOf(object), 1);
    } else if (object instanceof SpaceInvaders.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    }
  };

  Game.prototype.moveObjects = function (delta) {

    this.aliens.forEach(function (alien) {
      if (alien.pos[0] + alien.radius >= Game.DIM_X - 1 &&
          Math.sign(alien.vel[0]) === 1) {
          alien.pos[0] = Game.DIM_X -2 - alien.radius;
            this.redirectAliens([0, 2]);

        setTimeout(function () {
          this.redirectAliens([-1, 0]);
        }.bind(this), 500);

      } else if (alien.pos[0] - alien.radius <= 1 &&
          Math.sign(alien.vel[0]) === -1) {

        alien.pos[0] = alien.radius + 1;
        this.redirectAliens([0, 2]);

        setTimeout(function () {
          this.redirectAliens([1, 0]);
        }.bind(this), 500);
      } else {
        alien.move(delta);
      }
    }.bind(this));
    this.bullets.forEach(function (bullet) {
      bullet.move(delta);
    }.bind(this));
    this.ship.move(delta);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.checkCollisions = function () {
    this.bullets.forEach(function (object1, idx1) {
      this.aliens.forEach(function (object2, idx2) {
        if (idx1 !== idx2) {
          object1.isCollidedWith(object2);
        }
      }.bind(this));
      object1.isCollidedWith(this.ship);
    }.bind(this));

  };

  Game.prototype.add = function (object) {
    if (object instanceof SpaceInvaders.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof SpaceInvaders.Alien) {
      this.aliens.push(object);
    }
  };

  Game.prototype.startAlienFire = function () {
    setInterval(function () {
      var rand = Math.floor(Math.random() * this.aliens.length);

      this.aliens[rand].fireBullet.call(this.aliens[rand]);
    }.bind(this), 3000);
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ALIENS = 32;
  Game.BG_COLOR = "#ccc";

})();
