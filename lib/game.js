(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function (shipImage, alienImages) {
    this.aliens = [];
    this.bullets = [];
    this.addAliens(alienImages);
    this.ship = new SpaceInvaders.Ship({ game: this, image: shipImage });
    this.tick = 0;
    this.points = 0;
  };

  Game.prototype.addAliens = function (alienImages) {

    for (var i = 1; i <= Game.NUM_ALIENS; i++) {
      var y = Math.ceil(i / 12);
      alien = new SpaceInvaders.Alien({
        game: this,
        pos: [(i % 12 + 1) * 50, 50 * y],
        image: alienImages[Math.floor(Math.random() * 4)]
      });

      this.aliens.push(alien);
    }

  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "#fff";
    var background = new Image();
    background.src="gamedevtuts_sprites/Backgrounds/starfield.png";

    ctx.drawImage(background, 0, this.tick % 601);
    ctx.drawImage(background, 0, this.tick % 601 - 600);
    ctx.drawImage(background, 800, this.tick % 601);
    ctx.drawImage(background, 800, this.tick % 601 - 600);
    ctx.font = "24px courier, sans-serif";
    ctx.fillText("Score: " + this.points, 10, 30);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    }.bind(this));
    this.ship.draw(ctx);
    this.tick++;
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

          if (alien.pos[1] < Game.DIM_Y - 300) {
            this.redirectAliens([0, 2]);

            setTimeout(function () {
              this.redirectAliens([-1, 0]);
            }.bind(this), 250);
          } else {
            this.redirectAliens([-1, 0]);
          }


      } else if (alien.pos[0] - alien.radius <= 1 &&
          Math.sign(alien.vel[0]) === -1) {

        alien.pos[0] = alien.radius + 1;
        if (alien.pos[1] < Game.DIM_Y - 300) {
          this.redirectAliens([0, 2]);

          setTimeout(function () {
            this.redirectAliens([1, 0]);
          }.bind(this), 250);
        } else {
          this.redirectAliens([1, 0]);
        }
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
          this.ship.isCollidedWith(object2);
        }
      }.bind(this));
      this.ship.isCollidedWith(object1);
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
    var interval1 = setInterval(function () {
      var rand = Math.floor(Math.random() * this.aliens.length);

      this.aliens[rand].fireBullet.call(this.aliens[rand]);
    }.bind(this), 3000);

    var interval2 = setInterval(function () {
      var rand = Math.floor(Math.random() * this.aliens.length);

      this.aliens[0].fireBullet.call(this.aliens[rand]);
    }.bind(this), 5000);
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ALIENS = 48;
  Game.BG_COLOR = "transparent";

})();
