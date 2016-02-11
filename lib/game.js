(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function (shipImages, alienImages, level) {
    this.aliens = [];
    this.bullets = [];
    this.curLevel = level;
    this.addAliens(alienImages);
    this.ship = new SpaceInvaders.Ship({ game: this, images: shipImages });
    this.tick = 0;
    this.points = 0;
    this.highScore = localStorage.cosmicRushHighScore || 0;
    this.livesLeft = 3;
    this.paused = false;
  };

  Game.prototype.pause = function () {
    var playButton = document.getElementById("play-button");
    if ($(playButton).hasClass("fa-play")) {
      $(playButton).trigger("click");
    }
    this.paused = true;
  };

  Game.prototype.continuePlay = function () {
    var playButton = document.getElementById("play-button");
    if ($(playButton).hasClass("fa-pause")) {
      $(playButton).trigger("click");
    }
    this.paused = false;
  };


  Game.prototype.addAliens = function (alienImages) {
    for (var i = 0; i < Game.NUM_ALIENS; i++) {
      var y = Math.floor(i / 12) + 1;
      alien = new SpaceInvaders.Alien({
        game: this,
        pos: [(i % 12 + 1) * 50, 50 * y],
        image: alienImages[Math.floor(Math.random() * alienImages.length)]
      });

      this.aliens.push(alien);
    }
  };

  Game.prototype.addPoints = function () {
    this.points += (250 * this.curLevel / 10);
    if (this.points > this.highScore) {
      localStorage.setItem("cosmicRushHighScore", this.points);
      this.highScore = this.points;
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
    ctx.fillText("High Score: " + this.highScore, 10, 30);
    ctx.fillText("Score: " + this.points, 10, 55);
    ctx.fillText("Level: " + this.curLevel, 10, 80);

    var lives = this.livesLeft;
    if (lives < 0) { lives = 0; }
    ctx.fillText("Lives: " + lives, Game.DIM_X - 125, 30);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    }.bind(this));

    this.ship.draw(ctx);
    if (key.isPressed('up')) {
      this.tick += 3;
    } else if (key.isPressed('down')) {
      this.tick += 0.5;
    } else {
      this.tick += 1;
    }
  };

  Game.prototype.allObjects = function () {
   return [].concat(this.aliens).concat(this.bullets);
 };

  Game.prototype.redirectAliens = function (vel) {
    this.aliens.forEach(function (alien) {
      if (!alien.divebombing) {
        alien.vel = vel;
      }
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
    var newAlienVelX = 1 + this.curLevel / 5;
    this.aliens.forEach(function (alien) {
      if (alien.pos[0] + alien.radius >= Game.DIM_X - 1 &&
          Math.sign(alien.vel[0]) === 1 && !alien.divebombing) {
          alien.pos[0] = Game.DIM_X -2 - alien.radius;

          if (this.aliens.slice(-1)[0].pos[1] < Game.DIM_Y - 200) {
            this.redirectAliens([0, 2]);

            setTimeout(function () {
              this.redirectAliens([-newAlienVelX, 0]);
            }.bind(this), 250);
          } else {
            if (this.aliens.length <= 5) {
              this.redirectAliens([-newAlienVelX, 0]);
              this.blitzAliens();
            } else {
              var length = this.aliens.length;
              var rand = Math.floor(Math.random() * length);
              var divebomber = this.aliens[rand];

              this.redirectAliens([-newAlienVelX, 0]);
              divebomber.divebomb();
            }
          }


      } else if (alien.pos[0] - alien.radius <= 1 &&
                 Math.sign(alien.vel[0]) === -1 &&
                 !alien.divebombing) {

        alien.pos[0] = alien.radius + 1;
        if (this.aliens.slice(-1)[0].pos[1] < Game.DIM_Y - 200) {
          this.redirectAliens([0, 2]);

          setTimeout(function () {
            this.redirectAliens([newAlienVelX, 0]);
          }.bind(this), 250);
        } else {
          if (this.aliens.length <= 5) {
            this.redirectAliens([newAlienVelX, 0]);
            this.blitzAliens();
          } else {
            var length = this.aliens.length;
            var rand = Math.floor(Math.random() * length);
            var divebomber = this.aliens[rand];

            divebomber.divebomb();
            this.redirectAliens([newAlienVelX, 0]);
          }
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
    this.allObjects().forEach(function (object1) {
      this.allObjects().forEach(function (object2) {
        object1.isCollidedWith(object2);
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

  Game.prototype.blitzAliens = function () {
    this.aliens.forEach(function (alien) {
      alien.divebomb();
    }.bind(this));
  };

  Game.prototype.startAlienFire = function () {
    var interval1 = setInterval(function () {
      var rand = Math.floor(Math.random() * this.aliens.length);
      if (document.hasFocus()) {
        this.aliens[rand].fireBullet.call(this.aliens[rand]);
      }
    }.bind(this), 3000);

    var interval2 = setInterval(function () {
      var rand = Math.floor(Math.random() * this.aliens.length);
      if (document.hasFocus()) {
        this.aliens[rand].fireBullet.call(this.aliens[rand]);
      }
    }.bind(this), 5000);
  };

  Game.prototype.gameOver = function () {
    return this.livesLeft < 0;
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ALIENS = 48;
  Game.BG_COLOR = "transparent";

})();
