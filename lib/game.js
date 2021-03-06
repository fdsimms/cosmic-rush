(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Game = SpaceInvaders.Game = function (shipImages, alienImages) {
    this.aliens = [];
    this.powerups = [];
    this.bullets = [];
    this.curLevel = 1;
    this.ship = new SpaceInvaders.Ship({ game: this, images: shipImages });
    this.ship.vel = [0, 0];
    this.tick = 0;
    this.alienImages = alienImages;
    this.points = 0;
    this.highScore = localStorage.cosmicRushHighScore || 0;
    this.livesLeft = 3;
    this.paused = true;
    this.isOver = false;
    this.gameplayStarted = false;
  };

  Game.prototype.pause = function () {
    var playButton = document.getElementById("play-button");
    var instructions = document.getElementsByClassName("instructions-modal")[0];
    $(instructions).removeClass("hidden-instructions");
    $(instructions).addClass("displayed-instructions");
    if ($(playButton).hasClass("fa-pause")) {
      $(playButton).removeClass("fa-pause");
      $(playButton).addClass("fa-play");
    this.paused = true;
    }
  };

  Game.prototype.continuePlay = function () {
    if (this.gameplayStarted) {
      var instructions = document.getElementsByClassName("instructions-modal")[0];
      $(instructions).addClass("hidden-instructions");
      $(instructions).removeClass("displayed-instructions");
    }

    var playButton = document.getElementById("play-button");
    if ($(playButton).hasClass("fa-play")) {
      $(playButton).removeClass("fa-play");
      $(playButton).addClass("fa-pause");
    }
    this.paused = false;
  };


  Game.prototype.addAliens = function () {
    for (var i = 0; i < Game.NUM_ALIENS; i++) {
      var y = Math.floor(i / 12) + 2;
      var alienImages = this.alienImages;
      alien = new SpaceInvaders.Alien({
        game: this,
        pos: [(i % 12 + 1) * 50 - 650, 50 * y],
        image: alienImages[Math.floor(Math.random() * alienImages.length)]
      });

      this.aliens.push(alien);
    }
    this.startAlienFire();
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
    var background = new Image();
    background.src="gamedevtuts_sprites/Backgrounds/starfield.png";
    var halfWidth = Math.ceil(Game.DIM_X / 2);
    ctx.drawImage(
      background, 0, this.tick % Game.DIM_Y, halfWidth, Game.DIM_Y
    );
    ctx.drawImage(
      background, 0,
      (this.tick % Game.DIM_Y) - Game.DIM_Y, halfWidth, Game.DIM_Y
    );
    ctx.drawImage(
      background, halfWidth, this.tick % Game.DIM_Y, halfWidth, Game.DIM_Y
    );
    ctx.drawImage(
      background, halfWidth,
      (this.tick % Game.DIM_Y) - Game.DIM_Y,
      halfWidth, Game.DIM_Y
    );

    ctx.fillStyle="transparent";

    ctx.fillStyle = "#fff";
    ctx.font = "24px courier, sans-serif";
    ctx.fillText("High Score: " + this.highScore, 10, 30);
    ctx.fillText("Score: " + this.points, 10, 55);
    ctx.fillText("Level: " + this.curLevel, 10, 80);

    var lives = this.livesLeft;
    if (lives < 0) { lives = 0; }
    ctx.fillText("Lives: " + lives, Game.DIM_X - 125, 30);
    ctx.fillStyle="transparent";

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    }.bind(this));
    if (!this.isOver) {
      this.ship.draw(ctx);
    }
    if (key.isPressed('up') && !this.paused) {
      this.tick += 3;
    } else if (key.isPressed('down') && !this.paused) {
      this.tick += 0.5;
    } else {
      this.tick += 1;
    }
  };

  Game.prototype.allObjects = function () {
   return [].concat(this.aliens).concat(this.bullets).concat(this.powerups);
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

    // if (!this.isOver) {
      this.ship.move(delta);
    // }
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

  Game.prototype.setAlienFireInterval = function () {
    this.alienFireIntervals.push(setInterval(function () {
      var rand = Math.floor(Math.random() * this.aliens.length);
      if (document.hasFocus()) {
        this.aliens[rand].fireBullet.call(this.aliens[rand]);
      }
    }.bind(this), 3000)
  );

  };

  Game.prototype.startAlienFire = function () {
    this.alienFireIntervals = [];
    var numIntervals = Math.floor(2 + this.curLevel / 3);
    for (var i = 0; i < numIntervals; i++) {
      this.setAlienFireInterval();
    }
  };

  Game.prototype.startPowerups = function () {
    this.powerupInterval = setInterval(function () {

    }.bind(this), 20000);
  };

  Game.prototype.stopAlienFire = function () {
    this.alienFireIntervals.forEach(function (interval) {
      clearInterval(interval);
    }.bind(this));
  };

  Game.prototype.gameOver = function () {
    return this.livesLeft < 0;
  };

  Game.prototype.levelUp = function () {
    this.stopAlienFire();
    this.curLevel++;
    this.addAliens(this.alienImages);
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 625;
  Game.NUM_ALIENS = 48;
  Game.BG_COLOR = "transparent";

})();
